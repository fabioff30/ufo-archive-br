// Dossier metadata + curation. Each dossier has either:
//  - autoTag: matches the `dossiers` field in the source data (data-derived);
//  - recordIds: hand-picked list for thematic groupings the data doesn't tag.
//
// Both kinds resolve to the same shape (title, intro, recordIds[]) at render
// time in src/app/dossie/[slug]/page.tsx.

export type DossierDef = {
  slug: string;
  title: string;
  /** 1-2 sentence summary shown in cards / OG */
  blurb: string;
  /** 300-500 word editorial intro shown on the dossier page itself */
  intro: string;
  /** Data tag — if present, records with this tag in `dossiers` field belong */
  autoTag?: string;
  /** Hand-curated record IDs (in addition to or instead of autoTag) */
  recordIds?: string[];
};

export const DOSSIERS: DossierDef[] = [
  {
    slug: "biologics",
    title: "Material biológico e biotécnico",
    autoTag: "biologics",
    blurb:
      "Documentos que tratam de amostras biológicas, restos orgânicos e investigações biotécnicas associadas aos UAPs.",
    intro:
      "Este dossiê reúne os registros do Release 01 que tocam — direta ou indiretamente — em material biológico associado a fenômenos não identificados. A maior parte é do arquivo 62-HQ-83894 do FBI (1947–1968), que documenta de testemunhos oculares a propostas técnicas de sistemas de propulsão, com referências esparsas a tecidos, fragmentos orgânicos e relatos médicos. Não confunda: o conjunto não estabelece a existência de biologia não-humana — ele apenas mostra como os investigadores americanos tratavam, classificavam e arquivavam reportes desse tipo entre o pós-guerra e o fim do Project Blue Book.\n\nA leitura útil aqui é menos sensacionalista que metodológica: o que constitui evidência num arquivo de inteligência, como o FBI separava \"relatório público\" de \"investigação aberta\", e por que tantos memorandos retornaram sem conclusão. Para citação acadêmica, recomendamos abrir cada documento individual e consultar o original em war.gov — a tradução em PT-BR é orientativa, e termos técnicos da época (incluindo nomenclatura biológica e médica) podem ter sido renderizados de forma simplificada.",
  },
  {
    slug: "hearings",
    title: "Audiências e depoimentos",
    autoTag: "hearings",
    blurb:
      "Audiências formais, depoimentos sob juramento e transcrições do Congresso dos Estados Unidos sobre o programa UAP.",
    intro:
      "Aqui ficam as transcrições formais — audiências do Congresso, depoimentos sob juramento, sessões fechadas que viraram públicas. É o material mais próximo de \"voz oficial sobre o tema\" no Release 01: aquilo que servidores e ex-servidores disseram, em foro público, quando obrigados a se posicionar. A maioria circulava em transcrição parcial antes desta liberação — agora as versões integrais estão disponíveis.\n\nAs perguntas que esses documentos respondem (ou deixam de responder) são as mesmas que motivaram a criação da AARO em 2022 e o NDAA 2023: quem sabia o quê, quando soube, e quais programas foram financiados sem registro orçamentário aparente. Para entender o contexto político, vale ler em paralelo audiências da House Subcommittee on National Security e do Senate Intelligence Committee — referenciadas em vários dos memorandos aqui. O texto traduzido para PT-BR mantém o tom procedural da fala oficial; para citações em PT, padronize \"audiência\" (não \"hearing\"), \"depoimento\" (não \"testimony\") e mantenha nomes próprios em inglês.",
  },

  // ─── Curated thematic collections (no autoTag) ──────────────────────────

  {
    slug: "apollo",
    title: "Missões Apollo e Gemini",
    blurb:
      "Transcrições de voz e debriefings técnicos das missões NASA que registraram observações de objetos não identificados.",
    intro:
      "Este é o conjunto da NASA dentro do Release 01: transcrições ar-terra completas, debriefings técnicos pós-voo e fotografias dos arquivos visuais. Cobre Apollo 11 (1969), Apollo 12 (1969), Apollo 17 (1972) e a missão Gemini VII (1965), nas quais astronautas relataram visualizar objetos brilhantes a centenas de milhares de quilômetros da Terra, durante o trajeto translunar ou em órbita.\n\nO destaque historiográfico está em três pontos. Primeiro: as transcrições nunca foram secretas no sentido legal — circularam em cópias arquivísticas da NASA — mas foram pela primeira vez vinculadas como conjunto temático com curadoria UAP. Segundo: o material visual (NASA-UAP-VM1 a VM6) traz fotos lunares com objetos marcados em amarelo pelos analistas atuais, o que torna pontos antes ambíguos das imagens contextualizados pela leitura institucional contemporânea. Terceiro: as conversas entre tripulação e Controle da Missão deixam transparecer o protocolo informal de \"reportar tudo, classificar depois\" que dominava o programa Apollo.\n\nPara quem quer começar a leitura, o ponto mais conhecido é o relato de Frank Borman na Gemini VII (255_t_763_r1b_excerpt) e a sequência da Apollo 17 sobre objetos brilhantes a 100 mil km da Terra (NASA-UAP-D2). Ambos têm transcrição completa em PT-BR no acervo.",
    recordIds: [
      "NASA-UAP-D2_Apollo_17_Transcript_1972",
      "NASA-UAP-D1_Apollo_12_Transcript_1969",
      "NASA-UAP-D4_Apollo_11_Technical_Crew_Debriefing_1969",
      "NASA-UAP-D5_Apollo_17_Crew_Debriefing_for_Science_1973",
      "NASA-UAP-D6_Apollo_17_Technical_Crew_Debriefing_1973",
      "NASA-UAP-D7_Skylab_Techincal_Crew_Debriefing_1973",
      "255_t_763_r1b_transcripts",
      "255-t-763-r1b-excerpt",
      "NASA-UAP-VM1_Apollo_12_1969",
      "NASA-UAP-VM2_Apollo_12_1969",
      "NASA-UAP-VM3_Apollo_12_1969",
      "NASA-UAP-VM4_Apollo_12_1969",
      "NASA-UAP-VM5_Apollo_12_1969",
      "NASA-UAP-VM6_Apollo_17_1972",
    ],
  },

  {
    slug: "foofighters",
    title: "Foofighters da Segunda Guerra Mundial",
    blurb:
      "Mensagens do SHAEF e relatos de pilotos aliados (1944–1945) sobre fenômenos noturnos não-identificados sobre o teatro europeu de operações.",
    intro:
      "\"Foofighters\" foi o termo usado por pilotos americanos da 415ª Esquadrilha de Caça Noturna em 1944–1945 para descrever luzes intermitentes, objetos cilíndricos brilhantes e fenômenos aéreos que apareciam ao lado de seus aviões em missão sobre a Alemanha e os Alpes. O termo não tinha pretensão técnica — era jargão de cabine, derivado da expressão \"foo-foo\" do quadrinho Smokey Stover. Ainda assim, os relatos foram suficientemente persistentes para que o SHAEF (Supreme Headquarters Allied Expeditionary Force) abrisse arquivos numéricos dedicados, classificando-os ao lado de informações sobre armamento alemão experimental e foguetes antiaéreos.\n\nO Release 01 traz esse material — vindo do Departamento de Guerra dos EUA — junto de fotografias de página dos documentos originais. O conjunto é importante por dois motivos. Documenta que a categoria \"fenômeno aéreo não-identificado\" antecede em pelo menos três anos o caso Roswell e o início do Project Blue Book; e mostra que os Aliados consideraram seriamente, na época, a possibilidade de tratar-se de armamento experimental alemão (V-3 ou similar), hipótese que orientou toda a investigação inicial. Hoje sabemos que os alemães não tinham tal arma — o que deixa os foofighters como um dos enigmas mais antigos do dossiê UAP norte-americano.",
    recordIds: [
      "331_120752_Numeric_Files_1944_1945_37153_German_Armament_Equipment_Documents",
    ],
  },

  {
    slug: "blue-book-1947",
    title: "Project Blue Book — primeiros casos (1947)",
    blurb:
      "Os 15 incidentes do Project Blue Book registrados em 1947, ano da \"onda dos discos voadores\" nos Estados Unidos.",
    intro:
      "Junho e julho de 1947 viveram a primeira \"onda de discos voadores\" da história moderna americana. Em poucas semanas, manchetes nacionais saíram de \"aviador civil vê discos brilhantes em formação\" (Kenneth Arnold, sobre o Monte Rainier, 24 de junho) a centenas de relatos espalhados pelos 48 estados — em parte alimentados pela cobertura jornalística, em parte por sobreposição com testes secretos de balões militares e protótipos de aeronaves.\n\nO Project Blue Book — criado em 1952 como sucessor dos projetos Sign (1948) e Grudge (1949) — eventualmente catalogou retroativamente esses primeiros incidentes. Este dossiê reúne os casos #12 a #91, todos registrados entre junho e outubro de 1947, em locais que vão de Portland (Oregon) a Maine, Idaho, Wisconsin e bases aéreas na Califórnia. Vários deles permanecem classificados como UNKNOWN no resumo final do Blue Book, o que significa que a Força Aérea, após investigação interna, não conseguiu atribuir o avistamento a fenômeno natural, aeronave conhecida ou erro de observação.\n\nPara o leitor brasileiro, vale notar: estes documentos são fichas resumo, não transcrições de depoimento — cada caso tem 1 a 2 páginas com data, local, descrição sumária e classificação final (KNOWN/UNKNOWN/INSUFFICIENT DATA). Os PDFs originais estão hospedados no portal NICAP (não no war.gov), conforme link na fonte de cada registro.",
    recordIds: [
      "blue_book_12",
      "blue_book_27",
      "blue_book_34",
      "blue_book_36",
      "blue_book_50",
      "blue_book_69",
      "blue_book_85",
      "blue_book_91",
    ],
  },
];

export function getDossierBySlug(slug: string): DossierDef | undefined {
  return DOSSIERS.find((d) => d.slug === slug);
}
