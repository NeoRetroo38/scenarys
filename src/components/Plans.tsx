import { STRIPE_PRO_LINKS } from '../config';
import { Container, Eyebrow, PillLink } from './ui';

type Plan = { name: string; price: string; note: string; perks: string[]; dark?: boolean };

const plans: Plan[] = [
  { name: 'Gratis', price: '0 €', note: 'Para siempre', perks: ['Tu Cubo de Neo', 'Tus últimos recorridos', 'Compararte con el código de una empresa'] },
  {
    name: 'Pro', price: '5,99 €/mes', note: 'o 23,99 € en un solo pago', dark: true,
    perks: ['Historial completo de recorridos', 'Comparar tus propios cubos', 'Crear cubos de referencia y compartir su código', 'Apoyas el proyecto y pruebas lo nuevo antes'],
  },
  { name: 'Empresa', price: 'A medida', note: 'Presupuesto y factura por transferencia', perks: ['Panel de RRHH', 'Cubos Oficiales por puesto', 'Códigos para candidatos y comparativa de encaje'] },
];

export function Plans() {
  const ready = Boolean(STRIPE_PRO_LINKS.monthly && STRIPE_PRO_LINKS.once);
  return (
    <section id="precios" aria-labelledby="precios-h" className="border-t border-line">
      <Container className="py-[clamp(72px,10vw,140px)]">
        <Eyebrow>choisys — Planes</Eyebrow>
        <h2 id="precios-h" className="mb-[clamp(40px,6vw,72px)] text-[clamp(32px,4vw,52px)] leading-[1.05] font-normal tracking-[-0.035em]">
          Empieza gratis. Mejora cuando lo necesites.
        </h2>
        <ul className="grid list-none gap-4 p-0 lg:grid-cols-3">
          {plans.map((p) => (
            <li key={p.name} className={`flex flex-col rounded-lg border p-7 ${p.dark ? 'border-ink bg-ink text-white' : 'border-line'}`}>
              <h3 className="text-[clamp(24px,2.6vw,32px)] font-normal tracking-[-0.025em]">{p.name}</h3>
              <p className="mt-4 text-[clamp(28px,3vw,40px)] tracking-[-0.03em]">{p.price}</p>
              <p className={`text-sm ${p.dark ? 'text-[#b3b3b3]' : 'text-ink-muted'}`}>{p.note}</p>
              <ul className="mt-6 flex-1 list-none space-y-3 p-0">
                {p.perks.map((perk) => (
                  <li key={perk} className="flex gap-3 text-[16px] leading-snug">
                    <span aria-hidden="true" className={`mt-2 size-1.5 shrink-0 rounded-full ${p.dark ? 'bg-signal' : 'bg-signal-deep'}`} />
                    {perk}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                {p.name === 'Gratis' && <PillLink href="/choisys" variant="outline">Empezar gratis</PillLink>}
                {p.name === 'Pro' && (ready ? (
                  <>
                    <PillLink href={STRIPE_PRO_LINKS.monthly} variant="inverse">5,99 €/mes</PillLink>
                    <PillLink href={STRIPE_PRO_LINKS.once} variant="outlineInverse">Pago único</PillLink>
                  </>
                ) : (
                  <span className="text-sm text-[#b3b3b3]">Pago disponible muy pronto.</span>
                ))}
                {p.name === 'Empresa' && <PillLink href="#contacto">Pedir presupuesto</PillLink>}
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-6 max-w-[760px] text-sm leading-relaxed text-ink-muted">
          Precios con IVA incluido. Pro se paga con tarjeta, Apple Pay o Google Pay en la página segura de Stripe;
          usa el mismo email de tu cuenta de choisys y activaremos Pro en ella.
        </p>
      </Container>
    </section>
  );
}
