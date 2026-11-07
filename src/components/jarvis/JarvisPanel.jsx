'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FiX, FiMinus, FiMic, FiMicOff, FiSend, FiPhoneOff, FiMessageSquare, FiFileText, FiArrowUpRight, FiDownload } from 'react-icons/fi';
import ArcReactorCanvas from '../ArcReactorCanvas';
import BriefPlayer from './BriefPlayer';
import RichText from './RichText';
import { resolveToolCall } from './clientTools';
import { friendlyError } from './errors';
import { askJarvis } from './chatClient';
import { startVoiceSession } from './voiceSession';
import { projects } from '../../data/projects';
import { CONTACT_EMAIL } from '../../data/recruiter-faq';

const MAX_CHAT_CHARS = 1000;
const MAX_JD_CHARS = 6000;

// Optional "I'm here as…" picker. It only tunes suggestions and tells the
// agent who it's talking to ({{audience}}); visitors never have to choose.
const AUDIENCES = [
  {
    id: 'hiring',
    label: 'Hiring',
    agentLabel: 'recruiter or hiring manager',
    suggestions: ['Give me the 60-second brief', 'What roles is he looking for?', 'When can he start?'],
    jd: true,
  },
  {
    id: 'engineer',
    label: 'Engineer',
    agentLabel: 'fellow engineer',
    suggestions: [
      'How does Tollgate decide which tool calls to block?',
      'How does he evaluate his RAG systems?',
      "What's his go-to stack?",
      "What's he building on the side?",
    ],
  },
  {
    id: 'student',
    label: 'Student',
    agentLabel: 'student or fresher',
    suggestions: [
      'How did he get into AI and ML?',
      'Which language should I learn first?',
      'What resources does he recommend?',
      'Can I ask him for career advice?',
    ],
  },
  {
    id: 'friend',
    label: 'Just visiting',
    agentLabel: 'friend or casual visitor',
    suggestions: ["What's Dhruv up to these days?", 'What does he do outside work?', 'What kind of music does he make?', 'Explain his work in plain English'],
  },
];
const DEFAULT_SUGGESTIONS = [
  'Give me the 60-second brief',
  'How did he get into AI and ML?',
  'Explain Tollgate in 30 seconds',
  'What roles is he looking for?',
];

const JD_MESSAGE = (jd) => `Here is a job description. How well does Dhruv fit it?\n\n${jd}`;

const isSmallScreen = () => typeof window !== 'undefined' && window.matchMedia('(max-width: 640px)').matches;

let nextId = 1;
const item = (kind, fields) => ({ id: nextId++, kind, ...fields });

