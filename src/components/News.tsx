import { CubeMark } from './CubeMark';
import { Container, Eyebrow } from './ui';

type Item = { tag: string; date: string; title: string; body: string; status: string; href?: string; link?: string; yaw: number };

const news: Item[] = [
  {
    tag: 'Cine · Corto', date: 'Oct 2026', title: 'Fight Cube — tráiler',
    body: 'Ya está aquí el tráiler de Fight Cube, el primer corto de Scenarys. El corto llegará dentro de poco.',
    status: 'Tráiler disponible', href: '/fight-cube', link: 'Ver el tráiler', yaw: 1.1,
  },
  {
    tag: 'Escritos · Libro', date: 'Oct 2026', title: 'El chamán — borrador',
    body: 'El libro antes titulado «Los límites» pasa a llamarse El chamán. El borrador sigue en marcha y ya se puede leer.',
    status: 'En escritura', href: '/el-chaman', link: 'Leer el borrador', yaw: -0.4,
  },
];

export function News() {
  return (
    <section id="noticias" aria-labelledby="noticias-h" className="border-b border-line">
      <Container className="py-[clamp(72px,10vw,140px)]">
        <Eyebrow>04 — Noticias</Eyebrow>
        <h2 id="noticias-h" className="mb-[clamp(40px,6vw,72px)] text-[clamp(32px,4vw,52px)] leading-[1.05] font-normal tracking-[-0.035em]">
          Lo último del estudio.
        </h2>
        <ul className="grid list-none gap-4 p-0 md:grid-cols-2">
          {news.map((n) => (
            <li key={n.title} className="flex flex-col rounded-lg border border-line p-7">
              <div className="flex justify-between gap-3 font-mono text-[12px] uppercase tracking-[0.12em] text-ink-muted">
                <span>{n.tag}</span>
                <span>{n.date}</span>
              </div>
              <div className="mt-5 flex items-center justify-between gap-4">
                <h3 className="text-[clamp(24px,2.6vw,32px)] font-normal tracking-[-0.025em]">{n.title}</h3>
                <CubeMark size={64} yaw={n.yaw} />
              </div>
              <p className="mt-3 flex-1 text-[16px] leading-relaxed text-ink-soft">{n.body}</p>
              <div className="mt-6 flex items-center justify-between gap-3 text-sm">
                <span className="inline-flex items-center gap-2">
                  <span aria-hidden="true" className="size-2 rounded-full bg-signal-deep" />
                  {n.status}
                </span>
                {n.href && <a href={n.href} className="underline underline-offset-4 hover:text-ink-muted">{n.link}</a>}
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
