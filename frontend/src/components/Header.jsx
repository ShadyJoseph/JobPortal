import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { MdHome, MdWork, MdPerson, MdPostAdd, MdLogin, MdPersonAdd, MdLogout, MdMenu, MdClose } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/Logo.jpg';
import { logout } from '../store/actions/authActions';
import { resetLogoutSuccess } from '../store/reducers/authReducer';
import LogoutConfirmation from './LogoutConfirmation';

const Header = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user, logoutSuccess } = useSelector((state) => state.auth);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // State for managing menu visibility
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoading(true); // Start loader
    dispatch(logout()); // Dispatch the logout action
  };

  useEffect(() => {
    if (logoutSuccess) {
      setIsLoading(false); // Stop loader when logout is complete
      setShowLogoutConfirm(false); // Close the modal
      dispatch(resetLogoutSuccess()); // Reset logout success flag
      navigate('/signin'); // Redirect to the sign-in page after logout
    }
  }, [logoutSuccess, dispatch, navigate]);

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

        {/* Hamburger Menu Icon */}
        <div className="block md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-white focus:outline-none">
            {menuOpen ? <MdClose className="h-6 w-6" /> : <MdMenu className="h-6 w-6" />}
          </button>
        </div>

        {/* Navigation Links */}
        <nav className={`md:flex items-center space-x-8 ${menuOpen ? 'block' : 'hidden'} md:block md:static absolute top-16 left-0 right-0 bg-gray-900 md:bg-transparent transition-all duration-300 ease-in-out md:shadow-none shadow-lg md:w-auto w-full`}>
          <div className="flex flex-col md:flex-row">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? 'text-blue-400 font-semibold flex items-center space-x-2 p-4' : 'text-white hover:text-gray-300 transition duration-200 flex items-center space-x-2 p-4'
              }
            >
              <MdHome className="h-5 w-5" />
              <span>Home</span>
            </NavLink>
            <NavLink
              to="/jobs"
              className={({ isActive }) =>
                isActive ? 'text-blue-400 font-semibold flex items-center space-x-2 p-4' : 'text-white hover:text-gray-300 transition duration-200 flex items-center space-x-2 p-4'
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
                    isActive ? 'text-blue-400 font-semibold flex items-center space-x-2 p-4' : 'text-white hover:text-gray-300 transition duration-200 flex items-center space-x-2 p-4'
                  }
                >
                  <MdPerson className="h-5 w-5" />
                  <span>{user?.firstName}'s Profile</span>
                </NavLink>
                <button
                  onClick={() => setShowLogoutConfirm(true)}
                  className="text-white hover:text-gray-300 transition duration-200 focus:outline-none font-semibold flex items-center space-x-2 p-4"
                >
                  <MdLogout className="h-5 w-5" />
                  <span>Logout</span>
                </button>
                {user?.role === 1 && (
                  <NavLink
                    to="/post-job"
                    className={({ isActive }) =>
                      isActive ? 'text-blue-400 font-semibold flex items-center space-x-2 p-4' : 'text-white hover:text-gray-300 transition duration-200 flex items-center space-x-2 p-4'
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
                    isActive ? 'text-blue-400 font-semibold flex items-center space-x-2 p-4' : 'text-white hover:text-gray-300 transition duration-200 flex items-center space-x-2 p-4'
                  }
                >
                  <MdLogin className="h-5 w-5" />
                  <span>Sign In</span>
                </NavLink>
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    isActive ? 'text-blue-400 font-semibold flex items-center space-x-2 p-4' : 'text-white hover:text-gray-300 transition duration-200 flex items-center space-x-2 p-4'
                  }
                >
                  <MdPersonAdd className="h-5 w-5" />
                  <span>Register</span>
                </NavLink>
              </>
            )}
          </div>
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
