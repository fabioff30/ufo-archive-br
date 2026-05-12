import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { agencyLabel, formatDate, loadDossiers, loadSearchIndex, typeLabel } from "@/lib/data";
import type { SearchRecord } from "@/lib/types";
import { JsonLd } from "@/components/seo/json-ld";
import { PUBLISHER, SITE } from "@/lib/site";

export async function generateStaticParams() {
  const dossiers = await loadDossiers();
  return Object.keys(dossiers).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const dossiers = await loadDossiers();
  const d = dossiers[slug];
  if (!d) return { title: "Dossiê não encontrado" };
  const description =
    d.blurb || `${d.recordIds.length} documentos sobre ${d.title}.`;
  const canonical = `/dossie/${slug}`;
  return {
    title: `Dossiê: ${d.title}`,
    description,
    alternates: { canonical },
    openGraph: {
      title: `Dossiê: ${d.title} — Arquivo OVNI/UAP`,
      description,
      url: `${SITE.origin}${canonical}/`,
      type: "website",
    },
  };
}

export default async function DossierPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [dossiers, all] = await Promise.all([loadDossiers(), loadSearchIndex()]);
  const dossier = dossiers[slug];
  if (!dossier) notFound();

  const idSet = new Set(dossier.recordIds);
  const records = all.filter((r) => idSet.has(r.id));

  const byAgency = groupBy(records, (r) => r.agency);

  const dossierUrl = `${SITE.origin}/dossie/${slug}/`;

  // Cap mainEntity item list at 50 to keep JSON-LD payload reasonable on
  // dossiers with hundreds of records (biologics = 330). Declare the true
  // size via numberOfItems so crawlers know there's more.
  const itemList = records.slice(0, 50).map((r, idx) => ({
    "@type": "ListItem",
    position: idx + 1,
    url: `${SITE.origin}/registro/${encodeURIComponent(r.id)}/`,
    name: prettify(r.title),
  }));

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `Dossiê: ${dossier.title}`,
    description: dossier.blurb || `${dossier.recordIds.length} documentos sobre ${dossier.title}.`,
    url: dossierUrl,
    inLanguage: SITE.language,
    isAccessibleForFree: true,
    publisher: PUBLISHER,
    isPartOf: { "@type": "WebSite", name: SITE.name, url: `${SITE.origin}/` },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: records.length,
      itemListElement: itemList,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Arquivo", item: `${SITE.origin}/` },
      { "@type": "ListItem", position: 2, name: `Dossiê: ${dossier.title}`, item: dossierUrl },
    ],
  };

  return (
    <div className="mx-auto max-w-5xl px-6 py-12 md:py-16">
      <JsonLd data={[collectionSchema, breadcrumbSchema]} />
      <Link
        href="/"
        className="ink-accent-link font-mono text-[0.62rem] uppercase tracking-stamp"
      >
        ← Arquivo completo
      </Link>

      <header className="mt-8 space-y-6 border-b border-rule pb-10">
        <div className="flex items-center gap-3">
          <span className="stamp border-accent text-accent">Dossiê temático</span>
          <span className="font-mono text-[0.62rem] uppercase tracking-stamp text-ink-muted">
            {dossier.recordIds.length} documentos
          </span>
        </div>
        <h1 className="font-display text-[30px] font-medium leading-[1.1] tracking-tight sm:text-[40px] sm:leading-[1.05] lg:text-[60px]">
          {dossier.title}
        </h1>
        {dossier.blurb ? (
          <p className="max-w-[62ch] font-display text-[20px] leading-relaxed text-ink-soft md:text-[22px]">
            {dossier.blurb}
          </p>
        ) : null}
      </header>

      <section className="mt-10 space-y-12">
        {Object.entries(byAgency).map(([agency, items]) => (
          <div key={agency} className="space-y-4">
            <h2 className="flex items-baseline gap-3 font-mono text-[0.7rem] uppercase tracking-stamp text-ink-muted">
              <span>{agencyLabel(agency)}</span>
              <span className="text-ink-faint">{items.length}</span>
            </h2>
            <ol className="space-y-2">
              {items.map((r, idx) => (
                <li key={r.id}>
                  <DossierItem record={r} index={idx} />
                </li>
              ))}
            </ol>
          </div>
        ))}
      </section>
    </div>
  );
}

function DossierItem({
  record,
  index,
}: {
  record: SearchRecord;
  index: number;
}) {
  return (
    <Link
      href={`/registro/${encodeURIComponent(record.id)}`}
      className="reveal-fast group block border-b border-rule py-4 transition-colors hover:border-accent"
      style={{ animationDelay: `${Math.min(index, 12) * 30}ms` }}
    >
      <div className="flex items-baseline justify-between gap-4">
        <span className="min-w-0 flex-1 font-display text-lg leading-snug [overflow-wrap:anywhere] group-hover:text-accent">
          {prettify(record.title)}
        </span>
        <span className="shrink-0 font-mono text-[0.62rem] uppercase tracking-stamp text-ink-faint">
          {typeLabel(record.type)}
        </span>
      </div>
      {(() => {
        const b = record.blurb_pt || record.blurb;
        if (!b) return null;
        return (
          <p className="mt-2 max-w-[68ch] text-sm leading-relaxed text-ink-muted [overflow-wrap:anywhere]">
            {b.length > 220 ? `${b.slice(0, 217)}…` : b}
          </p>
        );
      })()}
      <div className="mt-2 font-mono text-[0.6rem] uppercase tracking-stamp text-ink-faint">
        {formatDate(record.incident_date) || formatDate(record.release_date)}
        {record.incident_location && record.incident_location !== "N/A"
          ? ` · ${record.incident_location}`
          : ""}
      </div>
    </Link>
  );
}

function groupBy<T, K extends string>(items: T[], key: (t: T) => K): Record<K, T[]> {
  return items.reduce(
    (acc, item) => {
      const k = key(item);
      (acc[k] ||= []).push(item);
      return acc;
    },
    {} as Record<K, T[]>,
  );
}

function prettify(t: string): string {
  if (/^[\w-]+$/.test(t) && t.includes("_")) {
    return t.replace(/_/g, " ");
  }
  return t;
}
