import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="container mx-auto p-6">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow-lg p-12 mb-16 text-center transition-transform duration-200 ">
        <h1 className="text-5xl font-extrabold mb-6">
          Welcome to the Job Portal
        </h1>
        <p className="text-lg mb-8">
          Your one-stop destination for finding the best job opportunities. Browse through various job listings and take the next step in your career!
        </p>
        <Link to="/signin">
          <button className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-200 transform hover:scale-105">
            Get Started
          </button>
        </Link>
      </div>

      {/* Job Categories Section */}
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Explore Job Categories
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {["Technology", "Finance", "Marketing"].map((category, index) => (
          <div
            key={index}
            className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform duration-200"
          >
            <h3 className="text-2xl font-bold mb-4 text-blue-600">
              {category}
            </h3>
            <p className="text-gray-700">
              Discover opportunities in {category.toLowerCase()}.
            </p>
            <button className="mt-6 text-blue-600 hover:underline">
              View Jobs
            </button>
          </div>
        ))}
      </div>

      {/* Featured Jobs Section */}
      <div className="text-center mb-16">
        <h2 className="text-4xl font-extrabold mb-6 text-gray-800">
          Featured Jobs
        </h2>
        <p className="text-gray-600 mb-6">
          Check out some of the latest job openings in our portal.
        </p>
        <Link to="/jobs">
          <button className="bg-blue-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-200 transform hover:scale-105">
            View All Jobs
          </button>
        </Link>
      </div>

      {/* Newsletter Section */}
      <div className="bg-blue-600 text-white rounded-lg shadow-lg p-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Stay Updated!</h2>
        <p className="mb-4">
          Subscribe to our newsletter and never miss an opportunity.
        </p>
        <div className="flex justify-center">
          <input
            type="email"
            className="p-3 rounded-l-md focus:outline-none text-gray-900"
            placeholder="Enter your email"
          />
          <button className="bg-white text-blue-600 font-bold py-3 px-8 rounded-r-md hover:bg-gray-100 transition-colors duration-200">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
