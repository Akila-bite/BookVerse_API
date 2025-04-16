const express = require("express");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const generateToken = require("../jwt/generateToken");

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

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400);
      throw new Error("User already exists");
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save new user to the database
    const savedUser = await newUser.save();

    // Generate JWT token
    const token = generateToken(savedUser._id);

    // Send the token and success message in the response
    res.status(201).json({
      message: "User registered successfully!",
      token,
    });
  })
);

module.exports = router;


