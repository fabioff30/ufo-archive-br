import { promises as fs } from "node:fs";
import { readFileSync, existsSync } from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { jsonrepair } from "jsonrepair";

// Load .env.local explicitly so it always wins over shell-exported variables.
// Node's --env-file flag does NOT override existing process.env values — and
// stale `export OPENROUTER_API_KEY=...` lines in shells silently break things.
(function loadEnvLocal(): void {
  const envPath = path.resolve(__dirname, "..", ".env.local");
  if (!existsSync(envPath)) return;
  const raw = readFileSync(envPath, "utf-8");
  for (const rawLine of raw.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const eq = line.indexOf("=");
    if (eq < 0) continue;
    const key = line.slice(0, eq).trim();
    let value = line.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    process.env[key] = value;
  }
})();

const MODEL = process.env.TRANSLATE_MODEL || "google/gemma-4-26b-a4b-it";
const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const CONCURRENCY = Number(process.env.TRANSLATE_CONCURRENCY || 3);
const SAMPLE_LIMIT = Number(process.env.TRANSLATE_SAMPLE || 0);
const MAX_OUTPUT_TOKENS = Number(process.env.TRANSLATE_MAX_TOKENS || 6000);
const BATCH_CHAR_BUDGET = 3500;
const MAX_BATCH_SIZE = 4;
const REQUEST_TIMEOUT_MS = 240_000;
const MAX_RETRIES = 3;

const ROOT = path.resolve(__dirname, "..");
const SRC = path.join(ROOT, "public", "search-index.json");
const CACHE_DIR = path.join(ROOT, "scripts", ".cache");
const CACHE_FILE = path.join(CACHE_DIR, "translations.json");
const OUT_DIR = path.join(ROOT, "public", "idx");
const OUT_FILE = path.join(OUT_DIR, "translations.json");

type CacheEntry = {
  source_hash: string;
  blurb_pt: string;
  text_pt: string;
  model: string;
};
type Cache = Record<string, CacheEntry>;

type RawRecord = {
  id: string;
  blurb?: string;
  text?: string | string[];
};

type WorkItem = { id: string; blurb: string; text: string };

const SYSTEM_PROMPT = `Você traduz documentos desclassificados do governo dos Estados Unidos sobre UFOs/UAPs para português brasileiro (PT-BR), de forma sóbria e jornalística.

Regras:
- Tradução natural, idiomática e fiel. Nada de paráfrases nem encurtamento.
- Preserve exatamente nomes próprios, números de caso (62-HQ-83894), siglas, datas e topônimos.
- Mantenha siglas e nomes de agências em sua forma original (FBI, USAF, NASA, USAF Project Blue Book) salvo quando há convenção brasileira firmada.
- "UFO" → "OVNI"; "UAP" → "UAP" (uso corrente em PT-BR).
- Estilo: prosa de jornal sério, sem alarme, sem floreio. Sem emoji.
- Devolva estritamente JSON válido no formato pedido. Sem prosa de abertura, sem markdown, sem cercas \`\`\`.`;

function hash(s: string): string {
  return crypto.createHash("sha256").update(s).digest("hex").slice(0, 16);
}

function normalizeText(t: string | string[] | undefined): string {
  if (!t) return "";
  if (Array.isArray(t)) return t.filter((s) => typeof s === "string").join("\n");
  return t;
}

