import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import api from '../utils/api';
import Loader from '../components/Loader';
import { debounce } from 'lodash'; // Import debounce for better search performance

const JobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const location = useLocation(); // Get the current location object

  // Debounced search handler to improve performance
  const handleSearchChange = debounce((term) => {
    setSearchTerm(term);
  }, 300);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await api.get('/jobs');
        setJobs(response.data.jobs);
      } catch (error) {
        setError('Failed to fetch jobs. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    // Read the 'category' query parameter from the URL
    const queryParams = new URLSearchParams(location.search);
    const category = queryParams.get('category');

    if (category) {
      setSelectedCategory(category); // Set the category from the URL
    }
  }, [location]);

  // Get unique categories
  const categories = ['All', ...new Set(jobs.map((job) => job.category))];

  // Filter jobs
  const filteredJobs = jobs.filter((job) => {
    const matchesCategory = selectedCategory === 'All' || job.category === selectedCategory;
    const matchesSearchTerm = job.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearchTerm;
  });

  return (
    <div className="container mx-auto p-6 min-h-screen">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-center text-gray-800">Explore Job Opportunities</h1>
      <p className="text-lg mb-10 text-center text-gray-500">
        Find the right opportunity for you. Filter by title or category.
      </p>

      {/* Search Input and Category Dropdown */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0">
        <input
          type="text"
          placeholder="Search by job title..."
          onChange={(e) => handleSearchChange(e.target.value)} // Using debounce for better UX
          className="w-full md:w-1/2 p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all shadow-sm"
          aria-label="Search for jobs by title"
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full md:w-1/3 p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all shadow-sm"
          aria-label="Select job category"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Loader and Job Listings */}
      {loading && (
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader height="80" width="80" color="#3498db" />
        </div>
      )}

      {error && (
        <p className="text-red-500 text-center mb-4">
          {error} <button onClick={() => window.location.reload()} className="underline text-blue-600">Retry</button>
        </p>
      )}

      {filteredJobs.length === 0 && !loading && !error && (
        <p className="text-gray-500 text-center">No jobs found. Please try a different search term or category.</p>
      )}

      {/* Job Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {filteredJobs.map((job) => (
          <div
            key={job._id?.$oid || job._id} // Check for $oid or fallback to _id
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
          >
            <h2 className="text-xl md:text-2xl font-bold text-blue-600 mb-2">{job.title}</h2>
            <p className="text-gray-700 font-medium">{job.company}</p>
            <p className="text-gray-500">{job.location}</p>
            <p className="text-gray-600 mt-4">{job.description}</p>
            <Link
              to={`/jobs/${job._id?.$oid || job._id}`} // Check for $oid or fallback to _id
              className="inline-block mt-6 bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-300"
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
