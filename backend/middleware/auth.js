const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');
const ErrorResponse = require('../utils/errorResponse');
const logger = require('../utils/logger'); // Assuming you have a logger utility

// Middleware to check if user is authenticated
exports.isAuthenticated = async (req, res, next) => {
  let token;

  // Check for token in cookies or headers
  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    logger.warn('Access denied: No token provided');
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch the user by ID and exclude the password
    req.user = await User.findById(decoded.id).select('-password');

    if (!req.user) {
      logger.error(`User not found: ${decoded.id}`);
      return next(new ErrorResponse('User not found', 404));
    }

    // If everything is fine, proceed to the next middleware
    next();
  } catch (error) {
    logger.error(`Token validation error: ${error.message}`);
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }
};

// Middleware to check if user is an admin
exports.isAdmin = (req, res, next) => {
  // Assume '1' is the admin role. You can define roles in a constants file for scalability.
  const ADMIN_ROLE = 1; 

  if (!req.user) {
    logger.warn('Admin check failed: No user data found');
    return next(new ErrorResponse('User information is missing', 403));
  }

  if (req.user.role !== ADMIN_ROLE) {
    logger.warn(`Access denied: User ${req.user.email} is not an admin`);
    return next(new ErrorResponse('Access denied. Admins only', 403));
  }

  // If user is admin, proceed to the next middleware
  next();
};

// Middleware to check if user has a specific role (for future RBAC extension)
exports.hasRole = (requiredRole) => (req, res, next) => {
  if (!req.user) {
    logger.warn('Role check failed: No user data found');
    return next(new ErrorResponse('User information is missing', 403));
  }

  if (req.user.role !== requiredRole) {
    logger.warn(`Access denied: User ${req.user.email} does not have the required role`);
    return next(new ErrorResponse('Access denied. Insufficient permissions', 403));
  }

  next();
};
