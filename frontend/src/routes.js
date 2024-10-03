// src/routes.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/Home';
import AboutPage from './pages/About';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Jobs from './pages/Jobs';
import JobDetailsPage from './pages/JobsDetails'

const AppRoutes = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow pt-16"> 
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/jobs/:id" element={<JobDetailsPage />} />
            <Route path="/jobs" element={<Jobs />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default AppRoutes;
