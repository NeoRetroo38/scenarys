const words = ['software', 'sistemas interactivos', 'cine', 'escritos', 'música', 'hardware', 'videojuegos'];

/** Franja tipográfica en bucle con las disciplinas de Scenarys. Se para al pasar el ratón o con «reducir movimiento». */
export function Marquee() {
  const row = words.flatMap(word => [word, '·']);
  return (
    <div className="group overflow-hidden border-y border-ink bg-ink py-[clamp(14px,2vw,22px)] text-white" aria-label={`Disciplinas: ${words.join(', ')}`} role="img">
      <div className="flex w-max animate-[marquee_38s_linear_infinite] gap-[clamp(20px,3vw,40px)] whitespace-nowrap group-hover:[animation-play-state:paused] motion-reduce:animate-none" aria-hidden="true">
        {[...row, ...row].map((word, i) => <span key={i} className={`text-[clamp(28px,4.2vw,56px)] leading-none tracking-[-0.03em] ${word === '·' ? 'text-signal' : ''}`}>{word}</span>)}
      </div>
    </div>
  );
}
