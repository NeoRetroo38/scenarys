import { useState } from 'react';
import { PRODUCT_PHASES, PRODUCTS, SIMULATION, cellOf, int, pct, type Point } from '../data/choisysCases';
import { Funnel } from './Funnel';
import { SimCube } from './SimCube';
import { Container, Eyebrow } from './ui';

const sim = SIMULATION.product;

/** Selección de producto: three phases narrow a purchase to one concrete product; the simulated population answers beside it. */
export function ProductCase() {
  const [picks, setPicks] = useState<{ row: number; column: number }[]>([]);
  const done = picks.length === 3;
  const phase = PRODUCT_PHASES[Math.min(2, picks.length)];
  const path: Point[] = picks.map((p, i) => [i + 1, p.row, p.column]);
  const product = done ? PRODUCTS[cellOf(picks[2].row, picks[2].column)] : null;
  const combo = picks.length >= 2 ? cellOf(picks[0].row, picks[0].column) * 9 + cellOf(picks[1].row, picks[1].column) : -1;

  return (
    <div id="choisys-producto" className="border-t border-line">
      <Container className="py-[clamp(56px,8vw,112px)]">
        <Eyebrow>Caso 1 · Selección de producto</Eyebrow>
        <div className="grid gap-[clamp(32px,5vw,72px)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div>
            <h3 className="text-[clamp(32px,4vw,52px)] leading-[1.05] font-normal tracking-[-0.03em]">
              Del «no sé qué comprar» a un producto concreto, en tres toques.
            </h3>
            <p className="mt-6 max-w-[540px] text-[17px] leading-relaxed text-ink-soft">
              Un buscador te pide palabras; un filtro, que ya sepas lo que quieres. choisys pregunta como lo haría un buen
              dependiente: primero el contexto, después la prioridad y, al final, el producto. Cada fase cruza dos ideas en una
              matriz de 3 × 3, así que un solo toque dice mucho más que una casilla marcada.
            </p>
            <ul className="mt-6 grid max-w-[540px] list-none gap-2 p-0 text-[15px] leading-relaxed text-ink-soft">
              <li><b className="font-medium text-ink">Para la tienda:</b> sabe en qué fase se va la gente y qué combinación lleva a cada producto.</li>
              <li><b className="font-medium text-ink">Para quien compra:</b> tres decisiones claras en vez de cuarenta filtros.</li>
              <li><b className="font-medium text-ink">Para catálogo y stock:</b> cada recorrido es un dato estructurado, no un clic suelto.</li>
            </ul>
            <div className="mt-8">
              <p className="mb-3 font-mono text-[12px] uppercase tracking-[0.12em] text-ink-muted">
                {int(sim.people)} compradores simulados · embudo por fase
              </p>
              <Funnel steps={[
                { label: 'empiezan', count: sim.funnel[0], share: sim.funnelShare[0] },
                { label: 'contexto (fase 1)', count: sim.funnel[1], share: sim.funnelShare[1] },
                { label: 'prioridad (fase 2)', count: sim.funnel[2], share: sim.funnelShare[2] },
                { label: 'eligen producto', count: sim.funnel[3], share: sim.funnelShare[3] },
              ]} />
            </div>
          </div>

          <figure className="m-0 rounded-2xl border border-line p-[clamp(18px,3vw,32px)]">
            <p className="m-0 font-mono text-[12px] text-ink-muted" aria-live="polite">
              {done ? 'recorrido completo' : `fase ${picks.length + 1} de 3`}
            </p>
            {!done ? <>
              <p className="mt-2 mb-5 text-[clamp(20px,2.2vw,26px)] leading-tight tracking-[-0.01em]">{phase.question}</p>
              <div role="group" aria-label={phase.question} className="grid grid-cols-[minmax(4.5rem,auto)_repeat(3,minmax(0,1fr))] items-center gap-x-[clamp(8px,1.5vw,16px)] gap-y-3">
                <span />
                {phase.columns.map(c => <span key={c} className="text-center font-mono text-[11px] leading-tight text-ink-muted">{c}</span>)}
                {phase.rows.map((rowLabel, r) => <RowOfCells key={`${picks.length}-${rowLabel}`} rowLabel={rowLabel} row={r + 1} final={picks.length === 2}
                  onPick={column => setPicks(p => [...p, { row: r + 1, column }])} />)}
              </div>
              <div className="mt-5 flex gap-2" aria-hidden="true">
                {[0, 1, 2].map(n => <span key={n} className={`h-1.5 flex-1 rounded-full ${n < picks.length ? 'bg-signal-deep' : 'bg-line'}`} />)}
              </div>
            </> : product && <div className="mt-2">
              <p className="m-0 text-[clamp(28px,3vw,40px)] leading-none tracking-[-0.03em]">{product.name}</p>
              <p className="mt-2 mb-0 text-ink-muted">{product.detail} · {product.price}</p>
              <p className="mt-5 text-[15px] leading-relaxed text-ink-soft">
                De las <b className="font-medium text-ink">{int(sim.afterN[combo])}</b> personas simuladas que respondieron como tú en las
                dos primeras fases, el <b className="font-medium text-ink">{pct(sim.afterShare[combo][cellOf(picks[2].row, picks[2].column)])}</b> acabó
                en este mismo producto. Así se repartieron:
              </p>
              <ul className="m-0 mt-3 grid list-none gap-1.5 p-0">
                {PRODUCTS.map((item, i) => <li key={item.name} className="grid grid-cols-[4.5rem_minmax(0,1fr)_3.6rem] items-center gap-2 font-mono text-[12px]">
                  <span className={item === product ? 'text-ink' : 'text-ink-muted'}>{item.name}</span>
                  <span className="h-2 rounded-sm bg-line"><span className={`block h-full rounded-sm ${item === product ? 'bg-signal-deep' : 'bg-ink'}`} style={{ width: `${sim.afterShare[combo][i]}%` }} /></span>
                  <span className="text-right text-ink-muted">{pct(sim.afterShare[combo][i])}</span>
                </li>)}
              </ul>
              <button type="button" onClick={() => setPicks([])}
                className="mt-6 cursor-pointer rounded-full border border-ink bg-transparent px-5 py-2 text-sm hover:bg-ink hover:text-white">Otra vez</button>
            </div>}
            <div className="mt-6 flex justify-center border-t border-line pt-6">
              <SimCube share={sim.share} highlight={path.length ? path : undefined}
                label={`Cubo de la población simulada: el tamaño de cada punto es el porcentaje que lo eligió${path.length ? '; en verde, tu recorrido' : ''}.`} />
            </div>
            <figcaption className="mt-2 text-center font-mono text-[11px] leading-relaxed text-ink-muted">
              tamaño del punto = % de la población simulada que lo eligió · en verde, tu recorrido · no se guarda
            </figcaption>
          </figure>
        </div>
      </Container>
    </div>
  );
}

function RowOfCells({ rowLabel, row, final, onPick }: { rowLabel: string; row: number; final: boolean; onPick: (column: number) => void }) {
  return <>
    <span className="font-mono text-[11px] leading-tight text-ink-muted">{rowLabel}</span>
    {[1, 2, 3].map(column => {
      const item = final ? PRODUCTS[cellOf(row, column)] : null;
      return <button key={column} type="button" onClick={() => onPick(column)}
        aria-label={item ? `${item.name}, ${item.detail}, ${item.price}` : `${rowLabel}, columna ${column}`}
        className="group flex cursor-pointer flex-col items-center gap-1 border-0 bg-transparent p-0">
        <span className="block aspect-square w-[min(100%,56px)] rounded-full bg-ink transition-transform duration-200 group-hover:scale-110 group-active:scale-125"
          style={{ animation: `pop 380ms ${(row * 3 + column) * 30}ms both` }} />
        {item && <span className="text-center font-mono text-[10px] leading-tight text-ink-muted">{item.name}<br />{item.price}</span>}
      </button>;
    })}
  </>;
}
