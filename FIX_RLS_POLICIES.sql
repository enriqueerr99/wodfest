-- Verificar y arreglar las políticas RLS para permitir inserciones públicas
-- WODFEST Salou 2026

-- Primero, ver qué políticas existen
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
WHERE tablename IN ('volunteers', 'registrations');

-- Si no funcionan las inserciones, ejecuta esto:

-- Desactivar RLS temporalmente para pruebas
-- ALTER TABLE volunteers DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE registrations DISABLE ROW LEVEL SECURITY;

-- O crear políticas más permisivas:

-- Eliminar políticas existentes
DROP POLICY IF EXISTS "Anon users can insert volunteers" ON volunteers;
DROP POLICY IF EXISTS "Anon users can insert registrations" ON registrations;

-- Crear nuevas políticas que permitan todo para anon (temporalmente)
CREATE POLICY "Anyone can insert volunteers" ON volunteers
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Anyone can insert registrations" ON registrations
  FOR INSERT 
  WITH CHECK (true);

-- Verificar que funcionan
SELECT * FROM volunteers ORDER BY created_at DESC LIMIT 5;
SELECT * FROM registrations ORDER BY created_at DESC LIMIT 5;