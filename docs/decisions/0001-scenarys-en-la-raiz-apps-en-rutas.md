# 0001 · scenarys en la raíz, cada app en una ruta

Estado: aceptada por el dueño (9 oct 2026).

## Decisión

- `https://neowebdevsolutions.com/` es siempre scenarys, la landing.
- Cada app que creemos se sirve en una ruta de ese dominio: `/choisys` hoy, `/<app>` las siguientes.
- La ruta es solo de su app. Ninguna página de la landing puede usarla.

## Cómo se aplica

- **Registro único.** [`src/apps.mjs`](../../src/apps.mjs) lista cada app con su nombre, ruta, repo, tipo de build y la variable de su API.
- **Quién lo lee.** Lo leen los botones de la landing (`appRoute('choisys')`), el despliegue (`scripts/deploy-pages.mjs`) y los tests.
- **Rutas.** Son de un solo tramo, en minúsculas (`/choisys`). No pueden coincidir con una página de la landing (`/daemon`, `/docs`, …) ni con sus carpetas (`/assets`, `/docs`, `/releases`). `npm test` lo comprueba.
- **Build en su ruta.** Cada app se construye para servirse en su ruta. En Expo: `EXPO_BASE_URL=/<app>` (lo activa `app.config.js` del repo de la app).
- **Enlaces directos.** Cada pantalla de Expo Router recibe su propio `.html`, para que `/choisys/register` se abra directamente o al recargar en GitHub Pages. Las rutas dinámicas (`[id]`) no se pueden pregenerar.
- **API.**
  - Si una app tiene API, va por HTTPS público, con CORS para `https://neowebdevsolutions.com`. Su host es la única excepción en la comprobación de privacidad del build de esa app.
  - La landing no admite excepciones.
  - El motor C++ nunca se publica.
- **Publicación.** `publicar-todo.command` en el Mac (paso 4) despliega `origin/main` de scenarys y de cada app.

## Añadir una app

1. **En su repo:** que el build web acepte una ruta base. En Expo basta con copiar `app.config.js` de choisys.
2. **En `src/apps.mjs`:** una entrada con `name`, `route`, `repo`, `kind`, `project` y, si tiene API, `apiUrlEnv`.
3. **Si su ruta es hoy una página de la landing:** mueve antes esa página. Pasaría con `/daemon` si Daemon tuviera web.
4. **En el despliegue:** pasa su repo con `nombre=ruta/al/repo` y define su variable de API.
5. **Probar:** `npm test` y una ejecución de `deploy-pages.mjs` sin `--push`.

Hoy solo hay despliegue para apps Expo (`kind: 'expo'`). Un tipo nuevo (por ejemplo Vite) se añade en `deploy-pages.mjs` con su build en la ruta.

## Por qué

- **Una sola dirección.** Una sola dirección que recordar y un solo certificado.
- **Más simple.** Sin subdominios que configurar en Hostinger por cada app.
- **Una puerta de entrada.** La landing es la puerta a todo el ecosistema.
