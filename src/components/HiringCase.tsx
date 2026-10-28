import { HIRING_PHASES, SIMULATION, int, pct } from '../data/choisysCases';
import { Funnel } from './Funnel';
import { SimCube } from './SimCube';
import { Container, Eyebrow } from './ui';

const sim = SIMULATION.hiring;
const tallest = Math.max(...sim.histogram);

/** Selección de personal: candidates by link, compared by the engine with the role's reference cube. */
export function HiringCase() {
  return (
    <div id="choisys-rrhh" className="bg-ink text-white">
      <Container className="py-[clamp(56px,8vw,112px)]">
        <Eyebrow tone="inverse">Caso 2 · Selección de personal</Eyebrow>
        <div className="grid gap-[clamp(32px,5vw,72px)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div>
            <h3 className="text-[clamp(32px,4vw,52px)] leading-[1.05] font-normal tracking-[-0.03em]">
              Un cubo de referencia por puesto. Un enlace. Todos los candidatos, comparados igual.
            </h3>
            <p className="mt-6 max-w-[540px] text-[17px] leading-relaxed text-[#cfcfcf]">
              La empresa responde el cubo del puesto y lo publica como referencia. Cada candidato entra por el enlace, sin crear
              cuenta, y responde las mismas fases. El Cubo de Neo calcula la similitud de cada recorrido con la referencia,
              en total y fase a fase, con la misma regla para todos.
            </p>
            <ol className="mt-6 grid max-w-[540px] list-none gap-3 p-0">
              {HIRING_PHASES.map((phase, i) => <li key={phase.question} className="text-[15px] leading-relaxed text-[#cfcfcf]">
                <span className="font-mono text-[12px] text-signal">fase {i + 1}</span> · {phase.question}{' '}
                <span className="text-[#8a8a8a]">({phase.rows.join(' / ')} × {phase.columns.join(' / ')})</span>
              </li>)}
            </ol>
            <div className="mt-8">
              <p className="mb-3 font-mono text-[12px] uppercase tracking-[0.12em] text-[#b3b3b3]">{int(sim.funnel[0])} invitaciones simuladas</p>
              <Funnel tone="dark" steps={[
                { label: 'reciben el enlace', count: sim.funnel[0], share: sim.funnelShare[0] },
                { label: 'lo abren', count: sim.funnel[1], share: sim.funnelShare[1] },
                { label: 'completan las 3 fases', count: sim.funnel[2], share: sim.funnelShare[2] },
              ]} />
            </div>
            <p className="mt-8 max-w-[540px] border-l-2 border-signal pl-4 text-[14px] leading-relaxed text-[#b3b3b3]">
              La similitud mide proximidad dentro de la cuadrícula de este cubo. No mide personalidad ni capacidad, y no
              descarta a nadie: ordena los datos para que la decisión, que es humana, se tome con todos delante.
            </p>
          </div>

          <div>
            <div className="flex justify-center">
              <SimCube tone="dark" highlight={sim.reference} paths={sim.ranking.slice(0, 6).map(r => r.run)}
                label="Cubo de referencia del puesto en verde y, en trazo fino, los seis candidatos simulados más similares." />
            </div>
            <p className="mt-1 text-center font-mono text-[11px] text-[#8a8a8a]">en verde, la referencia del puesto · en fino, los 6 más similares</p>

            <p className="mt-8 mb-3 font-mono text-[12px] uppercase tracking-[0.12em] text-[#b3b3b3]">
              similitud de {int(sim.funnel[2])} candidatos · tramos de 10 puntos
            </p>
            <div className="flex h-28 items-end gap-1" role="img"
              aria-label={`Histograma: ${sim.histogram.map((n, i) => `${i * 10}–${i * 10 + 10} %: ${n}`).join(', ')}`}>
              {sim.histogram.map((n, i) => <div key={i} className="flex flex-1 flex-col items-center justify-end gap-1">
                <span className="font-mono text-[10px] text-[#8a8a8a]">{n}</span>
                <span className={`w-full rounded-t-sm ${i >= 8 ? 'bg-signal' : 'bg-white/70'}`} style={{ height: `${(n / tallest) * 80}px` }} />
              </div>)}
            </div>
            <div className="mt-1 flex justify-between font-mono text-[10px] text-[#8a8a8a]"><span>0 %</span><span>50 %</span><span>100 %</span></div>

            <p className="mt-8 mb-3 font-mono text-[12px] uppercase tracking-[0.12em] text-[#b3b3b3]">ranking · lo que ve solo quien publicó el enlace</p>
            <table className="w-full border-collapse font-mono text-[12px]">
              <thead><tr className="text-left text-[#8a8a8a]">
                <th className="py-1 font-normal">#</th><th className="py-1 font-normal">candidato</th><th className="py-1 text-right font-normal">similitud</th>
                {[1, 2, 3].map(p => <th key={p} className="hidden py-1 text-right font-normal sm:table-cell">f{p}</th>)}
              </tr></thead>
              <tbody>{sim.ranking.slice(0, 8).map((r, i) => <tr key={r.id} className="border-t border-[#2a2a2a]">
                <td className="py-1.5 text-[#8a8a8a]">{i + 1}</td>
                <td className="py-1.5">candidato {String(r.id).padStart(3, '0')}</td>
                <td className="py-1.5 text-right text-signal">{pct(r.similarity)}</td>
                {r.phases.map((v, p) => <td key={p} className="hidden py-1.5 text-right text-[#b3b3b3] sm:table-cell">{pct(v)}</td>)}
              </tr>)}</tbody>
            </table>
            <p className="mt-3 font-mono text-[11px] text-[#8a8a8a]">
              media por fase: {sim.phaseMean.map((v, i) => `f${i + 1} ${pct(v)}`).join(' · ')}
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
