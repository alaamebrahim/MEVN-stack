"use strict";
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("users", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            email: {
                type: Sequelize.STRING,
                unique: true,
                validate: {
                    isEmail: true
                }
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false
            },
            roleId: {
                type: Sequelize.INTEGER,
                defaultValue: 1,
                allowNull: false
            },
            isActive: {
                type: Sequelize.INTEGER,
                defaultValue: 1,
                allowNull: false
            },
            // Timestamps
            createdAt: Sequelize.DATE,
            updatedAt: Sequelize.DATE,
        }, {
            timestamps: true
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable("users");
    }
};
