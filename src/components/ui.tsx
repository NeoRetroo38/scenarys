import type { ReactNode } from 'react';

const pillBase =
  'inline-flex min-h-11 items-center justify-center gap-3 rounded-full px-8 py-4 text-base no-underline transition-colors';

const pillVariants = {
  solid: 'bg-ink text-white hover:bg-ink-soft',
  outline: 'border border-ink text-ink hover:bg-ink hover:text-white',
  inverse: 'bg-white text-ink hover:bg-line',
} as const;

type PillVariant = keyof typeof pillVariants;

export function PillLink({
  href,
  children,
  variant = 'solid',
  arrow = false,
  className = '',
}: {
  /** Sin href (destino aún no definido) se pinta como pendiente y no navega. */
  href: string | undefined;
  children: ReactNode;
  variant?: PillVariant;
  arrow?: boolean;
  className?: string;
}) {
  if (!href) {
    return (
      <span
        aria-disabled="true"
        title="Disponible pronto"
        className={`${pillBase} cursor-not-allowed border border-dashed border-ink-muted text-ink-muted ${className}`}
      >
        {children}
        <span className="text-sm">· pronto</span>
      </span>
    );
  }
  return (
    <a href={href} className={`${pillBase} ${pillVariants[variant]} ${className}`}>
      {children}
      {arrow && <ArrowIcon />}
    </a>
  );
}

export function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

export function Eyebrow({ children, tone = 'muted' }: { children: ReactNode; tone?: 'muted' | 'inverse' }) {
  const color = tone === 'inverse' ? 'text-[#b3b3b3]' : 'text-ink-muted';
  return <p className={`mb-6 font-mono text-[13px] uppercase tracking-[0.12em] ${color}`}>{children}</p>;
}

export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1240px] px-6 ${className}`}>{children}</div>;
}
