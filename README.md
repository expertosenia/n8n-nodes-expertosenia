# 🤖 n8n-nodes-expertos-en-ia

Nodo oficial de **Expertos en IA** para n8n. Este nodo te permite integrar la potente API de WhatsApp de Expertos en IA directamente en tus workflows de n8n.

## 📦 Instalación

### Desde la interfaz de n8n
1. Ve a **Configuración** → **Community Nodes**
2. Haz clic en **"Install"**
3. Ingresa: `n8n-nodes-expertos-en-ia`
4. Haz clic en **"Install"**

### Desde línea de comandos
```bash
npm install n8n-nodes-expertos-en-ia
```

## 🔐 Configuración de Credenciales

1. En tu workflow de n8n, agrega el nodo **"API Expertos en IA"**
2. Haz clic en **"Credenciales"**
3. Crea nuevas credenciales:
   - **Nombre**: `Mi API Expertos en IA`
   - **Llave Personal (ex-ia-api)**: Tu token personal

### ¿Dónde conseguir tu token?
Contacta a **Expertos en IA** para obtener tu token personal `ex-ia-api`.

## 🚀 Funcionalidades

### 📱 Mensajería
- ✉️ **Enviar Mensaje de Texto**: Envía mensajes de texto a cualquier contacto
- 🖼️ **Enviar Imagen**: Comparte imágenes desde URL o base64
- 📁 **Enviar Archivo**: Envía documentos, PDFs, etc.
- 🎥 **Enviar Video**: Comparte videos con tus contactos
- 🎤 **Enviar Audio (Voz)**: Mensajes de voz
- 📍 **Enviar Ubicación**: Comparte ubicaciones geográficas
- 👤 **Enviar Contacto (VCard)**: Comparte información de contactos
- 👍 **Enviar Reacción**: Reacciona a mensajes con emojis
- 📊 **Enviar Encuesta**: Crea encuestas interactivas
- 🔘 **Enviar Botones**: Mensajes con botones de acción
- 🔗 **Enviar Vista Previa de Enlace**: Enlaces con preview

### 💬 Gestión de Chats
- 📥 **Obtener Mensajes de Chat**: Recupera histórico de mensajes
- ⌨️ **Empezar a Escribir**: Muestra indicador de "escribiendo..."
- ⏹️ **Dejar de Escribir**: Oculta indicador de escritura

### 🔧 Gestión de Sesiones
- ℹ️ **Obtener Información de Sesión**: Estado de la sesión de WhatsApp
- 🚪 **Cerrar Sesión (Logout)**: Desconecta la sesión

## 📝 Ejemplos de Uso

### Enviar Mensaje de Texto
```json
{
  "chatId": "5491123456789@c.us",
  "text": "¡Hola! Este es un mensaje desde n8n"
}
```

### Enviar Imagen
```json
{
  "chatId": "5491123456789@c.us",
  "file": {
    "url": "https://ejemplo.com/imagen.jpg"
  },
  "caption": "¡Mira esta imagen!"
}
```

### Obtener Mensajes
```json
{
  "chatId": "5491123456789@c.us",
  "limit": 50
}
```

## 🌐 API Base

Este nodo se conecta a: `https://api.expertosenia.com/`

Compatible con la especificación **WAHA** (WhatsApp HTTP API).

## 🔒 Seguridad

- ✅ Autenticación segura con tokens personales
- ✅ Comunicación encriptada HTTPS
- ✅ Headers de autenticación personalizados

## 📞 Soporte

- **Email**: soporte@expertosenia.com
- **Web**: https://expertosenia.com
- **Documentación**: https://docsapi1.expertosenia.com

## 📄 Licencia

MIT License - Expertos en IA

## 🔄 Versiones

### v1.0.8 - Actual
- ✅ Caracteres UTF-8 corregidos
- ✅ Sesión automática por defecto
- ✅ Compatibilidad completa con n8n

---

**¿Necesitas ayuda?** Contacta a nuestro equipo de soporte. 