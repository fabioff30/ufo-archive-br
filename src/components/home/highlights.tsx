import Link from "next/link";
import { loadRecord, agencyLabel, formatDate, prettifyTitle } from "@/lib/data";
import { HIGHLIGHTS } from "@/lib/highlights";

function imageSrc(record: { type: string; source_url: string }): string | null {
  if (record.type === "IMG" && /\.(png|jpe?g|webp|gif)(?:[?#]|$)/i.test(record.source_url)) {
    return record.source_url;
  }
  return null;
}

export async function Highlights() {
  const records = await Promise.all(
    HIGHLIGHTS.map(async (h) => ({
      hook: h.hook,
      record: await loadRecord(h.id),
    })),
  );
  const valid = records.filter((r) => r.record !== null) as {
    hook: string;
    record: NonNullable<Awaited<ReturnType<typeof loadRecord>>>;
  }[];

  if (valid.length === 0) return null;

  return (
    <section className="border-t border-rule bg-paper-warm/30 py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <header className="mb-10 flex flex-wrap items-baseline justify-between gap-4">
          <div>
            <p className="font-mono text-[0.62rem] uppercase tracking-stamp text-ink-muted">
              Em destaque
            </p>
            <h2 className="mt-2 font-display text-[32px] font-medium leading-tight tracking-tight md:text-[40px]">
              Casos selecionados pela editoria
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-ink-muted">
            Seis documentos que dão a medida do que está no arquivo — da
            Segunda Guerra ao programa Apollo, do FBI à Força Aérea Francesa.
          </p>
        </header>

        <ol className="grid gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {valid.map(({ hook, record }, idx) => {
            const img = imageSrc(record);
            const blurb = (record.blurb_pt || record.blurb || "").slice(0, 180);
            return (
              <li key={record.id} className="group flex flex-col">
                <Link
                  href={`/registro/${encodeURIComponent(record.id)}`}
                  className="flex h-full flex-col gap-3"
                >
                  <div className="overflow-hidden border border-rule bg-ink/5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img || "/sem-imagem.png"}
                      alt={img ? prettifyTitle(record.title) : ""}
                      loading="lazy"
                      className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                    />
                  </div>

                  <p className="font-mono text-[0.6rem] uppercase tracking-stamp text-ink-muted">
                    №&nbsp;{String(idx + 1).padStart(2, "0")} · {agencyLabel(record.agency)}
                  </p>

                  <h3 className="font-display text-[22px] leading-[1.15] tracking-tight [overflow-wrap:anywhere] transition-colors group-hover:text-accent">
                    {hook}
                  </h3>

                  {blurb ? (
                    <p className="text-sm leading-relaxed text-ink-muted [overflow-wrap:anywhere]">
                      {blurb}…
                    </p>
                  ) : null}

                  <div className="mt-auto pt-2 font-mono text-[0.6rem] uppercase tracking-stamp text-ink-faint">
                    {formatDate(record.incident_date) || formatDate(record.release_date)}
                    <span className="ml-2 text-accent">Ler →</span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
