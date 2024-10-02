const User = require('../models/userModel');
const ErrorResponse = require('../utils/errorResponse');
const { validationResult } = require('express-validator');
const logger = require('../utils/logger'); // Import your custom logger

// Signup controller
exports.signup = async (req, res, next) => {
    // Validate input data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMsg = errors.array().map(err => err.msg).join(', ');
        logger.warn(`Signup failed: ${errorMsg}`, { email: req.body.email });
        return next(new ErrorResponse(errorMsg, 400));
    }

    const { email, password } = req.body;

    try {
        // Check if email already exists
        const userExist = await User.findOne({ email });
        if (userExist) {
            logger.warn(`Signup attempt with already registered email: ${email}`);
            return next(new ErrorResponse("Email already registered", 400));
        }

        // Password security: check minimum length (example: 8 characters)
        if (password.length < 8) {
            logger.warn(`Signup failed due to short password: ${email}`);
            return next(new ErrorResponse("Password must be at least 8 characters long", 400));
        }

        // Create new user
        const user = await User.create(req.body);
        logger.info(`New user signed up: ${email}`, { userId: user._id });
        sendTokenResponse(user, 201, res); // Send token upon successful signup
    } catch (error) {
        logger.error(`Signup error for ${email}: ${error.message}`, { stack: error.stack });
        next(error); // Pass error to global error handler
    }
};

// Signin controller
exports.signin = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMsg = errors.array().map(err => err.msg).join(', ');
        logger.warn(`Signin failed: ${errorMsg}`, { email: req.body.email });
        return next(new ErrorResponse(errorMsg, 400));
    }

    const { email, password } = req.body;

    if (!email || !password) {
        logger.warn(`Signin attempt with missing credentials: ${email || 'No email provided'}`);
        return next(new ErrorResponse("Please provide an email and password", 400));
    }

    try {
        // Check if user exists and fetch password
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            logger.warn(`Signin failed due to invalid credentials: ${email}`);
            return next(new ErrorResponse("Invalid credentials", 401));
        }

        // Check if password matches
        const isMatched = await user.comparePassword(password);
        if (!isMatched) {
            logger.warn(`Signin failed due to invalid password: ${email}`);
            return next(new ErrorResponse("Invalid credentials", 401));
        }

        logger.info(`User signed in: ${email}`, { userId: user._id });
        sendTokenResponse(user, 200, res); // Send token upon successful signin
    } catch (error) {
        logger.error(`Signin error for ${email}: ${error.message}`, { stack: error.stack });
        next(error);
    }
};

// Send JWT token in cookie response
const sendTokenResponse = (user, statusCode, res) => {
    const token = user.getJwtToken();

    // Cookie options with configurable expiration
    const cookieExpireTime = process.env.COOKIE_EXPIRE_TIME || 60 * 60 * 1000; // Default: 1 hour

    const options = {
        expires: new Date(Date.now() + cookieExpireTime), // Configurable expiration
        httpOnly: true, // Secure access by the server only
        secure: process.env.NODE_ENV === "production", // Secure cookie only in production
        sameSite: 'Strict', // Prevent CSRF attacks
    };

    // Log successful token generation
    logger.info(`JWT token issued for user: ${user.email}`, { userId: user._id });

    // Send response
    res.status(statusCode)
        .cookie('token', token, options)
        .json({
            success: true,
            token,
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
            },
        });
};

// Logout controller
exports.logout = (req, res, next) => {
    const { email } = req.user || {};

    // Optionally: Add token to a blacklist to prevent reuse (for enhanced security)
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: 'Strict',
    });

    logger.info(`User logged out: ${email}`, { userId: req.user ? req.user._id : 'Unknown' });

    res.status(200).json({
        success: true,
        message: "Logged out successfully",
    });
};

// User Profile controller
exports.userProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id).select('-password');

        if (!user) {
            logger.warn(`User profile fetch failed: User not found with id ${req.user.id}`);
            return next(new ErrorResponse("User not found", 404));
        }

        logger.info(`User profile fetched: ${user.email}`, { userId: user._id });

        res.status(200).json({
            success: true,
            user,
        });
    } catch (error) {
        logger.error(`Error fetching user profile for ${req.user.id}: ${error.message}`, { stack: error.stack });
        next(error);
    }
};
