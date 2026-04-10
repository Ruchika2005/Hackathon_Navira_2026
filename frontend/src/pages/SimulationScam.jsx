import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ShieldAlert,
  Trophy,
  Volume2,
  VolumeX,
  Send,
  Info,
  User,
  Bot,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Building2,
  Gift,
  Truck,
  UserCircle2,
  Search,
  ChevronRight
} from 'lucide-react';
import axios from 'axios';
import { useLanguage } from '../context/LanguageContext';
import Navbar from '../components/Navbar';
import { ReactTransliterate } from 'react-transliterate';
import 'react-transliterate/dist/index.css';

// --- Scam Scenarios Data ---
const SCENARIOS = [
  {
    id: 'bank_otp',
    icon: Building2,
    color: 'blue',
    titleKey: 'bank_otp_title',
    descKey: 'bank_otp_desc',
    initialMessageKey: 'bank_otp_initial',
    tacticKey: 'bank_otp_tactic',
    redFlagsKeys: ['bank_otp_rf1', 'bank_otp_rf2', 'bank_otp_rf3'],
  },
  {
    id: 'lottery',
    icon: Gift,
    color: 'yellow',
    titleKey: 'lottery_title',
    descKey: 'lottery_desc',
    initialMessageKey: 'lottery_initial',
    tacticKey: 'lottery_tactic',
    redFlagsKeys: ['lottery_rf1', 'lottery_rf2', 'lottery_rf3'],
  },
  {
    id: 'delivery',
    icon: Truck,
    color: 'teal',
    titleKey: 'delivery_title',
    descKey: 'delivery_desc',
    initialMessageKey: 'delivery_initial',
    tacticKey: 'delivery_tactic',
    redFlagsKeys: ['delivery_rf1', 'delivery_rf2', 'delivery_rf3'],
  },
  {
    id: 'friend',
    icon: UserCircle2,
    color: 'purple',
    titleKey: 'friend_title',
    descKey: 'friend_desc',
    initialMessageKey: 'friend_initial',
    tacticKey: 'friend_tactic',
    redFlagsKeys: ['friend_rf1', 'friend_rf2', 'friend_rf3'],
  }
];

