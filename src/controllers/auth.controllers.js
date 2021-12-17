const bcrypt = require("bcrypt");
const { User } = require("../models");
const generateToken = require("../utils/jwt");
const { ReS, ReE } = require("../utils/response");
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return ReS(res, "Invalid email or password", 404);
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      user.password = password;
      const token = generateToken(user);
      return ReS(res, token, 200);
    }
    return ReE(res, "Invalid email or password", 401);
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
const profile = (req, res) => {
  const user = req.user;
  ReS(res, user, 200);
};
module.exports = { login, register, profile };
