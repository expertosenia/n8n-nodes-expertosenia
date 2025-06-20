import {
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class ExpertosIAApi implements ICredentialType {
	name = 'expertosIAApi';
	displayName = 'API Expertos en IA';
	documentationUrl = 'https://docsapi1.expertosenia.com';
	properties: INodeProperties[] = [
		{
			displayName: 'Llave Personal (ex-ia-api)',
			name: 'apiKey',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			description: 'Pega aquí la llave personal (ex-ia-api) que generaste con el cerrajero.',
		},
		{
			displayName: 'Nombre de la Sesión',
			name: 'sessionName',
			type: 'string',
			default: 'default',
			description: 'Nombre de la sesión de WhatsApp a usar (por ejemplo: "default" o "mi-sesion")',
		},
	];
}