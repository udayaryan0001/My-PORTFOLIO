import { createContext, useContext, useState, useCallback } from 'react';

export const THEMES = {
    dark: {
        name: 'Dark',
        icon: '🌑',
        bg: '#0a0a0a',
        surface: '#111111',
        border: 'rgba(255,255,255,0.06)',
        text: '#ffffff',
        textMuted: 'rgba(255,255,255,0.45)',
        accent: '#00f5c4',
        accentBlue: '#0099ff',
        accentPurple: '#a855f7',
        gradient: 'linear-gradient(135deg, #00f5c4, #0099ff)',
        gridColor: 'rgba(0,245,196,0.04)',
        navBg: 'rgba(0,0,0,0.85)',
        cardBg: 'rgba(255,255,255,0.02)',
    },
    light: {
        name: 'Light',
        icon: '☀️',
        bg: '#f8fafc',
        surface: '#ffffff',
        border: 'rgba(0,0,0,0.08)',
        text: '#0f172a',
        textMuted: 'rgba(15,23,42,0.55)',
        accent: '#059669',
        accentBlue: '#2563eb',
        accentPurple: '#7c3aed',
        gradient: 'linear-gradient(135deg, #059669, #2563eb)',
        gridColor: 'rgba(5,150,105,0.05)',
        navBg: 'rgba(248,250,252,0.9)',
        cardBg: 'rgba(0,0,0,0.02)',
    },
};

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
    const [themeKey, setThemeKey] = useState('dark');
    const theme = THEMES[themeKey];

    const cycleTheme = useCallback(() => {
        const keys = Object.keys(THEMES);
        setThemeKey((k) => keys[(keys.indexOf(k) + 1) % keys.length]);
    }, []);

    // Also update global CSS variables dynamically so index.css can use them
    if (typeof window !== 'undefined') {
        document.documentElement.style.setProperty('--theme-bg', theme.bg);
        document.documentElement.style.setProperty('--theme-text', theme.text);
        document.documentElement.style.setProperty('--theme-accent', theme.accent);
        document.documentElement.style.setProperty('--theme-accent-blue', theme.accentBlue);
    }

    return (
        <ThemeContext.Provider value={{ theme, themeKey, cycleTheme, THEMES }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}
