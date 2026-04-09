import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Smartphone, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import Navbar from '../components/Navbar';

export default function Simulations() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-emerald-50 flex flex-col">
      <Navbar />

      <main className="flex-1 w-full max-w-3xl mx-auto px-4 py-8">

        {/* Back */}
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-emerald-700 font-bold text-lg mb-8 hover:text-emerald-900 focus:outline-none focus:ring-4 focus:ring-emerald-400 rounded-xl p-1 min-h-[44px]"
          aria-label="Go back to home"
        >
          <ArrowLeft className="w-6 h-6" aria-hidden="true" /> {t('back')} to Home
        </button>

        <h1 className="text-4xl font-black text-slate-900 mb-2">{t('sim_hero_title')}</h1>
        <p className="text-xl text-slate-600 font-medium mb-8">{t('sim_hero_desc')}</p>

        {/* Square Cards */}
        <div className="grid grid-cols-2 gap-5 max-w-md">

          {/* Module 1 */}
          <button
            onClick={() => navigate('/simulations/password')}
            className="card aspect-square flex flex-col items-center justify-center gap-4 p-6
                       border-2 border-transparent hover:border-indigo-300 hover:shadow-xl
                       focus:outline-none focus:ring-4 focus:ring-indigo-400 focus:ring-offset-2
                       transition-all duration-200 active:scale-95 group cursor-pointer"
            aria-label="Password Security simulation"
          >
            <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center group-hover:bg-indigo-200 transition-colors">
              <ShieldCheck className="w-9 h-9 text-indigo-700" aria-hidden="true" />
            </div>
            <div className="text-center">
              <p className="text-xl font-black text-slate-900 leading-tight">{t('mod1_title')}</p>
              <p className="text-sm text-indigo-700 font-bold mt-1">▶  Start</p>
            </div>
          </button>

          {/* Module 2 */}
          <button
            onClick={() => navigate('/simulations/upi')}
            className="card aspect-square flex flex-col items-center justify-center gap-4 p-6
                       border-2 border-transparent hover:border-teal-300 hover:shadow-xl
                       focus:outline-none focus:ring-4 focus:ring-teal-400 focus:ring-offset-2
                       transition-all duration-200 active:scale-95 group cursor-pointer"
            aria-label="UPI Payment simulation"
          >
            <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center group-hover:bg-teal-200 transition-colors">
              <Smartphone className="w-9 h-9 text-teal-700" aria-hidden="true" />
            </div>
            <div className="text-center">
              <p className="text-xl font-black text-slate-900 leading-tight">{t('mod2_title')}</p>
              <p className="text-sm text-teal-700 font-bold mt-1">▶  Start</p>
            </div>
          </button>
        </div>

        {/* Encourage */}
        <div className="mt-10 card p-5 bg-green-50 border-2 border-green-200 flex items-center gap-4 max-w-md">
          <span className="text-3xl" aria-hidden="true">🌟</span>
          <p className="text-lg font-semibold text-green-900">
            You're doing great! Practice makes learning easy.
          </p>
        </div>
      </main>
    </div>
  );
}
