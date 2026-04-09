import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, XCircle, AlertTriangle, RefreshCw } from 'lucide-react';
import Navbar from '../components/Navbar';
import { useLanguage } from '../context/LanguageContext';
import { quizData } from '../data/quizData';

/* ─── Helpers ───────────────────────────────────────────── */
function HdfcLogo({ warn = false }) {
  return (
    <div className="flex items-center gap-2">
      {/* Fake HDFC logo built with CSS */}
      <div
        className="flex items-center gap-1 px-2 py-1 rounded"
        style={{ background: warn ? '#fef2f2' : '#003087', border: warn ? '2px solid #fca5a5' : 'none' }}
      >
        <span
          className="font-black text-sm tracking-widest"
          style={{ color: warn ? '#991b1b' : '#fff', letterSpacing: '0.12em' }}
        >
          HDFC
        </span>
        <span
          className="font-black text-xs"
          style={{ color: warn ? '#dc2626' : '#e50000', marginLeft: 2 }}
        >
          BANK
        </span>
      </div>
      {warn && (
        <span className="text-xs text-red-600 font-bold bg-red-100 px-2 py-0.5 rounded-full flex items-center gap-1">
          <AlertTriangle className="w-3 h-3" /> Suspicious
        </span>
      )}
    </div>
  );
}

function EmailCard({ email, answered }) {
  const [hovering, setHovering] = useState(false);
  const isFakeHover = email.hoverLink;

  return (
    <div
      className="rounded-2xl border-2 border-slate-300 overflow-hidden shadow-md mb-6"
      style={{ fontFamily: 'monospace' }}
    >
      {/* Email header bar */}
      <div className="bg-slate-100 px-4 py-2 flex gap-2 items-center border-b border-slate-200">
        <span className="w-3 h-3 rounded-full bg-red-400 inline-block" />
        <span className="w-3 h-3 rounded-full bg-yellow-400 inline-block" />
        <span className="w-3 h-3 rounded-full bg-green-400 inline-block" />
        <span className="ml-2 text-xs text-slate-500 font-medium">📧 Email Client</span>
      </div>

      {/* Metadata */}
      <div className="bg-white px-4 py-3 border-b border-slate-100 space-y-1">
        {(email.logo || email.showLogoWarning) && (
          <div className="mb-2">
            <HdfcLogo warn={email.showLogoWarning} />
          </div>
        )}
        <p className="text-xs text-slate-500">
          <span className="font-bold text-slate-700">Subject: </span>
          <span className="text-slate-900 font-semibold">{email.subject}</span>
        </p>
        <p className="text-xs text-slate-500 flex flex-wrap gap-1 items-center">
          <span className="font-bold text-slate-700">From: </span>
          <span className="text-slate-800">{email.from}</span>
          <span
            className={`px-2 py-0.5 rounded text-xs font-bold ${
              answered
                ? 'bg-red-100 text-red-700 border border-red-300'
                : 'bg-slate-100 text-slate-600'
            }`}
          >
            {email.fromEmail}
          </span>
          {answered && (
            <span className="text-red-600 font-bold text-xs">⚠ not official!</span>
          )}
        </p>
      </div>

      {/* Body */}
      <div className="bg-white px-5 py-4 text-sm text-slate-700 leading-relaxed">
        {email.body.map((line, i) =>
          line === '' ? (
            <br key={i} />
          ) : (
            <p key={i} className="mb-0.5">{line}</p>
          )
        )}

        {/* Hover Link trick */}
        {isFakeHover && (
          <div className="mt-3 mb-1 relative inline-block">
            <span
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
              className="cursor-pointer font-bold underline text-blue-600 hover:text-blue-800 transition-colors text-sm"
              role="link"
              tabIndex={0}
              aria-label="Hover to reveal real URL"
            >
              {email.hoverLink.display}
            </span>
            {/* Tooltip */}
            <div
              className={`absolute left-0 bottom-full mb-2 z-10 transition-all duration-200 ${
                hovering ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1 pointer-events-none'
              }`}
            >
              <div className="bg-slate-900 text-white text-xs rounded-lg px-3 py-2 shadow-xl whitespace-nowrap border-2 border-red-500">
                <p className="text-red-400 font-bold mb-0.5">⚠️ Real URL:</p>
                <p className="font-mono text-yellow-300">{email.hoverLink.realUrl}</p>
                <p className="text-red-300 font-semibold mt-1">🚨 This is a FAKE domain!</p>
              </div>
              <div className="w-2 h-2 bg-slate-900 rotate-45 absolute left-4 -bottom-1" />
            </div>
          </div>
        )}

        {/* Plain link */}
        {email.plainLink && (
          <p className="mt-2 text-blue-600 font-mono text-xs break-all">
            {email.plainLink}
            {answered && (
              <span className="ml-2 text-red-600 font-bold not-italic text-xs">⚠ FAKE!</span>
            )}
          </p>
        )}

        {/* CTA button */}
        {email.cta && (
          <button
            disabled
            className="mt-3 px-5 py-2 rounded-lg font-bold text-sm text-white cursor-not-allowed"
            style={{ background: '#1d4ed8' }}
          >
            {email.cta.text}
          </button>
        )}

        {/* Attachment */}
        {email.attachment && (
          <div
            className={`mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-xl border-2 text-sm font-semibold ${
              answered
                ? 'bg-red-50 border-red-400 text-red-700'
                : 'bg-slate-50 border-slate-300 text-slate-700'
            }`}
          >
            📎 {email.attachment}
            {answered && <span className="text-red-600 font-bold">← DANGEROUS!</span>}
          </div>
        )}

        <p className="mt-4 text-slate-500 text-xs">{email.footer}</p>
      </div>
    </div>
  );
}

