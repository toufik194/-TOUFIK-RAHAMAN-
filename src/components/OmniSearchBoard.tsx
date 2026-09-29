import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  X, 
  Sparkles, 
  ArrowRight, 
  Globe, 
  Zap, 
  ShieldCheck, 
  FileCode, 
  TrendingUp, 
  DollarSign, 
  Flame, 
  Gamepad2, 
  Command,
  CheckCircle2,
  Bug,
  Radio,
  Bot
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';
import { Language, WebsiteProject, TabType } from '../types';

interface OmniSearchBoardProps {
  language: Language;
  project: WebsiteProject;
  onNavigateTab: (tabId: TabType) => void;
  onRequestIndexing: () => void;
  onOpenLivePublishModal: () => void;
}

interface SearchItem {
  id: string;
  title: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  action: () => void;
  shortcut?: string;
}

export const OmniSearchBoard: React.FC<OmniSearchBoardProps> = ({
  language,
  project,
  onNavigateTab,
  onRequestIndexing,
  onOpenLivePublishModal,
}) => {
  const isBn = language === 'bn';
  const [query, setQuery] = useState<string>('');
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Keyboard shortcut listener (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
        sounds.playSoftClick();
      }
      if (e.key === 'Escape') {
        inputRef.current?.blur();
        setIsFocused(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const searchItems: SearchItem[] = [
    {
      id: 'voice-assistant',
      title: isBn ? '🎙️ এআই ভয়েস অ্যাসিস্ট্যান্ট (পারফরম্যান্স ভয়েস কোয়েরি)' : '🎙️ AI Voice Assistant (Voice Analytics Queries)',
      category: 'Voice AI',
      icon: Bot,
      action: () => {
        onNavigateTab('analytics');
        sounds.playSoftClick();
      },
      shortcut: 'Web Speech',
    },
    {
      id: 'ai-seo-feed',
      title: isBn ? '📡 এআই এসইও ইন্টেলিজেন্স ফিড ও লাইভ র‍্যাংকিং ট্রেন্ডস' : '📡 AI SEO Intelligence Feed & Live Algorithm Trends',
      category: 'Realtime AI Feed',
      icon: Radio,
      action: () => {
        onNavigateTab('ai-seo');
        sounds.playSoftClick();
      },
      shortcut: 'Gemini 3.8',
    },
    {
      id: 'fix-google-errors',
      title: isBn ? 'গুগল সার্চ 404 ও ইনডেক্সিং এরর ফিক্সার' : 'Google Search 404 & Indexing Error Fixer',
      category: 'Diagnostic & Fix',
      icon: Bug,
      action: () => {
        onNavigateTab('audit');
        sounds.playSoftClick();
      },
      shortcut: 'Instant Fix',
    },
    {
      id: 'request-indexing',
      title: isBn ? 'গুগলে তাৎক্ষণিক রিকোয়েস্ট ইনডেক্সিং (URL Inspection)' : 'Instant Request Indexing on Google Search Console',
      category: 'Indexing Engine',
      icon: Zap,
      action: () => {
        onRequestIndexing();
        sounds.playSoftClick();
      },
      shortcut: 'Action',
    },
    {
      id: 'journey-timeline',
      title: isBn ? 'ইউজার জার্নি টাইমলাইন (২৪ ঘণ্টার সেশন চূড়া ও মিথস্ক্রিয়া)' : 'User Journey Timeline (24h Interaction & Duration Peaks)',
      category: 'Analytics',
      icon: TrendingUp,
      action: () => {
        onNavigateTab('analytics');
        sounds.playSoftClick();
      },
      shortcut: 'Recharts',
    },
    {
      id: 'click-heatmap',
      title: isBn ? 'ওয়েবসাইটের সর্বোচ্চ ক্লিক জোন ও ভিজ্যুয়াল হিটম্যাপ' : 'Visual Click Heatmap & User Engagement Hotspots',
      category: 'Analytics',
      icon: Flame,
      action: () => {
        onNavigateTab('analytics');
        sounds.playSoftClick();
      },
    },
    {
      id: 'ai-game',
      title: isBn ? 'এআই এসইও টাইকুন ও অ্যালগরিদম সিমুলেটর গেম' : 'AI SEO Tycoon & Algorithm Battle Game',
      category: 'Interactive Game',
      icon: Gamepad2,
      action: () => {
        onNavigateTab('nexus-ai');
        sounds.playSoftClick();
      },
    },
    {
      id: 'gemini-copywriter',
      title: isBn ? 'জেমিনাই এআই এসইও কপিরাইটার (Title, Meta, Page Content)' : 'Gemini AI SEO Copywriter (Title, Meta & H1 Content)',
      category: 'AI Engine',
      icon: Sparkles,
      action: () => {
        onNavigateTab('ai-seo');
        sounds.playSoftClick();
      },
    },
    {
      id: 'premium-themes',
      title: isBn ? 'প্রিমিয়াম থিম ইঞ্জিন ও এআই কালার প্যালেট স্টুডিও' : 'Premium Theme Engine & AI Palette Studio',
      category: 'Design System',
      icon: Globe,
      action: () => {
        onNavigateTab('enterprise');
        sounds.playSoftClick();
      },
    },
    {
      id: 'monetization',
      title: isBn ? 'গুগল অ্যাডসেন্স ও ওয়েবসাইট রেভিনিউ ক্যালকুলেটর' : 'Google AdSense & Monthly Revenue Calculator',
      category: 'Monetization',
      icon: DollarSign,
      action: () => {
        onNavigateTab('monetization');
        sounds.playSoftClick();
      },
    },
    {
      id: 'sitemap-xml',
      title: isBn ? 'এক্সএমএল সাইটম্যাপ ও robots.txt জেনারেটর' : 'XML Sitemap & robots.txt Generator',
      category: 'Technical SEO',
      icon: FileCode,
      action: () => {
        onNavigateTab('sitemap');
        sounds.playSoftClick();
      },
    },
  ];

  const filteredItems = query.trim() === ''
    ? searchItems.slice(0, 6)
    : searchItems.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase())
      );

  return (
    <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
      
      {/* LARGE SEARCH BOARD CONTAINER */}
      <div className={`relative transition-all duration-300 rounded-3xl ${
        isFocused 
          ? 'ring-2 ring-indigo-500/80 shadow-2xl shadow-indigo-500/25 bg-slate-900 border-indigo-500/50' 
          : 'bg-slate-900/95 border-slate-800 shadow-2xl hover:border-slate-700'
      } border`}>
        
        {/* Ambient Top Glow */}
        <div className="absolute -top-10 left-1/3 w-72 h-20 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center px-5 sm:px-7 py-3.5 sm:py-4.5 gap-3.5 sm:gap-4 relative z-10">
          
          <div className="p-2.5 sm:p-3 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25 shrink-0">
            <Search className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>

          <div className="flex-1 min-w-0 flex flex-col justify-center">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => {
                setIsFocused(true);
                sounds.playSoftClick();
              }}
              placeholder={
                isBn
                  ? 'গুগল সার্চ স্ট্যাটাস, কী-ওয়ার্ড, লাইভ এআই ট্রেন্ডস ফিড বা এরর ফিক্সার সার্চ করুন...'
                  : 'Search Google indexing status, keywords, live AI trends feed, or error fixes...'
              }
              className="w-full bg-transparent text-base sm:text-lg text-white placeholder-slate-400 focus:outline-none font-semibold tracking-tight"
            />
            <span className="text-[10px] text-slate-500 hidden sm:block font-mono">
              Nexus AI Global Command & Telemetry Engine · Press ⌘K or start typing
            </span>
          </div>

          {query && (
            <button
              onClick={() => {
                setQuery('');
                inputRef.current?.focus();
              }}
              className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          {/* AI Search / Execute Button */}
          <button
            onClick={() => {
              if (query.trim()) {
                onNavigateTab('ai-seo');
                sounds.playLuxuryChime();
              } else {
                inputRef.current?.focus();
              }
            }}
            className="px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-600/30 flex items-center gap-1.5 shrink-0 transition active:scale-95"
          >
            <Bot className="w-3.5 h-3.5 text-amber-300" />
            <span className="hidden sm:inline">{isBn ? 'এআই এক্সিকিউট' : 'AI Search'}</span>
          </button>

          {/* Keyboard shortcut indicator */}
          <div className="hidden md:flex items-center gap-1 font-mono text-[11px] text-slate-400 bg-slate-950 px-2.5 py-1.5 rounded-xl border border-slate-800 shrink-0">
            <Command className="w-3 h-3 text-slate-500" />
            <span>K</span>
          </div>

        </div>

        {/* QUICK FILTER CHIPS BELOW SEARCH INPUT */}
        <div className="px-5 sm:px-7 pb-3.5 pt-1.5 border-t border-slate-800/60 flex items-center gap-2 overflow-x-auto scrollbar-none text-xs">
          <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider shrink-0 hidden md:inline">
            Quick Actions:
          </span>

          <button
            onClick={() => {
              onNavigateTab('analytics');
              sounds.playSoftClick();
            }}
            className="px-3 py-1.5 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/30 font-bold flex items-center gap-1.5 shrink-0 transition"
          >
            <Bot className="w-3.5 h-3.5 text-amber-400" />
            <span>{isBn ? '🎙️ ভয়েস অ্যাসিস্ট্যান্ট' : 'Voice Assistant'}</span>
          </button>

          <button
            onClick={() => {
              onNavigateTab('ai-seo');
              sounds.playSoftClick();
            }}
            className="px-3 py-1.5 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-bold flex items-center gap-1.5 shrink-0 transition"
          >
            <Radio className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>{isBn ? '📡 এআই ট্রেন্ডস ফিড' : 'AI Trends Feed'}</span>
          </button>

          <button
            onClick={() => {
              onNavigateTab('audit');
              sounds.playSoftClick();
            }}
            className="px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold flex items-center gap-1.5 shrink-0 transition"
          >
            <Bug className="w-3.5 h-3.5 text-amber-400" />
            <span>{isBn ? 'গুগল 404 ফিক্সার' : 'Google 404 Fixer'}</span>
          </button>

          <button
            onClick={() => {
              onRequestIndexing();
              sounds.playSoftClick();
            }}
            className="px-3 py-1.5 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 border border-blue-500/30 font-bold flex items-center gap-1.5 shrink-0 transition"
          >
            <Zap className="w-3.5 h-3.5 text-blue-400" />
            <span>{isBn ? 'Request Indexing' : 'Request Indexing'}</span>
          </button>

          <button
            onClick={() => {
              onNavigateTab('analytics');
              sounds.playSoftClick();
            }}
            className="px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 font-bold flex items-center gap-1.5 shrink-0 transition"
          >
            <Flame className="w-3.5 h-3.5 text-rose-400" />
            <span>{isBn ? 'ভিজ্যুয়াল হিটম্যাপ' : 'Click Heatmap'}</span>
          </button>

          <button
            onClick={() => {
              onNavigateTab('nexus-ai');
              sounds.playSoftClick();
            }}
            className="px-3 py-1 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/30 font-bold flex items-center gap-1.5 shrink-0 transition"
          >
            <Gamepad2 className="w-3.5 h-3.5 text-purple-400" />
            <span>{isBn ? 'এআই গেম' : 'AI Tycoon Game'}</span>
          </button>

          <button
            onClick={() => {
              onNavigateTab('ai-seo');
              sounds.playSoftClick();
            }}
            className="px-3 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold flex items-center gap-1.5 shrink-0 transition"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>{isBn ? 'জেমিনাই কপিরাইটার' : 'Gemini Copywriter'}</span>
          </button>
        </div>

        {/* INSTANT RESULTS DROPDOWN (Shown when typing or focused) */}
        {isFocused && (
          <div className="border-t border-slate-800 p-3 bg-slate-950/95 rounded-b-2xl space-y-1 animate-fade-in shadow-2xl">
            <div className="flex items-center justify-between text-[11px] text-slate-400 px-3 py-1">
              <span>{isBn ? 'দ্রুত নেভিগেশন ও কমান্ডসমূহ:' : 'Suggested Actions & Tools:'}</span>
              <span>Press ESC to close</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {filteredItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      item.action();
                      setIsFocused(false);
                      setQuery('');
                    }}
                    className="p-2.5 rounded-xl hover:bg-slate-900 border border-transparent hover:border-slate-800 text-left transition flex items-center justify-between gap-3 group"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="p-2 rounded-lg bg-slate-900 group-hover:bg-blue-600/20 border border-slate-800 group-hover:border-blue-500/40 text-blue-400 shrink-0 transition">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="truncate">
                        <span className="text-xs font-bold text-white block group-hover:text-blue-300 truncate">
                          {item.title}
                        </span>
                        <span className="text-[10px] text-slate-400 block font-mono">
                          {item.category}
                        </span>
                      </div>
                    </div>

                    <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-white transition shrink-0" />
                  </button>
                );
              })}
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
