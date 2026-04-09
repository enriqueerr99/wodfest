# 🚀 Configuración de Supabase para WODFEST Salou 2026

## Paso 1: Crear cuenta en Supabase

1. Ve a [https://supabase.com](https://supabase.com)
2. Haz clic en "Start your project"
3. Inicia sesión con GitHub o Google (recomendado)

## Paso 2: Crear nuevo proyecto

1. Click en "New Project"
2. Configura:
   - **Organization**: Tu organización o crear nueva
   - **Project name**: `wodfest-salou`
   - **Database Password**: Guárdala bien! La necesitarás
   - **Region**: Europe (Frankfurt) o la más cercana
   - **Pricing Plan**: Free tier está bien para empezar

3. Espera unos minutos mientras se crea el proyecto

## Paso 3: Configurar la base de datos

1. Una vez creado el proyecto, ve a **SQL Editor** en el menú lateral
2. Copia todo el contenido de `/supabase/schema.sql`
3. Pégalo en el editor SQL
4. Haz clic en **Run** para ejecutar el script

Esto creará:
- ✅ Tabla `volunteers` para los voluntarios
- ✅ Tabla `registrations` para las inscripciones
- ✅ Tabla `admin_users` para usuarios del panel
- ✅ Políticas de seguridad (RLS)
- ✅ Funciones auxiliares

## Paso 4: Obtener las credenciales

1. Ve a **Settings** → **API** en el menú lateral
2. Copia estos valores:

```
Project URL: https://xxxxxxxxxxxxx.supabase.co
Anon Key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Paso 5: Configurar el proyecto

### Opción A: Variables de entorno (Recomendado)

Crea un archivo `.env.local` en la raíz del proyecto:

```env
NEXT_PUBLIC_SUPABASE_URL=tu_project_url_aqui
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key_aqui
```

### Opción B: Configuración directa

Edita estos archivos y reemplaza los valores:

1. `/js/admin.js`:
```javascript
const SUPABASE_URL = 'tu_project_url_aqui';
const SUPABASE_ANON_KEY = 'tu_anon_key_aqui';
```

2. `/lib/supabase.js`:
```javascript
const supabaseUrl = 'tu_project_url_aqui';
const supabaseAnonKey = 'tu_anon_key_aqui';
```

## Paso 6: Configurar autenticación

1. Ve a **Authentication** → **Providers** en Supabase
2. Asegúrate de que **Email** esté habilitado
3. Ve a **Authentication** → **Users**
4. Haz clic en **Invite User**
5. Añade el email del administrador (ej: `admin@wodfestsalou.com`)

## Paso 7: Actualizar las APIs en Vercel

1. Ve a tu proyecto en Vercel
2. Settings → Environment Variables
3. Añade:
   - `SUPABASE_URL` = tu_project_url
   - `SUPABASE_ANON_KEY` = tu_anon_key
   - `SUPABASE_SERVICE_KEY` = (opcional, para operaciones admin)

## 📊 Panel de Administración

Una vez configurado todo:

1. Ve a `https://wodfest-salou.vercel.app/admin`
2. Inicia sesión con el email que configuraste
3. Podrás ver:
   - Dashboard con estadísticas
   - Lista de inscripciones
   - Lista de voluntarios
   - Exportar datos a CSV

## 🔧 Troubleshooting

### Error: "Invalid API key"
- Verifica que copiaste correctamente la Anon Key
- Asegúrate de que no hay espacios extra

### Error: "relation does not exist"
- Ejecuta de nuevo el script SQL
- Verifica que se ejecutó sin errores

### No puedo iniciar sesión en admin
- Verifica que invitaste al usuario en Supabase
- El usuario debe confirmar el email de invitación
- Revisa la consola del navegador para errores

## 🎯 Próximos pasos

1. **Personalizar el panel**: Edita `/admin/index.html` y `/css/admin.css`
2. **Añadir más funciones**: Edita `/js/admin.js`
3. **Webhooks**: Configura webhooks en Supabase para notificaciones
4. **Backups**: Activa backups automáticos en Supabase (Pro plan)

## 📱 Integración con formularios

Los formularios ya están preparados para enviar datos a Supabase:

- **Voluntarios**: Se guardan automáticamente al enviar el formulario
- **Inscripciones**: Se guardan al procesar el registro
- **Pack Multimedia**: Se registra como parte de la inscripción

## 🔐 Seguridad

- Las políticas RLS están configuradas para:
  - Permitir inserciones anónimas (formularios públicos)
  - Requerir autenticación para lectura/modificación
  - Solo super_admin puede gestionar otros usuarios

---

¿Necesitas ayuda? Contacta con el equipo técnico de WODFEST.