import { createCubeEdges, createDecisionGrid, createProjector } from '@neoretroo38/neo-cube-web';
import { useId, useRef, useState } from 'react';
import type { KeyboardEvent, PointerEvent } from 'react';
import { CHOISYS_URL } from '../config';
import { INITIAL_CUBE_VIEW, applyCubeKey, applyPointerChange } from './cubeInteraction.mjs';
import type { CubePointer } from './cubeInteraction.mjs';
import { Container, Eyebrow, PillLink } from './ui';

// Copy pública del Cubo de Neo. Describe su naturaleza (propietario, local, en C++)
// sin revelar ninguna parte del modelo matemático ni de la inferencia.
const strengths = [
  { title: 'Tecnología propia.', text: 'Un motor independiente, escrito en C++ y ejecutado en nuestra propia máquina. No depende de servicios de terceros.' },
  { title: 'Datos claros.', text: 'La interfaz solo muestra lo que elegiste: fases y posiciones. No pone etiquetas ni hace predicciones.' },
  { title: 'Hecho para crecer.', text: 'Interfaz y motor evolucionan por separado: cada mejora llega sin romper lo anterior.' },
];

// Solo giro: el tamaño y la posición inicial son fijos (sin zoom ni «vista inicial»).
const ROTATION_KEYS = new Set(['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown']);

const cubeEdges = createCubeEdges(2.7);
const decisionGrid = createDecisionGrid(0.85);

export function NeoCube() {
  const [view, setView] = useState(INITIAL_CUBE_VIEW);
  const [dragging, setDragging] = useState(false);
  const pointer = useRef<{ id: number; at: CubePointer } | null>(null);
  const helpId = useId();
  const project = createProjector({ yaw: view.yaw, pitch: view.pitch, scale: 42, center: [135, 135] });
  const cubeLines = cubeEdges.map(([from, to]) => ({ from: project(from), to: project(to) }));
  const decisionPoints = decisionGrid.map(project);

  // Un solo dedo o ratón gira el cubo; un segundo dedo se ignora, así no hay zoom por pellizco.
  const startPointer = (event: PointerEvent<SVGSVGElement>) => {
    if (pointer.current || (event.pointerType === 'mouse' && event.button !== 0)) return;
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    event.currentTarget.focus({ preventScroll: true });
    pointer.current = { id: event.pointerId, at: { x: event.clientX, y: event.clientY } };
    setDragging(true);
  };
  const movePointer = (event: PointerEvent<SVGSVGElement>) => {
    const current = pointer.current;
    if (!current || current.id !== event.pointerId) return;
    const next = { x: event.clientX, y: event.clientY };
    const before = current.at;
    pointer.current = { id: current.id, at: next };
    setView(previous => applyPointerChange(previous, [before], [next]));
  };
  const endPointer = (event: PointerEvent<SVGSVGElement>) => {
    if (pointer.current?.id !== event.pointerId) return;
    pointer.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    setDragging(false);
  };
  const keyDown = (event: KeyboardEvent<SVGSVGElement>) => {
    if (event.altKey || event.ctrlKey || event.metaKey || !ROTATION_KEYS.has(event.key)) return;
    event.preventDefault();
    setView(previous => applyCubeKey(previous, event.key) ?? previous);
  };

  return (
    <section aria-labelledby="cubo" className="bg-ink text-white">
      <Container className="grid items-center gap-x-[clamp(48px,7vw,112px)] gap-y-14 py-[clamp(72px,10vw,140px)] lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <div className="min-w-0">
          <Eyebrow tone="inverse">02 — Tecnología propia</Eyebrow>
          <h2 id="cubo" className="text-[clamp(40px,5.6vw,76px)] leading-none font-normal tracking-[-0.045em]">
            El Cubo de Neo
          </h2>
          <p className="mt-7 max-w-[600px] text-[clamp(18px,1.6vw,22px)] leading-normal text-line">
            Cada recorrido de choisys tiene forma. El Cubo de Neo la conserva con exactitud y la dibuja en tres
            dimensiones: tres fases, nueve posiciones en cada una, un trazo que puedes girar con el dedo.
          </p>
          <ul className="mt-10 max-w-[600px] list-none p-0">
            {strengths.map(({ title, text }) => (
              <li key={title} className="border-t border-[#444444] py-5 text-base leading-normal last:border-b">
                <span className="text-white">{title}</span> <span className="text-[#b3b3b3]">{text}</span>
              </li>
            ))}
          </ul>
          <PillLink href={CHOISYS_URL} variant="inverse" arrow className="mt-10">
            Abrir choisys
          </PillLink>
        </div>
        <div className="min-w-0">
          <svg viewBox="0 0 270 270" role="img" tabIndex={0}
            aria-label="Cubo de Neo interactivo: representación geométrica pública"
            aria-describedby={helpId}
            onPointerDown={startPointer} onPointerMove={movePointer}
            onPointerUp={endPointer} onPointerCancel={endPointer} onLostPointerCapture={endPointer}
            onKeyDown={keyDown}
            className={`cube-interaction mx-auto block w-full max-w-[460px] touch-none select-none ${dragging ? 'cursor-grabbing' : 'cursor-grab'}`}>
            {cubeLines.map(({ from, to }, index) => (
              <line key={index} x1={from[0]} y1={from[1]} x2={to[0]} y2={to[1]}
                stroke="white" strokeOpacity="0.65" strokeWidth="1.2" />
            ))}
            {decisionPoints.map(([x, y], index) => (
              <circle key={index} cx={x} cy={y} r="1.8" fill="#39ff14" />
            ))}
          </svg>
          <p id={helpId} className="mt-3 text-center text-xs leading-relaxed text-[#b3b3b3]">
            Arrastra para girar.
            <span className="sr-only"> Con teclado: flechas para girar.</span>
          </p>
        </div>
      </Container>
    </section>
  );
}
