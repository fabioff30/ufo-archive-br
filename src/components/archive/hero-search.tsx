"use client";

import { useId } from "react";

const SUGGESTIONS = ["Apollo", "Oak Ridge", "Project Blue Book", "foofighters", "Roswell"];

export function HeroSearch({
  value,
  onChange,
  total,
  filtered,
  media,
}: {
  value: string;
  onChange: (next: string) => void;
  total: number;
  filtered: number | null;
  media: { with_thumb: number; with_video: number; with_text: number };
}) {
  const id = useId();
  return (
    <section className="relative overflow-hidden border-b border-rule">
      <div className="mx-auto max-w-6xl px-6 pt-12 pb-14 md:pt-16 md:pb-20">
        <div className="flex flex-wrap items-center gap-3">
          <span className="stamp border-accent text-accent">Release 01</span>
          <span className="font-mono text-[0.62rem] uppercase tracking-stamp text-ink-muted">
            Maio de 2026 · war.gov
          </span>
        </div>

        <h1 className="mt-6 max-w-4xl font-display text-[32px] font-medium leading-[1.08] tracking-tight sm:text-[44px] sm:leading-[1.04] lg:text-[60px]">
          O que o Pentágono <em className="not-italic text-accent">finalmente</em>{" "}
          liberou sobre UAPs,{" "}
          <span className="text-ink-muted">indexado em português.</span>
        </h1>

        {/* Primary action — the search input is the focal element of the page */}
        <div className="mt-10 md:mt-12">
          <label
            htmlFor={id}
            className="block font-mono text-[0.62rem] uppercase tracking-stamp text-ink-muted"
          >
            Buscar no arquivo
          </label>
          <div className="group relative mt-3 border-y-2 border-ink">
            <input
              id={id}
              type="search"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="Buscar 1.150 documentos…"
              autoComplete="off"
              spellCheck={false}
              className="w-full bg-transparent py-4 pl-2 pr-3 font-display text-[24px] tracking-tight text-ink placeholder:font-display placeholder:text-ink-faint focus:outline-none sm:text-[28px] sm:pr-44 sm:py-5 md:text-[40px] md:py-6"
            />
            {/* Counter floats inside the input on tablet+; on mobile it
                drops below the input so it can't overlap typed text */}
            <span className="pointer-events-none hidden sm:block sm:absolute sm:right-2 sm:top-1/2 sm:-translate-y-1/2 sm:font-mono sm:text-[0.7rem] sm:uppercase sm:tracking-stamp sm:text-ink-muted">
              {filtered != null && filtered !== total
                ? `${filtered.toLocaleString("pt-BR")} / ${total.toLocaleString("pt-BR")}`
                : `${total.toLocaleString("pt-BR")} registros`}
            </span>
          </div>
          <p className="mt-2 font-mono text-[0.62rem] uppercase tracking-stamp text-ink-muted sm:hidden">
            {filtered != null && filtered !== total
              ? `${filtered.toLocaleString("pt-BR")} de ${total.toLocaleString("pt-BR")} registros`
              : `${total.toLocaleString("pt-BR")} registros`}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[0.62rem] uppercase tracking-stamp text-ink-muted">
            <span className="text-ink-faint">Tente:</span>
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => onChange(s)}
                className="border-b border-dotted border-rule pb-0.5 transition-colors hover:border-accent hover:text-accent"
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-baseline gap-x-8 gap-y-3 border-t border-rule pt-6 font-mono text-[0.62rem] uppercase tracking-stamp text-ink-muted">
          <Stat value={total} label="registros" />
          <Stat value={media.with_thumb} label="com imagem" />
          <Stat value={media.with_video} label="com vídeo" />
          <Stat value={media.with_text} label="transcrição em PT-BR" />
          <a
            href="https://github.com/zexiro/uap-disclosure-archive"
            target="_blank"
            rel="noopener noreferrer"
            className="ink-accent-link ml-auto"
          >
            Compilado de zexiro/uap-disclosure-archive ↗
          </a>
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <span className="flex items-baseline gap-2">
      <span className="font-display text-2xl font-medium tracking-tight text-ink">
        {value.toLocaleString("pt-BR")}
      </span>
      <span className="text-ink-muted">{label}</span>
    </span>
  );
}
