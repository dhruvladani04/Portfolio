// What a visitor reads when J.A.R.V.I.S. can't help. `kind` comes from
// ChatError / VoiceError ('mic' | 'busy' | 'offline' | 'timeout' | 'ended').
// Plain JS so node:test can cover it (see errors.test.mjs).
export function friendlyError(kind = '') {
  switch (kind) {
    case 'mic':
      return {
        text: 'Microphone access is blocked. Allow it in your browser settings, or type in the Chat tab instead.',
        mic: true,
        error: true,
      };
    case 'busy':
      return {
        text: 'J.A.R.V.I.S. is at capacity right now. Try again in a little while — Dhruv is still one message away.',
        error: true,
      };
    case 'ended':
      return { text: 'Voice sessions last five minutes. Start another any time, or carry on in Chat.' };
    default:
      return { text: "Couldn't reach J.A.R.V.I.S. just now. Try again in a moment, or contact Dhruv directly.", error: true };
  }
}
