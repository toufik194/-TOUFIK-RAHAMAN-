import React, { useState, useMemo } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  Sparkles, 
  Video, 
  Globe, 
  Zap, 
  ShieldCheck, 
  Check, 
  Copy, 
  CreditCard, 
  ShoppingCart, 
  Sliders, 
  Award, 
  BarChart3, 
  ArrowUpRight, 
  Layers, 
  Play, 
  Code2, 
  FileCode, 
  Cpu, 
  Lock, 
  Unlock, 
  CheckCircle2, 
  RefreshCw, 
  Download,
  Share2,
  Wand2,
  Mic,
  Clapperboard,
  Flame,
  Star
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  Legend 
} from 'recharts';
import confetti from 'canvas-confetti';
import { WebsiteProject, Language } from '../types';
import { sounds } from '../utils/soundEffects';
import { downloadFile } from '../utils/seoGenerators';

interface MonetizationTabProps {
  project: WebsiteProject;
  language: Language;
  onUpdateProject: (updated: Partial<WebsiteProject>) => void;
  onNavigateToTab: (tab: any) => void;
}

interface NicheConfig {
  id: string;
  name: string;
  nameBn: string;
  baseRpm: number; // USD per 1000 pageviews
  defaultCtr: number; // percentage
  icon: string;
}

const NICHES: NicheConfig[] = [
  { id: 'tech', name: 'Tech, SaaS & AI Software', nameBn: 'প্রযুক্তি, সফটওয়্যার ও এআই', baseRpm: 24.5, defaultCtr: 4.2, icon: '💻' },
  { id: 'finance', name: 'Finance, Crypto & Real Estate', nameBn: 'ফাইন্যান্স, ক্রিপ্টো ও ব্যাংকিং', baseRpm: 38.0, defaultCtr: 3.8, icon: '🏦' },
  { id: 'ecommerce', name: 'E-commerce & Consumer Goods', nameBn: 'ই-কমার্স ও পণ্য বিক্রি', baseRpm: 15.2, defaultCtr: 5.4, icon: '🛍️' },
  { id: 'health', name: 'Health, Wellness & Fitness', nameBn: 'স্বাস্থ্য, ফিটনেস ও মেডিকেল', baseRpm: 18.0, defaultCtr: 4.0, icon: '🏥' },
  { id: 'travel', name: 'Travel, Airlines & Hospitality', nameBn: 'ভ্রমণ ও হোটেল বুকিং', baseRpm: 13.5, defaultCtr: 4.5, icon: '✈️' },
  { id: 'news', name: 'News, Media & Lifestyle Blogs', nameBn: 'সংবাদ, বিনোদন ও লাইফস্টাইল', baseRpm: 7.2, defaultCtr: 3.1, icon: '📰' },
];

