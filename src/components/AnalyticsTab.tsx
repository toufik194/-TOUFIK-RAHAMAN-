import React, { useState } from 'react';
import { 
  TrendingUp, 
  Search, 
  MousePointerClick, 
  Eye, 
  Percent, 
  Award, 
  ArrowUpRight, 
  ArrowDownRight, 
  Calendar, 
  Download, 
  RefreshCw, 
  Plus, 
  Trash2, 
  Smartphone, 
  Monitor, 
  Globe, 
  Sparkles,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Swords,
  Target,
  Zap,
  Flame,
  Link2,
  Network,
  Mail,
  Copy,
  Check,
  FileText,
  Clock,
  Users,
  Bot,
  Activity,
  Compass,
  Radio,
  Sliders,
  Car,
  Shirt,
  Palette,
  Music
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  Legend, 
  BarChart, 
  Bar, 
  Cell,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis
} from 'recharts';
import confetti from 'canvas-confetti';
import { WebsiteProject, Language } from '../types';
import { sounds } from '../utils/soundEffects';
import { downloadFile } from '../utils/seoGenerators';
import { RealtimeTrafficMonitor } from './RealtimeTrafficMonitor';
import { VisualClickHeatmap } from './VisualClickHeatmap';
import { AiVoiceAssistant } from './AiVoiceAssistant';
import { UserJourneyTimeline } from './UserJourneyTimeline';
import { SessionActivityHeatmap } from './SessionActivityHeatmap';
import { FuturisticPowerCustomizer } from './FuturisticPowerCustomizer';
import { MonetizationPerformanceSection } from './MonetizationPerformanceSection';
import { generateAnalyticsPdfReport } from '../utils/analyticsPdfReport';

interface AnalyticsTabProps {
  project: WebsiteProject;
  language: Language;
  onUpdateProject: (updated: Partial<WebsiteProject>) => void;
}

interface KeywordRankHistory {
  id: string;
  keyword: string;
  currentRank: number;
  initialRank: number;
  change: number;
  clicks: number;
  impressions: number;
  ctr: number;
  serpFeatures: string[];
}

