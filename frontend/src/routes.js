import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from './components/Header';
import Footer from './components/Footer';
import Loader from './components/Loader'; 

const HomePage = lazy(() => import('./pages/Home'));
const AboutPage = lazy(() => import('./pages/About'));
const Jobs = lazy(() => import('./pages/Jobs'));
const JobDetails = lazy(() => import('./pages/JobDetails'));
const SignIn = lazy(() => import('./pages/SignIn'));
const SignUp = lazy(() => import('./pages/SignUp'));
const UserProfile = lazy(() => import('./pages/UserProfile'));
const CreateJob = lazy(() => import('./pages/CreateJob'));
const NotFoundPage = lazy(() => import('./pages/NotFound'));
const EditJob=lazy(()=>import('./pages/EditJob'))

// PrivateRoute component to handle protected routes
const PrivateRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/signin" />;
};

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-gray-100">
        <Header />
        <main className="flex-grow pt-16">
          <Suspense fallback={<div className="flex items-center justify-center min-h-[60vh]"><Loader /></div>}>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/jobs/:jobId" element={<JobDetails />} />

              {/* Protected routes */}
              <Route path="/profile" element={<PrivateRoute><UserProfile /></PrivateRoute>} />
              <Route path="/post-job" element={<PrivateRoute><CreateJob /></PrivateRoute>} />
              <Route path="/jobs/:jobId/edit" element={<PrivateRoute><EditJob /></PrivateRoute>} />

              {/* Authentication routes */}
              <Route path="/signin" element={<SignIn />} />
              <Route path="/register" element={<SignUp />} />

              {/* 404 - Not Found route */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default AppRoutes;
