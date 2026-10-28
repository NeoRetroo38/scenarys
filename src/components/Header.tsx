import { CHOISYS_URL } from '../config';
import { Container, PillLink } from './ui';

const navLinks = [
  { href: '/#choisys', label: 'choisys' },
  { href: '/#precios', label: 'Precios' },
  { href: '/#noticias', label: 'Noticias' },
  { href: '/daemon', label: 'Daemon' },
  { href: '/downloads', label: 'Descargas' },
  { href: '/docs', label: 'Docs' },
];

export function Header() {
  return (
    <header className="border-b border-line">
      <Container>
        <nav aria-label="Principal" className="flex flex-wrap items-center justify-between gap-4 py-5">
          <a href="/#inicio" className="text-[22px] tracking-[-0.03em] no-underline">
            scenarys
          </a>
          <div className="flex items-center gap-x-3 text-[15px] sm:flex-wrap sm:gap-x-7 sm:gap-y-3">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="hidden no-underline hover:text-ink-muted sm:inline">
                {link.label}
              </a>
            ))}
            <PillLink href={CHOISYS_URL} className="!px-5 !py-3 text-[15px]">
              Abrir choisys
            </PillLink>
            <details className="relative sm:hidden">
              <summary className="flex min-h-11 cursor-pointer list-none items-center rounded-full border border-ink px-5 [&::-webkit-details-marker]:hidden">
                Menú
              </summary>
              <div className="absolute right-0 z-10 mt-2 flex w-48 flex-col rounded-lg border border-line bg-paper py-2 shadow-sm">
                {navLinks.map((link) => (
                  <a key={link.href} href={link.href} data-menu onClick={(e) => e.currentTarget.closest("details")?.removeAttribute("open")} className="px-5 py-3 no-underline hover:bg-line">
                    {link.label}
                  </a>
                ))}
              </div>
            </details>
          </div>
        </nav>
      </Container>
    </header>
  );
}
