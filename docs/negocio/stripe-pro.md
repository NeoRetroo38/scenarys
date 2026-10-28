# Cobrar choisys Pro con Stripe (tarjeta, Apple Pay, Google Pay)

Sin código de pagos: Stripe aloja la página de pago y la web solo enlaza a ella.

## Crear la cuenta (una vez, desde el móvil o el Mac)

1. stripe.com → crear cuenta como **autónomo (persona física)** con tu NIF, IBAN y la actividad del 036.
2. *Configuración → Métodos de pago*: tarjeta, **Apple Pay** y **Google Pay** activados (vienen por defecto).
3. *Catálogo de productos → Añadir producto* «choisys Pro» con dos precios: **5,99 € mensual** (recurrente)
   y **23,99 € pago único**. Precio con IVA incluido.
4. *Enlaces de pago*: crea uno por cada precio. Activa «Recoger email» y, en la confirmación, el mensaje
   «Activaremos Pro en la cuenta de choisys con este email».
5. *Configuración → Portal de clientes*: actívalo para que puedan cancelar la suscripción solos.
6. Pásale a Claude los **dos enlaces** (son públicos, no son secretos) y los pone en
   `src/config.ts` → `STRIPE_PRO_LINKS` en una PR.

## Después de cada venta

- Activar Pro a mano en la cuenta con ese email (hasta que haya automatización).
- Facturas: pregunta a la gestoría cómo quiere las ventas de Stripe (p. ej. informe mensual de pagos).
