// API endpoint para gestionar voluntarios - VERSION SIMPLIFICADA
// WODFEST Salou 2026

const { createClient } = require('@supabase/supabase-js');

// Credenciales hardcodeadas (temporalmente)
const SUPABASE_URL = 'https://coopmsgaulridgjqfxwj.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNvb3Btc2dhdWxyaWRnanFmeHdqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM5MTU2MTYsImV4cCI6MjA4OTQ5MTYxNn0.jJweIORM5e3OEu_OoXz0T0QiaI9cemS8iYUWQlUE2Hk';

module.exports = async (req, res) => {
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
    console.log('Received volunteer data:', req.body);
    
    const { 
      name, 
      email, 
      phone, 
      tshirt_size, 
      availability, 
      experience, 
      comments,
      age,
      city
    } = req.body;

    // Validación mínima
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        error: 'Nombre y email son obligatorios'
      });
    }

    // Conectar con Supabase
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    
    // Datos para insertar
    const volunteerData = {
      name: name || 'Sin nombre',
      email: email,
      phone: phone || null,
      tshirt_size: tshirt_size || null,
      availability: availability || null,
      experience: experience || null,
      comments: comments || null,
      age: age ? parseInt(age) : null,
      city: city || null,
      status: 'pending'
    };
    
    console.log('Attempting to insert:', volunteerData);

    // Insertar en Supabase
    const { data, error } = await supabase
      .from('volunteers')
      .insert([volunteerData])
      .select();
    
    if (error) {
      console.error('Supabase error:', error);
      return res.status(400).json({
        success: false,
        error: 'Error al guardar en base de datos',
        details: error.message
      });
    }

    console.log('Successfully inserted:', data);

    // Respuesta exitosa
    return res.status(200).json({
      success: true,
      message: 'Voluntario registrado exitosamente',
      data: data ? data[0] : volunteerData
    });

  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({
      success: false,
      error: 'Error interno del servidor',
      details: error.message
    });
  }
};