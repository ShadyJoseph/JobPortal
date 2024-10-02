const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
  // Create a copy of the error object and make sure we capture all its properties
  let error = { ...err };
  error.message = err.message;

  // Log the error details for debugging in development
  console.error(`Error: ${err.message}`, err);

  // Mongoose bad ObjectId error (CastError)
  if (err.name === "CastError") {
    const message = `Resource not found with ID: ${err.value}`;
    error = new ErrorResponse(message, 404);
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const message = "Duplicate field value entered";
    error = new ErrorResponse(message, 400);
  }

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map(val => val.message).join(", ");
    error = new ErrorResponse(message, 400);
  }

  // Mongoose document not found error
  if (err.name === "DocumentNotFoundError") {
    const message = `Document not found`;
    error = new ErrorResponse(message, 404);
  }

  // Handle other potential errors
  const statusCode = error.statusCode || 500;
  const message = error.message || "Server Error";

  res.status(statusCode).json({
    success: false,
    error: message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};

module.exports = errorHandler;
