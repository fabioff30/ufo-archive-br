# SEO Strategy — Arquivo OVNI/UAP BR

**Tipo de site**: Publisher / Archive (não-comercial, conteúdo único em PT-BR)
**Domínio**: ufo-archive-br.vercel.app (provisório) → ideal mover pra subdomínio FF Media (ex.: `arquivo.ffmedia.com.br`) ou `arquivo-uap.com.br`
**Conteúdo**: 1.150 documentos primários do Pentágono + 2 dossiês + páginas institucionais
**Diferencial**: **único arquivo primário em PT-BR**. Tradução automática + indexação + links pra fonte original em war.gov.

---

## 1. Discovery — onde estamos hoje

**Já implementado**
- Metadata básico (`title`, `description`) em layout + 4 tipos de página
- `<title>` dinâmico via template (`%s — Arquivo OVNI/UAP`)
- Generation de 1.157 páginas SSG (cada uma com URL única, semântica)
- PT-BR como `lang` no `<html>`
- Mobile responsive (auditado em 375/390/768)
- Google Analytics 4 (G-7QXF3BVR1J)
- Open Graph image setup ausente
- Favicon brand-fit
- Site rápido (SSG, 0 client API calls em runtime)

**Gaps críticos** (ataque imediato, fase 1)
- `sitemap.ts` (Next 16 auto-gera se existir) — 1.157 URLs precisam estar descobríveis
- `robots.ts` — sem isso, robôs adivinham
- `app/opengraph-image.tsx` + per-record dynamic OG — compartilhamento social
- JSON-LD em todas as rotas (Article, Dataset, Organization, Person)
- `llms.txt` — citabilidade em AI search (ChatGPT/Perplexity/Gemini)
- Robots-meta tags por tipo de página (`max-image-preview:large`, `max-snippet:-1`)
- `canonical` URLs consistentes (depois que decidirmos domínio definitivo)

---

## 2. Competitive Analysis — PT-BR

Pesquisas-alvo e quem domina hoje:

| Query | Top 5 atuais (estimativa) | Nosso ângulo |
|---|---|---|
| "OVNI documentos desclassificados" | g1.globo.com, uol.com.br, bbc.com/portuguese, olhardigital.com.br | Eles têm **notícias sobre** a divulgação. Nós temos o **arquivo em si**. |
| "Pentágono UAP" | g1, BBC Brasil, terra.com.br, exame.com | Idem. |
| "Project Blue Book Brasil" | poucos resultados em PT, maioria EN | **Quase virgem em PT-BR** — alta oportunidade |
| "Apollo 17 OVNI" | YouTube (vídeos), poucos artigos PT | Temos a transcrição completa traduzida — único |
| "Foofighters segunda guerra" | Wikipedia PT, alguns blogs | Médio — temos documentos primários |
| "FBI arquivos OVNI" | g1, blogs antigos | Médio — temos os PDFs linkados |

**Cluster de oportunidade**: long-tail de **nomes próprios de casos** + agências. Cada um dos 1.150 registros tem um URL canônico em PT-BR — isso é exatamente o que motores de busca + AI search valorizam.

**Domínios de autoridade próximos** que precisamos competir:
- g1.globo.com (DA ~91)
- bbc.com/portuguese (DA ~94)
- olhardigital.com.br (DA ~70)

Não dá pra competir em headlines genéricas com eles. **Estratégia: cauda longa por documento, GEO (AI search) como diferencial principal.**

---

## 3. Architecture — já está montado

Estrutura atual já está SEO-amigável:
```
/                                ← arquivo + busca
/registro/[id]/                  ← 1.150 páginas, 1 por documento
/dossie/[slug]/                  ← agrupamento temático (biologics, hearings)
/sobre/                          ← autor + metodologia (E-E-A-T)
```

**Trailing slash** já habilitado. URLs são derivadas do `id` do registro (não-bonito, mas estável — ex.: `/registro/NASA-UAP-D2_Apollo_17_Transcript_1972/`). **Não alterar** pra evitar quebra de links externos quando ganharem.

**Sugestão de evolução** (fase 3+, após autoridade inicial): adicionar **slugs limpos** alternativos via `alternates.canonical`, mantendo os IDs como redirect 301.

---

## 4. Content Strategy

### Páginas existentes a otimizar (fase 1)

Por tipo, em ordem de prioridade SEO:

1. **`/registro/[id]/`** — cada uma deveria ter:
   - `<h1>` único com o título traduzido/legível (já tem)
   - JSON-LD `Article` ou `DigitalDocument` schema
   - Citações em `<blockquote>` da transcrição (passa pra AI como snippet citável)
   - `prev`/`next` links via similares (já tem — bom pra crawling)
   - OG image gerada dinamicamente (assunto + agência)

2. **`/dossie/[slug]/`** — atuar como **hub pages**:
   - JSON-LD `Collection` schema
   - Links internos pra todos os registros do dossiê
   - 200-400 palavras de introdução curada (já tem mas curto — expandir)
   - **Hoje só temos 2 dossiês** — meta é **+8 dossiês** até fase 3 (Roswell, Project Blue Book, Apollo, Foofighters, Oak Ridge, COMETA, Departamento de Guerra, Departamento de Estado).

