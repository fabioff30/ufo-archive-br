import { promises as fs } from "node:fs";
import path from "node:path";

type Similar = { id: string; title: string; type?: string; score?: number };

type StringOrList = string | string[] | null | undefined;

type Raw = {
  id: string;
  title: string;
  agency?: string;
  type?: string;
  release_date?: string;
  incident_date?: string;
  incident_location?: string;
  redaction?: string;
  blurb?: string;
  source_url?: string;
  primary_local?: StringOrList;
  thumbnail_local?: StringOrList;
  thumb_small?: StringOrList;
  video_local?: StringOrList;
  dvids_video_id?: string;
  text?: string;
  similar_text?: Similar[];
  similar_image?: Similar[];
  extracted_images?: string[];
  dossiers?: string[];
  dossier_hits?: Record<string, unknown> | string[];
};

function firstString(value: StringOrList): string {
  if (!value) return "";
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return typeof value[0] === "string" ? value[0] : "";
  return "";
}

// Source URLs in the input JSON already point at the canonical war.gov
// location (https://www.war.gov/medialink/ufo/release_1/<file>.pdf) or, for
// older Project Blue Book material, at nicap.org. We preserve them as-is.
function canonicalSourceUrl(url: string): string {
  return url || "";
}

const ROOT = path.resolve(__dirname, "..");
const SRC = path.join(ROOT, "public", "search-index.json");
const OUT_DIR = path.join(ROOT, "public", "idx");
const OUT_RECORDS = path.join(OUT_DIR, "records");

function extractYear(value: string | undefined): number | null {
  if (!value) return null;
  const s = value.trim();
  if (!s || s.toUpperCase() === "N/A") return null;
  // 4-digit year anywhere
  const m4 = s.match(/\b(19|20)\d{2}\b/);
  if (m4) return parseInt(m4[0], 10);
  // m/d/yy or m-d-yy
  const m2 = s.match(/\b(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2})\b/);
  if (m2) {
    const yy = parseInt(m2[3], 10);
    // 26 -> 2026; 45 -> 1945. Heuristic split at 50.
    return yy < 50 ? 2000 + yy : 1900 + yy;
  }
  return null;
}

