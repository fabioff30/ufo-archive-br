import { loadMeta, loadSearchIndex } from "@/lib/data";
import { ArchiveClient } from "@/components/archive/client";
import { Highlights } from "@/components/home/highlights";
import { Gallery } from "@/components/home/gallery";
import { JsonLd } from "@/components/seo/json-ld";
import { PUBLISHER, SITE } from "@/lib/site";

export default async function HomePage() {
  const [records, meta] = await Promise.all([loadSearchIndex(), loadMeta()]);

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    alternateName: SITE.alternateName,
    url: `${SITE.origin}/`,
    inLanguage: SITE.language,
    description: SITE.description,
    publisher: PUBLISHER,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE.origin}/?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  const datasetSchema = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: "Documentos desclassificados do Pentágono sobre UAPs — Release 01",
    alternateName: "UAP Disclosure Release 01",
    description:
      "1.150 documentos liberados em maio de 2026 pelo Departamento de Defesa dos Estados Unidos: arquivos de caso do FBI, transcrições da NASA, casos da USAF Project Blue Book e correspondências do Departamento de Guerra e do Departamento de Estado. Indexados, traduzidos automaticamente para português brasileiro e cruzados com a fonte primária em war.gov.",
    url: `${SITE.origin}/`,
    isAccessibleForFree: true,
    license: "https://creativecommons.org/publicdomain/mark/1.0/",
    creator: {
      "@type": "Organization",
      name: "United States Department of Defense",
      url: "https://www.war.gov/",
    },
    publisher: PUBLISHER,
    inLanguage: ["pt-BR", "en"],
    keywords: [
      "UAP",
      "OVNI",
      "UFO",
      "Pentágono",
      "FBI",
      "NASA",
      "Project Blue Book",
      "Departamento de Guerra",
      "documentos desclassificados",
      "disclosure",
    ],
    spatialCoverage: "United States",
    temporalCoverage: "1944/2026",
    distribution: {
      "@type": "DataDownload",
      contentUrl: "https://www.war.gov/medialink/ufo/release_1/",
      encodingFormat: "application/pdf",
    },
    variableMeasured: [
      { "@type": "PropertyValue", name: "Total de registros", value: meta.total },
      { "@type": "PropertyValue", name: "Com transcrição em PT-BR", value: meta.media.with_text },
      { "@type": "PropertyValue", name: "Com imagem", value: meta.media.with_thumb },
      { "@type": "PropertyValue", name: "Com vídeo", value: meta.media.with_video },
    ],
  };

  return (
    <>
      <JsonLd data={[websiteSchema, datasetSchema]} />
      <ArchiveClient records={records} meta={meta}>
        <Highlights />
        <Gallery />
      </ArchiveClient>
    </>
  );
}
