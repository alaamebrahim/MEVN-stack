"use strict";
import Role from "./roles";

const DataTypes = require("sequelize");
const sequelize = require("../../dbConnection");

export default class User extends DataTypes.Model {}

User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    roleId: DataTypes.INTEGER,
    isActive: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
}, {
    sequelize,
    modelName: 'users',
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

User.belongsTo(Role, {
    foreignKey: 'roleId'
});