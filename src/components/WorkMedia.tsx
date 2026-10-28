import { useEffect, useRef, useState } from 'react';

export type Media =
  | { type: 'image'; src: string; alt: string }
  | { type: 'video'; src: string; poster: string; alt: string; loop?: string };

function useReducedMotion() {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const q = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduce(q.matches);
    const on = () => setReduce(q.matches);
    q.addEventListener('change', on);
    return () => q.removeEventListener('change', on);
  }, []);
  return reduce;
}

/** Miniatura de una obra: portada fija o bucle mudo del tráiler que se reproduce al pasar el ratón
 *  (o al verse en pantalla en móviles). Con «reducir movimiento» se queda en el póster. */
export function WorkThumb({ media, className = '' }: { media: Media; className?: string }) {
  const reduce = useReducedMotion();
  const video = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const el = video.current;
    if (!el || reduce || window.matchMedia('(hover: hover)').matches) return;
    const io = new IntersectionObserver(([entry]) => { if (entry.intersectionRatio > 0.6) void el.play().catch(() => {}); else el.pause(); }, { threshold: [0, 0.6, 1] });
    io.observe(el);
    return () => io.disconnect();
  }, [reduce]);
  const base = `block w-full bg-ink object-cover ${className}`;
  if (media.type === 'image') return <img src={media.src} alt={media.alt} loading="lazy" className={base} />;
  const hover = (on: boolean) => { const el = video.current; if (!el || reduce) return; if (on) void el.play().catch(() => {}); else el.pause(); };
  return (
    <video ref={video} className={base} poster={media.poster} muted playsInline loop preload="none" aria-label={media.alt}
      onMouseEnter={() => hover(true)} onMouseLeave={() => hover(false)}>
      <source src={media.loop ?? media.src} type="video/mp4" />
    </video>
  );
}

/** Pieza grande de la página de la obra: portada o tráiler completo con controles. */
export function WorkHero({ media }: { media: Media }) {
  if (media.type === 'image') {
    return <img src={media.src} alt={media.alt} className="mb-10 w-full max-w-[320px] rounded-lg lg:float-right lg:ml-12" />;
  }
  return (
    <video className="mb-10 w-full rounded-lg bg-ink" poster={media.poster} controls playsInline preload="none" aria-label={media.alt}>
      <source src={media.src} type="video/mp4" />
    </video>
  );
}
