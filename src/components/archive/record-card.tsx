import Link from "next/link";
import type { SearchRecord } from "@/lib/types";
import { agencyLabel, formatDate, prettifyTitle, typeLabel } from "@/lib/format";

export function RecordCard({
  record,
  index,
  query,
}: {
  record: SearchRecord;
  index: number;
  query?: string;
}) {
  const number = String(index + 1).padStart(4, "0");
  const dateLabel = formatDate(record.incident_date) || formatDate(record.release_date);
  const loc = record.incident_location && record.incident_location !== "N/A"
    ? record.incident_location
    : null;

  return (
    <article
      className="reveal group relative flex flex-col gap-4 border-b border-rule pb-6 pt-2"
      style={{ animationDelay: `${Math.min(index, 18) * 35}ms` }}
    >
      <header className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <p className="font-mono text-[0.62rem] uppercase tracking-stamp text-ink-muted">
            №&nbsp;{number} · {agencyLabel(record.agency)}
          </p>
          <h3 className="font-display text-[20px] leading-[1.15] tracking-tight md:text-[22px]">
            <Link
              href={`/registro/${encodeURIComponent(record.id)}`}
              className="transition-colors group-hover:text-accent"
            >
              {prettifyTitle(record.title)}
            </Link>
          </h3>
        </div>
        <span className="stamp shrink-0 border-rule text-ink-muted">
          {typeLabel(record.type)}
        </span>
      </header>

      {record.blurb_pt || record.blurb ? (
        <p className="max-w-[65ch] text-[15px] leading-relaxed text-ink-soft">
          <Highlight text={record.blurb_pt || record.blurb} query={query} />
        </p>
      ) : null}

      <footer className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1 font-mono text-[0.68rem] uppercase tracking-meta text-ink-muted">
        <span>{dateLabel}</span>
        {loc ? <span className="normal-case tracking-normal text-ink-faint">{loc}</span> : null}
        {record.has_thumb ? <Badge>com imagem</Badge> : null}
        {record.has_video ? <Badge>com vídeo</Badge> : null}
        {record.has_text ? <Badge>texto integral</Badge> : null}
        {record.redacted ? <Badge tone="accent">tarjado</Badge> : null}
      </footer>
    </article>
  );
}

function Badge({
  children,
  tone = "muted",
}: {
  children: React.ReactNode;
  tone?: "muted" | "accent";
}) {
  const color =
    tone === "accent"
      ? "border-accent/40 text-accent"
      : "border-rule text-ink-muted";
  return (
    <span
      className={`inline-flex items-center rounded-[1px] border px-1.5 py-0.5 text-[0.62rem] ${color}`}
    >
      {children}
    </span>
  );
}

function Highlight({ text, query }: { text: string; query?: string }) {
  const q = query?.trim();
  if (!q || q.length < 2) return <>{text}</>;
  try {
    const re = new RegExp(`(${escapeRegex(q)})`, "gi");
    const parts = text.split(re);
    return (
      <>
        {parts.map((part, i) =>
          re.test(part) && i % 2 === 1 ? (
            <mark
              key={i}
              className="bg-[color-mix(in_oklab,var(--color-flag)_60%,transparent)] px-0.5 text-ink"
            >
              {part}
            </mark>
          ) : (
            <span key={i}>{part}</span>
          ),
        )}
      </>
    );
  } catch {
    return <>{text}</>;
  }
}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

