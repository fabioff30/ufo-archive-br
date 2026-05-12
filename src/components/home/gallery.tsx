import Link from "next/link";
import { loadRecord, agencyLabel } from "@/lib/data";
import { GALLERY_IDS } from "@/lib/highlights";

export async function Gallery() {
  const records = await Promise.all(GALLERY_IDS.map((id) => loadRecord(id)));
  const valid = records
    .filter((r): r is NonNullable<typeof r> => r !== null)
    .filter((r) =>
      r.type === "IMG" &&
      /\.(png|jpe?g|webp|gif)(?:[?#]|$)/i.test(r.source_url),
    );

  if (valid.length === 0) return null;

  return (
    <section className="border-t border-rule py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <header className="mb-10 flex flex-wrap items-baseline justify-between gap-4">
          <div>
            <p className="font-mono text-[0.62rem] uppercase tracking-stamp text-ink-muted">
              Galeria
            </p>
            <h2 className="mt-2 font-display text-[32px] font-medium leading-tight tracking-tight md:text-[40px]">
              Evidências fotográficas
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-ink-muted">
            Fotografias liberadas pelo FBI e pela NASA. Originais hospedados em{" "}
            <span className="font-mono">war.gov</span>; aqui apenas indexados e
            contextualizados em PT-BR.
          </p>
        </header>

        <ul className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {valid.map((record) => (
            <li key={record.id}>
              <Link
                href={`/registro/${encodeURIComponent(record.id)}`}
                className="group block overflow-hidden border border-rule bg-ink/5"
              >
                <div className="relative aspect-square overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={record.source_url}
                    alt={record.blurb_pt?.slice(0, 80) || record.blurb?.slice(0, 80) || "Evidência fotográfica"}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Hover overlay desktop-only — no hover on touch devices */}
                  <div className="absolute inset-0 hidden flex-col justify-end bg-gradient-to-t from-ink/90 via-ink/40 to-transparent p-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100 md:flex">
                    <p className="font-mono text-[0.55rem] uppercase tracking-stamp text-paper/80">
                      {agencyLabel(record.agency)}
                    </p>
                    <p className="font-display text-xs leading-tight text-paper">
                      Ver registro →
                    </p>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
