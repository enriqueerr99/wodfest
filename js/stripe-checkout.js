// Sistema de Stripe Checkout - WODFEST Salou
// Solución simplificada: carga Stripe.js directamente

const STRIPE_PUBLIC_KEY = 'pk_live_51TBtDQRkTn2XXc1J2IPzuukxdUuooSNQ6DEP3l5undOEEWX2AdsN0XGTjAKWHbEqw0VYNMoENqmF71SwSntfOTf600NpSOkG03';

const STRIPE_PRICE_IDS = {
  'solo': 'price_1TH8HvRkTn2XXc1J44ddu6o6',
  'solo-pack': 'price_1TH8J3RkTn2XXc1JloaAqrf7',
  'alojamiento-3': 'price_1TH8JtRkTn2XXc1J9kgW1n93',
  'alojamiento-3-pack': 'price_1TH8KeRkTn2XXc1JNyxG51we',
  'alojamiento-4': 'price_1TH8MSRkTn2XXc1J301YJhhG',
  'alojamiento-4-pack': 'price_1TH8ONRkTn2XXc1JLAXdnIyr',
  'alojamiento-5': 'price_1TH8OtRkTn2XXc1JSMxJJnPP',
  'alojamiento-5-pack': 'price_1TH8PGRkTn2XXc1JNJSu0bZY',
  'alojamiento-6': 'price_1TH8PfRkTn2XXc1JuKALGnrL',
  'alojamiento-6-pack': 'price_1TH8Q4RkTn2XXc1JCqZVuQaC'
};

let stripe = null;

// Cargar Stripe.js cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', async () => {
  console.log('🔵 Cargando Stripe.js...');
  
  // Crear script de Stripe
  const script = document.createElement('script');
  script.src = 'https://js.stripe.com/v3/';
  script.onload = () => {
    stripe = Stripe(STRIPE_PUBLIC_KEY);
    console.log('✅ Stripe.js cargado correctamente');
  };
  document.head.appendChild(script);
});

// Función para procesar el checkout
async function goToStripeCheckout(priceId, teamName, athleteEmail) {
  if (!stripe) {
    alert('Stripe no está cargado. Por favor, espera un momento e intenta de nuevo.');
    return;
  }

  console.log('🛒 Iniciando checkout:', { priceId, teamName, athleteEmail });

  try {
    // Redirigir directamente a Stripe Checkout
    const { error } = await stripe.redirectToCheckout({
      lineItems: [{ price: priceId, quantity: 1 }],
      mode: 'payment',
      successUrl: 'https://wodfest-salou.vercel.app/success',
      cancelUrl: 'https://wodfest-salou.vercel.app/cancel',
      customerEmail: athleteEmail,
      locale: 'es'
    });

    if (error) {
      console.error('❌ Error Stripe:', error);
      alert('Error al procesare el pago: ' + error.message);
    }
  } catch (err) {
    console.error('❌ Error:', err);
    alert('Error al iniciar el checkout');
  }
}
