import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync, readFileSync, rmSync, mkdirSync, readdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { publicPages, findPublicPage, PUBLIC_ORIGIN } from '../src/publicPages.mjs';
import { assertPublicContent, preparePublicSite } from './prepare-public-site.mjs';
import { PUBLIC_SECURITY_HEADERS, publicHeadersFile } from '../src/publicSecurity.mjs';

test('public routes are unique and resolve with trailing slashes', () => {
  assert.equal(new Set(publicPages.map(page => page.path)).size, 7);
  for (const page of publicPages) assert.equal(findPublicPage(page.path + '/'), page);
  assert.equal(findPublicPage('/internal'), undefined);
});

test('public content does not include internal endpoints or credential markers', () => {
  assert.doesNotThrow(() => assertPublicContent(JSON.stringify(publicPages)));
  for (const text of ['postgresql://account:secret@host/db', 'DATABASE_URL=x', '100.80.1.2',
    '192.168.1.1', '172.16.0.1', '10.1.1.1', '127.0.0.1', 'host.tail.example.ts.net',
    'https://user:private-password@example.test', 'http://private-user@example.test']) {
    assert.throws(() => assertPublicContent(text));
  }
  assert.doesNotThrow(() => assertPublicContent('A public checksum and version 0.1.0'));
});

test('build generates every route and an honest empty release catalog', () => {
  const directory = mkdtempSync(join(tmpdir(), 'scenarys-public-test-'));
  try {
    writeFileSync(join(directory, 'index.html'), `<title>Scenarys</title><link rel="canonical" href="${PUBLIC_ORIGIN}/">`);
    preparePublicSite(directory, 'a'.repeat(40));
    for (const page of publicPages) {
      const html = readFileSync(join(directory, page.path.slice(1), 'index.html'), 'utf8');
      assert.ok(html.includes(page.title + ' — Scenarys'));
      assert.ok(html.includes(PUBLIC_ORIGIN + page.path));
    }
    const manifest = JSON.parse(readFileSync(join(directory, 'releases/manifest.json'), 'utf8'));
    assert.deepEqual(manifest.artifacts, []);
    assert.equal(manifest.sourceCommit, 'a'.repeat(40));
    const notFound = readFileSync(join(directory, '404.html'), 'utf8');
    assert.ok(notFound.includes('Página no encontrada'));
    assert.ok(notFound.includes('content="noindex"'));
    assert.ok(!notFound.includes('<script'));
    assert.equal(readFileSync(join(directory, '_headers'), 'utf8'), publicHeadersFile());
    assert.equal(readFileSync(join(directory, 'robots.txt'), 'utf8'), 'User-agent: *\nAllow: /\n');
    assert.throws(() => preparePublicSite(directory, 'unknown'));
  } finally { rmSync(directory, { recursive: true, force: true }); }
});

test('static policy disables unneeded features without requiring an API or inline scripts', () => {
  const csp = PUBLIC_SECURITY_HEADERS['Content-Security-Policy'];
  assert.ok(csp.includes("script-src 'self'"));
  assert.ok(csp.includes("connect-src 'self'"));
  assert.ok(csp.includes("frame-ancestors 'none'"));
  assert.ok(!csp.includes('unsafe-inline') && !csp.includes('unsafe-eval'));
  assert.equal(PUBLIC_SECURITY_HEADERS['X-Content-Type-Options'], 'nosniff');
  assert.ok(!('Strict-Transport-Security' in PUBLIC_SECURITY_HEADERS));
});

test('source maps cannot be accidentally included in the public directory', () => {
  const directory = mkdtempSync(join(tmpdir(), 'scenarys-map-test-'));
  try {
    writeFileSync(join(directory, 'index.html'), '<title>Scenarys</title>');
    writeFileSync(join(directory, 'bundle.js.map'), '{"sourcesContent":["source"]}');
    assert.throws(() => preparePublicSite(directory, 'b'.repeat(40)), /source maps/);
  } finally { rmSync(directory, { recursive: true, force: true }); }
});

test('development metadata cannot be packaged as public assets', () => {
  for (const name of ['node_modules', '.git', '.env']) {
    const directory = mkdtempSync(join(tmpdir(), 'scenarys-private-dir-test-'));
    try {
      writeFileSync(join(directory, 'index.html'), '<title>Scenarys</title>');
      mkdirSync(join(directory, name));
      assert.throws(() => preparePublicSite(directory, 'c'.repeat(40)), /development metadata/);
    } finally { rmSync(directory, { recursive: true, force: true }); }
  }
});

test('the business phone is the only public contact', () => {
  const sources = readdirSync(new URL('../src/components/', import.meta.url))
    .map(name => readFileSync(new URL(`../src/components/${name}`, import.meta.url), 'utf8'))
    .concat(readFileSync(new URL('../src/config.ts', import.meta.url), 'utf8'), JSON.stringify(publicPages));
  const all = sources.join('\n');
  assert.ok(!/mailto:|wa\.me|whatsapp/i.test(all));
  assert.ok(!/[\w.+-]+@[\w-]+\.[a-z]{2,}/i.test(all));
  assert.ok(all.includes("value: '+34633693369'"));
  assert.ok(findPublicPage('/legal').paragraphs.some(p => p.includes('+34 633 693 369')));
});
