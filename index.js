// Import required modules
require("dotenv").config();   //environment variables from .env file
const express = require("express"); 
const mongoose = require("mongoose"); 

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000; 

// Middleware to parse incoming JSON data
app.use(express.json());

// Connect to MongoDB Atlas using Mongoose
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Atlas connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

//basic route to check if the API is running
app.get("/", (req, res) => {
  res.send("📚 Welcome to the BookVerse API!");
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
