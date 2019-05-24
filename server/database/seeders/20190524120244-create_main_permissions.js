'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
        "permissions",
        [
          {
            display_name: 'View admin',
            key: 'view_admin',
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            display_name: 'View users',
            key: 'view_users',
            createdAt: new Date(),
            updatedAt: new Date()
          },
        ],
        {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('permissions', null, {});
  }
};
