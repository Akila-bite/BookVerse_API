// Import required modules
require("dotenv").config();   // Load environment variables
const express = require("express");
const connectDB = require("./database"); // Import database connection
const userRoutes = require("./routes/userRoutes");
const booksRoutes = require("./routes/booksRoutes");

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse incoming JSON data
app.use(express.json());

// Connect to MongoDB Atlas
connectDB();

// Basic route to check if the API is running
app.get("/", (req, res) => {
  res.send("📚 Welcome to the BookVerse API!");
});

// Use routes
app.use("/api/users", userRoutes);

app.use("/api/books", booksRoutes);

// Start the Express server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

