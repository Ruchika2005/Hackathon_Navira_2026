import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, MessageSquare, Video, ChevronRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import { useLanguage } from '../context/LanguageContext';
import SpeakButton from '../components/SpeakButton';

export default function Quizzes() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const quizCategories = [
    {
      id: 'phishing',
      icon: Mail,
      emoji: '📧',
      titleKey: 'quiz_cat_phishing_title',
      descKey: 'quiz_cat_phishing_desc',
      color: 'red',
      bgClass: 'bg-red-100 group-hover:bg-red-200',
      iconClass: 'text-red-600',
      borderHover: 'hover:border-red-300',
      ringClass: 'focus:ring-red-400',
      tagBg: 'bg-red-600',
      path: '/quizzes/phishing',
      questions: 8,
      levelKey: 'level_beginner_intermediate',
    },
    {
      id: 'sms',
      icon: MessageSquare,
      emoji: '💬',
      titleKey: 'quiz_cat_sms_title',
      descKey: 'quiz_cat_sms_desc',
      color: 'orange',
      bgClass: 'bg-orange-100 group-hover:bg-orange-200',
      iconClass: 'text-orange-600',
      borderHover: 'hover:border-orange-300',
      ringClass: 'focus:ring-orange-400',
      tagBg: 'bg-orange-500',
      path: '/quizzes/sms',
      questions: 6,
      levelKey: 'level_beginner',
    },
    {
      id: 'deepfake',
      icon: Video,
      emoji: '🎭',
      titleKey: 'quiz_cat_deepfake_title',
      descKey: 'quiz_cat_deepfake_desc',
      color: 'purple',
      bgClass: 'bg-purple-100 group-hover:bg-purple-200',
      iconClass: 'text-purple-600',
      borderHover: 'hover:border-purple-300',
      ringClass: 'focus:ring-purple-400',
      tagBg: 'bg-purple-600',
      path: '/quizzes/deepfake',
      questions: 6,
      levelKey: 'level_intermediate',
    },
  ];

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col">
      <Navbar />

      <main className="flex-1 w-full max-w-3xl mx-auto px-4 py-8">
        {/* Back */}
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-blue-700 font-bold text-lg mb-8 hover:text-blue-900 focus:outline-none focus:ring-4 focus:ring-blue-400 rounded-xl p-1 min-h-[44px]"
          aria-label="Go back to home"
        >
          <ArrowLeft className="w-6 h-6" aria-hidden="true" /> {t('back')}
        </button>

        {/* Header */}
        <div className="card p-6 sm:p-8 mb-8 bg-gradient-to-br from-teal-600 to-blue-700 text-white border-0 shadow-lg">
          <p className="text-xl font-semibold mb-1 text-teal-200">🧩 {t('quizzes')}</p>
          <h1 className="text-4xl font-black leading-tight mb-3">{t('quiz_hero_title')}</h1>
          <p className="text-lg text-blue-100 font-medium">
            {t('quiz_hero_desc')}
          </p>
        </div>

        <h2 className="text-2xl font-black text-slate-800 mb-5 px-1">📚 {t('quiz_topic_heading')}</h2>

        {/* Quiz Cards */}
        <div className="flex flex-col gap-5">
          {quizCategories.map((cat) => {
            return (
              <div
                key={cat.id}
                role="button"
                tabIndex="0"
                onClick={() => navigate(cat.path)}
                onKeyDown={(e) => { if (e.key === 'Enter') navigate(cat.path); }}
                className={`card p-6 text-left group border-2 border-transparent ${cat.borderHover}
                           hover:shadow-xl focus:outline-none focus:ring-4 ${cat.ringClass} focus:ring-offset-2
                           transition-all duration-200 active:scale-[0.98] w-full cursor-pointer relative`}
                aria-label={`Start ${t(cat.titleKey)} quiz`}
              >
                <div className="absolute top-4 right-4 z-10">
                  <SpeakButton text={`${t(cat.titleKey)}. ${t(cat.descKey)}`} />
                </div>
                <div className="flex items-start gap-5">
                  <div className={`w-16 h-16 ${cat.bgClass} rounded-2xl flex items-center justify-center flex-shrink-0 transition-colors duration-200`}>
                    <span className="text-3xl" role="img" aria-hidden="true">{cat.emoji}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap mb-1">
                      <h3 className="text-2xl font-black text-slate-900">{t(cat.titleKey)}</h3>
                      <span className={`text-xs text-white font-bold px-3 py-1 rounded-full ${cat.tagBg}`}>
                        {t('questions_count').replace('{{count}}', cat.questions)}
                      </span>
                    </div>
                    <p className="text-base text-slate-600 font-medium mb-3 leading-snug">{t(cat.descKey)}</p>
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <span className="text-sm text-slate-500 font-semibold">📊 {t(cat.levelKey)}</span>
                      <span className={`inline-flex items-center gap-1 font-bold text-base ${cat.iconClass}`}>
                        {t('start')} <ChevronRight className="w-5 h-5" aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tip */}
        <div className="mt-8 card p-5 bg-amber-50 border-2 border-amber-200 flex items-start gap-4">
          <span className="text-3xl" aria-hidden="true">💡</span>
          <div>
            <p className="text-lg font-bold text-amber-900">{t('quiz_how_it_works_title')}</p>
            <p className="text-base text-amber-800 mt-1 font-medium">
              {t('quiz_how_it_works_desc')}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
