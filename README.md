# scenarys

Landing page de Scenarys S.L. Presenta la compañía y su primer producto, choisys, y enlaza a él.

Stack: Vite, React, TypeScript y Tailwind CSS v4. No hay backend.

## Desarrollo

```bash
npm install
npm run dev        # servidor local
npm run typecheck  # comprobación de tipos
npm run build      # build de producción en dist/
npm test           # rutas públicas y barrera de configuración privada
npm run build:public # build, páginas estáticas y manifest sin releases ficticios
```

Para usar este Mac como consola mientras el PC mantiene choisys en marcha,
consulta [`docs/MAC-PC-CONSOLE.md`](docs/MAC-PC-CONSOLE.md).

## Configuración

Copia `.env.example` a `.env` y rellena las variables:

| Variable | Uso | Por defecto |
| --- | --- | --- |
| `VITE_CHOISYS_URL` | Destino de «Abrir choisys» si se prueba contra otra copia (URL absoluta) | la ruta de choisys en `src/apps.mjs` |

Son valores públicos que se incrustan en el build. No pongas secretos en variables `VITE_*`.

## Estructura

```text
src/
  apps.mjs               registro de apps y su ruta en el dominio
  config.ts              enlace a choisys (ruta del registro) y teléfono de contacto
  components/
    Header.tsx           navegación y acceso a choisys
    Hero.tsx             presentación de Scenarys
    ChoisysSection.tsx   producto y enlace principal
    DecisionMatrix.tsx   demo 3×3 de la interacción binaria (solo UI)
    HowItWorks.tsx       fases, decisiones, ejecuciones, matriz
    NeoCube.tsx          descripción pública del Cubo de Neo
    Studio.tsx           disciplinas de la compañía
    Contact.tsx          contacto
    Footer.tsx           pie y enlaces legales
```

## Confidencialidad

Este repositorio es privado; su landing compilada está destinada a publicación.
El motor canónico se mantiene en el repositorio público separado `NeoRetroo38/neos-cube`.
La web no contiene lógica del motor ni inferencia. `DecisionMatrix` es una demostración
visual local, no un Run guardado.

## Publicación

Dominio canónico: `https://neowebdevsolutions.com`. scenarys es siempre la landing en la raíz y cada app
se sirve en una ruta del dominio ([decisión 0001](docs/decisions/0001-scenarys-en-la-raiz-apps-en-rutas.md)).

- **Apps:** las define `src/apps.mjs`, la única fuente de rutas. Hoy: `/choisys` (export de Expo con `EXPO_BASE_URL=/choisys`).
- **Páginas de la landing:** `/daemon`, `/downloads`, `/releases`, `/docs`, `/status` y `/legal`. Sus archivos se generan durante `build:public`.
- **Choques:** `npm test` falla si una página o carpeta de la landing coincide con la ruta de una app.

```bash
# prepara dist/ con la landing y cada app en su ruta; --push lo sube a gh-pages
CHOISYS_API_URL=https://… node scripts/deploy-pages.mjs choisys=../choisys [--push]
```

También se generan `robots.txt`, una página 404 sin JavaScript y `_headers` con la
política de recursos, permisos mínimos y protección frente a incrustación.
`_headers` es la configuración de [Cloudflare Pages/Assets](https://developers.cloudflare.com/pages/configuration/headers/);
si el proveedor final no la interpreta, debe aplicar la misma política y comprobarse
en sus respuestas HTTP. El preview de producción aplica las mismas cabeceras mediante
[Vite preview.headers](https://vite.dev/config/preview-options.html#preview-headers).
No se activa HSTS/preload para un dominio cuyo HTTPS aún no se ha verificado.
El build rechaza mapas de fuentes y marcadores privados también en archivos de texto.
El manifiesto `/releases/manifest.json` identifica el commit de la web; `artifacts: []`
declara que aún no hay ejecutables públicos autorizados. No anuncia un release.

No incrustar direcciones privadas. La única excepción es el host público de la API de cada app, que el despliegue
declara con su variable (`CHOISYS_API_URL` para choisys) y que solo se admite dentro de la ruta de esa app.
El chequeo de marcadores del build es una barrera adicional, no una auditoría completa
de secretos. La publicación debe partir de un commit fusionado y limpio.
El hosting y el DNS se comprueban por separado: compilar no significa estar online.

## Pendiente antes de publicar

- Confirmar la información jurídica y el contacto oficial antes de incorporar funcionalidades que los requieran.
  `/legal` es una nota técnica transparente; no inventa un aviso legal.
