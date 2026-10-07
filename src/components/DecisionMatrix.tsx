import { useEffect, useRef, useState } from 'react';

// Demo de interfaz: reproduce cómo se ve y se siente una ejecución de choisys
// (apps/mobile: PopCircle + ExperienceScreen). No guarda ni envía nada y no calcula
// ningún resultado: el Cubo de Neo no participa en esta página.

const PHASE_TITLES = ['1. fase one.', '2. fase two.', '3. fase three.'] as const;
const PHASE_COUNT = PHASE_TITLES.length;
const POSITIONS = Array.from({ length: 9 }, (_, i) => i);
/** Igual que en la app: se deja terminar el pop antes de que entre la siguiente fase. */
const POP_MS = 260;

export function DecisionMatrix() {
  const [phase, setPhase] = useState(0); // 0..2 = fases, 3 = completado
  const [chosen, setChosen] = useState<number | null>(null);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  // Un toque elige y avanza. No hay paso de confirmación.
  const choose = (position: number) => {
    if (chosen !== null) return;
    setChosen(position);
    timer.current = window.setTimeout(() => {
      setChosen(null);
      setPhase((current) => current + 1);
    }, POP_MS);
  };

  const restart = () => {
    window.clearTimeout(timer.current);
    setChosen(null);
    setPhase(0);
  };

  const completed = phase >= PHASE_COUNT;

  return (
    <figure className="m-0 flex flex-[1_1_360px] flex-col items-center">
      <div className="flex w-full max-w-[360px] flex-col">
        {completed ? (
          <div key="done" className="animate-[fade-in_400ms_ease-out] flex min-h-[420px] flex-col items-start justify-center gap-8">
            <p className="text-[clamp(28px,3vw,34px)] tracking-[-0.03em]" aria-live="polite">
              3 fases completadas
            </p>
            <button
              type="button"
              onClick={restart}
              className="inline-flex min-h-11 cursor-pointer items-center rounded-full border border-ink bg-transparent px-6 py-3 text-[15px] text-ink hover:bg-ink hover:text-white"
            >
              Volver a empezar
            </button>
          </div>
        ) : (
          <div key={phase} className="animate-[fade-in_400ms_ease-out]">
            <p className="mb-10 text-[clamp(26px,2.6vw,32px)] tracking-[-0.04em]" aria-live="polite">
              {PHASE_TITLES[phase]}
            </p>
            <div role="group" aria-label={`Fase ${phase + 1} de 3. Elige un círculo.`} className="grid grid-cols-3 gap-[clamp(16px,2.4vw,28px)]">
              {POSITIONS.map((position) => (
                <button
                  key={position}
                  type="button"
                  aria-label={`Círculo ${position + 1}, fila ${Math.floor(position / 3) + 1}, columna ${(position % 3) + 1}`}
                  aria-pressed={chosen === position}
                  disabled={chosen !== null}
                  onClick={() => choose(position)}
                  style={{ animationDelay: `${position * 45}ms` }}
                  className={`animate-[pop-in_420ms_cubic-bezier(.34,1.56,.64,1)_both] aspect-square w-full cursor-pointer rounded-full border-0 bg-ink p-0 transition-transform duration-200 ease-[cubic-bezier(.34,1.56,.64,1)] disabled:cursor-default ${
                    chosen === position ? 'scale-[1.14]' : ''
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
      <figcaption className="mt-8 font-mono text-[13px] text-ink-muted">demo · un toque elige y pasa de fase</figcaption>
    </figure>
  );
}
