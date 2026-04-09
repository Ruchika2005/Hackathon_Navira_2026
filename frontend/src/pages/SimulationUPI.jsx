import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, ShieldAlert, Lock, ChevronRight, X, Smartphone } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import Navbar from '../components/Navbar';

const CONTACTS = [
  { id: 1, name: 'Rahul Sharma',  phone: '98765 43210', initials: 'RS', bg: 'bg-blue-500' },
  { id: 2, name: 'Anjali Gupta', phone: '91234 56789', initials: 'AG', bg: 'bg-purple-500' },
  { id: 3, name: 'Safe Helper',  phone: '90000 11111', initials: 'SH', bg: 'bg-green-600' },
];

const STEPS = ['Select Contact', 'Enter Amount', 'Safety Warning', 'Enter PIN', 'Success'];

export default function SimulationUPI() {
  const navigate = useNavigate();
  const { t }    = useLanguage();

  const [step,    setStep]    = useState(0);
  const [contact, setContact] = useState(null);
  const [amount,  setAmount]  = useState('');
  const [pin,     setPin]     = useState('');

  const next    = () => setStep(s => s + 1);
  const prev    = () => step === 0 ? navigate('/simulations') : setStep(s => s - 1);

  const onKey = (v) => {
    if (v === 'DEL') { setPin(p => p.slice(0, -1)); return; }
    if (pin.length < 6) setPin(p => p + v);
  };

  const reset = () => { setStep(0); setContact(null); setAmount(''); setPin(''); };

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col">
      <Navbar />

      <main className="flex-1 w-full max-w-lg mx-auto px-4 py-6 pb-24">

        {/* Back */}
        <button onClick={prev}
          className="flex items-center gap-2 text-blue-700 font-bold text-lg mb-6
                     hover:text-blue-900 focus:outline-none focus:ring-4 focus:ring-blue-400 rounded-xl p-1 min-h-[44px]">
          <ArrowLeft className="w-6 h-6" /> Back
        </button>

        {/* Header */}
        <div className="card p-5 mb-6 bg-teal-700 text-white border-0">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2.5 rounded-2xl">
              <Smartphone className="w-7 h-7 text-white" aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-xl font-black">{t('upi_title')}</h1>
              <p className="text-teal-200 text-sm font-medium mt-0.5">This is a safe practice session</p>
            </div>
          </div>
        </div>

        {/* Progress dots */}
        <div className="flex gap-2 mb-6" aria-label={`Step ${step + 1} of ${STEPS.length}`}>
          {STEPS.map((_, i) => (
            <div key={i} className={`h-2 flex-1 rounded-full transition-all ${i <= step ? 'bg-teal-600' : 'bg-slate-200'}`} />
          ))}
        </div>

        {/* ── Step 0: Select Contact ── */}
        {step === 0 && (
          <div className="card p-6 slide-up">
            <h2 className="text-2xl font-black text-slate-900 mb-5">{t('select_contact')}</h2>
            <div className="space-y-3">
              {CONTACTS.map(c => (
                <button key={c.id}
                  onClick={() => { setContact(c); next(); }}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl border-2 border-slate-100
                             bg-white hover:border-teal-400 hover:bg-teal-50
                             focus:outline-none focus:ring-4 focus:ring-teal-400
                             transition-all min-h-[72px] text-left"
                  aria-label={`Pay to ${c.name}`}>
                  <div className={`${c.bg} w-14 h-14 rounded-full flex items-center justify-center text-white text-xl font-black shrink-0`}>
                    {c.initials}
                  </div>
                  <div className="flex-1">
                    <p className="text-xl font-bold text-slate-900">{c.name}</p>
                    <p className="text-base text-slate-500 font-medium">{c.phone}</p>
                  </div>
                  <ChevronRight className="text-slate-400 w-6 h-6 shrink-0" aria-hidden="true" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Step 1: Enter Amount ── */}
        {step === 1 && contact && (
          <div className="card p-6 slide-up">
            {/* Contact summary */}
            <div className="flex items-center gap-3 mb-6 bg-slate-50 rounded-2xl p-4">
              <div className={`${contact.bg} w-12 h-12 rounded-full flex items-center justify-center text-white font-black text-lg shrink-0`}>
                {contact.initials}
              </div>
              <div>
                <p className="text-base text-slate-500 font-medium">{t('to')}</p>
                <p className="text-xl font-black text-slate-900">{contact.name}</p>
              </div>
            </div>

            <h2 className="text-2xl font-black text-slate-900 mb-4">{t('enter_amount')}</h2>

            <div className="flex items-center gap-2 bg-slate-50 border-2 border-slate-200 rounded-2xl p-5 mb-4 focus-within:border-blue-500">
              <span className="text-3xl font-black text-slate-400">₹</span>
              <input
                type="number" inputMode="numeric"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                className="bg-transparent text-4xl font-black w-full outline-none text-slate-900"
                placeholder="0"
                aria-label="Amount in rupees"
                autoFocus
              />
            </div>

            {/* Warning inline */}
            <div className="flex items-start gap-3 bg-amber-50 border-2 border-amber-200 rounded-2xl p-4 mb-6">
              <span className="text-2xl shrink-0" aria-hidden="true">⚠️</span>
              <p className="text-base font-semibold text-amber-900">{t('receiver_warn')}</p>
            </div>

            <button onClick={next} disabled={!amount || Number(amount) <= 0}
              className={`btn-primary ${(!amount || Number(amount) <= 0) ? 'opacity-40 cursor-not-allowed' : ''}`}>
              Continue <ChevronRight className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        )}

        {/* ── Step 2: Safety Warning ── */}
        {step === 2 && (
          <div className="card p-8 slide-up text-center">
            <div className="text-7xl mb-5" aria-hidden="true">🛡️</div>
            <h2 className="text-3xl font-black text-red-800 mb-4">Important Safety Rule</h2>
            <div className="bg-red-50 border-2 border-red-300 rounded-3xl p-6 mb-8 text-left">
              <p className="text-xl font-bold text-red-900 leading-relaxed">
                🔴 {t('pin_warn')}
              </p>
              <p className="text-lg text-red-700 mt-3 font-medium leading-relaxed">
                Banks or apps will <strong>never</strong> ask for your PIN on the phone or chat.
              </p>
            </div>
            <button onClick={next} className="btn-primary">
              ✅ I understand — Continue
            </button>
          </div>
        )}

        {/* ── Step 3: Enter PIN ── */}
        {step === 3 && (
          <div className="card p-6 slide-up">
            {/* Summary row */}
            <div className="flex items-center justify-between bg-slate-50 rounded-2xl p-4 mb-6 text-base font-semibold text-slate-700">
              <span>{contact?.name}</span>
              <span className="text-2xl font-black text-teal-700">₹{amount}</span>
            </div>

            <h2 className="text-2xl font-black text-slate-900 mb-1 text-center">{t('enter_pin')}</h2>
            <p className="text-base text-slate-500 font-medium text-center mb-6 flex items-center justify-center gap-1.5">
              <Lock className="w-4 h-4" aria-hidden="true" /> Safe practice mode
            </p>

            {/* PIN dots */}
            <div className="flex justify-center gap-4 mb-8" aria-label={`${pin.length} digits entered`} aria-live="polite">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i}
                  className={`w-5 h-5 rounded-full border-2 transition-all duration-300 ${
                    i < pin.length ? 'bg-teal-600 border-teal-600 scale-110' : 'bg-slate-100 border-slate-300'}`} />
              ))}
            </div>

            {/* On-screen keypad */}
            <div className="grid grid-cols-3 gap-3 mb-5">
              {[1,2,3,4,5,6,7,8,9].map(n => (
                <button key={n} onClick={() => onKey(String(n))}
                  className="h-16 bg-white border-2 border-slate-200 rounded-2xl text-3xl font-black text-slate-800
                             hover:bg-teal-50 hover:border-teal-300 active:scale-95 transition-all
                             focus:outline-none focus:ring-4 focus:ring-teal-400 min-h-[64px]"
                  aria-label={`Press ${n}`}>
                  {n}
                </button>
              ))}
              {/* Empty + 0 + Delete */}
              <div /> {/* spacer */}
              <button onClick={() => onKey('0')}
                className="h-16 bg-white border-2 border-slate-200 rounded-2xl text-3xl font-black text-slate-800
                           hover:bg-teal-50 hover:border-teal-300 active:scale-95 transition-all
                           focus:outline-none focus:ring-4 focus:ring-teal-400 min-h-[64px]"
                aria-label="Press 0">0</button>
              <button onClick={() => onKey('DEL')}
                className="h-16 bg-slate-100 border-2 border-slate-200 rounded-2xl flex items-center justify-center
                           hover:bg-red-100 hover:border-red-300 active:scale-95 transition-all
                           focus:outline-none focus:ring-4 focus:ring-red-300 min-h-[64px]"
                aria-label="Delete last digit">
                <X className="w-7 h-7 text-slate-600" />
              </button>
            </div>

            <button onClick={next} disabled={pin.length < 4}
              className={`btn-primary ${pin.length < 4 ? 'opacity-40 cursor-not-allowed' : 'bg-green-700 hover:bg-green-800'}`}>
              <Lock className="w-5 h-5" aria-hidden="true" /> Confirm Payment
            </button>
          </div>
        )}

        {/* ── Step 4: Success ── */}
        {step === 4 && (
          <div className="card p-10 text-center pop-in">
            <div className="text-7xl mb-5" aria-hidden="true">✅</div>
            <h2 className="text-3xl font-black text-green-800 mb-3">{t('success_upi')}</h2>
            <div className="bg-slate-50 rounded-3xl p-5 mb-8">
              <p className="text-base text-slate-500 font-semibold mb-1">{t('amount')}</p>
              <p className="text-5xl font-black text-teal-700 mb-4">₹{amount}</p>
              <p className="text-base text-slate-500 font-semibold mb-1">{t('to')}</p>
              <p className="text-2xl font-bold text-slate-900">{contact?.name}</p>
            </div>
            <p className="text-lg text-green-700 font-semibold mb-8">
              🎉 You completed the UPI practice. Well done!
            </p>
            <button onClick={reset} className="btn-primary bg-teal-700 hover:bg-teal-800">
              Try Again
            </button>
            <button onClick={() => navigate('/simulations')} className="btn-secondary mt-4">
              <ArrowLeft className="w-5 h-5" /> Back to Simulations
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
