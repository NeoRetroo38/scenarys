export const PUBLIC_ORIGIN = 'https://neowebdevsolutions.com';

export const publicPages = [
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
    path: '/el-chaman', title: 'El chamán', eyebrow: 'Escritos · Libro · Borrador',
    summary: 'Un thriller negro con fondo filosófico, escrito por Neo.', tone: 'dark',
    quote: '«Los sistemas están rotos, solo las mentes nos curarán.»',
    media: { type: 'image', src: '/media/el-chaman-portada.webp', alt: 'Portada de El chamán: cristal roto y el título en rojo' },
    paragraphs: [
      'Madrid, una ciudad lúgubre en la que ya nada funciona. Alguien está matando a artistas —un escritor de filosofía, un pintor— y convierte cada escena en una «ilustración» hecha con lo que queda de ellos, con cartas escondidas dentro de pájaros.',
      'Lucio, un analista al que la policía llama cuando un caso no tiene sentido, empieza a leer al asesino como se lee una obra: le pone nombre, Entrañable, y entra en su juego antes de que llegue el siguiente, quizá un músico.',
      'Es una novela negra con velocidad, pistas y una pregunta de fondo: quién marca los límites de la voluntad. Escrita en primera persona, con un prólogo que habla con quien lee y un final entre lo kantiano y lo nihilista.',
      'Antes se titulaba Los límites. Es un borrador: el texto puede cambiar antes de su versión definitiva.',
    ],
    next: 'neo. Sal del cubo.',
    actions: [{ href: '/docs/files/el-chaman-borrador.pdf', label: 'Leer el borrador (PDF)' }],
  },
  {
    path: '/fight-cube', title: 'Fight Cube', eyebrow: 'Cine · Corto · Próximamente',
    summary: 'El primer corto de Scenarys.', tone: 'dark',
    media: { type: 'video', src: '/media/fight-cube-trailer.mp4', poster: '/media/fight-cube-poster.jpg', loop: '/media/fight-cube-loop.mp4', alt: 'Tráiler de Fight Cube' },
    paragraphs: [
      'Un hombre a solas, de noche, en una habitación iluminada solo por la luz violeta de una pantalla. Piensa, duda y se levanta. El tráiler termina en una mirada.',
      'Fight Cube es el primer cortometraje de Scenarys y se estrenará dentro de poco. El tráiler también está en Instagram.',
    ],
    next: 'Corto: próximamente.',
    actions: [{ href: 'https://www.instagram.com/reel/DfBkg5PoASM/', label: 'Ver el tráiler' }],
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
