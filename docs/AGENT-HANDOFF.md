# Nota operativa para Daemon, Neo y Claude

Estado validado en el PC `desktop-dgjsrgv` el 8 de octubre de 2026.

## Recorrido de la demo

```text
Safari o Brave
  -> https://desktop-dgjsrgv.tail7bc3b5.ts.net/
  -> enlace de la landing a https://desktop-dgjsrgv.tail7bc3b5.ts.net:9444/
  -> API de choisys en https://desktop-dgjsrgv.tail7bc3b5.ts.net:8443/
  -> Neon PostgreSQL y neo-cube desde la API
```

La landing no conoce Neon, no contiene credenciales y no llama al Cubo. Su única
integración con el producto es `VITE_CHOISYS_URL`. El valor de la demo debe ser
la URL HTTPS `:9444` anterior.

## Safari

- Mac o iPhone deben estar conectados al mismo tailnet.
- Abrir primero la landing por HTTPS; sus botones deben abrir choisys por HTTPS.
- No sustituir las URLs por IP, HTTP, Funnel, reenvío del router ni `0.0.0.0`.
- Tras cambiar `VITE_CHOISYS_URL`, reconstruir la landing: Vite inserta el valor
  durante el build.
- La validación física final se hace en Safari de Mac y Safari de iPhone. Windows
  permite verificar build, enlaces, TLS y red, pero no ejecutar WebKit de Apple.

## Responsables

- **Daemon:** mantener procesos, Tailscale Serve y health checks; no cambiar el
  binding loopback de los servicios.
- **Neo:** probar desde Safari la navegación landing -> choisys y comunicar el
  texto exacto de cualquier error visible.
- **Claude:** conservar esta topología al cambiar documentación o launchers y
  volver a ejecutar build/typecheck antes de proponer un PR.

