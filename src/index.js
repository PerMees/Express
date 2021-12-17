const express = require("express");
const rootRouter = require("./routes/v1");
const cors = require("cors");
// Setup express
const app = express();
app.use(express.json());
app.use(cors());
// API v1
app.use("/api/v1", rootRouter);
app.listen(8080, () => {
  console.log("This app listening on port 8080");
});

// Setup sequelize
const { sequelize } = require("./models");
sequelize.sync({ alter: true });
