import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { PUBLIC_ORIGIN, publicPages } from '../src/publicPages.mjs';

export function assertPublicContent(text) {
  if (/postgres(?:ql)?:\/\/|DATABASE_URL\s*=|PRIVATE KEY|\.ts\.net|\/Users\/|https?:\/\/[^\/\s"'<>]+@/i.test(text)) {
    throw new Error('Public output contains a private configuration marker.');
  }
  const addresses = text.match(/\b(?:\d{1,3}\.){3}\d{1,3}\b/g) ?? [];
  for (const address of addresses) {
    const [a, b, c, d] = address.split('.').map(Number);
    if ([a, b, c, d].some(value => value > 255)) continue;
    if (a === 10 || a === 127 || a === 0 || a === 169 && b === 254 ||
      a === 192 && b === 168 || a === 172 && b >= 16 && b <= 31 ||
      a === 100 && b >= 64 && b <= 127) {
      throw new Error('Public output contains an internal network address.');
    }
  }
}

export function preparePublicSite(directory, commit) {
  if (!/^[a-f0-9]{40}$/.test(commit)) throw new Error('A full source commit is required.');
  const index = readFileSync(join(directory, 'index.html'), 'utf8');
  for (const page of publicPages) {
    const destination = join(directory, page.path.slice(1));
    mkdirSync(destination, { recursive: true });
    const html = index.replace('<title>Scenarys</title>', `<title>${page.title} — Scenarys</title>`)
      .replace(`href="${PUBLIC_ORIGIN}/"`, `href="${PUBLIC_ORIGIN}${page.path}"`);
    writeFileSync(join(destination, 'index.html'), html);
  }
  mkdirSync(join(directory, 'releases'), { recursive: true });
  writeFileSync(join(directory, 'releases', 'manifest.json'), JSON.stringify({
    schemaVersion: 1, site: PUBLIC_ORIGIN, sourceCommit: commit, artifacts: [],
  }, null, 2) + '\n');
  writeFileSync(join(directory, '404.html'), index);
  function inspect(path) {
    for (const entry of readdirSync(path, { withFileTypes: true })) {
      const file = join(path, entry.name);
      if (entry.isDirectory()) inspect(file);
      else if (/\.(html|js|json|css)$/.test(entry.name)) assertPublicContent(readFileSync(file, 'utf8'));
    }
  }
  inspect(directory);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const changes = execFileSync('git', ['status', '--porcelain', '--untracked-files=normal'], { encoding: 'utf8' }).trim();
  if (changes) throw new Error('Public build requires a clean committed source tree.');
  const commit = execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
  preparePublicSite(resolve('dist'), commit);
  console.log('Public routes and release manifest prepared; private markers check passed.');
}
