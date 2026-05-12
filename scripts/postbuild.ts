// Post-build cleanup for static export.
// next build with `output: "export"` copies every file from /public into /out.
// We use that fact to feed the build (search-index.json + idx/), but those
// files have no purpose at runtime — the data was already inlined into the
// generated HTML/RSC payloads. Strip them to keep the deploy lean.

import { promises as fs } from "node:fs";
import path from "node:path";

const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, "out");

const REMOVE_PATHS = [
  "idx",
  "search-index.json",
];

async function pathSize(p: string): Promise<number> {
  try {
    const stat = await fs.stat(p);
    if (stat.isFile()) return stat.size;
    // recurse
    const entries = await fs.readdir(p);
    let total = 0;
    for (const name of entries) total += await pathSize(path.join(p, name));
    return total;
  } catch {
    return 0;
  }
}

async function main(): Promise<void> {
  try {
    await fs.access(OUT_DIR);
  } catch {
    // If out/ doesn't exist after `next build`, output: "export" was NOT
    // honored — typically a config-loading issue on the host. Dump the
    // filesystem so the CI log shows where Next actually wrote.
    console.error("[postbuild] FATAL: out/ not found after next build.");
    console.error("[postbuild] Listing project root:");
    const entries = await fs.readdir(ROOT, { withFileTypes: true });
    for (const e of entries) {
      const size = e.isDirectory() ? "(dir)" : "";
      console.error(`  ${e.name} ${size}`);
    }
    try {
      const dotnext = await fs.readdir(path.join(ROOT, ".next"));
      console.error(`[postbuild] .next/ has ${dotnext.length} entries: ${dotnext.slice(0, 8).join(", ")}…`);
    } catch {
      console.error("[postbuild] .next/ also missing");
    }
    console.error("[postbuild] Hint: confirm next.config.{js,mjs} has output: 'export' and is being loaded.");
    process.exit(1);
  }

  let removed = 0;
  for (const rel of REMOVE_PATHS) {
    const p = path.join(OUT_DIR, rel);
    const size = await pathSize(p);
    if (size === 0) continue;
    await fs.rm(p, { recursive: true, force: true });
    removed += size;
    console.log(`[postbuild]  removed ${rel} (${(size / 1024 / 1024).toFixed(1)} MB)`);
  }
  console.log(
    `[postbuild] static export ready — ${(removed / 1024 / 1024).toFixed(1)} MB trimmed.`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
