import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLanguage } from './LanguageContext';

const VoiceContext = createContext();

export const VoiceProvider = ({ children }) => {
  const { lang } = useLanguage();
  
  // Voice toggle state, persisted to localStorage
  const [voiceEnabled, setVoiceEnabled] = useState(() => {
    return localStorage.getItem('voiceEnabled') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('voiceEnabled', voiceEnabled);
    if (!voiceEnabled) {
      stop();
    }
  }, [voiceEnabled]);

  const mapLangToVoiceCode = (languageKey) => {
    switch (languageKey) {
      case 'hindi': return 'hi-IN';
      case 'marathi': return 'mr-IN';
      case 'english':
      default: return 'en-US';
    }
  };

  const stop = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  };

  const _speakCore = (text, force = false) => {
    if (!force && !voiceEnabled) return;
    if (!text || !('speechSynthesis' in window)) return;

    stop(); // prevent overlapping audio

    // Strip common emojis and symbols so the TTS engine doesn't read them out loud
    const cleanText = text.replace(/[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{1F600}-\u{1F64F}]|[\u{1F680}-\u{1F6FF}]/gu, '').trim();

    if (!cleanText) return;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    const voiceCode = mapLangToVoiceCode(lang);
    
    // Find matching voice
    const voices = window.speechSynthesis.getVoices();
    let selectedVoice;

    if (voiceCode === 'mr-IN') {
      selectedVoice = voices.find(v => v.lang === 'mr-IN' || v.lang.replace('_', '-') === 'mr-IN');
      if (!selectedVoice) {
        // Explicit fallback to Hindi if Marathi not found
        selectedVoice = voices.find(v => v.lang === 'hi-IN' || v.lang.replace('_', '-') === 'hi-IN');
      }
      if (!selectedVoice) {
        // Fallback to english
        selectedVoice = voices.find(v => v.lang.startsWith('en'));
      }
    } else {
      selectedVoice = voices.find(v => v.lang === voiceCode || v.lang.replace('_', '-') === voiceCode);
      // Fallback to general language code
      if (!selectedVoice) {
        const baseLang = voiceCode.split('-')[0];
        selectedVoice = voices.find(v => v.lang.startsWith(baseLang));
      }
    }
    
    // Final fallback
    if (!selectedVoice) {
      selectedVoice = voices[0];
    }
    
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }
    
    utterance.rate = 0.9; // slightly slower for better comprehension
    window.speechSynthesis.speak(utterance);
  };

  // Automated reading (respects voiceEnabled state)
  const speak = (text) => {
    _speakCore(text, false);
  };

  // Manual replay functionality (ignores voiceEnabled state)
  const replay = (text) => {
    _speakCore(text, true);
  };

  const toggleVoice = () => {
    setVoiceEnabled(prev => !prev);
  };

  return (
    <VoiceContext.Provider value={{ voiceEnabled, setVoiceEnabled, toggleVoice, speak, stop, replay }}>
      {children}
    </VoiceContext.Provider>
  );
};

export const useVoice = () => useContext(VoiceContext);
