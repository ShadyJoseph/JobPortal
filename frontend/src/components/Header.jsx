import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Logo from '../assets/Logo.jpg';
import { logout } from '../store/actions/authActions';

const Header = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

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
            to="/"
            className={({ isActive }) =>
              isActive ? 'text-blue-500' : 'text-white hover:text-gray-300 transition duration-200'
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/jobs"
            className={({ isActive }) =>
              isActive ? 'text-blue-500' : 'text-white hover:text-gray-300 transition duration-200'
            }
          >
            Jobs
          </NavLink>

          {isAuthenticated ? (
            <>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  isActive ? 'text-blue-500' : 'text-white hover:text-gray-300 transition duration-200'
                }
              >
                {user?.firstName}'s Profile
              </NavLink>
              <button
                onClick={handleLogout}
                className="text-white hover:text-gray-300 transition duration-200 focus:outline-none"
              >
                Logout
              </button>
              {user?.role === 1 && (
                <>
                  <NavLink
                    to="/admin/dashboard"
                    className={({ isActive }) =>
                      isActive ? 'text-blue-500' : 'text-white hover:text-gray-300 transition duration-200'
                    }
                  >
                    Admin Dashboard
                  </NavLink>
                  <NavLink
                    to="/post-job"
                    className={({ isActive }) =>
                      isActive ? 'text-blue-500' : 'text-white hover:text-gray-300 transition duration-200'
                    }
                  >
                    Post a Job
                  </NavLink>
                </>
              )}
            </>
          ) : (
            <>
              <NavLink
                to="/signin"
                className={({ isActive }) =>
                  isActive ? 'text-blue-500' : 'text-white hover:text-gray-300 transition duration-200'
                }
              >
                Sign In
              </NavLink>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  isActive ? 'text-blue-500' : 'text-white hover:text-gray-300 transition duration-200'
                }
              >
                Register
              </NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
