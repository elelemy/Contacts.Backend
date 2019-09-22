'use strict';

const PhoneService = module.exports = {};
const PhoneRepsitory = require('../../Data/Repositories/PhoneRepsitory');

PhoneService.GetPhones = async function (contctId) {
    let result = await PhoneRepsitory.GetPhones(contctId);
    return result;
};

PhoneService.AddPhone = async function (Phone) {
    await PhoneRepsitory.AddPhone(Phone);
};

PhoneService.EditPhone = async function (Phone) {
    await PhoneRepsitory.EditPhone(Phone);
};

PhoneService.RemovePhone = async function (Id) {
    await PhoneRepsitory.RemovePhone(Id);
};