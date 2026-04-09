# ⚠️ OPTIMIZACIÓN URGENTE DEL VIDEO

## Problema actual:
- **Archivo**: INSTALACIONES_WODFEST4k.mov
- **Tamaño**: 269 MB (¡MUY PESADO!)
- **Formato**: .mov (compatibilidad limitada)

## Recomendaciones:

### 1. Convertir a MP4 y comprimir
Usa FFmpeg o HandBrake para convertir:

```bash
ffmpeg -i INSTALACIONES_WODFEST4k.mov -vcodec h264 -acodec aac -pix_fmt yuv420p -movflags +faststart -vf scale=1920:1080 -b:v 2M -preset slow assets/hero.mp4
```

### 2. Tamaño objetivo: 10-15 MB máximo

### 3. Configuración recomendada:
- Resolución: 1920x1080 (Full HD)
- Bitrate: 2-3 Mbps
- Sin audio (ya está muted)
- Duración: 15-30 segundos máximo

### 4. Por qué es importante:
- **269 MB tardará MUCHO en cargar** (varios minutos)
- Los usuarios abandonarán la web
- Consumirá mucho ancho de banda

### 5. Alternativa temporal:
Mientras optimizas, puedes crear un video más corto (5-10 segundos) para tener algo funcionando.

---
**IMPORTANTE**: Con el tamaño actual, la web tardará mucho en cargar el video.