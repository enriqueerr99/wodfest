# 🚨 INSTRUCCIONES PARA ACTIVAR SUPABASE

## 1️⃣ Primero ejecuta el SQL en Supabase

1. Ve a tu proyecto en Supabase
2. Click en **SQL Editor** (menú lateral)
3. Copia TODO el SQL del archivo anterior y pégalo
4. Click en **RUN**
5. Debe decir "Success. No rows returned"

## 2️⃣ Obtén tus credenciales

1. Ve a **Settings** → **API**
2. Copia estos valores:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public**: `eyJhbGc...` (es muy larga)

## 3️⃣ Actualiza el código

### Archivo: `/js/admin.js`

Busca estas líneas (están al principio):

```javascript
const SUPABASE_URL = 'https://TU_PROYECTO.supabase.co'; // <-- PON TU PROJECT URL AQUÍ
const SUPABASE_ANON_KEY = 'eyJ_TU_ANON_KEY_AQUI'; // <-- PON TU ANON KEY AQUÍ

const DEMO_MODE = true; // <-- CAMBIAR A false
```

Reemplaza con tus valores reales:

```javascript
const SUPABASE_URL = 'https://tuprojecto.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...tu_key_completa';

const DEMO_MODE = false; // IMPORTANTE: cambiar a false
```

## 4️⃣ Configurar las variables en Vercel

1. Ve a tu proyecto en Vercel
2. Settings → Environment Variables
3. Añade estas variables:

| Variable | Valor |
|----------|--------|
| SUPABASE_URL | https://tuprojecto.supabase.co |
| SUPABASE_ANON_KEY | eyJhbGc... (tu anon key) |
| SUPABASE_SERVICE_KEY | (opcional - la service key de Settings → API) |

## 5️⃣ Crear usuario admin

1. En Supabase, ve a **Authentication** → **Users**
2. Click en **Invite user**
3. Email: `admin@wodfestsalou.com` (o el que prefieras)
4. Revisa tu email y acepta la invitación
5. Establece tu contraseña

## 6️⃣ Deploy en Vercel

Ejecuta:
```bash
vercel --prod
```

## ✅ ¡LISTO!

Ahora tu panel admin usará Supabase real:
- Los datos se guardan en la nube
- Puedes acceder desde cualquier dispositivo
- Los formularios guardan automáticamente
- Todo está sincronizado

### 🔍 Para verificar:

1. Ve a https://wodfest-salou.vercel.app/admin
2. Inicia sesión con tu usuario de Supabase
3. Ya no verás el mensaje de "Modo Demo"
4. Los datos se guardan permanentemente

### ❓ ¿Problemas?

- **Error "Invalid API key"**: Verifica que copiaste bien la anon key
- **No puedo iniciar sesión**: Asegúrate de haber creado el usuario en Supabase
- **Las tablas no existen**: Ejecuta de nuevo el SQL

---

¡Tu sistema está listo para producción! 🚀