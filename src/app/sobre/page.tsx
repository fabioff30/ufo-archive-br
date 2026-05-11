import type { Metadata } from "next";
import Link from "next/link";
import { loadMeta } from "@/lib/data";

export const metadata: Metadata = {
  title: "Sobre o arquivo",
  description:
    "Como o Arquivo OVNI/UAP BR foi montado: fonte primária, escopo, metodologia e contato.",
};

export default async function AboutPage() {
  const meta = await loadMeta();

  return (
    <article className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <p className="font-mono text-[0.62rem] uppercase tracking-stamp text-ink-muted">
        Sobre · metodologia
      </p>
      <h1 className="mt-4 font-display text-[44px] font-medium leading-[1.05] tracking-tight md:text-[56px]">
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
              — sem servidor, sem rastreamento. O índice de busca cabe no seu
              navegador.
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
          Crédito e contato
        </h2>
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
          deste site são iniciativa independente. Sugestões e correções podem
          ser abertas como issue no repositório original.
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
