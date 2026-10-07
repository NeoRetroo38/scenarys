import { CHOISYS_URL } from '../config';
import { DecisionMatrix } from './DecisionMatrix';
import { Container, Eyebrow, PillLink } from './ui';

export function ChoisysSection() {
  return (
    <section id="choisys" className="border-t border-line">
      <Container className="flex flex-wrap items-center gap-[clamp(48px,8vw,120px)] py-[clamp(72px,10vw,140px)]">
        <div className="min-w-0 flex-[1_1_420px]">
          <Eyebrow>01 — Producto · Beta</Eyebrow>
          <h2 className="text-[clamp(56px,7vw,96px)] leading-none font-normal tracking-[-0.05em]">choisys</h2>
          <p className="mt-7 max-w-[520px] text-[clamp(20px,2vw,26px)] leading-[1.35] tracking-[-0.01em]">
            Un sistema de decisión interactivo. Cada fase es una matriz de entradas binarias; cada recorrido deja un
            patrón.
          </p>
          <p className="mt-5 max-w-[520px] text-[17px] leading-relaxed text-ink-soft">
            choisys convierte elecciones simples en datos estructurados. Las fases se completan pulsando o no
            pulsando, sin texto ni distracciones, y cada ejecución queda registrada para construir representaciones
            de mayor nivel.
          </p>
          <PillLink href={CHOISYS_URL} arrow className="mt-10">
            Entrar en choisys
          </PillLink>
        </div>
        <DecisionMatrix />
      </Container>
    </section>
  );
}
