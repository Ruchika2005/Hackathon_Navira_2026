import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShieldCheck, Smartphone, ChevronRight, BookOpen,
  ShieldAlert, PlayCircle, Siren, Send, X, ChevronLeft,
  ChevronRight as ChevronRightIcon, AlertTriangle,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useVoice } from '../context/VoiceContext';
import Navbar from '../components/Navbar';
import SpeakButton from '../components/SpeakButton';

const API = 'http://localhost:5000/api/siren';

/* ── time-ago helper ──────────────────────────────────────── */
function timeAgo(dateStr, t) {
  const mins = Math.round((Date.now() - new Date(dateStr)) / 60000);
  if (mins < 60) return `${mins} ${t('siren_ago_min')}`;
  return `${Math.floor(mins / 60)} ${t('siren_ago_hr')}`;
}

/* ── Community Siren widget ───────────────────────────────── */
function CommunitySiren() {
  const { t, lang } = useLanguage();
  const { speak }   = useVoice();

  const [reports,     setReports]     = useState([]);
  const [idx,         setIdx]         = useState(0);
  const [showModal,   setShowModal]   = useState(false);
  const [text,        setText]        = useState('');
  const [submitting,  setSubmitting]  = useState(false);
  const [toast,       setToast]       = useState(null); // { msg, ok }
  const [sliding,     setSliding]     = useState(false);
  const [dir,         setDir]         = useState('right');

  const intervalRef  = useRef(null);
  const isSpeaking   = () => typeof window !== 'undefined' && window.speechSynthesis?.speaking;

  /* fetch active reports */
  const fetchReports = useCallback(async () => {
    try {
      const res  = await fetch(API);
      const data = await res.json();
      setReports(data);
      setIdx(0);
    } catch { /* silent fail — show empty state */ }
  }, []);

  useEffect(() => { fetchReports(); }, [fetchReports]);

  /* auto-slide every 10 s; skips tick while audio is playing */
  useEffect(() => {
    if (reports.length <= 1) return;
    intervalRef.current = setInterval(() => {
      if (!isSpeaking()) advance('right');
    }, 10000);
    return () => clearInterval(intervalRef.current);
  }, [reports.length, idx]);

  /* animated slide transition */
  function advance(direction) {
    if (reports.length <= 1) return;
    setSliding(true);
    setDir(direction);
    setTimeout(() => {
      setIdx(prev =>
        direction === 'right'
          ? (prev + 1) % reports.length
          : (prev - 1 + reports.length) % reports.length
      );
      setSliding(false);
    }, 280);
    clearInterval(intervalRef.current);
  }

  /* submit new report */
  async function handleSubmit() {
    if (text.trim().length < 10) return;
    setSubmitting(true);
    try {
      const res = await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text.trim(), lang }),
      });
      if (!res.ok) throw new Error();
      setToast({ msg: t('siren_submit_ok'), ok: true });
      setText('');
      setShowModal(false);
      fetchReports();
    } catch {
      setToast({ msg: t('siren_submit_err'), ok: false });
    } finally {
      setSubmitting(false);
      setTimeout(() => setToast(null), 3500);
    }
  }

  const current = reports[idx];

  return (
    <>
      {/* ── Main card ─────────────────────────────────────── */}
      <div className="mt-8 rounded-2xl overflow-hidden shadow-lg border-2 border-red-200"
           style={{ background: 'linear-gradient(135deg,#fff7f7 0%,#fff 60%)' }}>

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 gap-3"
             style={{ background: 'linear-gradient(90deg,#dc2626,#b91c1c)' }}>
          <div className="flex items-center gap-2">
            <Siren className="w-5 h-5 text-white animate-pulse" />
            <span className="text-white font-black text-base tracking-wide">
              {t('siren_title')}
            </span>
            {reports.length > 0 && (
              <span className="bg-white/20 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {reports.length}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <SpeakButton
              text={`${t('siren_title')}. ${current ? current.message : t('siren_no_reports')}`}
            />
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-1.5 bg-white text-red-700 font-bold text-xs
                         px-3 py-1.5 rounded-xl hover:bg-red-50 transition-colors
                         focus:outline-none focus:ring-2 focus:ring-white/50 min-h-[36px]"
              aria-label={t('siren_report_btn')}
            >
              <Send className="w-3.5 h-3.5" />
              {t('siren_report_btn')}
            </button>
          </div>
        </div>

        {/* Slide body */}
        <div className="px-5 pb-4 pt-2 min-h-[80px] relative overflow-hidden">
          {reports.length === 0 ? (
            <div className="flex items-start gap-3 py-2">
              <AlertTriangle className="w-5 h-5 text-red-300 flex-shrink-0 mt-0.5" />
              <p className="text-base text-slate-500 font-medium">{t('siren_no_reports')}</p>
            </div>
          ) : (
            <div
              className="transition-all duration-300"
              style={{
                opacity: sliding ? 0 : 1,
                transform: sliding
                  ? `translateX(${dir === 'right' ? '-30px' : '30px'})`
                  : 'translateX(0)',
              }}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0 mt-0.5">🚨</span>
                <div className="flex-1">
                  <p className="text-base font-semibold text-slate-800 leading-relaxed">
                    {current?.message}
                  </p>
                  <p className="text-xs text-slate-400 mt-1.5 font-medium">
                    {t('siren_posted')} {current ? timeAgo(current.createdAt, t) : ''}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Slide controls (only when > 1 report) */}
        {reports.length > 1 && (
          <div className="flex items-center justify-between px-5 pb-3 border-t border-red-100 pt-2">
            <button
              onClick={() => advance('left')}
              className="w-8 h-8 rounded-full bg-red-50 hover:bg-red-100 flex items-center
                         justify-center text-red-600 transition-colors focus:outline-none
                         focus:ring-2 focus:ring-red-400"
              aria-label="Previous warning"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Dot indicators */}
            <div className="flex gap-1.5">
              {reports.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setIdx(i); clearInterval(intervalRef.current); }}
                  className="w-2 h-2 rounded-full transition-all duration-200 focus:outline-none"
                  style={{ background: i === idx ? '#dc2626' : '#fca5a5' }}
                  aria-label={`Warning ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => advance('right')}
              className="w-8 h-8 rounded-full bg-red-50 hover:bg-red-100 flex items-center
                         justify-center text-red-600 transition-colors focus:outline-none
                         focus:ring-2 focus:ring-red-400"
              aria-label="Next warning"
            >
              <ChevronRightIcon className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* ── Report modal ──────────────────────────────────── */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)' }}
          onClick={e => { if (e.target === e.currentTarget) setShowModal(false); }}
        >
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl pop-in overflow-hidden">
            {/* Modal header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Siren className="w-5 h-5 text-red-600" />
                <h2 className="text-lg font-black text-slate-900">{t('siren_modal_title')}</h2>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200
                           flex items-center justify-center transition-colors
                           focus:outline-none focus:ring-2 focus:ring-red-400"
                aria-label={t('siren_modal_cancel')}
              >
                <X className="w-4 h-4 text-slate-600" />
              </button>
            </div>

            {/* Modal body */}
            <div className="px-6 py-5">
              <div className="flex items-start gap-2 mb-3">
                <SpeakButton text={t('siren_modal_hint')} />
                <p className="text-sm text-slate-600 font-medium leading-relaxed flex-1">
                  {t('siren_modal_hint')}
                </p>
              </div>
              <textarea
                value={text}
                onChange={e => setText(e.target.value)}
                maxLength={300}
                rows={4}
                className="w-full border-2 border-slate-200 rounded-2xl px-4 py-3 text-base
                           text-slate-800 font-medium resize-none focus:outline-none
                           focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all"
                placeholder={t('siren_modal_placeholder')}
                aria-label={t('siren_modal_hint')}
              />
              <p className="text-xs text-slate-400 text-right mt-1">{text.length}/300</p>
            </div>

            {/* Modal footer */}
            <div className="px-6 pb-6 flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-3 rounded-xl border-2 border-slate-200
                           text-slate-700 font-bold text-base hover:bg-slate-50
                           transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400"
              >
                {t('siren_modal_cancel')}
              </button>
              <button
                onClick={handleSubmit}
                disabled={text.trim().length < 10 || submitting}
                className="flex-1 px-4 py-3 rounded-xl font-bold text-base text-white
                           flex items-center justify-center gap-2 transition-all
                           focus:outline-none focus:ring-2 focus:ring-red-400 disabled:opacity-50"
                style={{ background: text.trim().length < 10 ? '#fca5a5' : '#dc2626' }}
              >
                {submitting ? (
                  <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                {t('siren_modal_submit')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Toast notification ───────────────────────────── */}
      {toast && (
        <div
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pop-in
                     px-5 py-3 rounded-2xl shadow-xl text-white font-bold text-sm
                     flex items-center gap-2"
          style={{ background: toast.ok ? '#16a34a' : '#dc2626' }}
        >
          {toast.ok ? '✔' : '✘'} {toast.msg}
        </div>
      )}
    </>
  );
}

/* ── Dashboard page ───────────────────────────────────────── */
export default function Dashboard() {
  const navigate  = useNavigate();
  const { t }     = useLanguage();
  const { speak } = useVoice();

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col">
      <Navbar />

      <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-8" id="main-content">

        {/* Welcome banner */}
        <div className="card p-6 sm:p-8 mb-8 bg-blue-700 text-white border-0 shadow-lg relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-xl font-semibold mb-1 text-blue-200">{t('dashboard_hello')}</p>
            <h1 className="text-4xl font-black leading-tight mb-3">{t('welcome')}</h1>
            <p className="text-lg text-blue-100 font-medium mb-6">{t('dashboard_subtitle')}</p>
            <button
              onClick={() => speak(t('platform_guide'))}
              className="inline-flex items-center gap-2 bg-white text-blue-700 font-bold
                         px-4 py-2.5 rounded-xl hover:bg-blue-50 transition-colors
                         shadow-sm focus:ring-4 focus:ring-white/30"
              aria-label={t('btn_hear_guide')}
            >
              <PlayCircle className="w-5 h-5" />
              {t('btn_hear_guide')}
            </button>
          </div>
        </div>

        {/* Section heading */}
        <h2 className="text-2xl font-black text-slate-800 mb-4 px-1">{t('dashboard_heading')}</h2>

        {/* Feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* Simulations */}
          <div
            role="button" tabIndex="0"
            onClick={() => navigate('/simulations')}
            onKeyDown={e => { if (e.key === 'Enter') navigate('/simulations'); }}
            className="card p-6 text-left group hover:shadow-lg hover:border-indigo-200 border-2
                       border-transparent focus:outline-none focus:ring-4 focus:ring-indigo-400
                       focus:ring-offset-2 transition-all duration-200 active:scale-[0.98]
                       relative cursor-pointer"
            aria-label={t('aria_go_simulations')}
          >
            <div className="absolute top-4 right-4">
              <SpeakButton text={`${t('simulations')}. ${t('sim_desc')}`} />
            </div>
            <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-indigo-200 transition-colors">
              <ShieldCheck className="w-9 h-9 text-indigo-700" aria-hidden="true" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-2">{t('simulations')}</h3>
            <p className="text-lg text-slate-600 font-medium leading-snug mb-4">{t('sim_desc')}</p>
            <span className="inline-flex items-center gap-2 text-indigo-700 font-bold text-base">
              {t('start')} <ChevronRight className="w-5 h-5" aria-hidden="true" />
            </span>
          </div>

          {/* Quizzes */}
          <div
            role="button" tabIndex="0"
            onClick={() => navigate('/quizzes')}
            onKeyDown={e => { if (e.key === 'Enter') navigate('/quizzes'); }}
            className="card p-6 text-left group hover:shadow-lg hover:border-teal-200 border-2
                       border-transparent focus:outline-none focus:ring-4 focus:ring-teal-400
                       focus:ring-offset-2 transition-all duration-200 active:scale-[0.98]
                       cursor-pointer relative"
            aria-label={t('aria_go_quizzes')}
          >
            <div className="absolute top-4 right-4">
              <SpeakButton text={`${t('quizzes')}. ${t('quiz_desc')}`} />
            </div>
            <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-teal-200 transition-colors">
              <BookOpen className="w-9 h-9 text-teal-700" aria-hidden="true" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-2">{t('quizzes')}</h3>
            <p className="text-lg text-slate-600 font-medium leading-snug mb-4">{t('quiz_desc')}</p>
            <span className="inline-flex items-center gap-2 text-teal-700 font-bold text-base">
              {t('start')} <ChevronRight className="w-5 h-5" aria-hidden="true" />
            </span>
          </div>

          {/* AI Scam Simulator */}
          <div
            role="button" tabIndex="0"
            onClick={() => navigate('/simulations/scam')}
            onKeyDown={e => { if (e.key === 'Enter') navigate('/simulations/scam'); }}
            className="card p-6 text-left group hover:shadow-lg hover:border-amber-200 border-2
                       border-transparent focus:outline-none focus:ring-4 focus:ring-amber-400
                       focus:ring-offset-2 transition-all duration-200 active:scale-[0.98]
                       cursor-pointer relative"
            aria-label={t('aria_go_scam')}
          >
            <div className="absolute top-4 right-4">
              <SpeakButton text={`${t('scam_dashboard_title')}. ${t('scam_dashboard_desc')}`} />
            </div>
            <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-amber-200 transition-colors">
              <ShieldAlert className="w-9 h-9 text-amber-700" aria-hidden="true" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-2">{t('scam_dashboard_title')}</h3>
            <p className="text-lg text-slate-600 font-medium leading-snug mb-4">{t('scam_dashboard_desc')}</p>
            <span className="inline-flex items-center gap-2 text-amber-700 font-bold text-base">
              {t('start_training')} <ChevronRight className="w-5 h-5" aria-hidden="true" />
            </span>
          </div>
        </div>

        {/* Community Siren — replaces "Tip for Today" */}
        <CommunitySiren />

      </main>
    </div>
  );
}
