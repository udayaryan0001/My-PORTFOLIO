import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ExternalLink, Building2, Dumbbell, Users, ArrowRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const STARTUPS = [
    {
        name: 'Kiudtech Solutions',
        suffix: 'Private Limited',
        role: 'Founder & Director',
        website: 'https://www.kiudtech.com/',
        description:
            'Building digital platforms including school management systems and scalable tech solutions for education and enterprise.',
        Icon: Building2,
        tag: 'EdTech · Enterprise',
        colorKey: 'accent',
        emoji: '🏢',
    },
    {
        name: 'Ajjarima Sports',
        suffix: '',
        role: 'Co-Founder',
        website: 'https://ajarima.in/',
        description:
            'Sports-focused initiative designed to empower athletes and create structured opportunities across disciplines.',
        Icon: Dumbbell,
        tag: 'Sports · Community',
        colorKey: 'accentBlue',
        emoji: '🏆',
    },
    {
        name: 'Crewux',
        suffix: '',
        role: 'Co-Founder',
        website: 'https://www.crewux.com/',
        description:
            'A platform focused on connecting students, startups, and opportunities — bridging talent with growing ventures.',
        Icon: Users,
        tag: 'Talent · Networking',
        colorKey: 'accentPurple',
        emoji: '🔗',
    },
];

function StartupCard({ startup, index, inView }) {
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const [hovered, setHovered] = useState(false);
    const cardRef = useRef(null);
    const { theme } = useTheme();
    const color = theme[startup.colorKey] || theme.accent;

    const handleMouseMove = (e) => {
        if (window.innerWidth < 768) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
        const y = -((e.clientY - rect.top) / rect.height - 0.5) * 16;
        setTilt({ x, y });
    };

    return (
        <motion.article
            ref={cardRef}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15 + index * 0.15, duration: 0.6, ease: 'easeOut' }}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setHovered(false); }}
            onMouseEnter={() => setHovered(true)}
            style={{
                transform: `perspective(900px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
                transition: 'transform 0.18s ease',
                background: theme.cardBg,
                borderColor: hovered ? `${color}40` : theme.border,
                boxShadow: hovered ? `0 20px 60px ${color}18, 0 4px 20px rgba(0,0,0,0.3)` : '0 4px 20px rgba(0,0,0,0.2)',
            }}
            className="relative p-6 sm:p-8 rounded-3xl border backdrop-blur-sm overflow-hidden flex flex-col gap-4 transition-all duration-300 cursor-pointer"
        >
            {/* Top glow */}
            <div
                className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl pointer-events-none transition-opacity duration-500"
                style={{ background: `radial-gradient(circle, ${color}30, transparent)`, opacity: hovered ? 1 : 0 }}
            />

            {/* Header */}
            <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center shrink-0 text-xl"
                        style={{ background: `${color}18`, color, fontSize: '1.4rem' }}>
                        {startup.emoji}
                    </div>
                    <div>
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full"
                            style={{ background: `${color}18`, color }}>
                            {startup.tag}
                        </span>
                    </div>
                </div>
                <a
                    href={startup.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${startup.name} website`}
                    className="w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 transition-all duration-200"
                    style={{ borderColor: theme.border, color: theme.textMuted }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = color; e.currentTarget.style.borderColor = `${color}50`; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = theme.textMuted; e.currentTarget.style.borderColor = theme.border; }}
                >
                    <ExternalLink size={14} />
                </a>
            </div>

            {/* Content */}
            <div>
                <h3 className="font-heading font-bold text-lg sm:text-xl leading-tight" style={{ color: theme.text }}>
                    {startup.name}
                    {startup.suffix && <span className="font-normal text-base opacity-40"> {startup.suffix}</span>}
                </h3>
                <p className="text-xs font-semibold mt-1" style={{ color }}>{startup.role}</p>
            </div>

            <p className="text-sm leading-relaxed flex-1" style={{ color: theme.textMuted }}>
                {startup.description}
            </p>

            {/* Visit Website button */}
            <a
                href={startup.website}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-2 w-full py-3 rounded-2xl font-semibold text-sm transition-all duration-300 mt-1"
                style={{
                    background: `${color}18`,
                    color,
                    border: `1px solid ${color}30`,
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.background = color;
                    e.currentTarget.style.color = '#0a0a0a';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.background = `${color}18`;
                    e.currentTarget.style.color = color;
                }}
            >
                Visit Website
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
            </a>
        </motion.article>
    );
}

export default function Startups() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });
    const { theme } = useTheme();

    return (
        <section id="startups" className="py-20 sm:py-32 relative overflow-hidden" ref={ref}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12 sm:mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold mb-6 tracking-widest uppercase"
                        style={{ borderColor: `${theme.accent}40`, background: `${theme.accent}08`, color: theme.accent }}>
                        Ventures
                    </div>
                    <h2 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl" style={{ color: theme.text }}>
                        My{' '}
                        <span style={{
                            backgroundImage: theme.gradient, WebkitBackgroundClip: 'text', color: 'transparent',
                            backgroundClip: 'text',
                        }}>Startups</span>
                    </h2>
                    <p className="mt-4 max-w-xl mx-auto text-base sm:text-lg" style={{ color: theme.textMuted }}>
                        Three ventures. One mission — building technology that creates lasting impact.
                    </p>
                </motion.div>

                {/* Cards grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                    {STARTUPS.map((s, i) => (
                        <StartupCard key={s.name} startup={s} index={i} inView={inView} />
                    ))}
                </div>
            </div>
        </section>
    );
}
