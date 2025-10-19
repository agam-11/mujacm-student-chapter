import { createContext } from 'react';

export interface ThemeValue {
  isDark: boolean;
  toggleTheme: () => void;
  colors: {
    bg: string;
    bgSecondary: string;
    text: string;
    textSecondary: string;
    navBg: string;
    cardBg: string;
    accent: string;
    accentHover: string;
    border: string;
  };
}

// Export only the context (non-component) from this file to satisfy fast-refresh rules
const ThemeContext = createContext<ThemeValue>({
  isDark: true,
  toggleTheme: () => {},
  colors: {
    bg: '#110053',
    bgSecondary: '#1a0066',
    text: '#ffffff',
    textSecondary: '#d4d4d4',
    navBg: 'rgba(255, 255, 255, 0.1)',
    cardBg: 'rgba(255, 255, 255, 0.05)',
    accent: '#00ffff',
    accentHover: '#00dddd',
    border: 'rgba(255, 255, 255, 0.2)',
  },
});

export default ThemeContext;
