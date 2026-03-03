import { motion } from 'framer-motion';
import { useTheme, THEMES } from '../context/ThemeContext';
import { useState } from 'react';
import { Check } from 'lucide-react';

export default function ThemeToggle() {
    const { theme, themeKey, cycleTheme } = useTheme();
    const [open, setOpen] = useState(false);
    const themeKeys = Object.keys(THEMES);

    return (
        <div className="fixed bottom-6 sm:bottom-8 right-6 sm:right-8 z-[500] flex flex-col items-end gap-3">
            {/* Dropdown */}
            {open && (
                <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.9 }}
                    transition={{ duration: 0.18 }}
                    className="flex flex-col gap-1.5 p-3 rounded-2xl border backdrop-blur-2xl shadow-2xl"
                    style={{
                        background: `${theme.bg}ee`,
                        borderColor: theme.border,
                    }}
                >
                    <p className="text-xs font-semibold px-2 pb-1.5 border-b mb-0.5 tracking-widest uppercase"
                        style={{ color: `${theme.textMuted}80`, borderColor: theme.border }}>
                        Theme
                    </p>
                    {themeKeys.map((key) => (
                        <button
                            key={key}
                            onClick={() => {
                                // Jump to specific theme by cycling
                                const curr = themeKeys.indexOf(themeKey);
                                const target = themeKeys.indexOf(key);
                                const steps = (target - curr + themeKeys.length) % themeKeys.length;
                                for (let i = 0; i < steps; i++) cycleTheme();
                                setOpen(false);
                            }}
                            className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-150 text-left w-full"
                            style={{
                                color: themeKey === key ? theme.accent : theme.textMuted,
                                background: themeKey === key ? `${theme.accent}15` : 'transparent',
                            }}
                        >
                            <span className="text-base">{THEMES[key].icon}</span>
                            <span>{THEMES[key].name}</span>
                            {themeKey === key && <Check size={12} className="ml-auto" style={{ color: theme.accent }} />}
                        </button>
                    ))}
                </motion.div>
            )}

            {/* FAB button */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.92 }}
                onClick={() => setOpen((o) => !o)}
                className="w-16 h-16 rounded-3xl flex items-center justify-center text-3xl shadow-2xl relative overflow-hidden transition-all"
                style={{
                    background: theme.gradient,
                    boxShadow: `0 4px 24px ${theme.accent}50`,
                }}
                title="Switch Theme"
                aria-label="Switch theme"
            >
                <span className="relative z-10 select-none">{theme.icon}</span>
            </motion.button>
        </div>
    );
}
