// scenarys es siempre la landing en la raíz del dominio. Cada app que creemos se sirve en una ruta
// de ese dominio (decisión del dueño, 9 oct): neowebdevsolutions.com/<app>.
// Este registro es la única fuente de verdad: lo leen los botones de la landing, el despliegue y los tests.
// La ruta es solo de su app: ninguna página de la landing puede usarla.

/** Carpetas que el build de la landing ocupa en la raíz del sitio. */
export const LANDING_FOLDERS = ['assets', 'docs', 'releases'];

export const apps = [
  {
    name: 'choisys',
    route: '/choisys',
    repo: 'NeoRetroo38/choisys',
    // Export web de Expo con EXPO_BASE_URL=<route> desde esta carpeta del repo.
    kind: 'expo',
    project: 'apps/mobile',
    // Variable de despliegue con la URL pública (https) de su API. Es el único host externo que puede aparecer en su build.
    apiUrlEnv: 'CHOISYS_API_URL',
  },
];

/** Ruta de una app del registro. Falla si no existe, para que un enlace nunca apunte a una app sin publicar. */
export function appRoute(name) {
  const app = apps.find(entry => entry.name === name);
  if (!app) throw new Error(`App desconocida: ${name}`);
  return app.route;
}

/** Problemas del registro frente a las rutas de la landing. Lista vacía = todo correcto. */
export function appRouteProblems(registry, pagePaths, landingFolders = LANDING_FOLDERS) {
  const problems = [];
  const seenNames = new Set();
  const seenRoutes = new Set();
  const pages = new Set(pagePaths);
  for (const app of registry) {
    if (!/^[a-z0-9-]+$/.test(app.name)) problems.push(`${app.name}: el nombre debe ir en minúsculas, sin espacios`);
    if (!/^\/[a-z0-9-]+$/.test(app.route)) problems.push(`${app.name}: la ruta debe ser un único tramo, como /choisys`);
    if (seenNames.has(app.name)) problems.push(`${app.name}: nombre repetido`);
    if (seenRoutes.has(app.route)) problems.push(`${app.route}: ruta repetida`);
    if (pages.has(app.route)) problems.push(`${app.route}: es también una página de la landing`);
    if (landingFolders.includes(app.route.slice(1))) problems.push(`${app.route}: la usa el build de la landing`);
    if (!/^[\w.-]+\/[\w.-]+$/.test(app.repo)) problems.push(`${app.name}: repo debe ser OWNER/REPO`);
    if (app.kind !== 'expo') problems.push(`${app.name}: tipo de app sin despliegue (${app.kind})`);
    seenNames.add(app.name);
    seenRoutes.add(app.route);
  }
  return problems;
}
