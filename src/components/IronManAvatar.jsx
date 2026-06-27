import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCpu, FiZap, FiShield, FiRadio, FiVolume2, FiVolumeX } from 'react-icons/fi';

// AI System configurations
const AI_SYSTEMS = {
  JARVIS: {
    name: 'J.A.R.V.I.S',
    fullName: 'Just A Rather Very Intelligent System',
    color: '#00d9ff',
    tagline: 'At your service, sir.',
    version: 'v7.1.0',
  },
  FRIDAY: {
    name: 'F.R.I.D.A.Y',
    fullName: 'Female Replacement Intelligent Digital Assistant Youth',
    color: '#ffa502',
    tagline: 'Ready when you are, boss.',
    version: 'v2.3.1',
  },
  EDITH: {
    name: 'E.D.I.T.H',
    fullName: 'Even Dead I\'m The Hero',
    color: '#e63946',
    tagline: 'Access granted.',
    version: 'v1.0.0',
  },
};

// ---------------------------------------------------------------------------
// Voice selection (Web Speech API) — best-effort matching to MCU-style voices.
// Voices vary by OS/browser, so we score the available list and pick the best.
// ---------------------------------------------------------------------------
const VOICE_PREFS = {
  // JARVIS — calm, refined British male
  JARVIS: {
    names: ['daniel', 'microsoft ryan', 'microsoft george', 'google uk english male', 'arthur', 'oliver', 'microsoft guy'],
    langs: ['en-gb', 'en-au', 'en'],
    gender: 'male',
    pitch: 0.8,
    rate: 0.94,
  },
  // FRIDAY — brighter, younger Irish/British female (higher pitch)
  FRIDAY: {
    names: ['moira', 'microsoft emily', 'fiona', 'microsoft sonia', 'microsoft libby', 'microsoft hazel', 'google uk english female', 'tessa', 'microsoft aoife'],
    langs: ['en-ie', 'en-gb', 'en'],
    gender: 'female',
    pitch: 1.12,
    rate: 1.06,
  },
  // EDITH — composed, level American female (lower pitch than FRIDAY so they stay distinct)
  EDITH: {
    names: ['samantha', 'microsoft aria', 'microsoft michelle', 'microsoft zira', 'google us english', 'karen', 'microsoft jenny'],
    langs: ['en-us', 'en-gb', 'en'],
    gender: 'female',
    pitch: 0.98,
    rate: 1.0,
  },
};

// Per-AI avatar images. Drop these files in /public to enable the transformation.
// Any missing file gracefully falls back to the base photo (see handleImgError).
const BASE_IMAGE = '/avatar.jpg';
const AI_IMAGES = {
  JARVIS: '/avatar-jarvis.jpeg', // classic red & gold Iron Man armor
  FRIDAY: '/avatar-friday.jpg', // sleeker nanotech armor
  EDITH: '/avatar-edith.png',   // wearing the E.D.I.T.H glasses
};

const MALE_HINTS = ['daniel', 'george', 'ryan', 'arthur', 'oliver', 'guy', 'david', 'mark', 'james', 'thomas', 'william', 'liam', 'aaron', 'paul', 'brian', ' male', 'man'];
const FEMALE_HINTS = ['moira', 'emily', 'fiona', 'sonia', 'hazel', 'aoife', 'tessa', 'samantha', 'aria', 'michelle', 'zira', 'karen', 'jenny', 'susan', 'hannah', 'catherine', 'linda', 'heera', 'eva', 'clara', 'libby', ' female', 'woman'];

