// Webhook para procesar eventos de Stripe
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Importar Supabase si está disponible
let supabase = null;
try {
  const { createClient } = require('@supabase/supabase-js');
  if (process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY) {
    supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
  }
} catch (error) {
  console.log('Supabase not configured, using demo mode');
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.log('Webhook secret not configured, skipping signature verification');
    // En producción, siempre verifica la firma
  }

  let event;

  try {
    if (webhookSecret && sig) {
      // Verificar la firma si tenemos el secret
      event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    } else {
      // Sin verificación (solo para desarrollo)
      event = req.body;
    }
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Manejar el evento
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      
      console.log('Payment successful for session:', session.id);
      console.log('Metadata:', session.metadata);
      
      // Aquí puedes:
      // 1. Guardar la inscripción en base de datos
      // 2. Enviar email de confirmación
      // 3. Actualizar el estado del equipo
      
      if (supabase && session.metadata) {
        try {
          // Guardar registro en Supabase
          const registrationData = {
            session_id: session.id,
            payment_intent: session.payment_intent,
            team_name: session.metadata.teamName,
            category: session.metadata.category,
            pack_multimedia: session.metadata.packMultimedia === 'true',
            num_companions: parseInt(session.metadata.numCompanions || '0'),
            customer_email: session.customer_email,
            amount_total: session.amount_total,
            currency: session.currency,
            payment_status: session.payment_status,
            created_at: new Date().toISOString()
          };
          
          const { data, error } = await supabase
            .from('registrations')
            .insert([registrationData]);
            
          if (error) {
            console.error('Error saving to Supabase:', error);
          } else {
            console.log('Registration saved to database');
          }
        } catch (error) {
          console.error('Error processing registration:', error);
        }
      }
      
      break;
      
    case 'payment_intent.payment_failed':
      const paymentIntent = event.data.object;
      console.log('Payment failed for:', paymentIntent.id);
      // Manejar pago fallido
      break;
      
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  // Responder a Stripe que recibimos el evento
  res.status(200).json({ received: true });
};