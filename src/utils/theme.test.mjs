import test from 'node:test';
import assert from 'node:assert';
import { getInitialTheme, THEME_STORAGE_KEY } from './theme.mjs';

test('getInitialTheme', async (t) => {
  const originalWindow = global.window;

  t.afterEach(() => {
    global.window = originalWindow;
  });

  await t.test('returns "dark" when window is undefined', () => {
    global.window = undefined;
    assert.strictEqual(getInitialTheme(), 'dark');
  });

  await t.test('returns stored theme from localStorage if it is "light"', () => {
    const mockLocalStorage = {
      getItem: (key) => {
        if (key === THEME_STORAGE_KEY) return 'light';
        return null;
      }
    };
    global.window = {
      localStorage: mockLocalStorage,
      matchMedia: () => ({ matches: false })
    };
    assert.strictEqual(getInitialTheme(), 'light');
  });

  await t.test('returns stored theme from localStorage if it is "dark"', () => {
    const mockLocalStorage = {
      getItem: (key) => {
        if (key === THEME_STORAGE_KEY) return 'dark';
        return null;
      }
    };
    global.window = {
      localStorage: mockLocalStorage,
      matchMedia: () => ({ matches: false })
    };
    assert.strictEqual(getInitialTheme(), 'dark');
  });

  await t.test('returns theme from matchMedia if localStorage is empty (prefers light)', () => {
    const mockLocalStorage = {
      getItem: () => null
    };
    global.window = {
      localStorage: mockLocalStorage,
      matchMedia: (query) => {
        if (query === '(prefers-color-scheme: light)') {
          return { matches: true };
        }
        return { matches: false };
      }
    };
    assert.strictEqual(getInitialTheme(), 'light');
  });

  await t.test('returns theme from matchMedia if localStorage is empty (prefers dark)', () => {
    const mockLocalStorage = {
      getItem: () => null
    };
    global.window = {
      localStorage: mockLocalStorage,
      matchMedia: (query) => {
        if (query === '(prefers-color-scheme: light)') {
          return { matches: false };
        }
        return { matches: true };
      }
    };
    assert.strictEqual(getInitialTheme(), 'dark');
  });

  await t.test('ignores invalid theme in localStorage and uses matchMedia', () => {
    const mockLocalStorage = {
      getItem: (key) => {
        if (key === THEME_STORAGE_KEY) return 'invalid-theme';
        return null;
      }
    };
    global.window = {
      localStorage: mockLocalStorage,
      matchMedia: (query) => {
        if (query === '(prefers-color-scheme: light)') {
          return { matches: true };
        }
        return { matches: false };
      }
    };
    assert.strictEqual(getInitialTheme(), 'light');
  });
});
