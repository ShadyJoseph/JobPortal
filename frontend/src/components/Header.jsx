import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { MdHome, MdWork, MdPerson, MdPostAdd, MdLogin, MdPersonAdd, MdLogout } from 'react-icons/md';
import Logo from '../assets/Logo.jpg';
import { logout } from '../store/actions/authActions';
import LogoutConfirmation from './LogoutConfirmation';

const Header = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = () => {
    setIsLoading(true);
    dispatch(logout()); // Dispatch the logout action
    setTimeout(() => {
      setIsLoading(false);
      setShowLogoutConfirm(false); // Close the modal once logout is completed
    }, 2000); // Simulate the logging out process (you can handle the actual loader based on the API call status)
  };

  return (
    <header className="bg-gray-900 fixed top-0 left-0 right-0 z-10 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center space-x-3">
          <Link to="/">
            <img src={Logo} alt="Job Portal Logo" className="h-12 w-auto" />
          </Link>
          <h1 className="text-white text-3xl font-extrabold">
            <Link to="/" className="hover:text-gray-300 transition duration-200">
              Job Portal
            </Link>
          </h1>
        </div>

        {/* Navigation Links */}
        <nav className="flex items-center space-x-8">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? 'text-blue-400 font-semibold flex items-center space-x-2' : 'text-white hover:text-gray-300 transition duration-200 flex items-center space-x-2'
            }
          >
            <MdHome className="h-5 w-5" />
            <span>Home</span>
          </NavLink>
          <NavLink
            to="/jobs"
            className={({ isActive }) =>
              isActive ? 'text-blue-400 font-semibold flex items-center space-x-2' : 'text-white hover:text-gray-300 transition duration-200 flex items-center space-x-2'
            }
          >
            <MdWork className="h-5 w-5" />
            <span>Jobs</span>
          </NavLink>

          {isAuthenticated ? (
            <>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  isActive ? 'text-blue-400 font-semibold flex items-center space-x-2' : 'text-white hover:text-gray-300 transition duration-200 flex items-center space-x-2'
                }
              >
                <MdPerson className="h-5 w-5" />
                <span>{user?.firstName}'s Profile</span>
              </NavLink>
              <button
                onClick={() => setShowLogoutConfirm(true)}
                className="text-white hover:text-gray-300 transition duration-200 focus:outline-none font-semibold flex items-center space-x-2"
              >
                <MdLogout className="h-5 w-5" />
                <span>Logout</span>
              </button>
              {user?.role === 1 && (
                <NavLink
                  to="/post-job"
                  className={({ isActive }) =>
                    isActive ? 'text-blue-400 font-semibold flex items-center space-x-2' : 'text-white hover:text-gray-300 transition duration-200 flex items-center space-x-2'
                  }
                >
                  <MdPostAdd className="h-5 w-5" />
                  <span>Post a Job</span>
                </NavLink>
              )}
            </>
          ) : (
            <>
              <NavLink
                to="/signin"
                className={({ isActive }) =>
                  isActive ? 'text-blue-400 font-semibold flex items-center space-x-2' : 'text-white hover:text-gray-300 transition duration-200 flex items-center space-x-2'
                }
              >
                <MdLogin className="h-5 w-5" />
                <span>Sign In</span>
              </NavLink>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  isActive ? 'text-blue-400 font-semibold flex items-center space-x-2' : 'text-white hover:text-gray-300 transition duration-200 flex items-center space-x-2'
                }
              >
                <MdPersonAdd className="h-5 w-5" />
                <span>Register</span>
              </NavLink>
            </>
          )}
        </nav>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <LogoutConfirmation
          onConfirm={handleLogout}
          onCancel={() => setShowLogoutConfirm(false)}
          isLoading={isLoading}
        />
      )}
    </header>
  );
};

export default Header;
