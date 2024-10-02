
const { body, param } = require('express-validator');

const { check } = require('express-validator');

const validateJobCreation = [
  check('title').notEmpty().withMessage('Title is required'),
  check('company').notEmpty().withMessage('Company is required'),
  check('location').notEmpty().withMessage('Location is required'),
  check('description').notEmpty().withMessage('Description is required'),
  check('salary').isNumeric().withMessage('Salary must be a number'),
  check('category').isIn(['Engineering', 'Marketing', 'Design', 'Sales', 'Other']).withMessage('Invalid category'),
];

const validateJobUpdate = [
  check('title').optional().notEmpty().withMessage('Title must not be empty'),
  check('company').optional().notEmpty().withMessage('Company must not be empty'),
  check('location').optional().notEmpty().withMessage('Location must not be empty'),
  check('description').optional().notEmpty().withMessage('Description must not be empty'),
  check('salary').optional().isNumeric().withMessage('Salary must be a number'),
  check('category').optional().isIn(['Engineering', 'Marketing', 'Design', 'Sales', 'Other']).withMessage('Invalid category'),
];

// Validation rules for user editing
const validateUserEdit = [
  body('firstName').not().isEmpty().withMessage('First name is required'),
  body('lastName').not().isEmpty().withMessage('Last name is required'),
  body('email').isEmail().withMessage('Email must be valid'),
];

// Export the validators
module.exports = {
  validateJobCreation,
  validateJobUpdate,
  validateUserEdit,
};
