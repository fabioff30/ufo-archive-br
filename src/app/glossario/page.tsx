import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/json-ld";
import { PUBLISHER, SITE } from "@/lib/site";
import { GLOSSARY, flatGlossary } from "@/lib/glossary";

export const metadata: Metadata = {
  title: "Glossário UAP/OVNI",
  description:
    "50 termos do vocabulário UAP/OVNI em português brasileiro — siglas, programas, casos emblemáticos, conceitos da escala Hynek. Glossário curado do Arquivo OVNI/UAP BR.",
  alternates: { canonical: "/glossario" },
  openGraph: {
    title: "Glossário UAP/OVNI em português — Arquivo OVNI/UAP",
    description:
      "50 termos do vocabulário UAP/OVNI em PT-BR: siglas, programas, casos, conceitos.",
    url: `${SITE.origin}/glossario/`,
    type: "website",
  },
};

export default function GlossaryPage() {
  const allEntries = flatGlossary();

  // DefinedTermSet wraps DefinedTerm[]. Each entry becomes a passage Google
  // and AI engines can quote directly.
  const glossarySchema = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: "Glossário UAP/OVNI em português brasileiro",
    description:
      "Vocabulário curado de termos do dossiê UAP/OVNI: programas, casos, conceitos técnicos e jargão.",
    url: `${SITE.origin}/glossario/`,
    inLanguage: SITE.language,
    publisher: PUBLISHER,
    hasDefinedTerm: allEntries.map((entry) => ({
      "@type": "DefinedTerm",
      "@id": `${SITE.origin}/glossario/#${entry.slug}`,
      name: entry.term,
      alternateName: entry.alsoKnownAs,
      description: entry.definition,
      inDefinedTermSet: `${SITE.origin}/glossario/`,
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Arquivo", item: `${SITE.origin}/` },
      { "@type": "ListItem", position: 2, name: "Glossário", item: `${SITE.origin}/glossario/` },
    ],
  };

  return (
    <article className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <JsonLd data={[glossarySchema, breadcrumbSchema]} />

      <Link
        href="/"
        className="ink-accent-link font-mono text-[0.62rem] uppercase tracking-stamp"
      >
        ← Voltar ao arquivo
      </Link>

      <p className="mt-8 font-mono text-[0.62rem] uppercase tracking-stamp text-ink-muted">
        Glossário · {allEntries.length} termos
      </p>
      <h1 className="mt-4 font-display text-[30px] font-medium leading-[1.1] tracking-tight sm:text-[44px] sm:leading-[1.05] lg:text-[56px]">
        Vocabulário <span className="text-accent">UAP/OVNI</span> em português.
      </h1>

      <p className="mt-8 max-w-[60ch] font-display text-[18px] leading-[1.65] text-ink-soft md:text-[20px]">
        Siglas, programas, casos e conceitos do dossiê UAP — agrupados por
        tema. Curadoria editorial em PT-BR para apoiar a leitura do arquivo e
        servir como referência canônica em texto jornalístico ou acadêmico.
      </p>

      {/* Navegação por seção */}
      <nav
        aria-label="Seções do glossário"
        className="mt-12 grid gap-x-6 gap-y-2 border-y border-rule py-6 font-mono text-[0.7rem] uppercase tracking-stamp sm:grid-cols-2"
      >
        {GLOSSARY.map((section, idx) => (
          <a
            key={section.heading}
            href={`#section-${idx}`}
            className="text-ink-muted hover:text-accent"
          >
            <span className="text-ink-faint">{String(idx + 1).padStart(2, "0")}.</span>{" "}
            {section.heading} ({section.entries.length})
          </a>
        ))}
      </nav>

      {GLOSSARY.map((section, sectionIdx) => (
        <section
          key={section.heading}
          id={`section-${sectionIdx}`}
          className="mt-16 scroll-mt-8"
        >
          <h2 className="font-display text-[24px] font-medium leading-[1.2] tracking-tight md:text-[28px]">
            <span className="text-ink-faint">
              {String(sectionIdx + 1).padStart(2, "0")}.
            </span>{" "}
            {section.heading}
          </h2>

          <dl className="mt-8 space-y-8">
            {section.entries.map((entry) => (
              <div
                key={entry.slug}
                id={entry.slug}
                className="scroll-mt-8 border-t border-rule pt-6 first:border-t-0 first:pt-0"
              >
                <dt className="space-y-1">
                  <h3 className="font-display text-[20px] font-medium leading-tight tracking-tight md:text-[22px]">
                    <a
                      href={`#${entry.slug}`}
                      className="hover:text-accent"
                      aria-label={`Link permanente para o termo ${entry.term}`}
                    >
                      {entry.term}
                    </a>
                  </h3>
                  {entry.alsoKnownAs && entry.alsoKnownAs.length > 0 ? (
                    <p className="font-mono text-[0.62rem] uppercase tracking-stamp text-ink-faint">
                      Também: {entry.alsoKnownAs.join(" · ")}
                    </p>
                  ) : null}
                </dt>
                <dd className="mt-3 max-w-[65ch] text-[16px] leading-relaxed text-ink-soft md:text-[17px]">
                  {entry.definition}
                </dd>
                {entry.seeAlso && entry.seeAlso.length > 0 ? (
                  <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[0.62rem] uppercase tracking-stamp">
                    {entry.seeAlso.map((link) => (
                      <li key={link.href}>
                        <Link href={link.href} className="ink-accent-link">
                          {link.label} →
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ))}
          </dl>
        </section>
      ))}

      <div className="mt-16 border-t border-rule pt-8">
        <p className="text-sm leading-relaxed text-ink-muted">
          Faltou algum termo? Sugira via issue no{" "}
          <a
            href="https://github.com/fabioff30/ufo-archive-br"
            target="_blank"
            rel="noopener noreferrer"
            className="ink-accent-link"
          >
            repositório do projeto
          </a>
          .
        </p>
      </div>
    </article>
  );
}
