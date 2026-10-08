import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { publicPages, findPublicPage, PUBLIC_ORIGIN } from '../src/publicPages.mjs';
import { assertPublicContent, preparePublicSite } from './prepare-public-site.mjs';

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
    assert.throws(() => preparePublicSite(directory, 'unknown'));
  } finally { rmSync(directory, { recursive: true, force: true }); }
});
