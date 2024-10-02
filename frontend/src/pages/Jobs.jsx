import React from 'react';
import { Link } from 'react-router-dom';

// Dummy data for job listings
const jobs = [
  {
    id: 1,
    title: 'Software Engineer',
    company: 'Tech Corp',
    location: 'Cairo, Egypt',
    description: 'Develop and maintain web applications.',
  },
  {
    id: 2,
    title: 'Data Analyst',
    company: 'Data Solutions',
    location: 'Remote',
    description: 'Analyze data to help companies make informed decisions.',
  },
  {
    id: 3,
    title: 'Marketing Specialist',
    company: 'Market Experts',
    location: 'Cairo, Egypt',
    description: 'Create and implement marketing strategies.',
  },
  // Add more job postings as needed
];

const JobsPage = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">
        Job Listings
      </h1>
      <p className="text-lg mb-10 text-center text-gray-600">
        Explore the latest job opportunities below and click on a job to view details.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105"
          >
            <h2 className="text-2xl font-semibold mb-2">{job.title}</h2>
            <p className="text-gray-700 mb-1">{job.company}</p>
            <p className="text-gray-600 mb-1">{job.location}</p>
            <p className="text-gray-500 mb-4">{job.description}</p>
            <Link
              to={`/jobs/${job.id}`}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobsPage;
