import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import Login            from './pages/Login';
import Signup           from './pages/Signup';
import Dashboard        from './pages/Dashboard';
import Simulations      from './pages/Simulations';
import SimulationPassword from './pages/SimulationPassword';
import SimulationUPI    from './pages/SimulationUPI';

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
          {/* Catch-all → Login */}
          <Route path="*"                       element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}
