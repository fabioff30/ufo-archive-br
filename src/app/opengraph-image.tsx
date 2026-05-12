import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/components/seo/og-image";

export const contentType = OG_CONTENT_TYPE;
export const size = OG_SIZE;
export const alt = "Arquivo OVNI/UAP — Documentos do Pentágono em português";

export default async function OgImage() {
  return renderOgImage({
    eyebrow: "Release 01 · Maio 2026 · war.gov",
    title:
      "O que o Pentágono finalmente liberou sobre UAPs, indexado em português.",
    stamp: "Release 01",
    hint: "1.150 documentos · busca em português · domínio público",
  });
}
