// pages/HomePage.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBriefcase, FaBullhorn, FaPalette, FaChartLine, FaEllipsisH } from 'react-icons/fa'; // Importing icons

const HomePage = () => {
  const categories = [
    { name: 'Engineering', icon: <FaBriefcase className="text-gray-900 text-4xl" /> },
    { name: 'Marketing', icon: <FaBullhorn className="text-gray-900 text-4xl" /> },
    { name: 'Design', icon: <FaPalette className="text-gray-900 text-4xl" /> },
    { name: 'Sales', icon: <FaChartLine className="text-gray-900 text-4xl" /> },
    { name: 'Other', icon: <FaEllipsisH className="text-gray-900 text-4xl" /> },
  ]; // List of categories with icons
  const navigate = useNavigate(); // Hook for navigation

  return (
    <div className="container mx-auto p-6">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow-lg p-12 mb-16 text-center transition-transform duration-200 relative overflow-hidden">
        <div className="absolute inset-0 opacity-50 bg-cover bg-center" style={{ backgroundImage: "url('path/to/your/background-image.jpg')" }} />
        <h1 className="text-5xl font-extrabold mb-6 relative">Welcome to the Job Portal</h1>
        <p className="text-lg mb-8 relative">
          Your one-stop destination for finding the best job opportunities. Browse through various job categories and take the next step in your career!
        </p>
        <Link to="/signin">
          <button className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-200 transform hover:scale-105">
            Get Started
          </button>
        </Link>
      </div>

      {/* Job Categories Section */}
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Explore Job Categories</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {categories.map((category, index) => (
          <div key={index} className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform duration-200 flex flex-col items-center text-center">
            {category.icon}
            <h3 className="text-2xl font-bold mb-4 text-blue-600">{category.name}</h3>
            <p className="text-gray-700">Discover opportunities in {category.name.toLowerCase()}.</p>
            <button 
              className="mt-6 text-blue-600 hover:underline transition-all duration-200 transform hover:scale-105" 
              onClick={() => navigate(`/jobs?category=${category.name}`)} // Navigate to jobs based on category
            >
              View Jobs
            </button>
          </div>
        ))}
      </div>

      {/* Additional Information Section */}
      <div className="text-center mt-12">
        <p className="text-gray-600 mb-4">Join our community and find the job that fits you best!</p>
        <Link to="/about">
          <button className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow-lg hover:bg-blue-700 transition-colors duration-200">
            Learn More About Us
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
