import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const SKILLS = [
    { name: 'Startup Strategy', level: 92 },
    { name: 'Business Development', level: 90 },
    { name: 'React.js', level: 88 },
    { name: 'Product Development', level: 88 },
    { name: 'JavaScript', level: 85 },
    { name: 'Marketing & Branding', level: 80 },
    { name: 'System Architecture', level: 75 },
];

const TAGS = [
    'React.js', 'JavaScript', 'Node.js', 'Tailwind CSS', 'Git & GitHub',
    'Figma', 'MongoDB', 'Firebase', 'Startup Execution', 'Go-To-Market',
    'Product Roadmapping', 'Team Building', 'Digital Marketing', 'System Design',
];

export default function Skills() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });
    const { theme } = useTheme();

    return (
        <section id="skills" className="py-20 sm:py-32 relative" ref={ref}>
            <div className="absolute inset-0 pointer-events-none opacity-30"
                style={{
                    backgroundImage: `linear-gradient(${theme.gridColor} 1px, transparent 1px), linear-gradient(90deg, ${theme.gridColor} 1px, transparent 1px)`,
                    backgroundSize: '60px 60px',
                }} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12 sm:mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold mb-5 tracking-widest uppercase"
                        style={{ borderColor: `${theme.accent}40`, background: `${theme.accent}08`, color: theme.accent }}>
                        Expertise
                    </div>
                    <h2 className="font-heading font-bold text-4xl sm:text-5xl" style={{ color: theme.text }}>
                        Technical{' '}
                        <span style={{
                            backgroundImage: theme.gradient, WebkitBackgroundClip: 'text', color: 'transparent',
                            backgroundClip: 'text',
                        }}>Skills</span>
                    </h2>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
                    {/* Skill bars */}
                    <div className="space-y-5">
                        {SKILLS.map((skill, i) => (
                            <motion.div
                                key={skill.name}
                                initial={{ opacity: 0, x: -30 }}
                                animate={inView ? { opacity: 1, x: 0 } : {}}
                                transition={{ delay: 0.15 + i * 0.1, duration: 0.5 }}
                            >
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm font-medium" style={{ color: theme.textMuted }}>{skill.name}</span>
                                    <motion.span
                                        initial={{ opacity: 0 }}
                                        animate={inView ? { opacity: 1 } : {}}
                                        transition={{ delay: 0.35 + i * 0.1 }}
                                        className="text-sm font-bold"
                                        style={{ color: theme.accent }}
                                    >
                                        {skill.level}%
                                    </motion.span>
                                </div>
                                <div className="h-2 rounded-full overflow-hidden" style={{ background: `${theme.text}0d` }}>
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={inView ? { width: `${skill.level}%` } : {}}
                                        transition={{ delay: 0.35 + i * 0.1, duration: 1, ease: 'easeOut' }}
                                        className="h-full rounded-full"
                                        style={{ background: theme.gradient }}
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Tags + card */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.25, duration: 0.7 }}
                    >
                        <p className="text-xs font-semibold tracking-widest uppercase mb-5" style={{ color: `${theme.textMuted}80` }}>
                            Technology & Competencies
                        </p>
                        <div className="flex flex-wrap gap-2.5 mb-10">
                            {TAGS.map((tag, i) => (
                                <motion.span
                                    key={tag}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                                    transition={{ delay: 0.3 + i * 0.04, duration: 0.35 }}
                                    className="px-3.5 py-1.5 rounded-full border text-xs font-medium transition-all duration-200 cursor-default"
                                    style={{ borderColor: theme.border, color: theme.textMuted, background: theme.cardBg }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.borderColor = `${theme.accent}50`;
                                        e.currentTarget.style.color = theme.accent;
                                        e.currentTarget.style.background = `${theme.accent}08`;
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.borderColor = theme.border;
                                        e.currentTarget.style.color = theme.textMuted;
                                        e.currentTarget.style.background = theme.cardBg;
                                    }}
                                >
                                    {tag}
                                </motion.span>
                            ))}
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.75, duration: 0.5 }}
                            className="p-6 sm:p-7 rounded-3xl border relative overflow-hidden"
                            style={{ background: theme.cardBg, borderColor: `${theme.accent}20` }}
                        >
                            <div className="absolute -top-8 -right-8 w-28 h-28 rounded-full blur-3xl opacity-20"
                                style={{ background: theme.accent }} />
                            <div className="text-3xl mb-3">🚀</div>
                            <h4 className="font-heading font-bold text-base sm:text-lg mb-2" style={{ color: theme.text }}>Builder Mindset</h4>
                            <p className="text-sm leading-relaxed" style={{ color: theme.textMuted }}>
                                I approach every challenge as a systems problem — designing architectures that scale, teams that execute, and products that win markets.
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
