import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Smartphone, ChevronRight, BookOpen } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import Navbar from '../components/Navbar';

export default function Dashboard() {
  const navigate  = useNavigate();
  const { t }     = useLanguage();
  const userName  = 'Friend'; // Could be stored in localStorage after login

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col">
      <Navbar />

      <main className="flex-1 w-full max-w-3xl mx-auto px-4 py-8" id="main-content">

        {/* Welcome banner */}
        <div className="card p-6 sm:p-8 mb-8 bg-blue-700 text-white border-0 shadow-lg">
          <p className="text-xl font-semibold mb-1 text-blue-200">Hello! 👋</p>
          <h1 className="text-4xl font-black leading-tight mb-3">{t('welcome')}</h1>
          <p className="text-lg text-blue-100 font-medium">
            Choose what you'd like to learn today. Take your time — there's no rush!
          </p>
        </div>

        {/* Section heading */}
        <h2 className="text-2xl font-black text-slate-800 mb-4 px-1">📚 What would you like to do?</h2>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

          {/* Simulations Card */}
          <button
            onClick={() => navigate('/simulations')}
            className="card p-6 text-left group hover:shadow-lg hover:border-indigo-200 border-2 border-transparent
                       focus:outline-none focus:ring-4 focus:ring-indigo-400 focus:ring-offset-2
                       transition-all duration-200 active:scale-[0.98]"
            aria-label="Go to Simulations — practice digital skills"
          >
            <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-indigo-200 transition-colors">
              <ShieldCheck className="w-9 h-9 text-indigo-700" aria-hidden="true" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-2">{t('simulations')}</h3>
            <p className="text-lg text-slate-600 font-medium leading-snug mb-4">{t('sim_desc')}</p>
            <span className="inline-flex items-center gap-2 text-indigo-700 font-bold text-base">
              {t('start')} <ChevronRight className="w-5 h-5" aria-hidden="true" />
            </span>
          </button>

          {/* Quizzes Card */}
          <button
            onClick={() => navigate('/quizzes')}
            className="card p-6 text-left group hover:shadow-lg hover:border-teal-200 border-2 border-transparent
                       focus:outline-none focus:ring-4 focus:ring-teal-400 focus:ring-offset-2
                       transition-all duration-200 active:scale-[0.98] cursor-pointer"
            aria-label="Go to Quizzes — test your digital safety knowledge"
          >
            <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-teal-200 transition-colors">
              <BookOpen className="w-9 h-9 text-teal-700" aria-hidden="true" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-2">{t('quizzes')}</h3>
            <p className="text-lg text-slate-600 font-medium leading-snug mb-4">{t('quiz_desc')}</p>
            <span className="inline-flex items-center gap-2 text-teal-700 font-bold text-base">
              {t('start')} <ChevronRight className="w-5 h-5" aria-hidden="true" />
            </span>
          </button>
        </div>

        {/* Tip banner */}
        <div className="mt-8 card p-5 bg-amber-50 border-2 border-amber-200 flex items-start gap-4">
          <span className="text-3xl" aria-hidden="true">💡</span>
          <div>
            <p className="text-lg font-bold text-amber-900">Tip for today</p>
            <p className="text-base text-amber-800 mt-1 font-medium">
              Always use a password that has letters, numbers, and symbols together. It keeps your account safe!
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
