import React, { useState } from 'react';
import { 
  X, 
  Download, 
  Copy, 
  Check, 
  FileCode, 
  FileText, 
  Code2, 
  CheckCircle2, 
  FolderArchive 
} from 'lucide-react';
import { WebsiteProject, Language } from '../types';
import { 
  generateSitemapXml, 
  generateRobotsTxt, 
  generateFullHeadHtml, 
  generateSchemaJson, 
  downloadFile 
} from '../utils/seoGenerators';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: WebsiteProject;
  language: Language;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  project,
  language,
}) => {
  if (!isOpen) return null;

  const isBn = language === 'bn';
  const [copiedFile, setCopiedFile] = useState<string | null>(null);

  const sitemapXml = generateSitemapXml(project);
  const robotsTxt = generateRobotsTxt(project);
  const fullHeadHtml = generateFullHeadHtml(project);
  const schemaJson = generateSchemaJson(project);

  const copyContent = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedFile(id);
    setTimeout(() => setCopiedFile(null), 2000);
  };

  const handleDownloadAll = () => {
    downloadFile('sitemap.xml', sitemapXml, 'application/xml');
    setTimeout(() => {
      downloadFile('robots.txt', robotsTxt, 'text/plain');
    }, 200);
    setTimeout(() => {
      downloadFile('head-tags.html', fullHeadHtml, 'text/html');
    }, 400);
    setTimeout(() => {
      downloadFile('schema-ld.json', schemaJson, 'application/json');
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 space-y-5">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-600/20 text-blue-400">
              <FolderArchive className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                {isBn ? 'গুগল পাবলিশিং ফাইল এক্সপোর্ট প্যাকেজ' : 'Export Google Publishing Files'}
              </h3>
              <p className="text-xs text-slate-400">
                {project.name}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Download all button banner */}
        <div className="bg-gradient-to-r from-blue-900/40 via-indigo-900/40 to-slate-900 p-4 rounded-xl border border-blue-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="text-xs text-slate-300">
            <span className="font-bold text-white block mb-0.5">
              {isBn ? 'সবগুলো ফাইল একসাথে ডাউনলোড করতে চান?' : 'Download entire package for your website'}
            </span>
            <span>
              {isBn 
                ? 'sitemap.xml, robots.txt, head-tags.html এবং schema.json ফাইল।'
                : 'Contains XML sitemap, crawler rules, meta tags, and structured data.'}
            </span>
          </div>

          <button
            onClick={handleDownloadAll}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-xs shadow-md transition shrink-0 flex items-center justify-center gap-1.5"
          >
            <Download className="w-4 h-4" />
            <span>{isBn ? 'সব ফাইল ডাউনলোড' : 'Download All Files'}</span>
          </button>
        </div>

        {/* Files list */}
        <div className="space-y-3">
          
          {/* sitemap.xml */}
          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2.5">
              <FileCode className="w-4 h-4 text-blue-400 shrink-0" />
              <div>
                <span className="font-bold text-white block">sitemap.xml</span>
                <span className="text-[11px] text-slate-400">
                  {isBn ? 'সাইটের সকল পেজ গুগল সার্চবটকে নির্দেশ করে' : 'All internal URLs mapped for Google'}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => copyContent(sitemapXml, 'sitemap')}
                className="px-2.5 py-1 text-slate-300 hover:text-white bg-slate-900 rounded border border-slate-700 text-[11px]"
              >
                {copiedFile === 'sitemap' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : (isBn ? 'কপি' : 'Copy')}
              </button>
              <button
                onClick={() => downloadFile('sitemap.xml', sitemapXml, 'application/xml')}
                className="px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded font-medium text-[11px]"
              >
                {isBn ? 'ডাউনলোড' : 'Download'}
              </button>
            </div>
          </div>

          {/* robots.txt */}
          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2.5">
              <FileText className="w-4 h-4 text-emerald-400 shrink-0" />
              <div>
                <span className="font-bold text-white block">robots.txt</span>
                <span className="text-[11px] text-slate-400">
                  {isBn ? 'গুগলবট পারমিশন ও সাইটম্যাপ লোকেশন ডিরেক্টিভ' : 'Googlebot crawling directives'}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => copyContent(robotsTxt, 'robots')}
                className="px-2.5 py-1 text-slate-300 hover:text-white bg-slate-900 rounded border border-slate-700 text-[11px]"
              >
                {copiedFile === 'robots' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : (isBn ? 'কপি' : 'Copy')}
              </button>
              <button
                onClick={() => downloadFile('robots.txt', robotsTxt, 'text/plain')}
                className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded font-medium text-[11px]"
              >
                {isBn ? 'ডাউনলোড' : 'Download'}
              </button>
            </div>
          </div>

          {/* head-tags.html */}
          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2.5">
              <Code2 className="w-4 h-4 text-amber-400 shrink-0" />
              <div>
                <span className="font-bold text-white block">head-tags.html</span>
                <span className="text-[11px] text-slate-400">
                  {isBn ? 'টাইটেল, মেটা, ওপেনগ্রাফ ও ভেরিফিকেশন ট্যাগ' : 'Title, meta, OpenGraph, and verification'}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => copyContent(fullHeadHtml, 'head')}
                className="px-2.5 py-1 text-slate-300 hover:text-white bg-slate-900 rounded border border-slate-700 text-[11px]"
              >
                {copiedFile === 'head' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : (isBn ? 'কপি' : 'Copy')}
              </button>
              <button
                onClick={() => downloadFile('head-tags.html', fullHeadHtml, 'text/html')}
                className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded font-medium text-[11px]"
              >
                {isBn ? 'ডাউনলোড' : 'Download'}
              </button>
            </div>
          </div>

          {/* schema.json */}
          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2.5">
              <FileCode className="w-4 h-4 text-purple-400 shrink-0" />
              <div>
                <span className="font-bold text-white block">schema-ld.json</span>
                <span className="text-[11px] text-slate-400">
                  {isBn ? 'গুগল রিচ স্নিপেট ও স্টার রেটিং স্ট্রাকচার্ড ডেটা' : 'Schema.org JSON-LD for rich snippets'}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => copyContent(schemaJson, 'schema')}
                className="px-2.5 py-1 text-slate-300 hover:text-white bg-slate-900 rounded border border-slate-700 text-[11px]"
              >
                {copiedFile === 'schema' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : (isBn ? 'কপি' : 'Copy')}
              </button>
              <button
                onClick={() => downloadFile('schema.json', schemaJson, 'application/json')}
                className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded font-medium text-[11px]"
              >
                {isBn ? 'ডাউনলোড' : 'Download'}
              </button>
            </div>
          </div>

        </div>

        {/* Footer info */}
        <div className="pt-2 text-center text-xs text-slate-500">
          {isBn
            ? 'এই ফাইলগুলো আপনার ওয়েবসাইটের ফোল্ডারে রাখলেই সাইটটি গুগলে ইনডেক্সিংয়ের জন্য প্রস্তুত হয়ে যাবে।'
            : 'Integrate these into your project root/public directory for immediate Google readiness.'}
        </div>

      </div>
    </div>
  );
};
