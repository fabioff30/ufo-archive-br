import Link from "next/link";
import { loadMeta, loadSearchIndex } from "@/lib/data";
import { ArchiveClient } from "@/components/archive/client";

export default async function HomePage() {
  const [records, meta] = await Promise.all([loadSearchIndex(), loadMeta()]);

  return (
    <div>
      <Hero meta={meta} />
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <ArchiveClient records={records} meta={meta} />
      </section>
    </div>
  );
}

function Hero({
  meta,
}: {
  meta: Awaited<ReturnType<typeof loadMeta>>;
}) {
  const featured = meta.dossiers;
  return (
    <section className="relative overflow-hidden border-b border-rule">
      <div className="mx-auto max-w-6xl px-6 pt-14 pb-20 md:pt-20 md:pb-24">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr] md:items-end">
          <div className="space-y-6 reveal-fast">
            <div className="flex flex-wrap items-center gap-3">
              <span className="stamp border-accent text-accent">Release 01</span>
              <span className="font-mono text-[0.62rem] uppercase tracking-stamp text-ink-muted">
                Maio de 2026 · war.gov
              </span>
            </div>
            <h1 className="font-display text-[44px] font-medium leading-[1.04] tracking-tight md:text-[64px]">
              O que o Pentágono <em className="not-italic text-accent">finalmente</em>{" "}
              liberou sobre UAPs,{" "}
              <span className="text-ink-muted">indexado em português.</span>
            </h1>
            <p className="max-w-[58ch] text-[17px] leading-relaxed text-ink-soft md:text-[18px]">
              {meta.total.toLocaleString("pt-BR")} documentos do FBI, USAF Project
              Blue Book, NASA, Departamento de Guerra e Departamento de Estado —
              busca, filtros e leitura offline-first. Curadoria editorial, fonte
              primária preservada.
            </p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-2 font-mono text-[0.62rem] uppercase tracking-stamp text-ink-muted">
              <Stat value={meta.total} label="registros" />
              <Stat value={meta.media.with_thumb} label="com imagem" />
              <Stat value={meta.media.with_video} label="com vídeo" />
              <Stat value={meta.media.with_text} label="texto integral" />
            </div>
            <p className="pt-2 font-mono text-[0.62rem] uppercase tracking-stamp text-ink-faint">
              Dados compilados a partir de{" "}
              <a
                href="https://github.com/zexiro/uap-disclosure-archive"
                target="_blank"
                rel="noopener noreferrer"
                className="ink-accent-link"
              >
                zexiro/uap-disclosure-archive
              </a>{" "}
              ↗
            </p>
          </div>

          <aside className="border-l border-rule pl-8 md:pl-10">
            <p className="font-mono text-[0.62rem] uppercase tracking-stamp text-ink-muted">
              Dossiês temáticos
            </p>
            <ul className="mt-4 space-y-4">
              {featured.map((d) => (
                <li key={d.slug}>
                  <Link
                    href={`/dossie/${d.slug}`}
                    className="group block border-b border-rule pb-3 transition-colors hover:border-accent"
                  >
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="font-display text-lg leading-tight group-hover:text-accent">
                        {d.title}
                      </span>
                      <span className="font-mono text-[0.7rem] tabular-nums text-ink-faint">
                        {d.count}
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/sobre"
                  className="ink-accent-link font-mono text-[0.65rem] uppercase tracking-stamp"
                >
                  Como o arquivo foi montado →
                </Link>
              </li>
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <span className="flex items-baseline gap-2">
      <span className="font-display text-2xl font-medium tracking-tight text-ink">
        {value.toLocaleString("pt-BR")}
      </span>
      <span className="text-ink-muted">{label}</span>
    </span>
  );
}
