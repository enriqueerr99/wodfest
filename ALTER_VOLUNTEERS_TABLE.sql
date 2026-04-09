-- Añadir columnas adicionales a la tabla volunteers
-- WODFEST Salou 2026

-- Añadir columna edad (si no existe)
ALTER TABLE volunteers 
ADD COLUMN IF NOT EXISTS age INTEGER;

-- Añadir columna ciudad (si no existe)
ALTER TABLE volunteers 
ADD COLUMN IF NOT EXISTS city VARCHAR(255);

-- Ver estructura actual de la tabla
SELECT 
  column_name, 
  data_type, 
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_name = 'volunteers'
ORDER BY ordinal_position;