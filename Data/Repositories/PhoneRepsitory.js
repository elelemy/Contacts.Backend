'use strict';
const PhoneRepository = module.exports = {};
const db = require('../Db');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

PhoneRepository.GetPhones = async function (contactId) {
    let result = await db.Phone.findAll(
        {
            where: { ContactId: contactId }
        }
    );
    return result.map(c => c.toJSON());
};

PhoneRepository.AddPhone = async function (phone) {
    await db.Phone.create(phone);
};

PhoneRepository.EditPhone = async function (phone) {
    await db.Phone.update(phone, { where: { Id: phone.Id } });
};

PhoneRepository.RemovePhone = async function (phoneId) {
    await db.Phone.destroy({ where: { Id: phoneId } });
};