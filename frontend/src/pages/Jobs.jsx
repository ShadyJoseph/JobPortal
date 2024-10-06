// pages/JobsPage.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api'; // Import your API utility
import Loader from '../components/Loader'; // Import your Loader component

const JobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState(''); // State for the search term

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await api.get('/jobs'); // Fetch all jobs
        setJobs(response.data.jobs);
      } catch (error) {
        setError('Failed to fetch jobs');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Filter jobs based on the search term
  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6 ">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Job Listings</h1>
      <p className="text-lg mb-10 text-center text-gray-600">
        Explore the latest job opportunities below and click on a job to view details.
      </p>

      {/* Search Input */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by job title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update search term
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        />
      </div>

      {/* Loader and Job Listings */}
      {loading && (
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader height="80" width="80" color="#3498db" />
        </div>
      )}
      {error && <p className="text-red-500 text-center">{error}</p>}
      {filteredJobs.length === 0 && !loading && (
        <p className="text-gray-600 text-center">No jobs found. Please try a different search term.</p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobs.map((job) => (
          <div key={job._id} className="bg-white p-6 rounded-lg shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-xl">
            <h2 className="text-2xl font-semibold mb-2 text-blue-600">{job.title}</h2>
            <p className="text-gray-700 mb-1 font-medium">{job.company}</p>
            <p className="text-gray-600 mb-1">{job.location}</p>
            <p className="text-gray-500 mb-4">{job.description}</p>
            <Link
              to={`/jobs/${job._id}`}
              className="inline-block bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition-colors duration-300"
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
