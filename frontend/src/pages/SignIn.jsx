import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { signin } from '../store/actions/authActions';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'; 
import Loader from '../components/Loader';

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email format')
        .required('Email is required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters long')
        .required('Password is required'),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        await dispatch(signin({ email: values.email, password: values.password })).unwrap();
        navigate('/');
      } catch (err) {
        setErrors({ submit: err.message });
      } finally {
        setSubmitting(false);
      }
    },
  });

  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6">Sign In</h2>
        {formik.errors.submit && <div className="text-red-500 mb-4">{formik.errors.submit}</div>}

        {/* Sign In Form */}
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              {...formik.getFieldProps('email')}
              className={`w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ${formik.touched.email && formik.errors.email ? 'border-red-500' : ''}`}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500 text-sm">{formik.errors.email}</div>
            )}
          </div>

          <div className="mb-4 relative">
            <label className="block text-sm font-medium mb-1" htmlFor="password">
              Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              {...formik.getFieldProps('password')}
              className={`w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ${formik.touched.password && formik.errors.password ? 'border-red-500' : ''}`}
            />
            <span
              className="absolute right-3 top-10 text-gray-600 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            </span>
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-500 text-sm">{formik.errors.password}</div>
            )}
          </div>

          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="rememberMe"
              {...formik.getFieldProps('rememberMe')}
              className="mr-2"
            />
            <label htmlFor="rememberMe" className="text-sm">Remember Me</label>
          </div>

          <button
            type="submit"
            className={`w-full p-2 rounded transition duration-200 flex items-center justify-center ${formik.isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500'} text-white`}
            disabled={formik.isSubmitting}
            aria-label={formik.isSubmitting ? 'Signing in' : 'Sign In'}
          >
            {formik.isSubmitting ? (
              <Loader height="25" width="25" color="#ffffff" aria-label="Loading..." />
            ) : (
              'Sign In'
            )}
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
