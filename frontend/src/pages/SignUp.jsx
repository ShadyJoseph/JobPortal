import React from 'react';
import { useDispatch } from 'react-redux';
import { signup } from '../store/actions/authActions';
import { useNavigate, Link } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Loader from '../components/Loader';

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email format.')
        .required('Email is required.'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters long.')
        .required('Password is required.'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], "Passwords don't match")
        .required('Confirm Password is required.'),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        await dispatch(signup({ email: values.email, password: values.password })).unwrap();
        navigate('/');
      } catch (err) {
        setErrors({ submit: err.message });
      } finally {
        setSubmitting(false);
      }
    },
  });

  const getPasswordStrength = (password) => {
    if (password.length < 6) return 'Weak';
    if (password.length >= 6 && /[a-z]/i.test(password) && /\d/.test(password)) return 'Moderate';
    if (password.length >= 8 && /[a-z]/i.test(password) && /\d/.test(password) && /[@$!%*?&]/.test(password)) return 'Strong';
    return 'Weak';
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6">Sign Up</h2>

        {formik.errors.submit && <p className="text-red-500 mb-4">{formik.errors.submit}</p>}

        {/* Sign Up Form */}
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              {...formik.getFieldProps('email')}
              className={`w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${formik.touched.email && formik.errors.email ? 'border-red-500' : ''}`}
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
              className={`w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${formik.touched.password && formik.errors.password ? 'border-red-500' : ''}`}
            />
            <span
              className="absolute right-3 top-10 text-gray-600 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            </span>
            <p className={`mt-1 text-sm ${getPasswordStrength(formik.values.password) === 'Strong' ? 'text-green-500' : getPasswordStrength(formik.values.password) === 'Moderate' ? 'text-yellow-500' : 'text-red-500'}`}>
              Password Strength: {getPasswordStrength(formik.values.password)}
            </p>
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-500 text-sm">{formik.errors.password}</div>
            )}
          </div>

          <div className="mb-4 relative">
            <label className="block text-sm font-medium mb-1" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              {...formik.getFieldProps('confirmPassword')}
              className={`w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'border-red-500' : ''}`}
            />
            <span
              className="absolute right-3 top-10 text-gray-600 cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
            >
              {showConfirmPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            </span>
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <div className="text-red-500 text-sm">{formik.errors.confirmPassword}</div>
            )}
          </div>

          <button
            type="submit"
            className={`w-full p-2 rounded transition duration-200 flex items-center justify-center ${formik.isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-500'}`}
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? <Loader height="25" width="25" color="#ffffff" /> : 'Sign Up'}
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
