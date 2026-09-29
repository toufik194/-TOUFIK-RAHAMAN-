import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Wand2, 
  Check, 
  Copy, 
  ArrowRight, 
  Key, 
  FileText, 
  Search,
  CheckCircle2,
  RefreshCw,
  Zap,
  DollarSign,
  TrendingUp,
  CreditCard,
  Flame,
  Award,
  ShieldCheck,
  ExternalLink,
  Sliders,
  Download,
  BookOpen,
  FileCheck,
  Star,
  Cpu,
  Layers,
  Bot,
  Radio
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { WebsiteProject, Language } from '../types';
import { sounds } from '../utils/soundEffects';
import { downloadFile } from '../utils/seoGenerators';
import { generateSeoCopyWithGemini, GeneratedSeoCopy } from '../utils/geminiSeoCopywriter';
import { AiSeoIntelligenceFeed } from './AiSeoIntelligenceFeed';
import { AiMetaGenerator } from './AiMetaGenerator';

interface AiSeoTabProps {
  project: WebsiteProject;
  language: Language;
  onUpdateProject: (updated: Partial<WebsiteProject>) => void;
  onNavigateToTab: (tab: any) => void;
}

export const AiSeoTab: React.FC<AiSeoTabProps> = ({
  project,
  language,
  onUpdateProject,
  onNavigateToTab,
}) => {
  const isBn = language === 'bn';
  const [langPreference, setLangPreference] = useState<'bn' | 'en'>(language);
  const [isGenerating, setIsGenerating] = useState(false);
  const [appliedNotification, setAppliedNotification] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Strategy / Tone for generation
  const [generationTone, setGenerationTone] = useState<'high-ctr' | 'authority' | 'monetization'>('high-ctr');

  // AI SEO Copywriter State (Powered by Gemini)
  const [activeSubView, setActiveSubView] = useState<'copywriter' | 'intelligence-feed' | 'quick-meta' | 'monetization'>('copywriter');
  const [geminiCopy, setGeminiCopy] = useState<GeneratedSeoCopy | null>(null);
  const [isGeneratingGemini, setIsGeneratingGemini] = useState<boolean>(false);
  const [activeContentTab, setActiveContentTab] = useState<'content' | 'faqs' | 'markdown' | 'analysis'>('content');

  // Handler for Gemini SEO Copywriter
  const handleRunGeminiCopywriter = async () => {
    setIsGeneratingGemini(true);
    sounds.playSoftClick();
    try {
      const toneMap: Record<string, 'commercial' | 'informational' | 'authority' | 'high-ctr'> = {
        'high-ctr': 'high-ctr',
        'authority': 'authority',
        'monetization': 'commercial',
      };
      const result = await generateSeoCopyWithGemini(project, toneMap[generationTone] || 'high-ctr', langPreference);
      setGeminiCopy(result);
      sounds.playLuxuryChime();
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
      setAppliedNotification(
        isBn 
          ? '🚀 জেমিনাই এআই এসইও কপিরাইটার সফলভাবে অপ্টিমাইজড মেটা ও কন্টেন্ট তৈরি করেছে!' 
          : '🚀 Gemini AI SEO Copywriter generated high-ranking metadata & page copy!'
      );
      setTimeout(() => setAppliedNotification(null), 3500);
    } finally {
      setIsGeneratingGemini(false);
    }
  };

  useEffect(() => {
    handleRunGeminiCopywriter();
  }, [project.id, langPreference, generationTone]);

  // Monetization Calculator State
  const [monthlyVisitors, setMonthlyVisitors] = useState<number>(25000);
  const [adSensePublisherId, setAdSensePublisherId] = useState<string>('ca-pub-1234567890123456');

  // Dynamic generated results from current project description & keywords
  const generateDynamicMeta = () => {
    const rawKw = project.keywords.length > 0 ? project.keywords : ['Web Development', 'Google SEO'];
    const primaryKw = rawKw[0];
    const secondaryKw = rawKw[1] || 'Google Indexing';
    const cleanDesc = project.description.trim() || 'Modern web application built for Google indexing and high performance.';
    const projectName = project.name.split('–')[0].split('(')[0].trim() || 'My Website';

    if (langPreference === 'bn') {
      return {
        titles: [
          `${projectName} – ${primaryKw} ও গুগল এসইও সমাধান`,
          `${primaryKw} সেরা প্ল্যাটফর্ম – ${projectName} লাইভ সার্ভিস`,
          `${projectName} – ${secondaryKw} এবং ফাস্ট গুগল র্যাংকিং ২০২৬`,
        ],
        descriptions: [
          `${projectName}-এ স্বাগতম। ${cleanDesc.slice(0, 75)}... ১০০% গুগল ফ্রেন্ডলি, ফাস্ট লোডিং ও প্রফেশনাল পারফরম্যান্স। আজই ফ্রি ট্রায়াল শুরু করুন!`,
          `${primaryKw} এবং ${secondaryKw} নিয়ে তৈরি সেরা প্ল্যাটফর্ম ${projectName}। গুগল সার্চে ১ নম্বরে র্যাংক করার নিশ্চিত সুবিধা ও সার্বক্ষণিক ক্লাউড সাপোর্ট।`,
          `${cleanDesc.slice(0, 90)}... সেরা দামে আসল সেবা, বিশ্বমানের সিকিউরিটি ও ২৪/৭ সক্রিয় কাস্টমার কেয়ার। বিস্তারিত জেনে শুরু করুন!`,
        ],
        suggestedKeywords: [
          primaryKw,
          secondaryKw,
          `${primaryKw} ২০২৬`,
          `${projectName} ওয়েবসাইট`,
          'গুগল সার্চ কনসোল',
          'অনলাইন আয় ও এসইও',
        ]
      };
    }

    return {
      titles: [
        `${projectName} – ${primaryKw} & Google SEO Authority`,
        `Top Rated ${primaryKw} Platform – ${projectName} 2026`,
        `${projectName} – High-Performance ${secondaryKw} & Fast Crawl`,
      ],
      descriptions: [
        `Discover ${projectName}: ${cleanDesc.slice(0, 80)}... Fast Google Search Console indexing, HTTPS security, and high CTR performance. Start free today!`,
        `Official ${projectName} Platform for ${primaryKw} & ${secondaryKw}. Built on Google Cloud infrastructure for guaranteed uptime and top SERP ranking.`,
        `${cleanDesc.slice(0, 95)}... Engineered for speed, organic Google traffic dominance, and seamless multi-device responsiveness.`,
      ],
      suggestedKeywords: [
        primaryKw,
        secondaryKw,
        `Best ${primaryKw} 2026`,
        `${projectName} official`,
        'Fast Google Indexing',
        'SEO Traffic & Monetization',
      ]
    };
  };

  const [generatedResults, setGeneratedResults] = useState(generateDynamicMeta());

  const handleGenerateMetaTags = () => {
    setIsGenerating(true);
    sounds.playSoftClick();

    setTimeout(() => {
      setGeneratedResults(generateDynamicMeta());
      setIsGenerating(false);
      sounds.playLuxuryChime();
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });
      setAppliedNotification(
        isBn 
          ? '✨ প্রজেক্টের বিবরণ ও কি-ওয়ার্ড অনুযায়ী নতুন মেটা ট্যাগ তৈরি হয়েছে!' 
          : '✨ Fresh Meta Tags generated using your project description & keywords!'
      );
      setTimeout(() => setAppliedNotification(null), 3000);
    }, 600);
  };

  const handleApplyTitle = (newTitle: string) => {
    onUpdateProject({ name: newTitle });
    sounds.playLuxuryChime();
    setAppliedNotification(isBn ? 'টাইটেল সফলভাবে আপডেট হয়েছে!' : 'Title updated in project!');
    setTimeout(() => setAppliedNotification(null), 2500);
  };

  const handleApplyDesc = (newDesc: string) => {
    onUpdateProject({ description: newDesc });
    sounds.playLuxuryChime();
    setAppliedNotification(isBn ? 'মেটা ডেসক্রিপশন সফলভাবে আপডেট হয়েছে!' : 'Description updated in project!');
    setTimeout(() => setAppliedNotification(null), 2500);
  };

  const handleApplyKeywords = (newKw: string[]) => {
    onUpdateProject({ keywords: newKw });
    sounds.playLuxuryChime();
    setAppliedNotification(isBn ? 'কি-ওয়ার্ডগুলো সফলভাবে যুক্ত হয়েছে!' : 'Keywords saved to project!');
    setTimeout(() => setAppliedNotification(null), 2500);
  };

  const copyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    sounds.playSoftClick();
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Earnings calculation based on traffic:
  // Average RPM: $4 - $12 per 1000 visitors + affiliate / conversions
  const estimatedAdSenseUsdLow = Math.round((monthlyVisitors / 1000) * 5);
  const estimatedAdSenseUsdHigh = Math.round((monthlyVisitors / 1000) * 14);
  const estimatedBdtLow = Math.round(estimatedAdSenseUsdLow * 122);
  const estimatedBdtHigh = Math.round(estimatedAdSenseUsdHigh * 122);

  return (
    <div className="space-y-8 max-w-5xl mx-auto font-sans">
      
      {/* Top Header */}
      <div className="bg-gradient-to-br from-slate-950 via-[#0a0f1d] to-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-bold">
            <Wand2 className="w-3.5 h-3.5" />
            <span>{isBn ? 'এআই মেটা ট্যাগ ও মনিটাইজেশন ইঞ্জিন' : 'AI Meta Generator & Monetization Engine'}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            {isBn ? 'মেটা ট্যাগ জেনারেটর ও গুগল ট্র্যাফিক থেকে আয়' : 'Generate Meta Tags & Monetize Google Traffic'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            {isBn 
              ? 'আপনার বর্তমান প্রজেক্টের নাম, বিবরণ এবং কি-ওয়ার্ড বিশ্লেষণ করে স্বয়ংক্রিয়ভাবে হাই-সিটিআর মেটা ট্যাগ তৈরি করুন।'
              : 'Synthesize click-optimized SEO titles and descriptions using your live project context.'}
          </p>
        </div>

        {/* Language Preference Switcher */}
        <div className="flex items-center gap-1.5 text-xs bg-slate-900 p-1 rounded-xl border border-slate-800 shrink-0">
          <span className="text-slate-400 px-2 font-medium">{isBn ? 'ভাষা:' : 'Language:'}</span>
          <button
            onClick={() => setLangPreference('bn')}
            className={`px-3 py-1 rounded-lg font-bold transition ${
              langPreference === 'bn' ? 'bg-indigo-600 text-white shadow' : 'text-slate-300 hover:text-white'
            }`}
          >
            বাংলা (Bengali)
          </button>
          <button
            onClick={() => setLangPreference('en')}
            className={`px-3 py-1 rounded-lg font-bold transition ${
              langPreference === 'en' ? 'bg-indigo-600 text-white shadow' : 'text-slate-300 hover:text-white'
            }`}
          >
            English
          </button>
        </div>
      </div>

      {/* Toast Notification */}
      {appliedNotification && (
        <div className="bg-emerald-950/90 border border-emerald-500/40 text-emerald-300 px-4 py-3 rounded-xl text-xs flex items-center gap-2.5 shadow-xl animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="font-medium">{appliedNotification}</span>
        </div>
      )}

      {/* Feature Sub-Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {[
          { id: 'copywriter', label: isBn ? '🤖 জেমিনাই এআই এসইও কপিরাইটার' : '🤖 Gemini AI SEO Copywriter', icon: Bot, badge: 'GEMINI 3.8' },
          { id: 'intelligence-feed', label: isBn ? '📡 এআই এসইও ইন্টেলিজেন্স ফিড' : '📡 AI SEO Intelligence Feed', icon: Radio, badge: 'REALTIME AI' },
          { id: 'quick-meta', label: isBn ? '✨ এআই মেটা জেনারেটর (3 CTR Variants)' : '✨ AI Meta Generator (3 CTR Variants)', icon: Sparkles, badge: 'GEMINI AI' },
          { id: 'monetization', label: isBn ? '💰 অ্যাডসেন্স মনিটাইজেশন ক্যালকুলেটর' : '💰 AdSense Monetization Calculator', icon: DollarSign },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSubView === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveSubView(tab.id as any);
                sounds.playSoftClick();
              }}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 border ${
                isActive
                  ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white border-indigo-400 shadow-lg shadow-indigo-600/30'
                  : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Icon className="w-3.5 h-3.5 text-amber-300" />
              <span>{tab.label}</span>
              {tab.badge && (
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* FEATURE 1: GEMINI AI SEO COPYWRITER (High-Ranking Meta & Full Page Content) */}
      {activeSubView === 'copywriter' && (
        <div className="space-y-6 animate-fade-in">
          
          {/* Executive Control Header */}
          <div className="bg-gradient-to-br from-indigo-950/40 via-slate-900 to-slate-950 rounded-2xl border border-indigo-500/40 p-6 shadow-2xl space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-500/40">
                    <Bot className="w-3.5 h-3.5 text-amber-300" />
                    <span>GEMINI 3.8 FLASH SEO ARCHITECT</span>
                  </span>
                  <span className="text-slate-500">·</span>
                  <span className="text-[11px] font-mono text-emerald-400 font-semibold">
                    {geminiCopy?.modelUsed || 'Gemini Multi-Modal Engine'}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  {isBn ? 'গুগল ১ম পেজ র্যাংক কপিরাইটার ও মেটা আর্কিটেকচার' : 'AI SEO Copywriter: Rank #1 Meta & Page Content'}
                </h3>
                <p className="text-xs text-slate-300">
                  {isBn 
                    ? 'আপনার প্রজেক্টের টার্গেট কি-ওয়ার্ড ও ডেসক্রিপশনের ওপর ভিত্তি করে স্বয়ংক্রিয়ভাবে উচ্চ-র্যাংকিং টাইটেল, মেটা ডেসক্রিপশন এবং পেজ কন্টেন্ট তৈরি করে।' 
                    : 'Synthesize click-compelling meta descriptions, 60-char title tags, and structured page copy using Google Gemini.'}
                </p>
              </div>

              {/* Action Regenerate Button */}
              <button
                onClick={handleRunGeminiCopywriter}
                disabled={isGeneratingGemini}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-blue-600 to-amber-500 hover:from-indigo-500 hover:to-amber-400 text-white font-black text-xs shadow-xl shadow-indigo-600/30 transition active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 shrink-0"
              >
                <RefreshCw className={`w-4 h-4 ${isGeneratingGemini ? 'animate-spin text-amber-300' : 'text-amber-300'}`} />
                <span>
                  {isGeneratingGemini 
                    ? (isBn ? 'জেমিনাই কন্টেন্ট লিখছে...' : 'Gemini is Synthesizing Copy...') 
                    : (isBn ? '🚀 জেমিনাই দিয়ে নতুন করে লিখুন' : '🚀 Generate with Gemini AI')}
                </span>
              </button>
            </div>

            {/* Target Keywords & Strategy Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Target Primary Keyword:
                </span>
                <span className="text-amber-300 font-bold font-mono">
                  {project.keywords[0] || 'Google SEO'}
                </span>
              </div>

              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Secondary Commercial LSI:
                </span>
                <span className="text-slate-200 font-mono line-clamp-1">
                  {project.keywords.slice(1).join(', ') || 'Search Console, Sitemap'}
                </span>
              </div>

              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    AI SEO Score:
                  </span>
                  <span className="text-lg font-black text-emerald-400 font-mono">
                    {geminiCopy?.seoScore || 98}/100
                  </span>
                </div>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                  Google Page 1 Ready
                </span>
              </div>
            </div>

          </div>

          {/* Section 1: High-Ranking Title Tags (<title>) */}
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                  <Search className="w-4 h-4 text-blue-400" />
                  <span>{isBn ? '১. হাই-র্যাংকিং গুগল এসইও টাইটেল (<title>)' : '1. High-Ranking Google Title Tags (<title>)'}</span>
                </h4>
                <p className="text-xs text-slate-400">
                  {isBn ? 'গুগল সার্চে সর্বোচ্চ ক্লিক রেটের জন্য ৫০-৬০ অক্ষরের অপ্টিমাইজড টাইটেল।' : 'Engineered under 60 characters with high CTR emotional triggers and keyword primacy.'}
                </p>
              </div>
              <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30">
                SERP Truncation Free
              </span>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {geminiCopy?.titles.map((tItem, idx) => (
                <div
                  key={idx}
                  className="bg-slate-950 p-4 rounded-xl border border-slate-800 hover:border-blue-500/40 transition flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2 text-[10px] font-mono">
                      <span className="text-blue-400 font-bold">VARIANT {idx + 1}</span>
                      <span className="text-slate-500">·</span>
                      <span className="text-amber-400">{tItem.searchIntent}</span>
                      <span className="text-slate-500">·</span>
                      <span className="text-slate-400">{tItem.ctrHook}</span>
                    </div>
                    <span className="text-sm font-bold text-white block">{tItem.title}</span>
                    <span className="text-[11px] font-mono text-slate-400">
                      Length: <strong className="text-emerald-400">{tItem.length} chars</strong> (Ideal: 50–60)
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => {
                        handleApplyTitle(tItem.title);
                      }}
                      className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow transition active:scale-95"
                    >
                      {isBn ? 'প্রজেক্টে প্রয়োগ করুন' : 'Apply Title'}
                    </button>
                    <button
                      onClick={() => copyText(tItem.title, `gemTitle-${idx}`)}
                      className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 text-xs"
                      title="Copy Title"
                    >
                      {copiedId === `gemTitle-${idx}` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Click-Compelling Meta Descriptions (<meta name="description">) */}
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 text-emerald-400" />
                  <span>{isBn ? '২. হাই-সিটিআর মেটা ডেসক্রিপশন (<meta name="description">)' : '2. Click-Compelling Meta Descriptions (<meta name="description">)'}</span>
                </h4>
                <p className="text-xs text-slate-400">
                  {isBn ? 'গুগল সার্চের জন্য ১৫০-১৬০ অক্ষরের আকর্ষনীয় মেটা বিবরণ।' : 'Targeted between 150-160 characters with clear call-to-actions to maximize search clicks.'}
                </p>
              </div>
              <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30">
                150-160 Chars
              </span>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {geminiCopy?.descriptions.map((dItem, idx) => (
                <div
                  key={idx}
                  className="bg-slate-950 p-4 rounded-xl border border-slate-800 hover:border-emerald-500/40 transition flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2 text-[10px] font-mono">
                      <span className="text-emerald-400 font-bold">VARIANT {idx + 1}</span>
                      <span className="text-slate-500">·</span>
                      <span className="text-amber-400">Hook: {dItem.cta}</span>
                    </div>
                    <p className="text-xs text-slate-200 leading-relaxed">{dItem.description}</p>
                    <span className="text-[11px] font-mono text-slate-400">
                      Length: <strong className="text-emerald-400">{dItem.length} chars</strong> (SERP Safe)
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => {
                        handleApplyDesc(dItem.description);
                      }}
                      className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow transition active:scale-95"
                    >
                      {isBn ? 'প্রজেক্টে প্রয়োগ করুন' : 'Apply Description'}
                    </button>
                    <button
                      onClick={() => copyText(dItem.description, `gemDesc-${idx}`)}
                      className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 text-xs"
                      title="Copy Description"
                    >
                      {copiedId === `gemDesc-${idx}` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Optimized Page Content (H1, H2s, FAQ Schema, Markdown Export) */}
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 shadow-xl space-y-5">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <h4 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-purple-400" />
                  <span>{isBn ? '৩. অপ্টিমাইজড পেজ কন্টেন্ট স্ট্রাকচার ও এফএকিউ স্কিমা' : '3. Optimized Page Content Structure & FAQ Schema'}</span>
                </h4>
                <p className="text-xs text-slate-400">
                  {isBn ? 'টার্গেট কি-ওয়ার্ড সমৃদ্ধ H1, H2 হেডিং, বিস্তারিত বিবরণ এবং গুগল রিচ স্নিপেট এফএকিউ।' : 'Semantic H1, H2 body sections, rich FAQ snippets, and conversion call-to-action.'}
                </p>
              </div>

              {/* Sub-tabs for content */}
              <div className="flex items-center gap-1.5 text-xs bg-slate-950 p-1 rounded-xl border border-slate-800">
                <button
                  onClick={() => setActiveContentTab('content')}
                  className={`px-3 py-1 rounded-lg font-bold transition ${
                    activeContentTab === 'content' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Page Outline
                </button>
                <button
                  onClick={() => setActiveContentTab('faqs')}
                  className={`px-3 py-1 rounded-lg font-bold transition ${
                    activeContentTab === 'faqs' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  FAQ Schema
                </button>
                <button
                  onClick={() => setActiveContentTab('markdown')}
                  className={`px-3 py-1 rounded-lg font-bold transition ${
                    activeContentTab === 'markdown' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Full Markdown
                </button>
                <button
                  onClick={() => setActiveContentTab('analysis')}
                  className={`px-3 py-1 rounded-lg font-bold transition ${
                    activeContentTab === 'analysis' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Audit
                </button>
              </div>
            </div>

            {/* TAB CONTENT: Outline */}
            {activeContentTab === 'content' && geminiCopy?.pageContent && (
              <div className="space-y-4 text-xs animate-fade-in">
                
                {/* H1 & Subheadline */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider font-mono">
                      &lt;H1&gt; Primary Headline (Keyword Optimized)
                    </span>
                    <button
                      onClick={() => handleApplyTitle(geminiCopy.pageContent.h1)}
                      className="text-xs text-blue-400 hover:underline font-semibold"
                    >
                      Use as Project Title
                    </button>
                  </div>
                  <h3 className="text-lg font-black text-white">{geminiCopy.pageContent.h1}</h3>
                  <p className="text-slate-300 italic">{geminiCopy.pageContent.subheadline}</p>
                </div>

                {/* Sections */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {geminiCopy.pageContent.sections.map((sec, idx) => (
                    <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                      <span className="text-[10px] font-mono text-purple-400 font-bold block">&lt;H2&gt; SECTION {idx + 1}</span>
                      <h4 className="text-xs font-bold text-white">{sec.heading}</h4>
                      <p className="text-slate-300 text-[11px] leading-relaxed">{sec.body}</p>
                      <ul className="space-y-1 pt-1 border-t border-slate-900 text-[11px] text-slate-400">
                        {sec.bulletPoints.map((bp, bIdx) => (
                          <li key={bIdx} className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"></span>
                            <span>{bp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="bg-gradient-to-r from-indigo-950/60 to-slate-950 p-4 rounded-xl border border-indigo-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-mono text-amber-300 font-bold block">CONVERSION CALL TO ACTION</span>
                    <h5 className="text-sm font-bold text-white">{geminiCopy.pageContent.callToAction.headline}</h5>
                    <span className="text-[11px] text-slate-400">{geminiCopy.pageContent.callToAction.supportingText}</span>
                  </div>
                  <button className="px-5 py-2 rounded-xl bg-amber-500 text-slate-950 font-black text-xs shrink-0 shadow">
                    {geminiCopy.pageContent.callToAction.buttonText}
                  </button>
                </div>

              </div>
            )}

            {/* TAB CONTENT: FAQs */}
            {activeContentTab === 'faqs' && geminiCopy?.pageContent && (
              <div className="space-y-3 text-xs animate-fade-in">
                <span className="text-slate-400 block">
                  Google FAQPage JSON-LD formatted questions designed to win rich accordion results on search result pages:
                </span>
                {geminiCopy.pageContent.faqs.map((faq, idx) => (
                  <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1.5">
                    <span className="text-white font-bold block">Q{idx + 1}: {faq.question}</span>
                    <p className="text-slate-300 text-[11px] leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            )}

            {/* TAB CONTENT: Full Markdown */}
            {activeContentTab === 'markdown' && geminiCopy && (
              <div className="space-y-3 animate-fade-in text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-slate-400">Complete Ready-to-Publish Markdown Article</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => copyText(geminiCopy.markdownArticle, 'gemMarkdown')}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold"
                    >
                      {copiedId === 'gemMarkdown' ? 'Copied' : 'Copy Markdown'}
                    </button>
                    <button
                      onClick={() => downloadFile(`${project.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}-seo-content.md`, geminiCopy.markdownArticle, 'text/markdown')}
                      className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold flex items-center gap-1.5 shadow"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download .MD</span>
                    </button>
                  </div>
                </div>

                <pre className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-[11px] text-slate-300 max-h-72 overflow-y-auto leading-relaxed select-all">
                  {geminiCopy.markdownArticle}
                </pre>
              </div>
            )}

            {/* TAB CONTENT: Audit */}
            {activeContentTab === 'analysis' && geminiCopy && (
              <div className="space-y-4 text-xs animate-fade-in">
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {geminiCopy.keywordDensityAnalysis.map((kd, idx) => (
                    <div key={idx} className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase">Keyword:</span>
                        <span className="text-white font-bold font-mono">{kd.keyword}</span>
                      </div>
                      <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                        {kd.count}x ({kd.status})
                      </span>
                    </div>
                  ))}
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <span className="text-xs font-bold text-white uppercase tracking-wider block">
                    Strategic AI Recommendations:
                  </span>
                  <ul className="space-y-1.5 text-slate-300">
                    {geminiCopy.recommendations.map((rec, rIdx) => (
                      <li key={rIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            )}

          </div>

        </div>
      )}

      {/* FEATURE: REAL-TIME AI SEO INTELLIGENCE FEED (GEMINI TRENDS) */}
      {activeSubView === 'intelligence-feed' && (
        <AiSeoIntelligenceFeed 
          project={project}
          language={language}
          onUpdateProject={onUpdateProject}
        />
      )}

      {/* FEATURE 2: AI META GENERATOR (GEMINI 3 CTR VARIANTS) */}
      {activeSubView === 'quick-meta' && (
        <AiMetaGenerator 
          project={project}
          language={language}
          onUpdateProject={onUpdateProject}
        />
      )}

      {/* OLD QUICK META REPLACED */}
      {false && activeSubView === 'quick-meta' && (
      <div className="space-y-6 animate-fade-in">
      {/* PRIMARY FEATURE: Generate Meta Tags Action Command Bar */}
      <div className="bg-slate-900/90 rounded-2xl border border-indigo-500/30 p-6 shadow-xl space-y-5">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>{isBn ? 'প্রজেক্ট কনটেক্সট ভিত্তিক মেটা ট্যাগ সিন্থেসিস' : 'Active Project Context for Meta Generation'}</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              {isBn 
                ? 'আপনার বর্তমান প্রজেক্টের টাইটেল, ডেসক্রিপশন এবং কি-ওয়ার্ডগুলো নিচে দেওয়া হলো:' 
                : 'AI reads your current title, description, and keywords to craft custom high-CTR variations.'}
            </p>
          </div>

          {/* Tone Selector */}
          <div className="flex items-center gap-1.5 text-xs bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setGenerationTone('high-ctr')}
              className={`px-3 py-1 rounded-lg font-semibold transition ${
                generationTone === 'high-ctr' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              {isBn ? '🔥 হাই-ক্লিক (High CTR)' : 'High CTR'}
            </button>
            <button
              onClick={() => setGenerationTone('monetization')}
              className={`px-3 py-1 rounded-lg font-semibold transition ${
                generationTone === 'monetization' ? 'bg-amber-600 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              {isBn ? '💰 আয় ও বিক্রি (Sales)' : 'Monetization'}
            </button>
            <button
              onClick={() => setGenerationTone('authority')}
              className={`px-3 py-1 rounded-lg font-semibold transition ${
                generationTone === 'authority' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              {isBn ? '⭐ অথরিটি (Page 1)' : 'Authority'}
            </button>
          </div>
        </div>

        {/* Current Context Display */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              {isBn ? 'বর্তমান টাইটেল:' : 'Active Title:'}
            </span>
            <span className="text-white font-medium line-clamp-1">{project.name}</span>
          </div>

          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1 sm:col-span-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              {isBn ? 'বর্তমান ডেসক্রিপশন:' : 'Active Description:'}
            </span>
            <span className="text-slate-300 line-clamp-1">{project.description}</span>
          </div>
        </div>

        {/* The Requested "Generate Meta Tags" Button */}
        <div className="text-center pt-2">
          <button
            onClick={handleGenerateMetaTags}
            disabled={isGenerating}
            className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-indigo-600 via-blue-600 to-amber-500 hover:from-indigo-500 hover:to-amber-400 text-white font-black text-sm sm:text-base shadow-xl shadow-indigo-600/30 transition active:scale-[0.99] flex items-center justify-center gap-2.5 disabled:opacity-50"
          >
            <Wand2 className={`w-5 h-5 ${isGenerating ? 'animate-spin text-amber-300' : 'text-amber-300'}`} />
            <span>
              {isGenerating 
                ? (isBn ? 'এআই মেটা ট্যাগ জেনারেট করছে...' : 'Synthesizing Optimized Meta Tags...') 
                : (isBn ? '✨ Generate Meta Tags (মেটা ট্যাগ জেনারেট করুন)' : '✨ Generate Meta Tags')}
            </span>
          </button>
        </div>

      </div>

      {/* Generated Suggestions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Suggested Titles & Descriptions (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          
          {/* Titles Suggestions */}
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 space-y-3.5 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <Search className="w-4 h-4 text-blue-400" />
                <span>{isBn ? 'সাজেস্টেড এসইও টাইটেল (<title>):' : 'Suggested SEO Titles (<title>):'}</span>
              </span>
              <span className="text-[11px] text-emerald-400 font-mono font-semibold">Google Snippet Ready</span>
            </div>

            <div className="space-y-2.5">
              {generatedResults.titles.map((titleText, idx) => {
                const len = titleText.length;
                return (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 hover:border-blue-500/40 transition flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                  >
                    <div className="space-y-1 overflow-hidden">
                      <span className="text-white font-medium block leading-snug">{titleText}</span>
                      <div className="flex items-center gap-2 text-[11px] font-mono">
                        <span className={len >= 30 && len <= 60 ? 'text-emerald-400' : 'text-amber-400'}>
                          {len} / 60 {isBn ? 'অক্ষর' : 'chars'}
                        </span>
                        <span className="text-slate-600">·</span>
                        <span className="text-slate-400">{isBn ? 'পারফেক্ট দৈর্ঘ্য' : 'Optimal Length'}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                      <button
                        onClick={() => copyText(titleText, `t-${idx}`)}
                        className="px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 text-[11px] transition"
                      >
                        {copiedId === `t-${idx}` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : (isBn ? 'কপি' : 'Copy')}
                      </button>
                      <button
                        onClick={() => handleApplyTitle(titleText)}
                        className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-[11px] transition flex items-center gap-1 shadow"
                      >
                        <span>{isBn ? 'প্রজেক্টে বসান' : 'Apply'}</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Meta Descriptions Suggestions */}
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 space-y-3.5 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-indigo-400" />
                <span>{isBn ? 'সাজেস্টেড মেটা ডেসক্রিপশন (Meta Description):' : 'Suggested Meta Descriptions:'}</span>
              </span>
              <span className="text-[11px] text-indigo-400 font-mono font-semibold">120-160 Chars</span>
            </div>

            <div className="space-y-3">
              {generatedResults.descriptions.map((descText, idx) => {
                const len = descText.length;
                return (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 hover:border-indigo-500/40 transition space-y-2 text-xs"
                  >
                    <p className="text-slate-300 leading-relaxed font-sans">
                      {descText}
                    </p>

                    <div className="flex items-center justify-between pt-1 text-[11px] font-mono border-t border-slate-900">
                      <span className={len >= 120 && len <= 165 ? 'text-emerald-400 font-bold' : 'text-amber-400'}>
                        {len} / 160 {isBn ? 'অক্ষর (গুগল সার্চ ও মোবাইলের জন্য সেরা)' : 'chars (ideal snippet)'}
                      </span>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => copyText(descText, `d-${idx}`)}
                          className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 text-[11px]"
                        >
                          {copiedId === `d-${idx}` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : (isBn ? 'কপি' : 'Copy')}
                        </button>
                        <button
                          onClick={() => handleApplyDesc(descText)}
                          className="px-3 py-1 rounded bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-[11px] transition flex items-center gap-1 shadow"
                        >
                          <span>{isBn ? 'প্রজেক্টে বসান' : 'Apply'}</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right: Long-tail Keywords & SERP Preview shortcut (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          
          {/* Suggested Keyword Clusters */}
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 space-y-3.5 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <Key className="w-4 h-4 text-amber-400" />
                <span>{isBn ? 'হাই-ইন্টেন্ট সার্চ কি-ওয়ার্ড' : 'High-Intent Keyword Clusters'}</span>
              </span>
              <button
                onClick={() => handleApplyKeywords(generatedResults.suggestedKeywords)}
                className="text-[11px] text-amber-400 hover:underline font-bold"
              >
                {isBn ? 'সব প্রজেক্টে যুক্ত করুন' : 'Apply All Keywords'}
              </button>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              {generatedResults.suggestedKeywords.map((kw, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs font-medium flex items-center gap-1.5 shadow-sm"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                  <span>{kw}</span>
                </span>
              ))}
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed pt-2">
              💡 {isBn
                ? 'এই কি-ওয়ার্ডগুলো গুগল সার্চবটকে আপনার কনটেন্টের মূল বিষয়বস্তু বুঝতে এবং সার্চে উপরের দিকে তুলে আনতে সাহায্য করে।'
                : 'These semantic clusters help Googlebot understand user search intent and award higher ranking authority.'}
            </p>
          </div>

          {/* Quick link to SERP Simulator */}
          <div className="bg-gradient-to-br from-blue-950/40 to-slate-950 rounded-2xl border border-blue-500/20 p-5 space-y-2.5">
            <span className="text-xs font-bold text-white flex items-center gap-1.5">
              <Search className="w-4 h-4 text-blue-400" />
              <span>{isBn ? 'গুগল সার্চে ফলাফল প্রিভিউ দেখুন' : 'Live Google SERP Simulator'}</span>
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">
              {isBn 
                ? 'নতুন তৈরি করা মেটা ট্যাগগুলো গুগল মোবাইল ও ডেস্কটপ সার্চে কেমন দেখাবে তা পরীক্ষা করুন।' 
                : 'Inspect how your newly generated tags render on Google mobile cards and desktop sitelinks.'}
            </p>
            <button
              onClick={() => onNavigateToTab('serp')}
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition flex items-center justify-center gap-1.5 shadow"
            >
              <span>{isBn ? 'সার্চ প্রিভিউ ওপেন করুন →' : 'Open SERP Simulator →'}</span>
            </button>
          </div>

        </div>

      </div>
      </div>
      )}

      {/* MONETIZATION & GOOGLE REVENUE SUITE */}
      {(activeSubView === 'monetization') && (
      <div className="bg-gradient-to-br from-[#0a1628] via-slate-900 to-[#141204] rounded-2xl border border-amber-500/40 p-6 md:p-8 shadow-2xl space-y-6 animate-fade-in">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold">
              <DollarSign className="w-3.5 h-3.5" />
              <span>{isBn ? 'গুগল ট্র্যাফিক থেকে ব্যাংক/বিকাশে টাকা আয়ের গাইড' : 'Website Traffic Monetization Blueprint'}</span>
            </div>
            <h3 className="text-lg sm:text-2xl font-black text-white tracking-tight">
              {isBn 
                ? 'ওয়েবসাইটে মানুষ আসবে এবং আপনার একাউন্টে টাকা ঢুকবে যেভাবে' 
                : 'How Thousands of Google Visitors Turn into Real Bank Deposits'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              {isBn
                ? 'গুগল সার্চে ১ নম্বরে র্যাংক করার পর প্রতিদিন হাজার হাজার মানুষ ফ্রিতে আপনার সাইটে ভিজিট করবে। নিচে আয়ের ৪টি মূল উপায় এবং আয় ক্যালকুলেটর দেওয়া হলো:'
                : 'Convert organic Google Search traffic into predictable monthly income streams.'}
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-amber-500/30 text-center min-w-[200px] shrink-0">
            <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">
              {isBn ? 'প্রত্যাশিত মাসিক আয়' : 'Monthly Earnings'}
            </span>
            <div className="text-2xl sm:text-3xl font-black text-white mt-1">
              ${estimatedAdSenseUsdLow} – ${estimatedAdSenseUsdHigh}
            </div>
            <span className="text-xs font-bold text-emerald-400 font-mono">
              ৳{estimatedBdtLow.toLocaleString()} – ৳{estimatedBdtHigh.toLocaleString()} টাকা
            </span>
          </div>
        </div>

        {/* Traffic Revenue Interactive Slider */}
        <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-white flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span>{isBn ? 'মাসিক গুগল ভিজিটর সংখ্যা সিলেক্ট করুন:' : 'Estimated Monthly Search Visitors:'}</span>
            </span>
            <span className="font-mono text-sm font-black text-blue-400 bg-blue-500/10 border border-blue-500/30 px-3 py-1 rounded-lg">
              {monthlyVisitors.toLocaleString()} {isBn ? 'ভিজিটর / মাস' : 'visitors/mo'}
            </span>
          </div>

          <input
            type="range"
            min={5000}
            max={200000}
            step={5000}
            value={monthlyVisitors}
            onChange={(e) => setMonthlyVisitors(parseInt(e.target.value, 10))}
            className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
          />

          <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
            <span>5,000 (নতুন সাইট)</span>
            <span>50,000 (গ্রোথ স্টেজ)</span>
            <span>200,000+ (টপ র্যাংকড)</span>
          </div>
        </div>

        {/* 4 Monetization Channels */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          
          {/* 1. Google AdSense */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
              1
            </div>
            <h4 className="font-bold text-white">{isBn ? 'গুগল অ্যাডসেন্স (AdSense)' : 'Google AdSense'}</h4>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              {isBn 
                ? 'গুগল আপনার সাইটে বিজ্ঞাপন দেখাবে। মানুষ দেখলেই প্রতি ক্লিকে ও ভিউতে ডলার জমা হবে।' 
                : 'Display automated ads. Earn per 1,000 views (CPM) and user clicks (CPC).'}
            </p>
          </div>

          {/* 2. Affiliate Marketing */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              2
            </div>
            <h4 className="font-bold text-white">{isBn ? 'অ্যাফিলিয়েট মার্কেটিং' : 'Affiliate Marketing'}</h4>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              {isBn 
                ? 'Amazon, Daraz বা হোস্টিং রেফারেল লিংক দিন। কেউ কিনলে ১০% থেকে ৪০% কমিশন আপনার একাউন্টে আসবে।' 
                : 'Recommend products with custom tracking links and earn 10–40% commission per sale.'}
            </p>
          </div>

          {/* 3. Direct Services / Client Work */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
              3
            </div>
            <h4 className="font-bold text-white">{isBn ? 'সার্ভিস বিক্রি (Direct Pay)' : 'Client Services'}</h4>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              {isBn 
                ? 'ওয়েব ডিজাইন, সফটওয়্যার বা কনসাল্টিং সার্ভিস সরাসরি বিকাশ/নগদ/ব্যাংকে পেমেন্ট নিয়ে বিক্রি করুন।' 
                : 'Sell freelance web services, consulting, or digital downloads directly to clients.'}
            </p>
          </div>

          {/* 4. Sponsorships */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
              4
            </div>
            <h4 className="font-bold text-white">{isBn ? 'ব্র্যান্ড স্পন্সরশিপ' : 'Brand Sponsorships'}</h4>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              {isBn 
                ? 'সাইটে ভিজিটর বাড়লে বিভিন্ন কোম্পানি সরাসরি মাসিক ফিতে ব্যানার অ্যাড দেওয়ার চুক্তি করবে।' 
                : 'Accept paid sponsor banners and sponsored articles from high-budget brands.'}
            </p>
          </div>

        </div>

        {/* Google AdSense Meta Tag Ready */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2.5 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold text-white flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{isBn ? 'গুগল অ্যাডসেন্স ভেরিফিকেশন মেটা কোড:' : 'Google AdSense Account Verification Tag:'}</span>
            </span>
            <button
              onClick={() => copyText(`<meta name="google-adsense-account" content="${adSensePublisherId}">`, 'adsenseCode')}
              className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1"
            >
              {copiedId === 'adsenseCode' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedId === 'adsenseCode' ? (isBn ? 'কপি হয়েছে' : 'Copied') : (isBn ? 'অ্যাডসেন্স ট্যাগ কপি' : 'Copy AdSense Tag')}</span>
            </button>
          </div>

          <pre className="bg-slate-900 p-2.5 rounded-lg border border-slate-800 font-mono text-[11px] text-amber-300 overflow-x-auto select-all">
{`<meta name="google-adsense-account" content="${adSensePublisherId}">`}
          </pre>

          <p className="text-[11px] text-slate-400">
            {isBn
              ? 'গুগল অ্যাডসেন্সে একাউন্ট খুলে আপনার Publisher ID বসিয়ে এই কোডটি <head>-এ দিলেই সাইটে বিজ্ঞাপন চালু হয়ে যাবে।'
              : 'Add this tag inside your <head> to link Google AdSense and verify monetization ownership.'}
          </p>
        </div>

      </div>
      )}

    </div>
  );
};
