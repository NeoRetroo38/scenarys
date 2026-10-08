import { CHOISYS_URL } from '../config';
import { CopyPhone } from './CopyPhone';
import { Container, Eyebrow, PillLink } from './ui';

export function Contact() {
  return (
    <section id="contacto" aria-labelledby="contacto-h">
      <Container className="flex flex-wrap items-end justify-between gap-12 py-[clamp(72px,10vw,140px)]">
        <div className="min-w-0 flex-[1_1_520px]">
          <Eyebrow>04 — Contacto</Eyebrow>
          <h2 id="contacto-h" className="text-[clamp(40px,5.6vw,76px)] leading-none font-normal tracking-[-0.045em]">
            Hablemos.
          </h2>
          <p className="mt-6 max-w-[560px] text-[clamp(18px,1.6vw,22px)] leading-normal text-ink-soft">
            Colaboraciones, tecnología y proyectos. Por ahora, el contacto es solo por teléfono: toca el número para copiarlo.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <CopyPhone />
          <PillLink href={CHOISYS_URL} variant="outline">
            Abrir choisys
          </PillLink>
        </div>
      </Container>
    </section>
  );
}
