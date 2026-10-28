import { CHOISYS_URL } from '../config';
import { SIMULATION, int } from '../data/choisysCases';
import { ChoisysFlow } from './ChoisysFlow';
import { DemoPlay } from './DemoPlay';
import { HiringCase } from './HiringCase';
import { ProductCase } from './ProductCase';
import { Container, Eyebrow, PillLink } from './ui';

const how = [
  { title: 'Fases', body: 'Cada fase es una matriz de 3 × 3 que cruza dos ideas: filas y columnas con significado.' },
  { title: 'Un toque', body: 'Se elige un punto por fase. Sin escalas del 1 al 5 ni casillas: una posición.' },
  { title: 'Cubo de Neo', body: 'Las fases se apilan y el recorrido se dibuja en tres dimensiones.' },
  { title: 'Comparación', body: 'El motor en C++ calcula la similitud con una referencia, total y por fase.' },
];

export function ChoisysSection() {
  return (
    <section id="choisys" className="border-t border-line">
      <Container className="flex flex-wrap items-center gap-[clamp(48px,8vw,120px)] py-[clamp(72px,10vw,140px)]">
        <div className="min-w-0 flex-[1_1_420px]">
          <Eyebrow>01 — Producto · Beta</Eyebrow>
          <h2 className="text-[clamp(56px,7vw,96px)] leading-none font-normal tracking-[-0.05em]">choisys</h2>
          <p className="mt-7 max-w-[540px] text-[clamp(20px,2vw,26px)] leading-[1.35] tracking-[-0.01em]">
            Decisiones subjetivas, datos reales. Cada elección es una posición en el espacio, y cada persona, un recorrido
            que se puede comparar.
          </p>
          <p className="mt-5 max-w-[540px] text-[17px] leading-relaxed text-ink-soft">
            Los formularios preguntan y archivan. choisys pregunta en fases y guarda el recorrido completo: qué se eligió, en
            qué orden y cuánto se parece a un patrón de referencia. Sirve para elegir un producto, para comparar candidatos con
            el perfil de un puesto o para cualquier decisión que se pueda contar en tres pasos.
          </p>
          <p className="mt-5 max-w-[540px] text-[15px] leading-relaxed text-ink-muted">
            Pruébalo aquí: un círculo en cada fase y tu recorrido aparece en el cubo.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <PillLink href={CHOISYS_URL} arrow>Abrir choisys</PillLink>
            <PillLink href="#choisys-producto" variant="outline">Ver casos de uso</PillLink>
          </div>
        </div>
        <DemoPlay />
      </Container>

      <div className="border-t border-line">
        <Container className="py-[clamp(48px,6vw,88px)]">
          <Eyebrow>Cómo funciona</Eyebrow>
          <ol className="m-0 grid list-none gap-3 p-0 sm:grid-cols-2 lg:grid-cols-4" aria-label="Flujo de una decisión en choisys">
            {how.map((s, i) => <li key={s.title} className="relative rounded-lg border border-line p-5">
              <span className="font-mono text-[12px] text-ink-muted">0{i + 1}</span>
              <p className="mt-2 text-lg tracking-[-0.01em]">{s.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-ink-muted">{s.body}</p>
              {i < how.length - 1 && <span aria-hidden="true" className="absolute top-1/2 -right-3 hidden -translate-y-1/2 font-mono text-ink-muted lg:block">→</span>}
            </li>)}
          </ol>
        </Container>
      </div>

      <ProductCase />
      <HiringCase />
      <ChoisysFlow />

      <Container className="py-8">
        <p className="m-0 font-mono text-[11px] leading-relaxed text-ink-muted">
          Los casos son una simulación: {int(SIMULATION.product.people)} compradores y {int(SIMULATION.hiring.funnel[0])} candidatos
          sintéticos (semilla {SIMULATION.seed}) generados con el motor del Cubo de Neo, que también calcula todos los recuentos,
          porcentajes y similitudes. Modelo y supuestos: <a className="underline" href="https://github.com/NeoRetroo38/neos-cube/blob/main/docs/SIMULATED-CASES.md">neos-cube · SIMULATED-CASES</a>.
          No describen a personas reales.
        </p>
      </Container>
    </section>
  );
}
