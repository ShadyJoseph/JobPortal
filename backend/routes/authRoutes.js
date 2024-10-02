const express = require('express');
const { signup, signin, logout } = require('../controllers/authController');
const { validateSignup } = require('../middleware/validators');
const asyncHandler = require('express-async-handler');
const { authLimiter } = require('../middleware/rateLimiter'); // Import rate limiter

const router = express.Router();

// Routes with rate limiting and validation
router.post('/signup', authLimiter, validateSignup, asyncHandler(signup));
router.post('/signin', authLimiter, validateSignup, asyncHandler(signin));
router.get('/logout', asyncHandler(logout));

module.exports = router;
