// Documentación de endpoints
const endpoints = {
    'sendText': {
        title: 'Enviar Mensaje de Texto',
        method: 'POST',
        url: '/api/sendText',
        description: 'Envía un mensaje de texto a un chat específico de WhatsApp.',
        parameters: [
            { name: 'chatId', type: 'string', required: true, description: 'ID del chat en formato NUMERO@c.us' },
            { name: 'text', type: 'string', required: true, description: 'Contenido del mensaje de texto' },
            { name: 'reply_to', type: 'string', required: false, description: 'ID del mensaje al que responder' },
            { name: 'linkPreview', type: 'boolean', required: false, description: 'Mostrar vista previa de enlaces (default: true)' },
            { name: 'linkPreviewHighQuality', type: 'boolean', required: false, description: 'Vista previa de alta calidad (default: true)' },
            { name: 'session', type: 'string', required: false, description: 'Nombre de la sesión (default: "default")' }
        ],
        example: `{
  "chatId": "5491123456789@c.us",
  "text": "¡Hola! Este es un mensaje de prueba desde la API.",
  "reply_to": null,
  "linkPreview": true,
  "linkPreviewHighQuality": true,
  "session": "default"
}`,
        response: `{
  "success": true,
  "message": "Mensaje enviado exitosamente",
  "messageId": "msg_12345"
}`
    },
    'sendImage': {
        title: 'Enviar Imagen',
        method: 'POST',
        url: '/api/sendImage',
        description: 'Envía una imagen desde una URL a un chat específico.',
        parameters: [
            { name: 'chatId', type: 'string', required: true, description: 'ID del chat en formato NUMERO@c.us' },
            { name: 'file', type: 'object', required: true, description: 'Objeto con la URL de la imagen' },
            { name: 'file.url', type: 'string', required: true, description: 'URL pública de la imagen' },
            { name: 'caption', type: 'string', required: false, description: 'Descripción de la imagen' },
            { name: 'reply_to', type: 'string', required: false, description: 'ID del mensaje al que responder' },
            { name: 'session', type: 'string', required: false, description: 'Nombre de la sesión (default: "default")' }
        ],
        example: `{
  "chatId": "5491123456789@c.us",
  "file": {
    "url": "https://i.imgur.com/TuFp7z2.jpeg"
  },
  "caption": "Esta es una imagen de ejemplo",
  "reply_to": null,
  "session": "default"
}`,
        response: `{
  "success": true,
  "message": "Imagen enviada exitosamente",
  "messageId": "msg_12346"
}`
    },
    'sendFile': {
        title: 'Enviar Archivo',
        method: 'POST',
        url: '/api/sendFile',
        description: 'Envía un archivo desde una URL a un chat específico.',
        parameters: [
            { name: 'chatId', type: 'string', required: true, description: 'ID del chat en formato NUMERO@c.us' },
            { name: 'file', type: 'object', required: true, description: 'Objeto con la URL del archivo' },
            { name: 'file.url', type: 'string', required: true, description: 'URL pública del archivo' },
            { name: 'filename', type: 'string', required: false, description: 'Nombre del archivo' },
            { name: 'reply_to', type: 'string', required: false, description: 'ID del mensaje al que responder' },
            { name: 'session', type: 'string', required: false, description: 'Nombre de la sesión (default: "default")' }
        ],
        example: `{
  "chatId": "5491123456789@c.us",
  "file": {
    "url": "https://ejemplo.com/documento.pdf"
  },
  "filename": "manual-usuario.pdf",
  "reply_to": null,
  "session": "default"
}`,
        response: `{
  "success": true,
  "message": "Archivo enviado exitosamente",
  "messageId": "msg_12347"
}`
    },
    'sendVideo': {
        title: 'Enviar Video',
        method: 'POST',
        url: '/api/sendVideo',
        description: 'Envía un video desde una URL a un chat específico.',
        parameters: [
            { name: 'chatId', type: 'string', required: true, description: 'ID del chat en formato NUMERO@c.us' },
            { name: 'file', type: 'object', required: true, description: 'Objeto con la URL del video' },
            { name: 'file.url', type: 'string', required: true, description: 'URL pública del video' },
            { name: 'caption', type: 'string', required: false, description: 'Descripción del video' },
            { name: 'reply_to', type: 'string', required: false, description: 'ID del mensaje al que responder' },
            { name: 'session', type: 'string', required: false, description: 'Nombre de la sesión (default: "default")' }
        ],
        example: `{
  "chatId": "5491123456789@c.us",
  "file": {
    "url": "https://ejemplo.com/video.mp4"
  },
  "caption": "Video de demostración",
  "reply_to": null,
  "session": "default"
}`,
        response: `{
  "success": true,
  "message": "Video enviado exitosamente",
  "messageId": "msg_12348"
}`
    },
    'sendVoice': {
        title: 'Enviar Audio (Voz)',
        method: 'POST',
        url: '/api/sendVoice',
        description: 'Envía un archivo de audio como mensaje de voz.',
        parameters: [
            { name: 'chatId', type: 'string', required: true, description: 'ID del chat en formato NUMERO@c.us' },
            { name: 'file', type: 'object', required: true, description: 'Objeto con la URL del audio' },
            { name: 'file.url', type: 'string', required: true, description: 'URL pública del archivo de audio' },
            { name: 'reply_to', type: 'string', required: false, description: 'ID del mensaje al que responder' },
            { name: 'session', type: 'string', required: false, description: 'Nombre de la sesión (default: "default")' }
        ],
        example: `{
  "chatId": "5491123456789@c.us",
  "file": {
    "url": "https://ejemplo.com/audio.mp3"
  },
  "reply_to": null,
  "session": "default"
}`,
        response: `{
  "success": true,
  "message": "Audio enviado exitosamente",
  "messageId": "msg_12349"
}`
    },
    'sendLocation': {
        title: 'Enviar Ubicación',
        method: 'POST',
        url: '/api/sendLocation',
        description: 'Envía una ubicación geográfica a un chat específico.',
        parameters: [
            { name: 'chatId', type: 'string', required: true, description: 'ID del chat en formato NUMERO@c.us' },
            { name: 'latitude', type: 'number', required: true, description: 'Latitud de la ubicación' },
            { name: 'longitude', type: 'number', required: true, description: 'Longitud de la ubicación' },
            { name: 'title', type: 'string', required: false, description: 'Título de la ubicación' },
            { name: 'reply_to', type: 'string', required: false, description: 'ID del mensaje al que responder' },
            { name: 'session', type: 'string', required: false, description: 'Nombre de la sesión (default: "default")' }
        ],
        example: `{
  "chatId": "5491123456789@c.us",
  "latitude": -34.6037,
  "longitude": -58.3816,
  "title": "Buenos Aires, Argentina",
  "reply_to": null,
  "session": "default"
}`,
        response: `{
  "success": true,
  "message": "Ubicación enviada exitosamente",
  "messageId": "msg_12350"
}`
    },
    'sendContactVcard': {
        title: 'Enviar Contacto (VCard)',
        method: 'POST',
        url: '/api/sendContactVcard',
        description: 'Envía un contacto en formato VCard a un chat específico.',
        parameters: [
            { name: 'chatId', type: 'string', required: true, description: 'ID del chat en formato NUMERO@c.us' },
            { name: 'contacts', type: 'array', required: true, description: 'Array de contactos en formato VCard' },
            { name: 'contacts[].vcard', type: 'string', required: true, description: 'Datos del contacto en formato VCard' },
            { name: 'reply_to', type: 'string', required: false, description: 'ID del mensaje al que responder' },
            { name: 'session', type: 'string', required: false, description: 'Nombre de la sesión (default: "default")' }
        ],
        example: `{
  "chatId": "5491123456789@c.us",
  "contacts": [{
    "vcard": "BEGIN:VCARD\\nVERSION:3.0\\nFN:Juan Pérez\\nTEL;TYPE=CELL:+5491123456789\\nEMAIL:juan@ejemplo.com\\nEND:VCARD"
  }],
  "reply_to": null,
  "session": "default"
}`,
        response: `{
  "success": true,
  "message": "Contacto enviado exitosamente",
  "messageId": "msg_12351"
}`
    },
    'sendPoll': {
        title: 'Enviar Encuesta',
        method: 'POST',
        url: '/api/sendPoll',
        description: 'Envía una encuesta con opciones múltiples a un chat específico.',
        parameters: [
            { name: 'chatId', type: 'string', required: true, description: 'ID del chat en formato NUMERO@c.us' },
            { name: 'poll', type: 'object', required: true, description: 'Objeto con los datos de la encuesta' },
            { name: 'poll.name', type: 'string', required: true, description: 'Título de la encuesta' },
            { name: 'poll.options', type: 'array', required: true, description: 'Array de opciones de la encuesta' },
            { name: 'poll.multipleAnswers', type: 'boolean', required: false, description: 'Permitir respuestas múltiples (default: false)' },
            { name: 'reply_to', type: 'string', required: false, description: 'ID del mensaje al que responder' },
            { name: 'session', type: 'string', required: false, description: 'Nombre de la sesión (default: "default")' }
        ],
        example: `{
  "chatId": "5491123456789@c.us",
  "poll": {
    "name": "¿Cuál es tu color favorito?",
    "options": ["Rojo", "Azul", "Verde", "Amarillo"],
    "multipleAnswers": false
  },
  "reply_to": null,
  "session": "default"
}`,
        response: `{
  "success": true,
  "message": "Encuesta enviada exitosamente",
  "messageId": "msg_12352"
}`
    },
    'getMessages': {
        title: 'Obtener Mensajes',
        method: 'GET',
        url: '/api/messages',
        description: 'Obtiene los mensajes de un chat específico o todos los mensajes.',
        parameters: [
            { name: 'chatId', type: 'string', required: false, description: 'ID del chat (opcional, si no se especifica devuelve todos)' },
            { name: 'limit', type: 'number', required: false, description: 'Límite de mensajes a devolver (default: 100)' },
            { name: 'session', type: 'string', required: false, description: 'Nombre de la sesión (default: "default")' }
        ],
        example: `GET /api/messages?chatId=5491123456789@c.us&limit=50&session=default`,
        response: `{
  "success": true,
  "messages": [
    {
      "id": "msg_12345",
      "chatId": "5491123456789@c.us",
      "from": "5491123456789@c.us",
      "type": "text",
      "text": "Hola, ¿cómo estás?",
      "timestamp": 1640995200
    }
  ],
  "total": 1
}`
    },
    'startTyping': {
        title: 'Iniciar Indicador de Escritura',
        method: 'POST',
        url: '/api/startTyping',
        description: 'Muestra el indicador "escribiendo..." en un chat específico.',
        parameters: [
            { name: 'chatId', type: 'string', required: true, description: 'ID del chat en formato NUMERO@c.us' },
            { name: 'session', type: 'string', required: false, description: 'Nombre de la sesión (default: "default")' }
        ],
        example: `{
  "chatId": "5491123456789@c.us",
  "session": "default"
}`,
        response: `{
  "success": true,
  "message": "Indicador de escritura activado"
}`
    },
    'getSessionInfo': {
        title: 'Información de Sesión',
        method: 'GET',
        url: '/api/sessions/{session}',
        description: 'Obtiene información sobre una sesión específica de WhatsApp.',
        parameters: [
            { name: 'session', type: 'string', required: true, description: 'Nombre de la sesión (en la URL)' }
        ],
        example: `GET /api/sessions/default`,
        response: `{
  "success": true,
  "session": {
    "name": "default",
    "status": "WORKING",
    "qr": null,
    "me": {
      "id": "5491123456789@c.us",
      "pushName": "Mi WhatsApp"
    }
  }
}`
    },
    'logoutSession': {
        title: 'Cerrar Sesión (Logout)',
        method: 'DELETE',
        url: '/api/sessions/{session}/logout',
        description: 'Cierra una sesión específica de WhatsApp.',
        parameters: [
            { name: 'session', type: 'string', required: true, description: 'Nombre de la sesión (en la URL)' }
        ],
        example: `DELETE /api/sessions/default/logout`,
        response: `{
  "success": true,
  "message": "Sesión cerrada exitosamente"
}`
    }
};

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Cargar tema guardado
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-theme', savedTheme);
    updateThemeToggle(savedTheme);
    
    // Mostrar la introducción por defecto
    showIntro();
}

