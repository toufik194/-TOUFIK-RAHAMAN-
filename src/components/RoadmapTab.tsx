import React, { useState } from 'react';
import { 
  CheckCircle, 
  Circle, 
  Copy, 
  Check, 
  ExternalLink, 
  Globe, 
  FileCode, 
  FileText, 
  Search, 
  Sparkles, 
  Terminal, 
  AlertCircle,
  HelpCircle,
  ShieldCheck,
  Zap,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { WebsiteProject, Language } from '../types';
import { generateFullHeadHtml, generateSitemapXml, generateRobotsTxt, downloadFile } from '../utils/seoGenerators';

interface RoadmapTabProps {
  project: WebsiteProject;
  language: Language;
  onUpdateProject: (updated: Partial<WebsiteProject>) => void;
  onNavigateToTab: (tab: any) => void;
}

export const RoadmapTab: React.FC<RoadmapTabProps> = ({
  project,
  language,
  onUpdateProject,
  onNavigateToTab,
}) => {
  const isBn = language === 'bn';
  const [completedSteps, setCompletedSteps] = useState<number[]>([1]);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const toggleStep = (stepNumber: number) => {
    let next: number[];
    if (completedSteps.includes(stepNumber)) {
      next = completedSteps.filter((s) => s !== stepNumber);
    } else {
      next = [...completedSteps, stepNumber];
      if (next.length === 5) {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });
      }
    }
    setCompletedSteps(next);
  };

  const copyToClipboard = (text: string, sectionId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionId);
    setTimeout(() => setCopiedSection(null), 2500);
  };

  const fullHeadHtml = generateFullHeadHtml(project);
  const sitemapXml = generateSitemapXml(project);
  const robotsTxt = generateRobotsTxt(project);

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-900/60 via-slate-900 to-indigo-950/70 border border-blue-500/20 p-6 md:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isBn ? 'গুগল পাবলিশিং মাস্টার গাইড' : 'Official Google Indexing Workflow'}</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              {isBn 
                ? 'আপনার ওয়েবসাইট গুগলে পাবলিশ করার ৫টি সহজ ধাপ' 
                : '5 Easy Steps to Publish & Index Your Website on Google'}
            </h2>
            <p className="text-sm md:text-base text-slate-300 max-w-2xl leading-relaxed">
              {isBn
                ? 'গুগল কোনো ওয়েবসাইট নিজে থেকে সাথে সাথে চেনে না। এই রোডম্যাপের ধাপগুলো শেষ করলে গুগলবট আপনার সাইট ক্রল করবে এবং গুগল সার্চ রেজাল্টে প্রদর্শন করবে।'
                : 'Follow this proven checklist to deploy your code, verify site ownership with Google Search Console, submit your sitemap, and request instant crawling.'}
            </p>
          </div>

          {/* Progress Card */}
          <div className="bg-slate-900/90 border border-slate-700/80 rounded-xl p-4 min-w-[220px] shadow-lg">
            <div className="flex items-center justify-between text-xs text-slate-300 font-medium mb-2">
              <span>{isBn ? 'সম্পন্ন হয়েছে:' : 'Steps Completed:'}</span>
              <span className="font-bold text-blue-400">{completedSteps.length} / 5</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden mb-3">
              <div 
                className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${(completedSteps.length / 5) * 100}%` }}
              />
            </div>
            <div className="text-center">
              {completedSteps.length === 5 ? (
                <span className="text-xs font-bold text-emerald-400 flex items-center justify-center gap-1">
                  <CheckCircle className="w-4 h-4" />
                  {isBn ? 'সব কাজ শেষ! সাইট গুগলে সাবমিট হয়েছে' : 'All steps completed! Ready on Google.'}
                </span>
              ) : (
                <span className="text-xs text-slate-400">
                  {isBn 
                    ? `বাকি আছে ${5 - completedSteps.length}টি ধাপ` 
                    : `${5 - completedSteps.length} steps remaining`}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 5 Guided Steps Accordion / Cards */}
      <div className="space-y-6">

        {/* STEP 1 */}
        <div className={`rounded-xl border transition-all ${
          completedSteps.includes(1) 
            ? 'bg-slate-900/70 border-emerald-500/30 ring-1 ring-emerald-500/20' 
            : 'bg-slate-900/90 border-slate-800'
        }`}>
          <div className="p-5 md:p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <button 
                  onClick={() => toggleStep(1)}
                  className="mt-0.5 text-slate-400 hover:text-white transition"
                  title="Mark as completed"
                >
                  {completedSteps.includes(1) ? (
                    <CheckCircle className="w-6 h-6 text-emerald-400" />
                  ) : (
                    <Circle className="w-6 h-6 text-slate-600 hover:text-slate-400" />
                  )}
                </button>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-blue-500/20 text-blue-300">
                      STEP 1
                    </span>
                    <h3 className="text-lg font-bold text-white">
                      {isBn ? 'ওয়েবসাইট ইন্টারনেটে লাইভ (Hosting & HTTPS) করুন' : 'Host Your Website & Get a Public HTTPS URL'}
                    </h3>
                  </div>
                  <p className="text-sm text-slate-300 mt-1">
                    {isBn
                      ? 'গুগল কখনোই আপনার কম্পিউটারের "localhost:3000" ক্রল করতে পারে না। গুগল সার্চে আনতে হলে ওয়েবসাইটকে অবশ্যই পাবলিক ইন্টারনেটে লাইভ থাকতে হবে।'
                      : 'Google cannot crawl localhost. Your website must be hosted on a public server with a secure HTTPS domain.'}
                  </p>
                </div>
              </div>

              <span className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700">
                <Globe className="w-3.5 h-3.5 text-blue-400" />
                <span>Live URL</span>
              </span>
            </div>

            {/* Current Active Live URL */}
            <div className="mt-4 pt-4 border-t border-slate-800/80">
              <div className="bg-slate-950/70 rounded-lg p-3.5 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="text-xs font-medium text-slate-400 mb-1">
                    {isBn ? 'আপনার ওয়েবসাইটের বর্তমান লাইভ ইউআরএল:' : 'Your Website Public URL:'}
                  </div>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-mono font-semibold text-blue-400 hover:text-blue-300 hover:underline flex items-center gap-1.5 break-all"
                  >
                    <span>{project.url}</span>
                    <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                  </a>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="inline-flex items-center gap-1 text-xs text-emerald-400 font-semibold bg-emerald-950/60 border border-emerald-800/60 px-2 py-1 rounded">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    HTTPS OK
                  </span>
                  <button
                    onClick={() => onNavigateToTab('deploy')}
                    className="text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-1 rounded border border-slate-700 transition"
                  >
                    {isBn ? 'হোস্টিং বিস্তারিত' : 'Hosting Guide'}
                  </button>
                </div>
              </div>

              {/* Free hosting recommendations */}
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                <div className="bg-slate-800/40 p-2.5 rounded border border-slate-800">
                  <span className="font-semibold text-white block">1. Firebase Hosting</span>
                  <span className="text-slate-400">Google-এর ফ্রি ফাস্ট সিডিএন হোস্টিং (Google Cloud)।</span>
                </div>
                <div className="bg-slate-800/40 p-2.5 rounded border border-slate-800">
                  <span className="font-semibold text-white block">2. Google Cloud Run</span>
                  <span className="text-slate-400">অটো স্কেলিং ও কাস্টম ডোমেন সমর্থন।</span>
                </div>
                <div className="bg-slate-800/40 p-2.5 rounded border border-slate-800">
                  <span className="font-semibold text-white block">3. Vercel / Netlify</span>
                  <span className="text-slate-400">GitHub থেকে 1-Click অটোমেটিক ডিপ্লয়মেন্ট।</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* STEP 2 */}
        <div className={`rounded-xl border transition-all ${
          completedSteps.includes(2) 
            ? 'bg-slate-900/70 border-emerald-500/30 ring-1 ring-emerald-500/20' 
            : 'bg-slate-900/90 border-slate-800'
        }`}>
          <div className="p-5 md:p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <button 
                  onClick={() => toggleStep(2)}
                  className="mt-0.5 text-slate-400 hover:text-white transition"
                  title="Mark as completed"
                >
                  {completedSteps.includes(2) ? (
                    <CheckCircle className="w-6 h-6 text-emerald-400" />
                  ) : (
                    <Circle className="w-6 h-6 text-slate-600 hover:text-slate-400" />
                  )}
                </button>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-blue-500/20 text-blue-300">
                      STEP 2
                    </span>
                    <h3 className="text-lg font-bold text-white">
                      {isBn ? 'ওয়েবসাইটের <head> কোডে গুগল এসইও মেটা ট্যাগ বসান' : 'Inject Google SEO Meta Tags into <head>'}
                    </h3>
                  </div>
                  <p className="text-sm text-slate-300 mt-1">
                    {isBn
                      ? 'গুগলবট আপনার পেজ পড়ার সময় সবার প্রথমে <head>-এর টাইটেল, ডেসক্রিপশন, রোবট ডিরেক্টিভ এবং ক্যানোনিকাল ট্যাগ পড়ে। নিচের কোডটি আপনার index.html ফাইলে পেস্ট করুন।'
                      : 'Googlebot reads the <head> tags first to understand your title, description, canonical URL, and indexability. Copy the generated code below into index.html.'}
                  </p>
                </div>
              </div>

              <span className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700">
                <FileCode className="w-3.5 h-3.5 text-indigo-400" />
                <span>Head HTML</span>
              </span>
            </div>

            {/* Generated Code Snippet */}
            <div className="mt-4 pt-4 border-t border-slate-800/80">
              <div className="flex items-center justify-between bg-slate-950 px-4 py-2 rounded-t-lg border-t border-x border-slate-800 text-xs">
                <span className="text-slate-400 font-mono">
                  {isBn ? 'আপনার সাইটের জন্য প্রস্তুত <head> কোড:' : 'Generated <head> snippet:'}
                </span>
                <button
                  onClick={() => copyToClipboard(fullHeadHtml, 'headHtml')}
                  className="inline-flex items-center gap-1 font-semibold text-blue-400 hover:text-blue-300 transition"
                >
                  {copiedSection === 'headHtml' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">{isBn ? 'কপি হয়েছে!' : 'Copied!'}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{isBn ? 'কোড কপি করুন' : 'Copy Head Code'}</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="bg-slate-950 p-4 rounded-b-lg border-b border-x border-slate-800 overflow-x-auto text-xs font-mono text-slate-300 max-h-56 leading-relaxed">
                {fullHeadHtml}
              </pre>

              <div className="mt-2.5 flex items-center justify-between text-xs text-slate-400">
                <span>
                  💡 {isBn ? 'টিপস: React/Vite প্রজেক্টে এটি সরাসরি index.html ফাইলের <head> অংশে বসিয়ে দিন।' : 'Tip: In React/Vite, replace or append into index.html <head> tag.'}
                </span>
                <button
                  onClick={() => onNavigateToTab('serp')}
                  className="text-blue-400 hover:underline flex items-center gap-1 font-medium"
                >
                  <span>{isBn ? 'গুগল সার্চে কেমন দেখাবে দেখুন' : 'Preview on Google'}</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* STEP 3 */}
        <div className={`rounded-xl border transition-all ${
          completedSteps.includes(3) 
            ? 'bg-slate-900/70 border-emerald-500/30 ring-1 ring-emerald-500/20' 
            : 'bg-slate-900/90 border-slate-800'
        }`}>
          <div className="p-5 md:p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <button 
                  onClick={() => toggleStep(3)}
                  className="mt-0.5 text-slate-400 hover:text-white transition"
                  title="Mark as completed"
                >
                  {completedSteps.includes(3) ? (
                    <CheckCircle className="w-6 h-6 text-emerald-400" />
                  ) : (
                    <Circle className="w-6 h-6 text-slate-600 hover:text-slate-400" />
                  )}
                </button>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-blue-500/20 text-blue-300">
                      STEP 3
                    </span>
                    <h3 className="text-lg font-bold text-white">
                      {isBn ? 'Sitemap.xml ও Robots.txt ফাইল সাইটে যুক্ত করুন' : 'Generate & Place sitemap.xml and robots.txt'}
                    </h3>
                  </div>
                  <p className="text-sm text-slate-300 mt-1">
                    {isBn
                      ? 'সাইটম্যাপ গুগলকে আপনার সব পেজের তালিকা দেয়, আর Robots.txt গুগলবটকে সাইটের রুট ফোল্ডার ক্রল করার অনুমতি দেয়। ফাইল দুটি আপনার প্রজেক্টের public/ ফোল্ডারে রাখুন।'
                      : 'Sitemap.xml gives Google a roadmap of all your URLs, while robots.txt instructs Googlebot how to crawl. Place them in your /public folder.'}
                  </p>
                </div>
              </div>

              <span className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700">
                <FileText className="w-3.5 h-3.5 text-amber-400" />
                <span>Crawling Files</span>
              </span>
            </div>

            {/* Quick Download Buttons */}
            <div className="mt-4 pt-4 border-t border-slate-800/80">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Sitemap card */}
                <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-sm text-white flex items-center gap-1.5">
                      <FileCode className="w-4 h-4 text-blue-400" />
                      <span>sitemap.xml</span>
                    </span>
                    <span className="text-[11px] bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded">
                      {project.sitemapUrls.length} {isBn ? 'টি পেজ' : 'URLs'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mb-3">
                    {isBn ? 'আপনার সাইটের সব পেজের তালিকা সম্বলিত গুগল এক্সএমএল ফাইল।' : 'Standard Google XML sitemap format containing all internal pages.'}
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => downloadFile('sitemap.xml', sitemapXml, 'application/xml')}
                      className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition shadow"
                    >
                      {isBn ? 'sitemap.xml ডাউনলোড' : 'Download sitemap.xml'}
                    </button>
                    <button
                      onClick={() => copyToClipboard(sitemapXml, 'sitemapXml')}
                      className="text-xs font-medium px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
                    >
                      {copiedSection === 'sitemapXml' ? (isBn ? 'কপি হয়েছে' : 'Copied') : (isBn ? 'কপি' : 'Copy')}
                    </button>
                  </div>
                </div>

                {/* Robots.txt card */}
                <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-sm text-white flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-emerald-400" />
                      <span>robots.txt</span>
                    </span>
                    <span className="text-[11px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded">
                      Googlebot Ready
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mb-3">
                    {isBn ? 'গুগলবট এবং অন্যান্য সার্চ রোবটকে ক্রল করার অনুমতি প্রদান করে।' : 'Crawler instructions allowing Googlebot and specifying sitemap location.'}
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => downloadFile('robots.txt', robotsTxt, 'text/plain')}
                      className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition shadow"
                    >
                      {isBn ? 'robots.txt ডাউনলোড' : 'Download robots.txt'}
                    </button>
                    <button
                      onClick={() => copyToClipboard(robotsTxt, 'robotsTxt')}
                      className="text-xs font-medium px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
                    >
                      {copiedSection === 'robotsTxt' ? (isBn ? 'কপি হয়েছে' : 'Copied') : (isBn ? 'কপি' : 'Copy')}
                    </button>
                  </div>
                </div>

              </div>

              <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
                <span>
                  📁 {isBn ? 'ফাইল দুটিকে আপনার প্রজেক্টের public/ ফোল্ডারে রাখুন যাতে https://yourdomain.com/sitemap.xml লিংকে দেখা যায়।' : 'Place these in your /public directory so they resolve at /sitemap.xml and /robots.txt.'}
                </span>
                <button
                  onClick={() => onNavigateToTab('sitemap')}
                  className="text-blue-400 hover:underline flex items-center gap-1 font-medium"
                >
                  <span>{isBn ? 'পেজ ও রোবটস কাস্টমাইজ করুন' : 'Edit Sitemap & Rules'}</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* STEP 4 */}
        <div className={`rounded-xl border transition-all ${
          completedSteps.includes(4) 
            ? 'bg-slate-900/70 border-emerald-500/30 ring-1 ring-emerald-500/20' 
            : 'bg-slate-900/90 border-slate-800'
        }`}>
          <div className="p-5 md:p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <button 
                  onClick={() => toggleStep(4)}
                  className="mt-0.5 text-slate-400 hover:text-white transition"
                  title="Mark as completed"
                >
                  {completedSteps.includes(4) ? (
                    <CheckCircle className="w-6 h-6 text-emerald-400" />
                  ) : (
                    <Circle className="w-6 h-6 text-slate-600 hover:text-slate-400" />
                  )}
                </button>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-blue-500/20 text-blue-300">
                      STEP 4
                    </span>
                    <h3 className="text-lg font-bold text-white">
                      {isBn ? 'Google Search Console-এ ওয়েবসাইট যুক্ত ও ভেরিফাই করুন' : 'Add Property & Verify Ownership in Google Search Console'}
                    </h3>
                  </div>
                  <p className="text-sm text-slate-300 mt-1">
                    {isBn
                      ? 'এটি গুগলের অফিসিয়াল প্ল্যাটফর্ম। এখানে সাইট ভেরিফাই না করলে গুগল ঠিকমতো ইনডেক্সিং শুরু করবে না।'
                      : 'Google Search Console (GSC) is the official portal to monitor, maintain, and troubleshoot your site presence on Google Search results.'}
                  </p>
                </div>
              </div>

              <a
                href="https://search.google.com/search-console"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition shadow"
              >
                <span>Google Search Console</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Step 4 Walkthrough & Verification Generator */}
            <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-4">
              
              <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 space-y-3">
                <div className="font-semibold text-xs text-slate-300">
                  {isBn ? 'সার্চ কনসোলে ভেরিফিকেশন করার সবচেয়ে সহজ পদ্ধতি:' : 'Fastest Verification Method: HTML Tag'}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 space-y-1">
                    <div className="font-bold text-blue-400">১. প্রপার্টি যোগ করুন (Add Property)</div>
                    <div className="text-slate-400">
                      Google Search Console-এ লগইন করে <strong className="text-slate-200">"URL prefix"</strong> সিলেক্ট করুন এবং আপনার ওয়েবসাইটের লিংক দিন: <span className="font-mono text-slate-300 text-[11px]">{project.url}</span>
                    </div>
                  </div>

                  <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 space-y-1">
                    <div className="font-bold text-blue-400">২. HTML Tag কপি করে বসান</div>
                    <div className="text-slate-400">
                      "HTML Tag" অপশন সিলেক্ট করে কোডটি কপি করুন। নিচে পেস্ট করলে অটোমেটিক আপনার সাইটের হেড কোডে যুক্ত হয়ে যাবে।
                    </div>
                  </div>
                </div>

                {/* Verification Code Input */}
                <div className="mt-2">
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    {isBn ? 'আপনার Google Verification Code টি এখানে পেস্ট করুন:' : 'Paste your Google Verification Token:'}
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={project.googleVerificationCode}
                      onChange={(e) => onUpdateProject({ googleVerificationCode: e.target.value })}
                      placeholder="google-site-verification=AbCdEfGh..."
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs font-mono text-slate-200 focus:outline-none focus:border-blue-500"
                    />
                    <button
                      onClick={() => {
                        const token = project.googleVerificationCode.replace('google-site-verification=', '');
                        downloadFile(`google${token.slice(0, 16)}.html`, `google-site-verification: google${token.slice(0, 16)}.html`, 'text/html');
                      }}
                      className="shrink-0 text-xs font-medium px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
                      title="Download HTML verification file"
                    >
                      {isBn ? 'HTML ফাইল ডাউনলোড' : 'Download HTML File'}
                    </button>
                  </div>
                </div>

                {/* Direct link to GSC */}
                <div className="pt-1 flex items-center justify-between">
                  <span className="text-[11px] text-emerald-400 flex items-center gap-1 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    {isBn ? 'ভেরিফিকেশন ট্যাগ হেড কোডে অটো যুক্ত করা আছে' : 'Verification tag automatically synced with Head HTML'}
                  </span>
                  <a
                    href="https://search.google.com/search-console"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-400 hover:underline flex items-center gap-1 font-semibold"
                  >
                    <span>{isBn ? 'সার্চ কনসোলে গিয়ে Verify বাটনে চাপুন' : 'Click "Verify" in Search Console'}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* STEP 5 */}
        <div className={`rounded-xl border transition-all ${
          completedSteps.includes(5) 
            ? 'bg-slate-900/70 border-emerald-500/30 ring-1 ring-emerald-500/20' 
            : 'bg-slate-900/90 border-slate-800'
        }`}>
          <div className="p-5 md:p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <button 
                  onClick={() => toggleStep(5)}
                  className="mt-0.5 text-slate-400 hover:text-white transition"
                  title="Mark as completed"
                >
                  {completedSteps.includes(5) ? (
                    <CheckCircle className="w-6 h-6 text-emerald-400" />
                  ) : (
                    <Circle className="w-6 h-6 text-slate-600 hover:text-slate-400" />
                  )}
                </button>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-blue-500/20 text-blue-300">
                      STEP 5
                    </span>
                    <h3 className="text-lg font-bold text-white">
                      {isBn ? 'সাইটম্যাপ জমা দিন এবং দ্রুত ইনডেক্সিং অনুরোধ (Request Indexing) করুন' : 'Submit Sitemap & Request Instant Crawling in GSC'}
                    </h3>
                  </div>
                  <p className="text-sm text-slate-300 mt-1">
                    {isBn
                      ? 'ভেরিফিকেশন সম্পন্ন হওয়ার পর সার্চ কনসোলে সাইটম্যাপ সাবমিট করুন এবং URL Inspection দিয়ে গুগলকে দ্রুত পেজ ইনডেক্স করার সিগনাল পাঠান।'
                      : 'Once verified, submit sitemap.xml in the Sitemaps tab, then use URL Inspection to request rapid indexing by Googlebot.'}
                  </p>
                </div>
              </div>

              <span className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>Instant Crawl</span>
              </span>
            </div>

            {/* Step 5 Execution Box */}
            <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-4">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                
                {/* Submit sitemap box */}
                <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 space-y-2">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-[11px]">১</span>
                    <span>{isBn ? 'Sitemaps জমা দেওয়ার নিয়ম' : 'How to Submit Sitemap'}</span>
                  </div>
                  <p className="text-slate-400 leading-relaxed">
                    {isBn
                      ? 'সার্চ কনসোলের বাম পাশের মেনু থেকে "Sitemaps"-এ ক্লিক করুন। এরপর "Add a new sitemap" বক্সে শুধুমাত্র লিখুন:'
                      : 'In Google Search Console left menu, click "Sitemaps", and in "Add a new sitemap" input type:'}
                  </p>
                  <div className="bg-slate-900 p-2.5 rounded border border-slate-700 font-mono text-blue-400 font-semibold flex items-center justify-between">
                    <span>sitemap.xml</span>
                    <button
                      onClick={() => copyToClipboard('sitemap.xml', 'sitemapName')}
                      className="text-slate-400 hover:text-white"
                    >
                      {copiedSection === 'sitemapName' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    {isBn ? 'তারপর "Submit" বাটনে ক্লিক করুন। গুগল সাথে সাথে সাইটের পেজগুলো পড়ে নেবে।' : 'Then click "Submit". Google will schedule crawling for all listed URLs.'}
                  </p>
                </div>

                {/* URL Inspection box */}
                <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 space-y-2">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-[11px]">২</span>
                    <span>{isBn ? 'দ্রুত ইনডেক্স করার অনুরোধ (Request Indexing)' : 'Request Rapid Crawling'}</span>
                  </div>
                  <p className="text-slate-400 leading-relaxed">
                    {isBn
                      ? 'সার্চ কনসোলের উপরের সার্চ বারে আপনার হোমপেজ বা যেকোনো পেজের লিংক পেস্ট করে Enter চাপুন। এরপর ক্লিক করুন:'
                      : 'Paste your URL in the top search bar in GSC, hit Enter, then click:'}
                  </p>
                  <div className="bg-slate-900 p-2.5 rounded border border-slate-700 font-semibold text-emerald-400 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>"Request Indexing"</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    {isBn ? 'এর ফলে গুগলবট ২৪ থেকে ৪৮ ঘণ্টার মধ্যে আপনার সাইট ক্রল করে সার্চ রেজাল্টে নিয়ে আসবে।' : 'Googlebot typically crawls priority-requested pages within 24–48 hours.'}
                  </p>
                </div>

              </div>

              {/* Congratulation completion message */}
              <div className="bg-emerald-950/30 border border-emerald-800/40 p-3.5 rounded-xl flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-emerald-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    {isBn 
                      ? 'অভিনন্দন! এই ৫টি ধাপ সম্পন্ন করার মাধ্যমে আপনার ওয়েবসাইট গুগলে সম্পূর্ণভাবে সাবমিট হয়ে যাবে।'
                      : 'Congratulations! Completing these 5 steps makes your site fully recognized and indexed by Google.'}
                  </span>
                </div>
                <button
                  onClick={() => onNavigateToTab('audit')}
                  className="font-bold text-emerald-400 hover:text-emerald-300 hover:underline shrink-0"
                >
                  {isBn ? 'প্রস্তুতি অডিট চেক করুন →' : 'Run Readiness Audit →'}
                </button>
              </div>

            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
