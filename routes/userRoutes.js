const express = require("express");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");

const router = express.Router();

/*
 * @route   POST /api/users/register
 * @desc    Register a new user
 * @access  Public
 */
router.post(
  "/register",
  asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      res.status(400);
      throw new Error("Please provide all required fields");
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400);
      throw new Error("User already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully!" });
  })
);

module.exports = router;

