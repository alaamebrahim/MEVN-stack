'use strict';
const DataTypes = require("sequelize");
const sequelize = require("../../dbConnection");


export default class Role extends DataTypes.Model {}
Role.init({
    name: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
}, {
    sequelize,
    modelName: 'roles',
    tableName: 'roles'
});
