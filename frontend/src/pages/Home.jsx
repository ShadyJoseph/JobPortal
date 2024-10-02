import React from 'react';

const HomePage = () => {
  return (
    <div className="container mx-auto p-6">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg shadow-md p-8 mb-12 text-center">
        <h1 className="text-5xl font-extrabold mb-4">
          Welcome to the Job Portal
        </h1>
        <p className="text-lg mb-8">
          Your one-stop destination for finding the best job opportunities.
          Browse through various job listings and take the next step in your career!
        </p>
        <button className="bg-white text-blue-600 font-semibold py-3 px-6 rounded shadow-md hover:bg-gray-100 transition-colors duration-200">
          Get Started
        </button>
      </div>

      {/* Job Categories Section */}
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Explore Job Categories
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-transform duration-200">
          <h3 className="text-2xl font-bold mb-2 text-blue-600">Technology</h3>
          <p className="text-gray-700">
            Explore jobs in software development, data science, and more.
          </p>
          <button className="mt-4 text-blue-500 hover:underline">
            View Jobs
          </button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-transform duration-200">
          <h3 className="text-2xl font-bold mb-2 text-blue-600">Finance</h3>
          <p className="text-gray-700">
            Discover opportunities in accounting, investment banking, and finance.
          </p>
          <button className="mt-4 text-blue-500 hover:underline">
            View Jobs
          </button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-transform duration-200">
          <h3 className="text-2xl font-bold mb-2 text-blue-600">Marketing</h3>
          <p className="text-gray-700">
            Find roles in digital marketing, branding, and sales.
          </p>
          <button className="mt-4 text-blue-500 hover:underline">
            View Jobs
          </button>
        </div>
      </div>

      {/* Featured Jobs Section */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold mb-6 text-gray-800">
          Featured Jobs
        </h2>
        <p className="text-gray-600 mb-6">
          Check out some of the latest job openings in our portal.
        </p>
        <button className="bg-blue-600 text-white font-bold py-3 px-6 rounded shadow-lg hover:bg-blue-700 transition-colors duration-200">
          View All Jobs
        </button>
      </div>

      {/* Newsletter Section */}
      <div className="bg-indigo-600 text-white rounded-lg shadow-md p-8 text-center">
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
          <button className="bg-white text-indigo-600 font-bold py-3 px-6 rounded-r-md hover:bg-gray-100 transition-colors duration-200">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
