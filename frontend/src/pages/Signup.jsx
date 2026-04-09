import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { User, Phone, Mail, Lock, Eye, EyeOff, Globe, ArrowRight, ArrowLeft, HelpCircle, CheckCircle } from 'lucide-react';

const STEPS = ['Your Name', 'Contact', 'Password', 'Language'];

export default function Signup() {
  const navigate  = useNavigate();
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
    if (step === 0 && !form.userName.trim()) e.userName = 'Please enter your full name.';
    if (step === 1) {
      if (!form.mobileNumber.trim()) e.mobileNumber = 'Please enter your mobile number.';
      else if (!/^[6-9]\d{9}$/.test(form.mobileNumber)) e.mobileNumber = 'Enter a valid 10-digit Indian mobile number.';
      if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Enter a valid email address or leave it blank.';
    }
    if (step === 2) {
      if (!form.password) e.password = 'Please create a password.';
      else if (form.password.length < 6) e.password = 'Password must be at least 6 characters long.';
      if (form.password !== form.confirmPassword) e.confirmPassword = 'Passwords do not match. Please try again.';
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
      if (res.data.language) localStorage.setItem('language', res.data.language);
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
        <h2 className="text-3xl font-black text-slate-900">What is your name?</h2>
        <p className="text-lg text-slate-500 mt-2">We'll use this to greet you.</p>
      </div>
      <div>
        <label htmlFor="userName" className="input-label">
          <User className="inline w-5 h-5 mr-2 text-emerald-700" /> Your Full Name
        </label>
        <input
          id="userName" type="text"
          value={form.userName}
          onChange={e => setField('userName', e.target.value)}
          className={`input-field text-xl ${errors.userName ? 'border-red-400' : ''}`}
          placeholder="e.g. Ramesh Kumar"
          aria-describedby={errors.userName ? 'name-err' : undefined}
        />
        {errors.userName && <p id="name-err" className="mt-2 text-red-700 font-semibold">⚠️ {errors.userName}</p>}
      </div>
    </div>,

    /* Step 1 – Contact */
    <div key={1} className="slide-up space-y-6">
      <div className="text-center mb-6">
        <div className="text-5xl mb-3" aria-hidden="true">📱</div>
        <h2 className="text-3xl font-black text-slate-900">Your Contact Details</h2>
        <p className="text-lg text-slate-500 mt-2">Mobile is required. Email is optional.</p>
      </div>
      <div>
        <label htmlFor="mobile" className="input-label"><Phone className="inline w-5 h-5 mr-2 text-emerald-700" /> Mobile Number</label>
        <input id="mobile" type="tel" inputMode="numeric"
          value={form.mobileNumber}
          onChange={e => setField('mobileNumber', e.target.value)}
          className={`input-field ${errors.mobileNumber ? 'border-red-400' : ''}`}
          placeholder="10-digit number" />
        {errors.mobileNumber && <p className="mt-2 text-red-700 font-semibold">⚠️ {errors.mobileNumber}</p>}
      </div>
      <div>
        <label htmlFor="email" className="input-label">
          <Mail className="inline w-5 h-5 mr-2 text-emerald-700" /> Email Address
          <span className="ml-2 text-base text-slate-400 font-normal">(optional)</span>
        </label>
        <input id="email" type="email"
          value={form.email}
          onChange={e => setField('email', e.target.value)}
          className={`input-field ${errors.email ? 'border-red-400' : ''}`}
          placeholder="yourname@example.com" />
        {errors.email && <p className="mt-2 text-red-700 font-semibold">⚠️ {errors.email}</p>}
      </div>
    </div>,

    /* Step 2 – Password */
    <div key={2} className="slide-up space-y-6">
      <div className="text-center mb-6">
        <div className="text-5xl mb-3" aria-hidden="true">🔒</div>
        <h2 className="text-3xl font-black text-slate-900">Create a Password</h2>
        <p className="text-lg text-slate-500 mt-2">Minimum 6 characters. Don't share it with anyone!</p>
      </div>
      <div>
        <label htmlFor="pass" className="input-label"><Lock className="inline w-5 h-5 mr-2 text-emerald-700" /> Password</label>
        <div className="relative">
          <input id="pass" type={showPass ? 'text' : 'password'}
            value={form.password}
            onChange={e => setField('password', e.target.value)}
            className={`input-field pr-16 ${errors.password ? 'border-red-400' : ''}`}
            placeholder="At least 6 characters" />
          <button type="button" onClick={() => setShowPass(s => !s)}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-slate-500 hover:text-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 rounded-lg min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label={showPass ? 'Hide password' : 'Show password'}>
            {showPass ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
          </button>
        </div>
        {errors.password && <p className="mt-2 text-red-700 font-semibold">⚠️ {errors.password}</p>}
      </div>
      <div>
        <label htmlFor="confirmPass" className="input-label"><Lock className="inline w-5 h-5 mr-2 text-emerald-700" /> Confirm Password</label>
        <input id="confirmPass" type={showPass ? 'text' : 'password'}
          value={form.confirmPassword}
          onChange={e => setField('confirmPassword', e.target.value)}
          className={`input-field ${errors.confirmPassword ? 'border-red-400' : (form.confirmPassword && form.password === form.confirmPassword ? 'border-green-500' : '')}`}
          placeholder="Type your password again" />
        {errors.confirmPassword && <p className="mt-2 text-red-700 font-semibold">⚠️ {errors.confirmPassword}</p>}
        {form.confirmPassword && form.password === form.confirmPassword && (
          <p className="mt-2 text-green-700 font-bold flex items-center gap-1"><CheckCircle className="w-4 h-4" /> Passwords match!</p>
        )}
      </div>
    </div>,

    /* Step 3 – Language */
    <div key={3} className="slide-up space-y-6">
      <div className="text-center mb-6">
        <div className="text-5xl mb-3" aria-hidden="true">🌐</div>
        <h2 className="text-3xl font-black text-slate-900">Choose Your Language</h2>
        <p className="text-lg text-slate-500 mt-2">You can change this later from the menu.</p>
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
              ? 'border-emerald-600 bg-emerald-50 text-emerald-900'
              : 'border-slate-200 bg-white text-slate-700 hover:border-emerald-300'}
            focus:outline-none focus:ring-4 focus:ring-emerald-400 min-h-[64px]`}
          aria-pressed={form.language === val}>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl border-2 ${form.language === val ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-slate-300 bg-slate-50 text-slate-600'}`}>
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
    <div className="min-h-screen bg-emerald-50 flex flex-col items-center justify-center px-4 py-10">

      {/* Brand */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-black text-emerald-900">Create Your Account</h1>
        <p className="text-lg text-slate-600 mt-1">It only takes a minute!</p>
      </div>

      {/* Progress */}
      <div className="w-full max-w-md mb-6">
        <div className="flex gap-2">
          {STEPS.map((s, i) => (
            <div key={i} className={`h-2 flex-1 rounded-full transition-all duration-300 ${i <= step ? 'bg-emerald-600' : 'bg-slate-200'}`} />
          ))}
        </div>
        <p className="text-sm text-slate-500 font-medium mt-2">Step {step + 1} of {STEPS.length}: <strong>{STEPS[step]}</strong></p>
      </div>

      {/* Card */}
      <div className="card w-full max-w-md p-8">

        {apiError && (
          <div role="alert" className="flex items-start gap-3 bg-red-50 border-2 border-red-300 rounded-2xl p-4 mb-6">
            <span className="text-2xl mt-0.5" aria-hidden="true">⚠️</span>
            <div>
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
              <ArrowLeft className="w-5 h-5" /> Back
            </button>
          )}
          {step < STEPS.length - 1 ? (
            <button onClick={next} className="btn-primary flex-1">
              Next <ArrowRight className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className={`btn-primary flex-1 ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}`}
              aria-busy={isLoading}
            >
              {isLoading ? '⏳ Creating account…' : '🎉 Create Account'}
            </button>
          )}
        </div>

        {/* Link to login */}
        {step === 0 && (
          <p className="text-center text-lg text-slate-600 mt-6 font-medium">
            Already have an account?{' '}
            <Link to="/login" className="text-emerald-700 font-bold underline hover:text-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-400 rounded">
              Sign in here
            </Link>
          </p>
        )}
      </div>

      {/* Help FAB */}
      <button className="help-fab" aria-label="Get help"
        onClick={() => alert('📞 Call us: 1800-XXX-XXXX\n\nWe can help you create your account!')}>
        <HelpCircle className="w-5 h-5" />
        <span>Help</span>
      </button>
    </div>
  );
}
