import Link from "next/link";

const NAV = [
  { href: "/", label: "Arquivo" },
  { href: "/dossie/biologics", label: "Dossiês" },
  { href: "/sobre", label: "Sobre" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-rule">
      <div className="mx-auto flex max-w-6xl items-end justify-between gap-4 px-6 py-6 md:gap-8 md:py-8">
        <Link href="/" className="group flex min-w-0 flex-col leading-none">
          <span className="font-mono text-[0.6rem] uppercase tracking-stamp text-ink-muted sm:text-[0.62rem]">
            Release 01 · Maio 2026
          </span>
          <span className="mt-2 whitespace-nowrap font-display text-[17px] font-semibold tracking-tight sm:text-2xl md:text-[28px]">
            Arquivo OVNI/UAP
            <span className="text-accent">.</span>
            <span className="hidden text-ink-muted sm:inline"> br</span>
          </span>
        </Link>
        <nav aria-label="Navegação principal" className="hidden md:block">
          <ul className="flex items-center gap-8 font-sans text-[15px]">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="border-b border-transparent pb-1 text-ink-soft transition-colors hover:border-accent hover:text-accent"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Navegação principal" className="md:hidden">
          <ul className="flex shrink-0 items-center gap-4 font-sans text-[13px]">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-ink-soft hover:text-accent">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
