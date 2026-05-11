import Link from "next/link";
import type { SimilarRef } from "@/lib/types";
import { typeLabel } from "@/lib/format";

export function RelatedRecords({
  items,
  title = "Documentos relacionados",
}: {
  items: SimilarRef[];
  title?: string;
}) {
  if (!items || items.length === 0) return null;
  const top = items.slice(0, 5);
  return (
    <aside className="space-y-4 border-t border-rule pt-8">
      <h2 className="font-mono text-[0.62rem] uppercase tracking-stamp text-ink-muted">
        {title}
      </h2>
      <ul className="space-y-3">
        {top.map((item) => (
          <li key={item.id}>
            <Link
              href={`/registro/${encodeURIComponent(item.id)}`}
              className="group flex items-baseline justify-between gap-4 border-b border-rule-soft pb-3 hover:border-accent"
            >
              <span className="space-y-1">
                <span className="block font-display text-base leading-snug group-hover:text-accent">
                  {prettify(item.title)}
                </span>
                {item.type ? (
                  <span className="font-mono text-[0.62rem] uppercase tracking-stamp text-ink-faint">
                    {typeLabel(item.type)}
                  </span>
                ) : null}
              </span>
              {typeof item.score === "number" ? (
                <span className="font-mono text-[0.68rem] tabular-nums text-ink-faint">
                  {(item.score * 100).toFixed(0)}%
                </span>
              ) : null}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}

function prettify(t: string): string {
  if (/^[\w-]+$/.test(t) && t.includes("_")) {
    return t.replace(/_/g, " ");
  }
  return t;
}
