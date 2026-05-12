"use client";

import { useCallback, useDeferredValue, useEffect, useMemo, useState, type ReactNode } from "react";
import MiniSearch from "minisearch";
import type { IndexMeta, SearchRecord } from "@/lib/types";
import { HeroSearch } from "./hero-search";
import { Filters, type FacetSelection } from "./filters";
import { RecordCard } from "./record-card";

const PAGE_SIZE = 24;

export function ArchiveClient({
  records,
  meta,
  children,
}: {
  records: SearchRecord[];
  meta: IndexMeta;
  children?: ReactNode;
}) {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const [agencies, setAgencies] = useState<Set<string>>(new Set());
  const [types, setTypes] = useState<Set<string>>(new Set());
  const [decades, setDecades] = useState<Set<string>>(new Set());
  const [onlyMedia, setOnlyMedia] = useState(false);
  const [visible, setVisible] = useState(PAGE_SIZE);

  const mini = useMemo(() => {
    const ms = new MiniSearch<SearchRecord>({
      idField: "id",
      fields: ["title", "blurb", "blurb_pt", "incident_location", "agency"],
      storeFields: ["id"],
      extractField: (doc, field) =>
        (doc as unknown as Record<string, unknown>)[field] != null
          ? String((doc as unknown as Record<string, unknown>)[field])
          : "",
      searchOptions: {
        boost: { title: 2, blurb_pt: 1.2, blurb: 1 },
        prefix: true,
        fuzzy: 0.15,
        combineWith: "AND",
      },
    });
    ms.addAll(records);
    return ms;
  }, [records]);

  const searched = useMemo(() => {
    const q = deferredQuery.trim();
    if (q.length < 2) return records;
    const hits = mini.search(q);
    const order = new Map(hits.map((h, i) => [h.id, i]));
    return records.filter((r) => order.has(r.id)).sort((a, b) => {
      return (order.get(a.id) ?? 0) - (order.get(b.id) ?? 0);
    });
  }, [deferredQuery, mini, records]);

  const filtered = useMemo(() => {
    return searched.filter((r) => {
      if (agencies.size && !agencies.has(r.agency)) return false;
      if (types.size && !types.has(r.type)) return false;
      if (decades.size) {
        if (!r.decade || !decades.has(r.decade)) return false;
      }
      if (onlyMedia && !r.has_thumb && !r.has_video) return false;
      return true;
    });
  }, [searched, agencies, types, decades, onlyMedia]);

  useEffect(() => {
    setVisible(PAGE_SIZE);
  }, [deferredQuery, agencies, types, decades, onlyMedia]);

  const handleToggle = useCallback(
    (group: "agencies" | "types" | "decades", value: string) => {
      const setters = { agencies: setAgencies, types: setTypes, decades: setDecades };
      const current = { agencies, types, decades }[group];
      const next = new Set(current);
      if (next.has(value)) next.delete(value);
      else next.add(value);
      setters[group](next);
    },
    [agencies, types, decades],
  );

  const reset = useCallback(() => {
    setAgencies(new Set());
    setTypes(new Set());
    setDecades(new Set());
    setOnlyMedia(false);
  }, []);

  const activeCount =
    agencies.size + types.size + decades.size + (onlyMedia ? 1 : 0);

  const selection: FacetSelection = {
    agencies,
    types,
    decades,
    onlyWithMedia: onlyMedia,
  };

  const pageItems = filtered.slice(0, visible);
  const hasMore = visible < filtered.length;
  const querying = deferredQuery.trim().length >= 2;
  const filtering = activeCount > 0;

  return (
    <>
      <HeroSearch
        value={query}
        onChange={setQuery}
        total={meta.total}
        filtered={querying || filtering ? filtered.length : null}
        media={meta.media}
      />

      {/* Slot for server-rendered sections (highlights, gallery, etc.).
          Hidden when the user is actively searching so results aren't pushed
          off-screen by curated content. */}
      {!querying && !filtering ? children : null}

      <section
        id="arquivo"
        className="mx-auto max-w-6xl scroll-mt-8 px-6 pb-16"
      >
        <div className="mb-10 flex items-baseline justify-between gap-4 border-t border-rule pt-10">
          <h2 className="font-display text-[28px] font-medium leading-tight tracking-tight md:text-[32px]">
            {querying ? (
              <>
                <span className="text-ink-muted">Resultados para</span>{" "}
                <span className="italic">"{deferredQuery.trim()}"</span>
              </>
            ) : filtering ? (
              "Resultados filtrados"
            ) : (
              "Arquivo completo"
            )}
          </h2>
          <span className="font-mono text-[0.62rem] uppercase tracking-stamp text-ink-muted">
            {filtered.length.toLocaleString("pt-BR")} registros
          </span>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[240px_1fr] lg:gap-12">
          {/* Mobile: collapsible accordion (uses same in-flow pattern as the
              "Ver original em inglês" disclosures elsewhere on the site) */}
          <details className="group border-b border-rule lg:hidden">
            <summary className="flex cursor-pointer items-center justify-between gap-3 py-4 font-mono text-[0.62rem] uppercase tracking-stamp text-ink-muted marker:hidden list-none">
              <span className="flex items-center gap-2">
                <span
                  aria-hidden
                  className="inline-block h-px w-3 bg-ink transition-transform group-open:rotate-90"
                />
                Filtros
                {activeCount > 0 ? (
                  <span className="text-accent">· {activeCount} ativos</span>
                ) : null}
              </span>
              <span className="text-ink-faint">
                <span className="group-open:hidden">Mostrar</span>
                <span className="hidden group-open:inline">Ocultar</span>
              </span>
            </summary>
            <div className="pb-6 pt-2">
              <Filters
                meta={meta}
                selection={selection}
                onToggle={handleToggle}
                onMediaToggle={() => setOnlyMedia((v) => !v)}
                onReset={reset}
                activeCount={activeCount}
              />
            </div>
          </details>

          {/* Desktop sidebar: always-visible (>= lg) */}
          <div className="hidden lg:block">
            <Filters
              meta={meta}
              selection={selection}
              onToggle={handleToggle}
              onMediaToggle={() => setOnlyMedia((v) => !v)}
              onReset={reset}
              activeCount={activeCount}
            />
          </div>

          <section aria-live="polite">
            {pageItems.length === 0 ? (
              <div className="paper-card flex flex-col items-start gap-3 px-6 py-10">
                <p className="font-mono text-[0.62rem] uppercase tracking-stamp text-ink-muted">
                  Sem correspondências
                </p>
                <p className="font-display text-xl">
                  Nenhum registro bate com os filtros aplicados.
                </p>
                <button
                  type="button"
                  onClick={reset}
                  className="ink-accent-link mt-2 text-sm"
                >
                  Limpar todos os filtros
                </button>
              </div>
            ) : (
              <>
                <ol className="space-y-2">
                  {pageItems.map((record, idx) => (
                    <li key={record.id}>
                      <RecordCard
                        record={record}
                        index={idx}
                        query={deferredQuery}
                      />
                    </li>
                  ))}
                </ol>
                {hasMore ? (
                  <div className="mt-10 flex flex-col items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setVisible((v) => v + PAGE_SIZE)}
                      className="stamp border-ink text-ink hover:bg-ink hover:text-paper"
                    >
                      Carregar mais {Math.min(PAGE_SIZE, filtered.length - visible)} →
                    </button>
                    <p className="font-mono text-[0.62rem] uppercase tracking-stamp text-ink-faint">
                      Exibindo {pageItems.length.toLocaleString("pt-BR")} de{" "}
                      {filtered.length.toLocaleString("pt-BR")}
                    </p>
                  </div>
                ) : (
                  <p className="mt-10 text-center font-mono text-[0.62rem] uppercase tracking-stamp text-ink-faint">
                    Fim do arquivo
                  </p>
                )}
              </>
            )}
          </section>
        </div>
      </section>
    </>
  );
}
