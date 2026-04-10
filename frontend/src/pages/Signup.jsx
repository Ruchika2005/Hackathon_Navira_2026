import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { User, Phone, Mail, Lock, Eye, EyeOff, Globe, ArrowRight, ArrowLeft, HelpCircle, CheckCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import LanguageSelector from '../components/LanguageSelector';
import SpeakButton from '../components/SpeakButton';
import { ReactTransliterate } from 'react-transliterate';
import 'react-transliterate/dist/index.css';

export default function Signup() {
  const navigate  = useNavigate();
  const { t, setLang } = useLanguage();

  const STEPS = [t('step_name'), t('step_contact'), t('step_password'), t('step_language')];
  const [step, setStep]   = useState(0); // 0-3
  const [form, setForm]   = useState({
    userName: '', mobileNumber: '', email: '',
    password: '', confirmPassword: '', language: 'english'
  });
  const [showPass, setShowPass]   = useState(false);
  const [errors, setErrors]       = useState({});
  const [apiError, setApiError]   = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const setField = (key, val) => {
    setForm(f => ({ ...f, [key]: val }));
    setErrors(e => ({ ...e, [key]: '' }));
  };

  /* ---- PER-STEP VALIDATION ---- */
  const validateStep = () => {
    const e = {};
    if (step === 0 && !form.userName.trim()) e.userName = t('err_name_req');
    if (step === 1) {
      if (!form.mobileNumber.trim()) e.mobileNumber = t('err_mobile_req');
      else if (!/^[6-9]\d{9}$/.test(form.mobileNumber)) e.mobileNumber = t('err_mobile_invalid');
      if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) e.email = t('err_email_invalid');
    }
    if (step === 2) {
      if (!form.password) e.password = t('err_pass_req');
      else if (form.password.length < 6) e.password = t('err_pass_min');
      if (form.password !== form.confirmPassword) e.confirmPassword = t('err_pass_mismatch');
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => { if (validateStep()) setStep(s => s + 1); };
  const prev = () => setStep(s => s - 1);

  const handleSubmit = async () => {
    setApiError('');
    setIsLoading(true);
    try {
      const res = await axios.post('/api/auth/signup', form);
      localStorage.setItem('token', res.data.token);
      if (res.data.language) {
        localStorage.setItem('language', res.data.language);
        setLang(res.data.language);
      }
      navigate('/dashboard');
    } catch (err) {
      setApiError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  /* ---- STEP CONTENT ---- */
  const steps = [
    /* Step 0 – Name */
    <div key={0} className="slide-up space-y-6">
      <div className="text-center mb-6">
        <div className="text-5xl mb-3" aria-hidden="true">😊</div>
        <h2 className="text-3xl font-black text-slate-900">{t('name_greet')}</h2>
        <p className="text-lg text-slate-500 mt-2">{t('name_sub')}</p>
      </div>
      <div>
        <label htmlFor="userName" className="input-label">
          <User className="inline w-5 h-5 mr-2 text-blue-700" /> {t('name_label')}
        </label>
        <ReactTransliterate
          id="userName"
          value={form.userName}
          onChangeText={text => setField('userName', text)}
          lang={form.language === 'hindi' ? 'hi' : form.language === 'marathi' ? 'mr' : 'hi'}
          enabled={form.language !== 'english'}
          className={`input-field text-xl w-full ${errors.userName ? 'border-red-400' : ''}`}
          placeholder="e.g. Ramesh Kumar"
          containerClassName="w-full flex block"
        />
        {errors.userName && (
          <div className="flex items-center justify-between gap-2 mt-2 bg-red-50 p-2 rounded-xl border border-red-200">
            <p id="name-err" className="text-red-700 font-semibold">⚠️ {errors.userName}</p>
            <SpeakButton text={errors.userName} />
          </div>
        )}
      </div>
    </div>,

    /* Step 1 – Contact */
    <div key={1} className="slide-up space-y-6">
      <div className="text-center mb-6">
        <div className="text-5xl mb-3" aria-hidden="true">📱</div>
        <h2 className="text-3xl font-black text-slate-900">{t('contact_title')}</h2>
        <p className="text-lg text-slate-500 mt-2">{t('contact_sub')}</p>
      </div>
      <div>
        <label htmlFor="mobile" className="input-label"><Phone className="inline w-5 h-5 mr-2 text-blue-700" /> {t('mobile_label')}</label>
        <input id="mobile" type="tel" inputMode="numeric"
          value={form.mobileNumber}
          onChange={e => setField('mobileNumber', e.target.value)}
          className={`input-field ${errors.mobileNumber ? 'border-red-400' : ''}`}
          placeholder="10-digit number" />
        {errors.mobileNumber && (
          <div className="flex items-center justify-between gap-2 mt-2 bg-red-50 p-2 rounded-xl border border-red-200">
            <p className="text-red-700 font-semibold">⚠️ {errors.mobileNumber}</p>
            <SpeakButton text={errors.mobileNumber} />
          </div>
        )}
      </div>
      <div>
        <label htmlFor="email" className="input-label">
          <Mail className="inline w-5 h-5 mr-2 text-blue-700" /> {t('email_label')}
          <span className="ml-2 text-base text-slate-400 font-normal">{t('email_optional')}</span>
        </label>
        <input id="email" type="email"
          value={form.email}
          onChange={e => setField('email', e.target.value)}
          className={`input-field ${errors.email ? 'border-red-400' : ''}`}
          placeholder="yourname@example.com" />
        {errors.email && (
          <div className="flex items-center justify-between gap-2 mt-2 bg-red-50 p-2 rounded-xl border border-red-200">
            <p className="text-red-700 font-semibold">⚠️ {errors.email}</p>
            <SpeakButton text={errors.email} />
          </div>
        )}
      </div>
    </div>,

    /* Step 2 – Password */
    <div key={2} className="slide-up space-y-6">
      <div className="text-center mb-6">
        <div className="text-5xl mb-3" aria-hidden="true">🔒</div>
        <h2 className="text-3xl font-black text-slate-900">{t('pass_title')}</h2>
        <p className="text-lg text-slate-500 mt-2">{t('pass_sub')}</p>
      </div>
      <div>
        <label htmlFor="pass" className="input-label"><Lock className="inline w-5 h-5 mr-2 text-blue-700" /> {t('pass_label')}</label>
        <div className="relative">
          <input id="pass" type={showPass ? 'text' : 'password'}
            value={form.password}
            onChange={e => setField('password', e.target.value)}
            className={`input-field pr-16 ${errors.password ? 'border-red-400' : ''}`}
            placeholder={t('pass_sub')} />
          <button type="button" onClick={() => setShowPass(s => !s)}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-slate-500 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-lg min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label={showPass ? 'Hide password' : 'Show password'}>
            {showPass ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
          </button>
        </div>
        {errors.password && (
          <div className="flex items-center justify-between gap-2 mt-2 bg-red-50 p-2 rounded-xl border border-red-200">
            <p className="text-red-700 font-semibold">⚠️ {errors.password}</p>
            <SpeakButton text={errors.password} />
          </div>
        )}
      </div>
      <div>
        <label htmlFor="confirmPass" className="input-label"><Lock className="inline w-5 h-5 mr-2 text-blue-700" /> {t('confirm_pass')}</label>
        <input id="confirmPass" type={showPass ? 'text' : 'password'}
          value={form.confirmPassword}
          onChange={e => setField('confirmPassword', e.target.value)}
          className={`input-field ${errors.confirmPassword ? 'border-red-400' : (form.confirmPassword && form.password === form.confirmPassword ? 'border-green-500' : '')}`}
          placeholder={t('confirm_pass_placeholder')} />
        {errors.confirmPassword && (
          <div className="flex items-center justify-between gap-2 mt-2 bg-red-50 p-2 rounded-xl border border-red-200">
            <p className="text-red-700 font-semibold">⚠️ {errors.confirmPassword}</p>
            <SpeakButton text={errors.confirmPassword} />
          </div>
        )}
        {form.confirmPassword && form.password === form.confirmPassword && (
          <p className="mt-2 text-green-700 font-bold flex items-center gap-1"><CheckCircle className="w-4 h-4" /> {t('pass_match_msg')}</p>
        )}
      </div>
    </div>,

    /* Step 3 – Language */
    <div key={3} className="slide-up space-y-6">
      <div className="text-center mb-6">
        <div className="text-5xl mb-3" aria-hidden="true">🌐</div>
        <h2 className="text-3xl font-black text-slate-900">{t('lang_title')}</h2>
        <p className="text-lg text-slate-500 mt-2">{t('lang_sub')}</p>
      </div>
      {[
        { val: 'english', label: 'English', sub: 'English' },
        { val: 'hindi',   label: 'हिंदी', sub: 'Hindi' },
        { val: 'marathi', label: 'मराठी', sub: 'Marathi' },
      ].map(({ val, label, sub }) => (
        <button key={val} type="button"
          onClick={() => setField('language', val)}
          className={`w-full flex items-center gap-4 p-5 rounded-2xl border-2 transition-all
            ${form.language === val
              ? 'border-blue-600 bg-blue-50 text-blue-900'
              : 'border-slate-200 bg-white text-slate-700 hover:border-blue-300'}
            focus:outline-none focus:ring-4 focus:ring-blue-400 min-h-[64px]`}
          aria-pressed={form.language === val}>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl border-2 ${form.language === val ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-300 bg-slate-50 text-slate-600'}`}>
            {form.language === val ? '✓' : '○'}
          </div>
          <div className="text-left">
            <p className="text-xl font-bold leading-none">{label}</p>
            <p className="text-sm text-slate-500 mt-0.5">{sub}</p>
          </div>
        </button>
      ))}
    </div>,
  ];

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-center px-4 py-10 relative">

      <div className="absolute top-4 right-4">
        <LanguageSelector />
      </div>

      {/* Brand */}
      <div className="text-center mb-6 relative w-full max-w-md">
        <h1 className="text-3xl font-black text-blue-900 pr-8">{t('signup_title')}</h1>
        <p className="text-lg text-slate-600 mt-1">{t('signup_subtitle')}</p>
        <div className="absolute top-0 right-4">
          <SpeakButton text={`${t('signup_title')}. ${t('signup_subtitle')}`} />
        </div>
      </div>

      {/* Progress */}
      <div className="w-full max-w-md mb-6">
        <div className="flex gap-2">
          {STEPS.map((s, i) => (
            <div key={i} className={`h-2 flex-1 rounded-full transition-all duration-300 ${i <= step ? 'bg-blue-600' : 'bg-slate-200'}`} />
          ))}
        </div>
        <p className="text-sm text-slate-500 font-medium mt-2">{t('step_label').replace('{{step}}', step + 1).replace('{{total}}', STEPS.length)}: <strong>{STEPS[step]}</strong></p>
      </div>

      {/* Card */}
      <div className="card w-full max-w-md p-8">

        {apiError && (
          <div role="alert" className="flex items-start gap-3 bg-red-50 border-2 border-red-300 rounded-2xl p-4 mb-6 relative">
            <div className="absolute top-2 right-2">
              <SpeakButton text={`Something went wrong: ${apiError}`} />
            </div>
            <span className="text-2xl mt-0.5" aria-hidden="true">⚠️</span>
            <div className="pr-10">
              <p className="font-bold text-red-800 text-lg">Something went wrong</p>
              <p className="text-red-700 text-base mt-1">{apiError}</p>
            </div>
          </div>
        )}

        {steps[step]}

        {/* Navigation */}
        <div className="flex gap-4 mt-8">
          {step > 0 && (
            <button onClick={prev} className="btn-secondary flex-1">
              <ArrowLeft className="w-5 h-5" /> {t('btn_back')}
            </button>
          )}
          {step < STEPS.length - 1 ? (
            <button onClick={next} className="btn-primary flex-1">
              {t('btn_next')} <ArrowRight className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className={`btn-primary flex-1 ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}`}
              aria-busy={isLoading}
            >
              {isLoading ? '⏳ ...' : t('btn_create')}
            </button>
          )}
        </div>

        {/* Link to login */}
        {step === 0 && (
          <p className="text-center text-lg text-slate-600 mt-6 font-medium">
            {t('already_have')}{' '}
            <Link to="/login" className="text-blue-700 font-bold underline hover:text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded">
              {t('sign_in_here')}
            </Link>
          </p>
        )}
      </div>

      {/* Help FAB */}
      <button className="help-fab" aria-label="Get help"
        onClick={() => alert('📞 Call us: 1800-XXX-XXXX\n\nWe can help you create your account!')}>
        <HelpCircle className="w-5 h-5" />
        <span>{t('help')}</span>
      </button>
    </div>
  );
}