async function loadCache(): Promise<Cache> {
  try {
    const raw = await fs.readFile(CACHE_FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

async function saveCache(cache: Cache): Promise<void> {
  await fs.mkdir(CACHE_DIR, { recursive: true });
  await fs.writeFile(CACHE_FILE, JSON.stringify(cache));
}

function buildBatches(items: WorkItem[]): WorkItem[][] {
  const batches: WorkItem[][] = [];
  let current: WorkItem[] = [];
  let currentChars = 0;
  for (const item of items) {
    const itemChars = item.blurb.length + item.text.length;
    if (itemChars > BATCH_CHAR_BUDGET) {
      if (current.length) {
        batches.push(current);
        current = [];
        currentChars = 0;
      }
      batches.push([item]);
      continue;
    }
    if (
      current.length >= MAX_BATCH_SIZE ||
      currentChars + itemChars > BATCH_CHAR_BUDGET
    ) {
      if (current.length) batches.push(current);
      current = [item];
      currentChars = itemChars;
    } else {
      current.push(item);
      currentChars += itemChars;
    }
  }
  if (current.length) batches.push(current);
  return batches;
}

type OpenRouterResponse = {
  choices?: { message?: { content?: string } }[];
  error?: { message?: string };
};

class FatalApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

async function callOpenRouter(
  apiKey: string,
  systemPrompt: string,
  userPrompt: string,
  label: string,
): Promise<string> {
  let lastErr: unknown = null;
  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
    const t0 = Date.now();
    try {
      const res = await fetch(OPENROUTER_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://github.com/zexiro/uap-disclosure-archive",
          "X-Title": "Arquivo OVNI/UAP BR",
        },
        body: JSON.stringify({
          model: MODEL,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
          response_format: { type: "json_object" },
          temperature: 0.2,
          max_tokens: MAX_OUTPUT_TOKENS,
        }),
        signal: controller.signal,
      });
      clearTimeout(timer);
      const ms = Date.now() - t0;
      if (!res.ok) {
        const body = await res.text();
        const snippet = body.slice(0, 300);
        // Retry on 429 / 5xx
        if (res.status === 429 || res.status >= 500) {
          const wait = res.status === 429 ? 5000 * (attempt + 1) : 1500 * (attempt + 1);
          console.warn(
            `  ${label} HTTP ${res.status} (${ms}ms), retry em ${wait}ms — ${snippet}`,
          );
          lastErr = new Error(`HTTP ${res.status}: ${snippet}`);
          await new Promise((r) => setTimeout(r, wait));
          continue;
        }
        // 4xx (other than 429) is fatal — auth, bad model, validation. No retry.
        throw new FatalApiError(res.status, `HTTP ${res.status}: ${snippet}`);
      }
      const data = (await res.json()) as OpenRouterResponse;
      if (data.error) throw new Error(`OpenRouter error: ${data.error.message}`);
      const content = data.choices?.[0]?.message?.content;
      if (!content) throw new Error("Empty response content");
      return content;
    } catch (err) {
      clearTimeout(timer);
      const ms = Date.now() - t0;
      const msg = err instanceof Error ? err.message : String(err);
      lastErr = err;
      if (err instanceof FatalApiError) {
        throw err; // don't retry auth/validation errors
      }
      if (attempt < MAX_RETRIES - 1) {
        console.warn(`  ${label} falhou (${ms}ms): ${msg.slice(0, 200)} — retentando`);
        await new Promise((r) => setTimeout(r, 1500 * (attempt + 1)));
      }
    }
  }
  throw lastErr instanceof Error ? lastErr : new Error(String(lastErr));
}

function extractJson(raw: string): unknown {
  // Step 1: normalize — strip markdown fences, prose around the JSON object,
  // so jsonrepair (slow path) doesn't try to glue prose into the structure.
  let s = raw.trim();
  if (s.startsWith("```")) {
    s = s.replace(/^```(?:json)?\s*/i, "").replace(/```\s*$/i, "").trim();
  }
  const first = s.indexOf("{");
  if (first > 0) s = s.slice(first); // drop prose preamble
  // For the slow path we keep the *un-truncated* head — jsonrepair will close
  // anything unclosed. We only trim trailing prose AFTER the last balanced }.

  // Step 2: fast path — JSON.parse the cleanest possible slice.
  const last = s.lastIndexOf("}");
  const fastSlice = last > 0 ? s.slice(0, last + 1) : s;
  try {
    return JSON.parse(fastSlice);
  } catch (firstErr) {
    // Step 3: slow path — jsonrepair the normalized (but possibly truncated)
    // string. Closes unterminated strings, missing brackets, trailing commas.
    try {
      const repaired = jsonrepair(s);
      return JSON.parse(repaired);
    } catch {
      throw firstErr;
    }
  }
}

async function translateBatch(
  apiKey: string,
  batch: WorkItem[],
  label: string,
): Promise<{ id: string; blurb_pt: string; text_pt: string }[]> {
  const payload = batch.map((b) => ({
    id: b.id,
    blurb: b.blurb,
    text: b.text,
  }));
  const userPrompt = `Traduza os seguintes registros para português brasileiro.

Para cada registro, devolva:
- "id": exatamente como veio na entrada
- "blurb_pt": tradução do campo blurb. Se blurb estiver vazio, devolva string vazia "".
- "text_pt": tradução do campo text. Se text estiver vazio, devolva string vazia "".

A resposta deve ser um objeto JSON com uma única chave "translations" contendo um array. Exemplo:
{"translations":[{"id":"...","blurb_pt":"...","text_pt":"..."}]}

Não inclua nenhum texto antes ou depois do JSON. Não use markdown.

Registros para traduzir:
${JSON.stringify(payload, null, 2)}`;

  const raw = await callOpenRouter(apiKey, SYSTEM_PROMPT, userPrompt, label);
  const parsed = extractJson(raw) as {
    translations?: { id: string; blurb_pt: string; text_pt: string }[];
  };
  if (!parsed || !Array.isArray(parsed.translations)) {
    throw new Error(`Invalid response shape: ${raw.slice(0, 200)}`);
  }
  return parsed.translations;
}

