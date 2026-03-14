import { useEffect, useState } from 'react';
import type { ThemeName } from '../types';

const STORAGE_KEY = 'glyphui-theme';

const prefersDark = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

export const useTheme = (): [ThemeName, (theme: ThemeName) => void] => {
  const [theme, setThemeState] = useState<ThemeName>(() => {
    const stored = window?.localStorage?.getItem(STORAGE_KEY) as ThemeName | null;
    if (stored) return stored;
    return prefersDark() ? 'dark' : 'light';
  });

  useEffect(() => {
    document.body.dataset.theme = theme;
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const setTheme = (value: ThemeName) => setThemeState(value);

  return [theme, setTheme];
};
