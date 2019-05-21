"use strict";
const DataTypes = require("sequelize");
const connection = require("../../dbConnection");

module.exports = () => {
  const User = connection.define(
    "users",
    {
      role_id: DataTypes.INTEGER,
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING
    },
    {}
  );
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};
