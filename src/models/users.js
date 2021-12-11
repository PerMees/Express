const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class User extends Model {}

  User.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "first_name", // field để truy xuất database
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "last_name",
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false, // Không được null
        unique: true, // Không được trùng lặp
        validate: {
          isEmail: {
            msg: "Email không đúng định dạng",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "users", // Tên table
      timestamps: false, // Bỏ qua createdAt, updatedAt
    }
  );

  return User;
};
