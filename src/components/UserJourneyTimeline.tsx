import React, { useState } from 'react';
import { 
  ResponsiveContainer, 
  ComposedChart, 
  Area, 
  Line, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  Legend,
  ReferenceDot,
  ReferenceLine
} from 'recharts';
import { 
  Compass, 
  Clock, 
  Activity, 
  MousePointerClick, 
  Zap, 
  Users, 
  Sparkles, 
  TrendingUp, 
  Filter, 
  ArrowRight, 
  CheckCircle2, 
  Target,
  Award
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';
import { Language } from '../types';

interface UserJourneyTimelineProps {
  language: Language;
}

interface TimelineDataPoint {
  hour: string;
  timeLabel: string;
  interactions: number;
  sessionDurationSec: number; // in seconds
  activeSessions: number;
  conversionEvents: number;
  milestone?: string;
  milestoneType?: 'surge' | 'conversion' | 'peak';
}

const generate24hJourneyData = (): TimelineDataPoint[] => [
  { hour: '00:00', timeLabel: '12 AM', interactions: 180, sessionDurationSec: 95, activeSessions: 42, conversionEvents: 4 },
  { hour: '01:00', timeLabel: '1 AM', interactions: 120, sessionDurationSec: 88, activeSessions: 28, conversionEvents: 2 },
  { hour: '02:00', timeLabel: '2 AM', interactions: 95, sessionDurationSec: 82, activeSessions: 20, conversionEvents: 1 },
  { hour: '03:00', timeLabel: '3 AM', interactions: 80, sessionDurationSec: 75, activeSessions: 18, conversionEvents: 1 },
  { hour: '04:00', timeLabel: '4 AM', interactions: 110, sessionDurationSec: 85, activeSessions: 25, conversionEvents: 3 },
  { hour: '05:00', timeLabel: '5 AM', interactions: 190, sessionDurationSec: 105, activeSessions: 45, conversionEvents: 5 },
  { hour: '06:00', timeLabel: '6 AM', interactions: 340, sessionDurationSec: 130, activeSessions: 85, conversionEvents: 12 },
  { hour: '07:00', timeLabel: '7 AM', interactions: 580, sessionDurationSec: 155, activeSessions: 140, conversionEvents: 24 },
  { hour: '08:00', timeLabel: '8 AM', interactions: 890, sessionDurationSec: 180, activeSessions: 210, conversionEvents: 38 },
  { hour: '09:00', timeLabel: '9 AM', interactions: 1340, sessionDurationSec: 220, activeSessions: 320, conversionEvents: 58, milestone: 'Morning Traffic Surge & Googlebot Crawl', milestoneType: 'surge' },
  { hour: '10:00', timeLabel: '10 AM', interactions: 1620, sessionDurationSec: 245, activeSessions: 390, conversionEvents: 72 },
  { hour: '11:00', timeLabel: '11 AM', interactions: 1780, sessionDurationSec: 255, activeSessions: 430, conversionEvents: 84 },
  { hour: '12:00', timeLabel: '12 PM', interactions: 1650, sessionDurationSec: 240, activeSessions: 410, conversionEvents: 78 },
  { hour: '13:00', timeLabel: '1 PM', interactions: 1820, sessionDurationSec: 260, activeSessions: 450, conversionEvents: 91 },
  { hour: '14:00', timeLabel: '2 PM', interactions: 2150, sessionDurationSec: 265, activeSessions: 520, conversionEvents: 112, milestone: 'Peak Interaction Density (Search & Heatmaps)', milestoneType: 'peak' },
  { hour: '15:00', timeLabel: '3 PM', interactions: 1980, sessionDurationSec: 250, activeSessions: 480, conversionEvents: 98 },
  { hour: '16:00', timeLabel: '4 PM', interactions: 1870, sessionDurationSec: 245, activeSessions: 460, conversionEvents: 92 },
  { hour: '17:00', timeLabel: '5 PM', interactions: 1740, sessionDurationSec: 235, activeSessions: 420, conversionEvents: 85 },
  { hour: '18:00', timeLabel: '6 PM', interactions: 1610, sessionDurationSec: 240, activeSessions: 390, conversionEvents: 76 },
  { hour: '19:00', timeLabel: '7 PM', interactions: 1890, sessionDurationSec: 265, activeSessions: 440, conversionEvents: 95 },
  { hour: '20:00', timeLabel: '8 PM', interactions: 2080, sessionDurationSec: 278, activeSessions: 495, conversionEvents: 125, milestone: 'Peak Session Duration (4m 38s Deep Engagement)', milestoneType: 'conversion' },
  { hour: '21:00', timeLabel: '9 PM', interactions: 1750, sessionDurationSec: 250, activeSessions: 410, conversionEvents: 88 },
  { hour: '22:00', timeLabel: '10 PM', interactions: 1120, sessionDurationSec: 195, activeSessions: 260, conversionEvents: 46 },
  { hour: '23:00', timeLabel: '11 PM', interactions: 520, sessionDurationSec: 135, activeSessions: 120, conversionEvents: 18 },
];

export const UserJourneyTimeline: React.FC<UserJourneyTimelineProps> = ({ language }) => {
  const isBn = language === 'bn';
  const data = generate24hJourneyData();

  const [activeFilter, setActiveFilter] = useState<'all' | 'duration' | 'interactions' | 'conversions'>('all');
  const [selectedMilestone, setSelectedMilestone] = useState<string | null>(null);

  // Format seconds into "m s" format (e.g. 278s -> 4m 38s)
  const formatSeconds = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const remainingSec = sec % 60;
    return `${mins}m ${remainingSec}s`;
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const point = payload[0].payload as TimelineDataPoint;
      return (
        <div className="bg-slate-900/95 border border-indigo-500/40 p-3.5 rounded-xl shadow-2xl text-xs space-y-2 backdrop-blur-md font-sans">
          <div className="flex items-center justify-between gap-4 border-b border-slate-800 pb-1.5">
            <span className="font-bold text-white font-mono flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-blue-400" />
              <span>{point.hour} ({point.timeLabel})</span>
            </span>
            {point.milestone && (
              <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-amber-500/20 text-amber-300 border border-amber-500/30">
                MILESTONE
              </span>
            )}
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between gap-4">
              <span className="text-slate-400 flex items-center gap-1.5">
                <MousePointerClick className="w-3.5 h-3.5 text-indigo-400" />
                <span>{isBn ? 'কী-ইন্টারেকশন ইভেন্টস:' : 'Key Interactions:'}</span>
              </span>
              <strong className="text-white font-mono font-bold">{point.interactions.toLocaleString()}</strong>
            </div>

            <div className="flex items-center justify-between gap-4">
              <span className="text-slate-400 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>{isBn ? 'পিক সেশন ডিউরেশন:' : 'Session Duration Peak:'}</span>
              </span>
              <strong className="text-amber-300 font-mono font-bold">{formatSeconds(point.sessionDurationSec)}</strong>
            </div>

            <div className="flex items-center justify-between gap-4">
              <span className="text-slate-400 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-blue-400" />
                <span>{isBn ? 'সক্রিয় সেশন:' : 'Active Sessions:'}</span>
              </span>
              <strong className="text-blue-300 font-mono font-bold">{point.activeSessions}</strong>
            </div>

            <div className="flex items-center justify-between gap-4">
              <span className="text-slate-400 flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-emerald-400" />
                <span>{isBn ? 'কনভার্সন ইভেন্ট:' : 'Conversions:'}</span>
              </span>
              <strong className="text-emerald-400 font-mono font-bold">{point.conversionEvents}</strong>
            </div>
          </div>

          {point.milestone && (
            <div className="pt-1.5 border-t border-slate-800 text-[11px] text-amber-300 leading-snug">
              📍 {point.milestone}
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-950/40 via-slate-900 to-slate-950 border border-indigo-500/30 p-6 shadow-2xl space-y-6 animate-fade-in">
      
      {/* Background radial glow */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header & Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-800 relative z-10">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 font-mono text-xs font-bold">
              <Compass className="w-3.5 h-3.5 text-amber-300" />
              <span>USER JOURNEY TIMELINE VISUALIZATION</span>
            </span>
            <span className="text-slate-600">·</span>
            <span className="text-[11px] font-mono text-emerald-400 font-bold">
              Last 24 Hours Telemetry
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <span>{isBn ? 'ইউজার জার্নি টাইমলাইন: গত ২৪ ঘণ্টার মিথস্ক্রিয়া ও সেশন চূড়া' : 'User Journey Timeline: 24h Interaction & Duration Peaks'}</span>
          </h3>

          <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
            {isBn 
              ? 'গত ২৪ ঘণ্টার ব্যবহারকারীদের আগমন, গড় সেশন স্থায়ীত্ব (Session Duration) এবং মূল কনভার্সন ইভেন্টগুলোর চূড়া (Peaks) Recharts ভিজ্যুয়ালাইজেশনে পর্যবেক্ষণ করুন।' 
              : 'Interactive 24-hour timeline charting key user interactions, click density, and session duration peaks to optimize content retention.'}
          </p>
        </div>

        {/* Metric Filter Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs shrink-0 self-start lg:self-center">
          <button
            onClick={() => {
              setActiveFilter('all');
              sounds.playSoftClick();
            }}
            className={`px-3 py-1.5 rounded-lg font-bold transition ${
              activeFilter === 'all' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            {isBn ? 'সব মেট্রিক্স' : 'All Combined'}
          </button>

          <button
            onClick={() => {
              setActiveFilter('interactions');
              sounds.playSoftClick();
            }}
            className={`px-3 py-1.5 rounded-lg font-bold transition ${
              activeFilter === 'interactions' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            {isBn ? 'ইন্টারেকশন' : 'Interactions'}
          </button>

          <button
            onClick={() => {
              setActiveFilter('duration');
              sounds.playSoftClick();
            }}
            className={`px-3 py-1.5 rounded-lg font-bold transition ${
              activeFilter === 'duration' ? 'bg-amber-600 text-slate-950 font-black shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            {isBn ? 'সেশন চূড়া' : 'Session Duration'}
          </button>

          <button
            onClick={() => {
              setActiveFilter('conversions');
              sounds.playSoftClick();
            }}
            className={`px-3 py-1.5 rounded-lg font-bold transition ${
              activeFilter === 'conversions' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            {isBn ? 'কনভার্সন' : 'Conversions'}
          </button>
        </div>
      </div>

      {/* 4 HIGH-IMPACT KPI SUMMARY CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        
        {/* KPI 1: Peak Duration */}
        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block font-mono">
            {isBn ? 'সর্বোচ্চ সেশন স্থায়ীত্ব (Peak):' : 'Peak Session Duration:'}
          </span>
          <div className="text-xl sm:text-2xl font-black text-amber-400 font-mono">
            4m 38s
          </div>
          <span className="text-[10px] text-slate-500 block">
            {isBn ? 'রাত ৮:০০ টায় রেকর্ডকৃত' : 'Observed at 20:00 (8 PM)'}
          </span>
        </div>

        {/* KPI 2: Total 24h Interactions */}
        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block font-mono">
            {isBn ? '২৪ ঘণ্টার মোট মিথস্ক্রিয়া:' : '24h Total Interactions:'}
          </span>
          <div className="text-xl sm:text-2xl font-black text-white font-mono">
            28,490
          </div>
          <span className="text-[10px] text-emerald-400 block font-medium">
            +31.4% vs previous 24h
          </span>
        </div>

        {/* KPI 3: Peak Interaction Velocity */}
        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block font-mono">
            {isBn ? 'সর্বোচ্চ এনগেজমেন্ট ঘণ্টা:' : 'Peak Activity Hour:'}
          </span>
          <div className="text-xl sm:text-2xl font-black text-indigo-400 font-mono">
            14:00 (2 PM)
          </div>
          <span className="text-[10px] text-slate-500 block">
            2,150 interactions/hour
          </span>
        </div>

        {/* KPI 4: Average Journey Depth */}
        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block font-mono">
            {isBn ? 'গড় জার্নি অ্যাকশন ডেপথ:' : 'Avg Journey Depth:'}
          </span>
          <div className="text-xl sm:text-2xl font-black text-emerald-400 font-mono">
            5.4 Actions
          </div>
          <span className="text-[10px] text-slate-500 block">
            Per unique visitor session
          </span>
        </div>

      </div>

      {/* RECHARTS COMPOSED TIMELINE CHART */}
      <div className="bg-slate-950 p-4 sm:p-6 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <span className="font-bold text-white uppercase tracking-wider font-mono flex items-center gap-1.5">
            <Activity className="w-4 h-4 text-indigo-400" />
            <span>{isBn ? '২৪ ঘণ্টার ধারাবাহিক ইউজার জার্নি গ্রাফ' : 'Continuous 24-Hour Timeline Spectrum'}</span>
          </span>

          <div className="flex items-center gap-4 text-[11px] font-mono">
            <span className="flex items-center gap-1.5 text-indigo-300">
              <span className="w-3 h-3 rounded-sm bg-indigo-500/80"></span>
              <span>Interactions (Left Axis)</span>
            </span>
            <span className="flex items-center gap-1.5 text-amber-300">
              <span className="w-3 h-1 bg-amber-400 rounded-full"></span>
              <span>Duration Peak in Sec (Right Axis)</span>
            </span>
          </div>
        </div>

        <div className="h-72 sm:h-84 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data} margin={{ top: 15, right: 10, left: -20, bottom: 5 }}>
              <defs>
                <linearGradient id="interactionGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="conversionGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.2} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              
              <XAxis 
                dataKey="timeLabel" 
                stroke="#64748b" 
                fontSize={11} 
                tickLine={false}
                axisLine={{ stroke: '#334155' }}
              />

              {/* Left Y Axis for Interactions count */}
              <YAxis 
                yAxisId="left"
                stroke="#64748b" 
                fontSize={11} 
                tickLine={false}
                axisLine={false}
                domain={[0, 2500]}
              />

              {/* Right Y Axis for Duration (seconds) */}
              <YAxis 
                yAxisId="right"
                orientation="right"
                stroke="#d97706" 
                fontSize={11} 
                tickLine={false}
                axisLine={false}
                domain={[0, 320]}
                tickFormatter={(val) => `${Math.floor(val / 60)}m`}
              />

              <Tooltip content={<CustomTooltip />} />

              {/* Reference Milestone Lines */}
              <ReferenceLine yAxisId="left" x="2 PM" stroke="#6366f1" strokeDasharray="3 3" />
              <ReferenceLine yAxisId="left" x="8 PM" stroke="#f59e0b" strokeDasharray="3 3" />

              {/* Highlight Peak Dot */}
              <ReferenceDot 
                yAxisId="right" 
                x="8 PM" 
                y={278} 
                r={6} 
                fill="#f59e0b" 
                stroke="#fff" 
                strokeWidth={2}
              />

              {/* Interactions Area */}
              {(activeFilter === 'all' || activeFilter === 'interactions') && (
                <Area 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="interactions" 
                  stroke="#818cf8" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#interactionGrad)" 
                  name="Key Interactions"
                />
              )}

              {/* Conversions Bars */}
              {(activeFilter === 'all' || activeFilter === 'conversions') && (
                <Bar 
                  yAxisId="left"
                  dataKey="conversionEvents" 
                  fill="url(#conversionGrad)" 
                  radius={[4, 4, 0, 0]}
                  barSize={12}
                  name="Conversions"
                />
              )}

              {/* Duration Spline Line */}
              {(activeFilter === 'all' || activeFilter === 'duration') && (
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="sessionDurationSec" 
                  stroke="#fbbf24" 
                  strokeWidth={3}
                  dot={{ fill: '#fbbf24', r: 3 }}
                  activeDot={{ r: 7, fill: '#f59e0b', stroke: '#fff', strokeWidth: 2 }}
                  name="Duration (Sec)"
                />
              )}
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 24-HOUR USER JOURNEY MILESTONE STAGES */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-white uppercase tracking-wider font-mono flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>{isBn ? 'মূল ইউজার জার্নি স্টেজ ও ড্রাইভ' : 'Key User Journey Funnel Progression'}</span>
          </span>
          <span className="text-[11px] font-mono text-slate-400">
            Average Time-to-Conversion: 4m 12s
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
          
          {/* Step 1 */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 relative overflow-hidden">
            <div className="flex items-center justify-between text-[11px] font-mono text-blue-400 font-bold">
              <span>STAGE 1: DISCOVERY</span>
              <span>0s - 15s</span>
            </div>
            <h5 className="font-bold text-white text-sm">গুগল অর্গানিক ল্যান্ডিং</h5>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Google SERP রেজাল্ট থেকে সরাসরি ইউজার সাইটে প্রবেশ করে এবং হিরো হেডিং ও স্পিড যাচাই করে।
            </p>
            <div className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>96.2% Retention Rate</span>
            </div>
          </div>

          {/* Step 2 */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 relative overflow-hidden">
            <div className="flex items-center justify-between text-[11px] font-mono text-indigo-400 font-bold">
              <span>STAGE 2: INTENT SEARCH</span>
              <span>15s - 1m 20s</span>
            </div>
            <h5 className="font-bold text-white text-sm">অমনি সার্চ ও কি-ওয়ার্ড এক্সপ্লোর</h5>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              বড় অমনি সার্চ বারে কি-ওয়ার্ড, গুগল এরর ফিক্সার এবং এআই মেটা টুল অনুসন্ধান করে।
            </p>
            <div className="text-[10px] font-mono text-indigo-400 flex items-center gap-1">
              <Activity className="w-3 h-3" />
              <span>2.4 Queries/User</span>
            </div>
          </div>

          {/* Step 3 */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 relative overflow-hidden">
            <div className="flex items-center justify-between text-[11px] font-mono text-amber-400 font-bold">
              <span>STAGE 3: DEEP ENGAGEMENT</span>
              <span>1m 20s - 3m 40s</span>
            </div>
            <h5 className="font-bold text-white text-sm">হিটম্যাপ ও এআই কপিরাইটার</h5>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              ভিজ্যুয়াল হিটম্যাপ এবং ৩টি হাই-সিটিআর মেটা ভ্যারিয়েন্ট জেনারেট করে প্রজেক্টে যুক্ত করে।
            </p>
            <div className="text-[10px] font-mono text-amber-400 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>Peak Session Time</span>
            </div>
          </div>

          {/* Step 4 */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 relative overflow-hidden">
            <div className="flex items-center justify-between text-[11px] font-mono text-emerald-400 font-bold">
              <span>STAGE 4: CONVERSION</span>
              <span>3m 40s - 4m 38s</span>
            </div>
            <h5 className="font-bold text-white text-sm">ইনডেক্সিং ও ফাইল এক্সপোর্ট</h5>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              গুগল সার্চ কনসোল রিকোয়েস্ট ইনডেক্সিং সাবমিট এবং sitemap.xml ডাউনলোড সম্পন্ন।
            </p>
            <div className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
              <Award className="w-3 h-3" />
              <span>18.6% Conversion Rate</span>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
