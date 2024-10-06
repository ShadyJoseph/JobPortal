import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaUser, FaEnvelope, FaUserShield, FaEdit, FaSave } from 'react-icons/fa';
import { editUser } from '../store/actions/userActions';
import Loader from '../components/Loader';

const UserProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const userEdit = useSelector((state) => state.userEdit); // Get error and loading states from the store

  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(''); // This state will capture local errors

  // Load user data into state on component mount
  useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.email);
    }
  }, [user]);

  // Track the userEdit error from the redux store (if available)
  useEffect(() => {
    if (userEdit.error) {
      setError(userEdit.error);
    }
  }, [userEdit.error]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setError(''); // Clear any previous errors when toggling edit mode
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(''); // Clear previous error before submitting

    try {
      // Dispatch the editUser action with all user data
      await dispatch(editUser(user.id, { firstName, lastName, email }));
      setIsEditing(false); // Exit edit mode after successful update
    } catch (err) {
      setError('Failed to update profile. Please try again.'); // Set error if the update fails
    } finally {
      setLoading(false); // Stop the loader
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-200 mt-20">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-4">User Profile</h1>
      
      {/* Display global error message from the redux state */}
      {userEdit.error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{userEdit.error}</span>
        </div>
      )}

      {isEditing ? (
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div className="flex items-center justify-between">
            <label className="font-semibold text-gray-700 flex items-center">
              <FaUser className="mr-2 text-blue-500" /> First Name:
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="border border-gray-300 rounded-lg p-2"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="font-semibold text-gray-700 flex items-center">
              <FaUser className="mr-2 text-blue-500" /> Last Name:
            </label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="border border-gray-300 rounded-lg p-2"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="font-semibold text-gray-700 flex items-center">
              <FaEnvelope className="mr-2 text-blue-500" /> Email:
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 rounded-lg p-2"
              required
            />
          </div>

          {/* Display any local error message */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          <div className="mt-6">
            <button
              type="submit"
              className={`w-full py-2 text-white font-semibold rounded-lg shadow-md transition duration-200 
                ${loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
              disabled={loading} // Disable the button when loading
            >
              {loading ? <Loader height="20" width="20" color="#fff" /> : <><FaSave className="inline mr-2" /> Save Changes</>}
            </button>
          </div>
        </form>
      ) : (
        <div className="mt-4 space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-gray-700 flex items-center">
              <FaUser className="mr-2 text-blue-500" /> First Name:
            </span>
            <span className="text-gray-600">{user.firstName}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-semibold text-gray-700 flex items-center">
              <FaUser className="mr-2 text-blue-500" /> Last Name:
            </span>
            <span className="text-gray-600">{user.lastName}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-semibold text-gray-700 flex items-center">
              <FaEnvelope className="mr-2 text-blue-500" /> Email:
            </span>
            <span className="text-gray-600">{user.email}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-semibold text-gray-700 flex items-center">
              <FaUserShield className="mr-2 text-blue-500" /> Role:
            </span>
            <span className="text-gray-600">{user.role === 0 ? 'User' : 'Admin'}</span>
          </div>
          <div className="mt-6">
            <button
              onClick={handleEditToggle}
              className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
            >
              <FaEdit className="inline mr-2" /> Edit Profile
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
