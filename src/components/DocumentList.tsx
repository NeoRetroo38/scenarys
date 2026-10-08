import { useEffect, useState } from 'react';
import { CHOISYS_URL } from '../config';
import { DOC_GROUPS, DOCS_BASE, documents, formatOf } from '../docsCatalog.mjs';
import { PillLink } from './ui';

interface PublishedFile { path: string; size: number; sha256: string }

/** Size and SHA-256 come from the manifest written at build time; without it the list still works. */
function usePublishedFiles() {
  const [files, setFiles] = useState<Map<string, PublishedFile>>(new Map());
  useEffect(() => {
    let alive = true;
    fetch('/releases/manifest.json', { cache: 'no-store' })
      .then(response => (response.ok ? response.json() : null))
      .then(manifest => {
        if (!alive || !manifest || !Array.isArray(manifest.documents)) return;
        setFiles(new Map((manifest.documents as PublishedFile[]).map(file => [file.path, file])));
      })
      .catch(() => undefined);
    return () => { alive = false; };
  }, []);
  return files;
}

const size = (bytes: number) => bytes < 1024 * 1024 ? `${Math.max(1, Math.round(bytes / 1024))} KB` : `${(bytes / 1024 / 1024).toFixed(1)} MB`;

function FileLinks({ files, published, detailed }: { files: string[]; published: Map<string, PublishedFile>; detailed: boolean }) {
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {files.map(file => {
        const path = DOCS_BASE + file;
        const info = published.get(path);
        return (
          <a key={file} href={path} download
            title={info ? `SHA-256 ${info.sha256}` : undefined}
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-ink px-5 py-2 text-sm no-underline hover:bg-ink hover:text-white">
            <span>{formatOf(file)}</span>
            {detailed && info && <span className="font-mono text-xs opacity-70">{size(info.size)} · {info.sha256.slice(0, 12)}</span>}
          </a>
        );
      })}
    </div>
  );
}

export function DocumentList({ detailed = false }: { detailed?: boolean }) {
  const published = usePublishedFiles();
  return (
    <div className="mt-14 max-w-[880px]">
      {Object.entries(DOC_GROUPS).map(([group, label]) => (
        <section key={group} className="mt-12 first:mt-0" aria-label={label}>
          <h2 className="border-b border-line pb-3 text-[clamp(24px,2.6vw,32px)] leading-tight tracking-[-0.02em]">{label}</h2>
          <ul className="m-0 list-none p-0">
            {documents.filter(doc => doc.group === group).map(doc => (
              <li key={doc.slug} className="border-b border-line py-6">
                <p className="text-lg">{doc.title}</p>
                <p className="mt-1 text-ink-soft">{doc.description}</p>
                <FileLinks files={doc.files} published={published} detailed={detailed} />
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

export function DownloadList() {
  return (
    <div className="mt-14 max-w-[880px]">
      <ul className="m-0 list-none border-t border-line p-0">
        <li className="flex flex-wrap items-center justify-between gap-4 border-b border-line py-6">
          <div>
            <p className="text-lg">choisys en el navegador</p>
            <p className="mt-1 text-ink-soft">Sin instalar nada, en cualquier móvil u ordenador.</p>
          </div>
          <PillLink href={CHOISYS_URL} arrow>Abrir choisys</PillLink>
        </li>
        <li className="flex flex-wrap items-center justify-between gap-4 border-b border-line py-6">
          <div>
            <p className="text-lg">choisys para Android</p>
            <p className="mt-1 text-ink-soft">La primera app instalable. Se publicará aquí como APK, con su SHA-256.</p>
          </div>
          <span className="font-mono text-sm text-ink-muted">próximamente</span>
        </li>
      </ul>
      <h2 className="mt-14 text-[clamp(24px,2.6vw,32px)] leading-tight tracking-[-0.02em]">Documentación</h2>
      <DocumentList detailed />
    </div>
  );
}
