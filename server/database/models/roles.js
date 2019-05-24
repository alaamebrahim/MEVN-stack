'use strict';

const DataTypes = require("sequelize");
const sequelize = require("../../dbConnection");


export default class roles extends DataTypes.Model {}
roles.init({
    name: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
}, {
    sequelize,
    tableName: 'roles'
});
