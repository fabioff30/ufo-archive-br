// Single source of truth for site-level identity (origin, brand, publisher).
// Referenced from metadataBase, sitemap, robots, and all JSON-LD generators.

export const SITE = {
  origin: "https://arquivos-ufo.cloud",
  name: "Arquivo OVNI/UAP",
  alternateName: "Arquivo OVNI/UAP BR",
  description:
    "Busca em português nos documentos desclassificados do Pentágono sobre UAPs e UFOs. Release 01 — maio de 2026. FBI, NASA, USAF Project Blue Book, Departamento de Guerra e Estado.",
  language: "pt-BR",
} as const;

export const PUBLISHER = {
  "@type": "Organization" as const,
  name: "FF Media",
  url: "https://www.ffmedia.com.br/",
} as const;

export const AUTHOR_PERSON = {
  "@type": "Person" as const,
  name: "Fábio Figueiroa",
  url: "https://fabiofariasf.com.br",
  image: `${SITE.origin}/fabio-perfil.webp`,
  sameAs: [
    "https://linkedin.com/in/fabiofariasf",
    "https://github.com/fabioff30",
  ],
  jobTitle: "Editor",
  worksFor: PUBLISHER,
} as const;

// Maps the agency string (as it appears in the data) to a Schema.org-friendly
// short form. Used as the `author` field on per-record Article schemas.
const AGENCY_FULL_NAMES: Record<string, string> = {
  FBI: "Federal Bureau of Investigation",
  NASA: "National Aeronautics and Space Administration",
  "USAF Project Blue Book": "United States Air Force — Project Blue Book",
  "Department of War": "United States Department of Defense",
  "Department of State": "United States Department of State",
};

export function agencyAsOrganization(agency: string): { "@type": "Organization"; name: string; nationality?: string } {
  return {
    "@type": "Organization",
    name: AGENCY_FULL_NAMES[agency] || agency,
    ...(agency === "Sem agência" ? {} : { nationality: "United States" }),
  };
}
