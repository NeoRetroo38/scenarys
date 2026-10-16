import { Container, Eyebrow } from './ui';

/** Escritos de Neo: portada, la cita de apertura como pie y el capítulo en PDF. */
export function Escritos() {
  return (
    <section id="escritos" aria-labelledby="escritos-h" className="border-b border-line">
      <Container className="py-[clamp(72px,10vw,140px)]">
        <Eyebrow>04 — Escritos</Eyebrow>
        <h2 id="escritos-h" className="text-[clamp(32px,4vw,52px)] leading-[1.05] font-normal tracking-[-0.035em]">
          Los límites
        </h2>
        <figure className="mt-[clamp(32px,5vw,56px)] flex flex-wrap items-end gap-[clamp(28px,5vw,64px)]">
          <a href="/docs/files/los-limites-capitulo-1.pdf" className="block w-full max-w-[360px] flex-[0_1_360px]">
            <img src="/escritos/los-limites-portada.jpg" width={605} height={935} loading="lazy"
              alt="Portada de «Los límites», de Neo: el título en rojo sobre un cristal roto." className="h-auto w-full" />
          </a>
          <figcaption className="max-w-[480px] flex-[1_1_300px]">
            <p className="text-[clamp(22px,2.4vw,30px)] leading-snug tracking-[-0.02em]">
              «Los sistemas están rotos, solo las mentes nos curarán.»
            </p>
            <p className="mt-4 text-[17px] leading-relaxed text-ink-soft">
              Primer capítulo del relato en tres actos que está escribiendo Neo.
            </p>
            <a href="/docs/files/los-limites-capitulo-1.pdf" download
              className="mt-6 inline-flex min-h-11 items-center rounded-full border border-ink px-5 py-2 text-sm no-underline hover:bg-ink hover:text-white">
              Leer el capítulo 1 · PDF
            </a>
          </figcaption>
        </figure>
        <p className="mt-[clamp(48px,6vw,80px)] font-mono text-[13px] text-ink-muted">bio: neo. «sal del cubo»</p>
      </Container>
    </section>
  );
}
