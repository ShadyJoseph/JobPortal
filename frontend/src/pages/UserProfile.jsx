import React from 'react';
import { useSelector } from 'react-redux';
import { FaUser, FaEnvelope, FaUserShield } from 'react-icons/fa';

const UserProfile = () => {
  // Get the user data from the Redux store
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-200 mt-20">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-4">User Profile</h1>
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
      </div>
      <div className="mt-6">
        <button className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-200">
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
