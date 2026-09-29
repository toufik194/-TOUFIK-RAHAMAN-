import React, { useState } from 'react';
import { 
  Cloud, 
  ExternalLink, 
  CheckCircle2, 
  Copy, 
  Check, 
  Terminal, 
  Server, 
  Globe2, 
  ShieldCheck, 
  ArrowRight,
  Flame,
  Zap,
  Globe
} from 'lucide-react';
import { WebsiteProject, Language } from '../types';

interface DeployTabProps {
  project: WebsiteProject;
  language: Language;
  onNavigateToTab: (tab: any) => void;
}

export const DeployTab: React.FC<DeployTabProps> = ({
  project,
  language,
  onNavigateToTab,
}) => {
  const isBn = language === 'bn';
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  const sharedAppUrl = "https://ais-pre-khhddulrf4oxahl7t6mn2d-458391942755.asia-southeast1.run.app";
  const devAppUrl = "https://ais-dev-khhddulrf4oxahl7t6mn2d-458391942755.asia-southeast1.run.app";

  const copyCommand = (cmd: string, id: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedCmd(id);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      
      {/* Live Deployment Status Card */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-900 rounded-2xl border border-blue-500/30 p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>{isBn ? 'গুগল ক্লাউডে লাইভ সক্রিয় রয়েছে' : 'Active on Google Cloud Platform'}</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-white">
              {isBn ? 'আপনার অ্যাপ্লিকেশনটি গুগল ক্লাউডে লাইভ আছে' : 'Your Application is Live on Google Cloud'}
            </h2>
            <p className="text-xs md:text-sm text-slate-300 max-w-2xl leading-relaxed">
              {isBn
                ? 'এই প্রজেক্টটি সরাসরি Google Cloud Run কনটেইনার আর্কিটেকচারে হোস্ট করা হয়েছে। নিচের লাইভ লিংকটি আপনি সরাসরি Google Search Console-এ যোগ করতে পারবেন।'
                : 'This system is hosted on high-availability Google Cloud infrastructure with automated HTTPS/SSL, ready for Googlebot indexing.'}
            </p>
          </div>

          <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-2 min-w-[240px]">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              {isBn ? 'হোস্টিং প্রোভাইডার:' : 'Cloud Host:'}
            </div>
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <Cloud className="w-4 h-4 text-blue-400" />
              <span>Google Cloud Run</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold pt-1">
              <ShieldCheck className="w-4 h-4" />
              <span>HTTPS SSL Certificate Active</span>
            </div>
          </div>
        </div>

        {/* URLs Table */}
        <div className="mt-6 pt-5 border-t border-slate-800/80 space-y-3">
          
          {/* Shared Production URL */}
          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-white">
                  {isBn ? 'পাবলিক প্রোডাকশন লিংক (গুগল সার্চ কনসোলের জন্য):' : 'Shared Production URL (For Google Search Console):'}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300 font-semibold">
                  LIVE 24/7
                </span>
              </div>
              <a
                href={sharedAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-blue-400 hover:underline flex items-center gap-1 text-xs break-all"
              >
                <span>{sharedAppUrl}</span>
                <ExternalLink className="w-3.5 h-3.5 shrink-0" />
              </a>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => copyCommand(sharedAppUrl, 'prodUrl')}
                className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition flex items-center gap-1"
              >
                {copiedCmd === 'prodUrl' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCmd === 'prodUrl' ? (isBn ? 'কপি হয়েছে' : 'Copied') : (isBn ? 'লিংক কপি' : 'Copy URL')}</span>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* How to deploy YOUR OTHER websites to Google for free */}
      <div className="space-y-4">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Server className="w-4 h-4 text-blue-400" />
            <span>{isBn ? 'আপনি যেসব নতুন ওয়েবসাইট তৈরি করছেন সেগুলো গুগলে হোস্টিং করার উপায়' : 'How to Publish & Host Any Website You Build to Google'}</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            {isBn 
              ? 'নিচের সহজ পদ্ধতিগুলোর যেকোনো একটি দিয়ে আপনার যেকোনো ওয়েবসাইট গুগলের সার্ভারে ফ্রি হোস্টিং করে লাইভ করতে পারেন:'
              : 'Choose any of these high-performance options to deploy your sites publicly for Googlebot.'}
          </p>
        </div>

        {/* Deployment Options Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* 1. Firebase Hosting (Google's official hosting) */}
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400">
                  <Flame className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Firebase Hosting (Google)</h4>
                  <span className="text-[11px] text-emerald-400 font-medium">{isBn ? '১০০% ফ্রি ও গুগল সিডিএন' : '100% Free & Fast Google CDN'}</span>
                </div>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded bg-blue-500/20 text-blue-300">
                Recommended
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {isBn
                ? 'গুগলের নিজস্ব ওয়েব হোস্টিং প্ল্যাটফর্ম। ফ্রি SSL, আল্ট্রা-ফাস্ট গ্লোবাল সিডিএন এবং গুগল সার্চ ইনডেক্সিংয়ে দ্রুত সাপোর্ট।'
                : 'Google official web hosting with free SSL, global CDN, and native Google Search Console verification.'}
            </p>

            {/* CLI Commands */}
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2 text-xs font-mono">
              <div className="text-slate-400 text-[11px]">{isBn ? '# টার্মিনালে রান করুন:' : '# Run in terminal:'}</div>
              <div className="flex items-center justify-between text-slate-300">
                <span>npm install -g firebase-tools</span>
                <button
                  onClick={() => copyCommand('npm install -g firebase-tools', 'fbInstall')}
                  className="text-slate-500 hover:text-white"
                >
                  {copiedCmd === 'fbInstall' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>firebase login</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>firebase init hosting</span>
              </div>
              <div className="flex items-center justify-between text-emerald-400 font-bold">
                <span>firebase deploy</span>
                <button
                  onClick={() => copyCommand('firebase deploy', 'fbDeploy')}
                  className="text-slate-500 hover:text-white"
                >
                  {copiedCmd === 'fbDeploy' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>

          {/* 2. Vercel / Netlify */}
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 space-y-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Vercel & Netlify</h4>
                <span className="text-[11px] text-blue-400 font-medium">{isBn ? 'GitHub থেকে ১-ক্লিক ডিপ্লয়' : '1-Click GitHub Deploy'}</span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {isBn
                ? 'আপনার কোড GitHub এ আপলোড করে vercel.com অথবা netlify.com-এ এক ক্লিকে কানেক্ট করলেই অটোমেটিক লাইভ ইউআরএল এবং ফ্রি SSL পাওয়া যায়।'
                : 'Connect your GitHub repository to Vercel or Netlify for zero-config deployments, automatic HTTPS, and global edge routing.'}
            </p>

            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{isBn ? 'ফ্রি .vercel.app বা .netlify.app সাবডোমেন' : 'Free HTTPS subdomain'}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{isBn ? 'কাস্টম ডোমেন (.com, .bd) ফ্রিতে যুক্ত করার সুবিধা' : 'Free custom domain mapping'}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{isBn ? 'প্রতিটি Git push-এ অটোমেটিক আপডেট' : 'Continuous deployment on every git push'}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Custom Domain Connection Guide */}
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 space-y-3">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <Globe2 className="w-4 h-4 text-indigo-400" />
            <span>{isBn ? 'কাস্টম ডোমেন (যেমন yourname.com) সেটআপ করার নিয়ম:' : 'Connecting a Custom Domain (.com / .org / .bd):'}</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
              <span className="font-bold text-blue-400 block">১. ডোমেন কিনুন</span>
              <p className="text-slate-400 leading-relaxed">
                {isBn ? 'Namecheap, Porkbun অথবা বাংলাদেশ থেকে BTCL (.bd) থেকে ডোমেন রেজিস্টার করুন।' : 'Register your domain through any registrar.'}
              </p>
            </div>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
              <span className="font-bold text-indigo-400 block">২. DNS রেকর্ড যোগ করুন</span>
              <p className="text-slate-400 leading-relaxed">
                {isBn ? 'হোস্টিংয়ের দেওয়া A Record (@) এবং CNAME (www) রেকর্ড আপনার DNS প্যানেলে বসান।' : 'Configure A Record and CNAME to point to the host server.'}
              </p>
            </div>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
              <span className="font-bold text-emerald-400 block">৩. সার্চ কনসোলে যুক্ত করুন</span>
              <p className="text-slate-400 leading-relaxed">
                {isBn ? 'ডোমেন লাইভ হলে Google Search Console-এ Domain Property দিয়ে DNS TXT রেকর্ড দিয়ে ভেরিফাই করুন।' : 'Verify in GSC using the Domain property method.'}
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
