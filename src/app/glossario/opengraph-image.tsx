import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/components/seo/og-image";
import { flatGlossary } from "@/lib/glossary";

export const contentType = OG_CONTENT_TYPE;
export const size = OG_SIZE;
export const alt = "Glossário UAP/OVNI em português brasileiro";

export default async function OgImage() {
  return renderOgImage({
    eyebrow: `Glossário · ${flatGlossary().length} termos`,
    title: "Vocabulário UAP/OVNI em português brasileiro.",
    stamp: "Glossário",
    hint: "Siglas, programas, casos emblemáticos, conceitos",
  });
}