export default function JarvisPanel({ view, request, onClose, onMinimize, onLiveChange }) {
  const router = useRouter();
  const pathname = usePathname();
  const titleId = useId();

  const [tab, setTab] = useState('voice');
  const [items, setItems] = useState([]);
  const [awaiting, setAwaiting] = useState(false);
  const [notice, setNotice] = useState(null);
  const [input, setInput] = useState('');
  const [jdMode, setJdMode] = useState(false);
  const [audience, setAudience] = useState(null); // an AUDIENCES entry, or null
  const [voiceStatus, setVoiceStatus] = useState('idle'); // 'idle' | 'connecting' | 'live'
  const [speaking, setSpeaking] = useState(false);
  const [muted, setMuted] = useState(false);
  const [caption, setCaption] = useState('');

  const itemsRef = useRef(items);
  itemsRef.current = items;
  const pathnameRef = useRef(pathname);
  pathnameRef.current = pathname;
  const audienceRef = useRef(null);
  const voiceRef = useRef(null); // controller from startVoiceSession
  const chatAbortRef = useRef(null);
  const greetedRef = useRef(false);
  const handledRequestRef = useRef(null);
  const logRef = useRef(null);
  const inputRef = useRef(null);
  const panelRef = useRef(null);

  const voiceLive = voiceStatus === 'live';
  const voiceBusy = voiceStatus !== 'idle';
  const push = useCallback((entry) => setItems((list) => [...list, entry]), []);

  useEffect(() => {
    onLiveChange?.(voiceLive);
  }, [voiceLive, onLiveChange]);

  // --- site actions (tool calls) --------------------------------------------

  const runAction = useCallback(
    (name, args) => {
      const action = resolveToolCall(name, args, { projects });
      if (action.type === 'error') return action.message;
      if (action.type === 'navigate') {
        router.push(action.href);
        push(item('action', { text: `Opened ${action.label || action.href}`, href: action.href }));
        if (isSmallScreen()) onMinimize();
        return 'Opened.';
      }
      // Links (resume PDFs) become a card the visitor clicks — opening a tab
      // from a tool call would be popup-blocked, and surprising.
      push(item('action', { text: action.label, href: action.href, download: action.download }));
      return 'Shown to the visitor as a link.';
    },
    [router, push, onMinimize],
  );

  // --- voice -----------------------------------------------------------------

  const stopVoice = useCallback(() => voiceRef.current?.stop(), []);

  const startVoice = useCallback(() => {
    if (voiceRef.current) return;
    setNotice(null);
    setCaption('');
    setMuted(false);
    let greetingTurn = true; // every session opens with the greeting; log it once
    voiceRef.current = startVoiceSession({
      page: pathnameRef.current || '/',
      audience: audienceRef.current?.agentLabel || 'unspecified',
      onStatus: (s) => setVoiceStatus(s === 'ended' ? 'idle' : s),
      onUserText: (text) => push(item('user', { text })),
      onAgentText: (text, final) => {
        setCaption(text);
        if (!final) return;
        if (greetingTurn) {
          greetingTurn = false;
          if (greetedRef.current) return;
          greetedRef.current = true;
        }
        push(item('agent', { text }));
      },
      onAction: runAction,
      onEnd: (err) => {
        voiceRef.current = null;
        setSpeaking(false);
        if (!err) return;
        const n = friendlyError(err.kind);
        setNotice(n);
        if (n.mic) setTab('chat');
      },
    });
  }, [push, runAction]);

  const toggleMute = () => {
    const next = !muted;
    setMuted(next);
    voiceRef.current?.setMuted(next);
  };

  // "Speaking" vs "Listening" for the status line.
  useEffect(() => {
    if (!voiceLive) return undefined;
    const t = setInterval(() => setSpeaking(Boolean(voiceRef.current?.isSpeaking())), 200);
    return () => clearInterval(t);
  }, [voiceLive]);

  const getLevel = useCallback(() => voiceRef.current?.getLevel() ?? 0, []);

  // --- chat ------------------------------------------------------------------

  const send = useCallback(
    async (raw) => {
      const text = raw.trim().slice(0, jdMode ? MAX_JD_CHARS + 100 : MAX_CHAT_CHARS);
      if (!text || chatAbortRef.current) return; // one question at a time
      const userItem = item('user', { text });
      const history = [...itemsRef.current, userItem];
      push(userItem);
      setAwaiting(true);
      setNotice(null);
      const ac = new AbortController();
      chatAbortRef.current = ac;
      try {
        const reply = await askJarvis({
          items: history,
          page: pathnameRef.current || '/',
          audience: audienceRef.current?.agentLabel || 'unspecified',
          signal: ac.signal,
        });
        if (reply.text) push(item('agent', { text: reply.text }));
        for (const a of reply.actions) runAction(a.name, a.args);
      } catch (err) {
        if (err?.name !== 'AbortError') setNotice(friendlyError(err?.kind));
      } finally {
        if (chatAbortRef.current === ac) chatAbortRef.current = null;
        setAwaiting(false);
      }
    },
    [jdMode, push, runAction],
  );

  const submit = (e) => {
    e?.preventDefault();
    if (!input.trim() || awaiting) return;
    send(jdMode ? JD_MESSAGE(input.trim().slice(0, MAX_JD_CHARS)) : input);
    setInput('');
    setJdMode(false);
  };

  // Requests from elsewhere on the site, e.g. "Ask J.A.R.V.I.S. about this project".
  useEffect(() => {
    // Each request runs once, even when React re-runs effects (Strict Mode).
    if (!request || handledRequestRef.current === request.nonce) return;
    handledRequestRef.current = request.nonce;
    setTab(request.mode === 'voice' ? 'voice' : 'chat');
    if (request.prompt) send(request.prompt);
    // a new request is identified by its nonce
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [request?.nonce]);

  // --- lifecycle -------------------------------------------------------------

  // Closing the panel ends voice and drops an unanswered question;
  // minimizing keeps both.
  useEffect(() => {
    if (view !== 'closed') return;
    stopVoice();
    chatAbortRef.current?.abort();
  }, [view, stopVoice]);

  useEffect(
    () => () => {
      voiceRef.current?.stop();
      chatAbortRef.current?.abort();
    },
    [],
  );

  // The audience applies to the next question or voice session.
  const chooseAudience = (a) => {
    setAudience(a);
    audienceRef.current = a;
  };

  // --- tabs, focus, keyboard -------------------------------------------------

  const switchTab = (next) => {
    setTab(next);
    // Don't keep the microphone open while the visitor types.
    if (next === 'chat') stopVoice();
  };

  useEffect(() => {
    if (view !== 'open') return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const t = setTimeout(() => {
      if (tab === 'chat') inputRef.current?.focus();
      else panelRef.current?.querySelector('[data-autofocus]')?.focus();
    }, 60);
    return () => {
      document.removeEventListener('keydown', onKey);
      clearTimeout(t);
    };
  }, [view, tab, onClose]);

  useEffect(() => {
    const log = logRef.current;
    if (log) log.scrollTop = log.scrollHeight;
  }, [items, awaiting, tab]);

  // --- render ----------------------------------------------------------------

  let statusKey = 'idle';
  let statusLabel = 'Standby';
  if (voiceStatus === 'connecting') {
    statusKey = 'connecting';
    statusLabel = 'Connecting';
  } else if (voiceLive) {
    statusKey = speaking ? 'speaking' : 'live';
    statusLabel = speaking ? 'Speaking' : 'Listening';
  } else if (awaiting) {
    statusKey = 'connecting';
    statusLabel = 'Thinking';
  } else if (notice?.error) {
    statusKey = 'error';
    statusLabel = 'Offline';
  }

  const actions = items.filter((i) => i.kind === 'action').slice(-2);
  const hasUserMessage = items.some((i) => i.kind === 'user');

  return (
    <motion.section
      ref={panelRef}
      id="jarvis-panel"
      role="dialog"
      aria-modal="false"
      aria-labelledby={titleId}
      className="jarvis-panel"
      inert={view !== 'open'}
      initial="hidden"
      animate={view === 'open' ? 'shown' : 'hidden'}
      variants={{
        shown: { opacity: 1, y: 0, scale: 1, visibility: 'visible', transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] } },
        hidden: { opacity: 0, y: 18, scale: 0.98, transitionEnd: { visibility: 'hidden' }, transition: { duration: 0.2 } },
      }}
    >
      <span className="jarvis-corner jarvis-corner--tl" aria-hidden />
      <span className="jarvis-corner jarvis-corner--br" aria-hidden />

      <header className="jarvis-head">
        <div className="flex items-center gap-3 min-w-0">
          <span className="jarvis-status-dot" data-status={statusKey} aria-hidden />
          <div className="min-w-0">
            <h2 id={titleId} className="font-display text-sm font-semibold tracking-[0.22em] text-white">
              J.A.R.V.I.S.
            </h2>
            <p className="font-mono text-[10px] uppercase tracking-[0.26em]" style={{ color: 'var(--arc-blue)' }} aria-live="polite">
              {statusLabel}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {voiceBusy && (
            <button type="button" className="jarvis-icon-btn" onClick={onMinimize} aria-label="Minimize, keep the conversation running">
              <FiMinus />
            </button>
          )}
          <button type="button" className="jarvis-icon-btn" onClick={onClose} aria-label="Close J.A.R.V.I.S.">
            <FiX />
          </button>
        </div>
      </header>

      <div role="tablist" aria-label="Conversation mode" className="jarvis-tabs">
        <button type="button" role="tab" id={`${titleId}-voice`} aria-selected={tab === 'voice'} aria-controls={`${titleId}-voice-panel`} className="jarvis-tab" onClick={() => switchTab('voice')}>
          <FiMic aria-hidden /> Voice
        </button>
        <button type="button" role="tab" id={`${titleId}-chat`} aria-selected={tab === 'chat'} aria-controls={`${titleId}-chat-panel`} className="jarvis-tab" onClick={() => switchTab('chat')}>
          <FiMessageSquare aria-hidden /> Chat
        </button>
      </div>

      <div className="jarvis-audience" role="group" aria-label="I'm here as (optional)">
        <span className="jarvis-audience-label" aria-hidden>I&apos;m here as</span>
        {AUDIENCES.map((a) => (
          <button
            key={a.id}
            type="button"
            className="jarvis-audience-btn"
            aria-pressed={audience?.id === a.id}
            onClick={() => chooseAudience(audience?.id === a.id ? null : a)}
          >
            {a.label}
          </button>
        ))}
      </div>

      {notice && (
        <div className="jarvis-notice" role="status">
          <p>{notice.text}</p>
          <p className="mt-1 flex flex-wrap gap-x-4 gap-y-1">
            <Link href="/contact?form=hiring" className="jarvis-link">Contact form</Link>
            <a href={`mailto:${CONTACT_EMAIL}`} className="jarvis-link">{CONTACT_EMAIL}</a>
          </p>
        </div>
      )}

      {tab === 'voice' ? (
        <div role="tabpanel" id={`${titleId}-voice-panel`} aria-labelledby={`${titleId}-voice`} className="jarvis-voice">
          <div className="jarvis-reactor">
            <ArcReactorCanvas resolution={420} getLevel={voiceLive ? getLevel : undefined} label="J.A.R.V.I.S. voice activity" />
          </div>

          <p className="jarvis-caption" aria-live="polite">
            {caption ||
              (voiceStatus === 'connecting'
                ? 'Connecting…'
                : voiceLive
                  ? 'Listening…'
                  : 'Talk to J.A.R.V.I.S. about Dhruv — his projects, skills, availability, or fit for your role.')}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {voiceLive ? (
              <>
                <button type="button" className="btn-secondary" onClick={toggleMute} aria-pressed={muted}>
                  {muted ? <FiMicOff aria-hidden /> : <FiMic aria-hidden />}
                  {muted ? 'Unmute' : 'Mute'}
                </button>
                <button type="button" className="btn-primary" onClick={stopVoice}>
                  <FiPhoneOff aria-hidden /> End
                </button>
              </>
            ) : (
              <button type="button" className="btn-primary" data-autofocus onClick={startVoice} disabled={voiceBusy}>
                <FiMic aria-hidden />
                {voiceStatus === 'connecting' ? 'Connecting…' : 'Start voice conversation'}
              </button>
            )}
          </div>
          <p className="text-xs text-slate-400 text-center">
            Speak naturally — English, हिंदी or ગુજરાતી. Uses your microphone; sessions end after five minutes.
          </p>

          {actions.length > 0 && (
            <ul className="w-full grid gap-2">
              {actions.map((a) => (
                <ActionCard key={a.id} action={a} />
              ))}
            </ul>
          )}

          <BriefPlayer id="overview" disabled={voiceBusy} className="w-full" />
        </div>
      ) : (
        <div role="tabpanel" id={`${titleId}-chat-panel`} aria-labelledby={`${titleId}-chat`} className="jarvis-chat">
          <ol ref={logRef} className="jarvis-log" aria-live="polite" aria-relevant="additions">
            {items.length === 0 && (
              <li className="jarvis-msg jarvis-msg--agent">
                <span className="jarvis-msg-label">J.A.R.V.I.S.</span>
                Good day. Ask me anything about Dhruv&apos;s work, his projects, or how he got here — whether you&apos;re hiring, building, studying or just curious.
              </li>
            )}
            {items.map((it) =>
              it.kind === 'action' ? (
                <ActionCard key={it.id} action={it} />
              ) : (
                <li key={it.id} className={`jarvis-msg jarvis-msg--${it.kind}`}>
                  <span className="jarvis-msg-label">{it.kind === 'user' ? 'You' : 'J.A.R.V.I.S.'}</span>
                  {it.kind === 'agent' ? <RichText text={it.text} /> : <span className="whitespace-pre-wrap break-words">{it.text}</span>}
                </li>
              ),
            )}
            {awaiting && (
              <li className="jarvis-msg jarvis-msg--agent" aria-label="J.A.R.V.I.S. is typing">
                <span className="jarvis-typing" aria-hidden>
                  <span />
                  <span />
                  <span />
                </span>
              </li>
            )}
          </ol>

          {!hasUserMessage && !jdMode && (
            <div className="jarvis-chips">
              {(audience?.suggestions || DEFAULT_SUGGESTIONS).map((s) => (
                <button key={s} type="button" className="jarvis-chip" disabled={awaiting} onClick={() => send(s)}>
                  {s}
                </button>
              ))}
              {(!audience || audience.jd) && (
                <button type="button" className="jarvis-chip jarvis-chip--gold" onClick={() => { setJdMode(true); setTimeout(() => inputRef.current?.focus(), 0); }}>
                  <FiFileText aria-hidden /> Match him to my job description
                </button>
              )}
            </div>
          )}

          <form className="jarvis-input" onSubmit={submit}>
            <label htmlFor={`${titleId}-input`} className="sr-only">
              {jdMode ? 'Paste a job description' : 'Message J.A.R.V.I.S.'}
            </label>
            <textarea
              ref={inputRef}
              id={`${titleId}-input`}
              rows={jdMode ? 6 : 1}
              value={input}
              maxLength={jdMode ? MAX_JD_CHARS : MAX_CHAT_CHARS}
              placeholder={jdMode ? 'Paste the job description here…' : 'Ask about Dhruv…'}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                // Enter sends; Shift+Enter is a newline. In JD mode use Ctrl/⌘+Enter.
                if (e.key === 'Enter' && !e.shiftKey && (!jdMode || e.metaKey || e.ctrlKey)) submit(e);
              }}
            />
            <div className="flex flex-col gap-2">
              {jdMode && (
                <button type="button" className="jarvis-icon-btn" onClick={() => { setJdMode(false); setInput(''); }} aria-label="Cancel job description">
                  <FiX />
                </button>
              )}
              <button type="submit" className="jarvis-send" disabled={!input.trim() || awaiting} aria-label={jdMode ? 'Assess fit' : 'Send'}>
                <FiSend aria-hidden />
              </button>
            </div>
          </form>
        </div>
      )}

      <p className="jarvis-foot">
        Answers come from Dhruv&apos;s portfolio and may be imperfect · Processed by Google Gemini
      </p>
    </motion.section>
  );
}

function ActionCard({ action }) {
  const isPdf = action.download;
  return (
    <li className="jarvis-action">
      <span className="truncate">{action.text}</span>
      {isPdf ? (
        <a href={action.href} target="_blank" rel="noreferrer" className="jarvis-link inline-flex items-center gap-1 shrink-0">
          Open <FiDownload aria-hidden />
        </a>
      ) : (
        <Link href={action.href} className="jarvis-link inline-flex items-center gap-1 shrink-0">
          Go <FiArrowUpRight aria-hidden />
        </Link>
      )}
    </li>
  );
}
