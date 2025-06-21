import {
	IExecuteFunctions,
	INodeType,
	INodeTypeDescription,
	INodeExecutionData,
	NodeOperationError,
} from 'n8n-workflow';

export class ExpertosIA implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Expertos en IA',
		name: 'expertosIA',
		icon: 'file:ExpertosIA.svg',
		group: ['Expertos en IA'],
		version: 1,
		subtitle: '={{$parameter["resource"] + ": " + $parameter["operation"]}}',
		description: 'Nodo oficial para interactuar con la API segura de Expertos en IA',
		documentationUrl: 'https://docsapi1.expertosenia.com',
		defaults: {
			name: 'Expertos en IA',
		},
		inputs: ['main'] as any,
		outputs: ['main'] as any,
		credentials: [
			{
				name: 'expertosIAApi',
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
					{ name: 'Enviar Encuesta', value: 'sendPoll' },
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
			// -- CAMPOS PARA ENVIAR TEXTO
			// --------------------------------------------------------------------------
			{
				displayName: 'ID del Chat',
				name: 'chatId',
				type: 'string',
				displayOptions: { show: { operation: ['sendText'] } },
				default: 'NUMERO@c.us',
				required: true,
				description: 'ID del chat al que enviar el mensaje',
			},
			{
				displayName: 'Texto del Mensaje',
				name: 'text',
				type: 'string',
				displayOptions: { show: { operation: ['sendText'] } },
				default: 'Escribe aquí tu mensaje',
				required: true,
				description: 'El texto del mensaje a enviar',
			},
			{
				displayName: 'Responder a Mensaje',
				name: 'reply_to',
				type: 'string',
				displayOptions: { show: { operation: ['sendText'] } },
				default: '',
				description: 'ID del mensaje al que responder (opcional)',
			},
			{
				displayName: 'Vista Previa de Enlaces',
				name: 'linkPreview',
				type: 'boolean',
				displayOptions: { show: { operation: ['sendText'] } },
				default: true,
				description: 'Mostrar vista previa de enlaces en el mensaje',
			},
			{
				displayName: 'Vista Previa de Alta Calidad',
				name: 'linkPreviewHighQuality',
				type: 'boolean',
				displayOptions: { show: { operation: ['sendText'] } },
				default: true,
				description: 'Usar vista previa de enlaces de alta calidad',
			},


			// --------------------------------------------------------------------------
			// -- CAMPOS PARA ENVIAR IMAGEN
			// --------------------------------------------------------------------------
			{
				displayName: 'ID del Chat',
				name: 'chatId',
				type: 'string',
				displayOptions: { show: { operation: ['sendImage'] } },
				default: 'NUMERO@c.us',
				required: true,
				description: 'ID del chat al que enviar la imagen',
			},
			{
				displayName: 'URL de la Imagen',
				name: 'fileUrl',
				type: 'string',
				displayOptions: { show: { operation: ['sendImage'] } },
				default: 'https://i.imgur.com/TuFp7z2.jpeg',
				required: true,
				description: 'URL de la imagen a enviar',
			},
			{
				displayName: 'Título de la Imagen',
				name: 'caption',
				type: 'string',
				displayOptions: { show: { operation: ['sendImage'] } },
				default: 'Descripción de la imagen',
				description: 'Texto que acompaña la imagen',
			},
			{
				displayName: 'Responder a Mensaje',
				name: 'reply_to',
				type: 'string',
				displayOptions: { show: { operation: ['sendImage'] } },
				default: '',
				description: 'ID del mensaje al que responder (opcional)',
			},


			// --------------------------------------------------------------------------
			// -- CAMPOS PARA ENVIAR ARCHIVO
			// --------------------------------------------------------------------------
			{
				displayName: 'ID del Chat',
				name: 'chatId',
				type: 'string',
				displayOptions: { show: { operation: ['sendFile'] } },
				default: 'NUMERO@c.us',
				required: true,
				description: 'ID del chat al que enviar el archivo',
			},
			{
				displayName: 'URL del Archivo',
				name: 'fileUrl',
				type: 'string',
				displayOptions: { show: { operation: ['sendFile'] } },
				default: 'https://ejemplo.com/archivo.pdf',
				required: true,
				description: 'URL del archivo a enviar',
			},
			{
				displayName: 'Nombre del Archivo',
				name: 'filename',
				type: 'string',
				displayOptions: { show: { operation: ['sendFile'] } },
				default: 'documento.pdf',
				description: 'Nombre del archivo',
			},
			{
				displayName: 'Título del Archivo',
				name: 'caption',
				type: 'string',
				displayOptions: { show: { operation: ['sendFile'] } },
				default: 'Descripción del archivo',
				description: 'Texto que acompaña el archivo',
			},
			{
				displayName: 'Responder a Mensaje',
				name: 'reply_to',
				type: 'string',
				displayOptions: { show: { operation: ['sendFile'] } },
				default: '',
				description: 'ID del mensaje al que responder (opcional)',
			},


			// --------------------------------------------------------------------------
			// -- CAMPOS PARA ENVIAR VIDEO
			// --------------------------------------------------------------------------
			{
				displayName: 'ID del Chat',
				name: 'chatId',
				type: 'string',
				displayOptions: { show: { operation: ['sendVideo'] } },
				default: 'NUMERO@c.us',
				required: true,
				description: 'ID del chat al que enviar el video',
			},
			{
				displayName: 'URL del Video',
				name: 'fileUrl',
				type: 'string',
				displayOptions: { show: { operation: ['sendVideo'] } },
				default: 'https://ejemplo.com/video.mp4',
				required: true,
				description: 'URL del video a enviar',
			},
			{
				displayName: 'Título del Video',
				name: 'caption',
				type: 'string',
				displayOptions: { show: { operation: ['sendVideo'] } },
				default: 'Descripción del video',
				description: 'Texto que acompaña el video',
			},
			{
				displayName: 'Responder a Mensaje',
				name: 'reply_to',
				type: 'string',
				displayOptions: { show: { operation: ['sendVideo'] } },
				default: '',
				description: 'ID del mensaje al que responder (opcional)',
			},


			// --------------------------------------------------------------------------
			// -- CAMPOS PARA ENVIAR AUDIO (VOZ)
			// --------------------------------------------------------------------------
			{
				displayName: 'ID del Chat',
				name: 'chatId',
				type: 'string',
				displayOptions: { show: { operation: ['sendVoice'] } },
				default: 'NUMERO@c.us',
				required: true,
				description: 'ID del chat al que enviar el audio',
			},
			{
				displayName: 'URL del Audio',
				name: 'fileUrl',
				type: 'string',
				displayOptions: { show: { operation: ['sendVoice'] } },
				default: 'https://ejemplo.com/audio.mp3',
				required: true,
				description: 'URL del archivo de audio a enviar',
			},
			{
				displayName: 'Responder a Mensaje',
				name: 'reply_to',
				type: 'string',
				displayOptions: { show: { operation: ['sendVoice'] } },
				default: '',
				description: 'ID del mensaje al que responder (opcional)',
			},


			// --------------------------------------------------------------------------
			// -- CAMPOS PARA ENVIAR UBICACIÓN
			// --------------------------------------------------------------------------
			{
				displayName: 'ID del Chat',
				name: 'chatId',
				type: 'string',
				displayOptions: { show: { operation: ['sendLocation'] } },
				default: 'NUMERO@c.us',
				required: true,
				description: 'ID del chat al que enviar la ubicación',
			},
			{
				displayName: 'Latitud',
				name: 'latitude',
				type: 'number',
				displayOptions: { show: { operation: ['sendLocation'] } },
				default: 19.4326,
				required: true,
				description: 'Latitud de la ubicación',
			},
			{
				displayName: 'Longitud',
				name: 'longitude',
				type: 'number',
				displayOptions: { show: { operation: ['sendLocation'] } },
				default: -99.1332,
				required: true,
				description: 'Longitud de la ubicación',
			},
			{
				displayName: 'Título de la Ubicación',
				name: 'title',
				type: 'string',
				displayOptions: { show: { operation: ['sendLocation'] } },
				default: 'Mi ubicación',
				description: 'Título de la ubicación',
			},
			{
				displayName: 'Responder a Mensaje',
				name: 'reply_to',
				type: 'string',
				displayOptions: { show: { operation: ['sendLocation'] } },
				default: '',
				description: 'ID del mensaje al que responder (opcional)',
			},

			// --------------------------------------------------------------------------
			// -- CAMPOS PARA ENVIAR CONTACTO (VCARD)
			// --------------------------------------------------------------------------
			{
				displayName: 'ID del Chat',
				name: 'chatId',
				type: 'string',
				displayOptions: { show: { operation: ['sendContactVcard'] } },
				default: 'NUMERO@c.us',
				required: true,
				description: 'ID del chat al que enviar el contacto',
			},
			{
				displayName: 'Nombre del Contacto',
				name: 'contactName',
				type: 'string',
				displayOptions: { show: { operation: ['sendContactVcard'] } },
				default: 'Juan Pérez',
				required: true,
				description: 'Nombre completo del contacto',
			},
			{
				displayName: 'Teléfono del Contacto',
				name: 'contactPhone',
				type: 'string',
				displayOptions: { show: { operation: ['sendContactVcard'] } },
				default: '+5215512345678',
				required: true,
				description: 'Número de teléfono del contacto',
			},
			{
				displayName: 'Responder a Mensaje',
				name: 'reply_to',
				type: 'string',
				displayOptions: { show: { operation: ['sendContactVcard'] } },
				default: '',
				description: 'ID del mensaje al que responder (opcional)',
			},


			// --------------------------------------------------------------------------
			// -- CAMPOS PARA ENVIAR REACCIÓN



			// --------------------------------------------------------------------------
			// -- CAMPOS PARA ENVIAR ENCUESTA
			// --------------------------------------------------------------------------
			{
				displayName: 'ID del Chat',
				name: 'chatId',
				type: 'string',
				displayOptions: { show: { operation: ['sendPoll'] } },
				default: 'NUMERO@c.us',
				required: true,
				description: 'ID del chat al que enviar la encuesta',
			},
			{
				displayName: 'Título de la Encuesta',
				name: 'pollName',
				type: 'string',
				displayOptions: { show: { operation: ['sendPoll'] } },
				default: '¿Cuál es tu lenguaje favorito?',
				required: true,
				description: 'Pregunta o título de la encuesta',
			},
			{
				displayName: 'Opciones de la Encuesta',
				name: 'pollOptions',
				type: 'string',
				displayOptions: { show: { operation: ['sendPoll'] } },
				default: 'JavaScript,Python,TypeScript',
				required: true,
				description: 'Opciones separadas por comas',
			},
			{
				displayName: 'Múltiples Respuestas',
				name: 'multipleAnswers',
				type: 'boolean',
				displayOptions: { show: { operation: ['sendPoll'] } },
				default: false,
				description: 'Permitir seleccionar múltiples opciones',
			},
			{
				displayName: 'Responder a Mensaje',
				name: 'reply_to',
				type: 'string',
				displayOptions: { show: { operation: ['sendPoll'] } },
				default: '',
				description: 'ID del mensaje al que responder (opcional)',
			},








			// --------------------------------------------------------------------------
			// -- CAMPOS PARA OBTENER MENSAJES
			// --------------------------------------------------------------------------
			{
				displayName: 'ID del Chat',
				name: 'chatId',
				type: 'string',
				displayOptions: { show: { operation: ['getMessages'] } },
				default: 'NUMERO@c.us',
				required: true,
				description: 'ID del chat del que obtener mensajes',
			},
			{
				displayName: 'Límite de Mensajes',
				name: 'limit',
				type: 'number',
				displayOptions: { show: { operation: ['getMessages'] } },
				default: 100,
				description: 'Número máximo de mensajes a obtener',
			},


			// --------------------------------------------------------------------------
			// -- CAMPOS PARA TYPING
			// --------------------------------------------------------------------------
			{
				displayName: 'ID del Chat',
				name: 'chatId',
				type: 'string',
				displayOptions: { show: { operation: ['startTyping'] } },
				default: 'NUMERO@c.us',
				required: true,
				description: 'ID del chat donde mostrar el indicador de escritura',
			},


			// --------------------------------------------------------------------------
			// -- CAMPOS PARA SESIONES
			// --------------------------------------------------------------------------
			{
				displayName: 'Nombre de la Sesión',
				name: 'sessionName',
				type: 'string',
				displayOptions: { show: { resource: ['sessions'] } },
				default: 'default',
				required: true,
				description: 'Nombre de la sesión',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const returnData: INodeExecutionData[] = [];
		const items = this.getInputData();
		const credentials = await this.getCredentials('expertosIAApi');
		const apiKey = credentials.apiKey as string;
		const sessionName = credentials.sessionName as string || 'default';

		for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
			try {
				const resource = this.getNodeParameter('resource', itemIndex, '') as string;
				const operation = this.getNodeParameter('operation', itemIndex, '') as string;

				let endpoint = '';
				let method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'POST';
				let requestBody: any = {};

				if (resource === 'messaging') {
					method = 'POST';
					endpoint = `api/${operation}`;

					if (operation === 'sendText') {
						const reply_to = this.getNodeParameter('reply_to', itemIndex, '') as string;
						requestBody = {
							chatId: this.getNodeParameter('chatId', itemIndex, '') as string,
							text: this.getNodeParameter('text', itemIndex, '') as string,
							reply_to: reply_to || null,
							linkPreview: this.getNodeParameter('linkPreview', itemIndex, true) as boolean,
							linkPreviewHighQuality: this.getNodeParameter('linkPreviewHighQuality', itemIndex, true) as boolean,
							session: sessionName,
						};
					} else if (['sendImage', 'sendFile', 'sendVideo', 'sendVoice'].includes(operation)) {
						requestBody = {
							chatId: this.getNodeParameter('chatId', itemIndex, '') as string,
							file: {
								url: this.getNodeParameter('fileUrl', itemIndex, '') as string,
							},
							session: sessionName,
						};
						
						// Agregar campos opcionales solo si tienen valor
						const caption = this.getNodeParameter('caption', itemIndex, '') as string;
						if (caption) {
							requestBody.caption = caption;
						}
						
						const reply_to = this.getNodeParameter('reply_to', itemIndex, '') as string;
						if (reply_to) {
							requestBody.reply_to = reply_to;
						} else {
							requestBody.reply_to = null;
						}
						
						if (operation === 'sendFile') {
							const filename = this.getNodeParameter('filename', itemIndex, '') as string;
							if (filename) {
								requestBody.filename = filename;
							}
						}
					} else if (operation === 'sendLocation') {
						requestBody = {
							chatId: this.getNodeParameter('chatId', itemIndex, '') as string,
							latitude: this.getNodeParameter('latitude', itemIndex, 0) as number,
							longitude: this.getNodeParameter('longitude', itemIndex, 0) as number,
							title: this.getNodeParameter('title', itemIndex, '') as string,
							reply_to: this.getNodeParameter('reply_to', itemIndex, '') as string || null,
							session: sessionName,
						};
					} else if (operation === 'sendContactVcard') {
						const contactName = this.getNodeParameter('contactName', itemIndex, '') as string;
						const contactPhone = this.getNodeParameter('contactPhone', itemIndex, '') as string;
						const vcard = `BEGIN:VCARD\nVERSION:3.0\nFN:${contactName}\nTEL;TYPE=CELL:${contactPhone}\nEND:VCARD`;
						requestBody = {
							chatId: this.getNodeParameter('chatId', itemIndex, '') as string,
							contacts: [{ vcard }],
							reply_to: this.getNodeParameter('reply_to', itemIndex, '') as string || null,
							session: sessionName,
						};

					} else if (operation === 'sendPoll') {
						const pollOptions = this.getNodeParameter('pollOptions', itemIndex, '') as string;
						const optionsArray = pollOptions.split(',').map(opt => opt.trim());
						requestBody = {
							chatId: this.getNodeParameter('chatId', itemIndex, '') as string,
							poll: {
								name: this.getNodeParameter('pollName', itemIndex, '') as string,
								options: optionsArray,
								multipleAnswers: this.getNodeParameter('multipleAnswers', itemIndex, false) as boolean,
							},
							reply_to: this.getNodeParameter('reply_to', itemIndex, '') as string || null,
							session: sessionName,
						};

					}
				} else if (resource === 'chats') {
					if (operation === 'getMessages') {
						method = 'GET';
						endpoint = 'api/messages';
						requestBody = {
							chatId: this.getNodeParameter('chatId', itemIndex, '') as string,
							limit: this.getNodeParameter('limit', itemIndex, 100) as number,
							session: sessionName,
						};
					} else if (operation === 'startTyping') {
						endpoint = `api/${operation}`;
						requestBody = {
							chatId: this.getNodeParameter('chatId', itemIndex, '') as string,
							session: sessionName,
						};
					}
				} else if (resource === 'sessions') {
					const sessionParam = this.getNodeParameter('sessionName', itemIndex, '') as string;
					if (operation === 'getSessionInfo') {
						method = 'GET';
						endpoint = `api/sessions/${sessionParam}`;
					} else {
						endpoint = `api/sessions/${sessionParam}/logout`;
					}
				}

				if (!endpoint) {
					throw new NodeOperationError(this.getNode(), 'Operación no válida.');
				}

				// Limpiar campos vacíos del requestBody
				if ('reply_to' in requestBody && requestBody.reply_to === '') {
					requestBody.reply_to = null;
				}
				if ('caption' in requestBody && requestBody.caption === '') {
					delete requestBody.caption;
				}
				if ('footer' in requestBody && requestBody.footer === '') {
					delete requestBody.footer;
				}
				if ('filename' in requestBody && requestBody.filename === '') {
					delete requestBody.filename;
				}

				const options = {
					method,
					url: `https://api.expertosenia.com/${endpoint}`,
					headers: { 
						'Content-Type': 'application/json', 
						'ex-ia-api': apiKey 
					},
					body: (method !== 'GET' && Object.keys(requestBody).length > 0) ? requestBody : undefined,
					qs: (method === 'GET' && Object.keys(requestBody).length > 0) ? requestBody : undefined,
					json: true,
				};

				const response = await this.helpers.httpRequest(options);
				returnData.push({ json: response, pairedItem: { item: itemIndex } });

			} catch (error) {
				if (this.continueOnFail()) {
					const errorItem = {
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