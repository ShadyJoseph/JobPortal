import React from 'react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <div className="container mx-auto py-12 px-4 lg:px-8">
      <div className="bg-gray-100 rounded-lg shadow-lg p-6 lg:p-12">
        {/* Heading Section */}
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">About Job Portal</h1>
        
        {/* Introduction Section */}
        <p className="text-lg text-gray-700 text-center mb-8">
          Welcome to Job Portal! We are committed to connecting job seekers with top employers across various industries.
        </p>

        {/* Mission Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Our Mission</h2>
          <p className="text-gray-600">
            Our mission is to streamline the job search process by providing a user-friendly platform that enables job seekers to
            easily find opportunities, and for employers to discover the best talent. We aim to foster a community where career growth
            and business success intersect.
          </p>
        </section>

        {/* Services Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">What We Offer</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Comprehensive job listings in various industries.</li>
            <li>Easy application process with real-time job status tracking.</li>
            <li>Resources for career growth, including blogs and webinars.</li>
            <li>Tools for employers to find and screen top candidates efficiently.</li>
          </ul>
        </section>

        {/* Team Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Meet the Team</h2>
          <p className="text-gray-600">
            Our team is made up of professionals dedicated to improving the job search and hiring experience. With years of
            experience in human resources and recruitment, we understand the needs of both job seekers and employers.
          </p>
        </section>

        {/* Closing Section */}
        <section className="text-center mt-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Join Us Today!</h2>
          <p className="text-gray-600 mb-6">
            Whether you're looking for your next career move or trying to find the perfect candidate for your team, Job Portal is here to help you succeed.
          </p>

          {/* Link to Home Page */}
          <Link to="/">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-all duration-300">
              Get Started
            </button>
          </Link>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
