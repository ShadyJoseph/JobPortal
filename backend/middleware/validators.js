const { body, check } = require('express-validator');

// Centralized error messages
const messages = {
  required: field => `${field} is required`,
  invalidEmail: 'Please include a valid email',
  passwordLength: 'Password must be at least 8 characters long',
  passwordMismatch: 'Password confirmation does not match password',
  salaryNumber: 'Salary must be a number',
  salaryNegative: 'Salary cannot be negative',
  invalidCategory: 'Invalid category',
};

// Validation for job creation with sanitization
const validateJobCreation = [
  check('title').notEmpty().withMessage(messages.required('Title')).trim().escape(),
  check('company').notEmpty().withMessage(messages.required('Company')).trim().escape(),
  check('location').notEmpty().withMessage(messages.required('Location')).trim().escape(),
  check('description').notEmpty().withMessage(messages.required('Description')).trim().escape(),
  check('salary')
    .isNumeric().withMessage(messages.salaryNumber)
    .isFloat({ min: 0 }).withMessage(messages.salaryNegative),
  check('category')
    .isIn(['Engineering', 'Marketing', 'Design', 'Sales', 'Other']).withMessage(messages.invalidCategory),
];

// Validation for job update
const validateJobUpdate = [
  check('title').optional().notEmpty().withMessage(messages.required('Title')).trim().escape(),
  check('company').optional().notEmpty().withMessage(messages.required('Company')).trim().escape(),
  check('location').optional().notEmpty().withMessage(messages.required('Location')).trim().escape(),
  check('description').optional().notEmpty().withMessage(messages.required('Description')).trim().escape(),
  check('salary')
    .optional()
    .isNumeric().withMessage(messages.salaryNumber)
    .isFloat({ min: 0 }).withMessage(messages.salaryNegative),
  check('category')
    .optional()
    .isIn(['Engineering', 'Marketing', 'Design', 'Sales', 'Other']).withMessage(messages.invalidCategory),
];

// Validation rules for user editing with sanitization
const validateUserEdit = [
  body('firstName').notEmpty().withMessage(messages.required('First name')).trim().escape(),
  body('lastName').notEmpty().withMessage(messages.required('Last name')).trim().escape(),
  body('email').isEmail().withMessage(messages.invalidEmail).normalizeEmail(),
  // You can add role validation if applicable
];

// Validation for signup
const validateSignup = [
  check('email', messages.invalidEmail).isEmail(),
  check('password', messages.passwordLength).isLength({ min: 8 }),
  check('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error(messages.passwordMismatch);
    }
    return true;
  }),
];

// Validation for signin
const validateSignin = [
  check('email', messages.invalidEmail).isEmail(),
  check('password', messages.passwordLength).isLength({ min: 8 }),
];

module.exports = {
  validateJobCreation,
  validateJobUpdate,
  validateUserEdit,
  validateSignup,
  validateSignin,
};
