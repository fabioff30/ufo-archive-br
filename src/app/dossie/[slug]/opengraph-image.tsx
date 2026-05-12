import {
  OG_CONTENT_TYPE,
  OG_SIZE,
  renderOgImage,
} from "@/components/seo/og-image";
import { DOSSIERS, getDossierBySlug } from "@/lib/dossiers";
import { loadDossiers, loadSearchIndex } from "@/lib/data";

export const contentType = OG_CONTENT_TYPE;
export const size = OG_SIZE;
export const alt = "Dossiê do Arquivo OVNI/UAP BR";

export async function generateStaticParams() {
  return DOSSIERS.map((d) => ({ slug: d.slug }));
}

export default async function OgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const def = getDossierBySlug(slug);
  if (!def) {
    return renderOgImage({
      eyebrow: "Dossiê não encontrado",
      title: "Arquivo OVNI/UAP",
      stamp: "Erro",
    });
  }

  // Resolve count: either from the data-tag map or hand-curated list
  const [dataMap, all] = await Promise.all([loadDossiers(), loadSearchIndex()]);
  const ids = new Set<string>();
  if (def.autoTag && dataMap[def.autoTag]) {
    for (const id of dataMap[def.autoTag].recordIds) ids.add(id);
  }
  if (def.recordIds) for (const id of def.recordIds) ids.add(id);
  const count = all.filter((r) => ids.has(r.id)).length;

  return renderOgImage({
    eyebrow: `Dossiê temático · ${count} documentos`,
    title: def.title,
    stamp: "Dossiê",
    hint: def.blurb.length > 90 ? def.blurb.slice(0, 87) + "…" : def.blurb,
  });
}
