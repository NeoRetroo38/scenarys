import { useEffect, useState } from 'react';

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

/** Miniatura de una obra: portada fija o un bucle corto y mudo del tráiler (sin autoplay si se pide menos movimiento). */
export function WorkThumb({ media, className = '' }: { media: Media; className?: string }) {
  const reduce = useReducedMotion();
  const base = `block w-full bg-ink object-cover ${className}`;
  if (media.type === 'image') return <img src={media.src} alt={media.alt} loading="lazy" className={base} />;
  return (
    <video className={base} poster={media.poster} muted playsInline loop autoPlay={!reduce} preload="none" aria-label={media.alt}>
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
