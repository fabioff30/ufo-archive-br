import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-rule">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="max-w-md space-y-4">
            <p className="font-mono text-[0.62rem] uppercase tracking-stamp text-ink-muted">
              Arquivo OVNI/UAP · BR
            </p>
            <p className="font-display text-lg leading-snug">
              1.150 documentos desclassificados pelo Departamento de Defesa dos
              Estados Unidos, indexados e apresentados em português.
            </p>
            <p className="text-sm leading-relaxed text-ink-muted">
              Não substitui a fonte oficial. Recomendamos sempre consultar os
              arquivos originais em <span className="font-mono">war.gov</span> antes
              de citar qualquer trecho.
            </p>
          </div>
          <div className="space-y-3 text-sm">
            <h3 className="font-mono text-[0.62rem] uppercase tracking-stamp text-ink-muted">
              Conteúdo
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-accent">
                  Arquivo completo
                </Link>
              </li>
              <li>
                <Link href="/dossie/biologics" className="hover:text-accent">
                  Dossiê: material biológico
                </Link>
              </li>
              <li>
                <Link href="/dossie/hearings" className="hover:text-accent">
                  Dossiê: audiências
                </Link>
              </li>
              <li>
                <Link href="/sobre" className="hover:text-accent">
                  Sobre o projeto
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-accent">
                  Perguntas frequentes
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3 text-sm">
            <h3 className="font-mono text-[0.62rem] uppercase tracking-stamp text-ink-muted">
              Fonte primária
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.war.gov/medialink/ufo/release_1/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ink-accent-link"
                >
                  war.gov / Release 01 →
                </a>
              </li>
              <li className="text-ink-muted">FBI · NASA · USAF · Estado · Guerra</li>
            </ul>
            <h3 className="pt-3 font-mono text-[0.62rem] uppercase tracking-stamp text-ink-muted">
              Compilação
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://github.com/zexiro/uap-disclosure-archive"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ink-accent-link"
                >
                  github.com/zexiro/uap-disclosure-archive ↗
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-rule-soft pt-6 font-mono text-[0.65rem] uppercase tracking-stamp text-ink-faint">
          <span>© {new Date().getFullYear()} · Domínio público (EUA)</span>
          <span>
            Um projeto{" "}
            <a
              href="https://www.ffmedia.com.br/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink-muted underline-offset-4 hover:text-accent hover:underline"
            >
              FF Media ↗
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
