const express = require("express");
const userRouter = express.Router();
const userController = require("../../controllers/users.controllers");
const { authenticate, authorize } = require("../../middleware/authentication");
userRouter.get(
  "/",
  authenticate,
  authorize("Admin"),
  userController.getAllUsers
);
userRouter.get(
  "/:id",
  authenticate,
  authorize("Admin"),
  userController.getUserById
);
userRouter.post(
  "/",
  //   authenticate,
  //   authorize("Admin"),
  userController.createUser
);
userRouter.put(
  "/:id",
  authenticate,
  authorize("Admin"),
  userController.updateUser
);
userRouter.delete(
  "/:id",
  authenticate,
  authorize("Admin"),
  userController.deleteUser
);

module.exports = userRouter;
