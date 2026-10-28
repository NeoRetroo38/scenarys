import { createCubeEdges, createProjector } from '@neoretroo38/neo-cube-web';
import { useEffect, useState } from 'react';

type Pick = { row: number; column: number };
const edges = createCubeEdges(2.7);
const step = 0.85;
// Misma convención que choisys: x = columna, y = fila, z = fase. Solo dibuja; no calcula ni envía nada.
const at = (phase: number, row: number, column: number): [number, number, number] =>
  [(column - 2) * step, (2 - row) * step, (phase - 2) * step];
const lattice = [1, 2, 3].flatMap(phase => [1, 2, 3].flatMap(row => [1, 2, 3].map(column => at(phase, row, column))));

/** Demo de choisys: tres toques (uno por fase) y el recorrido se dibuja en el cubo al momento. */
export function DemoPlay() {
  const [picks, setPicks] = useState<Pick[]>([]);
  const [yaw, setYaw] = useState(0.6);
  const done = picks.length === 3;
  const phase = Math.min(3, picks.length + 1);

  // Al completar, el cubo da media vuelta lenta para enseñar el recorrido (si se permite el movimiento).
  useEffect(() => {
    if (!done || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let frame = 0; const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / 1800);
      setYaw(0.6 + (1 - Math.pow(1 - t, 3)) * Math.PI * 2);
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [done]);

  const project = createProjector({ yaw, pitch: 0.42, scale: 42, center: [135, 135] });
  const path = picks.map((p, i) => project(at(i + 1, p.row, p.column)));
  const reset = () => { setPicks([]); setYaw(0.6); };

  return (
    <figure className="m-0 flex flex-[1_1_420px] flex-wrap items-center justify-center gap-[clamp(24px,3vw,40px)]">
      <div className="w-[min(100%,210px)]">
        <p className="mb-4 font-mono text-[13px] text-ink-muted" aria-live="polite">
          {done ? 'recorrido completo' : `fase ${phase} de 3 · elige un círculo`}
        </p>
        <div role="group" aria-label={`Fase ${phase}: matriz de 3 por 3`} className={`grid grid-cols-3 gap-[clamp(12px,2vw,18px)] transition-opacity duration-300 ${done ? 'opacity-25' : ''}`}>
          {Array.from({ length: 9 }, (_, i) => {
            const row = Math.floor(i / 3) + 1, column = (i % 3) + 1;
            const chosen = picks[phase - 1]?.row === row && picks[phase - 1]?.column === column;
            return <button key={`${phase}-${i}`} type="button" disabled={done}
              aria-label={`Fila ${row}, columna ${column}`} onClick={() => setPicks(p => [...p, { row, column }])}
              className={`aspect-square w-full cursor-pointer rounded-full border-0 bg-ink p-0 transition-transform duration-200 hover:scale-110 active:scale-125 disabled:cursor-default ${chosen ? 'scale-110' : ''}`}
              style={{ animation: `pop 380ms ${i * 35}ms both` }} />;
          })}
        </div>
        <div className="mt-5 flex items-center gap-2" aria-hidden="true">
          {[1, 2, 3].map(n => <span key={n} className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${n <= picks.length ? 'bg-signal-deep' : 'bg-line'}`} />)}
        </div>
        {done && <button type="button" onClick={reset} className="mt-5 cursor-pointer rounded-full border border-ink bg-transparent px-5 py-2 text-sm hover:bg-ink hover:text-white">Otra vez</button>}
      </div>
      <svg viewBox="0 0 270 270" className="w-[min(100%,280px)]" role="img"
        aria-label={picks.length ? `Tu recorrido en el cubo: ${picks.map((p, i) => `fase ${i + 1} fila ${p.row} columna ${p.column}`).join(', ')}` : 'Cubo vacío'}>
        {edges.map(([a, b], i) => { const [x1, y1] = project(a); const [x2, y2] = project(b);
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="black" strokeOpacity={0.8} strokeWidth="1.2" />; })}
        {lattice.map((p, i) => { const [cx, cy] = project(p); return <circle key={i} cx={cx} cy={cy} r={1.6} fill="black" fillOpacity={0.2} />; })}
        {path.length > 1 && <polyline key={path.length} points={path.map(([x, y]) => `${x},${y}`).join(' ')} fill="none"
          stroke="black" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round" pathLength={1}
          style={{ strokeDasharray: 1, animation: 'draw 600ms ease-out both' }} />}
        {path.map(([cx, cy], i) => <g key={i}>
          <circle cx={cx} cy={cy} r={9} fill="var(--color-signal)" opacity={0.25} />
          <circle cx={cx} cy={cy} r={4.5} fill="var(--color-signal-deep)" style={{ animation: 'pop 380ms both' }} />
          <text x={cx + 8} y={cy + 14} fontSize="11" fontFamily="var(--font-mono)">{i + 1}</text>
        </g>)}
      </svg>
      <figcaption className="w-full text-center font-mono text-[12px] text-ink-muted">demo · no se guarda · el cubo solo dibuja tus tres elecciones</figcaption>
    </figure>
  );
}