function decadeOf(year: number | null): string | null {
  if (year == null) return null;
  return `${Math.floor(year / 10) * 10}s`;
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const DOSSIER_LABELS: Record<string, string> = {
  biologics: "Material biológico e biotécnico",
  hearings: "Audiências e depoimentos",
};

const DOSSIER_BLURBS: Record<string, string> = {
  biologics:
    "Documentos que tratam de amostras biológicas, restos orgânicos e investigações biotécnicas associadas aos UAPs.",
  hearings:
    "Audiências formais, depoimentos sob juramento e transcrições do Congresso dos Estados Unidos sobre o programa UAP.",
};

async function loadTranslations(): Promise<Record<string, { blurb_pt: string; text_pt: string }>> {
  // Translations are produced by `npm run translate`. May not exist yet.
  const candidate = path.join(ROOT, "public", "idx", "translations.json");
  try {
    const raw = await fs.readFile(candidate, "utf-8");
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

async function main() {
  console.log("[build-index] lendo", path.relative(ROOT, SRC));
  const raw = await fs.readFile(SRC, "utf-8");
  const data: Raw[] = JSON.parse(raw);
  console.log(`[build-index] ${data.length} registros`);

  // Preserve translations across rebuilds — they live inside public/idx
  // which we rm -rf below. Load before delete, re-emit after.
  const translations = await loadTranslations();

  await fs.rm(OUT_DIR, { recursive: true, force: true });
  await fs.mkdir(OUT_RECORDS, { recursive: true });

  if (Object.keys(translations).length > 0) {
    await fs.writeFile(
      path.join(OUT_DIR, "translations.json"),
      JSON.stringify(translations),
    );
  }

  const search: Array<{
    id: string;
    title: string;
    agency: string;
    type: string;
    release_date: string;
    incident_date: string;
    incident_location: string;
    blurb: string;
    blurb_pt?: string;
    year: number | null;
    decade: string | null;
    has_thumb: boolean;
    has_video: boolean;
    has_text: boolean;
    has_translation: boolean;
    redacted: boolean;
    dossiers: string[];
    image_url?: string;
  }> = [];

  const dossierMap: Record<string, { title: string; blurb: string; recordIds: string[] }> = {};

  for (const r of data) {
    const incidentYear = extractYear(r.incident_date);
    const releaseYear = extractYear(r.release_date);
    const year = incidentYear ?? releaseYear;
    const decade = decadeOf(year);

    const agency = (r.agency || "Sem agência").trim() || "Sem agência";
    const type = (r.type || "Outro").trim() || "Outro";
    const dossiers = Array.isArray(r.dossiers) ? r.dossiers : [];

    const rawBlurb = (r.blurb || "").trim();
    const blurbShort =
      rawBlurb.length > 320 ? rawBlurb.slice(0, 317).trimEnd() + "…" : rawBlurb;

    const thumb = firstString(r.thumbnail_local) || firstString(r.thumb_small);
    const thumbSmall = firstString(r.thumb_small);
    const video = firstString(r.video_local);

    const tr = translations[r.id];
    const blurbPtRaw = (tr?.blurb_pt || "").trim();
    const blurbPtShort = blurbPtRaw
      ? blurbPtRaw.length > 320
        ? blurbPtRaw.slice(0, 317).trimEnd() + "…"
        : blurbPtRaw
      : undefined;

    // Only IMG records have a public image URL we can hot-link directly
    // (war.gov hosts them at the source_url for .png/.jpg/.webp/.gif).
    const isPublicImage =
      type === "IMG" &&
      typeof r.source_url === "string" &&
      /\.(png|jpe?g|webp|gif)(?:[?#]|$)/i.test(r.source_url);

    search.push({
      id: r.id,
      title: r.title || r.id,
      agency,
      type,
      release_date: r.release_date || "",
      incident_date: r.incident_date || "",
      incident_location: r.incident_location || "",
      blurb: blurbShort,
      blurb_pt: blurbPtShort,
      year,
      decade,
      has_thumb: Boolean(thumb),
      has_video: Boolean(video || r.dvids_video_id),
      has_text: Boolean(r.text && r.text.length > 100),
      has_translation: Boolean(tr && (tr.blurb_pt || tr.text_pt)),
      redacted: r.redaction === "TRUE",
      dossiers,
      ...(isPublicImage ? { image_url: r.source_url as string } : {}),
    });

    for (const dKey of dossiers) {
      const key = dKey.toLowerCase();
      if (!dossierMap[key]) {
        dossierMap[key] = {
          title: DOSSIER_LABELS[key] || key.replace(/_/g, " "),
          blurb: DOSSIER_BLURBS[key] || "",
          recordIds: [],
        };
      }
      dossierMap[key].recordIds.push(r.id);
    }

    const recordOut = {
      id: r.id,
      title: r.title || r.id,
      agency,
      type,
      release_date: r.release_date || "",
      incident_date: r.incident_date || "",
      incident_location: r.incident_location || "",
      blurb: r.blurb || "",
      blurb_pt: tr?.blurb_pt || "",
      source_url: canonicalSourceUrl(r.source_url || ""),
      thumbnail_local: thumb,
      thumb_small: thumbSmall,
      video_local: video,
      dvids_video_id: r.dvids_video_id || "",
      text: typeof r.text === "string" ? r.text : "",
      text_pt: tr?.text_pt || "",
      similar_text: Array.isArray(r.similar_text) ? r.similar_text.slice(0, 6) : [],
      similar_image: Array.isArray(r.similar_image) ? r.similar_image.slice(0, 6) : [],
      extracted_images: Array.isArray(r.extracted_images)
        ? r.extracted_images.filter((x): x is string => typeof x === "string").slice(0, 12)
        : [],
      dossiers,
      redacted: r.redaction === "TRUE",
      year,
      decade,
    };

    const safe = r.id.replace(/[^A-Za-z0-9._-]/g, "_");
    await fs.writeFile(path.join(OUT_RECORDS, `${safe}.json`), JSON.stringify(recordOut));
  }

  await fs.writeFile(path.join(OUT_DIR, "search.json"), JSON.stringify(search));

  // facets / meta
  const counters = {
    agencies: new Map<string, number>(),
    types: new Map<string, number>(),
    decades: new Map<string, number>(),
  };
  for (const r of search) {
    counters.agencies.set(r.agency, (counters.agencies.get(r.agency) || 0) + 1);
    counters.types.set(r.type, (counters.types.get(r.type) || 0) + 1);
    if (r.decade) counters.decades.set(r.decade, (counters.decades.get(r.decade) || 0) + 1);
  }

  const meta = {
    total: search.length,
    agencies: [...counters.agencies.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([value, count]) => ({ value, count })),
    types: [...counters.types.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([value, count]) => ({ value, count })),
    decades: [...counters.decades.entries()]
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([value, count]) => ({ value, count })),
    dossiers: Object.entries(dossierMap)
      .sort((a, b) => b[1].recordIds.length - a[1].recordIds.length)
      .map(([slug, info]) => ({ slug, title: info.title, count: info.recordIds.length })),
    media: {
      with_thumb: search.filter((r) => r.has_thumb).length,
      with_video: search.filter((r) => r.has_video).length,
      with_text: search.filter((r) => r.has_text).length,
    },
  };
  await fs.writeFile(path.join(OUT_DIR, "meta.json"), JSON.stringify(meta, null, 2));

  // dossiers
  await fs.writeFile(path.join(OUT_DIR, "dossiers.json"), JSON.stringify(dossierMap));

  // size report
  const searchSize = (await fs.stat(path.join(OUT_DIR, "search.json"))).size;
  const dossiersSize = (await fs.stat(path.join(OUT_DIR, "dossiers.json"))).size;
  const recordFiles = await fs.readdir(OUT_RECORDS);
  console.log(`[build-index] OK
  search.json:    ${(searchSize / 1024).toFixed(1)} KB
  dossiers.json:  ${(dossiersSize / 1024).toFixed(1)} KB
  records/:       ${recordFiles.length} arquivos
  dossiês:        ${meta.dossiers.map((d) => `${d.slug}(${d.count})`).join(", ")}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
