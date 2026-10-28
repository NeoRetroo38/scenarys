# 0002 — Landing: obras, noticias y el cubo como marca

Fecha: 28 oct 2026 · PR #22

## Decisión

- **Dos registros.** Los sistemas (choisys, Cubo, Daemon) van en fondo blanco; las obras
  (libro, cine) van en fondo negro con el acento neón.
- **Un solo verde, tono 110°.** `--color-signal` (#39ff14) sobre negro y
  `--color-signal-deep` (#24a30a) sobre blanco. No se escriben verdes sueltos en componentes.
- **El cubo es la marca.** `CubeMark` reutiliza `@neoretroo38/neo-cube-web` (sin código
  geométrico nuevo): portada, cada noticia y cada página de obra, con una vista distinta por obra.
- **choisys** se presenta con el flujo de los dashboards: A. Empresa/Admin y B. Usuario/Candidato.
- La frase de portada se mantiene: «Construimos sistemas para pensar, decidir y crear.»

## Contenido nuevo

| Ruta | Qué es |
|---|---|
| `/#noticias` | Fight Cube (tráiler) y El chamán (borrador) |
| `/el-chaman` | Libro, antes «Los límites». Borrador completo en `public/docs/files/el-chaman-borrador.pdf` |
| `/fight-cube` | Corto. Tráiler: https://www.instagram.com/reel/DfBkg5PoASM/ (enlace, sin embed para no cargar rastreo) |

## Cómo añadir una obra

1. Añadir la página en `src/publicPages.mjs` con `tone: 'dark'` y, si hace falta, `quote` y `actions`.
2. Añadir la tarjeta en `src/components/News.tsx` con su `yaw` (vista del cubo).
3. Activarla en `src/components/Studio.tsx` con `href`.
4. Subir el recuento de rutas en `scripts/public-site.test.mjs`.
