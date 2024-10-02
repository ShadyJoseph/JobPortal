const express = require('express');
const { signup, signin, logout } = require('../controllers/authController');
const { check } = require('express-validator');
const asyncHandler = require('express-async-handler');
const { authLimiter } = require('../middleware/rateLimiter'); // Import rate limiter

const router = express.Router();

// Validation rules for signup/signin
const validateSignup = [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be at least 8 characters long').isLength({ min: 8 }),
];

// Routes with rate limiting
router.post('/signup', authLimiter, validateSignup, asyncHandler(signup));
router.post('/signin', authLimiter, validateSignup, asyncHandler(signin));
router.get('/logout', asyncHandler(logout));

module.exports = router;
