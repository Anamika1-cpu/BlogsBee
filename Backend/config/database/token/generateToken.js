const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_KEY, {
    expiresIn: process.env.JWT_TOKEN_EXPIRE,
  });
};

module.exports = generateToken;
