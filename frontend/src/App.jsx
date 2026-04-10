import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import Login            from './pages/Login';
import Signup           from './pages/Signup';
import Dashboard        from './pages/Dashboard';
import Simulations      from './pages/Simulations';
import SimulationPassword from './pages/SimulationPassword';
import SimulationUPI    from './pages/SimulationUPI';
import SimulationScam   from './pages/SimulationScam';
import Quizzes          from './pages/Quizzes';
import QuizPhishing     from './pages/QuizPhishing';
import QuizSMS          from './pages/QuizSMS';
import QuizDeepfake     from './pages/QuizDeepfake';

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login"                  element={<Login />} />
          <Route path="/signup"                 element={<Signup />} />
          <Route path="/dashboard"              element={<Dashboard />} />
          <Route path="/simulations"            element={<Simulations />} />
          <Route path="/simulations/password"   element={<SimulationPassword />} />
          <Route path="/simulations/upi"        element={<SimulationUPI />} />
          <Route path="/simulations/scam"       element={<SimulationScam />} />
          <Route path="/quizzes"                element={<Quizzes />} />
          <Route path="/quizzes/phishing"       element={<QuizPhishing />} />
          <Route path="/quizzes/sms"            element={<QuizSMS />} />
          <Route path="/quizzes/deepfake"       element={<QuizDeepfake />} />
          {/* Catch-all → Login */}
          <Route path="*"                       element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}
