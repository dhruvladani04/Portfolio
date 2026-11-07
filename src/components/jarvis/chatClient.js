// Chat with J.A.R.V.I.S. through the /api/jarvis/chat function (Gemini on the
// server; the key never reaches the browser). Stateless: the recent
// conversation goes with every question.

export class ChatError extends Error {
  constructor(kind, message) {
    super(message || kind);
    this.kind = kind; // 'busy' | 'offline'
  }
}

const HISTORY_TURNS = 12;

// Log items ({ kind: 'user' | 'agent', text }) → API messages.
export function toMessages(items) {
  return items
    .filter((i) => (i.kind === 'user' || i.kind === 'agent') && i.text)
    .slice(-HISTORY_TURNS)
    .map((i) => ({ role: i.kind === 'user' ? 'user' : 'model', text: i.text }));
}

export async function askJarvis({ items, page, audience, signal }) {
  let res;
  try {
    res = await fetch('/api/jarvis/chat/', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ messages: toMessages(items), page, audience }),
      signal,
    });
  } catch (err) {
    if (err?.name === 'AbortError') throw err;
    throw new ChatError('offline', err?.message);
  }
  if (res.status === 429) throw new ChatError('busy');
  if (!res.ok) throw new ChatError('offline', `chat ${res.status}`);
  const data = await res.json();
  return { text: typeof data.text === 'string' ? data.text : '', actions: Array.isArray(data.actions) ? data.actions : [] };
}
