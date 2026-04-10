import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function LanguageSelector({ className = '' }) {
  const { lang, setLang } = useLanguage();

  return (
    <div className={`flex items-center gap-1.5 bg-blue-800/10 rounded-xl px-2 py-1.5 ${className}`}>
      <Globe className="text-blue-800/80 w-4 h-4" aria-hidden="true" />
      <select
        value={lang}
        onChange={(e) => setLang(e.target.value)}
        className="bg-transparent text-blue-900 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 rounded cursor-pointer"
        aria-label="Select language"
      >
        <option value="english" className="text-slate-900 bg-white">English</option>
        <option value="hindi"   className="text-slate-900 bg-white">हिंदी</option>
        <option value="marathi" className="text-slate-900 bg-white">मराठी</option>
      </select>
    </div>
  );
}
