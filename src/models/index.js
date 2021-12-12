const { Sequelize } = require("sequelize");
const createUserModel = require("./users.model");

const sequelize = new Sequelize("express", "root", "1234", {
  host: "localhost",
  dialect: "mysql",
  port: 3307,
});

const User = createUserModel(sequelize);
module.exports = { sequelize, User };
