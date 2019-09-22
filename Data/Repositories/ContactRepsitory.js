'use strict';
const ContactRepository = module.exports = {};
const db = require('../Db');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

ContactRepository.GetContacts = async function () {
    let result = await db.Contact.findAll();
    return result.map(c => c.toJSON());
};

ContactRepository.CreateContact = async function (Contact) {
    let result = await db.Contact.create(Contact);
    result = result.get();
    return result;
};

ContactRepository.UpdateContact = async function (Contact) {
    let result = await db.Contact.update(Contact, { where: { Id: Contact.Id } });
    return result;
};

ContactRepository.DeleteContact = async function (id) {
    let result = await db.Contact.destroy({ where: { Id: id } });
    return result;
};