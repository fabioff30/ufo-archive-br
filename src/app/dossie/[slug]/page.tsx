import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { agencyLabel, formatDate, loadDossiers, loadSearchIndex, typeLabel } from "@/lib/data";
import type { SearchRecord } from "@/lib/types";
import { JsonLd } from "@/components/seo/json-ld";
import { PUBLISHER, SITE } from "@/lib/site";
import { DOSSIERS, getDossierBySlug } from "@/lib/dossiers";

/**
 * Resolves the records that belong to a dossier.
 *
 * Two sources of truth combine here:
 *  1. Definitions in src/lib/dossiers.ts (curated intros + optional hand
 *     -picked recordIds).
 *  2. The data-tagged dossier map at public/idx/dossiers.json (records that
 *     carry the dossier slug in their `dossiers` field — derived at build
 *     time from the source release).
 *
 * For data-driven dossiers (biologics, hearings) the `autoTag` matches the
 * map's key; for curated dossiers (apollo, foofighters, blue-book-1947)
 * we use the explicit recordIds list.
 */
async function resolveDossier(slug: string) {
  const def = getDossierBySlug(slug);
  if (!def) return null;

  const dataMap = await loadDossiers();
  const ids = new Set<string>();
  if (def.autoTag && dataMap[def.autoTag]) {
    for (const id of dataMap[def.autoTag].recordIds) ids.add(id);
  }
  if (def.recordIds) {
    for (const id of def.recordIds) ids.add(id);
  }
  return { def, ids };
}

export async function generateStaticParams() {
  return DOSSIERS.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const def = getDossierBySlug(slug);
  if (!def) return { title: "Dossiê não encontrado" };
  const canonical = `/dossie/${slug}`;
  return {
    title: `Dossiê: ${def.title}`,
    description: def.blurb,
    alternates: { canonical },
    openGraph: {
      title: `Dossiê: ${def.title} — Arquivo OVNI/UAP`,
      description: def.blurb,
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
  const resolved = await resolveDossier(slug);
  if (!resolved) notFound();
  const { def, ids } = resolved;

  const all = await loadSearchIndex();
  const records = all.filter((r) => ids.has(r.id));

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
    name: `Dossiê: ${def.title}`,
    description: def.blurb,
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
      { "@type": "ListItem", position: 2, name: `Dossiê: ${def.title}`, item: dossierUrl },
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
            {records.length} documentos
          </span>
        </div>
        <h1 className="font-display text-[30px] font-medium leading-[1.1] tracking-tight sm:text-[40px] sm:leading-[1.05] lg:text-[60px]">
          {def.title}
        </h1>
        <p className="max-w-[62ch] font-display text-[20px] leading-relaxed text-ink-soft md:text-[22px]">
          {def.blurb}
        </p>

        {/* Expanded editorial intro — split on blank lines into paragraphs,
            optimized as standalone passages for LLM/AI quoting. */}
        <div className="max-w-[65ch] space-y-4 pt-2 text-[16px] leading-relaxed text-ink-soft md:text-[17px]">
          {def.intro.split(/\n\n+/).map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
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
