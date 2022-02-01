const asyncHandler = require("express-async-handler");
const Users = require("../models/userModel");
const generateToken = require("../utils/generateToken");

const userController = {
  register: asyncHandler(async (req, res) => {
    const { email, password, avatar, cover } = req.body;
    const user_exists = await Users.findOne({ email });

    if (!email) {
      return res.status(400).json(`Email is required`);
    }
    if (!password) {
      return res.status(400).json(`Password is required`);
    }
    if (password.length < 8) {
      return res.status(400).json(`Password less than 8 characters`);
    }

    if (!user_exists) {
      const new_user = await Users.create({ email, password });
      if (new_user) {
        res.status(201).json({
          _id: new_user._id,
          email: new_user.email,
          password: new_user.password,
          isAdmin: new_user.isAdmin,
          token: generateToken(new_user._id),
        });
        console.log(new_user);
      } else {
        res.status(400);
        throw Error(`Error has occured.`);
      }
    } else {
      res.status(400);
      throw Error(`User already exists.`);
    }
  }),

  login: asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await Users.findOne({ email });

    if (email && password) {
      if (user && (await user.matchPassword(password))) {
        res.status(200).json({
          _id: user._id,
          firstName: user.firstName,
          email: user.email,
          token: generateToken(user._id),
        });
      } else {
        res.status(400);
        throw Error(`Invalid email or password.`);
      }
    }
  }),

  getUser: asyncHandler(async (req, res) => {
    const user = await Users.findById(req.params.id).select("-password");
    // console.log("user");
    res.status(200).json({
      avatar: user.profile.avatar,
      cover: user.profile.cover,
      firstName: user.firstName,
      lastName: user.lastName,
      gender: user.gender,
      company: user.profile.company.companyName,
      position: user.profile.company.jobPosition,
      location: user.profile.address.city,
      country: user.profile.address.country,
    });
  }),

  users: asyncHandler(async (req, res) => {
    const users = await Users.find();
    res.status(200).json(users);
  }),

  friends: asyncHandler(async (req, res) => {
    const { friendsId } = req.body;
    // console.log(friendsId);
    const allFriends = await Users.find({
      $or: [{ _id: friendsId }],
    });
    // console.log(allFriends);
    res.status(200).json(allFriends);
  }),

  others: asyncHandler(async (req, res) => {
    const { id, friendsId } = req.body._DATA;
    // console.log("HERE ", friendsId);
    const others = await Users.find({
      $nor: [{ _id: id }, { _id: friendsId }],
    });
    // console.log(others);
    res.status(200).json(others);
  }),

  updateUser: asyncHandler(async (req, res) => {
    const user = await Users.findByIdAndUpdate(req.params.id, req.body).select(
      "-password"
    );
    // console.log(user);
    res.status(200).json(user);
  }),

  removeUser: asyncHandler(async (req, res) => {}),
};

module.exports = userController;
