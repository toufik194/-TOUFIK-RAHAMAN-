import { WebsiteProject } from '../types';

export const initialProjects: WebsiteProject[] = [
  {
    id: 'my-cloud-app',
    name: 'Amar Web Application (আমার নতুন ওয়েবসাইট)',
    url: 'https://ais-pre-khhddulrf4oxahl7t6mn2d-458391942755.asia-southeast1.run.app',
    description: 'একটি আধুনিক এবং দ্রুতগতির ফুল-স্ট্যাক ওয়েব অ্যাপ্লিকেশন যা গুগল ক্লাউড এবং এআই প্রযুক্তিতে চালিত। দ্রুত গুগল ইনডেক্সিং এবং প্রফেশনাল পারফরম্যান্স।',
    author: 'Toifik Rahaman',
    keywords: ['ওয়েবসাইট পাবলিশ', 'গুগল সার্চ কনসোল', 'এসইও অপ্টিমাইজেশন', 'Google Indexing', 'Web Development'],
    category: 'Technology & Development',
    googleVerificationCode: 'google-site-verification=AbCdEfGhIjKlMnOpQrStUvWxYz1234567890',
    faviconUrl: 'https://ais-pre-khhddulrf4oxahl7t6mn2d-458391942755.asia-southeast1.run.app/favicon.ico',
    ogImageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80',
    twitterHandle: '@developer_bd',
    language: 'bn',
    rating: 4.9,
    reviewCount: 142,
    sitemapUrls: [
      { id: '1', path: '/', lastmod: '2026-09-26', changefreq: 'daily', priority: 1.0 },
      { id: '2', path: '/about', lastmod: '2026-09-20', changefreq: 'monthly', priority: 0.8 },
      { id: '3', path: '/services', lastmod: '2026-09-22', changefreq: 'weekly', priority: 0.9 },
      { id: '4', path: '/blog', lastmod: '2026-09-26', changefreq: 'daily', priority: 0.8 },
      { id: '5', path: '/contact', lastmod: '2026-09-15', changefreq: 'monthly', priority: 0.7 },
      { id: '6', path: '/api/user', lastmod: '2026-09-28', changefreq: 'weekly', priority: 0.8 },
    ],
    robotsRules: {
      allowAll: true,
      disallowedPaths: ['/admin', '/api/private', '/tmp/'],
      allowedCrawlers: ['Googlebot', 'Googlebot-Image', 'Bingbot', 'DuckDuckBot'],
      sitemapUrl: 'https://ais-pre-khhddulrf4oxahl7t6mn2d-458391942755.asia-southeast1.run.app/sitemap.xml',
    },
    schemaType: 'WebApplication',
    faqItems: [
      {
        question: 'ওয়েবসাইট বানানোর পর কিভাবে গুগলে সার্চ দিলে দেখা যাবে?',
        answer: 'প্রথমে সাইটটি লাইভ করুন, এরপর Google Search Console-এ প্রপার্টি যুক্ত করে ভেরিফাই করুন এবং sitemap.xml ফাইল সাবমিট করুন। ২৪ থেকে ৪৮ ঘণ্টার মধ্যে গুগল আপনার সাইট ক্রল করে ইনডেক্স করবে।'
      },
      {
        question: 'গুগল সার্চ কনসোল (GSC) কি বাধ্যতামূলক?',
        answer: 'হ্যাঁ, গুগলে সাইট ক্রল করানো, এরর চেক করা এবং র্যাংকিং ও ভিজিটর ডেটা ট্র্যাক করার জন্য গুগল সার্চ কনসোল সবচেয়ে গুরুত্বপূর্ণ অফিসিয়াল টুল।'
      },
      {
        question: 'Sitemap.xml ও Robots.txt ফাইলের কাজ কী?',
        answer: 'Robots.txt ফাইল গুগলবটকে বলে কোন পেজগুলো ক্রল করতে পারবে, আর Sitemap.xml হলো আপনার ওয়েবসাইটের সমস্ত পেজের একটি ম্যাপ যাতে গুগল কোনো পেজ মিস না করে।'
      }
    ]
  },
  {
    id: 'portfolio-site',
    name: 'Professional Web Developer Portfolio',
    url: 'https://myportfolio.dev',
    description: 'High performance React & full-stack software development portfolio showcasing modern apps, clean UI, and client solutions.',
    author: 'Full Stack Engineer',
    keywords: ['React Developer', 'Full Stack Portfolio', 'Web Development Services', 'JavaScript Specialist'],
    category: 'Portfolio & Freelance',
    googleVerificationCode: 'google-site-verification=xyz987654321sampletoken',
    faviconUrl: 'https://myportfolio.dev/favicon.ico',
    ogImageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1200&auto=format&fit=crop&q=80',
    twitterHandle: '@portfolio_dev',
    language: 'en',
    rating: 5.0,
    reviewCount: 38,
    sitemapUrls: [
      { id: '1', path: '/', lastmod: '2026-09-25', changefreq: 'weekly', priority: 1.0 },
      { id: '2', path: '/projects', lastmod: '2026-09-24', changefreq: 'weekly', priority: 0.9 },
      { id: '3', path: '/resume', lastmod: '2026-09-10', changefreq: 'monthly', priority: 0.7 },
      { id: '4', path: '/contact', lastmod: '2026-09-01', changefreq: 'monthly', priority: 0.6 }
    ],
    robotsRules: {
      allowAll: true,
      disallowedPaths: ['/drafts/'],
      allowedCrawlers: ['Googlebot', 'Bingbot'],
      sitemapUrl: 'https://myportfolio.dev/sitemap.xml',
    },
    schemaType: 'Organization',
    faqItems: [
      {
        question: 'What web development services do you offer?',
        answer: 'Custom React & Next.js applications, responsive Tailwind web designs, backend APIs, and Google SEO optimizations.'
      }
    ]
  },
  {
    id: 'example-api-user',
    name: 'Example User API Service',
    url: 'https://example.com/api/user',
    description: 'High performance RESTful user account, identity and profile management endpoint on Google Cloud.',
    author: 'API Engineering Team',
    keywords: ['User API', 'Profile Endpoint', 'Authentication Service', 'REST API', 'JSON Service'],
    category: 'API & Developer Services',
    googleVerificationCode: 'google-site-verification=example-api-user-token-2026',
    faviconUrl: 'https://example.com/favicon.ico',
    ogImageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&auto=format&fit=crop&q=80',
    twitterHandle: '@example_api',
    language: 'en',
    rating: 4.9,
    reviewCount: 88,
    sitemapUrls: [
      { id: '1', path: '/', lastmod: '2026-09-28', changefreq: 'daily', priority: 1.0 },
      { id: '2', path: '/api/user', lastmod: '2026-09-28', changefreq: 'weekly', priority: 0.9 },
      { id: '3', path: '/docs', lastmod: '2026-09-27', changefreq: 'weekly', priority: 0.8 },
      { id: '4', path: '/status', lastmod: '2026-09-28', changefreq: 'hourly', priority: 0.7 }
    ],
    robotsRules: {
      allowAll: true,
      disallowedPaths: ['/api/user/internal', '/tmp/'],
      allowedCrawlers: ['Googlebot', 'Bingbot'],
      sitemapUrl: 'https://example.com/sitemap.xml',
    },
    schemaType: 'WebApplication',
    faqItems: [
      {
        question: 'How do I authenticate with https://example.com/api/user?',
        answer: 'Pass a valid Bearer token in the Authorization header of your GET or POST request to retrieve user profile data.'
      }
    ]
  }
];
