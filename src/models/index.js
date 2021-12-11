const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("express", "root", "1234", {
  dialect: "mysql",
  host: "localhost",
  port: "3307",
});

const db = {};

// Khai báo các model
db.User = require("./users")(sequelize);

db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;
