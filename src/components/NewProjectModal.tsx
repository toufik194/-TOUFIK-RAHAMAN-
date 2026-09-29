import React, { useState } from 'react';
import { X, Plus, Globe, Sparkles } from 'lucide-react';
import { WebsiteProject, Language } from '../types';

interface NewProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProject: (project: WebsiteProject) => void;
  language: Language;
}

export const NewProjectModal: React.FC<NewProjectModalProps> = ({
  isOpen,
  onClose,
  onAddProject,
  language,
}) => {
  if (!isOpen) return null;

  const isBn = language === 'bn';
  const [name, setName] = useState('');
  const [url, setUrl] = useState('https://');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('Portfolio & Web');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !url.trim()) return;

    const formattedUrl = url.trim().replace(/\/$/, '');

    const newProj: WebsiteProject = {
      id: `project-${Date.now()}`,
      name: name.trim(),
      url: formattedUrl,
      description: description.trim() || 'Modern web application built for Google indexing and high performance.',
      author: author.trim() || 'Site Owner',
      keywords: ['Web Development', 'Google SEO', 'Portfolio'],
      category: category,
      googleVerificationCode: '',
      faviconUrl: `${formattedUrl}/favicon.ico`,
      ogImageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80',
      twitterHandle: '@developer',
      language: isBn ? 'bn' : 'en',
      rating: 5.0,
      reviewCount: 24,
      sitemapUrls: [
        { id: '1', path: '/', lastmod: new Date().toISOString().split('T')[0], changefreq: 'daily', priority: 1.0 },
        { id: '2', path: '/about', lastmod: new Date().toISOString().split('T')[0], changefreq: 'weekly', priority: 0.8 },
        { id: '3', path: '/contact', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: 0.7 },
      ],
      robotsRules: {
        allowAll: true,
        disallowedPaths: ['/admin'],
        allowedCrawlers: ['Googlebot', 'Googlebot-Image', 'Bingbot'],
        sitemapUrl: `${formattedUrl}/sitemap.xml`,
      },
      schemaType: 'WebApplication',
      faqItems: [
        {
          question: 'How do I index this website on Google?',
          answer: 'Verify in Google Search Console and submit sitemap.xml.',
        },
      ],
    };

    onAddProject(newProj);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md shadow-2xl p-6 space-y-4">
        
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-blue-400" />
            <h3 className="text-base font-bold text-white">
              {isBn ? 'নতুন ওয়েবসাইট যুক্ত করুন' : 'Add New Website Project'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div>
            <label className="font-semibold text-slate-300 block mb-1">
              {isBn ? 'ওয়েবসাইটের নাম / টাইটেল *:' : 'Website Name / Title *:'}
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. My Modern Agency"
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-300 block mb-1">
              {isBn ? 'ওয়েবসাইটের লাইভ লিংক (HTTPS URL) *:' : 'Website Live URL (HTTPS) *:'}
            </label>
            <input
              type="url"
              required
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://mysite.com"
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-300 block mb-1">
              {isBn ? 'সংক্ষিপ্ত বিবরণ (Meta Description):' : 'Brief Summary (Meta Description):'}
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Fast, responsive website built with modern React..."
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-300 block mb-1">
              {isBn ? 'ক্যাটাগরি:' : 'Category:'}
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none"
            >
              <option value="Portfolio & Web">Portfolio & Web</option>
              <option value="E-commerce">E-commerce & Shopping</option>
              <option value="Software & SaaS">Software & SaaS</option>
              <option value="Business & Agency">Business & Agency</option>
              <option value="Blog & News">Blog & News</option>
            </select>
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 rounded-lg text-slate-300 hover:bg-slate-800 transition"
            >
              {isBn ? 'বাতিল' : 'Cancel'}
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold flex items-center gap-1.5 transition shadow"
            >
              <Plus className="w-4 h-4" />
              <span>{isBn ? 'সাইট তৈরি করুন' : 'Add Website'}</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
