// Documentación pública de scenarys (copia revisada de la carpeta de iCloud).
// Se retiran IPs y nombres de equipos de la red privada, rutas locales y notas internas.
export const DOC_GROUPS = {"scenarys": "scenarys", "choisys": "choisys", "cubo": "El Cubo de Neo", "demo": "Demo remota"};

export const documents = [
  { group: "scenarys", slug: "lanzamiento", title: "Lanzamiento", description: "Qué hay en la web, cómo se publica y qué falta.", files: ["lanzamiento.pdf", "lanzamiento.html"] },
  { group: "scenarys", slug: "ecosistema", title: "Estado del ecosistema", description: "Cómo encajan scenarys, choisys, el Cubo de Neo y Daemon.", files: ["ecosistema.pdf", "ecosistema.html"] },
  { group: "scenarys", slug: "tablero", title: "Tablero general", description: "Qué está hecho, qué falta y quién lo lleva.", files: ["tablero.pdf", "tablero.html"] },
  { group: "scenarys", slug: "boceto-web", title: "Boceto de la web", description: "La web de scenarys sección a sección, en escritorio y móvil.", files: ["boceto-web.pdf", "boceto-web.html"] },
  { group: "choisys", slug: "choisys", title: "choisys: guía de la app", description: "Pantallas, reglas de diseño y próximas funciones.", files: ["choisys.pdf", "choisys.html"] },
  { group: "choisys", slug: "bocetos-choisys", title: "Bocetos de interfaz", description: "Cada pantalla de choisys, cómo funciona y cómo puede crecer.", files: ["bocetos-choisys.pdf", "bocetos-choisys.html"] },
  { group: "choisys", slug: "flujo-choisys", title: "Flujo actual", description: "El recorrido completo, de la bienvenida al cubo.", files: ["flujo-choisys.pdf", "flujo-choisys.html"] },
  { group: "choisys", slug: "futuro-choisys", title: "Futuras implementaciones", description: "Ideas de interfaz y su estado.", files: ["futuro-choisys.pdf", "futuro-choisys.html"] },
  { group: "choisys", slug: "landing-y2k", title: "Ejemplo visual Y2K 3D", description: "Exploración de estilo para una portada de choisys.", files: ["landing-y2k.html"] },
  { group: "choisys", slug: "fusiones-choisys", title: "Cambios importantes", description: "Los cambios del código que más han movido la app.", files: ["fusiones-choisys.pdf", "fusiones-choisys.html"] },
  { group: "cubo", slug: "cubo", title: "El Cubo de Neo", description: "El motor en C++: cómo encaja y qué datos expone.", files: ["cubo.pdf", "cubo.html"] },
  { group: "cubo", slug: "motor", title: "Cómo se conecta el motor", description: "De la app a la API y al servicio local del cubo.", files: ["motor.pdf", "motor.html"] },
  { group: "demo", slug: "demo-remota", title: "Demo remota", description: "Enseñar scenarys y choisys desde el móvil con una red privada.", files: ["demo-remota.pdf", "demo-remota.html"] },
  { group: "demo", slug: "demo-tailscale", title: "Guía técnica de la demo", description: "Montaje en el PC y comprobaciones.", files: ["demo-tailscale.pdf", "demo-tailscale.html"] },
  { group: "demo", slug: "presentacion-demo", title: "Presentación de la demo", description: "Diapositivas para enseñar el montaje.", files: ["presentacion-demo.pdf", "presentacion-demo.pptx"] },
  { group: "demo", slug: "estado-demo", title: "Estado de la demo", description: "Hoja con cada servicio y su estado.", files: ["estado-demo.pdf", "estado-demo.xlsx"] },
];

export const DOCS_BASE = '/docs/files/';

export function formatOf(file) {
  return file.slice(file.lastIndexOf('.') + 1).toUpperCase();
}
