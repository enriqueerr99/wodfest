-- Reactivar RLS con políticas correctas
-- WODFEST Salou 2026

-- 1. Primero añadir las columnas nuevas (si no existen)
ALTER TABLE volunteers 
ADD COLUMN IF NOT EXISTS age INTEGER,
ADD COLUMN IF NOT EXISTS city VARCHAR(255);

-- 2. Reactivar RLS
ALTER TABLE volunteers ENABLE ROW LEVEL SECURITY;
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

-- 3. Eliminar todas las políticas existentes
DROP POLICY IF EXISTS "Anon users can insert volunteers" ON volunteers;
DROP POLICY IF EXISTS "Anyone can insert volunteers" ON volunteers;
DROP POLICY IF EXISTS "Authenticated users can view volunteers" ON volunteers;
DROP POLICY IF EXISTS "Authenticated users can update volunteers" ON volunteers;
DROP POLICY IF EXISTS "Allow public inserts" ON volunteers;
DROP POLICY IF EXISTS "Allow authenticated to view" ON volunteers;
DROP POLICY IF EXISTS "Public can insert" ON volunteers;
DROP POLICY IF EXISTS "Enable insert for all" ON volunteers;

-- 4. Crear nuevas políticas simples y funcionales

-- Política para permitir inserciones públicas (formularios)
CREATE POLICY "Public can insert volunteers" 
ON volunteers 
FOR INSERT 
TO public 
WITH CHECK (true);

-- Política para que usuarios autenticados puedan ver todo
CREATE POLICY "Authenticated can select volunteers" 
ON volunteers 
FOR SELECT 
TO authenticated 
USING (true);

-- Política para que usuarios autenticados puedan actualizar
CREATE POLICY "Authenticated can update volunteers" 
ON volunteers 
FOR UPDATE 
TO authenticated 
USING (true);

-- Hacer lo mismo para registrations
DROP POLICY IF EXISTS "Anon users can insert registrations" ON registrations;
DROP POLICY IF EXISTS "Anyone can insert registrations" ON registrations;
DROP POLICY IF EXISTS "Authenticated users can view registrations" ON registrations;
DROP POLICY IF EXISTS "Authenticated users can update registrations" ON registrations;

-- Políticas para registrations
CREATE POLICY "Public can insert registrations" 
ON registrations 
FOR INSERT 
TO public 
WITH CHECK (true);

CREATE POLICY "Authenticated can select registrations" 
ON registrations 
FOR SELECT 
TO authenticated 
USING (true);

CREATE POLICY "Authenticated can update registrations" 
ON registrations 
FOR UPDATE 
TO authenticated 
USING (true);

-- Verificar las políticas
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd
FROM pg_policies 
WHERE tablename IN ('volunteers', 'registrations')
ORDER BY tablename, policyname;