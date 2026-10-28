import { createCubeEdges, createDecisionGrid, createProjector } from '@neoretroo38/neo-cube-web';
import { useEffect, useRef, useState } from 'react';

const edges = createCubeEdges(2.7);
const grid = createDecisionGrid(0.85);
// Fixed, pseudo-random order in which the 27 decision points light up while scrolling.
const order = grid.map((_, i) => i).sort((a, b) => ((a * 7919) % 27) - ((b * 7919) % 27));

/** Portada: el cubo gira solo, se inclina hacia el puntero (o el móvil) y enciende sus puntos al bajar. */
export function LiveCube({ size, className = '' }: { size: number; className?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const [view, setView] = useState({ yaw: 0.6, pitch: 0.45, lit: 0 });

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const litNow = () => Math.min(1, window.scrollY / (window.innerHeight * 0.7));
    if (reduce) { setView({ yaw: 0.6, pitch: 0.45, lit: 1 }); return; }
    let target = { yaw: 0, pitch: 0 }, offset = { yaw: 0, pitch: 0 };
    let spin = 0.6, last = performance.now(), frame = 0, visible = true;
    const onPointer = (e: PointerEvent) => {
      target = { yaw: (e.clientX / window.innerWidth - 0.5) * 0.9, pitch: (e.clientY / window.innerHeight - 0.5) * 0.5 };
    };
    const onTilt = (e: DeviceOrientationEvent) => {
      if (e.gamma == null || e.beta == null) return;
      target = { yaw: (e.gamma / 90) * 0.9, pitch: ((e.beta - 45) / 90) * 0.5 };
    };
    const tick = (now: number) => {
      const dt = Math.min(50, now - last) / 1000;
      last = now;
      spin += dt * 0.22;
      offset = { yaw: offset.yaw + (target.yaw - offset.yaw) * 0.06, pitch: offset.pitch + (target.pitch - offset.pitch) * 0.06 };
      setView({ yaw: spin + offset.yaw, pitch: 0.45 + offset.pitch, lit: litNow() });
      frame = visible ? requestAnimationFrame(tick) : 0;
    };
    // Only animate while the cube is on screen.
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !frame) { last = performance.now(); frame = requestAnimationFrame(tick); }
    });
    if (ref.current) io.observe(ref.current);
    window.addEventListener('pointermove', onPointer, { passive: true });
    window.addEventListener('deviceorientation', onTilt);
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame); io.disconnect();
      window.removeEventListener('pointermove', onPointer); window.removeEventListener('deviceorientation', onTilt);
    };
  }, []);

  const project = createProjector({ yaw: view.yaw, pitch: view.pitch, scale: 42, center: [135, 135] });
  const litCount = Math.round(0.15 * 27 + view.lit * 0.85 * 27);
  const litSet = new Set(order.slice(0, litCount));
  return (
    <svg ref={ref} viewBox="0 0 270 270" width={size} height={size} aria-hidden="true" className={`shrink-0 overflow-visible ${className}`}>
      {edges.map(([a, b], i) => {
        const [x1, y1] = project(a); const [x2, y2] = project(b);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="black" strokeOpacity={0.85} strokeWidth="1.3" />;
      })}
      {grid.map((p, i) => {
        const [cx, cy] = project(p);
        const on = litSet.has(i);
        return <g key={i}>
          {on && <circle cx={cx} cy={cy} r={7} fill="var(--color-signal)" opacity={0.22} />}
          <circle cx={cx} cy={cy} r={on ? 3 : 2} fill={on ? 'var(--color-signal-deep)' : 'black'} fillOpacity={on ? 1 : 0.25}
            style={{ transition: 'r 300ms, fill-opacity 300ms' }} />
        </g>;
      })}
    </svg>
  );
}
