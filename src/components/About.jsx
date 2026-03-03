import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Code2, Rocket, Users } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function About() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });
    const { theme } = useTheme();

    const highlights = [
        { icon: <Rocket size={18} />, label: 'Founder & Director', sub: 'Kiudtech Solutions Pvt. Ltd.', color: theme.accent },
        { icon: <Code2 size={18} />, label: 'Co-Founder', sub: 'Ajjarima Sports & Crewux', color: theme.accentBlue },
        { icon: <Users size={18} />, label: 'B.Tech CSE', sub: '3rd Year Student', color: theme.accentPurple || theme.accent },
    ];

    return (
        <section id="about" className="py-20 sm:py-32 relative overflow-hidden" ref={ref}>
            <div className="absolute -right-40 top-1/2 -translate-y-1/2 w-80 h-80 rounded-full opacity-8 blur-[120px] pointer-events-none"
                style={{ background: `radial-gradient(circle, ${theme.accentBlue}, transparent)` }} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                {/* Text */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold mb-6 tracking-widest uppercase"
                        style={{ borderColor: `${theme.accent}40`, background: `${theme.accent}08`, color: theme.accent }}>
                        About Me
                    </div>
                    <h2 className="font-heading font-bold text-4xl sm:text-5xl mb-6 leading-tight" style={{ color: theme.text }}>
                        Building the future,{' '}
                        <span style={{
                            backgroundImage: theme.gradient, WebkitBackgroundClip: 'text', color: 'transparent',
                            backgroundClip: 'text',
                        }}>one startup at a time</span>
                    </h2>
                    <p className="text-base sm:text-lg leading-relaxed mb-6" style={{ color: theme.textMuted }}>
                        I'm a 3rd year B.Tech Computer Science Engineering student and an entrepreneur focused on building scalable digital ecosystems. As Founder and Director at{' '}
                        <span className="font-semibold" style={{ color: theme.accent }}>Kiudtech Solutions Private Limited</span> and
                        Co-Founder of <span className="font-semibold" style={{ color: theme.accent }}>Ajjarima Sports</span> and{' '}
                        <span className="font-semibold" style={{ color: theme.accent }}>Crewux</span>, I specialize in startup execution, product development, and growth strategy.
                    </p>
                    <p className="text-sm leading-relaxed" style={{ color: `${theme.textMuted}99` }}>
                        Driven by a passion for solving real-world problems through technology, I bridge the gap between engineering and entrepreneurship — shipping products that matter.
                    </p>
                </motion.div>

                {/* Cards */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
                    className="flex flex-col gap-4"
                >
                    {highlights.map((item, i) => (
                        <motion.div
                            key={item.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.25 + i * 0.12, duration: 0.5 }}
                            className="flex items-center gap-4 p-5 rounded-2xl border transition-all duration-300 group"
                            style={{ background: theme.cardBg, borderColor: theme.border }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = `${item.color}40`;
                                e.currentTarget.style.background = `${item.color}08`;
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = theme.border;
                                e.currentTarget.style.background = theme.cardBg;
                            }}
                        >
                            <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                                style={{ background: `${item.color}18`, color: item.color }}>
                                {item.icon}
                            </div>
                            <div>
                                <div className="font-heading font-semibold text-sm sm:text-base" style={{ color: theme.text }}>{item.label}</div>
                                <div className="text-xs mt-0.5" style={{ color: theme.textMuted }}>{item.sub}</div>
                            </div>
                        </motion.div>
                    ))}

                    {/* Quote */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.6, duration: 0.5 }}
                        className="p-5 sm:p-6 rounded-2xl border relative overflow-hidden"
                        style={{ borderColor: `${theme.accent}25`, background: `${theme.accent}06` }}
                    >
                        <div className="absolute top-0 left-0 w-1 h-full rounded-l-2xl"
                            style={{ background: theme.gradient }} />
                        <p className="text-sm leading-relaxed pl-3 italic" style={{ color: theme.textMuted }}>
                            "I don't just build products — I build ecosystems that empower people, accelerate ideas, and redefine what's possible at the intersection of technology and ambition."
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
