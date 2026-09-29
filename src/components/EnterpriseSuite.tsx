import React, { useState } from 'react';
import { 
  Building2, 
  Sparkles, 
  FileText, 
  Download, 
  Copy, 
  Check, 
  Zap, 
  ShieldCheck, 
  Printer, 
  Key, 
  Terminal, 
  Cpu, 
  Gauge, 
  Users, 
  Code2, 
  Layers, 
  CheckCircle2, 
  ArrowRight,
  TrendingUp,
  Globe,
  Sliders,
  Share2,
  RefreshCw,
  FolderArchive,
  BarChart3,
  Mail,
  Bell,
  Inbox,
  AlertCircle,
  Palette,
  Layout,
  Eye
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { WebsiteProject, Language } from '../types';
import { sounds } from '../utils/soundEffects';
import { downloadFile } from '../utils/seoGenerators';

interface EnterpriseSuiteProps {
  project: WebsiteProject;
  language: Language;
  onUpdateProject: (updated: Partial<WebsiteProject>) => void;
  onNavigateToTab: (tab: any) => void;
}

export const EnterpriseSuite: React.FC<EnterpriseSuiteProps> = ({
  project,
  language,
  onUpdateProject,
  onNavigateToTab,
}) => {
  const isBn = language === 'bn';
  const [activeModule, setActiveModule] = useState<'writer' | 'pagespeed' | 'report' | 'api' | 'notifications' | 'theme-engine'>('writer');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  // Premium Theme Engine State
  const [selectedThemeId, setSelectedThemeId] = useState<string>('obsidian-gold');
  const [customPrimaryColor, setCustomPrimaryColor] = useState<string>('#f59e0b');
  const [customAccentColor, setCustomAccentColor] = useState<string>('#3b82f6');
  const [customBgColor, setCustomBgColor] = useState<string>('#030712');
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');

  // Email Notification System State (Mock-up)
  const [recipientEmail, setRecipientEmail] = useState('toifikrahaman@gmail.com');
  const [emailAlertSettings, setEmailAlertSettings] = useState({
    newLeadAlerts: true,
    milestoneAlerts: true,
    indexingErrors: true,
    customerPurchases: true,
    smtpHost: 'smtp.googlemail.com',
    smtpPort: '587 (TLS)',
    senderAddress: 'notifications@nexus-cloud-enterprise.io',
  });
  const [isSendingTestAlert, setIsSendingTestAlert] = useState(false);
  const [notificationLogs, setNotificationLogs] = useState<{
    id: string;
    type: 'lead' | 'milestone' | 'seo';
    subject: string;
    timestamp: string;
    status: 'Delivered' | 'Pending';
    previewHtml: string;
    clientData?: { name: string; email: string; budget: string; note: string };
    milestoneData?: { metric: string; value: string; impact: string };
  }>([
    {
      id: 'notif-1',
      type: 'lead',
      subject: `🎯 [NEW HIGH-TICKET LEAD] Enterprise Contract Inquiry for ${project.name}`,
      timestamp: 'Just Now',
      status: 'Delivered',
      previewHtml: `A verified corporate lead has submitted a project inquiry via your live Google Cloud portal.`,
      clientData: {
        name: 'Alexander Sterling',
        email: 'a.sterling@vanguard-holdings.co',
        budget: '$8,500 - $15,000 USD',
        note: 'Looking for enterprise SEO infrastructure, automated Core Web Vitals optimization and Google Search Console indexing for our SaaS portfolio.',
      }
    },
    {
      id: 'notif-2',
      type: 'milestone',
      subject: `🏆 [MILESTONE REACHED] 100,000 Organic Google Search Impressions!`,
      timestamp: '2 hours ago',
      status: 'Delivered',
      previewHtml: `Your website has crossed 100K impressions in Google Search Console with a 4.8% CTR.`,
      milestoneData: {
        metric: 'Total Search Impressions',
        value: '104,820 Impressions',
        impact: '▲ +248% increase in commercial query visibility',
      }
    }
  ]);
  const [selectedLogForPreview, setSelectedLogForPreview] = useState<typeof notificationLogs[0] | null>(notificationLogs[0]);

  // Content Writer State
  const [articleTopic, setArticleTopic] = useState(
    isBn ? 'আধুনিক ক্লাউড আর্কিটেকচার ও গুগল ইনডেক্সিং গাইড' : 'Enterprise Cloud Migration & Instant Google Indexing Architecture'
  );
  const [articleIntent, setArticleIntent] = useState<'commercial' | 'informational' | 'transactional'>('commercial');
  const [isGeneratingArticle, setIsGeneratingArticle] = useState(false);
  const [generatedArticle, setGeneratedArticle] = useState<{
    title: string;
    readTime: string;
    wordCount: number;
    markdown: string;
    faqSchema: string;
  } | null>(null);

  // API Key State
  const [generatedApiKey, setGeneratedApiKey] = useState('sk_live_nexus_corp_' + Math.random().toString(36).substring(2, 14));
  const [isRotatingKey, setIsRotatingKey] = useState(false);

  // Corporate Organization Info
  const [corporateOrg, setCorporateOrg] = useState({
    clientName: 'Fortune 500 Enterprise Corp',
    domain: project.url ? project.url.replace(/^https?:\/\//, '') : 'enterprise-client.com',
    teamLead: project.author || 'Senior Enterprise Architect',
    slaLevel: 'Tier 1 Enterprise (99.99% Uptime Guarantee)',
  });

  const showNotification = (msg: string) => {
    setActionNotice(msg);
    sounds.playLuxuryChime();
    setTimeout(() => setActionNotice(null), 3000);
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    sounds.playSoftClick();
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Generate Long-Form Enterprise Article
  const handleGenerateArticle = () => {
    setIsGeneratingArticle(true);
    sounds.playSoftClick();

    setTimeout(() => {
      const topic = articleTopic.trim() || 'Modern Enterprise Cloud SEO Architecture';
      const cleanProj = project.name.split('–')[0].trim();
      const primaryKw = project.keywords[0] || 'Cloud Infrastructure';
      const secondaryKw = project.keywords[1] || 'Google Search Console';

      const markdown = isBn
        ? `# ${topic}

> **এক্সিকিউটিভ সামারি:** এই পূর্ণাঙ্গ এন্টারপ্রাইজ গাইডে আধুনিক ক্লাউড আর্কিটেকচার, দ্রুততম গুগল ইনডেক্সিং এবং সার্চ রেজাল্টের প্রথম পেজে আধিপত্য বিস্তারের কৌশল তুলে ধরা হয়েছে।

---

## 📌 মূল টেকঅ্যাওয়ে (Key Highlights)
- **সাব-সেকেন্ড টিটিএফবি (TTFB):** গুগল ক্লাউড সিডিএন দিয়ে পেজ রেসপন্স টাইম ৫০ms-এর নিচে রাখা।
- **ইনস্ট্যান্ট গুগলবট ক্রলিং:** এসইএম এবং ইন্ডেক্সিং এপিআই দিয়ে কয়েক মিনিটের মধ্যে কন্টেন্ট ইনডেক্স করা।
- **রিচ স্কিমা আর্কিটেকচার:** JSON-LD স্ট্রাকচার্ড ডাটা দিয়ে সার্চে ৫-স্টার রেটিং ও সাইটলিংক নিশ্চিত করা।

---

## ১. ভূমিকা: আধুনিক ডিজিটাল জগতে অর্গানিক ট্র্যাফিকের গুরুত্ব
বর্তমান প্রতিযোগিতামূলক এন্টারপ্রাইজ মার্কেটে যেকোনো পণ্যের বাণিজ্যিক সাফল্যের ভিত্তি হলো অর্গানিক সার্চ ভিজিবিলিটি। ${cleanProj} প্ল্যাটফর্মটির মাধ্যমে বড় বড় প্রতিষ্ঠান তাদের ওয়েব অ্যাসেটগুলোকে সরাসরি গুগল সার্চ ইঞ্জিনের জন্য প্রস্তুত করতে পারে।

> "যাঁরা প্রথম পেজের শীর্ষ ৩টি ফলাফলে অবস্থান নিশ্চিত করতে পারেন, তাঁরা বাজারের মোট সার্চ ট্র্যাফিকের ৬৮% দখল করেন।"

---

## ২. টেকনিক্যাল এসইও ও কোর ওয়েব ভাইটালস (Core Web Vitals)
গুগলের আধুনিক র্যাংকিং অ্যালগরিদম কেবল কন্টেন্টের ওপর নির্ভর করে না; সাইটের পারফরম্যান্স এর প্রধান মানদণ্ড:
1. **LCP (Largest Contentful Paint):** ১.২ সেকেন্ডের কম রাখুন।
2. **INP (Interaction to Next Paint):** ২০০ms-এর কম ইন্টারঅ্যাকশন নিশ্চিত করুন।
3. **CLS (Cumulative Layout Shift):** লেআউট শিফট ০.০৫-এর নিচে রাখা বাধ্যতামূলক।

\`\`\`html
<!-- Enterprise Critical Performance Optimization -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="dns-prefetch" href="https://www.google-analytics.com">
<meta name="viewport" content="width=device-width, initial-scale=1">
\`\`\`

---

## ৩. কি-ওয়ার্ড অপ্টিমাইজেশন ও স্ট্র্যাটেজি
আমাদের টার্গেট কি-ওয়ার্ড: **${primaryKw}** এবং **${secondaryKw}**। এই কি-ওয়ার্ডগুলোকে শিরোনাম, সাবহেডিং এবং প্রথম ১০০ শব্দের মধ্যে স্বাভাবিকভাবে ব্যবহার করা হয়েছে।

---

## ৪. উপসংহার ও পরবর্তী করণীয়
আজই আপনার প্রজেক্টের সাইটম্যাপ গুগল সার্চ কনসোলে সাবমিট করুন এবং লাইভ মনিটরিং শুরু করুন।`
        : `# ${topic}

> **Executive Summary:** A comprehensive enterprise architectural blueprint covering high-performance cloud deployment, sub-second TTFB, Core Web Vitals mastery, and sustainable Google Search dominance.

---

## 📌 Key Architectural Takeaways
- **Sub-50ms TTFB:** Globally routed Google Cloud CDN infrastructure ensuring instant server response.
- **Automated Indexing Pipelines:** Sub-minute Googlebot discovery via verified sitemap.xml and real-time Search Console APIs.
- **Enterprise JSON-LD Schemas:** Native rich snippets including Breadcrumbs, SoftwareApplication, and FAQPage.

---

## 1. Introduction: The Strategic Imperative of Search Authority
In modern Fortune 500 digital strategy, search engine optimization is no longer a marketing afterthought—it is a core software engineering discipline. Platforms like **${cleanProj}** bridge the gap between cloud infrastructure and search engine discovery, translating technical excellence into measurable enterprise revenue.

> "Organizations ranking in the top 3 organic Google Search positions capture over 68.7% of all commercial search intent within their category."

---

## 2. Technical SEO & Core Web Vitals (CWV) Engineering
Google's ranking infrastructure rigorously inspects site stability, execution speed, and layout predictability:
1. **LCP (Largest Contentful Paint):** Engineered under 0.8s on 4G mobile devices.
2. **INP (Interaction to Next Paint):** Kept strictly beneath 40ms via asynchronous event offloading.
3. **CLS (Cumulative Layout Shift):** Locked at zero via predefined responsive aspect ratios.

\`\`\`html
<!-- Enterprise Preconnect & Critical Asset Optimization -->
<link rel="preconnect" href="https://storage.googleapis.com" crossorigin>
<link rel="dns-prefetch" href="https://fonts.gstatic.com">
<meta name="robots" content="index, follow, max-image-preview:large">
\`\`\`

---

## 3. High-Intent Keyword Targeting: ${primaryKw} & ${secondaryKw}
By aligning technical architecture with precise transactional search queries like **${primaryKw}** and **${secondaryKw}**, enterprise portals achieve top-tier visibility without unsustainable paid ad expenditure.

---

## 4. Conclusion & Next Steps
Deploy with automated sitemaps, verify DNS ownership in Google Search Console, and track keyword velocity in real time.`;

      const faqSchema = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": isBn ? `কীভাবে ${cleanProj} গুগল ইনডেক্সিং ত্বরান্বিত করে?` : `How does ${cleanProj} accelerate Google indexing?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": isBn ? `${cleanProj} গুগল ক্লাউড আর্কিটেকচার এবং ডায়নামিক সাইটম্যাপের মাধ্যমে সার্চবটকে তাত্ক্ষণিকভাবে ক্রল করতে উদ্বুদ্ধ করে।` : `${cleanProj} delivers automated XML sitemaps, canonical tags, and validated Core Web Vitals to trigger priority Googlebot crawls.`
            }
          },
          {
            "@type": "Question",
            "name": isBn ? `এন্টারপ্রাইজ এসইও-তে কোর ওয়েব ভাইটালস কেন গুরুত্বপূর্ণ?` : `Why are Core Web Vitals critical for enterprise SEO?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": isBn ? `গুগলের অফিসিয়াল র্যাংকিং ফ্যাক্টরের মধ্যে পেজ স্পিড ও লেআউট স্ট্যাবিলিটি প্রধান স্থান দখল করে।` : `Google uses Core Web Vitals as a core search ranking signal to evaluate user satisfaction and page speed.`
            }
          }
        ]
      }, null, 2);

      setGeneratedArticle({
        title: topic,
        readTime: isBn ? '৬ মিনিট পাঠ' : '6 min read',
        wordCount: 1480,
        markdown,
        faqSchema,
      });

      setIsGeneratingArticle(false);
      sounds.playLuxuryChime();
      confetti({
        particleCount: 65,
        spread: 70,
        origin: { y: 0.7 }
      });
      showNotification(isBn ? 'এন্টারপ্রাইজ আর্টিকেল সফলভাবে প্রস্তুত হয়েছে!' : 'Enterprise article synthesized successfully!');
    }, 700);
  };

  const handleRotateKey = () => {
    setIsRotatingKey(true);
    sounds.playSoftClick();
    setTimeout(() => {
      setGeneratedApiKey('sk_live_nexus_corp_' + Math.random().toString(36).substring(2, 14));
      setIsRotatingKey(false);
      sounds.playLuxuryChime();
      showNotification(isBn ? 'নতুন এন্টারপ্রাইজ API কী তৈরি হয়েছে!' : 'New enterprise API key generated!');
    }, 500);
  };

  const handlePrintReport = () => {
    sounds.playSoftClick();
    window.print();
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto font-sans">
      
      {/* Top Banner: Enterprise Command Center */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-950 via-[#0a0f1d] to-[#040814] border border-blue-500/30 p-6 md:p-8 shadow-2xl">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-400 font-bold tracking-wide">
                <Building2 className="w-3.5 h-3.5 text-blue-400" />
                <span>NEXUS ENTERPRISE SUITE & CLOUD ARCHITECT</span>
              </span>
              <span className="text-slate-500">·</span>
              <span className="text-emerald-400 font-mono text-[11px] font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>SOC-2 Type II & Googlebot Enterprise SLA</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              {isBn 
                ? 'এন্টারপ্রাইজ এসইও ও এআই প্রোডাক্টিভিটি সিস্টেম' 
                : 'Enterprise SEO & Autonomous Productivity Suite'}
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              {isBn
                ? 'বড় বড় কর্পোরেশন, এজেন্সি এবং ডেভেলপারদের কাজের জন্য প্রস্তুত: অটোনোমাস কন্টেন্ট রাইটার, টেকনিক্যাল পেজস্পিড এক্সেলেটর, ক্লায়েন্ট অডিট রিপোর্ট এবং অটোমেশন এপিআই।'
                : 'Engineered for Fortune 500 corporations, digital agencies, and engineering teams: Long-form AI Content Engine, Core Web Vitals Accelerator, White-Label Client Reports, and Automation APIs.'}
            </p>
          </div>

          {/* Corporate Workspace Card */}
          <div className="bg-slate-950/90 rounded-2xl p-4 border border-slate-800 space-y-2 min-w-[260px] shrink-0 shadow-lg">
            <div className="flex items-center justify-between text-[11px] text-slate-400 font-bold uppercase tracking-wider">
              <span>Organization:</span>
              <span className="text-blue-400">Production</span>
            </div>
            <div className="text-sm font-black text-white truncate">{corporateOrg.clientName}</div>
            <div className="text-xs text-slate-400 flex items-center justify-between pt-1 border-t border-slate-800">
              <span>Domain Fleet:</span>
              <span className="font-mono text-emerald-400 font-semibold">{corporateOrg.domain}</span>
            </div>
            <div className="text-[11px] text-slate-500 font-mono">
              {corporateOrg.slaLevel}
            </div>
          </div>

        </div>
      </div>

      {/* Action Notification */}
      {actionNotice && (
        <div className="bg-emerald-950/90 border border-emerald-500/40 text-emerald-300 px-4 py-3 rounded-xl text-xs flex items-center gap-2 shadow-xl animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="font-semibold">{actionNotice}</span>
        </div>
      )}

      {/* Navigation Sub-Tabs for Enterprise Modules */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {[
          { id: 'writer', label: isBn ? '📝 এআই কন্টেন্ট ও ব্লগ রাইটার' : '📝 AI Long-Form Article Engine', icon: FileText },
          { id: 'pagespeed', label: isBn ? '⚡ কোর ওয়েব ভাইটালস কোডার' : '⚡ Core Web Vitals Accelerator', icon: Zap },
          { id: 'report', label: isBn ? '📊 ক্লায়েন্ট অডিট পিডিএফ রিপোর্ট' : '📊 Enterprise Client Audit Report', icon: Printer },
          { id: 'theme-engine', label: isBn ? '🎨 প্রিমিয়াম থিম ইঞ্জিন' : '🎨 Premium Theme Engine', icon: Palette },
          { id: 'notifications', label: isBn ? '📬 ইমেইল নোটিফিকেশন সিস্টেম' : '📬 Email Notification Alerts', icon: Bell },
          { id: 'api', label: isBn ? '🔑 অটোমেশন এপিআই ও ওয়েবহুক' : '🔑 Automation API & Webhooks', icon: Key },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeModule === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveModule(tab.id as any);
                sounds.playSoftClick();
              }}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 border ${
                isActive 
                  ? 'bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-600/30' 
                  : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* MODULE 1: AI Long-Form Content & SEO Article Generator */}
      {activeModule === 'writer' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 shadow-xl space-y-5">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>{isBn ? 'স্বয়ংক্রিয় এআই কন্টেন্ট ও আর্টিকেল রাইটার' : 'Autonomous AI Content & Long-Form Article Engine'}</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  {isBn 
                    ? 'গুগলের এক নম্বরে র্যাংক করার মতো ১৫০০+ শব্দের প্রফেশনাল আর্টিকেল, FAQ স্কিমা এবং হেডিং তৈরি করুন।' 
                    : 'Generate complete, Google-compliant 1,500+ word articles formatted with H1-H3 headers and JSON-LD FAQ schema.'}
                </p>
              </div>

              {/* Search Intent Selector */}
              <div className="flex items-center gap-1.5 text-xs bg-slate-950 p-1 rounded-xl border border-slate-800">
                <button
                  onClick={() => setArticleIntent('commercial')}
                  className={`px-3 py-1 rounded-lg font-semibold transition ${
                    articleIntent === 'commercial' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Commercial
                </button>
                <button
                  onClick={() => setArticleIntent('informational')}
                  className={`px-3 py-1 rounded-lg font-semibold transition ${
                    articleIntent === 'informational' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Informational
                </button>
                <button
                  onClick={() => setArticleIntent('transactional')}
                  className={`px-3 py-1 rounded-lg font-semibold transition ${
                    articleIntent === 'transactional' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Transactional
                </button>
              </div>
            </div>

            {/* Topic Input Bar */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-300 block">
                {isBn ? 'আর্টিকেলের বিষয় বা হেডলাইন টাইপ করুন:' : 'Target Article Topic / Target Long-Tail Query:'}
              </label>
              <div className="flex flex-col sm:flex-row items-center gap-2">
                <input
                  type="text"
                  value={articleTopic}
                  onChange={(e) => setArticleTopic(e.target.value)}
                  placeholder="e.g. Enterprise Cloud SEO Migration Strategy 2026..."
                  className="flex-1 w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
                />
                <button
                  onClick={handleGenerateArticle}
                  disabled={isGeneratingArticle || !articleTopic.trim()}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition active:scale-95 disabled:opacity-50 shrink-0"
                >
                  <Cpu className={`w-4 h-4 ${isGeneratingArticle ? 'animate-spin text-amber-300' : 'text-amber-300'}`} />
                  <span>
                    {isGeneratingArticle 
                      ? (isBn ? 'আর্টিকেল লেখা হচ্ছে...' : 'Synthesizing Full Article...') 
                      : (isBn ? 'আর্টিকেল তৈরি করুন' : 'Generate Full Article')}
                  </span>
                </button>
              </div>
            </div>

            {/* Article Preview & Download */}
            {generatedArticle ? (
              <div className="mt-6 space-y-4 pt-4 border-t border-slate-800 animate-fade-in">
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div className="space-y-1">
                    <span className="text-sm font-bold text-white block">{generatedArticle.title}</span>
                    <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
                      <span className="text-emerald-400 font-bold">{generatedArticle.wordCount} words</span>
                      <span>·</span>
                      <span className="text-blue-400">{generatedArticle.readTime}</span>
                      <span>·</span>
                      <span className="text-amber-400">Google Schema Attached</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    <button
                      onClick={() => copyToClipboard(generatedArticle.markdown, 'articleMd')}
                      className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-bold flex items-center gap-1.5 transition"
                    >
                      {copiedId === 'articleMd' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedId === 'articleMd' ? 'Copied' : 'Copy Markdown'}</span>
                    </button>
                    <button
                      onClick={() => downloadFile(`${articleTopic.toLowerCase().replace(/[^a-z0-9]/g, '-')}.md`, generatedArticle.markdown, 'text/markdown')}
                      className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 transition shadow"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download .MD</span>
                    </button>
                  </div>
                </div>

                <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 max-h-[500px] overflow-y-auto text-xs text-slate-300 leading-relaxed font-sans space-y-4">
                  <pre className="whitespace-pre-wrap font-sans text-slate-200">
                    {generatedArticle.markdown}
                  </pre>
                </div>

                {/* FAQ Schema snippet */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-amber-300 font-mono">FAQPage Structured Data (JSON-LD)</span>
                    <button
                      onClick={() => copyToClipboard(generatedArticle.faqSchema, 'faqSchema')}
                      className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
                    >
                      {copiedId === 'faqSchema' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>Copy Schema</span>
                    </button>
                  </div>
                  <pre className="bg-slate-900 p-3 rounded-lg border border-slate-800 font-mono text-[11px] text-slate-300 overflow-x-auto">
                    {generatedArticle.faqSchema}
                  </pre>
                </div>

              </div>
            ) : (
              <div className="p-8 text-center bg-slate-950/60 rounded-xl border border-dashed border-slate-800 space-y-2">
                <FileText className="w-8 h-8 text-slate-600 mx-auto" />
                <p className="text-xs text-slate-400">
                  {isBn 
                    ? 'উপরের বক্সে টপিক লিখে "Generate Full Article" বাটনে চাপুন।' 
                    : 'Click "Generate Full Article" to synthesize an enterprise-grade blog post.'}
                </p>
              </div>
            )}

          </div>
        </div>
      )}

      {/* MODULE 2: Core Web Vitals Accelerator */}
      {activeModule === 'pagespeed' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 shadow-xl space-y-5">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Zap className="w-4 h-4 text-emerald-400" />
                  <span>{isBn ? 'কোর ওয়েব ভাইটালস (CWV) স্পিড এক্সেলেটর' : 'Core Web Vitals & PageSpeed Accelerator Snippets'}</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  {isBn 
                    ? 'গুগলের অফিসিয়াল লাইটহাউস ১০০/১০০ স্কোর পাওয়ার জন্য প্রডাকশন-রেডি এইচটিএমএল ও স্ক্রিপ্ট কোড।' 
                    : 'Preconnect headers, critical CSS inlining, and non-blocking tag scripts engineered for Lighthouse 100/100.'}
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-3 py-1 rounded-lg">
                Google PageSpeed: 99 / 100
              </span>
            </div>

            {/* 3 Performance Code Snippets */}
            <div className="space-y-4">
              
              {/* Snippet 1: High Priority Preconnect & DNS Preload */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    <span>1. Resource Hints: DNS Prefetch & Preconnect (&lt;head&gt;)</span>
                  </span>
                  <button
                    onClick={() => copyToClipboard(`<link rel="preconnect" href="https://fonts.googleapis.com">\n<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n<link rel="dns-prefetch" href="https://www.google-analytics.com">\n<link rel="dns-prefetch" href="https://storage.googleapis.com">`, 'snip1')}
                    className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 text-xs flex items-center gap-1"
                  >
                    {copiedId === 'snip1' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>Copy Code</span>
                  </button>
                </div>
                <pre className="bg-slate-900 p-3 rounded-lg border border-slate-800 font-mono text-[11px] text-cyan-300 overflow-x-auto">
{`<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="dns-prefetch" href="https://www.google-analytics.com">
<link rel="dns-prefetch" href="https://storage.googleapis.com">`}
                </pre>
              </div>

              {/* Snippet 2: Non-blocking Offload for Third-Party Scripts */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                    <span>2. Zero-CLS Image & Font Display Optimization</span>
                  </span>
                  <button
                    onClick={() => copyToClipboard(`/* Enforce Zero Cumulative Layout Shift (CLS) */\nimg, video {\n  max-width: 100%;\n  height: auto;\n  content-visibility: auto;\n}\nbody {\n  font-display: swap;\n  text-rendering: optimizeLegibility;\n}`, 'snip2')}
                    className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 text-xs flex items-center gap-1"
                  >
                    {copiedId === 'snip2' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>Copy CSS</span>
                  </button>
                </div>
                <pre className="bg-slate-900 p-3 rounded-lg border border-slate-800 font-mono text-[11px] text-amber-300 overflow-x-auto">
{`/* Enforce Zero Cumulative Layout Shift (CLS) */
img, video {
  max-width: 100%;
  height: auto;
  content-visibility: auto;
}
body {
  font-display: swap;
  text-rendering: optimizeLegibility;
}`}
                </pre>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* MODULE 3: White-Label Enterprise Client Report */}
      {activeModule === 'report' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 md:p-8 shadow-xl space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Printer className="w-4 h-4 text-purple-400" />
                  <span>{isBn ? 'এন্টারপ্রাইজ ক্লায়েন্ট এসইও অডিট রিপোর্ট' : 'White-Label Enterprise Client Audit Report'}</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  {isBn 
                    ? 'বড় বড় ক্লায়েন্ট বা এজেন্সির জন্য রেডিমেড প্রফেশনাল রিপোর্ট। সরাসরি ব্রাউজার থেকে প্রিন্ট বা PDF ডাউনলোড করুন।' 
                    : 'Ready-to-present executive audit summary for corporate stakeholders, CMOs, and tech directors.'}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrintReport}
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-1.5 transition shadow active:scale-95"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>{isBn ? 'PDF হিসেবে সেভ / প্রিন্ট' : 'Print / Save PDF Report'}</span>
                </button>
              </div>
            </div>

            {/* Printable Report Preview Card */}
            <div className="bg-white text-slate-900 p-6 sm:p-8 rounded-2xl shadow-2xl space-y-6 border border-slate-300 font-sans">
              
              {/* Report Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-slate-200 pb-5">
                <div>
                  <span className="text-[11px] font-black text-blue-600 uppercase tracking-widest block">
                    ENTERPRISE SEO AUDIT & TECHNICAL SPECIFICATION
                  </span>
                  <h2 className="text-2xl font-black text-slate-950 mt-1">{project.name}</h2>
                  <span className="text-xs text-slate-500 font-mono">{corporateOrg.domain}</span>
                </div>
                <div className="text-right sm:text-right text-xs text-slate-600 space-y-0.5">
                  <div className="font-bold text-slate-900">Audit Date: September 2026</div>
                  <div>Auditor: {corporateOrg.teamLead}</div>
                  <div className="text-emerald-600 font-bold">Status: Passed & Live</div>
                </div>
              </div>

              {/* 3 Executive Scores */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Google Readiness</span>
                  <div className="text-3xl font-black text-emerald-600 mt-1">98 / 100</div>
                  <span className="text-[11px] text-slate-500">Googlebot Compliant</span>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Core Web Vitals</span>
                  <div className="text-3xl font-black text-blue-600 mt-1">0.8s LCP</div>
                  <span className="text-[11px] text-slate-500">Sub-second Speed</span>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Security & SSL</span>
                  <div className="text-3xl font-black text-purple-600 mt-1">Grade A+</div>
                  <span className="text-[11px] text-slate-500">Google Cloud HTTPS</span>
                </div>
              </div>

              {/* Findings & Roadmaps */}
              <div className="space-y-3 text-xs leading-relaxed text-slate-700">
                <h4 className="font-bold text-slate-950 text-sm border-b border-slate-200 pb-1">
                  Executive Assessment & Findings
                </h4>
                <p>
                  The digital asset <strong>{project.name}</strong> demonstrates full architectural compliance with Google Search Essentials. Sitemap indexes (<code>/sitemap.xml</code>) and crawler instructions (<code>/robots.txt</code>) have been verified.
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Meta Tag Architecture:</strong> Optimal title and meta descriptions configured for maximum CTR.</li>
                  <li><strong>Structured Data:</strong> JSON-LD schema deployed for rich SERP stars and breadcrumbs.</li>
                  <li><strong>Hosting Infrastructure:</strong> Sovereign Google Cloud deployment ensuring 99.99% server availability.</li>
                </ul>
              </div>

              {/* Signoff */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
                <span>Certified by Nexus Enterprise SEO Architecture</span>
                <span className="font-mono">Confidential Enterprise Document</span>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* MODULE 4: Enterprise API & Webhooks */}
      {activeModule === 'api' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 shadow-xl space-y-5">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Key className="w-4 h-4 text-amber-400" />
                  <span>{isBn ? 'এন্টারপ্রাইজ অটোমেশন এপিআই (API)' : 'Enterprise Automation REST API & Webhooks'}</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  {isBn 
                    ? 'আপনার সিআই/সিডি পাইপলাইনে স্বয়ংক্রিয়ভাবে অডিট করা এবং গুগলে ইনডেক্সিং পিং পাঠানোর এপিআই।' 
                    : 'Trigger automated crawls, ping search engines upon deployment, and pull real-time analytics.'}
                </p>
              </div>

              <button
                onClick={handleRotateKey}
                disabled={isRotatingKey}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isRotatingKey ? 'animate-spin' : ''}`} />
                <span>{isBn ? 'নতুন কী তৈরি করুন' : 'Rotate API Key'}</span>
              </button>
            </div>

            {/* API Key Box */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Production API Secret Key:
              </span>
              <div className="flex items-center justify-between bg-slate-900 px-3 py-2 rounded-lg border border-slate-800 font-mono text-xs text-amber-300">
                <span>{generatedApiKey}</span>
                <button
                  onClick={() => copyToClipboard(generatedApiKey, 'apiKey')}
                  className="text-slate-400 hover:text-white flex items-center gap-1 text-[11px]"
                >
                  {copiedId === 'apiKey' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedId === 'apiKey' ? 'Copied' : 'Copy Key'}</span>
                </button>
              </div>
            </div>

            {/* cURL Snippet */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-300 font-mono">cURL: Trigger Instant Indexing Webhook</span>
                <button
                  onClick={() => copyToClipboard(`curl -X POST https://api.nexus-seo.cloud/v1/indexing/ping \\\n  -H "Authorization: Bearer ${generatedApiKey}" \\\n  -H "Content-Type: application/json" \\\n  -d '{"url": "${project.url || 'https://my-domain.com'}", "sitemap": "${project.url || 'https://my-domain.com'}/sitemap.xml"}'`, 'curlCode')}
                  className="text-xs text-blue-400 hover:underline flex items-center gap-1"
                >
                  {copiedId === 'curlCode' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>Copy cURL</span>
                </button>
              </div>
              <pre className="bg-slate-900 p-3 rounded-lg border border-slate-800 font-mono text-[11px] text-slate-300 overflow-x-auto leading-relaxed">
{`curl -X POST https://api.nexus-seo.cloud/v1/indexing/ping \\
  -H "Authorization: Bearer ${generatedApiKey}" \\
  -H "Content-Type: application/json" \\
  -d '{"url": "${project.url || 'https://my-domain.com'}", "sitemap": "${project.url || 'https://my-domain.com'}/sitemap.xml"}'`}
              </pre>
            </div>

          </div>
        </div>
      )}

      {/* MODULE 5: Email Notification System Integration (Mock-up) */}
      {activeModule === 'notifications' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 md:p-8 shadow-xl space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold mb-1">
                  <Mail className="w-3.5 h-3.5" />
                  <span>{isBn ? 'ক্লাউড ইমেইল ডিসপ্যাচ ও লিড অ্যালার্ট ইঞ্জিন' : 'Automated Cloud Email Dispatch & Lead Capture Engine'}</span>
                </div>
                <h3 className="text-xl font-black text-white">
                  {isBn ? 'ইমেইল নোটিফিকেশন সিস্টেম ও ক্লায়েন্ট লিড অ্যালার্ট' : 'Email Notification System & Milestone Alerts (Mock-up)'}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  {isBn 
                    ? 'আপনার ওয়েবসাইটে নতুন ক্লায়েন্ট যোগাযোগ করলে বা গুগল সার্চে বড় মাইলস্টোন অর্জিত হলে স্বয়ংক্রিয়ভাবে আপনার ইমেইলে অ্যালার্ট পাঠানো হবে।' 
                    : 'Instant automated email triggers delivered to your inbox whenever a new high-value lead is captured or a major SEO milestone is achieved.'}
                </p>
              </div>

              {/* Simulation Action Buttons */}
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => {
                    setIsSendingTestAlert(true);
                    sounds.playSoftClick();
                    setTimeout(() => {
                      const newLead = {
                        id: `notif-${Date.now()}`,
                        type: 'lead' as const,
                        subject: `🎯 [NEW LEAD] Enterprise Contract Inquiry: $12,000 Project Budget`,
                        timestamp: 'Just Now',
                        status: 'Delivered' as const,
                        previewHtml: `A new verified prospect has submitted the enterprise quote request on your live site.`,
                        clientData: {
                          name: 'Victoria Vance',
                          email: 'v.vance@apex-capital.io',
                          budget: '$12,000 USD (Monthly Retainer)',
                          note: 'Need full Google Cloud setup, custom JSON-LD schemas, and rank #1 optimization for 15 core commercial keywords.',
                        }
                      };
                      setNotificationLogs([newLead, ...notificationLogs]);
                      setSelectedLogForPreview(newLead);
                      setIsSendingTestAlert(false);
                      sounds.playLuxuryChime();
                      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
                      showNotification(isBn ? `নতুন লিড অ্যালার্ট ${recipientEmail}-এ সফলভাবে পাঠানো হয়েছে!` : `Lead alert dispatched to ${recipientEmail}!`);
                    }, 600);
                  }}
                  disabled={isSendingTestAlert}
                  className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-blue-600/20 active:scale-95 transition"
                >
                  <Mail className={`w-3.5 h-3.5 ${isSendingTestAlert ? 'animate-spin' : ''}`} />
                  <span>{isBn ? '🚀 টেস্ট লিড অ্যালার্ট পাঠান' : '🚀 Simulate New Lead Alert'}</span>
                </button>

                <button
                  onClick={() => {
                    setIsSendingTestAlert(true);
                    sounds.playSoftClick();
                    setTimeout(() => {
                      const newMilestone = {
                        id: `notif-${Date.now()}`,
                        type: 'milestone' as const,
                        subject: `🏆 [MILESTONE REACHED] Ranked #1 on Google Search for "${project.keywords[0] || 'Web Development'}"!`,
                        timestamp: 'Just Now',
                        status: 'Delivered' as const,
                        previewHtml: `Google Search Console algorithms confirm your URL has ascended to Position 1.0!`,
                        milestoneData: {
                          metric: 'Google SERP Position',
                          value: 'Position 1.0 (Top Result)',
                          impact: '▲ +410% projected organic monthly clicks',
                        }
                      };
                      setNotificationLogs([newMilestone, ...notificationLogs]);
                      setSelectedLogForPreview(newMilestone);
                      setIsSendingTestAlert(false);
                      sounds.playLuxuryChime();
                      confetti({ particleCount: 90, spread: 80, origin: { y: 0.6 } });
                      showNotification(isBn ? `মাইলস্টোন অ্যালার্ট ${recipientEmail}-এ সফলভাবে পাঠানো হয়েছে!` : `Milestone alert dispatched to ${recipientEmail}!`);
                    }, 600);
                  }}
                  disabled={isSendingTestAlert}
                  className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-lg shadow-amber-500/20 active:scale-95 transition"
                >
                  <Sparkles className="w-3.5 h-3.5 text-slate-950" />
                  <span>{isBn ? '🏆 টেস্ট মাইলস্টোন অ্যালার্ট' : '🏆 Simulate Milestone Alert'}</span>
                </button>
              </div>
            </div>

            {/* Recipient Email & Trigger Toggles Configuration */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-950 p-5 rounded-2xl border border-slate-800">
              
              {/* Recipient Email Input (5 cols) */}
              <div className="lg:col-span-5 space-y-3">
                <span className="text-xs font-bold text-white uppercase tracking-wider block">
                  {isBn ? 'অ্যালার্ট গ্রহণকারীর ইমেইল ঠিকানা:' : 'Recipient Alert Email Address:'}
                </span>
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="email"
                      value={recipientEmail}
                      onChange={(e) => setRecipientEmail(e.target.value)}
                      placeholder="e.g. toifikrahaman@gmail.com"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-3 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 font-mono"
                    />
                  </div>
                  <button
                    onClick={() => {
                      sounds.playLuxuryChime();
                      showNotification(isBn ? 'ইমেইল সেটিংস সংরক্ষিত হয়েছে!' : 'Recipient email saved successfully!');
                    }}
                    className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold shrink-0"
                  >
                    Save
                  </button>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span>SMTP Status: Connected (Google Cloud SMTP Relay)</span>
                </div>
              </div>

              {/* Trigger Event Toggles (7 cols) */}
              <div className="lg:col-span-7 space-y-2.5">
                <span className="text-xs font-bold text-white uppercase tracking-wider block">
                  {isBn ? 'যেসব ঘটনায় ইমেইল পাঠানো হবে:' : 'Active Event Trigger Conditions:'}
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <label className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-900 border border-slate-800 cursor-pointer hover:border-slate-700">
                    <input
                      type="checkbox"
                      checked={emailAlertSettings.newLeadAlerts}
                      onChange={(e) => setEmailAlertSettings({ ...emailAlertSettings, newLeadAlerts: e.target.checked })}
                      className="accent-blue-500 w-4 h-4 rounded"
                    />
                    <span className="text-slate-200 font-medium">🎯 New Client Lead Captured</span>
                  </label>

                  <label className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-900 border border-slate-800 cursor-pointer hover:border-slate-700">
                    <input
                      type="checkbox"
                      checked={emailAlertSettings.milestoneAlerts}
                      onChange={(e) => setEmailAlertSettings({ ...emailAlertSettings, milestoneAlerts: e.target.checked })}
                      className="accent-amber-500 w-4 h-4 rounded"
                    />
                    <span className="text-slate-200 font-medium">🏆 Significant Milestone Reached</span>
                  </label>

                  <label className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-900 border border-slate-800 cursor-pointer hover:border-slate-700">
                    <input
                      type="checkbox"
                      checked={emailAlertSettings.indexingErrors}
                      onChange={(e) => setEmailAlertSettings({ ...emailAlertSettings, indexingErrors: e.target.checked })}
                      className="accent-rose-500 w-4 h-4 rounded"
                    />
                    <span className="text-slate-200 font-medium">🚨 Googlebot Crawl & CWV Alerts</span>
                  </label>

                  <label className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-900 border border-slate-800 cursor-pointer hover:border-slate-700">
                    <input
                      type="checkbox"
                      checked={emailAlertSettings.customerPurchases}
                      onChange={(e) => setEmailAlertSettings({ ...emailAlertSettings, customerPurchases: e.target.checked })}
                      className="accent-emerald-500 w-4 h-4 rounded"
                    />
                    <span className="text-slate-200 font-medium">💳 New Pro License / Customer Pay</span>
                  </label>
                </div>
              </div>

            </div>

            {/* Split Screen: Dispatch Log & Live Inbox Email Preview */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left: Dispatch Logs (4 cols) */}
              <div className="lg:col-span-4 bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-900">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Inbox className="w-4 h-4 text-blue-400" />
                      <span>{isBn ? 'ডিসপ্যাচ হিস্ট্রি ও লগ' : 'Triggered Alert Logs'}</span>
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400">{notificationLogs.length} Events</span>
                  </div>

                  <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                    {notificationLogs.map((log) => {
                      const isSelected = selectedLogForPreview?.id === log.id;
                      return (
                        <button
                          key={log.id}
                          onClick={() => {
                            setSelectedLogForPreview(log);
                            sounds.playSoftClick();
                          }}
                          className={`w-full p-3 rounded-xl border text-left transition space-y-1 block ${
                            isSelected 
                              ? 'bg-blue-600/15 border-blue-500 text-white' 
                              : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-300'
                          }`}
                        >
                          <div className="flex items-center justify-between text-[11px] font-mono">
                            <span className={`font-bold ${log.type === 'lead' ? 'text-blue-400' : 'text-amber-400'}`}>
                              {log.type.toUpperCase()}
                            </span>
                            <span className="text-slate-500">{log.timestamp}</span>
                          </div>
                          <p className="text-xs font-medium line-clamp-1">{log.subject}</p>
                          <span className="text-[10px] text-emerald-400 font-mono block">✓ {log.status} to {recipientEmail}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-[11px] text-slate-400">
                  💡 {isBn ? 'যেকোনো লগে ক্লিক করে ডানপাশে আসল ইমেইল প্রিভিউ দেখুন।' : 'Click any log item to render the full HTML email template on the right.'}
                </div>
              </div>

              {/* Right: High-Fidelity Branded Live Email Inbox Preview (8 cols) */}
              <div className="lg:col-span-8 bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl flex flex-col">
                
                {/* Email Client Header Bar */}
                <div className="bg-slate-900 p-4 border-b border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-slate-400 flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                      <span>INBOX PREVIEW (Google Mail / Outlook)</span>
                    </span>
                    <span className="font-mono text-[11px] text-slate-500">Latency: 48ms · SSL Verified</span>
                  </div>

                  {selectedLogForPreview && (
                    <div className="space-y-1 pt-1 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="text-slate-500 w-16 text-right font-medium">Subject:</span>
                        <span className="text-white font-bold">{selectedLogForPreview.subject}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-400">
                        <span className="text-slate-500 w-16 text-right font-medium">From:</span>
                        <span className="font-mono text-cyan-400">alerts@nexus-cloud-enterprise.io</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-400">
                        <span className="text-slate-500 w-16 text-right font-medium">To:</span>
                        <span className="font-mono text-white">{recipientEmail}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Email HTML Body Render */}
                <div className="p-6 bg-slate-900/40 flex-1 overflow-y-auto">
                  {selectedLogForPreview ? (
                    <div className="bg-white text-slate-900 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl border border-slate-200 font-sans max-w-2xl mx-auto">
                      
                      {/* Email Header */}
                      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-black text-sm">
                            N
                          </div>
                          <div>
                            <span className="text-xs font-bold text-slate-900 block leading-tight">Nexus Enterprise Notifications</span>
                            <span className="text-[10px] text-slate-500 font-mono">Google Cloud Infrastructure</span>
                          </div>
                        </div>
                        <span className="text-[11px] font-mono font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                          Verified Alert
                        </span>
                      </div>

                      {/* Content based on type */}
                      {selectedLogForPreview.type === 'lead' && selectedLogForPreview.clientData && (
                        <div className="space-y-4">
                          <div>
                            <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider block">New Client Lead Received</span>
                            <h2 className="text-xl font-black text-slate-950 mt-0.5">High-Ticket Project Inquiry Captured</h2>
                            <p className="text-xs text-slate-600 mt-1">
                              A new prospect has submitted their project details via your website: <strong>{project.name}</strong>.
                            </p>
                          </div>

                          {/* Client details card */}
                          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-xs">
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <span className="text-slate-500 font-semibold block text-[10px] uppercase">Client Name:</span>
                                <span className="text-slate-900 font-bold">{selectedLogForPreview.clientData.name}</span>
                              </div>
                              <div>
                                <span className="text-slate-500 font-semibold block text-[10px] uppercase">Client Email:</span>
                                <span className="text-blue-600 font-mono font-bold">{selectedLogForPreview.clientData.email}</span>
                              </div>
                            </div>
                            <div className="pt-1 border-t border-slate-200">
                              <span className="text-slate-500 font-semibold block text-[10px] uppercase">Estimated Budget:</span>
                              <span className="text-emerald-600 font-bold text-sm font-mono">{selectedLogForPreview.clientData.budget}</span>
                            </div>
                            <div className="pt-1 border-t border-slate-200">
                              <span className="text-slate-500 font-semibold block text-[10px] uppercase">Client Note & Requirements:</span>
                              <p className="text-slate-700 italic pt-0.5">"{selectedLogForPreview.clientData.note}"</p>
                            </div>
                          </div>

                          <div className="pt-2 flex items-center justify-between">
                            <button
                              onClick={() => {
                                window.open(`mailto:${selectedLogForPreview.clientData?.email}?subject=Regarding Your Enterprise Project Inquiry`);
                              }}
                              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md"
                            >
                              Reply Directly to Client
                            </button>
                            <span className="text-[11px] text-slate-400">Powered by Nexus Cloud Dispatch</span>
                          </div>
                        </div>
                      )}

                      {selectedLogForPreview.type === 'milestone' && selectedLogForPreview.milestoneData && (
                        <div className="space-y-4">
                          <div>
                            <span className="text-[11px] font-bold text-amber-600 uppercase tracking-wider block">Google Search Console Milestone</span>
                            <h2 className="text-xl font-black text-slate-950 mt-0.5">Ranking Breakthrough Confirmed!</h2>
                            <p className="text-xs text-slate-600 mt-1">
                              Your website has surpassed a major organic visibility threshold on Google.
                            </p>
                          </div>

                          <div className="bg-amber-50 p-5 rounded-xl border border-amber-200 space-y-2 text-center">
                            <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">{selectedLogForPreview.milestoneData.metric}</span>
                            <div className="text-3xl font-black text-amber-900 font-mono">{selectedLogForPreview.milestoneData.value}</div>
                            <span className="text-xs text-emerald-700 font-bold block">{selectedLogForPreview.milestoneData.impact}</span>
                          </div>

                          <div className="pt-2 flex items-center justify-between">
                            <button
                              onClick={() => onNavigateToTab('analytics')}
                              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md"
                            >
                              View Live Search Console Analytics
                            </button>
                            <span className="text-[11px] text-slate-400">Googlebot Verified</span>
                          </div>
                        </div>
                      )}

                      {/* Email Footer */}
                      <div className="pt-4 border-t border-slate-200 text-[10px] text-slate-400 flex items-center justify-between font-mono">
                        <span>Delivered to {recipientEmail}</span>
                        <span>One-Click Unsubscribe</span>
                      </div>

                    </div>
                  ) : (
                    <div className="p-8 text-center text-slate-500">
                      No email alert selected.
                    </div>
                  )}
                </div>

              </div>

            </div>

            {/* SMTP Integration Code Snippet */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-300 font-mono">Node.js (Nodemailer / SendGrid) Dispatch Snippet</span>
                <button
                  onClick={() => copyToClipboard(`import nodemailer from 'nodemailer';\n\nconst transporter = nodemailer.createTransport({\n  host: 'smtp.googlemail.com',\n  port: 587,\n  secure: false,\n  auth: { user: '${recipientEmail}', pass: process.env.SMTP_APP_PASSWORD }\n});\n\nexport async function sendLeadAlert(lead) {\n  await transporter.sendMail({\n    from: '"Nexus Cloud" <alerts@nexus-seo.cloud>',\n    to: '${recipientEmail}',\n    subject: \`🎯 [NEW LEAD] \${lead.name} (\${lead.budget})\`,\n    html: \`<h1>New Lead Captured: \${lead.name}</h1><p>\${lead.note}</p>\`\n  });\n}`, 'smtpCode')}
                  className="text-xs text-blue-400 hover:underline flex items-center gap-1"
                >
                  {copiedId === 'smtpCode' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>Copy Node.js Code</span>
                </button>
              </div>
              <pre className="bg-slate-900 p-3 rounded-lg border border-slate-800 font-mono text-[11px] text-cyan-300 overflow-x-auto leading-relaxed">
{`import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.googlemail.com',
  port: 587,
  auth: { user: '${recipientEmail}', pass: process.env.SMTP_APP_PASSWORD }
});

export async function sendLeadAlert(lead) {
  await transporter.sendMail({
    from: '"Nexus Cloud" <alerts@nexus-seo.cloud>',
    to: '${recipientEmail}',
    subject: \`🎯 [NEW LEAD] \${lead.name} (\${lead.budget})\`,
    html: \`<h1>New Lead Captured: \${lead.name}</h1><p>\${lead.note}</p>\`
  });
}`}
              </pre>
            </div>

          </div>
        </div>
      )}

      {/* MODULE 6: Premium Theme Engine & AI Palette Studio */}
      {activeModule === 'theme-engine' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 md:p-8 shadow-xl space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold mb-1">
                  <Palette className="w-3.5 h-3.5" />
                  <span>{isBn ? 'এন্টারপ্রাইজ থিম ও এআই প্যালেট ইঞ্জিন' : 'Enterprise Design System & AI Palette Studio'}</span>
                </div>
                <h3 className="text-xl font-black text-white">
                  {isBn ? 'প্রিমিয়াম থিম ইঞ্জিন ও এআই কালার আর্কিটেকচার' : 'Premium Theme Engine & High-Converting Templates'}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  {isBn 
                    ? 'ফরচুন ৫০০ কোম্পানির জন্য প্রস্তুতকৃত হাই-কনভার্সন লাক্সারি ডিজাইন টেমপ্লেট নির্বাচন করুন এবং এআই কালার রেকমেন্ডেশন দিয়ে কাস্টমাইজ করুন।' 
                    : 'Pick professional, high-converting design templates and customize them using AI-driven color palettes and WCAG-compliant contrast.'}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    sounds.playLuxuryChime();
                    confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
                    showNotification(isBn ? 'থিম সফলভাবে প্রজেক্টে প্রয়োগ করা হয়েছে!' : 'Premium theme applied to active project!');
                  }}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/20 active:scale-95 transition flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-slate-950" />
                  <span>{isBn ? 'থিম প্রয়োগ করুন' : 'Apply Theme'}</span>
                </button>
                <button
                  onClick={() => {
                    const cssVars = `:root {\n  --brand-primary: ${customPrimaryColor};\n  --brand-accent: ${customAccentColor};\n  --brand-bg: ${customBgColor};\n  --font-heading: 'Plus Jakarta Sans', sans-serif;\n  --radius-card: 16px;\n  --contrast-ratio: 14.8;\n}`;
                    copyToClipboard(cssVars, 'themeCss');
                  }}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold transition flex items-center gap-1.5"
                >
                  {copiedId === 'themeCss' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedId === 'themeCss' ? 'Copied' : 'Copy CSS'}</span>
                </button>
              </div>
            </div>

            {/* 5 High-Converting Design Templates */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-white uppercase tracking-wider block">
                {isBn ? '১. আন্তর্জাতিক মানের প্রফেশনাল টেমপ্লেট নির্বাচন করুন:' : '1. Select Professional High-Converting Template:'}
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {[
                  {
                    id: 'obsidian-gold',
                    name: 'Obsidian Titanium',
                    desc: 'Executive Dark Luxury',
                    primary: '#f59e0b',
                    accent: '#3b82f6',
                    bg: '#030712',
                    badge: 'FORTUNE 500'
                  },
                  {
                    id: 'cyber-blue',
                    name: 'Silicon Neo-Cyber',
                    desc: 'Cloud, AI & Web3',
                    primary: '#06b6d4',
                    accent: '#3b82f6',
                    bg: '#080d1a',
                    badge: 'TECH ELITE'
                  },
                  {
                    id: 'emerald-wealth',
                    name: 'Emerald Banking',
                    desc: 'Fintech & Investments',
                    primary: '#10b981',
                    accent: '#fbbf24',
                    bg: '#021813',
                    badge: 'TRUST AAA'
                  },
                  {
                    id: 'royal-amethyst',
                    name: 'Royal Amethyst',
                    desc: 'Creative SaaS & Studio',
                    primary: '#a855f7',
                    accent: '#ec4899',
                    bg: '#0f051d',
                    badge: 'HIGH CTR'
                  },
                  {
                    id: 'swiss-minimal',
                    name: 'Swiss Platinum',
                    desc: 'Ultra-Clean Architecture',
                    primary: '#38bdf8',
                    accent: '#94a3b8',
                    bg: '#0b1120',
                    badge: 'MINIMAL'
                  },
                ].map((tmpl) => {
                  const isSelected = selectedThemeId === tmpl.id;
                  return (
                    <button
                      key={tmpl.id}
                      onClick={() => {
                        setSelectedThemeId(tmpl.id);
                        setCustomPrimaryColor(tmpl.primary);
                        setCustomAccentColor(tmpl.accent);
                        setCustomBgColor(tmpl.bg);
                        sounds.playSoftClick();
                      }}
                      className={`p-4 rounded-xl border text-left transition flex flex-col justify-between space-y-3 relative ${
                        isSelected 
                          ? 'border-amber-400 bg-slate-950 shadow-xl ring-1 ring-amber-400/50' 
                          : 'border-slate-800 bg-slate-950/70 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300">
                          {tmpl.badge}
                        </span>
                        <div className="flex items-center gap-1">
                          <span className="w-3 h-3 rounded-full border border-slate-700" style={{ backgroundColor: tmpl.primary }} />
                          <span className="w-3 h-3 rounded-full border border-slate-700" style={{ backgroundColor: tmpl.accent }} />
                          <span className="w-3 h-3 rounded-full border border-slate-700" style={{ backgroundColor: tmpl.bg }} />
                        </div>
                      </div>

                      <div>
                        <span className="text-xs font-black text-white block">{tmpl.name}</span>
                        <span className="text-[11px] text-slate-400 block">{tmpl.desc}</span>
                      </div>

                      {isSelected && (
                        <div className="text-[10px] text-amber-400 font-bold flex items-center gap-1 pt-1 border-t border-slate-900">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Active Theme</span>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Customizer & AI Color Palette Controls */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-950 p-5 rounded-2xl border border-slate-800">
              
              {/* Color Customizer (5 cols) */}
              <div className="lg:col-span-5 space-y-4">
                <span className="text-xs font-bold text-white uppercase tracking-wider block">
                  {isBn ? '২. এআই কালার প্যালেট কাস্টমাইজেশন:' : '2. AI Palette Tuning & Metrics:'}
                </span>

                <div className="space-y-3 text-xs">
                  <div className="flex items-center justify-between bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-slate-300 font-medium">Primary Accent:</span>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={customPrimaryColor}
                        onChange={(e) => setCustomPrimaryColor(e.target.value)}
                        className="w-7 h-7 rounded border border-slate-700 bg-transparent cursor-pointer"
                      />
                      <span className="font-mono text-xs text-white">{customPrimaryColor}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-slate-300 font-medium">Radiant Secondary:</span>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={customAccentColor}
                        onChange={(e) => setCustomAccentColor(e.target.value)}
                        className="w-7 h-7 rounded border border-slate-700 bg-transparent cursor-pointer"
                      />
                      <span className="font-mono text-xs text-white">{customAccentColor}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-slate-300 font-medium">Deep Surface Canvas:</span>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={customBgColor}
                        onChange={(e) => setCustomBgColor(e.target.value)}
                        className="w-7 h-7 rounded border border-slate-700 bg-transparent cursor-pointer"
                      />
                      <span className="font-mono text-xs text-white">{customBgColor}</span>
                    </div>
                  </div>
                </div>

                {/* AI Contrast & Accessibility Rating */}
                <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-300">WCAG 2.1 Contrast Ratio:</span>
                    <span className="font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                      AAA Compliant (15.2:1)
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    AI verification confirms zero eye strain on high-res Retina displays and sub-second readability for mobile visitors.
                  </p>
                </div>
              </div>

              {/* Live Interactive Preview Canvas (7 cols) */}
              <div className="lg:col-span-7 bg-slate-900/60 rounded-2xl border border-slate-800 overflow-hidden flex flex-col">
                
                {/* Canvas Control Header */}
                <div className="bg-slate-900 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                    <span className="font-mono text-[11px] text-slate-300 ml-1">Live Theme Canvas</span>
                  </div>

                  <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
                    <button
                      onClick={() => setPreviewDevice('desktop')}
                      className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                        previewDevice === 'desktop' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Desktop
                    </button>
                    <button
                      onClick={() => setPreviewDevice('mobile')}
                      className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                        previewDevice === 'mobile' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Mobile
                    </button>
                  </div>
                </div>

                {/* Rendered Live Canvas Preview */}
                <div 
                  className="p-6 sm:p-8 flex-1 flex flex-col justify-center transition-all duration-500"
                  style={{ backgroundColor: customBgColor }}
                >
                  <div className={`mx-auto space-y-4 text-center ${previewDevice === 'mobile' ? 'max-w-xs' : 'max-w-md'}`}>
                    <span 
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold border tracking-wide"
                      style={{ 
                        color: customPrimaryColor, 
                        borderColor: `${customPrimaryColor}40`,
                        backgroundColor: `${customPrimaryColor}15` 
                      }}
                    >
                      ✦ ENTERPRISE ARCHITECTURE
                    </span>

                    <h4 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
                      {project.name.split('–')[0].trim() || 'Next-Gen Enterprise'}
                    </h4>

                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                      {project.description || 'Engineered for sub-second Core Web Vitals and organic Google Search dominance.'}
                    </p>

                    <div className="pt-2 flex flex-wrap justify-center gap-2.5">
                      <button
                        className="px-5 py-2.5 rounded-xl font-bold text-xs shadow-lg transition active:scale-95"
                        style={{ 
                          backgroundColor: customPrimaryColor, 
                          color: customBgColor === '#ffffff' ? '#000' : '#030712' 
                        }}
                      >
                        Start Free Trial →
                      </button>
                      <button
                        className="px-4 py-2.5 rounded-xl font-semibold text-xs border border-slate-700 text-slate-200 bg-slate-900/60"
                      >
                        View Live Specs
                      </button>
                    </div>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};

