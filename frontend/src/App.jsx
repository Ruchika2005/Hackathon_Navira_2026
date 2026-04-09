import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function NavigationWrapper() {
  const location = useLocation();
  const isDashboard = location.pathname === '/dashboard';

  return (
    <>
      {!isDashboard && (
        <header className="w-full bg-blue-800 text-white p-6 shadow-md text-center">
          <h1 className="text-3xl font-extrabold tracking-wide">Navira Sandbox</h1>
        </header>
      )}
      
      <main className={`flex-1 flex w-full ${!isDashboard ? 'items-center justify-center p-6 max-w-2xl mx-auto' : ''}`}>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </main>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
        <NavigationWrapper />
      </div>
    </BrowserRouter>
  );
}

export default App;
