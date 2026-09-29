import React, { useState } from 'react';
import { 
  Code2, 
  Sparkles, 
  Copy, 
  Check, 
  ExternalLink, 
  Plus, 
  Trash2, 
  HelpCircle,
  Building,
  Laptop,
  BookOpen,
  MapPin
} from 'lucide-react';
import { WebsiteProject, Language } from '../types';
import { generateSchemaJson, downloadFile } from '../utils/seoGenerators';

interface SchemaTabProps {
  project: WebsiteProject;
  language: Language;
  onUpdateProject: (updated: Partial<WebsiteProject>) => void;
}

export const SchemaTab: React.FC<SchemaTabProps> = ({
  project,
  language,
  onUpdateProject,
}) => {
  const isBn = language === 'bn';
  const [copied, setCopied] = useState(false);
  const [newFaqQ, setNewFaqQ] = useState('');
  const [newFaqA, setNewFaqA] = useState('');

  const schemaJson = generateSchemaJson(project);
  const fullScriptTag = `<script type="application/ld+json">\n${schemaJson}\n</script>`;

  const copyScript = () => {
    navigator.clipboard.writeText(fullScriptTag);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddFaq = () => {
    if (!newFaqQ.trim() || !newFaqA.trim()) return;
    onUpdateProject({
      faqItems: [...project.faqItems, { question: newFaqQ, answer: newFaqA }],
    });
    setNewFaqQ('');
    setNewFaqA('');
  };

  const handleDeleteFaq = (idx: number) => {
    onUpdateProject({
      faqItems: project.faqItems.filter((_, i) => i !== idx),
    });
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/90 p-4 rounded-2xl border border-slate-800">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span>{isBn ? 'গুগল রিচ স্নিপেট ও স্কিমা (Schema.org)' : 'Schema.org JSON-LD Structured Data'}</span>
            <span className="text-xs bg-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded font-mono">
              Rich Snippets
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            {isBn 
              ? 'গুগল সার্চ ফলাফলে স্টার রেটিং, এফএকিউ ড্রপডাউন এবং ব্যবসার বিবরণ দেখানোর জন্য স্কিমা কোড।'
              : 'Help Google understand your content and earn rich search results, star ratings, and FAQ snippets.'}
          </p>
        </div>

        {/* Google Rich Results Test Link */}
        <a
          href="https://search.google.com/test/rich-results"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>{isBn ? 'গুগল রিচ রেজাল্টস টেস্ট' : 'Google Rich Results Test'}</span>
          <ExternalLink className="w-3 h-3 text-slate-400" />
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Schema Selector & Config (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          
          {/* Schema Type Selector */}
          <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-3">
            <label className="text-xs font-bold text-white block">
              {isBn ? 'স্কিমার ধরন বাছাই করুন:' : 'Select Schema.org Entity Type:'}
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                { type: 'WebApplication', label: 'Web Application', icon: Laptop },
                { type: 'Organization', label: 'Company / Org', icon: Building },
                { type: 'LocalBusiness', label: 'Local Business', icon: MapPin },
                { type: 'FAQPage', label: 'FAQ Page', icon: HelpCircle },
                { type: 'Article', label: 'Blog / Article', icon: BookOpen },
              ].map((item) => {
                const Icon = item.icon;
                const isSelected = project.schemaType === item.type;
                return (
                  <button
                    key={item.type}
                    onClick={() => onUpdateProject({ schemaType: item.type as any })}
                    className={`p-3 rounded-xl border text-left text-xs transition flex flex-col items-start gap-1.5 ${
                      isSelected
                        ? 'bg-blue-600/20 border-blue-500 text-white font-bold ring-1 ring-blue-500'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isSelected ? 'text-blue-400' : 'text-slate-500'}`} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* FAQ Builder (if FAQPage or used as FAQ rich snippet) */}
          <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-amber-400" />
                <span>{isBn ? 'গুগল সার্চ এফএকিউ ড্রপডাউন (FAQ Snippets)' : 'Google Search FAQ Accordions'}</span>
              </h3>
              <span className="text-[11px] text-amber-400 font-mono">
                {project.faqItems.length} {isBn ? 'টি প্রশ্ন' : 'questions'}
              </span>
            </div>

            {/* Add FAQ form */}
            <div className="space-y-2 text-xs bg-slate-950 p-3 rounded-xl border border-slate-800">
              <input
                type="text"
                value={newFaqQ}
                onChange={(e) => setNewFaqQ(e.target.value)}
                placeholder={isBn ? 'প্রশ্ন লিখুন (যেমন: সার্ভিসটি কিভাবে কাজ করে?)' : 'Enter question (e.g. How does this service work?)'}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
              />
              <textarea
                rows={2}
                value={newFaqA}
                onChange={(e) => setNewFaqA(e.target.value)}
                placeholder={isBn ? 'উত্তর লিখুন...' : 'Enter clear answer for searchers...'}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
              />
              <button
                onClick={handleAddFaq}
                disabled={!newFaqQ.trim() || !newFaqA.trim()}
                className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-xs font-semibold flex items-center gap-1 transition"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{isBn ? 'প্রশ্ন ও উত্তর যোগ করুন' : 'Add Question'}</span>
              </button>
            </div>

            {/* List of FAQs */}
            <div className="space-y-2 max-h-56 overflow-y-auto">
              {project.faqItems.map((faq, idx) => (
                <div key={idx} className="bg-slate-950/80 p-3 rounded-lg border border-slate-800 text-xs space-y-1">
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-semibold text-white">Q: {faq.question}</span>
                    <button
                      onClick={() => handleDeleteFaq(idx)}
                      className="text-slate-500 hover:text-rose-400 p-0.5"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    A: {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right: Live JSON-LD Code & Copy (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-1.5 font-mono">
                <Code2 className="w-4 h-4 text-indigo-400" />
                <span>application/ld+json</span>
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={copyScript}
                  className="text-xs text-slate-300 hover:text-white flex items-center gap-1 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 transition"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? (isBn ? 'স্ক্রিপ্ট কপি হয়েছে' : 'Copied') : (isBn ? 'স্ক্রিপ্ট কপি' : 'Copy Script')}</span>
                </button>
                <button
                  onClick={() => downloadFile('schema.json', schemaJson, 'application/json')}
                  className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition"
                >
                  {isBn ? 'JSON ডাউনলোড' : 'Download JSON'}
                </button>
              </div>
            </div>

            <pre className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-[11px] font-mono text-slate-300 overflow-x-auto max-h-[460px] leading-relaxed">
              {fullScriptTag}
            </pre>

            <div className="text-[11px] text-slate-400 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80">
              💡 {isBn
                ? 'এই কোডটি সরাসরি আপনার ওয়েবসাইটের <head> ট্যাগে বসিয়ে দিন। গুগল সার্চবট স্ক্রিপ্টটি পড়ে সার্চ কার্ডে এক্সট্রা তথ্য যুক্ত করবে।'
                : 'Embed this script inside the <head> of your HTML. Google uses this to construct rich knowledge panels and snippet enhancements.'}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
