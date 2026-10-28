import { createCubeEdges, createDecisionGrid, createProjector } from '@neoretroo38/neo-cube-web';

// Marca estática reutilizable: el mismo cubo de neo-cube-web, con una vista distinta por obra.
const edges = createCubeEdges(2.7);
const grid = createDecisionGrid(0.85);

export function CubeMark({ size = 120, dark = false, yaw = 0.6, pitch = 0.45, className = '' }: {
  size?: number; dark?: boolean; yaw?: number; pitch?: number; className?: string;
}) {
  const project = createProjector({ yaw, pitch, scale: 42, center: [135, 135] });
  return (
    <svg viewBox="0 0 270 270" width={size} height={size} aria-hidden="true" className={`shrink-0 ${className}`}>
      {edges.map(([a, b], i) => {
        const [x1, y1] = project(a); const [x2, y2] = project(b);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={dark ? 'white' : 'black'} strokeOpacity={dark ? 0.65 : 0.85} strokeWidth="1.4" />;
      })}
      {grid.map((p, i) => {
        const [cx, cy] = project(p);
        return <circle key={i} cx={cx} cy={cy} r="2.4" fill={dark ? 'var(--color-signal)' : 'var(--color-signal-deep)'} />;
      })}
    </svg>
  );
}
