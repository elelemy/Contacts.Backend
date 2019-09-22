'use strict';

const Joi = require('@hapi/joi');
const ContactHandler = require('../Handlers/ContactHandler');

module.exports = [
	{
		method: 'GET',
		path: '/api/Contact/GetContacts',
		options: {
			auth: false,
			handler: ContactHandler.GetContacts,
			description: 'Get All Contacts',
			tags: ['api', 'Contact']
		}
	},
	{
		method: 'POST',
		path: '/api/Contact/SaveContact',
		options: {
			auth: false,
			handler: ContactHandler.SaveContact,
			description: 'Save Contact',
			tags: ['api', 'Contact'],
			validate: {
				payload: {
					Id: Joi.number().required(),
					Name: Joi.string().required(),
					Email: Joi.string()
				}
			}
		}
	},
	{
		method: 'DELETE',
		path: '/api/Contact/DeleteContact/{contactId}',
		options: {
			auth: false,
			handler: ContactHandler.DeleteContact,
			description: 'Delete Contact',
			tags: ['api', 'Contact'],
			validate: {
				params: {
					contactId: Joi.number().required()
				}
			}
		}
	}
];
