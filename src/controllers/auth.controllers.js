const bcrypt = require("bcrypt");
const { User } = require("../models");
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({
        message: "Invalid email or password",
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      user.password = password;
      return res.status(200).json({
        message: "Login success",
        id: user.id, // It will change to send a token to user
      });
    }
    return res.status(401).json({
      message: "Invalid email or password",
    });
  } catch (error) {
    throw error;
  }
};
const register = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;
    const isUser = await User.findOne({ where: { email } });
    if (isUser) {
      return res.status(409).json({
        message: "Email already exists",
      });
    }
    const hashedPassword = await bcrypt.hashSync(password, 12);
    const user = { firstName, lastName, email, password: hashedPassword };
    await User.create(user);
    return res.status(201).json({
      message: "User created successfully",
    });
  } catch (error) {
    throw error;
  }
};
module.exports = { login, register };
