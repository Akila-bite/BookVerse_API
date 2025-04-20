// Import required modules
require("dotenv").config();              
const express = require("express");
const connectDB = require("./database"); // MongoDB connection
const userRoutes = require("./routes/userRoutes");
const booksRoutes = require("./routes/booksRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes")
const { notFound, errorHandler } = require("./middleware/errorHandler"); 

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse incoming JSON
app.use(express.json());

// Connect to MongoDB Atlas
connectDB();

// Test route
app.get("/", (req, res) => {
  res.send("📚 Welcome to the BookVerse API!");
});

// Register routes
app.use("/api/users", userRoutes);
app.use("/api/books", booksRoutes);
app.use("/api/users", wishlistRoutes);

// Handle unknown routes
app.use(notFound); 

// Global error handler
app.use(errorHandler); 

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
