export type Language = 'bn' | 'en';

export type TabType = 
  | 'nexus-ai'
  | 'enterprise'
  | 'monetization'
  | 'analytics'
  | 'roadmap' 
  | 'audit' 
  | 'serp' 
  | 'sitemap' 
  | 'schema' 
  | 'ai-seo' 
  | 'deploy';

export interface SitemapUrl {
  id: string;
  path: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

export interface WebsiteProject {
  id: string;
  name: string;
  url: string;
  description: string;
  author: string;
  keywords: string[];
  category: string;
  googleVerificationCode: string;
  faviconUrl: string;
  ogImageUrl: string;
  twitterHandle: string;
  language: 'bn' | 'en' | 'bn-BD' | 'en-US';
  rating: number;
  reviewCount: number;
  sitemapUrls: SitemapUrl[];
  robotsRules: {
    allowAll: boolean;
    disallowedPaths: string[];
    allowedCrawlers: string[];
    sitemapUrl: string;
  };
  schemaType: 'WebApplication' | 'Organization' | 'LocalBusiness' | 'Article' | 'Product' | 'FAQPage';
  faqItems: { question: string; answer: string }[];
}

export interface AuditCheckItem {
  id: string;
  title: string;
  titleBn: string;
  category: 'indexing' | 'meta' | 'social' | 'technical';
  status: 'passed' | 'warning' | 'failed';
  score: number;
  description: string;
  descriptionBn: string;
  recommendation: string;
  recommendationBn: string;
  fixAction?: string;
}

export interface AuditResult {
  overallScore: number;
  passedCount: number;
  warningCount: number;
  failedCount: number;
  checks: AuditCheckItem[];
}
