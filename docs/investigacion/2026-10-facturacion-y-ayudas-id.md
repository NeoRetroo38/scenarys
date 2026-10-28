# Facturación automática con pasarela de pago y ayudas de I+D

Investigación del 28 oct 2026. Fechas y cuantías cambian: comprobar en BOE/CDTI antes de actuar.
No es asesoría legal ni fiscal; para la solicitud de ayudas conviene un asesor.

## 1. Qué obliga a Scenarys S.L. (y cuándo)

| Norma | Qué exige | Fecha para Scenarys |
|---|---|---|
| **Verifactu** (RD 1007/2023, Ley Antifraude) | Programa de facturación con registros encadenados (huella), QR y, en modalidad Veri*Factu, envío a la AEAT | **BOE vigente: 1 ene 2027** (sociedades). Hacienda anunció el 5 oct 2026 llevarlo a **oct 2028**, pero aún no está en el BOE |
| **Factura electrónica B2B** (Ley Crea y Crece, RD 238/2026, Orden HAC/1028/2026) | Facturas estructuradas entre empresas y reporte de estados/pago | **6 oct 2028** (menos de 8 M€). Los de más de 8 M€: 6 oct 2027 |

Conclusión: planificar para **1 ene 2027** y celebrar si el BOE confirma 2028. Mientras tanto, usar un
programa ya adaptado es el periodo de pruebas voluntario.

## 2. Cómo automatizarlo (amigable y legal)

- **Stripe cobra, pero no es facturación española**: no encadena registros, no pone el QR ni envía a la AEAT.
  La propia Stripe remite a apps de su marketplace.
- Patrón recomendado: **Stripe (cobro) → conector Verifactu (factura) → AEAT**, sin código fiscal propio.
  Opciones vistas: Quaderno (crea factura y abono automáticos por cada pago/reembolso de Stripe),
  Holded, Billin, fiskaly o el conector de itcons.
- **No construir nuestro propio sistema de facturación**: nos convertiría en *productor de SIF* con sus
  obligaciones (declaración responsable, requisitos técnicos). No aporta nada al producto.
- "Sutil" = **sin fricción, no oculto**: factura simplificada para particulares (sin pedir DNI), factura
  completa solo si el cliente aporta NIF, envío automático por email y descarga en la cuenta. Nada de
  cargos o conceptos poco claros: eso sí sería ilegal y destruye confianza.

Para choisys (cuando cobre): Stripe Checkout con campo opcional de NIF → webhook a la app de facturación →
la app guarda la factura y el PDF/QR; choisys solo enlaza la factura.

## 3. Ayudas de I+D: qué encaja de verdad

**Aviso clave:** automatizar facturas con herramientas existentes **no es I+D** y no puntúa en CDTI. La
historia de I+D de Scenarys es el **Cubo de Neo** (motor C++ propio). La facturación entra, como mucho,
en ayudas de digitalización/innovación.

| Ayuda | Para qué | Encaje | Próximo paso |
|---|---|---|---|
| **NEOTEC (CDTI)** | Subvención a startups de base tecnológica | Alto si se presenta el Cubo de Neo. Requisitos: >6 meses y <3 años de antigüedad, pequeña empresa innovadora, capital social mínimo 20.000 € | La de 2026 cerró (14 abr–14 may). Preparar memoria para **abril 2027** |
| **ENISA Jóvenes Emprendedores** | Préstamo participativo 25–75 k€, sin avales | Alto: fundador <40 años, empresa <24 meses; socios aportan ≥50 % | Convocatoria abierta todo el año |
| **Innova-Adelante (Castilla-La Mancha)** | Subvención 30–50 % a innovación/digitalización | Medio: aquí sí cabe la automatización de cobros/facturas | La de 2026 cerró (15 jul–30 sep). Siguiente previsiblemente verano 2027 |
| **Deducción I+D+i (art. 35 LIS)** + **monetización (art. 39.2)** | Deducción en Sociedades; si no hay beneficios, cobro en efectivo con quita del 20 % | Alto a medio plazo: exige Informe Motivado Vinculante y mantener empleo | Llevar registro de horas y gastos del Cubo desde ya |
| **Bonificación 40 % Seguridad Social** | Personal investigador en exclusiva | Cuando haya empleados en I+D | — |

## 4. Plan propuesto (pasos pequeños)

1. **Decidir app de facturación Verifactu** conectada a Stripe (antes de cobrar el primer euro).
2. **Registro de I+D**: hoja de horas y gastos del Cubo de Neo (base para NEOTEC, deducción e IMV).
3. **Memoria técnica del Cubo** (sin revelar el modelo): problema, novedad, riesgos técnicos, plan.
4. **ENISA Jóvenes Emprendedores**: revisar fondos propios y fecha de constitución.
5. Calendario: Innova-Adelante (verano 2027), NEOTEC (abril 2027).

Pendiente de Neo: fecha de constitución de Scenarys S.L. y capital social (determinan NEOTEC y ENISA).

## Fuentes

- Verifactu 2027 (RDL 15/2025): https://www.infoautonomos.com/blog/verifactu-cuando-es-obligatorio-a-quien-afecta/
- Aplazamiento anunciado a oct 2028 y Orden HAC/1028/2026: https://zululabs.es/blog/verifactu-2028-factura-electronica-b2b · https://www.gesisa.net/blog/guia-completa-factura-electronica-obligatoria/
- Orden HAC/1028/2026 (BOE): https://www.boe.es/diario_boe/txt.php?id=BOE-A-2026-20587
- Stripe y Verifactu: https://meetergo.com/es/blog/stripe · https://stripe.com/es-us/resources/more/what-is-verifactu-spain
- Quaderno + Stripe: https://quaderno.io/es/integraciones/stripe/
- NEOTEC 2026: https://www.ciencia.gob.es/gl/Noticias/2026/abril/MICIU-lanza-convocatoria-NEOTEC-2026.html · https://www.cdti.es/ayudas/ayudas-neotec-2026
- ENISA: https://www.grantbite.com/es/blog/financiacion-para-startups-en-espana-subvenciones-prestamos-e-incentivos-fiscales
- Innova-Adelante 2026: https://tecnociminnova.com/es/buscador-ayudas/castilla-la-mancha/caslam-programadeapoyoalainnovacioninnovaadelanteencast
- Deducción y monetización I+D+i: https://emprendedores.es/ayudas/deducciones-por-idi-como-cerrar-2026-sin-dejar-dinero-sobre-la-mesa/
