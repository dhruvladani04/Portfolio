'use client';

import { useEffect, useRef, useState } from 'react';
import { FiPause, FiPlay } from 'react-icons/fi';
import { BRIEFS } from '../../data/briefs';
import briefAudio from '../../data/brief-audio.json';

// Only one brief plays at a time across the whole site.
let activeAudio = null;

export function hasBriefAudio(id) {
  return Boolean(id && briefAudio[id]?.src);
}

function fmt(sec) {
  if (!Number.isFinite(sec)) return '';
  const s = Math.round(sec);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}

// Plays a pre-recorded brief (static MP3, zero runtime cost) with a readable
// transcript for anyone who can't or won't play audio.
export default function BriefPlayer({ id, label, disabled = false, className = '' }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(NaN);
  const brief = BRIEFS[id];
  const src = briefAudio[id]?.src;

  useEffect(() => {
    const audio = audioRef.current;
    return () => {
      if (audio && activeAudio === audio) activeAudio = null;
      audio?.pause();
    };
  }, []);

  useEffect(() => {
    if (disabled && playing) audioRef.current?.pause();
  }, [disabled, playing]);

  if (!brief || !src) return null;

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      if (activeAudio && activeAudio !== audio) activeAudio.pause();
      activeAudio = audio;
      audio.play().catch(() => setPlaying(false));
    } else {
      audio.pause();
    }
  };

  const text = label || brief.title;

  return (
    <div className={`brief-player ${className}`}>
      <button
        type="button"
        className="brief-player-btn"
        onClick={toggle}
        disabled={disabled}
        aria-pressed={playing}
        aria-label={`${playing ? 'Pause' : 'Play'} recorded ${text}`}
      >
        <span className="brief-player-icon" aria-hidden>
          {playing ? <FiPause /> : <FiPlay />}
        </span>
        <span className="flex flex-col items-start min-w-0">
          <span className="brief-player-label">{text}</span>
          <span className="brief-player-bar" aria-hidden>
            <span style={{ width: `${Math.round(progress * 100)}%` }} />
          </span>
        </span>
        <span className="brief-player-time" aria-hidden>
          {fmt(playing || progress ? (duration || 0) * progress : duration)}
        </span>
      </button>
      <details className="brief-player-transcript">
        <summary>Read transcript</summary>
        <p>{brief.text}</p>
      </details>
      <audio
        ref={audioRef}
        src={src}
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => {
          setPlaying(false);
          setProgress(0);
        }}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onTimeUpdate={(e) => {
          const a = e.currentTarget;
          if (a.duration) setProgress(a.currentTime / a.duration);
        }}
      />
    </div>
  );
}
