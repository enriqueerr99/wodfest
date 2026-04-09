import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Mapeo de price IDs
const STRIPE_PRICE_IDS = {
  // Solo competición
  'solo': 'price_1TH8HvRkTn2XXc1J44ddu6o6',
  'solo-pack': 'price_1TH8J3RkTn2XXc1JloaAqrf7',
  
  // Competición + Alojamiento (3-6 personas)
  'alojamiento-3': 'price_1TH8JtRkTn2XXc1J9kgW1n93',
  'alojamiento-3-pack': 'price_1TH8KeRkTn2XXc1JNyxG51we',
  'alojamiento-4': 'price_1TH8MSRkTn2XXc1J301YJhhG',
  'alojamiento-4-pack': 'price_1TH8ONRkTn2XXc1JLAXdnIyr',
  'alojamiento-5': 'price_1TH8OtRkTn2XXc1JSMxJJnPP',
  'alojamiento-5-pack': 'price_1TH8PGRkTn2XXc1JNJSu0bZY',
  'alojamiento-6': 'price_1TH8PfRkTn2XXc1JuKALGnrL',
  'alojamiento-6-pack': 'price_1TH8Q4RkTn2XXc1JCqZVuQaC'
};

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { 
      teamName, 
      category, 
      packMultimedia, 
      numCompanions,
      athleteEmail,
      athleteName
    } = req.body;

    console.log('📥 Checkout request:', { teamName, category, packMultimedia, numCompanions });

    // Determinar el price ID correcto
    let priceKey = '';
    
    if (category === 'solo-competicion') {
      priceKey = packMultimedia ? 'solo-pack' : 'solo';
    } else if (category === 'competicion-alojamiento') {
      // 3 atletas + acompañantes
      const totalPeople = 3 + (numCompanions || 0);
      priceKey = `alojamiento-${totalPeople}`;
      
      if (packMultimedia) {
        priceKey += '-pack';
      }
    }

    const priceId = STRIPE_PRICE_IDS[priceKey];
    
    if (!priceId) {
      console.error('Price key not found:', priceKey);
      return res.status(400).json({ 
        error: 'Configuración de precio no válida',
        details: `No se encontró precio para: ${priceKey}`
      });
    }

    console.log('💰 Price ID:', priceId);

    // Crear sesión de Stripe Checkout
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price: priceId,
        quantity: 1
      }],
      mode: 'payment',
      success_url: `${process.env.VERCEL_URL ? 'https://' + process.env.VERCEL_URL : 'https://wodfest-salou.vercel.app'}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.VERCEL_URL ? 'https://' + process.env.VERCEL_URL : 'https://wodfest-salou.vercel.app'}/cancel`,
      customer_email: athleteEmail,
      metadata: {
        teamName: teamName,
        category: category,
        packMultimedia: packMultimedia ? 'true' : 'false',
        numCompanions: numCompanions || '0'
      },
      locale: 'es'
    });

    console.log('✅ Session created:', session.id);

    res.status(200).json({
      success: true,
      sessionId: session.id,
      url: session.url
    });

  } catch (error) {
    console.error('❌ Error creating checkout session:', error);
    res.status(500).json({
      success: false,
      error: 'Error al crear la sesión de pago',
      details: error.message
    });
  }
}
