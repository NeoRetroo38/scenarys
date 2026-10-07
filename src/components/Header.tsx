import { CHOISYS_URL } from '../config';
import { Container, PillLink } from './ui';

const navLinks = [
  { href: '#choisys', label: 'choisys' },
  { href: '#estudio', label: 'Estudio' },
  { href: '#contacto', label: 'Contacto' },
];

export function Header() {
  return (
    <header className="border-b border-line">
      <Container>
        <nav aria-label="Principal" className="flex flex-wrap items-center justify-between gap-4 py-5">
          <a href="#inicio" className="text-[22px] tracking-[-0.03em] no-underline">
            scenarys
          </a>
          <div className="flex flex-wrap items-center gap-x-7 gap-y-3 text-[15px]">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="hidden no-underline hover:text-ink-muted sm:inline">
                {link.label}
              </a>
            ))}
            <PillLink href={CHOISYS_URL} className="!px-5 !py-3 text-[15px]">
              Abrir choisys
            </PillLink>
          </div>
        </nav>
      </Container>
    </header>
  );
}
