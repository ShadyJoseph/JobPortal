const express = require('express');
const { allUsers, deleteUser } = require('../controllers/userController');
const { isAuthenticated, isAdmin } = require('../middleware/auth');
const asyncHandler = require('express-async-handler');
const { authLimiter } = require('../middleware/rateLimiter'); // Rate limiter for admin routes

const router = express.Router();

// Admin routes with authentication, authorization, and rate-limiting
router.get('/allusers', authLimiter, isAuthenticated, isAdmin, asyncHandler(allUsers));
router.delete('/user/delete/:id', authLimiter, isAuthenticated, isAdmin, asyncHandler(deleteUser));

module.exports = router;
