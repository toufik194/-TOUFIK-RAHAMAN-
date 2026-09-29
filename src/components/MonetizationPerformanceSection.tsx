import React, { useState } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  BarChart3, 
  ArrowUpRight, 
  CheckCircle2, 
  Zap, 
  Flame, 
  ShieldCheck, 
  Eye, 
  Percent, 
  Download, 
  RefreshCw, 
  Sliders, 
  Calendar,
  Sparkles,
  CreditCard,
  Lock,
  Globe,
  Radio
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  ComposedChart, 
  Area, 
  Bar, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  Legend 
} from 'recharts';
import confetti from 'canvas-confetti';
import { sounds } from '../utils/soundEffects';
import { Language, WebsiteProject } from '../types';

interface MonetizationPerformanceSectionProps {
  language: Language;
  timeRange: '7d' | '28d' | '3m' | '1y';
  projectName: string;
}

export const MonetizationPerformanceSection: React.FC<MonetizationPerformanceSectionProps> = ({
  language,
  timeRange,
  projectName,
}) => {
  const isBn = language === 'bn';

  const [activeMetricFilter, setActiveMetricFilter] = useState<'all' | 'revenue' | 'impressions' | 'ecpm'>('all');
  const [currency, setCurrency] = useState<'USD' | 'BDT'>('USD');
  const usdToBdtRate = 122.5;

  // Real-time boost simulation state
  const [bonusRevenue, setBonusRevenue] = useState(0);
  const [bonusImpressions, setBonusImpressions] = useState(0);

  // Time-range adaptive monetization telemetry dataset
  const generateMonetizationData = () => {
    if (timeRange === '7d') {
      return [
        { date: isBn ? 'সোম' : 'Mon', revenue: 68.4 + bonusRevenue * 0.1, impressions: 21400 + bonusImpressions * 0.1, ecpm: 3.20, fillRate: 99.1, clicks: 390, topZone: 'Bottom 600px Unit' },
        { date: isBn ? 'মঙ্গল' : 'Tue', revenue: 79.2 + bonusRevenue * 0.12, impressions: 23800 + bonusImpressions * 0.12, ecpm: 3.32, fillRate: 99.3, clicks: 430, topZone: 'Bottom 600px Unit' },
        { date: isBn ? 'বুধ' : 'Wed', revenue: 98.6 + bonusRevenue * 0.18, impressions: 28900 + bonusImpressions * 0.18, ecpm: 3.41, fillRate: 99.5, clicks: 540, topZone: 'Bottom 600px Unit' },
        { date: isBn ? 'বৃহঃ' : 'Thu', revenue: 114.5 + bonusRevenue * 0.16, impressions: 32600 + bonusImpressions * 0.16, ecpm: 3.51, fillRate: 99.4, clicks: 610, topZone: 'Bottom 600px Unit' },
        { date: isBn ? 'শুক্র' : 'Fri', revenue: 142.8 + bonusRevenue * 0.22, impressions: 39400 + bonusImpressions * 0.22, ecpm: 3.62, fillRate: 99.7, clicks: 760, topZone: 'Bottom 600px Unit' },
        { date: isBn ? 'শনি' : 'Sat', revenue: 165.2 + bonusRevenue * 0.20, impressions: 46200 + bonusImpressions * 0.20, ecpm: 3.58, fillRate: 99.6, clicks: 840, topZone: 'Bottom 600px Unit' },
        { date: isBn ? 'রবি' : 'Sun', revenue: 184.0 + bonusRevenue * 0.24, impressions: 51900 + bonusImpressions * 0.24, ecpm: 3.54, fillRate: 99.8, clicks: 920, topZone: 'Bottom 600px Unit' },
      ];
    }
    if (timeRange === '3m') {
      return [
        { date: isBn ? 'জুলাই ১' : 'Jul 1', revenue: 320.0, impressions: 98000, ecpm: 3.26, fillRate: 98.8, clicks: 1820, topZone: 'Bottom 600px Unit' },
        { date: isBn ? 'জুলাই ১৫' : 'Jul 15', revenue: 480.5, impressions: 142000, ecpm: 3.38, fillRate: 99.1, clicks: 2680, topZone: 'Bottom 600px Unit' },
        { date: isBn ? 'আগস্ট ১' : 'Aug 1', revenue: 690.2, impressions: 198000, ecpm: 3.48, fillRate: 99.4, clicks: 3750, topZone: 'Bottom 600px Unit' },
        { date: isBn ? 'আগস্ট ১৫' : 'Aug 15', revenue: 890.4, impressions: 249000, ecpm: 3.57, fillRate: 99.5, clicks: 4890, topZone: 'Bottom 600px Unit' },
        { date: isBn ? 'সেপ্টেম্বর ১' : 'Sep 1', revenue: 1180.0, impressions: 324000, ecpm: 3.64, fillRate: 99.7, clicks: 6150, topZone: 'Bottom 600px Unit' },
        { date: isBn ? 'সেপ্টেম্বর ১৫' : 'Sep 15', revenue: 1490.5, impressions: 405000, ecpm: 3.68, fillRate: 99.8, clicks: 7920, topZone: 'Bottom 600px Unit' },
        { date: isBn ? 'সেপ্টেম্বর ২৬' : 'Sep 26', revenue: 1840.8, impressions: 498000, ecpm: 3.70, fillRate: 99.9, clicks: 9840, topZone: 'Bottom 600px Unit' },
      ];
    }
    // Default 28 days
    return [
      { date: isBn ? 'সপ্তাহ ১' : 'Week 1', revenue: 420.5 + bonusRevenue * 0.2, impressions: 124000 + bonusImpressions * 0.2, ecpm: 3.39, fillRate: 99.2, clicks: 2420, topZone: 'Bottom 600px Unit' },
      { date: isBn ? 'সপ্তাহ ২' : 'Week 2', revenue: 640.8 + bonusRevenue * 0.25, impressions: 182000 + bonusImpressions * 0.25, ecpm: 3.52, fillRate: 99.4, clicks: 3610, topZone: 'Bottom 600px Unit' },
      { date: isBn ? 'সপ্তাহ ৩' : 'Week 3', revenue: 890.2 + bonusRevenue * 0.27, impressions: 248000 + bonusImpressions * 0.27, ecpm: 3.59, fillRate: 99.6, clicks: 4980, topZone: 'Bottom 600px Unit' },
      { date: isBn ? 'সপ্তাহ ৪' : 'Week 4', revenue: 1240.6 + bonusRevenue * 0.28, impressions: 341000 + bonusImpressions * 0.28, ecpm: 3.64, fillRate: 99.8, clicks: 6850, topZone: 'Bottom 600px Unit' },
    ];
  };

  const monetizationData = generateMonetizationData();

  const totalRawRevenue = monetizationData.reduce((acc, d) => acc + d.revenue, 0);
  const totalImpressions = monetizationData.reduce((acc, d) => acc + d.impressions, 0);
  const avgEcpm = +((totalRawRevenue / (totalImpressions / 1000))).toFixed(2);

  const formatMoney = (amount: number) => {
    if (currency === 'BDT') {
      const bdt = amount * usdToBdtRate;
      return `৳${bdt.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
    }
    return `$${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const handleSimulateSurge = () => {
    setBonusRevenue((prev) => prev + 55);
    setBonusImpressions((prev) => prev + 14200);
    sounds.playLuxuryChime();
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  // Custom Interactive Tooltip with Granular Monetization Telemetry
  const CustomMonetizationTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const point = payload[0].payload;
      return (
        <div className="bg-slate-950/95 border border-emerald-500/50 p-4 rounded-2xl shadow-2xl backdrop-blur-xl text-xs space-y-3 font-sans min-w-[290px] max-w-[340px] relative overflow-hidden animate-fade-in ring-1 ring-white/10 z-50">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-400" />
          
          <div className="flex items-center justify-between gap-3 pb-2 border-b border-slate-800">
            <span className="font-mono font-bold text-white text-sm flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-emerald-400" />
              <span>{label}</span>
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>VERIFIED AD REVENUE</span>
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-0.5">
              <span className="text-[10px] text-slate-400 font-mono block">
                {isBn ? 'দৈনিক রেভিনিউ:' : 'Daily Revenue:'}
              </span>
              <div className="text-base font-black text-emerald-400 font-mono">
                {formatMoney(point.revenue)}
              </div>
              <span className="text-[10px] text-emerald-300 font-mono">+32.4% MoM</span>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-0.5">
              <span className="text-[10px] text-slate-400 font-mono block">
                {isBn ? 'বিজ্ঞাপন ইমপ্রেশন:' : 'Ad Impressions:'}
              </span>
              <div className="text-base font-black text-purple-400 font-mono">
                {point.impressions.toLocaleString()}
              </div>
              <span className="text-[10px] text-purple-300 font-mono">eCPM: ${point.ecpm}</span>
            </div>
          </div>

          {/* Granular Monetization Breakdown */}
          <div className="p-2.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30 space-y-1.5 text-[11px]">
            <span className="text-[10px] font-mono text-emerald-300 font-bold uppercase tracking-wider block">
              {isBn ? 'গ্র্যানুলার অ্যাড টেলিমিতি:' : 'Granular Ad Telemetry:'}
            </span>

            <div className="flex items-center justify-between text-slate-300">
              <span className="text-slate-400">{isBn ? 'ফিল রেট (Fill Rate):' : 'Ad Fill Rate:'}</span>
              <strong className="font-mono text-emerald-400">{point.fillRate}% (Optimal)</strong>
            </div>

            <div className="flex items-center justify-between text-slate-300">
              <span className="text-slate-400">{isBn ? 'অ্যাড ক্লিক সংখ্যা:' : 'Ad Clicks:'}</span>
              <strong className="font-mono text-white">{point.clicks} clicks</strong>
            </div>

            <div className="flex items-center justify-between text-slate-300">
              <span className="text-slate-400">{isBn ? 'শীর্ষ উপার্জনকারী জোন:' : 'Top Earning Zone:'}</span>
              <strong className="font-mono text-amber-300 text-[10px]">Zone 5c68c (600px Bottom)</strong>
            </div>

            <div className="flex items-center justify-between text-slate-300 pt-1 border-t border-emerald-500/20">
              <span className="text-slate-400">{isBn ? 'নেট পেআউট প্রাক্কলন:' : 'Net Scheduled Payout:'}</span>
              <strong className="font-mono text-emerald-300">{formatMoney(point.revenue * 0.92)}</strong>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-950 border border-emerald-500/30 p-6 shadow-2xl space-y-6 animate-fade-in">
      
      {/* Ambient background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header and Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-800 relative z-10">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-mono text-xs font-bold">
              <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
              <span>MONETIZATION PERFORMANCE & AD TELEMETRY</span>
            </span>
            <span className="text-slate-600">·</span>
            <span className="text-[11px] font-mono text-emerald-400 font-bold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Active Unit: 5c68c5caa46878cdf7403e2133acfce7</span>
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <span>{isBn ? 'মনিটাইজেশন পারফরম্যান্স: বিজ্ঞাপন ইমপ্রেশন ও রেভিনিউ ট্রেন্ড' : 'Monetization Performance: Ad Impressions & Revenue Velocity'}</span>
          </h3>

          <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
            {isBn 
              ? 'আপনার সাইটের সক্রিয় অ্যাড ফরম্যাট, ৬০0px বটম অ্যাড জোন এবং রিয়েল-টাইম eCPM-এর মাধ্যমে অর্জিত রেভিনিউ গ্রাফ।' 
              : 'Real-time telemetry of ad impressions served, estimated CPM yields, fill rates, and net ad network revenue.'}
          </p>
        </div>

        {/* Action Controls & Currency Toggle */}
        <div className="flex flex-wrap items-center gap-2 shrink-0 self-start lg:self-center">
          
          {/* Currency Toggle */}
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => {
                setCurrency('USD');
                sounds.playSoftClick();
              }}
              className={`px-2.5 py-1 rounded-lg font-bold transition ${
                currency === 'USD' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              $ USD
            </button>
            <button
              onClick={() => {
                setCurrency('BDT');
                sounds.playSoftClick();
              }}
              className={`px-2.5 py-1 rounded-lg font-bold transition ${
                currency === 'BDT' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              ৳ BDT
            </button>
          </div>

          {/* Metric Filter Tabs */}
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => {
                setActiveMetricFilter('all');
                sounds.playSoftClick();
              }}
              className={`px-2.5 py-1 rounded-lg font-bold transition ${
                activeMetricFilter === 'all' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              {isBn ? 'সবগুলো' : 'All'}
            </button>
            <button
              onClick={() => {
                setActiveMetricFilter('revenue');
                sounds.playSoftClick();
              }}
              className={`px-2.5 py-1 rounded-lg font-bold transition ${
                activeMetricFilter === 'revenue' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              {isBn ? 'রেভিনিউ' : 'Revenue'}
            </button>
            <button
              onClick={() => {
                setActiveMetricFilter('impressions');
                sounds.playSoftClick();
              }}
              className={`px-2.5 py-1 rounded-lg font-bold transition ${
                activeMetricFilter === 'impressions' ? 'bg-purple-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              {isBn ? 'ইমপ্রেশন' : 'Impressions'}
            </button>
          </div>

          {/* Simulate Live Ad Surge Button */}
          <button
            onClick={handleSimulateSurge}
            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-black text-xs shadow-md shadow-emerald-500/20 hover:scale-105 active:scale-95 transition flex items-center gap-1.5"
            title="Simulate Real-time Ad Revenue Spike"
          >
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>{isBn ? 'অ্যাড সার্জ টেস্ট' : '+ Surge'}</span>
          </button>

        </div>
      </div>

      {/* 4 HIGH-IMPACT MONETIZATION KPI METRIC CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1 relative overflow-hidden group hover:border-emerald-500/50 transition">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1.5 font-bold">
              <DollarSign className="w-4 h-4 text-emerald-400" />
              <span>{isBn ? 'মোট অ্যাড রেভিনিউ' : 'Total Ad Revenue'}</span>
            </span>
            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 flex items-center">
              <ArrowUpRight className="w-3 h-3" /> +34.2%
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono tracking-tight">
            {formatMoney(totalRawRevenue)}
          </div>
          <p className="text-[11px] text-slate-500">
            {isBn ? 'নির্বাচিত সময়সীমার মোট বিজ্ঞাপন আয়' : 'Cumulative earnings across all ad slots'}
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1 relative overflow-hidden group hover:border-purple-500/50 transition">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1.5 font-bold">
              <Eye className="w-4 h-4 text-purple-400" />
              <span>{isBn ? 'বিজ্ঞাপন ইমপ্রেশন' : 'Ad Impressions'}</span>
            </span>
            <span className="text-[10px] font-bold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20 flex items-center">
              <ArrowUpRight className="w-3 h-3" /> +42.1%
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-purple-400 font-mono tracking-tight">
            {totalImpressions.toLocaleString()}
          </div>
          <p className="text-[11px] text-slate-500">
            {isBn ? 'পরিবেশিত বিজ্ঞাপনের মোট ভিউ সংখ্যা' : 'Total verified ad views delivered'}
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1 relative overflow-hidden group hover:border-blue-500/50 transition">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1.5 font-bold">
              <BarChart3 className="w-4 h-4 text-blue-400" />
              <span>{isBn ? 'গড় eCPM রেট' : 'Average eCPM Rate'}</span>
            </span>
            <span className="text-[10px] font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20 flex items-center">
              Top Tier GEO
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-blue-400 font-mono tracking-tight">
            ${avgEcpm}
          </div>
          <p className="text-[11px] text-slate-500">
            {isBn ? 'প্রতি ১,০০০ বিজ্ঞাপন ভিউয়ের উপার্জন' : 'Effective earning per 1,000 ad displays'}
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1 relative overflow-hidden group hover:border-amber-500/50 transition">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1.5 font-bold">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              <span>{isBn ? 'ফিল রেট ও ভিউবিলিটি' : 'Fill Rate & Viewability'}</span>
            </span>
            <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 flex items-center">
              99.4% Fill
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-400 font-mono tracking-tight">
            89.2%
          </div>
          <p className="text-[11px] text-slate-500">
            {isBn ? 'বিজ্ঞাপন দৃশ্যমানতার হার (In-View)' : 'Percentage of ads visible on viewport'}
          </p>
        </div>

      </div>

      {/* RECHARTS COMPOSED VISUALIZATION (REVENUE BARS + IMPRESSIONS AREA + ECPM LINE) */}
      <div className="bg-slate-950 p-4 sm:p-6 rounded-2xl border border-slate-800 space-y-4">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-emerald-400" />
            <h4 className="font-bold text-white text-sm">
              {isBn ? 'রেভিনিউ এবং বিজ্ঞাপন ইমপ্রেশন কম্পোজিশন চার্ট' : 'Revenue & Ad Impression Velocity Chart'}
            </h4>
          </div>

          <div className="flex items-center gap-4 text-[11px] font-mono text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-emerald-500" />
              <span>Revenue ($)</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-purple-500" />
              <span>Impressions</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-1 bg-amber-400 rounded-full" />
              <span>eCPM ($)</span>
            </span>
          </div>
        </div>

        <div className="h-72 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={monetizationData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
              <defs>
                <linearGradient id="monetizeAreaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.35}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="revenueBarGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity={0.9}/>
                  <stop offset="100%" stopColor="#059669" stopOpacity={0.4}/>
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis dataKey="date" stroke="#64748b" fontSize={11} tickLine={false} />
              
              {/* Left YAxis for Revenue */}
              <YAxis 
                yAxisId="left" 
                stroke="#10b981" 
                fontSize={11} 
                tickLine={false} 
                tickFormatter={(val) => `$${val}`}
              />

              {/* Right YAxis for Impressions */}
              <YAxis 
                yAxisId="right" 
                orientation="right" 
                stroke="#8b5cf6" 
                fontSize={11} 
                tickLine={false} 
                tickFormatter={(val) => `${(val / 1000).toFixed(0)}k`}
              />

              <Tooltip content={<CustomMonetizationTooltip />} />

              {/* Area for Impressions */}
              {(activeMetricFilter === 'all' || activeMetricFilter === 'impressions') && (
                <Area 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="impressions" 
                  name={isBn ? 'ইমপ্রেশন' : 'Impressions'}
                  stroke="#8b5cf6" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#monetizeAreaGrad)" 
                />
              )}

              {/* Bar for Revenue */}
              {(activeMetricFilter === 'all' || activeMetricFilter === 'revenue') && (
                <Bar 
                  yAxisId="left"
                  dataKey="revenue" 
                  name={isBn ? 'রেভিনিউ ($)' : 'Revenue ($)'}
                  fill="url(#revenueBarGrad)" 
                  radius={[6, 6, 0, 0]}
                  barSize={24}
                />
              )}

              {/* Line for eCPM */}
              {(activeMetricFilter === 'all' || activeMetricFilter === 'ecpm') && (
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="ecpm" 
                  name="eCPM ($)" 
                  stroke="#f59e0b" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: '#f59e0b', strokeWidth: 1 }}
                />
              )}

            </ComposedChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* AD ZONE BREAKDOWN & PAYOUT CARDS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        
        {/* Active Zone 1 */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-500/40 space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between text-xs">
            <span className="font-mono font-bold text-white flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Bottom 600px High-Impact Zone</span>
            </span>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              62% SHARE
            </span>
          </div>
          <div className="flex items-baseline justify-between pt-1">
            <div>
              <div className="text-xl font-bold font-mono text-emerald-400">{formatMoney(totalRawRevenue * 0.62)}</div>
              <span className="text-[10px] text-slate-400 font-mono">Unit: 5c68c5caa46878cdf7403e2133acfce7</span>
            </div>
            <span className="text-xs font-mono text-blue-400 font-bold">$4.10 eCPM</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed pt-1 border-t border-slate-800">
            {isBn ? 'ওয়েবসাইটের নিচে থাকা সক্রিয় iframe অ্যাড স্লট থেকে অর্জিত মূল রেভিনিউ।' : 'Contained sandboxed ad banner placed directly above closing body tag.'}
          </p>
        </div>

        {/* Active Zone 2 */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-mono font-bold text-white flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-purple-400" />
              <span>Native In-Feed & Search Results</span>
            </span>
            <span className="text-[10px] font-mono text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
              24% SHARE
            </span>
          </div>
          <div className="flex items-baseline justify-between pt-1">
            <div>
              <div className="text-xl font-bold font-mono text-purple-400">{formatMoney(totalRawRevenue * 0.24)}</div>
              <span className="text-[10px] text-slate-400 font-mono">Contextual SERP Matches</span>
            </div>
            <span className="text-xs font-mono text-blue-400 font-bold">$2.85 eCPM</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed pt-1 border-t border-slate-800">
            {isBn ? 'এসইও অডিট ও কিওয়ার্ড পেজের ইন-ফিড বিজ্ঞাপন থেকে অর্জিত আয়।' : 'Seamless non-intrusive contextual placements across SEO tool results.'}
          </p>
        </div>

        {/* Active Zone 3 & Payout Info */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-mono font-bold text-white flex items-center gap-1.5">
              <CreditCard className="w-4 h-4 text-amber-400" />
              <span>Automated Payout Schedule</span>
            </span>
            <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
              NET-30 VERIFIED
            </span>
          </div>
          <div className="flex items-baseline justify-between pt-1">
            <div>
              <div className="text-xl font-bold font-mono text-amber-300">{formatMoney(totalRawRevenue * 0.92)}</div>
              <span className="text-[10px] text-slate-400 font-mono">Estimated Net Transfer</span>
            </div>
            <span className="text-xs font-mono text-emerald-400 font-bold">Oct 15, 2026</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed pt-1 border-t border-slate-800">
            {isBn ? 'সরাসরি ব্যাংক বা পেপ্যাল অ্যাকাউন্টে নিরাপদ এনক্রিপ্টেড পেমেন্ট ট্রান্সফার।' : 'Automated bank/wire transfer scheduled with zero processing deductions.'}
          </p>
        </div>

      </div>

    </div>
  );
};