function pickVoice(voices, prefs) {
  if (!voices || !voices.length) return null;
  let best = null;
  let bestScore = -Infinity;

  for (const v of voices) {
    const name = (v.name || '').toLowerCase();
    const lang = (v.lang || '').toLowerCase().replace('_', '-');
    let score = 0;

    // English only (heavy penalty otherwise)
    if (!lang.startsWith('en')) score -= 500;

    // Preferred exact-ish name matches (earlier in list = better)
    const ni = prefs.names.findIndex((n) => name.includes(n));
    if (ni !== -1) score += 200 - ni * 8;

    // Language preference
    let langScore = 0;
    for (let i = 0; i < prefs.langs.length; i++) {
      const l = prefs.langs[i];
      if (lang === l) { langScore = 60 - i * 18; break; }
      if (l === 'en' && lang.startsWith('en')) { langScore = Math.max(langScore, 36 - i * 18); }
    }
    score += langScore;

    // Gender heuristic
    const isMale = MALE_HINTS.some((h) => name.includes(h));
    const isFemale = FEMALE_HINTS.some((h) => name.includes(h));
    if (prefs.gender === 'male') {
      if (isMale) score += 45;
      if (isFemale) score -= 90;
    } else {
      if (isFemale) score += 45;
      if (isMale) score -= 90;
    }

    // Prefer higher-quality "natural"/"online" voices (Edge premium)
    if (name.includes('natural') || name.includes('online')) score += 15;

    if (score > bestScore) {
      bestScore = score;
      best = v;
    }
  }

  return best || voices[0] || null;
}

