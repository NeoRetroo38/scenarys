import { createCubeEdges, createProjector } from '@neoretroo38/neo-cube-web';
import type { Point } from '../data/choisysCases';

const edges = createCubeEdges(2.7);
const step = 0.85;
// Same convention as choisys and DemoPlay: x = column, y = row, z = phase. Drawing only.
const at = (phase: number, row: number, column: number): [number, number, number] =>
  [(column - 2) * step, (2 - row) * step, (phase - 2) * step];
const line = (project: ReturnType<typeof createProjector>, run: Point[]) =>
  run.map(([p, r, c]) => project(at(p, r, c)).join(',')).join(' ');

/**
 * A cube of simulated results. `share[phase][cell]` (the engine's %) sets each point's size; `paths` are faint
 * sample runs; `highlight` is the run to read (the visitor's, or the reference).
 */
export function SimCube({ share, paths = [], highlight, label, tone = 'light', yaw = 0.62 }: {
  share?: number[][]; paths?: Point[][]; highlight?: Point[]; label: string; tone?: 'light' | 'dark'; yaw?: number;
}) {
  const project = createProjector({ yaw, pitch: 0.42, scale: 42, center: [135, 135] });
  const ink = tone === 'dark' ? 'white' : 'black';
  return (
    <svg viewBox="0 0 270 270" className="w-full max-w-[320px]" role="img" aria-label={label}>
      {edges.map(([a, b], i) => { const [x1, y1] = project(a); const [x2, y2] = project(b);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={ink} strokeOpacity={0.7} strokeWidth="1.1" />; })}
      {paths.map((run, i) => <polyline key={i} points={line(project, run)} fill="none" stroke={ink} strokeOpacity={tone === 'dark' ? 0.35 : 0.12} strokeWidth="1" />)}
      {[1, 2, 3].flatMap(phase => [1, 2, 3].flatMap(row => [1, 2, 3].map(column => {
        const [cx, cy] = project(at(phase, row, column));
        const value = share?.[phase - 1]?.[(row - 1) * 3 + column - 1] ?? 0;
        return <circle key={`${phase}${row}${column}`} cx={cx} cy={cy} r={1.6 + Math.sqrt(value) * 1.5}
          fill={ink} fillOpacity={share ? 0.28 : 0.2} />;
      })))}
      {highlight && <>
        <polyline points={line(project, highlight)} fill="none" stroke="var(--color-signal-deep)" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round" />
        {highlight.map(([p, r, c], i) => { const [cx, cy] = project(at(p, r, c));
          return <g key={i}><circle cx={cx} cy={cy} r={8} fill="var(--color-signal)" opacity={0.3} />
            <circle cx={cx} cy={cy} r={4.2} fill="var(--color-signal-deep)" />
            <text x={cx + 8} y={cy + 14} fontSize="11" fontFamily="var(--font-mono)" fill={ink}>{i + 1}</text></g>; })}
      </>}
    </svg>
  );
}
