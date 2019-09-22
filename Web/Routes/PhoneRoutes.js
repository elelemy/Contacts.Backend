'use strict';

const Joi = require('@hapi/joi');
const PhoneHandler = require('../Handlers/PhoneHandler');

module.exports = [
	{
		method: 'GET',
		path: '/api/Phone/GetPhones/{contactId}',
		options: {
			auth: false,
			handler: PhoneHandler.GetPhones,
			description: 'Get All Phones',
			tags: ['api', 'Phone'],
			validate: {
				params: {
					contactId: Joi.number().required()
				}
			}
		}
	},
	{
		method: 'POST',
		path: '/api/Phone/AddPhone',
		options: {
			auth: false,
			handler: PhoneHandler.AddPhone,
			description: 'Add Phone',
			tags: ['api', 'Phone'],
			validate: {
				payload: {
					Label: Joi.string().required(),
					Phone: Joi.string().required(),
					ContactId: Joi.number().required()
				}
			}
		}
	},
	{
		method: 'POST',
		path: '/api/Phone/EditPhone',
		options: {
			auth: false,
			handler: PhoneHandler.EditPhone,
			description: 'Edit Phone',
			tags: ['api', 'Phone'],
			validate: {
				payload: {
					Id: Joi.number().required(),
					Label: Joi.string().required(),
					Phone: Joi.string().required()				}
			}
		}
	},
	{
		method: 'DELETE',
		path: '/api/Phone/RemovePhone/{phoneId}',
		options: {
			auth: false,
			handler: PhoneHandler.RemovePhone,
			description: 'Remove Phone',
			tags: ['api', 'Phone'],
			validate: {
				params: {
					phoneId: Joi.number().required()
				}
			}
		}
	}
];
