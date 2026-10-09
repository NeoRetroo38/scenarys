// Publica en GitHub Pages: scenarys en la raíz del dominio y cada app de src/apps.mjs en su ruta.
// Uso (desde la raíz de este repo, con main limpio y cada app clonada al lado):
//   CHOISYS_API_URL=https://… node scripts/deploy-pages.mjs choisys=../choisys/repo [--push]
// Una ruta sin nombre se entiende como choisys. Cada app con API necesita su variable (apiUrlEnv en el registro).
// Sin --push solo prepara y comprueba la carpeta; con --push la sube a la rama gh-pages (conserva CNAME).
import { execFileSync } from 'node:child_process';
import { cpSync, existsSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync, copyFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { assertPublicContent } from './prepare-public-site.mjs';
import { expoRoutePages, parseDeployArgs, readApiUrl } from './app-builds.mjs';
import { appRouteProblems, apps } from '../src/apps.mjs';
import { publicPages } from '../src/publicPages.mjs';

const run = (cmd, args, cwd, env = {}) => execFileSync(cmd, args, { cwd, stdio: 'inherit', env: { ...process.env, ...env } });
const out = (cmd, args, cwd) => execFileSync(cmd, args, { cwd, encoding: 'utf8' }).trim();
const short = repo => out('git', ['rev-parse', '--short', 'HEAD'], repo);

const problems = appRouteProblems(apps, publicPages.map(page => page.path));
if (problems.length) throw new Error(`Registro de apps no válido:\n- ${problems.join('\n- ')}`);
const { repos, push } = parseDeployArgs(process.argv.slice(2), apps);
const targets = apps.map(app => {
  const repo = resolve(repos[app.name]);
  const project = join(repo, app.project);
  if (!existsSync(join(project, 'app.config.js'))) throw new Error(`${app.name}: falta ${app.project}/app.config.js en ${repo} (necesario para servirla en ${app.route}).`);
  const api = app.apiUrlEnv ? readApiUrl(process.env[app.apiUrlEnv], app.apiUrlEnv) : undefined;
  return { app, repo, project, api };
});
for (const repo of ['.', ...targets.map(target => target.repo)]) {
  if (out('git', ['status', '--porcelain', '--untracked-files=no'], repo)) throw new Error(`${repo} tiene cambios sin guardar.`);
}

// 1. scenarys, la landing, en la raíz
run('npm', ['run', 'build:public'], '.');
const site = resolve('dist');
// 2. cada app en su ruta
for (const { app, project, api } of targets) {
  const folder = join(site, app.route.slice(1));
  if (existsSync(folder)) throw new Error(`${app.route} ya existe en el build de la landing: la ruta es solo de ${app.name}.`);
  run('npx', ['expo', 'export', '-p', 'web', '--output-dir', folder], project,
    { EXPO_BASE_URL: app.route, ...(api ? { EXPO_PUBLIC_API_URL: api.origin } : {}), EXPO_NO_TELEMETRY: '1', CI: '1' });
  // GitHub Pages no reescribe rutas: cada pantalla necesita su .html para abrirse directamente o al recargar.
  for (const page of expoRoutePages(project)) {
    const file = join(folder, page);
    if (existsSync(file)) continue;
    mkdirSync(dirname(file), { recursive: true });
    copyFileSync(join(folder, 'index.html'), file);
  }
}
// 3. comprobación de privacidad: la landing sin excepciones; cada app solo admite el host de su API
const appFolders = new Map(targets.map(({ app, api }) => [join(site, app.route.slice(1)), api ? [api.host, api.hostname] : []]));
(function inspect(path, allowed) {
  for (const name of readdirSync(path)) {
    const file = join(path, name);
    if (name === '.git' || name === 'node_modules' || name.startsWith('.env') || name.endsWith('.map')) throw new Error(`No publicable: ${file}`);
    if (statSync(file).isDirectory()) inspect(file, appFolders.get(file) ?? allowed);
    else if (/\.(html|js|json|css|txt|md)$/.test(name)) assertPublicContent(readFileSync(file, 'utf8'), allowed);
  }
})(site, []);
const summary = ['scenarys ' + short('.'), ...targets.map(({ app, repo }) => `${app.name} ${short(repo)}`)].join(' + ');
console.log(`Listo: ${site} (${summary}). ${targets.map(({ app, api }) => `${app.route}${api ? ` → API ${api.origin}` : ''}`).join(' · ')}`);

if (!push) process.exit(0);
// 4. gh-pages: replace everything except CNAME, one commit, normal push (never --force)
const work = mkdtempSync(join(tmpdir(), 'scenarys-pages-'));
try {
  run('git', ['fetch', '-q', 'origin', 'gh-pages'], '.');
  run('git', ['worktree', 'add', '-q', '--detach', work, 'origin/gh-pages'], '.');
  const cname = existsSync(join(work, 'CNAME')) ? readFileSync(join(work, 'CNAME'), 'utf8') : 'neowebdevsolutions.com\n';
  for (const name of readdirSync(work)) if (name !== '.git') rmSync(join(work, name), { recursive: true, force: true });
  cpSync(site, work, { recursive: true });
  writeFileSync(join(work, 'CNAME'), cname);
  writeFileSync(join(work, '.nojekyll'), '');
  run('git', ['add', '-A'], work);
  const message = `deploy: ${summary}`;
  if (!out('git', ['status', '--porcelain'], work)) { console.log('gh-pages ya estaba al día.'); }
  else { run('git', ['commit', '-q', '-m', message], work); run('git', ['push', '-q', 'origin', 'HEAD:gh-pages'], work); console.log(`Publicado en gh-pages: ${message}`); }
} finally {
  run('git', ['worktree', 'remove', '--force', work], '.');
}
