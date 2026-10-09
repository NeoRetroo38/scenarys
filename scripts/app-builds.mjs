// Piezas del despliegue de apps por ruta, separadas para poder probarlas sin compilar nada.
import { existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

/**
 * Argumentos de deploy-pages.mjs: `nombre=ruta/al/repo` por app y `--push`.
 * Una ruta sin nombre se entiende como choisys (así lo sigue llamando publicar-todo.command).
 */
export function parseDeployArgs(argv, registry) {
  const repos = {};
  let push = false;
  for (const arg of argv) {
    if (arg === '--push') { push = true; continue; }
    const [name, path] = arg.includes('=') ? arg.split(/=(.*)/s, 2) : ['choisys', arg];
    if (!registry.some(app => app.name === name)) throw new Error(`App desconocida: ${name}. Añádela antes a src/apps.mjs.`);
    if (!path) throw new Error(`Falta la ruta del repo de ${name}.`);
    if (repos[name]) throw new Error(`${name} aparece dos veces.`);
    repos[name] = path;
  }
  const missing = registry.filter(app => !repos[app.name]).map(app => app.name);
  if (missing.length) throw new Error(`Faltan repos para: ${missing.join(', ')}. Uso: node scripts/deploy-pages.mjs choisys=../choisys/repo [--push]`);
  return { repos, push };
}

/** Valida la URL pública de una API: https, sin credenciales ni ruta. */
export function readApiUrl(value, variable) {
  let url;
  try { url = new URL(value ?? ''); } catch { throw new Error(`${variable} debe ser https://host[:puerto].`); }
  if (url.protocol !== 'https:' || url.username || url.password || url.pathname !== '/' || url.search || url.hash) {
    throw new Error(`${variable} debe ser https://host[:puerto] sin ruta ni credenciales.`);
  }
  return url;
}

/**
 * Pantallas de Expo Router que necesitan su propio .html para abrirse directamente en GitHub Pages
 * (por ejemplo /choisys/register). Grupos `(x)` no cuentan en la URL; `_layout`, `+not-found` y
 * rutas dinámicas `[id]` se omiten; el `index` de la raíz ya es el index.html del export.
 */
export function expoRoutePages(projectDir) {
  const root = ['src/app', 'app'].map(dir => join(projectDir, dir)).find(existsSync);
  if (!root) throw new Error(`No hay carpeta de rutas (src/app o app) en ${projectDir}.`);
  const pages = new Set();
  (function walk(dir, segments) {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const name = entry.name;
      if (name.startsWith('_') || name.startsWith('+') || name.startsWith('.') || name.includes('[')) continue;
      if (entry.isDirectory()) {
        walk(join(dir, name), /^\(.+\)$/.test(name) ? segments : [...segments, name]);
        continue;
      }
      const match = name.match(/^(.+)\.(tsx|ts|jsx|js)$/);
      if (!match || /\.(test|spec)$/.test(match[1])) continue;
      const path = match[1] === 'index' ? [...segments, 'index'] : [...segments, match[1]];
      if (path.length === 1 && path[0] === 'index') continue;
      pages.add(`${path.join('/')}.html`);
    }
  })(root, []);
  return [...pages].sort();
}
