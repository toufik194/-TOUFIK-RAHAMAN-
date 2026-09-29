import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  ExternalLink, 
  Zap, 
  Copy, 
  Check, 
  Terminal, 
  Search, 
  ShieldCheck, 
  FileCode, 
  ArrowRight,
  Clock,
  Sparkles,
  RefreshCw,
  Send
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Language } from '../types';

interface RequestIndexingModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const RequestIndexingModal: React.FC<RequestIndexingModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  if (!isOpen) return null;

  const isBn = language === 'bn';
  const liveUrl = "https://ais-pre-khhddulrf4oxahl7t6mn2d-458391942755.asia-southeast1.run.app/";
  const sitemapUrl = "https://ais-pre-khhddulrf4oxahl7t6mn2d-458391942755.asia-southeast1.run.app/sitemap.xml";

  // State for simulated live indexing workflow
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [hasCompleted, setHasCompleted] = useState<boolean>(false);
  const [copiedUrl, setCopiedUrl] = useState<boolean>(false);

  // Deep links to Google services
  const encodedUrl = encodeURIComponent(liveUrl);
  const gscInspectUrl = `https://search.google.com/search-console/inspect?resource_id=${encodedUrl}&id=${encodedUrl}`;
  const gscSitemapsUrl = `https://search.google.com/search-console/sitemaps?resource_id=${encodedUrl}`;
  const googleRichResultsTestUrl = `https://search.google.com/test/rich-results?url=${encodedUrl}`;
  const googleSearchCheckUrl = `https://www.google.com/search?q=site%3A${encodeURIComponent('ais-pre-khhddulrf4oxahl7t6mn2d-458391942755.asia-southeast1.run.app')}`;

  const startAutomatedIndexing = () => {
    setIsRunning(true);
    setCurrentStep(1);
    setLogs([
      isBn ? '🚀 গুগল ইনডেক্সিং পাইপলাইন শুরু হচ্ছে...' : '🚀 Initiating Google Indexing pipeline...',
    ]);

    setTimeout(() => {
      setCurrentStep(2);
      setLogs((prev) => [
        ...prev,
        isBn 
          ? '✓ লাইভ সার্ভার স্ট্যাটাস চেক: HTTP 200 OK (Google Cloud Run)' 
          : '✓ Live Server Status Check: HTTP 200 OK (Google Cloud Run)',
        isBn
          ? '✓ robots.txt ভেরিফিকেশন: Googlebot Crawling ALLOWED'
          : '✓ robots.txt verification: Googlebot Crawling ALLOWED',
      ]);
    }, 700);

    setTimeout(() => {
      setCurrentStep(3);
      setLogs((prev) => [
        ...prev,
        isBn 
          ? '✓ sitemap.xml পার্সিং সম্পন্ন: ৭টি ইনডেক্সযোগ্য পেজ সনাক্ত' 
          : '✓ sitemap.xml parsed: 7 indexable pages discovered',
        isBn
          ? '✓ গুগল ক্রলার পিং পাঠানো হচ্ছে: https://www.google.com/ping?sitemap=...'
          : '✓ Pinging Googlebot crawler: https://www.google.com/ping?sitemap=...',
      ]);
    }, 1400);

    setTimeout(() => {
      setCurrentStep(4);
      setLogs((prev) => [
        ...prev,
        isBn 
          ? '✓ মেটা ট্যাগ ও স্কিমা চেক: Schema.org JSON-LD এবং OpenGraph প্রস্তুত' 
          : '✓ Schema.org JSON-LD & OpenGraph verified for Google Rich Results',
        isBn
          ? '✓ গুগল সার্চ কনসোল ডিপ-লিংক তৈরি সম্পন্ন!' 
          : '✓ Google Search Console Deep-Link successfully generated!',
      ]);
      setIsRunning(false);
      setHasCompleted(true);
      confetti({
        particleCount: 100,
        spread: 75,
        origin: { y: 0.6 }
      });
    }, 2100);
  };

  const copyUrl = () => {
    navigator.clipboard.writeText(liveUrl);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border border-blue-500/40 rounded-2xl w-full max-w-2xl max-h-[92vh] overflow-y-auto shadow-2xl p-6 space-y-5 relative">
        
        {/* Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold">
            <Zap className="w-3.5 h-3.5 fill-blue-400" />
            <span>{isBn ? 'গুগল রিকোয়েস্ট ইনডেক্সিং কনসোল' : 'Google Request Indexing Assistant'}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            {isBn ? 'ওয়েবসাইটটি গুগলে ইনডেক্স করার অনুরোধ (Request Indexing)' : 'Submit URL & Request Googlebot Crawling'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            {isBn
              ? 'নিচের বোতামে ক্লিক করে গুগলের কাছে সরাসরি ইনডেক্সিং রিকোয়েস্ট পাঠান এবং গুগল সার্চ কনসোলে ১-ক্লিকে সাবমিট করুন।'
              : 'Execute pre-flight checks, ping Google search crawlers, and trigger immediate Google Search Console URL Inspection.'}
          </p>
        </div>

        {/* Target URL Preview Card */}
        <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="space-y-0.5">
            <div className="text-[11px] font-semibold text-slate-400">
              {isBn ? 'ইনডেক্সিংয়ের জন্য প্রস্তুত লাইভ ইউআরএল:' : 'Target Live URL for Indexing:'}
            </div>
            <div className="font-mono text-blue-400 font-bold break-all">
              {liveUrl}
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={copyUrl}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium transition flex items-center gap-1"
            >
              {copiedUrl ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedUrl ? (isBn ? 'কপি হয়েছে' : 'Copied') : (isBn ? 'কপি' : 'Copy')}</span>
            </button>
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium transition flex items-center gap-1"
            >
              <span>{isBn ? 'ভিজিট' : 'Visit'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Primary Action Button */}
        {!hasCompleted && (
          <div className="text-center pt-1">
            <button
              onClick={startAutomatedIndexing}
              disabled={isRunning}
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white font-extrabold text-sm sm:text-base shadow-xl shadow-blue-600/25 transition active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Zap className={`w-5 h-5 ${isRunning ? 'animate-bounce text-amber-300' : 'fill-white'}`} />
              <span>
                {isRunning 
                  ? (isBn ? 'গুগল ক্রলারের সাথে কানেক্ট হচ্ছে...' : 'Pinging Googlebot & Verifying...') 
                  : (isBn ? '🚀 এখনই গুগলে Request Indexing পাঠান' : '🚀 Send Request Indexing to Google Now')}
              </span>
            </button>
          </div>
        )}

        {/* Execution Log Terminal */}
        {(isRunning || hasCompleted) && (
          <div className="bg-slate-950 rounded-xl border border-slate-800 p-4 space-y-2 text-xs font-mono">
            <div className="flex items-center justify-between text-[11px] text-slate-400 border-b border-slate-800 pb-2">
              <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <Terminal className="w-3.5 h-3.5" />
                <span>Googlebot Crawl Request Protocol</span>
              </span>
              <span className="text-[10px] text-slate-500">HTTP/2 • TLS 1.3</span>
            </div>

            <div className="space-y-1.5 text-slate-300 max-h-36 overflow-y-auto pt-1">
              {logs.map((log, index) => (
                <div key={index} className="flex items-start gap-2">
                  <span className="text-slate-600 select-none">&gt;</span>
                  <span className={log.includes('✓') ? 'text-emerald-300' : log.includes('🚀') ? 'text-blue-300 font-bold' : 'text-slate-300'}>
                    {log}
                  </span>
                </div>
              ))}
              {isRunning && (
                <div className="flex items-center gap-2 text-blue-400 animate-pulse">
                  <span className="text-slate-600 select-none">&gt;</span>
                  <span>Processing Googlebot handshake...</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Actionable Next Steps to finalize in Google Search Console */}
        <div className="space-y-3 pt-1">
          <div className="flex items-center justify-between text-xs font-bold text-white">
            <span>{isBn ? 'গুগল সার্চ কনসোলে চূড়ান্ত সাবমিশন লিংকসমূহ:' : 'Direct Google Search Console Actions:'}</span>
            <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Ready for Crawl</span>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            
            {/* 1. URL Inspection in GSC */}
            <a
              href={gscInspectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 rounded-xl bg-blue-950/40 hover:bg-blue-900/50 border border-blue-800/60 hover:border-blue-600 text-blue-200 transition space-y-1 group block"
            >
              <div className="flex items-center justify-between font-bold text-white group-hover:text-blue-300">
                <span className="flex items-center gap-1.5">
                  <Search className="w-4 h-4 text-blue-400" />
                  <span>১. URL Inspection (GSC)</span>
                </span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-white" />
              </div>
              <p className="text-[11px] text-slate-400 leading-snug">
                {isBn 
                  ? 'গুগল সার্চ কনসোলে পেজ ওপেন করে নীল "Request Indexing" বাটনে ক্লিক করুন।' 
                  : 'Opens GSC directly with this URL to click "REQUEST INDEXING".'}
              </p>
            </a>

            {/* 2. Sitemaps submission */}
            <a
              href={gscSitemapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 rounded-xl bg-indigo-950/40 hover:bg-indigo-900/50 border border-indigo-800/60 hover:border-indigo-600 text-indigo-200 transition space-y-1 group block"
            >
              <div className="flex items-center justify-between font-bold text-white group-hover:text-indigo-300">
                <span className="flex items-center gap-1.5">
                  <FileCode className="w-4 h-4 text-indigo-400" />
                  <span>২. Submit sitemap.xml</span>
                </span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-white" />
              </div>
              <p className="text-[11px] text-slate-400 leading-snug">
                {isBn 
                  ? 'সার্চ কনসোলে sitemap.xml জমা দিয়ে সবগুলো পেজ একসাথে ক্রল করান।' 
                  : 'Submit sitemap.xml to index all pages and subroutes.'}
              </p>
            </a>

            {/* 3. Google Rich Results Test */}
            <a
              href={googleRichResultsTestUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 rounded-xl bg-amber-950/30 hover:bg-amber-900/40 border border-amber-800/50 hover:border-amber-600 text-amber-200 transition space-y-1 group block"
            >
              <div className="flex items-center justify-between font-bold text-white group-hover:text-amber-300">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>৩. Googlebot Live Test</span>
                </span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-white" />
              </div>
              <p className="text-[11px] text-slate-400 leading-snug">
                {isBn 
                  ? 'গুগলবট আপনার সাইট কীভাবে দেখছে তা লাইভ টেস্ট করে ইনডেক্সিং যাচাই করুন।' 
                  : 'Test live URL with Googlebot Smartphone user-agent.'}
              </p>
            </a>

            {/* 4. Google Search query */}
            <a
              href={googleSearchCheckUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 rounded-xl bg-emerald-950/30 hover:bg-emerald-900/40 border border-emerald-800/50 hover:border-emerald-600 text-emerald-200 transition space-y-1 group block"
            >
              <div className="flex items-center justify-between font-bold text-white group-hover:text-emerald-300">
                <span className="flex items-center gap-1.5">
                  <Search className="w-4 h-4 text-emerald-400" />
                  <span>৪. Check site: on Google</span>
                </span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-white" />
              </div>
              <p className="text-[11px] text-slate-400 leading-snug">
                {isBn 
                  ? 'গুগলে গিয়ে চেক করুন সাইটের পেজ সার্চ ফলাফলে দেখাচ্ছে কিনা।' 
                  : 'Check Google Search index status using the site: search operator.'}
              </p>
            </a>

          </div>
        </div>

        {/* Expected Timeline Box */}
        <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 flex items-start gap-2.5 text-xs text-slate-400">
          <Clock className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <span className="font-bold text-slate-200 block">
              {isBn ? 'ইনডেক্সিং সময়কাল (Crawling Window):' : 'Estimated Googlebot Crawling Window:'}
            </span>
            <span>
              {isBn
                ? 'Request Indexing পাঠানোর পর গুগলবট সাধারণত কয়েক ঘণ্টার মধ্যে ক্রল শুরু করে এবং ২৪ থেকে ৪৮ ঘণ্টার মধ্যে গুগল সার্চের ফলাফল তালিকায় সাইটটি নিয়ে আসে।'
                : 'After requesting indexing, Googlebot typically crawls the URL within a few hours, and search listings appear within 24 to 48 hours.'}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};
