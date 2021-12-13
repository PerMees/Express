require("dotenv").config();

const DATABASE = process.env.DATABASE;
const USERNAME = process.env.USERNAME;
const PASSWORD = process.env.PASSWORD;
const HOST = process.env.HOST;
const DIALECT = process.env.DIALECT;
const PORT = process.env.PORT;

module.exports = {
  DATABASE,
  USERNAME,
  PASSWORD,
  HOST,
  DIALECT,
  PORT,
};
