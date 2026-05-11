import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";
import { cache } from "react";
import type { DossierMap, FullRecord, IndexMeta, SearchRecord } from "./types";

const IDX_DIR = path.join(process.cwd(), "public", "idx");

export const loadSearchIndex = cache(async (): Promise<SearchRecord[]> => {
  const raw = await fs.readFile(path.join(IDX_DIR, "search.json"), "utf-8");
  return JSON.parse(raw);
});

export const loadMeta = cache(async (): Promise<IndexMeta> => {
  const raw = await fs.readFile(path.join(IDX_DIR, "meta.json"), "utf-8");
  return JSON.parse(raw);
});

export const loadDossiers = cache(async (): Promise<DossierMap> => {
  const raw = await fs.readFile(path.join(IDX_DIR, "dossiers.json"), "utf-8");
  return JSON.parse(raw);
});

export async function loadRecord(id: string): Promise<FullRecord | null> {
  const safe = id.replace(/[^A-Za-z0-9._-]/g, "_");
  try {
    const raw = await fs.readFile(
      path.join(IDX_DIR, "records", `${safe}.json`),
      "utf-8",
    );
    return JSON.parse(raw);
  } catch (err: unknown) {
    if (
      err &&
      typeof err === "object" &&
      "code" in err &&
      (err as { code: string }).code === "ENOENT"
    ) {
      return null;
    }
    throw err;
  }
}

export { typeLabel, agencyLabel, formatDate, prettifyTitle } from "./format";
