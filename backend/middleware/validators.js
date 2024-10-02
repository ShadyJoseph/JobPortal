const { body, check } = require('express-validator');

// Validation for job creation with sanitization
const validateJobCreation = [
  check('title').notEmpty().withMessage('Title is required').trim().escape(),
  check('company').notEmpty().withMessage('Company is required').trim().escape(),
  check('location').notEmpty().withMessage('Location is required').trim().escape(),
  check('description').notEmpty().withMessage('Description is required').trim().escape(),
  check('salary').isNumeric().withMessage('Salary must be a number').isFloat({ min: 0 }).withMessage('Salary cannot be negative'),
  check('category').isIn(['Engineering', 'Marketing', 'Design', 'Sales', 'Other']).withMessage('Invalid category'),
];

const validateJobUpdate = [
  check('title').optional().notEmpty().withMessage('Title must not be empty').trim().escape(),
  check('company').optional().notEmpty().withMessage('Company must not be empty').trim().escape(),
  check('location').optional().notEmpty().withMessage('Location must not be empty').trim().escape(),
  check('description').optional().notEmpty().withMessage('Description must not be empty').trim().escape(),
  check('salary').optional().isNumeric().withMessage('Salary must be a number').isFloat({ min: 0 }).withMessage('Salary cannot be negative'),
  check('category').optional().isIn(['Engineering', 'Marketing', 'Design', 'Sales', 'Other']).withMessage('Invalid category'),
];

// Validation rules for user editing with sanitization
const validateUserEdit = [
  body('firstName').not().isEmpty().withMessage('First name is required').trim().escape(),
  body('lastName').not().isEmpty().withMessage('Last name is required').trim().escape(),
  body('email').isEmail().withMessage('Email must be valid').normalizeEmail(),
];

// Validation for signup
const validateSignup = [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password must be at least 8 characters long').isLength({ min: 8 }),
  check('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Password confirmation does not match password');
    }
    return true;
  }),
];

module.exports = {
  validateJobCreation,
  validateJobUpdate,
  validateUserEdit,
  validateSignup,
};
