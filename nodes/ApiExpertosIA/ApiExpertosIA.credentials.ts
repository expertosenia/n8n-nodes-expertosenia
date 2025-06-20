import {
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class ApiExpertosIaApi implements ICredentialType {
	name = 'apiExpertosIaApi';
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
			description: 'Pega aquí la llave personal (exApiKey) que generaste con el cerrajero.',
		},
	];
}