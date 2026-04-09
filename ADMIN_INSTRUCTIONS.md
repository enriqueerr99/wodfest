# 🎯 Panel de Administración WODFEST Salou 2026

## 🚀 Acceso Rápido

1. **URL**: https://wodfest-salou.vercel.app/admin
2. **Usuarios admin**:
   - info@wodfestevent.com
   - enrique.rodriguezdrop@gmail.com
3. **Contraseña**: (la que establezcas en Supabase)

## ✨ Características del Panel

### Dashboard
- **Estadísticas en tiempo real**:
  - Total de inscripciones
  - Inscripciones confirmadas
  - Teams con alojamiento
  - Packs multimedia vendidos
  - Total de voluntarios
  - Ingresos totales

### Gestión de Inscripciones
- Ver todas las inscripciones
- Filtrar por categoría (Solo Competición / Con Alojamiento)
- Buscar por nombre de equipo
- Ver detalles completos de cada equipo
- Exportar a CSV

### Gestión de Voluntarios
- Ver todas las solicitudes
- Aprobar o rechazar voluntarios
- Filtrar por estado
- Ver información completa
- Exportar datos

## 💾 Modo Demo vs Producción

### Actualmente: MODO DEMO
- Los datos se guardan en el navegador (localStorage)
- Perfecto para pruebas y desarrollo
- No requiere configuración
- Incluye datos de ejemplo

### Para activar MODO PRODUCCIÓN:

1. **Crear cuenta en Supabase** (gratis):
   - Ve a https://supabase.com
   - Crea un proyecto nuevo

2. **Configurar la base de datos**:
   - Ejecuta el script SQL de `/supabase/schema.sql`
   - Copia tus credenciales (URL y Anon Key)

3. **Actualizar el código**:
   En `/js/admin.js`, cambia:
   ```javascript
   const DEMO_MODE = false;  // Cambiar de true a false
   ```

4. **Añadir tus credenciales de Supabase** (si no usas modo demo)

## 📊 Cómo funciona

### Inscripciones
1. Los usuarios completan el formulario en `/inscripcion.html`
2. Los datos se guardan automáticamente
3. Aparecen instantáneamente en el panel admin
4. Puedes ver todos los detalles y exportar

### Voluntarios
1. Los interesados completan el formulario en la web principal
2. Sus solicitudes aparecen como "Pendientes"
3. Puedes aprobar o rechazar desde el panel
4. Exporta la lista para coordinar el evento

## 🔐 Seguridad

- En modo demo: datos locales en el navegador
- En modo producción: autenticación segura con Supabase
- Políticas RLS para proteger los datos
- Solo usuarios autorizados pueden acceder al panel

## 🎨 Personalización

Puedes modificar:
- **Colores y estilos**: `/css/admin.css`
- **Funcionalidad**: `/js/admin.js`
- **Estructura**: `/admin/index.html`

## 📱 Características adicionales

- **Responsive**: Funciona en móviles y tablets
- **Búsqueda en tiempo real**: Encuentra datos rápidamente
- **Exportación CSV**: Compatible con Excel
- **Actualizaciones automáticas**: Los datos se sincronizan al instante

## 🆘 ¿Necesitas ayuda?

1. Revisa `SUPABASE_SETUP.md` para configuración detallada
2. Los datos de ejemplo te ayudan a entender el flujo
3. El modo demo es perfecto para practicar

---

¡El panel está listo para usar! Accede y empieza a gestionar las inscripciones y voluntarios de WODFEST Salou 2026.