-- Crear usuarios de autenticación para el panel admin
-- WODFEST Salou 2026

-- OPCIÓN 1: Crear usuarios con contraseña temporal
-- Ejecuta estos comandos uno por uno en el SQL Editor de Supabase

-- Usuario 1: info@wodfestevent.com
-- Password temporal: wodfest2026
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'info@wodfestevent.com',
  crypt('wodfest2026', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{"name":"Admin WODFEST"}'
);

-- Usuario 2: enrique.rodriguezdrop@gmail.com  
-- Password temporal: wodfest2026
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'enrique.rodriguezdrop@gmail.com',
  crypt('wodfest2026', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{"name":"Enrique Rodríguez"}'
);

-- IMPORTANTE: Después de ejecutar estos comandos:
-- 1. Podrás entrar con cualquiera de estos emails
-- 2. Password temporal: wodfest2026
-- 3. Se recomienda cambiar la contraseña después del primer login