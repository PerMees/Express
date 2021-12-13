const { Sequelize } = require("sequelize");
const createUserModel = require("./users.model");
const {
  DATABASE,
  USERNAME,
  PASSWORD,
  HOST,
  DIALECT,
  PORT,
} = require("../config");
const sequelize = new Sequelize(DATABASE, USERNAME, PASSWORD, {
  host: HOST,
  dialect: DIALECT,
  port: PORT,
});

const User = createUserModel(sequelize);
module.exports = { sequelize, User };
