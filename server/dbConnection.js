const dbInfo = require("./config/db");
const Sequelize = require("sequelize");

// Option 1: Passing parameters separately
const connection = new Sequelize(
  dbInfo.database,
  dbInfo.user,
  dbInfo.password,
  {
    host: dbInfo.host,
    dialect: dbInfo.type
  }
);

module.exports = connection;
