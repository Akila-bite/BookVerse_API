const { protect } = require("../middleware/authMiddleware");
const express = require("express");
const bcryptjs = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const generateToken = require("../jwt/generateToken");

const router = express.Router();

// @route   GET /api/users
// @desc    Get all users
// @access  Public
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const users = await User.find();
    res.json(users);
  })
);

// @route   GET /api/users/:id
// @desc    Get a specific user by ID
// @access  Private
router.get(
  "/:id",
  protect,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    res.json(user);
  })
);

// Register, Login, Update, and Delete routes as before...

module.exports = router;





