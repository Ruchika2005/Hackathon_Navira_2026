import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Zap, HelpCircle, LogOut, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar() {
  const navigate = useNavigate();
  const { lang, setLang, t } = useLanguage();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('language');
    navigate('/login');
  };

  return (
    <>
      <nav className="w-full bg-blue-800 shadow-lg" role="navigation" aria-label="Main navigation">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

          {/* Logo */}
          <Link
            to="/dashboard"
            className="flex items-center gap-2 focus:outline-none focus:ring-4 focus:ring-white/50 rounded-xl p-1"
            aria-label="Go to home"
          >
            <div className="bg-white/20 rounded-xl p-1.5">
              <Zap className="text-white w-5 h-5 fill-white" aria-hidden="true" />
            </div>
            <span className="text-white text-xl font-extrabold tracking-wide">Navira</span>
          </Link>

          {/* Right side controls */}
          <div className="flex items-center gap-2 sm:gap-3">

            {/* Language selector */}
            <div className="flex items-center gap-1.5 bg-white/10 rounded-xl px-2 py-1.5">
              <Globe className="text-white/80 w-4 h-4" aria-hidden="true" />
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value)}
                className="bg-transparent text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-white/50 rounded cursor-pointer"
                aria-label="Select language"
              >
                <option value="english" className="text-slate-900 bg-white">English</option>
                <option value="hindi"   className="text-slate-900 bg-white">हिंदी</option>
                <option value="marathi" className="text-slate-900 bg-white">मराठी</option>
              </select>
            </div>

            {/* Logout button */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white text-sm font-semibold
                         px-3 py-2 rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-white/50 min-h-[40px]"
              aria-label={t('logout')}
            >
              <LogOut className="w-4 h-4" aria-hidden="true" />
              <span className="hidden sm:inline">{t('logout')}</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Always-visible Help Button (FAB) */}
      <button
        className="help-fab"
        aria-label="Get help"
        onClick={() => alert('📞 Call us: 1800-XXX-XXXX\n📧 Email: help@navira.in\n\nWe are here to help you!')}
      >
        <HelpCircle className="w-5 h-5" aria-hidden="true" />
        <span>Help</span>
      </button>
    </>
  );
}
