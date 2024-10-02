const User = require('../models/userModel');
const ErrorResponse = require('../utils/errorResponse');
const { validationResult } = require('express-validator');
const logger = require('../utils/logger');

// Load all users (with pagination and improved error handling)
exports.allUsers = async (req, res, next) => {
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;

    try {
        const count = await User.estimatedDocumentCount();
        const users = await User.find()
            .lean()
            .sort({ createdAt: -1 })
            .select('-password') // Exclude password field
            .skip(pageSize * (page - 1))
            .limit(pageSize);

        logger.info(`Loaded ${users.length} users on page ${page}`);

        res.status(200).json({
            success: true,
            users,
            page,
            pages: Math.ceil(count / pageSize),
            totalUsers: count,
        });
    } catch (error) {
        logger.error(`Failed to load users: ${error.message}`);
        next(new ErrorResponse('Unable to load users', 500));
    }
};

// Show single user (with improved error handling)
exports.singleUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).lean().select('-password');
        if (!user) {
            logger.warn(`User with ID ${req.params.id} not found`);
            return next(new ErrorResponse("User not found", 404));
        }

        logger.info(`User with ID ${req.params.id} retrieved successfully`);
        res.status(200).json({
            success: true,
            user,
        });
    } catch (error) {
        logger.error(`Error retrieving user with ID ${req.params.id}: ${error.message}`);
        next(new ErrorResponse("Error retrieving user", 500));
    }
};

// Edit user details with validation
exports.editUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        logger.warn(`Validation failed for user edit: ${JSON.stringify(errors.array())}`);
        return next(new ErrorResponse("Validation errors", 400, errors.array()));
    }

    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true, // Enforce schema validators
        });
        if (!user) {
            logger.warn(`User with ID ${req.params.id} not found for update`);
            return next(new ErrorResponse("User not found", 404));
        }

        logger.info(`User with ID ${req.params.id} updated successfully`);
        res.status(200).json({
            success: true,
            user,
        });
    } catch (error) {
        logger.error(`Error updating user with ID ${req.params.id}: ${error.message}`);
        next(new ErrorResponse("Error updating user", 500));
    }
};

// Delete user with error handling
exports.deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            logger.warn(`User with ID ${req.params.id} not found for deletion`);
            return next(new ErrorResponse("User not found", 404));
        }

        logger.info(`User with ID ${req.params.id} deleted successfully`);
        res.status(200).json({
            success: true,
            message: "User deleted",
        });
    } catch (error) {
        logger.error(`Error deleting user with ID ${req.params.id}: ${error.message}`);
        next(new ErrorResponse("Error deleting user", 500));
    }
};
