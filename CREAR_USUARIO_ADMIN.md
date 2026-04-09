# 👤 Crear Usuario Admin en Supabase

## Paso 1: Crear el usuario

1. Ve a tu proyecto en Supabase
2. En el menú lateral, haz clic en **Authentication**
3. Haz clic en la pestaña **Users**
4. Haz clic en el botón **Invite user**
5. Ingresa el email: `info@wodfestevent.com` (o el que prefieras)
6. Haz clic en **Send invitation**

## Paso 2: Activar el usuario

1. Revisa el email que pusiste (info@wodfestevent.com)
2. Busca el correo de Supabase con el asunto "You have been invited"
3. Haz clic en el botón **Accept the invite**
4. Te llevará a una página para establecer tu contraseña
5. Elige una contraseña segura y confírmala

## Paso 3: Probar el acceso

1. Ve a https://wodfest-salou.vercel.app/admin
2. Ingresa:
   - Email: info@wodfestevent.com
   - Contraseña: la que acabas de crear
3. ¡Deberías poder acceder al panel!

## Alternativa: Usuario rápido para pruebas

Si prefieres crear un usuario rápido sin email real:

1. En Supabase, ve a **SQL Editor**
2. Ejecuta este comando:

```sql
-- Crear usuario de prueba (cambiar email y password)
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  recovery_sent_at,
  last_sign_in_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'test@wodfestsalou.com', -- CAMBIAR EMAIL
  crypt('tupassword123', gen_salt('bf')), -- CAMBIAR PASSWORD
  now(),
  now(),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{}',
  now(),
  now(),
  '',
  '',
  '',
  ''
);
```

⚠️ **Nota**: Este método es solo para desarrollo. En producción, usa el método oficial de invitación.

## ¿Problemas?

- **No llega el email**: Revisa spam o usa un email diferente
- **Error al iniciar sesión**: Verifica que el email esté confirmado en Supabase
- **Página en blanco**: Abre la consola del navegador (F12) y busca errores