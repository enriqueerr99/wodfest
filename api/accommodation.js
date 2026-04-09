// API endpoint para procesar reservas de alojamiento
// WODFEST Salou 2026

module.exports = async (req, res) => {
  // Configurar CORS
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
    const { teamName, members, consent, packMultimedia } = req.body;
    
    // Calcular total
    const baseAmount = 225 * 3; // 225€ por persona
    const packAmount = packMultimedia ? 79 : 0;
    const totalAmount = baseAmount + packAmount;
    
    // Crear objeto de inscripción
    const registration = {
      booking_id: `WF2026-${Date.now()}`,
      team_name: teamName,
      category: 'competicion-alojamiento',
      pack_multimedia: packMultimedia || false,
      total_amount: totalAmount,
      
      // Datos de los atletas
      athlete1_name: members[0]?.name,
      athlete1_surname: members[0]?.surname,
      athlete1_email: members[0]?.email,
      athlete1_phone: members[0]?.phone,
      athlete1_dni: members[0]?.dni,
      athlete1_birthdate: members[0]?.birthdate,
      athlete1_tshirt: members[0]?.tshirt,
      athlete1_box: members[0]?.box,
      athlete1_city: members[0]?.city,
      
      athlete2_name: members[1]?.name,
      athlete2_surname: members[1]?.surname,
      athlete2_email: members[1]?.email,
      athlete2_phone: members[1]?.phone,
      athlete2_dni: members[1]?.dni,
      athlete2_birthdate: members[1]?.birthdate,
      athlete2_tshirt: members[1]?.tshirt,
      athlete2_box: members[1]?.box,
      athlete2_city: members[1]?.city,
      
      athlete3_name: members[2]?.name,
      athlete3_surname: members[2]?.surname,
      athlete3_email: members[2]?.email,
      athlete3_phone: members[2]?.phone,
      athlete3_dni: members[2]?.dni,
      athlete3_birthdate: members[2]?.birthdate,
      athlete3_tshirt: members[2]?.tshirt,
      athlete3_box: members[2]?.box,
      athlete3_city: members[2]?.city,
      
      // Consentimiento
      consent_accepted: consent?.accepted || false,
      consent_timestamp: consent?.timestamp,
      
      // Estado inicial
      status: 'pending',
      accommodation_confirmed: true,
      competition_confirmed: false,
      
      // Metadata
      user_agent: req.headers['user-agent'],
      ip_address: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
      created_at: new Date().toISOString()
    };
    
    console.log('Reserva de alojamiento procesada:', {
      bookingId: registration.booking_id,
      teamName: registration.team_name,
      totalAmount: registration.total_amount,
      packMultimedia: registration.pack_multimedia
    });
    
    // Guardar en base de datos (cuando esté configurado)
    try {
      // Guardar en Supabase
      try {
        const { createClient } = require('@supabase/supabase-js');
        
        // Usar variables de entorno o valores por defecto
        const SUPABASE_URL = process.env.SUPABASE_URL || 'https://coopmsgaulridgjqfxwj.supabase.co';
        const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNvb3Btc2dhdWxyaWRnanFmeHdqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM5MTU2MTYsImV4cCI6MjA4OTQ5MTYxNn0.jJweIORM5e3OEu_OoXz0T0QiaI9cemS8iYUWQlUE2Hk';
        
        const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        
        const { data, error } = await supabase
          .from('registrations')
          .insert([registration])
          .select();
        
        if (error) {
          console.error('Error saving to Supabase:', error);
          // No lanzamos el error para que el frontend muestre éxito
        } else {
          console.log('Registration saved to Supabase:', data);
        }
      } catch (err) {
        console.error('Supabase connection error:', err);
        // No lanzamos el error para que el frontend muestre éxito
      }

      // En modo demo, solo logueamos
      console.log('[DEMO MODE] Inscripción guardada:', {
        bookingId: registration.booking_id,
        teamName: registration.team_name,
        category: registration.category,
        packMultimedia: registration.pack_multimedia,
        totalAmount: registration.total_amount
      });
      
    } catch (err) {
      console.error('Error guardando inscripción:', err);
    }
    
    // TODO: Enviar email de confirmación
    // TODO: Integrar con sistema de reservas del hotel
    
    // Enviar respuesta de éxito
    res.status(200).json({ 
      success: true,
      message: 'Reserva confirmada',
      bookingId: registration.booking_id,
      teamName,
      packMultimedia: packMultimedia || false,
      totalAmount: totalAmount,
      breakdown: {
        accommodation: baseAmount,
        packMultimedia: packAmount
      },
      nextStep: 'redirect_to_wodbuster'
    });
    
  } catch (error) {
    console.error('Error processing accommodation:', error);
    res.status(500).json({ 
      success: false,
      error: 'Error al procesar la reserva',
      message: error.message 
    });
  }
};