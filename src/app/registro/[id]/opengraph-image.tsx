import {
  OG_CONTENT_TYPE,
  OG_SIZE,
  renderOgImage,
} from "@/components/seo/og-image";
import { agencyLabel, loadRecord, loadSearchIndex, prettifyTitle, typeLabel } from "@/lib/data";

export const contentType = OG_CONTENT_TYPE;
export const size = OG_SIZE;
export const alt = "Registro do Arquivo OVNI/UAP BR";

// Static export support: regenerate one OG image per record at build time.
export async function generateStaticParams() {
  const records = await loadSearchIndex();
  return records.map((r) => ({ id: r.id }));
}

export default async function OgImage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const record = await loadRecord(decodeURIComponent(id));
  if (!record) {
    return renderOgImage({
      eyebrow: "Registro não encontrado",
      title: "Arquivo OVNI/UAP",
      stamp: "Erro",
    });
  }
  return renderOgImage({
    eyebrow: `Registro · ${agencyLabel(record.agency)}`,
    title: prettifyTitle(record.title),
    stamp: typeLabel(record.type),
    hint: record.incident_location && record.incident_location !== "N/A"
      ? `${record.incident_location} · ${record.incident_date || record.release_date}`
      : `${record.incident_date || record.release_date}`,
  });
}
