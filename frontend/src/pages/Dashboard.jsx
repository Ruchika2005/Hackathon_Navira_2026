import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, Box, CheckCircle } from 'lucide-react';

const textContent = {
  english: {
    welcome: "Welcome to the Platform",
    simTitle: "Simulations",
    simDesc: "Engage with state-of-the-art interactive 3D simulations.",
    quizTitle: "Quizzes",
    quizDesc: "Test your knowledge with challenging assessments.",
    logout: "Logout",
  },
  hindi: {
    welcome: "प्लेटफ़ॉर्म पर आपका स्वागत है",
    simTitle: "Simulations",
    simDesc: "अत्याधुनिक इंटरैक्टिव 3D simulations के साथ जुड़ें।",
    quizTitle: "Quizzes",
    quizDesc: "चुनौतीपूर्ण assessments के साथ अपने ज्ञान का परीक्षण करें।",
    logout: "लॉग आउट"
  },
  marathi: {
    welcome: "प्लॅटफॉर्मवर आपले स्वागत आहे",
    simTitle: "Simulations",
    simDesc: "अत्याधुनिक संवादात्मक 3D simulations सह व्यस्त रहा.",
    quizTitle: "Quizzes",
    quizDesc: "आव्हानात्मक assessments द्वारे आपल्या ज्ञानाची चाचणी घ्या.",
    logout: "लॉग आउट"
  }
};

export default function Dashboard() {
  const navigate = useNavigate();
  // Initialize language from localStorage, default to english
  const [lang, setLang] = useState(() => localStorage.getItem('language') || 'english');

  // Load language dynamically if it changes
  useEffect(() => {
    localStorage.setItem('language', lang);
  }, [lang]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('language');
    navigate('/login');
  };

  const t = textContent[lang] || textContent.english;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans w-full">
      
      {/* Navigation Bar matching the dark #111827 style */}
      <nav className="w-full bg-slate-900 border-b border-slate-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          <div className="flex items-center gap-3">
            <div className="bg-indigo-500 rounded-lg p-2.5">
              <Zap className="text-white w-6 h-6 fill-white" />
            </div>
            <span className="text-white text-2xl font-bold tracking-wide">Navira</span>
          </div>

          <div className="flex items-center gap-4">
            {/* Language Dropdown Selector in Nav */}
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className="bg-slate-800 text-slate-100 border border-slate-700 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer text-lg appearance-none font-medium hover:bg-slate-700 transition"
            >
              <option value="english">English</option>
              <option value="hindi">Hindi</option>
              <option value="marathi">Marathi</option>
            </select>

            <button
              onClick={handleLogout}
              className="bg-transparent border-2 border-slate-600 hover:border-slate-400 hover:bg-slate-800 text-white px-8 py-3 rounded-xl font-bold transition-all ml-4 text-lg focus-ring"
            >
              {t.logout}
            </button>
          </div>
        </div>
      </nav>

      <main className="flex-1 w-full max-w-5xl mx-auto mt-16 px-6">
        
        <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-12">
          {t.welcome}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card 1: Simulations */}
          <div className="bg-white rounded-3xl p-10 border border-slate-200 shadow-sm hover:shadow-xl transition-all cursor-pointer group hover:-translate-y-1">
            <div className="bg-indigo-100/80 w-20 h-20 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <Box className="w-10 h-10 text-indigo-500" />
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 mb-4">{t.simTitle}</h2>
            <p className="text-slate-600 text-xl font-medium leading-relaxed">
              {t.simDesc}
            </p>
          </div>

          {/* Card 2: Quizzes */}
          <div className="bg-white rounded-3xl p-10 border border-slate-200 shadow-sm hover:shadow-xl transition-all cursor-pointer group hover:-translate-y-1">
            <div className="bg-teal-100/80 w-20 h-20 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <CheckCircle className="w-10 h-10 text-teal-500" />
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 mb-4">{t.quizTitle}</h2>
            <p className="text-slate-600 text-xl font-medium leading-relaxed">
              {t.quizDesc}
            </p>
          </div>

        </div>
      </main>

    </div>
  );
}
