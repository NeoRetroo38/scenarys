// Valores de despliegue. Se leen de variables VITE_* en tiempo de build (ver .env.example).

function readEnv(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

/** Destino de todos los enlaces a choisys. Por defecto, una ruta bajo el dominio de Scenarys. */
export const CHOISYS_URL = readEnv(import.meta.env.VITE_CHOISYS_URL) ?? '/choisys';

/** Email público de contacto. Sin definir, la sección de contacto lo indica como pendiente. */
export const CONTACT_EMAIL = readEnv(import.meta.env.VITE_CONTACT_EMAIL);
