-- Añadir usuarios administradores a la tabla admin_users
-- WODFEST Salou 2026

-- Primero, asegurarnos de que info@wodfestevent.com existe
INSERT INTO admin_users (email, name, role) 
SELECT 'info@wodfestevent.com', 'Admin WODFEST', 'super_admin'
WHERE NOT EXISTS (
  SELECT 1 FROM admin_users WHERE email = 'info@wodfestevent.com'
);

-- Añadir enrique.rodriguezdrop@gmail.com como admin
INSERT INTO admin_users (email, name, role) 
SELECT 'enrique.rodriguezdrop@gmail.com', 'Enrique Rodríguez', 'super_admin'
WHERE NOT EXISTS (
  SELECT 1 FROM admin_users WHERE email = 'enrique.rodriguezdrop@gmail.com'
);

-- Ver todos los usuarios admin (para confirmar)
SELECT email, name, role, created_at FROM admin_users;