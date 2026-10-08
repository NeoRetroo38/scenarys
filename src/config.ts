// Valores de despliegue. Se leen de variables VITE_* en tiempo de build (ver .env.example).

function readEnv(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

/** Solo se aceptan URLs absolutas http(s): choisys es una web aparte, no una ruta de esta.
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

/** Destino de todos los enlaces a choisys (web separada). Sin definir, los botones se muestran como pendientes. */
export const CHOISYS_URL = readAbsoluteUrl(import.meta.env.VITE_CHOISYS_URL) ?? '/choisys';

/** Email público de contacto. Sin definir, la sección de contacto lo indica como pendiente. */
export const CONTACT_EMAIL = readEnv(import.meta.env.VITE_CONTACT_EMAIL);
