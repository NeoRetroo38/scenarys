import { Container } from './ui';

const steps = [
  {
    title: 'Fases',
    body: 'Cada recorrido avanza por fases. Cada fase es una matriz de posiciones organizada en líneas y dimensiones.',
  },
  {
    title: 'Decisiones binarias',
    body: 'Cada botón es una entrada binaria: sí o no. La simplicidad de la interacción hace que el patrón sea el dato.',
  },
  {
    title: 'Ejecuciones',
    body: 'Un recorrido completo contiene tres elecciones. La API puede guardar sus observaciones asociadas a la cuenta.',
  },
  {
    title: 'Representación',
    body: 'Los puntos y conexiones del cubo muestran fase, fila y columna. Una visualización no convierte esos datos en una inferencia.',
  },
];

export function HowItWorks() {
  return (
    <section aria-labelledby="como" className="border-t border-line">
      <Container className="py-[clamp(72px,10vw,140px)]">
        <h2
          id="como"
          className="mb-[clamp(40px,6vw,72px)] max-w-[760px] text-[clamp(32px,4vw,52px)] leading-[1.05] font-normal tracking-[-0.035em]"
        >
          Cómo funciona
        </h2>
        <ol className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(240px,1fr))] p-0">
          {steps.map((step, index) => (
            <li key={step.title} className="border-t border-ink pt-7 pr-8 pb-8">
              <span className="font-mono text-[13px] text-ink-muted">{String(index + 1).padStart(2, '0')}</span>
              <h3 className="mt-4 mb-3 text-[26px] font-normal tracking-[-0.02em]">{step.title}</h3>
              <p className="text-base leading-relaxed text-ink-soft">{step.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
