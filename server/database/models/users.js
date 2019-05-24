"use strict";
import roles from "./roles";

const DataTypes = require("sequelize");
const sequelize = require("../../dbConnection");

export default class users extends DataTypes.Model {}

users.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    roleId: DataTypes.INTEGER,
    isActive: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
}, {
    sequelize,
    tableName: 'users',
    defaultScope: {
        attributes: {
            exclude: ['password']
        }
    },
    scopes: {
        withPassword: {
            attributes: {
                include: ['password']
            }
        }
    }
});

users.belongsTo(roles, {
    foreignKey: 'roleId'
});