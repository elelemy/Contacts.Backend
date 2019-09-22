'use strict';

const db = {};
const config = require('../Config');
const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');

const sequelize = new Sequelize(config.DbName, config.DbUsername, config.DbPassword, {
	host: config.DbHost,
	dialect: 'mysql',
	operatorsAliases: false,
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000
	},
	logging: false,
	define: {
		timestamps: false
	}
});

const modelsPath = path.join(__dirname, 'Models');

fs
	.readdirSync(modelsPath)
	.filter(file => {
		return (file.indexOf('.') !== 0) && (file.slice(-3) === '.js');
	})
	.forEach(file => {
		var model = sequelize['import'](path.join(modelsPath, file));
		db[model.name] = model;
	});

// Object.keys(db).forEach(modelName => {
// 	if (db[modelName].associate) {
// 		db[modelName].associate(db);
// 	}
// });

// const Associations = require('./Associations')(db);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
