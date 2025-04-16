const express = require("express");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");

const router = express.Router();

/**
 * @route   GET /api/users/:userId/wishlist
 * @desc    Get the user's wishlist
 * @access  Private (should be protected with authentication)
 */
router.get(
  "/:userId/wishlist",
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.userId).populate("wishlist");
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    res.json(user.wishlist);
  })
);

/**
 * @route   POST /api/users/:userId/wishlist/:bookId
 * @desc    Add a book to the user's wishlist
 * @access  Private (should be protected with authentication)
 */
router.post(
  "/:userId/wishlist/:bookId",
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.userId);
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    if (user.wishlist.includes(req.params.bookId)) {
      res.status(400);
      throw new Error("Book already in wishlist");
    }

    user.wishlist.push(req.params.bookId);
    await user.save();

    res.json({ message: "Book added to wishlist", wishlist: user.wishlist });
  })
);

/**
 * @route   DELETE /api/users/:userId/wishlist/:bookId
 * @desc    Remove a book from the user's wishlist
 * @access  Private (should be protected with authentication)
 */
router.delete(
  "/:userId/wishlist/:bookId",
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.userId);
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    const bookId = req.params.bookId;
    const index = user.wishlist.indexOf(bookId);

    if (index === -1) {
      res.status(404);
      throw new Error("Book not in wishlist");
    }

    user.wishlist.splice(index, 1);
    await user.save();

    res.json({ message: "Book removed from wishlist", wishlist: user.wishlist });
  })
);

module.exports = router;
