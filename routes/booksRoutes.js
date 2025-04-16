const express = require('express');
const router = express.Router();
const Book = require('../models/Books');
const asyncHandler = require('express-async-handler');

// @route   POST /api/books
// @desc    Create a new book
// @access  Public (for now)
router.post(
  '/',
  asyncHandler(async (req, res) => {
    const { title, author, ISBN, genre, price, stockQuantity } = req.body;

    if (!title || !author || !ISBN || !genre || !price || !stockQuantity) {
      res.status(400);
      throw new Error('Please provide all required fields');
    }

    const book = new Book({
      title,
      author,
      ISBN,
      genre,
      price,
      stockQuantity,
    });

    const createdBook = await book.save();
    res.status(201).json(createdBook);
  })
);

// @route   GET /api/books
// @desc    Get all books (optionally filter by title, author, or genre)
// @access  Public
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const { title, author, genre } = req.query;

    const filter = {};
    if (title) filter.title = new RegExp(title, 'i');
    if (author) filter.author = new RegExp(author, 'i');
    if (genre) filter.genre = new RegExp(genre, 'i');

    const books = await Book.find(filter);
    res.json(books);
  })
);

// @route   GET /api/books/:id
// @desc    Get a single book by ID
// @access  Public
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id);
    if (!book)

