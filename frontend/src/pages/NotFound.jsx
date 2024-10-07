import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-2xl text-gray-600 mb-6">Oops! The page you're looking for doesn't exist.</p>
      <Link
        to="/"
        className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600 transition-colors duration-300"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
