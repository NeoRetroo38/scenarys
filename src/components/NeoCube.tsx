import { Container, Eyebrow } from './ui';

// Copy pública del Cubo de Neo. Describe su naturaleza (propietario, local, en C++)
// sin revelar ninguna parte del modelo matemático ni de la inferencia.
const facts = [
  'Propiedad intelectual de Scenarys S.L.',
  'El cálculo no se distribuye en el cliente.',
  'La interfaz evoluciona sin tocar el modelo, y el modelo sin tocar la interfaz.',
];

export function NeoCube() {
  return (
    <section aria-labelledby="cubo" className="bg-ink text-white">
      <Container className="flex flex-wrap items-end justify-between gap-12 py-[clamp(72px,10vw,140px)]">
        <div className="min-w-0 flex-[1_1_520px]">
          <Eyebrow tone="inverse">02 — Tecnología propia</Eyebrow>
          <h2 id="cubo" className="text-[clamp(40px,5.6vw,76px)] leading-none font-normal tracking-[-0.045em]">
            El Cubo de Neo
          </h2>
          <p className="mt-7 max-w-[620px] text-[clamp(18px,1.6vw,22px)] leading-normal text-line">
            El motor detrás de choisys. Un sistema matemático y de inferencia propietario, desarrollado por Scenarys y
            ejecutado de forma local en C++.
          </p>
        </div>
        <ul className="m-0 max-w-[440px] flex-[1_1_320px] list-none p-0 text-base leading-normal">
          {facts.map((fact) => (
            <li key={fact} className="border-t border-[#444444] py-[18px] last:border-b">
              {fact}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
