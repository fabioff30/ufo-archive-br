import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/json-ld";
import { PUBLISHER, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Perguntas frequentes",
  description:
    "FAQ sobre o Arquivo OVNI/UAP BR: o que é o Release 01, autenticidade dos documentos, como acessar os PDFs originais, política de tradução, como citar.",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "Perguntas frequentes — Arquivo OVNI/UAP",
    description:
      "10 respostas diretas sobre o Release 01 do Pentágono e como o arquivo foi montado em PT-BR.",
    url: `${SITE.origin}/faq/`,
    type: "website",
  },
};

// Canonical Q&A in PT-BR. Optimized for both Google rich results (FAQPage
// schema below) and AI citation — each answer is 1-3 short paragraphs that
// stand alone as a quote.
const FAQ: { question: string; answer: string }[] = [
  {
    question: "O que é o Release 01 do Pentágono?",
    answer:
      "Em maio de 2026, o Departamento de Defesa dos Estados Unidos publicou em war.gov a primeira leva oficial de documentos desclassificados sobre Fenômenos Aéreos Não Identificados (UAPs, antiga sigla UFO). São 1.150 registros vindos de cinco agências: FBI (arquivo 62-HQ-83894, 1947–1968), USAF Project Blue Book (1947–1969), NASA (missões Apollo e Gemini), Departamento de Guerra (1944 em diante) e Departamento de Estado. O conjunto inclui memorandos internos, transcrições de voz, relatórios de inteligência, fotografias e correspondência diplomática.",
  },
  {
    question: "O que é UAP? É a mesma coisa que OVNI?",
    answer:
      "UAP significa Unidentified Aerial Phenomenon (ou Unidentified Anomalous Phenomenon, em revisões mais recentes). É o termo oficial adotado pelos governos americano e francês desde 2017, substituindo UFO/OVNI por considerá-lo neutro — UAP cobre fenômenos no ar, no espaço e no mar, sem comprometer-se com a hipótese de objeto físico. Em português brasileiro, OVNI segue sendo o termo coloquial; UAP é usado em documentos técnicos e oficiais.",
  },
  {
    question: "Esses documentos são autênticos?",
    answer:
      "Sim. Todos vêm da publicação oficial em https://www.war.gov/medialink/ufo/release_1/, que é o portal de mídia do Departamento de Defesa dos EUA. Cada registro neste arquivo tem um botão \"Baixar PDF\" que leva diretamente ao arquivo original no war.gov. A autenticidade é verificável pelo domínio governamental .gov e pelo SSL/HTTPS do servidor.",
  },
  {
    question: "Por que o Pentágono liberou esses documentos agora?",
    answer:
      "A liberação responde a pressões legislativas acumuladas desde 2017, incluindo o estabelecimento da AARO (All-domain Anomaly Resolution Office) em 2022, audiências no Congresso em 2023–2024 e dispositivos do NDAA (National Defense Authorization Act) que obrigam o Pentágono a publicar arquivos sobre UAPs. O Release 01 é o primeiro corpus consolidado; releases adicionais estão previstos.",
  },
  {
    question: "Como foi feita a tradução para o português?",
    answer:
      "A tradução é automática, feita por IA — especificamente Google Gemini 3.1 Flash Lite, via OpenRouter. Cada documento foi traduzido em chunks com prompt sóbrio (jornalismo, sem floreios) e cache por hash de conteúdo. Toda página de registro mostra um aviso visível de \"tradução automática\" e mantém o texto original em inglês acessível via toggle. Para citação acadêmica ou jornalística, recomendamos consultar a versão em inglês.",
  },
  {
    question: "Posso citar este arquivo em trabalhos acadêmicos?",
    answer:
      "Sim, com ressalvas. Para citação formal, cite a fonte primária (URL do war.gov constante em cada registro), não esta página em PT-BR. Este arquivo serve como índice e tradução orientativa em português; a autoridade da informação está no documento original em inglês. Se quiser referenciar a curadoria editorial, atribua a \"Arquivo OVNI/UAP BR (FF Media), 2026\", acrescentando o link permanente do registro.",
  },
  {
    question: "Como acesso os PDFs originais?",
    answer:
      "Em cada página de registro, há uma seção \"Arquivo original\" com botão \"Baixar PDF\" (ou JPG/MP4 conforme o tipo) apontando direto para o arquivo no war.gov. Não há intermediação: o download vem do servidor oficial do Departamento de Defesa, em domínio público nos EUA.",
  },
  {
    question: "Quais agências liberaram documentos?",
    answer:
      "Cinco agências federais dos EUA: (1) USAF Project Blue Book, 553 registros — programa de investigação da Força Aérea ativo entre 1952 e 1969; (2) FBI, 466 registros — concentrados no arquivo 62-HQ-83894 sobre discos voadores; (3) Department of War, 105 registros — incluindo material da Segunda Guerra Mundial e SHAEF; (4) NASA, 14 registros — transcrições das missões Apollo 12, Apollo 17 e Gemini VII, mais materiais visuais; (5) Department of State, 8 registros — correspondência diplomática.",
  },
  {
    question: "Quando o próximo release sai?",
    answer:
      "O Pentágono não divulgou cronograma público para releases adicionais. Releases subsequentes (Release 02 em diante) devem trazer documentos de outras agências e períodos não cobertos por esta primeira leva, mas dependem de revisão de classificação e priorização interna. Este arquivo será atualizado quando novos materiais forem liberados.",
  },
  {
    question: "Quem mantém o Arquivo OVNI/UAP BR?",
    answer:
      "O arquivo é um projeto da FF Media (https://www.ffmedia.com.br/), editado por Fábio Figueiroa, jornalista e desenvolvedor. A iniciativa é independente e sem fins comerciais: agrega, traduz e indexa material em domínio público para tornar acessível ao leitor brasileiro. Os metadados estruturados (vínculos de similaridade, classificação por dossiê) vêm do projeto público github.com/zexiro/uap-disclosure-archive.",
  },
];

