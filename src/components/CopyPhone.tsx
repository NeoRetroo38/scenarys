import { useEffect, useRef, useState } from 'react';
import { CONTACT_PHONE } from '../config';

/** Copia el teléfono de empresa al portapapeles. Funciona también fuera de HTTPS (respaldo con selección de texto). */
async function copy(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) { await navigator.clipboard.writeText(text); return true; }
  } catch { /* se intenta el respaldo */ }
  const area = document.createElement('textarea');
  area.value = text; area.setAttribute('readonly', ''); area.style.position = 'fixed'; area.style.opacity = '0';
  document.body.appendChild(area); area.select();
  try { return document.execCommand('copy'); } catch { return false; } finally { area.remove(); }
}

const pill = 'inline-flex min-h-11 cursor-pointer items-center justify-center gap-3 rounded-full px-8 py-4 text-base tabular-nums transition-colors bg-ink text-white hover:bg-ink-soft';
const inline = 'cursor-pointer tabular-nums text-ink hover:underline';

export function CopyPhone({ variant = 'pill' }: { variant?: 'pill' | 'inline' }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);
  async function onClick() {
    if (!(await copy(CONTACT_PHONE.value))) return;
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 1600);
  }
  return (
    <button type="button" onClick={onClick} className={variant === 'pill' ? pill : inline}
      aria-label={`Copiar el teléfono de Scenarys, ${CONTACT_PHONE.label}`}>
      <span aria-live="polite">{copied ? 'Copiado' : CONTACT_PHONE.label}</span>
    </button>
  );
}
