import React from 'react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <main className="container mx-auto py-12 px-4 lg:px-8">
      <div className="bg-gray-100 rounded-lg shadow-lg p-6 lg:p-12">
        
        {/* Heading Section */}
        <section aria-labelledby="about-heading" className="text-center mb-12">
          <h1 id="about-heading" className="text-3xl lg:text-4xl font-bold text-gray-800 mb-6">
            About Job Portal
          </h1>
          <p className="text-lg lg:text-xl text-gray-700 max-w-3xl mx-auto">
            Welcome to Job Portal! We are committed to connecting job seekers with top employers across various industries.
          </p>
        </section>
        
        {/* Mission Section */}
        <section aria-labelledby="mission-heading" className="mb-12">
          <h2 id="mission-heading" className="text-2xl lg:text-3xl font-semibold mb-4 text-gray-800">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed">
            Our mission is to streamline the job search process by providing a user-friendly platform that enables job seekers to
            easily find opportunities, and for employers to discover the best talent. We aim to foster a community where career growth
            and business success intersect.
          </p>
        </section>

        {/* Services Section */}
        <section aria-labelledby="services-heading" className="mb-12">
          <h2 id="services-heading" className="text-2xl lg:text-3xl font-semibold mb-4 text-gray-800">What We Offer</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2 leading-relaxed">
            <li>Comprehensive job listings in various industries.</li>
            <li>Easy application process with real-time job status tracking.</li>
            <li>Resources for career growth, including blogs and webinars.</li>
            <li>Tools for employers to find and screen top candidates efficiently.</li>
          </ul>
        </section>

        {/* Team Section */}
        <section aria-labelledby="team-heading" className="mb-12">
          <h2 id="team-heading" className="text-2xl lg:text-3xl font-semibold mb-4 text-gray-800">Meet the Team</h2>
          <p className="text-gray-600 leading-relaxed">
            Our team is made up of professionals dedicated to improving the job search and hiring experience. With years of
            experience in human resources and recruitment, we understand the needs of both job seekers and employers.
          </p>
        </section>

        {/* Call to Action Section */}
        <section className="text-center mt-16">
          <h2 className="text-2xl lg:text-3xl font-semibold text-gray-800 mb-4">Join Us Today!</h2>
          <p className="text-gray-600 mb-6">
            Whether you're looking for your next career move or trying to find the perfect candidate for your team, Job Portal is here to help you succeed.
          </p>

          {/* Link to Home Page */}
          <Link to="/" aria-label="Navigate to the home page and get started">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-transform duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Get Started
            </button>
          </Link>
        </section>
      </div>
    </main>
  );
};

export default AboutPage;
