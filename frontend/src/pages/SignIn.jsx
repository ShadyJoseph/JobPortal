import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../store/actions/authActions';
import { Link } from 'react-router-dom'; // For linking to the Register page
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'; // For password visibility

const SignIn = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Password visibility toggle
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    if (!validateEmail(email)) {
      setError('Invalid email format.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setIsLoading(true); // Start loading

    dispatch(login({ email, password }))
      .unwrap()
      .then(() => setIsLoading(false)) // Stop loading on success
      .catch((err) => {
        setIsLoading(false); // Stop loading on error
        setError(err.message);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6">Sign In</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        
        {/* Sign In Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="mb-4 relative">
            <label className="block text-sm font-medium mb-1" htmlFor="password">
              Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
            <span
              className="absolute right-3 top-10 text-gray-600 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ?  <AiOutlineEye /> :  <AiOutlineEyeInvisible />}
            </span>
          </div>

          <div className="flex items-center mb-4">
            <input type="checkbox" id="rememberMe" className="mr-2" />
            <label htmlFor="rememberMe" className="text-sm">Remember Me</label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-500 transition"
            disabled={isLoading}
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        {/* Forgot Password & Register Links */}
        <div className="mt-4 text-sm text-center">
          <Link to="/forgot-password" className="text-blue-500 hover:underline">Forgot your password?</Link>
        </div>
        <div className="mt-2 text-sm text-center">
          <span>Don't have an account? </span>
          <Link to="/register" className="text-blue-500 hover:underline">Register here</Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
