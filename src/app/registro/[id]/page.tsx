import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { agencyLabel, formatDate, loadRecord, loadSearchIndex, typeLabel } from "@/lib/data";
import { RelatedRecords } from "@/components/record/related";
import { JsonLd } from "@/components/seo/json-ld";
import { agencyAsOrganization, AUTHOR_PERSON, PUBLISHER, SITE } from "@/lib/site";
import { getDossierBySlug } from "@/lib/dossiers";

// Look up the human-readable title of a dossier the record belongs to.
// Records carry the data-tag slug (e.g. "biologics"); dossier definitions in
// src/lib/dossiers.ts use the same slug for autoTag-based dossiers.
const dossierLabel = (key: string) => getDossierBySlug(key)?.title ?? key;

export async function generateStaticParams() {
  const records = await loadSearchIndex();
  return records.map((r) => ({ id: r.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const record = await loadRecord(decodeURIComponent(id));
  if (!record) return { title: "Registro não encontrado" };

  const description =
    (record.blurb_pt || record.blurb || "").slice(0, 200) || undefined;
  const canonical = `/registro/${encodeURIComponent(record.id)}`;

  return {
    title: prettify(record.title),
    description,
    alternates: { canonical },
    openGraph: {
      title: prettify(record.title),
      description,
      url: `${SITE.origin}${canonical}/`,
      type: "article",
    },
  };
}

export default async function RecordPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const decoded = decodeURIComponent(id);
  const record = await loadRecord(decoded);
  if (!record) notFound();

  const hasTranslation = Boolean(
    (record.blurb_pt && record.blurb_pt.trim()) ||
      (record.text_pt && record.text_pt.trim()),
  );

  const recordUrl = `${SITE.origin}/registro/${encodeURIComponent(record.id)}/`;
  const image =
    record.type === "IMG" &&
    /\.(png|jpe?g|webp|gif)(?:[?#]|$)/i.test(record.source_url)
      ? record.source_url
      : undefined;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: prettify(record.title),
    description: record.blurb_pt || record.blurb || undefined,
    url: recordUrl,
    inLanguage: record.text_pt ? ["pt-BR", "en"] : ["pt-BR"],
    isAccessibleForFree: true,
    license: "https://creativecommons.org/publicdomain/mark/1.0/",
    author: agencyAsOrganization(record.agency),
    publisher: PUBLISHER,
    editor: AUTHOR_PERSON,
    isPartOf: {
      "@type": "Dataset",
      name: "Documentos desclassificados do Pentágono sobre UAPs — Release 01",
      url: `${SITE.origin}/`,
    },
    ...(record.source_url
      ? {
          isBasedOn: record.source_url,
          mainEntityOfPage: { "@type": "WebPage", "@id": recordUrl },
        }
      : { mainEntityOfPage: { "@type": "WebPage", "@id": recordUrl } }),
    ...(image ? { image: [image] } : {}),
    ...(record.incident_location && record.incident_location !== "N/A"
      ? { contentLocation: { "@type": "Place", name: record.incident_location } }
      : {}),
    keywords: [
      record.agency,
      record.type,
      ...(record.dossiers || []).map((d) => dossierLabel(d)),
    ].filter(Boolean),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Arquivo",
        item: `${SITE.origin}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: prettify(record.title),
        item: recordUrl,
      },
    ],
  };

  return (
    <article className="mx-auto max-w-4xl px-6 py-12 md:py-16">
      <JsonLd data={[articleSchema, breadcrumbSchema]} />
      <Link
        href="/"
        className="ink-accent-link font-mono text-[0.62rem] uppercase tracking-stamp"
      >
        ← Voltar ao arquivo
      </Link>

      {hasTranslation ? (
        <aside
          role="note"
          className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1 border-l-2 border-accent/50 bg-paper-warm/60 px-4 py-3"
        >
          <span className="font-mono text-[0.6rem] uppercase tracking-stamp text-accent">
            Aviso
          </span>
          <span className="text-[13px] leading-snug text-ink-soft">
            Esta página apresenta uma <strong className="font-medium">tradução automática</strong>{" "}
            para português brasileiro feita por IA. O original em inglês está
            preservado e pode ser consultado nos blocos abaixo ou diretamente em{" "}
            <a
              href={record.source_url || "https://www.war.gov/medialink/ufo/release_1/"}
              target="_blank"
              rel="noopener noreferrer"
              className="ink-accent-link"
            >
              war.gov
            </a>
            .
          </span>
        </aside>
      ) : null}

      <header className="mt-8 space-y-6 border-b border-rule pb-10">
        <div className="flex flex-wrap items-center gap-2">
          <span className="stamp border-accent text-accent">
            {record.redacted ? "Parcialmente tarjado" : "Desclassificado"}
          </span>
          <span className="stamp border-rule text-ink-muted">
            {typeLabel(record.type)}
          </span>
          {record.dossiers.map((d) => (
            <Link
              key={d}
              href={`/dossie/${d}`}
              className="stamp border-rule text-ink-muted hover:border-accent hover:text-accent"
            >
              {dossierLabel(d)}
            </Link>
          ))}
        </div>

        <h1 className="font-display text-[26px] font-medium leading-[1.1] tracking-tight [overflow-wrap:anywhere] sm:text-[34px] sm:leading-[1.08] md:text-[48px]">
          {prettify(record.title)}
        </h1>

        <dl className="grid gap-4 text-sm md:grid-cols-3">
          <Meta label="Agência" value={agencyLabel(record.agency)} />
          <Meta label="Data do incidente" value={formatDate(record.incident_date)} />
          <Meta label="Liberação" value={formatDate(record.release_date)} />
          {record.incident_location && record.incident_location !== "N/A" ? (
            <Meta label="Local" value={record.incident_location} />
          ) : null}
          {record.year ? (
            <Meta label="Ano" value={String(record.year)} />
          ) : null}
        </dl>
      </header>

      {(() => {
        const blurbPt = record.blurb_pt?.trim();
        const blurbEn = record.blurb?.trim();
        if (!blurbPt && !blurbEn) return null;
        const showTranslated = Boolean(blurbPt);
        return (
          <section className="mt-10 max-w-[65ch] space-y-3">
            <p className="font-display text-[20px] leading-[1.55] text-ink-soft md:text-[22px]">
              {showTranslated ? blurbPt : blurbEn}
            </p>
            {showTranslated && blurbEn ? (
              <details className="group">
                <summary className="ink-accent-link cursor-pointer font-mono text-[0.62rem] uppercase tracking-stamp marker:hidden list-none">
                  <span className="group-open:hidden">+ Ver original em inglês</span>
                  <span className="hidden group-open:inline">− Ocultar original</span>
                </summary>
                <p className="mt-3 max-w-[65ch] border-l-2 border-rule pl-4 text-[15px] leading-relaxed text-ink-muted">
                  {blurbEn}
                </p>
              </details>
            ) : null}
          </section>
        );
      })()}

      {(() => {
        // Show the image inline only when source_url is a publicly hosted
        // image (war.gov hosts PNG/JPG/etc for IMG-type records).
        const isImage =
          record.type === "IMG" &&
          /\.(png|jpe?g|webp|gif)(?:[?#]|$)/i.test(record.source_url);
        if (!isImage) return null;
        return (
          <figure className="mt-10 overflow-hidden border border-rule bg-ink/5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={record.source_url}
              alt={`Imagem associada a ${prettify(record.title)}`}
              className="block w-full"
              loading="lazy"
            />
            <figcaption className="border-t border-rule px-4 py-3 font-mono text-[0.62rem] uppercase tracking-stamp text-ink-muted">
              Original hospedado em war.gov · domínio público
            </figcaption>
          </figure>
        );
      })()}

      {(() => {
        const textPt = record.text_pt?.trim();
        const textEn = record.text?.trim();
        const hasText = (textPt && textPt.length > 100) || (textEn && textEn.length > 100);
        if (!hasText) {
          return (
            <section className="mt-12 border-t border-rule pt-8">
              <p className="max-w-[60ch] text-sm leading-relaxed text-ink-muted">
                O texto integral deste documento não foi extraído
                automaticamente. Consulte a fonte original para o conteúdo
                completo.
              </p>
            </section>
          );
        }
        const showTranslated = Boolean(textPt && textPt.length > 100);
        return (
          <section className="mt-12 space-y-4">
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="font-mono text-[0.62rem] uppercase tracking-stamp text-ink-muted">
                {showTranslated
                  ? "Transcrição em português"
                  : "Transcrição extraída do documento"}
              </h2>
              {showTranslated ? (
                <span className="font-mono text-[0.6rem] uppercase tracking-stamp text-ink-faint">
                  Tradução automática
                </span>
              ) : null}
            </div>
            <div className="paper-card relative overflow-x-auto p-4 md:p-10">
              <pre className="whitespace-pre-wrap break-words [overflow-wrap:anywhere] font-mono text-[12.5px] leading-[1.65] text-ink-soft md:text-[13.5px]">
{showTranslated ? textPt : textEn}
              </pre>
            </div>
            {showTranslated && textEn && textEn.length > 100 ? (
              <details className="group">
                <summary className="ink-accent-link cursor-pointer font-mono text-[0.62rem] uppercase tracking-stamp list-none">
                  <span className="group-open:hidden">+ Ver transcrição original em inglês</span>
                  <span className="hidden group-open:inline">− Ocultar original</span>
                </summary>
                <div className="paper-card relative mt-3 overflow-x-auto p-4 md:p-10">
                  <pre className="whitespace-pre-wrap break-words [overflow-wrap:anywhere] font-mono text-[12.5px] leading-[1.65] text-ink-muted md:text-[13.5px]">
{textEn}
                  </pre>
                </div>
              </details>
            ) : null}
          </section>
        );
      })()}

      <section className="mt-12 space-y-3 border-t border-rule pt-8">
        <h2 className="font-mono text-[0.62rem] uppercase tracking-stamp text-ink-muted">
          Arquivo original
        </h2>
        {record.source_url ? (
          <cite className="not-italic flex flex-wrap items-center gap-x-4 gap-y-2">
            <a
              href={record.source_url}
              target="_blank"
              rel="noopener noreferrer external"
              download
              className="stamp border-ink text-ink hover:bg-ink hover:text-paper"
            >
              Baixar {fileExtensionLabel(record.source_url)} ↓
            </a>
            <span className="font-mono text-[0.62rem] uppercase tracking-stamp text-ink-faint">
              {sourceHost(record.source_url)} · domínio público
            </span>
          </cite>
        ) : (
          <p className="text-sm leading-relaxed text-ink-muted">
            Este registro não tem um arquivo associado. Consulte a{" "}
            <a
              href="https://www.war.gov/medialink/ufo/release_1/"
              target="_blank"
              rel="noopener noreferrer"
              className="ink-accent-link"
            >
              página oficial da Release 01
            </a>{" "}
            para conteúdo relacionado.
          </p>
        )}
      </section>

      <RelatedRecords items={record.similar_text} title="Documentos textualmente relacionados" />
      <RelatedRecords items={record.similar_image} title="Imagens relacionadas" />
    </article>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1 border-b border-rule pb-3 md:border-b-0 md:border-l md:pb-0 md:pl-3">
      <dt className="font-mono text-[0.6rem] uppercase tracking-stamp text-ink-muted">
        {label}
      </dt>
      <dd className="font-display text-base text-ink">{value || "—"}</dd>
    </div>
  );
}

function prettify(t: string): string {
  if (/^[\w-]+$/.test(t) && t.includes("_")) {
    return t.replace(/_/g, " ");
  }
  return t;
}

function fileExtensionLabel(url: string): string {
  const m = url.match(/\.([a-z0-9]{2,5})(?:[?#]|$)/i);
  if (!m) return "arquivo";
  const ext = m[1].toLowerCase();
  const labels: Record<string, string> = {
    pdf: "PDF",
    jpg: "JPG",
    jpeg: "JPG",
    png: "PNG",
    gif: "GIF",
    webp: "WEBP",
    mp4: "MP4",
    mov: "MOV",
    webm: "WEBM",
    htm: "HTML",
    html: "HTML",
  };
  return labels[ext] || ext.toUpperCase();
}

function sourceHost(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "fonte externa";
  }
}

