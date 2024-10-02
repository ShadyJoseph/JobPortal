import React from 'react';
import { useParams, Link } from 'react-router-dom';

// Dummy job data - this can come from a state, Redux store, or API
const jobs = [
  {
    id: 1,
    title: 'Software Engineer',
    company: 'Tech Corp',
    location: 'Cairo, Egypt',
    description: 'Develop and maintain web applications.',
    responsibilities: [
      'Write clean, scalable code.',
      'Collaborate with other developers and designers.',
      'Maintain and improve existing codebase.',
    ],
    qualifications: ['Bachelor\'s degree in Computer Science', '3+ years of experience in software development', 'Familiarity with JavaScript frameworks like React'],
    salary: '$60,000 - $80,000',
  },
  {
    id: 2,
    title: 'Data Analyst',
    company: 'Data Solutions',
    location: 'Remote',
    description: 'Analyze data to help companies make informed decisions.',
    responsibilities: [
      'Collect, clean, and analyze data.',
      'Prepare detailed reports for stakeholders.',
      'Use statistical tools to identify patterns and trends.',
    ],
    qualifications: ['Degree in Data Science, Statistics, or similar field', 'Proficiency in Python or R', 'Experience with data visualization tools'],
    salary: '$50,000 - $70,000',
  },
  // More jobs can be added
];

const JobDetailsPage = () => {
  const { id } = useParams(); // Get job ID from route parameters
  const job = jobs.find((job) => job.id === parseInt(id)); // Find job by ID

  if (!job) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold text-center text-gray-800">Job not found</h1>
        <p className="text-center mt-4">
          <Link to="/jobs" className="text-blue-500 hover:underline">Back to Job Listings</Link>
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">
        {job.title} at {job.company}
      </h1>
      <p className="text-lg text-center text-gray-600 mb-8">{job.location}</p>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Job Description</h2>
        <p className="text-gray-700 mb-4">{job.description}</p>

        <h3 className="text-xl font-semibold mb-2">Responsibilities</h3>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          {job.responsibilities.map((responsibility, index) => (
            <li key={index}>{responsibility}</li>
          ))}
        </ul>

        <h3 className="text-xl font-semibold mb-2">Qualifications</h3>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          {job.qualifications.map((qualification, index) => (
            <li key={index}>{qualification}</li>
          ))}
        </ul>

        <h3 className="text-xl font-semibold mb-2">Salary</h3>
        <p className="text-gray-700 mb-6">{job.salary}</p>

        <Link
          to="/jobs"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300"
        >
          Back to Job Listings
        </Link>
      </div>
    </div>
  );
};

export default JobDetailsPage;
