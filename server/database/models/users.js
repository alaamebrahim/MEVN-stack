"use strict";
const DataTypes = require("sequelize");
const connection = require("../../dbConnection");

module.exports = () => {
    const User = connection.define(
        "users",
        {
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            roleId: DataTypes.INTEGER,
            isActive: DataTypes.INTEGER,
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE,
        },
        {}
    );
    User.associate = function(models) {
        // associations can be defined here
    };
    return User;
};
