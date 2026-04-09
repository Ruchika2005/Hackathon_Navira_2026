import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
        <header className="w-full bg-blue-800 text-white p-6 shadow-md text-center">
          <h1 className="text-3xl font-extrabold tracking-wide">Navira Sandbox</h1>
        </header>
        
        <main className="flex-1 flex items-center justify-center p-6 w-full max-w-2xl mx-auto">
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
