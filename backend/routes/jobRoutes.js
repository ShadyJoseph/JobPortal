const express = require('express');
const {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
} = require('../controllers/jobController');
const { isAuthenticated, isAdmin } = require('../middleware/auth');
const { validateJobCreation, validateJobUpdate } = require('../middleware/validators');
const asyncHandler = require('express-async-handler');
const { authLimiter } = require('../middleware/rateLimiter'); // Rate limiter for admin routes

const router = express.Router();

// Public routes for fetching jobs
router.get('/', asyncHandler(getAllJobs));
router.get('/:id', asyncHandler(getJobById));

// Protected routes for job creation, update, and deletion (Admin only)
router.post('/', isAuthenticated, isAdmin, validateJobCreation, asyncHandler(createJob));
router.put('/:id', isAuthenticated, isAdmin, validateJobUpdate, asyncHandler(updateJob)); // Update job
router.delete('/:id', isAuthenticated, isAdmin, authLimiter, asyncHandler(deleteJob)); // Delete job with rate limiting

module.exports = router;
