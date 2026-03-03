import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const TOOLS = [
    { name: 'React.js', icon: '⚛️' }, { name: 'Node.js', icon: '🟩' },
    { name: 'JavaScript', icon: '🟨' }, { name: 'Tailwind CSS', icon: '🎨' },
    { name: 'Git', icon: '🔀' }, { name: 'Figma', icon: '🖼️' },
    { name: 'MongoDB', icon: '🍃' }, { name: 'Framer Motion', icon: '🎭' },
    { name: 'Vite', icon: '⚡' }, { name: 'Firebase', icon: '🔥' },
    { name: 'Three.js', icon: '🌐' }, { name: 'Vercel', icon: '▲' },
];

const TESTIMONIALS = [
    { name: 'Arjun Mehta', role: 'Client · E-commerce', text: 'Uday delivered our entire platform in record time — clean code, stunning UI, and zero bugs. Exceptional work!', avatar: 'AM', colorKey: 'accent' },
    { name: 'Priya Sharma', role: 'Startup Co-Founder', text: 'Working with Uday felt like working with a Senior CTO. His product thinking and technical execution are unmatched.', avatar: 'PS', colorKey: 'accentBlue' },
    { name: 'Rohit Singh', role: 'School Director', text: 'The school management system built by Kiudtech transformed our operations entirely. Highly recommended!', avatar: 'RS', colorKey: 'accentPurple' },
];

export default function SocialProof() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });
    const { theme } = useTheme();

    return (
        <section ref={ref} className="py-20 sm:py-32 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                {/* Tools heading */}
                <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                    className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold mb-5 tracking-widest uppercase"
                        style={{ borderColor: `${theme.accent}40`, background: `${theme.accent}08`, color: theme.accent }}>Stack</div>
                    <h2 className="font-heading font-bold text-4xl sm:text-5xl" style={{ color: theme.text }}>
                        Tools I <span style={{ backgroundImage: theme.gradient, WebkitBackgroundClip: 'text', color: 'transparent', backgroundClip: 'text' }}>Master</span>
                    </h2>
                </motion.div>

                {/* Marquee */}
                <div className="relative overflow-hidden mb-20 sm:mb-28">
                    <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 z-10"
                        style={{ background: `linear-gradient(to right, ${theme.bg}, transparent)` }} />
                    <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 z-10"
                        style={{ background: `linear-gradient(to left, ${theme.bg}, transparent)` }} />
                    <motion.div
                        className="flex gap-3 sm:gap-4"
                        animate={{ x: [0, -60 * TOOLS.length / 2] }}
                        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    >
                        {[...TOOLS, ...TOOLS].map((t, i) => (
                            <div key={i}
                                className="shrink-0 flex items-center gap-2.5 px-4 py-2.5 rounded-2xl border transition-all duration-200 group cursor-default"
                                style={{ background: theme.cardBg, borderColor: theme.border }}>
                                <span className="text-lg">{t.icon}</span>
                                <span className="text-xs sm:text-sm font-medium whitespace-nowrap" style={{ color: theme.textMuted }}>{t.name}</span>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Testimonials heading */}
                <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }}
                    className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold mb-5 tracking-widest uppercase"
                        style={{ borderColor: `${theme.accent}40`, background: `${theme.accent}08`, color: theme.accent }}>Testimonials</div>
                    <h2 className="font-heading font-bold text-4xl sm:text-5xl" style={{ color: theme.text }}>
                        What People <span style={{ backgroundImage: theme.gradient, WebkitBackgroundClip: 'text', color: 'transparent', backgroundClip: 'text' }}>Say</span>
                    </h2>
                </motion.div>

                {/* Cards */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                    {TESTIMONIALS.map((t, i) => {
                        const c = theme[t.colorKey] || theme.accent;
                        return (
                            <motion.div key={t.name}
                                initial={{ opacity: 0, y: 40 }}
                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: 0.3 + i * 0.14, duration: 0.6 }}
                                className="p-6 sm:p-7 rounded-3xl border relative overflow-hidden transition-all duration-300"
                                style={{ background: theme.cardBg, borderColor: theme.border }}
                                onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${c}30`; }}
                                onMouseLeave={(e) => { e.currentTarget.style.borderColor = theme.border; }}
                            >
                                <div className="absolute top-0 left-0 right-0 h-px"
                                    style={{ background: `linear-gradient(90deg, transparent, ${c}60, transparent)` }} />
                                <div className="flex gap-1 mb-5 text-yellow-400 text-sm">{'★★★★★'}</div>
                                <p className="text-sm leading-relaxed mb-6 italic" style={{ color: theme.textMuted }}>"{t.text}"</p>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-bold text-xs"
                                        style={{ background: `${c}20`, color: c }}>{t.avatar}</div>
                                    <div>
                                        <div className="font-heading font-semibold text-sm" style={{ color: theme.text }}>{t.name}</div>
                                        <div className="text-xs" style={{ color: `${theme.textMuted}80` }}>{t.role}</div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