const FIELD_CHUNK_CHARS = 3500;

// Split text into translatable chunks, preferring paragraph (\n\n) boundaries,
// falling back to sentence boundaries, and hard-cutting if a single sentence
// is too long.
function splitForTranslation(text: string, maxChars = FIELD_CHUNK_CHARS): string[] {
  if (text.length <= maxChars) return [text];
  const paragraphs = text.split(/(\n\n+)/);
  const chunks: string[] = [];
  let current = "";
  const flush = () => {
    if (current) {
      chunks.push(current);
      current = "";
    }
  };
  for (const part of paragraphs) {
    if (current.length + part.length <= maxChars) {
      current += part;
      continue;
    }
    flush();
    if (part.length <= maxChars) {
      current = part;
      continue;
    }
    // Part itself too long — split on sentence boundaries
    const sentences = part.split(/(?<=[.!?])\s+/);
    let scur = "";
    for (const s of sentences) {
      if (scur.length + s.length + 1 <= maxChars) {
        scur += (scur ? " " : "") + s;
      } else {
        if (scur) chunks.push(scur);
        if (s.length <= maxChars) {
          scur = s;
        } else {
          // Hard char split
          for (let i = 0; i < s.length; i += maxChars) {
            chunks.push(s.slice(i, i + maxChars));
          }
          scur = "";
        }
      }
    }
    if (scur) chunks.push(scur);
  }
  flush();
  return chunks;
}

async function translateFieldChunk(
  apiKey: string,
  chunk: string,
  label: string,
): Promise<string> {
  const userPrompt = `Traduza o seguinte trecho para português brasileiro, preservando nomes próprios, números de caso, siglas, datas e quebras de linha. Devolva APENAS um objeto JSON: {"pt":"<tradução>"}. Sem markdown, sem prosa.

Trecho:
${JSON.stringify(chunk)}`;
  const raw = await callOpenRouter(apiKey, SYSTEM_PROMPT, userPrompt, label);
  const parsed = extractJson(raw) as { pt?: string };
  if (typeof parsed?.pt !== "string") {
    throw new Error(`Invalid per-field response: ${raw.slice(0, 200)}`);
  }
  return parsed.pt;
}

// Translate a single field. If the text is too long, split into chunks,
// translate each sequentially, and rejoin.
async function translateField(
  apiKey: string,
  text: string,
  label: string,
): Promise<string> {
  if (!text.trim()) return "";
  const chunks = splitForTranslation(text);
  if (chunks.length === 1) {
    return translateFieldChunk(apiKey, text, label);
  }
  console.log(`  ${label} texto longo (${text.length} chars) → ${chunks.length} chunks`);
  const out: string[] = [];
  for (let i = 0; i < chunks.length; i++) {
    const part = await translateFieldChunk(
      apiKey,
      chunks[i],
      `${label}#${i + 1}/${chunks.length}`,
    );
    out.push(part);
  }
  // Chunks were split on \n\n boundaries where possible, so rejoining with
  // double newline preserves paragraph structure (some sentence-level joins
  // will introduce minor paragraph breaks — acceptable for archival text).
  return out.join("\n\n");
}

async function translateOne(
  apiKey: string,
  item: WorkItem,
  label: string,
): Promise<{ id: string; blurb_pt: string; text_pt: string }> {
  const [blurb_pt, text_pt] = await Promise.all([
    translateField(apiKey, item.blurb, `${label} blurb`),
    translateField(apiKey, item.text, `${label} text`),
  ]);
  return { id: item.id, blurb_pt, text_pt };
}

// Try translating a batch. If parsing fails, split:
//   - >1 record: split in half, retry each half recursively
//   - 1 record: translate blurb and text as separate field calls
async function translateBatchWithFallback(
  apiKey: string,
  batch: WorkItem[],
  label: string,
): Promise<{ id: string; blurb_pt: string; text_pt: string }[]> {
  try {
    return await translateBatch(apiKey, batch, label);
  } catch (err) {
    const isParseError =
      err instanceof SyntaxError ||
      (err instanceof Error &&
        (err.message.includes("Invalid response shape") ||
          err.message.includes("Invalid per-field response")));
    if (!isParseError) throw err;
    if (batch.length > 1) {
      const mid = Math.ceil(batch.length / 2);
      console.warn(`  ${label} parse falhou, dividindo lote (${batch.length} → ${mid} + ${batch.length - mid})`);
      const left = await translateBatchWithFallback(apiKey, batch.slice(0, mid), `${label}a`);
      const right = await translateBatchWithFallback(apiKey, batch.slice(mid), `${label}b`);
      return [...left, ...right];
    }
    console.warn(`  ${label} parse falhou em 1 registro, separando blurb/text`);
    const one = await translateOne(apiKey, batch[0], label);
    return [one];
  }
}

