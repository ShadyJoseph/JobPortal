import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signup } from '../store/actions/authActions';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'; // Icons for password visibility toggle
import { Link } from 'react-router-dom'; // For linking to the sign-in page

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate for redirection
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [successMessage, setSuccessMessage] = useState(null); // Success message state

  // Function to validate email
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Function to calculate password strength
  const getPasswordStrength = (password) => {
    if (password.length < 6) return 'Weak';
    if (password.length >= 6 && /[a-z]/i.test(password) && /\d/.test(password)) return 'Moderate';
    if (password.length >= 8 && /[a-z]/i.test(password) && /\d/.test(password) && /[@$!%*?&]/.test(password)) return 'Strong';
    return 'Weak';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (!validateEmail(email)) {
      setError('Invalid email format.');
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setIsLoading(true); // Start loading
    dispatch(signup({ email, password }))
      .unwrap()
      .then(() => {
        setIsLoading(false);
        setSuccessMessage('Sign up successful! Redirecting to home...');
        setTimeout(() => {
          navigate('/'); // Navigate to the home page after sign-up
        }, 1500); // Short delay before redirect
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err.message);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
        
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}

        {/* Sign Up Form */}
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
              {showPassword ? <AiOutlineEye /> :  <AiOutlineEyeInvisible />}
            </span>
            {/* Password Strength Indicator */}
            <p className={`mt-1 text-sm ${getPasswordStrength(password) === 'Strong' ? 'text-green-500' : getPasswordStrength(password) === 'Moderate' ? 'text-yellow-500' : 'text-red-500'}`}>
              Password Strength: {getPasswordStrength(password)}
            </p>
          </div>

          <div className="mb-4 relative">
            <label className="block text-sm font-medium mb-1" htmlFor="confirm-password">
              Confirm Password
            </label>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
            <span
              className="absolute right-3 top-10 text-gray-600 cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <AiOutlineEye /> :   <AiOutlineEyeInvisible /> }
            </span>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-500 transition"
            disabled={isLoading}
          >
            {isLoading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>

        {/* Already have an account? */}
        <div className="mt-4 text-sm text-center">
          <span>Already have an account? </span>
          <Link to="/signin" className="text-blue-500 hover:underline">Sign In</Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
