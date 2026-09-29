import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Flame, 
  Zap, 
  Users, 
  Activity, 
  Sparkles, 
  MousePointerClick, 
  Filter, 
  ArrowUpRight, 
  CheckCircle2, 
  TrendingUp,
  Award,
  Radio,
  Sliders,
  Play,
  Square,
  Car,
  UserCheck,
  Palette,
  Volume2
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';
import { Language } from '../types';

interface SessionActivityHeatmapProps {
  language: Language;
  onLevelUp?: () => void;
}

interface HeatmapCell {
  dayIndex: number;
  dayName: string;
  dayShort: string;
  hour: number;
  timeLabel: string;
  interactions: number;
  activeVisitors: number;
  avgDurationSec: number;
  conversionRate: number;
  intensityLevel: 0 | 1 | 2 | 3 | 4; // 0=minimal, 4=peak
  highlightNote?: string;
}

// Generate realistic 7 days x 12 two-hour block heatmap data
const timeSlots = [
  { hour: 0, label: '12 AM' },
  { hour: 2, label: '2 AM' },
  { hour: 4, label: '4 AM' },
  { hour: 6, label: '6 AM' },
  { hour: 8, label: '8 AM' },
  { hour: 10, label: '10 AM' },
  { hour: 12, label: '12 PM' },
  { hour: 14, label: '2 PM' },
  { hour: 16, label: '4 PM' },
  { hour: 18, label: '6 PM' },
  { hour: 20, label: '8 PM' },
  { hour: 22, label: '10 PM' },
];

const daysBn = ['সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার', 'শুক্রবার', 'শনিবার', 'রবিবার'];
const daysEn = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const daysShortEn = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const daysShortBn = ['সোম', 'মঙ্গল', 'বুধ', 'বৃহঃ', 'শুক্র', 'শনি', 'রবি'];

