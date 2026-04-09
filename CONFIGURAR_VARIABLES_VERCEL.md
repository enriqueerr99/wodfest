# 🔧 Configurar Variables de Entorno en Vercel

## Por qué es necesario:
Las funciones API necesitan acceso a Supabase para guardar los datos.

## Pasos:

1. **Ve a tu proyecto en Vercel**
   - https://vercel.com/dashboard
   - Selecciona el proyecto `wodfest-salou`

2. **Ve a Settings → Environment Variables**

3. **Añade estas variables:**

   | Variable | Valor |
   |----------|--------|
   | `SUPABASE_URL` | `https://coopmsgaulridgjqfxwj.supabase.co` |
   | `SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNvb3Btc2dhdWxyaWRnanFmeHdqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM5MTU2MTYsImV4cCI6MjA4OTQ5MTYxNn0.jJweIORM5e3OEu_OoXz0T0QiaI9cemS8iYUWQlUE2Hk` |

4. **Haz clic en "Save"**

5. **IMPORTANTE: Redeploy el proyecto**
   - Ve a la pestaña "Deployments"
   - Haz clic en los 3 puntos del último deployment
   - Selecciona "Redeploy"

## Verificar que funciona:

Después del redeploy:
1. Prueba el formulario de voluntarios otra vez
2. Ve al panel admin
3. Deberías ver el nuevo voluntario en la lista

Si sigue sin funcionar, revisa la consola del navegador (F12) para ver el error específico.