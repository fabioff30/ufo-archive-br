import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/components/seo/og-image";

export const contentType = OG_CONTENT_TYPE;
export const size = OG_SIZE;
export const alt = "Perguntas frequentes sobre o Arquivo OVNI/UAP BR";

export default async function OgImage() {
  return renderOgImage({
    eyebrow: "Perguntas frequentes",
    title: "Dez respostas diretas sobre o arquivo do Pentágono.",
    stamp: "FAQ",
    hint: "Release 01, autenticidade, tradução, citação",
  });
}
