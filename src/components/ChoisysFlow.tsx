import { Container } from './ui';

type Step = { title: string; body: string };

const rows: { id: string; label: string; tag: string; dark?: boolean; steps: Step[] }[] = [
  {
    id: 'A', label: 'Empresa / Admin', tag: 'Área interna · RRHH',
    steps: [
      { title: 'Dashboard RRHH', body: 'Procesos activos, candidatos evaluados y cubos oficiales.' },
      { title: 'Crear Cubo Oficial', body: 'Define el perfil objetivo del puesto y su umbral de encaje.' },
      { title: 'Diseño de matrices', body: 'Preguntas subjetivas que se responden en una matriz 3×3.' },
      { title: 'Publicar', body: 'El cubo de referencia se habilita para candidatos mediante código.' },
    ],
  },
  {
    id: 'B', label: 'Usuario / Candidato', tag: 'Evaluación', dark: true,
    steps: [
      { title: 'Acceso con código', body: 'El candidato entra con el código que le da la empresa.' },
      { title: 'Responder', body: 'Elige un símbolo en cada matriz 3×3.' },
      { title: 'Tu Cubo de Neo', body: 'Sus elecciones se representan en tres dimensiones.' },
      { title: 'Comparativa', body: 'Encaje global y por fase frente al Cubo Oficial.' },
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
