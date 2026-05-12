// Curated PT-BR glossary of UAP/OVNI terms. Each entry is a passage-sized
// definition (60-150 words) optimized for AI extraction and rich snippets.
// Organized into thematic groups; rendered with anchor IDs so individual
// terms can be linked from record pages later.

export type GlossaryEntry = {
  term: string;
  /** Slug for URL anchor (kebab-case, ASCII) */
  slug: string;
  /** Alternative terms / synonyms */
  alsoKnownAs?: string[];
  definition: string;
  /** Optional: link to the most relevant record(s) in the archive */
  seeAlso?: { label: string; href: string }[];
};

export type GlossarySection = {
  heading: string;
  entries: GlossaryEntry[];
};

export const GLOSSARY: GlossarySection[] = [
  {
    heading: "Conceitos básicos",
    entries: [
      {
        term: "UAP",
        slug: "uap",
        alsoKnownAs: ["Unidentified Anomalous Phenomenon", "Unidentified Aerial Phenomenon"],
        definition:
          "Sigla oficial usada pelos governos americano e francês desde 2017 para designar fenômenos aéreos não identificados. Substitui UFO/OVNI no jargão técnico por ser considerada neutra: cobre fenômenos no ar, no espaço e debaixo d'água, sem comprometer-se com a hipótese de objeto físico. Em 2022, a sigla foi expandida de \"Aerial\" para \"Anomalous\" para incluir observações submarinas e transmedium.",
      },
      {
        term: "OVNI",
        slug: "ovni",
        alsoKnownAs: ["UFO", "Disco voador"],
        definition:
          "Objeto Voador Não Identificado. Tradução estabelecida em português brasileiro para UFO (Unidentified Flying Object), termo cunhado pela USAF em 1953. Em uso técnico contemporâneo, foi substituído por UAP nos documentos oficiais americanos a partir de 2017. Em coloquial, OVNI segue sendo a forma dominante em PT-BR para qualquer objeto aéreo de origem não-identificada.",
      },
      {
        term: "IFO",
        slug: "ifo",
        alsoKnownAs: ["Identified Flying Object"],
        definition:
          "Objeto Voador Identificado. Termo usado em arquivos como o Project Blue Book para registros que, após investigação, foram explicados por causas convencionais — balões meteorológicos, satélites, planetas (especialmente Vênus), reflexos atmosféricos, aeronaves militares experimentais. Aproximadamente 95% dos casos do Blue Book foram classificados como IFO.",
      },
      {
        term: "Disclosure",
        slug: "disclosure",
        alsoKnownAs: ["Divulgação"],
        definition:
          "Movimento — político, civil e legislativo — que pressiona governos a liberar informações classificadas sobre UAPs. Ganhou força nos EUA a partir de 2017 com a reportagem do New York Times revelando o programa AATIP, e culminou na criação da AARO em 2022 e no Release 01 do Pentágono em 2026. Em PT-BR, \"divulgação\" também é usado, mas \"disclosure\" prevaleceu no jargão jornalístico.",
      },
      {
        term: "NHI",
        slug: "nhi",
        alsoKnownAs: ["Non-Human Intelligence"],
        definition:
          "Inteligência Não-Humana. Termo introduzido na audiência do Congresso americano de julho de 2023 pelo ex-oficial de inteligência David Grusch, durante depoimento sobre alegados programas secretos de reverse engineering. O termo evita o carregamento semântico de \"alienígena\" ou \"extraterrestre\" — pode incluir tanto entidades de origem extraterrestre quanto interdimensional ou criptoterrestre.",
      },
      {
        term: "ETH",
        slug: "eth",
        alsoKnownAs: ["Extraterrestrial Hypothesis", "Hipótese extraterrestre"],
        definition:
          "Hipótese de que pelo menos parte dos UAPs tem origem em civilizações extraterrestres. Foi a explicação predominante no movimento ufológico do pós-guerra até os anos 1990. Documentos como o Relatório COMETA (1999) analisam o ETH como uma das hipóteses plausíveis para fenômenos persistentes, mas o termo NHI tem ganhado terreno por ser mais inclusivo.",
      },
    ],
  },

  {
    heading: "Programas e organizações",
    entries: [
      {
        term: "Project Sign",
        slug: "project-sign",
        definition:
          "Primeiro programa oficial da USAF (1948) para investigar avistamentos de OVNIs nos EUA. Seu relatório final, \"Estimate of the Situation\", considerou seriamente a hipótese extraterrestre, mas foi rejeitado pelo General Hoyt Vandenberg, então chefe de Estado-Maior da Força Aérea. Substituído pelo Project Grudge (1949) e depois pelo Project Blue Book (1952).",
      },
      {
        term: "Project Grudge",
        slug: "project-grudge",
        definition:
          "Sucessor do Project Sign (1949), com tom abertamente descrente. Sua principal função era apresentar explicações convencionais para casos UFO e tranquilizar a opinião pública. Encerrado em 1951 após críticas internas pela superficialidade das investigações. Deu lugar ao Project Blue Book em 1952.",
      },
      {
        term: "Project Blue Book",
        slug: "project-blue-book",
        definition:
          "Programa oficial de investigação de UFOs da USAF entre 1952 e 1969. Catalogou 12.618 avistamentos, dos quais 701 permaneceram classificados como UNKNOWN. Encerrado após o Relatório Condon recomendar fim das investigações militares. Os arquivos foram desclassificados e doados ao National Archives — uma parte significativa está indexada no Arquivo OVNI/UAP BR.",
        seeAlso: [{ label: "Dossiê: Project Blue Book (1947)", href: "/dossie/blue-book-1947" }],
      },
      {
        term: "Relatório Condon",
        slug: "relatorio-condon",
        alsoKnownAs: ["Condon Report", "Scientific Study of Unidentified Flying Objects"],
        definition:
          "Estudo encomendado pela USAF à Universidade do Colorado (1966-1968) sob direção do físico Edward Condon. Recomendou o encerramento de investigações governamentais sobre UFOs, alegando que não justificavam investimento científico. Crítico até hoje: vários cientistas da equipe discordaram das conclusões finais. Levou ao fim do Project Blue Book em 1969.",
      },
      {
        term: "AATIP",
        slug: "aatip",
        alsoKnownAs: ["Advanced Aerospace Threat Identification Program"],
        definition:
          "Programa secreto do Departamento de Defesa dos EUA (2007-2012) para investigar relatórios de UAPs reportados por militares. Revelado em dezembro de 2017 pelo New York Times, junto com os vídeos USS Nimitz (\"Tic Tac\"), Gimbal e Go-Fast. Foi o ponto de inflexão que reabriu o debate público nos EUA e levou à criação da UAP Task Force em 2020.",
      },
      {
        term: "AAWSAP",
        slug: "aawsap",
        alsoKnownAs: ["Advanced Aerospace Weapon System Applications Program"],
        definition:
          "Programa precursor do AATIP, ativo entre 2008 e 2010, com orçamento de US$ 22 milhões. Conduzido pela Defense Intelligence Agency e contratado à Bigelow Aerospace. Investigou desde casos clássicos de UAPs até paranormalidade no Rancho Skinwalker (Utah). Revelado em 2018 pela Las Vegas Mystery Wire.",
      },
      {
        term: "AARO",
        slug: "aaro",
        alsoKnownAs: ["All-domain Anomaly Resolution Office"],
        definition:
          "Escritório do Departamento de Defesa dos EUA criado em julho de 2022 para centralizar investigações sobre UAPs em todos os domínios — ar, espaço, mar e \"transmedium\". Sucessor da UAP Task Force (2020) e do AOIMSG (2021). Mantida pelo NDAA, divulga relatórios anuais ao Congresso. Sua diretora inicial foi Sean Kirkpatrick (2022-2023).",
      },
      {
        term: "NICAP",
        slug: "nicap",
        alsoKnownAs: ["National Investigations Committee on Aerial Phenomena"],
        definition:
          "Organização civil americana fundada em 1956 para investigar avistamentos de UAPs e pressionar por transparência governamental. Liderada nos anos 1960 pelo Major Donald Keyhoe, manteve um banco de dados de casos paralelo ao Blue Book. Sua biblioteca digital — nicap.org — hospeda parte dos arquivos referenciados no Arquivo OVNI/UAP BR.",
      },
      {
        term: "MUFON",
        slug: "mufon",
        alsoKnownAs: ["Mutual UFO Network"],
        definition:
          "Maior organização civil de investigação de UAPs do mundo, fundada em 1969. Mantém uma rede de \"investigadores de campo\" em vários países e um banco de dados aberto de avistamentos. Não tem vínculo governamental, mas é frequentemente citada como fonte secundária em jornalismo especializado.",
      },
      {
        term: "COMETA",
        slug: "cometa",
        definition:
          "Comitê civil francês de altos oficiais militares e cientistas que produziu, em 1999, o relatório \"Os UFOs e a defesa: para que devemos nos preparar?\". Considera o ETH (hipótese extraterrestre) como explicação plausível para casos persistentes e analisa implicações para defesa nacional. É o documento militar de mais alto nível a tratar o tema seriamente fora dos EUA.",
        seeAlso: [{ label: "Documento COMETA no arquivo", href: "/registro/255_413270_UFO_s_and_Defense_What_Should_we_Prepare_For" }],
      },
    ],
  },

  {
    heading: "Casos emblemáticos",
    entries: [
      {
        term: "Caso Kenneth Arnold",
        slug: "kenneth-arnold",
        definition:
          "Avistamento de 24 de junho de 1947 pelo piloto civil Kenneth Arnold sobre o Monte Rainier, Washington. Arnold relatou nove objetos brilhantes voando em formação \"como um disco saltando sobre a água\" — descrição que jornalistas converteram em \"flying saucers\" (discos voadores), cunhando o termo. Marco zero da era moderna do fenômeno UFO.",
      },
      {
        term: "Incidente Roswell",
        slug: "roswell",
        definition:
          "Recuperação de destroços por militares americanos nas proximidades de Roswell, Novo México, em julho de 1947. A USAF inicialmente anunciou ter capturado um \"disco voador\"; no dia seguinte, retratou-se e atribuiu os destroços a um balão meteorológico — em 1994, o Pentágono admitiu que era um balão do Project Mogul, programa secreto de detecção de testes nucleares soviéticos. Roswell permanece o caso mais debatido na cultura UFO americana.",
      },
      {
        term: "Foofighters",
        slug: "foofighters",
        definition:
          "Apelido dado por pilotos americanos da 415ª Esquadrilha de Caça Noturna em 1944-1945 a luzes intermitentes e objetos brilhantes que apareciam ao lado de seus aviões em missões sobre a Alemanha. O SHAEF abriu arquivos numéricos dedicados aos relatos. Considerados na época como possível armamento experimental alemão — hipótese que se mostrou incorreta no pós-guerra.",
        seeAlso: [{ label: "Dossiê: Foofighters", href: "/dossie/foofighters" }],
      },
      {
        term: "Maury Island",
        slug: "maury-island",
        definition:
          "Caso de 21 de junho de 1947 (três dias antes do avistamento Arnold), em que dois homens em Puget Sound, Washington, alegaram ter visto seis objetos em forma de \"rosquinha\" sobre Maury Island. Um dos objetos teria liberado fragmentos metálicos. O caso é controverso — vários investigadores consideram-no hoax — mas teve impacto histórico por ter sido investigado pela USAF antes mesmo do caso Arnold.",
      },
      {
        term: "Caso USS Nimitz",
        slug: "tic-tac",
        alsoKnownAs: ["Tic Tac UFO", "Nimitz encounters"],
        definition:
          "Série de encontros de pilotos navais americanos com objetos não identificados em formato de \"Tic Tac\" (cápsula branca lisa) sobre o Oceano Pacífico em novembro de 2004. Foi documentado por radar do USS Princeton, capturado em vídeo (vídeo \"FLIR1\") e investigado pelo AATIP. Tornou-se o caso central da reabertura do debate UAP em 2017.",
      },
      {
        term: "Phoenix Lights",
        slug: "phoenix-lights",
        definition:
          "Avistamento em massa ocorrido em 13 de março de 1997 sobre Phoenix, Arizona. Milhares de testemunhas — incluindo o governador Fife Symington — relataram luzes em formação triangular cruzando lentamente o céu. A explicação oficial atribui-as a flares (sinalizadores luminosos) lançados pela USAF em exercício; testemunhas reportam estrutura sólida conectando as luzes.",
      },
      {
        term: "Caso Rendlesham Forest",
        slug: "rendlesham",
        definition:
          "Incidente de 26-28 de dezembro de 1980 em uma base aérea conjunta UK-US no condado de Suffolk, Inglaterra. Militares americanos relataram avistar e tocar uma aeronave triangular pousada na floresta. Um memorando interno do Tenente-Coronel Charles Halt foi liberado em 1983 — é um dos documentos militares mais citados na ufologia britânica e europeia.",
      },
    ],
  },

  {
    heading: "Tipos de encontro (escala Hynek)",
    entries: [
      {
        term: "CE-1",
        slug: "ce-1",
        alsoKnownAs: ["Close Encounter of the First Kind", "Encontro Imediato de Primeiro Grau"],
        definition:
          "Avistamento de UFO a menos de 150 metros do observador, sem interação física. Categoria definida pelo astrônomo J. Allen Hynek no livro \"The UFO Experience\" (1972). O nível mais comum de encontro próximo.",
      },
      {
        term: "CE-2",
        slug: "ce-2",
        alsoKnownAs: ["Close Encounter of the Second Kind"],
        definition:
          "Avistamento de UFO com efeito físico observável: marcas no solo, interferência elétrica em veículos ou equipamentos, queimaduras na vegetação, paralisia de testemunhas, mudanças de temperatura.",
      },
      {
        term: "CE-3",
        slug: "ce-3",
        alsoKnownAs: ["Close Encounter of the Third Kind"],
        definition:
          "Avistamento de UFO com observação de \"ocupantes\" ou entidades associadas. Categoria que inspirou o título do filme de Steven Spielberg (\"Close Encounters of the Third Kind\", 1977). Frequentemente disputada pela comunidade científica.",
      },
      {
        term: "CE-4",
        slug: "ce-4",
        alsoKnownAs: ["Close Encounter of the Fourth Kind"],
        definition:
          "Categoria adicionada após Hynek por outros pesquisadores. Refere-se a alegado contato direto ou abdução. Não foi reconhecida formalmente por Hynek, mas tornou-se padrão na literatura ufológica a partir dos anos 1980 (casos Hill, Pascagoula, etc.).",
      },
      {
        term: "CE-5",
        slug: "ce-5",
        alsoKnownAs: ["Close Encounter of the Fifth Kind"],
        definition:
          "Termo cunhado pelo médico Steven Greer nos anos 1990 para descrever \"contato iniciado por humanos\" — protocolos de meditação coletiva e sinalização luminosa para tentar provocar avistamentos. Não tem base científica reconhecida.",
      },
    ],
  },

  {
    heading: "Conceitos militares e técnicos",
    entries: [
      {
        term: "SHAEF",
        slug: "shaef",
        alsoKnownAs: ["Supreme Headquarters Allied Expeditionary Force"],
        definition:
          "Quartel-General Supremo das Forças Aliadas no teatro europeu da Segunda Guerra Mundial, comandado pelo General Eisenhower. Mantinha arquivos numerados (\"Numeric Files\") sobre fenômenos aéreos não-identificados, incluindo os relatos de foofighters — material que faz parte do Release 01 do Pentágono.",
      },
      {
        term: "Black Project",
        slug: "black-project",
        alsoKnownAs: ["Programa negro", "Projeto sigiloso"],
        definition:
          "Programa governamental cujo orçamento, escopo e até existência são oficialmente classificados. O termo é central no debate disclosure: parte significativa do que se reivindica sobre UAPs em depoimentos públicos refere-se a alegados black projects de reverse engineering. A existência dessa categoria orçamentária é pública; o conteúdo específico, não.",
      },
      {
        term: "Reverse Engineering",
        slug: "reverse-engineering",
        alsoKnownAs: ["Engenharia reversa"],
        definition:
          "Processo de desmontar e analisar tecnologia para descobrir seu funcionamento. No contexto UAP, refere-se a alegações de que material recuperado (Roswell, etc.) teria sido objeto de programas secretos de reverse engineering em parceria com contratantes de defesa. Repetidas vezes alegado em depoimentos do Congresso (David Grusch, 2023), nunca confirmado por documentação oficial pública.",
      },
      {
        term: "FOIA",
        slug: "foia",
        alsoKnownAs: ["Freedom of Information Act"],
        definition:
          "Lei americana de 1966 que garante ao cidadão o direito de solicitar documentos governamentais. Sustentou décadas de pesquisa civil sobre UAPs — incluindo a liberação parcial dos arquivos do Project Blue Book. Em jornalismo investigativo, \"FOIA request\" é prática padrão para obter material classificado parcialmente.",
      },
      {
        term: "NDAA",
        slug: "ndaa",
        alsoKnownAs: ["National Defense Authorization Act"],
        definition:
          "Lei anual americana que autoriza o orçamento militar do país. Desde 2022, sucessivas versões incluem dispositivos específicos sobre UAPs — exigindo relatórios anuais ao Congresso, estabelecendo whistleblower protections para denunciantes internos, e — em 2023 — obrigando o Pentágono a iniciar a desclassificação sistemática de arquivos. O Release 01 (maio 2026) é resultado direto desses dispositivos.",
      },
      {
        term: "USS Nimitz incident",
        slug: "uss-nimitz",
        definition:
          "Ver \"Caso USS Nimitz\". Encontro multi-radar e visual de novembro de 2004 sobre o Pacífico envolvendo o porta-aviões USS Nimitz, o cruzador USS Princeton e caças F/A-18F. Capturado em vídeo (\"FLIR1\") posteriormente liberado pelo Pentágono em 2020.",
      },
      {
        term: "Gimbal vídeo",
        slug: "gimbal-video",
        definition:
          "Vídeo gravado por câmera infravermelha de caça F/A-18F da Marinha americana em janeiro de 2015 sobre a costa leste dos EUA. Mostra objeto rotacionando no eixo enquanto se desloca. Junto com Tic Tac e Go-Fast, é um dos três vídeos UAP oficialmente liberados pelo Pentágono em 2020.",
      },
      {
        term: "Go-Fast vídeo",
        slug: "go-fast",
        definition:
          "Vídeo gravado por F/A-18F em 2015 mostrando objeto pequeno em alta velocidade sobre o Atlântico. A análise posterior do AARO concluiu que o efeito de \"velocidade\" é provavelmente paralaxe contra o oceano, e que o objeto pode ser convencional. Permanece controverso entre testemunhas e analistas.",
      },
    ],
  },

  {
    heading: "Pesquisadores e figuras-chave",
    entries: [
      {
        term: "J. Allen Hynek",
        slug: "hynek",
        definition:
          "Astrônomo americano (1910-1986), consultor científico do Project Blue Book entre 1952 e 1969. Inicialmente cético, tornou-se uma das vozes mais respeitadas na ufologia científica após observar a fragilidade das explicações oficiais. Criou a escala de Encontros Imediatos (CE-1 a CE-3) e fundou o Center for UFO Studies (CUFOS) em 1973.",
      },
      {
        term: "Donald Keyhoe",
        slug: "keyhoe",
        definition:
          "Major da Marinha americana (1897-1988) e jornalista. Foi um dos primeiros a defender publicamente que UFOs eram naves extraterrestres, em artigo da revista True (1949). Liderou o NICAP nos anos 1960 e pressionou repetidamente o Congresso por audiências públicas sobre o tema.",
      },
      {
        term: "Bob Lazar",
        slug: "bob-lazar",
        definition:
          "Físico americano que, em 1989, alegou ter trabalhado em engenharia reversa de naves extraterrestres na Área 51 (\"S-4\"). Sua credibilidade é amplamente disputada — registros acadêmicos não confirmam suas alegações de formação no MIT e Caltech. O nome \"Element 115\" (Moscóvio), citado por Lazar antes de ser sintetizado pelos cientistas, alimenta debate até hoje.",
      },
      {
        term: "David Grusch",
        slug: "grusch",
        definition:
          "Ex-oficial de inteligência da USAF que, em julho de 2023, depôs ao Congresso americano alegando conhecimento de programas secretos de recuperação e reverse engineering de \"non-human craft\" (NHI). Seu depoimento foi sob juramento e tornou-se o evento mais consequente do disclosure recente. As alegações específicas seguem não-confirmadas publicamente.",
      },
      {
        term: "Luis Elizondo",
        slug: "elizondo",
        definition:
          "Ex-oficial de contra-inteligência militar americano, alegado diretor do AATIP entre 2010 e 2017. Saiu do Pentágono em 2017 e tornou-se figura pública do disclosure. Em 2024, publicou \"Imminent\" — livro que detalha sua experiência interna. O DoD disputa que ele tenha de fato dirigido o AATIP.",
      },
    ],
  },

  {
    heading: "Locais e referências geográficas",
    entries: [
      {
        term: "Área 51",
        slug: "area-51",
        alsoKnownAs: ["Groom Lake", "Homey Airport"],
        definition:
          "Instalação militar americana classificada em Nevada, dedicada historicamente ao desenvolvimento de aeronaves experimentais (U-2, SR-71, F-117, B-2). Sua existência foi negada oficialmente até 2013, quando documentos da CIA confirmaram-na em desclassificações via FOIA. Tornou-se centro mítico do disclosure por sua conexão com testes secretos e alegada conexão com material UFO recuperado.",
      },
      {
        term: "Skinwalker Ranch",
        slug: "skinwalker",
        definition:
          "Fazenda no nordeste de Utah, comprada pelo bilionário Robert Bigelow em 1996 e estudada por pesquisadores como local de alta atividade paranormal e UAP. Foi alvo de investigação do AAWSAP entre 2008 e 2010. Posteriormente vendida a Brandon Fugal, que abriu o local a uma série de TV (\"The Secret of Skinwalker Ranch\", History Channel, 2020-).",
      },
      {
        term: "Oak Ridge",
        slug: "oak-ridge",
        definition:
          "Cidade no Tennessee, sede do laboratório nacional que produziu urânio enriquecido para o Projeto Manhattan. Foi alvo de múltiplos avistamentos de UFO entre 1947 e 1950, registrados no arquivo 62-HQ-83894 do FBI. A coincidência geográfica com instalações nucleares estratégicas é tema recorrente na literatura — vários casos do Blue Book ocorreram próximos a bases nucleares.",
      },
      {
        term: "war.gov",
        slug: "war-gov",
        definition:
          "Portal oficial do Departamento de Defesa dos Estados Unidos (anteriormente defense.gov). Hospeda em /medialink/ufo/release_1/ os PDFs originais do Release 01 — fonte primária autoritativa do Arquivo OVNI/UAP BR. Domínio governamental .gov, conteúdo em domínio público.",
      },
    ],
  },
];

/** Flatten all entries into a single list (for schema generation, search). */
export function flatGlossary(): GlossaryEntry[] {
  return GLOSSARY.flatMap((section) => section.entries);
}
