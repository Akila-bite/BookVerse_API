const { protect } = require("../middleware/authMiddleware");
const express = require("express");
const bcryptjs = require("bcryptjs");
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

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400);
      throw new Error("User already exists");
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    const token = generateToken(savedUser._id);

    res.status(201).json({
      message: "User registered successfully!",
      token,
    });
  })
);

/*
 * @route   POST /api/users/login
 * @desc    Authenticate user & get token
 * @access  Public
 */
router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400);
      throw new Error("Please enter both email and password");
    }

    const user = await User.findOne({ email });

    if (user && (await bcryptjs.compare(password, user.password))) {
      res.status(200).json({
        message: "Login successful",
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
        },
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error("Invalid email or password");
    }
  })
);

/*
 * @route   PUT /api/users/:id
 * @desc    Update user info
 * @access  Private (auth middleware needed)
 */
router.put(
  "/:id",
  protect,
  asyncHandler(async (req, res) => {
    if (req.user._id.toString() !== req.params.id) {
      res.status(403);
      throw new Error("You can only update your own profile");
    }

    const updates = {
      username: req.body.username,
      email: req.body.email,
    };

    // Optional: Update password if provided
    if (req.body.password) {
      const salt = await bcryptjs.genSalt(10);
      updates.password = await bcryptjs.hash(req.body.password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });

    res.json({
      message: "Profile updated successfully",
      user: {
        _id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
      },
    });
  })
);


router.delete(
  "/:id",
  protect,
  asyncHandler(async (req, res) => {
    if (req.user._id.toString() !== req.params.id) {
      res.status(403);
      throw new Error("You can only delete your own profile");
    }

    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    await user.deleteOne();

    res.json({ message: "User deleted successfully" });
  })
);


module.exports = router;




