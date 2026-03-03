import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const NAV_LINKS = [
    { label: 'About', href: '#about' },
    { label: 'Startups', href: '#startups' },
    { label: 'Journey', href: '#timeline' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
    const { theme } = useTheme();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', fn, { passive: true });
        return () => window.removeEventListener('scroll', fn);
    }, []);

    return (
        <>
            <motion.nav
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
                style={{
                    background: scrolled ? theme.navBg : 'transparent',
                    backdropFilter: scrolled ? 'blur(20px)' : 'none',
                    borderBottom: scrolled ? `1px solid ${theme.border}` : 'none',
                }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
                    <a href="#hero" className="font-heading font-bold text-xl tracking-tight">
                        <span style={{
                            backgroundImage: theme.gradient, WebkitBackgroundClip: 'text', color: 'transparent',
                            backgroundClip: 'text',
                        }}>Uday Pandit</span>
                    </a>

                    {/* Desktop */}
                    <ul className="hidden md:flex items-center gap-6 lg:gap-8">
                        {NAV_LINKS.map((link) => (
                            <li key={link.href}>
                                <a
                                    href={link.href}
                                    className="text-sm font-medium transition-colors duration-200 relative group"
                                    style={{ color: theme.textMuted }}
                                    onMouseEnter={(e) => (e.currentTarget.style.color = theme.accent)}
                                    onMouseLeave={(e) => (e.currentTarget.style.color = theme.textMuted)}
                                >
                                    {link.label}
                                    <span className="absolute -bottom-1 left-0 w-0 h-px group-hover:w-full transition-all duration-300 rounded-full"
                                        style={{ background: theme.gradient }} />
                                </a>
                            </li>
                        ))}
                    </ul>

                    <a
                        href="#contact"
                        className="hidden md:inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold transition-all duration-200 hover:opacity-90 hover:scale-105"
                        style={{ background: theme.gradient, color: '#0a0a0a' }}
                    >
                        Let's Connect
                    </a>

                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="md:hidden p-2 rounded-xl transition-colors"
                        style={{ color: theme.textMuted, background: `${theme.accent}10` }}
                    >
                        {menuOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </motion.nav>

            {/* Mobile drawer */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: 'tween', duration: 0.3 }}
                        className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-7"
                        style={{ background: theme.bg, backdropFilter: 'blur(24px)' }}
                    >
                        <div className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl opacity-10 pointer-events-none"
                            style={{ background: `radial-gradient(circle, ${theme.accent}, transparent)` }} />
                        {NAV_LINKS.map((link, i) => (
                            <motion.a
                                key={link.href}
                                href={link.href}
                                onClick={() => setMenuOpen(false)}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.08 }}
                                className="text-2xl font-heading font-bold transition-colors"
                                style={{ color: theme.textMuted }}
                                onMouseEnter={(e) => (e.currentTarget.style.color = theme.accent)}
                                onMouseLeave={(e) => (e.currentTarget.style.color = theme.textMuted)}
                            >
                                {link.label}
                            </motion.a>
                        ))}
                        <motion.a
                            href="#contact"
                            onClick={() => setMenuOpen(false)}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="px-8 py-3 rounded-full font-bold text-lg"
                            style={{ background: theme.gradient, color: '#0a0a0a' }}
                        >
                            Let's Connect
                        </motion.a>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
