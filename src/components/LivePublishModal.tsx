import React, { useState, useEffect } from 'react';
import { 
  X, 
  Check, 
  Copy, 
  ExternalLink, 
  Globe, 
  Share2, 
  Sparkles, 
  ShieldCheck, 
  Send, 
  FileCode, 
  FileText, 
  Smartphone, 
  Search,
  MessageCircle,
  Linkedin,
  Twitter,
  Facebook
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Language } from '../types';

interface LivePublishModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const LivePublishModal: React.FC<LivePublishModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  if (!isOpen) return null;

  const isBn = language === 'bn';
  const liveUrl = "https://ais-pre-khhddulrf4oxahl7t6mn2d-458391942755.asia-southeast1.run.app";
  const sitemapUrl = `${liveUrl}/sitemap.xml`;
  const robotsUrl = `${liveUrl}/robots.txt`;

  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.5 },
    });
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(liveUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const shareText = isBn 
    ? `আমার নতুন ওয়েবসাইটটি দেখুন: ${liveUrl}` 
    : `Check out my new live website on Google Cloud: ${liveUrl}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border border-emerald-500/40 rounded-2xl w-full max-w-2xl max-h-[92vh] overflow-y-auto shadow-2xl p-6 space-y-6 relative">
        
        {/* Glow background */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Celebration */}
        <div className="text-center space-y-2 pt-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold animate-pulse">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>{isBn ? 'ওয়েবসাইটটি গুগলে লাইভ পাবলিশ করা হয়েছে!' : 'Website is Officially Live on Google Cloud!'}</span>
          </div>

          <h2 className="text-2xl font-black text-white tracking-tight">
            {isBn 
              ? 'বিশ্বের যেকোনো প্রান্ত থেকে মানুষ এখন আপনার সাইট দেখতে পারবে' 
              : 'Anyone Around the World Can Now Visit Your Website'}
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
            {isBn
              ? 'সাইটটি Google Cloud Run গ্লোবাল সার্ভারে সিকিউর HTTPS সহ লাইভ আছে। নিচের লিংকটি মানুষ এবং গুগল সার্চবটের সাথে শেয়ার করতে পারবেন।'
              : 'Hosted with 24/7 uptime, automated HTTPS/SSL, and full crawler indexing support on Google Cloud.'}
          </p>
        </div>

        {/* Primary Public Link Box */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-400 flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-blue-400" />
              <span>{isBn ? 'পাবলিক লাইভ ইউআরএল (Public Website Link):' : 'Public Live Website URL:'}</span>
            </span>
            <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>100% ONLINE</span>
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2">
            <input
              type="text"
              readOnly
              value={liveUrl}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2.5 text-xs sm:text-sm font-mono text-blue-400 font-semibold select-all focus:outline-none"
            />
            <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
              <button
                onClick={handleCopy}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition shadow"
              >
                {copiedLink ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                <span>{copiedLink ? (isBn ? 'কপি হয়েছে!' : 'Copied!') : (isBn ? 'লিংক কপি' : 'Copy')}</span>
              </button>
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition shadow"
              >
                <span>{isBn ? 'ভিজিট করুন' : 'Visit'}</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Share with People Options */}
        <div className="space-y-2.5">
          <span className="text-xs font-bold text-white block">
            {isBn ? 'মানুষের সাথে শেয়ার করুন (Share with People):' : 'Share Directly with Audiences & Clients:'}
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            {/* WhatsApp */}
            <a
              href={`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-800/60 text-emerald-300 font-semibold flex items-center justify-center gap-2 transition"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp</span>
            </a>

            {/* Facebook */}
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(liveUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-blue-950/40 hover:bg-blue-900/50 border border-blue-800/60 text-blue-300 font-semibold flex items-center justify-center gap-2 transition"
            >
              <Facebook className="w-4 h-4 text-blue-400" />
              <span>Facebook</span>
            </a>

            {/* Twitter / X */}
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-sky-950/40 hover:bg-sky-900/50 border border-sky-800/60 text-sky-300 font-semibold flex items-center justify-center gap-2 transition"
            >
              <Twitter className="w-4 h-4 text-sky-400" />
              <span>Twitter / X</span>
            </a>

            {/* LinkedIn */}
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(liveUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-indigo-950/40 hover:bg-indigo-900/50 border border-indigo-800/60 text-indigo-300 font-semibold flex items-center justify-center gap-2 transition"
            >
              <Linkedin className="w-4 h-4 text-indigo-400" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>

        {/* Live Googlebot Indexing Files (sitemap.xml and robots.txt) */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3 text-xs">
          <div className="font-bold text-white flex items-center gap-1.5">
            <Search className="w-4 h-4 text-amber-400" />
            <span>{isBn ? 'গুগল সার্চবটের জন্য সক্রিয় ফাইলসমূহ:' : 'Active Google Crawling Files on Server:'}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono">
            <a
              href={sitemapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 flex items-center justify-between text-slate-300 hover:text-white"
            >
              <span className="flex items-center gap-1.5 truncate">
                <FileCode className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span className="truncate">/sitemap.xml</span>
              </span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-500 shrink-0 ml-1" />
            </a>

            <a
              href={robotsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 flex items-center justify-between text-slate-300 hover:text-white"
            >
              <span className="flex items-center gap-1.5 truncate">
                <FileText className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="truncate">/robots.txt</span>
              </span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-500 shrink-0 ml-1" />
            </a>
          </div>
        </div>

        {/* Direct Google Search Console Submission button */}
        <div className="bg-gradient-to-r from-blue-900/40 via-indigo-900/40 to-slate-900 p-4 rounded-xl border border-blue-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="space-y-0.5">
            <span className="font-bold text-white block">
              {isBn ? 'গুগল সার্চ কনসোলে ১-ক্লিকে সাবমিট করুন' : 'Submit directly in Google Search Console'}
            </span>
            <span className="text-slate-300">
              {isBn 
                ? 'গুগলে দ্রুত ক্রল ও ইনডেক্স করার জন্য অফিসিয়াল সার্চ কনসোল ওপেন করুন।' 
                : 'Request instant indexing so Googlebot adds your site to search results.'}
            </span>
          </div>

          <a
            href="https://search.google.com/search-console"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold flex items-center justify-center gap-1.5 transition shrink-0 shadow"
          >
            <span>Google Search Console</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

      </div>
    </div>
  );
};
