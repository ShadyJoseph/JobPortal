import React from 'react';
import { Link, NavLink } from 'react-router-dom'; // Use NavLink for active link styles
import { useSelector, useDispatch } from 'react-redux';
import Logo from '../assets/Logo.jpg'; 
import { logout } from '../store/actions/authActions'; // Assuming you have a logout action

const Header = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth); // Assuming auth state in Redux

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="bg-gray-800 fixed top-0 left-0 right-0 z-10 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center space-x-3">
          <Link to="/">
            <img src={Logo} alt="Job Portal Logo" className="h-10 w-auto" />
          </Link>
          <h1 className="text-white text-2xl font-bold">
            <Link to="/" className="hover:text-gray-300 transition duration-200">
              Job Portal
            </Link>
          </h1>
        </div>

        {/* Navigation Links */}
        <nav className="flex items-center space-x-6">
          <NavLink 
            exact 
            to="/" 
            className="text-white hover:text-gray-300 transition duration-200"
            activeClassName="text-blue-500" // Active link style
          >
            Home
          </NavLink>
          <NavLink 
            to="/jobs" 
            className="text-white hover:text-gray-300 transition duration-200"
            activeClassName="text-blue-500"
          >
            Jobs
          </NavLink>

          {isAuthenticated ? (
            <>
              <NavLink 
                to="/post-job" 
                className="text-white hover:text-gray-300 transition duration-200"
                activeClassName="text-blue-500"
              >
                Post a Job
              </NavLink>
              <NavLink 
                to="/profile" 
                className="text-white hover:text-gray-300 transition duration-200"
                activeClassName="text-blue-500"
              >
                {user?.firstName}'s Profile
              </NavLink>
              <button
                onClick={handleLogout}
                className="text-white hover:text-gray-300 transition duration-200 focus:outline-none"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink 
                to="/signin" 
                className="text-white hover:text-gray-300 transition duration-200"
                activeClassName="text-blue-500"
              >
                Sign In
              </NavLink>
              <NavLink 
                to="/register" 
                className="text-white hover:text-gray-300 transition duration-200"
                activeClassName="text-blue-500"
              >
                Register
              </NavLink>
            </>
          )}

          {isAuthenticated && user?.role === 'admin' && (
            <NavLink 
              to="/admin/dashboard" 
              className="text-white hover:text-gray-300 transition duration-200"
              activeClassName="text-blue-500"
            >
              Admin Dashboard
            </NavLink>
          )}
        </nav>
      </div>

      {/* Mobile Responsiveness */}
      <div className="container mx-auto block lg:hidden text-center mt-2">
        <button className="text-white focus:outline-none">
          {/* Menu Icon (hamburger) */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
