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
| `VITE_CHOISYS_URL` | Destino público preparado de choisys | página informativa `/choisys` |
| `VITE_CONTACT_EMAIL` | Email de contacto de la sección final | se muestra como pendiente |

Son valores públicos que se incrustan en el build. No pongas secretos en variables `VITE_*`.

## Estructura

```text
src/
  config.ts              URL de choisys y email, leídos del entorno
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

Dominio canónico: `https://neowebdevsolutions.com`.
Rutas: `/choisys`, `/daemon`, `/downloads`, `/releases`, `/docs`, `/status` y `/legal`.
Los archivos de cada ruta se generan durante `build:public`.
El manifiesto `/releases/manifest.json` identifica el commit de la web; `artifacts: []`
declara que aún no hay ejecutables públicos autorizados. No anuncia un release.

No incrustar direcciones privadas ni configurar la landing pública para enlazar al
entorno interno. Sin destino público preparado, `/choisys` explica que sigue privado.
El chequeo de marcadores del build es una barrera adicional, no una auditoría completa
de secretos. La publicación debe partir de un commit fusionado y limpio.
El hosting y el DNS se comprueban por separado: compilar no significa estar online.

## Pendiente antes de publicar

- La landing puede publicarse sin hacer público choisys; no inventar su URL.
- Definir el email de contacto (`VITE_CONTACT_EMAIL`).
- Confirmar la información jurídica y el contacto oficial antes de incorporar funcionalidades que los requieran.
  `/legal` es una nota técnica transparente; no inventa un aviso legal.
