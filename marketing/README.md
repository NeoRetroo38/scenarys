# Marketing

Herramientas para hacer piezas de marca de scenarys, choisys y las próximas apps. Nada de esta carpeta se
publica en la web por sí solo: las piezas terminadas se suben aparte.

## Blender: el Cubo en imágenes

`blender/cubo.py` dibuja el Cubo de Neo con la estética de choisys. Usa la misma geometría que la vista del cubo
de la app y la misma paleta:

- fondo negro;
- cubo exterior y rejilla 3×3×3 solo con aristas blancas;
- ejes en verde `#39ff14`;
- último Run en blanco con halo;
- Runs anteriores en rojo `#ff2a2a` al 45 %.

| Formato | Tamaño | Para qué |
| --- | --- | --- |
| `web` | 1200 × 630 | Portada y vista previa al compartir un enlace |
| `play` | 1024 × 500 | Gráfico de funciones de la ficha de Google Play |
| `square` | 1080 × 1080 | Publicaciones cuadradas |
| `story` | 1080 × 1920 | Historias y vídeo vertical |

En `web` y `play` el cubo va a la derecha, para dejar sitio al texto a la izquierda.

```bash
# En el Mac, sin abrir Blender (o doble clic en ~/Desktop/scenarys/renderizar-cubo.command):
/Applications/Blender.app/Contents/MacOS/Blender -b --factory-startup -P marketing/blender/cubo.py -- \
  --out marketing/renders --formats web,play,square,story --samples 128
```

Opciones:

- `--yaw` y `--pitch` giran la cámara (por defecto 30° y 20°).
- `--samples` sube o baja la calidad.

Las imágenes se guardan en `marketing/renders/`, que no se versiona.

**Regla:** el render es una ilustración. Los Runs son de ejemplo, no datos de usuarios, y el script no calcula nada.

**Conector de Blender para Claude.** El conector oficial lo publica Blender Lab y necesita Blender 5.1 o
posterior.

- Se instala desde el directorio de conectores de la app de escritorio de Claude, junto con su complemento dentro de Blender.
- Ejecuta Python dentro de Blender sin restricciones, así que conviene trabajar sobre copias de los archivos.

## Ableton Live 12 Lite: los sonidos de choisys

choisys ya suena con cinco efectos, hoy tonos sintetizados por `scripts/generate-sounds.mjs`.

**Cómo se cambian.** Basta con exportar desde Ableton un WAV con el mismo nombre en
`apps/mobile/assets/sounds/` del repo de choisys. No hay que tocar código.

| Archivo | Cuándo suena | Duración actual |
| --- | --- | --- |
| `tap.wav` | Al empezar y al tocar cada casilla | 0,2 s |
| `phase.wav` | Al aceptar una fase que no es la última | 0,5 s |
| `complete.wav` | Al completar el Run | 0,9 s |
| `cube.wav` | Al abrir «Ver mi cubo» | 0,7 s |
| `error.wav` | Cuando algo falla | 0,3 s |

**Formato de entrega**

- WAV mono de 16 bits a 44,1 kHz.
- Pico a −1 dBFS y sin silencio al principio.
- La duración, como mucho, la actual. `tap` debe ser corto, porque suena en cada toque.

**Al reproducirse**

- La app los reproduce al 70 % del volumen.
- Respeta el modo silencio y se mezcla con la música del usuario.

**Antes de cambiarlos.** `generate-sounds.mjs` sobrescribe estos archivos si se vuelve a ejecutar.

- Adoptar los de Ableton es un PR en choisys que sustituye los WAV y retira ese script, o lo deja solo como respaldo.
- Para logo sonoro y música de vídeo: WAV estéreo a 48 kHz.

Live 12 Lite admite 8 pistas y 16 escenas, suficiente para este trabajo.

**Conector de Ableton para Claude.** El conector oficial responde con la documentación de Live y Push; no
controla Live. Hay proyectos de terceros que lo controlan mediante un Remote Script (por ejemplo, LiveMCP).

- No están instalados.
- No se ha comprobado que funcionen con Lite.
