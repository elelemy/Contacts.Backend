/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
	return sequelize.define('Contact', {
		Id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		Name: {
			type: DataTypes.STRING(32),
			allowNull: false,
			defaultValue: ''
		},
		Email: {
			type: DataTypes.STRING(32),
			allowNull: true
		}
	}, {
			tableName: 'contact'
		});
};
