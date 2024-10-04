
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Import useSelector to access the Redux state
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/Home';
import AboutPage from './pages/About';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Jobs from './pages/Jobs';
import JobDetailsPage from './pages/JobsDetails';
import UserProfile from './pages/UserProfile';

const AppRoutes = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // Get authentication state

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow pt-16">
          <Routes>
            {/* Redirect to Home if authenticated, otherwise to SignUp */}
            <Route path="/" element={isAuthenticated ? <Navigate to="/home" /> : <SignUp />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/jobs/:id" element={<JobDetailsPage />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/profile" element={<UserProfile />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default AppRoutes;
