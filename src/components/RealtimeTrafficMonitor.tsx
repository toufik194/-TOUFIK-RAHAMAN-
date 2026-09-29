import React, { useState, useEffect, useRef } from 'react';
import { 
  Activity, 
  Flame, 
  Zap, 
  Users, 
  Bell, 
  BellRing, 
  Globe, 
  ArrowUpRight, 
  CheckCircle2, 
  Volume2, 
  VolumeX, 
  Radio, 
  Sparkles, 
  X, 
  RefreshCw, 
  Play, 
  Pause,
  Clock,
  Eye,
  TrendingUp,
  ShieldCheck,
  Compass
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip 
} from 'recharts';
import confetti from 'canvas-confetti';
import { sounds } from '../utils/soundEffects';
import { Language } from '../types';

export interface TrafficSurgeAlert {
  id: string;
  timestamp: string;
  surgePercentage: number;
  previousCount: number;
  currentCount: number;
  source: string;
  topPage: string;
  region: string;
  acknowledged: boolean;
}

interface RealtimeTrafficMonitorProps {
  language: Language;
  projectName: string;
  onSurgeTriggered?: (alert: TrafficSurgeAlert) => void;
}

interface MinuteDataPoint {
  timeLabel: string;
  minutesAgo: number;
  visitors: number;
  pageViews: number;
}

interface LiveHit {
  id: string;
  time: string;
  path: string;
  location: string;
  flag: string;
  referrer: string;
  status: number;
}

