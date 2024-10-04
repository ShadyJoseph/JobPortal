import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signup } from '../store/actions/authActions';
import { useNavigate, Link } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Loader from '../components/Loader';

const InputField = ({ id, label, type, formik, showToggle, toggleVisibility }) => (
  <div className="mb-4 relative">
    <label className="block text-sm font-medium mb-1" htmlFor={id}>
      {label}
    </label>
    <input
      type={showToggle ? 'text' : type}
      id={id}
      {...formik.getFieldProps(id)}
      className={`w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
        formik.touched[id] && formik.errors[id] ? 'border-red-500' : ''
      }`}
    />
    {type === 'password' && (
      <span
        className="absolute right-3 top-10 text-gray-600 cursor-pointer"
        onClick={toggleVisibility}
        aria-label={showToggle ? 'Hide password' : 'Show password'}
      >
        {showToggle ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
      </span>
    )}
    {formik.touched[id] && formik.errors[id] && (
      <div className="text-red-500 text-sm">{formik.errors[id]}</div>
    )}
  </div>
);

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitError, setSubmitError] = useState(''); // State for submission errors

  const getPasswordStrength = (password) => {
    const strengthConditions = [
      password.length >= 6,
      /[a-zA-Z]/.test(password),
      /\d/.test(password),
      /[@$!%*?&]/.test(password),
    ];
    const metConditions = strengthConditions.filter(Boolean).length;

    if (metConditions <= 1) return 'Weak';
    if (metConditions === 2) return 'Moderate';
    return 'Strong';
  };

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('First name is required.'),
      lastName: Yup.string().required('Last name is required.'),
      email: Yup.string()
        .email('Invalid email format.')
        .required('Email is required.'),
      password: Yup.string()
        .min(8, 'Password must be at least 8 characters long.')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter.')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter.')
        .matches(/\d/, 'Password must contain at least one digit.')
        .matches(/[@$!%*?&]/, 'Password must contain at least one special character.')
        .required('Password is required.'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], "Passwords don't match")
        .required('Confirm Password is required.'),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await dispatch(signup(values)).unwrap();
        navigate('/');
      } catch (err) {
        // Extract the error message from error.response.data if available
        const message = err.response?.data || 'An unexpected error occurred';
        setSubmitError(message); // Set the error message to be displayed
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6">Sign Up</h2>

        {submitError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{submitError}</span> {/* Display the submit error */}
          </div>
        )}

        <form onSubmit={formik.handleSubmit}>
          <InputField
            id="firstName"
            label="First Name"
            type="text"
            formik={formik}
          />
          <InputField
            id="lastName"
            label="Last Name"
            type="text"
            formik={formik}
          />
          <InputField
            id="email"
            label="Email"
            type="email"
            formik={formik}
          />
          <InputField
            id="password"
            label="Password"
            type="password"
            formik={formik}
            showToggle={showPassword}
            toggleVisibility={() => setShowPassword(!showPassword)}
          />
          <p
            className={`mt-1 text-sm ${
              getPasswordStrength(formik.values.password) === 'Strong'
                ? 'text-green-500'
                : getPasswordStrength(formik.values.password) === 'Moderate'
                ? 'text-yellow-500'
                : 'text-red-500'
            }`}
          >
            Password Strength: {getPasswordStrength(formik.values.password)}
          </p>
          <InputField
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            formik={formik}
            showToggle={showConfirmPassword}
            toggleVisibility={() => setShowConfirmPassword(!showConfirmPassword)}
          />
          <button
            type="submit"
            className={`w-full p-2 rounded transition duration-200 flex items-center justify-center ${
              formik.isSubmitting
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-500'
            }`}
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? (
              <Loader height="25" width="25" />
            ) : (
              'Sign Up'
            )}
          </button>
        </form>

        <div className="mt-4 text-sm text-center">
          <span>Already have an account? </span>
          <Link to="/signin" className="text-blue-500 hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
