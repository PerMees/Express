const express = require("express");
const authRouter = express.Router();
const authController = require("../../controllers/auth.controllers");
const { authenticate, authorize } = require("../../middleware/authentication");
authRouter.post("/login", authController.login);
authRouter.post("/register", authController.register);
authRouter.get("/profile", authenticate, authController.profile);

module.exports = authRouter;
