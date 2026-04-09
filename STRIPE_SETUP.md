# Configuración de Stripe para WODFEST Salou 2026

## 1. Configuración en Vercel

Necesitas añadir las siguientes variables de entorno en tu proyecto de Vercel:

### Variables requeridas:

1. **`STRIPE_SECRET_KEY`**
   - Tu clave secreta de Stripe (empieza con `sk_`)
   - Encuentra la clave en: https://dashboard.stripe.com/apikeys

2. **`DOMAIN_URL`** (opcional)
   - URL de tu dominio: `https://wodfest-salou.vercel.app`
   - Si no se configura, usa el dominio por defecto

### Cómo añadir las variables:

1. Ve a tu proyecto en Vercel: https://vercel.com/dashboard
2. Selecciona el proyecto `wodfest-salou`
3. Ve a Settings → Environment Variables
4. Añade las variables con sus valores
5. Guarda los cambios

## 2. Flujo de pago actual

El sistema detecta automáticamente qué producto de Stripe usar basándose en:

- **Modalidad**: Solo Competición o Competición + Camping
- **Acompañantes**: 0-3 personas adicionales (total 3-6 personas)
- **Pack Multimedia**: Sí o No

### Mapeo de productos:

```javascript
Solo Competición → price_1TH8HvRkTn2XXc1J44ddu6o6
Solo Competición + Pack → price_1TH8J3RkTn2XXc1JloaAqrf7

Competición + Camping (3 personas) → price_1TH8JtRkTn2XXc1J9kgW1n93
Competición + Camping (3 personas) + Pack → price_1TH8KeRkTn2XXc1JNyxG51we
Competición + Camping (4 personas) → price_1TH8MSRkTn2XXc1J301YJhhG
Competición + Camping (4 personas) + Pack → price_1TH8ONRkTn2XXc1JLAXdnIyr
Competición + Camping (5 personas) → price_1TH8OtRkTn2XXc1JSMxJJnPP
Competición + Camping (5 personas) + Pack → price_1TH8PGRkTn2XXc1JNJSu0bZY
Competición + Camping (6 personas) → price_1TH8PfRkTn2XXc1JuKALGnrL
Competición + Camping (6 personas) + Pack → price_1TH8Q4RkTn2XXc1JCqZVuQaC
```

## 3. Testing

Para probar sin realizar pagos reales:

1. Usa la clave de test de Stripe (empieza con `sk_test_`)
2. Tarjetas de prueba:
   - **Éxito**: 4242 4242 4242 4242
   - **Fallo**: 4000 0000 0000 0002
   - Cualquier fecha futura y CVC de 3 dígitos

## 4. Páginas del flujo

- **`/inscripcion`**: Formulario de inscripción
- **`/success`**: Página de confirmación (después del pago exitoso)
- **`/cancel`**: Página de cancelación (si el usuario cancela)

## 5. Datos guardados

Los datos del formulario se guardan en `localStorage` antes de ir a Stripe:
- Se recuperan en la página de éxito
- Se muestran los detalles de la inscripción
- Puedes procesarlos posteriormente según necesites

## 6. Webhooks (recomendado para producción)

Ya tienes un webhook handler creado en `/api/stripe-webhook`. Para activarlo:

1. En Stripe Dashboard → Developers → Webhooks
2. Click "Add endpoint"
3. **Endpoint URL**: `https://wodfest-salou.vercel.app/api/stripe-webhook`
4. **Events to send**: Selecciona al menos:
   - `checkout.session.completed`
   - `payment_intent.payment_failed`
5. Copia el "Signing secret" (empieza con `whsec_`)
6. Añade en Vercel la variable:
   - **Key**: `STRIPE_WEBHOOK_SECRET`
   - **Value**: El signing secret que copiaste

### Qué hace el webhook:
- Verifica que el pago se completó realmente
- Guarda la inscripción en base de datos (si tienes Supabase configurado)
- Registra metadata del pago para auditoría
- Maneja pagos fallidos

## 7. Testing antes de producción

1. **Con tarjeta de prueba**:
   - Cambia temporalmente a tu clave de test (`sk_test_...`)
   - Usa tarjeta: `4242 4242 4242 4242`
   - Cualquier fecha futura y CVC

2. **Verificar el flujo completo**:
   - Formulario → Stripe → Success page
   - Los datos se guardan en localStorage
   - El webhook procesa el evento (check logs en Vercel)

## 8. Checklist final

- [ ] `STRIPE_SECRET_KEY` configurada en Vercel
- [ ] `STRIPE_WEBHOOK_SECRET` configurada (opcional pero recomendado)
- [ ] Probar un pago de test
- [ ] Verificar página de éxito muestra los datos
- [ ] Verificar página de cancelación funciona
- [ ] Sincronizar precios entre web y Stripe

---

**Nota importante**: Los precios actuales en Stripe no coinciden con los mostrados en la web. El sistema funcionará, pero debes actualizar los precios para evitar confusiones.