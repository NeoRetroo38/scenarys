import { Container, Eyebrow } from './ui';

type Discipline = { name: string; status: string; active?: boolean };

const disciplines: Discipline[] = [
  { name: 'Software', status: 'choisys · en beta', active: true },
  { name: 'Sistemas interactivos', status: 'próximamente' },
  { name: 'Hardware', status: 'próximamente' },
  { name: 'Videojuegos', status: 'próximamente' },
  { name: 'Música', status: 'próximamente' },
  { name: 'Cine', status: 'próximamente' },
];

export function Studio() {
  return (
    <section id="estudio" aria-labelledby="estudio-h" className="border-b border-line">
      <Container className="py-[clamp(72px,10vw,140px)]">
        <Eyebrow>03 — Estudio</Eyebrow>
        <div className="flex flex-wrap justify-between gap-12">
          <h2
            id="estudio-h"
            className="max-w-[560px] flex-[1_1_380px] text-[clamp(32px,4vw,52px)] leading-[1.05] font-normal tracking-[-0.035em]"
          >
            Una compañía pensada para crecer en varias disciplinas.
          </h2>
          <p className="max-w-[480px] flex-[1_1_320px] text-[17px] leading-relaxed text-ink-soft">
            choisys es el primer paso. Scenarys nace para construir productos donde la técnica y la creación se
            encuentran, con la misma exigencia de diseño en cada uno.
          </p>
        </div>
        <ul className="mt-[clamp(48px,6vw,80px)] list-none p-0">
          {disciplines.map((d) => (
            <li
              key={d.name}
              className="flex flex-wrap items-baseline justify-between gap-3 border-t border-ink py-[22px] last:border-b"
            >
              <span className="text-[clamp(24px,2.6vw,34px)] tracking-[-0.025em]">{d.name}</span>
              <span className={`font-mono text-[13px] ${d.active ? 'text-ink' : 'text-ink-muted'}`}>{d.status}</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
