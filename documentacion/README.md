# Documentación API WhatsApp - Expertos en IA

Documentación estática y elegante para la API de WhatsApp de Expertos en IA. Una guía completa de referencia para desarrolladores.

## 📚 Características

- ✅ **Documentación completa** de todos los endpoints
- ✅ **Interfaz moderna** con modo claro/oscuro
- ✅ **Ejemplos de código** JSON y cURL
- ✅ **Tablas de parámetros** detalladas
- ✅ **Respuestas de ejemplo** para cada endpoint
- ✅ **Navegación intuitiva** por categorías
- ✅ **Responsive design** para todos los dispositivos
- ✅ **Sin dependencias** externas

## 📁 Estructura de Archivos

```
documentacion/
├── api-docs.html     # Documentación principal
├── styles.css        # Estilos CSS
├── app.js           # Funcionalidad básica
├── logo.png         # Logo (opcional)
├── .htaccess        # Configuración Apache
└── README.md        # Este archivo
```

## 🚀 Instalación

### Opción 1: Abrir Directamente

Simplemente abre `api-docs.html` en tu navegador web favorito.

### Opción 2: Servidor Web Local

```bash
cd documentacion
python -m http.server 8000
# o
php -S localhost:8000
```

Luego visita: `http://localhost:8000/api-docs.html`

### Opción 3: Servidor Web

Copia la carpeta `documentacion/` a tu servidor web (Apache, Nginx, etc.)

## 📖 Contenido de la Documentación

### 🔗 Información General
- URL base de la API
- Método de autenticación
- Formato de datos
- Manejo de sesiones

### 💬 Endpoints de Mensajería
- **Enviar Texto**: Mensajes con vista previa de enlaces
- **Enviar Imagen**: Imágenes con descripción
- **Enviar Archivo**: Documentos y archivos
- **Enviar Video**: Videos con descripción
- **Enviar Audio**: Mensajes de voz
- **Enviar Ubicación**: Coordenadas geográficas
- **Enviar Contacto**: Tarjetas VCard
- **Enviar Encuesta**: Polls con opciones múltiples

### 📱 Endpoints de Chat
- **Obtener Mensajes**: Historial de conversaciones
- **Iniciar Escritura**: Indicador "escribiendo..."

### ⚙️ Endpoints de Sesión
- **Info de Sesión**: Estado de la conexión
- **Cerrar Sesión**: Logout de WhatsApp

## 🎯 Uso

1. **Abre la documentación** en tu navegador
2. **Navega por la barra lateral** para seleccionar endpoints
3. **Revisa los parámetros** requeridos y opcionales
4. **Copia los ejemplos** JSON o cURL
5. **Implementa en tu aplicación**

## 🔧 Personalización

### Cambiar Logo

Reemplaza `logo.png` con tu logo personalizado (50x50px recomendado)

### Modificar Colores

Edita las variables CSS en `styles.css`:

```css
:root {
    --accent-color: #007bff; /* Color principal */
    --success-color: #28a745; /* Color de éxito */
    /* ... más variables */
}
```

### Añadir Endpoints

Edita el objeto `endpoints` en `app.js`:

```javascript
const endpoints = {
    'nuevoEndpoint': {
        title: 'Nuevo Endpoint',
        method: 'POST',
        url: '/api/nuevo',
        description: 'Descripción del endpoint...',
        parameters: [
            { name: 'param', type: 'string', required: true, description: 'Descripción...' }
        ],
        example: '{ "ejemplo": "json" }',
        response: '{ "success": true }'
    }
};
```

## 🔐 Información de la API

### Autenticación
```
Headers:
Content-Type: application/json
ex-ia-api: TU_API_KEY_AQUI
```

### URL Base
```
https://api.expertosenia.com
```

### Formato de Chat ID
```
NUMERO@c.us
Ejemplo: 5491123456789@c.us
```

### Sesiones
```json
{
  "session": "default"
}
```

## 📱 Compatibilidad

- ✅ **Chrome/Edge** 80+
- ✅ **Firefox** 75+
- ✅ **Safari** 13+
- ✅ **Navegadores móviles**

## 🎨 Características de Diseño

- **Modo claro/oscuro** automático con persistencia
- **Tipografía legible** con fuentes del sistema
- **Espaciado consistente** y jerarquía visual clara
- **Colores accesibles** que cumplen estándares WCAG
- **Responsive design** para móviles y tablets

## 📄 Ejemplos de Uso

### Enviar Mensaje de Texto
```bash
curl -X POST "https://api.expertosenia.com/api/sendText" \
  -H "Content-Type: application/json" \
  -H "ex-ia-api: TU_API_KEY" \
  -d '{
    "chatId": "5491123456789@c.us",
    "text": "¡Hola desde la API!",
    "session": "default"
  }'
```

### Enviar Imagen
```bash
curl -X POST "https://api.expertosenia.com/api/sendImage" \
  -H "Content-Type: application/json" \
  -H "ex-ia-api: TU_API_KEY" \
  -d '{
    "chatId": "5491123456789@c.us",
    "file": {
      "url": "https://ejemplo.com/imagen.jpg"
    },
    "caption": "Imagen de ejemplo",
    "session": "default"
  }'
```

## 🤝 Para Desarrolladores

Esta documentación está diseñada para:

- **Desarrolladores** que integran la API
- **Equipos técnicos** que necesitan referencia rápida
- **Clientes** que quieren entender las capacidades
- **Partners** que implementan soluciones

## 📞 Soporte

Para soporte técnico o consultas sobre la API:

1. **Revisa esta documentación** completa
2. **Verifica los ejemplos** de código
3. **Contacta al equipo** de Expertos en IA

## 🔄 Actualizaciones

Esta documentación se actualiza regularmente para reflejar:

- Nuevos endpoints
- Cambios en parámetros
- Mejoras en ejemplos
- Correcciones y optimizaciones

---

**Desarrollado para Expertos en IA** 🤖  
*Documentación estática - Sin funcionalidad de testing* 