// HUD Scanner animation
function HUDScanner({ isHovered, isActive }) {
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: isHovered || isActive ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Horizontal scan line */}
      <motion.div
        className="absolute left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #00d9ff, transparent)' }}
        animate={{
          top: ['0%', '100%', '0%'],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
      />

      {/* Vertical scan line */}
      <motion.div
        className="absolute top-0 bottom-0 w-px"
        style={{ background: 'linear-gradient(180deg, transparent, #00d9ff, transparent)' }}
        animate={{
          left: ['0%', '100%', '0%'],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear', delay: 1 }}
      />

      {/* Corner brackets */}
      <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2" style={{ borderColor: '#00d9ff' }} />
      <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2" style={{ borderColor: '#00d9ff' }} />
      <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2" style={{ borderColor: '#00d9ff' }} />
      <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2" style={{ borderColor: '#00d9ff' }} />

      {/* Targeting reticles */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24"
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
      >
        <div className="absolute inset-0 rounded-full border border-dashed opacity-30" style={{ borderColor: '#00d9ff' }} />
      </motion.div>
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32"
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
      >
        <div className="absolute inset-0 rounded-full border opacity-20" style={{ borderColor: '#00d9ff' }} />
      </motion.div>
    </motion.div>
  );
}

// Arc Reactor pulse effect
function ArcReactorPulse({ isActive }) {
  return (
    <motion.div
      className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: isActive ? 1 : 0 }}
    >
      <motion.div
        className="w-8 h-8 rounded-full"
        style={{
          background: 'radial-gradient(circle, #00d9ff 0%, transparent 70%)',
          boxShadow: '0 0 20px #00d9ff, 0 0 40px #00d9ff',
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.8, 1, 0.8],
        }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
    </motion.div>
  );
}

// Suit-up overlay animation
function SuitUpOverlay({ isSuitingUp, progress, color, label }) {
  return (
    <AnimatePresence>
      {isSuitingUp && (
        <motion.div
          className="absolute inset-0 pointer-events-none z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Armor plate animation - scanning from bottom */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(0deg, ${color}4d 0%, transparent 100%)`,
            }}
            initial={{ y: '100%' }}
            animate={{ y: `${100 - progress}%` }}
            transition={{ duration: 0.1 }}
          />

          {/* Hex grid overlay */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `
                linear-gradient(${color}1a 1px, transparent 1px),
                linear-gradient(90deg, ${color}1a 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px',
            }}
          />

          {/* Scan edge — bright line riding the assembly front */}
          <motion.div
            className="absolute left-0 right-0 h-0.5"
            style={{
              background: color,
              boxShadow: `0 0 16px ${color}, 0 0 32px ${color}`,
              top: `${100 - progress}%`,
            }}
          />

          {/* Status readout */}
          <div className="absolute top-3 left-3 font-mono text-[10px] tracking-widest" style={{ color, textShadow: '0 0 8px rgba(0,0,0,0.9)' }}>
            {label} — {Math.round(progress)}%
          </div>

          {/* Progress bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1" style={{ background: 'rgba(0, 0, 0, 0.5)' }}>
            <div
              className="h-full"
              style={{
                background: color,
                width: `${progress}%`,
                boxShadow: `0 0 10px ${color}`,
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// AI Assistant hologram
function AIAssistant({ ai, isVisible }) {
  const lines = [
    'Initializing neural interface...',
    'Scanning biometrics...',
    'Calibrating holographic display...',
    'Systems nominal.',
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Dark scrim so colored text stays readable while the themed avatar shows through */}
          <div
            className="absolute inset-0"
            style={{ background: 'radial-gradient(circle at 50% 50%, rgba(2,6,23,0.42) 0%, rgba(2,6,23,0.72) 100%)' }}
          />
          {/* AI color glow on top of the scrim */}
          <div
            className="absolute inset-0"
            style={{ background: `radial-gradient(circle at 50% 50%, ${ai.color}26 0%, transparent 70%)` }}
          />

          {/* AI Name */}
          <motion.div
            className="text-center relative z-10 px-4"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <motion.div
              className="font-mono text-2xl md:text-3xl font-bold mb-2"
              style={{ color: ai.color, textShadow: `0 0 24px ${ai.color}, 0 2px 6px rgba(0,0,0,0.8)` }}
              animate={{ opacity: [0.75, 1, 0.75] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {ai.name}
            </motion.div>
            <motion.div
              className="font-mono text-xs"
              style={{ color: ai.color, opacity: 0.85, textShadow: '0 1px 4px rgba(0,0,0,0.9)' }}
            >
              {ai.fullName}
            </motion.div>
            <motion.div
              className="font-mono text-sm mt-4 font-semibold"
              style={{ color: ai.color, textShadow: `0 0 12px ${ai.color}, 0 1px 4px rgba(0,0,0,0.9)` }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {ai.tagline}
            </motion.div>

            {/* System status lines */}
            <div className="mt-6 space-y-1 inline-block text-left">
              {lines.map((line, i) => (
                <motion.div
                  key={i}
                  className="font-mono text-xs"
                  style={{ color: ai.color, opacity: 0.85, textShadow: '0 1px 4px rgba(0,0,0,0.95)' }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 0.85, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.15 }}
                >
                  <motion.span
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                  >
                    {'>'}
                  </motion.span>
                  {' '}
                  {line}
                </motion.div>
              ))}
            </div>

            {/* Version badge */}
            <div className="mt-4 font-mono text-xs" style={{ color: ai.color, opacity: 0.55, textShadow: '0 1px 4px rgba(0,0,0,0.9)' }}>
              {ai.version}
            </div>
          </motion.div>

          {/* Holographic scan lines */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `repeating-linear-gradient(
                0deg,
                transparent,
                transparent 2px,
                ${ai.color}10 2px,
                ${ai.color}10 4px
              )`,
            }}
            animate={{ opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 0.1, repeat: Infinity }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Status indicators
function StatusIndicators({ isHovered, color }) {
  const stats = [
    { icon: FiCpu, label: 'CPU', value: '94%' },
    { icon: FiZap, label: 'PWR', value: '100%' },
    { icon: FiShield, label: 'DEF', value: 'ACTIVE' },
    { icon: FiRadio, label: 'COM', value: 'ONLINE' },
  ];

  return (
    <motion.div
      className="absolute top-2 right-2 pointer-events-none z-30"
      initial={{ opacity: 0 }}
      animate={{ opacity: isHovered ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="space-y-1 text-right">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              className="flex items-center justify-end gap-2 text-xs font-mono"
              style={{ color, textShadow: '0 1px 4px rgba(0,0,0,0.95)' }}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <span className="opacity-70">{stat.label}</span>
              <Icon className="text-sm" />
              <motion.span
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
              >
                {stat.value}
              </motion.span>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

// Iron Man Armor marks — selector (in normal flow, below the card)
function ArmorSelector({ onSelect, activeAI }) {
  const marks = [
    { id: 'JARVIS', name: 'MK VII' },
    { id: 'FRIDAY', name: 'MK XLVI' },
    { id: 'EDITH', name: 'MK L' },
  ];

  return (
    <div className="flex justify-center gap-2">
      {marks.map((mark) => {
        const active = activeAI === mark.id;
        const color = AI_SYSTEMS[mark.id].color;
        return (
          <motion.button
            key={mark.id}
            type="button"
            className="px-3 py-1.5 text-xs font-mono rounded-md transition-colors"
            style={{
              background: active ? color : 'rgba(255,255,255,0.04)',
              color: active ? '#05080f' : 'rgba(255,255,255,0.72)',
              border: `1px solid ${active ? color : 'rgba(255,255,255,0.18)'}`,
              boxShadow: active ? `0 0 14px ${color}66` : 'none',
              fontWeight: active ? 700 : 500,
            }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelect(mark.id)}
          >
            {mark.name}
          </motion.button>
        );
      })}
    </div>
  );
}

export default function IronManAvatar() {
  const [isHovered, setIsHovered] = useState(false);
  const [isSuitingUp, setIsSuitingUp] = useState(false);
  const [suitProgress, setSuitProgress] = useState(0);
  const [activeAI, setActiveAI] = useState('JARVIS');
  const [showAI, setShowAI] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [revealedAI, setRevealedAI] = useState(null); // which AI's themed look is shown (null = base photo)
  const [failedImages, setFailedImages] = useState({}); // themed images that 404'd → fall back to base

  const containerRef = useRef(null);
  const voicesRef = useRef([]);
  const intervalRef = useRef(null);
  const hideTimerRef = useRef(null);
  const showTimerRef = useRef(null);
  const clickTimerRef = useRef(null);
  const audioEnabledRef = useRef(true);

  const currentAI = AI_SYSTEMS[activeAI];

  // Which image to display — themed look once an AI is activated, else the base photo.
  // Falls back to the base photo if the themed file isn't there yet.
  const displaySrc =
    revealedAI && AI_IMAGES[revealedAI] && !failedImages[revealedAI]
      ? AI_IMAGES[revealedAI]
      : BASE_IMAGE;
  // Themed suit/glasses renders are full figures — fit the whole image (no crop) so the
  // head/helmet isn't sliced off. The base photo stays full-bleed (cover).
  const isThemed = displaySrc !== BASE_IMAGE;

  const handleImgError = () => {
    if (revealedAI && AI_IMAGES[revealedAI]) {
      setFailedImages((prev) => ({ ...prev, [revealedAI]: true }));
    }
  };

  // Keep a ref mirror of audioEnabled for use inside timer callbacks
  useEffect(() => {
    audioEnabledRef.current = audioEnabled;
  }, [audioEnabled]);

  // Load speech-synthesis voices (they populate asynchronously)
  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return undefined;
    const synth = window.speechSynthesis;
    const load = () => { voicesRef.current = synth.getVoices() || []; };
    load();
    synth.addEventListener?.('voiceschanged', load);
    return () => synth.removeEventListener?.('voiceschanged', load);
  }, []);

  // Cleanup timers + any in-flight speech on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
      if (showTimerRef.current) clearTimeout(showTimerRef.current);
      if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Speak an AI's tagline in its matched voice
  const speak = (aiKey) => {
    if (!audioEnabledRef.current) return;
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    const synth = window.speechSynthesis;
    const ai = AI_SYSTEMS[aiKey];
    const prefs = VOICE_PREFS[aiKey];
    try {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(ai.tagline);
      const voice = pickVoice(voicesRef.current, prefs);
      if (voice) utter.voice = voice;
      utter.lang = (voice && voice.lang) || prefs.langs[0];
      utter.pitch = prefs.pitch;
      utter.rate = prefs.rate;
      utter.volume = 1;
      synth.speak(utter);
    } catch (e) {
      /* speech unsupported — fail silently */
    }
  };

  // Transform the avatar to the AI's look, then boot the hologram + speak, then auto-hide.
  // The themed image swaps in first so there's a beat to actually see the suit/glasses
  // before the hologram boots over it.
  const revealAI = (aiKey, holdMs) => {
    setRevealedAI(aiKey); // swap avatar → themed look (persists until the next AI)
    if (showTimerRef.current) clearTimeout(showTimerRef.current);
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    showTimerRef.current = setTimeout(() => {
      setShowAI(true);
      speak(aiKey);
    }, 350);
    hideTimerRef.current = setTimeout(() => setShowAI(false), holdMs);
  };

  // Run the armor assembly animation, then call onDone
  const runSuitUp = (onDone) => {
    setIsSuitingUp(true);
    setSuitProgress(0);
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setSuitProgress((prev) => {
        if (prev >= 100) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          setTimeout(() => {
            setIsSuitingUp(false);
            onDone?.();
          }, 350);
          return 100;
        }
        return prev + 5;
      });
    }, 28);
  };

  // Click the photo: cycle to the next AI WITH the full suit-up animation
  const handleSuitUpCycle = () => {
    if (isSuitingUp) return;
    const systems = Object.keys(AI_SYSTEMS);
    const nextAI = systems[(systems.indexOf(activeAI) + 1) % systems.length];
    setActiveAI(nextAI);
    setShowAI(false);
    runSuitUp(() => revealAI(nextAI, 3800));
  };

  // Click a MK button: quick switch (no suit-up), reveal + speak
  const handleSelectAI = (aiKey) => {
    if (isSuitingUp) return;
    setActiveAI(aiKey);
    revealAI(aiKey, 3000);
  };

  // Revert to the real photo (avatar.jpg): cancel any in-flight suit-up/hologram/voice
  const handleResetToBase = () => {
    if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; }
    if (showTimerRef.current) { clearTimeout(showTimerRef.current); showTimerRef.current = null; }
    if (hideTimerRef.current) { clearTimeout(hideTimerRef.current); hideTimerRef.current = null; }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) window.speechSynthesis.cancel();
    setIsSuitingUp(false);
    setSuitProgress(0);
    setShowAI(false);
    setRevealedAI(null); // displaySrc falls back to the base photo
  };

  // Distinguish single vs double click on the card:
  //  - single click  → suit up / cycle to the next AI
  //  - double click  → revert to the real photo
  // We briefly defer the single-click action so a following click can cancel it.
  const handleCardClick = () => {
    if (clickTimerRef.current) {
      clearTimeout(clickTimerRef.current);
      clickTimerRef.current = null;
      handleResetToBase();
      return;
    }
    clickTimerRef.current = setTimeout(() => {
      clickTimerRef.current = null;
      handleSuitUpCycle();
    }, 220);
  };

  const toggleAudio = (e) => {
    e.stopPropagation();
    setAudioEnabled((prev) => {
      const next = !prev;
      if (!next && typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      return next;
    });
  };

  return (
    <motion.div
      ref={containerRef}
      className="relative"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
    >
      <motion.div
        className="panel p-2 relative overflow-hidden cursor-pointer"
        style={{
          boxShadow: isHovered ? `0 0 30px ${currentAI.color}40` : 'none',
          borderColor: isHovered ? currentAI.color : 'transparent',
          borderWidth: isHovered ? 1 : 0,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleCardClick}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        {/* Audio mute toggle */}
        <button
          type="button"
          onClick={toggleAudio}
          aria-label={audioEnabled ? 'Mute AI voice' : 'Unmute AI voice'}
          title={audioEnabled ? 'Mute AI voice' : 'Unmute AI voice'}
          className="absolute top-2 left-2 z-40 p-1.5 rounded-md pointer-events-auto"
          style={{
            background: 'rgba(2,6,23,0.6)',
            border: `1px solid ${currentAI.color}59`,
            color: currentAI.color,
          }}
        >
          {audioEnabled ? <FiVolume2 className="text-sm" /> : <FiVolumeX className="text-sm" />}
        </button>

        {/* HUD Scanner */}
        <HUDScanner isHovered={isHovered} isActive={showAI} />

        {/* Corner decorations */}
        <motion.div
          className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 z-30 pointer-events-none"
          style={{ borderColor: currentAI.color, opacity: isHovered ? 0.6 : 0.3 }}
          animate={{ opacity: isHovered ? [0.4, 0.8, 0.4] : 0.3 }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 z-30 pointer-events-none"
          style={{ borderColor: currentAI.color, opacity: isHovered ? 0.6 : 0.3 }}
          animate={{ opacity: isHovered ? [0.4, 0.8, 0.4] : 0.3 }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
        />

        {/* Avatar image — crossfades between the base photo and the per-AI themed look */}
        <div
          className="relative w-full aspect-[4/5] rounded-xl overflow-hidden z-10"
          style={{
            background: isThemed
              ? `radial-gradient(circle at 50% 38%, ${currentAI.color}24 0%, #05080f 72%)`
              : 'transparent',
          }}
        >
          <AnimatePresence>
            <motion.img
              key={displaySrc}
              src={displaySrc}
              onError={handleImgError}
              alt={isThemed ? `${currentAI.name} armor` : 'Dhruv Ladani'}
              className={`absolute inset-0 w-full h-full ${isThemed ? 'object-contain' : 'object-cover'}`}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{
                opacity: 1,
                scale: 1,
                filter: isSuitingUp ? 'brightness(1.6) contrast(1.2)' : 'brightness(1)',
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            />
          </AnimatePresence>
        </div>

        {/* Inner glow */}
        <motion.div
          className="absolute inset-2 pointer-events-none rounded-xl z-20"
          style={{
            boxShadow: `inset 0 0 30px ${currentAI.color}20`,
          }}
          animate={{
            boxShadow: isHovered
              ? `inset 0 0 50px ${currentAI.color}30`
              : `inset 0 0 30px ${currentAI.color}10`,
          }}
        />

        {/* Status indicators */}
        <StatusIndicators isHovered={isHovered} color={currentAI.color} />

        {/* Suit-up overlay */}
        <SuitUpOverlay
          isSuitingUp={isSuitingUp}
          progress={suitProgress}
          color={currentAI.color}
          label={activeAI === 'EDITH' ? 'DEPLOYING E.D.I.T.H' : 'ASSEMBLING ARMOR'}
        />

        {/* AI Assistant hologram */}
        <AIAssistant ai={currentAI} isVisible={showAI} />

        {/* Arc reactor pulse */}
        <ArcReactorPulse isActive={isHovered || showAI} />

        {/* Click hint */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 text-xs font-mono z-20 whitespace-nowrap"
          style={{ color: currentAI.color, textShadow: '0 1px 6px rgba(0,0,0,0.95)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered && !showAI && !isSuitingUp ? 0.85 : 0 }}
        >
          <motion.span
            animate={{ opacity: [0.4, 0.9, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {isThemed ? 'Double-click for the real me' : 'Click to suit up →'}
          </motion.span>
        </motion.div>
      </motion.div>

      {/* ----- Below the card: status + selector (in flow, no overlap) ----- */}
      <div className="mt-4">
        {/* Active AI status */}
        <div className="flex items-center justify-center gap-2">
          <motion.span
            className="inline-block w-2 h-2 rounded-full"
            style={{ background: currentAI.color, boxShadow: `0 0 8px ${currentAI.color}` }}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span
            className="font-mono text-sm font-semibold tracking-wider"
            style={{ color: currentAI.color, textShadow: `0 0 12px ${currentAI.color}66` }}
          >
            {currentAI.name} ONLINE
          </span>
        </div>
        <div className="text-center font-mono text-[10px] tracking-[0.3em] uppercase text-slate-400 mt-1 mb-3">
          Neural Interface Active
        </div>

        {/* Armor / AI selector */}
        <ArmorSelector onSelect={handleSelectAI} activeAI={activeAI} />
      </div>
    </motion.div>
  );
}
