import { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(true);

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
    }
  }, []);

  // Save theme to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  // Toggle a class on the document element so we can apply global light-mode overrides
  useEffect(() => {
    try {
      if (isDark) {
        document.documentElement.classList.remove('light-theme');
        document.documentElement.classList.add('dark-theme');
      } else {
        document.documentElement.classList.remove('dark-theme');
        document.documentElement.classList.add('light-theme');
      }
    } catch (e) {
      // SSR or environments without document
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const theme = {
    isDark,
    toggleTheme,
    colors: isDark
      ? {
          bg: '#110053',
          bgSecondary: '#1a0066',
          text: '#ffffff',
          textSecondary: '#d4d4d4',
          navBg: 'rgba(255, 255, 255, 0.1)',
          cardBg: 'rgba(255, 255, 255, 0.05)',
          accent: '#00ffff',
          accentHover: '#00dddd',
          border: 'rgba(255, 255, 255, 0.2)',
        }
      : {
          bg: '#f5f5f5',
          bgSecondary: '#ffffff',
          text: '#000000',
          textSecondary: '#4a4a4a',
          navBg: 'rgba(0, 0, 0, 0.05)',
          cardBg: 'rgba(0, 0, 0, 0.02)',
          accent: '#0066cc',
          accentHover: '#0052a3',
          border: 'rgba(0, 0, 0, 0.1)',
        },
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};
