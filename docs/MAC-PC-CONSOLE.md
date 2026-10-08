# Mac como consola y PC como servidor

Este flujo mantiene el backend y el frontend de choisys en el PC. El Mac sirve
únicamente la landing de Scenarys en `127.0.0.1` y la abre en Safari. La landing
enlaza a choisys mediante el nombre Tailscale del PC.

## Antes de empezar

1. El PC está encendido, conectado a Tailscale y ejecuta el modo documentado en
   `choisys/docs/DEMO-TAILSCALE.md`.
2. El Mac está conectado al mismo tailnet.
3. Las dependencias de esta landing están instaladas con `npm install`.
4. El nombre Tailscale del PC resuelve desde el Mac.

## Arrancar

Desde Finder, abre `scripts/mac-pc-console.command`, o desde Terminal:

```bash
SCENARYS_PC_HOST=desktop-dgjsrgv ./scripts/mac-pc-console.command
```

Se comprueban primero `http://PC:3000/health` y `http://PC:8081`. Si ambos
responden, la landing arranca en `http://127.0.0.1:5173` y Safari la abre.

El script no instala software, no usa `sudo`, no lee credenciales, no configura
Tailscale y no abre puertos del router. Para detener la landing, pulsa `Ctrl+C`.

## Si algo falla

- **No aparece el PC:** abre Tailscale en ambos equipos y comprueba que están
  conectados. No sustituyas esto por una exposición pública.
- **Falla la API o la web:** recupera los servicios en el PC siguiendo la guía
  de choisys. El Mac no debe arrancar una segunda copia del backend.
- **Puerto 5173 ocupado:** detén la landing local anterior antes de reintentar.
- **Cambió el nombre del PC:** pasa el nombre nuevo mediante
  `SCENARYS_PC_HOST`; no lo fijes en código.

Coordinación: `scenarys#1`, `choisys#43` y `neos-cube#15`.
