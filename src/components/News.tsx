import { findPublicPage } from '../publicPages.mjs';
import { useRef } from 'react';
import { WorkThumb } from './WorkMedia';
import { Container, Eyebrow } from './ui';

type Item = { tag: string; date: string; title: string; body: string; status: string; href?: string; link?: string };

const news: Item[] = [
  {
    tag: 'Cine · Corto', date: 'Oct 2026', title: 'Fight Cube — tráiler',
    body: 'Una habitación a oscuras, luz violeta y una pelea que aún no se ve. Ya está el tráiler del primer corto de Scenarys.',
    status: 'Tráiler disponible', href: '/fight-cube', link: 'Ver el tráiler',
  },
  {
    tag: 'Escritos · Libro', date: 'Oct 2026', title: 'El chamán — borrador',
    body: 'Alguien mata a artistas en Madrid y firma cada crimen como una obra. El libro antes titulado «Los límites» ya se puede leer en borrador.',
    status: 'En escritura', href: '/el-chaman', link: 'Leer el borrador',
  },
];

export function News() {
  const rail = useRef<HTMLUListElement>(null);
  const move = (dir: number) => rail.current?.scrollBy({ left: dir * Math.min(600, window.innerWidth * 0.86), behavior: 'smooth' });
  return (
    <section id="noticias" aria-labelledby="noticias-h" className="border-b border-line">
      <Container className="py-[clamp(72px,10vw,140px)]">
        <Eyebrow>04 — Noticias</Eyebrow>
        <h2 id="noticias-h" className="mb-[clamp(40px,6vw,72px)] text-[clamp(32px,4vw,52px)] leading-[1.05] font-normal tracking-[-0.035em]">
          Lo último del estudio.
        </h2>
        <div className="-mt-12 mb-6 flex justify-end gap-2">
          {[-1, 1].map(dir => <button key={dir} type="button" onClick={() => move(dir)} aria-label={dir < 0 ? 'Anterior' : 'Siguiente'}
            className="size-11 cursor-pointer rounded-full border border-ink bg-transparent text-lg hover:bg-ink hover:text-white">{dir < 0 ? '←' : '→'}</button>)}
        </div>
        <ul ref={rail} className="-mx-6 flex list-none snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-6 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {news.map((n) => (
            <li key={n.title} className="flex w-[min(86vw,580px)] shrink-0 snap-start flex-col overflow-hidden rounded-lg border border-line transition-transform duration-300 hover:-translate-y-1">
              {(() => { const m = n.href ? findPublicPage(n.href)?.media : undefined; return m && <a href={n.href} tabIndex={-1} aria-hidden="true"><WorkThumb media={m} className="aspect-[16/9]" /></a>; })()}
              <div className="flex flex-1 flex-col p-7">
              <div className="flex justify-between gap-3 font-mono text-[12px] uppercase tracking-[0.12em] text-ink-muted">
                <span>{n.tag}</span>
                <span>{n.date}</span>
              </div>
              <h3 className="mt-5 text-[clamp(24px,2.6vw,32px)] font-normal tracking-[-0.025em]">{n.title}</h3>
              <p className="mt-3 flex-1 text-[16px] leading-relaxed text-ink-soft">{n.body}</p>
              <div className="mt-6 flex items-center justify-between gap-3 text-sm">
                <span className="inline-flex items-center gap-2">
                  <span aria-hidden="true" className="size-2 rounded-full bg-signal-deep" />
                  {n.status}
                </span>
                {n.href && <a href={n.href} className="underline underline-offset-4 hover:text-ink-muted">{n.link}</a>}
              </div>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
