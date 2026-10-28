import { Container } from './ui';

type Step = { title: string; body: string };

const rows: { id: string; label: string; tag: string; dark?: boolean; steps: Step[] }[] = [
  {
    id: 'A', label: 'Quien publica', tag: 'Mis cubos · por ejemplo, RRHH',
    steps: [
      { title: 'Mis cubos', body: 'Cubos personales y de referencia, con sus enlaces y participantes.' },
      { title: 'Cubo de referencia', body: 'Responde el cubo del puesto: ese recorrido es el patrón con el que se compara.' },
      { title: 'Diseño de fases', body: 'Cada fase cruza dos ideas en una matriz con filas y columnas propias.' },
      { title: 'Publicar enlace', body: 'Un enlace único para candidatos; se puede cerrar sin perder resultados.' },
    ],
  },
  {
    id: 'B', label: 'Quien responde', tag: 'Sin cuenta · por enlace', dark: true,
    steps: [
      { title: 'Acceso por enlace', body: 'Entra sin crear cuenta: solo su nombre y, si quiere, su email.' },
      { title: 'Responder', body: 'Un toque por fase en cada matriz de 3 × 3.' },
      { title: 'Tu Cubo de Neo', body: 'Sus elecciones se representan en tres dimensiones.' },
      { title: 'Privacidad', body: 'Ve solo su cubo y sus runs; la comparación y el ranking son de quien publicó.' },
    ],
  },
];

export function ChoisysFlow() {
  return (
    <div aria-label="Flujo de choisys">
      {rows.map((row) => (
        <div key={row.id} className={row.dark ? 'bg-ink text-white' : 'border-t border-line'}>
          <Container className="py-[clamp(40px,5vw,64px)]">
            <div className="mb-6 flex flex-wrap items-baseline justify-between gap-3">
              <h3 className="text-[clamp(22px,2.4vw,30px)] font-normal tracking-[-0.02em] uppercase">
                {row.id}. {row.label}
              </h3>
              <span className={`font-mono text-[12px] uppercase tracking-[0.12em] ${row.dark ? 'text-[#b3b3b3]' : 'text-ink-muted'}`}>
                {row.tag}
              </span>
            </div>
            <ol className="grid list-none gap-3 p-0 sm:grid-cols-2 lg:grid-cols-4">
              {row.steps.map((s, i) => (
                <li key={s.title} className={`rounded-lg border p-5 ${row.dark ? 'border-[#333]' : 'border-line'}`}>
                  <span className={`font-mono text-[12px] ${row.dark ? 'text-[#b3b3b3]' : 'text-ink-muted'}`}>0{i + 1}</span>
                  <p className="mt-2 text-lg tracking-[-0.01em]">{s.title}</p>
                  <p className={`mt-1 text-sm leading-relaxed ${row.dark ? 'text-[#b3b3b3]' : 'text-ink-muted'}`}>{s.body}</p>
                </li>
              ))}
            </ol>
          </Container>
        </div>
      ))}
    </div>
  );
}
