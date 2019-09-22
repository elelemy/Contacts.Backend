const ContactHandler = module.exports = {};
const ContactService = require('../../Domain/Services/ContactService');

ContactHandler.GetContacts = async function (req, h) {
	try {
		let Contacts = await ContactService.GetContacts();
		return {
			Success: true,
			Message: '',
			Data: Contacts
		}
	} catch (e) {
		return {
			Success: false,
			Message: e,
			Data: {}
		}
	}
};

ContactHandler.SaveContact = async function (req, h) {
	let contact = {
		Id: req.payload.Id,
		Name: req.payload.Name,
		Email:req.payload.Email
	}
	try {
		let result = await ContactService.SaveContact(contact);
		return {
			Success: true,
			Message: '',
			Data: result
		};
	} catch (e) {
		return {
			Success: false,
			Message: e,
			Data: {}
		}
	}
};

ContactHandler.DeleteContact = async function (req, h) {
	try {
		let contactId = req.params.contactId;
		await ContactService.DeleteContact(contactId);
		return {
			Success: true,
			Message: '',
			Data: {}
		};
	} catch (e) {
		return {
			Success: false,
			Message: e,
			Data: {}
		}
	}
};