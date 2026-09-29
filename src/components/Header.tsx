import React from 'react';
import { 
  Globe, 
  Search, 
  Download, 
  ExternalLink, 
  CheckCircle2, 
  Languages, 
  FolderPlus,
  Sparkles,
  Cloud,
  Zap
} from 'lucide-react';
import { WebsiteProject, Language } from '../types';
import { translations } from '../utils/translations';

interface HeaderProps {
  projects: WebsiteProject[];
  activeProject: WebsiteProject;
  onSelectProject: (id: string) => void;
  onOpenNewProject: () => void;
  onOpenExportModal: () => void;
  onOpenLivePublishModal: () => void;
  onOpenRequestIndexingModal: () => void;
  language: Language;
  onToggleLanguage: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  projects,
  activeProject,
  onSelectProject,
  onOpenNewProject,
  onOpenExportModal,
  onOpenLivePublishModal,
  onOpenRequestIndexingModal,
  language,
  onToggleLanguage,
}) => {
  const t = translations[language];

  return (
    <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          
          {/* Logo & Main Title */}
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-sky-400 flex items-center justify-center shadow-lg shadow-blue-500/25 ring-1 ring-white/20">
              <Globe className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-white tracking-tight flex items-center gap-1.5">
                  <span>Nexus Enterprise Suite</span>
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/40 uppercase tracking-wider">
                    Enterprise Cloud Edition
                  </span>
                </h1>
              </div>
              <p className="text-xs text-slate-400 line-clamp-1">
                {language === 'bn' 
                  ? 'গুগলে ওয়েবসাইট পাবলিশ, এআই কন্টেন্ট, এন্টারপ্রাইজ অডিট ও ক্লাউড কমান্ড সেন্টার'
                  : 'Enterprise Google Search Console suite, AI long-form writer & cloud indexing command center'}
              </p>
            </div>
          </div>

          {/* Right actions: Project selector, GSC link, Export & Language */}
          <div className="flex flex-wrap items-center gap-2.5">
            
            {/* Active Project Switcher */}
            <div className="flex items-center bg-slate-800/90 rounded-lg p-1 border border-slate-700">
              <span className="text-xs text-slate-400 pl-2 pr-1 font-medium hidden sm:inline">
                {language === 'bn' ? 'ওয়েবসাইট:' : 'Site:'}
              </span>
              <select
                value={activeProject.id}
                onChange={(e) => onSelectProject(e.target.value)}
                className="bg-transparent text-xs text-white font-medium focus:outline-none px-2 py-1 cursor-pointer max-w-[170px] truncate"
              >
                {projects.map((p) => (
                  <option key={p.id} value={p.id} className="bg-slate-900 text-white">
                    {p.name}
                  </option>
                ))}
              </select>
              <button
                onClick={onOpenNewProject}
                title={t.addNewProject}
                className="p-1 hover:bg-slate-700 text-slate-300 hover:text-white rounded transition"
              >
                <FolderPlus className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Live on Google Cloud button */}
            <button
              onClick={onOpenLivePublishModal}
              className="inline-flex items-center gap-1.5 text-xs bg-emerald-950/70 hover:bg-emerald-900/80 text-emerald-400 border border-emerald-700/60 px-3 py-1.5 rounded-lg font-semibold transition shadow-sm active:scale-95"
              title="View Public Live Link and Share"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>{language === 'bn' ? 'গুগলে লাইভ আছে' : 'Live on Google'}</span>
            </button>

            {/* Request Indexing Button */}
            <button
              onClick={onOpenRequestIndexingModal}
              className="inline-flex items-center gap-1.5 text-xs bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white px-3.5 py-1.5 rounded-lg font-bold transition shadow-md shadow-blue-600/25 active:scale-95 animate-pulse"
              title="Request Indexing on Google"
            >
              <Zap className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
              <span>{language === 'bn' ? 'Request Indexing' : 'Request Indexing'}</span>
            </button>

            {/* Export Package Button */}
            <button
              onClick={onOpenExportModal}
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-md shadow-blue-600/20 transition active:scale-95"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{language === 'bn' ? 'ফাইল ডাউনলোড' : 'Export Files'}</span>
            </button>

            {/* Language Switcher */}
            <button
              onClick={onToggleLanguage}
              className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
              title="Toggle Bengali / English"
            >
              <Languages className="w-3.5 h-3.5 text-indigo-400" />
              <span>{language === 'bn' ? 'ENG' : 'বাং'}</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
