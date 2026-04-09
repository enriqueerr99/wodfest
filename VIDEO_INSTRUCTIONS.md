# INSTRUCCIONES PARA AÑADIR EL VIDEO

## ✅ El código ya está listo

He activado la estructura del video en el hero. Ahora solo necesitas:

### 1. Subir el archivo de video

Coloca tu archivo de video en la carpeta `assets/` con uno de estos nombres:
- `hero.mp4` (recomendado)
- `hero.webm` (alternativa para mejor compatibilidad)

### 2. Formatos recomendados

- **MP4**: Formato principal, funciona en todos los navegadores
- **WebM**: Opcional, mejor compresión para algunos navegadores

### 3. Optimización del video

Para mejor rendimiento:
- **Resolución**: 1920x1080 (Full HD) es suficiente
- **Duración**: 15-30 segundos en loop
- **Tamaño**: Intenta que no supere 10-15 MB
- **Compresión**: Usa herramientas como HandBrake o FFmpeg

### 4. El video ya está configurado con:

- ✅ **Autoplay**: Se reproduce automáticamente
- ✅ **Muted**: Sin sonido (requerido para autoplay)
- ✅ **Loop**: Se repite infinitamente
- ✅ **Playsinline**: Funciona bien en móviles
- ✅ **Responsive**: Se adapta a todas las pantallas
- ✅ **Overlay**: Capa oscura para mejor legibilidad del texto

### 5. Si necesitas cambiar la ruta del video:

Edita esta línea en `index.html`:
```html
<source src="assets/hero.mp4" type="video/mp4" />
```

### 6. Vista previa

Una vez subas el video, se verá automáticamente en https://wodfest-salou.vercel.app

---

**Nota**: Si el archivo que tienes no es un video sino una imagen, necesitarás convertirlo primero a formato de video.