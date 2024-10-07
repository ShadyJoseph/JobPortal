import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/Logo.jpg'; 
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa'; 
import { BsFillHeartFill } from 'react-icons/bs';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 mt-8">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6">
        
        {/* Logo Section */}
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
          <img src={Logo} alt="Job Portal Logo" className="h-12 w-auto" />
          <span className="text-2xl font-bold tracking-wide text-white">
            Job Portal
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8 text-lg mt-4">
          <Link to="/" className="text-gray-400 hover:text-white transition-all duration-300 ease-in-out text-center">
            Home
          </Link>
          <Link to="/jobs" className="text-gray-400 hover:text-white transition-all duration-300 ease-in-out text-center">
            Jobs
          </Link>
          <Link to="/about" className="text-gray-400 hover:text-white transition-all duration-300 ease-in-out text-center">
            About
          </Link>
        </nav>

        {/* Social Media Links */}
        <div className="flex justify-center space-x-5 mt-6 md:mt-0">
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
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-300 transition-all duration-300 ease-in-out"
          >
            <FaInstagram className="bg-gray-800 p-2 rounded-full h-8 w-8 hover:bg-pink-600 transition duration-300" />
          </a>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="text-center mt-6">
        <p className="text-sm md:text-base text-gray-500 mb-4">
          &copy; {new Date().getFullYear()} Job Portal. All Rights Reserved. 
          <span className="text-red-500">
            <BsFillHeartFill className="inline-block h-4 w-4 mx-1" />
          </span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
