import React, { useState, useEffect } from 'react';
import { 
  Radio, 
  Flame, 
  Sparkles, 
  TrendingUp, 
  Zap, 
  RefreshCw, 
  CheckCircle2, 
  Bot, 
  Layers, 
  Globe, 
  ArrowUpRight, 
  ArrowDownRight, 
  Clock, 
  ShieldAlert, 
  Download, 
  Copy, 
  Check, 
  Compass,
  Activity,
  Award,
  Sliders,
  AlertTriangle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../utils/soundEffects';
import { WebsiteProject, Language } from '../types';
import { 
  fetchIndustrySeoIntelligence, 
  IndustryIntelligenceReport, 
  SeoTrendItem 
} from '../utils/geminiIntelligenceFeed';

interface AiSeoIntelligenceFeedProps {
  project: WebsiteProject;
  language: Language;
  onUpdateProject: (updated: Partial<WebsiteProject>) => void;
}

export const AiSeoIntelligenceFeed: React.FC<AiSeoIntelligenceFeedProps> = ({
  project,
  language,
  onUpdateProject,
}) => {
  const isBn = language === 'bn';

  const [selectedIndustry, setSelectedIndustry] = useState<string>(
    'Enterprise SaaS & Cloud Software'
  );
  const [report, setReport] = useState<IndustryIntelligenceReport | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [appliedKeywordNotice, setAppliedKeywordNotice] = useState<string | null>(null);
  const [activeTrendDetail, setActiveTrendDetail] = useState<SeoTrendItem | null>(null);

  const industries = [
    { id: 'Enterprise SaaS & Cloud Software', label: isBn ? 'ক্লাউড ও এন্টারপ্রাইজ সফটওয়্যার' : 'Enterprise SaaS & Cloud' },
    { id: 'E-Commerce & Retail Marketplace', label: isBn ? 'ই-কমার্স ও অনলাইন শপ' : 'E-Commerce & Retail' },
    { id: 'Fintech & Financial Banking', label: isBn ? 'ফিনটেক ও ব্যাংকিং' : 'Fintech & Investments' },
    { id: 'Digital Media & High-Traffic Publishing', label: isBn ? 'ডিজিটাল নিউজ ও পাবলিশিং' : 'Digital News & Media' },
    { id: 'Professional Services & Consulting', label: isBn ? 'প্রফেশনাল সার্ভিসেস' : 'Professional Services' },
  ];

  // Fetch report whenever industry or language changes
  const loadIntelligence = async (ind: string) => {
    setIsLoading(true);
    sounds.playSoftClick();

    try {
      const data = await fetchIndustrySeoIntelligence(project, ind, language);
      setReport(data);
      if (data.keyTrends.length > 0) {
        setActiveTrendDetail(data.keyTrends[0]);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadIntelligence(selectedIndustry);
  }, [selectedIndustry, language]);

  const handleRefresh = () => {
    loadIntelligence(selectedIndustry);
    sounds.playLuxuryChime();
    confetti({ particleCount: 45, spread: 60, origin: { y: 0.3 } });
  };

  const handleApplyKeyword = (kw: string) => {
    sounds.playSoftClick();
    if (!project.keywords.includes(kw)) {
      const updated = [kw, ...project.keywords].slice(0, 10);
      onUpdateProject({ keywords: updated });
      setAppliedKeywordNotice(
        isBn ? `"${kw}" কি-ওয়ার্ডটি প্রজেক্টে যুক্ত করা হয়েছে!` : `Keyword "${kw}" added to active project target list!`
      );
      setTimeout(() => setAppliedKeywordNotice(null), 3000);
    }
  };

  const handleCopyStrategy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    sounds.playSoftClick();
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* EXECUTIVE AI INTELLIGENCE HEADER */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-950/60 via-slate-900 to-slate-950 border border-indigo-500/40 p-6 md:p-8 shadow-2xl space-y-6">
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-5 border-b border-slate-800">
          
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 font-mono text-xs font-bold">
                <Radio className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
                <span>REAL-TIME AI SEO INTELLIGENCE FEED</span>
              </span>
              <span className="text-slate-600">·</span>
              <span className="text-[11px] font-mono text-emerald-400 font-bold flex items-center gap-1">
                <Bot className="w-3.5 h-3.5" />
                <span>GEMINI 3.8 FLASH ENGINE</span>
              </span>
            </div>

            <h3 className="text-xl sm:text-3xl font-black text-white tracking-tight">
              {isBn 
                ? 'রিয়েলটাইম এআই এসইও ইন্টেলিজেন্স ও সার্চ ট্রেন্ডস ফিড' 
                : 'Real-Time AI SEO Intelligence & Ranking Trends Feed'}
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              {isBn 
                ? 'গুগল সার্চ সেন্ট্রাল ও বিভিন্ন ইন্ডাস্ট্রির লাইভ অ্যালগরিদম ভলাটিলিটি স্ক্যান করে জেমিনাই এআই এর মাধ্যমে সরাসরি কন্টেন্ট স্ট্র্যাটেজি পরামর্শ গ্রহণ করুন।' 
                : 'Pulls live industry-specific search volatility and algorithmic shifts using Google Gemini to dynamically calibrate your ranking strategy.'}
            </p>
          </div>

          {/* Action Trigger */}
          <div className="flex items-center gap-2.5 shrink-0 self-start lg:self-center">
            <button
              onClick={handleRefresh}
              disabled={isLoading}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-blue-600 to-amber-500 hover:from-indigo-500 text-white font-black text-xs shadow-xl shadow-indigo-600/30 transition active:scale-95 flex items-center gap-2 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 text-amber-300 ${isLoading ? 'animate-spin' : ''}`} />
              <span>
                {isLoading 
                  ? (isBn ? 'লাইভ ট্রেন্ড স্ক্যান হচ্ছে...' : 'Scanning Live Algorithm...') 
                  : (isBn ? '🚀 লাইভ ফিড রিফ্রেশ করুন' : '🚀 Refresh Intelligence Feed')}
              </span>
            </button>
          </div>

        </div>

        {/* ALGORITHM VOLATILITY WEATHER GAUGE & INDUSTRY SELECTOR */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
          
          {/* Left: Industry Selector (7 cols) */}
          <div className="lg:col-span-7 space-y-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              {isBn ? 'ইন্ডাস্ট্রি ও নিশ সিলেক্ট করুন:' : 'Select Industry Sector:'}
            </span>
            <div className="flex flex-wrap gap-2">
              {industries.map((ind) => {
                const isSelected = selectedIndustry === ind.id;
                return (
                  <button
                    key={ind.id}
                    onClick={() => {
                      setSelectedIndustry(ind.id);
                      sounds.playSoftClick();
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 border ${
                      isSelected
                        ? 'bg-blue-600 text-white border-blue-400 shadow-md shadow-blue-600/30'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
                    }`}
                  >
                    <Globe className="w-3.5 h-3.5 text-amber-300" />
                    <span>{ind.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Algorithm Volatility Weather Badge (5 cols) */}
          <div className="lg:col-span-5 bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-amber-400 font-bold">
                <Activity className="w-3.5 h-3.5 animate-pulse" />
                <span>ALGORITHM VOLATILITY:</span>
              </div>
              <span className="text-base font-black text-white block">
                {report?.algorithmWeather.status || 'High Turbulence'}
              </span>
              <p className="text-[10px] text-slate-400 line-clamp-1">
                {report?.algorithmWeather.coreUpdateAlert}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-center shrink-0">
              <span className="text-2xl font-black text-amber-400 font-mono block">
                {report?.algorithmWeather.temperature || 91}°
              </span>
              <span className="text-[9px] font-mono text-slate-400 uppercase">VOLATILITY</span>
            </div>
          </div>

        </div>

      </div>

      {appliedKeywordNotice && (
        <div className="bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-lg animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{appliedKeywordNotice}</span>
        </div>
      )}

      {/* GEMINI EXECUTIVE ANALYSIS SUMMARY BANNER */}
      {report?.geminiAnalysisSummary && (
        <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-950/40 via-slate-900 to-slate-950 border border-blue-500/30 flex items-start gap-3.5 shadow-xl">
          <div className="p-2.5 rounded-xl bg-blue-500/20 border border-blue-500/30 text-blue-400 shrink-0 mt-0.5">
            <Bot className="w-5 h-5 text-amber-300" />
          </div>
          <div className="space-y-1.5 flex-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                {isBn ? 'জেমিনাই এআই স্ট্র্যাটেজি সামারি:' : 'Gemini AI Executive Strategy Briefing:'}
              </span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                PROPRIETARY TELEMETRY
              </span>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed">
              {report.geminiAnalysisSummary}
            </p>
            <div className="pt-1 flex items-center gap-2 text-[11px] text-amber-300 font-mono">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Recommended Velocity: {report.contentVelocityRecommendation}</span>
            </div>
          </div>
        </div>
      )}

      {/* 2-COLUMN INTELLIGENCE FEED GRID: (TREND CARDS + ACTIONABLE STRATEGY INSPECTOR) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Real-Time Ranking Trend Cards (7 cols) */}
        <div className="lg:col-span-7 space-y-3.5">
          <div className="flex items-center justify-between text-xs text-slate-400 px-1">
            <span className="font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-blue-400" />
              <span>{isBn ? 'লাইভ অ্যালগরিদম ট্রেন্ডসমূহ' : 'Live Search Ranking Trends'}</span>
            </span>
            <span className="font-mono text-[11px] text-slate-500">
              Updated Live via Gemini 3.8
            </span>
          </div>

          <div className="space-y-3">
            {report?.keyTrends.map((trend) => {
              const isSelected = activeTrendDetail?.id === trend.id;
              const isCritical = trend.impactLevel === 'CRITICAL';

              return (
                <div
                  key={trend.id}
                  onClick={() => {
                    setActiveTrendDetail(trend);
                    sounds.playSoftClick();
                  }}
                  className={`p-4 rounded-xl border transition-all cursor-pointer space-y-2.5 ${
                    isSelected
                      ? 'bg-slate-900 border-blue-500/60 shadow-lg ring-1 ring-blue-500/30'
                      : 'bg-slate-950/90 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded font-mono text-[10px] font-bold ${
                        isCritical
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      }`}>
                        {trend.impactLevel} IMPACT
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">{trend.category}</span>
                    </div>

                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded flex items-center gap-1">
                      <ArrowUpRight className="w-3 h-3" />
                      <span>{trend.volatilityScore}% Momentum</span>
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-white leading-snug">
                    {trend.headline}
                  </h4>

                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                    {trend.summary}
                  </p>

                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-500" />
                      <span>{trend.timestamp}</span>
                    </span>

                    <span className="text-blue-400 font-semibold hover:underline flex items-center gap-1">
                      <span>{isBn ? 'কৌশল দেখুন →' : 'View Actionable Strategy →'}</span>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Selected Trend Strategy Inspector & Keyword Injection (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          <div className="bg-slate-950 rounded-2xl border border-slate-800 p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-emerald-400" />
                <span>{isBn ? 'অ্যাকশনেবল কন্টেন্ট স্ট্র্যাটেজি' : 'Actionable Content Playbook'}</span>
              </span>
              <span className="text-[10px] font-mono text-slate-400">
                {activeTrendDetail?.category}
              </span>
            </div>

            {activeTrendDetail ? (
              <div className="space-y-4 text-xs">
                <div>
                  <h4 className="text-sm font-black text-white">{activeTrendDetail.headline}</h4>
                  <p className="text-slate-400 text-[11px] mt-1 leading-relaxed">
                    {activeTrendDetail.summary}
                  </p>
                </div>

                {/* Strategy Box */}
                <div className="p-3.5 rounded-xl bg-blue-950/30 border border-blue-500/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-blue-300 uppercase tracking-wider font-mono">
                      Recommended Strategy Execution:
                    </span>
                    <button
                      onClick={() => handleCopyStrategy(activeTrendDetail.actionableStrategy, activeTrendDetail.id)}
                      className="text-blue-400 hover:text-white"
                      title="Copy strategy"
                    >
                      {copiedId === activeTrendDetail.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  <p className="text-slate-200 text-xs leading-relaxed">
                    {activeTrendDetail.actionableStrategy}
                  </p>
                </div>

                {/* Recommended Keywords for this trend */}
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    {isBn ? 'প্রস্তাবিত কি-ওয়ার্ড (১-ক্লিকে প্রজেক্টে যুক্ত করুন):' : 'Suggested Fast-Ranking Keywords:'}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {activeTrendDetail.recommendedKeywords.map((kw, i) => (
                      <button
                        key={i}
                        onClick={() => handleApplyKeyword(kw)}
                        className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-emerald-500/20 text-slate-200 hover:text-emerald-300 border border-slate-700 hover:border-emerald-500/40 font-mono text-[11px] transition flex items-center gap-1.5"
                        title="Add to project target keywords"
                      >
                        <Zap className="w-3 h-3 text-amber-400" />
                        <span>+ {kw}</span>
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            ) : (
              <div className="py-8 text-center text-xs text-slate-500">
                বাম পাশের ট্রেন্ডে ক্লিক করে বিস্তারিত গাইড দেখুন।
              </div>
            )}
          </div>

          {/* Dynamic Content Calendar Tip */}
          <div className="bg-slate-950 rounded-2xl border border-slate-800 p-5 space-y-3 shadow-xl text-xs">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              <h5 className="font-bold text-white uppercase tracking-wider text-[11px]">
                {isBn ? 'অ্যালগরিদম আপডেট থেকে বাঁচার নিয়ম' : 'Core Update Resilience Rule'}
              </h5>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              {isBn 
                ? 'গুগলের হেল্পফুল কন্টেন্ট সিস্টেমে সাইট নিরাপদ রাখতে কখনো পুরোপুরি এআই দিয়ে যাচাই না করে কন্টেন্ট পোস্ট করবেন না। প্রতিটি লেখায় আপনার অভিজ্ঞতা ও রিয়েল ডেটা যুক্ত করুন।' 
                : 'To maintain algorithmic immunity, blend AI speed with firsthand technical validation, verifiable author bios, and sub-100ms INP page speeds.'}
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
