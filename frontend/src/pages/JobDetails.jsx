import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../utils/api'; // Adjust the import path as needed
import Loader from '../components/Loader';
import ConfirmationModal from '../components/ConfirmationModal'; // Import the new modal

const JobDetails = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false); // State to control the modal
  const [isDeleting, setIsDeleting] = useState(false); // State for deletion process

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await api.get(`/jobs/${jobId}`);
        setJob(response.data);
      } catch (err) {
        const message = err.response?.data?.message || 'Failed to fetch job details. Please try again.';
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [jobId]);

  const handleDelete = async () => {
    setIsDeleting(true); // Set deleting state to true
    try {
      await api.delete(`/jobs/${jobId}`);
      navigate('/jobs');
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to delete job. Please try again.';
      setError(message);
    } finally {
      setIsDeleting(false);
      setShowModal(false); // Close the modal after deletion attempt
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
      <div className="text-center">
        <p className="text-red-500 mb-4">
          {error}
        </p>
        <button onClick={() => window.location.reload()} className="text-blue-600 underline">
          Retry
        </button>
      </div>
    );
  }

  if (!job) {
    return <p className="text-gray-500 text-center">No job details available.</p>;
  }

  return (
    <div className="container mx-auto p-6 mt-10 min-h-screen">
      <h1 className="text-5xl font-extrabold text-center text-gray-800 mb-6">
        {job.title}
      </h1>
      <p className="text-xl text-center text-gray-500 mb-6">
        {job.company} - {job.location}
      </p>

      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Job Description</h2>
        <p className="text-gray-600 mb-4">{job.description}</p>

        {job.requirements && job.requirements.length > 0 && (
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
        <p className="text-gray-600 mb-6">${job.salary}</p>

        <div className="flex flex-col md:flex-row justify-between mt-6 space-y-4 md:space-y-0 md:space-x-4">
          <Link
            to={`/jobs/${job._id}/edit`}
            className="bg-yellow-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-yellow-600 transition duration-300"
          >
            Edit Job
          </Link>
          <button
            onClick={() => setShowModal(true)} // Trigger modal when delete is clicked
            className="bg-red-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-red-600 transition duration-300"
          >
            Delete Job
          </button>
        </div>

        <Link
          to="/jobs"
          className="block mt-6 bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition duration-300 text-center"
        >
          Back to Jobs
        </Link>
      </div>

      {/* Confirmation Modal for Deletion */}
      {showModal && (
        <ConfirmationModal
          message="Are you sure you want to delete this job?"
          onConfirm={handleDelete}
          onCancel={() => setShowModal(false)} // Close modal if canceled
          isLoading={isDeleting} // Pass loading state to modal
        />
      )}
    </div>
  );
};

export default JobDetails;
