const jwt = require("jsonwebtoken");
const config = require("../config");
const { User } = require("../models");
const { ReE } = require("../utils/response");

const extractTokenFromHeaderString = (token = "") => {
  if (token === "") return [null, "Token is missing"];
  const parts = token?.split(" ");
  if (parts.length < 2 || parts[0] !== "Bearer" || parts[1] === "") {
    return [null, "Token invalid"];
  }
  return [parts[1], null];
};
const authenticate = async (req, res, next) => {
  try {
    const [token, error] = extractTokenFromHeaderString(
      req.header("Authorization")
    );
    if (error) {
      ReE(res, error, 401);
    }
    let payload = jwt.verify(token, config.SECRET_KEY);
    if (payload.exp < Date.now() / 1000) {
      ReE(res, "Token is expired", 401);
    }
    const { id } = payload;
    const user = await User.findByPk(id);
    req.user = user;
    next();
  } catch (error) {
    throw error;
  }
};
const authorize =
  (...allowRoles) =>
  (req, res, next) => {
    const { role } = req.user;

    // const isAllow = allowRoles.some((item) => item === role);
    const isAllow = allowRoles.includes(role);

    if (!isAllow) return ReE(res, "Method Not Allowed", 405);
    else next();
  };
module.exports = { authenticate, authorize };
