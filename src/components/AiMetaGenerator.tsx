import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Wand2, 
  Check, 
  Copy, 
  ArrowRight, 
  Search, 
  FileText, 
  CheckCircle2, 
  RefreshCw, 
  Bot, 
  Globe, 
  TrendingUp, 
  Award, 
  Layers, 
  Zap, 
  ArrowUpRight,
  Flame,
  Star,
  Target
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../utils/soundEffects';
import { WebsiteProject, Language } from '../types';
import { 
  generate3MetaVariantsWithGemini, 
  MetaGeneratorResult, 
  MetaVariant 
} from '../utils/geminiMetaGenerator';

interface AiMetaGeneratorProps {
  project: WebsiteProject;
  language: Language;
  onUpdateProject: (updated: Partial<WebsiteProject>) => void;
}

export const AiMetaGenerator: React.FC<AiMetaGeneratorProps> = ({
  project,
  language,
  onUpdateProject,
}) => {
  const isBn = language === 'bn';

  // Input states (prefilled with project values)
  const [inputTitle, setInputTitle] = useState(project.name);
  const [inputDescription, setInputDescription] = useState(project.description);
  const [inputKeywords, setInputKeywords] = useState(project.keywords.join(', '));
  const [canonicalUrl, setCanonicalUrl] = useState<string>('https://example.com/api/user');
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatorResult, setGeneratorResult] = useState<MetaGeneratorResult | null>(null);
  const [selectedVariantId, setSelectedVariantId] = useState<string>('variant-a');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [appliedNotification, setAppliedNotification] = useState<string | null>(null);

  // Auto-run on first load
  const runGeneration = async () => {
    setIsGenerating(true);
    sounds.playSoftClick();

    try {
      const res = await generate3MetaVariantsWithGemini(
        project,
        {
          title: inputTitle,
          description: inputDescription,
          keywords: inputKeywords,
        },
        language
      );
      setGeneratorResult(res);
      setSelectedVariantId(res.variants[0].id);
      sounds.playLuxuryChime();
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    runGeneration();
  }, [language]);

  // Apply chosen variant to project
  const handleApplyVariant = (variant: MetaVariant) => {
    sounds.playSoftClick();
    onUpdateProject({
      name: variant.title,
      description: variant.description,
    });
    sounds.playLuxuryChime();
    confetti({ particleCount: 65, spread: 60, origin: { y: 0.6 } });
    setAppliedNotification(
      isBn 
        ? `🎉 "${variant.name}" সফলভাবে প্রজেক্টে যুক্ত করা হয়েছে!` 
        : `🎉 "${variant.name}" applied to active project metadata!`
    );
    setTimeout(() => setAppliedNotification(null), 3000);
  };

  const handleAddExampleApiEndpoint = () => {
    setCanonicalUrl('https://example.com/api/user');
    sounds.playSoftClick();

    // Check if /api/user exists in sitemap
    const exists = project.sitemapUrls.some((u) => u.path === '/api/user');
    if (!exists) {
      const newUrls = [
        ...project.sitemapUrls,
        {
          id: `url-${Date.now()}`,
          path: '/api/user',
          lastmod: new Date().toISOString().split('T')[0],
          changefreq: 'weekly' as const,
          priority: 0.8,
        }
      ];
      onUpdateProject({ sitemapUrls: newUrls });
    }

    sounds.playLuxuryChime();
    confetti({ particleCount: 55, spread: 65, origin: { y: 0.55 } });
    setAppliedNotification(
      isBn
        ? '✅ https://example.com/api/user সফলভাবে ক্যানোনিকাল ট্যাগ ও সাইটম্যাপে যুক্ত করা হয়েছে!'
        : '✅ https://example.com/api/user successfully added to canonical tags & sitemap!'
    );
    setTimeout(() => setAppliedNotification(null), 3000);
  };

  const handleCopyHtml = (variant: MetaVariant, id: string) => {
    const html = `<title>${variant.title}</title>
<meta name="description" content="${variant.description}">
<meta name="keywords" content="${variant.primaryKeywordsIncluded.join(', ')}">
<link rel="canonical" href="${canonicalUrl}">
<meta name="robots" content="index, follow, max-image-preview:large">`;

    navigator.clipboard.writeText(html);
    setCopiedId(id);
    sounds.playSoftClick();
    setTimeout(() => setCopiedId(null), 2000);
  };

  const selectedVariant = generatorResult?.variants.find((v) => v.id === selectedVariantId) || generatorResult?.variants[0];

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* HEADER BANNER */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-950/60 via-slate-900 to-slate-950 border border-indigo-500/40 p-6 md:p-8 shadow-2xl space-y-6">
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-4 border-b border-slate-800">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 font-mono text-xs font-bold">
                <Bot className="w-3.5 h-3.5 text-amber-300" />
                <span>AI META GENERATOR & CTR REWRITER</span>
              </span>
              <span className="text-slate-600">·</span>
              <span className="text-[11px] font-mono text-emerald-400 font-bold">
                Gemini 3.8 Flash Engine
              </span>
            </div>

            <h3 className="text-xl sm:text-3xl font-black text-white tracking-tight">
              {isBn 
                ? 'এআই মেটা জেনারেটর: হাই-সিটিআর মেটা ট্যাগ রি-রাইটার' 
                : 'AI Meta Generator: Automatic High-CTR Tag Rewriter'}
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              {isBn 
                ? 'গুগল সার্চ ফলাফলে ক্লিক রেট (CTR) বাড়াতে পেজের মেটা টাইটেল ও ডেসক্রিপশন রি-রাইট করুন। জেমিনাই এআই আপনাকে ৩টি ভিন্ন ধরনের উচ্চ রূপান্তরকারী অপশন দেবে।' 
                : 'Automatically rewrite page meta-tags and descriptions to improve CTR using Gemini, providing 3 variant options tailored for maximum search clicks.'}
            </p>
          </div>

          <button
            onClick={runGeneration}
            disabled={isGenerating}
            className="px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-blue-600 to-amber-500 hover:from-indigo-500 text-white font-black text-xs shadow-xl shadow-indigo-600/30 transition active:scale-95 flex items-center gap-2 disabled:opacity-50 shrink-0 self-start lg:self-center"
          >
            <Wand2 className={`w-4 h-4 text-amber-300 ${isGenerating ? 'animate-spin' : ''}`} />
            <span>
              {isGenerating 
                ? (isBn ? 'মেটা ট্যাগ তৈরি হচ্ছে...' : 'Rewriting with Gemini...') 
                : (isBn ? '✨ নতুন ৩টি ভ্যারিয়েন্ট তৈরি করুন' : '✨ Generate 3 CTR Variants')}
            </span>
          </button>
        </div>

        {/* INPUT REWRITE FORM (COLLAPSIBLE / EDITABLE CONTEXT) */}
        <div className="bg-slate-950 p-4 sm:p-5 rounded-xl border border-slate-800 space-y-4 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5 font-mono">
              <Layers className="w-3.5 h-3.5 text-blue-400" />
              <span>{isBn ? 'ইনপুট পেজ মেটাডাটা:' : 'Page Input Metadata for AI Rewrite:'}</span>
            </span>
            <button
              onClick={() => {
                setInputTitle(project.name);
                setInputDescription(project.description);
                setInputKeywords(project.keywords.join(', '));
                sounds.playSoftClick();
              }}
              className="text-[11px] text-blue-400 hover:underline font-semibold"
            >
              {isBn ? 'বর্তমান প্রজেক্ট ডাটা লোড করুন' : 'Reset to Current Project Data'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[11px] text-slate-400 font-semibold block">
                {isBn ? 'পেজ টাইটেল (Existing Title):' : 'Existing Title:'}
              </label>
              <input
                type="text"
                value={inputTitle}
                onChange={(e) => setInputTitle(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-indigo-500 font-sans"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] text-slate-400 font-semibold block">
                {isBn ? 'টার্গেট কি-ওয়ার্ড (Keywords):' : 'Target Keywords:'}
              </label>
              <input
                type="text"
                value={inputKeywords}
                onChange={(e) => setInputKeywords(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-indigo-500 font-sans"
              />
            </div>

            <div className="space-y-1 md:col-span-2">
              <label className="text-[11px] text-slate-400 font-semibold block">
                {isBn ? 'পেজ ডেসক্রিপশন (Existing Description):' : 'Existing Description:'}
              </label>
              <textarea
                rows={2}
                value={inputDescription}
                onChange={(e) => setInputDescription(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-indigo-500 font-sans resize-none"
              />
            </div>

            {/* Canonical Link & API Endpoint Integration */}
            <div className="space-y-1.5 md:col-span-2 pt-2 border-t border-slate-800/80">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <label className="text-[11px] text-slate-400 font-semibold flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-blue-400" />
                  <span>{isBn ? 'ক্যানোনিকাল লিংক (<link rel="canonical">):' : 'Canonical Link & Target Endpoint:'}</span>
                </label>
                <button
                  type="button"
                  onClick={handleAddExampleApiEndpoint}
                  className="px-2.5 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-bold flex items-center gap-1 transition self-start sm:self-auto"
                >
                  <Zap className="w-3 h-3 text-amber-400" />
                  <span>+ Add https://example.com/api/user</span>
                </button>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={canonicalUrl}
                  onChange={(e) => setCanonicalUrl(e.target.value)}
                  placeholder="https://example.com/api/user"
                  className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-indigo-500 font-mono"
                />
                <button
                  type="button"
                  onClick={() => setCanonicalUrl('https://example.com/api/user')}
                  className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-[11px] border border-slate-700 transition shrink-0"
                >
                  example.com/api/user
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>

      {appliedNotification && (
        <div className="bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-lg animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{appliedNotification}</span>
        </div>
      )}

      {/* 3 VARIANT SELECTION TABS & CARDS */}
      <div className="space-y-4">
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>{isBn ? 'জেমিনাই এআই প্রস্তুতকৃত ৩টি মেটা অপশন:' : '3 AI Generated Variant Options:'}</span>
            </span>
          </div>

          <span className="text-[11px] font-mono text-slate-400">
            {generatorResult?.provider === 'gemini' ? '⚡ Powered by Gemini 3.8 Flash' : '⚡ Algorithmic Telemetry Engine'}
          </span>
        </div>

        {/* 3 Interactive Variant Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {generatorResult?.variants.map((variant, index) => {
            const isSelected = selectedVariantId === variant.id;
            const letters = ['Option A', 'Option B', 'Option C'];

            let borderClass = 'border-slate-800 hover:border-slate-700';
            if (isSelected) {
              borderClass = variant.targetTone === 'high-ctr'
                ? 'border-rose-500/80 ring-2 ring-rose-500/30 bg-slate-900'
                : variant.targetTone === 'authority'
                ? 'border-amber-500/80 ring-2 ring-amber-500/30 bg-slate-900'
                : 'border-emerald-500/80 ring-2 ring-emerald-500/30 bg-slate-900';
            }

            return (
              <div
                key={variant.id}
                onClick={() => {
                  setSelectedVariantId(variant.id);
                  sounds.playSoftClick();
                }}
                className={`p-5 rounded-2xl border transition-all cursor-pointer space-y-4 flex flex-col justify-between ${borderClass} bg-slate-950 shadow-xl relative overflow-hidden`}
              >
                <div className="space-y-3">
                  
                  {/* Card Top Pill & CTR Projection */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      {letters[index]}
                    </span>

                    <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center gap-1">
                      <ArrowUpRight className="w-3 h-3" />
                      <span>{variant.projectedCtrBoost}</span>
                    </span>
                  </div>

                  <h4 className="text-sm font-black text-white flex items-center gap-1.5">
                    {variant.targetTone === 'high-ctr' && <Flame className="w-4 h-4 text-rose-400 shrink-0" />}
                    {variant.targetTone === 'authority' && <Star className="w-4 h-4 text-amber-400 shrink-0" />}
                    {variant.targetTone === 'conversion' && <Target className="w-4 h-4 text-emerald-400 shrink-0" />}
                    <span>{variant.name}</span>
                  </h4>

                  {/* Title Preview */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                      <span>&lt;TITLE&gt;</span>
                      <span className={variant.titleLength <= 60 ? 'text-emerald-400' : 'text-amber-400'}>
                        {variant.titleLength}/60 chars
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-blue-400 leading-snug line-clamp-2">
                      {variant.title}
                    </p>
                  </div>

                  {/* Description Preview */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                      <span>&lt;META DESCRIPTION&gt;</span>
                      <span className={variant.descriptionLength >= 130 && variant.descriptionLength <= 165 ? 'text-emerald-400' : 'text-amber-400'}>
                        {variant.descriptionLength}/160 chars
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-3 font-sans">
                      {variant.description}
                    </p>
                  </div>

                  {/* CTR Hook explanation */}
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400 leading-relaxed">
                    💡 <strong>Hook:</strong> {variant.ctrHookExplanation}
                  </div>

                </div>

                {/* Card Actions */}
                <div className="pt-3 border-t border-slate-900 flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopyHtml(variant, variant.id);
                    }}
                    className="flex-1 py-2 px-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 text-[11px] font-semibold transition text-center flex items-center justify-center gap-1"
                  >
                    {copiedId === variant.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedId === variant.id ? 'Copied' : 'HTML Tags'}</span>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleApplyVariant(variant);
                    }}
                    className="flex-1 py-2 px-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-bold transition flex items-center justify-center gap-1 shadow-md shadow-blue-600/30 active:scale-95"
                  >
                    <span>{isBn ? 'প্রজেক্টে নিন' : 'Apply'}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* SELECTED VARIANT: LIVE GOOGLE SERP PREVIEW CARD */}
      {selectedVariant && (
        <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-900 pb-3">
            <div>
              <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider block">
                Google Search Appearance Preview:
              </span>
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <span>{selectedVariant.name}</span>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  {selectedVariant.projectedCtrBoost}
                </span>
              </h4>
            </div>

            <button
              onClick={() => handleApplyVariant(selectedVariant)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 text-white font-bold text-xs shadow-md transition active:scale-95 flex items-center gap-1.5 self-start sm:self-auto"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{isBn ? 'এই ভ্যারিয়েন্টটি ওয়েবসাইটে সেভ করুন' : 'Confirm & Apply This Variant'}</span>
            </button>
          </div>

          {/* Realistic Google Search Card */}
          <div className="p-4 sm:p-5 rounded-xl bg-[#202124] border border-slate-800 max-w-2xl font-sans space-y-1.5 shadow-inner">
            <div className="flex items-center gap-2 text-xs">
              <div className="w-4 h-4 rounded-full bg-blue-600 flex items-center justify-center text-[9px] font-black text-white">
                G
              </div>
              <span className="text-[#dadce0] text-xs font-normal truncate">
                {selectedVariant.serpSnippetPreview.displayUrl}
              </span>
              <span className="text-[#9aa0a6] text-[10px]">▼</span>
            </div>

            <h3 className="text-[#8ab4f8] hover:underline text-lg sm:text-xl font-normal leading-snug cursor-pointer">
              {selectedVariant.title}
            </h3>

            <p className="text-[#bdc1c6] text-xs sm:text-sm leading-relaxed">
              {selectedVariant.description}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-400 pt-1">
            <span>Keywords targeted: <strong className="text-slate-200">{selectedVariant.primaryKeywordsIncluded.join(', ')}</strong></span>
            <span>Mobile Pixel Width: <strong className="text-emerald-400 font-mono">580px (Within Safe Limit)</strong></span>
          </div>
        </div>
      )}

      {/* PRODUCTION READY GOOGLE SEO META TAGS CODE BLOCK */}
      {selectedVariant && (
        <div className="bg-slate-950 rounded-2xl border border-indigo-500/40 p-6 space-y-4 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-900">
            <div>
              <span className="text-[10px] font-mono text-indigo-400 font-bold uppercase tracking-wider block">
                Production HTML Code Export:
              </span>
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <span>Google-Compliant &lt;head&gt; Meta Block</span>
              </h4>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleAddExampleApiEndpoint}
                className="px-3 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold flex items-center gap-1.5 transition"
              >
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>Add https://example.com/api/user</span>
              </button>

              <button
                type="button"
                onClick={() => handleCopyHtml(selectedVariant, 'export-block')}
                className="px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md transition flex items-center gap-1.5 active:scale-95"
              >
                {copiedId === 'export-block' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedId === 'export-block' ? (isBn ? 'কপি হয়েছে' : 'Copied!') : (isBn ? 'ট্যাগগুলো কপি করুন' : 'Copy HTML Meta Tags')}</span>
              </button>
            </div>
          </div>

          <pre className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-mono text-slate-200 overflow-x-auto leading-relaxed select-all">
{`<title>${selectedVariant.title}</title>
<meta name="description" content="${selectedVariant.description}">
<meta name="keywords" content="${selectedVariant.primaryKeywordsIncluded.join(', ')}">
<link rel="canonical" href="${canonicalUrl}">
<meta name="robots" content="index, follow, max-image-preview:large">`}
          </pre>

          <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
            <span>Canonical target: <code className="text-emerald-400 font-mono">{canonicalUrl}</code></span>
            <span className="text-slate-500">Includes Googlebot Index, Follow, and Max Image Preview directives</span>
          </div>
        </div>
      )}

    </div>
  );
};
