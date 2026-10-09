// Valores de despliegue. Se leen de variables VITE_* en tiempo de build (ver .env.example).
import { appRoute } from './apps.mjs';

function readEnv(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

/** VITE_CHOISYS_URL solo admite URLs absolutas http(s), para probar contra otra copia de choisys.
 *  En modo `simulation` (npm run build:sim) también file://, para abrir la simulación local sin servidor. */
const allowedProtocols = import.meta.env.MODE === 'simulation' ? ['https:', 'http:', 'file:'] : ['https:', 'http:'];
function readAbsoluteUrl(value: string | undefined): string | undefined {
  const raw = readEnv(value);
  if (!raw) return undefined;
  try {
    // En simulación se admiten rutas relativas (p. ej. choisys.html en la misma carpeta).
    const url = import.meta.env.MODE === 'simulation' ? new URL(raw, window.location.href) : new URL(raw);
    return allowedProtocols.includes(url.protocol) && !url.username && !url.password ? url.href : undefined;
  } catch {
    return undefined;
  }
}

/** Destino de todos los enlaces a choisys: su ruta en este dominio (registro de apps), salvo que VITE_CHOISYS_URL apunte a otra copia. */
export const CHOISYS_URL = readAbsoluteUrl(import.meta.env.VITE_CHOISYS_URL) ?? appRoute('choisys');

/** Único canal público de contacto por ahora: el teléfono de empresa (decisión del dueño, 8 oct). Se copia, no se llama. */
export const CONTACT_PHONE = { value: '+34633693369', label: '+34 633 693 369' } as const;
