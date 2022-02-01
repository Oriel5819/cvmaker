const asyncHandler = require("express-async-handler");
const Users = require("../models/userModel");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");

const userController = {
  register: asyncHandler(async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email) {
        return res.status(400).json(`Email is required`);
      }

      const user_exists = await Users.findOne({ email });
      if (user_exists) {
        return res.status(400).json(`User already exists`);
      }

      if (!password) {
        return res.status(400).json(`Password is required`);
      }

      if (password.length < 8) {
        return res.status(400).json(`Password less than 8 characters`);
      }

      const user = Users.create({ email, password });
      if (user) {
        res.status(201).json({
          _id: user._id,
          email: user.email,
          isAdmin: user.isAdmin,
          accessToken: generateToken(user._id),
        });
      }
    } catch (error) {
      res.status(500);
      throw Error(error.message);
    }
  }),
  login: asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (email && password) {
      const user = await Users.findOne({ email });
      if (user && (await user.matchPassword(password))) {
        return res.status(200).json({
          _id: user._id,
          email: user.email,
          isAdmin: user.isAdmin,
          accessToken: generateToken(user._id),
        });
      } else {
        return res.status(400).json(`Invalid email or password.`);
      }
    }
  }),
  update: asyncHandler(async (req, res) => {}),
  remove: asyncHandler(async (req, res) => {}),
};

module.exports = userController;
