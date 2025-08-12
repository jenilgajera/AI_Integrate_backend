require("dotenv").config();
const jwt = require("jsonwebtoken");

const jwtService = {
  generateToken: (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  },
  verifyToken: (token) => {
    return jwt.verify(token, process.env.JWT_SECRET_KEY);
  },
  decodeToken: (token) => {
    return jwt.decode(token);
  },
};

module.exports = jwtService;
