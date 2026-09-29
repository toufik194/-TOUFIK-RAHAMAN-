import React, { useState } from 'react';
import { 
  Gamepad2, 
  Trophy, 
  Sparkles, 
  TrendingUp, 
  Zap, 
  DollarSign, 
  ShieldCheck, 
  Award, 
  RefreshCw, 
  CheckCircle2, 
  AlertTriangle, 
  Flame, 
  ArrowUpRight, 
  Bot,
  Star,
  Compass,
  Cpu
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../utils/soundEffects';
import { Language, WebsiteProject } from '../types';

interface AiSeoGameProps {
  language: Language;
  project: WebsiteProject;
}

interface GameDecision {
  id: string;
  title: string;
  desc: string;
  aiTip: string;
  cost: number;
  rankDelta: number; // lower rank number is better (e.g. -15 rank moves from 85 to 70)
  trafficDelta: number;
  revenueDelta: number;
  speedDelta: number;
}

interface GameScenario {
  level: number;
  title: string;
  situation: string;
  googleNotice: string;
  choices: GameDecision[];
}

export const AiSeoGame: React.FC<AiSeoGameProps> = ({
  language,
  project,
}) => {
  const isBn = language === 'bn';

  // Game state
  const [currentLevelIdx, setCurrentLevelIdx] = useState<number>(0);
  const [currentRank, setCurrentRank] = useState<number>(78); // Starts at #78
  const [organicTraffic, setOrganicTraffic] = useState<number>(1450); // Monthly visitors
  const [monthlyRevenue, setMonthlyRevenue] = useState<number>(85); // $85 / mo
  const [speedScore, setSpeedScore] = useState<number>(72); // 72/100
  const [energyBudget, setEnergyBudget] = useState<number>(500); // Credits
  const [gameLogs, setGameLogs] = useState<string[]>([
    isBn ? '🚀 গেম শুরু হয়েছে: আপনার ওয়েবসাইটটি বর্তমানে গুগলের ৭৮ নম্বরে রয়েছে।' : '🚀 Game started: Your site is currently ranked #78 on Google SERP.'
  ]);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [isGameWon, setIsGameWon] = useState<boolean>(false);

  const scenarios: GameScenario[] = [
    {
      level: 1,
      title: isBn ? 'লেভেল ১: কি-ওয়ার্ড স্ট্র্যাটেজি ও কন্টেন্ট ইঞ্জিন' : 'Level 1: Keyword Strategy & Content Engine',
      situation: isBn 
        ? 'গুগলবট আপনার হোমপেজ ক্রল করেছে কিন্তু কোনো স্পেসিফিক হাই-ভলিউম কি-ওয়ার্ড পায়নি।' 
        : 'Googlebot crawled your homepage but found vague targeting without high-intent keywords.',
      googleNotice: 'Google Search Console: Discovered - Currently not indexed.',
      choices: [
        {
          id: 'c1',
          title: isBn ? 'জেমিনাই দিয়ে হাই-সিটিআর লং-টেইল কি-ওয়ার্ড আর্টিকেল তৈরি' : 'Generate High-CTR Long-Tail Article with Gemini AI',
          desc: isBn ? 'গুগলের E-E-A-T গাইডলাইন মেনে ২,৫০০ শব্দের ইন-ডেপথ গাইড প্রকাশ।' : 'Publish 2,500-word comprehensive guide adhering to E-E-A-T guidelines.',
          aiTip: isBn ? 'সেরা পছন্দ! লং-টেইল কি-ওয়ার্ডে খুব দ্রুত ১ নম্বরে ওঠা যায়।' : 'Recommended! Long-tail intent brings immediate rank velocity.',
          cost: 100,
          rankDelta: -28, // Moves from 78 -> 50
          trafficDelta: 4200,
          revenueDelta: 240,
          speedDelta: 0,
        },
        {
          id: 'c2',
          title: isBn ? 'শর্টকাট এআই স্প্যাম কন্টেন্ট ১০টি পেজে কপি করা' : 'Mass-generate 10 thin AI pages without editing',
          desc: isBn ? 'দ্রুত পেজ সংখ্যা বাড়ানো কিন্তু কোয়ালিটি কম রাখা।' : 'Focus on page quantity over factual depth.',
          aiTip: isBn ? 'সতর্কতা: গুগল হেল্পফুল কন্টেন্ট আপডেটে পেনাল্টি হতে পারে।' : 'High risk: Google Helpful Content Update may flag thin content.',
          cost: 50,
          rankDelta: 12, // penalizes
          trafficDelta: -300,
          revenueDelta: -20,
          speedDelta: -5,
        },
        {
          id: 'c3',
          title: isBn ? 'গুগল অ্যাডস পে পার ক্লিক (PPC) ক্যাম্পেইন' : 'Launch Google Search Ads PPC Campaign',
          desc: isBn ? 'অস্থায়ী পেইড ট্র্যাফিক আনা।' : 'Buy immediate visitors with ad spend.',
          aiTip: isBn ? 'টাকা শেষ হলে ট্র্যাফিক চলে যাবে, তবে প্রাথমিক ভিজিটর পাওয়া যাবে।' : 'Fast paid traffic, but does not boost organic domain authority permanently.',
          cost: 250,
          rankDelta: -10,
          trafficDelta: 2500,
          revenueDelta: 110,
          speedDelta: 0,
        },
      ],
    },
    {
      level: 2,
      title: isBn ? 'লেভেল ২: কোর ওয়েব ভাইটালস ও ০.৮ সেকেন্ড গতি' : 'Level 2: Core Web Vitals & Speed Overhaul',
      situation: isBn 
        ? 'গুগল অ্যালগরিদম পেজ স্পিড টেস্ট করেছে। মোবাইল ডিভাইসে এলসিপি (LCP) ৩.২ সেকেন্ড সময় নিচ্ছে!' 
        : 'Google Lighthouse tested your mobile speed. LCP is 3.2s, causing user bounce rate to rise!',
      googleNotice: 'Core Web Vitals Assessment: Needs Improvement (FID & LCP high)',
      choices: [
        {
          id: 'c4',
          title: isBn ? 'গুগল ক্লাউড সিডিএন এজ ক্যাশিং ও নেক্সট-জেন ওয়েবপি (WebP)' : 'Deploy Google Cloud CDN & Next-Gen WebP Asset Pipeline',
          desc: isBn ? 'সমস্ত ছবি কম্প্রেস করা এবং ০.৮ সেকেন্ডে সাব-সেকেন্ড লোডিং স্পিড অর্জন।' : 'Zero-CLS responsive images, preconnected DNS, and global edge caching.',
          aiTip: isBn ? 'চমৎকার! গুগল দ্রুত সাইটগুলোকে সার্চ ফলাফলের শীর্ষে অগ্রাধিকার দেয়।' : 'Core Web Vitals will score 99/100, unlocking massive mobile ranking boost.',
          cost: 150,
          rankDelta: -22,
          trafficDelta: 6800,
          revenueDelta: 410,
          speedDelta: 26,
        },
        {
          id: 'c5',
          title: isBn ? 'ভারী থার্ড-পার্টি ট্র্যাকিং স্ক্রিপ্ট যুক্ত করা' : 'Add 5 heavy third-party analytics popup scripts',
          desc: isBn ? 'অতিরিক্ত ট্র্যাকিং কোড লোড করা।' : 'Bloats JS execution and causes layout shifts.',
          aiTip: isBn ? 'ভুল সিদ্ধান্ত: পেজ স্লো হয়ে যাবে এবং ইউজার চলে যাবে।' : 'Degrades Core Web Vitals and increases mobile bounce rate.',
          cost: 80,
          rankDelta: 8,
          trafficDelta: -800,
          revenueDelta: -50,
          speedDelta: -20,
        },
      ],
    },
    {
      level: 3,
      title: isBn ? 'লেভেল ৩: গুগল হেল্পফুল কন্টেন্ট ও অথরিটি ডিফেন্স' : 'Level 3: Google Algorithm Core Update Attack',
      situation: isBn 
        ? '⚠️ সতর্কতা: গুগলের বড় ধরনের নতুন অ্যালগরিদম আপডেট (Core Update) রোলআউট হয়েছে! হাজার হাজার ওয়েবসাইট ট্র্যাফিক হারিয়েছে।' 
        : '⚠️ Alert: Google March 2026 Core Algorithm Update is rolling out globally! Weak sites are dropping like flies.',
      googleNotice: 'Google Search Central: Quality Evaluation Phase Live.',
      choices: [
        {
          id: 'c6',
          title: isBn ? 'রিচ স্কিমা (FAQPage JSON-LD) ও E-E-A-T অথর ভেরিফিকেশন' : 'Implement FAQPage JSON-LD Rich Schema & Authoritative E-E-A-T Citations',
          desc: isBn ? 'গুগল সার্চে স্টার রেটিং ও এফএকিউ ড্রপডাউন স্নিপেট সক্রিয় করা।' : 'Add structured data markup and verified technical author credentials.',
          aiTip: isBn ? 'নিরাপদ ঢাল! অ্যালগরিদম আপনার সাইটকে অথরিটি ব্র্যান্ড হিসেবে চিনবে।' : 'Fortifies your site against algorithm volatility and wins rich SERP snippets.',
          cost: 120,
          rankDelta: -16,
          trafficDelta: 11200,
          revenueDelta: 820,
          speedDelta: 2,
        },
        {
          id: 'c7',
          title: isBn ? 'অ্যালগরিদমের তোয়াক্কা না করে অলস বসে থাকা' : 'Do nothing and hope the update passes',
          desc: isBn ? 'কোনো আপডেট বা কন্টেন্ট রিফ্রেশ না করা।' : 'Ignore structured data and fresh content signals.',
          aiTip: isBn ? 'প্রতিযোগীরা আপনাকে পেছনে ফেলে দেবে।' : 'Competitors will overtake your ranking positions.',
          cost: 0,
          rankDelta: 5,
          trafficDelta: -1200,
          revenueDelta: -90,
          speedDelta: 0,
        },
      ],
    },
    {
      level: 4,
      title: isBn ? 'লেভেল ৪: ফাইনাল শোডাউন – গুগল ১ম পেজ ১ নম্বর স্থান!' : 'Level 4: Final Showdown – Google Rank #1 Dominance!',
      situation: isBn 
        ? 'আপনার ওয়েবসাইটটি বর্তমানে গুগলের টপ ১০ এ পৌঁছে গেছে! আর মাত্র এক ধাপ পেরোলেই আপনি বিশ্বের ১ নম্বর স্থানে পৌঁছাবেন।' 
        : 'Your website is now in the Top 10 on Google SERP! One strategic move will secure the coveted Rank #1 spot.',
      googleNotice: 'Google Search Console: Impressions up 450%. High CTR detected.',
      choices: [
        {
          id: 'c8',
          title: isBn ? 'অমনি চ্যানেল ব্যাকলিংক ফোরট্রেস ও ভাইরাল সোশ্যাল সিগন্যাল' : 'Omni-Channel Backlink Fortress & High-Domain Authority Syndication',
          desc: isBn ? 'ফরচুন ৫০০ টেক সাইটগুলো থেকে ডু-ফলো ব্যাকলিংক ও গুগল নিউজ সাইটম্যাপ সক্রিয় করা।' : 'Acquire tier-1 contextual backlinks and syndicate via Google News XML protocol.',
          aiTip: isBn ? 'গুগলের শীর্ষ স্থানে ওঠার চূড়ান্ত মাস্টারস্ট্রোক!' : 'The definitive master move to knock the #1 competitor out of first place.',
          cost: 180,
          rankDelta: -12, // Knocks rank down to #1!
          trafficDelta: 28000,
          revenueDelta: 2150,
          speedDelta: 0,
        },
      ],
    },
  ];

  const currentScenario = scenarios[currentLevelIdx];

  const handleMakeChoice = (choice: GameDecision) => {
    sounds.playSoftClick();

    const newRank = Math.max(1, currentRank + choice.rankDelta);
    const newTraffic = Math.max(0, organicTraffic + choice.trafficDelta);
    const newRevenue = Math.max(0, monthlyRevenue + choice.revenueDelta);
    const newSpeed = Math.min(100, Math.max(20, speedScore + choice.speedDelta));
    const newEnergy = Math.max(0, energyBudget - choice.cost + Math.round(choice.revenueDelta * 0.15));

    setCurrentRank(newRank);
    setOrganicTraffic(newTraffic);
    setMonthlyRevenue(newRevenue);
    setSpeedScore(newSpeed);
    setEnergyBudget(newEnergy);

    const logEntry = isBn
      ? `সিদ্ধান্ত: "${choice.title}" → র‍্যাংক পরিবর্তন: #${currentRank} থেকে #${newRank}, মাসিক আয়: $${newRevenue}`
      : `Action: "${choice.title}" → SERP Rank: #${currentRank} ➔ #${newRank}, Revenue: $${newRevenue}/mo`;

    setGameLogs((prev) => [logEntry, ...prev]);

    if (newRank === 1) {
      setIsGameWon(true);
      sounds.playLuxuryChime();
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.5 } });
    } else if (currentLevelIdx < scenarios.length - 1) {
      setCurrentLevelIdx((prev) => prev + 1);
      sounds.playLuxuryChime();
    } else {
      setIsGameOver(true);
    }
  };

  const handleRestartGame = () => {
    sounds.playSoftClick();
    setCurrentLevelIdx(0);
    setCurrentRank(78);
    setOrganicTraffic(1450);
    setMonthlyRevenue(85);
    setSpeedScore(72);
    setEnergyBudget(500);
    setIsGameOver(false);
    setIsGameWon(false);
    setGameLogs([
      isBn ? '🚀 গেম রিস্টার্ট হয়েছে: আপনার ওয়েবসাইটটি আবার ৭৮ নম্বরে রয়েছে।' : '🚀 Game restarted: Back at Rank #78 on Google SERP.'
    ]);
  };

  return (
    <div className="bg-slate-900/95 rounded-2xl border border-indigo-500/40 p-5 sm:p-7 shadow-2xl space-y-6">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 font-mono text-xs font-bold">
              <Gamepad2 className="w-3.5 h-3.5 text-amber-300" />
              <span>AI SEO TYCOON & ALGORITHM SIMULATOR</span>
            </span>
            <span className="text-slate-600">·</span>
            <span className="text-[11px] font-mono text-emerald-400 font-bold">
              Goal: Google SERP #1
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <span>{isBn ? 'এআই এসইও টাইকুন গেম: গুগলের ১ নম্বরে ওঠার লড়াই' : 'AI SEO Tycoon Game: Race to Google Rank #1'}</span>
          </h3>
          <p className="text-xs text-slate-300">
            {isBn 
              ? 'এআই পরামর্শ নিয়ে কৌশলগত সিদ্ধান্ত নিন, গুগলের অ্যালগরিদম আপডেট প্রতিহত করুন এবং প্রতি মাসে হাজার হাজার ডলার ইনকাম করুন।' 
              : 'Make strategic AI-guided optimization moves, defend against Google core updates, and scale organic revenue.'}
          </p>
        </div>

        <button
          onClick={handleRestartGame}
          className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs font-bold transition flex items-center gap-1.5 shrink-0"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>{isBn ? 'রিস্টার্ট গেম' : 'Restart Game'}</span>
        </button>
      </div>

      {/* 4 Interactive Dashboard Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
        
        {/* SERP Rank */}
        <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-[10px]">
            <span>GOOGLE SERP RANK</span>
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-400 flex items-baseline gap-1">
            <span>#{currentRank}</span>
            {currentRank === 1 && <span className="text-xs text-emerald-400 font-bold">👑 CHAMPION</span>}
          </div>
          <span className="text-[10px] text-slate-500 block">Target: Rank #1 on Page 1</span>
        </div>

        {/* Monthly Traffic */}
        <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-[10px]">
            <span>MONTHLY VISITORS</span>
            <TrendingUp className="w-3.5 h-3.5 text-blue-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white">
            {organicTraffic.toLocaleString()}
          </div>
          <span className="text-[10px] text-emerald-400 block font-bold">+Organic Clicks</span>
        </div>

        {/* Monthly Revenue */}
        <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-[10px]">
            <span>MONTHLY REVENUE</span>
            <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-400">
            ${monthlyRevenue.toLocaleString()}/mo
          </div>
          <span className="text-[10px] text-slate-500 block">AdSense & Affiliate RPM</span>
        </div>

        {/* Speed Score */}
        <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-[10px]">
            <span>CORE WEB VITALS</span>
            <Zap className="w-3.5 h-3.5 text-purple-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-purple-400">
            {speedScore}/100
          </div>
          <span className="text-[10px] text-slate-500 block">Lighthouse Speed</span>
        </div>

      </div>

      {/* GAME VICTORY SCREEN */}
      {isGameWon && (
        <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-950/80 via-slate-950 to-emerald-950/80 border-2 border-amber-400 text-center space-y-4 shadow-2xl animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-amber-400/20 border-2 border-amber-400 text-amber-300 flex items-center justify-center mx-auto shadow-lg shadow-amber-400/30">
            <Trophy className="w-8 h-8 animate-bounce" />
          </div>
          <h4 className="text-2xl sm:text-3xl font-black text-white">
            {isBn ? '👑 অভিনন্দন! আপনি গুগলের ১ নম্বর স্থান অর্জন করেছেন!' : '👑 VICTORY! You Are Officially Rank #1 on Google Search!'}
          </h4>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            {isBn 
              ? `আপনার ওয়েবসাইট এখন প্রতিদিন লাখ লাখ অর্গানিক ভিজিটর পাচ্ছে এবং প্রতি মাসে $${monthlyRevenue.toLocaleString()} আয় হচ্ছে। আপনার ডোমেইনটি বিশ্বমানের অথরিটিতে পরিণত হয়েছে!` 
              : `Your website now commands the #1 SERP spot, pulling in over ${organicTraffic.toLocaleString()} monthly visitors and generating $${monthlyRevenue.toLocaleString()}/mo in automated revenue!`}
          </p>
          <div className="pt-2">
            <button
              onClick={handleRestartGame}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-xs shadow-xl active:scale-95 transition"
            >
              Play Again / নতুন গেম শুরু করুন →
            </button>
          </div>
        </div>
      )}

      {/* ACTIVE GAME SCENARIO CARD */}
      {!isGameWon && currentScenario && (
        <div className="bg-slate-950 rounded-2xl border border-slate-800 p-5 sm:p-6 space-y-5 shadow-xl">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-900 pb-3">
            <div>
              <span className="text-[10px] font-mono text-indigo-400 font-bold uppercase tracking-wider block">
                MISSION {currentScenario.level} OF {scenarios.length}
              </span>
              <h4 className="text-lg font-black text-white">{currentScenario.title}</h4>
            </div>

            <span className="text-[11px] font-mono text-amber-300 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30 self-start sm:self-auto">
              Energy Budget: {energyBudget} Credits
            </span>
          </div>

          <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 space-y-1 text-xs">
            <span className="text-slate-400 font-semibold block">{isBn ? 'বর্তমান পরিস্থিতি:' : 'Current Situation:'}</span>
            <p className="text-slate-200 leading-relaxed">{currentScenario.situation}</p>
            <div className="pt-1.5 flex items-center gap-1.5 text-[11px] font-mono text-rose-400">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>{currentScenario.googleNotice}</span>
            </div>
          </div>

          {/* Decision Choices */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-white uppercase tracking-wider block">
              {isBn ? 'আপনার কৌশলগত সিদ্ধান্ত নির্বাচন করুন:' : 'Choose Your Strategic AI Optimization Move:'}
            </span>

            <div className="grid grid-cols-1 gap-3">
              {currentScenario.choices.map((choice) => (
                <div
                  key={choice.id}
                  className="bg-slate-900/90 hover:bg-slate-900 p-4 rounded-xl border border-slate-800 hover:border-indigo-500/50 transition flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs group"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-black text-white text-sm group-hover:text-indigo-300 transition">
                        {choice.title}
                      </span>
                    </div>
                    <p className="text-slate-300 text-[11px] leading-relaxed">{choice.desc}</p>
                    <div className="flex items-center gap-1.5 text-[11px] text-amber-300">
                      <Bot className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>{choice.aiTip}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-[11px] font-mono text-slate-400 text-right hidden sm:block">
                      <span className="text-emerald-400 font-bold block">
                        Rank: {choice.rankDelta < 0 ? `${choice.rankDelta} Spots` : `+${choice.rankDelta}`}
                      </span>
                      <span className="text-slate-400 block">Cost: {choice.cost} credits</span>
                    </div>

                    <button
                      onClick={() => handleMakeChoice(choice)}
                      className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 text-white font-black text-xs shadow-md transition active:scale-95 flex items-center gap-1.5"
                    >
                      <Zap className="w-3.5 h-3.5 text-amber-300" />
                      <span>{isBn ? 'এই কৌশলটি প্রয়োগ করুন' : 'Execute Move'}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* Game Audit Logs */}
      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs font-mono">
        <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px] block">
          SERP Progress History & Logs:
        </span>
        <div className="space-y-1 max-h-28 overflow-y-auto">
          {gameLogs.map((log, idx) => (
            <div key={idx} className="text-slate-300 text-[11px] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"></span>
              <span>{log}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
