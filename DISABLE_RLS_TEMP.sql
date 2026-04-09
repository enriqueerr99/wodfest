-- TEMPORAL: Desactivar RLS para pruebas
-- WODFEST Salou 2026

-- Desactivar RLS en ambas tablas
ALTER TABLE volunteers DISABLE ROW LEVEL SECURITY;
ALTER TABLE registrations DISABLE ROW LEVEL SECURITY;

-- Verificar que se desactivó
SELECT 
  schemaname,
  tablename, 
  rowsecurity as "RLS Enabled"
FROM pg_tables 
WHERE tablename IN ('volunteers', 'registrations');

-- IMPORTANTE: Después de las pruebas, reactivar con:
-- ALTER TABLE volunteers ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;