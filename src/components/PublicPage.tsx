import { DocumentList, DownloadList } from './DocumentList';
import { Container, Eyebrow, PillLink } from './ui';
import type { PublicPageData } from '../publicPages.mjs';

export function PublicPage({ page }: { page: PublicPageData | undefined }) {
  const dark = page?.tone === 'dark';
  return (
    <div className={dark ? 'bg-ink text-white' : ''}>
    <Container className="min-h-[70vh] py-[clamp(64px,10vw,128px)]">
      <Eyebrow tone={dark ? 'inverse' : 'muted'}>{page?.eyebrow ?? '404 · Ruta no disponible'}</Eyebrow>
      <h1 className="max-w-[960px] text-[clamp(44px,7vw,96px)] leading-none tracking-[-0.045em]">
        {page?.title ?? 'Página no encontrada'}
      </h1>
      <p className="mt-8 max-w-[780px] text-[clamp(22px,3vw,36px)] leading-tight">
        {page?.summary ?? 'Esta dirección no corresponde a una página de Scenarys.'}
      </p>
      {page?.quote && (
        <blockquote className={`mt-10 max-w-[780px] border-l-2 ${dark ? 'border-signal' : 'border-signal-deep'} pl-6 text-[clamp(20px,2.4vw,28px)] leading-snug tracking-[-0.01em]`}>
          {page.quote}
        </blockquote>
      )}
      <div className={`mt-10 max-w-[700px] space-y-5 text-lg leading-relaxed ${dark ? 'text-[#b3b3b3]' : 'text-ink-soft'}`}>
        {page?.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
      </div>
      {page?.diagram && (
        <pre className="my-10 overflow-x-auto border-y border-line py-7 font-mono text-sm" aria-label="Flujo de datos público">
          {'Interfaz choisys\n       ↓ contratos\nAPI de producto\n       ↓ observaciones\nMotor C++\n\nDatos públicos → neo-cube-web → geometría'}
        </pre>
      )}
      {page?.catalog === 'docs' && <DocumentList />}
      {page?.catalog === 'downloads' && <DownloadList />}
      {page && <p className={`mt-10 max-w-[700px] border-t pt-6 ${dark ? 'border-[#333] text-[#b3b3b3]' : 'border-line text-ink-muted'}`}>{page.next}</p>}
      <div className="mt-10 flex flex-wrap gap-3">
        {page?.actions?.map(a => <PillLink key={a.href} href={a.href} variant={dark ? 'inverse' : 'solid'} arrow>{a.label}</PillLink>)}
        {page?.manifest && <PillLink href="/releases/manifest.json" variant="outline">Ver manifiesto</PillLink>}
        <PillLink href="/" variant={dark ? 'outlineInverse' : 'outline'}>Volver a Scenarys</PillLink>
      </div>
    </Container>
    </div>
  );
}
