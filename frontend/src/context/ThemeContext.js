import { createContext } from 'react';

// Export only the context (non-component) from this file to satisfy fast-refresh rules
const ThemeContext = createContext();

export default ThemeContext;
