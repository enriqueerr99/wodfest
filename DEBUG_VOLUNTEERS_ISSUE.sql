-- DEBUG: Por qué no se guardan los voluntarios
-- WODFEST Salou 2026

-- 1. Verificar si RLS está activo
SELECT 
  tablename, 
  rowsecurity as "RLS Activo"
FROM pg_tables 
WHERE tablename = 'volunteers';

-- 2. Ver las políticas actuales
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies 
WHERE tablename = 'volunteers';

-- 3. Desactivar RLS completamente (temporal)
ALTER TABLE volunteers DISABLE ROW LEVEL SECURITY;

-- 4. Intentar insertar un voluntario de prueba
INSERT INTO volunteers (
  name, 
  email, 
  phone, 
  tshirt_size, 
  availability, 
  experience, 
  comments, 
  status,
  age,
  city
) VALUES (
  'Test Debug SQL',
  'debug-sql-' || floor(random() * 10000) || '@test.com',
  '666777888',
  'L',
  'Todos los días',
  'Prueba SQL',
  'Insertado directamente desde SQL Editor',
  'pending',
  25,
  'SQL City'
);

-- 5. Ver los últimos voluntarios
SELECT 
  id,
  created_at,
  name,
  email,
  status
FROM volunteers 
ORDER BY created_at DESC 
LIMIT 5;

-- 6. Ver estructura completa de la tabla
SELECT 
  column_name, 
  data_type, 
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_name = 'volunteers'
ORDER BY ordinal_position;