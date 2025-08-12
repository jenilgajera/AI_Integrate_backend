const userModel = require("../models/user.model");
const jwtService = require("../services/jwt.service");
const bcrypt = require("bcrypt");
const userController = {
  registerUser: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Email and password are required" });
      }
      if (email) {
        const checkexits = await userModel.findOne({ email });
        if (!checkexits) {
          const hashedPassword = await bcrypt.hash(password, 10);

          const newUser = await userModel.create({
            email,
            password: hashedPassword,
          });
          res
            .status(201)
            .json({ message: "User created successfully", payload: newUser });
        } else {
          res.status(409).json({ message: "user conflict" });
        }
      }
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  },

  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Email and password are required" });
      }

      const user = await userModel.findOne({
        email,
      });
      const ismatch = await bcrypt.compare(password, user.password);
      if (!ismatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      const token = jwtService.generateToken({
        email: user.email,
        id: user._id,
      });
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
      res.cookie("token", token);
      res.status(200).json({
        message: "User logged in successfully",
        user: { email },
      });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

module.exports = userController;
