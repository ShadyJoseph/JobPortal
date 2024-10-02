const express = require('express');
const { singleUser, editUser } = require('../controllers/userController');
const { isAuthenticated } = require('../middleware/auth');
const { validateUserEdit } = require('../middleware/validators');
const asyncHandler = require('express-async-handler');
const router = express.Router();

// Secure routes with authentication
router.get('/user/:id', isAuthenticated, asyncHandler(singleUser));
router.put('/user/edit/:id', isAuthenticated, validateUserEdit, asyncHandler(editUser));

module.exports = router;
