import React, { useState } from 'react';
import { 
  FileCode, 
  FileText, 
  Plus, 
  Trash2, 
  Download, 
  Copy, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  Sliders, 
  ExternalLink,
  Info
} from 'lucide-react';
import { WebsiteProject, Language, SitemapUrl } from '../types';
import { generateSitemapXml, generateRobotsTxt, downloadFile } from '../utils/seoGenerators';

interface SitemapRobotsTabProps {
  project: WebsiteProject;
  language: Language;
  onUpdateProject: (updated: Partial<WebsiteProject>) => void;
}

export const SitemapRobotsTab: React.FC<SitemapRobotsTabProps> = ({
  project,
  language,
  onUpdateProject,
}) => {
  const isBn = language === 'bn';
  const [activeSubTab, setActiveSubTab] = useState<'sitemap' | 'robots'>('sitemap');
  const [copiedType, setCopiedType] = useState<string | null>(null);

  // New URL state
  const [newPath, setNewPath] = useState('');
  const [newPriority, setNewPriority] = useState<number>(0.8);
  const [newFreq, setNewFreq] = useState<SitemapUrl['changefreq']>('weekly');

  // Disallow input
  const [newDisallow, setNewDisallow] = useState('');

  const sitemapXml = generateSitemapXml(project);
  const robotsTxt = generateRobotsTxt(project);

  const handleAddUrl = () => {
    if (!newPath.trim()) return;
    const formattedPath = newPath.startsWith('/') ? newPath : `/${newPath}`;
    const newEntry: SitemapUrl = {
      id: Date.now().toString(),
      path: formattedPath,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: newFreq,
      priority: newPriority,
    };
    onUpdateProject({
      sitemapUrls: [...project.sitemapUrls, newEntry],
    });
    setNewPath('');
  };

  const handleDeleteUrl = (id: string) => {
    onUpdateProject({
      sitemapUrls: project.sitemapUrls.filter((u) => u.id !== id),
    });
  };

  const handleAddDisallow = () => {
    if (!newDisallow.trim()) return;
    const path = newDisallow.startsWith('/') ? newDisallow : `/${newDisallow}`;
    onUpdateProject({
      robotsRules: {
        ...project.robotsRules,
        disallowedPaths: [...project.robotsRules.disallowedPaths, path],
      },
    });
    setNewDisallow('');
  };

  const handleDeleteDisallow = (path: string) => {
    onUpdateProject({
      robotsRules: {
        ...project.robotsRules,
        disallowedPaths: project.robotsRules.disallowedPaths.filter((p) => p !== path),
      },
    });
  };

  const copyText = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      
      {/* Subtab Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/90 p-4 rounded-2xl border border-slate-800">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span>{isBn ? 'সাইটম্যাপ ও রোবটস ম্যানেজার' : 'Sitemap.xml & Robots.txt Studio'}</span>
            <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-mono">
              Googlebot Config
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            {isBn 
              ? 'গুগল সার্চ কনসোলে সাবমিট করার জন্য এক্সএমএল সাইটম্যাপ এবং রোবটস ফাইল পরিচালনা করুন।'
              : 'Configure search engine crawling rules and page discovery sitemaps.'}
          </p>
        </div>

        <div className="bg-slate-800 p-1 rounded-xl flex items-center border border-slate-700">
          <button
            onClick={() => setActiveSubTab('sitemap')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
              activeSubTab === 'sitemap' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>sitemap.xml</span>
          </button>
          <button
            onClick={() => setActiveSubTab('robots')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
              activeSubTab === 'robots' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>robots.txt</span>
          </button>
        </div>
      </div>

      {/* SITEMAP VIEW */}
      {activeSubTab === 'sitemap' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left: Add / Manage URLs (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Add New URL Card */}
            <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                <Plus className="w-4 h-4 text-blue-400" />
                <span>{isBn ? 'নতুন পেজ / ইউআরএল যুক্ত করুন' : 'Add Web Page to Sitemap'}</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 text-xs">
                <div className="sm:col-span-6">
                  <label className="text-[11px] text-slate-400 block mb-1">
                    {isBn ? 'পেজ পাথ (যেমন /contact):' : 'Page Path (e.g. /contact):'}
                  </label>
                  <input
                    type="text"
                    value={newPath}
                    onChange={(e) => setNewPath(e.target.value)}
                    placeholder="/contact"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500 font-mono"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label className="text-[11px] text-slate-400 block mb-1">
                    {isBn ? 'ফ্রিকোয়েন্সি:' : 'Frequency:'}
                  </label>
                  <select
                    value={newFreq}
                    onChange={(e) => setNewFreq(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2 py-2 text-xs text-slate-300 focus:outline-none"
                  >
                    <option value="daily">daily</option>
                    <option value="weekly">weekly</option>
                    <option value="monthly">monthly</option>
                    <option value="yearly">yearly</option>
                  </select>
                </div>

                <div className="sm:col-span-3">
                  <label className="text-[11px] text-slate-400 block mb-1">
                    {isBn ? 'প্রায়োরিটি:' : 'Priority:'}
                  </label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(parseFloat(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2 py-2 text-xs text-slate-300 focus:outline-none"
                  >
                    <option value={1.0}>1.0 (Home)</option>
                    <option value={0.9}>0.9 (Key)</option>
                    <option value={0.8}>0.8 (Main)</option>
                    <option value={0.7}>0.7 (Sub)</option>
                    <option value={0.5}>0.5 (Info)</option>
                  </select>
                </div>
              </div>

              <div className="pt-1 flex justify-end">
                <button
                  onClick={handleAddUrl}
                  disabled={!newPath.trim()}
                  className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-xs font-semibold flex items-center gap-1.5 transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{isBn ? 'পেজ যুক্ত করুন' : 'Add URL'}</span>
                </button>
              </div>
            </div>

            {/* URL List */}
            <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-4 space-y-3">
              <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800">
                <span className="font-bold text-white">
                  {isBn ? 'বর্তমান পেজ তালিকা:' : 'Included Sitemap Pages:'} ({project.sitemapUrls.length})
                </span>
                <span className="text-[11px] text-slate-400">
                  Base: {project.url.replace(/\/$/, '')}
                </span>
              </div>

              <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                {project.sitemapUrls.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950 border border-slate-800/80 text-xs"
                  >
                    <div className="space-y-0.5 overflow-hidden">
                      <div className="font-mono font-medium text-white truncate">
                        {item.path}
                      </div>
                      <div className="text-[11px] text-slate-400 flex items-center gap-2">
                        <span>Freq: <span className="text-slate-300">{item.changefreq}</span></span>
                        <span>•</span>
                        <span>Priority: <span className="text-blue-400 font-semibold">{item.priority.toFixed(1)}</span></span>
                        <span>•</span>
                        <span>Modified: <span className="text-slate-300">{item.lastmod}</span></span>
                      </div>
                    </div>

                    {item.path !== '/' && (
                      <button
                        onClick={() => handleDeleteUrl(item.id)}
                        className="text-slate-500 hover:text-rose-400 p-1 transition"
                        title="Remove page"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right: Live XML Preview & Download (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white flex items-center gap-1.5 font-mono">
                  <FileCode className="w-4 h-4 text-blue-400" />
                  <span>sitemap.xml</span>
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => copyText(sitemapXml, 'sitemap')}
                    className="text-xs text-slate-300 hover:text-white flex items-center gap-1 bg-slate-800 px-2.5 py-1 rounded border border-slate-700 transition"
                  >
                    {copiedType === 'sitemap' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedType === 'sitemap' ? (isBn ? 'কপি হয়েছে' : 'Copied') : (isBn ? 'কপি' : 'Copy')}</span>
                  </button>
                  <button
                    onClick={() => downloadFile('sitemap.xml', sitemapXml, 'application/xml')}
                    className="text-xs font-semibold px-2.5 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white transition flex items-center gap-1"
                  >
                    <Download className="w-3 h-3" />
                    <span>{isBn ? 'ডাউনলোড' : 'Download'}</span>
                  </button>
                </div>
              </div>

              <pre className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-[11px] font-mono text-slate-300 overflow-x-auto max-h-96 leading-relaxed">
                {sitemapXml}
              </pre>

              <div className="text-[11px] text-slate-400 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80 flex items-start gap-2">
                <Info className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                <span>
                  {isBn
                    ? 'ফাইলটি আপনার প্রোজেক্টের public/sitemap.xml লোকেশনে রাখুন। এরপর Google Search Console-এ "sitemap.xml" লিখে Submit করুন।'
                    : 'Save in your /public folder. Then in Google Search Console, submit "sitemap.xml".'}
                </span>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* ROBOTS VIEW */}
      {activeSubTab === 'robots' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left: Configure Crawlers & Rules (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Disallow Rules Manager */}
            <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                <Sliders className="w-4 h-4 text-indigo-400" />
                <span>{isBn ? 'গুগল ক্রলারের জন্য Disallow পাথ পরিচালনা' : 'Disallowed Paths (Private / Admin)'}</span>
              </h3>
              <p className="text-xs text-slate-400">
                {isBn
                  ? 'যেসব পেজ বা ফোল্ডার আপনি চান না গুগল সার্চে আসুক (যেমন অ্যাডমিন প্যানেল, প্রাইভেট এপিআই), সেগুলোর পাথ দিন।'
                  : 'Paths you want Googlebot and crawlers NOT to index, such as admin dashboards or internal APIs.'}
              </p>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={newDisallow}
                  onChange={(e) => setNewDisallow(e.target.value)}
                  placeholder="/admin"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
                />
                <button
                  onClick={handleAddDisallow}
                  disabled={!newDisallow.trim()}
                  className="px-3.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-semibold shrink-0 transition"
                >
                  {isBn ? 'Disallow যোগ করুন' : 'Add Rule'}
                </button>
              </div>

              {/* List of Disallowed */}
              <div className="space-y-1.5 pt-2">
                {project.robotsRules.disallowedPaths.map((path) => (
                  <div
                    key={path}
                    className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300"
                  >
                    <span>Disallow: <strong className="text-rose-400">{path}</strong></span>
                    <button
                      onClick={() => handleDeleteDisallow(path)}
                      className="text-slate-500 hover:text-rose-400 p-1 transition"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Allowed Crawlers */}
            <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>{isBn ? 'অনুমোদিত সার্চ ইঞ্জিন বট' : 'Target Search Bots'}</span>
              </h3>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {['Googlebot', 'Googlebot-Image', 'Bingbot', 'DuckDuckBot'].map((bot) => (
                  <div key={bot} className="flex items-center gap-2 bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-slate-200 font-medium">{bot}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right: Live Robots.txt & Download (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white flex items-center gap-1.5 font-mono">
                  <FileText className="w-4 h-4 text-emerald-400" />
                  <span>robots.txt</span>
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => copyText(robotsTxt, 'robots')}
                    className="text-xs text-slate-300 hover:text-white flex items-center gap-1 bg-slate-800 px-2.5 py-1 rounded border border-slate-700 transition"
                  >
                    {copiedType === 'robots' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedType === 'robots' ? (isBn ? 'কপি হয়েছে' : 'Copied') : (isBn ? 'কপি' : 'Copy')}</span>
                  </button>
                  <button
                    onClick={() => downloadFile('robots.txt', robotsTxt, 'text/plain')}
                    className="text-xs font-semibold px-2.5 py-1 rounded bg-indigo-600 hover:bg-indigo-500 text-white transition flex items-center gap-1"
                  >
                    <Download className="w-3 h-3" />
                    <span>{isBn ? 'ডাউনলোড' : 'Download'}</span>
                  </button>
                </div>
              </div>

              <pre className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-[11px] font-mono text-slate-300 overflow-x-auto max-h-96 leading-relaxed">
                {robotsTxt}
              </pre>

              <div className="text-[11px] text-slate-400 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80 flex items-start gap-2">
                <Info className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                <span>
                  {isBn
                    ? 'ফাইলটি আপনার ওয়েবসাইটের public/robots.txt হিসেবে সংরক্ষণ করুন।'
                    : 'Place at /public/robots.txt so it resolves at your root domain.'}
                </span>
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
