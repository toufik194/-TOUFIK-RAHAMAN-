import React, { useState, useEffect } from 'react';
import { 
  Rocket, 
  ShieldCheck, 
  Search, 
  FileCode, 
  Code2, 
  Sparkles, 
  Cloud,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Zap,
  Bot,
  TrendingUp,
  Building2,
  DollarSign
} from 'lucide-react';
import { WebsiteProject, TabType, Language } from './types';
import { initialProjects } from './data/defaultData';
import { translations } from './utils/translations';
import { Header } from './components/Header';
import { NexusAiStudio } from './components/NexusAiStudio';
import { EnterpriseSuite } from './components/EnterpriseSuite';
import { MonetizationTab } from './components/MonetizationTab';
import { AnalyticsTab } from './components/AnalyticsTab';
import { RoadmapTab } from './components/RoadmapTab';
import { AuditTab } from './components/AuditTab';
import { SerpPreviewTab } from './components/SerpPreviewTab';
import { SitemapRobotsTab } from './components/SitemapRobotsTab';
import { SchemaTab } from './components/SchemaTab';
import { AiSeoTab } from './components/AiSeoTab';
import { DeployTab } from './components/DeployTab';
import { ExportModal } from './components/ExportModal';
import { NewProjectModal } from './components/NewProjectModal';
import { LivePublishModal } from './components/LivePublishModal';
import { RequestIndexingModal } from './components/RequestIndexingModal';
import { ParticleBackground } from './components/ParticleBackground';
import { OmniSearchBoard } from './components/OmniSearchBoard';

