const { User } = require("../models");

// Controller là lớp đảm nhận vai trò xử lý logic của ứng dụng

const getUsers = async (req, res) => {
  // select tất cả user trong db
  try {
    const users = await User.findAll();

    res.status(200).send(users);
  } catch (error) {
    console.log(error);
  }
};

const createUser = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.create({ email });
    res.status(201).send(user);
  } catch (err) {
    console.log(err);
    // if (err.errors.length) {
    //   res.status(400).send({
    //     error: err.errors[0].message,
    //   });
    // }
  }
};

module.exports = {
  getUsers,
  createUser,
};
