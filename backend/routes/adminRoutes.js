const express = require('express');
const { allUsers, deleteUser } = require('../controllers/userController');
const { isAuthenticated, isAdmin } = require('../middleware/auth');
const asyncHandler = require('express-async-handler');

const router = express.Router();

// Admin routes with authentication and authorization checks
router.get('/allusers', isAuthenticated, isAdmin, asyncHandler(allUsers));
router.delete('/user/delete/:id', isAuthenticated, isAdmin, asyncHandler(deleteUser));

module.exports = router;
