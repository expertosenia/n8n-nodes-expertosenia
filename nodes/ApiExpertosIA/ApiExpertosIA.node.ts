import {
	IExecuteFunctions,
	INodeType,
	INodeTypeDescription,
	INodeExecutionData,
	NodeOperationError,
} from 'n8n-workflow';

export class ApiExpertosIA implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'API Expertos en IA',
		name: 'apiExpertosIA',
		icon: 'file:ExpertosEnIA.svg',
		group: ['Expertos en IA'],
		version: 1,
		subtitle: '={{$parameter["resource"] + ": " + $parameter["operation"]}}',
		description: 'Nodo oficial para interactuar con la API segura de Expertos en IA',
		documentationUrl: 'https://docsapi1.expertosenia.com',
		defaults: {
			name: 'API Expertos en IA',
		},
		inputs: ['main'] as any,
		outputs: ['main'] as any,
		credentials: [
			{
				name: 'apiExpertosIaApi',
				required: true,
			},
		],
		properties: [
			// --------------------------------------------------------------------------
			// -- SELECCIÓN DE RECURSO Y OPERACIÓN
			// --------------------------------------------------------------------------
			{
				displayName: 'Recurso',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{ name: 'Mensajería', value: 'messaging' },
					{ name: 'Chats y Mensajes', value: 'chats' },
					{ name: 'Sesiones', value: 'sessions' },
				],
				default: 'messaging',
				description: 'El tipo de recurso de la API con el que desea interactuar.',
			},
			{
				displayName: 'Operación',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['messaging'] } },
				options: [
					{ name: 'Enviar Mensaje de Texto', value: 'sendText'},
					{ name: 'Enviar Imagen', value: 'sendImage' },
					{ name: 'Enviar Archivo', value: 'sendFile' },
					{ name: 'Enviar Video', value: 'sendVideo' },
					{ name: 'Enviar Audio (Voz)', value: 'sendVoice' },
					{ name: 'Enviar Ubicación', value: 'sendLocation' },
					{ name: 'Enviar Contacto (VCard)', value: 'sendContactVcard' },
					{ name: 'Enviar Reacción', value: 'reaction' },
					{ name: 'Enviar Encuesta', value: 'sendPoll' },
					{ name: 'Enviar Botones', value: 'sendButtons' },
					{ name: 'Enviar Vista Previa de Enlace', value: 'sendLinkPreview'},
				],
				default: 'sendText',
			},
			{
				displayName: 'Operación',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['chats'] } },
				options: [
					{ name: 'Obtener Mensajes de Chat', value: 'getMessages' },
					{ name: 'Empezar a Escribir', value: 'startTyping' },
					{ name: 'Dejar de Escribir', value: 'stopTyping' },
				],
				default: 'getMessages',
			},
			{
				displayName: 'Operación',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['sessions'] } },
				options: [
					{ name: 'Obtener Información de Sesión', value: 'getSessionInfo' },
					{ name: 'Cerrar Sesión (Logout)', value: 'logoutSession' },
				],
				default: 'getSessionInfo',
			},

			// --------------------------------------------------------------------------
			// -- PARÁMETROS CON PLANTILLAS JSON (AJUSTADAS)
			// --------------------------------------------------------------------------

			{
				displayName: 'Parámetros de la Petición', name: 'sendTextParams', type: 'json',
				displayOptions: { show: { operation: ['sendText'] } },
				default: '{\n  "chatId": "NUMERO@c.us",\n  "text": "¡Hola desde el nodo de Expertos en IA!"\n}',
			},
			{
				displayName: 'Parámetros de la Petición', name: 'mediaParams', type: 'json',
				displayOptions: { show: { operation: ['sendImage', 'sendFile', 'sendVideo', 'sendVoice'] } },
				default: '{\n  "chatId": "NUMERO@c.us",\n  "file": {\n    "url": "https://i.imgur.com/TuFp7z2.jpeg"\n  },\n  "caption": "¡Mira esta imagen!"\n}',
			},
			{
				displayName: 'Parámetros de la Petición', name: 'locationParams', type: 'json',
				displayOptions: { show: { operation: ['sendLocation'] } },
				default: '{\n  "chatId": "NUMERO@c.us",\n  "latitude": 19.4326,\n  "longitude": -99.1332,\n  "title": "Zócalo CDMX"\n}',
			},
			{
				displayName: 'Parámetros de la Petición', name: 'vCardParams', type: 'json',
				displayOptions: { show: { operation: ['sendContactVcard'] } },
				default: '{\n  "chatId": "NUMERO@c.us",\n  "contacts": [\n    {\n      "vcard": "BEGIN:VCARD\\nVERSION:3.0\\nFN:Nombre\\nTEL;TYPE=CELL:+5210000000000\\nEND:VCARD"\n    }\n  ]\n}',
			},
			{
				displayName: 'Parámetros de la Petición', name: 'reactionParams', type: 'json',
				displayOptions: { show: { operation: ['reaction'] } },
				default: '{\n  "messageId": "true_NUMERO@c.us_ABCDEF12345",\n  "reaction": "???"\n}',
			},
			{
				displayName: 'Parámetros de la Petición', name: 'pollParams', type: 'json',
				displayOptions: { show: { operation: ['sendPoll'] } },
				default: '{\n  "chatId": "NUMERO@c.us",\n  "poll": {\n    "name": "¿Cuál es tu lenguaje favorito?",\n    "options": ["Javascript", "Python", "A la verga"],\n    "multipleAnswers": false\n  }\n}',
			},
			{
				displayName: 'Parámetros de la Petición', name: 'buttonsParams', type: 'json',
				displayOptions: { show: { operation: ['sendButtons'] } },
				default: '{\n  "chatId": "NUMERO@c.us",\n  "body": "Este es el cuerpo del mensaje.",\n  "buttons": [\n    { "id": "btn1", "text": "Botón 1" },\n    { "id": "btn2", "text": "Botón 2" }\n  ],\n  "footer": "Pie de página"\n}',
			},
			{
				displayName: 'Parámetros de la Petición', name: 'linkPreviewParams', type: 'json',
				displayOptions: { show: { operation: ['sendLinkPreview'] } },
				default: '{\n  "chatId": "NUMERO@c.us",\n  "url": "https://expertosenia.com",\n  "title": "Expertos en IA"\n}',
			},
			{
				displayName: 'Parámetros de la Petición', name: 'getMessagesParams', type: 'json',
				displayOptions: { show: { operation: ['getMessages'] } },
				default: '{\n  "chatId": "NUMERO@c.us",\n  "limit": 100\n}',
			},
			{
				displayName: 'Parámetros de la Petición', name: 'typingParams', type: 'json',
				displayOptions: { show: { operation: ['startTyping', 'stopTyping'] } },
				default: '{\n  "chatId": "NUMERO@c.us"\n}',
			},
			{
				displayName: 'Parámetros de la Petición', name: 'sessionParams', type: 'json',
				displayOptions: { show: { resource: ['sessions'] } },
				default: '{\n  "name": "nombre_sesion"\n}',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const returnData: INodeExecutionData[] = [];
		const items = this.getInputData();
		const credentials = await this.getCredentials('apiExpertosIaApi');
		const apiKey = credentials.apiKey as string;

		for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
			try {
				const resource = this.getNodeParameter('resource', itemIndex, '') as string;
				const operation = this.getNodeParameter('operation', itemIndex, '') as string;

				let endpoint = '';
				let method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'POST';
				let requestBody: any = {};

				const paramMap: {[key: string]: string} = {
					sendText: 'sendTextParams', sendImage: 'mediaParams', sendFile: 'mediaParams',
					sendVideo: 'mediaParams', sendVoice: 'mediaParams', sendLocation: 'locationParams',
					sendContactVcard: 'vCardParams', reaction: 'reactionParams', sendPoll: 'pollParams',
					sendButtons: 'buttonsParams', getMessages: 'getMessagesParams', startTyping: 'typingParams',
					stopTyping: 'typingParams', getSessionInfo: 'sessionParams', logoutSession: 'sessionParams',
					sendLinkPreview: 'linkPreviewParams',
				};

				const paramName = paramMap[operation];
				if (paramName) {
					const paramsRaw = this.getNodeParameter(paramName, itemIndex, '{}') as string;
					try {
						requestBody = JSON.parse(paramsRaw);
					} catch (e: unknown) {
						if (e instanceof Error) {
							throw new NodeOperationError(this.getNode(), `JSON en Parámetros no es válido: ${e.message}`, { itemIndex });
						}
						throw new NodeOperationError(this.getNode(), `JSON en Parámetros no es válido`, { itemIndex });
					}
				}

				const buildUrl = (...parts: string[]) => parts.join('/');

				if (resource === 'messaging') {
					method = operation === 'reaction' ? 'PUT' : 'POST';
					endpoint = buildUrl('api', operation);

				} else if (resource === 'chats') {
					if (operation === 'getMessages') {
						method = 'GET';
						endpoint = buildUrl('api', 'messages');
					} else {
						const { chatId } = requestBody;
						if (!chatId) throw new NodeOperationError(this.getNode(), 'El "chatId" es requerido en el JSON.');
						endpoint = buildUrl('api', operation);
					}
				} else if (resource === 'sessions') {
					const { name: sessionName } = requestBody;
					if (!sessionName) throw new NodeOperationError(this.getNode(), 'El campo "name" es requerido en el JSON.');

					if (operation === 'getSessionInfo') {
						method = 'GET';
						endpoint = buildUrl('api', 'sessions', sessionName);
					} else {
						endpoint = buildUrl('api', 'sessions', sessionName, 'logout');
					}
				}

				if (!endpoint) throw new NodeOperationError(this.getNode(), 'Operación no válida.');

				const options = {
					method,
					url: `https://api.expertosenia.com/${endpoint}`,
					headers: { 'Content-Type': 'application/json', 'ex-ia-api': apiKey },
					data: (method !== 'GET' && Object.keys(requestBody).length > 0) ? requestBody : undefined,
					qs: (method === 'GET' && Object.keys(requestBody).length > 0) ? requestBody : undefined,
					json: true,
				};

				const response = await this.helpers.httpRequest(options);
				returnData.push({ json: response, pairedItem: { item: itemIndex } });

			} catch (error: unknown) {
				if (this.continueOnFail()) {
					const errorItem: { json: { error: any }, pairedItem: { item: number } } = {
						json: {
							error: {}
						},
						pairedItem: { item: itemIndex }
					};
			
					if (error instanceof Error) {
						errorItem.json.error = {
							message: error.message,
							stack: error.stack,
							responseData: (error as any).response?.data,
						};
					} else {
						errorItem.json.error = error;
					}
					returnData.push(errorItem);
					continue;
				}
				throw error;
			}
		}
		return [this.helpers.returnJsonArray(returnData)];
	}
}