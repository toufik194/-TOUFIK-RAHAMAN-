import React, { useState } from 'react';
import { 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  RefreshCw, 
  ExternalLink, 
  Sliders, 
  Sparkles, 
  ShieldCheck, 
  HelpCircle,
  ArrowRight
} from 'lucide-react';
import { WebsiteProject, Language, AuditResult, AuditCheckItem } from '../types';
import { runSeoAudit } from '../utils/seoGenerators';
import { GoogleErrorFixerStudio } from './GoogleErrorFixerStudio';

interface AuditTabProps {
  project: WebsiteProject;
  language: Language;
  onUpdateProject: (updated: Partial<WebsiteProject>) => void;
  onNavigateToTab: (tab: any) => void;
}

export const AuditTab: React.FC<AuditTabProps> = ({
  project,
  language,
  onUpdateProject,
  onNavigateToTab,
}) => {
  const isBn = language === 'bn';
  const [filter, setFilter] = useState<'all' | 'passed' | 'warning' | 'failed'>('all');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'indexing' | 'meta' | 'technical' | 'social'>('all');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const auditResult: AuditResult = runSeoAudit(project);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 400);
  };

  const filteredChecks = auditResult.checks.filter((check) => {
    if (filter !== 'all' && check.status !== filter) return false;
    if (categoryFilter !== 'all' && check.category !== categoryFilter) return false;
    return true;
  });

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-emerald-400 stroke-emerald-500';
    if (score >= 70) return 'text-amber-400 stroke-amber-500';
    return 'text-rose-400 stroke-rose-500';
  };

  const getScoreBg = (score: number) => {
    if (score >= 90) return 'bg-emerald-500/10 border-emerald-500/30';
    if (score >= 70) return 'bg-amber-500/10 border-amber-500/30';
    return 'bg-rose-500/10 border-rose-500/30';
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      
      {/* Google 404 & Search Indexing Diagnostic & Fixer Studio */}
      <GoogleErrorFixerStudio 
        language={language}
        project={project}
        onRequestIndexing={() => onNavigateToTab('deploy')}
      />

      {/* Top Audit Summary Card */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 shadow-xl">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          
          {/* Left: Project Info & URL */}
          <div className="space-y-2 text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{isBn ? 'গুগল ইনডেক্সিং অডিট' : 'Google Crawlability Audit'}</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-white">
              {project.name}
            </h2>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 text-xs font-mono text-slate-400">
              <a 
                href={project.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline flex items-center gap-1"
              >
                <span>{project.url}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <span>•</span>
              <span>{project.sitemapUrls.length} {isBn ? 'টি পেজ ইনডেক্সযোগ্য' : 'URLs in sitemap'}</span>
            </div>
          </div>

          {/* Center: Score Gauge */}
          <div className="flex items-center gap-6">
            <div className="relative flex items-center justify-center">
              <svg className="w-28 h-28 transform -rotate-90">
                <circle
                  cx="56"
                  cy="56"
                  r="46"
                  className="stroke-slate-800 fill-none"
                  strokeWidth="8"
                />
                <circle
                  cx="56"
                  cy="56"
                  r="46"
                  className={`fill-none transition-all duration-1000 ${getScoreColor(auditResult.overallScore)}`}
                  strokeWidth="8"
                  strokeDasharray="289"
                  strokeDashoffset={289 - (289 * auditResult.overallScore) / 100}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-3xl font-black text-white tracking-tight">
                  {auditResult.overallScore}
                </span>
                <span className="text-[10px] uppercase font-bold text-slate-400">
                  / 100
                </span>
              </div>
            </div>

            <div className="space-y-1.5 text-xs">
              <div className={`px-2.5 py-1 rounded-md font-bold text-center border ${getScoreBg(auditResult.overallScore)}`}>
                {auditResult.overallScore >= 90 ? (
                  <span className="text-emerald-400">{isBn ? 'গুগলের জন্য সম্পূর্ণ প্রস্তুত' : 'Google Ready'}</span>
                ) : auditResult.overallScore >= 70 ? (
                  <span className="text-amber-400">{isBn ? 'মাঝারি স্কোর – কিছু সংশোধন করুন' : 'Good – Minor Fixes'}</span>
                ) : (
                  <span className="text-rose-400">{isBn ? 'উন্নতি প্রয়োজন' : 'Needs Optimization'}</span>
                )}
              </div>
              <div className="text-[11px] text-slate-400">
                {isBn 
                  ? 'গুগল সার্চে উচ্চ র্যাংকিংয়ের জন্য ৮০+ স্কোর সুপারিশ করা হয়।' 
                  : '80+ score recommended for fast Google indexing.'}
              </div>
            </div>
          </div>

          {/* Right: Quick Counts & Refresh */}
          <div className="flex items-center gap-3">
            <div className="flex gap-2">
              <div className="bg-emerald-950/40 border border-emerald-800/60 rounded-xl px-3 py-2 text-center min-w-[65px]">
                <div className="text-lg font-bold text-emerald-400">{auditResult.passedCount}</div>
                <div className="text-[10px] text-slate-400">{isBn ? 'সফল' : 'Passed'}</div>
              </div>
              <div className="bg-amber-950/40 border border-amber-800/60 rounded-xl px-3 py-2 text-center min-w-[65px]">
                <div className="text-lg font-bold text-amber-400">{auditResult.warningCount}</div>
                <div className="text-[10px] text-slate-400">{isBn ? 'সতর্কতা' : 'Warnings'}</div>
              </div>
              <div className="bg-rose-950/40 border border-rose-800/60 rounded-xl px-3 py-2 text-center min-w-[65px]">
                <div className="text-lg font-bold text-rose-400">{auditResult.failedCount}</div>
                <div className="text-[10px] text-slate-400">{isBn ? 'ব্যর্থ' : 'Failed'}</div>
              </div>
            </div>

            <button
              onClick={handleRefresh}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition"
              title="Re-run audit"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-blue-400' : ''}`} />
            </button>
          </div>

        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
        
        {/* Status Filter */}
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-slate-400 font-medium mr-1">
            {isBn ? 'স্ট্যাটাস:' : 'Status:'}
          </span>
          <button
            onClick={() => setFilter('all')}
            className={`px-2.5 py-1 text-xs rounded-lg font-medium transition ${
              filter === 'all' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {isBn ? 'সবগুলো' : 'All'} ({auditResult.checks.length})
          </button>
          <button
            onClick={() => setFilter('passed')}
            className={`px-2.5 py-1 text-xs rounded-lg font-medium transition ${
              filter === 'passed' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {isBn ? 'সফল' : 'Passed'} ({auditResult.passedCount})
          </button>
          <button
            onClick={() => setFilter('warning')}
            className={`px-2.5 py-1 text-xs rounded-lg font-medium transition ${
              filter === 'warning' ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {isBn ? 'সতর্কতা' : 'Warning'} ({auditResult.warningCount})
          </button>
          <button
            onClick={() => setFilter('failed')}
            className={`px-2.5 py-1 text-xs rounded-lg font-medium transition ${
              filter === 'failed' ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {isBn ? 'ব্যর্থ' : 'Failed'} ({auditResult.failedCount})
          </button>
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-slate-400 font-medium mr-1 hidden sm:inline">
            {isBn ? 'ক্যাটাগরি:' : 'Category:'}
          </span>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value as any)}
            className="bg-slate-800 text-xs text-slate-200 border border-slate-700 rounded-lg px-2.5 py-1 focus:outline-none cursor-pointer"
          >
            <option value="all">{isBn ? 'সব ক্যাটাগরি' : 'All Categories'}</option>
            <option value="indexing">{isBn ? 'ইনডেক্সিং ও ক্রলিং' : 'Indexing & Crawling'}</option>
            <option value="meta">{isBn ? 'মেটা ও টাইটেল' : 'Meta & Content'}</option>
            <option value="technical">{isBn ? 'টেকনিক্যাল ও সিকিউরিটি' : 'Technical & Security'}</option>
            <option value="social">{isBn ? 'সোশ্যাল কার্ড' : 'Social Cards'}</option>
          </select>
        </div>

      </div>

      {/* Checklist Items */}
      <div className="space-y-3">
        {filteredChecks.map((check) => {
          return (
            <div
              key={check.id}
              className={`p-4 rounded-xl border transition-all ${
                check.status === 'passed'
                  ? 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700'
                  : check.status === 'warning'
                  ? 'bg-amber-950/20 border-amber-800/40 hover:border-amber-700/60'
                  : 'bg-rose-950/20 border-rose-800/40 hover:border-rose-700/60'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 shrink-0">
                    {check.status === 'passed' ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    ) : check.status === 'warning' ? (
                      <AlertTriangle className="w-5 h-5 text-amber-400" />
                    ) : (
                      <XCircle className="w-5 h-5 text-rose-400" />
                    )}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-white">
                        {isBn ? check.titleBn : check.title}
                      </h4>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded uppercase tracking-wider bg-slate-800 text-slate-400 border border-slate-700">
                        {check.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300">
                      {isBn ? check.descriptionBn : check.description}
                    </p>
                    <div className="text-xs text-slate-400 flex items-start gap-1 pt-0.5">
                      <span className="text-blue-400 font-bold shrink-0">
                        {isBn ? 'করণীয়:' : 'Recommendation:'}
                      </span>
                      <span>{isBn ? check.recommendationBn : check.recommendation}</span>
                    </div>
                  </div>
                </div>

                {/* Fix / Action Button */}
                <div className="sm:self-center shrink-0">
                  {check.id === 'gsc_verification' && (
                    <button
                      onClick={() => onNavigateToTab('roadmap')}
                      className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-blue-600/80 hover:bg-blue-600 text-white transition flex items-center gap-1"
                    >
                      <span>{isBn ? 'কোড বসান' : 'Add Code'}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                  {check.id === 'title_length' && (
                    <button
                      onClick={() => onNavigateToTab('serp')}
                      className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
                    >
                      {isBn ? 'টাইটেল এডিট' : 'Edit Title'}
                    </button>
                  )}
                  {check.id === 'desc_length' && (
                    <button
                      onClick={() => onNavigateToTab('serp')}
                      className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
                    >
                      {isBn ? 'ডেসক্রিপশন এডিট' : 'Edit Meta'}
                    </button>
                  )}
                  {check.id === 'sitemap' && (
                    <button
                      onClick={() => onNavigateToTab('sitemap')}
                      className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
                    >
                      {isBn ? 'সাইটম্যাপ দেখুন' : 'View Sitemap'}
                    </button>
                  )}
                  {check.id === 'robots' && (
                    <button
                      onClick={() => onNavigateToTab('sitemap')}
                      className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
                    >
                      {isBn ? 'রোবটস ফাইল' : 'Robots.txt'}
                    </button>
                  )}
                  {check.id === 'schema' && (
                    <button
                      onClick={() => onNavigateToTab('schema')}
                      className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
                    >
                      {isBn ? 'স্কিমা কনফিগ' : 'Schema Tool'}
                    </button>
                  )}
                </div>

              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
