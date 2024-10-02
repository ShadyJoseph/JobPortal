const Job = require('../models/jobModel');
const { validationResult } = require('express-validator');
const ErrorResponse = require('../utils/errorResponse');

// Create Job (Admin only)
exports.createJob = async (req, res, next) => {
  try {
    // Admin check
    if (req.user.role !== 1) {
      return next(new ErrorResponse('Access denied. Only admins can post jobs.', 403));
    }

    // Validate input fields
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ErrorResponse('Invalid input', 400, errors.array()));
    }

    const { title, company, location, description, salary, category, status } = req.body;

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
    return res.status(201).json({ message: 'Job created successfully!', job: newJob });
  } catch (error) {
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

    return res.status(200).json({
      jobs,
      pagination: {
        totalJobs,
        totalPages,
        currentPage: page,
      },
    });
  } catch (error) {
    next(error); // Pass error to global error handler
  }
};

// Fetch a single job by ID
exports.getJobById = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id).populate('postedBy', 'firstName lastName email');
    if (!job) {
      return next(new ErrorResponse('Job not found', 404));
    }
    return res.status(200).json(job);
  } catch (error) {
    next(error); // Pass error to global error handler
  }
};

// Update Job (Admin only)
exports.updateJob = async (req, res, next) => {
  try {
    if (req.user.role !== 1) {
      return next(new ErrorResponse('Access denied. Only admins can update jobs.', 403));
    }

    const job = await Job.findById(req.params.id);
    if (!job) {
      return next(new ErrorResponse('Job not found', 404));
    }

    const { title, company, location, description, salary, category, status } = req.body;

    // Update only fields that are present
    if (title) job.title = title;
    if (company) job.company = company;
    if (location) job.location = location;
    if (description) job.description = description;
    if (salary) job.salary = salary;
    if (category) job.category = category;
    if (status) job.status = status;

    const updatedJob = await job.save();
    return res.status(200).json({ message: 'Job updated successfully', job: updatedJob });
  } catch (error) {
    next(error); // Pass error to global error handler
  }
};

// Delete Job (Admin only)
exports.deleteJob = async (req, res, next) => {
  try {
    if (req.user.role !== 1) {
      return next(new ErrorResponse('Access denied. Only admins can delete jobs.', 403));
    }

    const job = await Job.findById(req.params.id);
    if (!job) {
      return next(new ErrorResponse('Job not found', 404));
    }

    await job.remove();
    return res.status(200).json({ message: 'Job deleted successfully' });
  } catch (error) {
    next(error); // Pass error to global error handler
  }
};
