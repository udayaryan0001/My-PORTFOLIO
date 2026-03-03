import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const COUNTERS = [
    { label: 'Startups Built', value: 3, suffix: '+', emoji: '🚀' },
    { label: 'Projects Delivered', value: 25, suffix: '+', emoji: '📦' },
    { label: 'Happy Clients', value: 50, suffix: '+', emoji: '🤝' },
];

function AnimatedCounter({ value, inView }) {
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (!inView) return;
        let start = 0;
        const step = 16;
        const inc = value / (1800 / step);
        const t = setInterval(() => {
            start += inc;
            if (start >= value) { setCount(value); clearInterval(t); }
            else setCount(Math.floor(start));
        }, step);
        return () => clearInterval(t);
    }, [inView, value]);
    return <>{count}</>;
}

export default function Achievements() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });
    const { theme } = useTheme();

    const colors = [theme.accent, theme.accentBlue, theme.accentPurple || theme.accent];

    return (
        <section id="achievements" className="py-20 sm:py-32 relative overflow-hidden" ref={ref}>
            <div className="absolute inset-0 opacity-5 pointer-events-none"
                style={{ background: `radial-gradient(ellipse 80% 60% at 50% 50%, ${theme.accent}, transparent)` }} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-14 sm:mb-20"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold mb-5 tracking-widest uppercase"
                        style={{ borderColor: `${theme.accent}40`, background: `${theme.accent}08`, color: theme.accent }}>
                        Track Record
                    </div>
                    <h2 className="font-heading font-bold text-4xl sm:text-5xl" style={{ color: theme.text }}>
                        By the{' '}
                        <span style={{
                            backgroundImage: theme.gradient, WebkitBackgroundClip: 'text', color: 'transparent',
                            backgroundClip: 'text',
                        }}>Numbers</span>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-8">
                    {COUNTERS.map((item, i) => (
                        <motion.div
                            key={item.label}
                            initial={{ opacity: 0, y: 40 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.15 + i * 0.18, duration: 0.7 }}
                            className="relative text-center p-8 sm:p-10 rounded-3xl border backdrop-blur-sm overflow-hidden group transition-all duration-300"
                            style={{
                                background: theme.cardBg,
                                borderColor: theme.border,
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = `${colors[i]}40`;
                                e.currentTarget.style.boxShadow = `0 20px 60px ${colors[i]}15`;
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = theme.border;
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-1 rounded-full"
                                style={{ background: `linear-gradient(90deg, transparent, ${colors[i]}, transparent)` }} />
                            <div className="text-4xl mb-4">{item.emoji}</div>
                            <div className="font-heading font-black text-5xl sm:text-6xl mb-2" style={{ color: colors[i] }}>
                                <AnimatedCounter value={item.value} inView={inView} />{item.suffix}
                            </div>
                            <div className="text-sm font-medium" style={{ color: theme.textMuted }}>{item.label}</div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
