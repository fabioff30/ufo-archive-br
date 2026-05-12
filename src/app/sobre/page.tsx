import type { Metadata } from "next";
import Link from "next/link";
import { loadMeta } from "@/lib/data";
import { JsonLd } from "@/components/seo/json-ld";
import { AUTHOR_PERSON, PUBLISHER, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sobre o arquivo",
  description:
    "Como o Arquivo OVNI/UAP BR foi montado: fonte primária, escopo, metodologia e contato.",
  alternates: { canonical: "/sobre" },
  openGraph: {
    title: "Sobre o arquivo — Arquivo OVNI/UAP",
    description:
      "Quem fez, qual a metodologia, como foi traduzido e como citar com responsabilidade.",
    url: `${SITE.origin}/sobre/`,
    type: "website",
  },
};

export default async function AboutPage() {
  const meta = await loadMeta();

  const aboutSchema = [
    {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      name: "Sobre o Arquivo OVNI/UAP",
      url: `${SITE.origin}/sobre/`,
      description:
        "Metodologia, fonte primária e crédito editorial do Arquivo OVNI/UAP BR.",
      inLanguage: SITE.language,
      publisher: PUBLISHER,
      mainEntity: AUTHOR_PERSON,
      isPartOf: { "@type": "WebSite", name: SITE.name, url: `${SITE.origin}/` },
    },
    {
      "@context": "https://schema.org",
      ...PUBLISHER,
      description:
        "FF Media — empresa especializada em construir soluções com inteligência artificial.",
      url: PUBLISHER.url,
    },
    {
      "@context": "https://schema.org",
      ...AUTHOR_PERSON,
      description:
        "Jornalista de formação, desenvolvedor de sites e consultor de marketing. Editor do Arquivo OVNI/UAP BR.",
    },
  ];

  return (
    <article className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <JsonLd data={aboutSchema} />
      <p className="font-mono text-[0.62rem] uppercase tracking-stamp text-ink-muted">
        Sobre · metodologia
      </p>
      <h1 className="mt-4 font-display text-[30px] font-medium leading-[1.1] tracking-tight sm:text-[44px] sm:leading-[1.05] lg:text-[56px]">
        Um arquivo do governo,{" "}
        <span className="text-accent">organizado em português.</span>
      </h1>

      <div className="mt-10 space-y-8 font-display text-[18px] leading-[1.65] text-ink-soft md:text-[20px]">
        <p>
          Em maio de 2026 o Departamento de Defesa dos Estados Unidos publicou a{" "}
          <a
            href="https://www.war.gov/medialink/ufo/release_1/"
            target="_blank"
            rel="noopener noreferrer"
            className="ink-accent-link"
          >
            Release 01
          </a>{" "}
          do programa UAP — {meta.total.toLocaleString("pt-BR")} documentos vindos
          do FBI, da USAF, da NASA, do Departamento de Guerra e do Departamento
          de Estado. Esse acervo nunca tinha sido apresentado em conjunto,
          indexado e em português brasileiro. É o que este site faz.
        </p>
        <p>
          Não somos jornal nem instituição oficial. Somos uma editoria
          independente que organizou o material para leitura e busca. Toda
          referência neste arquivo aponta para a fonte primária em{" "}
          <span className="font-mono text-base">war.gov</span> — qualquer citação
          deve ser conferida lá.
        </p>

        <hr className="border-rule" />

        <h2 className="font-display text-[26px] font-medium tracking-tight text-ink">
          O que está aqui
        </h2>
        <ul className="space-y-3 text-[17px] leading-relaxed text-ink-soft">
          <li className="flex gap-4">
            <span className="mt-2 inline-block h-px w-6 shrink-0 bg-rule" />
            <span>
              <strong className="font-display text-ink">
                Arquivo de caso, imagens, vídeos e PDFs
              </strong>{" "}
              — total de {meta.total.toLocaleString("pt-BR")} registros, agrupados
              por agência, tipo e década do incidente.
            </span>
          </li>
          <li className="flex gap-4">
            <span className="mt-2 inline-block h-px w-6 shrink-0 bg-rule" />
            <span>
              <strong className="font-display text-ink">
                Dossiês temáticos
              </strong>{" "}
              — leituras curadas a partir de marcadores presentes nos próprios
              documentos. Por ora:{" "}
              {meta.dossiers
                .map((d) => `${d.title.toLowerCase()} (${d.count})`)
                .join("; ")}
              .
            </span>
          </li>
          <li className="flex gap-4">
            <span className="mt-2 inline-block h-px w-6 shrink-0 bg-rule" />
            <span>
              <strong className="font-display text-ink">
                Busca textual no navegador
              </strong>{" "}
              — o índice de busca cabe no seu navegador, sem chamada a servidor
              externo. Métricas anônimas de uso do site são coletadas via
              Google Analytics.
            </span>
          </li>
        </ul>

        <hr className="border-rule" />

        <h2 className="font-display text-[26px] font-medium tracking-tight text-ink">
          Sobre as traduções
        </h2>
        <p>
          Os resumos e, quando disponíveis, as transcrições são apresentados em{" "}
          <strong className="font-medium text-ink">português brasileiro</strong>{" "}
          a partir de tradução automática feita por IA (Claude). A tradução é
          revisada apenas por máquina — não passa por revisão humana sistemática.
          O texto original em inglês fica sempre acessível em cada página, e a
          fonte primária em <span className="font-mono text-base">war.gov</span>{" "}
          é a referência autoritativa para qualquer citação.
        </p>

        <hr className="border-rule" />

        <h2 className="font-display text-[26px] font-medium tracking-tight text-ink">
          O que não está aqui
        </h2>
        <ul className="space-y-3 text-[17px] leading-relaxed text-ink-soft">
          <li className="flex gap-4">
            <span className="mt-2 inline-block h-px w-6 shrink-0 bg-rule" />
            <span>
              Revisão humana das traduções. Para citações acadêmicas ou
              jornalísticas, sempre confira no texto original.
            </span>
          </li>
          <li className="flex gap-4">
            <span className="mt-2 inline-block h-px w-6 shrink-0 bg-rule" />
            <span>
              Interpretação editorial ou teorias. O arquivo apenas torna o
              material legível e pesquisável.
            </span>
          </li>
          <li className="flex gap-4">
            <span className="mt-2 inline-block h-px w-6 shrink-0 bg-rule" />
            <span>
              Releases posteriores. Quando o governo norte-americano publicar
              novas levas, o arquivo será atualizado.
            </span>
          </li>
        </ul>

        <hr className="border-rule" />

        <h2 className="font-display text-[26px] font-medium tracking-tight text-ink">
          Quem fez
        </h2>
        <p>
          Este arquivo é um projeto da{" "}
          <a
            href="https://www.ffmedia.com.br/"
            target="_blank"
            rel="noopener noreferrer"
            className="ink-accent-link font-medium"
          >
            FF Media
          </a>
          , empresa especializada em construir soluções com inteligência
          artificial — produtos, automações e interfaces que conectam dados
          públicos a leitores em português.
        </p>

        <div className="not-prose mt-6 flex flex-col gap-6 border-y border-rule py-8 sm:flex-row sm:items-start sm:gap-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/fabio-perfil.webp"
            alt="Fábio Figueiroa"
            loading="lazy"
            width={400}
            height={400}
            className="h-28 w-28 shrink-0 rounded-full border border-rule object-cover sm:h-32 sm:w-32"
          />
          <div className="space-y-3">
            <div>
              <p className="font-mono text-[0.62rem] uppercase tracking-stamp text-ink-muted">
                Editor
              </p>
              <p className="mt-1 font-display text-[22px] font-medium leading-tight tracking-tight">
                Fábio Figueiroa
              </p>
            </div>
            <p className="text-[15px] leading-relaxed text-ink-soft">
              Jornalista de formação, desenvolvedor de sites, consultor de
              marketing e entusiasta de inteligência artificial. Criei este
              arquivo para trazer ao leitor brasileiro material que, em geral,
              só circula em inglês.
            </p>
            <ul className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-[0.65rem] uppercase tracking-stamp text-ink-muted">
              <li>
                <a
                  href="https://fabiofariasf.com.br"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent"
                >
                  fabiofariasf.com.br ↗
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/in/fabiofariasf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent"
                >
                  LinkedIn ↗
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/fabioff30"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent"
                >
                  GitHub ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p>
          Os documentos estão em domínio público nos EUA. O índice estruturado
          deste arquivo — metadados, blurbs em inglês, vínculos de similaridade
          e classificação por dossiê — vem do projeto público{" "}
          <a
            href="https://github.com/zexiro/uap-disclosure-archive"
            target="_blank"
            rel="noopener noreferrer"
            className="ink-accent-link font-mono text-base"
          >
            zexiro/uap-disclosure-archive
          </a>
          {" "}no GitHub. O design, a tradução automática para PT-BR e a curadoria
          deste site são iniciativa independente da FF Media. Sugestões e
          correções podem ser abertas como issue no repositório original.
        </p>

        <div className="pt-4">
          <Link
            href="/"
            className="stamp border-ink text-ink hover:bg-ink hover:text-paper"
          >
            ← Voltar ao arquivo
          </Link>
        </div>
      </div>
    </article>
  );
}
