const express = require('express');
const { signup, signin, logout } = require('../controllers/authController');
const { validateSignup, validateSignin } = require('../middleware/validators');
const asyncHandler = require('express-async-handler');
const { authLimiter } = require('../middleware/rateLimiter'); 

const router = express.Router();

// Routes with rate limiting and validation
router.post('/auth/signup', authLimiter, validateSignup, asyncHandler(signup));
router.post('/auth/signin', authLimiter, validateSignin, asyncHandler(signin));
router.get('/auth/logout', asyncHandler(logout));

module.exports = router;
