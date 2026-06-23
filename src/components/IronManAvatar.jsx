import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCpu, FiZap, FiShield, FiRadio, FiActivity, FiTarget, FiBox } from 'react-icons/fi';

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
function SuitUpOverlay({ isSuitingUp, progress }) {
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
              background: 'linear-gradient(0deg, rgba(0, 217, 255, 0.3) 0%, transparent 100%)',
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
                linear-gradient(rgba(0, 217, 255, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 217, 255, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px',
            }}
          />

          {/* Circuit lines */}
          <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.5 }}>
            <motion.path
              d="M 0 50% L 100% 50%"
              stroke="#00d9ff"
              strokeWidth="1"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: progress / 100 }}
            />
          </svg>

          {/* Progress bar */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-1"
            style={{ background: 'rgba(0, 0, 0, 0.5)' }}
          >
            <motion.div
              className="h-full"
              style={{
                background: '#00d9ff',
                width: `${progress}%`,
                boxShadow: '0 0 10px #00d9ff',
              }}
            />
          </motion.div>
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
          <motion.div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${ai.color}20 0%, transparent 70%)`,
            }}
          />

          {/* AI Name */}
          <motion.div
            className="text-center relative z-10"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <motion.div
              className="font-mono text-2xl md:text-3xl font-bold mb-2"
              style={{ color: ai.color, textShadow: `0 0 20px ${ai.color}` }}
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {ai.name}
            </motion.div>
            <motion.div
              className="font-mono text-xs opacity-60"
              style={{ color: ai.color }}
            >
              {ai.fullName}
            </motion.div>
            <motion.div
              className="font-mono text-sm mt-4"
              style={{ color: ai.color }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {ai.tagline}
            </motion.div>

            {/* System status lines */}
            <div className="mt-6 space-y-1">
              {lines.map((line, i) => (
                <motion.div
                  key={i}
                  className="font-mono text-xs"
                  style={{ color: ai.color, opacity: 0.5 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 0.5, x: 0 }}
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
            <motion.div
              className="mt-4 font-mono text-xs opacity-40"
              style={{ color: ai.color }}
            >
              {ai.version}
            </motion.div>
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
function StatusIndicators({ isHovered }) {
  const stats = [
    { icon: FiCpu, label: 'CPU', value: '94%' },
    { icon: FiZap, label: 'PWR', value: '100%' },
    { icon: FiShield, label: 'DEF', value: 'ACTIVE' },
    { icon: FiRadio, label: 'COM', value: 'ONLINE' },
  ];

  return (
    <motion.div
      className="absolute top-2 right-2 pointer-events-none"
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
              style={{ color: 'var(--arc-blue)' }}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <span className="opacity-60">{stat.label}</span>
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

// Iron Man Armor marks - mini display
function ArmorSelector({ onSelect, activeAI }) {
  const marks = [
    { id: 'JARVIS', name: 'MK VII', desc: 'JARVIS' },
    { id: 'FRIDAY', name: 'MK XLVI', desc: 'F.R.I.D.A.Y' },
    { id: 'EDITH', name: 'MK L', desc: 'E.D.I.T.H' },
  ];

  return (
    <motion.div
      className="absolute bottom-2 left-2 right-2 pointer-events-none z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      <div className="flex justify-center gap-2">
        {marks.map((mark) => (
          <motion.button
            key={mark.id}
            className="px-2 py-1 text-xs font-mono rounded pointer-events-auto"
            style={{
              background: activeAI === mark.id ? AI_SYSTEMS[mark.id].color : 'rgba(0,0,0,0.3)',
              color: activeAI === mark.id ? '#000' : 'rgba(255,255,255,0.5)',
              border: `1px solid ${activeAI === mark.id ? AI_SYSTEMS[mark.id].color : 'rgba(255,255,255,0.2)'}`,
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelect(mark.id)}
          >
            {mark.name}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}

export default function IronManAvatar() {
  const [isHovered, setIsHovered] = useState(false);
  const [isSuitingUp, setIsSuitingUp] = useState(false);
  const [suitProgress, setSuitProgress] = useState(0);
  const [activeAI, setActiveAI] = useState('JARVIS');
  const [showAI, setShowAI] = useState(false);
  const containerRef = useRef(null);

  const currentAI = AI_SYSTEMS[activeAI];

  // Suit-up animation
  const handleSuitUp = () => {
    if (isSuitingUp) return;

    setIsSuitingUp(true);
    setSuitProgress(0);

    // Animate progress
    const interval = setInterval(() => {
      setSuitProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsSuitingUp(false);
            setShowAI(true);
            setTimeout(() => setShowAI(false), 3000);
          }, 500);
          return 100;
        }
        return prev + 5;
      });
    }, 30);
  };

  // Cycle AI on click
  const handleCycleAI = () => {
    if (isSuitingUp) return;

    const systems = Object.keys(AI_SYSTEMS);
    const currentIndex = systems.indexOf(activeAI);
    const nextIndex = (currentIndex + 1) % systems.length;
    setActiveAI(systems[nextIndex]);
    setShowAI(true);
    setTimeout(() => setShowAI(false), 2000);
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
        onClick={handleCycleAI}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        {/* HUD Scanner */}
        <HUDScanner isHovered={isHovered} isActive={showAI} />

        {/* Corner decorations */}
        <motion.div
          className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2"
          style={{ borderColor: currentAI.color, opacity: isHovered ? 0.6 : 0.3 }}
          animate={{ opacity: isHovered ? [0.4, 0.8, 0.4] : 0.3 }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2"
          style={{ borderColor: currentAI.color, opacity: isHovered ? 0.6 : 0.3 }}
          animate={{ opacity: isHovered ? [0.4, 0.8, 0.4] : 0.3 }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
        />

        {/* Avatar Image */}
        <motion.img
          src="/avatar.jpg"
          alt="Dhruv Ladani"
          className="w-full aspect-[4/5] object-cover rounded-xl relative z-10"
          animate={{
            filter: isSuitingUp ? 'brightness(1.5) contrast(1.2)' : 'brightness(1)',
          }}
        />

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
        <StatusIndicators isHovered={isHovered} />

        {/* Suit-up overlay */}
        <SuitUpOverlay isSuitingUp={isSuitingUp} progress={suitProgress} />

        {/* AI Assistant hologram */}
        <AIAssistant ai={currentAI} isVisible={showAI} />

        {/* Arc reactor pulse */}
        <ArcReactorPulse isActive={isHovered || showAI} />

        {/* Click hint */}
        <motion.div
          className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs font-mono z-20"
          style={{ color: currentAI.color }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered && !showAI ? 0.7 : 0 }}
        >
          <motion.span
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Click to activate AI system
          </motion.span>
        </motion.div>
      </motion.div>

      {/* Armor selector */}
      <ArmorSelector onSelect={setActiveAI} activeAI={activeAI} />

      {/* Active AI indicator below */}
      <motion.div
        className="mt-4 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.div
          className="font-mono text-xs"
          style={{ color: currentAI.color }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {currentAI.name} ONLINE
        </motion.div>
        <div className="font-mono text-xs opacity-30 mt-1">
          Neural Interface Active
        </div>
      </motion.div>
    </motion.div>
  );
}
