import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, XCircle, RefreshCw } from 'lucide-react';
import Navbar from '../components/Navbar';
import { useLanguage } from '../context/LanguageContext';
import { quizData } from '../data/quizData';

export default function QuizDeepfake() {
  const navigate = useNavigate();
  const { lang, t } = useLanguage();
  
  // Use localized questions
  const localizedQuestions = quizData.deepfake[lang] || quizData.deepfake.english;

  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [answers, setAnswers] = useState([]);

  const q = localizedQuestions[current];
  const total = localizedQuestions.length;

  function handleAnswer(idx) {
    if (selected !== null) return;
    setSelected(idx);
    const correct = localizedQuestions[current].options[idx].correct;
    if (correct) setScore((s) => s + 1);
    setAnswers((prev) => [...prev, { qid: q.id, correct, chosen: idx }]);
  }

  function handleNext() {
    if (current + 1 >= total) {
      setDone(true);
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
    }
  }

  function handleRetry() {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setDone(false);
    setAnswers([]);
  }

  const pct = Math.round((score / total) * 100);

  const platformIcons = { 
    YouTube: '▶', 
    WhatsApp: '💬', 
    Facebook: 'f', 
    'Twitter / X': '𝕏', 
    Instagram: '📸', 
    'Phone Call': '📞' 
  };

  /* ─── Results screen ─── */
  if (done) {
    const grade =
      pct === 100
        ? { emoji: '🏆', msg: t('score_msg_perfect'), color: '#15803d' }
        : pct >= 75
        ? { emoji: '🎯', msg: t('score_msg_great'), color: '#1d4ed8' }
        : pct >= 50
        ? { emoji: '📚', msg: t('score_msg_good'), color: '#b45309' }
        : { emoji: '💪', msg: t('score_msg_retry'), color: '#dc2626' };

    return (
      <div className="min-h-screen bg-blue-50 flex flex-col">
        <Navbar />
        <main className="flex-1 w-full max-w-2xl mx-auto px-4 py-10">
          <div className="card p-8 text-center slide-up">
            <p className="text-6xl mb-4">{grade.emoji}</p>
            <h1 className="text-3xl font-black text-slate-900 mb-2">{t('quiz_complete')}</h1>
            <p className="text-xl font-bold mb-6" style={{ color: grade.color }}>
              {grade.msg}
            </p>

            {/* Score ring */}
            <div
              className="w-36 h-36 rounded-full mx-auto flex flex-col items-center justify-center mb-6 border-8"
              style={{
                borderColor: grade.color,
                background: pct >= 75 ? '#f0fdf4' : pct >= 50 ? '#fffbeb' : '#fef2f2',
              }}
            >
              <span className="text-4xl font-black" style={{ color: grade.color }}>
                {score}/{total}
              </span>
              <span className="text-sm font-bold text-slate-500">{pct}%</span>
            </div>

            {/* Per-question recap */}
            <div className="text-left mb-8 space-y-2">
              <h2 className="font-black text-slate-800 mb-3 text-lg">{t('your_answers')}</h2>
              {answers.map((a, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold border-2 ${
                    a.correct
                      ? 'bg-green-50 border-green-300 text-green-800'
                      : 'bg-red-50 border-red-300 text-red-800'
                  }`}
                >
                  {a.correct ? (
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                  )}
                  <span>
                    Q{a.qid}: {localizedQuestions[a.qid - 1].options[a.chosen].text}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleRetry}
                className="btn-secondary flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-5 h-5" /> {t('try_again')}
              </button>
              <button
                onClick={() => navigate('/quizzes')}
                className="btn-primary"
              >
                {t('back_to_quizzes')}
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  /* ─── Quiz screen ─── */
  return (
    <div className="min-h-screen bg-blue-50 flex flex-col">
      <Navbar />

      <main className="flex-1 w-full max-w-2xl mx-auto px-4 py-6">
        {/* Back */}
        <button
          onClick={() => navigate('/quizzes')}
          className="flex items-center gap-2 text-blue-700 font-bold text-lg mb-5 hover:text-blue-900 focus:outline-none focus:ring-4 focus:ring-blue-400 rounded-xl p-1 min-h-[44px]"
        >
          <ArrowLeft className="w-6 h-6" aria-hidden="true" /> {t('back')}
        </button>

        {/* Progress bar */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xl font-black text-slate-800">🎭 {t('quiz_cat_deepfake_title')}</span>
            <span className="text-sm font-bold text-slate-500">
              {t('quiz_q_of_y').replace('{{current}}', current + 1).replace('{{total}}', total)}
            </span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
            <div
              className="h-3 rounded-full transition-all duration-500"
              style={{
                width: `${((current + (selected !== null ? 1 : 0)) / total) * 100}%`,
                background: '#7c3aed',
              }}
            />
          </div>
        </div>

        {/* Social post mockup */}
        <div className="slide-up" key={`${q.id}-${lang}`}>
          <div className="rounded-2xl border-2 border-slate-300 overflow-hidden shadow-md mb-6">
            {/* Platform bar */}
            <div className="px-4 py-2 flex items-center gap-2 text-white font-bold text-sm" style={{ background: q.post.platformColor }}>
              <span>{platformIcons[q.post.platform] || '🌐'}</span>
              <span>{q.post.platform}</span>
            </div>
            <div className="bg-white px-5 py-4">
              {/* User row */}
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl" style={{ background: q.post.platformColor + '22' }}>
                  {q.post.thumbnail}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-slate-900 text-sm">{q.post.user}</span>
                    {q.post.verified && <span className="text-blue-500 text-xs text-[10px] leading-none">✓</span>}
                    {!q.post.verified && selected !== null && (
                      <span className="text-[10px] text-red-600 font-bold bg-red-100 px-2 py-0.5 rounded-full">⚠ Not verified</span>
                    )}
                  </div>
                  <p className="text-slate-500 text-xs">{q.post.views}</p>
                </div>
              </div>
              {/* Content */}
              <p className="text-sm text-slate-800 font-medium mb-3 leading-relaxed">{q.post.title}</p>
              {/* Warning badge */}
              <div className={`text-xs font-semibold px-3 py-2 rounded-lg flex items-start gap-2 ${selected !== null ? 'bg-red-50 border border-red-200 text-red-700' : 'bg-amber-50 border border-amber-200 text-amber-700'}`}>
                <span className="flex-shrink-0">⚠️</span>
                <span><strong>AI Warning:</strong> {q.post.warning}</span>
              </div>
            </div>
          </div>

          {/* Question */}
          <div className="card p-5 mb-4 shadow-sm border-2 border-slate-100">
            <p className="text-lg font-black text-slate-900 mb-4">🎯 {q.question}</p>
            <div className="flex flex-col gap-3">
              {q.options.map((opt, idx) => {
                let style = 'border-2 border-slate-200 bg-white hover:border-purple-400 hover:bg-purple-50';
                if (selected !== null) {
                  if (opt.correct) style = 'border-2 border-green-500 bg-green-50 px-5 py-4';
                  else if (idx === selected && !opt.correct) style = 'border-2 border-red-400 bg-red-50 px-5 py-4';
                  else style = 'border-2 border-slate-200 bg-white opacity-60 px-5 py-4';
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(idx)}
                    disabled={selected !== null}
                    className={`w-full text-left px-5 py-4 rounded-xl font-semibold text-base flex items-center gap-3 transition-all duration-150 focus:outline-none focus:ring-4 focus:ring-purple-400 ${selected === null ? 'cursor-pointer active:scale-[0.98]' : 'cursor-default transition-none'} ${style}`}
                    aria-label={`Option ${String.fromCharCode(65 + idx)}: ${opt.text}`}
                  >
                    <span className="w-7 h-7 rounded-full border-2 flex items-center justify-center flex-shrink-0 font-black text-sm"
                      style={{
                        borderColor: selected !== null && opt.correct ? '#22c55e' : selected !== null && idx === selected && !opt.correct ? '#ef4444' : '#94a3b8',
                        color: selected !== null && opt.correct ? '#16a34a' : selected !== null && idx === selected && !opt.correct ? '#dc2626' : '#64748b',
                        background: selected !== null && opt.correct ? '#dcfce7' : selected !== null && idx === selected && !opt.correct ? '#fee2e2' : 'transparent',
                      }}
                    >
                      {selected !== null ? (opt.correct ? '✓' : idx === selected ? '✗' : String.fromCharCode(65 + idx)) : String.fromCharCode(65 + idx)}
                    </span>
                    <span>{opt.text}</span>
                    {selected !== null && opt.correct && <CheckCircle className="w-5 h-5 text-green-500 ml-auto flex-shrink-0" />}
                    {selected !== null && idx === selected && !opt.correct && <XCircle className="w-5 h-5 text-red-500 ml-auto flex-shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Feedback */}
          {selected !== null && (
            <div className={`card p-5 mb-5 pop-in border-2 ${q.options[selected].correct ? 'bg-green-50 border-green-300' : 'bg-amber-50 border-amber-300'}`}>
              <p className={`font-black text-lg mb-2 ${q.options[selected].correct ? 'text-green-800' : 'text-amber-800'}`}>
                {q.options[selected].correct ? t('correct_msg') : t('incorrect_msg')}
              </p>
              <div className="space-y-1">
                {q.feedback.lines.map((line, i) => (
                  <p key={i} className={`text-sm font-medium flex items-start gap-2 ${q.options[selected].correct ? 'text-green-800' : 'text-amber-800'}`}>
                    <span className="flex-shrink-0">{i === 0 ? q.feedback.icon : '•'}</span>
                    <span>{line}</span>
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* Next button */}
          {selected !== null && (
            <button
              onClick={handleNext}
              className="btn-primary pop-in shadow-lg hover:shadow-xl active:scale-[0.98]"
              style={{ background: '#7c3aed' }}
            >
              {current + 1 >= total ? t('see_results') : t('next_q')}
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