3. **`/sobre/`** — E-E-A-T máximo:
   - JSON-LD `AboutPage` + `Person` (autor) + `Organization` (FF Media)
   - Já tem foto + bio do Fábio + crédito FF Media ✓
   - Adicionar: data de última atualização do arquivo, política editorial breve

4. **`/`** — landing:
   - JSON-LD `WebSite` + `SearchAction` (para sitelinks search box)
   - JSON-LD `Dataset` (todo o arquivo é um dataset!)
   - Hero atual já é SEO-friendly (h1 forte, ~150 palavras descritivas)

### Novo conteúdo a criar (fase 2-3)

| Conteúdo | Prioridade | Estimativa de tráfego (long-tail) |
|---|---|---|
| **8 dossiês temáticos** curados (1.500-2.500 palavras cada) | Alta | ~200-800 visitas/mês cada |
| **Glossário UAP/OVNI** em PT-BR (50-100 termos) | Média | ~100-300 visitas/mês |
| **Linha do tempo interativa** (1947-2026) | Média | tráfego de descoberta + share orgânico |
| **Página de imprensa/citações** | Baixa | autoridade |
| **FAQ canônica** ("O que é UAP?", "Por que Pentágono liberou?", etc.) | Alta | bom pra GEO/AI overviews |

### E-E-A-T building

- **Experience**: Fábio (jornalista) curador + atribuição clara FF Media
- **Expertise**: links pra fonte primária war.gov em **todos** os registros, transparência total sobre tradução automática
- **Authoritativeness**: precisa de **menções externas em PT-BR** (fase 3) — outreach: imprensa especializada, podcasts, Wikipedia PT (citar como fonte)
- **Trustworthiness**: HTTPS ✓, autor real ✓, contato visível ✓, disclaimer de tradução ✓

---

## 5. Technical Foundation

### Schema markup plan (JSON-LD, fase 1)

| Página | Schemas | Notas |
|---|---|---|
| `/` | `WebSite` + `SearchAction` + `Dataset` + `Organization` | `Dataset` declara o arquivo, ajuda Google Dataset Search |
| `/registro/[id]` | `Article` (subtype `NewsArticle` ou `Report`) + `BreadcrumbList` | Inclui `dateCreated`, `dateModified`, `author`, `publisher`, `inLanguage: pt-BR`, `isBasedOn: <war.gov-url>` |
| `/dossie/[slug]` | `CollectionPage` + `BreadcrumbList` | `mainEntity: ItemList` com os registros |
| `/sobre` | `AboutPage` + `Person` (autor) + `Organization` (FF Media) | |

### Generative Engine Optimization (GEO) — diferencial

Esse é onde podemos **superar concorrentes grandes**. Razões:
- AI search adora arquivos estruturados com fontes verificáveis
- Nosso conteúdo tem proveniência clara (war.gov)
- PT-BR + AI search é território menos saturado

Implementar (fase 2):
- `/llms.txt` na raiz — sumário canônico do arquivo
- Robots permitindo GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot, anthropic-ai
- Passagens citáveis: em cada `/registro/[id]`, garantir que o **blurb traduzido** está antes do texto completo, em parágrafos curtos (60-120 palavras) — formato que LLMs citam
- `<cite>` semântico nos links pra war.gov

### Performance — Core Web Vitals

Site já é estático (SSG) + Newsreader/IBM Plex carregados via `next/font/google` (self-hosted, sem layout shift). Verificar:
- LCP <2.5s: provavelmente OK (HTML estático, fonts otimizadas)
- CLS <0.1: precisa medir — imagens de gallery devem ter `width`/`height` (verificar)
- INP <200ms: MiniSearch no client → medir com search aberta

Lighthouse + PageSpeed Insights após deploy estável.

### Sitemap & robots

```
src/app/sitemap.ts        ← gera /sitemap.xml com TODAS as 1.157 URLs
src/app/robots.ts         ← permite tudo + aponta pro sitemap
public/llms.txt           ← contexto canônico pra AI crawlers
```

---

## 6. Implementation Roadmap

### Fase 1 — Fundação técnica (semanas 1-2)
**Objetivo: indexação completa + schema básico**

- [ ] **`sitemap.ts`** — Next 16 nativo, retorna lista de 1.157 URLs com lastModified e priority
- [ ] **`robots.ts`** — `allow: *` + permitir GPTBot, ClaudeBot, PerplexityBot explicitamente
- [ ] **JSON-LD** em `layout.tsx` (Organization) + `page.tsx` (WebSite + Dataset) + `registro/[id]` (Article) + `dossie/[slug]` (CollectionPage) + `sobre` (AboutPage + Person)
- [ ] **`opengraph-image.tsx`** dinâmico — gerar PNG por registro com agência + título traduzido
- [ ] **`alternates.canonical`** em todas as rotas
- [ ] Adicionar **Google Search Console** + submeter sitemap
- [ ] Adicionar **Bing Webmaster Tools** (Bing + ChatGPT search usam)

