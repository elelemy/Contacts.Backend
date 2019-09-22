/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('Phone', {
        Id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        Label: {
            type: DataTypes.STRING(32),
            allowNull: false,
            defaultValue: ''
        },
        Phone: {
            type: DataTypes.STRING(32),
            allowNull: false
        },
        ContactId: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        }
    }, {
            tableName: 'phone'
        });
};