// Funciones de tema
function toggleTheme() {
    const body = document.body;
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeToggle(newTheme);
}

function updateThemeToggle(theme) {
    const themeIcon = document.getElementById('theme-icon');
    const themeText = document.getElementById('theme-text');
    
    if (theme === 'dark') {
        themeIcon.textContent = '☀️';
        themeText.textContent = 'Modo Claro';
    } else {
        themeIcon.textContent = '🌙';
        themeText.textContent = 'Modo Oscuro';
    }
}

// Funciones de navegación
function showIntro() {
    // Remover clase active de todos los items
    document.querySelectorAll('.endpoint-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Mostrar introducción
    document.getElementById('intro-section').style.display = 'block';
    document.getElementById('endpoint-docs').style.display = 'none';
}

function showEndpoint(endpointId) {
    // Remover clase active de todos los items
    document.querySelectorAll('.endpoint-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Agregar clase active al item seleccionado
    if (event && event.target) {
        event.target.closest('.endpoint-item').classList.add('active');
    }
    
    // Ocultar introducción
    document.getElementById('intro-section').style.display = 'none';
    
    // Mostrar documentación del endpoint
    const endpoint = endpoints[endpointId];
    if (endpoint) {
        displayEndpointDocs(endpoint);
        document.getElementById('endpoint-docs').style.display = 'block';
    }
}

function displayEndpointDocs(endpoint) {
    const container = document.getElementById('endpoint-docs');
    
    // Generar tabla de parámetros
    let parametersTable = '';
    if (endpoint.parameters && endpoint.parameters.length > 0) {
        parametersTable = `
            <div class="parameters-section">
                <h3>📋 Parámetros</h3>
                <div class="parameters-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Parámetro</th>
                                <th>Tipo</th>
                                <th>Requerido</th>
                                <th>Descripción</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${endpoint.parameters.map(param => `
                                <tr>
                                    <td><code>${param.name}</code></td>
                                    <td><span class="type-badge">${param.type}</span></td>
                                    <td><span class="required-badge ${param.required ? 'required' : 'optional'}">${param.required ? 'Sí' : 'No'}</span></td>
                                    <td>${param.description}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }
    
    // Generar cURL de ejemplo
    const curlExample = generateCurlExample(endpoint);
    
    container.innerHTML = `
        <div class="endpoint-header">
            <h1>${endpoint.title}</h1>
            <div class="endpoint-meta">
                <span class="method-badge method-${endpoint.method.toLowerCase()}">${endpoint.method}</span>
                <code class="endpoint-url">https://api.expertosenia.com${endpoint.url}</code>
            </div>
        </div>
        
        <div class="endpoint-description">
            <p>${endpoint.description}</p>
        </div>
        
        ${parametersTable}
        
        <div class="examples-section">
            <h3>💡 Ejemplo de Petición</h3>
            <div class="code-block">
                <div class="code-header">JSON</div>
                <pre>${endpoint.example}</pre>
            </div>
        </div>
        
        <div class="curl-section">
            <h3>🔧 Ejemplo cURL</h3>
            <div class="code-block">
                <div class="code-header">cURL</div>
                <pre>${curlExample}</pre>
            </div>
        </div>
        
        <div class="response-section">
            <h3>📡 Respuesta de Ejemplo</h3>
            <div class="code-block">
                <div class="code-header">JSON Response</div>
                <pre>${endpoint.response}</pre>
            </div>
        </div>
    `;
}

function generateCurlExample(endpoint) {
    let curl = `curl -X ${endpoint.method} "https://api.expertosenia.com${endpoint.url}"`;
    curl += ` \\\n  -H "Content-Type: application/json"`;
    curl += ` \\\n  -H "ex-ia-api: TU_API_KEY_AQUI"`;
    
    if (endpoint.method !== 'GET' && endpoint.example && !endpoint.example.startsWith('GET')) {
        curl += ` \\\n  -d '${endpoint.example}'`;
    }
    
    return curl;
}