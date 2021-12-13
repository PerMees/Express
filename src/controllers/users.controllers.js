const { User } = require("../models");
const { ReS, ReE } = require("../utils/response");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: {
        exclude: ["password"],
      },
    });
    ReS(res, users, 200);
  } catch (error) {
    throw error;
  }
};
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!Number(id)) {
      console.log(id);
      return ReE(res, "User id is invalid", 400);
    }
    const user = await User.findOne({ where: { id } });
    if (user) {
      ReS(res, user, 200);
    } else {
      ReE(res, "User not found", 404);
    }
  } catch (error) {
    throw error;
  }
};
const createUser = async (req, res) => {
  try {
    const isUser = await User.findOne({ where: { email: req.body.email } });
    if (isUser) {
      ReE(res, "Email already exists", 400);
    }
    const user = await User.create(req.body);
    ReS(res, user, 201);
  } catch (error) {
    throw error;
  }
};
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userUpdate = req.body;
    const user = await User.findOne({ where: { id } });
    if (user) {
      await User.update(userUpdate, { where: { id } });
      ReS(res, userUpdate, 200);
    } else {
      ReE(res, "User not found", 404);
    }
  } catch (error) {
    throw error;
  }
};
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!Number(id)) {
      console.log(id);
      return ReE(res, "User id is invalid", 400);
    }
    const user = await User.findOne({ where: { id } });
    if (user) {
      await User.destroy({ where: { id } });
      ReS(res, "User deleted", 200);
    } else {
      ReE(res, "User not found", 404);
    }
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
