#!/bin/bash
set -u

# Consola humana de Scenarys en macOS.
# El PC sirve choisys (web + API); este Mac sirve solo la landing en loopback.

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PC_HOST="${SCENARYS_PC_HOST:-desktop-dgjsrgv}"
PC_WEB_PORT="${SCENARYS_PC_WEB_PORT:-8081}"
PC_API_PORT="${SCENARYS_PC_API_PORT:-3000}"
LOCAL_PORT="${SCENARYS_LOCAL_PORT:-5173}"
CHOISYS_URL="http://${PC_HOST}:${PC_WEB_PORT}"

say() { printf '\n\033[1m%s\033[0m\n' "$1"; }
fail() { printf '\n\033[31m%s\033[0m\n' "$1"; exit 1; }
check_http() { curl --fail --silent --show-error --max-time 5 --output /dev/null "$1"; }

say "Scenarys — Mac consola / PC servidor"
command -v node >/dev/null 2>&1 || fail "Falta Node en el Mac."
command -v curl >/dev/null 2>&1 || fail "Falta curl en el Mac."
[ -d "$ROOT/node_modules" ] || fail "Faltan dependencias. Ejecuta 'npm install' dentro de $ROOT."

echo "  PC:      $PC_HOST"
echo "  choisys: $CHOISYS_URL"
echo "  landing: http://127.0.0.1:$LOCAL_PORT"

say "Comprobando el PC"
check_http "http://${PC_HOST}:${PC_API_PORT}/health" \
  && echo "  ✅ API" \
  || fail "La API del PC no responde. Comprueba el PC y Tailscale; no abras puertos del router."
check_http "$CHOISYS_URL" \
  && echo "  ✅ web" \
  || fail "La web de choisys no responde en el PC."

if lsof -nP -iTCP:"$LOCAL_PORT" -sTCP:LISTEN >/dev/null 2>&1; then
  fail "El puerto local $LOCAL_PORT ya está ocupado."
fi

say "Arrancando la landing solo en este Mac"
cd "$ROOT" || exit 1
VITE_CHOISYS_URL="$CHOISYS_URL" npx vite --host 127.0.0.1 --port "$LOCAL_PORT" --strictPort &
VITE_PID=$!
trap 'kill "$VITE_PID" 2>/dev/null || true' EXIT INT TERM HUP

for _ in $(seq 1 30); do
  check_http "http://127.0.0.1:$LOCAL_PORT" && break
  sleep 1
done
check_http "http://127.0.0.1:$LOCAL_PORT" || fail "La landing no respondió."

open -a Safari "http://127.0.0.1:$LOCAL_PORT"
say "Listo. Ctrl+C para parar la landing del Mac."
wait "$VITE_PID"
