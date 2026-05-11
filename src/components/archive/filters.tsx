"use client";

import type { IndexMeta } from "@/lib/types";
import { agencyLabel, typeLabel } from "@/lib/format";

export type FacetSelection = {
  agencies: Set<string>;
  types: Set<string>;
  decades: Set<string>;
  onlyWithMedia: boolean;
};

export function Filters({
  meta,
  selection,
  onToggle,
  onMediaToggle,
  onReset,
  activeCount,
}: {
  meta: IndexMeta;
  selection: FacetSelection;
  onToggle: (group: "agencies" | "types" | "decades", value: string) => void;
  onMediaToggle: () => void;
  onReset: () => void;
  activeCount: number;
}) {
  return (
    <aside className="space-y-8 lg:sticky lg:top-8 lg:self-start">
      <div className="flex items-center justify-between">
        <h2 className="font-mono text-[0.62rem] uppercase tracking-stamp text-ink-muted">
          Filtros {activeCount > 0 ? `· ${activeCount} ativos` : ""}
        </h2>
        {activeCount > 0 ? (
          <button
            type="button"
            onClick={onReset}
            className="font-mono text-[0.62rem] uppercase tracking-stamp text-accent hover:underline"
          >
            Limpar
          </button>
        ) : null}
      </div>

      <FilterGroup
        title="Agência"
        items={meta.agencies.map((a) => ({
          value: a.value,
          label: agencyLabel(a.value),
          count: a.count,
        }))}
        selected={selection.agencies}
        onToggle={(value) => onToggle("agencies", value)}
      />

      <FilterGroup
        title="Tipo de registro"
        items={meta.types.map((t) => ({
          value: t.value,
          label: typeLabel(t.value),
          count: t.count,
        }))}
        selected={selection.types}
        onToggle={(value) => onToggle("types", value)}
      />

      <FilterGroup
        title="Década do incidente"
        items={meta.decades.map((d) => ({
          value: d.value,
          label: d.value.replace("s", "s"),
          count: d.count,
        }))}
        selected={selection.decades}
        onToggle={(value) => onToggle("decades", value)}
      />

      <div className="space-y-3 border-t border-rule pt-6">
        <label className="flex cursor-pointer items-start gap-3 text-sm">
          <input
            type="checkbox"
            checked={selection.onlyWithMedia}
            onChange={onMediaToggle}
            className="mt-[3px] h-4 w-4 cursor-pointer accent-[var(--color-accent)]"
          />
          <span>
            <span className="font-medium">Só com imagem ou vídeo</span>
            <span className="block text-xs text-ink-muted">
              {meta.media.with_thumb} com imagem · {meta.media.with_video} com vídeo
            </span>
          </span>
        </label>
      </div>
    </aside>
  );
}

function FilterGroup({
  title,
  items,
  selected,
  onToggle,
}: {
  title: string;
  items: { value: string; label: string; count: number }[];
  selected: Set<string>;
  onToggle: (value: string) => void;
}) {
  return (
    <section className="space-y-3">
      <h3 className="font-mono text-[0.62rem] uppercase tracking-stamp text-ink-muted">
        {title}
      </h3>
      <ul className="space-y-1.5">
        {items.map((item) => {
          const active = selected.has(item.value);
          return (
            <li key={item.value}>
              <button
                type="button"
                onClick={() => onToggle(item.value)}
                aria-pressed={active}
                className={`flex w-full items-baseline justify-between gap-3 border-b border-dotted border-transparent py-1 text-left text-[14px] transition-colors hover:border-rule ${
                  active ? "text-accent" : "text-ink-soft"
                }`}
              >
                <span className="flex items-center gap-2">
                  <span
                    aria-hidden
                    className={`inline-block h-1.5 w-1.5 rounded-full border border-current ${
                      active ? "bg-current" : "bg-transparent"
                    }`}
                  />
                  {item.label}
                </span>
                <span className="font-mono text-[0.7rem] tabular-nums text-ink-faint">
                  {item.count.toLocaleString("pt-BR")}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
