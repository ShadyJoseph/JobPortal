import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../utils/api'; // Adjust the import path as needed
import Loader from '../components/Loader';

const JobDetails = () => {
  const { jobId } = useParams(); // Get the job ID from the URL
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await api.get(`/jobs/${jobId}`); // Fetch job details by jobId
        setJob(response.data.job); // Ensure this is correct based on your API response
      } catch (error) {
        setError('Failed to fetch job details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [jobId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader height="80" width="80" color="#3498db" />
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-red-500 text-center mb-4 mt-4">
        {error} <button onClick={() => window.location.reload()} className="underline text-blue-600">Retry</button>
      </p>
    );
  }

  if (!job) {
    return <p className="text-gray-500 text-center">No job details available.</p>;
  }

  return (
    <div className="container mx-auto p-6 min-h-screen mt-10">
      <h1 className="text-5xl font-extrabold mb-6 text-center text-gray-800">{job.title}</h1>
      <p className="text-xl mb-6 text-center text-gray-500">{job.company} - {job.location}</p>
      
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Job Description</h2>
        <p className="text-gray-600 mb-4">{job.description}</p>
        
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Requirements</h3>
        <ul className="list-disc list-inside text-gray-600 mb-4">
          {job.requirements.map((req, index) => (
            <li key={index}>{req}</li>
          ))}
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 mb-4">Salary</h3>
        <p className="text-gray-600">{job.salary}</p>

        <Link
          to="/jobs"
          className="inline-block bg-blue-500 text-white mt-6 py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-300"
        >
          Back to Jobs
        </Link>
      </div>
    </div>
  );
};

export default JobDetails;
