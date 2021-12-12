const { User } = require("../models");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).send(users);
  } catch (error) {
    throw error;
  }
};
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ where: { id } });
    if (user) {
      res.status(200).send(user);
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    throw error;
  }
};
const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).send(user);
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
      res.status(200).send("User " + id + " updated");
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    throw error;
  }
};
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ where: { id } });
    if (user) {
      await User.destroy({ where: { id } });
      res.status(200).send("User " + id + " deleted");
    } else {
      res.status(404).send("User not found");
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
