const DataTypes = require("sequelize");
const sequelize = require("../../dbConnection");

export default class rolePermissions extends DataTypes.Model {}
rolePermissions.init({
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE
}, {
  sequelize
});
