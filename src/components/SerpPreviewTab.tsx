import React, { useState } from 'react';
import { 
  Globe, 
  Smartphone, 
  Monitor, 
  Share2, 
  Twitter, 
  Facebook, 
  Star, 
  Copy, 
  Check, 
  ExternalLink,
  Sparkles,
  Sliders
} from 'lucide-react';
import { WebsiteProject, Language } from '../types';

interface SerpPreviewTabProps {
  project: WebsiteProject;
  language: Language;
  onUpdateProject: (updated: Partial<WebsiteProject>) => void;
}

export const SerpPreviewTab: React.FC<SerpPreviewTabProps> = ({
  project,
  language,
  onUpdateProject,
}) => {
  const isBn = language === 'bn';
  const [device, setDevice] = useState<'mobile' | 'desktop'>('mobile');
  const [platform, setPlatform] = useState<'google' | 'facebook' | 'twitter'>('google');
  const [copiedTag, setCopiedTag] = useState<string | null>(null);

  const cleanDomain = project.url.replace(/^https?:\/\//, '').replace(/\/$/, '');
  const titleLength = project.name.length;
  const descLength = project.description.length;

  const copyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTag(id);
    setTimeout(() => setCopiedTag(null), 2000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      
      {/* Header & Switchers */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/90 p-4 rounded-2xl border border-slate-800">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span>{isBn ? 'গুগল সার্চ ও সোশ্যাল কার্ড প্রিভিউ' : 'Google SERP & Social Preview'}</span>
            <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded font-mono">Live Snippet</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            {isBn 
              ? 'গুগল সার্চে ও ফেসবুকে আপনার সাইটের লিংক শেয়ার করলে ঠিক কেমন দেখাবে তা পরীক্ষা করুন।'
              : 'Preview how your website appears on Google Search results and social media feeds.'}
          </p>
        </div>

        {/* Platform & Device Toggles */}
        <div className="flex flex-wrap items-center gap-2">
          
          {/* Platform Tab */}
          <div className="bg-slate-800 p-1 rounded-xl flex items-center border border-slate-700">
            <button
              onClick={() => setPlatform('google')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
                platform === 'google' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Google SERP</span>
            </button>
            <button
              onClick={() => setPlatform('facebook')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
                platform === 'facebook' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Facebook className="w-3.5 h-3.5" />
              <span>Facebook</span>
            </button>
            <button
              onClick={() => setPlatform('twitter')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
                platform === 'twitter' ? 'bg-sky-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Twitter className="w-3.5 h-3.5" />
              <span>Twitter / X</span>
            </button>
          </div>

          {/* Device toggle (for Google) */}
          {platform === 'google' && (
            <div className="bg-slate-800 p-1 rounded-xl flex items-center border border-slate-700">
              <button
                onClick={() => setDevice('mobile')}
                className={`p-1.5 rounded-lg transition ${
                  device === 'mobile' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'
                }`}
                title="Mobile View"
              >
                <Smartphone className="w-4 h-4" />
              </button>
              <button
                onClick={() => setDevice('desktop')}
                className={`p-1.5 rounded-lg transition ${
                  device === 'desktop' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'
                }`}
                title="Desktop View"
              >
                <Monitor className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left / Top: Interactive Live Snippet Display (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* GOOGLE PREVIEW */}
          {platform === 'google' && (
            <div className="bg-white rounded-2xl p-5 md:p-6 shadow-xl border border-slate-200 text-slate-800">
              
              <div className="flex items-center justify-between text-[11px] text-slate-400 pb-3 mb-3 border-b border-slate-100 font-mono">
                <span className="flex items-center gap-1 text-slate-600 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  Google Search {device === 'mobile' ? 'Mobile Card' : 'Desktop Snippet'}
                </span>
                <span>google.com/search</span>
              </div>

              {device === 'mobile' ? (
                /* Mobile Card Style */
                <div className="max-w-[390px] mx-auto bg-white rounded-xl border border-slate-200 p-4 shadow-sm space-y-2 font-sans">
                  {/* Site Header */}
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-xs overflow-hidden shrink-0">
                      🌐
                    </div>
                    <div className="leading-tight overflow-hidden">
                      <div className="text-xs font-medium text-slate-900 truncate">
                        {project.author || 'Website'}
                      </div>
                      <div className="text-[11px] text-slate-500 truncate">
                        https://{cleanDomain}
                      </div>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-medium text-[#1a0dab] hover:underline cursor-pointer leading-snug">
                    {project.name}
                  </h3>

                  {/* Rating Stars (Rich Snippet) */}
                  <div className="flex items-center gap-1.5 text-xs text-slate-600 py-0.5">
                    <div className="flex text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 stroke-amber-500" />
                      ))}
                    </div>
                    <span className="font-semibold text-slate-700">{project.rating}</span>
                    <span className="text-slate-400">({project.reviewCount})</span>
                  </div>

                  {/* Snippet Description */}
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  {/* Mobile Sitelinks */}
                  <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-2 text-[11px] text-[#1a0dab]">
                    {project.sitemapUrls.slice(1, 4).map((p) => (
                      <span key={p.id} className="bg-slate-50 border border-slate-200 px-2 py-0.5 rounded hover:underline cursor-pointer">
                        {p.path.replace('/', '') || 'Home'}
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                /* Desktop Snippet Style */
                <div className="space-y-1.5 font-sans max-w-xl">
                  {/* Breadcrumb URL */}
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-[10px] shrink-0">
                      🌐
                    </div>
                    <div className="text-xs text-slate-700 truncate">
                      https://{cleanDomain} <span className="text-slate-400">›</span> {project.category.toLowerCase().replace(/\s+/g, '-')}
                    </div>
                  </div>

                  {/* Blue Title Link */}
                  <h3 className="text-lg font-normal text-[#1a0dab] hover:underline cursor-pointer leading-snug">
                    {project.name}
                  </h3>

                  {/* Rating Stars (Rich Snippet) */}
                  <div className="flex items-center gap-1.5 text-xs text-slate-600 py-0.5">
                    <div className="flex text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400 stroke-amber-500" />
                      ))}
                    </div>
                    <span className="font-medium text-slate-700">Rating: {project.rating}</span>
                    <span className="text-slate-400">• {project.reviewCount} reviews</span>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                    {project.description}
                  </p>

                  {/* Desktop Sitelinks */}
                  <div className="pt-3 grid grid-cols-2 gap-3 text-xs">
                    {project.sitemapUrls.slice(1, 3).map((u) => (
                      <div key={u.id} className="space-y-0.5">
                        <span className="text-[#1a0dab] hover:underline cursor-pointer font-medium capitalize">
                          {u.path.replace('/', '')}
                        </span>
                        <p className="text-[11px] text-slate-500 line-clamp-1">
                          Explore our {u.path.replace('/', '')} page and latest updates.
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}

          {/* FACEBOOK PREVIEW */}
          {platform === 'facebook' && (
            <div className="bg-white rounded-2xl overflow-hidden shadow-xl border border-slate-200 text-slate-800 max-w-lg mx-auto">
              <div className="p-3 bg-slate-50 border-b border-slate-200 text-[11px] text-slate-500 flex items-center justify-between">
                <span>Facebook Link Card</span>
                <span className="font-mono text-slate-400">{cleanDomain}</span>
              </div>
              <div className="relative aspect-[1200/630] bg-slate-900 overflow-hidden">
                <img
                  src={project.ogImageUrl}
                  alt={project.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
              <div className="p-4 bg-slate-50/70 border-t border-slate-200 space-y-1">
                <div className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold truncate">
                  {cleanDomain}
                </div>
                <h4 className="text-sm font-bold text-slate-900 leading-snug line-clamp-1">
                  {project.name}
                </h4>
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {project.description}
                </p>
              </div>
            </div>
          )}

          {/* TWITTER PREVIEW */}
          {platform === 'twitter' && (
            <div className="bg-slate-950 rounded-2xl overflow-hidden shadow-xl border border-slate-800 text-slate-200 max-w-lg mx-auto">
              <div className="p-3 bg-slate-900 border-b border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                <span>Twitter / X Summary Large Card</span>
                <span className="text-sky-400 font-semibold">{project.twitterHandle}</span>
              </div>
              <div className="relative aspect-[2/1] bg-slate-900 overflow-hidden">
                <img
                  src={project.ogImageUrl}
                  alt={project.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 space-y-1">
                <div className="text-[11px] text-slate-400 truncate flex items-center gap-1 font-mono">
                  <span>{cleanDomain}</span>
                </div>
                <h4 className="text-sm font-bold text-white line-clamp-1">
                  {project.name}
                </h4>
                <p className="text-xs text-slate-400 line-clamp-2">
                  {project.description}
                </p>
              </div>
            </div>
          )}

          {/* Quick Copy Snippet */}
          <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-300">
                {isBn ? 'হেডার মেটা ট্যাগ কোড:' : 'Quick Copy Meta Tags:'}
              </span>
              <button
                onClick={() => copyText(
                  `<title>${project.name}</title>\n<meta name="description" content="${project.description}" />`,
                  'quickMeta'
                )}
                className="text-blue-400 hover:text-blue-300 flex items-center gap-1 font-medium"
              >
                {copiedTag === 'quickMeta' ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-400">{isBn ? 'কপি হয়েছে' : 'Copied'}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>{isBn ? 'কপি করুন' : 'Copy'}</span>
                  </>
                )}
              </button>
            </div>
            <pre className="bg-slate-950 p-2.5 rounded border border-slate-800 font-mono text-slate-300 text-[11px] overflow-x-auto">
{`<title>${project.name}</title>
<meta name="description" content="${project.description}" />`}
            </pre>
          </div>

        </div>

        {/* Right / Bottom: Live Customization Form (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900/90 rounded-2xl border border-slate-800 p-5 space-y-4">
          
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-blue-400" />
              <span>{isBn ? 'এসইও ট্যাগ এডিটর' : 'SERP Content Editor'}</span>
            </h3>
            <span className="text-[11px] text-slate-400">
              {isBn ? 'তাৎক্ষণিক পরিবর্তন' : 'Realtime Sync'}
            </span>
          </div>

          {/* Title Editor */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <label className="font-semibold text-slate-300">
                {isBn ? 'এসইও টাইটেল (<title>):' : 'SEO Title (<title>):'}
              </label>
              <span className={`font-mono text-[11px] font-bold ${
                titleLength >= 30 && titleLength <= 60 
                  ? 'text-emerald-400' 
                  : titleLength > 60 
                  ? 'text-rose-400' 
                  : 'text-amber-400'
              }`}>
                {titleLength} / 60 {isBn ? 'অক্ষর' : 'chars'}
              </span>
            </div>
            <input
              type="text"
              value={project.name}
              onChange={(e) => onUpdateProject({ name: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
              placeholder="e.g. My Website – Fast Full Stack App"
            />
            <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all ${
                  titleLength >= 30 && titleLength <= 60 ? 'bg-emerald-500' : 'bg-amber-500'
                }`}
                style={{ width: `${Math.min(100, (titleLength / 60) * 100)}%` }}
              />
            </div>
          </div>

          {/* Meta Description Editor */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <label className="font-semibold text-slate-300">
                {isBn ? 'মেটা ডেসক্রিপশন:' : 'Meta Description:'}
              </label>
              <span className={`font-mono text-[11px] font-bold ${
                descLength >= 120 && descLength <= 160 
                  ? 'text-emerald-400' 
                  : descLength > 160 
                  ? 'text-rose-400' 
                  : 'text-amber-400'
              }`}>
                {descLength} / 160 {isBn ? 'অক্ষর' : 'chars'}
              </span>
            </div>
            <textarea
              rows={3}
              value={project.description}
              onChange={(e) => onUpdateProject({ description: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500 leading-relaxed"
              placeholder="Provide a compelling 120-160 character summary..."
            />
            <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all ${
                  descLength >= 120 && descLength <= 160 ? 'bg-emerald-500' : 'bg-amber-500'
                }`}
                style={{ width: `${Math.min(100, (descLength / 160) * 100)}%` }}
              />
            </div>
          </div>

          {/* Target URL */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-300">
              {isBn ? 'ক্যানোনিকাল ডোমেন ইউআরএল:' : 'Canonical Domain URL:'}
            </label>
            <input
              type="text"
              value={project.url}
              onChange={(e) => onUpdateProject({ url: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs font-mono text-slate-300 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Social Banner Image */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-300">
              {isBn ? 'সোশ্যাল ব্যানার ইমেজ ইউআরএল (1200x630):' : 'Social Share Image (OG Banner):'}
            </label>
            <input
              type="text"
              value={project.ogImageUrl}
              onChange={(e) => onUpdateProject({ ogImageUrl: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs font-mono text-slate-300 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Rich Snippet Stars */}
          <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-3 text-xs">
            <div>
              <span className="font-semibold text-slate-300 block">{isBn ? 'স্টার রেটিং:' : 'Review Rating:'}</span>
              <input
                type="number"
                step="0.1"
                min="1"
                max="5"
                value={project.rating}
                onChange={(e) => onUpdateProject({ rating: parseFloat(e.target.value) || 5.0 })}
                className="w-20 bg-slate-950 border border-slate-700 rounded px-2 py-1 text-xs text-white"
              />
            </div>
            <div>
              <span className="font-semibold text-slate-300 block">{isBn ? 'রিভিউ সংখ্যা:' : 'Total Reviews:'}</span>
              <input
                type="number"
                min="1"
                value={project.reviewCount}
                onChange={(e) => onUpdateProject({ reviewCount: parseInt(e.target.value, 10) || 10 })}
                className="w-24 bg-slate-950 border border-slate-700 rounded px-2 py-1 text-xs text-white"
              />
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
