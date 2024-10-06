import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/Home';
import AboutPage from './pages/About';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Jobs from './pages/Jobs';
import UserProfile from './pages/UserProfile';
import CreateJob from './pages/CreateJob';
import JobDetails from './pages/JobDetails';
const AppRoutes = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-100">
        <Header />
        <main className="flex-grow pt-16">
          <Routes>
            {/* Public routes available to unauthenticated users */}
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/jobs/:jobId" element={<JobDetails />} />

            {/* Restricted routes for authenticated users only */}
            <Route path="/profile" element={isAuthenticated ? <UserProfile /> : <Navigate to="/signin" />} />
            <Route path="/post-job" element={isAuthenticated ? <CreateJob /> : <Navigate to="/signin" />} />

            {/* Authentication routes */}
            <Route path="/signin" element={isAuthenticated ? <Navigate to="/" /> : <SignIn />} />
            <Route path="/register" element={isAuthenticated ? <Navigate to="/" /> : <SignUp />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default AppRoutes;
