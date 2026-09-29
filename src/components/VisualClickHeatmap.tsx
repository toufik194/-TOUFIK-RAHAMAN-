import React, { useState } from 'react';
import { 
  Flame, 
  MousePointer, 
  Smartphone, 
  Monitor, 
  Tablet, 
  Eye, 
  Sparkles, 
  TrendingUp, 
  Info, 
  RefreshCw, 
  Layers, 
  CheckCircle2,
  Sliders,
  Compass,
  ArrowUpRight,
  Maximize2
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';
import { Language } from '../types';

interface VisualClickHeatmapProps {
  language: Language;
  projectName: string;
}

interface HeatZone {
  id: string;
  name: string;
  category: 'cta' | 'nav' | 'content' | 'footer' | 'search';
  clicks: number;
  percentage: number;
  intensity: 'critical' | 'high' | 'medium' | 'low';
  top: string;
  left: string;
  width: string;
  height: string;
  conversionRate: string;
}

export const VisualClickHeatmap: React.FC<VisualClickHeatmapProps> = ({
  language,
  projectName,
}) => {
  const isBn = language === 'bn';

  const [deviceView, setDeviceView] = useState<'desktop' | 'mobile' | 'tablet'>('desktop');
  const [heatmapMetric, setHeatmapMetric] = useState<'clicks' | 'scroll' | 'attention'>('clicks');
  const [selectedZone, setSelectedZone] = useState<HeatZone | null>(null);
  const [liveUserClicks, setLiveUserClicks] = useState<{ x: number; y: number; id: number }[]>([]);
  const [showOverlay, setShowOverlay] = useState<boolean>(true);

  // 7 High-Engagement Hotspots mapped to UI elements
  const [zones, setZones] = useState<HeatZone[]>([
    {
      id: 'zone-hero-cta',
      name: isBn ? 'হিরো সেকশন প্রাইমারি বাটন (Start Free Trial)' : 'Hero Primary CTA (Start Free Trial)',
      category: 'cta',
      clicks: 4890,
      percentage: 42.6,
      intensity: 'critical',
      top: '28%',
      left: '30%',
      width: '40%',
      height: '14%',
      conversionRate: '18.4%',
    },
    {
      id: 'zone-search-board',
      name: isBn ? 'গুগল সার্চ ও অমনি বার' : 'Omni Search & Keyword Board',
      category: 'search',
      clicks: 2740,
      percentage: 23.8,
      intensity: 'high',
      top: '12%',
      left: '25%',
      width: '50%',
      height: '10%',
      conversionRate: '12.1%',
    },
    {
      id: 'zone-nav-pricing',
      name: isBn ? 'টপ নেভিগেশন (Pricing & Enterprise)' : 'Top Nav (Pricing & Enterprise)',
      category: 'nav',
      clicks: 1680,
      percentage: 14.6,
      intensity: 'high',
      top: '2%',
      left: '60%',
      width: '32%',
      height: '8%',
      conversionRate: '9.2%',
    },
    {
      id: 'zone-feature-cards',
      name: isBn ? 'ফিচার গ্রিড ও এআই আর্কিটেকচার কার্ড' : 'Feature Grid & AI Speed Card',
      category: 'content',
      clicks: 1120,
      percentage: 9.7,
      intensity: 'medium',
      top: '48%',
      left: '10%',
      width: '80%',
      height: '22%',
      conversionRate: '6.5%',
    },
    {
      id: 'zone-faq-accordion',
      name: isBn ? 'এফএকিউ ও গুগল স্কিমা অ্যাকর্ডিয়ান' : 'FAQ Accordion & Rich Schema',
      category: 'content',
      clicks: 640,
      percentage: 5.6,
      intensity: 'low',
      top: '74%',
      left: '15%',
      width: '70%',
      height: '12%',
      conversionRate: '4.8%',
    },
    {
      id: 'zone-footer-links',
      name: isBn ? 'ফুটার কনভার্সন ও ডোমেইন লিংক' : 'Footer Cloud & Domain Links',
      category: 'footer',
      clicks: 430,
      percentage: 3.7,
      intensity: 'low',
      top: '90%',
      left: '20%',
      width: '60%',
      height: '8%',
      conversionRate: '2.9%',
    },
  ]);

  // Handle interactive click on the simulated website canvas
  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    sounds.playSoftClick();
    const newClick = { x, y, id: Date.now() };
    setLiveUserClicks((prev) => [...prev.slice(-15), newClick]);
  };

  const getIntensityColor = (intensity: HeatZone['intensity']) => {
    switch (intensity) {
      case 'critical':
        return 'from-rose-500/80 via-red-500/60 to-amber-500/40 border-rose-400 text-rose-300 ring-rose-500/50';
      case 'high':
        return 'from-amber-500/75 via-orange-500/55 to-yellow-500/35 border-amber-400 text-amber-300 ring-amber-500/50';
      case 'medium':
        return 'from-emerald-500/70 via-teal-500/50 to-blue-500/30 border-emerald-400 text-emerald-300 ring-emerald-500/40';
      case 'low':
      default:
        return 'from-blue-600/60 via-indigo-600/40 to-slate-700/20 border-blue-400 text-blue-300 ring-blue-500/30';
    }
  };

  return (
    <div className="bg-slate-900/95 rounded-2xl border border-slate-800 p-5 sm:p-7 shadow-2xl space-y-6">
      
      {/* Header & Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 font-mono text-xs font-bold">
              <Flame className="w-3.5 h-3.5 animate-pulse" />
              <span>VISUAL CLICK HEATMAP & ENGAGEMENT</span>
            </span>
            <span className="text-slate-600">·</span>
            <span className="text-[11px] font-mono text-emerald-400">
              11,500 Total Recorded Clicks
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <span>{isBn ? 'ওয়েবসাইটের সর্বোচ্চ ক্লিক জোন ও ইউজার এনগেজমেন্ট হিটম্যাপ' : 'Website Visual Click Heatmap & High-Engagement Zones'}</span>
          </h3>
          <p className="text-xs text-slate-300">
            {isBn 
              ? 'ব্যবহারকারীরা আপনার ওয়েবসাইটের ঠিক কোন কোন বাটনে সবচেয়ে বেশি ক্লিক করছে তা ভিজ্যুয়াল তাপমাত্রার মাধ্যমে পর্যবেক্ষণ করুন।'
              : 'Identify where visitors click the most with thermal hotspots, click share percentage, and conversion attribution.'}
          </p>
        </div>

        {/* View Controls & Toggles */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          
          {/* Device Toggle */}
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => {
                setDeviceView('desktop');
                sounds.playSoftClick();
              }}
              className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition ${
                deviceView === 'desktop' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Desktop (68%)</span>
            </button>
            <button
              onClick={() => {
                setDeviceView('mobile');
                sounds.playSoftClick();
              }}
              className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition ${
                deviceView === 'mobile' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mobile (28%)</span>
            </button>
            <button
              onClick={() => {
                setDeviceView('tablet');
                sounds.playSoftClick();
              }}
              className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition ${
                deviceView === 'tablet' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Tablet className="w-3.5 h-3.5" />
              <span>Tablet</span>
            </button>
          </div>

          {/* Metric Mode */}
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setHeatmapMetric('clicks')}
              className={`px-2.5 py-1.5 rounded-lg font-bold transition ${
                heatmapMetric === 'clicks' ? 'bg-rose-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Clicks
            </button>
            <button
              onClick={() => setHeatmapMetric('scroll')}
              className={`px-2.5 py-1.5 rounded-lg font-bold transition ${
                heatmapMetric === 'scroll' ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Scroll Depth
            </button>
            <button
              onClick={() => setHeatmapMetric('attention')}
              className={`px-2.5 py-1.5 rounded-lg font-bold transition ${
                heatmapMetric === 'attention' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Attention
            </button>
          </div>

          {/* Overlay Toggle */}
          <button
            onClick={() => setShowOverlay(!showOverlay)}
            className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition flex items-center gap-1.5 ${
              showOverlay ? 'bg-slate-800 border-slate-700 text-slate-200' : 'bg-slate-950 border-slate-800 text-slate-500'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{showOverlay ? 'Overlay ON' : 'Raw Mockup'}</span>
          </button>

        </div>
      </div>

      {/* Main Heatmap Canvas & Inspector Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Interactive Simulated Website Canvas with Heatmap Overlay (8 cols) */}
        <div className="lg:col-span-8 flex flex-col space-y-3">
          
          <div className="flex items-center justify-between text-xs text-slate-400 px-1">
            <span className="flex items-center gap-1.5">
              <MousePointer className="w-3.5 h-3.5 text-blue-400" />
              <span>{isBn ? 'স্ক্রিনে ক্লিক করে লাইভ হিট পয়েন্ট তৈরি করুন' : 'Click anywhere on canvas to drop simulated user clicks'}</span>
            </span>
            <span className="font-mono text-[11px] text-slate-500">
              Width: {deviceView === 'desktop' ? '100% (1440px)' : deviceView === 'tablet' ? '768px' : '414px'}
            </span>
          </div>

          {/* Simulated Browser Frame */}
          <div 
            className={`mx-auto w-full transition-all duration-300 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl bg-[#030712] relative ${
              deviceView === 'mobile' ? 'max-w-sm' : deviceView === 'tablet' ? 'max-w-xl' : 'max-w-full'
            }`}
          >
            {/* Browser chrome header */}
            <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
                <span className="ml-2 font-mono text-[11px] text-slate-400 truncate">
                  https://{projectName.toLowerCase().replace(/[^a-z0-9]/g, '-')}.cloud/live
                </span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                SSL 200 OK
              </span>
            </div>

            {/* Interactive Website Surface */}
            <div 
              onClick={handleCanvasClick}
              className="relative min-h-[520px] p-6 cursor-crosshair select-none overflow-hidden bg-gradient-to-b from-slate-950 via-[#070d1d] to-slate-950"
            >
              {/* Background Mockup Web Elements */}
              <div className="space-y-8 opacity-75 pointer-events-none">
                
                {/* Mock Nav */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center font-black text-white text-xs">N</div>
                    <span className="font-bold text-white text-sm">{projectName.split('–')[0]}</span>
                  </div>
                  <div className="flex items-center gap-3 text-[11px] text-slate-400 font-medium">
                    <span>Features</span>
                    <span>Solutions</span>
                    <span className="text-amber-400 font-bold">Pricing</span>
                    <span className="px-2 py-1 rounded bg-blue-600 text-white font-bold">Sign In</span>
                  </div>
                </div>

                {/* Mock Search Board */}
                <div className="max-w-md mx-auto p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <span>🔍 Search keywords, pages, or indexing status...</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">⌘K</span>
                </div>

                {/* Mock Hero Headline & CTA */}
                <div className="text-center space-y-3 py-4 max-w-lg mx-auto">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-500/20 text-blue-400 border border-blue-500/30">
                    Next-Gen Architecture
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    Dominate Page #1 on Google Search
                  </h2>
                  <p className="text-xs text-slate-400">
                    Automated indexing, rich schema markup, and sub-second Core Web Vitals performance.
                  </p>
                  <div className="pt-2 flex justify-center gap-3">
                    <button className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs shadow-lg">
                      Start Free Trial →
                    </button>
                    <button className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 text-xs font-semibold">
                      Explore Docs
                    </button>
                  </div>
                </div>

                {/* Mock Feature Cards */}
                <div className="grid grid-cols-3 gap-3 pt-4">
                  <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                    <span className="text-amber-400 text-xs font-bold block">⚡ 0.8s Latency</span>
                    <span className="text-[11px] text-slate-400 block">Sub-second CDN edge routing</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                    <span className="text-emerald-400 text-xs font-bold block">🛡️ Zero 404s</span>
                    <span className="text-[11px] text-slate-400 block">Verified dynamic sitemap</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                    <span className="text-blue-400 text-xs font-bold block">🤖 Gemini SEO</span>
                    <span className="text-[11px] text-slate-400 block">Automated meta generation</span>
                  </div>
                </div>

                {/* Mock FAQ & Footer */}
                <div className="pt-2 border-t border-slate-900 flex justify-between text-[11px] text-slate-500">
                  <span>FAQ: How does fast indexing work?</span>
                  <span>© 2026 Enterprise Cloud · Privacy · Terms</span>
                </div>

              </div>

              {/* Heatmap Overlay Zones */}
              {showOverlay && zones.map((zone) => {
                const isSelected = selectedZone?.id === zone.id;
                const colorClasses = getIntensityColor(zone.intensity);

                return (
                  <div
                    key={zone.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      sounds.playSoftClick();
                      setSelectedZone(zone);
                    }}
                    style={{
                      top: zone.top,
                      left: zone.left,
                      width: zone.width,
                      height: zone.height,
                    }}
                    className={`absolute rounded-2xl bg-gradient-to-br ${colorClasses} border-2 backdrop-blur-xs transition-all duration-200 cursor-pointer flex flex-col items-center justify-center p-2 group shadow-xl ${
                      isSelected ? 'ring-4 scale-[1.02] z-30' : 'hover:scale-[1.01] z-20'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 bg-black/60 px-2 py-0.5 rounded-full border border-white/20 text-white font-mono text-[10px] font-bold shadow">
                      <Flame className="w-3 h-3 text-amber-300" />
                      <span>{zone.percentage}%</span>
                      <span className="text-slate-300">({zone.clicks} clicks)</span>
                    </div>

                    <span className="text-[10px] font-bold text-white tracking-wide truncate max-w-full drop-shadow mt-1 hidden sm:block">
                      {zone.name}
                    </span>
                  </div>
                );
              })}

              {/* Live Click Droplets / Ripples */}
              {liveUserClicks.map((click) => (
                <div
                  key={click.id}
                  style={{ top: `${click.y}%`, left: `${click.x}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none z-40"
                >
                  <span className="absolute -inset-3 rounded-full bg-rose-500/40 animate-ping"></span>
                  <span className="w-3 h-3 rounded-full bg-rose-400 block border-2 border-white shadow-lg"></span>
                </div>
              ))}

            </div>

            {/* Heatmap Legend Bar */}
            <div className="bg-slate-950 px-4 py-2.5 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-[11px]">
              <div className="flex items-center gap-2">
                <span className="text-slate-400 font-bold">Temperature:</span>
                <div className="flex items-center gap-1 font-mono text-[10px]">
                  <span className="px-2 py-0.5 rounded bg-rose-600 text-white font-bold">Critical (40%+)</span>
                  <span className="px-2 py-0.5 rounded bg-amber-600 text-white font-bold">High (20-39%)</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-600 text-white font-bold">Medium (10-19%)</span>
                  <span className="px-2 py-0.5 rounded bg-blue-600 text-white font-bold">Low (&lt;10%)</span>
                </div>
              </div>

              <span className="text-slate-400">
                Live simulation clicks: <strong className="text-white font-mono">{liveUserClicks.length} dropped</strong>
              </span>
            </div>

          </div>

        </div>

        {/* Right: Selected Hotspot Inspector & AI Recommendations (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Selected Hotspot Card */}
          <div className="bg-slate-950 rounded-2xl border border-slate-800 p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-rose-400" />
                <span>Hotspot Inspector</span>
              </span>
              <span className="text-[10px] font-mono text-slate-400">
                {selectedZone ? selectedZone.category.toUpperCase() : 'SELECT A ZONE'}
              </span>
            </div>

            {selectedZone ? (
              <div className="space-y-4 animate-fade-in text-xs">
                <div>
                  <h4 className="text-sm font-black text-white">{selectedZone.name}</h4>
                  <span className="text-slate-400 text-[11px]">
                    Relative click share across current active session data
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                    <span className="text-[10px] text-slate-400 block uppercase">Total Clicks</span>
                    <span className="text-xl font-black text-white font-mono">{selectedZone.clicks.toLocaleString()}</span>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                    <span className="text-[10px] text-slate-400 block uppercase">Click Share</span>
                    <span className="text-xl font-black text-rose-400 font-mono">{selectedZone.percentage}%</span>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                    <span className="text-[10px] text-slate-400 block uppercase">Est. Conversion</span>
                    <span className="text-xl font-black text-emerald-400 font-mono">{selectedZone.conversionRate}</span>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                    <span className="text-[10px] text-slate-400 block uppercase">Thermal Intensity</span>
                    <span className="text-xs font-bold font-mono text-amber-400 capitalize">{selectedZone.intensity}</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-300 text-[11px] leading-relaxed">
                  💡 <strong>AI Insight:</strong> This element sits right within the prime F-shaped reading pattern. Retaining high-contrast buttons here drives maximum signup velocity.
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-xs text-slate-400 space-y-2">
                <MousePointer className="w-8 h-8 text-slate-600 mx-auto animate-bounce" />
                <p>হিটম্যাপের যেকোনো কালার জোনে ক্লিক করে বিস্তারিত অ্যানালাইটিক্স দেখুন।</p>
                <p className="text-[11px] text-slate-500">Click any thermal zone on the preview to inspect.</p>
              </div>
            )}
          </div>

          {/* AI Layout & CRO Recommendations */}
          <div className="bg-slate-950 rounded-2xl border border-slate-800 p-5 space-y-3.5 shadow-xl">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                {isBn ? 'এআই কনভার্সন অপ্টিমাইজেশন টিপস' : 'AI CRO Optimization Recommendations'}
              </h4>
            </div>

            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-start gap-2 bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Hero CTA Domination:</strong> ৪২.৬% ভিজিটর প্রথম স্ক্রিনেই ক্লিক করছেন। বাটনটিতে মাইক্রো-অ্যানিমেশন দিলে কনভার্সন আরও ১২% বাড়বে।
                </span>
              </li>
              <li className="flex items-start gap-2 bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Search Board Utility:</strong> সার্চ বার ২৩.৮% ক্লিক পেয়েছে। সার্চ ফলাফলে গুগল ইনডেক্সিং শর্টকাট রাখলে রিটেনশন বৃদ্ধি পাবে।
                </span>
              </li>
              <li className="flex items-start gap-2 bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Mobile Sticky CTA:</strong> মোবাইল ডিভাইসে স্ক্রল করার সময় নিচে একটি স্টিকি "Deploy Now" বাটন থাকলে মোবাইল বাউন্স রেট কমবে।
                </span>
              </li>
            </ul>
          </div>

        </div>

      </div>

    </div>
  );
};