export const RealtimeTrafficMonitor: React.FC<RealtimeTrafficMonitorProps> = ({
  language,
  projectName,
  onSurgeTriggered,
}) => {
  const isBn = language === 'bn';

  // Live active visitors state
  const [activeVisitors, setActiveVisitors] = useState<number>(142);
  const [isStreaming, setIsStreaming] = useState<boolean>(true);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // 5-minute rolling window history (5 intervals of 1-minute data)
  const [minuteHistory, setMinuteHistory] = useState<MinuteDataPoint[]>([
    { timeLabel: '5m ago', minutesAgo: 5, visitors: 112, pageViews: 245 },
    { timeLabel: '4m ago', minutesAgo: 4, visitors: 116, pageViews: 260 },
    { timeLabel: '3m ago', minutesAgo: 3, visitors: 122, pageViews: 280 },
    { timeLabel: '2m ago', minutesAgo: 2, visitors: 128, pageViews: 305 },
    { timeLabel: '1m ago', minutesAgo: 1, visitors: 135, pageViews: 330 },
    { timeLabel: 'Now', minutesAgo: 0, visitors: 142, pageViews: 355 },
  ]);

  // Real-time incoming hit stream
  const [liveHits, setLiveHits] = useState<LiveHit[]>([
    { id: '1', time: 'Just now', path: '/', location: 'San Francisco, US', flag: '🇺🇸', referrer: 'Google Organic', status: 200 },
    { id: '2', time: '3s ago', path: '/features', location: 'Dhaka, BD', flag: '🇧🇩', referrer: 'Direct / Bookmark', status: 200 },
    { id: '3', time: '6s ago', path: '/pricing', location: 'London, UK', flag: '🇬🇧', referrer: 'Twitter / X', status: 200 },
    { id: '4', time: '9s ago', path: '/docs/api', location: 'Berlin, DE', flag: '🇩🇪', referrer: 'Google Search', status: 200 },
  ]);

  // Active surge notification banner state
  const [activeSurgeAlert, setActiveSurgeAlert] = useState<TrafficSurgeAlert | null>(null);
  const [surgeAlertHistory, setSurgeAlertHistory] = useState<TrafficSurgeAlert[]>([]);
  const [showHistoryDrawer, setShowHistoryDrawer] = useState<boolean>(false);
  const [lastSurgeCheckedAt, setLastSurgeCheckedAt] = useState<number>(Date.now());

  // Geographic distribution in real-time
  const [geoDistribution, setGeoDistribution] = useState([
    { region: 'North America', pct: 42, count: 60, flag: '🇺🇸' },
    { region: 'Asia-Pacific', pct: 36, count: 51, flag: '🇧🇩' },
    { region: 'Europe', pct: 16, count: 23, flag: '🇪🇺' },
    { region: 'Others', pct: 6, count: 8, flag: '🌐' },
  ]);

  // Calculate surge percentage across 5-minute rolling window
  const baselineVisitors = minuteHistory[0]?.visitors || 110;
  const currentVisitors = minuteHistory[minuteHistory.length - 1]?.visitors || activeVisitors;
  const surgeRate = Math.round(((currentVisitors - baselineVisitors) / baselineVisitors) * 100);

  // Trigger surge alert helper
  const triggerSurgeAlert = (surgePct: number, prevCount: number, newCount: number, customSource?: string) => {
    const alert: TrafficSurgeAlert = {
      id: `surge-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      surgePercentage: surgePct,
      previousCount: prevCount,
      currentCount: newCount,
      source: customSource || (isBn ? 'গুগল অর্গানিক সার্চ (SERP #1)' : 'Google Organic Search (SERP #1)'),
      topPage: `/${projectName.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
      region: 'North America & Asia-Pacific',
      acknowledged: false,
    };

    setActiveSurgeAlert(alert);
    setSurgeAlertHistory((prev) => [alert, ...prev.slice(0, 9)]);

    if (soundEnabled) {
      sounds.playLuxuryChime();
    }

    confetti({
      particleCount: 55,
      spread: 60,
      origin: { y: 0.25 },
      colors: ['#10b981', '#3b82f6', '#f59e0b', '#8b5cf6'],
    });

    if (onSurgeTriggered) {
      onSurgeTriggered(alert);
    }
  };

  // Automated Real-Time Stream Simulation Loop
  useEffect(() => {
    if (!isStreaming) return;

    const interval = setInterval(() => {
      // Natural visitor fluctuations (+/- 1 to 4)
      setActiveVisitors((prev) => {
        const delta = Math.floor(Math.random() * 7) - 3;
        const nextVal = Math.max(85, prev + delta);

        // Update minute history current bucket
        setMinuteHistory((oldHistory) => {
          const updated = [...oldHistory];
          if (updated.length > 0) {
            updated[updated.length - 1] = {
              ...updated[updated.length - 1],
              visitors: nextVal,
              pageViews: updated[updated.length - 1].pageViews + (delta > 0 ? delta * 2 : 1),
            };
          }
          return updated;
        });

        return nextVal;
      });

      // Insert new live hit event
      const sampleHits = [
        { path: '/', location: 'New York, US', flag: '🇺🇸', referrer: 'Google Organic' },
        { path: '/features', location: 'Dhaka, BD', flag: '🇧🇩', referrer: 'Google Search' },
        { path: '/blog/seo-rankings', location: 'London, UK', flag: '🇬🇧', referrer: 'Organic Search' },
        { path: '/api/v1/indexing', location: 'Tokyo, JP', flag: '🇯🇵', referrer: 'Developer Portal' },
        { path: '/pricing', location: 'Toronto, CA', flag: '🇨🇦', referrer: 'Social Share' },
        { path: '/sitemap.xml', location: 'Mountain View, US', flag: '🤖', referrer: 'Googlebot / 2.1' },
      ];
      const randomHit = sampleHits[Math.floor(Math.random() * sampleHits.length)];

      const newHitItem: LiveHit = {
        id: Math.random().toString(36).substring(7),
        time: 'Just now',
        path: randomHit.path,
        location: randomHit.location,
        flag: randomHit.flag,
        referrer: randomHit.referrer,
        status: 200,
      };

      setLiveHits((prev) => [newHitItem, ...prev.slice(0, 4)]);
    }, 3800);

    return () => clearInterval(interval);
  }, [isStreaming]);

  // Monitor surge conditions every 10 seconds against baseline
  useEffect(() => {
    const checkTimer = setInterval(() => {
      const bVisitors = minuteHistory[0]?.visitors || 110;
      const cVisitors = minuteHistory[minuteHistory.length - 1]?.visitors || activeVisitors;
      const rate = ((cVisitors - bVisitors) / bVisitors) * 100;

      // Trigger if surge exceeds 20% and no recent alert in the last 45 seconds
      if (rate >= 20 && (!activeSurgeAlert || Date.now() - lastSurgeCheckedAt > 45000)) {
        setLastSurgeCheckedAt(Date.now());
        triggerSurgeAlert(Math.round(rate), bVisitors, cVisitors);
      }
    }, 10000);

    return () => clearInterval(checkTimer);
  }, [minuteHistory, activeVisitors, activeSurgeAlert, lastSurgeCheckedAt]);

  // Simulate a deliberate surge (+25% to +35%) for testing & demo
  const handleSimulateSurge = () => {
    sounds.playSoftClick();
    const baseVal = minuteHistory[0]?.visitors || 110;
    const spikeTarget = Math.round(baseVal * 1.28); // +28% surge
    const calculatedSurgePct = Math.round(((spikeTarget - baseVal) / baseVal) * 100);

    setActiveVisitors(spikeTarget);

    setMinuteHistory((prev) => {
      const updated = [...prev];
      if (updated.length > 0) {
        updated[updated.length - 1] = {
          ...updated[updated.length - 1],
          visitors: spikeTarget,
          pageViews: updated[updated.length - 1].pageViews + 85,
        };
      }
      return updated;
    });

    triggerSurgeAlert(
      calculatedSurgePct,
      baseVal,
      spikeTarget,
      isBn ? 'গুগল সার্চ কনসোল ট্রেন্ডিং স্পাইক (Viral SERP Surge)' : 'Google Search Console Viral SERP Surge (+28.4%)'
    );
  };

  // Reset baseline to stabilize
  const handleNormalizeTraffic = () => {
    sounds.playSoftClick();
    const normal = 120;
    setActiveVisitors(normal);
    setMinuteHistory([
      { timeLabel: '5m ago', minutesAgo: 5, visitors: 118, pageViews: 240 },
      { timeLabel: '4m ago', minutesAgo: 4, visitors: 119, pageViews: 250 },
      { timeLabel: '3m ago', minutesAgo: 3, visitors: 120, pageViews: 260 },
      { timeLabel: '2m ago', minutesAgo: 2, visitors: 121, pageViews: 270 },
      { timeLabel: '1m ago', minutesAgo: 1, visitors: 120, pageViews: 280 },
      { timeLabel: 'Now', minutesAgo: 0, visitors: normal, pageViews: 290 },
    ]);
    setActiveSurgeAlert(null);
  };

  return (
    <div className="space-y-4">
      
      {/* ========================================================================= */}
      {/* SUBTLE REAL-TIME SURGE NOTIFICATION ALERT BANNER (> 20% SURGE DETECTED) */}
      {/* ========================================================================= */}
      {activeSurgeAlert && (
        <div 
          role="alert"
          aria-live="polite"
          className="relative overflow-hidden rounded-2xl border border-emerald-500/50 bg-gradient-to-r from-emerald-950/80 via-slate-900/95 to-amber-950/70 p-4 sm:p-5 shadow-2xl backdrop-blur-xl animate-fade-in transition-all duration-300 ring-1 ring-emerald-400/30"
        >
          {/* Subtle Ambient Shimmer */}
          <div className="absolute -top-12 -left-12 w-44 h-44 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
          <div className="absolute -bottom-10 -right-10 w-44 h-44 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Left Info Column */}
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 shadow-md shadow-emerald-500/20 shrink-0 mt-0.5">
                <BellRing className="w-5 h-5 animate-bounce" />
              </div>

              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-mono font-bold text-[11px] tracking-wide">
                    <TrendingUp className="w-3 h-3 text-emerald-400" />
                    <span>+{activeSurgeAlert.surgePercentage}% 5-MIN SURGE</span>
                  </span>

                  <span className="text-[11px] text-slate-400 font-mono flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-500" />
                    <span>{activeSurgeAlert.timestamp}</span>
                  </span>

                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 border border-amber-500/30 text-amber-300">
                    High Conversion Opportunity
                  </span>
                </div>

                <h4 className="text-sm sm:text-base font-black text-white flex items-center gap-2">
                  <span>
                    {isBn 
                      ? 'অ্যাক্টিভ ট্র্যাফিক বৃদ্ধি পেয়েছে: ৫ মিনিটে ২০% এর বেশি ভিজিটর সার্জ!' 
                      : 'Real-Time Traffic Surge Detected: Visitors Spiked >20% in 5m Window!'}
                  </span>
                </h4>

                <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
                  {isBn 
                    ? `ভিজিটর সংখ্যা ${activeSurgeAlert.previousCount} থেকে বৃদ্ধি পেয়ে ${activeSurgeAlert.currentCount} এ উঠেছে। মূল উৎস: ${activeSurgeAlert.source}। সার্ভার লোড নিরাপদ এবং রেসপন্স টাইম ০.৮ সেকেন্ডে অপরিবর্তিত রয়েছে।`
                    : `Active concurrent sessions jumped from ${activeSurgeAlert.previousCount} to ${activeSurgeAlert.currentCount} (+${activeSurgeAlert.surgePercentage}%). Primary influx from ${activeSurgeAlert.source}. Core Web Vitals latency remains pristine at <50ms.`}
                </p>
              </div>
            </div>

            {/* Right Action Column */}
            <div className="flex items-center gap-2.5 shrink-0 self-end md:self-center">
              <button
                onClick={() => {
                  sounds.playSoftClick();
                  setShowHistoryDrawer(true);
                }}
                className="px-3.5 py-2 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold transition flex items-center gap-1.5"
              >
                <Activity className="w-3.5 h-3.5 text-emerald-400" />
                <span>{isBn ? 'সার্জ হিস্ট্রি' : 'Surge Logs'}</span>
              </button>

              <button
                onClick={() => {
                  sounds.playSoftClick();
                  setActiveSurgeAlert(null);
                }}
                className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition"
                title={isBn ? 'সতর্কতা বন্ধ করুন' : 'Dismiss Alert'}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* REAL-TIME VISITOR TRAFFIC MONITOR WIDGET CONTAINER */}
      {/* ========================================================================= */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-950 via-[#060c18] to-slate-950 border border-slate-800 p-5 sm:p-6 shadow-xl space-y-5">
        
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
          
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-bold text-emerald-400 font-mono uppercase tracking-wider">
                {isBn ? 'রিয়েলটাইম লাইভ ট্র্যাফিক মনিটর' : 'Real-Time Live Traffic Monitor'}
              </span>
              <span className="text-slate-600">·</span>
              <span className="text-[11px] font-mono text-slate-400">
                5-Min Sliding Window
              </span>
            </div>

            <h3 className="text-lg sm:text-xl font-black text-white tracking-tight flex items-center gap-2">
              <span>{isBn ? 'লাইভ ভিজিটর ও ৫-মিনিট ট্র্যাফিক সার্জ অ্যালার্ট' : 'Live Visitors & 5-Minute Surge Detection'}</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-blue-500/10 text-blue-400 border border-blue-500/30">
                ACTIVE STREAM
              </span>
            </h3>
          </div>

          {/* Action Toolbar */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            
            {/* Audio Toggle */}
            <button
              onClick={() => {
                setSoundEnabled(!soundEnabled);
                sounds.playSoftClick();
              }}
              className={`p-2 rounded-xl border transition ${
                soundEnabled 
                  ? 'bg-slate-900 border-slate-700 text-amber-400 hover:text-amber-300' 
                  : 'bg-slate-950 border-slate-800 text-slate-500'
              }`}
              title={soundEnabled ? 'Chimes Enabled' : 'Chimes Muted'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Stream Play/Pause Toggle */}
            <button
              onClick={() => {
                setIsStreaming(!isStreaming);
                sounds.playSoftClick();
              }}
              className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition flex items-center gap-1.5 ${
                isStreaming 
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20' 
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {isStreaming ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isStreaming ? (isBn ? 'লাইভ স্ট্রিমিং' : 'Streaming') : (isBn ? 'পজ করা' : 'Paused')}</span>
            </button>

            {/* Simulate Surge Test Button */}
            <button
              onClick={handleSimulateSurge}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs shadow-md shadow-amber-500/20 active:scale-95 transition flex items-center gap-1.5"
              title="Trigger a simulated +28% traffic surge to test real-time notification"
            >
              <Zap className="w-3.5 h-3.5 text-slate-950 fill-current" />
              <span>{isBn ? '⚡ সার্জ টেস্ট করুন (+২৮%)' : '⚡ Simulate Surge (+28%)'}</span>
            </button>

            {/* Normalize Button */}
            <button
              onClick={handleNormalizeTraffic}
              className="p-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 transition"
              title="Reset baseline"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>

          </div>

        </div>

        {/* 3-Column Real-Time Overview Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          
          {/* Card 1: Active Concurrent Visitors (4 cols) */}
          <div className="md:col-span-4 bg-slate-900/90 rounded-xl border border-slate-800 p-4 space-y-3 flex flex-col justify-between">
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-emerald-400" />
                  <span>{isBn ? 'বর্তমান অ্যাক্টিভ ভিজিটর' : 'Current Active Visitors'}</span>
                </span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                  REALTIME
                </span>
              </div>

              <div className="pt-2 flex items-baseline gap-3">
                <span className="text-4xl font-black text-white font-mono tracking-tight">
                  {activeVisitors}
                </span>
                <span className={`text-xs font-bold font-mono flex items-center ${
                  surgeRate >= 20 ? 'text-emerald-400' : surgeRate > 0 ? 'text-blue-400' : 'text-slate-400'
                }`}>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  <span>{surgeRate >= 0 ? `+${surgeRate}%` : `${surgeRate}%`} vs 5m</span>
                </span>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="pt-3 border-t border-slate-800/80 grid grid-cols-2 gap-2 text-[11px] font-mono">
              <div className="bg-slate-950 p-2 rounded-lg border border-slate-800/80">
                <span className="text-slate-500 block text-[10px]">5m Baseline:</span>
                <span className="text-slate-200 font-bold">{baselineVisitors} visitors</span>
              </div>
              <div className="bg-slate-950 p-2 rounded-lg border border-slate-800/80">
                <span className="text-slate-500 block text-[10px]">Surge Threshold:</span>
                <span className="text-amber-400 font-bold">+20% Window</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 leading-snug">
              {isBn 
                ? 'গুগলবট এবং বিশ্বব্যাপী সক্রিয় গ্রাহকদের কনকারেন্ট সেশন রিয়েল-টাইমে আপডেট হচ্ছে।' 
                : 'Concurrent sessions tracked via lightweight keep-alive telemetry.'}
            </p>
          </div>

          {/* Card 2: 5-Minute Window Real-Time Area Chart (5 cols) */}
          <div className="md:col-span-5 bg-slate-900/90 rounded-xl border border-slate-800 p-4 space-y-3 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 font-bold flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-blue-400" />
                <span>{isBn ? '৫-মিনিট রোলিং উইন্ডো গ্রাফ' : '5-Min Rolling Trend Chart'}</span>
              </span>
              <span className="text-[11px] font-mono text-slate-400">
                1m Resolution
              </span>
            </div>

            {/* Sparkline / Area Chart */}
            <div className="h-28 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={minuteHistory} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                  <defs>
                    <linearGradient id="surgeGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={surgeRate >= 20 ? '#10b981' : '#3b82f6'} stopOpacity={0.4} />
                      <stop offset="95%" stopColor={surgeRate >= 20 ? '#10b981' : '#3b82f6'} stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="timeLabel" 
                    stroke="#475569" 
                    fontSize={10} 
                    tickLine={false} 
                    axisLine={false} 
                  />
                  <YAxis 
                    stroke="#475569" 
                    fontSize={10} 
                    tickLine={false} 
                    axisLine={false}
                    domain={['dataMin - 10', 'dataMax + 10']}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#030712', 
                      borderColor: '#1e293b', 
                      borderRadius: '8px', 
                      fontSize: '11px',
                      color: '#f8fafc' 
                    }}
                    labelStyle={{ color: '#94a3b8' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="visitors" 
                    stroke={surgeRate >= 20 ? '#10b981' : '#3b82f6'} 
                    strokeWidth={2} 
                    fillOpacity={1} 
                    fill="url(#surgeGradient)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-800/80">
              <span>{isBn ? 'সার্ভার রেসপন্স:' : 'Server Latency:'} <strong className="text-emerald-400 font-mono">42ms</strong></span>
              <span>{isBn ? 'সেশন ডিউরেশন:' : 'Avg Duration:'} <strong className="text-slate-200 font-mono">3m 48s</strong></span>
            </div>
          </div>

          {/* Card 3: Live Incoming Hit Feed (3 cols) */}
          <div className="md:col-span-3 bg-slate-900/90 rounded-xl border border-slate-800 p-4 space-y-2 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 font-bold flex items-center gap-1.5">
                <Radio className="w-4 h-4 text-purple-400" />
                <span>{isBn ? 'লাইভ হিট স্ট্রিম' : 'Live Hit Stream'}</span>
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            </div>

            <div className="space-y-1.5 overflow-hidden">
              {liveHits.map((hit) => (
                <div 
                  key={hit.id} 
                  className="bg-slate-950/80 p-1.5 rounded-lg border border-slate-800/60 text-[10px] font-mono flex items-center justify-between gap-1"
                >
                  <div className="flex items-center gap-1.5 truncate">
                    <span>{hit.flag}</span>
                    <span className="text-blue-400 truncate">{hit.path}</span>
                  </div>
                  <span className="text-slate-500 shrink-0">{hit.time}</span>
                </div>
              ))}
            </div>

            <div className="pt-1 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
              <span>Origin: <strong className="text-slate-200 font-mono">US, BD, EU</strong></span>
              <span className="text-emerald-400 font-bold">200 OK</span>
            </div>
          </div>

        </div>

      </div>

      {/* ========================================================================= */}
      {/* SURGE ALERT HISTORY DRAWER / MODAL */}
      {/* ========================================================================= */}
      {showHistoryDrawer && (
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl space-y-4 animate-fade-in">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-emerald-400" />
              <h4 className="text-sm font-bold text-white">
                {isBn ? '৫-মিনিট ট্র্যাফিক সার্জ হিস্ট্রি লগ' : '5-Minute Traffic Surge Event Logs'}
              </h4>
              <span className="text-xs font-mono text-slate-400">({surgeAlertHistory.length} Recorded)</span>
            </div>

            <button
              onClick={() => setShowHistoryDrawer(false)}
              className="text-xs px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
            >
              ✕ {isBn ? 'বন্ধ' : 'Close'}
            </button>
          </div>

          {surgeAlertHistory.length === 0 ? (
            <p className="text-xs text-slate-400 text-center py-4">
              {isBn 
                ? 'এখনও কোনো ট্র্যাফিক সার্জ রেকর্ড হয়নি। "⚡ সার্জ টেস্ট করুন" বাটনে ক্লিক করে পরীক্ষা করুন।' 
                : 'No surge events recorded yet. Click "⚡ Simulate Surge" above to test the notification engine.'}
            </p>
          ) : (
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {surgeAlertHistory.map((item) => (
                <div 
                  key={item.id}
                  className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2 font-mono">
                      <span className="text-emerald-400 font-bold">+{item.surgePercentage}% Surge</span>
                      <span className="text-slate-500">·</span>
                      <span className="text-slate-300">{item.previousCount} → {item.currentCount} visitors</span>
                    </div>
                    <p className="text-[11px] text-slate-400">Source: {item.source}</p>
                  </div>
                  <span className="text-[11px] font-mono text-slate-500 shrink-0">{item.timestamp}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
};
