import React, { useState } from 'react';
import { Volume2, Volume1 } from 'lucide-react';
import { useVoice } from '../context/VoiceContext';

export default function SpeakButton({ text, className = '' }) {
  const { replay } = useVoice();

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    replay(text);
  };

  if (!text) return null;

  return (
    <button
      onClick={handleClick}
      className={`p-2 rounded-full bg-white/50 text-blue-700 border border-blue-200 hover:bg-blue-100 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 shrink-0 ${className}`}
      title="Listen to text"
      aria-label="Play audio"
    >
      <Volume2 className="w-4 h-4 md:w-5 md:h-5" />
    </button>
  );
}