export const SessionActivityHeatmap: React.FC<SessionActivityHeatmapProps> = ({ language }) => {
  const isBn = language === 'bn';

  const [selectedCell, setSelectedCell] = useState<HeatmapCell | null>(null);
  const [metricFilter, setMetricFilter] = useState<'interactions' | 'visitors' | 'duration' | 'conversions'>('interactions');

  // Generate 7-day matrix data
  const matrixData: HeatmapCell[][] = daysEn.map((dayName, dIdx) => {
    return timeSlots.map((slot) => {
      // Deterministic realistic curve: Peak around 10am-2pm on weekdays, peak around 6pm-10pm on weekends/Wed
      let baseWeight = 20;

      // Night hours (0-4 AM)
      if (slot.hour <= 4) baseWeight = 10 + (dIdx * 2);
      // Morning rush (6-8 AM)
      else if (slot.hour === 6 || slot.hour === 8) baseWeight = 45 + (dIdx * 4);
      // Working peak (10 AM - 2 PM)
      else if (slot.hour >= 10 && slot.hour <= 14) baseWeight = 75 + ((dIdx % 3) * 12);
      // Afternoon (4 PM - 6 PM)
      else if (slot.hour === 16 || slot.hour === 18) baseWeight = 60 + ((dIdx * 3) % 15);
      // Prime evening peak (8 PM - 10 PM)
      else if (slot.hour >= 20) baseWeight = (dIdx === 2 || dIdx === 6) ? 98 : 70;

      // Special highlight peaks: Wednesday 2 PM & Sunday 8 PM
      let highlightNote: string | undefined;
      if (dIdx === 2 && slot.hour === 14) {
        baseWeight = 99;
        highlightNote = isBn ? 'বুধবার ২টা: অমনি সার্চ ও মেটা জেনারেটর ব্যবহার চূড়া' : 'Wednesday 2 PM: Peak Omni Search & AI Meta Generation';
      } else if (dIdx === 6 && slot.hour === 20) {
        baseWeight = 100;
        highlightNote = isBn ? 'রবিবার রাত ৮টা: সর্বোচ্চ গড় সেশন স্থায়ীত্ব (৪ মি. ৩৮ সে.)' : 'Sunday 8 PM: Maximum 4m 38s Session Retention Peak';
      } else if (dIdx === 4 && slot.hour === 10) {
        baseWeight = 92;
        highlightNote = isBn ? 'শুক্রবার ১০টা: সর্বোচ্চ কনভার্সন রেট (২৪.৫%)' : 'Friday 10 AM: Peak Conversion Velocity (24.5%)';
      } else if (slot.hour === 6) {
        highlightNote = isBn ? 'গুগলবট ডেইলি ক্রল ও ফ্রেশ ইনডেক্স উইন্ডো' : 'Googlebot Morning Indexing & Crawl Window';
      }

      let intensityLevel: 0 | 1 | 2 | 3 | 4 = 0;
      if (baseWeight > 85) intensityLevel = 4; // Fiery Peak Gold
      else if (baseWeight > 65) intensityLevel = 3; // Neon Purple
      else if (baseWeight > 45) intensityLevel = 2; // Electric Indigo
      else if (baseWeight > 25) intensityLevel = 1; // Subtle Blue
      else intensityLevel = 0; // Dark Navy

      const interactions = Math.floor(baseWeight * 24.5) + (slot.hour * 6);
      const activeVisitors = Math.floor(baseWeight * 4.8) + (slot.hour * 2);
      const avgDurationSec = Math.floor(baseWeight * 2.6) + 80;
      const conversionRate = +(baseWeight * 0.22 + 2.5).toFixed(1);

      return {
        dayIndex: dIdx,
        dayName: isBn ? daysBn[dIdx] : dayName,
        dayShort: isBn ? daysShortBn[dIdx] : daysShortEn[dIdx],
        hour: slot.hour,
        timeLabel: slot.label,
        interactions,
        activeVisitors,
        avgDurationSec,
        conversionRate,
        intensityLevel,
        highlightNote,
      };
    });
  });

  const getCellColor = (cell: HeatmapCell) => {
    switch (cell.intensityLevel) {
      case 4:
        return 'bg-gradient-to-tr from-amber-500 to-yellow-400 text-slate-950 font-black shadow-lg shadow-amber-500/30 border border-amber-300 ring-1 ring-amber-400/50';
      case 3:
        return 'bg-purple-600/80 text-purple-100 hover:bg-purple-500 border border-purple-500/40 shadow-sm';
      case 2:
        return 'bg-indigo-600/60 text-indigo-100 hover:bg-indigo-500/80 border border-indigo-500/30';
      case 1:
        return 'bg-blue-900/40 text-blue-300 hover:bg-blue-800/60 border border-blue-800/40';
      case 0:
      default:
        return 'bg-slate-900/80 text-slate-500 hover:bg-slate-800/80 border border-slate-800/60';
    }
  };

  const formatSec = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${mins}m ${s}s`;
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-950/50 via-slate-900 to-slate-950 border border-indigo-500/30 p-6 shadow-2xl space-y-6 animate-fade-in">
      
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header & Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-800 relative z-10">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-300 font-mono text-xs font-bold">
              <Flame className="w-3.5 h-3.5 text-amber-400 fill-current animate-pulse" />
              <span>SESSION ACTIVITY HEATMAP MATRIX</span>
            </span>
            <span className="text-slate-600">·</span>
            <span className="text-[11px] font-mono text-emerald-400 font-bold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>7-Day × 24-Hour Telemetry</span>
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <span>{isBn ? 'সেশন অ্যাক্টিভিটি হিটম্যাপ: ৭ দিনের শীর্ষ ব্যবহারকারী মিথস্ক্রিয়া' : 'Session Activity Heatmap: 7-Day Peak Interaction Matrix'}</span>
          </h3>

          <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
            {isBn 
              ? 'সপ্তাহের ৭ দিন ও ২৪ ঘণ্টার বিভিন্ন সময়ে ইউজারদের উপস্থিতি, ক্লিক ঘনত্ব এবং সেশনের স্থায়ীত্বের তীব্রতা визуаলাইজ করুন।' 
              : 'Interactive 7-day matrix identifying highest customer engagement windows, Googlebot crawl peaks, and conversion velocity hours.'}
          </p>
        </div>

        {/* Metric Selector Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs shrink-0 self-start lg:self-center">
          <button
            onClick={() => {
              setMetricFilter('interactions');
              sounds.playSoftClick();
            }}
            className={`px-3 py-1.5 rounded-lg font-bold transition ${
              metricFilter === 'interactions' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            {isBn ? 'মিথস্ক্রিয়া' : 'Interactions'}
          </button>

          <button
            onClick={() => {
              setMetricFilter('visitors');
              sounds.playSoftClick();
            }}
            className={`px-3 py-1.5 rounded-lg font-bold transition ${
              metricFilter === 'visitors' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            {isBn ? 'অ্যাক্টিভ ইউজার' : 'Active Users'}
          </button>

          <button
            onClick={() => {
              setMetricFilter('duration');
              sounds.playSoftClick();
            }}
            className={`px-3 py-1.5 rounded-lg font-bold transition ${
              metricFilter === 'duration' ? 'bg-amber-500 text-slate-950 font-black shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            {isBn ? 'স্থায়ীত্ব' : 'Duration'}
          </button>

          <button
            onClick={() => {
              setMetricFilter('conversions');
              sounds.playSoftClick();
            }}
            className={`px-3 py-1.5 rounded-lg font-bold transition ${
              metricFilter === 'conversions' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            {isBn ? 'কনভার্সন' : 'Conversions'}
          </button>
        </div>
      </div>

      {/* HEATMAP MATRIX GRID */}
      <div className="bg-slate-950 p-4 sm:p-6 rounded-2xl border border-slate-800 space-y-4 overflow-x-auto">
        
        {/* Heatmap Legend */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-slate-400 pb-2 border-b border-slate-800/80">
          <span className="flex items-center gap-1.5 text-white font-bold">
            <Activity className="w-3.5 h-3.5 text-amber-400" />
            <span>{isBn ? 'ইন্টারেকশন তীব্রতা স্কেল:' : 'Interaction Density Scale:'}</span>
          </span>

          <div className="flex items-center gap-2">
            <span className="text-slate-500">Low</span>
            <span className="w-4 h-4 rounded bg-slate-900 border border-slate-800" title="Minimal Activity" />
            <span className="w-4 h-4 rounded bg-blue-900/40 border border-blue-800/40" title="Low Activity" />
            <span className="w-4 h-4 rounded bg-indigo-600/60 border border-indigo-500/30" title="Moderate Activity" />
            <span className="w-4 h-4 rounded bg-purple-600/80 border border-purple-500/40" title="High Activity" />
            <span className="w-4 h-4 rounded bg-gradient-to-tr from-amber-500 to-yellow-400 shadow-sm" title="Peak Golden Hour" />
            <span className="text-amber-400 font-bold">Peak (Golden Hour)</span>
          </div>
        </div>

        {/* Matrix Table */}
        <div className="min-w-[680px] space-y-1.5">
          {/* Hour Headers */}
          <div className="grid grid-cols-13 gap-1.5 text-center text-[10px] font-mono text-slate-400 font-bold">
            <div className="text-left pl-1">DAY</div>
            {timeSlots.map((slot) => (
              <div key={slot.hour} className="truncate">
                {slot.label}
              </div>
            ))}
          </div>

          {/* 7 Day Rows */}
          {matrixData.map((dayRow, dIdx) => (
            <div key={dIdx} className="grid grid-cols-13 gap-1.5 items-center">
              
              {/* Day Label */}
              <div className="text-xs font-mono font-bold text-slate-300 pl-1 flex items-center gap-1">
                <span>{dayRow[0].dayShort}</span>
                {dIdx === 2 || dIdx === 6 ? (
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" title="Peak Day" />
                ) : null}
              </div>

              {/* 12 Hour Heat Cells */}
              {dayRow.map((cell) => {
                const isSelected = selectedCell?.dayIndex === cell.dayIndex && selectedCell?.hour === cell.hour;
                return (
                  <button
                    key={cell.hour}
                    onClick={() => {
                      setSelectedCell(cell);
                      sounds.playSoftClick();
                    }}
                    onMouseEnter={() => {
                      setSelectedCell(cell);
                    }}
                    className={`h-9 sm:h-10 rounded-lg flex items-center justify-center text-[10px] font-mono transition-all duration-200 cursor-pointer relative group ${getCellColor(cell)} ${
                      isSelected ? 'ring-2 ring-white scale-105 z-10' : 'hover:scale-105'
                    }`}
                  >
                    {metricFilter === 'interactions' && (
                      <span className="truncate px-0.5">
                        {cell.interactions > 2000 ? `${(cell.interactions / 1000).toFixed(1)}k` : cell.interactions}
                      </span>
                    )}
                    {metricFilter === 'visitors' && (
                      <span className="truncate px-0.5">{cell.activeVisitors}</span>
                    )}
                    {metricFilter === 'duration' && (
                      <span className="truncate px-0.5">{Math.floor(cell.avgDurationSec / 60)}m</span>
                    )}
                    {metricFilter === 'conversions' && (
                      <span className="truncate px-0.5">{cell.conversionRate}%</span>
                    )}

                    {/* Peak indicator dot */}
                    {cell.intensityLevel === 4 && (
                      <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-300 animate-ping" />
                    )}
                  </button>
                );
              })}

            </div>
          ))}
        </div>

      </div>

      {/* DETAILED ACTIVE CELL TELEMETRY CARD */}
      {selectedCell ? (
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-indigo-500/40 shadow-xl space-y-3 animate-fade-in relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2.5">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
                <Clock className="w-4 h-4 text-amber-400" />
              </span>
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>{selectedCell.dayName} at {selectedCell.timeLabel} Window</span>
                  {selectedCell.intensityLevel === 4 && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1">
                      <Flame className="w-3 h-3 fill-current text-amber-400" />
                      <span>GOLDEN PEAK</span>
                    </span>
                  )}
                </h4>
                <p className="text-[11px] text-slate-400">
                  {selectedCell.highlightNote || (isBn ? 'নিয়মিত ইউজার সেশন ও গুগলবট ক্রল কার্যক্রম।' : 'Regular steady search traffic and user engagement.')}
                </p>
              </div>
            </div>

            <span className="text-[11px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20 self-start sm:self-auto">
              Level {selectedCell.intensityLevel} Heat Intensity
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-0.5">
              <span className="text-[10px] text-slate-400 font-mono block">KEY INTERACTIONS</span>
              <strong className="text-base text-white font-mono">{selectedCell.interactions.toLocaleString()}</strong>
              <span className="text-[10px] text-emerald-400 block">+28% vs baseline</span>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-0.5">
              <span className="text-[10px] text-slate-400 font-mono block">ACTIVE USERS</span>
              <strong className="text-base text-blue-400 font-mono">{selectedCell.activeVisitors} visitors</strong>
              <span className="text-[10px] text-blue-300 block">Concurrent</span>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-0.5">
              <span className="text-[10px] text-slate-400 font-mono block">PEAK DURATION</span>
              <strong className="text-base text-amber-400 font-mono">{formatSec(selectedCell.avgDurationSec)}</strong>
              <span className="text-[10px] text-amber-300 block">High retention</span>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-0.5">
              <span className="text-[10px] text-slate-400 font-mono block">CONVERSION RATE</span>
              <strong className="text-base text-emerald-400 font-mono">{selectedCell.conversionRate}%</strong>
              <span className="text-[10px] text-emerald-300 block">Actions completed</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center text-xs text-slate-400 font-mono flex items-center justify-center gap-2">
          <MousePointerClick className="w-4 h-4 text-indigo-400" />
          <span>{isBn ? 'যেকোনো হিটম্যাপ সেলের উপর মাউস রাখুন বিস্তারিত সেশন মেট্রিক্স দেখার জন্য।' : 'Hover over or click any heatmap cell above to inspect granular 24h session metrics.'}</span>
        </div>
      )}

      {/* 3 EXECUTIVE TAKEAWAY HIGHLIGHT BANNERS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        
        <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-1">
          <span className="text-[11px] font-mono font-bold text-amber-300 flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 fill-current" />
            <span>GOLDEN HOUR OF TRAFFIC</span>
          </span>
          <p className="text-slate-300 text-[11px] leading-relaxed">
            {isBn 
              ? 'বুধবার দুপুর ২টা ও রবিবার রাত ৮টা হলো আপনার ওয়েবসাইটের সর্বোচ্চ এনগেজমেন্ট উইন্ডো।' 
              : 'Wednesday 2 PM & Sunday 8 PM represent your highest organic traffic surge windows.'}
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 space-y-1">
          <span className="text-[11px] font-mono font-bold text-emerald-300 flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5" />
            <span>PRIME CONVERSION WINDOW</span>
          </span>
          <p className="text-slate-300 text-[11px] leading-relaxed">
            {isBn 
              ? 'শুক্রবার সকাল ১০টা থেকে দুপুর ১২টার মধ্যে ২৪.৫% সর্বোচ্চ কনভার্সন রেট রেকর্ড হয়েছে।' 
              : 'Friday 10 AM to 12 PM drives 24.5% conversion velocity with lowest bounce rates.'}
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/30 space-y-1">
          <span className="text-[11px] font-mono font-bold text-blue-300 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5" />
            <span>GOOGLEBOT CRAWL PEAK</span>
          </span>
          <p className="text-slate-300 text-[11px] leading-relaxed">
            {isBn 
              ? 'প্রতিদিন সকাল ৬টা থেকে ৯টায় গুগল সার্চবটের নিয়মিত ক্রল ও ফ্রেশ ইনডেক্সিং ঘটে।' 
              : 'Daily 6 AM to 9 AM is Googlebot primary crawl window; ideal for submitting fresh sitemaps.'}
          </p>
        </div>

      </div>

    </div>
  );
};
