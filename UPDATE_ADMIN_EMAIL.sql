-- Actualizar el email del admin en la tabla admin_users
UPDATE admin_users 
SET email = 'info@wodfestevent.com' 
WHERE email = 'admin@wodfestsalou.com';

-- Si no existe ningún registro, crear uno nuevo
INSERT INTO admin_users (email, name, role) 
SELECT 'info@wodfestevent.com', 'Admin', 'super_admin'
WHERE NOT EXISTS (
  SELECT 1 FROM admin_users WHERE email = 'info@wodfestevent.com'
);