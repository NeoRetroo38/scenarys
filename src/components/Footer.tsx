import { Container } from './ui';

const legalLinks = [
  { href: '/status', label: 'Estado público' },
  { href: '/releases', label: 'Versiones' },
  { href: '/legal', label: 'Información del sitio' },
];

export function Footer() {
  return (
    <footer className="border-t border-line">
      <Container className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4 py-8 text-sm text-[#444444]">
        <span>© {new Date().getFullYear()} Scenarys S.L.</span>
        <div className="flex flex-wrap gap-6">
          {legalLinks.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-ink">
              {link.label}
            </a>
          ))}
        </div>
      </Container>
    </footer>
  );
}
