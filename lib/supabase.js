// Supabase Client Configuration
// WODFEST Salou 2026

import { createClient } from '@supabase/supabase-js'

// Estas variables se configurarán con tus credenciales de Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'YOUR_SUPABASE_URL'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY'

// Cliente público (para el navegador)
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Funciones de utilidad
export const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  return { data, error }
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  return { error }
}

export const getSession = async () => {
  const { data: { session } } = await supabase.auth.getSession()
  return session
}

// Funciones para voluntarios
export const saveVolunteer = async (volunteerData) => {
  const { data, error } = await supabase
    .from('volunteers')
    .insert([{
      ...volunteerData,
      created_at: new Date().toISOString()
    }])
  
  return { data, error }
}

export const getVolunteers = async () => {
  const { data, error } = await supabase
    .from('volunteers')
    .select('*')
    .order('created_at', { ascending: false })
  
  return { data, error }
}

// Funciones para inscripciones
export const saveRegistration = async (registrationData) => {
  const { data, error } = await supabase
    .from('registrations')
    .insert([{
      ...registrationData,
      created_at: new Date().toISOString()
    }])
  
  return { data, error }
}

export const getRegistrations = async () => {
  const { data, error } = await supabase
    .from('registrations')
    .select('*')
    .order('created_at', { ascending: false })
  
  return { data, error }
}

// Función para obtener estadísticas
export const getStats = async () => {
  const [volunteers, registrations] = await Promise.all([
    supabase.from('volunteers').select('id', { count: 'exact' }),
    supabase.from('registrations').select('id, category, accommodation, pack_multimedia', { count: 'exact' })
  ])
  
  return {
    totalVolunteers: volunteers.count || 0,
    totalRegistrations: registrations.count || 0,
    registrations: registrations.data || []
  }
}