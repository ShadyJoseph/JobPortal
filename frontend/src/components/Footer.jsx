import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/Logo.jpg'; 
import { FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa'; 
import { BsFillHeartFill } from 'react-icons/bs'; // Add more icons as needed

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 mt-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0 md:space-x-12 px-4">
        
        {/* Logo Section */}
        <div className="flex items-center space-x-4">
          <img src={Logo} alt="Job Portal Logo" className="h-10 w-auto" />
          <span className="text-2xl font-bold tracking-wide">
            Job Portal
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 text-lg">
          <Link to="/" className="text-gray-400 hover:text-white transition-all duration-300 ease-in-out">
            Home
          </Link>
          <Link to="/jobs" className="text-gray-400 hover:text-white transition-all duration-300 ease-in-out">
            Jobs
          </Link>
          <Link to="/about" className="text-gray-400 hover:text-white transition-all duration-300 ease-in-out">
            About
          </Link>
        </nav>

        {/* Copyright and Social Links */}
        <div className="text-center md:text-right">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Job Portal. All Rights Reserved. 
            <span className="text-red-500"><BsFillHeartFill className="inline-block h-4 w-4 mx-1" /></span>
          </p>

          {/* Social Media Links */}
          <div className="mt-4 flex justify-center md:justify-center space-x-5">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-300 transition-all duration-300 ease-in-out"
            >
              <FaFacebookF className="bg-gray-800 p-2 rounded-full h-8 w-8 hover:bg-blue-600 transition duration-300" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-300 transition-all duration-300 ease-in-out"
            >
              <FaTwitter className="bg-gray-800 p-2 rounded-full h-8 w-8 hover:bg-blue-400 transition duration-300" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-300 transition-all duration-300 ease-in-out"
            >
              <FaLinkedinIn className="bg-gray-800 p-2 rounded-full h-8 w-8 hover:bg-blue-700 transition duration-300" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