async function runWithConcurrency<T, R>(
  items: T[],
  limit: number,
  worker: (item: T, index: number) => Promise<R>,
): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let next = 0;
  async function run() {
    while (true) {
      const i = next++;
      if (i >= items.length) return;
      results[i] = await worker(items[i], i);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, run));
  return results;
}

async function main(): Promise<void> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    console.error(
      "[translate] OPENROUTER_API_KEY não definida. Defina e tente novamente.",
    );
    process.exit(1);
  }

  console.log(`[translate] modelo: ${MODEL}`);
  console.log(`[translate] lendo ${path.relative(ROOT, SRC)}`);
  const data: RawRecord[] = JSON.parse(await fs.readFile(SRC, "utf-8"));
  const cache = await loadCache();

  const work: WorkItem[] = [];
  let cachedCount = 0;
  let emptyCount = 0;
  let modelMismatchCount = 0;
  for (const r of data) {
    const blurb = (r.blurb || "").trim();
    const text = normalizeText(r.text).trim();
    if (!blurb && !text) {
      emptyCount++;
      continue;
    }
    const source = `${blurb}\n---\n${text}`;
    const sourceHash = hash(source);
    const existing = cache[r.id];
    if (
      existing &&
      existing.source_hash === sourceHash &&
      existing.model === MODEL
    ) {
      cachedCount++;
      continue;
    }
    if (existing && existing.model !== MODEL) modelMismatchCount++;
    work.push({ id: r.id, blurb, text });
  }
  console.log(
    `[translate] ${data.length} registros | ${cachedCount} cache hit | ${emptyCount} vazios | ${work.length} pendentes${
      modelMismatchCount ? ` (${modelMismatchCount} retraduzindo por mudança de modelo)` : ""
    }`,
  );

  if (SAMPLE_LIMIT > 0) {
    console.log(`[translate] modo amostra: limitando a ${SAMPLE_LIMIT} registros`);
    work.length = Math.min(work.length, SAMPLE_LIMIT);
  }

  if (work.length === 0) {
    console.log("[translate] nada a fazer.");
  } else {
    const batches = buildBatches(work);
    console.log(
      `[translate] ${batches.length} lotes, concorrência ${CONCURRENCY}`,
    );
    console.log("[translate] começando — log por lote a seguir");

    let completed = 0;
    let failures = 0;

    await runWithConcurrency(batches, CONCURRENCY, async (batch, idx) => {
      const label = `[lote ${idx + 1}/${batches.length}]`;
      const t0 = Date.now();
      try {
        const result = await translateBatchWithFallback(apiKey, batch, label);
        const byId = new Map(result.map((t) => [t.id, t]));
        let merged = 0;
        for (const item of batch) {
          const t = byId.get(item.id);
          if (!t) continue;
          const source = `${item.blurb}\n---\n${item.text}`;
          cache[item.id] = {
            source_hash: hash(source),
            blurb_pt: typeof t.blurb_pt === "string" ? t.blurb_pt : "",
            text_pt: typeof t.text_pt === "string" ? t.text_pt : "",
            model: MODEL,
          };
          merged++;
        }
        completed++;
        console.log(
          `${label} OK (${Date.now() - t0}ms, ${merged}/${batch.length} ids) — ${completed}/${batches.length} concluídos, ${failures} falhas`,
        );
      } catch (err) {
        failures++;
        completed++;
        console.error(
          `${label} falhou (${Date.now() - t0}ms): ${
            err instanceof Error ? err.message : err
          }`,
        );
      }
      // save cache periodically
      if (completed % 5 === 0 || completed === batches.length) {
        await saveCache(cache);
      }
    });

    await saveCache(cache);
    console.log(
      `[translate] terminado: ${completed - failures} OK, ${failures} falhas`,
    );
  }

  await fs.mkdir(OUT_DIR, { recursive: true });
  const out: Record<string, { blurb_pt: string; text_pt: string }> = {};
  for (const [id, entry] of Object.entries(cache)) {
    out[id] = { blurb_pt: entry.blurb_pt, text_pt: entry.text_pt };
  }
  await fs.writeFile(OUT_FILE, JSON.stringify(out));
  console.log(
    `[translate] gravado ${path.relative(ROOT, OUT_FILE)} (${Object.keys(out).length} entradas)`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
