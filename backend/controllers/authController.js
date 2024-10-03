const User = require('../models/userModel');
const ErrorResponse = require('../utils/errorResponse');
const { validationResult } = require('express-validator');
const logger = require('../utils/logger');

const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
};

// Signup controller
exports.signup = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMsg = errors.array().map(err => err.msg).join(', ');
        logger.warn(`Signup failed: ${errorMsg}`, { email: req.body.email });
        return next(new ErrorResponse(errorMsg, HTTP_STATUS.BAD_REQUEST));
    }

    const { email, password } = req.body;

    try {
        // Check if email already exists
        const userExist = await User.findOne({ email });
        if (userExist) {
            logger.warn(`Signup attempt with already registered email: ${email}`);
            return next(new ErrorResponse("Email already registered", HTTP_STATUS.BAD_REQUEST));
        }

        // Password security: check minimum length
        if (password.length < 8) {
            logger.warn(`Signup failed due to short password: ${email}`);
            return next(new ErrorResponse("Password must be at least 8 characters long", HTTP_STATUS.BAD_REQUEST));
        }

        // Create new user
        const user = await User.create(req.body);
        logger.info(`New user signed up: ${email}`, { userId: user._id });
        sendTokenResponse(user, HTTP_STATUS.CREATED, res); // Send token upon successful signup
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
        return next(new ErrorResponse(errorMsg, HTTP_STATUS.BAD_REQUEST));
    }

    const { email, password } = req.body;

    if (!email || !password) {
        logger.warn(`Signin attempt with missing credentials: ${email || 'No email provided'}`);
        return next(new ErrorResponse("Please provide an email and password", HTTP_STATUS.BAD_REQUEST));
    }

    try {
        // Check if user exists and fetch password
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            logger.warn(`Signin failed due to invalid credentials: ${email}`);
            return next(new ErrorResponse("Invalid credentials", HTTP_STATUS.UNAUTHORIZED));
        }

        // Check if password matches
        const isMatched = await user.comparePassword(password);
        if (!isMatched) {
            logger.warn(`Signin failed due to invalid password: ${email}`);
            return next(new ErrorResponse("Invalid credentials", HTTP_STATUS.UNAUTHORIZED));
        }

        logger.info(`User signed in: ${email}`, { userId: user._id });
        sendTokenResponse(user, HTTP_STATUS.OK, res); // Send token upon successful signin
    } catch (error) {
        logger.error(`Signin error for ${email}: ${error.message}`, { stack: error.stack });
        next(error);
    }
};

// Send JWT token in cookie response
const sendTokenResponse = (user, statusCode, res) => {
    const token = user.getJwtToken();

    const cookieExpireTime = process.env.COOKIE_EXPIRE_TIME
        ? parseInt(process.env.COOKIE_EXPIRE_TIME) * 1000
        : 60 * 60 * 1000; // Default: 1 hour

    const expirationDate = new Date(Date.now() + cookieExpireTime);

    const options = {
        expires: expirationDate,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: 'Strict',
    };

    logger.info(`JWT token issued for user: ${user.email}`, { userId: user._id });

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

    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: 'Strict',
    });

    logger.info(`User logged out: ${email}`, { userId: req.user ? req.user._id : 'Unknown' });

    res.status(HTTP_STATUS.OK).json({
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
            return next(new ErrorResponse("User not found", HTTP_STATUS.NOT_FOUND));
        }

        logger.info(`User profile fetched: ${user.email}`, { userId: user._id });

        res.status(HTTP_STATUS.OK).json({
            success: true,
            user,
        });
    } catch (error) {
        logger.error(`Error fetching user profile for ${req.user.id}: ${error.message}`, { stack: error.stack });
        next(error);
    }
};

