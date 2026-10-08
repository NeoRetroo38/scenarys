// Publica scenarys en GitHub Pages con choisys en /choisys.
// Uso (desde la raíz de este repo, con main limpio y choisys clonado al lado):
//   CHOISYS_API_URL=https://… node scripts/deploy-pages.mjs ../choisys/repo [--push]
// Sin --push solo prepara y comprueba la carpeta; con --push la sube a la rama gh-pages (conserva CNAME).
import { execFileSync } from 'node:child_process';
import { cpSync, existsSync, mkdtempSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync, copyFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { assertPublicContent } from './prepare-public-site.mjs';

const run = (cmd, args, cwd, env = {}) => execFileSync(cmd, args, { cwd, stdio: 'inherit', env: { ...process.env, ...env } });
const out = (cmd, args, cwd) => execFileSync(cmd, args, { cwd, encoding: 'utf8' }).trim();
const [choisysRepo, flag] = process.argv.slice(2);
if (!choisysRepo || !existsSync(join(choisysRepo, 'apps/mobile/app.config.js'))) throw new Error('Indica la ruta del repo choisys (con apps/mobile/app.config.js).');
const api = new URL(process.env.CHOISYS_API_URL ?? '');
if (api.protocol !== 'https:' || api.username || api.password || api.pathname !== '/') throw new Error('CHOISYS_API_URL debe ser https://host[:puerto] sin ruta ni credenciales.');
for (const repo of ['.', choisysRepo]) {
  if (out('git', ['status', '--porcelain', '--untracked-files=no'], repo)) throw new Error(`${repo} tiene cambios sin guardar.`);
}

// 1. scenarys
run('npm', ['run', 'build:public'], '.');
// 2. choisys web under /choisys
const site = resolve('dist');
const app = join(site, 'choisys');
rmSync(app, { recursive: true, force: true });
run('npx', ['expo', 'export', '-p', 'web', '--output-dir', app], join(choisysRepo, 'apps/mobile'),
  { EXPO_BASE_URL: '/choisys', EXPO_PUBLIC_API_URL: api.origin, EXPO_NO_TELEMETRY: '1', CI: '1' });
for (const route of ['sign-in', 'register', 'account', 'system']) copyFileSync(join(app, 'index.html'), join(app, `${route}.html`));
// 3. same privacy check over everything, allowing only the declared API host
(function inspect(path) {
  for (const name of readdirSync(path)) {
    const file = join(path, name);
    if (name === '.git' || name === 'node_modules' || name.startsWith('.env') || name.endsWith('.map')) throw new Error(`No publicable: ${file}`);
    if (statSync(file).isDirectory()) inspect(file);
    else if (/\.(html|js|json|css|txt)$/.test(name)) assertPublicContent(readFileSync(file, 'utf8'), [api.host, api.hostname]);
  }
})(site);
console.log(`Listo: ${site} (scenarys ${out('git', ['rev-parse', '--short', 'HEAD'], '.')}, choisys ${out('git', ['rev-parse', '--short', 'HEAD'], choisysRepo)}, API ${api.origin}).`);

if (flag !== '--push') process.exit(0);
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
  const message = `deploy: scenarys ${out('git', ['rev-parse', '--short', 'HEAD'], '.')} + choisys ${out('git', ['rev-parse', '--short', 'HEAD'], choisysRepo)}`;
  if (!out('git', ['status', '--porcelain'], work)) { console.log('gh-pages ya estaba al día.'); }
  else { run('git', ['commit', '-q', '-m', message], work); run('git', ['push', '-q', 'origin', 'HEAD:gh-pages'], work); console.log(`Publicado en gh-pages: ${message}`); }
} finally {
  run('git', ['worktree', 'remove', '--force', work], '.');
}
