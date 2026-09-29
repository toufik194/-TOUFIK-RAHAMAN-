import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  Code2, 
  Eye, 
  Copy, 
  Check, 
  Download, 
  Zap, 
  Terminal, 
  Cpu, 
  Flame, 
  Layers, 
  RefreshCw,
  ExternalLink,
  Laptop,
  Smartphone,
  ShieldCheck,
  CheckCircle2,
  Wand2,
  Lock,
  Unlock,
  CreditCard,
  Video,
  Globe,
  FileText,
  Star,
  Award,
  ShoppingBag,
  ArrowRight,
  Image,
  Upload,
  Palette,
  Layout,
  MessageSquare,
  Type
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Language, WebsiteProject } from '../types';
import { AiMessage, AI_PRESETS, processAiPrompt, COMPONENT_TEMPLATES } from '../utils/aiEngine';
import { sounds } from '../utils/soundEffects';
import { downloadFile } from '../utils/seoGenerators';
import { AiSeoGame } from './AiSeoGame';

interface NexusAiStudioProps {
  language: Language;
  project: WebsiteProject;
  onUpdateProject: (updated: Partial<WebsiteProject>) => void;
  onNavigateToTab: (tab: any) => void;
}

export const NexusAiStudio: React.FC<NexusAiStudioProps> = ({
  language,
  project,
  onUpdateProject,
  onNavigateToTab,
}) => {
  const isBn = language === 'bn';

  // Chat messages
  const [messages, setMessages] = useState<AiMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: isBn
        ? `👋 **স্বাগতম! আমি নেক্সাস এআই (Nexus AI) — পৃথিবীর অন্যতম শক্তিশালী এবং দ্রুতগতির এআই ওয়েব আর্কিটেক্ট।**\n\nআমি আপনার ওয়েবসাইটের জন্য:\n1. **স্বয়ংক্রিয় প্রফেশনাল ওয়েব কম্পোনেন্ট ও কোড** তৈরি করতে পারি (যার লাইভ প্রিভিউ আপনি নিচে সাথে সাথে দেখতে পারবেন)।\n2. **গুগলের ১ নম্বরে আসার সিক্রেট এসইও স্ট্র্যাটেজি** দিতে পারি।\n3. **উচ্চ ক্লিক রেট (High CTR) মেটা ট্যাগ ও ব্র্যান্ড স্লোগান** বানিয়ে দিতে পারি।\n\nনিচের সাজেস্ট করা প্রশ্নগুলো ক্লিক করুন অথবা আপনার যা প্রয়োজন বাংলায় বা ইংরেজিতে লিখুন!`
        : `👋 **Welcome! I am Nexus AI — One of the world's most powerful and active autonomous AI web architects.**\n\nI can:\n1. **Synthesize production-ready web components & code** with instant live visual rendering.\n2. **Generate proven Google Search #1 ranking blueprints** tailored to your domain.\n3. **Craft high-converting SEO metadata and rich schemas**.\n\nClick any prompt below or ask me anything to begin!`,
      category: 'strategy',
      timestamp: 'Active Now',
    }
  ]);

  const [inputPrompt, setInputPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeViewMode, setActiveViewMode] = useState<'preview' | 'code'>('preview');
  const [selectedTemplateKey, setSelectedTemplateKey] = useState<'hero' | 'pricing'>('hero');
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);
  const [appliedNotification, setAppliedNotification] = useState<string | null>(null);

  // Free vs Paid AI Tool Hub State
  const [toolFilter, setToolFilter] = useState<'all' | 'free' | 'paid'>('all');
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [selectedPaidTool, setSelectedPaidTool] = useState<{
    id: string;
    title: string;
    price: string;
    description: string;
    features: string[];
  } | null>(null);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [purchasedKey, setPurchasedKey] = useState<string | null>(null);
  const [activeFreeToolResult, setActiveFreeToolResult] = useState<{
    title: string;
    result: string;
  } | null>(null);

  // Specialized Studio Tools Active Tab
  const [activeStudioTab, setActiveStudioTab] = useState<'article' | 'code-assistant' | 'image-to-prompt' | 'copilot' | 'directory'>('article');

  // Specialized Tool 1: AI-Powered Article Generator State
  const [articleTopic, setArticleTopic] = useState(
    isBn ? 'আধুনিক ক্লাউড আর্কিটেকচার ও গুগল ইনডেক্সিং গাইডলাইন ২০২৬' : 'Enterprise Cloud Architecture & Sub-Second Googlebot Indexing 2026'
  );
  const [articleLength, setArticleLength] = useState<'500' | '1000' | '1500' | '2500'>('1500');
  const [articleTone, setArticleTone] = useState<'professional' | 'technical' | 'conversational' | 'commercial'>('professional');
  const [isGeneratingArticle, setIsGeneratingArticle] = useState(false);
  const [generatedArticle, setGeneratedArticle] = useState<{
    title: string;
    excerpt: string;
    readTime: string;
    wordCount: number;
    content: string;
    schemaJson: string;
  } | null>(null);

  // Specialized Tool 2: Code Assistant for Web Snippets State
  const [selectedSnippetPreset, setSelectedSnippetPreset] = useState<'hero' | 'navbar' | 'pricing' | 'faq' | 'testimonials' | 'cta'>('hero');
  const [customSnippetPrompt, setCustomSnippetPrompt] = useState('');
  const [isGeneratingSnippet, setIsGeneratingSnippet] = useState(false);
  const [snippetViewMode, setSnippetViewMode] = useState<'preview' | 'code'>('preview');
  const [snippetDevice, setSnippetDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [activeSnippetCode, setActiveSnippetCode] = useState(COMPONENT_TEMPLATES.hero.code);
  const [activeSnippetTitle, setActiveSnippetTitle] = useState('High-Converting SaaS Hero Section');

  // Specialized Tool 3: Simple Image-to-Prompt Generator State
  const [selectedImagePreset, setSelectedImagePreset] = useState<'saas-dark' | 'ecommerce-minimal' | 'fintech-card' | 'cyberpunk'>('saas-dark');
  const [customImgUrl, setCustomImgUrl] = useState('');
  const [uploadedPreview, setUploadedPreview] = useState<string | null>(null);
  const [isAnalyzingImage, setIsAnalyzingImage] = useState(false);
  const [generatedPromptData, setGeneratedPromptData] = useState<{
    description: string;
    midjourneyPrompt: string;
    dallePrompt: string;
    colorPalette: { name: string; hex: string; bgClass: string }[];
    layoutTips: string[];
  } | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isProcessing]);

  const handleSendMessage = async (textToSend?: string) => {
    const prompt = (textToSend || inputPrompt).trim();
    if (!prompt || isProcessing) return;

    sounds.playSoftClick();

    const userMsg: AiMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: prompt,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputPrompt('');
    setIsProcessing(true);

    try {
      // Simulate real-time neural synthesis
      const response = await processAiPrompt(prompt, language);
      setMessages((prev) => [...prev, response]);
      sounds.playLuxuryChime();

      if (response.codeSnippet) {
        confetti({
          particleCount: 60,
          spread: 60,
          origin: { y: 0.7 }
        });
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    sounds.playSoftClick();
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  const handleApplyHeroToProject = () => {
    onUpdateProject({
      name: isBn 
        ? 'নেক্সাস প্রো – এআই সুপারচার্জড ওয়েব প্ল্যাটফর্ম' 
        : 'Nexus Pro – Autonomous AI Web Platform',
      description: isBn
        ? 'গুগল ক্লাউড আর্কিটেকচার এবং বিশ্বের সবচেয়ে সক্রিয় এআই প্রযুক্তিতে পরিচালিত প্রিমিয়াম ওয়েব সমাধান।'
        : 'Enterprise-grade autonomous AI web solutions built on sovereign Google Cloud infrastructure.',
    });
    setAppliedNotification(isBn ? 'প্রজেক্ট মেটাডাটা আপডেট হয়েছে!' : 'Project metadata updated with AI recommendations!');
    sounds.playLuxuryChime();
    setTimeout(() => setAppliedNotification(null), 2500);
  };

  const currentActiveTemplate = COMPONENT_TEMPLATES[selectedTemplateKey];

  // Handler for AI-Powered Article Generator
  const handleRunArticleGenerator = () => {
    setIsGeneratingArticle(true);
    sounds.playSoftClick();

    setTimeout(() => {
      const topic = articleTopic.trim() || 'Modern Enterprise Cloud Architecture & Google Indexing';
      const cleanName = project.name.split('–')[0].trim();
      const primaryKw = project.keywords[0] || 'Cloud Infrastructure';
      const secondaryKw = project.keywords[1] || 'Core Web Vitals';
      const words = parseInt(articleLength, 10);

      const content = isBn
        ? `# ${topic}

> **এক্সিকিউটিভ ওভারভিউ:** ডিজিটাল যুগে গুগলে যেকোনো ওয়েবসাইট দ্রুত ইনডেক্স ও র্যাংক করার জন্য টেকনিক্যাল আর্কিটেকচার এবং সাব-সেকেন্ড পেজস্পিড অন্যতম প্রধান বিষয়।

---

## 📌 মূল টেকঅ্যাওয়ে (Key Highlights)
- **সাব-৫০ms রেসপন্স টাইম:** ক্লাউড এজ সিডিএন (CDN) ব্যবহার করে সার্ভার রেসপন্স দ্রুততম করা।
- **ইনস্ট্যান্ট ক্রলিং:** ডায়নামিক সাইটম্যাপ এবং রোবটস প্রটোকলের সঠিক সমন্বয়।
- **স্কিমা মার্কআপ:** গুগল সার্চে রিচ স্নিপেট ও স্টার রেটিং পাওয়ার আধুনিক কৌশল।

---

## ১. ভূমিকা: অর্গানিক ট্র্যাফিকের মাধ্যমে রাজস্ব বৃদ্ধি
বর্তমান কর্পোরেট মার্কেটে **${cleanName}** প্ল্যাটফর্মটির মতো আধুনিক ওয়েব সল্যুশনগুলো কীভাবে গুগলের প্রথম পাতায় নিজেদের উপস্থিতি নিশ্চিত করছে তা এই গাইডে বিশ্লেষণ করা হয়েছে। আমাদের মূল কি-ওয়ার্ড ফোকাস: **${primaryKw}** এবং **${secondaryKw}**।

> "গুগলের শীর্ষ ৩ ফলাফলে অবস্থান করতে পারলে মোট সার্চ ট্র্যাফিকের ৬৮% অর্গানিকভাবে পাওয়া সম্ভব।"

---

## ২. কোর ওয়েব ভাইটালস (Core Web Vitals) এবং গুগলবট ক্রলিং
গুগল ২০২৬ সালে সাইটের পারফরম্যান্স ও স্ট্যাবিলিটিকে প্রধান র্যাংকিং ফ্যাক্টর হিসেবে বিবেচনা করে:
1. **LCP (Largest Contentful Paint):** ১ সেকেন্ডের নিচে নিশ্চিত করুন।
2. **CLS (Cumulative Layout Shift):** একদম শূন্য (0.00) রাখুন যাতে লেআউট শিফট না হয়।
3. **INP (Interaction to Next Paint):** ১০০ মিলিসেকেন্ডের কম রাখুন।

\`\`\`html
<!-- Critical Googlebot Optimization Tags -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<meta name="robots" content="index, follow, max-image-preview:large">
\`\`\`

---

## ৩. কনভার্সন ও দীর্ঘমেয়াদী এসইও ফলাফল
সঠিক ইন্টারনাল লিংকিং ও অথরিটেটিভ কন্টেন্ট তৈরি করে আপনার সাইটের ডোমেইন রেটিং (DR) দ্বিগুণ করা সম্ভব।

---

## ৪. উপসংহার
নিয়মিত গুগল সার্চ কনসোল অডিট করুন এবং সাইটম্যাপ আপডেট রাখুন।`
        : `# ${topic}

> **Executive Overview:** In modern web architecture, achieving sub-second Googlebot indexing and dominant SERP visibility demands technical excellence, optimized Core Web Vitals, and strategic structured data.

---

## 📌 Key Architectural Takeaways
- **Sub-50ms Global TTFB:** Sovereign Google Cloud CDN routing for instantaneous time-to-first-byte.
- **Automated Googlebot Discovery:** Priority sitemap.xml validation and real-time crawl dispatching.
- **Semantic JSON-LD Schemas:** Native breadcrumb, software application, and FAQ rich snippets.

---

## 1. Introduction: The Strategic Edge of Technical SEO
Organizations leveraging **${cleanName}** technical infrastructure consistently outrank competitors by aligning web deployment pipelines with Google's Core Web Vitals benchmarks. Targeting core transactional queries such as **${primaryKw}** and **${secondaryKw}** creates sustained, compounding organic revenue.

> "Securing a top 3 organic ranking on commercial queries yields over 68.7% of all purchase-intent clicks."

---

## 2. Core Web Vitals Mastery & Crawl Efficiency
Google's indexing algorithms rigorously score server predictability and layout stability:
1. **LCP (Largest Contentful Paint):** Engineered strictly beneath 0.8s on 4G networks.
2. **CLS (Cumulative Layout Shift):** Locked at zero via predetermined aspect ratio containers.
3. **INP (Interaction to Next Paint):** Under 50ms through non-blocking JavaScript execution.

\`\`\`html
<!-- Enterprise Production Performance Snippet -->
<link rel="preconnect" href="https://storage.googleapis.com" crossorigin>
<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large">
\`\`\`

---

## 3. High-Intent Content Optimization
Distribute high-value long-tail search phrases across semantic H2 and H3 headers while maintaining natural readability for human visitors.

---

## 4. Conclusion & Action Roadmap
Audit technical issues in Google Search Console, deploy fresh sitemap indexes weekly, and maintain continuous Core Web Vitals monitoring.`;

      const schemaJson = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "TechArticle",
        "headline": topic,
        "description": `Comprehensive technical architecture guide on ${topic}`,
        "author": { "@type": "Organization", "name": cleanName },
        "publisher": { "@type": "Organization", "name": cleanName }
      }, null, 2);

      setGeneratedArticle({
        title: topic,
        excerpt: isBn ? `${topic} বিষয়ে পূর্ণাঙ্গ এন্টারপ্রাইজ এসইও ও ক্লাউড গাইডলাইন।` : `Executive technical guide detailing ${topic} for enterprise search dominance.`,
        readTime: `${Math.round(words / 250)} min read`,
        wordCount: words,
        content,
        schemaJson
      });

      setIsGeneratingArticle(false);
      sounds.playLuxuryChime();
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    }, 700);
  };

  // Handler for Code Assistant for Web Snippets
  const handleRunCodeSnippetGenerator = (presetKey?: string) => {
    const key = (presetKey || selectedSnippetPreset) as 'hero' | 'navbar' | 'pricing' | 'faq' | 'testimonials' | 'cta';
    setIsGeneratingSnippet(true);
    sounds.playSoftClick();

    setTimeout(() => {
      let code = '';
      let title = '';

      if (key === 'hero') {
        title = 'Modern SaaS Hero Section with Glowing CTA';
        code = `<section class="relative overflow-hidden bg-slate-950 py-24 px-6 text-center text-white">
  <div class="absolute inset-0 bg-gradient-to-tr from-blue-600/10 via-transparent to-amber-500/10 pointer-events-none"></div>
  <div class="max-w-4xl mx-auto space-y-6 relative z-10">
    <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold">
      ⚡ GOOGLE CLOUD POWERED WEB APP
    </span>
    <h1 class="text-4xl sm:text-6xl font-black tracking-tight leading-tight">
      Next-Gen Web Platform for High-Growth Teams
    </h1>
    <p class="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto">
      Sub-second Core Web Vitals, automated Google Search Console verification, and rich schema injection in one unified suite.
    </p>
    <div class="flex items-center justify-center gap-3 pt-4">
      <button class="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/25 transition">
        Launch Website Free
      </button>
      <button class="px-6 py-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-sm font-semibold hover:bg-slate-800 transition">
        Live Demo Preview
      </button>
    </div>
  </div>
</section>`;
      } else if (key === 'navbar') {
        title = 'Sticky Glassmorphism Responsive Navigation Bar';
        code = `<nav class="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 px-6 py-3.5">
  <div class="max-w-6xl mx-auto flex items-center justify-between">
    <div class="flex items-center gap-2.5">
      <div class="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-black text-sm">N</div>
      <span class="font-black text-white text-base tracking-tight">${project.name.split('–')[0].trim()}</span>
    </div>
    <div class="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-300">
      <a href="#features" class="hover:text-blue-400 transition">Features</a>
      <a href="#solutions" class="hover:text-blue-400 transition">Solutions</a>
      <a href="#pricing" class="hover:text-blue-400 transition">Pricing</a>
      <a href="#docs" class="hover:text-blue-400 transition">Docs</a>
    </div>
    <div class="flex items-center gap-3">
      <button class="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow transition">
        Get Started
      </button>
    </div>
  </div>
</nav>`;
      } else if (key === 'pricing') {
        title = 'Conversion-Optimized 3-Tier Pricing Grid';
        code = `<div class="bg-slate-950 py-16 px-6 text-white">
  <div class="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
    <div class="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
      <span class="text-xs font-bold text-slate-400 uppercase">Starter</span>
      <div class="text-3xl font-black font-mono">$29<span class="text-xs font-normal text-slate-400">/mo</span></div>
      <p class="text-xs text-slate-400">Essential cloud hosting and SEO tags.</p>
      <button class="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs">Choose Starter</button>
    </div>
    <div class="bg-gradient-to-b from-blue-950/40 via-slate-900 to-slate-900 p-6 rounded-2xl border-2 border-blue-500 space-y-4 relative shadow-xl">
      <span class="text-xs font-bold text-blue-400 uppercase">Pro Agency (Popular)</span>
      <div class="text-3xl font-black text-blue-400 font-mono">$99<span class="text-xs font-normal text-slate-400">/mo</span></div>
      <p class="text-xs text-slate-300">Unlimited AI web builds and priority crawl indexing.</p>
      <button class="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30">Activate Pro</button>
    </div>
    <div class="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
      <span class="text-xs font-bold text-purple-400 uppercase">Enterprise</span>
      <div class="text-3xl font-black font-mono">$299<span class="text-xs font-normal text-slate-400">/mo</span></div>
      <p class="text-xs text-slate-400">SOC-2 compliance and 24/7 dedicated engineering SLA.</p>
      <button class="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs">Contact Sales</button>
    </div>
  </div>
</div>`;
      } else if (key === 'faq') {
        title = 'Google Schema Compliant FAQ Accordion';
        code = `<div class="bg-slate-950 py-12 px-6 max-w-3xl mx-auto text-white space-y-4">
  <h3 class="text-xl font-bold text-center mb-6">Frequently Asked Questions</h3>
  <details class="bg-slate-900 p-4 rounded-xl border border-slate-800 group">
    <summary class="font-bold text-sm cursor-pointer list-none flex items-center justify-between text-slate-200">
      <span>How fast does Googlebot index my website?</span>
      <span class="text-blue-400 group-open:rotate-180 transition">▼</span>
    </summary>
    <p class="text-xs text-slate-400 mt-2 leading-relaxed">
      With verified sitemaps and Core Web Vitals scores above 90, Googlebot typically indexes new pages within 2 to 24 hours.
    </p>
  </details>
  <details class="bg-slate-900 p-4 rounded-xl border border-slate-800 group">
    <summary class="font-bold text-sm cursor-pointer list-none flex items-center justify-between text-slate-200">
      <span>Are the generated web snippets mobile-responsive?</span>
      <span class="text-blue-400 group-open:rotate-180 transition">▼</span>
    </summary>
    <p class="text-xs text-slate-400 mt-2 leading-relaxed">
      Yes! All components are built with mobile-first Tailwind CSS and tested on both desktop and mobile viewports.
    </p>
  </details>
</div>`;
      } else if (key === 'testimonials') {
        title = '5-Star Social Proof & Client Testimonials';
        code = `<div class="bg-slate-950 py-12 px-6 text-white">
  <div class="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
    <div class="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-3">
      <div class="flex text-amber-400 text-sm">★★★★★</div>
      <p class="text-xs text-slate-300 leading-relaxed">
        "Our domain achieved rank #1 for our primary transactional query in under 3 weeks. The automated schema tags are game-changing."
      </p>
      <div class="flex items-center gap-2 pt-1 border-t border-slate-800">
        <div class="w-7 h-7 rounded-full bg-blue-600 text-[10px] font-bold flex items-center justify-center">JD</div>
        <div>
          <span class="text-xs font-bold text-white block">Jonathan Drake</span>
          <span class="text-[10px] text-slate-500">VP of Growth, Fintech Scaleup</span>
        </div>
      </div>
    </div>
    <div class="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-3">
      <div class="flex text-amber-400 text-sm">★★★★★</div>
      <p class="text-xs text-slate-300 leading-relaxed">
        "Lighthouse performance scored 100/100 immediately upon deploying on Google Cloud. Incredible engineering precision."
      </p>
      <div class="flex items-center gap-2 pt-1 border-t border-slate-800">
        <div class="w-7 h-7 rounded-full bg-emerald-600 text-[10px] font-bold flex items-center justify-center">SM</div>
        <div>
          <span class="text-xs font-bold text-white block">Sarah Miller</span>
          <span class="text-[10px] text-slate-500">Lead Frontend Architect</span>
        </div>
      </div>
    </div>
  </div>
</div>`;
      } else {
        title = 'High-Impact Call-To-Action (CTA) Banner';
        code = `<div class="bg-gradient-to-r from-blue-900/40 via-indigo-950 to-slate-950 p-8 sm:p-12 rounded-3xl border border-blue-500/30 text-center max-w-4xl mx-auto space-y-4">
  <h2 class="text-2xl sm:text-3xl font-black text-white">Ready to Dominate Google Search Rankings?</h2>
  <p class="text-slate-300 text-xs sm:text-sm max-w-lg mx-auto">
    Deploy on enterprise Google Cloud infrastructure today and receive sub-second response times and verified sitemaps.
  </p>
  <div class="pt-2 flex justify-center gap-3">
    <button class="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/25">
      Start Free Trial Now
    </button>
  </div>
</div>`;
      }

      setActiveSnippetCode(code);
      setActiveSnippetTitle(title);
      setIsGeneratingSnippet(false);
      sounds.playLuxuryChime();
    }, 500);
  };

  // Handler for Simple Image-to-Prompt Generator
  const handleRunImageToPrompt = () => {
    setIsAnalyzingImage(true);
    sounds.playSoftClick();

    setTimeout(() => {
      let desc = '';
      let mjPrompt = '';
      let dallePrompt = '';
      let colors: { name: string; hex: string; bgClass: string }[] = [];
      let tips: string[] = [];

      if (selectedImagePreset === 'saas-dark') {
        desc = 'Ultra-modern dark mode obsidian SaaS interface with glowing electric cyan neon accents and 3D floating cloud telemetry nodes.';
        mjPrompt = 'hyper-realistic 3D isometric cloud infrastructure nodes glowing with electric blue and emerald neon data streams, ultra-dark obsidian slate background (#020617), sleek glassmorphism dashboard overlay, cinematic volumetric lighting, 8k resolution, UI design hero banner concept, minimalist composition --ar 16:9 --style raw --v 6.0';
        dallePrompt = 'A sleek and modern dark mode website hero section visual featuring 3D glowing holographic server nodes in electric cyan and deep indigo, floating against a clean matte black minimalist tech background, cinematic studio lighting.';
        colors = [
          { name: 'Obsidian Void', hex: '#020617', bgClass: 'bg-slate-950' },
          { name: 'Electric Cyan Glow', hex: '#06b6d4', bgClass: 'bg-cyan-500' },
          { name: 'Indigo Accent', hex: '#6366f1', bgClass: 'bg-indigo-500' },
          { name: 'Pure White Text', hex: '#ffffff', bgClass: 'bg-white' },
        ];
        tips = [
          'Use dark slate background (bg-slate-950) with subtle radial gradient glow in top corner.',
          'Enforce white text with 80% opacity on secondary descriptions for maximum contrast.',
          'Add border border-cyan-500/20 to floating card containers.'
        ];
      } else if (selectedImagePreset === 'ecommerce-minimal') {
        desc = 'Clean Apple-style minimalist commercial showcase with pure studio lighting, soft neutral gray gradients, and sharp typography.';
        mjPrompt = 'minimalist luxury product showcase on an architectural concrete podium, soft warm neutral studio daylight, clean shadows, elegant negative space, ultra-high-definition commercial photography, aesthetic Swiss typography layout --ar 16:9 --v 6.0';
        dallePrompt = 'Minimalist aesthetic product photography for e-commerce website hero banner, featuring clean stone pedestal with soft natural morning light and subtle warm gray tones.';
        colors = [
          { name: 'Pure Snow', hex: '#fafafa', bgClass: 'bg-zinc-50' },
          { name: 'Warm Charcoal', hex: '#18181b', bgClass: 'bg-zinc-900' },
          { name: 'Champagne Gold', hex: '#d97706', bgClass: 'bg-amber-600' },
          { name: 'Muted Platinum', hex: '#e4e4e7', bgClass: 'bg-zinc-200' },
        ];
        tips = [
          'Maintain large whitespace and 48px to 64px padding between sections.',
          'Use bold black sans-serif headlines with medium-weight gray body copy.',
          'Incorporate subtle rounded-2xl image frames with soft drop shadows.'
        ];
      } else if (selectedImagePreset === 'fintech-card') {
        desc = 'High-end holographic fintech debit card floating over a deep navy isometric gradient grid with glowing security shields.';
        mjPrompt = 'hyper-futuristic black titanium credit card floating in mid-air with glowing holographic rainbow microchip and laser-etched circuitry, deep navy and violet gradient background, volumetric caustics, luxury banking web UI --ar 16:9 --v 6.0';
        dallePrompt = 'A sleek floating black metallic debit card with iridescent holographic edges and gold microchip, set against a dark blue luxury financial technology dashboard background.';
        colors = [
          { name: 'Midnight Navy', hex: '#0f172a', bgClass: 'bg-slate-900' },
          { name: 'Titanium Gold', hex: '#f59e0b', bgClass: 'bg-amber-500' },
          { name: 'Emerald Trust', hex: '#10b981', bgClass: 'bg-emerald-500' },
          { name: 'Holo Violet', hex: '#8b5cf6', bgClass: 'bg-violet-500' },
        ];
        tips = [
          'Position card visual at right side of desktop hero with left-aligned headline.',
          'Add subtle glowing ring with blur-3xl behind the primary focal asset.',
          'Include trust badges (SOC-2, 256-bit SSL) immediately beneath primary CTA.'
        ];
      } else {
        desc = 'Cyberpunk futuristic neon street grid with vibrant magenta and cyan lasers, high-tech HUD overlays, and dark metallic finishes.';
        mjPrompt = 'cyberpunk holographic web interface HUD elements floating over a dark rainy futuristic metropolis, neon magenta and turquoise laser reflections, dark chrome textures, dystopian sci-fi aesthetic --ar 16:9 --v 6.0';
        dallePrompt = 'A cyberpunk futuristic digital HUD concept with neon pink and cyan laser lines, dark reflective chrome surfaces, and glowing data graphs for a web development portfolio.';
        colors = [
          { name: 'Cyber Magenta', hex: '#ec4899', bgClass: 'bg-pink-500' },
          { name: 'Neon Turquoise', hex: '#06b6d4', bgClass: 'bg-cyan-500' },
          { name: 'Deep Space', hex: '#030712', bgClass: 'bg-gray-950' },
          { name: 'Laser Lime', hex: '#84cc16', bgClass: 'bg-lime-500' },
        ];
        tips = [
          'Use dark gray/black base with high-saturation neon buttons and hover effects.',
          'Add border-glow animations to primary buttons (shadow-lg shadow-pink-500/30).',
          'Use monospace fonts for numerical data and metrics.'
        ];
      }

      setGeneratedPromptData({
        description: desc,
        midjourneyPrompt: mjPrompt,
        dallePrompt: dallePrompt,
        colorPalette: colors,
        layoutTips: tips
      });

      setIsAnalyzingImage(false);
      sounds.playLuxuryChime();
      confetti({ particleCount: 65, spread: 60, origin: { y: 0.6 } });
    }, 600);
  };


  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      
      {/* Top AI Status Ticker & Luxury Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-950 via-[#0a0f1d] to-slate-950 border border-amber-500/30 p-6 md:p-8 shadow-2xl shadow-amber-500/5">
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          
          <div className="space-y-3">
            {/* Live Model Indicator */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-bold tracking-wide">
                <Flame className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>NEXUS AI 3.5 ULTRA CORE</span>
              </span>
              <span className="text-slate-500">·</span>
              <span className="text-slate-400 flex items-center gap-1 font-mono text-[11px]">
                <Cpu className="w-3.5 h-3.5 text-blue-400" />
                <span>Google Cloud Asia-Southeast1 (Active)</span>
              </span>
              <span className="text-slate-500">·</span>
              <span className="text-emerald-400 font-mono text-[11px] font-semibold">
                38ms Neural Latency
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              {isBn 
                ? 'বিশ্বের সবচেয়ে সক্রিয় এআই ওয়েব আর্কিটেক্ট' 
                : 'The World’s Most Powerful AI Web Studio'}
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              {isBn
                ? 'লাইভ কোড জেনারেটর, ভিজ্যুয়াল স্যান্ডবক্স এবং গুগল ইনডেক্সিং অপ্টিমাইজার। আপনি যা চান টাইপ করলেই এআই তাৎক্ষণিকভাবে তৈরি করে দেবে।'
                : 'Autonomous code synthesis, live interactive visual sandbox, and Google Search Console optimization suite.'}
            </p>
          </div>

          {/* Quick Metrics Badge */}
          <div className="bg-slate-950/80 rounded-xl p-4 border border-slate-800 space-y-2 min-w-[220px] shrink-0">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              {isBn ? 'এআই ক্ষমতা:' : 'Intelligence Specs:'}
            </div>
            <div className="text-xs text-slate-200 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Reasoning Engine:</span>
                <span className="font-bold text-amber-300">Gemini Multi-Modal</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Visual Sandbox:</span>
                <span className="font-bold text-emerald-400">Live Rendered</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">SEO Synchronization:</span>
                <span className="font-bold text-blue-400">Googlebot Compliant</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Applied notification */}
      {appliedNotification && (
        <div className="bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-lg animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{appliedNotification}</span>
        </div>
      )}

      {/* AI SEO Tycoon & Algorithm Battle Game */}
      <AiSeoGame language={language} project={project} />

      {/* NEW SECTION: Free vs Paid VIP AI Tools Hub (নরমাল টুলস বনাম দামী ও কেনার টুলস) */}
      <div className="bg-gradient-to-br from-slate-950 via-[#0a0f1d] to-slate-950 rounded-2xl border border-slate-800 p-6 shadow-2xl space-y-6">
        
        {/* Header & Category Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isBn ? 'এআই পাওয়ারহাউস ডিরেক্টরি' : 'AI Powerhouse & Commercial Tool Hub'}</span>
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {isBn ? 'ফ্রি নরমাল টুলস এবং প্রিমিয়াম ভিআইপি এআই পাওয়ার' : 'Free Standard Tools vs. Commercial Pro AI Powers'}
            </h2>
            <p className="text-xs text-slate-400">
              {isBn 
                ? '১০০% ফ্রি নরমাল টুলস দিয়ে এখনই কাজ শুরু করুন অথবা বাণিজ্যিক সুবিধার জন্য দামী প্রিমিয়াম ভিআইপি টুলসের লাইসেন্স আনলক করুন।' 
                : 'Access 100% free daily webmaster utilities or unlock commercial-grade enterprise AI suites.'}
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 text-xs bg-slate-900 p-1 rounded-xl border border-slate-800 shrink-0">
            <button
              onClick={() => {
                setToolFilter('all');
                sounds.playSoftClick();
              }}
              className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 ${
                toolFilter === 'all' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>{isBn ? 'সবগুলো' : 'All Tools'}</span>
            </button>
            <button
              onClick={() => {
                setToolFilter('free');
                sounds.playSoftClick();
              }}
              className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 ${
                toolFilter === 'free' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse"></span>
              <span>{isBn ? '🟢 নরমাল ফ্রি টুলস' : 'Free Tools'}</span>
            </button>
            <button
              onClick={() => {
                setToolFilter('paid');
                sounds.playSoftClick();
              }}
              className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 ${
                toolFilter === 'paid' ? 'bg-amber-500 text-slate-950 font-black shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{isBn ? '💎 দামী ভিআইপি টুলস (Buy)' : 'Pro VIP (Buy)'}</span>
            </button>
          </div>
        </div>

        {/* Free Tool Result Toast/Card if active */}
        {activeFreeToolResult && (
          <div className="p-4 rounded-xl bg-slate-900 border border-emerald-500/40 space-y-2 animate-fade-in">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>{activeFreeToolResult.title}</span>
              </span>
              <button
                onClick={() => setActiveFreeToolResult(null)}
                className="text-xs text-slate-400 hover:text-white"
              >
                ✕ Close
              </button>
            </div>
            <pre className="bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-xs text-slate-200 overflow-x-auto select-all">
              {activeFreeToolResult.result}
            </pre>
          </div>
        )}

        {/* Tools Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          
          {/* FREE TOOL 1 */}
          {(toolFilter === 'all' || toolFilter === 'free') && (
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 hover:border-emerald-500/40 transition space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    ১০০% FREE TOOL
                  </span>
                  <span className="text-[11px] text-slate-400">Instant Access</span>
                </div>
                <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <span>{isBn ? 'ফ্রি মেটা ট্যাগ ও টাইটেল জেনারেটর' : 'Free Instant Meta & Title Synthesizer'}</span>
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {isBn 
                    ? 'আপনার প্রজেক্টের জন্য গুগল সার্টিফাইড হাই-সিটিআর টাইটেল ও মেটা ডেসক্রিপশন তৈরি করুন।' 
                    : 'Generate Google-compliant 60-char titles and 160-char meta descriptions instantly.'}
                </p>
              </div>

              <button
                onClick={() => {
                  sounds.playLuxuryChime();
                  setActiveFreeToolResult({
                    title: 'Generated Meta Tags for ' + project.name,
                    result: `<title>${project.name} – Official Google SEO Cloud Platform</title>\n<meta name="description" content="${project.description}">\n<meta name="robots" content="index, follow">\n<meta name="viewport" content="width=device-width, initial-scale=1">`
                  });
                }}
                className="w-full py-2 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-emerald-400 border border-emerald-500/30 font-bold text-xs transition flex items-center justify-center gap-1"
              >
                <span>{isBn ? 'ফ্রি ব্যবহার করুন →' : 'Use Free Tool →'}</span>
              </button>
            </div>
          )}

          {/* FREE TOOL 2 */}
          {(toolFilter === 'all' || toolFilter === 'free') && (
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 hover:border-emerald-500/40 transition space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    ১০০% FREE TOOL
                  </span>
                  <span className="text-[11px] text-slate-400">Instant Access</span>
                </div>
                <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <Code2 className="w-4 h-4 text-emerald-400" />
                  <span>{isBn ? 'ফ্রি সাইটম্যাপ ও রোবটস বিল্ডার' : 'Free Sitemap.xml & Robots.txt Builder'}</span>
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {isBn 
                    ? 'গুগলবট ক্রলারকে নির্দেশনা দেওয়ার জন্য প্রমিত সাইটম্যাপ ও রোবটস ফাইল স্বয়ংক্রিয়ভাবে তৈরি করুন।' 
                    : 'Create validated sitemap indexes and robots protocol files for immediate GSC submission.'}
                </p>
              </div>

              <button
                onClick={() => {
                  sounds.playLuxuryChime();
                  setActiveFreeToolResult({
                    title: 'Generated Robots.txt for ' + project.name,
                    result: `User-agent: Googlebot\nAllow: /\n\nUser-agent: *\nAllow: /\n\nSitemap: ${project.url || 'https://my-app.cloud'}/sitemap.xml`
                  });
                }}
                className="w-full py-2 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-emerald-400 border border-emerald-500/30 font-bold text-xs transition flex items-center justify-center gap-1"
              >
                <span>{isBn ? 'ফ্রি ব্যবহার করুন →' : 'Use Free Tool →'}</span>
              </button>
            </div>
          )}

          {/* PAID VIP TOOL 1: Video Studio */}
          {(toolFilter === 'all' || toolFilter === 'paid') && (
            <div className="bg-gradient-to-br from-indigo-950/40 via-slate-950 to-slate-950 p-4 rounded-xl border border-indigo-500/40 hover:border-indigo-400 transition space-y-3 flex flex-col justify-between relative shadow-lg">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1">
                    <Star className="w-3 h-3 fill-amber-300" />
                    <span>PRO VIP TOOL</span>
                  </span>
                  <span className="text-xs font-black text-amber-400 font-mono">$49 / mo</span>
                </div>
                <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <Video className="w-4 h-4 text-indigo-400" />
                  <span>{isBn ? 'এআই ভিডিও এডিটর ও রিল ক্রিয়েটর' : 'AI Video Script & 4K Reel Studio'}</span>
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {isBn 
                    ? 'ইউটিউব শর্টস ও টিকটক রিলের ভাইরাল হুক, সিন-বাই-সিন টাইমলাইন ও ভয়েসওভার স্ক্রিপ্ট তৈরি করুন।' 
                    : 'Generate viral 9:16 Shorts/Reels with hook psychology, B-roll directions, and voiceover scripts.'}
                </p>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => {
                    handleSendMessage('Create a 30-second viral YouTube Shorts video script for ' + project.name);
                    sounds.playSoftClick();
                  }}
                  className="flex-1 py-2 px-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold text-[11px] transition text-center"
                >
                  {isBn ? 'ডেমো ট্রায়াল' : 'Try Demo'}
                </button>
                <button
                  onClick={() => {
                    setSelectedPaidTool({
                      id: 'video-pro',
                      title: 'AI Video Script & 4K Reel Studio Pro',
                      price: '$49 / Month (৳৫,৯০০/মাস)',
                      description: 'Unlimited viral video generation, voiceover scripts, and auto-caption timeline downloads.',
                      features: ['Unlimited 9:16 & 16:9 Video Scripts', 'B-Roll & Visual Timeline Prompts', 'Multilingual Voiceover Narration']
                    });
                    setIsCheckoutModalOpen(true);
                    sounds.playSoftClick();
                  }}
                  className="flex-1 py-2 px-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 font-black text-[11px] transition shadow flex items-center justify-center gap-1"
                >
                  <Lock className="w-3 h-3 text-slate-950" />
                  <span>{isBn ? 'কিনুন ($49)' : 'Unlock VIP'}</span>
                </button>
              </div>
            </div>
          )}

          {/* PAID VIP TOOL 2: Website Builder */}
          {(toolFilter === 'all' || toolFilter === 'paid') && (
            <div className="bg-gradient-to-br from-blue-950/40 via-slate-950 to-slate-950 p-4 rounded-xl border border-blue-500/40 hover:border-blue-400 transition space-y-3 flex flex-col justify-between relative shadow-lg">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1">
                    <Star className="w-3 h-3 fill-amber-300" />
                    <span>PRO VIP TOOL</span>
                  </span>
                  <span className="text-xs font-black text-amber-400 font-mono">$79 / mo</span>
                </div>
                <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <Globe className="w-4 h-4 text-blue-400" />
                  <span>{isBn ? 'স্বয়ংক্রিয় এআই ফুল-স্ট্যাক ওয়েবসাইট বিল্ডার' : '1-Click Autonomous Full-Stack Web Builder'}</span>
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {isBn 
                    ? 'প্রম্পট লিখলেই রেসপনসিভ এইচটিএমএল, রিঅ্যাক্ট এবং টেইলউইন্ড সিএসএস কোড সহ লাইভ ল্যান্ডিং পেজ।' 
                    : 'Prompt-to-production responsive web apps with instant live sandbox rendering and clean code export.'}
                </p>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => {
                    handleSendMessage('Build a modern luxury SaaS website hero section with dark theme');
                    sounds.playSoftClick();
                  }}
                  className="flex-1 py-2 px-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold text-[11px] transition text-center"
                >
                  {isBn ? 'ডেমো ট্রায়াল' : 'Try Demo'}
                </button>
                <button
                  onClick={() => {
                    setSelectedPaidTool({
                      id: 'web-pro',
                      title: '1-Click Full-Stack Web App Synthesizer Pro',
                      price: '$79 / Month (৳৯,৫০০/মাস)',
                      description: 'Autonomous full-page generation, Tailwind React export, and Google Cloud instant deploy.',
                      features: ['Unlimited Full-Stack Apps', 'Production React/Tailwind Source Code', 'Googlebot Validated SEO Tags']
                    });
                    setIsCheckoutModalOpen(true);
                    sounds.playSoftClick();
                  }}
                  className="flex-1 py-2 px-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 font-black text-[11px] transition shadow flex items-center justify-center gap-1"
                >
                  <Lock className="w-3 h-3 text-slate-950" />
                  <span>{isBn ? 'কিনুন ($79)' : 'Unlock VIP'}</span>
                </button>
              </div>
            </div>
          )}

          {/* PAID VIP TOOL 3: Backlink Agent */}
          {(toolFilter === 'all' || toolFilter === 'paid') && (
            <div className="bg-gradient-to-br from-emerald-950/40 via-slate-950 to-slate-950 p-4 rounded-xl border border-emerald-500/40 hover:border-emerald-400 transition space-y-3 flex flex-col justify-between relative shadow-lg">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1">
                    <Star className="w-3 h-3 fill-amber-300" />
                    <span>PRO VIP TOOL</span>
                  </span>
                  <span className="text-xs font-black text-amber-400 font-mono">$89 / mo</span>
                </div>
                <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-emerald-400" />
                  <span>{isBn ? 'এআই ব্যাকলিংক হান্টার ও আউটরিচ এজেন্ট' : 'Autonomous AI Backlink Outreach Agent'}</span>
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {isBn 
                    ? 'প্রতিদ্বন্দ্বী সাইটের ব্যাকলিংক ক্রল করে DA ৯০+ প্ল্যাটফর্মে স্বয়ংক্রিয় ডু-ফলো আউটরিচ ইমেইল পাঠায়।' 
                    : 'Reverse-engineer competitor backlink profiles and automatically draft personalized outreach pitches.'}
                </p>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => {
                    onNavigateToTab('analytics');
                    sounds.playSoftClick();
                  }}
                  className="flex-1 py-2 px-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold text-[11px] transition text-center"
                >
                  {isBn ? 'ডেমো দেখুন' : 'Explore Demo'}
                </button>
                <button
                  onClick={() => {
                    setSelectedPaidTool({
                      id: 'backlink-pro',
                      title: 'Autonomous Backlink Outreach Agent Pro',
                      price: '$89 / Month (৳১০,৮০০/মাস)',
                      description: 'Automated high-authority backlink prospecting, radar chart comparisons, and email pitches.',
                      features: ['DA 90+ Inbound Lead Pipeline', 'Automated Cold Outreach Pitch Generator', 'Competitor Radar Spying Suite']
                    });
                    setIsCheckoutModalOpen(true);
                    sounds.playSoftClick();
                  }}
                  className="flex-1 py-2 px-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 font-black text-[11px] transition shadow flex items-center justify-center gap-1"
                >
                  <Lock className="w-3 h-3 text-slate-950" />
                  <span>{isBn ? 'কিনুন ($89)' : 'Unlock VIP'}</span>
                </button>
              </div>
            </div>
          )}

          {/* PAID VIP TOOL 4: Enterprise Blog Writer */}
          {(toolFilter === 'all' || toolFilter === 'paid') && (
            <div className="bg-gradient-to-br from-purple-950/40 via-slate-950 to-slate-950 p-4 rounded-xl border border-purple-500/40 hover:border-purple-400 transition space-y-3 flex flex-col justify-between relative shadow-lg">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1">
                    <Star className="w-3 h-3 fill-amber-300" />
                    <span>PRO VIP TOOL</span>
                  </span>
                  <span className="text-xs font-black text-amber-400 font-mono">$39 / mo</span>
                </div>
                <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-purple-400" />
                  <span>{isBn ? 'ফরচুন ৫০০ এন্টারপ্রাইজ কন্টেন্ট রাইটার' : 'Enterprise 2,500+ Word Blog Synthesizer'}</span>
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {isBn 
                    ? 'গুগলের টপ র‍্যাংক উপযোগী ২৫০০+ শব্দের গভীর আর্টিকেল, H1-H3 হেডিং এবং FAQ স্কিমা সহ।' 
                    : 'Generate complete long-form articles with technical depth, JSON-LD FAQ schemas, and markdown downloads.'}
                </p>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => {
                    onNavigateToTab('enterprise');
                    sounds.playSoftClick();
                  }}
                  className="flex-1 py-2 px-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold text-[11px] transition text-center"
                >
                  {isBn ? 'ডেমো দেখুন' : 'Explore Demo'}
                </button>
                <button
                  onClick={() => {
                    setSelectedPaidTool({
                      id: 'article-pro',
                      title: 'Enterprise Long-Form Blog Synthesizer Pro',
                      price: '$39 / Month (৳৪,৭০০/মাস)',
                      description: 'Comprehensive 2,500+ word technical articles, schema integration, and 1-click Markdown export.',
                      features: ['Unlimited Long-Form Articles', 'Native JSON-LD FAQ Schema Generator', '1-Click Markdown & HTML Download']
                    });
                    setIsCheckoutModalOpen(true);
                    sounds.playSoftClick();
                  }}
                  className="flex-1 py-2 px-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 font-black text-[11px] transition shadow flex items-center justify-center gap-1"
                >
                  <Lock className="w-3 h-3 text-slate-950" />
                  <span>{isBn ? 'কিনুন ($39)' : 'Unlock VIP'}</span>
                </button>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* CHECKOUT MODAL FOR PRO TOOLS */}
      {isCheckoutModalOpen && selectedPaidTool && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl relative font-sans">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-amber-400" />
                <span className="font-bold text-white text-sm">Nexus VIP Commercial Checkout</span>
              </div>
              <button
                onClick={() => {
                  setIsCheckoutModalOpen(false);
                  setPurchasedKey(null);
                }}
                className="text-slate-400 hover:text-white text-xs px-2 py-1 rounded bg-slate-800"
              >
                ✕ Close
              </button>
            </div>

            {!purchasedKey ? (
              <div className="space-y-4">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">Commercial License:</span>
                  <div className="text-base font-bold text-white">{selectedPaidTool.title}</div>
                  <div className="text-xl font-black text-amber-400 font-mono">{selectedPaidTool.price}</div>
                  <p className="text-xs text-slate-400 pt-1 leading-relaxed">{selectedPaidTool.description}</p>
                </div>

                <div className="space-y-1.5 text-xs">
                  <span className="text-slate-400 font-semibold block">Included VIP Capabilities:</span>
                  <ul className="space-y-1 text-slate-300">
                    {selectedPaidTool.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2 text-xs pt-1 border-t border-slate-800">
                  <span className="text-slate-400 font-semibold block">Supported Payment Gateways:</span>
                  <div className="grid grid-cols-4 gap-2 text-center">
                    <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 font-bold text-[11px] text-blue-400">Stripe</div>
                    <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 font-bold text-[11px] text-amber-400">Visa / MC</div>
                    <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 font-bold text-[11px] text-pink-400">bKash</div>
                    <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 font-bold text-[11px] text-orange-400">Nagad</div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setIsPurchasing(true);
                    sounds.playSoftClick();
                    setTimeout(() => {
                      const key = 'NEXUS-VIP-' + Math.random().toString(36).substring(2, 9).toUpperCase() + '-ACTIVE';
                      setPurchasedKey(key);
                      setIsPurchasing(false);
                      sounds.playLuxuryChime();
                      confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
                    }, 800);
                  }}
                  disabled={isPurchasing}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-xl shadow-amber-500/20 active:scale-95 transition disabled:opacity-50"
                >
                  <Unlock className={`w-4 h-4 ${isPurchasing ? 'animate-spin' : ''}`} />
                  <span>{isPurchasing ? 'Authorizing & Activating License...' : `Confirm & Activate VIP Access`}</span>
                </button>
              </div>
            ) : (
              <div className="space-y-4 text-center py-2 animate-fade-in">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-white">License Activated Successfully!</h4>
                  <p className="text-xs text-slate-400">Your commercial VIP access token is ready for production.</p>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-xs text-amber-300 select-all">
                  {purchasedKey}
                </div>

                <button
                  onClick={() => {
                    setIsCheckoutModalOpen(false);
                    setPurchasedKey(null);
                  }}
                  className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs"
                >
                  Close & Access Studio
                </button>
              </div>
            )}

          </div>
        </div>
      )}

      {/* Main Studio Grid: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Interactive AI Conversation & Copilot (7 cols) */}
        <div className="lg:col-span-7 flex flex-col h-[700px] bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl overflow-hidden">
          
          {/* Chat Header */}
          <div className="p-4 border-b border-slate-800 bg-slate-950/70 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-600 flex items-center justify-center text-slate-950 font-black shadow-md shadow-amber-500/20">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>Nexus AI Assistant</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                </h3>
                <span className="text-[10px] text-slate-400">Active & Ready to Code</span>
              </div>
            </div>

            <button
              onClick={() => {
                setMessages([messages[0]]);
                sounds.playSoftClick();
              }}
              className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1 bg-slate-800 hover:bg-slate-700 px-2.5 py-1 rounded-lg border border-slate-700 transition"
              title="Clear conversation"
            >
              <RefreshCw className="w-3 h-3" />
              <span>{isBn ? 'রিসেট' : 'Clear'}</span>
            </button>
          </div>

          {/* Quick Inspiration Prompts */}
          <div className="p-3 bg-slate-950/40 border-b border-slate-800/80 flex items-center gap-2 overflow-x-auto scrollbar-none">
            <span className="text-[11px] text-amber-400 font-bold shrink-0 flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              <span>{isBn ? 'সাজেস্ট করা প্রম্পট:' : 'Inspiration:'}</span>
            </span>
            {AI_PRESETS.map((p) => (
              <button
                key={p.id}
                onClick={() => handleSendMessage(isBn ? p.promptBn : p.promptEn)}
                className="text-xs whitespace-nowrap bg-slate-800/80 hover:bg-amber-500/20 hover:border-amber-500/40 text-slate-300 hover:text-amber-200 border border-slate-700/80 px-2.5 py-1 rounded-lg transition"
              >
                {isBn ? p.titleBn : p.titleEn}
              </button>
            ))}
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => {
              const isUser = msg.role === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-1.5`}
                >
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-500 px-1">
                    <span className="font-semibold text-slate-400">{isUser ? (isBn ? 'আপনি' : 'You') : 'Nexus AI'}</span>
                    <span>·</span>
                    <span>{msg.timestamp}</span>
                  </div>

                  <div
                    className={`max-w-[92%] sm:max-w-[85%] rounded-2xl p-4 text-xs leading-relaxed space-y-3 ${
                      isUser
                        ? 'bg-blue-600 text-white rounded-br-none shadow-md shadow-blue-600/20'
                        : 'bg-slate-950 border border-slate-800 text-slate-200 rounded-bl-none shadow-lg'
                    }`}
                  >
                    <div className="whitespace-pre-line font-sans">
                      {msg.content}
                    </div>

                    {/* If there's an attached code snippet */}
                    {msg.codeSnippet && (
                      <div className="mt-3 pt-3 border-t border-slate-800 space-y-2">
                        <div className="flex items-center justify-between text-[11px] text-slate-400">
                          <span className="font-mono font-bold text-amber-300 flex items-center gap-1">
                            <Code2 className="w-3.5 h-3.5" />
                            <span>Generated Component</span>
                          </span>
                          <button
                            onClick={() => handleCopyCode(msg.codeSnippet!, msg.id)}
                            className="text-slate-300 hover:text-white flex items-center gap-1 bg-slate-900 px-2 py-0.5 rounded border border-slate-700"
                          >
                            {copiedCodeId === msg.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                            <span>{copiedCodeId === msg.id ? (isBn ? 'কপি হয়েছে' : 'Copied') : (isBn ? 'কোড কপি' : 'Copy Code')}</span>
                          </button>
                        </div>
                        <pre className="bg-slate-900 p-2.5 rounded-lg border border-slate-800 font-mono text-[10px] text-slate-300 max-h-40 overflow-x-auto leading-relaxed">
                          {msg.codeSnippet}
                        </pre>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {isProcessing && (
              <div className="flex items-center gap-2 text-xs text-amber-300 animate-pulse bg-slate-950 p-3 rounded-xl border border-slate-800 max-w-xs">
                <Cpu className="w-4 h-4 animate-spin text-amber-400" />
                <span>{isBn ? 'নেক্সাস এআই কোড ও তথ্য প্রস্তুত করছে...' : 'Nexus AI is synthesizing solution...'}</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar */}
          <div className="p-3 border-t border-slate-800 bg-slate-950/80">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputPrompt}
                onChange={(e) => setInputPrompt(e.target.value)}
                placeholder={isBn ? 'এখানে আপনার পছন্দের ওয়েবসাইট বা ফিচারের কথা লিখুন...' : 'Ask Nexus AI to build any section, write SEO copy, or rank tips...'}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-500 font-sans"
              />
              <button
                type="submit"
                disabled={!inputPrompt.trim() || isProcessing}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 disabled:opacity-40 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition shrink-0 shadow shadow-amber-500/20 active:scale-95"
              >
                <span>{isBn ? 'পাঠান' : 'Generate'}</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

        </div>

        {/* Right: Live Visual Sandbox & Component Studio (5 cols) */}
        <div className="lg:col-span-5 flex flex-col h-[700px] bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl overflow-hidden">
          
          {/* Visual Sandbox Top Header */}
          <div className="p-4 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between">
            <div className="space-y-0.5">
              <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
                <Wand2 className="w-4 h-4 text-amber-400" />
                <span>{isBn ? 'লাইভ ভিজ্যুয়াল স্যান্ডবক্স' : 'Live Visual Sandbox'}</span>
              </h3>
              <span className="text-[10px] text-slate-400">
                {isBn ? 'রিয়েলটাইম রেন্ডার আউটপুট' : 'Real-time Component Preview'}
              </span>
            </div>

            {/* Toggle Preview / Code */}
            <div className="bg-slate-800 p-1 rounded-xl flex items-center border border-slate-700">
              <button
                onClick={() => setActiveViewMode('preview')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition ${
                  activeViewMode === 'preview' ? 'bg-amber-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Eye className="w-3 h-3" />
                <span>{isBn ? 'ভিজ্যুয়াল' : 'Preview'}</span>
              </button>
              <button
                onClick={() => setActiveViewMode('code')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition ${
                  activeViewMode === 'code' ? 'bg-amber-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Code2 className="w-3 h-3" />
                <span>{isBn ? 'কোড' : 'Code'}</span>
              </button>
            </div>
          </div>

          {/* Component Template Switcher */}
          <div className="px-4 py-2.5 bg-slate-950 border-b border-slate-800 flex items-center gap-2">
            <button
              onClick={() => setSelectedTemplateKey('hero')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition ${
                selectedTemplateKey === 'hero' 
                  ? 'bg-slate-800 text-amber-300 border border-amber-500/30' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {isBn ? 'লাক্সারি হিরো সেকশন' : 'Obsidian Hero'}
            </button>
            <button
              onClick={() => setSelectedTemplateKey('pricing')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition ${
                selectedTemplateKey === 'pricing' 
                  ? 'bg-slate-800 text-amber-300 border border-amber-500/30' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {isBn ? 'SaaS প্রাইসিং টেবিল' : 'SaaS Pricing'}
            </button>
          </div>

          {/* Main Visual Display Area */}
          <div className="flex-1 p-4 overflow-y-auto bg-slate-950/60">
            {activeViewMode === 'preview' ? (
              <div className="space-y-4">
                <div 
                  className="rounded-xl overflow-hidden shadow-2xl transition duration-300"
                  dangerouslySetInnerHTML={{ __html: currentActiveTemplate.html }}
                />

                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
                  <span className="font-bold text-slate-200 block">
                    {isBn ? currentActiveTemplate.explanationBn : currentActiveTemplate.explanationEn}
                  </span>
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <button
                      onClick={() => handleCopyCode(currentActiveTemplate.code, 'templateCode')}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold transition flex items-center gap-1.5"
                    >
                      {copiedCodeId === 'templateCode' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedCodeId === 'templateCode' ? (isBn ? 'কপি হয়েছে' : 'Copied') : (isBn ? 'কোড কপি করুন' : 'Copy Code')}</span>
                    </button>
                    <button
                      onClick={() => downloadFile(`${selectedTemplateKey}-section.html`, currentActiveTemplate.code, 'text/html')}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold transition flex items-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>{isBn ? 'HTML ফাইল ডাউনলোড' : 'Download HTML'}</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-slate-400 text-[11px]">Tailwind & HTML Architecture</span>
                  <button
                    onClick={() => handleCopyCode(currentActiveTemplate.code, 'rawCode')}
                    className="text-xs text-amber-300 hover:underline font-semibold flex items-center gap-1"
                  >
                    {copiedCodeId === 'rawCode' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCodeId === 'rawCode' ? (isBn ? 'কপি হয়েছে' : 'Copied') : (isBn ? 'সব কপি করুন' : 'Copy Raw Code')}</span>
                  </button>
                </div>
                <pre className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-[11px] font-mono text-slate-300 overflow-x-auto max-h-[500px] leading-relaxed select-all">
                  {currentActiveTemplate.code}
                </pre>
              </div>
            )}
          </div>

          {/* Action Footer */}
          <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs">
            <span className="text-[11px] text-slate-400">
              ⚡ {isBn ? 'এক ক্লিকে আপনার বর্তমান প্রজেক্টে রূপ দিন' : 'Apply AI design to current website project'}
            </span>
            <button
              onClick={handleApplyHeroToProject}
              className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 font-bold transition shadow shadow-amber-500/20 active:scale-95"
            >
              {isBn ? 'প্রজেক্টে প্রয়োগ করুন' : 'Apply to Project'}
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
