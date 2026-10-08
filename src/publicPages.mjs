export const PUBLIC_ORIGIN = 'https://neowebdevsolutions.com';

export const publicPages = [
  {
    path: '/choisys', title: 'choisys', eyebrow: 'Producto · desarrollo privado',
    summary: 'Tres fases. Tres elecciones. Un recorrido que puedes observar.',
    paragraphs: [
      'choisys es el primer producto de Scenarys. La interfaz recoge elecciones y representa los datos públicos del Cubo de Neo.',
      'La aplicación sigue en un entorno privado para dispositivos autorizados. Esta landing no permite registrar cuentas ni da acceso a ese entorno.',
      'La matriz de la portada es una demostración visual local: no se conecta al motor ni guarda un Run.',
    ],
    next: 'El acceso público se anunciará aquí cuando exista una versión preparada para ello.',
  },
  {
    path: '/daemon', title: 'Daemon', eyebrow: 'Herramienta nativa · en preparación',
    summary: 'Una ventana al estado del ecosistema. Un núcleo compartido.',
    paragraphs: [
      'Daemon está diseñado con un núcleo C++ y superficies nativas para Mac y iPhone. Su función es observar repositorios, servicios y acciones autorizadas.',
      'No es el motor del Cubo de Neo. La coordinación operativa y el cálculo del producto mantienen fuentes de verdad separadas.',
      'La distribución pública aún no está disponible. Una build local no equivale a una aplicación firmada ni a un lanzamiento.',
    ],
    next: 'Mac: distribución pendiente. iPhone: disponible próximamente mediante un canal permitido por Apple.',
  },
  {
    path: '/downloads', title: 'Descargas', eyebrow: 'Al alcance de todos',
    summary: 'Todo lo que se puede descargar de scenarys, con tamaño y huella SHA-256.',
    paragraphs: [
      'choisys se usa en el navegador, sin instalar nada. La app de Android será la primera descarga instalable.',
      'La documentación está en PDF, que se abre en cualquier móvil u ordenador, y en su formato original.',
      'Cada archivo indica su tamaño y su SHA-256 para comprobar que es el que publicamos.',
    ],
    next: 'No ofrecemos archivos para instalar a mano en iPhone: su distribución necesita un canal compatible con iOS.',
    manifest: true, catalog: 'downloads',
  },
  {
    path: '/releases', title: 'Versiones', eyebrow: 'Historial público',
    summary: 'Sin versiones ficticias. Sin hashes escritos a mano.',
    paragraphs: [
      'No se ha anunciado una release pública de Daemon desde este sitio.',
      'El manifiesto se genera durante el build. Un catálogo vacío significa que aún no se distribuyen artefactos: no que hayan sido comprobados o publicados.',
    ],
    next: 'Consulta el manifiesto para ver el catálogo disponible.',
    manifest: true,
  },
  {
    path: '/docs', title: 'Documentación', eyebrow: 'Arquitectura y proyecto',
    summary: 'Cómo está hecho scenarys, en documentos que puedes leer y descargar.',
    paragraphs: [
      'choisys: producto, cuentas, sesiones y contratos. Su API es la autoridad de acceso.',
      'neos-cube: motor C++ independiente. neo-cube-web: representación geométrica pública. Los contratos compartidos conectan la interfaz con la API.',
      'Daemon: coordinación y observación operativa. Los estados internos, credenciales, logs y datos de usuarios no forman parte de esta web.',
    ],
    next: 'Una visualización no convierte una duración ni una posición en una inferencia.',
    catalog: 'docs',
    diagram: true,
  },
  {
    path: '/status', title: 'Estado público', eyebrow: 'Alcance de esta página',
    summary: 'La web pública y el entorno privado son cosas distintas.',
    paragraphs: [
      'Esta página es información estática. No consulta la base de datos ni monitoriza tus dispositivos.',
      'Que puedas abrir la landing demuestra únicamente que la web responde desde tu conexión. No certifica el estado de choisys, Neon o Daemon.',
      'Las incidencias públicas se añadirán aquí cuando exista un canal de estado preparado para publicarlas.',
    ],
    next: 'No se publica telemetría privada ni direcciones de la red interna.',
  },
  {
    path: '/legal', title: 'Información del sitio', eyebrow: 'Transparencia técnica',
    summary: 'Una landing informativa, sin registro de usuarios.',
    paragraphs: [
      'Esta versión no incorpora formularios de registro, pagos ni analítica añadida por Scenarys. La demostración de la portada mantiene su estado solo en memoria.',
      'Las fuentes se sirven con el sitio o mediante las tipografías del sistema. No se solicitan fuentes a Google.',
      'El proveedor de alojamiento puede procesar datos técnicos de las solicitudes. Esta nota no sustituye un aviso legal o una política de privacidad revisados.',
      'El único canal de contacto por ahora es el teléfono de empresa: +34 633 693 369. La información jurídica de la entidad está pendiente de confirmación. No se inventan identificadores, domicilios ni condiciones contractuales.',
    ],
    next: 'La documentación jurídica completa debe revisarse antes de incorporar cuentas, formularios, pagos o analítica.',
  },
];

export function findPublicPage(pathname) {
  const normalized = pathname.replace(/\/+$/, '') || '/';
  return publicPages.find(page => page.path === normalized);
}
