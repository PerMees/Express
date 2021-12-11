const express = require("express");
const userRouter = require("./users.routes");

// url: api/v1
const rootRouter = express.Router();

// Khai báo userRouter
rootRouter.use("/users", userRouter);

module.exports = rootRouter;