### Fase 2 — Conteúdo + GEO (semanas 3-6)
**Objetivo: cauda longa começa a ranquear, AI search nos cita**

- [ ] **`/llms.txt`** na raiz
- [ ] **Expandir blurbs dos 6 dossiês temáticos atuais** + adicionar 4 novos (Roswell, Apollo, Foofighters, COMETA)
- [ ] **Glossário UAP/OVNI** em PT-BR (~50 termos)
- [ ] **FAQ canônica** com schema `FAQPage`
- [ ] Otimizar `<h1>`/`<h2>` hierarquia em registros pra **passages** (extração por LLMs)
- [ ] Adicionar `<cite>` semântico nos links pra fonte original

### Fase 3 — Autoridade externa (meses 2-4)
**Objetivo: backlinks, menções, autoridade de domínio**

- [ ] **Wikipedia PT** — citar o arquivo como fonte em verbetes existentes (OVNI, UAP, Project Blue Book, Apollo 17)
- [ ] **Outreach** pra mídia especializada em PT-BR: BBC Brasil, Olhar Digital, Nexo Jornal, Tilt UOL — pitch: "primeiro arquivo PT-BR do release"
- [ ] **Podcasts** sobre ciência/mistério: Naruhodo, NerdCast, Anticast, Velha Mídia
- [ ] **Reddit PT** (r/brasil, r/conspiraciaBR, r/ciencia) — não-spam, só quando relevante
- [ ] **Twitter/X** — thread anual com casos mais impressionantes
- [ ] **Citações em papers/teses** — registrar no Zenodo / arquivo público acadêmico

### Fase 4 — Escala (meses 5-12)
**Objetivo: dominar long-tail + manter autoridade**

- [ ] **Release 02+** quando o Pentágono liberar mais documentos
- [ ] **Linha do tempo interativa** como peça de share orgânico
- [ ] **Recurso pra pesquisadores**: API JSON pública (`/api/records/[id].json`) — já temos os dados, é trivial
- [ ] **Newsletter** — recortes editoriais (canal direto, não-Google)
- [ ] **Versão EN** (se sobrar fôlego) — mercado MUITO maior, conteúdo nosso é melhor que muito site EN existente

---

## KPIs — alvos realistas

| Métrica | Hoje | 3 meses | 6 meses | 12 meses |
|---|---|---|---|---|
| Páginas indexadas (Google) | 0 | 1.157 | 1.157 | 1.157 |
| Sessões orgânicas/mês | 0 | 500 | 3.000 | 15.000 |
| Cliques no GSC | 0 | 100/mês | 800/mês | 4.000/mês |
| Impressões no GSC | 0 | 5.000/mês | 50.000/mês | 300.000/mês |
| Citações em AI search (ChatGPT/Perplexity, manual check) | 0 | 5 | 25 | 100+ |
| Backlinks de DA>30 | 0 | 2 | 8 | 25 |
| Core Web Vitals (mobile) | n/m | 90/95/95 | 95/95/95 | 95/95/95 |

**Premissa**: nicho específico (UFO/UAP arquivo em PT-BR) tem pico de busca natural, não vai virar milhões de pageviews. Mas 15k/mês para um arquivo independente é resultado forte.

---

## Riscos e mitigações

1. **Penalidade por conteúdo "duplicado" (traduzido)** — Google geralmente tolera traduções legítimas. Mitigação: cada página tem blurb único em PT-BR + curadoria + atribuição clara.
2. **Conteúdo sensível flagged como conspiração** — Mitigação: tom sóbrio (já está), fonte primária visível, atribuição governamental.
3. **AI Overviews citando sem clicar** — Mitigação: aceitar como sinal de autoridade. Nome "Arquivo OVNI/UAP" + "FF Media" sendo mencionado nas respostas já é valor.
4. **Domínio Vercel ou Hostinger fraco em DA** — Recomendação: mover pra **domínio próprio** o quanto antes (`arquivo.ffmedia.com.br` ou similar).

---

## Próximas ações concretas (esta semana)

1. ✅ Definir domínio final (subdomínio FF Media? domínio próprio?) → me avisa
2. ⏳ Implementar `sitemap.ts` + `robots.ts` + JSON-LD básico → próximo round
3. ⏳ Conectar Google Search Console + submeter sitemap
4. ⏳ Implementar `opengraph-image.tsx` dinâmico

---

**Resumo executivo**: o projeto tem **vantagem competitiva clara** (único arquivo primário em PT-BR), tom editorial sério, e estrutura técnica boa. Falta a camada de SEO programático (sitemap, schema, OG, GEO) — tudo trabalho rápido (~3-5 dias de implementação). Em 6 meses dá pra estar **citado por ChatGPT/Perplexity** em qualquer query sobre o release UAP em PT-BR, e em 12 meses ranqueando organicamente em cauda longa.
