import dbInfo from "./config/db";
import Sequelize from "sequelize";

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
