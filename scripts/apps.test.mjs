import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { apps, appRoute, appRouteProblems, LANDING_FOLDERS } from '../src/apps.mjs';
import { findPublicPage, publicPages } from '../src/publicPages.mjs';
import { expoRoutePages, parseDeployArgs, readApiUrl } from './app-builds.mjs';

const pagePaths = publicPages.map(page => page.path);

test('scenarys owns the root and every app owns its route', () => {
  assert.deepEqual(appRouteProblems(apps, pagePaths), []);
  for (const app of apps) assert.equal(findPublicPage(app.route), undefined, `${app.route} is an app, not a landing page`);
  // Nothing the landing ships at the root may take an app's route.
  const shipped = readdirSync(new URL('../public/', import.meta.url));
  for (const app of apps) assert.ok(!shipped.includes(app.route.slice(1)), `public/${app.route.slice(1)} collides with ${app.name}`);
  assert.equal(appRoute('choisys'), '/choisys');
  assert.throws(() => appRoute('nope'), /desconocida/);
});

test('the landing links to choisys through the registry', () => {
  const config = readFileSync(new URL('../src/config.ts', import.meta.url), 'utf8');
  assert.match(config, /\?\? appRoute\('choisys'\)/);
  assert.ok(!config.includes("?? '/choisys'"));
});

test('route collisions and malformed entries are reported', () => {
  const base = { name: 'demo', route: '/demo', repo: 'NeoRetroo38/demo', kind: 'expo', project: 'app' };
  const problems = registry => appRouteProblems(registry, ['/daemon', '/docs']);
  assert.deepEqual(problems([base]), []);
  assert.match(problems([{ ...base, route: '/daemon' }]).join(), /página de la landing/);
  assert.match(problems([{ ...base, route: '/assets' }]).join(), /build de la landing/);
  assert.match(problems([base, { ...base, name: 'other' }]).join(), /ruta repetida/);
  assert.match(problems([base, { ...base, route: '/other' }]).join(), /nombre repetido/);
  for (const route of ['/a/b', 'demo', '/Demo', '/', '/demo/']) assert.match(problems([{ ...base, route }]).join(), /único tramo/);
  assert.match(problems([{ ...base, kind: 'vite' }]).join(), /sin despliegue/);
  assert.ok(LANDING_FOLDERS.includes('assets'));
});

test('deploy arguments keep the current publicar-todo call working', () => {
  assert.deepEqual(parseDeployArgs(['../choisys/repo', '--push'], apps), { repos: { choisys: '../choisys/repo' }, push: true });
  assert.deepEqual(parseDeployArgs(['choisys=../c=d'], apps), { repos: { choisys: '../c=d' }, push: false });
  assert.throws(() => parseDeployArgs([], apps), /Faltan repos para: choisys/);
  assert.throws(() => parseDeployArgs(['otra=../x'], apps), /desconocida/);
  assert.throws(() => parseDeployArgs(['a', 'choisys=b'], apps), /dos veces/);
});

test('API URLs must be bare https origins', () => {
  assert.equal(readApiUrl('https://api.example.com:8443', 'X').origin, 'https://api.example.com:8443');
  for (const value of [undefined, '', 'http://api.example.com', 'https://u:p@api.example.com', 'https://api.example.com/v1', 'https://api.example.com/?a=1']) {
    assert.throws(() => readApiUrl(value, 'X'), /X debe ser/);
  }
});

test('every Expo Router screen gets its own html for direct links', () => {
  const project = mkdtempSync(join(tmpdir(), 'scenarys-routes-'));
  try {
    const app = join(project, 'src', 'app');
    for (const dir of ['(tabs)', 'admin', 'item']) mkdirSync(join(app, dir), { recursive: true });
    for (const file of ['_layout.tsx', 'index.tsx', 'sign-in.tsx', 'register.tsx', '+not-found.tsx', '[id].tsx', 'account.test.tsx',
      '(tabs)/home.tsx', '(tabs)/index.tsx', 'admin/index.tsx', 'admin/users.tsx', 'item/[id].tsx', 'styles.css']) {
      writeFileSync(join(app, file), '');
    }
    assert.deepEqual(expoRoutePages(project), ['admin/index.html', 'admin/users.html', 'home.html', 'register.html', 'sign-in.html']);
    assert.throws(() => expoRoutePages(join(project, 'missing')), /carpeta de rutas/);
  } finally { rmSync(project, { recursive: true, force: true }); }
});
