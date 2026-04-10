import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Smartphone, ArrowLeft, ShieldAlert } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import Navbar from '../components/Navbar';
import SpeakButton from '../components/SpeakButton';

export default function Simulations() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col">
      <Navbar />

      <main className="flex-1 w-full max-w-3xl mx-auto px-4 py-8">

        {/* Back */}
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-blue-700 font-bold text-lg mb-8 hover:text-blue-900 focus:outline-none focus:ring-4 focus:ring-blue-400 rounded-xl p-1 min-h-[44px]"
          aria-label={t('aria_go_back_home')}
        >
          <ArrowLeft className="w-6 h-6" aria-hidden="true" /> {t('back_to_home')}
        </button>

        <h1 className="text-4xl font-black text-slate-900 mb-2">{t('sim_hero_title')}</h1>
        <p className="text-xl text-slate-600 font-medium mb-8">{t('sim_hero_desc')}</p>

        {/* What, Why, How Section */}
        <div className="card p-6 bg-white border-2 border-slate-100 mb-10 overflow-hidden max-w-2xl">
          <h2 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-3">
            <span className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center text-xl">💡</span>
            {t('sim_hero_title')}?
          </h2>

          <div className="space-y-2 divide-y divide-slate-100">
            {/* What */}
            <div className="flex items-start gap-4 pb-2 relative group">
              <div className="absolute top-0 right-0">
                <SpeakButton text={`${t('label_what')}. ${t('sim_what_is_it')}`} />
              </div>
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-2xl shrink-0">🛡️</div>
              <div className="pr-10">
                <p className="font-black text-indigo-900 text-lg mb-1">{t('label_what')}</p>
                <p className="text-slate-600 font-medium leading-relaxed">{t('sim_what_is_it')}</p>
              </div>
            </div>

            {/* Why */}
            <div className="flex items-start gap-4 py-2 relative group">
              <div className="absolute top-2 right-0">
                <SpeakButton text={`${t('label_why')}. ${t('sim_why_do_it')}`} />
              </div>
              <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center text-2xl shrink-0">🚀</div>
              <div className="pr-10">
                <p className="font-black text-teal-900 text-lg mb-1">{t('label_why')}</p>
                <p className="text-slate-600 font-medium leading-relaxed">{t('sim_why_do_it')}</p>
              </div>
            </div>

            {/* How */}
            <div className="flex items-start gap-4 pt-2 relative group">
              <div className="absolute top-2 right-0">
                <SpeakButton text={`${t('label_how')}. ${t('sim_how_to_do_it')}`} />
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-2xl shrink-0">👉</div>
              <div className="pr-10">
                <p className="font-black text-orange-900 text-lg mb-1">{t('label_how')}</p>
                <p className="text-slate-600 font-medium leading-relaxed">{t('sim_how_to_do_it')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Square Cards */}
        <div className="grid grid-cols-2 gap-5 max-w-md">

          {/* Module 1 */}
          <div
            role="button"
            tabIndex="0"
            onClick={() => navigate('/simulations/password')}
            onKeyDown={(e) => { if (e.key === 'Enter') navigate('/simulations/password'); }}
            className="card aspect-square flex flex-col items-center justify-center gap-4 p-6
                       border-2 border-transparent hover:border-indigo-300 hover:shadow-xl
                       focus:outline-none focus:ring-4 focus:ring-indigo-400 focus:ring-offset-2
                       transition-all duration-200 active:scale-95 group cursor-pointer relative"
            aria-label={t('aria_pass_sim')}
          >
            <div className="absolute top-3 right-3">
              <SpeakButton text={t('mod1_title')} />
            </div>
            <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center group-hover:bg-indigo-200 transition-colors">
              <ShieldCheck className="w-9 h-9 text-indigo-700" aria-hidden="true" />
            </div>
            <div className="text-center">
              <p className="text-xl font-black text-slate-900 leading-tight">{t('mod1_title')}</p>
              <p className="text-sm text-indigo-700 font-bold mt-1">▶  {t('btn_start')}</p>
            </div>
          </div>

          {/* Module 2 */}
          <div
            role="button"
            tabIndex="0"
            onClick={() => navigate('/simulations/upi')}
            onKeyDown={(e) => { if (e.key === 'Enter') navigate('/simulations/upi'); }}
            className="card aspect-square flex flex-col items-center justify-center gap-4 p-6
                       border-2 border-transparent hover:border-teal-300 hover:shadow-xl
                       focus:outline-none focus:ring-4 focus:ring-teal-400 focus:ring-offset-2
                       transition-all duration-200 active:scale-95 group cursor-pointer relative"
            aria-label={t('aria_upi_sim')}
          >
            <div className="absolute top-3 right-3">
              <SpeakButton text={t('mod2_title')} />
            </div>
            <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center group-hover:bg-teal-200 transition-colors">
              <Smartphone className="w-9 h-9 text-teal-700" aria-hidden="true" />
            </div>
            <div className="text-center">
              <p className="text-xl font-black text-slate-900 leading-tight">{t('mod2_title')}</p>
              <p className="text-sm text-teal-700 font-bold mt-1">▶  {t('btn_start')}</p>
            </div>
          </div>

        </div>

        {/* Encourage */}
        <div className="mt-10 card p-5 bg-green-50 border-2 border-green-200 flex items-center gap-4 max-w-md">
          <span className="text-3xl" aria-hidden="true">🌟</span>
          <p className="text-lg font-semibold text-green-900">
            {t('encouragement_tip')}
          </p>
        </div>
      </main>
    </div>
  );
}
