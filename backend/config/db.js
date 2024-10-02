const mongoose = require("mongoose");
const logger = require("../utils/logger");
const ErrorResponse = require("../utils/errorResponse");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    logger.info("Database connected successfully");
  } catch (error) {
    logger.error(`Database connection error: ${error.message}`);
    throw new ErrorResponse("Failed to connect to the database", 500);
  }
};

module.exports = connectDB;
