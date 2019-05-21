import { Sequelize } from "sequelize/types";

const User = Sequelize.afterDefine(
  "users",
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    role_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  {
    // Options
  }
);
