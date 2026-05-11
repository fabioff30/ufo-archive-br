const TYPE_LABELS: Record<string, string> = {
  "Case File": "Arquivo de caso",
  PDF: "Documento",
  IMG: "Imagem",
  VID: "Vídeo",
};

export function typeLabel(type: string): string {
  return TYPE_LABELS[type] || type;
}

const AGENCY_LABELS: Record<string, string> = {
  "USAF Project Blue Book": "USAF · Project Blue Book",
  FBI: "FBI",
  "Department of War": "Departamento de Guerra",
  "Department of State": "Departamento de Estado",
  NASA: "NASA",
  "Sem agência": "Sem agência",
};

export function agencyLabel(agency: string): string {
  return AGENCY_LABELS[agency] || agency;
}

export function formatDate(value: string): string {
  if (!value || value.toUpperCase() === "N/A") return "—";
  const iso = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (iso) {
    const [, y, m, d] = iso;
    return `${d}/${m}/${y}`;
  }
  const us = value.match(/^(\d{1,2})\/(\d{1,2})\/(\d{2})$/);
  if (us) {
    const [, m, d, yy] = us;
    const year =
      parseInt(yy, 10) < 50 ? 2000 + parseInt(yy, 10) : 1900 + parseInt(yy, 10);
    return `${d.padStart(2, "0")}/${m.padStart(2, "0")}/${year}`;
  }
  return value;
}

export function prettifyTitle(title: string): string {
  if (/^[\w-]+$/.test(title) && title.includes("_")) {
    return title.replace(/_/g, " ").replace(/\s+/g, " ").trim();
  }
  return title;
}
