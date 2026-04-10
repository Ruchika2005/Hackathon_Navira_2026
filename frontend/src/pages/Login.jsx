import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Phone, Lock, Eye, EyeOff, ArrowRight, HelpCircle, CheckCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import LanguageSelector from '../components/LanguageSelector';

export default function Login() {
  const navigate = useNavigate();
  const { t, lang, setLang } = useLanguage();
  const [mobile, setMobile]       = useState('');
  const [password, setPassword]   = useState('');
  const [showPass, setShowPass]   = useState(false);
  const [errors, setErrors]       = useState({});
  const [apiError, setApiError]   = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!mobile.trim())  e.mobile   = t('err_mobile_req');
    if (!password)       e.password = t('err_pass_req');
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    if (!validate()) return;

    setIsLoading(true);
    try {
      const res = await axios.post('/api/auth/login', { mobileNumber: mobile, password, language: lang });
      localStorage.setItem('token', res.data.token);
      if (res.data.language) {
        localStorage.setItem('language', res.data.language);
        setLang(res.data.language);
      }
      navigate('/dashboard');
    } catch (err) {
      setApiError(err.response?.data?.message || t('login_err_title'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-center px-4 py-8 relative">
      <div className="absolute top-4 right-4">
        <LanguageSelector />
      </div>

      {/* App Brand */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-700 rounded-3xl shadow-lg mb-4">
          <span className="text-white text-4xl font-black">N</span>
        </div>
        <h1 className="text-4xl font-black text-blue-900 tracking-tight">Navira</h1>
        <p className="text-lg text-slate-600 font-medium mt-1">{t('navira_sub') || 'Your digital learning companion'}</p>
      </div>

      {/* Login Card */}
      <div className="card w-full max-w-md p-8 slide-up">

        <h2 className="text-3xl font-black text-slate-900 mb-2">{t('login_title')}</h2>
        <p className="text-lg text-slate-600 mb-8">{t('login_subtitle')}</p>

        {/* Error Banner */}
        {apiError && (
          <div role="alert" className="flex items-start gap-3 bg-red-50 border-2 border-red-300 rounded-2xl p-4 mb-6">
            <span className="text-red-600 text-2xl mt-0.5" aria-hidden="true">⚠️</span>
            <div>
              <p className="font-bold text-red-800 text-lg">{t('login_err_title')}</p>
              <p className="text-red-700 text-base mt-1">{apiError}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="space-y-6">

          {/* Mobile Number */}
          <div>
            <label htmlFor="mobile" className="input-label">
              <Phone className="inline w-5 h-5 mr-2 text-blue-700" aria-hidden="true" />
              {t('mobile_label')}
            </label>
            <input
              id="mobile"
              type="tel"
              inputMode="numeric"
              value={mobile}
              onChange={(e) => { setMobile(e.target.value); setErrors(p => ({...p, mobile: ''})); }}
              className={`input-field ${errors.mobile ? 'border-red-400 focus:ring-red-300' : ''}`}
              placeholder={t('mobile_placeholder')}
              aria-describedby={errors.mobile ? 'mobile-error' : undefined}
              aria-invalid={!!errors.mobile}
            />
            {errors.mobile && (
              <p id="mobile-error" className="mt-2 text-red-700 text-base font-semibold flex items-center gap-1">
                ⚠️ {errors.mobile}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="input-label">
              <Lock className="inline w-5 h-5 mr-2 text-blue-700" aria-hidden="true" />
              {t('pass_label')}
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setErrors(p => ({...p, password: ''})); }}
                className={`input-field pr-16 ${errors.password ? 'border-red-400 focus:ring-red-300' : ''}`}
                placeholder={t('pass_placeholder')}
                aria-describedby={errors.password ? 'pass-error' : undefined}
                aria-invalid={!!errors.password}
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-blue-700 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label={showPass ? 'Hide password' : 'Show password'}
              >
                {showPass ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
              </button>
            </div>
            {errors.password && (
              <p id="pass-error" className="mt-2 text-red-700 text-base font-semibold">⚠️ {errors.password}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className={`btn-primary ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}`}
            aria-busy={isLoading}
          >
            {isLoading ? (
              <>
                <span className="animate-spin text-xl" aria-hidden="true">⏳</span>
                {t('signing_in')}
              </>
            ) : (
              <>
                {t('btn_signin')}
                <ArrowRight className="w-6 h-6" aria-hidden="true" />
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="my-8 border-t-2 border-slate-100" />

        <p className="text-center text-lg text-slate-600 font-medium mb-4">
          {t('no_account')}
        </p>
        <Link to="/signup">
          <button className="btn-secondary">
            {t('create_new')}
          </button>
        </Link>
      </div>

      {/* Help */}
      <button
        className="help-fab"
        aria-label="Get help"
        onClick={() => alert('📞 Call us: 1800-XXX-XXXX\n\nWe are happy to help you sign in!')}
      >
        <HelpCircle className="w-5 h-5" />
        <span>{t('help')}</span>
      </button>
    </div>
  );
}