export const MonetizationTab: React.FC<MonetizationTabProps> = ({
  project,
  language,
  onUpdateProject,
  onNavigateToTab,
}) => {
  const isBn = language === 'bn';
  const [activeSubTab, setActiveSubTab] = useState<'calculator' | 'video-ai' | 'site-builder' | 'marketplace'>('calculator');
  const [currency, setCurrency] = useState<'USD' | 'BDT'>('USD');
  const exchangeRate = 122; // 1 USD = 122 BDT

  // AdSense Projection Parameters
  const [monthlyTraffic, setMonthlyTraffic] = useState<number>(35000);
  const [selectedNicheId, setSelectedNicheId] = useState<string>('tech');
  const [customCtr, setCustomCtr] = useState<number>(4.2);
  const [geoTier, setGeoTier] = useState<'tier1' | 'tier2' | 'global'>('tier1');

  // Checkout Modal State
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{
    id: string;
    title: string;
    priceUsd: number;
    billing: string;
    features: string[];
  } | null>(null);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [purchasedLicense, setPurchasedLicense] = useState<string | null>(null);

  // Video AI Studio State
  const [videoPrompt, setVideoPrompt] = useState(
    isBn 
      ? 'গুগল সার্চে ১ নম্বরে র্যাংক করার ৫টি গোপন কৌশল এবং এআই ওয়েবসাইট বিল্ডার' 
      : '5 Secrets to Rank #1 on Google in 2026 Using Autonomous AI Web Publishers'
  );
  const [videoFormat, setVideoFormat] = useState<'shorts' | 'youtube' | 'ad'>('shorts');
  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);
  const [generatedVideoScript, setGeneratedVideoScript] = useState<{
    hook: string;
    scenes: { time: string; visual: string; audio: string; broll: string }[];
    cta: string;
  } | null>(null);

  // Website Builder State
  const [sitePrompt, setSitePrompt] = useState(
    isBn ? 'আধুনিক এআই ভিত্তিক ইকমার্স ফ্যাশন ব্র্যান্ড' : 'Ultra-Fast Luxury SaaS Landing Page with Dark Theme'
  );
  const [isGeneratingSite, setIsGeneratingSite] = useState(false);
  const [generatedSiteSnippet, setGeneratedSiteSnippet] = useState<{
    title: string;
    previewHtml: string;
    features: string[];
  } | null>(null);

  const [copiedId, setCopiedId] = useState<string | null>(null);

  const selectedNiche = NICHES.find((n) => n.id === selectedNicheId) || NICHES[0];

  // Calculate RPM adjustment based on Geo Tier and CTR
  const effectiveRpm = useMemo(() => {
    let geoMultiplier = 1.0;
    if (geoTier === 'tier1') geoMultiplier = 1.35; // US, UK, Canada, Australia
    if (geoTier === 'tier2') geoMultiplier = 0.85;
    if (geoTier === 'global') geoMultiplier = 0.65;

    const ctrFactor = customCtr / selectedNiche.defaultCtr;
    return +(selectedNiche.baseRpm * geoMultiplier * ctrFactor).toFixed(2);
  }, [geoTier, customCtr, selectedNiche]);

  // Projected Monthly and Annual AdSense Earnings
  const monthlyAdSenseUsd = useMemo(() => {
    return Math.round((monthlyTraffic / 1000) * effectiveRpm);
  }, [monthlyTraffic, effectiveRpm]);

  const monthlyAffiliateUsd = Math.round(monthlyAdSenseUsd * 0.65);
  const monthlySponsorshipUsd = Math.round(monthlyAdSenseUsd * 0.45);
  const totalMonthlyIncomeUsd = monthlyAdSenseUsd + monthlyAffiliateUsd + monthlySponsorshipUsd;
  const annualProjectedUsd = totalMonthlyIncomeUsd * 12;

  // 12-Month Compounding Growth Forecast Data
  const forecastData = useMemo(() => {
    const data = [];
    const monthNames = isBn 
      ? ['মাস ১', 'মাস ২', 'মাস ৩', 'মাস ৪', 'মাস ৫', 'মাস ৬', 'মাস ৭', 'মাস ৮', 'মাস ৯', 'মাস ১০', 'মাস ১১', 'মাস ১২']
      : ['Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5', 'Month 6', 'Month 7', 'Month 8', 'Month 9', 'Month 10', 'Month 11', 'Month 12'];

    let currentBase = monthlyAdSenseUsd * 0.4;
    for (let i = 0; i < 12; i++) {
      // Compounding traffic expansion (15% - 20% month-over-month)
      const growthFactor = Math.pow(1.16, i);
      const adRev = Math.round(currentBase * growthFactor);
      const affRev = Math.round(adRev * 0.65);
      const sponRev = i >= 3 ? Math.round(adRev * 0.5) : 0;
      const totalRev = adRev + affRev + sponRev;

      const convertedTotal = currency === 'BDT' ? Math.round(totalRev * exchangeRate) : totalRev;
      const convertedAd = currency === 'BDT' ? Math.round(adRev * exchangeRate) : adRev;
      const convertedAff = currency === 'BDT' ? Math.round(affRev * exchangeRate) : affRev;
      const convertedSpon = currency === 'BDT' ? Math.round(sponRev * exchangeRate) : sponRev;

      data.push({
        month: monthNames[i],
        adSense: convertedAd,
        affiliate: convertedAff,
        sponsorship: convertedSpon,
        totalRevenue: convertedTotal,
      });
    }
    return data;
  }, [monthlyAdSenseUsd, currency, isBn]);

  const formatMoney = (valUsd: number) => {
    if (currency === 'BDT') {
      const bdt = Math.round(valUsd * exchangeRate);
      return `৳${bdt.toLocaleString()}`;
    }
    return `$${valUsd.toLocaleString()}`;
  };

  const copyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    sounds.playSoftClick();
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Video Generator Execution
  const handleGenerateVideoScript = () => {
    setIsGeneratingVideo(true);
    sounds.playSoftClick();

    setTimeout(() => {
      setIsGeneratingVideo(false);
      sounds.playLuxuryChime();
      confetti({ particleCount: 60, spread: 60, origin: { y: 0.7 } });

      setGeneratedVideoScript({
        hook: isBn 
          ? '⚡ ৯০% মানুষ জানে না কীভাবে গুগল সার্চের ১ নম্বরে ২৪ ঘণ্টায় উঠতে হয়! এই ৩টি ধাপ দেখুন...' 
          : '⚡ 90% of creators fail at Google SEO because of this one missing tag. Here is the 24-hour fix...',
        scenes: [
          {
            time: '0:00 - 0:04',
            visual: 'Fast zooming animation of Google Search Bar typing your keyword + Rank #1 badge flashing in gold.',
            audio: isBn ? 'আপনার ওয়েবসাইট কি গুগলে খুঁজে পাওয়া যাচ্ছে না? চিন্তার দিন শেষ!' : 'Is your website invisible on Google? Fix it in 30 seconds.',
            broll: 'High-contrast mobile UI with search console dashboard.'
          },
          {
            time: '0:04 - 0:15',
            visual: 'Split screen showing slow loading site vs 0.8s ultra-fast Google Cloud hosted app.',
            audio: isBn ? 'প্রথমেই কোর ওয়েব ভাইটালস স্পিড ফিক্স করুন। আমাদের এআই দিয়ে ১ ক্লিকে সাইটম্যাপ ও স্কিমা তৈরি করুন।' : 'Step 1: Deploy on Google Cloud infrastructure with sub-second response times.',
            broll: 'Green 100/100 Lighthouse performance circle pulsing.'
          },
          {
            time: '0:15 - 0:30',
            visual: 'Terminal showing Googlebot crawler discovering pages instantly.',
            audio: isBn ? 'গুগল সার্চ কনসোলে সাবমিট করলেই সার্চবট লাইভ ডাটা ক্রল করবে এবং অর্গানিক ক্লিক আসতে শুরু করবে!' : 'Step 2: Submit verified sitemap.xml to trigger instant Googlebot indexing.',
            broll: 'Graph showing traffic line skyrocketing upward.'
          }
        ],
        cta: isBn 
          ? '🔥 আজই কমেন্ট বক্সে দেওয়া লিংকে ক্লিক করে আপনার ওয়েবসাইটের ফ্রি অডিট রিপোর্ট নিন!' 
          : '🔥 Tap the link below to deploy your enterprise-ready website on Google Cloud today!'
      });
    }, 700);
  };

  // Website Generator Execution
  const handleGenerateSite = () => {
    setIsGeneratingSite(true);
    sounds.playSoftClick();

    setTimeout(() => {
      setIsGeneratingSite(false);
      sounds.playLuxuryChime();
      confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });

      setGeneratedSiteSnippet({
        title: sitePrompt,
        features: [
          'Sub-second Google Cloud TTFB (<50ms)',
          'Automated JSON-LD Schema & OpenGraph Meta',
          'Responsive Mobile-First Tailwind CSS & React Architecture',
          'Google Search Console Sitemap.xml Auto-Generation'
        ],
        previewHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${sitePrompt} | Google Ready</title>
  <meta name="description" content="Next-generation high-converting web platform engineered for search dominance.">
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-950 text-white font-sans antialiased p-8">
  <div class="max-w-4xl mx-auto space-y-6">
    <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold border border-blue-500/40">
      ⚡ AI GENERATED FULL-STACK APP
    </div>
    <h1 class="text-4xl font-black tracking-tight text-white">${sitePrompt}</h1>
    <p class="text-slate-300 text-lg">Engineered for sub-second Core Web Vitals and Page 1 Google visibility.</p>
    <div class="pt-4 flex gap-3">
      <button class="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 font-bold text-white shadow-lg">Get Started Free</button>
      <button class="px-6 py-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-200">View Live Demo</button>
    </div>
  </div>
</body>
</html>`
      });
    }, 700);
  };

  // Simulate Pro License Purchase
  const handleSimulatePurchase = (plan: any) => {
    setSelectedPlan(plan);
    setIsCheckoutOpen(true);
    sounds.playSoftClick();
  };

  const handleConfirmCheckout = () => {
    setIsPurchasing(true);
    sounds.playSoftClick();

    setTimeout(() => {
      const license = 'NEXUS-PRO-' + Math.random().toString(36).substring(2, 8).toUpperCase() + '-VIP';
      setPurchasedLicense(license);
      setIsPurchasing(false);
      sounds.playLuxuryChime();
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 }
      });
    }, 900);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto font-sans">
      
      {/* Top Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#070d18] via-slate-950 to-[#120f04] border border-amber-500/40 p-6 md:p-8 shadow-2xl">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-10 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 font-bold tracking-wide">
                <DollarSign className="w-3.5 h-3.5 text-amber-400" />
                <span>MONETIZATION SUITE & AI EMPOWERMENT HUB</span>
              </span>
              <span className="text-slate-500">·</span>
              <span className="text-emerald-400 font-mono text-[11px] font-semibold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>Google AdSense & High-Ticket AI Tools</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              {isBn 
                ? 'ওয়েবসাইট থেকে আয় পূর্বাভাস ও পূর্ণাঙ্গ এআই প্রোডাক্ট স্যুট' 
                : 'Ad Revenue Forecast & All-In-One AI Production Suite'}
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              {isBn
                ? 'গুগল অ্যাডসেন্স রেভিনিউ ক্যালকুলেট করুন, ১২ মাসের আয়ের প্রবৃদ্ধি দেখুন এবং আমাদের এআই দিয়ে ভিডিও তৈরি, ওয়েবসাইট মেকিং ও প্রফেশনাল ডিজিটাল প্রোডাক্ট বিক্রি করুন।'
                : 'Project Google AdSense earnings based on traffic volume and niche CTR. Access high-ticket AI Video Editors, Instant Website Creators, and commercial tools.'}
            </p>
          </div>

          {/* Quick Currency & Metric Switcher */}
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3 min-w-[240px] shrink-0 shadow-xl">
            <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
              <span>Display Currency:</span>
              <div className="bg-slate-900 p-0.5 rounded-lg border border-slate-700 flex items-center">
                <button
                  onClick={() => setCurrency('USD')}
                  className={`px-2.5 py-1 rounded text-xs font-bold transition ${
                    currency === 'USD' ? 'bg-amber-500 text-slate-950 shadow' : 'text-slate-400'
                  }`}
                >
                  USD ($)
                </button>
                <button
                  onClick={() => setCurrency('BDT')}
                  className={`px-2.5 py-1 rounded text-xs font-bold transition ${
                    currency === 'BDT' ? 'bg-amber-500 text-slate-950 shadow' : 'text-slate-400'
                  }`}
                >
                  BDT (৳)
                </button>
              </div>
            </div>

            <div className="pt-1 border-t border-slate-800">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                {isBn ? 'আনুমানিক বার্ষিক আয়:' : 'Projected Annual Revenue:'}
              </span>
              <div className="text-2xl font-black text-amber-400 font-mono mt-0.5">
                {formatMoney(annualProjectedUsd)}
              </div>
              <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                <ArrowUpRight className="w-3 h-3" />
                <span>AdSense + Affiliates + Deals</span>
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* Sub-Tab Navigation Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {[
          { id: 'calculator', label: isBn ? '📊 অ্যাডসেন্স আয় ক্যালকুলেটর ও ১২ মাসের পূর্বাভাস' : '📊 AdSense Revenue Forecast & Growth Chart', icon: BarChart3 },
          { id: 'video-ai', label: isBn ? '🎬 এআই ভিডিও এডিটর ও স্ক্রিপ্ট স্টুডিও' : '🎬 AI Video Editor & Reel Studio', icon: Clapperboard },
          { id: 'site-builder', label: isBn ? '🌐 এআই ওয়েবসাইট বিল্ডার ও কোডার' : '🌐 AI Full-Stack Website Builder', icon: Globe },
          { id: 'marketplace', label: isBn ? '💎 প্রিমিয়াম এআই প্রোডাক্ট ও লাইসেন্স' : '💎 High-Ticket AI Tools & Pro Licenses', icon: ShoppingCart },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveSubTab(tab.id as any);
                sounds.playSoftClick();
              }}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 border ${
                isActive
                  ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-lg shadow-amber-500/20 font-black'
                  : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* SUB-TAB 1: Ad Revenue Calculator & Growth Forecast */}
      {activeSubTab === 'calculator' && (
        <div className="space-y-6">
          
          {/* Sliders and Configuration Grid */}
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 shadow-xl space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-amber-400" />
                  <span>{isBn ? 'ট্র্যাফিক ও সিটিআর ভিত্তিক রেভিনিউ প্রজেকশন' : 'Traffic Volume & Niche CTR Monetization Engine'}</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  {isBn 
                    ? 'আপনার ওয়েবসাইটের ক্যাটাগরি, ভিজিটর সংখ্যা এবং গুগল সার্চে ক্লিক রেট অনুযায়ী আয়ের হিসাব।' 
                    : 'Calculate projected income based on industry RPM, CTR percentages, and geographic tiers.'}
                </p>
              </div>

              {/* Geo Tier Filter */}
              <div className="flex items-center gap-1.5 text-xs bg-slate-950 p-1 rounded-xl border border-slate-800">
                <button
                  onClick={() => setGeoTier('tier1')}
                  className={`px-3 py-1 rounded-lg font-semibold transition ${
                    geoTier === 'tier1' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Tier 1 (US/UK/CA)
                </button>
                <button
                  onClick={() => setGeoTier('tier2')}
                  className={`px-3 py-1 rounded-lg font-semibold transition ${
                    geoTier === 'tier2' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Tier 2 (EU/Asia)
                </button>
                <button
                  onClick={() => setGeoTier('global')}
                  className={`px-3 py-1 rounded-lg font-semibold transition ${
                    geoTier === 'global' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Global
                </button>
              </div>
            </div>

            {/* Niche Selector Cards */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 block uppercase tracking-wider">
                {isBn ? '১. ওয়েবসাইটের নিস / ক্যাটাগরি নির্বাচন করুন:' : '1. Select Website Niche / Category:'}
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
                {NICHES.map((niche) => {
                  const isSelected = selectedNicheId === niche.id;
                  return (
                    <button
                      key={niche.id}
                      onClick={() => {
                        setSelectedNicheId(niche.id);
                        setCustomCtr(niche.defaultCtr);
                        sounds.playSoftClick();
                      }}
                      className={`p-3 rounded-xl border text-left transition flex flex-col justify-between space-y-1.5 ${
                        isSelected 
                          ? 'bg-amber-500/10 border-amber-500 text-white shadow-lg shadow-amber-500/10' 
                          : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300'
                      }`}
                    >
                      <span className="text-xl">{niche.icon}</span>
                      <div className="space-y-0.5">
                        <span className="text-xs font-bold block leading-tight">{isBn ? niche.nameBn : niche.name}</span>
                        <span className="text-[10px] text-amber-400 font-mono font-bold block">${niche.baseRpm} RPM</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Dual Sliders: Traffic & CTR */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              
              {/* Traffic Volume Slider */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white flex items-center gap-1.5">
                    <Globe className="w-4 h-4 text-blue-400" />
                    <span>{isBn ? 'মাসিক সার্চ ভিজিটর / পেজভিউ:' : 'Monthly Traffic Volume (Visitors):'}</span>
                  </span>
                  <span className="font-mono text-sm font-black text-blue-400 bg-blue-500/10 border border-blue-500/30 px-3 py-0.5 rounded-lg">
                    {monthlyTraffic.toLocaleString()} {isBn ? 'ভিজিটর' : 'visits'}
                  </span>
                </div>

                <input
                  type="range"
                  min={5000}
                  max={500000}
                  step={5000}
                  value={monthlyTraffic}
                  onChange={(e) => setMonthlyTraffic(parseInt(e.target.value, 10))}
                  className="w-full accent-blue-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
                />

                <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
                  <span>5,000 (Launch)</span>
                  <span>100,000 (Established)</span>
                  <span>500,000+ (High Traffic)</span>
                </div>
              </div>

              {/* Niche CTR Slider */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                    <span>{isBn ? 'নিস ক্লিক থ্রু রেট (CTR %):' : 'Niche Ad Click-Through (CTR %):'}</span>
                  </span>
                  <span className="font-mono text-sm font-black text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-0.5 rounded-lg">
                    {customCtr.toFixed(1)}% CTR
                  </span>
                </div>

                <input
                  type="range"
                  min={1.0}
                  max={8.0}
                  step={0.1}
                  value={customCtr}
                  onChange={(e) => setCustomCtr(parseFloat(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
                />

                <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
                  <span>1.0% (Average)</span>
                  <span>4.0% (Optimized Meta)</span>
                  <span>8.0% (Top Placement)</span>
                </div>
              </div>

            </div>

            {/* 3 Executive Calculated Revenue Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  {isBn ? '১. গুগল অ্যাডসেন্স আয় (মাসিক)' : '1. AdSense Ad Earnings (Mo)'}
                </span>
                <div className="text-2xl sm:text-3xl font-black text-white font-mono">
                  {formatMoney(monthlyAdSenseUsd)}
                </div>
                <span className="text-[11px] text-amber-400 font-mono">
                  Effective RPM: ${effectiveRpm} / 1K views
                </span>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  {isBn ? '২. অ্যাফিলিয়েট ও স্পনসরশিপ' : '2. Affiliate & Brand Deals'}
                </span>
                <div className="text-2xl sm:text-3xl font-black text-cyan-400 font-mono">
                  {formatMoney(monthlyAffiliateUsd + monthlySponsorshipUsd)}
                </div>
                <span className="text-[11px] text-slate-400">
                  Direct conversions & partnerships
                </span>
              </div>

              <div className="bg-gradient-to-br from-amber-500/10 to-slate-950 p-4 rounded-xl border border-amber-500/40 space-y-1">
                <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider block">
                  {isBn ? '🔥 সর্বমোট মাসিক আয়' : '🔥 Total Monthly Earnings'}
                </span>
                <div className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">
                  {formatMoney(totalMonthlyIncomeUsd)}
                </div>
                <span className="text-[11px] text-emerald-400 font-bold font-mono">
                  Annualized: {formatMoney(annualProjectedUsd)}
                </span>
              </div>

            </div>

          </div>

          {/* RECHARTS GROWTH FORECAST CHART */}
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 shadow-xl space-y-4">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-amber-400" />
                  <span>{isBn ? '১২ মাসের কম্পাউন্ডিং রেভিনিউ প্রবৃদ্ধি চার্ট' : '12-Month Compounding Revenue Growth Forecast'}</span>
                </h4>
                <p className="text-xs text-slate-400">
                  {isBn 
                    ? 'গুগল সার্চে অর্গানিক ট্র্যাফিক বৃদ্ধির সাথে সাথে মাসিক আয়ের ঊর্ধ্বমুখী প্রজেকশন।' 
                    : 'Visualizing ad revenue, affiliate income, and direct brand sponsorship compounding over 12 months.'}
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-3 py-1.5 rounded-xl">
                <span>+16% MoM Compounding</span>
              </div>
            </div>

            {/* Recharts Area Chart */}
            <div className="h-80 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={forecastData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorAdSense" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorAff" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis dataKey="month" stroke="#64748b" fontSize={11} tickLine={false} />
                  <YAxis 
                    stroke="#64748b" 
                    fontSize={11} 
                    tickLine={false} 
                    tickFormatter={(val) => currency === 'BDT' ? `৳${(val/1000).toFixed(0)}k` : `$${(val/1000).toFixed(0)}k`} 
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#030712', 
                      borderColor: '#334155', 
                      borderRadius: '12px', 
                      fontSize: '12px',
                      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)'
                    }} 
                    formatter={(val: any) => [
                      currency === 'BDT' ? `৳${Number(val).toLocaleString()}` : `$${Number(val).toLocaleString()}`,
                      ''
                    ]}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                  <Area 
                    type="monotone" 
                    dataKey="totalRevenue" 
                    name={isBn ? 'সর্বমোট আয় (Total Revenue)' : 'Total Projected Income'} 
                    stroke="#f59e0b" 
                    strokeWidth={3} 
                    fillOpacity={1} 
                    fill="url(#colorTotal)" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="adSense" 
                    name={isBn ? 'গুগল অ্যাডসেন্স (AdSense)' : 'Google AdSense'} 
                    stroke="#3b82f6" 
                    strokeWidth={2} 
                    fillOpacity={1} 
                    fill="url(#colorAdSense)" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="affiliate" 
                    name={isBn ? 'অ্যাফিলিয়েট কমিশন' : 'Affiliate Referrals'} 
                    stroke="#10b981" 
                    strokeWidth={2} 
                    fillOpacity={1} 
                    fill="url(#colorAff)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Milestones bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-800 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                <span><strong>Month 3 Milestone:</strong> $1,000+ First Consistent Income</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span><strong>Month 6 Milestone:</strong> $4,500+ Full-Time Living</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                <span><strong>Month 12 Milestone:</strong> $12,000+ Scaled SaaS Entity</span>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* SUB-TAB 2: AI Video Creator & Reel Studio */}
      {activeSubTab === 'video-ai' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 shadow-xl space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  <Clapperboard className="w-5 h-5 text-indigo-400" />
                  <span>{isBn ? 'এআই ভিডিও এডিটর, রিল ও স্টোরিবোর্ড ক্রিয়েটর' : 'Autonomous AI Video Editor & Viral Reel Studio'}</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  {isBn 
                    ? 'ইউটিউব শর্টস, টিকটক এবং ফেসবুক রিলের জন্য স্বয়ংক্রিয় স্ক্রিপ্ট, সিন ডিরেকশন ও ভয়েসওভার তৈরি করুন।' 
                    : 'Generate complete viral video scripts with hook lines, B-roll cues, subtitles, and conversion CTAs.'}
                </p>
              </div>

              {/* Format Filter */}
              <div className="flex items-center gap-1.5 text-xs bg-slate-950 p-1 rounded-xl border border-slate-800">
                <button
                  onClick={() => setVideoFormat('shorts')}
                  className={`px-3 py-1 rounded-lg font-semibold transition ${
                    videoFormat === 'shorts' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Shorts / Reels (9:16)
                </button>
                <button
                  onClick={() => setVideoFormat('youtube')}
                  className={`px-3 py-1 rounded-lg font-semibold transition ${
                    videoFormat === 'youtube' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  YouTube (16:9)
                </button>
              </div>
            </div>

            {/* Input Bar */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 block">
                {isBn ? 'ভিডিওর বিষয়বস্তু বা প্রম্পট লিখুন:' : 'Video Topic or Concept Prompt:'}
              </label>
              <div className="flex flex-col sm:flex-row items-center gap-2">
                <input
                  type="text"
                  value={videoPrompt}
                  onChange={(e) => setVideoPrompt(e.target.value)}
                  placeholder="e.g. 5 secrets to rank #1 on Google in 2026..."
                  className="flex-1 w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
                />
                <button
                  onClick={handleGenerateVideoScript}
                  disabled={isGeneratingVideo || !videoPrompt.trim()}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition active:scale-95 disabled:opacity-50 shrink-0"
                >
                  <Clapperboard className={`w-4 h-4 ${isGeneratingVideo ? 'animate-spin text-amber-300' : 'text-amber-300'}`} />
                  <span>
                    {isGeneratingVideo 
                      ? (isBn ? 'ভিডিও তৈরি হচ্ছে...' : 'Synthesizing Video Script...') 
                      : (isBn ? 'ভিডিও স্ক্রিপ্ট তৈরি করুন' : 'Generate Video Storyboard')}
                  </span>
                </button>
              </div>
            </div>

            {/* Generated Script Display */}
            {generatedVideoScript ? (
              <div className="space-y-4 pt-4 border-t border-slate-800 animate-fade-in">
                
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">
                    Viral Opening Hook (First 3 Seconds):
                  </span>
                  <div className="text-sm font-bold text-white bg-slate-900 p-3 rounded-lg border border-slate-800 text-amber-200">
                    "{generatedVideoScript.hook}"
                  </div>
                </div>

                <div className="space-y-3">
                  <span className="text-xs font-bold text-slate-300 block uppercase tracking-wider">
                    Scene-by-Scene Visual & Audio Timeline:
                  </span>

                  <div className="grid grid-cols-1 gap-3">
                    {generatedVideoScript.scenes.map((scene, idx) => (
                      <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
                        <div className="flex items-center justify-between text-[11px] font-mono border-b border-slate-900 pb-1.5">
                          <span className="text-indigo-400 font-bold">Scene {idx + 1} ({scene.time})</span>
                          <span className="text-slate-500">B-Roll: {scene.broll}</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                          <div>
                            <span className="text-slate-400 font-bold block mb-0.5">👁️ Visual Direction:</span>
                            <p className="text-slate-200">{scene.visual}</p>
                          </div>
                          <div>
                            <span className="text-slate-400 font-bold block mb-0.5">🎙️ Voiceover Narration:</span>
                            <p className="text-emerald-300 font-medium font-sans">"{scene.audio}"</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block">
                    Call To Action (Outro):
                  </span>
                  <div className="text-xs text-slate-200 font-medium">
                    {generatedVideoScript.cta}
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    onClick={() => copyText(JSON.stringify(generatedVideoScript, null, 2), 'videoJson')}
                    className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-bold flex items-center gap-1.5"
                  >
                    {copiedId === 'videoJson' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedId === 'videoJson' ? 'Copied' : 'Copy Script JSON'}</span>
                  </button>
                  <button
                    onClick={() => downloadFile('video-storyboard-script.txt', `HOOK:\n${generatedVideoScript.hook}\n\nSCENES:\n${generatedVideoScript.scenes.map(s => `${s.time}\nVisual: ${s.visual}\nAudio: ${s.audio}`).join('\n\n')}\n\nCTA:\n${generatedVideoScript.cta}`, 'text/plain')}
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 shadow"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Script .TXT</span>
                  </button>
                </div>

              </div>
            ) : (
              <div className="p-8 text-center bg-slate-950/60 rounded-xl border border-dashed border-slate-800 space-y-2">
                <Clapperboard className="w-8 h-8 text-slate-600 mx-auto" />
                <p className="text-xs text-slate-400">
                  {isBn 
                    ? 'উপরের বক্সে বিষয় লিখে "ভিডিও স্ক্রিপ্ট তৈরি করুন" বাটনে চাপুন।' 
                    : 'Enter any video concept above and click "Generate Video Storyboard".'}
                </p>
              </div>
            )}

          </div>
        </div>
      )}

      {/* SUB-TAB 3: AI Full-Stack Website Builder */}
      {activeSubTab === 'site-builder' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 shadow-xl space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  <Globe className="w-5 h-5 text-blue-400" />
                  <span>{isBn ? 'স্বয়ংক্রিয় এআই ওয়েবসাইট বিল্ডার ও কোড জেনারেটর' : 'Autonomous AI Website Builder & Code Synthesizer'}</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  {isBn 
                    ? 'যেকোনো আইডিয়া লিখে ৩০ সেকেন্ডে পূর্ণাঙ্গ রেসপনসিভ ওয়েবসাইট এবং গুগল ক্লাউড রেডি কোড তৈরি করুন।' 
                    : 'Prompt-to-production website with responsive Tailwind layouts, SEO tags, and clean HTML/React code.'}
                </p>
              </div>
            </div>

            {/* Prompt input */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 block">
                {isBn ? 'কেমন ওয়েবসাইট তৈরি করতে চান? আইডিয়া লিখুন:' : 'Describe the website you want to create:'}
              </label>
              <div className="flex flex-col sm:flex-row items-center gap-2">
                <input
                  type="text"
                  value={sitePrompt}
                  onChange={(e) => setSitePrompt(e.target.value)}
                  placeholder="e.g. Modern AI SaaS landing page with dark theme..."
                  className="flex-1 w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
                />
                <button
                  onClick={handleGenerateSite}
                  disabled={isGeneratingSite || !sitePrompt.trim()}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition active:scale-95 disabled:opacity-50 shrink-0"
                >
                  <Globe className={`w-4 h-4 ${isGeneratingSite ? 'animate-spin text-amber-300' : 'text-amber-300'}`} />
                  <span>
                    {isGeneratingSite 
                      ? (isBn ? 'ওয়েবসাইট তৈরি হচ্ছে...' : 'Synthesizing Full Website...') 
                      : (isBn ? 'ওয়েবসাইট তৈরি করুন' : 'Generate Full-Stack Website')}
                  </span>
                </button>
              </div>
            </div>

            {/* Generated Website Code & Preview */}
            {generatedSiteSnippet ? (
              <div className="space-y-4 pt-4 border-t border-slate-800 animate-fade-in">
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div>
                    <span className="text-sm font-bold text-white block">{generatedSiteSnippet.title}</span>
                    <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono mt-0.5">
                      <span>✓ 100% Mobile Responsive</span>
                      <span>·</span>
                      <span>✓ Googlebot SEO Head Injected</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => copyText(generatedSiteSnippet.previewHtml, 'siteHtml')}
                      className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-bold flex items-center gap-1.5"
                    >
                      {copiedId === 'siteHtml' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedId === 'siteHtml' ? 'Copied' : 'Copy HTML'}</span>
                    </button>
                    <button
                      onClick={() => downloadFile('index.html', generatedSiteSnippet.previewHtml, 'text/html')}
                      className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 shadow"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download index.html</span>
                    </button>
                  </div>
                </div>

                {/* Live Frame Preview */}
                <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
                  <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                      <span className="font-mono text-[11px] ml-2 text-slate-300">Live Browser Preview</span>
                    </div>
                    <span className="text-[11px] font-mono text-emerald-400">https://your-domain.web.app</span>
                  </div>

                  <div className="p-6 bg-slate-950">
                    <div className="max-w-2xl mx-auto space-y-4 text-center py-8">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold border border-blue-500/40">
                        ⚡ AI GENERATED LANDING PAGE
                      </span>
                      <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">{generatedSiteSnippet.title}</h2>
                      <p className="text-slate-300 text-sm max-w-lg mx-auto">
                        Engineered with clean semantic tags, high conversion layouts, and sub-second Core Web Vitals speed.
                      </p>
                      <div className="pt-2 flex justify-center gap-3">
                        <button className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30">
                          Get Started Today
                        </button>
                        <button className="px-6 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 font-bold text-xs">
                          Explore Features
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            ) : (
              <div className="p-8 text-center bg-slate-950/60 rounded-xl border border-dashed border-slate-800 space-y-2">
                <Globe className="w-8 h-8 text-slate-600 mx-auto" />
                <p className="text-xs text-slate-400">
                  {isBn 
                    ? 'উপরের বক্সে ওয়েবসাইটের আইডিয়া লিখে "ওয়েবসাইট তৈরি করুন" বাটনে চাপুন।' 
                    : 'Describe any website concept above to synthesize code and live previews.'}
                </p>
              </div>
            )}

          </div>
        </div>
      )}

      {/* SUB-TAB 4: High-Ticket AI Tools & Pro Licenses Marketplace */}
      {activeSubTab === 'marketplace' && (
        <div className="space-y-6">
          
          <div className="bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-950 p-6 md:p-8 rounded-2xl border border-amber-500/30 space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs text-amber-300 font-bold mb-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{isBn ? 'দামী দামী এআই টুলস ও প্রো লাইসেন্স হাব' : 'Commercial High-Ticket AI Suite & Licenses'}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  {isBn 
                    ? 'মানুষের প্রয়োজনীয় সব এআই টুলস এবং প্রিমিয়াম মেম্বারশিপ' 
                    : 'Commercial AI Toolkits & Agency License Marketplace'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                  {isBn
                    ? 'আপনার ওয়েবসাইট থেকে যেসকল মূল্যবান এআই টুল মানুষ কিনতে পারবে এবং আপনি সরাসরি পেমেন্ট পাবেন।'
                    : 'High-margin commercial AI packages available for client purchase with instant license delivery.'}
                </p>
              </div>
            </div>

            {/* 3 Tiered Commercial Products */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Plan 1 */}
              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-5 flex flex-col justify-between hover:border-blue-500/40 transition">
                <div className="space-y-3">
                  <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block">Starter Creator</span>
                  <div className="text-3xl font-black text-white font-mono">
                    {formatMoney(29)} <span className="text-xs font-normal text-slate-400">/ mo</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {isBn ? 'নতুন কন্টেন্ট ক্রিয়েটর ও ফ্রিল্যান্সারদের জন্য আদর্শ।' : 'Ideal for solo creators and emerging bloggers.'}
                  </p>
                  <ul className="text-xs text-slate-300 space-y-2 pt-2 border-t border-slate-900">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>50 AI SEO Articles / Month</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>30 Viral Video Scripts & Storyboards</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Google Search Console Fast Indexing</span>
                    </li>
                  </ul>
                </div>

                <button
                  onClick={() => handleSimulatePurchase({
                    id: 'starter',
                    title: 'Starter Creator Plan',
                    priceUsd: 29,
                    billing: 'Monthly Subscription',
                    features: ['50 AI Articles', '30 Video Scripts', 'Fast Google Indexing']
                  })}
                  className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs border border-slate-700 transition"
                >
                  {isBn ? 'প্ল্যানটি কিনুন' : 'Select Starter'}
                </button>
              </div>

              {/* Plan 2: Best Value */}
              <div className="bg-gradient-to-b from-amber-950/40 via-slate-950 to-slate-950 p-6 rounded-2xl border-2 border-amber-500 space-y-5 flex flex-col justify-between relative shadow-xl">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-slate-950 font-black text-[10px] uppercase px-3 py-0.5 rounded-full tracking-wider shadow">
                  MOST POPULAR & HIGHEST VALUE
                </div>

                <div className="space-y-3">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">Pro Agency & Studio</span>
                  <div className="text-3xl font-black text-amber-400 font-mono">
                    {formatMoney(99)} <span className="text-xs font-normal text-slate-400">/ mo</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {isBn ? 'এজেন্সি, বড় প্রতিষ্ঠান এবং সফটওয়্যার টিমের জন্য।' : 'Full enterprise access for marketing agencies and web teams.'}
                  </p>
                  <ul className="text-xs text-slate-200 space-y-2 pt-2 border-t border-slate-900">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-amber-400 shrink-0" />
                      <span><strong>Unlimited</strong> AI Website Building</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-amber-400 shrink-0" />
                      <span><strong>Unlimited</strong> Video Shorts & Long-Form Articles</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>Autonomous Backlink Pitch Outreach Agent</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>White-Label Client PDF Audit Reports</span>
                    </li>
                  </ul>
                </div>

                <button
                  onClick={() => handleSimulatePurchase({
                    id: 'agency',
                    title: 'Pro Agency & Studio Plan',
                    priceUsd: 99,
                    billing: 'Monthly Subscription',
                    features: ['Unlimited Websites', 'Unlimited Video Scripts', 'Backlink Outreach Agent', 'White-Label Reports']
                  })}
                  className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/25 transition active:scale-95"
                >
                  {isBn ? '🔥 প্রো এজেন্সি প্ল্যান কিনুন' : '🔥 Activate Pro Agency'}
                </button>
              </div>

              {/* Plan 3: Lifetime VIP */}
              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-5 flex flex-col justify-between hover:border-purple-500/40 transition">
                <div className="space-y-3">
                  <span className="text-xs font-bold text-purple-400 uppercase tracking-wider block">Lifetime VIP Access</span>
                  <div className="text-3xl font-black text-purple-300 font-mono">
                    {formatMoney(299)} <span className="text-xs font-normal text-slate-400">one-time</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {isBn ? 'এককালীন ফি দিয়ে আজীবন সব এআই টুলের অ্যাক্সেস।' : 'One-time payment for perpetual access to all future AI tools.'}
                  </p>
                  <ul className="text-xs text-slate-300 space-y-2 pt-2 border-t border-slate-900">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-purple-400 shrink-0" />
                      <span>Perpetual Access to all New AI Models</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-purple-400 shrink-0" />
                      <span>Private API Key & Priority Indexing</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-purple-400 shrink-0" />
                      <span>24/7 Dedicated Cloud Engineering SLA</span>
                    </li>
                  </ul>
                </div>

                <button
                  onClick={() => handleSimulatePurchase({
                    id: 'lifetime',
                    title: 'Lifetime VIP License',
                    priceUsd: 299,
                    billing: 'One-Time Payment',
                    features: ['Perpetual AI Model Access', 'Private API Key', '24/7 SLA Priority']
                  })}
                  className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition shadow"
                >
                  {isBn ? 'আজীবন লাইসেন্স নিন' : 'Claim Lifetime VIP'}
                </button>
              </div>

            </div>

          </div>

        </div>
      )}

      {/* CHECKOUT MODAL SIMULATION */}
      {isCheckoutOpen && selectedPlan && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl relative">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-amber-400" />
                <span className="font-bold text-white text-sm">Nexus Secure Checkout</span>
              </div>
              <button
                onClick={() => {
                  setIsCheckoutOpen(false);
                  setPurchasedLicense(null);
                }}
                className="text-slate-400 hover:text-white text-xs px-2 py-1 rounded bg-slate-800"
              >
                ✕ Close
              </button>
            </div>

            {!purchasedLicense ? (
              <div className="space-y-4">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">Selected Package:</span>
                  <div className="text-base font-bold text-white">{selectedPlan.title}</div>
                  <div className="text-xl font-black text-emerald-400 font-mono">
                    {formatMoney(selectedPlan.priceUsd)} <span className="text-xs text-slate-400 font-normal">({selectedPlan.billing})</span>
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <span className="text-slate-400 font-semibold block">Accepted Payment Methods:</span>
                  <div className="grid grid-cols-4 gap-2 text-center">
                    <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 font-bold text-[11px] text-blue-400">
                      Stripe
                    </div>
                    <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 font-bold text-[11px] text-amber-400">
                      Visa / MC
                    </div>
                    <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 font-bold text-[11px] text-pink-400">
                      bKash
                    </div>
                    <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 font-bold text-[11px] text-orange-400">
                      Nagad
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleConfirmCheckout}
                  disabled={isPurchasing}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-emerald-500 hover:from-amber-400 hover:to-emerald-400 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-xl shadow-amber-500/20 transition active:scale-95 disabled:opacity-50"
                >
                  <Lock className={`w-4 h-4 ${isPurchasing ? 'animate-spin' : ''}`} />
                  <span>{isPurchasing ? 'Processing Payment & Activating License...' : `Confirm & Pay ${formatMoney(selectedPlan.priceUsd)}`}</span>
                </button>
              </div>
            ) : (
              <div className="space-y-4 text-center py-2 animate-fade-in">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-white">Payment Confirmed & License Activated!</h4>
                  <p className="text-xs text-slate-400">Your commercial enterprise access key has been generated.</p>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-xs text-amber-300 select-all">
                  {purchasedLicense}
                </div>

                <button
                  onClick={() => {
                    setIsCheckoutOpen(false);
                    setPurchasedLicense(null);
                  }}
                  className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs"
                >
                  Close & Open Dashboard
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