export default function App() {
  // English ('en') as primary default enterprise language
  const [language, setLanguage] = useState<Language>('en');
  const [projects, setProjects] = useState<WebsiteProject[]>(() => {
    const saved = localStorage.getItem('gsp_projects');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return initialProjects;
  });

  const [activeProjectId, setActiveProjectId] = useState<string>(projects[0]?.id || 'my-cloud-app');
  const [currentTab, setCurrentTab] = useState<TabType>('enterprise');
  
  // Modals
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [newProjectModalOpen, setNewProjectModalOpen] = useState(false);
  const [livePublishModalOpen, setLivePublishModalOpen] = useState(false);
  const [requestIndexingModalOpen, setRequestIndexingModalOpen] = useState(false);
  const [bannerCopied, setBannerCopied] = useState(false);

  const livePublicUrl = "https://ais-pre-khhddulrf4oxahl7t6mn2d-458391942755.asia-southeast1.run.app";

  const handleCopyBannerLink = () => {
    navigator.clipboard.writeText(livePublicUrl);
    setBannerCopied(true);
    setTimeout(() => setBannerCopied(false), 2000);
  };

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('gsp_projects', JSON.stringify(projects));
  }, [projects]);

  const activeProject = projects.find((p) => p.id === activeProjectId) || projects[0];

  const handleUpdateProject = (updated: Partial<WebsiteProject>) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === activeProject.id ? { ...p, ...updated } : p))
    );
  };

  const handleAddProject = (newProj: WebsiteProject) => {
    setProjects((prev) => [newProj, ...prev]);
    setActiveProjectId(newProj.id);
    setCurrentTab('roadmap');
  };

  const t = translations[language];

  const tabs: { id: TabType; label: string; icon: React.ComponentType<{ className?: string }>; badge?: string }[] = [
    { id: 'enterprise', label: t.navEnterprise, icon: Building2, badge: 'CORP' },
    { id: 'monetization', label: t.navMonetization, icon: DollarSign, badge: 'REVENUE' },
    { id: 'nexus-ai', label: t.navNexusAi, icon: Bot, badge: 'ACTIVE AI' },
    { id: 'analytics', label: t.navAnalytics, icon: TrendingUp },
    { id: 'roadmap', label: t.navRoadmap, icon: Rocket },
    { id: 'audit', label: t.navAudit, icon: ShieldCheck },
    { id: 'serp', label: t.navSerp, icon: Search },
    { id: 'sitemap', label: t.navSitemap, icon: FileCode },
    { id: 'schema', label: t.navSchema, icon: Code2 },
    { id: 'ai-seo', label: t.navAiSeo, icon: Sparkles },
    { id: 'deploy', label: t.navDeploy, icon: Cloud },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white relative">
      {/* Subtle Performance-Optimized Animated Particle Canvas */}
      <ParticleBackground intensity="subtle" />
      
      {/* Main Header */}
      <Header
        projects={projects}
        activeProject={activeProject}
        onSelectProject={setActiveProjectId}
        onOpenNewProject={() => setNewProjectModalOpen(true)}
        onOpenExportModal={() => setExportModalOpen(true)}
        onOpenLivePublishModal={() => setLivePublishModalOpen(true)}
        onOpenRequestIndexingModal={() => setRequestIndexingModalOpen(true)}
        language={language}
        onToggleLanguage={() => setLanguage((prev) => (prev === 'bn' ? 'en' : 'bn'))}
      />

      {/* Navigation Sub-header / Tabs */}
      <div className="border-b border-slate-800 bg-slate-900/60 sticky top-[69px] z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-1 sm:space-x-2 overflow-x-auto py-2.5 scrollbar-none">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = currentTab === tab.id;
              const isNexus = tab.id === 'nexus-ai';

              let style = 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/70';
              if (isNexus) {
                style = isActive 
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black shadow-lg shadow-amber-500/25 ring-1 ring-amber-400/50'
                  : 'text-amber-300/90 hover:text-amber-200 hover:bg-amber-500/10 border border-amber-500/30 font-bold';
              } else if (isActive) {
                style = 'bg-blue-600 text-white shadow-lg shadow-blue-600/30';
              }

              return (
                <button
                  key={tab.id}
                  onClick={() => setCurrentTab(tab.id)}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs whitespace-nowrap transition-all ${style}`}
                >
                  <Icon className={`w-4 h-4 ${isActive && isNexus ? 'text-slate-950 fill-slate-950' : isActive ? 'text-white' : isNexus ? 'text-amber-400' : 'text-slate-400'}`} />
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span className="text-[9px] px-1.5 py-0.5 rounded font-black tracking-wider bg-black/30 text-amber-200 uppercase">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Prominent Live Google Publishing Banner */}
      <div className="bg-gradient-to-r from-emerald-950/80 via-slate-900 to-blue-950/80 border-b border-emerald-500/30 px-4 py-3 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5 text-center md:text-left">
            <span className="flex h-2.5 w-2.5 relative shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <div>
              <span className="font-bold text-emerald-300">
                {language === 'bn' 
                  ? 'ওয়েবসাইটটি গুগলে লাইভ পাবলিশ করা হয়েছে!' 
                  : 'Your website is now publicly live on Google Cloud!'}
              </span>
              <span className="text-slate-300 ml-1.5 hidden sm:inline">
                {language === 'bn'
                  ? 'সারা বিশ্বের মানুষ এই পাবলিক লিংক দিয়ে যেকোনো ডিভাইস থেকে সাইট দেখতে পারবে:'
                  : 'Anyone can visit this live URL from any device:'}
              </span>
              <a
                href={livePublicUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono font-bold text-blue-400 hover:text-blue-300 hover:underline ml-1 inline-flex items-center gap-1"
              >
                <span>{livePublicUrl}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleCopyBannerLink}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold transition active:scale-95"
            >
              {bannerCopied ? (language === 'bn' ? '✓ লিংক কপি হয়েছে' : '✓ Copied') : (language === 'bn' ? 'লিংক কপি' : 'Copy Link')}
            </button>
            <button
              onClick={() => setRequestIndexingModalOpen(true)}
              className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white font-bold transition shadow-md shadow-blue-600/30 active:scale-95 flex items-center gap-1.5"
            >
              <Zap className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
              <span>{language === 'bn' ? 'Request Indexing' : 'Request Indexing'}</span>
            </button>
            <button
              onClick={() => setLivePublishModalOpen(true)}
              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition shadow active:scale-95 flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{language === 'bn' ? 'শেয়ার' : 'Share'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Large Executive Omni Search Board & AI Command Bar */}
      <OmniSearchBoard 
        language={language}
        project={activeProject}
        onNavigateTab={setCurrentTab}
        onRequestIndexing={() => setRequestIndexingModalOpen(true)}
        onOpenLivePublishModal={() => setLivePublishModalOpen(true)}
      />

      {/* Main View Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentTab === 'enterprise' && (
          <EnterpriseSuite
            project={activeProject}
            language={language}
            onUpdateProject={handleUpdateProject}
            onNavigateToTab={setCurrentTab}
          />
        )}

        {currentTab === 'monetization' && (
          <MonetizationTab
            project={activeProject}
            language={language}
            onUpdateProject={handleUpdateProject}
            onNavigateToTab={setCurrentTab}
          />
        )}

        {currentTab === 'nexus-ai' && (
          <NexusAiStudio
            language={language}
            project={activeProject}
            onUpdateProject={handleUpdateProject}
            onNavigateToTab={setCurrentTab}
          />
        )}

        {currentTab === 'analytics' && (
          <AnalyticsTab
            project={activeProject}
            language={language}
            onUpdateProject={handleUpdateProject}
          />
        )}

        {currentTab === 'roadmap' && (
          <RoadmapTab
            project={activeProject}
            language={language}
            onUpdateProject={handleUpdateProject}
            onNavigateToTab={setCurrentTab}
          />
        )}

        {currentTab === 'audit' && (
          <AuditTab
            project={activeProject}
            language={language}
            onUpdateProject={handleUpdateProject}
            onNavigateToTab={setCurrentTab}
          />
        )}

        {currentTab === 'serp' && (
          <SerpPreviewTab
            project={activeProject}
            language={language}
            onUpdateProject={handleUpdateProject}
          />
        )}

        {currentTab === 'sitemap' && (
          <SitemapRobotsTab
            project={activeProject}
            language={language}
            onUpdateProject={handleUpdateProject}
          />
        )}

        {currentTab === 'schema' && (
          <SchemaTab
            project={activeProject}
            language={language}
            onUpdateProject={handleUpdateProject}
          />
        )}

        {currentTab === 'ai-seo' && (
          <AiSeoTab
            project={activeProject}
            language={language}
            onUpdateProject={handleUpdateProject}
            onNavigateToTab={setCurrentTab}
          />
        )}

        {currentTab === 'deploy' && (
          <DeployTab
            project={activeProject}
            language={language}
            onNavigateToTab={setCurrentTab}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-300">Google Site Publisher</span>
            <span>•</span>
            <span>{language === 'bn' ? 'গুগল ইনডেক্সিং ও এসইও প্ল্যাটফর্ম' : 'AI SEO & Search Console Toolkit'}</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <a
              href="https://search.google.com/search-console"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 flex items-center gap-1 transition"
            >
              <span>Google Search Console</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="https://search.google.com/test/rich-results"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 flex items-center gap-1 transition"
            >
              <span>Rich Results Test</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <button
              onClick={() => setCurrentTab('roadmap')}
              className="hover:text-blue-400 transition"
            >
              {language === 'bn' ? 'পাবলিশিং গাইড' : 'Publishing Guide'}
            </button>
          </div>
        </div>
      </footer>

      {/* Export Package Modal */}
      <ExportModal
        isOpen={exportModalOpen}
        onClose={() => setExportModalOpen(false)}
        project={activeProject}
        language={language}
      />

      {/* New Project Modal */}
      <NewProjectModal
        isOpen={newProjectModalOpen}
        onClose={() => setNewProjectModalOpen(false)}
        onAddProject={handleAddProject}
        language={language}
      />

      {/* Live Publish Celebration & Sharing Modal */}
      <LivePublishModal
        isOpen={livePublishModalOpen}
        onClose={() => setLivePublishModalOpen(false)}
        language={language}
      />

      {/* Google Request Indexing Console Modal */}
      <RequestIndexingModal
        isOpen={requestIndexingModalOpen}
        onClose={() => setRequestIndexingModalOpen(false)}
        language={language}
      />

    </div>
  );
}
