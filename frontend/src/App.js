import React from 'react';
import { useState } from 'react';

import './App.css';
import { Route, Routes, Navigate, BrowserRouter, HashRouter } from 'react-router-dom';
import Cookies from 'js-cookie';  // Assuming you're using cookies for authentication and role verification.

import SADash from './Components/SuperAdmin/Dashboard/SA_Dashboard';
import Home from './Components/Home/components/Home';
import InternDash from './Components/Intern/Intern_Dashboard';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import SAJobDesc from './Components/SuperAdmin/SAViewJobs/SAJobDesc';
import QuizAttempt from './Components/Intern/quiz/QuizAttempt';
import UserQuizAnalysis from './Components/Intern/quiz/userAnalyze';
import AnalyzeQuiz from './Components/SuperAdmin/Quiz/Analyze/Analyze';
import HRDash from './Components/HRS/Dashboard/HR_Dash';
import GuestDashboard from './Components/Guest/Guest_Dashboard';
import QuizResults from './Components/Intern/quiz/results';

import { store } from './Components/Context/ContextApi';

import Results from './Components/Results/Results';
import ResultsFormate from './Components/Results/ResultsFormate';

// PrivateRoute to handle role-based route protection
function PrivateRoute({ element, role }) {
  const userRole = Cookies.get('role');
  const verified = Cookies.get('verified');
  if (verified === 'true' && userRole === role) {
    return element;
  }
  toast.warning('Session expired. Please login again.');
  return <Navigate to="/" />;
}

function App() {
  const [results, SetResults] = useState([]);
  return (
    <div className=''>
      <ToastContainer autoClose={5000} />
      <BrowserRouter>
        {/* <HashRouter basepath='/RamanaSoft/'> */}
        <store.Provider value={[results, SetResults]}>
          <Routes>
            <Route path='/CyberResults' element={<Results />} />
            <Route element={<ResultsFormate />} />
          </Routes>
        </store.Provider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home defaultTab="home" />} />
          <Route path="/About" element={<Home defaultTab="About" />} />
          <Route path="/Contact" element={<Home defaultTab="Contact" />} />
          <Route path="/Jobs" element={<Home defaultTab="Jobs" />} />
          <Route path="/Jobs/:id" element={<Home defaultTab="Jobs" />} />
          <Route path="/privacy-policy" element={<Home defaultTab="PrivacyPolicy" />} />
          <Route path="/security" element={<Home defaultTab="Security" />} />
          <Route path="/accessibility" element={<Home defaultTab="accessibility" />} />
          <Route path="/cookies" element={<Home defaultTab="Cookies" />} />
          <Route path="/results/:quizToken/:userId" element={<QuizResults />} />

          {/* Registration and Login */}
          <Route path="/register/intern" element={<Home defaultTab="InternReg" />} />
          <Route path="/register/hr" element={<Home defaultTab="HrReg" />} />
          <Route path="/register/guest" element={<Home defaultTab="GuestReg" />} />
          <Route path="/login" element={<Home defaultTab="GuestLogin" />} />

          <Route path="/login/hr" element={<Home defaultTab="HRLogin" />} />
          <Route path="/login/SA" element={<Home defaultTab="SuperAdminLogin" />} />

          {/* Intern Routes */}
          <Route path="/test/:token" element={<PrivateRoute role="intern" element={<QuizAttempt />} />} />
          <Route path="/quiz-analysis/:userId/:quizToken" element={<PrivateRoute role="intern" element={<UserQuizAnalysis />} />} />
          <Route path="/intern_dash/*" element={<PrivateRoute role="intern" element={<InternDash />} />} />
          <Route path="/intern_dash/applied" element={<PrivateRoute role="intern" element={<InternDash defaultTab="Applied" />} />} />
          <Route path="/intern_dash/jobs" element={<PrivateRoute role="intern" element={<InternDash defaultTab="Jobs" />} />} />
          <Route path="/intern_dash/lms" element={<PrivateRoute role="intern" element={<InternDash defaultTab="LMS" />} />} />
          <Route path="/intern_dash/quiz" element={<PrivateRoute role="intern" element={<InternDash defaultTab="Quiz" />} />} />
          <Route path="/intern_dash/profile" element={<PrivateRoute role="intern" element={<InternDash defaultTab="Profile" />} />} />
          <Route path="/intern_dash/achievements" element={<PrivateRoute role="intern" element={<InternDash defaultTab="Achievements" />} />} />

          <Route path="/intern_dash" element={<Navigate to="/intern_dash/dashboard" />} /> {/* Redirect to Dashboard */}
          <Route path="/intern_dash/quiz-analysis/:quizToken" element={<UserQuizAnalysis />} />
          {/* HR Routes */}
          <Route path="/HR_dash/*" element={<PrivateRoute role="HR" element={<HRDash />} />} />

          {/* Super Admin (SA) Routes */}
          <Route path="/SA_dash/*" element={<PrivateRoute role="SA" element={<SADash />} />} />
          <Route path="/SA_dash/job/:jobId" element={<PrivateRoute role="SA" element={<SAJobDesc />} />} />
          <Route path="SA/analyze/:token" element={<PrivateRoute role="SA" element={<AnalyzeQuiz />} />} />

          {/* Guest Routes */}
          <Route path="/extern_dash/*" element={<PrivateRoute role="Guest" element={<GuestDashboard defaultTab="Applied" />} />} />
        </Routes>
        {/* </HashRouter> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
