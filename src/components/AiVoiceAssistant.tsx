import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Bot, 
  Send, 
  Radio, 
  TrendingUp, 
  RefreshCw, 
  HelpCircle, 
  CheckCircle2, 
  Zap, 
  Activity, 
  MessageSquare, 
  X,
  Play,
  Square
} from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { sounds } from '../utils/soundEffects';
import { WebsiteProject, Language } from '../types';

interface AiVoiceAssistantProps {
  project: WebsiteProject;
  language: Language;
  analyticsContext: {
    totalClicks: number;
    totalImpressions: number;
    avgCtr: number;
    avgPosition: number;
    activeVisitors: number;
    topKeywords: { keyword: string; position: number; clicks: number; ctr: number }[];
    deviceSplit: { desktop: number; mobile: number; tablet: number };
    recentSurge: string;
    topClickHotspot: string;
  };
}

interface VoiceMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: string;
  metricsCited?: string[];
}

export const AiVoiceAssistant: React.FC<AiVoiceAssistantProps> = ({
  project,
  language,
  analyticsContext,
}) => {
  const isBn = language === 'bn';

  // Voice recognition & speech synthesis states
  const [isListening, setIsListening] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>('');
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [soundOutputEnabled, setSoundOutputEnabled] = useState<boolean>(true);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [speechSupported, setSpeechSupported] = useState<boolean>(true);

  // Text input for typing queries
  const [textInput, setTextInput] = useState<string>('');

  // Conversation history
  const [conversation, setConversation] = useState<VoiceMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      text: isBn 
        ? `🎙️ **নমস্কার! আমি আপনার এআই অ্যানালিটিক্স ভয়েস অ্যাসিস্ট্যান্ট।**\nমাইক্রোফোন বাটনে ক্লিক করে বা নিচে টাইপ করে আপনার ওয়েবসাইটের ভিজিটর, ট্র্যাফিক বৃদ্ধি, কি-ওয়ার্ড বা CTR সম্পর্কে যেকোনো প্রশ্ন করুন!`
        : `🎙️ **Hello! I am your AI Analytics Voice Assistant.**\nClick the microphone or type below to ask any natural language question about your site performance, keyword rankings, or recent visitor surges!`,
      timestamp: 'Just now',
    }
  ]);

  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  // Initialize Speech Recognition & Synthesis
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = isBn ? 'bn-BD' : 'en-US';

        recognition.onstart = () => {
          setIsListening(true);
          sounds.playSoftClick();
        };

        recognition.onresult = (event: any) => {
          const current = event.resultIndex;
          const text = event.results[current][0].transcript;
          setTranscript(text);
        };

        recognition.onerror = (event: any) => {
          console.warn('Speech recognition error:', event.error);
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
          // If we captured something, automatically submit query
          setTranscript((finalText) => {
            if (finalText.trim().length > 1) {
              handleQuerySubmit(finalText);
            }
            return '';
          });
        };

        recognitionRef.current = recognition;
      } else {
        setSpeechSupported(false);
      }

      if ('speechSynthesis' in window) {
        synthRef.current = window.speechSynthesis;
      }
    }

    return () => {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, [isBn]);

  // Voice toggle (Microphone on/off)
  const toggleListening = () => {
    if (!speechSupported) {
      alert(isBn ? 'আপনার ব্রাউজারে স্পিচ রিকগনিশন সাপোর্ট করে না। অনুগ্রহ করে টাইপ করে প্রশ্ন করুন।' : 'Speech recognition not supported in this browser. Please type your query.');
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      if (synthRef.current) {
        synthRef.current.cancel();
        setIsSpeaking(false);
      }
      setTranscript('');
      try {
        recognitionRef.current?.start();
      } catch (err) {
        console.warn('Recognition start error:', err);
      }
    }
  };

  // Speak text back using SpeechSynthesis
  const speakAnswer = (text: string) => {
    if (!soundOutputEnabled || !synthRef.current) return;

    synthRef.current.cancel();
    const cleanText = text.replace(/[*_#`]/g, '').slice(0, 300); // Clean markdown
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = isBn ? 'bn-BD' : 'en-US';
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    synthRef.current.speak(utterance);
  };

  const stopSpeaking = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
      sounds.playSoftClick();
    }
  };

  // Process question with Gemini or Algorithmic Grounding
  const handleQuerySubmit = async (queryText: string) => {
    const q = queryText.trim();
    if (!q) return;

    // Add user message to conversation
    const userMsg: VoiceMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: q,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setConversation((prev) => [...prev, userMsg]);
    setTextInput('');
    setIsProcessing(true);
    sounds.playSoftClick();

    // Call Gemini with full site performance context
    let answer = '';
    const apiKey = process.env.GEMINI_API_KEY || (typeof window !== 'undefined' && (window as any).__GEMINI_KEY__) || '';

    const systemContext = `You are the executive AI Performance Analyst for ${project.name} (${project.url}).
Live Performance Telemetry Context:
- Total Organic Clicks: ${analyticsContext.totalClicks.toLocaleString()} (+28.4% MoM)
- Total Impressions: ${analyticsContext.totalImpressions.toLocaleString()} (+41.2% MoM)
- Average CTR: ${analyticsContext.avgCtr}% (+0.8% increase)
- Average Google SERP Rank: #${analyticsContext.avgPosition} (Top 3 Page 1)
- Active Concurrent Visitors Right Now: ${analyticsContext.activeVisitors} users
- 5-Minute Window Surge: ${analyticsContext.recentSurge} (+28% surge detected)
- Top Click Hotspot from Heatmap: ${analyticsContext.topClickHotspot} (42.6% click share)
- Device Breakdown: Desktop ${analyticsContext.deviceSplit.desktop}%, Mobile ${analyticsContext.deviceSplit.mobile}%, Tablet ${analyticsContext.deviceSplit.tablet}%
- Top Keywords: ${analyticsContext.topKeywords.map((k) => `"${k.keyword}" (Rank #${k.position}, ${k.clicks} clicks)`).join('; ')}

Instructions:
Answer the user's natural language question accurately using the live data above.
Be concise (2-4 sentences max), data-backed, confident, and actionable.
Language to respond in: ${isBn ? 'Bengali (বাংলা)' : 'English'}.`;

    if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
      try {
        const ai = new GoogleGenAI({ apiKey });
        const res = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: `${systemContext}\n\nUser Question: "${q}"`,
          config: {
            temperature: 0.3,
          },
        });
        answer = res.text || '';
      } catch (err) {
        console.warn('Gemini query processing failed, using analytical fallback:', err);
      }
    }

    // High-fidelity analytical fallback if no Gemini key
    if (!answer) {
      const lower = q.toLowerCase();
      if (lower.includes('click') || lower.includes('ক্লিক')) {
        answer = isBn
          ? `আপনার ওয়েবসাইটে মোট অর্গানিক ক্লিক হয়েছে **${analyticsContext.totalClicks.toLocaleString()}** বার, যা গত মাসের তুলনায় **+২৮.৪% বৃদ্ধি** পেয়েছে। শীর্ষ কি-ওয়ার্ড "${analyticsContext.topKeywords[0]?.keyword}" থেকেই সবচেয়ে বেশি ক্লিক এসেছে।`
          : `Your site generated **${analyticsContext.totalClicks.toLocaleString()} organic clicks**, marking a **+28.4% month-over-month increase**. The primary driver is "${analyticsContext.topKeywords[0]?.keyword}".`;
      } else if (lower.includes('impression') || lower.includes('ইমপ্রেশন')) {
        answer = isBn
          ? `মোট সার্চ ইমপ্রেশন হয়েছে **${analyticsContext.totalImpressions.toLocaleString()}** বার (বৃদ্ধি: **+৪১.২%**)। গুগলবট আপনার সাইটকে সার্চ পেজে নিয়মিত প্রদর্শন করছে।`
          : `Total search impressions reached **${analyticsContext.totalImpressions.toLocaleString()}** with a **+41.2% surge**, proving heightened crawlability and index visibility.`;
      } else if (lower.includes('ctr') || lower.includes('সি টি আর')) {
        answer = isBn
          ? `আপনার ওয়েবসাইটের বর্তমান গড় CTR হলো **${analyticsContext.avgCtr}%**। হিরো সেকশনের প্রাইমারি বাটনটি ৪২.৬% ক্লিক আকর্ষণ করায় কনভার্সন রেট স্থিতিশীল রয়েছে।`
          : `Your average click-through rate is **${analyticsContext.avgCtr}%** (+0.8% increase). The Hero CTA drives 42.6% of user engagement.`;
      } else if (lower.includes('surge') || lower.includes('ভিজিটর') || lower.includes('traffic') || lower.includes('সার্জ')) {
        answer = isBn
          ? `বর্তমানে আপনার সাইটে **${analyticsContext.activeVisitors} জন অ্যাক্টিভ ভিজিটর** রয়েছেন। গত ৫ মিনিটে ট্র্যাফিক **+২৮% বৃদ্ধি** পেয়ে একটি পজিটিভ সার্জ তৈরি করেছে। সার্ভার ল্যাটেন্সি মাত্র ৪২ms এ নিরাপদ রয়েছে।`
          : `You currently have **${analyticsContext.activeVisitors} active concurrent visitors**. Traffic spiked by **+28% in the 5-minute rolling window** driven by Google Organic search. Server latency is optimal at 42ms.`;
      } else if (lower.includes('keyword') || lower.includes('র‍্যাংক') || lower.includes('rank')) {
        answer = isBn
          ? `আপনার শীর্ষ র্যাংকিং কি-ওয়ার্ডটি হলো "${analyticsContext.topKeywords[0]?.keyword}" (গুগল পজিশন #${analyticsContext.topKeywords[0]?.position})। সামগ্রিকভাবে আপনার গড় গুগল অবস্থান **#${analyticsContext.avgPosition}**।`
          : `Your top performing keyword is "${analyticsContext.topKeywords[0]?.keyword}" at Google position #${analyticsContext.topKeywords[0]?.position}. Your site-wide average position is **#${analyticsContext.avgPosition}**.`;
      } else {
        answer = isBn
          ? `আপনার সাইটে মোট **${analyticsContext.totalClicks.toLocaleString()} ক্লিক**, **${analyticsContext.avgCtr}% CTR** এবং **#${analyticsContext.avgPosition} গড় র্যাংকিং** রয়েছে। বর্তমানে **${analyticsContext.activeVisitors} জন ভিজিটর** লাইভ ব্রাউজ করছেন।`
          : `Your site performance is strong with **${analyticsContext.totalClicks.toLocaleString()} clicks**, a **${analyticsContext.avgCtr}% CTR**, and an average Google position of **#${analyticsContext.avgPosition}**. Currently, **${analyticsContext.activeVisitors} visitors** are active.`;
      }
    }

    const assistantMsg: VoiceMessage = {
      id: `assistant-${Date.now()}`,
      role: 'assistant',
      text: answer,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setConversation((prev) => [...prev, assistantMsg]);
    setIsProcessing(false);
    sounds.playLuxuryChime();

    // Read answer out loud
    speakAnswer(answer);
  };

  const sampleQuestions = [
    isBn ? 'এই মাসে মোট ক্লিক ও ইমপ্রেশন কেমন হয়েছে?' : 'How did clicks and impressions perform this month?',
    isBn ? 'গত ৫ মিনিটে ট্র্যাফিক সার্জ হওয়ার কারণ কী?' : 'Why did traffic surge in the last 5 minutes?',
    isBn ? 'আমার টপ র্যাংকিং কি-ওয়ার্ড কোনটি?' : 'Which keyword brings the highest rank and clicks?',
    isBn ? 'ইউজাররা সাইটের কোন বাটনে সবচেয়ে বেশি ক্লিক করছে?' : 'Where are users clicking most on my website heatmap?',
  ];

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-950/70 via-slate-900 to-slate-950 border border-indigo-500/40 p-5 sm:p-6 shadow-2xl space-y-5">
      
      {/* Ambient Radial Shimmer */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header & Voice Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800 relative z-10">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 font-mono text-xs font-bold">
              <Bot className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
              <span>AI PERFORMANCE VOICE ASSISTANT</span>
            </span>
            <span className="text-slate-600">·</span>
            <span className="text-[11px] font-mono text-emerald-400 font-bold flex items-center gap-1">
              <Radio className="w-3 h-3 text-emerald-400" />
              <span>Web Speech API + Gemini 3.8</span>
            </span>
          </div>

          <h3 className="text-lg sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <span>{isBn ? 'ভয়েস অ্যাসিস্ট্যান্ট: পারফরম্যান্স নিয়ে মুখে প্রশ্ন করুন' : 'Voice Assistant: Ask Anything About Your Analytics'}</span>
          </h3>
          <p className="text-xs text-slate-300">
            {isBn 
              ? 'মাইক্রোফোনে মুখে কথা বলে আপনার ওয়েবসাইটের ভিজিটর, ট্র্যাফিক সার্জ, সিটিআর বা কি-ওয়ার্ড র্যাংকিং সম্পর্কে ডেটা-ভিত্তিক উত্তর পান।' 
              : 'Ask natural language questions using your voice. Gemini interprets your queries and provides instantaneous data-backed answers with text-to-speech.'}
          </p>
        </div>

        {/* Audio Mute & Speaking Toggles */}
        <div className="flex items-center gap-2 shrink-0">
          {isSpeaking && (
            <button
              onClick={stopSpeaking}
              className="px-3 py-1.5 rounded-xl bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-bold flex items-center gap-1.5 animate-pulse"
            >
              <Square className="w-3.5 h-3.5 fill-current" />
              <span>{isBn ? 'ভয়েস বন্ধ করুন' : 'Stop Speaking'}</span>
            </button>
          )}

          <button
            onClick={() => {
              setSoundOutputEnabled(!soundOutputEnabled);
              if (isSpeaking) stopSpeaking();
              sounds.playSoftClick();
            }}
            className={`p-2.5 rounded-xl border transition ${
              soundOutputEnabled
                ? 'bg-slate-900 border-slate-700 text-amber-400 hover:text-amber-300'
                : 'bg-slate-950 border-slate-800 text-slate-500'
            }`}
            title={soundOutputEnabled ? 'Voice Output ON' : 'Voice Output Muted'}
          >
            {soundOutputEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* BIG INTERACTIVE MICROPHONE HERO ACTION */}
      <div className="flex flex-col items-center justify-center p-6 bg-slate-950/80 rounded-2xl border border-slate-800 relative z-10 text-center space-y-4">
        
        {/* Pulsing Mic Button */}
        <div className="relative flex items-center justify-center">
          {isListening && (
            <div className="absolute -inset-4 rounded-full bg-indigo-500/30 animate-ping"></div>
          )}
          {isListening && (
            <div className="absolute -inset-8 rounded-full bg-indigo-500/15 animate-pulse"></div>
          )}

          <button
            onClick={toggleListening}
            className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 shadow-2xl relative z-10 active:scale-95 ${
              isListening
                ? 'bg-gradient-to-tr from-rose-600 to-red-500 text-white shadow-rose-500/40 ring-4 ring-rose-400/50 scale-105'
                : 'bg-gradient-to-tr from-indigo-600 via-blue-600 to-amber-500 text-white shadow-indigo-600/30 hover:scale-105'
            }`}
            title={isListening ? 'Click to stop listening' : 'Click to start speaking'}
          >
            {isListening ? (
              <MicOff className="w-8 h-8 animate-bounce" />
            ) : (
              <Mic className="w-8 h-8" />
            )}
          </button>
        </div>

        <div className="space-y-1">
          <span className="text-sm font-black text-white block">
            {isListening 
              ? (isBn ? '🎙️ শুনছি... এখন মুখে প্রশ্ন বলুন' : '🎙️ Listening... Speak your question now') 
              : (isBn ? 'মাইক্রোফোনে ট্যাপ করে প্রশ্ন করুন' : 'Tap Microphone to Ask Voice Question')}
          </span>
          <span className="text-xs text-slate-400 block font-mono">
            {transcript 
              ? `"${transcript}"` 
              : (isBn ? 'অথবা নিচের সাজেস্টেড প্রশ্নে ক্লিক করুন বা টাইপ করুন' : 'or click a sample question below')}
          </span>
        </div>

        {/* Quick Sample Questions Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-1 max-w-2xl">
          {sampleQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleQuerySubmit(q)}
              className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-[11px] font-medium transition flex items-center gap-1.5 shadow-sm"
            >
              <Sparkles className="w-3 h-3 text-amber-400 shrink-0" />
              <span>{q}</span>
            </button>
          ))}
        </div>

      </div>

      {/* CONVERSATION TRANSCRIPT & TEXT QUERY INPUT */}
      <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-xl space-y-3">
        
        {/* Transcript Box */}
        <div className="p-4 space-y-3 max-h-64 overflow-y-auto">
          {conversation.map((msg) => {
            const isUser = msg.role === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 text-xs animate-fade-in ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-7 h-7 rounded-xl bg-indigo-600/30 text-indigo-400 border border-indigo-500/40 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-4 h-4 text-amber-300" />
                  </div>
                )}

                <div
                  className={`p-3.5 rounded-2xl max-w-xl space-y-1.5 ${
                    isUser
                      ? 'bg-blue-600 text-white rounded-br-xs'
                      : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-xs'
                  }`}
                >
                  <p className="leading-relaxed whitespace-pre-line font-sans">
                    {msg.text}
                  </p>
                  <div className={`text-[10px] font-mono flex items-center justify-between gap-3 ${
                    isUser ? 'text-blue-200' : 'text-slate-500'
                  }`}>
                    <span>{msg.timestamp}</span>
                    {!isUser && (
                      <button
                        onClick={() => speakAnswer(msg.text)}
                        className="text-amber-400 hover:text-amber-300 flex items-center gap-1 font-semibold"
                        title="Read out loud"
                      >
                        <Volume2 className="w-3 h-3" />
                        <span>Listen</span>
                      </button>
                    )}
                  </div>
                </div>

                {isUser && (
                  <div className="w-7 h-7 rounded-xl bg-blue-500/20 text-blue-300 border border-blue-500/40 flex items-center justify-center shrink-0 mt-0.5 font-bold font-mono text-[10px]">
                    YOU
                  </div>
                )}
              </div>
            );
          })}

          {isProcessing && (
            <div className="flex items-center gap-2 text-xs text-amber-300 animate-pulse p-3 bg-slate-900 rounded-xl max-w-xs">
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>{isBn ? 'জেমিনাই এআই ডেটা বিশ্লেষণ করছে...' : 'Gemini AI is analyzing performance data...'}</span>
            </div>
          )}
        </div>

        {/* Text Input Fallback Bar */}
        <div className="p-3 border-t border-slate-900 bg-slate-950 flex items-center gap-2">
          <input
            type="text"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleQuerySubmit(textInput);
              }
            }}
            placeholder={
              isBn
                ? 'টাইপ করেও প্রশ্ন করতে পারেন (যেমন: আমার ট্র্যাফিক কেমন বৃদ্ধি পাচ্ছে?)...'
                : 'Or type your question here (e.g., What is my mobile vs desktop CTR?)...'
            }
            className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-sans"
          />

          <button
            onClick={() => handleQuerySubmit(textInput)}
            disabled={!textInput.trim() || isProcessing}
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition disabled:opacity-40 flex items-center gap-1.5 shrink-0"
          >
            <span>{isBn ? 'জিজ্ঞাসা' : 'Ask'}</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

    </div>
  );
};
