const { DataTypes } = require("sequelize");
const createUserModel = (sequelize) => {
  return sequelize.define(
    "users",
    {
      firstName: {
        type: DataTypes.STRING,
        field: "first_name",
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        field: "last_name",
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "users",
      timestamps: false,
    }
  );
};

module.exports = createUserModel;
