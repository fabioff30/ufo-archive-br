"use client";

import { useId } from "react";

export function SearchBar({
  value,
  onChange,
  count,
  total,
}: {
  value: string;
  onChange: (next: string) => void;
  count: number;
  total: number;
}) {
  const id = useId();
  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="block font-mono text-[0.62rem] uppercase tracking-stamp text-ink-muted"
      >
        Buscar no arquivo
      </label>
      <div className="group relative">
        <input
          id={id}
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Oak Ridge, Project Blue Book, fotografias…"
          autoComplete="off"
          spellCheck={false}
          className="w-full border-b-2 border-ink bg-transparent py-3 pr-32 font-display text-2xl tracking-tight text-ink placeholder:font-display placeholder:text-ink-faint focus:outline-none md:text-3xl"
        />
        <span className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 font-mono text-[0.7rem] uppercase tracking-stamp text-ink-muted">
          {count === total
            ? `${total.toLocaleString("pt-BR")} registros`
            : `${count.toLocaleString("pt-BR")} / ${total.toLocaleString("pt-BR")}`}
        </span>
      </div>
    </div>
  );
}
