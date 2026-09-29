import React, { useState, useEffect, useRef } from 'react';
import { 
  Zap, 
  Sparkles, 
  Car, 
  Shirt, 
  Palette, 
  Music, 
  Play, 
  Square, 
  UserCheck, 
  Check, 
  ShieldCheck, 
  Sliders, 
  X,
  Volume2,
  VolumeX,
  Award,
  Crown
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../utils/soundEffects';
import { Language } from '../types';

interface FuturisticPowerCustomizerProps {
  language: Language;
  isOpen: boolean;
  onClose: () => void;
  userXp: number;
  userLevel: number;
  onAddXp: (amount: number) => void;
}

export const FuturisticPowerCustomizer: React.FC<FuturisticPowerCustomizerProps> = ({
  language,
  isOpen,
  onClose,
  userXp,
  userLevel,
  onAddXp,
}) => {
  const isBn = language === 'bn';

  // Car Selection
  const cars = [
    { id: 'hyperion', name: 'Apex Hyperion GT', speed: '420 km/h', engine: 'Quantum Fusion', icon: '🏎️', color: 'from-amber-500 to-red-600' },
    { id: 'speeder', name: 'Cyber Speeder 2077', speed: '380 km/h', engine: 'Neon Plasma Core', icon: '🚀', color: 'from-cyan-400 to-blue-600' },
    { id: 'hovercraft', name: 'Solaris Edge Hovercraft', speed: '450 km/h', engine: 'Solar Photonic', icon: '🛸', color: 'from-purple-500 to-pink-600' },
    { id: 'warp', name: 'Titan Warp Cruiser', speed: '510 km/h', engine: 'Sub-Atomic Warp', icon: '⚡', color: 'from-emerald-400 to-teal-600' },
  ];
  const [selectedCar, setSelectedCar] = useState(cars[0].id);

  // Operator Dressup / Man Avatar
  const outfits = [
    { id: 'commander', name: 'Cyberpunk Commander', style: 'Neon Visor & Nano-Armor', avatar: '🧑‍🚀' },
    { id: 'engineer', name: 'Quantum Core Engineer', style: 'Holographic Lab Cloak', avatar: '👨‍💻' },
    { id: 'executive', name: 'Neo SERP Executive', style: 'Matrix Carbon-Fiber Suit', avatar: '🕵️‍♂️' },
    { id: 'pilot', name: 'Synthwave Hyper Pilot', style: 'Retro-Futuristic Flight Suit', avatar: '🥷' },
  ];
  const [selectedOutfit, setSelectedOutfit] = useState(outfits[0].id);

  // Color Aura Theme
  const colorThemes = [
    { id: 'cyber', name: 'Cyberpunk Indigo & Cyan', hex: '#6366f1', border: 'border-indigo-500' },
    { id: 'solar', name: 'Solar Gold & Amber', hex: '#f59e0b', border: 'border-amber-500' },
    { id: 'matrix', name: 'Matrix Emerald Neon', hex: '#10b981', border: 'border-emerald-500' },
    { id: 'synthwave', name: 'Synthwave Magenta & Rose', hex: '#ec4899', border: 'border-pink-500' },
  ];
  const [selectedColor, setSelectedColor] = useState(colorThemes[0].id);

  // Ambient Synthesizer Music Generator (Web Audio API)
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState<'track1' | 'track2' | 'track3'>('track1');
  const audioCtxRef = useRef<AudioContext | null>(null);
  const musicIntervalRef = useRef<any>(null);

  const startMusic = (track: 'track1' | 'track2' | 'track3') => {
    stopMusic();
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      // Note frequency sequences for tracks
      const chordTracks = {
        track1: [261.63, 329.63, 392.00, 523.25, 392.00, 329.63], // C major arpeggio
        track2: [220.00, 261.63, 329.63, 440.00, 329.63, 261.63], // A minor cosmic pulse
        track3: [349.23, 440.00, 523.25, 659.25, 523.25, 440.00], // F major hyper velocity
      };

      const notes = chordTracks[track];
      let step = 0;

      musicIntervalRef.current = setInterval(() => {
        if (!audioCtxRef.current) return;
        const now = audioCtxRef.current.currentTime;
        const osc = audioCtxRef.current.createOscillator();
        const gain = audioCtxRef.current.createGain();

        osc.type = track === 'track1' ? 'sine' : track === 'track2' ? 'triangle' : 'sawtooth';
        osc.frequency.setValueAtTime(notes[step % notes.length], now);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.06, now + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);

        osc.connect(gain);
        gain.connect(audioCtxRef.current.destination);

        osc.start(now);
        osc.stop(now + 0.48);
        step++;
      }, 250);

      setIsPlayingMusic(true);
      sounds.playSoftClick();
    } catch (e) {
      console.warn('Web Audio not allowed yet', e);
    }
  };

  const stopMusic = () => {
    if (musicIntervalRef.current) {
      clearInterval(musicIntervalRef.current);
      musicIntervalRef.current = null;
    }
    if (audioCtxRef.current) {
      try {
        audioCtxRef.current.close();
      } catch (e) {}
      audioCtxRef.current = null;
    }
    setIsPlayingMusic(false);
  };

  useEffect(() => {
    return () => {
      stopMusic();
    };
  }, []);

  // Commander Sign-up state
  const [commanderName, setCommanderName] = useState(() => {
    return localStorage.getItem('gsp_commander_name') || 'Toifik Rahaman';
  });
  const [isSignedUp, setIsSignedUp] = useState(true);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSaveProfile = () => {
    localStorage.setItem('gsp_commander_name', commanderName);
    setSaveSuccess(true);
    sounds.playLuxuryChime();
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    onAddXp(500);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      
      <div className="bg-gradient-to-br from-slate-900 via-[#0a0f1d] to-slate-950 border border-indigo-500/50 rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl space-y-6 relative overflow-hidden max-h-[90vh] overflow-y-auto">
        
        {/* Glow halo */}
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center font-black">
              <Crown className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
                <span>{isBn ? 'ফিউচারিস্টিক গেম কাস্টমাইজার ও লেভেল আপ' : 'Futuristic Game & Power Customizer'}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  1 - 10,000 XP
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                {isBn ? 'আপনার সাইবার গাড়ি, ড্রেসআপ, কালার থিম ও ব্যাকগ্রাউন্ড মিউজিক পরিবর্তন করুন।' : 'Change your hypercar, avatar dressup, neon theme color, and synth ambient music.'}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              stopMusic();
              onClose();
              sounds.playSoftClick();
            }}
            className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 1. LEVEL UP PROGRESSION (1 TO 10,000 XP) */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-mono font-bold text-white flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-400 fill-current" />
              <span>LEVEL {userLevel} SOVEREIGN COMMANDER</span>
            </span>
            <span className="font-mono text-amber-300 font-bold">
              {userXp.toLocaleString()} / 10,000 XP
            </span>
          </div>

          <div className="w-full bg-slate-900 rounded-full h-3.5 p-0.5 border border-slate-800 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-indigo-500 via-purple-500 to-amber-400 h-full rounded-full transition-all duration-500 shadow-lg shadow-amber-500/30"
              style={{ width: `${Math.min(100, (userXp / 10000) * 100)}%` }}
            />
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-[11px] text-slate-400">
              {10000 - userXp > 0 ? `${(10000 - userXp).toLocaleString()} XP until Next Tier` : 'MAX LEVEL 10,000 TITAN REACHED'}
            </span>
            <button
              onClick={() => {
                onAddXp(500);
                sounds.playLuxuryChime();
                confetti({ particleCount: 65, spread: 70, origin: { y: 0.6 } });
              }}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-black text-xs shadow-md transition hover:scale-105 active:scale-95 flex items-center gap-1.5"
            >
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>Level Up Boost (+500 XP)</span>
            </button>
          </div>
        </div>

        {/* 2. CAR CHANGE: SPEED TELEMETRY VEHICLE */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-300">
            <span className="flex items-center gap-1.5">
              <Car className="w-4 h-4 text-blue-400" />
              <span>{isBn ? 'সাইবার গাড়ি পরিবর্তন (Vehicle Customizer):' : 'Speed Vehicle Selection (Car Change):'}</span>
            </span>
            <span className="text-amber-400 text-[11px]">{cars.find(c => c.id === selectedCar)?.name}</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {cars.map((car) => {
              const isSelected = selectedCar === car.id;
              return (
                <button
                  key={car.id}
                  onClick={() => {
                    setSelectedCar(car.id);
                    sounds.playSoftClick();
                  }}
                  className={`p-3 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between ${
                    isSelected 
                      ? 'bg-slate-900 border-amber-400 ring-2 ring-amber-400/40 shadow-xl shadow-amber-500/10' 
                      : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="text-2xl mb-1">{car.icon}</div>
                  <div>
                    <h5 className="text-xs font-bold text-white truncate">{car.name}</h5>
                    <span className="text-[10px] text-emerald-400 font-mono block">{car.speed}</span>
                    <span className="text-[9px] text-slate-500 font-mono block truncate">{car.engine}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. DRESSUP MAN: OPERATOR AVATAR CUSTOMIZER */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-300">
            <span className="flex items-center gap-1.5">
              <Shirt className="w-4 h-4 text-purple-400" />
              <span>{isBn ? 'ড্রেসআপ ও সাইবার অপারেটর পরিবর্তন:' : 'Dressup Avatar & Operator Suit:'}</span>
            </span>
            <span className="text-purple-300 text-[11px]">{outfits.find(o => o.id === selectedOutfit)?.name}</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {outfits.map((outfit) => {
              const isSelected = selectedOutfit === outfit.id;
              return (
                <button
                  key={outfit.id}
                  onClick={() => {
                    setSelectedOutfit(outfit.id);
                    sounds.playSoftClick();
                  }}
                  className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                    isSelected 
                      ? 'bg-slate-900 border-purple-400 ring-2 ring-purple-400/40 shadow-xl' 
                      : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="text-2xl mb-1">{outfit.avatar}</div>
                  <div>
                    <h5 className="text-xs font-bold text-white truncate">{outfit.name}</h5>
                    <span className="text-[10px] text-purple-300 font-mono block truncate">{outfit.style}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. COLOR THEME & SONG MUSIC PLAYER */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Color Aura Theme */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5">
            <span className="text-xs font-mono font-bold text-slate-300 flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5 text-pink-400" />
              <span>{isBn ? 'কালার থিম নির্বাচন:' : 'Color Neon Aura:'}</span>
            </span>

            <div className="grid grid-cols-2 gap-2">
              {colorThemes.map((col) => {
                const isSelected = selectedColor === col.id;
                return (
                  <button
                    key={col.id}
                    onClick={() => {
                      setSelectedColor(col.id);
                      sounds.playSoftClick();
                    }}
                    className={`p-2 rounded-xl border text-[11px] font-bold text-left flex items-center gap-2 transition ${
                      isSelected 
                        ? 'bg-slate-900 border-white text-white shadow-md' 
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: col.hex }} />
                    <span className="truncate">{col.name.split(' ')[0]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Synth Ambient Music Song Player */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-slate-300 flex items-center gap-1.5">
                <Music className="w-3.5 h-3.5 text-emerald-400" />
                <span>{isBn ? 'ফিউচারিস্টিক সিন্থ মিউজিক গান:' : 'Sci-Fi Synth Music Track:'}</span>
              </span>
              {isPlayingMusic && (
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              )}
            </div>

            <div className="flex items-center gap-2">
              <select
                value={selectedTrack}
                onChange={(e) => {
                  const t = e.target.value as any;
                  setSelectedTrack(t);
                  if (isPlayingMusic) startMusic(t);
                }}
                className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none font-mono"
              >
                <option value="track1">Track 1: Quantum Nexus Synth</option>
                <option value="track2">Track 2: Deep Space Cosmic Pulse</option>
                <option value="track3">Track 3: Hyperdrive Velocity Run</option>
              </select>

              <button
                onClick={() => {
                  if (isPlayingMusic) stopMusic();
                  else startMusic(selectedTrack);
                }}
                className={`p-2.5 rounded-xl border font-bold text-xs flex items-center justify-center transition shrink-0 ${
                  isPlayingMusic 
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 hover:bg-rose-500/30' 
                    : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30'
                }`}
                title={isPlayingMusic ? 'Stop Music' : 'Play Music'}
              >
                {isPlayingMusic ? <Square className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
              </button>
            </div>
          </div>

        </div>

        {/* 5. OPERATOR SIGN UP / IDENTITY BADGE */}
        <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-mono font-bold text-white flex items-center gap-1.5">
              <UserCheck className="w-4 h-4 text-emerald-400" />
              <span>{isBn ? 'কমান্ডার সাইন আপ ও ভেরিফাইড আইডি:' : 'Commander Sign-Up & Verified ID:'}</span>
            </span>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              OFFICIAL GOOGLE OPERATOR
            </span>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              value={commanderName}
              onChange={(e) => setCommanderName(e.target.value)}
              placeholder="Commander Call-sign..."
              className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-mono"
            />
            <button
              onClick={handleSaveProfile}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition shadow-md shrink-0 flex items-center gap-1.5"
            >
              <Check className="w-3.5 h-3.5" />
              <span>{saveSuccess ? (isBn ? 'সেভ হয়েছে!' : 'Saved!') : (isBn ? 'সাইন আপ ও সেভ' : 'Sign Up & Save')}</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
