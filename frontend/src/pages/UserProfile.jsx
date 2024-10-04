import React from 'react';
import { useSelector } from 'react-redux';

const UserProfile = () => {
  // Get the user data from Redux store
  const user = useSelector((state) => state.auth.user);

  // Check if user is authenticated
  if (!user) {
    return <p>Please log in to view your profile.</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">User Profile</h1>
      <div className="mt-4">
        <p><strong>First Name:</strong> {user.firstName}</p>
        <p><strong>Last Name:</strong> {user.lastName}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role === 0 ? 'User' : 'Admin'}</p>
      </div>
    </div>
  );
};

export default UserProfile;
