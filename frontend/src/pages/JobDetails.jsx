import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../utils/api'; // Adjust the import path as needed
import Loader from '../components/Loader';

const JobDetails = () => {
  const { jobId } = useParams(); // Get the job ID from the URL
  const navigate = useNavigate(); // Use useNavigate instead of useHistory
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        console.log('Fetching job details for job ID:', jobId); // Log the job ID being fetched

        const response = await api.get(`/jobs/${jobId}`); // Fetch job details by jobId
        console.log('Response from API:', response); // Log the full API response

        // Accessing the job data correctly based on the API response structure
        if (response.data) {
          setJob(response.data); // Set the job state directly with the fetched job data
          console.log('Job details set in state:', response.data); // Log the job details set in state
        } else {
          throw new Error('Job data is not in the expected format'); // Handle unexpected format
        }
      } catch (error) {
        console.error('Error fetching job details:', error); // Log any errors
        setError('Failed to fetch job details. Please try again.');
      } finally {
        setLoading(false); // Set loading to false regardless of outcome
        console.log('Loading state set to false'); // Log loading state change
      }
    };

    fetchJobDetails();
  }, [jobId]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      try {
        console.log('Deleting job with ID:', jobId); // Log the job ID being deleted
        const response = await api.delete(`/jobs/${jobId}`);
        console.log('Response from delete API:', response); // Log the response
        navigate('/jobs'); // Redirect to jobs list after deletion
      } catch (error) {
        console.error('Error deleting job:', error.response?.data || error.message);
        setError('Failed to delete job. Please try again.');
      }
    } else {
      console.log('Job deletion cancelled'); // Log cancellation of deletion
    }
  };

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
        
        {job.requirements && (
          <>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Requirements</h3>
            <ul className="list-disc list-inside text-gray-600 mb-4">
              {job.requirements.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          </>
        )}

        <h3 className="text-xl font-semibold text-gray-800 mb-4">Salary</h3>
        <p className="text-gray-600">${job.salary}</p>

        <div className="mt-6 flex justify-between">
          <Link
            to={`/jobs/${job._id}/edit`}
            className="inline-block bg-yellow-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-yellow-600 transition-colors duration-300"
          >
            Edit Job
          </Link>
          <button
            onClick={handleDelete}
            className="inline-block bg-red-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-red-600 transition-colors duration-300"
          >
            Delete Job
          </button>
        </div>

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
