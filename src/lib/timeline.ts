// Chronological milestones from 1944 (foofighters) to 2026 (Release 01).
// Each milestone has year, date (optional), short headline, paragraph context,
// and an optional link to an archive record.

export type TimelineEvent = {
  year: number;
  /** Specific date as "DD/MM" or "Mês YYYY" for sub-year ordering */
  date?: string;
  title: string;
  description: string;
  /** Optional internal link to the most relevant record */
  recordHref?: string;
  /** Optional external link (Wikipedia, government archive, etc.) */
  externalHref?: string;
  /** Tag for visual grouping */
  category: "incident" | "program" | "policy" | "publication" | "release";
};

export const TIMELINE: TimelineEvent[] = [
  {
    year: 1944,
    title: "Foofighters sobre o teatro europeu",
    description:
      "Pilotos americanos da 415ª Esquadrilha de Caça Noturna começam a relatar luzes intermitentes e objetos cilíndricos brilhantes que aparecem ao lado de seus aviões em missões sobre a Alemanha. O SHAEF abre arquivos numéricos dedicados ao fenômeno.",
    recordHref: "/dossie/foofighters",
    category: "incident",
  },
  {
    year: 1947,
    date: "Junho de 1947",
    title: "Avistamento Kenneth Arnold",
    description:
      "Em 24 de junho, o piloto civil Kenneth Arnold relata nove objetos brilhantes em formação sobre o Monte Rainier, Washington. Sua descrição — \"como discos saltando sobre a água\" — é convertida pela imprensa em \"flying saucers\", cunhando o termo e marcando a era moderna do fenômeno UFO.",
    category: "incident",
  },
  {
    year: 1947,
    date: "Julho de 1947",
    title: "Incidente Roswell",
    description:
      "Militares americanos recuperam destroços nas proximidades de Roswell, Novo México. A USAF inicialmente anuncia ter capturado um disco voador; no dia seguinte, retrata-se e atribui o material a um balão meteorológico. Em 1994, o Pentágono admite tratar-se do Project Mogul, programa secreto de detecção de testes nucleares soviéticos.",
    category: "incident",
  },
  {
    year: 1948,
    title: "Project Sign",
    description:
      "USAF cria o primeiro programa oficial para investigar relatos de discos voadores. Seu relatório \"Estimate of the Situation\" sugere seriamente a hipótese extraterrestre — e é rejeitado pelo alto comando.",
    category: "program",
  },
  {
    year: 1949,
    title: "Project Grudge",
    description:
      "Sucessor mais cético do Project Sign. Tem função primária de tranquilizar a opinião pública apresentando explicações convencionais. Encerrado em 1951 após críticas internas pela superficialidade.",
    category: "program",
  },
  {
    year: 1952,
    title: "Project Blue Book inicia",
    description:
      "USAF lança o programa que se tornaria o mais longevo e documentado: 17 anos catalogando 12.618 avistamentos. Sob direção inicial do Capitão Edward Ruppelt e consultoria científica de J. Allen Hynek.",
    recordHref: "/dossie/blue-book-1947",
    category: "program",
  },
  {
    year: 1952,
    date: "Julho de 1952",
    title: "Onda de Washington",
    description:
      "Múltiplos avistamentos sobre Washington, D.C., capturados por radar dos aeroportos. Caças foram lançados em interceptação. O incidente força a Casa Branca a se manifestar e leva à criação do Robertson Panel — comissão da CIA que recomenda \"desmistificar\" UFOs na opinião pública.",
    category: "incident",
  },
  {
    year: 1956,
    title: "Fundação do NICAP",
    description:
      "National Investigations Committee on Aerial Phenomena — organização civil dedicada a investigar avistamentos e pressionar por transparência. Liderada nos anos 1960 pelo Major Donald Keyhoe. Sua biblioteca digital hoje hospeda parte dos arquivos do Project Blue Book referenciados neste arquivo.",
    category: "program",
  },
  {
    year: 1966,
    title: "Comissão Condon",
    description:
      "USAF contrata a Universidade do Colorado para conduzir estudo científico sobre UFOs. O resultado, \"Scientific Study of Unidentified Flying Objects\" (Relatório Condon, 1968), recomenda o fim das investigações governamentais — recomendação contestada por vários membros da própria equipe.",
    category: "publication",
  },
  {
    year: 1969,
    date: "Dezembro de 1969",
    title: "Project Blue Book é encerrado",
    description:
      "Após o Relatório Condon, a USAF encerra oficialmente o programa. 12.618 avistamentos catalogados; 701 permanecem como UNKNOWN. Os arquivos são doados ao National Archives e desclassificados ao longo das décadas seguintes.",
    recordHref: "/dossie/biologics",
    category: "policy",
  },
  {
    year: 1969,
    title: "Apollo 12 — observações em órbita",
    description:
      "Astronautas da missão Apollo 12 relatam visualizar objetos brilhantes durante o trajeto translunar. As transcrições ar-terra completas são liberadas no Release 01 do Pentágono em 2026.",
    recordHref: "/registro/NASA-UAP-D1_Apollo_12_Transcript_1969",
    category: "incident",
  },
  {
    year: 1972,
    title: "Apollo 17 — última missão tripulada à Lua",
    description:
      "Tripulação relata avistamento de objetos brilhantes a cerca de 100 mil km da Terra durante o trajeto translunar. Transcrição técnica e debriefings pós-voo passam a integrar o dossiê NASA da Release 01.",
    recordHref: "/registro/NASA-UAP-D2_Apollo_17_Transcript_1972",
    category: "incident",
  },
  {
    year: 1973,
    title: "J. Allen Hynek funda o CUFOS",
    description:
      "Center for UFO Studies, primeira organização científica privada dedicada a investigar o fenômeno. Hynek publica também \"The UFO Experience\" (1972), introduzindo a escala de Encontros Imediatos (CE-1 a CE-3) que se tornaria padrão.",
    category: "program",
  },
  {
    year: 1980,
    date: "Dezembro de 1980",
    title: "Caso Rendlesham Forest",
    description:
      "Militares americanos em base conjunta UK-US no condado de Suffolk relatam avistar e tocar uma aeronave triangular pousada na floresta. O memorando interno do Tenente-Coronel Charles Halt é liberado em 1983 e torna-se um dos documentos militares mais citados na ufologia europeia.",
    category: "incident",
  },
  {
    year: 1989,
    title: "Bob Lazar vai a público",
    description:
      "Físico americano alega ter trabalhado em engenharia reversa de naves extraterrestres na Área 51 (\"S-4\"). Suas alegações são amplamente disputadas, mas marcam o início da entrada de \"black projects\" no debate UFO contemporâneo.",
    category: "incident",
  },
  {
    year: 1997,
    title: "Phoenix Lights",
    description:
      "Milhares de testemunhas — incluindo o governador Fife Symington — relatam luzes em formação triangular sobre Phoenix, Arizona, em 13 de março. Explicação oficial cita flares militares; testemunhas reportam estrutura sólida.",
    category: "incident",
  },
  {
    year: 1999,
    title: "Relatório COMETA (França)",
    description:
      "Comitê civil francês de altos oficiais militares publica \"Os UFOs e a defesa: para que devemos nos preparar?\" — primeiro documento militar de alto nível, fora dos EUA, a tratar a hipótese extraterrestre como cientificamente plausível e analisar suas implicações para defesa nacional.",
    recordHref: "/registro/255_413270_UFO_s_and_Defense_What_Should_we_Prepare_For",
    externalHref: "https://en.wikipedia.org/wiki/COMETA",
    category: "publication",
  },
  {
    year: 2004,
    date: "Novembro de 2004",
    title: "Caso USS Nimitz / Tic Tac",
    description:
      "Pilotos navais americanos encontram repetidamente objetos em formato \"Tic Tac\" sobre o Oceano Pacífico durante exercícios. Detectados por radar do USS Princeton e capturados em vídeo (\"FLIR1\"). O caso seria o ponto de inflexão do disclosure moderno após sua divulgação em 2017.",
    category: "incident",
  },
  {
    year: 2007,
    title: "AATIP (Advanced Aerospace Threat Identification Program)",
    description:
      "Programa secreto do Pentágono para investigar UAPs reportados por militares. Ativo até 2012, com orçamento de US$ 22 milhões. Sua existência é revelada ao público em dezembro de 2017.",
    category: "program",
  },
  {
    year: 2017,
    date: "Dezembro de 2017",
    title: "NYT revela AATIP",
    description:
      "Reportagem do New York Times (\"Glowing Auras and 'Black Money'\") revela o programa secreto AATIP e libera os vídeos USS Nimitz (Tic Tac), Gimbal e Go-Fast. É o ponto de inflexão que reabre o debate público sobre UAPs nos EUA.",
    externalHref: "https://www.nytimes.com/2017/12/16/us/politics/pentagon-program-ufo-harry-reid.html",
    category: "publication",
  },
  {
    year: 2020,
    date: "Abril de 2020",
    title: "Pentágono libera oficialmente os 3 vídeos",
    description:
      "O Departamento de Defesa publica formalmente os vídeos Tic Tac, Gimbal e Go-Fast, encerrando décadas de não-reconhecimento institucional. Os vídeos haviam vazado antes via fonte civil.",
    category: "release",
  },
  {
    year: 2020,
    title: "UAP Task Force",
    description:
      "Estabelecida pelo Diretor de Inteligência Nacional para coordenar investigações sobre UAPs. Substitui o AATIP encerrado em 2012 e antecede a AARO.",
    category: "program",
  },
  {
    year: 2022,
    title: "AARO substitui UAP Task Force",
    description:
      "All-domain Anomaly Resolution Office — escritório do Pentágono para centralizar investigações UAP em todos os domínios (ar, espaço, mar). Estabelecido por dispositivo do NDAA. Mantém relatórios anuais ao Congresso.",
    category: "program",
  },
  {
    year: 2023,
    date: "Julho de 2023",
    title: "Depoimento David Grusch ao Congresso",
    description:
      "Ex-oficial de inteligência da USAF depõe sob juramento ao Subcomitê de Segurança Nacional da Câmara dos Representantes. Alega conhecimento de programas secretos de recuperação e engenharia reversa de \"non-human craft\" (NHI). É o depoimento mais consequente do disclosure recente.",
    externalHref: "https://en.wikipedia.org/wiki/David_Grusch_UFO_whistleblower_claims",
    category: "policy",
  },
  {
    year: 2023,
    title: "NDAA inclui obrigação de desclassificação",
    description:
      "National Defense Authorization Act fiscal 2024 inclui dispositivo obrigando o Pentágono a iniciar a desclassificação sistemática de arquivos sobre UAPs. É a base legal direta do Release 01 de 2026.",
    category: "policy",
  },
  {
    year: 2024,
    title: "Audiências e relatório AARO",
    description:
      "AARO publica seu relatório histórico (\"Historical Record Report Volume 1\"), avaliando alegações sobre programas secretos americanos desde 1945. Conclusão oficial: \"sem evidência verificável de tecnologia extraterrestre\". O relatório é contestado por testemunhas que alegam acesso restrito da AARO aos programas mais sensíveis.",
    category: "publication",
  },
  {
    year: 2026,
    date: "Maio de 2026",
    title: "Pentágono publica Release 01",
    description:
      "Departamento de Defesa libera oficialmente, via war.gov, a primeira leva de documentos desclassificados sobre UAPs: 1.150 registros do FBI, NASA, USAF, Departamento de Guerra e Departamento de Estado. É o material que estrutura este arquivo em PT-BR.",
    recordHref: "/",
    externalHref: "https://www.war.gov/medialink/ufo/release_1/",
    category: "release",
  },
];
