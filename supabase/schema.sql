-- WODFEST Salou 2026 - Database Schema
-- Ejecutar este SQL en Supabase SQL Editor

-- Tabla para voluntarios
CREATE TABLE volunteers (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(50),
  tshirt_size VARCHAR(10),
  availability TEXT,
  experience TEXT,
  comments TEXT,
  status VARCHAR(50) DEFAULT 'pending' -- pending, approved, rejected
);

-- Tabla para inscripciones
CREATE TABLE registrations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  booking_id VARCHAR(100) UNIQUE,
  team_name VARCHAR(255) NOT NULL,
  category VARCHAR(50) NOT NULL, -- solo-competicion, competicion-alojamiento
  pack_multimedia BOOLEAN DEFAULT false,
  total_amount DECIMAL(10,2),
  
  -- Atleta 1
  athlete1_name VARCHAR(255),
  athlete1_surname VARCHAR(255),
  athlete1_email VARCHAR(255),
  athlete1_phone VARCHAR(50),
  athlete1_dni VARCHAR(50),
  athlete1_birthdate DATE,
  athlete1_tshirt VARCHAR(10),
  athlete1_box VARCHAR(255),
  athlete1_city VARCHAR(255),
  
  -- Atleta 2
  athlete2_name VARCHAR(255),
  athlete2_surname VARCHAR(255),
  athlete2_email VARCHAR(255),
  athlete2_phone VARCHAR(50),
  athlete2_dni VARCHAR(50),
  athlete2_birthdate DATE,
  athlete2_tshirt VARCHAR(10),
  athlete2_box VARCHAR(255),
  athlete2_city VARCHAR(255),
  
  -- Atleta 3
  athlete3_name VARCHAR(255),
  athlete3_surname VARCHAR(255),
  athlete3_email VARCHAR(255),
  athlete3_phone VARCHAR(50),
  athlete3_dni VARCHAR(50),
  athlete3_birthdate DATE,
  athlete3_tshirt VARCHAR(10),
  athlete3_box VARCHAR(255),
  athlete3_city VARCHAR(255),
  
  -- Consentimiento
  consent_accepted BOOLEAN DEFAULT false,
  consent_timestamp TIMESTAMP WITH TIME ZONE,
  
  -- Estado
  status VARCHAR(50) DEFAULT 'pending', -- pending, confirmed, cancelled
  accommodation_confirmed BOOLEAN DEFAULT false,
  competition_confirmed BOOLEAN DEFAULT false,
  
  -- Metadata
  user_agent TEXT,
  ip_address VARCHAR(45)
);

-- Tabla para usuarios admin
CREATE TABLE admin_users (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  role VARCHAR(50) DEFAULT 'admin', -- admin, super_admin, viewer
  last_login TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT true
);

-- Índices para mejorar rendimiento
CREATE INDEX idx_volunteers_email ON volunteers(email);
CREATE INDEX idx_volunteers_status ON volunteers(status);
CREATE INDEX idx_registrations_team ON registrations(team_name);
CREATE INDEX idx_registrations_status ON registrations(status);
CREATE INDEX idx_registrations_category ON registrations(category);

-- Row Level Security (RLS)
ALTER TABLE volunteers ENABLE ROW LEVEL SECURITY;
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Políticas de seguridad para voluntarios
CREATE POLICY "Anon users can insert volunteers" ON volunteers
  FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view volunteers" ON volunteers
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update volunteers" ON volunteers
  FOR UPDATE TO authenticated
  USING (true);

-- Políticas de seguridad para inscripciones  
CREATE POLICY "Anon users can insert registrations" ON registrations
  FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view registrations" ON registrations
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update registrations" ON registrations
  FOR UPDATE TO authenticated
  USING (true);

-- Políticas para admin users
CREATE POLICY "Authenticated users can view admin users" ON admin_users
  FOR SELECT TO authenticated
  USING (auth.uid()::text = id::text OR EXISTS (
    SELECT 1 FROM admin_users WHERE id::text = auth.uid()::text AND role = 'super_admin'
  ));

-- Función para obtener estadísticas
CREATE OR REPLACE FUNCTION get_dashboard_stats()
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result json;
BEGIN
  SELECT json_build_object(
    'total_volunteers', (SELECT COUNT(*) FROM volunteers),
    'approved_volunteers', (SELECT COUNT(*) FROM volunteers WHERE status = 'approved'),
    'total_registrations', (SELECT COUNT(*) FROM registrations),
    'confirmed_registrations', (SELECT COUNT(*) FROM registrations WHERE status = 'confirmed'),
    'total_with_accommodation', (SELECT COUNT(*) FROM registrations WHERE category = 'competicion-alojamiento'),
    'total_pack_multimedia', (SELECT COUNT(*) FROM registrations WHERE pack_multimedia = true),
    'total_revenue', (SELECT COALESCE(SUM(total_amount), 0) FROM registrations WHERE status = 'confirmed')
  ) INTO result;
  
  RETURN result;
END;
$$;

-- Trigger para actualizar el total_amount automáticamente
CREATE OR REPLACE FUNCTION calculate_total_amount()
RETURNS TRIGGER AS $$
BEGIN
  -- Calcular el total basado en la categoría y extras
  IF NEW.category = 'solo-competicion' THEN
    NEW.total_amount := 135 * 3; -- 135€ por persona x 3 atletas
  ELSIF NEW.category = 'competicion-alojamiento' THEN
    NEW.total_amount := 225 * 3; -- 225€ por persona x 3 atletas
  END IF;
  
  -- Añadir pack multimedia si está seleccionado
  IF NEW.pack_multimedia = true THEN
    NEW.total_amount := NEW.total_amount + 79;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_total_amount
BEFORE INSERT OR UPDATE ON registrations
FOR EACH ROW
EXECUTE FUNCTION calculate_total_amount();

-- Insertar un usuario admin por defecto (cambiar password después)
INSERT INTO admin_users (email, name, role) 
VALUES ('info@wodfestevent.com', 'Admin', 'super_admin');