// ==========================
// Not Found Middleware
// ==========================
// This middleware catches all requests to undefined routes.
// It creates a new error and passes it to the error handler.
const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404); // Set HTTP status to 404 (Not Found)
    next(error);     // Pass error to the next middleware (the error handler)
  };
  
  // ==========================
  // Global Error Handler
  // ==========================
  // This middleware handles all errors passed via next(error).
  // It sends back a JSON response with the error message and stack trace (only in dev).
  const errorHandler = (err, req, res, next) => {
    // If response status hasn't been set, default to 500 (Internal Server Error)
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  
    res.status(statusCode).json({
      message: err.message, // Send error message
      stack: process.env.NODE_ENV === 'production' 
        ? '🥞 Stack trace hidden in production' 
        : err.stack, // Include stack trace only in development
    });
  };
  
  // Export both middlewares
  module.exports = {
    notFound,
    errorHandler,
  };
  