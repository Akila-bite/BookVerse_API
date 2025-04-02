const express = require("express");
const User = require("../models/User");

const router = express.Router();

// Import bcrypt for password hashing
const bcrypt = require("bcrypt");

/*
 * @route   POST /api/users/register
 * @desc    Register a new user
 * @access  Public
 */
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password before storing it
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save user to the database
    await newUser.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    res.status(500).json({ error: "unable to register user" });
  }
});

/*
 * @route   GET /api/users/:userId/wishlist
 * @desc    Get the user's wishlist
 * @access  Private (should be protected with authentication)
 */
router.get("/:userId/wishlist", async (req, res) => {
  try {
    // Find user by ID and populate the wishlist with book details
    const user = await User.findById(req.params.userId).populate("wishlist");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user.wishlist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @route   POST /api/users/:userId/wishlist/:bookId
 * @desc    Add a book to the user's wishlist
 * @access  Private (should be protected with authentication)
 */
router.post("/:userId/wishlist/:bookId", async (req, res) => {
  try {
    // Find user by ID
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Check if the book is already in the wishlist
    if (user.wishlist.includes(req.params.bookId)) {
      return res.status(400).json({ message: "Book already in wishlist" });
    }

    // Add book to wishlist
    user.wishlist.push(req.params.bookId);
    await user.save();
    res.json({ message: "Book added to wishlist", wishlist: user.wishlist });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
