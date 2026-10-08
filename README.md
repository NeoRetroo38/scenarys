# scenarys

Landing page de Scenarys S.L. Presenta la compañía y su primer producto, choisys, y enlaza a él.

Stack: Vite, React, TypeScript y Tailwind CSS v4. No hay backend.

## Desarrollo

```bash
npm install
npm run dev        # servidor local
npm run typecheck  # comprobación de tipos
npm run build      # build de producción en dist/
```

Para usar este Mac como consola mientras el PC mantiene choisys en marcha,
consulta [`docs/MAC-PC-CONSOLE.md`](docs/MAC-PC-CONSOLE.md).

## Configuración

Copia `.env.example` a `.env` y rellena las variables:

| Variable | Uso | Por defecto |
| --- | --- | --- |
| `VITE_CHOISYS_URL` | URL absoluta de choisys, que es una web separada | botones como pendientes |
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

Este repositorio es público. Puede describir el Cubo de Neo, pero no contiene ni debe contener su modelo matemático, sus fórmulas ni su inferencia, que viven solo en la implementación C++ privada. `DecisionMatrix` reproduce la interacción de los botones y no calcula nada.

## Pendiente antes de publicar

- Definir la URL real de choisys (`VITE_CHOISYS_URL`) y publicar choisys como web.
- Definir el email de contacto (`VITE_CONTACT_EMAIL`).
- Redactar aviso legal, política de privacidad y de cookies, con CIF y domicilio social. El pie enlaza a anclas provisionales.
