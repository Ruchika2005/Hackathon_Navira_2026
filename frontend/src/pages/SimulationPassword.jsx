import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff, CheckCircle, AlertCircle, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import Navbar from '../components/Navbar';
import SpeakButton from '../components/SpeakButton';

function RuleRow({ valid, active, label, suggestion }) {
  return (
    <div
      className={`flex items-start gap-3 p-4 rounded-2xl border-2 transition-all duration-300
        ${valid ? 'bg-green-50 border-green-300' : active ? 'bg-orange-50 border-orange-200' : 'bg-white border-slate-100'}`}
      role="status" aria-live="polite"
    >
      <div className="mt-0.5 shrink-0">
        {valid
          ? <CheckCircle className="w-6 h-6 text-green-600" aria-label="Done" />
          : <AlertCircle className={`w-6 h-6 ${active ? 'text-orange-500' : 'text-slate-300'}`} aria-label="Not yet" />}
      </div>
      <div className="flex-1">
        <p className={`text-lg font-bold leading-snug ${valid ? 'text-green-800' : active ? 'text-orange-800' : 'text-slate-500'}`}>
          {label}
        </p>
        {active && !valid && (
          <p className="text-base text-orange-700 font-medium mt-1 italic">
            👉 {suggestion}
          </p>
        )}
      </div>
      <div className="shrink-0 mt-1">
        <SpeakButton text={active && !valid ? `${label}. ${suggestion}` : label} />
      </div>
    </div>
  );
}

export default function SimulationPassword() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const [password, setPassword]         = useState('');
  const [confirm, setConfirm]           = useState('');
  const [showPass, setShowPass]         = useState(false);
  const [submitted, setSubmitted]       = useState(false);

  const rules = {
    length:  password.length >= 8,
    upper:   /[A-Z]/.test(password),
    digit:   /\d/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    matches: password === confirm && confirm !== '',
  };

  const strengthScore = [rules.length, rules.upper, rules.digit, rules.special].filter(Boolean).length;
  const allValid = Object.values(rules).every(Boolean);
  const active = password.length > 0;

  const strengthLabel  = ['', t('weak'), t('medium'), t('medium'), t('strong')][strengthScore];
  const strengthColor  = ['bg-slate-200', 'bg-red-500', 'bg-orange-400', 'bg-yellow-400', 'bg-green-500'][strengthScore];
  const strengthWidth  = ['0%', '25%', '50%', '75%', '100%'][strengthScore];
  const strengthText   = ['text-slate-400', 'text-red-600', 'text-orange-600', 'text-yellow-600', 'text-green-600'][strengthScore];

  if (submitted) {
    return (
      <div className="min-h-screen bg-blue-50 flex flex-col">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 text-center">
          <div className="card p-10 max-w-sm w-full pop-in">
            <div className="text-7xl mb-6" aria-hidden="true">🎉</div>
            <h2 className="text-3xl font-black text-green-800 mb-4">{t('excellent_work')}</h2>
            <p className="text-xl text-slate-700 font-medium leading-relaxed mb-8">
              {t('success_pass')}
            </p>
            <button onClick={() => navigate('/simulations')} className="btn-primary">
              <ArrowLeft className="w-5 h-5" /> {t('back_to_simulations') || 'Back to Simulations'}
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col">
      <Navbar />

      <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-6 pb-20">

        <button onClick={() => navigate('/simulations')}
          className="flex items-center gap-2 text-blue-700 font-bold text-lg mb-6
                     hover:text-blue-900 focus:outline-none focus:ring-4 focus:ring-blue-400 rounded-xl p-1 min-h-[44px]">
          <ArrowLeft className="w-6 h-6" /> {t('back')}
        </button>

        {/* Header card */}
        <div className="card p-6 mb-6 bg-indigo-700 text-white border-0">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-2xl shrink-0">
              <ShieldCheck className="w-8 h-8 text-white" aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-2xl font-black leading-tight">{t('pass_title')}</h1>
              <p className="text-indigo-200 text-base font-medium mt-1">{t('learn_strong_pass')}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Left — Inputs */}
          <div className="card p-6 flex flex-col gap-6">

            {/* Password */}
            <div>
              <label htmlFor="pw" className="input-label">{t('enter_pass')}</label>
              <div className="relative">
                <input id="pw"
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="input-field pr-16 text-xl font-mono"
                  placeholder="••••••••"
                  aria-describedby="strength-status"
                />
                <button type="button" onClick={() => setShowPass(s => !s)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-slate-500 hover:text-blue-700
                             focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-lg min-h-[44px] min-w-[44px] flex items-center justify-center"
                  aria-label={showPass ? 'Hide password' : 'Show password'}>
                  {showPass ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
                </button>
              </div>
            </div>

            {/* Strength bar */}
            <div id="strength-status" aria-live="polite">
              <div className="flex justify-between items-center mb-2">
                <span className="text-lg font-semibold text-slate-600">{t('strength')}:</span>
                <span className={`text-xl font-black ${strengthText}`}>{strengthLabel || '—'}</span>
              </div>
              <div className="h-4 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                <div className={`h-full rounded-full transition-all duration-500 ${strengthColor}`}
                  style={{ width: strengthWidth }} />
              </div>
            </div>

            {/* Confirm */}
            <div>
              <label htmlFor="confirm" className="input-label">{t('confirm_pass')}</label>
              <input id="confirm"
                type={showPass ? 'text' : 'password'}
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                className={`input-field text-xl font-mono ${
                  confirm ? (rules.matches ? 'border-green-500 bg-green-50' : 'border-red-400 bg-red-50') : ''}`}
                placeholder="••••••••"
                aria-describedby="match-status"
              />
              {confirm && (
                <p id="match-status" className={`mt-2 text-lg font-bold flex items-center gap-2 ${rules.matches ? 'text-green-700' : 'text-red-700'}`}>
                  {rules.matches ? <><CheckCircle className="w-5 h-5" /> {t('pass_match')}</> : <>⚠️ {t('pass_mismatch')}</>}
                </p>
              )}
            </div>

            {/* Submit button */}
            <button
              onClick={() => allValid && setSubmitted(true)}
              disabled={!allValid}
              className={`btn-primary mt-2 ${!allValid ? 'opacity-40 cursor-not-allowed' : ''}`}
              aria-disabled={!allValid}
            >
              <ShieldCheck className="w-6 h-6" aria-hidden="true" />
              {t('submit')}
            </button>

            {active && !allValid && (
              <p className="text-center text-base text-blue-700 font-semibold animate-pulse">
                {t('keep_going')}
              </p>
            )}
          </div>

          {/* Right — Live checklist */}
          <div className="card p-6 flex flex-col gap-3">
            <h2 className="text-xl font-black text-slate-800 mb-2">{t('checklist_title')}</h2>
            <RuleRow valid={rules.length}  active={active} label={t('rule_min')}     suggestion={t('suggest_min')} />
            <RuleRow valid={rules.upper}   active={active} label={t('rule_upper')}   suggestion={t('suggest_upper')} />
            <RuleRow valid={rules.digit}   active={active} label={t('rule_digit')}   suggestion={t('suggest_digit')} />
            <RuleRow valid={rules.special} active={active} label={t('rule_special')} suggestion={t('suggest_special')} />

            {allValid && (
              <div className="mt-2 bg-green-50 border-2 border-green-400 rounded-2xl p-4 text-center pop-in">
                <p className="text-2xl font-black text-green-700">{t('strong_pass_ready')}</p>
                <p className="text-base text-green-600 mt-1 font-medium">{t('pass_ready_msg')}</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