/* ─── Main Component ─────────────────────────────────────── */
export default function QuizPhishing() {
  const navigate = useNavigate();
  const { lang, t } = useLanguage();
  
  // Use localized questions
  const localizedQuestions = quizData.phishing[lang] || quizData.phishing.english;

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

        {/* Progress */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xl font-black text-slate-800">📧 {t('quiz_cat_phishing_title')}</span>
            <span className="text-sm font-bold text-slate-500">
              {t('quiz_q_of_y').replace('{{current}}', current + 1).replace('{{total}}', total)}
            </span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
            <div
              className="h-3 rounded-full transition-all duration-500"
              style={{
                width: `${((current + (selected !== null ? 1 : 0)) / total) * 100}%`,
                background: '#1d4ed8',
              }}
            />
          </div>
        </div>

        {/* Email card */}
        <div className="slide-up" key={`${q.id}-${lang}`}>
          <EmailCard email={q.email} answered={selected !== null} />

          {/* Question */}
          <div className="card p-5 mb-4">
            <p className="text-lg font-black text-slate-900 mb-4">🎯 {q.question}</p>
            <div className="flex flex-col gap-3">
              {q.options.map((opt, idx) => {
                let style =
                  'border-2 border-slate-200 bg-white hover:border-blue-400 hover:bg-blue-50';
                if (selected !== null) {
                  if (opt.correct)
                    style = 'border-2 border-green-500 bg-green-50';
                  else if (idx === selected && !opt.correct)
                    style = 'border-2 border-red-400 bg-red-50';
                  else
                    style = 'border-2 border-slate-200 bg-white opacity-60';
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(idx)}
                    disabled={selected !== null}
                    className={`w-full text-left px-5 py-4 rounded-xl font-semibold text-base flex items-center gap-3
                               transition-all duration-150 focus:outline-none focus:ring-4 focus:ring-blue-400
                               ${selected === null ? 'cursor-pointer active:scale-[0.98]' : 'cursor-default'}
                               ${style}`}
                    aria-label={`Option ${String.fromCharCode(65 + idx)}: ${opt.text}`}
                  >
                    <span className="w-7 h-7 rounded-full border-2 flex items-center justify-center flex-shrink-0 font-black text-sm"
                      style={{
                        borderColor: selected !== null && opt.correct
                          ? '#22c55e'
                          : selected !== null && idx === selected && !opt.correct
                          ? '#ef4444'
                          : '#94a3b8',
                        color: selected !== null && opt.correct
                          ? '#16a34a'
                          : selected !== null && idx === selected && !opt.correct
                          ? '#dc2626'
                          : '#64748b',
                        background: selected !== null && opt.correct
                          ? '#dcfce7'
                          : selected !== null && idx === selected && !opt.correct
                          ? '#fee2e2'
                          : 'transparent',
                      }}
                    >
                      {selected !== null
                        ? opt.correct
                          ? '✓'
                          : idx === selected
                          ? '✗'
                          : String.fromCharCode(65 + idx)
                        : String.fromCharCode(65 + idx)}
                    </span>
                    <span>{opt.text}</span>
                    {selected !== null && opt.correct && (
                      <CheckCircle className="w-5 h-5 text-green-500 ml-auto flex-shrink-0" />
                    )}
                    {selected !== null && idx === selected && !opt.correct && (
                      <XCircle className="w-5 h-5 text-red-500 ml-auto flex-shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Feedback */}
          {selected !== null && (
            <div className={`card p-5 mb-5 pop-in border-2 ${
              q.options[selected].correct
                ? 'bg-green-50 border-green-300'
                : 'bg-amber-50 border-amber-300'
            }`}>
              <p className={`font-black text-lg mb-2 ${
                q.options[selected].correct ? 'text-green-800' : 'text-amber-800'
              }`}>
                {q.options[selected].correct ? '✅ Correct!' : '❌ Not quite — here\'s why:'}
              </p>
              <div className="space-y-1">
                {q.feedback.lines.map((line, i) => (
                  <p key={i} className={`text-sm font-medium flex items-start gap-2 ${
                    q.options[selected].correct ? 'text-green-800' : 'text-amber-800'
                  }`}>
                    <span>{i === 0 ? q.feedback.icon : '•'}</span>
                    {line}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* Next button */}
          {selected !== null && (
            <button
              onClick={handleNext}
              className="btn-primary pop-in"
            >
              {current + 1 >= total ? t('see_results') : t('next_q')}
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
