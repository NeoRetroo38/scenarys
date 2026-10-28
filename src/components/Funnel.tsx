import { int, pct } from '../data/choisysCases';

/** A funnel drawn from the engine's counts and shares: each band is as wide as its share of the first. */
export function Funnel({ steps, tone = 'light' }: { steps: { label: string; count: number; share: number }[]; tone?: 'light' | 'dark' }) {
  const muted = tone === 'dark' ? 'text-[#b3b3b3]' : 'text-ink-muted';
  return (
    <ol className="m-0 grid list-none gap-2 p-0" aria-label="Embudo">
      {steps.map((s, i) => (
        <li key={s.label} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
          <div className="flex h-9 items-center justify-center">
            <div className={`h-full rounded-sm ${i === steps.length - 1 ? 'bg-signal-deep' : tone === 'dark' ? 'bg-white' : 'bg-ink'}`}
              style={{ width: `${s.share}%`, opacity: 1 - i * 0.12 }} />
          </div>
          <p className={`m-0 w-[9.5rem] font-mono text-[12px] leading-tight ${muted}`}>
            <span className={tone === 'dark' ? 'text-white' : 'text-ink'}>{int(s.count)}</span> · {pct(s.share)}<br />{s.label}
          </p>
        </li>
      ))}
    </ol>
  );
}
