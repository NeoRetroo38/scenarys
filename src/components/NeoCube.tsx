import { createCubeEdges, createDecisionGrid, createProjector } from '@neoretroo38/neo-cube-web';
import { useEffect, useId, useRef, useState } from 'react';
import type { KeyboardEvent, PointerEvent } from 'react';
import {
  INITIAL_CUBE_VIEW, MAX_CUBE_ZOOM, MIN_CUBE_ZOOM,
  applyCubeKey, applyPointerChange, resetCubeView, zoomCube,
} from './cubeInteraction.mjs';
import type { CubePointer } from './cubeInteraction.mjs';
import { Container, Eyebrow } from './ui';

// Copy pública del Cubo de Neo. Describe su naturaleza (propietario, local, en C++)
// sin revelar ninguna parte del modelo matemático ni de la inferencia.
const facts = [
  'Motor independiente, desarrollado en C++.',
  'La interfaz solo representa datos públicos.',
  'La interfaz evoluciona sin tocar el modelo, y el modelo sin tocar la interfaz.',
];

const cubeEdges = createCubeEdges(2.7);
const decisionGrid = createDecisionGrid(0.85);

export function NeoCube() {
  const [view, setView] = useState(INITIAL_CUBE_VIEW);
  const [dragging, setDragging] = useState(false);
  const canvas = useRef<SVGSVGElement>(null);
  const pointers = useRef(new Map<number, CubePointer>());
  const helpId = useId();
  const project = createProjector({ yaw: view.yaw, pitch: view.pitch, scale: 42 * view.zoom, center: [135, 135] });
  const cubeLines = cubeEdges.map(([from, to]) => ({ from: project(from), to: project(to) }));
  const decisionPoints = decisionGrid.map(project);

  useEffect(() => {
    const svg = canvas.current;
    if (!svg) return;
    // A non-passive listener keeps wheel/pinch zoom inside the graphic.
    const wheel = (event: WheelEvent) => {
      event.preventDefault();
      const pixels = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? 270 : 1);
      const factor = Math.exp(-Math.max(-160, Math.min(160, pixels)) * 0.0015);
      setView(previous => zoomCube(previous, factor));
    };
    svg.addEventListener('wheel', wheel, { passive: false });
    return () => svg.removeEventListener('wheel', wheel);
  }, []);

  const startPointer = (event: PointerEvent<SVGSVGElement>) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    event.currentTarget.focus({ preventScroll: true });
    pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    setDragging(true);
  };
  const movePointer = (event: PointerEvent<SVGSVGElement>) => {
    if (!pointers.current.has(event.pointerId)) return;
    const before = [...pointers.current.values()];
    pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    const after = [...pointers.current.values()];
    setView(previous => applyPointerChange(previous, before, after));
  };
  const endPointer = (event: PointerEvent<SVGSVGElement>) => {
    pointers.current.delete(event.pointerId);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    setDragging(pointers.current.size > 0);
  };
  const keyDown = (event: KeyboardEvent<SVGSVGElement>) => {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    if (!applyCubeKey(view, event.key)) return;
    event.preventDefault();
    setView(previous => applyCubeKey(previous, event.key) ?? previous);
  };

  return (
    <section aria-labelledby="cubo" className="bg-ink text-white">
      <Container className="flex flex-wrap items-end justify-between gap-12 py-[clamp(72px,10vw,140px)]">
        <div className="min-w-0 flex-[1_1_520px]">
          <Eyebrow tone="inverse">02 — Tecnología propia</Eyebrow>
          <h2 id="cubo" className="text-[clamp(40px,5.6vw,76px)] leading-none font-normal tracking-[-0.045em]">
            El Cubo de Neo
          </h2>
          <p className="mt-7 max-w-[620px] text-[clamp(18px,1.6vw,22px)] leading-normal text-line">
            El motor detrás de choisys, desarrollado en C++ y ejecutado localmente.
            Representa recorridos de tres fases. La geometría muestra observaciones:
            no atribuye significado psicológico ni ofrece inferencias.
          </p>
        </div>
        <div className="flex max-w-[440px] flex-[1_1_320px] flex-col gap-8">
          <div>
            <svg ref={canvas} viewBox="0 0 270 270" role="img" tabIndex={0}
              aria-label="Cubo de Neo interactivo: representación geométrica pública"
              aria-describedby={helpId}
              onPointerDown={startPointer} onPointerMove={movePointer}
              onPointerUp={endPointer} onPointerCancel={endPointer} onLostPointerCapture={endPointer}
              onKeyDown={keyDown}
              className={`cube-interaction mx-auto block w-full max-w-[360px] touch-none select-none ${dragging ? 'cursor-grabbing' : 'cursor-grab'}`}>
              {cubeLines.map(({ from, to }, index) => (
                <line key={index} x1={from[0]} y1={from[1]} x2={to[0]} y2={to[1]}
                  stroke="white" strokeOpacity="0.65" strokeWidth="1.2" />
              ))}
              {decisionPoints.map(([x, y], index) => (
                <circle key={index} cx={x} cy={y} r="1.8" fill="#39ff14" />
              ))}
            </svg>
            <p id={helpId} className="mt-3 text-center text-xs leading-relaxed text-line">
              Arrastra para girar. Pellizca o usa la rueda para acercar.
              <span className="sr-only"> Con teclado: flechas para girar, más y menos para zoom, cero para volver a la vista inicial.</span>
            </p>
            <div className="mt-4 flex items-center justify-center gap-2" aria-label="Controles de vista del cubo">
              <button type="button" className="cube-control min-h-11 min-w-11 border border-[#555555] px-3 py-2 text-sm disabled:opacity-35"
                aria-label="Alejar cubo" disabled={view.zoom <= MIN_CUBE_ZOOM}
                onClick={() => setView(previous => zoomCube(previous, 1 / 1.12))}>−</button>
              <span className="min-w-[42px] text-center text-xs tabular-nums text-line" aria-label={`Zoom ${Math.round(view.zoom * 100)} por ciento`}>
                {Math.round(view.zoom * 100)}%
              </span>
              <button type="button" className="cube-control min-h-11 min-w-11 border border-[#555555] px-3 py-2 text-sm disabled:opacity-35"
                aria-label="Acercar cubo" disabled={view.zoom >= MAX_CUBE_ZOOM}
                onClick={() => setView(previous => zoomCube(previous, 1.12))}>+</button>
              <button type="button" className="cube-control min-h-11 border border-[#555555] px-3 py-2 text-sm"
                onClick={() => setView(resetCubeView())}>Vista inicial</button>
            </div>
          </div>
          <ul className="m-0 list-none p-0 text-base leading-normal">
            {facts.map((fact) => (
              <li key={fact} className="border-t border-[#444444] py-[18px] last:border-b">
                {fact}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
