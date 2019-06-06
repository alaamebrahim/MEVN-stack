"use strict";
import roles from "./roles";

const DataTypes = require("sequelize");
const sequelize = require("../../dbConnection");

export default class users extends DataTypes.Model {}

users.init(
  {
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
        notEmpty: true
      }
    },
    password: DataTypes.STRING,
    roleId: DataTypes.INTEGER,
    isActive: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  },
  {
    sequelize,
    tableName: "users",
    defaultScope: {
      attributes: {
        exclude: ["password"]
      }
    },
    scopes: {
      withPassword: {
        attributes: {
          include: ["password"]
        }
      }
    },
    validate: {
      usernameExists() {
        let exists = false;
        users
          .findOne({
            where: {
              name: this.name
            }
          })
          .then(user => {
            if (user !== null) throw new Error("username already taken");
          });

        users
          .findOne({
            where: {
              email: this.email
            }
          })
          .then(user => {
            if (user !== null) throw new Error("email already exists");
          });
      }
    }
  }
);

users.belongsTo(roles, {
  foreignKey: "roleId"
});
