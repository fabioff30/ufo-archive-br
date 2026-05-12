import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/components/seo/og-image";

export const contentType = OG_CONTENT_TYPE;
export const size = OG_SIZE;
export const alt = "Sobre o Arquivo OVNI/UAP BR";

export default async function OgImage() {
  return renderOgImage({
    eyebrow: "Sobre · metodologia · créditos",
    title: "Um arquivo do governo, organizado em português.",
    stamp: "Sobre",
    hint: "Metodologia, créditos e política de citação",
  });
}
