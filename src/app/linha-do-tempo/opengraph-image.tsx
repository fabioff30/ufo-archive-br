import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/components/seo/og-image";
import { TIMELINE } from "@/lib/timeline";

export const contentType = OG_CONTENT_TYPE;
export const size = OG_SIZE;
export const alt = "Linha do tempo do disclosure UAP — 1944 a 2026";

export default async function OgImage() {
  const first = TIMELINE[0].year;
  const last = TIMELINE[TIMELINE.length - 1].year;
  return renderOgImage({
    eyebrow: `Linha do tempo · ${first}—${last}`,
    title: "Oitenta e dois anos de documentos sobre o céu.",
    stamp: "Cronologia",
    hint: `${TIMELINE.length} marcos · de foofighters ao Release 01`,
  });
}
