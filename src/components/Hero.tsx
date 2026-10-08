import { CHOISYS_URL } from '../config';
import { Container, Eyebrow, PillLink } from './ui';

export function Hero() {
  return (
    <section id="inicio">
      <Container className="pt-[clamp(72px,12vw,160px)] pb-[clamp(64px,10vw,128px)]">
        <Eyebrow>Scenarys S.L. — Estudio de tecnología</Eyebrow>
        <h1 className="max-w-[1100px] text-[clamp(44px,8.4vw,120px)] leading-[0.98] font-normal tracking-[-0.045em]">
          Construimos sistemas para pensar, decidir y crear.
        </h1>
        <div className="mt-[clamp(48px,7vw,96px)] flex flex-wrap items-end justify-between gap-12">
          <p className="max-w-[560px] flex-[1_1_320px] text-[clamp(18px,1.6vw,22px)] leading-normal text-ink-soft">
            Scenarys es una compañía multidisciplinar que diseña software, hardware, sistemas interactivos y obras
            audiovisuales. Nuestro primer producto es choisys, un sistema de decisión interactivo.
          </p>
          <div className="flex flex-wrap gap-3">
            <PillLink href={CHOISYS_URL} arrow>
              Explorar choisys
            </PillLink>
            <PillLink href="#contacto" variant="outline">
              Hablar con nosotros
            </PillLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
