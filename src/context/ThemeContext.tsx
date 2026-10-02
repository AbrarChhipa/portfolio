import React, { createContext, useContext, useState, useEffect } from 'react';
import { THEMES } from '../data/portfolioData';

interface ThemeContextType {
  themeId: string;
  setThemeId: (id: string) => void;
  themes: typeof THEMES;
  currentTheme: typeof THEMES[0];
}

const STORAGE_KEY = 'abrar-portfolio-theme';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeId, setThemeId] = useState<string>(() => {
    return localStorage.getItem(STORAGE_KEY) || 'default';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (themeId === 'default') {
      root.removeAttribute('data-theme');
    } else {
      root.setAttribute('data-theme', themeId);
    }
    localStorage.setItem(STORAGE_KEY, themeId);
  }, [themeId]);

  const currentTheme = THEMES.find((t) => t.id === themeId) || THEMES[0];

  return (
    <ThemeContext.Provider value={{ themeId, setThemeId, themes: THEMES, currentTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
