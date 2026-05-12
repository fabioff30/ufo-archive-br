import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/json-ld";
import { PUBLISHER, SITE } from "@/lib/site";
import { TIMELINE, type TimelineEvent } from "@/lib/timeline";

export const metadata: Metadata = {
  title: "Linha do tempo do disclosure UAP",
  description:
    "1944 a 2026: marcos do dossiê UAP/OVNI norte-americano — foofighters, Roswell, Project Blue Book, AATIP, AARO, Release 01. Curadoria cronológica com links para os documentos primários.",
  alternates: { canonical: "/linha-do-tempo" },
  openGraph: {
    title: "Linha do tempo do disclosure UAP — Arquivo OVNI/UAP",
    description:
      "1944 → 2026. Marcos do programa UAP americano com links para os documentos.",
    url: `${SITE.origin}/linha-do-tempo/`,
    type: "website",
  },
};

const CATEGORY_LABELS: Record<TimelineEvent["category"], string> = {
  incident: "Incidente",
  program: "Programa",
  policy: "Política",
  publication: "Publicação",
  release: "Desclassificação",
};

export default function TimelinePage() {
  // Schema: a CollectionPage with an ItemList of events, each event modeled
  // as a CreativeWork with temporalCoverage. Good for both Google Discover
  // and AI citation ("the AATIP program was created in 2007").
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Linha do tempo do disclosure UAP",
    description:
      "Marcos do dossiê UAP/OVNI norte-americano de 1944 a 2026.",
    url: `${SITE.origin}/linha-do-tempo/`,
    inLanguage: SITE.language,
    publisher: PUBLISHER,
    isPartOf: { "@type": "WebSite", name: SITE.name, url: `${SITE.origin}/` },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: TIMELINE.length,
      itemListElement: TIMELINE.map((ev, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        item: {
          "@type": "CreativeWork",
          name: ev.title,
          description: ev.description,
          temporalCoverage: String(ev.year),
          url: ev.recordHref ? `${SITE.origin}${ev.recordHref}` : undefined,
        },
      })),
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Arquivo", item: `${SITE.origin}/` },
      { "@type": "ListItem", position: 2, name: "Linha do tempo", item: `${SITE.origin}/linha-do-tempo/` },
    ],
  };

  return (
    <article className="mx-auto max-w-4xl px-6 py-16 md:py-24">
      <JsonLd data={[itemListSchema, breadcrumbSchema]} />

      <Link
        href="/"
        className="ink-accent-link font-mono text-[0.62rem] uppercase tracking-stamp"
      >
        ← Voltar ao arquivo
      </Link>

      <p className="mt-8 font-mono text-[0.62rem] uppercase tracking-stamp text-ink-muted">
        Linha do tempo · {TIMELINE[0].year}—{TIMELINE[TIMELINE.length - 1].year}
      </p>
      <h1 className="mt-4 font-display text-[30px] font-medium leading-[1.1] tracking-tight sm:text-[44px] sm:leading-[1.05] lg:text-[56px]">
        Oitenta e dois anos de{" "}
        <span className="text-accent">documentos sobre o céu</span>.
      </h1>

      <p className="mt-8 max-w-[60ch] font-display text-[18px] leading-[1.65] text-ink-soft md:text-[20px]">
        De memorandos do SHAEF sobre fenômenos noturnos em 1944 à publicação
        do Release 01 pelo Pentágono em 2026. Cada marco abaixo, quando
        possível, aponta para o documento primário equivalente neste arquivo.
      </p>

      <ol className="mt-16 space-y-12">
        {TIMELINE.map((ev, idx) => (
          <li
            key={`${ev.year}-${ev.title}`}
            className="relative grid gap-2 border-l-2 border-rule pl-6 sm:grid-cols-[110px_1fr] sm:gap-8 sm:border-l-0 sm:pl-0"
          >
            {/* Mobile: year badge inline with marker. Desktop: year column */}
            <div className="-ml-[34px] flex items-baseline gap-3 sm:ml-0 sm:flex-col sm:items-end sm:gap-1 sm:pt-1">
              <span
                aria-hidden
                className="absolute left-[-7px] top-[2px] hidden h-3 w-3 rounded-full border-2 border-paper bg-ink sm:block"
              />
              <span
                aria-hidden
                className="absolute left-[-7px] top-[2px] h-3 w-3 rounded-full border-2 border-paper bg-ink sm:hidden"
              />
              <span className="font-display text-[28px] font-medium leading-none tracking-tight md:text-[32px]">
                {ev.year}
              </span>
              {ev.date ? (
                <span className="font-mono text-[0.6rem] uppercase tracking-stamp text-ink-faint sm:text-right">
                  {ev.date}
                </span>
              ) : null}
            </div>

            <div className="space-y-3 sm:border-l-2 sm:border-rule sm:pl-8">
              <div className="flex flex-wrap items-baseline gap-2">
                <span className="font-mono text-[0.6rem] uppercase tracking-stamp text-accent">
                  {CATEGORY_LABELS[ev.category]}
                </span>
                <span className="font-mono text-[0.6rem] uppercase tracking-stamp text-ink-faint">
                  №&nbsp;{String(idx + 1).padStart(2, "0")} / {TIMELINE.length}
                </span>
              </div>
              <h2 className="font-display text-[22px] font-medium leading-[1.2] tracking-tight md:text-[26px]">
                {ev.title}
              </h2>
              <p className="max-w-[62ch] text-[16px] leading-relaxed text-ink-soft md:text-[17px]">
                {ev.description}
              </p>
              {ev.recordHref || ev.externalHref ? (
                <div className="flex flex-wrap gap-x-5 gap-y-1 pt-1 font-mono text-[0.62rem] uppercase tracking-stamp">
                  {ev.recordHref ? (
                    <Link href={ev.recordHref} className="ink-accent-link">
                      Ver no arquivo →
                    </Link>
                  ) : null}
                  {ev.externalHref ? (
                    <a
                      href={ev.externalHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ink-accent-link"
                    >
                      Referência externa ↗
                    </a>
                  ) : null}
                </div>
              ) : null}
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-20 border-t border-rule pt-8">
        <p className="text-sm leading-relaxed text-ink-muted">
          A linha do tempo é viva — novos marcos serão adicionados quando
          releases adicionais forem publicados pelo Pentágono ou por outras
          agências. Sugestões de eventos faltantes via{" "}
          <a
            href="https://github.com/fabioff30/ufo-archive-br"
            target="_blank"
            rel="noopener noreferrer"
            className="ink-accent-link"
          >
            repositório no GitHub
          </a>
          .
        </p>
      </div>
    </article>
  );
}
