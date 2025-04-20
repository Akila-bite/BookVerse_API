const express = require('express');
const router = express.Router();
const Book = require('../models/Books');
const asyncHandler = require('express-async-handler');

/**
 * @route   POST /api/books
 * @desc    Create a new book
 * @access  Public
 */
router.post(
  '/',
  asyncHandler(async (req, res) => {
    const { title, author, ean, genre, price, stock } = req.body;

    if (!title || !author || !ean || !genre || !price || !stock) {
      res.status(400);
      throw new Error('Please provide all required fields');
    }

    const book = new Book({ title, author, ean, genre, price, stock });
    const createdBook = await book.save();
    res.status(201).json(createdBook);
  })
);

/**
 * @route   GET /api/books
 * @desc    Get all books (with optional filters)
 * @access  Public
 */
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const { title, author, genre } = req.query;
    const filter = {};
    if (title)  filter.title  = new RegExp(title, 'i');
    if (author) filter.author = new RegExp(author, 'i');
    if (genre)  filter.genre  = new RegExp(genre, 'i');

    const books = await Book.find(filter);
    res.json(books);
  })
);

/**
 * @route   GET /api/books/:id
 * @desc    Get a single book by ID
 * @access  Public
 */
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id);
    if (!book) {
      res.status(404);
      throw new Error('Book not found');
    }
    res.json(book);
  })
);

/**
 * @route   PUT /api/books/:id
 * @desc    Update a book by ID
 * @access  Public
 */
router.put(
  '/:id',
  asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id);
    if (!book) {
      res.status(404);
      throw new Error('Book not found');
    }

    // Update only the fields provided in req.body
    const { title, author, ean, genre, price, stock } = req.body;
    if (title !== undefined)  book.title  = title;
    if (author !== undefined) book.author = author;
    if (ean !== undefined)    book.ean   = ean;
    if (genre !== undefined)  book.genre  = genre;
    if (price !== undefined)  book.price  = price;
    if (stock !== undefined)  book.stock  = stock;

    const updatedBook = await book.save();
    res.json(updatedBook);
  })
);

/**
 * @route   DELETE /api/books/:id
 * @desc    Delete a book by ID
 * @access  Public
 */
router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id);
    if (!book) {
      res.status(404);
      throw new Error('Book not found');
    }
    
    await book.deleteOne();
    res.json({ message: 'Book deleted' });
  })
);

module.exports = router;


