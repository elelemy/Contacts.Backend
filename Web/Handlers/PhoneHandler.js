const PhoneHandler = module.exports = {};
const PhoneService = require('../../Domain/Services/PhoneService');

PhoneHandler.GetPhones = async function (req, h) {
	try {
		let contactId = req.params.contactId;
		let Phones = await PhoneService.GetPhones(contactId);
		return {
			Success: true,
			Message: '',
			Data: Phones
		}
	} catch (e) {
		return {
			Success: false,
			Message: e,
			Data: {}
		}
	}
};

PhoneHandler.AddPhone = async function (req, h) {
	let Phone = {
		Label: req.payload.Label,
		Phone: req.payload.Phone,
		ContactId: req.payload.ContactId
	}
	try {
		await PhoneService.AddPhone(Phone);
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

PhoneHandler.EditPhone = async function (req, h) {
	let Phone = {
		Id: req.payload.Id,
		Label: req.payload.Label,
		Phone: req.payload.Phone
	}
	try {
		await PhoneService.EditPhone(Phone);
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

PhoneHandler.RemovePhone = async function (req, h) {
	try {
		let phoneId = req.params.phoneId;
		await PhoneService.RemovePhone(phoneId);
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