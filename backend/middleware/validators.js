
const { body, param } = require('express-validator');

// Validation rules for job creation
const validateJobCreation = [
  body('title').notEmpty().withMessage('Title is required'),
  body('company').notEmpty().withMessage('Company is required'),
  body('location').notEmpty().withMessage('Location is required'),
  body('description').notEmpty().withMessage('Description is required'),
];

// Validation rules for job updates
const validateJobUpdate = [
  body('title').optional().notEmpty().withMessage('Title cannot be empty'),
  body('company').optional().notEmpty().withMessage('Company cannot be empty'),
  body('location').optional().notEmpty().withMessage('Location cannot be empty'),
  body('description').optional().notEmpty().withMessage('Description cannot be empty'),
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
