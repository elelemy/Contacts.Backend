'use strict';

const ContactService = module.exports = {};
const ContactRepsitory = require('../../Data/Repositories/ContactRepsitory');

ContactService.GetContacts = async function () {
    let result = await ContactRepsitory.GetContacts();
    return result;
};

ContactService.SaveContact = async function (contact) {
    let result;
    if (!contact.Id) {
        result = await ContactRepsitory.CreateContact(contact);
        result = { Id: result.Id };
    } else {
        result = await ContactRepsitory.UpdateContact(contact);
    }
    return result;
};

ContactService.DeleteContact = async function (Id){
 await ContactRepsitory.DeleteContact(Id);
};