export default function FaqPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    url: `${SITE.origin}/faq/`,
    inLanguage: SITE.language,
    publisher: PUBLISHER,
    mainEntity: FAQ.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Arquivo", item: `${SITE.origin}/` },
      { "@type": "ListItem", position: 2, name: "FAQ", item: `${SITE.origin}/faq/` },
    ],
  };

  return (
    <article className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <JsonLd data={[faqSchema, breadcrumbSchema]} />

      <Link
        href="/"
        className="ink-accent-link font-mono text-[0.62rem] uppercase tracking-stamp"
      >
        ← Voltar ao arquivo
      </Link>

      <p className="mt-8 font-mono text-[0.62rem] uppercase tracking-stamp text-ink-muted">
        Perguntas frequentes
      </p>
      <h1 className="mt-4 font-display text-[30px] font-medium leading-[1.1] tracking-tight sm:text-[44px] sm:leading-[1.05] lg:text-[56px]">
        Dez respostas <span className="text-accent">diretas</span> sobre o
        arquivo.
      </h1>

      <p className="mt-8 max-w-[60ch] font-display text-[18px] leading-[1.65] text-ink-soft md:text-[20px]">
        O que é o Release 01, como o material foi traduzido, como acessar a
        fonte original e como citar com responsabilidade — tudo num só lugar.
      </p>

      <dl className="mt-12 space-y-10">
        {FAQ.map((item, idx) => (
          <div
            key={item.question}
            className="border-t border-rule pt-8 first:border-t-0 first:pt-0"
          >
            <dt>
              <p className="font-mono text-[0.62rem] uppercase tracking-stamp text-ink-muted">
                №&nbsp;{String(idx + 1).padStart(2, "0")}
              </p>
              <h2 className="mt-2 font-display text-[24px] font-medium leading-[1.2] tracking-tight md:text-[28px]">
                {item.question}
              </h2>
            </dt>
            <dd className="mt-4 max-w-[65ch] text-[16px] leading-relaxed text-ink-soft md:text-[17px]">
              {item.answer}
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-16 border-t border-rule pt-8">
        <p className="text-sm leading-relaxed text-ink-muted">
          Outras dúvidas? Em <Link href="/sobre" className="ink-accent-link">/sobre</Link>{" "}
          você encontra metodologia detalhada, créditos editoriais e canais de
          contato.
        </p>
      </div>
    </article>
  );
}
