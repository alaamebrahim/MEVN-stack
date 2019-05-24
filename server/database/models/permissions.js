'use strict';
import roles from "./roles";
import rolePermissions from "./rolepermissions";

const DataTypes = require("sequelize");
const sequelize = require("../../dbConnection");


export default class permissions extends DataTypes.Model {
}
permissions.init({
    display_name: DataTypes.STRING,
    key: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
}, {
    sequelize,
    tableName: 'permissions'
});

roles.belongsToMany(permissions, { through: rolePermissions, foreignKey: 'roleId'});
permissions.belongsToMany(roles, {through: rolePermissions, foreignKey: 'permissionId'});

// permissions.sync({ force: true });
// roles.sync({ force: true });
// rolePermissions.sync({ force: true });
