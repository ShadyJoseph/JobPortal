const User = require('../models/userModel');
const ErrorResponse = require('../utils/errorResponse');
const { validationResult } = require('express-validator');
const logger = require('../utils/logger');

const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  FORBIDDEN: 403,
};

const PAGE_SIZE = 10;

// Load all users (with pagination and improved error handling)
exports.allUsers = async (req, res, next) => {
  const page = Number(req.query.pageNumber) || 1;

  try {
    const count = await User.estimatedDocumentCount();
    const users = await User.find()
      .lean()
      .sort({ createdAt: -1 })
      .select('-password') // Exclude password field
      .skip(PAGE_SIZE * (page - 1))
      .limit(PAGE_SIZE);

    logger.info(`Loaded ${users.length} users on page ${page}`);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      users,
      page,
      pages: Math.ceil(count / PAGE_SIZE),
      totalUsers: count,
    });
  } catch (error) {
    logger.error(`Failed to load users: ${error.message}`);
    next(new ErrorResponse('Unable to load users', HTTP_STATUS.INTERNAL_SERVER_ERROR));
  }
};

// Show single user (with improved error handling)
exports.singleUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).lean().select('-password');
    if (!user) {
      logger.warn(`User with ID ${req.params.id} not found`);
      return next(new ErrorResponse("User not found", HTTP_STATUS.NOT_FOUND));
    }

    logger.info(`User with ID ${req.params.id} retrieved successfully`);
    res.status(HTTP_STATUS.OK).json({
      success: true,
      user,
    });
  } catch (error) {
    logger.error(`Error retrieving user with ID ${req.params.id}: ${error.message}`);
    next(new ErrorResponse("Error retrieving user", HTTP_STATUS.INTERNAL_SERVER_ERROR));
  }
};

// Edit user details with validation
exports.editUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.warn(`Validation failed for user edit: ${JSON.stringify(errors.array())}`);
    return next(new ErrorResponse("Validation errors", HTTP_STATUS.BAD_REQUEST, errors.array()));
  }

  try {
    const userUpdates = {};

    // Prevent overwriting with empty or null values
    const { firstName, lastName, email, role } = req.body;
    if (firstName !== undefined) userUpdates.firstName = firstName;
    if (lastName !== undefined) userUpdates.lastName = lastName;
    if (email !== undefined) userUpdates.email = email;
    if (role !== undefined) userUpdates.role = role;

    const user = await User.findByIdAndUpdate(req.params.id, userUpdates, {
      new: true,
      runValidators: true, // Enforce schema validators
    });
    if (!user) {
      logger.warn(`User with ID ${req.params.id} not found for update`);
      return next(new ErrorResponse("User not found", HTTP_STATUS.NOT_FOUND));
    }

    logger.info(`User with ID ${req.params.id} updated successfully`);
    res.status(HTTP_STATUS.OK).json({
      success: true,
      user,
    });
  } catch (error) {
    logger.error(`Error updating user with ID ${req.params.id}: ${error.message}`);
    next(new ErrorResponse("Error updating user", HTTP_STATUS.INTERNAL_SERVER_ERROR));
  }
};

// Delete user with error handling
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      logger.warn(`User with ID ${req.params.id} not found for deletion`);
      return next(new ErrorResponse("User not found", HTTP_STATUS.NOT_FOUND));
    }

    logger.info(`User with ID ${req.params.id} deleted successfully`);
    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "User deleted",
      user, // Optional: Return deleted user info
    });
  } catch (error) {
    logger.error(`Error deleting user with ID ${req.params.id}: ${error.message}`);
    next(new ErrorResponse("Error deleting user", HTTP_STATUS.INTERNAL_SERVER_ERROR));
  }
};