export const AnalyticsTab: React.FC<AnalyticsTabProps> = ({
  project,
  language,
  onUpdateProject,
}) => {
  const isBn = language === 'bn';
  const [timeRange, setTimeRange] = useState<'7d' | '28d' | '3m' | '12m'>('28d');
  const [selectedMetric, setSelectedMetric] = useState<'all' | 'clicks' | 'impressions' | 'position'>('all');
  const [isSyncing, setIsSyncing] = useState(false);
  const [newKeywordInput, setNewKeywordInput] = useState('');

  // Competitor Market Share Analysis State
  const [competitorInput, setCompetitorInput] = useState('rival-domain.com');
  const [activeCompetitor, setActiveCompetitor] = useState('rival-domain.com');
  const [isScanningCompetitor, setIsScanningCompetitor] = useState(false);
  const [competitorStats, setCompetitorStats] = useState({
    yourMarketShare: 64,
    competitorMarketShare: 36,
    searchVisibility: { you: 88, comp: 58 },
    keywordDominance: { you: 92, comp: 62 },
    siteSpeed: { you: 96, comp: 54 },
    backlinkAuthority: { you: 76, comp: 80 },
    crawlFreshness: { you: 98, comp: 66 },
    clickEngagement: { you: 86, comp: 59 },
  });

  const handleAnalyzeCompetitor = (domainToAnalyze?: string) => {
    const targetDomain = (domainToAnalyze || competitorInput).trim();
    if (!targetDomain) return;
    setIsScanningCompetitor(true);
    sounds.playSoftClick();

    setTimeout(() => {
      setActiveCompetitor(targetDomain);
      const seed = targetDomain.length * 7;
      const compSpeed = Math.max(42, Math.min(80, 50 + (seed % 28)));
      const compVis = Math.max(45, Math.min(85, 55 + ((seed * 2) % 25)));
      const compKw = Math.max(40, Math.min(82, 52 + ((seed * 3) % 27)));
      const compBacklinks = Math.max(50, Math.min(92, 60 + ((seed * 4) % 30)));
      const compFreshness = Math.max(48, Math.min(78, 54 + (seed % 22)));
      const compCtr = Math.max(46, Math.min(75, 51 + ((seed * 2) % 24)));

      const yourAvg = (88 + 92 + 96 + 76 + 98 + 86) / 6;
      const compAvg = (compVis + compKw + compSpeed + compBacklinks + compFreshness + compCtr) / 6;
      const total = yourAvg + compAvg;
      const yourShare = Math.round((yourAvg / total) * 100);

      setCompetitorStats({
        yourMarketShare: yourShare,
        competitorMarketShare: 100 - yourShare,
        searchVisibility: { you: 88, comp: compVis },
        keywordDominance: { you: 92, comp: compKw },
        siteSpeed: { you: 96, comp: compSpeed },
        backlinkAuthority: { you: 76, comp: compBacklinks },
        crawlFreshness: { you: 98, comp: compFreshness },
        clickEngagement: { you: 86, comp: compCtr },
      });

      setIsScanningCompetitor(false);
      sounds.playLuxuryChime();
      confetti({
        particleCount: 50,
        spread: 65,
        origin: { y: 0.8 },
      });
    }, 650);
  };

  // Backlinks Panel State
  const [backlinkFilter, setBacklinkFilter] = useState<'all' | 'dofollow' | 'nofollow'>('all');
  const [newBacklinkUrl, setNewBacklinkUrl] = useState('');
  const [newBacklinkAnchor, setNewBacklinkAnchor] = useState('');
  const [newBacklinkDa, setNewBacklinkDa] = useState('85');
  const [activeOutreachPitch, setActiveOutreachPitch] = useState<{
    platform: string;
    da: number;
    emailSubject: string;
    emailBody: string;
  } | null>(null);
  const [copiedPitch, setCopiedPitch] = useState(false);

  // Backlink Growth Timeline for LineChart
  const backlinkGrowthTimeline = [
    { period: isBn ? 'এপ্রিল' : 'Apr', backlinks: 380, refDomains: 75, authority: 38 },
    { period: isBn ? 'মে' : 'May', backlinks: 640, refDomains: 120, authority: 45 },
    { period: isBn ? 'জুন' : 'Jun', backlinks: 990, refDomains: 185, authority: 52 },
    { period: isBn ? 'জুলাই' : 'Jul', backlinks: 1350, refDomains: 245, authority: 60 },
    { period: isBn ? 'আগস্ট' : 'Aug', backlinks: 1620, refDomains: 290, authority: 65 },
    { period: isBn ? 'বর্তমান' : 'Current', backlinks: 1842, refDomains: 326, authority: 68 },
  ];

  // Active Backlinks Monitor List
  const [monitoredBacklinks, setMonitoredBacklinks] = useState([
    {
      id: 'bl-1',
      sourceUrl: 'github.com/topics/seo-automation-tools',
      anchor: isBn ? 'গুগল সাইট পাবলিশার প্ল্যাটফর্ম' : 'NextGen Google Publisher Platform',
      da: 96,
      type: 'DoFollow' as const,
      status: 'Verified',
      date: 'Sep 2026',
    },
    {
      id: 'bl-2',
      sourceUrl: 'dev.to/cloud_architect/fast-googlebot-crawling-guide',
      anchor: isBn ? 'ইনস্ট্যান্ট গুগল ইনডেক্সিং টুল' : 'Instant Google Indexing Engine',
      da: 89,
      type: 'DoFollow' as const,
      status: 'Verified',
      date: 'Sep 2026',
    },
    {
      id: 'bl-3',
      sourceUrl: 'producthunt.com/products/nexus-web-publisher',
      anchor: isBn ? 'অটোনোমাস এআই ওয়েব স্টুডিও' : 'Autonomous AI Web Studio',
      da: 91,
      type: 'NoFollow' as const,
      status: 'Verified',
      date: 'Aug 2026',
    },
    {
      id: 'bl-4',
      sourceUrl: 'medium.com/better-programming/deploying-on-google-cloud-run',
      anchor: isBn ? 'গুগল ক্লাউড লাইভ আর্কিটেকচার' : 'Google Cloud Run Architecture',
      da: 95,
      type: 'DoFollow' as const,
      status: 'Verified',
      date: 'Aug 2026',
    },
    {
      id: 'bl-5',
      sourceUrl: 'hashnode.com/post/best-practices-for-serp-ranking-2026',
      anchor: isBn ? 'হাই-কনভার্সন মেটা ট্যাগ জেনারেটর' : 'High-CTR Meta Generator',
      da: 84,
      type: 'DoFollow' as const,
      status: 'Verified',
      date: 'Jul 2026',
    },
  ]);

  // High-Authority Backlink Opportunities
  const backlinkOpportunities = [
    {
      id: 'opp-1',
      platform: 'GitHub Awesome Lists (awesome-web-dev & awesome-seo)',
      domain: 'github.com',
      da: 96,
      difficulty: isBn ? 'সহজ (Easy)' : 'Easy',
      type: 'DoFollow Directory',
      potentialTraffic: '+3.2K / mo',
      strategy: isBn 
        ? 'ওপেন সোর্স ক্যাটাগরিতে একটি পুল রিকোয়েস্ট (PR) দিয়ে সাইটটি সাবমিট করুন।'
        : 'Submit a simple GitHub PR adding your tool to the curated resource table.',
    },
    {
      id: 'opp-2',
      platform: 'Product Hunt & BetaList Featured Launch',
      domain: 'producthunt.com',
      da: 92,
      difficulty: isBn ? 'সহজ (Easy)' : 'Easy',
      type: 'High Referral + Authority',
      potentialTraffic: '+5.5K / mo',
      strategy: isBn 
        ? 'আপনার প্রজেক্টের লাইভ লিংক ও ডেমো দিয়ে ১ ক্লিকে লঞ্চ পোস্ট তৈরি করুন।'
        : 'Publish product showcase to get upvoted by thousands of tech founders.',
    },
    {
      id: 'opp-3',
      platform: 'Dev.to & Hashnode Engineering Case Study',
      domain: 'dev.to',
      da: 89,
      difficulty: isBn ? 'মাঝারি (Medium)' : 'Medium',
      type: 'Editorial Contextual DoFollow',
      potentialTraffic: '+2.8K / mo',
      strategy: isBn 
        ? '"কীভাবে আমরা গুগল ক্লাউডে সাইট পাবলিশ করে ১ দিনে ইনডেক্স করলাম" বিষয়ে আর্টিকেল লিখুন।'
        : 'Write a case study on sub-second Google indexing with embedded backlinks.',
    },
    {
      id: 'opp-4',
      platform: 'Google Cloud Community & Showcase Directory',
      domain: 'cloud.google.com',
      da: 98,
      difficulty: isBn ? 'মাঝারি (Medium)' : 'Medium',
      type: 'Tier-1 High Trust',
      potentialTraffic: '+4.1K / mo',
      strategy: isBn 
        ? 'Google Cloud Run-এ হোস্ট করা আপনার লাইভ অ্যাপটি শোকেস পেজে সাবমিট করুন।'
        : 'Submit your Google Cloud Run verified deployment to the community directory.',
    },
  ];

  const handleAddBacklink = () => {
    if (!newBacklinkUrl.trim()) return;
    const item = {
      id: `bl-${Date.now()}`,
      sourceUrl: newBacklinkUrl.trim(),
      anchor: newBacklinkAnchor.trim() || project.name,
      da: parseInt(newBacklinkDa, 10) || 85,
      type: 'DoFollow' as const,
      status: 'Verified',
      date: isBn ? 'আজ' : 'Today',
    };
    setMonitoredBacklinks([item, ...monitoredBacklinks]);
    setNewBacklinkUrl('');
    setNewBacklinkAnchor('');
    sounds.playLuxuryChime();
    confetti({
      particleCount: 40,
      spread: 50,
      origin: { y: 0.8 },
    });
  };

  const handleDeleteBacklink = (id: string) => {
    setMonitoredBacklinks(monitoredBacklinks.filter((b) => b.id !== id));
    sounds.playSoftClick();
  };

  const handleGenerateOutreachPitch = (opp: typeof backlinkOpportunities[0]) => {
    sounds.playSoftClick();
    const cleanUrl = project.url || 'https://ais-pre-khhddulrf4oxahl7t6mn2d-458391942755.asia-southeast1.run.app';
    const emailSubject = isBn
      ? `রিসোর্স সাজেশন: ${project.name} – ${opp.platform} এর জন্য`
      : `Resource Suggestion: ${project.name} for ${opp.platform}`;
    
    const emailBody = isBn
      ? `হ্যালো এডিটর টিম,

আমি আপনাদের ${opp.platform} পেজটি নিয়মিত অনুসরণ করি এবং এটি ডেভেলপার ও নির্মাতাদের জন্য দারুণ তথ্যবহুল।

আমি সম্প্রতি একটি উচ্চ ক্ষমতাসম্পন্ন প্ল্যাটফর্ম তৈরি করেছি: "${project.name}" (${cleanUrl})। এটি ব্যবহারকারীদের ${project.description.slice(0, 100)}... করতে সহায়তা করে।

আমি বিশ্বাস করি আপনাদের অডিয়েন্স এই ফ্রি টুলটি থেকে অনেক উপকৃত হবে। আপনারা চাইলে আপনাদের রিসোর্স তালিকায় এটি একটি ব্যাকলিংক হিসেবে যুক্ত করতে পারেন।

ধন্যবাদ,
${project.author || 'Team ' + project.name}`
      : `Hi Editorial Team,

I've been a frequent reader of your curated resources on ${opp.platform} and love the high quality of tools you showcase.

We recently launched "${project.name}" (${cleanUrl}), a high-performance web platform built on Google Cloud infrastructure designed to ${project.description.slice(0, 110)}...

Given your readers' interest in modern web development and SEO, I think this would be a valuable addition to your recommended tools list.

Would you be open to featuring it with a contextual resource link?

Best regards,
${project.author || 'Founder, ' + project.name}`;

    setActiveOutreachPitch({
      platform: opp.platform,
      da: opp.da,
      emailSubject,
      emailBody,
    });
  };

  const handleCopyPitch = () => {
    if (!activeOutreachPitch) return;
    const fullText = `Subject: ${activeOutreachPitch.emailSubject}\n\n${activeOutreachPitch.emailBody}`;
    navigator.clipboard.writeText(fullText);
    setCopiedPitch(true);
    sounds.playLuxuryChime();
    setTimeout(() => setCopiedPitch(false), 2200);
  };

  // Sample data points tailored to time range
  const generateTrafficData = () => {
    if (timeRange === '7d') {
      return [
        { date: isBn ? 'সোমবার' : 'Mon', clicks: 380, impressions: 8400, ctr: 4.5, position: 5.2, avgSessionDuration: '3m 12s', bounceRate: '24.2%', activeSessions: 185, dominantSource: 'Googlebot Mobile / Search', topLandingPage: '/', crawlStatus: '200 OK · Valid Schema', engagementScore: 92 },
        { date: isBn ? 'মঙ্গলবার' : 'Tue', clicks: 420, impressions: 9100, ctr: 4.6, position: 4.8, avgSessionDuration: '3m 28s', bounceRate: '23.1%', activeSessions: 215, dominantSource: 'Google Search Console', topLandingPage: '/services', crawlStatus: '200 OK · Indexed', engagementScore: 94 },
        { date: isBn ? 'বুধবার' : 'Wed', clicks: 490, impressions: 10400, ctr: 4.7, position: 4.2, avgSessionDuration: '3m 45s', bounceRate: '22.0%', activeSessions: 270, dominantSource: 'Googlebot Desktop', topLandingPage: '/blog', crawlStatus: '200 OK · Sitemaps Valid', engagementScore: 95 },
        { date: isBn ? 'বৃহস্পতিবার' : 'Thu', clicks: 580, impressions: 12200, ctr: 4.8, position: 3.9, avgSessionDuration: '4m 02s', bounceRate: '20.8%', activeSessions: 325, dominantSource: 'Google Discover Feed', topLandingPage: '/api/user', crawlStatus: '200 OK · Mobile Usable', engagementScore: 97 },
        { date: isBn ? 'শুক্রবার' : 'Fri', clicks: 650, impressions: 13900, ctr: 4.7, position: 3.5, avgSessionDuration: '4m 18s', bounceRate: '19.5%', activeSessions: 380, dominantSource: 'Direct Intent Search', topLandingPage: '/', crawlStatus: '200 OK · Core Web Vitals', engagementScore: 98 },
        { date: isBn ? 'শনিবার' : 'Sat', clicks: 710, impressions: 15400, ctr: 4.6, position: 3.2, avgSessionDuration: '4m 32s', bounceRate: '18.9%', activeSessions: 420, dominantSource: 'Organic High-CTR Link', topLandingPage: '/services', crawlStatus: '200 OK · Top Snippet', engagementScore: 99 },
        { date: isBn ? 'রবিবার' : 'Sun', clicks: 820, impressions: 17800, ctr: 4.6, position: 2.8, avgSessionDuration: '4m 38s', bounceRate: '18.2%', activeSessions: 495, dominantSource: 'Google SERP Rank #1', topLandingPage: '/', crawlStatus: '200 OK · Prime Placement', engagementScore: 100 },
      ];
    }
    if (timeRange === '3m') {
      return [
        { date: isBn ? 'জুলাই ১' : 'Jul 1', clicks: 1200, impressions: 28000, ctr: 4.2, position: 12.4, avgSessionDuration: '2m 15s', bounceRate: '32.1%', activeSessions: 520, dominantSource: 'Initial Google Crawl', topLandingPage: '/', crawlStatus: '200 OK', engagementScore: 82 },
        { date: isBn ? 'জুলাই ১৫' : 'Jul 15', clicks: 1850, impressions: 42000, ctr: 4.4, position: 9.8, avgSessionDuration: '2m 48s', bounceRate: '28.4%', activeSessions: 780, dominantSource: 'Search Console Sitemaps', topLandingPage: '/services', crawlStatus: '200 OK', engagementScore: 86 },
        { date: isBn ? 'আগস্ট ১' : 'Aug 1', clicks: 2600, impressions: 58000, ctr: 4.5, position: 7.2, avgSessionDuration: '3m 15s', bounceRate: '25.0%', activeSessions: 1140, dominantSource: 'Googlebot Mobile Feed', topLandingPage: '/blog', crawlStatus: '200 OK', engagementScore: 90 },
        { date: isBn ? 'আগস্ট ১৫' : 'Aug 15', clicks: 3400, impressions: 76000, ctr: 4.5, position: 5.4, avgSessionDuration: '3m 42s', bounceRate: '22.8%', activeSessions: 1520, dominantSource: 'Organic Search Intent', topLandingPage: '/', crawlStatus: '200 OK', engagementScore: 93 },
        { date: isBn ? 'সেপ্টেম্বর ১' : 'Sep 1', clicks: 4500, impressions: 98000, ctr: 4.6, position: 3.8, avgSessionDuration: '4m 05s', bounceRate: '20.1%', activeSessions: 1980, dominantSource: 'Rich Snippets Traffic', topLandingPage: '/services', crawlStatus: '200 OK', engagementScore: 96 },
        { date: isBn ? 'সেপ্টেম্বর ১৫' : 'Sep 15', clicks: 5800, impressions: 124000, ctr: 4.7, position: 2.9, avgSessionDuration: '4m 24s', bounceRate: '19.0%', activeSessions: 2450, dominantSource: 'Rank #1 Domination', topLandingPage: '/', crawlStatus: '200 OK', engagementScore: 98 },
        { date: isBn ? 'সেপ্টেম্বর ২৬' : 'Sep 26', clicks: 6900, impressions: 146000, ctr: 4.7, position: 2.4, avgSessionDuration: '4m 38s', bounceRate: '18.1%', activeSessions: 2890, dominantSource: 'Global Edge Indexing', topLandingPage: '/', crawlStatus: '200 OK', engagementScore: 100 },
      ];
    }
    // Default 28 days
    return [
      { date: isBn ? 'সপ্তাহ ১' : 'Week 1', clicks: 1850, impressions: 42000, ctr: 4.4, position: 7.4, avgSessionDuration: '2m 55s', bounceRate: '26.4%', activeSessions: 850, dominantSource: 'Search Console Initial', topLandingPage: '/', crawlStatus: '200 OK', engagementScore: 88 },
      { date: isBn ? 'সপ্তাহ ২' : 'Week 2', clicks: 2740, impressions: 61000, ctr: 4.5, position: 5.1, avgSessionDuration: '3m 30s', bounceRate: '23.2%', activeSessions: 1280, dominantSource: 'Googlebot Mobile First', topLandingPage: '/services', crawlStatus: '200 OK', engagementScore: 93 },
      { date: isBn ? 'সপ্তাহ ৩' : 'Week 3', clicks: 4120, impressions: 89000, ctr: 4.6, position: 3.8, avgSessionDuration: '4m 10s', bounceRate: '20.5%', activeSessions: 1890, dominantSource: 'High-CTR Rich Cards', topLandingPage: '/blog', crawlStatus: '200 OK', engagementScore: 97 },
      { date: isBn ? 'সপ্তাহ ৪' : 'Week 4', clicks: 6150, impressions: 132000, ctr: 4.7, position: 2.6, avgSessionDuration: '4m 38s', bounceRate: '18.2%', activeSessions: 2650, dominantSource: 'Google SERP Rank #1', topLandingPage: '/', crawlStatus: '200 OK', engagementScore: 100 },
    ];
  };

  const trafficData = generateTrafficData();

  // Keyword position trends over 4 audit cycles
  const keywordTrendData = [
    { period: isBn ? '১ম সপ্তাহ' : 'Week 1', kw1: 24, kw2: 18, kw3: 35, kw4: 42, serpFeatures: ['Snippet Preview'], auditConfidence: '78%', estMonthlyTraffic: '3.4K' },
    { period: isBn ? '২য় সপ্তাহ' : 'Week 2', kw1: 12, kw2: 9, kw3: 19, kw4: 25, serpFeatures: ['Featured Snippet'], auditConfidence: '88%', estMonthlyTraffic: '8.2K' },
    { period: isBn ? '৩য় সপ্তাহ' : 'Week 3', kw1: 4, kw2: 4, kw3: 8, kw4: 11, serpFeatures: ['Rich Sitelinks'], auditConfidence: '95%', estMonthlyTraffic: '16.5K' },
    { period: isBn ? 'বর্তমান' : 'Current', kw1: 1, kw2: 2, kw3: 3, kw4: 5, serpFeatures: ['Rank #1 Featured Card', 'Knowledge Panel'], auditConfidence: '99.4%', estMonthlyTraffic: '24.8K' },
  ];

  // Detailed tracked keywords table
  const [trackedKeywords, setTrackedKeywords] = useState<KeywordRankHistory[]>([
    {
      id: '1',
      keyword: project.keywords[0] || (isBn ? 'ওয়েবসাইট পাবলিশ' : 'Publish Website on Google'),
      currentRank: 1,
      initialRank: 24,
      change: 23,
      clicks: 4280,
      impressions: 74200,
      ctr: 5.76,
      serpFeatures: ['Featured Snippet', 'Site Links'],
    },
    {
      id: '2',
      keyword: project.keywords[1] || (isBn ? 'গুগল সার্চ কনসোল সেটআপ' : 'Google Search Console Setup'),
      currentRank: 2,
      initialRank: 18,
      change: 16,
      clicks: 3150,
      impressions: 58900,
      ctr: 5.34,
      serpFeatures: ['FAQ Accordion', 'Rich Stars ★★★★★'],
    },
    {
      id: '3',
      keyword: project.keywords[2] || (isBn ? 'এসইও অপ্টিমাইজেশন বাংলাদেশ' : 'Fast Google Indexing API'),
      currentRank: 3,
      initialRank: 35,
      change: 32,
      clicks: 2890,
      impressions: 48500,
      ctr: 5.95,
      serpFeatures: ['Knowledge Graph', 'Site Links'],
    },
    {
      id: '4',
      keyword: project.keywords[3] || (isBn ? 'Google Cloud Web Hosting' : 'Google Cloud Web Hosting'),
      currentRank: 5,
      initialRank: 42,
      change: 37,
      clicks: 1940,
      impressions: 39200,
      ctr: 4.94,
      serpFeatures: ['Rich Snippet'],
    },
  ]);

  // Device Breakdown data
  const deviceData = [
    { name: isBn ? 'মোবাইল (Mobile)' : 'Mobile', value: 68, color: '#3b82f6' },
    { name: isBn ? 'ডেস্কটপ (Desktop)' : 'Desktop', value: 28, color: '#10b981' },
    { name: isBn ? 'ট্যাবলেট (Tablet)' : 'Tablet', value: 4, color: '#f59e0b' },
  ];

  // Country Traffic data
  const countryData = [
    { country: isBn ? 'বাংলাদেশ' : 'Bangladesh', traffic: '54%', flag: '🇧🇩', visitors: '8.4K' },
    { country: isBn ? 'যুক্তরাষ্ট্র' : 'United States', traffic: '22%', flag: '🇺🇸', visitors: '3.4K' },
    { country: isBn ? 'যুক্তরাজ্য' : 'United Kingdom', traffic: '11%', flag: '🇬🇧', visitors: '1.7K' },
    { country: isBn ? 'ভারত' : 'India', traffic: '8%', flag: '🇮🇳', visitors: '1.2K' },
    { country: isBn ? 'অন্যান্য' : 'Global / Other', traffic: '5%', flag: '🌐', visitors: '0.8K' },
  ];

  // Radar Chart Data for Competitor Market Share
  const radarComparisonData = [
    {
      subject: isBn ? 'সার্চ উপস্থিতি' : 'Search Visibility',
      YourSite: competitorStats.searchVisibility.you,
      Competitor: competitorStats.searchVisibility.comp,
      fullMark: 100,
    },
    {
      subject: isBn ? 'কি-ওয়ার্ড আধিপত্য' : 'Keyword Dominance',
      YourSite: competitorStats.keywordDominance.you,
      Competitor: competitorStats.keywordDominance.comp,
      fullMark: 100,
    },
    {
      subject: isBn ? 'পেজ স্পিড (CWV)' : 'Page Speed (CWV)',
      YourSite: competitorStats.siteSpeed.you,
      Competitor: competitorStats.siteSpeed.comp,
      fullMark: 100,
    },
    {
      subject: isBn ? 'ব্যাকলিংক অথরিটি' : 'Backlink Authority',
      YourSite: competitorStats.backlinkAuthority.you,
      Competitor: competitorStats.backlinkAuthority.comp,
      fullMark: 100,
    },
    {
      subject: isBn ? 'ইনডেক্সিং গতি' : 'Indexing Speed',
      YourSite: competitorStats.crawlFreshness.you,
      Competitor: competitorStats.crawlFreshness.comp,
      fullMark: 100,
    },
    {
      subject: isBn ? 'ক্লিক রেট (CTR)' : 'Click Engagement',
      YourSite: competitorStats.clickEngagement.you,
      Competitor: competitorStats.clickEngagement.comp,
      fullMark: 100,
    },
  ];

  const handleSyncGsc = () => {
    setIsSyncing(true);
    sounds.playSoftClick();
    setTimeout(() => {
      setIsSyncing(false);
      sounds.playLuxuryChime();
    }, 900);
  };

  const handleAddKeyword = () => {
    if (!newKeywordInput.trim()) return;
    const newKw: KeywordRankHistory = {
      id: Date.now().toString(),
      keyword: newKeywordInput.trim(),
      currentRank: Math.floor(Math.random() * 4) + 1, // rank 1 to 4
      initialRank: Math.floor(Math.random() * 25) + 20,
      change: Math.floor(Math.random() * 20) + 10,
      clicks: Math.floor(Math.random() * 900) + 300,
      impressions: Math.floor(Math.random() * 15000) + 5000,
      ctr: +(Math.random() * 3 + 3.5).toFixed(2),
      serpFeatures: ['Rich Snippets', 'Site Links'],
    };

    setTrackedKeywords([newKw, ...trackedKeywords]);
    onUpdateProject({
      keywords: Array.from(new Set([...project.keywords, newKeywordInput.trim()])),
    });
    setNewKeywordInput('');
    sounds.playLuxuryChime();
  };

  const handleDeleteKeyword = (id: string) => {
    setTrackedKeywords(trackedKeywords.filter((k) => k.id !== id));
    sounds.playSoftClick();
  };

  const handleExportCsv = () => {
    let csv = 'Keyword,Current Rank,Initial Rank,Change,Clicks,Impressions,CTR\n';
    trackedKeywords.forEach((k) => {
      csv += `"${k.keyword}",${k.currentRank},${k.initialRank},+${k.change},${k.clicks},${k.impressions},${k.ctr}%\n`;
    });
    downloadFile(`google-search-analytics-${Date.now()}.csv`, csv, 'text/csv');
    sounds.playSoftClick();
  };

  const [isExportingPdf, setIsExportingPdf] = useState(false);

  const handleExportPdf = () => {
    setIsExportingPdf(true);
    sounds.playSoftClick();

    setTimeout(() => {
      try {
        generateAnalyticsPdfReport({
          project,
          language,
          timeRange,
          totalClicks,
          totalImpressions,
          avgCtr,
          avgPosition,
          trackedKeywords,
        });

        sounds.playLuxuryChime();
        confetti({
          particleCount: 55,
          spread: 65,
          origin: { y: 0.6 },
        });
      } catch (err) {
        console.error('PDF generation error:', err);
      } finally {
        setIsExportingPdf(false);
      }
    }, 350);
  };

  // Totals
  const totalClicks = trafficData.reduce((acc, d) => acc + d.clicks, 0);
  const totalImpressions = trafficData.reduce((acc, d) => acc + d.impressions, 0);
  const avgCtr = +(totalClicks / totalImpressions * 100).toFixed(2);
  const avgPosition = 2.8;

  // Futuristic Level Up SEO Gamification
  const [userXp, setUserXp] = useState(8750);
  const [userLevel, setUserLevel] = useState(7);
  const [levelUpNotif, setLevelUpNotif] = useState<string | null>(null);
  const [customizerOpen, setCustomizerOpen] = useState(false);

  const handleAddXp = (amount: number) => {
    const newXp = userXp + amount;
    sounds.playLuxuryChime();
    confetti({
      particleCount: 75,
      spread: 70,
      origin: { y: 0.6 }
    });

    if (newXp >= 10000) {
      setUserLevel((l) => l + 1);
      setUserXp(newXp - 10000);
      setLevelUpNotif(isBn ? '🚀 লেভেল আপ! আপনি এখন লেভেল ৮ সুপ্রিম সার্চ টাইটান!' : '🚀 LEVEL UP! You reached Level 8 Supreme SERP Titan!');
    } else {
      setUserXp(newXp);
      setLevelUpNotif(isBn ? `⚡ +${amount} এক্সপি অর্জিত! র্যাঙ্কিং অথরিটি বৃদ্ধি পেয়েছে।` : `⚡ +${amount} XP Claimed! Search Authority Boosted.`);
    }

    setTimeout(() => setLevelUpNotif(null), 3500);
  };

  const handleLevelUpBoost = () => {
    handleAddXp(450);
  };

  // Custom Interactive Tooltip with Granular Session Metadata for Recharts AreaChart
  const CustomTrafficTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const dataPoint = payload[0].payload;
      return (
        <div className="bg-slate-950/95 border border-indigo-500/50 p-4 rounded-2xl shadow-2xl backdrop-blur-xl text-xs space-y-3 font-sans min-w-[290px] max-w-[340px] relative overflow-hidden animate-fade-in ring-1 ring-white/10 z-50">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-amber-500" />
          
          <div className="flex items-center justify-between gap-3 pb-2 border-b border-slate-800">
            <span className="font-mono font-bold text-white text-sm flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-blue-400" />
              <span>{label}</span>
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>LIVE TELEMETRY</span>
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-0.5">
              <span className="text-[10px] text-slate-400 font-medium block">
                {isBn ? 'অর্গানিক ক্লিক:' : 'Organic Clicks:'}
              </span>
              <div className="text-base font-black text-blue-400 font-mono">
                {dataPoint.clicks.toLocaleString()}
              </div>
              <span className="text-[10px] text-emerald-400 font-mono">
                +28.4% MoM
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-0.5">
              <span className="text-[10px] text-slate-400 font-medium block">
                {isBn ? 'সার্চ ইমপ্রেশন:' : 'Impressions:'}
              </span>
              <div className="text-base font-black text-purple-400 font-mono">
                {dataPoint.impressions.toLocaleString()}
              </div>
              <span className="text-[10px] text-purple-300 font-mono">
                CTR: {dataPoint.ctr}%
              </span>
            </div>
          </div>

          {/* Granular Session Metadata */}
          <div className="p-2.5 rounded-xl bg-indigo-950/40 border border-indigo-500/30 space-y-1.5 text-[11px]">
            <span className="text-[10px] font-mono text-indigo-300 font-bold uppercase tracking-wider block">
              {isBn ? 'গ্র্যানুলার সেশন মেটাডাটা:' : 'Granular Session Metadata:'}
            </span>

            <div className="flex items-center justify-between text-slate-300">
              <span className="flex items-center gap-1.5 text-slate-400">
                <Clock className="w-3 h-3 text-amber-400" />
                <span>{isBn ? 'গড় সেশন স্থায়ীত্ব:' : 'Avg Session Duration:'}</span>
              </span>
              <strong className="font-mono text-amber-300">{dataPoint.avgSessionDuration || '3m 38s'}</strong>
            </div>

            <div className="flex items-center justify-between text-slate-300">
              <span className="flex items-center gap-1.5 text-slate-400">
                <Users className="w-3 h-3 text-blue-400" />
                <span>{isBn ? 'সক্রিয় ইউজার সেশন:' : 'Active Sessions:'}</span>
              </span>
              <strong className="font-mono text-white">{dataPoint.activeSessions || 340}</strong>
            </div>

            <div className="flex items-center justify-between text-slate-300">
              <span className="flex items-center gap-1.5 text-slate-400">
                <Activity className="w-3 h-3 text-emerald-400" />
                <span>{isBn ? 'বাউন্স ভেলোসিটি:' : 'Bounce Velocity:'}</span>
              </span>
              <strong className="font-mono text-emerald-400">{dataPoint.bounceRate || '21.4%'}</strong>
            </div>

            <div className="flex items-center justify-between text-slate-300 pt-1 border-t border-indigo-500/20">
              <span className="text-slate-400">{isBn ? 'প্রধান সোর্স:' : 'Dominant Source:'}</span>
              <span className="font-mono text-[10px] text-blue-300 truncate max-w-[130px]">{dataPoint.dominantSource || 'Googlebot Mobile'}</span>
            </div>

            <div className="flex items-center justify-between text-slate-300">
              <span className="text-slate-400">{isBn ? 'এনগেজমেন্ট স্কোর:' : 'Engagement Score:'}</span>
              <span className="font-mono text-[10px] text-amber-400 font-bold">
                {dataPoint.engagementScore || 96}/100 ★★★★★
              </span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  // Custom Interactive Tooltip for Keyword Ranking LineChart
  const CustomKeywordRankTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const dataPoint = payload[0].payload;
      return (
        <div className="bg-slate-950/95 border border-amber-500/40 p-4 rounded-2xl shadow-2xl backdrop-blur-xl text-xs space-y-3 font-sans min-w-[270px] relative overflow-hidden ring-1 ring-white/10 animate-fade-in z-50">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-emerald-500 to-blue-500" />
          
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="font-bold text-white font-mono flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>{label}</span>
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              RANK RADAR
            </span>
          </div>

          <div className="space-y-1.5">
            {payload.map((entry: any, i: number) => {
              const rankVal = entry.value;
              const isFirst = rankVal === 1;
              return (
                <div key={i} className="flex items-center justify-between gap-3 p-1.5 rounded-lg bg-slate-900 border border-slate-800">
                  <div className="flex items-center gap-2 truncate">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.stroke || entry.color }} />
                    <span className="text-slate-300 truncate max-w-[140px] font-medium">{entry.name}</span>
                  </div>
                  <div className="flex items-center gap-1 font-mono font-bold">
                    <span className={isFirst ? 'text-amber-400' : 'text-emerald-400'}>
                      Rank #{rankVal}
                    </span>
                    {isFirst && <Award className="w-3 h-3 text-amber-400" />}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-[10px] space-y-1 text-slate-400">
            <div className="flex items-center justify-between">
              <span>{isBn ? 'সার্প ফিচার অ্যাক্টিভ:' : 'SERP Features:'}</span>
              <span className="text-emerald-400 font-semibold font-mono">
                {dataPoint.serpFeatures ? dataPoint.serpFeatures.slice(0, 2).join(', ') : 'Featured Snippet'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>{isBn ? 'আনুমানিক ট্র্যাফিক:' : 'Est. Monthly Traffic:'}</span>
              <span className="text-blue-400 font-bold font-mono">{dataPoint.estMonthlyTraffic || '18.4K/mo'}</span>
            </div>
            <div className="flex items-center justify-between pt-0.5 border-t border-slate-800">
              <span>{isBn ? 'অডিট কনফিডেন্স:' : 'Audit Confidence:'}</span>
              <span className="text-amber-300 font-mono">{dataPoint.auditConfidence || '99.4%'}</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto font-sans relative">
      
      {/* Futuristic Cyber Ambient Animation Background */}
      <div className="fixed inset-0 pointer-events-none opacity-20 overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-indigo-600/15 rounded-full blur-[140px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '6s' }} />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      {/* SUPER STICK EXECUTIVE HUD BAR */}
      <div className="sticky top-2 z-40 bg-slate-950/90 backdrop-blur-xl border border-indigo-500/40 px-4 py-2.5 rounded-2xl shadow-2xl flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <span className="font-mono font-bold text-amber-300 flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-amber-500/15 border border-amber-500/30">
            <span>👑 LEVEL {userLevel} TITAN</span>
          </span>
          <span className="text-slate-600 hidden sm:inline">|</span>
          <span className="flex items-center gap-1.5 text-emerald-400 font-mono font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>142 Active Users</span>
          </span>
          <span className="text-slate-600 hidden md:inline">|</span>
          <span className="text-blue-300 font-mono hidden md:inline">
            CTR: <strong>{avgCtr}%</strong>
          </span>
          <span className="text-slate-600 hidden lg:inline">|</span>
          <span className="text-amber-300 font-mono hidden lg:inline">
            Rank: <strong>#{avgPosition}</strong>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setCustomizerOpen(true);
              sounds.playSoftClick();
            }}
            className="px-3 py-1 rounded-xl bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-300 border border-indigo-500/40 font-bold text-[11px] transition flex items-center gap-1.5 shadow"
            title="Futuristic Game Customizer: Cars, Outfits, Colors, Synth Music"
          >
            <Sliders className="w-3 h-3 text-amber-400" />
            <span>{isBn ? 'গেম সেটিংস' : 'Game Settings'}</span>
          </button>

          <button
            onClick={handleLevelUpBoost}
            className="px-3 py-1 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-black text-[11px] shadow-md shadow-amber-500/20 hover:scale-105 active:scale-95 transition flex items-center gap-1"
          >
            <Zap className="w-3 h-3 fill-current text-slate-950" />
            <span>Level Up (+450 XP)</span>
          </button>

          <button
            onClick={handleExportPdf}
            disabled={isExportingPdf}
            className="px-3 py-1 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-[11px] transition flex items-center gap-1 shadow"
          >
            <FileText className="w-3 h-3" />
            <span>PDF</span>
          </button>
        </div>
      </div>

      {levelUpNotif && (
        <div className="p-3 bg-gradient-to-r from-amber-500/20 via-yellow-500/20 to-indigo-500/20 border border-amber-500/50 rounded-2xl text-xs text-amber-200 flex items-center justify-between shadow-2xl animate-bounce">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <strong className="font-bold">{levelUpNotif}</strong>
          </div>
          <span className="font-mono text-[10px] text-amber-400">XP: {userXp}/10000</span>
        </div>
      )}

      {/* FUTURISTIC LEVEL UP & POWER PROGRESSION DECK */}
      <div className="bg-gradient-to-r from-indigo-950/70 via-slate-900 to-slate-950 border border-indigo-500/30 p-5 rounded-2xl shadow-xl space-y-3 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-800/80 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center font-black">
              L{userLevel}
            </div>
            <div>
              <h4 className="font-black text-white text-sm flex items-center gap-1.5">
                <span>{isBn ? 'লেভেল ৭: সার্বভৌম সার্চ ইঞ্জিন টাইটান' : 'Level 7: Sovereign SERP Titan'}</span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  TOP 0.1% ARCHITECTURE
                </span>
              </h4>
              <p className="text-[11px] text-slate-400">
                {isBn ? 'প্রতিটি গুগল অডিট এবং এসইও অপ্টিমাইজেশনের মাধ্যমে লেভেল আপ এক্সপি অর্জন করুন।' : 'Earn XP via Google Search audits, rich schema deployment, and Core Web Vitals optimizations.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-amber-300 font-bold">
              {userXp.toLocaleString()} / 10,000 XP
            </span>
            <button
              onClick={handleLevelUpBoost}
              className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition shadow-md flex items-center gap-1"
            >
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>Claim +450 XP</span>
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-950 rounded-full h-3 p-0.5 border border-slate-800 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-indigo-500 via-blue-500 to-amber-400 h-full rounded-full transition-all duration-500 shadow-lg shadow-amber-500/20"
            style={{ width: `${Math.min(100, (userXp / 10000) * 100)}%` }}
          />
        </div>

        <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-400 pt-1">
          <span>Active Perks: <strong className="text-emerald-400 font-mono">Sub-50ms Edge Cache</strong> · <strong className="text-blue-400 font-mono">Auto Rich FAQ Schema</strong> · <strong className="text-amber-400 font-mono">AI High-CTR Generator</strong></span>
          <span className="text-amber-300 font-mono">Next Tier: Realtime SERP Emperor</span>
        </div>
      </div>
      
      {/* Top Banner & Time Range Controls */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-950 via-[#0a0f1d] to-slate-950 border border-slate-800 p-6 shadow-xl">
        <div className="absolute top-0 right-1/3 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 font-bold tracking-wide">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>GOOGLE SEARCH CONSOLE ANALYTICS</span>
              </span>
              <span className="text-slate-500">·</span>
              <span className="text-emerald-400 font-mono text-[11px] font-semibold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Live Googlebot Traffic Data</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {isBn 
                ? 'গুগল সার্চ ট্র্যাফিক ও কি-ওয়ার্ড র্যাংকিং অগ্রগতি' 
                : 'Search Traffic Trends & Keyword Ranking Improvements'}
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              {isBn
                ? 'আপনার ওয়েবসাইটের গুগল সার্চ ইমপ্রেশন, অর্গানিক ক্লিক এবং ১ম পেজে কি-ওয়ার্ডের অবস্থানের লাইভ চার্ট ও বিশ্লেষণ।'
                : 'Track impressions, organic clicks, average CTR, and upward keyword trajectory toward Google Rank #1.'}
            </p>
          </div>

          {/* Time range selector & sync */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="bg-slate-900 p-1 rounded-xl flex items-center border border-slate-800 text-xs">
              {(['7d', '28d', '3m', '12m'] as const).map((range) => (
                <button
                  key={range}
                  onClick={() => {
                    setTimeRange(range);
                    sounds.playSoftClick();
                  }}
                  className={`px-3 py-1.5 rounded-lg font-bold transition ${
                    timeRange === range
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {range === '7d' ? (isBn ? '৭ দিন' : '7 Days') : range === '28d' ? (isBn ? '২৮ দিন' : '28 Days') : range === '3m' ? (isBn ? '৩ মাস' : '3 Months') : (isBn ? '১ বছর' : '1 Year')}
                </button>
              ))}
            </div>

            <button
              onClick={handleSyncGsc}
              disabled={isSyncing}
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition"
              title="Sync Live GSC Data"
            >
              <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin text-blue-400' : ''}`} />
            </button>

            <button
              onClick={handleExportCsv}
              className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 font-bold text-xs flex items-center gap-1.5 transition"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isBn ? 'CSV রিপোর্ট' : 'Export CSV'}</span>
            </button>

            <button
              onClick={handleExportPdf}
              disabled={isExportingPdf}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-600 via-pink-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 transition shadow-lg shadow-rose-600/25 active:scale-95 disabled:opacity-50"
              title="Download High-Resolution PDF Analytics Report"
            >
              <FileText className={`w-3.5 h-3.5 ${isExportingPdf ? 'animate-bounce text-amber-300' : 'text-amber-300'}`} />
              <span>{isExportingPdf ? (isBn ? 'PDF তৈরি হচ্ছে...' : 'Generating PDF...') : (isBn ? 'PDF রিপোর্ট ডাউনলোড' : 'Download PDF')}</span>
            </button>
          </div>

        </div>
      </div>

      {/* Real-Time Visitor Traffic Monitor & 5-Minute Surge Detection Alert System */}
      <RealtimeTrafficMonitor 
        language={language} 
        projectName={project.name} 
      />

      {/* AI Voice Assistant for Natural Language Site Performance Queries */}
      <AiVoiceAssistant 
        project={project}
        language={language}
        analyticsContext={{
          totalClicks,
          totalImpressions,
          avgCtr,
          avgPosition,
          activeVisitors: 142,
          topKeywords: [
            { keyword: 'Cloud SEO Architecture', position: 1, clicks: 4820, ctr: 18.4 },
            { keyword: 'Fast Google Indexing', position: 2, clicks: 3210, ctr: 14.2 },
            { keyword: 'Next-gen Core Web Vitals', position: 3, clicks: 2890, ctr: 12.1 },
          ],
          deviceSplit: { desktop: 68, mobile: 28, tablet: 4 },
          recentSurge: '+28% surge in rolling 5m window',
          topClickHotspot: 'Hero Primary CTA (42.6% click share)',
        }}
      />

      {/* 4 Executive KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Clicks */}
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800/90 p-5 space-y-3 relative overflow-hidden shadow-lg">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold flex items-center gap-1.5">
              <MousePointerClick className="w-4 h-4 text-blue-400" />
              <span>{isBn ? 'মোট অর্গানিক ক্লিক' : 'Total Organic Clicks'}</span>
            </span>
            <span className="text-emerald-400 font-bold flex items-center text-[11px]">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>+28.4%</span>
            </span>
          </div>
          <div className="text-3xl font-black text-white tracking-tight">
            {totalClicks.toLocaleString()}
          </div>
          <p className="text-[11px] text-slate-500">
            {isBn ? 'গুগল সার্চ থেকে সরাসরি ভিজিট' : 'Direct search result visits from Google'}
          </p>
        </div>

        {/* Total Impressions */}
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800/90 p-5 space-y-3 relative overflow-hidden shadow-lg">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-purple-400" />
              <span>{isBn ? 'মোট ইমপ্রেশন' : 'Total Impressions'}</span>
            </span>
            <span className="text-emerald-400 font-bold flex items-center text-[11px]">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>+41.2%</span>
            </span>
          </div>
          <div className="text-3xl font-black text-white tracking-tight">
            {totalImpressions.toLocaleString()}
          </div>
          <p className="text-[11px] text-slate-500">
            {isBn ? 'সার্চ ফলাফলে সাইট প্রদর্শনের সংখ্যা' : 'Times site appeared in search results'}
          </p>
        </div>

        {/* Average CTR */}
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800/90 p-5 space-y-3 relative overflow-hidden shadow-lg">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold flex items-center gap-1.5">
              <Percent className="w-4 h-4 text-emerald-400" />
              <span>{isBn ? 'গড় ক্লিক রেট (CTR)' : 'Average Click-Through (CTR)'}</span>
            </span>
            <span className="text-emerald-400 font-bold flex items-center text-[11px]">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>+0.8%</span>
            </span>
          </div>
          <div className="text-3xl font-black text-white tracking-tight">
            {avgCtr}%
          </div>
          <p className="text-[11px] text-slate-500">
            {isBn ? 'উচ্চ ক্লিক রেট মেটা ট্যাগের প্রভাব' : 'Driven by high-converting meta tags'}
          </p>
        </div>

        {/* Average Position */}
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800/90 p-5 space-y-3 relative overflow-hidden shadow-lg">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-400" />
              <span>{isBn ? 'গড় গুগল পজিশন' : 'Average Google Position'}</span>
            </span>
            <span className="text-emerald-400 font-bold flex items-center text-[11px]">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>▲ +18 Pos</span>
            </span>
          </div>
          <div className="text-3xl font-black text-amber-400 tracking-tight flex items-baseline gap-1">
            <span>#{avgPosition}</span>
            <span className="text-xs text-slate-400 font-normal">
              {isBn ? '(১ম পেজ)' : '(Top 3 SERP)'}
            </span>
          </div>
          <p className="text-[11px] text-slate-500">
            {isBn ? 'টপ সার্চ ফলাফলে অবস্থান' : 'Prime ranking placement on Google'}
          </p>
        </div>

      </div>

      {/* Main Chart: Search Traffic Trends Over Time */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 shadow-xl space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-blue-400" />
              <span>{isBn ? 'সার্চ ট্র্যাফিক ট্রেন্ডস ওভার টাইম' : 'Google Search Traffic Trends Over Time'}</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              {isBn 
                ? 'দিন বা সপ্তাহ অনুযায়ী গুগল সার্চের ক্লিক ও ইমপ্রেশন বৃদ্ধির গ্রাফ' 
                : 'Performance trajectory of clicks and impressions delivered by Googlebot.'}
            </p>
          </div>

          {/* Metric Filter */}
          <div className="flex items-center gap-1.5 text-xs bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setSelectedMetric('all')}
              className={`px-3 py-1 rounded-lg font-semibold transition ${
                selectedMetric === 'all' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              {isBn ? 'সবগুলো' : 'All Metrics'}
            </button>
            <button
              onClick={() => setSelectedMetric('clicks')}
              className={`px-3 py-1 rounded-lg font-semibold transition ${
                selectedMetric === 'clicks' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              {isBn ? 'শুধু ক্লিক' : 'Clicks'}
            </button>
            <button
              onClick={() => setSelectedMetric('impressions')}
              className={`px-3 py-1 rounded-lg font-semibold transition ${
                selectedMetric === 'impressions' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              {isBn ? 'ইমপ্রেশন' : 'Impressions'}
            </button>
          </div>
        </div>

        {/* Recharts Area / Line Chart */}
        <div className="h-72 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trafficData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="clicksGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="impGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis dataKey="date" stroke="#64748b" fontSize={11} tickLine={false} />
              <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
              <Tooltip content={<CustomTrafficTooltip />} />
              <Legend 
                wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} 
              />
              {(selectedMetric === 'all' || selectedMetric === 'impressions') && (
                <Area 
                  type="monotone" 
                  dataKey="impressions" 
                  name={isBn ? 'ইমপ্রেশন (Impressions)' : 'Impressions'} 
                  stroke="#a855f7" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#impGrad)" 
                />
              )}
              {(selectedMetric === 'all' || selectedMetric === 'clicks') && (
                <Area 
                  type="monotone" 
                  dataKey="clicks" 
                  name={isBn ? 'ক্লিক (Clicks)' : 'Organic Clicks'} 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#clicksGrad)" 
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* User Journey Timeline (24-Hour Key Interactions & Session Duration Peaks) */}
      <UserJourneyTimeline 
        language={language}
      />

      {/* 7-Day Session Activity Heatmap Matrix */}
      <SessionActivityHeatmap 
        language={language}
        onLevelUp={handleLevelUpBoost}
      />

      {/* Visual Click Heatmap & High-Engagement Zones */}
      <VisualClickHeatmap 
        language={language} 
        projectName={project.name} 
      />

      {/* Dedicated Monetization Performance & Ad Revenue Velocity Section */}
      <MonetizationPerformanceSection
        language={language}
        timeRange={timeRange}
        projectName={project.name}
      />

      {/* Second Chart: Keyword Ranking Improvements Over Time */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Recharts Line Chart showing Trajectory to Rank #1 (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900/90 rounded-2xl border border-slate-800 p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400" />
                <span>{isBn ? 'কি-ওয়ার্ড র্যাংকিং অগ্রগতি (#1 পজিশনের দিকে)' : 'Keyword Ranking Improvements Over Time'}</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {isBn 
                  ? 'গুগল সার্চে কি-ওয়ার্ডগুলো যেভাবে পেজ ৪ থেকে ১ম পেজে উঠে এসেছে' 
                  : 'Track your primary keyword ascension from deep pages up to Google Rank #1.'}
              </p>
            </div>
            <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2.5 py-1 rounded-lg">
              Rank #1 Focused
            </span>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={keywordTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="period" stroke="#64748b" fontSize={11} tickLine={false} />
                {/* Note: reversed so Rank #1 is at the top of the chart! */}
                <YAxis 
                  reversed={true} 
                  domain={[1, 45]} 
                  stroke="#64748b" 
                  fontSize={11} 
                  tickLine={false} 
                  tickFormatter={(val) => `#${val}`}
                />
                <Tooltip content={<CustomKeywordRankTooltip />} />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Line 
                  type="monotone" 
                  dataKey="kw1" 
                  name={trackedKeywords[0]?.keyword || 'Target KW 1'} 
                  stroke="#f59e0b" 
                  strokeWidth={3}
                  dot={{ r: 4, fill: '#f59e0b' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="kw2" 
                  name={trackedKeywords[1]?.keyword || 'Target KW 2'} 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  dot={{ r: 4, fill: '#3b82f6' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="kw3" 
                  name={trackedKeywords[2]?.keyword || 'Target KW 3'} 
                  stroke="#10b981" 
                  strokeWidth={2}
                  dot={{ r: 4, fill: '#10b981' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="kw4" 
                  name={trackedKeywords[3]?.keyword || 'Target KW 4'} 
                  stroke="#a855f7" 
                  strokeWidth={2}
                  dot={{ r: 4, fill: '#a855f7' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="pt-2 flex items-center justify-between text-xs text-slate-400 border-t border-slate-800">
            <span>💡 {isBn ? 'চার্টে উপরের লাইন মানেই গুগলে উচ্চ র্যাংকিং (#১ পজিশন)।' : 'Top of the Y-axis represents Google Rank #1.'}</span>
            <span className="font-semibold text-amber-300">4 Keywords in Top 5</span>
          </div>
        </div>

        {/* Right: Device & Country Distribution (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Device Breakdown */}
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 shadow-xl space-y-3">
            <h4 className="text-xs font-bold text-white flex items-center gap-1.5 uppercase tracking-wider text-slate-300">
              <Smartphone className="w-3.5 h-3.5 text-blue-400" />
              <span>{isBn ? 'ডিভাইস ট্র্যাফিক শেয়ার' : 'Search Traffic by Device'}</span>
            </h4>

            <div className="space-y-2.5 pt-1">
              {deviceData.map((d, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300 font-medium">{d.name}</span>
                    <span className="font-bold text-white">{d.value}%</span>
                  </div>
                  <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                    <div 
                      className="h-full rounded-full transition-all duration-700" 
                      style={{ width: `${d.value}%`, backgroundColor: d.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Search Countries */}
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 shadow-xl space-y-3">
            <h4 className="text-xs font-bold text-white flex items-center gap-1.5 uppercase tracking-wider text-slate-300">
              <Globe className="w-3.5 h-3.5 text-emerald-400" />
              <span>{isBn ? 'শীর্ষ ট্র্যাফিক দেশসমূহ' : 'Top Geographic Search Volume'}</span>
            </h4>

            <div className="space-y-2">
              {countryData.map((c, i) => (
                <div 
                  key={i} 
                  className="flex items-center justify-between p-2 rounded-xl bg-slate-950 border border-slate-800/80 text-xs"
                >
                  <span className="flex items-center gap-2 text-slate-200">
                    <span className="text-base leading-none">{c.flag}</span>
                    <span>{c.country}</span>
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 text-[11px] font-mono">{c.visitors} clicks</span>
                    <span className="font-bold text-emerald-400 font-mono">{c.traffic}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Tracked Keywords Table & Add Keyword Form */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 shadow-xl space-y-5">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Search className="w-4 h-4 text-blue-400" />
              <span>{isBn ? 'ট্র্যাক করা কি-ওয়ার্ডের পারফরম্যান্স ও র্যাংক' : 'Tracked Keyword Ranking Matrix'}</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              {isBn 
                ? 'গুগল সার্চ ফলাফলে আপনার নির্বাচিত কি-ওয়ার্ডগুলোর বর্তমান অবস্থা ও ক্লিক রেট' 
                : 'Real-time search positions, CTR, and SERP feature badges for target queries.'}
            </p>
          </div>

          {/* Add custom tracked keyword & Export */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleExportPdf}
              disabled={isExportingPdf}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition shrink-0"
              title="Export Keyword Matrix as PDF"
            >
              <FileText className="w-3.5 h-3.5 text-rose-400" />
              <span className="hidden sm:inline">PDF</span>
            </button>

            <input
              type="text"
              value={newKeywordInput}
              onChange={(e) => setNewKeywordInput(e.target.value)}
              placeholder={isBn ? 'নতুন কি-ওয়ার্ড লিখুন...' : 'Add new keyword to track...'}
              className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
            />
            <button
              onClick={handleAddKeyword}
              disabled={!newKeywordInput.trim()}
              className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-1 transition shrink-0"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{isBn ? 'যোগ করুন' : 'Add'}</span>
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead>
              <tr className="border-b border-slate-800 text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                <th className="pb-3 pl-2">{isBn ? 'সার্চ কি-ওয়ার্ড' : 'Search Query / Keyword'}</th>
                <th className="pb-3 text-center">{isBn ? 'বর্তমান র্যাংক' : 'Google Rank'}</th>
                <th className="pb-3 text-center">{isBn ? 'উন্নতি' : 'Change'}</th>
                <th className="pb-3 text-right">{isBn ? 'ক্লিক' : 'Clicks'}</th>
                <th className="pb-3 text-right">{isBn ? 'ইমপ্রেশন' : 'Impressions'}</th>
                <th className="pb-3 text-right">{isBn ? 'সিটিআর' : 'CTR'}</th>
                <th className="pb-3 text-center">{isBn ? 'সার্চ ফিচার' : 'SERP Features'}</th>
                <th className="pb-3 text-right pr-2">{isBn ? 'অ্যাকশন' : 'Action'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {trackedKeywords.map((k) => (
                <tr key={k.id} className="hover:bg-slate-950/60 transition group">
                  <td className="py-3 pl-2 font-medium text-white">
                    <span className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                      <span>{k.keyword}</span>
                    </span>
                  </td>
                  <td className="py-3 text-center">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-md font-mono font-bold text-xs ${
                      k.currentRank === 1 
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' 
                        : k.currentRank <= 3 
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
                        : 'bg-slate-800 text-slate-300'
                    }`}>
                      #{k.currentRank}
                    </span>
                  </td>
                  <td className="py-3 text-center font-mono font-bold text-emerald-400 text-xs">
                    ▲ +{k.change}
                  </td>
                  <td className="py-3 text-right font-mono font-medium text-slate-200">
                    {k.clicks.toLocaleString()}
                  </td>
                  <td className="py-3 text-right font-mono text-slate-400">
                    {k.impressions.toLocaleString()}
                  </td>
                  <td className="py-3 text-right font-mono font-bold text-emerald-400">
                    {k.ctr}%
                  </td>
                  <td className="py-3 text-center">
                    <div className="flex items-center justify-center gap-1.5 flex-wrap">
                      {k.serpFeatures.map((f, fi) => (
                        <span key={fi} className="text-[10px] bg-slate-950 px-2 py-0.5 rounded border border-slate-800 text-slate-400 font-mono">
                          {f}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3 text-right pr-2">
                    <button
                      onClick={() => handleDeleteKeyword(k.id)}
                      className="text-slate-500 hover:text-rose-400 p-1 transition"
                      title="Remove keyword"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

      {/* NEW MODULE: Competitor Market Share Radar Chart Comparison */}
      <div className="bg-gradient-to-br from-slate-950 via-[#0c1222] to-slate-950 rounded-2xl border border-blue-500/30 p-6 md:p-8 shadow-2xl space-y-6">
        
        {/* Module Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold">
              <Swords className="w-3.5 h-3.5" />
              <span>{isBn ? 'প্রতিদ্বন্দ্বী ডোমেইন মার্কেট শেয়ার অ্যানালাইজার' : 'Competitor Domain Market Share Analyzer'}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {isBn 
                ? 'রাডার চার্ট দিয়ে প্রতিদ্বন্দ্বী ওয়েবসাইটের সাথে মার্কেট শেয়ার তুলনা' 
                : 'Market Share & Organic SEO Comparison (Radar Chart)'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              {isBn
                ? 'যেকোনো প্রতিদ্বন্দ্বী ডোমেইন ইনপুট করুন এবং সার্চ উপস্থিতি, কি-ওয়ার্ড দখল, লোডিং স্পিড ও ইনডেক্সিং গতির বহুমুখী তুলনা দেখুন।'
                : 'Input any competitor domain to benchmark search visibility, keyword authority, speed, and indexing coverage using a multi-axis Radar chart.'}
            </p>
          </div>

          {/* Overall Market Share Pill Display */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center gap-4 min-w-[240px] shrink-0">
            <div className="text-center flex-1">
              <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider block">
                {isBn ? 'আপনার সাইট' : 'Your Site'}
              </span>
              <span className="text-2xl font-black text-blue-400 font-mono">
                {competitorStats.yourMarketShare}%
              </span>
            </div>
            <div className="h-8 w-px bg-slate-800"></div>
            <div className="text-center flex-1">
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block truncate max-w-[100px]" title={activeCompetitor}>
                {activeCompetitor}
              </span>
              <span className="text-2xl font-black text-amber-400 font-mono">
                {competitorStats.competitorMarketShare}%
              </span>
            </div>
          </div>
        </div>

        {/* Competitor Domain Input Form */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
          <div className="flex flex-col sm:flex-row items-center gap-2.5">
            <div className="relative flex-1 w-full">
              <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                value={competitorInput}
                onChange={(e) => setCompetitorInput(e.target.value)}
                placeholder={isBn ? 'প্রতিদ্বন্দ্বী ওয়েবসাইটের ডোমেইন দিন (যেমন: rival-site.com)...' : 'Enter competitor domain (e.g. competitor.com)...'}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 font-mono"
              />
            </div>

            <button
              onClick={() => handleAnalyzeCompetitor()}
              disabled={isScanningCompetitor || !competitorInput.trim()}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50 text-white font-bold text-xs flex items-center justify-center gap-2 transition shrink-0 shadow-lg shadow-blue-600/25 active:scale-95"
            >
              <Swords className={`w-4 h-4 ${isScanningCompetitor ? 'animate-spin' : ''}`} />
              <span>
                {isScanningCompetitor 
                  ? (isBn ? 'অ্যানালাইজ হচ্ছে...' : 'Benchmarking Domain...') 
                  : (isBn ? 'মার্কেট শেয়ার তুলনা করুন' : 'Compare Market Share')}
              </span>
            </button>
          </div>

          {/* Quick preset suggestions */}
          <div className="flex items-center gap-2 text-xs overflow-x-auto scrollbar-none pt-1">
            <span className="text-slate-500 text-[11px] shrink-0 font-medium">
              {isBn ? 'নমুনা প্রতিদ্বন্দ্বী:' : 'Popular Benchmarks:'}
            </span>
            {['rival-tech.com', 'market-leader.io', 'competitor-seo.org'].map((preset) => (
              <button
                key={preset}
                onClick={() => {
                  setCompetitorInput(preset);
                  handleAnalyzeCompetitor(preset);
                }}
                className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-[11px] font-mono whitespace-nowrap transition"
              >
                {preset}
              </button>
            ))}
          </div>
        </div>

        {/* Main Radar Visualizer & Metric Scorecard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Radar Chart (7 cols) */}
          <div className="lg:col-span-7 bg-slate-950 rounded-2xl border border-slate-800/90 p-4 shadow-xl flex flex-col items-center">
            
            <div className="w-full flex items-center justify-between px-2 pt-1 pb-2 border-b border-slate-800/80 text-xs">
              <span className="font-bold text-white flex items-center gap-1.5">
                <Target className="w-4 h-4 text-blue-400" />
                <span>6-Point SEO & Market Share Radar</span>
              </span>
              <div className="flex items-center gap-3 text-[11px] font-mono">
                <span className="flex items-center gap-1.5 text-blue-400 font-bold">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                  <span>{isBn ? 'আপনার সাইট' : 'Your Site'}</span>
                </span>
                <span className="flex items-center gap-1.5 text-amber-400 font-bold">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                  <span className="truncate max-w-[90px]">{activeCompetitor}</span>
                </span>
              </div>
            </div>

            <div className="w-full h-80 pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarComparisonData}>
                  <PolarGrid stroke="#1e293b" />
                  <PolarAngleAxis 
                    dataKey="subject" 
                    stroke="#94a3b8" 
                    tick={{ fill: '#cbd5e1', fontSize: 11, fontWeight: 500 }} 
                  />
                  <PolarRadiusAxis 
                    angle={30} 
                    domain={[0, 100]} 
                    stroke="#475569" 
                    tick={{ fill: '#64748b', fontSize: 9 }} 
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#030712', 
                      borderColor: '#334155', 
                      borderRadius: '12px', 
                      fontSize: '12px',
                      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)'
                    }} 
                  />
                  <Radar 
                    name={isBn ? 'আপনার ওয়েবসাইট' : 'Your Website'} 
                    dataKey="YourSite" 
                    stroke="#3b82f6" 
                    fill="#3b82f6" 
                    fillOpacity={0.45} 
                  />
                  <Radar 
                    name={activeCompetitor} 
                    dataKey="Competitor" 
                    stroke="#f59e0b" 
                    fill="#f59e0b" 
                    fillOpacity={0.3} 
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            <div className="text-[11px] text-slate-500 text-center pt-1 font-mono">
              {isBn 
                ? 'নীল অক্ষ বেশি বিস্তৃত মানে আপনার সাইট ওই ক্ষেত্রে প্রতিদ্বন্দ্বীকে পেছনে ফেলেছে।' 
                : 'Blue boundary expansion shows areas where your site outperforms the competitor.'}
            </div>
          </div>

          {/* Right: Comparative Breakdown & Tactical Edge (5 cols) */}
          <div className="lg:col-span-5 space-y-3.5">
            
            <h4 className="text-xs font-bold text-white flex items-center gap-1.5 uppercase tracking-wider text-slate-400">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>{isBn ? 'প্রতিদ্বন্দ্বীর সাথে সরাসরি পয়েন্ট তুলনা' : 'Direct Benchmark Comparison'}</span>
            </h4>

            <div className="space-y-2 text-xs">
              {radarComparisonData.map((m, idx) => {
                const diff = m.YourSite - m.Competitor;
                const isWinning = diff >= 0;
                return (
                  <div 
                    key={idx} 
                    className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between gap-3 font-sans"
                  >
                    <div className="space-y-0.5">
                      <span className="font-medium text-white block text-xs">{m.subject}</span>
                      <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
                        <span className="text-blue-400 font-bold">{m.YourSite}%</span>
                        <span>vs</span>
                        <span className="text-amber-400 font-bold">{m.Competitor}%</span>
                      </div>
                    </div>

                    <span className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold ${
                      isWinning ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                    }`}>
                      {isWinning ? `▲ +${diff}%` : `▼ ${diff}%`}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Tactical AI Strategy Card */}
            <div className="p-3.5 rounded-xl bg-blue-950/40 border border-blue-500/30 text-xs space-y-1.5">
              <span className="font-bold text-blue-300 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-300" />
                <span>{isBn ? 'এআই র্যাংকিং টেকটিক্যাল পরামর্শ:' : 'AI Outrank Recommendation:'}</span>
              </span>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                {isBn
                  ? `আপনার সাইট "${activeCompetitor}"-এর চেয়ে গুগল ক্লাউড পেজ লোডিং স্পিড এবং ক্রলিং গতিতে এগিয়ে আছে। আরও ১৫% মার্কেট দখল করতে আরও ৩টি রিচ স্কিমা ও ইন্টারনাল লিংক যুক্ত করুন!`
                  : `Your website dominates "${activeCompetitor}" in Core Web Vitals speed and Googlebot indexing frequency. Add 3 more high-volume long-tail keywords to gain 15% more market share!`}
              </p>
            </div>

          </div>

        </div>

      </div>

      {/* NEW PANEL: Backlinks Monitor, Growth Chart & High-Authority Opportunities */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 md:p-8 shadow-2xl space-y-6">
        
        {/* Panel Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold">
              <Link2 className="w-3.5 h-3.5" />
              <span>{isBn ? 'ডোমেইন ব্যাকলিংক মনিটর ও গ্রোথ ইঞ্জিন' : 'Domain Backlink Monitor & Authority Growth'}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {isBn 
                ? 'ব্যাকলিংক বিশ্লেষণ, গ্রোথ লাইন চার্ট ও হাই-অথরিটি সুযোগ' 
                : 'Backlinks Growth Patterns & High-Authority Opportunities'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              {isBn
                ? 'আপনার ওয়েবসাইটের মোট ব্যাকলিংক বৃদ্ধির লাইন গ্রাফ, ডু-ফলো অনুপাত এবং গুগলে দ্রুত র্যাংক করার জন্য হাই-অথরিটি ব্যাকলিংক পাওয়ার এআই সুপারিশ।'
                : 'Visualize monthly backlink accumulation, monitor active inbound references, and pitch tier-1 platforms for high-authority links.'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-3 py-1.5 rounded-xl flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>DA 68 / 100 Authority</span>
            </span>
          </div>
        </div>

        {/* 4 Backlink Metric Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              {isBn ? 'মোট ব্যাকলিংক' : 'Total Backlinks'}
            </span>
            <div className="text-2xl sm:text-3xl font-black text-cyan-400 font-mono">
              1,842
            </div>
            <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>+18.4% MoM</span>
            </span>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              {isBn ? 'রেফারিং ডোমেইন' : 'Referring Domains'}
            </span>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono">
              326
            </div>
            <span className="text-xs text-slate-400">
              {isBn ? '১০০% ইউনিক রুট আইপি' : '100% Unique Root Subnets'}
            </span>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              {isBn ? 'ডোমেইন রেটিং (DR / DA)' : 'Domain Authority (DA)'}
            </span>
            <div className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">
              68 <span className="text-xs font-normal text-slate-500">/ 100</span>
            </div>
            <span className="text-xs text-amber-300 font-medium">
              {isBn ? 'উচ্চ গুগল ট্রাস্ট স্কোর' : 'High Google Trust Tier'}
            </span>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              {isBn ? 'ডু-ফলো অনুপাত (DoFollow)' : 'DoFollow Ratio'}
            </span>
            <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">
              84%
            </div>
            <span className="text-xs text-slate-400">
              {isBn ? '১,৫৪৭ টি সরাসরি পেজর্যাংক পাস করে' : '1,547 Full Equity Links'}
            </span>
          </div>

        </div>

        {/* Growth Patterns Line Chart */}
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-cyan-400" />
                <span>{isBn ? 'মাসিক ব্যাকলিংক ও অথরিটি বৃদ্ধি চার্ট' : 'Backlink Growth Patterns Over Time'}</span>
              </h4>
              <p className="text-xs text-slate-400">
                {isBn ? 'গত ৬ মাসে অর্জিত ব্যাকলিংক ও ডোমেইন অথরিটির অগ্রগতি' : 'Track how inbound links and domain authority accumulate steadily.'}
              </p>
            </div>
            <div className="flex items-center gap-3 text-[11px] font-mono">
              <span className="flex items-center gap-1.5 text-cyan-400">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
                <span>{isBn ? 'মোট ব্যাকলিংক' : 'Total Backlinks'}</span>
              </span>
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                <span>{isBn ? 'রেফারিং ডোমেইন' : 'Referring Domains'}</span>
              </span>
              <span className="flex items-center gap-1.5 text-amber-400">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                <span>{isBn ? 'অথরিটি স্কোর' : 'Authority Score'}</span>
              </span>
            </div>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={backlinkGrowthTimeline} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="period" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#030712', 
                    borderColor: '#334155', 
                    borderRadius: '12px', 
                    fontSize: '12px' 
                  }} 
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Line 
                  type="monotone" 
                  dataKey="backlinks" 
                  name={isBn ? 'মোট ব্যাকলিংক' : 'Total Backlinks'} 
                  stroke="#06b6d4" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: '#06b6d4' }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="refDomains" 
                  name={isBn ? 'রেফারিং ডোমেইন' : 'Referring Domains'} 
                  stroke="#10b981" 
                  strokeWidth={2} 
                  dot={{ r: 4, fill: '#10b981' }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="authority" 
                  name={isBn ? 'ডোমেইন অথরিটি (DA)' : 'Domain Authority (DA)'} 
                  stroke="#f59e0b" 
                  strokeWidth={2} 
                  dot={{ r: 4, fill: '#f59e0b' }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monitored Active Backlinks Table & Add Input */}
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-800">
            <div>
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Network className="w-4 h-4 text-emerald-400" />
                <span>{isBn ? 'সক্রিয় ব্যাকলিংক তালিকা ও মনিটরিং' : 'Monitored Active Backlink Inventory'}</span>
              </h4>
              <p className="text-xs text-slate-400">
                {isBn ? 'যেসব সাইট থেকে আপনার ডোমেইনে লিংক দেওয়া হয়েছে' : 'High-authority external sites pointing to your domain.'}
              </p>
            </div>

            {/* Filter buttons */}
            <div className="flex items-center gap-1.5 text-xs bg-slate-900 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setBacklinkFilter('all')}
                className={`px-3 py-1 rounded-lg font-semibold transition ${
                  backlinkFilter === 'all' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                {isBn ? 'সবগুলো' : 'All'}
              </button>
              <button
                onClick={() => setBacklinkFilter('dofollow')}
                className={`px-3 py-1 rounded-lg font-semibold transition ${
                  backlinkFilter === 'dofollow' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                DoFollow
              </button>
              <button
                onClick={() => setBacklinkFilter('nofollow')}
                className={`px-3 py-1 rounded-lg font-semibold transition ${
                  backlinkFilter === 'nofollow' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                NoFollow
              </button>
            </div>
          </div>

          {/* Add custom backlink */}
          <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-center gap-2">
            <input
              type="text"
              value={newBacklinkUrl}
              onChange={(e) => setNewBacklinkUrl(e.target.value)}
              placeholder={isBn ? 'ব্যাকলিংক সোর্স URL (যেমন: medium.com/post...)' : 'Inbound URL (e.g. techcrunch.com/article...)'}
              className="flex-1 w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder:text-slate-500 font-mono"
            />
            <input
              type="text"
              value={newBacklinkAnchor}
              onChange={(e) => setNewBacklinkAnchor(e.target.value)}
              placeholder={isBn ? 'অ্যাঙ্কর টেক্সট...' : 'Anchor text...'}
              className="w-full sm:w-44 bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder:text-slate-500"
            />
            <button
              onClick={handleAddBacklink}
              disabled={!newBacklinkUrl.trim()}
              className="w-full sm:w-auto px-4 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white font-bold text-xs flex items-center justify-center gap-1 transition shrink-0"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{isBn ? 'ব্যাকলিংক যোগ' : 'Add Backlink'}</span>
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead>
                <tr className="border-b border-slate-800 text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                  <th className="pb-3 pl-2">{isBn ? 'সোর্স পেজ URL' : 'Source Page URL'}</th>
                  <th className="pb-3">{isBn ? 'অ্যাঙ্কর টেক্সট' : 'Anchor Text'}</th>
                  <th className="pb-3 text-center">{isBn ? 'ডোমেইন DA' : 'Domain DA'}</th>
                  <th className="pb-3 text-center">{isBn ? 'টাইপ' : 'Type'}</th>
                  <th className="pb-3 text-center">{isBn ? 'গুগল স্ট্যাটাস' : 'Googlebot Status'}</th>
                  <th className="pb-3 text-right pr-2">{isBn ? 'অ্যাকশন' : 'Action'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-sans">
                {monitoredBacklinks
                  .filter((b) => backlinkFilter === 'all' ? true : b.type.toLowerCase() === backlinkFilter)
                  .map((b) => (
                    <tr key={b.id} className="hover:bg-slate-900/60 transition">
                      <td className="py-3 pl-2 font-mono text-cyan-300">
                        <span className="flex items-center gap-2">
                          <Link2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                          <span className="truncate max-w-[220px] sm:max-w-xs">{b.sourceUrl}</span>
                        </span>
                      </td>
                      <td className="py-3 text-white font-medium">
                        "{b.anchor}"
                      </td>
                      <td className="py-3 text-center">
                        <span className="px-2 py-0.5 rounded-md font-mono font-bold text-xs bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          DA {b.da}
                        </span>
                      </td>
                      <td className="py-3 text-center font-mono text-[11px]">
                        <span className={`px-2 py-0.5 rounded ${b.type === 'DoFollow' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-400'}`}>
                          {b.type}
                        </span>
                      </td>
                      <td className="py-3 text-center">
                        <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>{b.status}</span>
                        </span>
                      </td>
                      <td className="py-3 text-right pr-2">
                        <button
                          onClick={() => handleDeleteBacklink(b.id)}
                          className="text-slate-500 hover:text-rose-400 p-1 transition"
                          title="Remove backlink"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

        </div>

        {/* HIGH-AUTHORITY BACKLINK OPPORTUNITIES & OUTREACH GENERATOR */}
        <div className="bg-gradient-to-br from-indigo-950/40 via-slate-950 to-slate-950 p-6 rounded-2xl border border-indigo-500/30 space-y-5">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs text-amber-300 font-bold mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isBn ? 'এআই ব্যাকলিংক অপরচুনিটি ইঞ্জিন' : 'AI High-Authority Backlink Opportunities'}</span>
              </div>
              <h4 className="text-base sm:text-lg font-black text-white">
                {isBn 
                  ? 'গুগলে দ্রুত এক নম্বরে আসতে টপ প্ল্যাটফর্মের ব্যাকলিংক সুযোগ' 
                  : 'High-Authority Platforms Ready for Backlink Acquisition'}
              </h4>
              <p className="text-xs text-slate-300">
                {isBn
                  ? 'নিচের হাই-অথরিটি (DA 89-98) সাইটগুলোতে আপনার প্রজেক্টের লিংক পেতে "Generate Outreach Pitch" বাটনে ক্লিক করুন।'
                  : 'Click "Generate Outreach Pitch" to automatically create personalized pitch emails to secure links.'}
              </p>
            </div>
          </div>

          {/* Opportunities Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {backlinkOpportunities.map((opp) => (
              <div 
                key={opp.id} 
                className="bg-slate-950 p-4 rounded-xl border border-slate-800 hover:border-indigo-500/40 transition space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-bold text-white text-xs leading-snug">{opp.platform}</span>
                    <span className="px-2 py-0.5 rounded font-mono font-bold text-xs bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 shrink-0">
                      DA {opp.da}
                    </span>
                  </div>

                  <p className="text-slate-400 text-xs leading-relaxed">
                    {opp.strategy}
                  </p>

                  <div className="flex items-center gap-3 text-[11px] font-mono text-slate-400 pt-1">
                    <span className="text-emerald-400 font-bold">{opp.difficulty}</span>
                    <span>·</span>
                    <span className="text-blue-400">{opp.potentialTraffic}</span>
                    <span>·</span>
                    <span className="text-slate-400">{opp.type}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleGenerateOutreachPitch(opp)}
                  className="w-full py-2 px-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition flex items-center justify-center gap-1.5 shadow"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>{isBn ? 'আউটরিচ পিচ তৈরি করুন' : 'Generate Outreach Pitch'}</span>
                </button>
              </div>
            ))}
          </div>

          {/* Slide-in Outreach Pitch Modal/Card */}
          {activeOutreachPitch && (
            <div className="mt-4 p-5 rounded-xl bg-slate-900 border border-indigo-500/50 shadow-2xl space-y-3 animate-fade-in">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-indigo-400" />
                  <span className="font-bold text-white text-xs">
                    {isBn ? 'রেডি-টু-সেন্ড আউটরিচ পিচ ইমেইল:' : 'Ready-to-Send Outreach Pitch Email:'}
                  </span>
                  <span className="text-[11px] text-amber-300 font-mono">({activeOutreachPitch.platform})</span>
                </div>
                <button
                  onClick={() => setActiveOutreachPitch(null)}
                  className="text-slate-400 hover:text-white text-xs px-2 py-0.5 rounded bg-slate-800"
                >
                  ✕ {isBn ? 'বন্ধ' : 'Close'}
                </button>
              </div>

              <div className="space-y-2 text-xs font-mono">
                <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-300">
                  <span className="text-indigo-400 font-bold block mb-1">Subject:</span>
                  {activeOutreachPitch.emailSubject}
                </div>

                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-slate-300 whitespace-pre-line leading-relaxed max-h-48 overflow-y-auto">
                  {activeOutreachPitch.emailBody}
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] text-slate-400">
                  💡 {isBn ? 'এই ইমেইলটি কপি করে সরাসরি এডিটর বা প্ল্যাটফর্ম সাপোর্টে পাঠিয়ে দিন।' : 'Copy and send directly to editors or directory webmasters.'}
                </span>

                <button
                  onClick={handleCopyPitch}
                  className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 transition shadow active:scale-95"
                >
                  {copiedPitch ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedPitch ? (isBn ? 'কপি সম্পন্ন!' : 'Copied!') : (isBn ? 'ইমেইল পিচ কপি করুন' : 'Copy Pitch Email')}</span>
                </button>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Futuristic Power Customizer Modal (Cars, Outfits, Colors, Synth Music, Sign-Up) */}
      <FuturisticPowerCustomizer
        language={language}
        isOpen={customizerOpen}
        onClose={() => setCustomizerOpen(false)}
        userXp={userXp}
        userLevel={userLevel}
        onAddXp={handleAddXp}
      />

    </div>
  );
};