// --- Main Page Component ---
export default function SimulationScam() {
  const navigate = useNavigate();
  const { lang, t } = useLanguage();
  const scrollRef = useRef(null);

  // States
  const [stage, setStage] = useState('selector'); // 'selector', 'difficulty', 'chat'
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [difficulty, setDifficulty] = useState('beginner');
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState(100);
  const [feedback, setFeedback] = useState(null);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [turnCount, setTurnCount] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  // Auto-scroll chat
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Handle global language changes for initial message
  useEffect(() => {
    if (stage === 'chat' && selectedScenario && messages.length > 0) {
      setMessages(prev => {
        const updated = [...prev];
        // The first message (initial AI message) has id: 1
        if (updated[0] && updated[0].id === 1) {
          updated[0] = {
            ...updated[0],
            text: t(selectedScenario.initialMessageKey)
          };
        }
        return updated;
      });
    }
  }, [lang, stage, selectedScenario]); // stage and selectedScenario added to handle edge cases

  // Handle Voice
  const speak = (text) => {
    if (!voiceEnabled) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    // Find a nice voice
    const voices = window.speechSynthesis.getVoices();
    utterance.voice = voices.find(v => v.lang.includes('en-IN')) || voices[0];
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  // --- LOGIC HELPERS ---

  const startSimulation = (scenario) => {
    setSelectedScenario(scenario);
    setStage('difficulty');
  };

  const confirmDifficulty = (lvl) => {
    setDifficulty(lvl);
    setStage('chat');
    // Initial scammer message
    const firstMsg = {
      id: 1,
      sender: 'ai',
      text: t(selectedScenario.initialMessageKey),
      textKey: selectedScenario.initialMessageKey,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([firstMsg]);
    speak(firstMsg.text);
  };

  const handleSend = async () => {
    if (!userInput.trim() || isGameOver) return;

    const currentInput = userInput;
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: currentInput,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setUserInput('');
    setIsTyping(true);

    try {
      const res = await axios.post('/api/scam/chat', {
        message: currentInput,
        history: updatedMessages.slice(0, -1),
        scenario: selectedScenario.id,
        difficulty: difficulty,
        language: lang
      });

      const { evaluation, text, time } = res.data;

      // --- RULE 1: Check for FAILURE (AI Detected sensitive info) ---
      if (evaluation === 'FAILURE') {
        setScore(prev => Math.max(0, prev - 40));
        setIsGameOver(true);
        setIsTyping(false);
        const fb = {
          type: 'danger',
          msgKey: 'simulation_ended',
          factKey: 'bank_otp_failure_fact' // I'll add this key soon or use default
        };
        setFeedback(fb);
        speak(t(fb.msgKey));
        return;
      }

      // --- RULE 2: Check for SUCCESS (AI Detected scam rejection) ---
      if (evaluation === 'SUCCESS') {
        setScore(prev => Math.min(100, prev + 20));
        setIsGameOver(true);
        setIsTyping(false);
        const fb = {
          type: 'success',
          msgKey: 'simulation_complete',
          factKey: 'simulation_success_fact'
        };
        setFeedback(fb);
        speak(t(fb.msgKey));
        return;
      }

      // --- RULE 3: Turn Limit Check (Max 8) ---
      if (turnCount >= 7) {
        setIsGameOver(true);
        setIsTyping(false);
        const fb = {
          type: 'info',
          msg: "Simulation Complete",
          fact: "The training session has ended after 8 turns. You successfully avoided falling for the scam by not sharing any codes!"
        };
        setFeedback(fb);
        speak(fb.msg);
        return;
      }

      // Else: CONTINUE
      const aiMsg = { id: Date.now() + 1, sender: 'ai', text, time };
      setMessages(prev => [...prev, aiMsg]);
      speak(aiMsg.text);
      setTurnCount(prev => prev + 1);

    } catch (err) {
      console.error("Chat API Error:", err);
      const errorMsg = {
        id: Date.now() + 1,
        sender: 'ai',
        text: "The caller hung up. (Check your API keys in the backend .env)",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleDecision = async (type) => {
    if (isGameOver) return;
    let newScore = score;
    let fb = null;

    if (type === 'share_otp') {
      newScore -= 20;
      setIsGameOver(true);
      fb = {
        type: 'danger',
        msg: "Simulation Ended",
        fact: "You shared your OTP. This allows scammers to access your bank account. Legitimate services NEVER ask for these in chat."
      };
    } else if (type === 'report') {
      newScore = Math.min(100, newScore + 15);
      setIsGameOver(true);
      fb = {
        type: 'success',
        msg: "Excellent Response",
        fact: "Reporting scams helps authorities stop fraud networks. You recognized the threat and took the best possible action."
      };
    } else if (type === 'ignore') {
      newScore = Math.min(100, newScore + 10);
      setIsGameOver(true);
      fb = {
        type: 'success',
        msg: "Good Decision",
        fact: "Ignoring suspicious messages is a safe choice. Scammers often rely on responses to continue their manipulation."
      };
    } else if (type === 'verify') {
      newScore = Math.min(100, newScore + 5);

      const verifyMsg = {
        id: Date.now(),
        sender: 'user',
        text: "Can you verify your identity?",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      const updatedMessages = [...messages, verifyMsg];
      setMessages(updatedMessages);
      fb = {
        type: 'info',
        msg: "Caution Required",
        fact: "Asking for verification shows critical thinking, but be careful! Scammers can provide fake IDs or documents too."
      };

      // AI Escalates Pressure
      setIsTyping(true);
      setTimeout(async () => {
        try {
          const res = await axios.post('/api/scam/chat', {
            message: verifyMsg.text,
            history: messages, // history before verifyMsg
            scenario: selectedScenario.id,
            difficulty: difficulty,
            skipEvaluation: true, // IMPORTANT: Bypass SUCCESS detection
            language: lang
          });
          const aiMsg = {
            id: Date.now() + 1,
            sender: 'ai',
            text: res.data.text,
            time: res.data.time
          };
          setMessages(prev => [...prev, aiMsg]);
          speak(aiMsg.text);
        } catch (e) {
          console.error(e);
        } finally {
          setIsTyping(false);
        }
      }, 800);
    }

    setScore(Math.max(0, newScore));
    setFeedback(fb);
    if (fb) speak(fb.msg);
    if (!isGameOver && type !== 'verify') {
      setTimeout(() => setFeedback(null), 8000);
    }
  };

  const resetSimulation = () => {
    setMessages([]);
    setScore(100);
    setFeedback(null);
    setTurnCount(0);
    setIsGameOver(false);
    setIsTyping(false);
  };

  const restartCurrent = () => {
    resetSimulation();
    confirmDifficulty(difficulty);
  };

  const goToSelector = () => {
    resetSimulation();
    setSelectedScenario(null);
    setStage('selector');
  };

  // --- UI Components ---

  const renderSelector = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-black text-slate-900 mb-3">{t('select_scenario')}</h2>
        <p className="text-lg text-slate-600 font-medium">Select a scenario to start practicing your defenses.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 pb-20">
        {SCENARIOS.map((s) => {
          const IconComp = s.icon;
          return (
            <button
              key={s.id}
              onClick={() => startSimulation(s)}
              className="card flex flex-col items-start p-8 group border-2 border-transparent hover:border-blue-400 hover:shadow-2xl transition-all text-left"
            >
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform
                ${s.color === 'blue' ? 'bg-blue-100 text-blue-700' : ''}
                ${s.color === 'yellow' ? 'bg-yellow-100 text-yellow-700' : ''}
                ${s.color === 'teal' ? 'bg-teal-100 text-teal-700' : ''}
                ${s.color === 'purple' ? 'bg-purple-100 text-purple-700' : ''}
              `}>
                <IconComp className="w-9 h-9" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-2">{t(s.titleKey)}</h3>
              <p className="text-slate-600 font-medium mb-6 flex-1 text-lg leading-relaxed">{t(s.descKey)}</p>
              <span className="inline-flex items-center gap-2 text-blue-700 font-bold text-lg group-hover:gap-4 transition-all">
                {t('begin_sim')} <ChevronRight className="w-5 h-5" />
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );

  const renderDifficulty = () => (
    <div className="max-w-xl mx-auto py-10 animate-in zoom-in-95 duration-300">
      <div className="card p-10 text-center">
        <h2 className="text-3xl font-black text-slate-900 mb-8">{t('difficulty')}</h2>

        <div className="space-y-4">
          {['beginner', 'intermediate', 'advanced'].map(lvl => (
            <button
              key={lvl}
              onClick={() => confirmDifficulty(lvl)}
              className="w-full btn-secondary py-5 text-xl capitalize flex items-center justify-between"
            >
              <span>{t(lvl)}</span>
              <ChevronRight className="w-6 h-6" />
            </button>
          ))}
        </div>

        <button
          onClick={() => setStage('selector')}
          className="mt-10 text-slate-500 font-bold hover:text-slate-800 transition-colors"
        >
          {t('back')}
        </button>
      </div>
    </div>
  );

  const renderChat = () => (
    <div className="flex flex-col h-[75vh] max-w-4xl mx-auto">
      {/* Simulation Header */}
      <div className="bg-white border-b-2 border-slate-100 p-4 flex items-center justify-between rounded-t-3xl shadow-sm">
        <div className="flex items-center gap-4">
          <div className={`p-2 rounded-xl 
            ${selectedScenario.color === 'blue' ? 'bg-blue-100 text-blue-700' : ''}
            ${selectedScenario.color === 'yellow' ? 'bg-yellow-100 text-yellow-700' : ''}
            ${selectedScenario.color === 'teal' ? 'bg-teal-100 text-teal-700' : ''}
            ${selectedScenario.color === 'purple' ? 'bg-purple-100 text-purple-700' : ''}
          `}>
            <selectedScenario.icon className="w-7 h-7" />
          </div>
          <div>
            <h3 className="font-black text-slate-900 text-xl leading-none mb-1">{t(selectedScenario.titleKey)}</h3>
            <span className="text-xs font-bold text-slate-400 p-1 bg-slate-100 rounded px-2">
              {t('difficulty_label')}: {t(difficulty)}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setVoiceEnabled(!voiceEnabled)}
            className={`p-3 rounded-xl transition-all ${voiceEnabled ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-100 text-slate-500'}`}
            title="Toggle Voice"
          >
            {voiceEnabled ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
          </button>
          <div className="bg-blue-50 border-2 border-blue-200 px-4 py-2 rounded-2xl flex items-center gap-2">
            <Trophy className="w-5 h-5 text-blue-700" />
            <span className="font-black text-blue-900 text-lg">{score}</span>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50"
      >
        {messages.map(m => (
          <div key={m.id} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex gap-3 max-w-[85%] ${m.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-sm
                ${m.sender === 'user' ? 'bg-blue-700 text-white' : 'bg-white text-slate-400 border border-slate-200'}
              `}>
                {m.sender === 'user' ? <User className="w-6 h-6" /> : <Bot className="w-6 h-6" />}
              </div>
              <div className={`p-4 rounded-3xl shadow-sm text-lg font-medium relative group
                ${m.sender === 'user' ? 'bg-blue-700 text-white rounded-tr-none' : 'bg-white text-slate-800 rounded-tl-none'}
              `}>
                {m.textKey ? t(m.textKey) : m.text}
                <span className={`block text-[10px] mt-1 opacity-60 font-bold 
                  ${m.sender === 'user' ? 'text-right' : 'text-left'}
                `}>
                  {m.time}
                </span>
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white p-4 rounded-2xl shadow-sm flex gap-1">
              <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]" />
              <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}
      </div>

      {/* Quick Action Buttons & Feedback Panel */}
      <div className="bg-white p-4 border-t-2 border-slate-100 flex flex-col gap-4 relative">

        {/* Feedback Card OVERLAY / FINAL SUMMARY */}
        {(feedback || isGameOver) && (
          <div className="absolute bottom-full mb-4 left-4 right-4 z-10 animate-in slide-in-from-bottom-2 duration-300">
            <div className={`card p-6 shadow-2xl border-l-8 
              ${(feedback?.type === 'danger' || (isGameOver && score < 70)) ? 'bg-red-50 border-red-500' : ''}
              ${(feedback?.type === 'success' || (isGameOver && score >= 70)) ? 'bg-green-50 border-green-500' : ''}
              ${(feedback?.type === 'info' || (isGameOver && !feedback)) ? 'bg-blue-50 border-blue-500' : ''}
            `}>
              <div className="flex items-start gap-4">
                <div className={`p-2 rounded-full 
                   ${(feedback?.type === 'danger' || (isGameOver && score < 70)) ? 'bg-red-200 text-red-700' : ''}
                   ${(feedback?.type === 'success' || (isGameOver && score >= 70)) ? 'bg-green-200 text-green-700' : ''}
                   ${(feedback?.type === 'info' || (isGameOver && !feedback)) ? 'bg-blue-200 text-blue-700' : ''}
                `}>
                  {(feedback?.type === 'danger' || (isGameOver && score < 70)) ? <XCircle /> :
                    (feedback?.type === 'success' || (isGameOver && score >= 70)) ? <CheckCircle2 /> : <Info />}
                </div>
                <div className="flex-1">
                  <h4 className="text-2xl font-black mb-2 flex items-center justify-between">
                    <span>{isGameOver ? t('training_summary') : (feedback?.msgKey ? t(feedback.msgKey) : feedback?.msg)}</span>
                    {isGameOver && <span className="text-blue-700">{t('score_label')}: {score}/100</span>}
                  </h4>

                  {isGameOver && (
                    <p className="font-bold text-slate-600 mb-4 text-lg">
                      {score >= 70 ? "Excellent job! You are highly resistant to these scam tactics." :
                        score >= 40 ? "Good effort, but you should be more cautious with suspicious requests." :
                          "Warning: You are vulnerable to these tactics. Please review the red flags."}
                    </p>
                  )}

                  <p className="text-slate-700 font-medium text-lg mb-4 leading-relaxed">
                    {feedback?.factKey ? t(feedback.factKey) : (feedback?.fact || t('safety_tip_default'))}
                  </p>

                  {/* Red Flags Helper */}
                  <div className="bg-white/50 p-4 rounded-xl border border-black/5">
                    <p className="font-black text-sm uppercase tracking-wider text-slate-500 mb-3">{t('tactics_targeted')}</p>
                    <div className="mb-4 bg-blue-100/50 p-3 rounded-lg border border-blue-200">
                      <p className="font-bold text-blue-900">{t(selectedScenario.tacticKey)}</p>
                    </div>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {selectedScenario.redFlagsKeys.map((flagKey, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-base font-bold text-slate-600">
                          <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" /> {t(flagKey)}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {isGameOver && (
                    <div className="mt-8 flex gap-4">
                      <button onClick={restartCurrent} className="btn-secondary !bg-blue-700 !text-white !py-3 flex-1">{t('restart_training')}</button>
                      <button onClick={goToSelector} className="btn-secondary !py-3 flex-1">{t('new_scenario')}</button>
                    </div>
                  )}
                </div>
                {!isGameOver && (
                  <button onClick={() => setFeedback(null)} className="text-slate-400 hover:text-slate-600">
                    <XCircle className="w-7 h-7" />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <button
            onClick={() => handleDecision('ignore')}
            disabled={isGameOver}
            className={`p-3 rounded-2xl font-black text-sm transition-all border 
              ${isGameOver ? 'bg-slate-100 text-slate-400 border-transparent cursor-not-allowed' : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-transparent'}
            `}
          >
            🚫 {t('ignore_msg')}
          </button>
          <button
            onClick={() => handleDecision('verify')}
            disabled={isGameOver}
            className={`p-3 rounded-2xl font-black text-sm transition-all border 
              ${isGameOver ? 'bg-slate-50 text-slate-400 border-transparent cursor-not-allowed' : 'bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-100'}
            `}
          >
            🔍 {t('ask_verify')}
          </button>
          <button
            onClick={() => handleDecision('report')}
            disabled={isGameOver}
            className={`p-3 rounded-2xl font-black text-sm transition-all border 
              ${isGameOver ? 'bg-green-50 text-slate-400 border-transparent cursor-not-allowed' : 'bg-green-50 hover:bg-green-100 text-green-700 border-green-100'}
            `}
          >
            🚩 {t('report_scam')}
          </button>
          <button
            onClick={() => handleDecision('share_otp')}
            disabled={isGameOver}
            className={`p-3 rounded-2xl font-black text-sm transition-all border 
              ${isGameOver ? 'bg-red-50 text-slate-400 border-transparent cursor-not-allowed' : 'bg-red-50 hover:bg-red-100 text-red-600 border-red-100'}
            `}
          >
            ⚠️ {t('share_otp')}
          </button>
        </div>

        {/* Text Input */}
        <div className="flex gap-2 p-1">
          <ReactTransliterate
            value={userInput}
            onChangeText={(text) => setUserInput(text)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            disabled={isGameOver}
            lang={lang === 'hindi' ? 'hi' : lang === 'marathi' ? 'mr' : 'hi'}
            enabled={lang !== 'english'}
            placeholder={isGameOver ? t('sim_over') : t('type_response')}
            className="w-full h-full bg-slate-100 border-2 border-transparent focus:border-blue-400 focus:bg-white rounded-2xl px-5 py-4 text-lg font-medium outline-none transition-all disabled:opacity-50"
            containerClassName="flex-1 flex"
          />
          <button
            onClick={handleSend}
            disabled={!userInput.trim() || isTyping || isGameOver}
            className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all shadow-lg
              ${!userInput.trim() || isTyping || isGameOver ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'bg-blue-700 text-white hover:scale-105 active:scale-95'}
            `}
          >
            <Send className="w-7 h-7" />
          </button>
        </div>
      </div>

      <div className="p-4 flex items-center justify-center gap-6">
        <button
          onClick={goToSelector}
          className="text-slate-500 font-bold hover:text-blue-700 flex items-center gap-2 transition-all p-2 rounded-lg"
        >
          <ArrowLeft className="w-5 h-5" /> {t('back_to_scenarios')}
        </button>
        <div className="w-px h-6 bg-slate-200" />
        <button
          onClick={() => {
            setIsGameOver(true);
            setFeedback({
              type: 'info',
              msgKey: 'simulation_ended',
              factKey: 'simulation_ended_manual_fact'
            });
          }}
          className="text-slate-500 font-black hover:text-red-500 flex items-center gap-2 transition-all p-2 rounded-lg"
        >
          <AlertTriangle className="w-5 h-5" /> {t('end_simulation')}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-blue-50 font-sans">
      <Navbar />

      <main className="w-full max-w-6xl mx-auto px-4 py-8">

        {/* Header (Hide in chat stage to focus on simulation) */}
        {stage !== 'chat' && (
          <div className="mb-12 animate-in fade-in duration-700">
            <button
              onClick={() => navigate('/simulations')}
              className="flex items-center gap-2 text-blue-700 font-bold text-lg mb-8 hover:text-blue-900 rounded-xl"
            >
              <ArrowLeft className="w-6 h-6" /> {t('back')}
            </button>

            <div className="relative">
              <div className="absolute -top-6 -left-6 w-12 h-12 bg-blue-700/10 rounded-full blur-xl animate-pulse" />
              <div className="absolute -top-10 left-20 w-16 h-16 bg-indigo-700/5 rounded-full blur-2xl animate-pulse delay-700" />
              <h1 className="text-5xl font-black text-slate-900 mb-4 tracking-tight">
                {t('scam_hero_title')}
              </h1>
              <p className="text-xl text-slate-600 font-medium max-w-2xl leading-relaxed">
                {t('scam_hero_desc')}
              </p>
            </div>
          </div>
        )}

        {/* --- Main Content Stage --- */}
        {stage === 'selector' && renderSelector()}
        {stage === 'difficulty' && renderDifficulty()}
        {stage === 'chat' && renderChat()}

      </main>

      {/* Accessibility Floating Tooltip Hint (Optional) */}
      {stage === 'chat' && !voiceEnabled && (
        <div className="fixed bottom-10 right-10 bg-white p-4 rounded-2xl shadow-2xl border-2 border-blue-200 flex items-center gap-3 animate-bounce cursor-pointer"
          onClick={() => { setVoiceEnabled(true); speak("Voice guidance is now enabled."); }}>
          <div className="w-10 h-10 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center">
            <Volume2 className="w-5 h-5" />
          </div>
          <p className="text-sm font-black text-blue-900 pr-2">Enable Voice Guide?</p>
        </div>
      )}

      {/* Styles for animation (Tailwind built-ins usually enough, but just in case) */}
      <style>{`
        .animate-in { animation: fadeIn 0.5s ease-out; }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .card {
          background: white;
          border-radius: 2rem;
          box-shadow: 0 10px 25px -5px rgba(0,0,0,0.05), 0 8px 10px -6px rgba(0,0,0,0.05);
        }
        .btn-secondary {
          background: white;
          color: #1e293b;
          border-radius: 1.5rem;
          padding: 1rem 1.5rem;
          font-weight: 800;
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
          transition: all 0.2s;
        }
        .btn-secondary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
          border-color: #3b82f6;
        }
      `}</style>
    </div>
  );
}
