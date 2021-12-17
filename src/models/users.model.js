const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
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
        validate: {
          isEmail: {
            msg: "Email is invalid",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
          //? Use bcrypt to hash the password
          const hashedPassword = bcrypt.hashSync(value, 12);
          this.setDataValue("password", hashedPassword);
        },
      },
      role: {
        type: DataTypes.STRING,
        defaultValue: "User",
      },
    },
    {
      tableName: "users",
      timestamps: true,
      updatedAt: "updated_at",
      createdAt: "created_at",
    }
  );
};

module.exports = createUserModel;
