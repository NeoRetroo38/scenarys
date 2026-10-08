import { useState } from 'react';

// Patrón inicial puramente ilustrativo. Esta demo solo reproduce la interacción binaria de choisys;
// no calcula nada ni se comunica con el Cubo de Neo.
const INITIAL_PATTERN: readonly boolean[] = [true, false, false, false, true, true, false, true, false];

export function DecisionMatrix() {
  const [cells, setCells] = useState<boolean[]>(() => [...INITIAL_PATTERN]);
  const selectedCount = cells.filter(Boolean).length;

  const toggle = (index: number) =>
    setCells((current) => current.map((value, i) => (i === index ? !value : value)));

  return (
    <figure className="m-0 flex flex-[1_1_360px] flex-col items-center gap-6">
      <div
        role="group"
        aria-label="Fase de ejemplo: matriz de 3 por 3"
        className="grid w-full max-w-[360px] grid-cols-3 gap-[clamp(16px,2.4vw,28px)]"
      >
        {cells.map((selected, index) => (
          <button
            key={index}
            type="button"
            aria-pressed={selected}
            aria-label={`Posición ${index + 1}`}
            onClick={() => toggle(index)}
            className="flex aspect-square w-full cursor-pointer items-center justify-center rounded-full border-0 bg-ink p-0"
          >
            {selected && <span className="block size-[72%] rounded-full bg-paper" />}
          </button>
        ))}
      </div>
      <figcaption className="font-mono text-[13px] text-ink-muted" aria-live="polite">
        fase 1 · {selectedCount}/9 seleccionadas
      </figcaption>
    </figure>
  );
}
