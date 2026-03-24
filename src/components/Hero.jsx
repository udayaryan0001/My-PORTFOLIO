import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Phone, Download } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import profileImg from '../assets/mine2.jpeg';

const TITLES = [
    'Founder & Director',
    'Tech Entrepreneur',
    'B.Tech CSE — 3rd Year',
    'Product Builder',
    'Startup Ecosystem Architect',
];

function useTypingEffect(texts, speed = 70, pause = 1800) {
    const [displayed, setDisplayed] = useState('');
    const [index, setIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        const current = texts[index];
        let timeout;
        if (!deleting && charIndex < current.length) {
            timeout = setTimeout(() => setCharIndex((c) => c + 1), speed);
        } else if (!deleting && charIndex === current.length) {
            timeout = setTimeout(() => setDeleting(true), pause);
        } else if (deleting && charIndex > 0) {
            timeout = setTimeout(() => setCharIndex((c) => c - 1), speed / 2);
        } else if (deleting && charIndex === 0) {
            setDeleting(false);
            setIndex((i) => (i + 1) % texts.length);
        }
        setDisplayed(current.slice(0, charIndex));
        return () => clearTimeout(timeout);
    }, [charIndex, deleting, index, texts, speed, pause]);

    return displayed;
}

export default function Hero() {
    const typed = useTypingEffect(TITLES);
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });
    const { theme } = useTheme();

    return (
        <section
            id="hero"
            ref={ref}
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
            {/* Gradient radial background */}
            <div className="absolute inset-0 z-0"
                style={{ background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${theme.accent}12, transparent 70%)` }} />
            <div className="absolute inset-0 z-0"
                style={{ background: `radial-gradient(ellipse 60% 40% at 80% 80%, ${theme.accentBlue}10, transparent 60%)` }} />

            {/* Grid overlay */}
            <div className="absolute inset-0 z-0 grid-bg opacity-50" />

            {/* Main layout */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center min-h-screen pt-24 pb-12">
                {/* Left – Text content */}
                <div>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium mb-8"
                        style={{ borderColor: `${theme.accent}40`, background: `${theme.accent}08`, color: theme.accent }}
                    >
                        <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: theme.accent }} />
                        Open to Collaboration & Opportunities
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div className="font-heading font-black text-6xl md:text-8xl leading-none mb-3 tracking-tight">
                            <span style={{ color: theme.text }}>Uday</span>
                        </div>
                        <div
                            className="font-heading font-black text-6xl md:text-8xl leading-none mb-6 tracking-tight"
                            style={{
                                backgroundImage: theme.gradient,
                                WebkitBackgroundClip: 'text',
                                color: 'transparent',
                                backgroundClip: 'text',
                                display: 'inline-block'
                            }}
                        >
                            Pandit
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={inView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.8, delay: 0.45 }}
                        className="font-heading text-xl md:text-2xl font-semibold mb-4 h-8"
                    >
                        <span style={{ color: theme.accent }}>{typed}</span>
                        <span className="typing-cursor" style={{ color: theme.accent }}>|</span>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="text-base md:text-lg max-w-xl mb-10 leading-relaxed"
                        style={{ color: theme.textMuted }}
                    >
                        Building scalable startups, powerful digital systems, and innovative tech ecosystems.
                        Turning bold ideas into market-ready products.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.75 }}
                        className="flex flex-wrap gap-4 mb-12"
                    >
                        <a
                            href="#startups"
                            className="group relative px-8 py-4 rounded-full font-bold overflow-hidden"
                            style={{ background: theme.gradient, color: '#0a0a0a' }}
                        >
                            <span className="relative z-10">View My Work</span>
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                style={{ background: 'rgba(255,255,255,0.2)' }} />
                        </a>
                        <a
                            href="#contact"
                            className="px-8 py-4 rounded-full font-bold border hover:bg-opacity-10 transition-all duration-300"
                            style={{
                                borderColor: `${theme.text}30`,
                                color: theme.text,
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = theme.accent;
                                e.currentTarget.style.color = theme.accent;
                                e.currentTarget.style.background = `${theme.accent}15`;
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = `${theme.text}30`;
                                e.currentTarget.style.color = theme.text;
                                e.currentTarget.style.background = 'transparent';
                            }}
                        >
                            Let's Connect
                        </a>
                        <a
                            href="/resume.pdf"
                            download
                            className="group flex items-center gap-2 px-8 py-4 rounded-full font-bold border transition-all duration-300"
                            style={{
                                borderColor: `${theme.accentBlue}40`,
                                color: theme.accentBlue,
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = theme.accentBlue;
                                e.currentTarget.style.background = `${theme.accentBlue}15`;
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = `${theme.accentBlue}40`;
                                e.currentTarget.style.background = 'transparent';
                            }}
                        >
                            <Download size={18} />
                            Resume
                        </a>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={inView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.8, delay: 0.9 }}
                        className="flex items-center gap-6"
                    >
                        {[
                            { icon: <Github size={18} />, href: 'https://github.com/udayaryan0001' },
                            { icon: <Linkedin size={18} />, href: 'https://www.linkedin.com/in/uday-pandit-89aa24294' },
                            { icon: <Phone size={18} />, href: 'tel:+918595389881' },
                        ].map((s, i) => (
                            <a key={i} href={s.href} target={s.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                                className="w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-200"
                                style={{ borderColor: `${theme.text}20`, color: theme.textMuted }}
                                onMouseEnter={(e) => { e.currentTarget.style.color = theme.accent; e.currentTarget.style.borderColor = `${theme.accent}50`; e.currentTarget.style.background = `${theme.accent}10`; }}
                                onMouseLeave={(e) => { e.currentTarget.style.color = theme.textMuted; e.currentTarget.style.borderColor = `${theme.text}20`; e.currentTarget.style.background = 'transparent'; }}
                            >
                                {s.icon}
                            </a>
                        ))}
                        <div className="flex items-center gap-3 ml-4">
                            <div className="w-px h-6" style={{ background: `${theme.text}20` }} />
                            <span className="text-sm" style={{ color: `${theme.textMuted}80` }}>3+ Startups · 25+ Projects</span>
                        </div>
                    </motion.div>
                </div>

                {/* Right – Profile Picture */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
                    className="hidden lg:flex items-center justify-center"
                >
                    <div className="relative w-[380px] h-[380px]">
                        {/* Glow behind the image */}
                        <div className="absolute inset-0 rounded-full blur-3xl opacity-30"
                            style={{ background: `radial-gradient(circle, ${theme.accent}, ${theme.accentBlue}, transparent)` }} />
                        {/* Rotating border ring */}
                        <div
                            className="absolute -inset-3 rounded-full animate-spin-slow"
                            style={{
                                background: `conic-gradient(from 0deg, ${theme.accent}, ${theme.accentBlue}, ${theme.accentPurple || theme.accent}, ${theme.accent})`,
                                mask: 'radial-gradient(farthest-side, transparent calc(100% - 3px), #fff calc(100% - 3px))',
                                WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 3px), #fff calc(100% - 3px))',
                                animationDuration: '8s',
                            }}
                        />
                        {/* Profile image */}
                        <div className="relative w-full h-full rounded-full overflow-hidden border-2"
                            style={{ borderColor: `${theme.accent}30` }}>
                            <img
                                src={profileImg}
                                alt="Uday Pandit"
                                className="w-full h-full object-cover"
                                style={{ objectPosition: 'center 25%' }}
                            />
                        </div>
                        {/* Floating labels */}
                        <div className="absolute top-4 right-0 px-3 py-1 rounded-full border text-xs font-mono animate-float"
                            style={{ borderColor: `${theme.accent}40`, background: `${theme.accent}15`, color: theme.accent }}>
                            Founder
                        </div>
                        <div className="absolute bottom-12 left-0 px-3 py-1 rounded-full border text-xs font-mono animate-float"
                            style={{ animationDelay: '2s', borderColor: `${theme.accentBlue}40`, background: `${theme.accentBlue}15`, color: theme.accentBlue }}>
                            Builder
                        </div>
                        <div className="absolute top-1/2 right-2 px-3 py-1 rounded-full border text-xs font-mono animate-float"
                            style={{ animationDelay: '4s', borderColor: `${theme.accentPurple || theme.accent}40`, background: `${theme.accentPurple || theme.accent}15`, color: theme.accentPurple || theme.accent }}>
                            Innovator
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
                style={{ color: `${theme.textMuted}80` }}
            >
                <span className="text-xs tracking-widest uppercase">Scroll</span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                >
                    <ArrowDown size={18} />
                </motion.div>
            </motion.div>
        </section>
    );
}
