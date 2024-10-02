const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Job title is required'],
    trim: true,
  },
  company: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true,
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Job description is required'],
  },
  salary: {
    type: Number,
    min: [0, 'Salary cannot be negative'],
    default: 0,
  },
  category: {
    type: String,
    required: [true, 'Job category is required'],
    enum: ['Engineering', 'Marketing', 'Design', 'Sales', 'Other'],
    default: 'Other',
  },
  status: {
    type: String,
    enum: ['open', 'closed'],
    default: 'open',
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  expiresAt: {
    type: Date,
    default: function () {
      return Date.now() + 30 * 24 * 60 * 60 * 1000; // 30 days from now
    },
    index: { expires: '30d' }, // Job document will be automatically deleted after 30 days
  },
});

// Pre-save hook to automatically set the updatedAt field on update
jobSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Job', jobSchema);
