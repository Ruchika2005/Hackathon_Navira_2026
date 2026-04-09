import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
    ChevronLeft, Send, ShieldAlert, ShieldCheck, 
    Volume2, VolumeX, Info, AlertTriangle, 
    History, Flag, MoreVertical, X,
    PhoneCall, Zap, Award, Cpu, Speaker,
    Mic, MicOff, TrendingDown, TrendingUp, Ghost,
    RefreshCcw
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import Navbar from '../components/Navbar';
import { SCAM_SCENARIOS } from '../data/scamData';

export default function ScamSimulator() {
    const navigate = useNavigate();
    const { t, lang } = useLanguage();
    
    // Simulation State
    const [phase, setPhase] = useState('select-scenario'); 
    const [scenario, setScenario] = useState(null);
    const [difficulty, setDifficulty] = useState('beginner');
    const [score, setScore] = useState(100);
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [isGameOver, setIsGameOver] = useState(false);
    const [gameResult, setGameResult] = useState(null);
    const [messageCount, setMessageCount] = useState(0);
    const [voiceEnabled, setVoiceEnabled] = useState(false);
    
    const scrollRef = useRef(null);
    const recognitionRef = useRef(null);

    // Initialize Speech Recognition
    useEffect(() => {
        if (window.webkitSpeechRecognition || window.SpeechRecognition) {
            const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = false;
            recognitionRef.current.interimResults = false;
            recognitionRef.current.lang = lang === 'hindi' ? 'hi-IN' : lang === 'marathi' ? 'mr-IN' : 'en-US';

            recognitionRef.current.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                setUserInput(transcript);
                setIsRecording(false);
            };

            recognitionRef.current.onerror = () => setIsRecording(false);
        }
    }, [lang]);

    const toggleRecording = () => {
        if (isRecording) {
            recognitionRef.current?.stop();
            setIsRecording(false);
        } else {
            setUserInput('');
            recognitionRef.current?.start();
            setIsRecording(true);
        }
    };

    // Auto-scroll chat
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    // Handle initial AI message
    const startSimulation = (selectedScenario, selectedDifficulty) => {
        setScenario(selectedScenario);
        setDifficulty(selectedDifficulty);
        setPhase('chat');
        setScore(100);
        setMessageCount(0);
        setIsGameOver(false);
        setGameResult(null);
        
        const firstMsg = {
            id: Date.now(),
            role: 'model',
            text: selectedScenario.startMessage,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages([firstMsg]);
        setSuggestions(["Who is this?", "Why are you calling?", "I don't have time."]);
        
        if (voiceEnabled) {
            speak(selectedScenario.startMessage);
        }
    };

    // Web Speech API
    const speak = (text) => {
        if (!window.speechSynthesis || !text) return;
        try {
            window.speechSynthesis.cancel();
            const utterance = createUtterance(text);
            if (utterance && utterance instanceof SpeechSynthesisUtterance) {
                window.speechSynthesis.speak(utterance);
            }
        } catch (e) {
            console.error("Speech error:", e);
        }
    };

    const handleSend = async (textOverride = null) => {
        const text = textOverride || userInput;
        if (!text.trim() || isLoading || isGameOver) return;

        const newUserMsg = {
            id: Date.now(),
            role: 'user',
            text: text,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages(prev => [...prev, newUserMsg]);
        setUserInput('');
        setIsLoading(true);
        setIsTyping(true);

        try {
            const apiHistory = messages.map(m => ({
                role: m.role,
                parts: [{ text: m.text }]
            }));

            const res = await axios.post('/api/scam-chat/chat', {
                message: text,
                history: apiHistory,
                scenario: scenario.title,
                difficulty: difficulty
            });

            const DEFAULT_FALLBACKS = [
                "I don't think this is real.",
                "I'm going to hang up and call the official number.",
                "This sounds like a scam."
            ];

            let data = res.data;
            if (typeof data !== 'object' || data === null) {
                throw new Error("Invalid response from officer. Please try again.");
            }
            
            // Update scoring and game state
            if (data.safetyScoreEffect) {
                setScore(prev => Math.max(0, Math.min(100, prev + data.safetyScoreEffect)));
            }

            const aiMsg = {
                id: Date.now() + 1,
                role: 'model',
                text: data.response || "...",
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };

            setIsTyping(false);
            setMessages(prev => [...prev, aiMsg]);
            
            // Ensure suggestions never disappear by using fallbacks if needed
            const newSuggestions = (data.suggestions && data.suggestions.length > 0) 
                ? data.suggestions.map(s => String(s)) 
                : DEFAULT_FALLBACKS;
            setSuggestions(newSuggestions);
            
            const newCount = messageCount + 1;
            setMessageCount(newCount);

            if (data.isGameOver || newCount >= 7) {
                setIsGameOver(true);
                setGameResult({
                    result: String(data.result || (newCount >= 7 ? 'win' : 'lose')),
                    report: String(data.report || (newCount >= 7 ? "The scammer realized they couldn't trick you and gave up!" : "Simulation ended."))
                });
            }

            if (voiceEnabled) speak(aiMsg.text);

        } catch (err) {
            console.error(err);
            const rawMsg = err.response?.data?.message || err.message;
            const serverMsg = typeof rawMsg === 'string' ? rawMsg : "My connection is a bit weak. Can you say that again?";
            const errorMsg = {
                id: Date.now() + 1,
                role: 'model',
                text: serverMsg,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages(prev => [...prev, errorMsg]);
            setIsTyping(false);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSuggestionClick = (sug) => {
        handleSend(sug);
    };

    const handleHeroAction = (type) => {
        setIsGameOver(true);
        setGameResult({
            result: 'win',
            report: type === 'ignore' 
                ? "Brilliant! You recognized the signs of a scam and chose to ignore the suspicious message. This is the safest way to handle unknown threats." 
                : "Excellent work! By reporting the scam, you've not only protected yourself but also helped the community identify a new threat. You are a true digital guardian."
        });
        setScore(100);
        if (voiceEnabled) speak("Mission accomplished! You handled the threat perfectly.");
    };

    /* --- UI Components --- */

    if (phase === 'select-scenario') {
        return (
            <div className="min-h-screen bg-emerald-50">
                <Navbar />
                <main className="max-w-4xl mx-auto px-4 py-10">
                    <div className="mb-10 text-center slide-up">
                        <h1 className="text-4xl font-black text-emerald-900 mb-3">{t('scam_hero_title')}</h1>
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed">
                            {t('scam_hero_desc')}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {SCAM_SCENARIOS.map((s) => {
                            const Icon = s.icon;
                            return (
                                <button
                                    key={s.id}
                                    onClick={() => { setScenario(s); setPhase('select-difficulty'); }}
                                    className="card p-6 text-left group hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-emerald-200 pop-in"
                                >
                                    <div className={`w-16 h-16 bg-${s.color}-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                        {Icon && <Icon className={`w-9 h-9 text-${s.color}-600`} />}
                                    </div>
                                    <h3 className="text-2xl font-black text-slate-900 mb-2">{s.title}</h3>
                                    <p className="text-lg text-slate-600 font-medium leading-snug mb-6">{s.description}</p>
                                    <div className="flex items-center gap-2 text-emerald-700 font-black">
                                        {t('start_sim')} <ChevronLeft className="w-5 h-5 rotate-180" />
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </main>
            </div>
        );
    }

    if (phase === 'select-difficulty') {
        return (
            <div className="min-h-screen bg-emerald-50">
                <Navbar />
                <main className="max-w-2xl mx-auto px-4 py-16">
                    <button onClick={() => setPhase('select-scenario')} className="flex items-center gap-2 text-slate-600 font-bold mb-8 hover:text-emerald-700">
                        <ChevronLeft /> {t('back')}
                    </button>
                    
                    <div className="card p-8 slide-up">
                        <h2 className="text-3xl font-black text-emerald-900 mb-2">{t('difficulty')}</h2>
                        <p className="text-lg text-slate-600 mb-10">How realistic should the scam attempt be?</p>
                        
                        <div className="space-y-4">
                            {['beginner', 'intermediate', 'advanced'].map((d) => (
                                <button
                                    key={d}
                                    onClick={() => startSimulation(scenario, d)}
                                    className={`w-full p-6 rounded-2xl border-2 text-left transition-all flex items-center justify-between
                                        ${difficulty === d ? 'border-emerald-600 bg-emerald-50' : 'border-slate-100 bg-white hover:border-emerald-300'}`}
                                >
                                    <div>
                                        <p className="text-2xl font-black capitalize">{t(d)}</p>
                                        <p className="text-slate-500 font-medium">
                                            {d === 'beginner' ? 'Obvious red flags & basic tactics' : 
                                             d === 'intermediate' ? 'Realistic pressure & professional tone' : 
                                             'Highly manipulative & sophisticated'}
                                        </p>
                                    </div>
                                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${difficulty === d ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-slate-300'}`}>
                                        {difficulty === d && '✓'}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="h-screen bg-emerald-50 flex flex-col overflow-hidden">
            <Navbar />
            
            <main className="flex-1 flex flex-col max-w-3xl w-full mx-auto bg-white shadow-2xl relative overflow-hidden">
                
                {/* Chat Header */}
                <div className="bg-emerald-800 text-white p-6 shadow-md">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <button onClick={() => setPhase('select-scenario')} className="p-2 hover:bg-emerald-700 rounded-xl transition-colors">
                                <ChevronLeft className="w-7 h-7" />
                            </button>
                            <div className="relative">
                                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
                                    {scenario?.icon && <scenario.icon className="w-8 h-8 text-white" />}
                                </div>
                                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-emerald-800 rounded-full"></div>
                            </div>
                            <div>
                                <h2 className="font-black text-2xl leading-tight">{scenario.title}</h2>
                                <p className="text-emerald-200 text-sm font-bold flex items-center gap-1">
                                    <ShieldAlert className="w-4 h-4" /> Potential Scam Attempt
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                             <button 
                                onClick={() => { setVoiceEnabled(!voiceEnabled); if(!voiceEnabled) speak("Voice guidance enabled"); }}
                                className={`p-3 rounded-2xl transition-all ${voiceEnabled ? 'bg-amber-500 text-white shadow-lg' : 'bg-emerald-700 text-emerald-300'}`}
                                title={t('voice_guidance')}
                            >
                                {voiceEnabled ? <Volume2 className="w-7 h-7" /> : <VolumeX className="w-7 h-7" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Safety Meter */}
                <div className="bg-slate-50 border-b-2 border-slate-100 p-4 px-8">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-black text-slate-500 uppercase tracking-[0.2em]">Safety Status</span>
                        <div className="flex items-center gap-2">
                            {score > 70 ? <ShieldCheck className="w-4 h-4 text-emerald-600" /> : <AlertTriangle className="w-4 h-4 text-amber-600" />}
                            <span className={`text-sm font-black ${score > 70 ? 'text-emerald-600' : score > 40 ? 'text-amber-600' : 'text-rose-600'}`}>
                                {score}% {score > 70 ? 'Secure' : score > 40 ? 'Cautious' : 'Critical Risk'}
                            </span>
                        </div>
                    </div>
                    <div className="h-4 bg-slate-200 rounded-full overflow-hidden shadow-inner border border-slate-200">
                        <div 
                            className={`h-full transition-all duration-1000 ease-out ${
                                score > 70 ? 'bg-gradient-to-r from-emerald-500 to-green-400' : 
                                score > 40 ? 'bg-gradient-to-r from-amber-500 to-orange-400' : 
                                'bg-gradient-to-r from-rose-500 to-red-600'
                            }`}
                            style={{ width: `${score}%` }} 
                        />
                    </div>
                </div>

                <div 
                    ref={scrollRef}
                    className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#f8fafc] pattern-dots"
                >
                    <div className="flex flex-col gap-6">
                        {messages.map((m) => (
                            <div 
                                key={m.id} 
                                className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} slide-up`}
                            >
                                <div className={`max-w-[85%] relative group ${m.role === 'user' ? 'ml-12' : 'mr-12'}`}>
                                    <div className={`p-4 rounded-3xl shadow-sm relative
                                        ${m.role === 'user' 
                                            ? 'bg-emerald-600 text-white rounded-tr-none shadow-md' 
                                            : 'bg-white text-slate-800 rounded-tl-none border-2 border-slate-100'}`}
                                    >
                                        <p className="text-lg font-medium leading-relaxed whitespace-pre-wrap">
                                            {typeof m.text === 'string' ? m.text : JSON.stringify(m.text)}
                                        </p>
                                        <div className="flex items-center justify-end gap-2 mt-2">
                                            <span className={`text-[10px] font-black uppercase tracking-widest ${m.role === 'user' ? 'text-emerald-200' : 'text-slate-400'}`}>
                                                {m.role === 'user' ? 'You' : 'Officer'} • {m.timestamp}
                                            </span>
                                            {m.role === 'model' && (
                                                <button 
                                                    onClick={() => speak(String(m.text))}
                                                    className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-emerald-700 transition-colors"
                                                >
                                                    {Volume2 ? <Volume2 className="w-4 h-4" /> : <span>🔈</span>}
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        
                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="bg-white border-2 border-slate-100 p-4 rounded-3xl rounded-tl-none shadow-sm shadow-emerald-100/50">
                                    <div className="flex gap-1.5">
                                        <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                        <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                        <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-bounce"></div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {isGameOver && gameResult && (
                            <div className="mt-8 bg-slate-900 text-white rounded-[2.5rem] p-8 shadow-2xl slide-up border-4 border-slate-800 animate-in fade-in zoom-in duration-500">
                                <div className="flex flex-col items-center text-center">
                                    <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-6 shadow-2xl ring-4 ring-offset-4 ring-offset-slate-900 ${
                                        gameResult.result === 'win' ? 'bg-emerald-500 ring-emerald-500/50' : 'bg-rose-500 ring-rose-500/50'
                                    }`}>
                                        {gameResult.result === 'win' ? <Award className="w-12 h-12" /> : <Ghost className="w-12 h-12" />}
                                    </div>
                                    <h3 className="text-4xl font-black mb-2 tracking-tight">
                                        {gameResult.result === 'win' ? 'Security Expert!' : 'Game Over!'}
                                    </h3>
                                    <p className="text-slate-400 text-xl mb-8 font-medium italic leading-relaxed px-4">
                                        "{gameResult.report}"
                                    </p>
                                    
                                    <div className="w-full bg-slate-800/50 rounded-3xl p-6 mb-8 text-left border border-slate-700 backdrop-blur-sm">
                                        <h4 className="text-emerald-400 font-black mb-6 uppercase tracking-[0.3em] text-xs flex items-center gap-3">
                                            <History className="w-4 h-4" /> Simulation Summary
                                        </h4>
                                        <div className="space-y-6">
                                            <div className="flex justify-between items-center group">
                                                <span className="text-slate-400 font-bold group-hover:text-slate-300 transition-colors">Conversation Length</span>
                                                <span className="font-black text-white bg-slate-700 px-3 py-1 rounded-lg text-sm">{messageCount}/7 Turns</span>
                                            </div>
                                            <div className="flex justify-between items-center group">
                                                <span className="text-slate-400 font-bold group-hover:text-slate-300 transition-colors">Safety Awareness</span>
                                                <div className="flex items-center gap-3">
                                                    <div className="w-20 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                                                        <div className={`h-full transition-all duration-1000 ${score > 70 ? 'bg-emerald-500' : 'bg-rose-500'}`} style={{ width: `${score}%` }} />
                                                    </div>
                                                    <span className={`font-black ${score > 70 ? 'text-emerald-400' : 'text-rose-400'}`}>{score}%</span>
                                                </div>
                                            </div>
                                            <div className="flex justify-between items-start group">
                                                <span className="text-slate-400 font-bold group-hover:text-slate-300 transition-colors">Key Threats Spotted</span>
                                                <div className="flex flex-col items-end gap-1">
                                                    {scenario?.redFlags?.slice(0, 2).map((flag, idx) => (
                                                        <span key={idx} className="text-rose-400 font-black text-xs bg-rose-400/10 px-2 py-1 rounded-md">{flag}</span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <button 
                                        onClick={() => setPhase('select-scenario')}
                                        className="w-full bg-emerald-500 hover:bg-emerald-400 text-white font-black py-5 rounded-2xl shadow-xl shadow-emerald-900/40 transition-all active:scale-[0.98] text-xl flex items-center justify-center gap-3"
                                    >
                                        <RefreshCcw className="w-6 h-6" /> Try Another Mission
                                    </button>
                                </div>
                            </div>
                        )}
                        <div ref={scrollRef} />
                    </div>
                </div>

                {/* Feedback Panel */}
                {/* Interaction Footer */}
                {!isGameOver && (
                    <div className="bg-white border-t-4 border-slate-100 p-6 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
                        
                        {/* Dynamic AI Suggestions */}
                        <div className="flex flex-wrap gap-2 mb-6 slide-up">
                            {/* Hero Actions (Persistent) */}
                            <button
                                onClick={() => handleHeroAction('ignore')}
                                className="bg-slate-900 text-white text-xs font-black px-4 py-3 rounded-2xl flex items-center gap-2 hover:bg-slate-700 transition-all shadow-md group"
                            >
                                <X className="w-4 h-4 text-rose-400 group-hover:rotate-90 transition-transform" /> Ignore & End
                            </button>
                            <button
                                onClick={() => handleHeroAction('report')}
                                className="bg-rose-600 text-white text-xs font-black px-4 py-3 rounded-2xl flex items-center gap-2 hover:bg-rose-700 transition-all shadow-md"
                            >
                                <Flag className="w-4 h-4" /> Report Scam
                            </button>

                            <div className="w-[1px] bg-slate-200 h-10 mx-1"></div>

                            {suggestions.map((sug, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleSuggestionClick(String(sug))}
                                    className="bg-emerald-50 text-emerald-700 text-xs font-black px-5 py-3 rounded-2xl border-2 border-emerald-100 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all active:scale-[0.95] shadow-sm max-w-[200px] truncate"
                                >
                                    {sug}
                                </button>
                            ))}
                        </div>

                        <div className="flex items-center gap-4">
                            <button
                                type="button"
                                onClick={toggleRecording}
                                className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all shadow-lg ${
                                    isRecording 
                                        ? 'bg-rose-500 text-white animate-pulse' 
                                        : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                                }`}
                                title={isRecording ? "Stop Recording" : "Speak your message"}
                            >
                                {isRecording ? <MicOff className="w-7 h-7" /> : <Mic className="w-7 h-7" />}
                            </button>
                            
                            <div className="flex-1 relative">
                                <input 
                                    type="text"
                                    value={userInput}
                                    onChange={(e) => setUserInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="Type your response..."
                                    className="w-full bg-slate-100 border-2 border-transparent focus:border-emerald-500 rounded-2xl px-6 py-5 text-lg font-bold transition-all focus:outline-none shadow-inner"
                                    disabled={isLoading}
                                />
                                {isLoading && (
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                        <RefreshCcw className="w-5 h-5 text-emerald-600 animate-spin" />
                                    </div>
                                )}
                            </div>

                            <button 
                                onClick={() => handleSend()}
                                disabled={!userInput.trim() || isLoading}
                                className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all shadow-xl
                                    ${userInput.trim() && !isLoading ? 'bg-emerald-600 text-white hover:bg-emerald-700' : 'bg-slate-200 text-slate-400'}`}
                            >
                                <Send className="w-7 h-7" />
                            </button>
                        </div>
                        
                        <div className="flex items-center justify-center gap-4 mt-6">
                            <div className="h-[2px] bg-slate-100 flex-1"></div>
                            <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em] flex items-center gap-2">
                                {History && <History className="w-3 h-3" />} Turn {messageCount}/7
                            </p>
                            <div className="h-[2px] bg-slate-100 flex-1"></div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

// Helper for older browsers or specific speech behaviors
function createUtterance(text) {
    if (typeof window !== 'undefined' && (window.SpeechSynthesisUtterance || window.webkitSpeechSynthesisUtterance)) {
        const UtteranceClass = window.SpeechSynthesisUtterance || window.webkitSpeechSynthesisUtterance;
        const u = new UtteranceClass(text);
        u.rate = 0.9; // Slightly slower for elderly
        u.pitch = 1;
        return u;
    }
    return null;
}
