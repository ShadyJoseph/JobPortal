const Job = require('../models/jobModel');
const { validationResult } = require('express-validator');
const ErrorResponse = require('../utils/errorResponse');

const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  FORBIDDEN: 403,
};

// Helper function to check if user is admin
const isAdmin = (user) => user.role === 1;

// Create Job (Admin only)
exports.createJob = async (req, res, next) => {
  try {
    // Admin check
    if (!isAdmin(req.user)) {
      return next(new ErrorResponse('Access denied. Only admins can post jobs.', HTTP_STATUS.FORBIDDEN));
    }

    // Validate input fields
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ErrorResponse('Invalid input', HTTP_STATUS.BAD_REQUEST, errors.array()));
    }

    const { title, company, location, description, salary, category, status } = req.body;

    // Sanitize input fields (additional sanitization can be implemented)
    const newJob = new Job({
      title,
      company,
      location,
      description,
      salary,
      category,
      status,
      postedBy: req.user._id,
    });

    await newJob.save();
    return res.status(HTTP_STATUS.CREATED).json({ message: 'Job created successfully!', job: newJob });
  } catch (error) {
    console.error(`Error creating job: ${error.message}`); // Log error message
    next(error); // Pass error to global error handler
  }
};

// Fetch all jobs (with pagination)
exports.getAllJobs = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const jobs = await Job.find()
      .populate('postedBy', 'firstName lastName email')
      .skip((page - 1) * limit)
      .limit(limit);

    const totalJobs = await Job.countDocuments();
    const totalPages = Math.ceil(totalJobs / limit);

    return res.status(HTTP_STATUS.OK).json({
      jobs,
      pagination: {
        totalJobs,
        totalPages,
        currentPage: page,
      },
    });
  } catch (error) {
    console.error(`Error fetching jobs: ${error.message}`); // Log error message
    next(error); // Pass error to global error handler
  }
};

// Fetch a single job by ID
exports.getJobById = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id).populate('postedBy', 'firstName lastName email');
    if (!job) {
      return next(new ErrorResponse('Job not found', HTTP_STATUS.NOT_FOUND));
    }
    return res.status(HTTP_STATUS.OK).json(job);
  } catch (error) {
    console.error(`Error fetching job by ID: ${error.message}`); // Log error message
    next(error); // Pass error to global error handler
  }
};

// Update Job (Admin only)
exports.updateJob = async (req, res, next) => {
  try {
    if (!isAdmin(req.user)) {
      return next(new ErrorResponse('Access denied. Only admins can update jobs.', HTTP_STATUS.FORBIDDEN));
    }

    const job = await Job.findById(req.params.id);
    if (!job) {
      return next(new ErrorResponse('Job not found', HTTP_STATUS.NOT_FOUND));
    }

    const { title, company, location, description, salary, category, status } = req.body;

    // Update only fields that are present
    if (title !== undefined) job.title = title;
    if (company !== undefined) job.company = company;
    if (location !== undefined) job.location = location;
    if (description !== undefined) job.description = description;
    if (salary !== undefined) job.salary = salary;
    if (category !== undefined) job.category = category;
    if (status !== undefined) job.status = status;

    const updatedJob = await job.save();
    return res.status(HTTP_STATUS.OK).json({ message: 'Job updated successfully', job: updatedJob });
  } catch (error) {
    console.error(`Error updating job: ${error.message}`); // Log error message
    next(error); // Pass error to global error handler
  }
};

// Delete Job (Admin only)
exports.deleteJob = async (req, res, next) => {
  try {
    if (!isAdmin(req.user)) {
      return next(new ErrorResponse('Access denied. Only admins can delete jobs.', HTTP_STATUS.FORBIDDEN));
    }

    // Find and delete the job
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) {
      return next(new ErrorResponse('Job not found', HTTP_STATUS.NOT_FOUND));
    }

    return res.status(HTTP_STATUS.OK).json({ message: 'Job deleted successfully' });
  } catch (error) {
    console.error(`Error deleting job: ${error.message}`); // Log error message
    next(error); // Pass error to global error handler
  }
};
