// Curated picks for the home "Em destaque" section.
// Updated by hand — chosen for narrative pull, agency variety and
// presence of translatable text. Each pick has a short editorial
// hook in PT-BR that goes above the record's own blurb.

export type Highlight = {
  id: string;
  hook: string;
};

export const HIGHLIGHTS: Highlight[] = [
  {
    id: "NASA-UAP-D2_Apollo_17_Transcript_1972",
    hook: "Astronautas da Apollo 17 relatam objetos brilhantes a 100 mil km da Terra.",
  },
  {
    id: "NASA-UAP-D1_Apollo_12_Transcript_1969",
    hook: "Apollo 12: transcrição do diálogo entre tripulação e Controle da Missão sobre avistamentos no caminho da Lua.",
  },
  {
    id: "65_HS1-834228961_62-HQ-83894_Section_1",
    hook: "O caso 62-HQ-83894 do FBI: duas décadas de investigação sobre discos voadores nos Estados Unidos.",
  },
  {
    id: "331_120752_Numeric_Files_1944_1945_37153_German_Armament_Equipment_Documents",
    hook: "Foofighters: mensagens do SHAEF descrevendo fenômenos noturnos vistos por pilotos na Segunda Guerra.",
  },
  {
    id: "255_413270_UFO_s_and_Defense_What_Should_we_Prepare_For",
    hook: "Relatório COMETA (1999): militares franceses analisam a hipótese extraterrestre para fins de defesa.",
  },
  {
    id: "blue_book_12",
    hook: "Project Blue Book caso #12: o primeiro avistamento moderno registrado pelos Estados Unidos, Portland, Oregon, junho de 1947.",
  },
];

// Image-type records with public war.gov URLs (450 total, 14 with usable URLs).
// Hand-picked for the home gallery — mix of FBI photo evidence and NASA
// Apollo mission imagery.
export const GALLERY_IDS = [
  "FBI_Photo_A1",
  "FBI_Photo_A2",
  "FBI_Photo_A3",
  "NASA-UAP-VM1_Apollo_12_1969",
  "NASA-UAP-VM2_Apollo_12_1969",
  "NASA-UAP-VM3_Apollo_12_1969",
  "NASA-UAP-VM6_Apollo_17_1972",
  "FBI_Photo_A4",
];
