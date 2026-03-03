import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const TIMELINE = [
    { year: '2022', title: 'Started Coding Journey', desc: 'Began B.Tech CSE, discovered a passion for building real-world systems.', icon: '💻' },
    { year: '2023', title: 'Founded Kiudtech Solutions Pvt. Ltd.', desc: 'Officially incorporated — focused on digital platforms and school management systems.', icon: '🏢' },
    { year: '2024', title: 'Co-Founded Ajjarima Sports', desc: 'Launched a sports initiative to empower athletes and create structured skill opportunities.', icon: '🏆' },
    { year: '2024', title: 'Co-Founded Crewux', desc: 'Talent-matching platform connecting students, startups and curated opportunities.', icon: '🔗' },
    { year: '2025', title: '25+ Projects Delivered', desc: 'Shipped 25+ client and internal projects spanning web platforms, SaaS tools, and mobile apps.', icon: '🚀' },
    { year: '2026', title: 'Scaling & Expanding', desc: 'Growing all three ventures, building teams, and expanding to new markets.', icon: '📈' },
];

export default function Timeline() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });
    const { theme } = useTheme();
    const colors = [theme.accent, theme.accentBlue, theme.accentPurple || theme.accent, theme.accent, theme.accentBlue, theme.accentPurple || theme.accent];

    return (
        <section id="timeline" className="py-20 sm:py-32 relative overflow-hidden" ref={ref}>
            <div className="absolute inset-0 pointer-events-none opacity-20"
                style={{
                    backgroundImage: `linear-gradient(${theme.gridColor} 1px, transparent 1px), linear-gradient(90deg, ${theme.gridColor} 1px, transparent 1px)`,
                    backgroundSize: '60px 60px',
                }} />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    className="text-center mb-14 sm:mb-20"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold mb-5 tracking-widest uppercase"
                        style={{ borderColor: `${theme.accent}40`, background: `${theme.accent}08`, color: theme.accent }}>
                        Journey
                    </div>
                    <h2 className="font-heading font-bold text-4xl sm:text-5xl" style={{ color: theme.text }}>
                        My <span style={{
                            backgroundImage: theme.gradient, WebkitBackgroundClip: 'text', color: 'transparent',
                            backgroundClip: 'text',
                        }}>Story</span>
                    </h2>
                    <p className="mt-4 text-sm sm:text-base max-w-sm mx-auto" style={{ color: theme.textMuted }}>
                        From student to founder — every milestone that shaped who I am.
                    </p>
                </motion.div>

                {/* Mobile: stacked list */}
                <div className="md:hidden flex flex-col gap-5">
                    {TIMELINE.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -30 }}
                            animate={inView ? { opacity: 1, x: 0 } : {}}
                            transition={{ delay: 0.1 + i * 0.1, duration: 0.6 }}
                            className="flex gap-4 p-5 rounded-2xl border"
                            style={{ background: theme.cardBg, borderColor: theme.border }}
                        >
                            <div className="flex flex-col items-center gap-1 shrink-0">
                                <div className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm"
                                    style={{ borderColor: colors[i], boxShadow: `0 0 10px ${colors[i]}60` }}>
                                    <div className="w-2 h-2 rounded-full" style={{ background: colors[i] }} />
                                </div>
                                {i < TIMELINE.length - 1 && (
                                    <div className="w-px flex-1 mt-1" style={{ background: `${colors[i]}30` }} />
                                )}
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-1.5">
                                    <span className="text-lg">{item.icon}</span>
                                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full"
                                        style={{ background: `${colors[i]}15`, color: colors[i] }}>{item.year}</span>
                                </div>
                                <h3 className="font-heading font-bold text-sm mb-1" style={{ color: theme.text }}>{item.title}</h3>
                                <p className="text-xs leading-relaxed" style={{ color: theme.textMuted }}>{item.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Desktop: alternating */}
                <div className="hidden md:block relative">
                    {/* Spine */}
                    <motion.div
                        className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
                        initial={{ scaleY: 0 }}
                        animate={inView ? { scaleY: 1 } : {}}
                        transition={{ duration: 1.2, ease: 'easeInOut', delay: 0.2 }}
                        style={{ background: theme.gradient, transformOrigin: 'top', opacity: 0.5 }}
                    />
                    <div className="flex flex-col gap-10">
                        {TIMELINE.map((item, i) => {
                            const isLeft = i % 2 === 0;
                            return (
                                <div key={i} className={`flex items-center ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}>
                                    {/* Card */}
                                    <motion.div
                                        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                                        animate={inView ? { opacity: 1, x: 0 } : {}}
                                        transition={{ delay: 0.1 + i * 0.12, duration: 0.65 }}
                                        className="w-5/12 p-5 rounded-2xl border transition-all duration-300 group"
                                        style={{ background: theme.cardBg, borderColor: theme.border }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.borderColor = `${colors[i]}40`;
                                            e.currentTarget.style.background = `${colors[i]}05`;
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.borderColor = theme.border;
                                            e.currentTarget.style.background = theme.cardBg;
                                        }}
                                    >
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-xl">{item.icon}</span>
                                            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full"
                                                style={{ background: `${colors[i]}15`, color: colors[i] }}>{item.year}</span>
                                        </div>
                                        <h3 className="font-heading font-bold text-sm mb-1.5" style={{ color: theme.text }}>{item.title}</h3>
                                        <p className="text-xs leading-relaxed" style={{ color: theme.textMuted }}>{item.desc}</p>
                                    </motion.div>

                                    {/* Center dot */}
                                    <div className="w-2/12 flex justify-center">
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={inView ? { scale: 1 } : {}}
                                            transition={{ delay: 0.15 + i * 0.12, type: 'spring' }}
                                            className="w-4 h-4 rounded-full border-2"
                                            style={{ borderColor: colors[i], boxShadow: `0 0 14px ${colors[i]}60`, background: theme.bg }}
                                        />
                                    </div>
                                    <div className="w-5/12" />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
