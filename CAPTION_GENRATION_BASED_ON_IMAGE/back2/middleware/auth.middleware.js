const jwtService = require("../services/jwt.service");
const userModel = require("../models/user.model");

const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  console.log(token);
  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized access, please login first" });
  }

  try {
    const decode = jwtService.verifyToken(token); 
    
    const user = await userModel.findById(decode.id);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    req.user = user;
    next();
  } catch (err) {
    console.error("Token verification error:", err);
    return res
      .status(401)
      .json({ message: "Invalid token, please login again" });
  }
};

module.exports = authMiddleware;
