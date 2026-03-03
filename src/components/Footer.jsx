import { Github, Linkedin, Phone, Heart } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function Footer() {
    const { theme } = useTheme();

    return (
        <footer className="py-10 sm:py-12 border-t" style={{ borderColor: theme.border }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
                    <div>
                        <div className="font-heading font-bold text-lg mb-1">
                            <span style={{
                                backgroundImage: theme.gradient, WebkitBackgroundClip: 'text', color: 'transparent',
                                backgroundClip: 'text',
                            }}>Uday Pandit</span>
                        </div>
                        <div className="text-xs sm:text-sm" style={{ color: `${theme.textMuted}80` }}>
                            © 2026 Uday Pandit | Founder & Tech Entrepreneur
                        </div>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs" style={{ color: `${theme.textMuted}70` }}>
                        Built with <Heart size={12} style={{ color: theme.accent, fill: theme.accent }} /> using React & Framer Motion
                    </div>

                    <div className="flex items-center gap-3">
                        {[
                            { href: 'https://github.com/udayaryan0001', icon: <Github size={15} />, label: 'GitHub' },
                            { href: 'https://www.linkedin.com/in/uday-pandit-89aa24294', icon: <Linkedin size={15} />, label: 'LinkedIn' },
                            { href: 'tel:+918595389881', icon: <Phone size={15} />, label: 'Phone' },
                        ].map(({ href, icon, label }) => (
                            <a
                                key={label}
                                href={href}
                                target={href.startsWith('http') ? '_blank' : undefined}
                                rel="noopener noreferrer"
                                aria-label={label}
                                className="w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-200"
                                style={{ borderColor: theme.border, color: theme.textMuted }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.color = theme.accent;
                                    e.currentTarget.style.borderColor = `${theme.accent}50`;
                                    e.currentTarget.style.background = `${theme.accent}10`;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.color = theme.textMuted;
                                    e.currentTarget.style.borderColor = theme.border;
                                    e.currentTarget.style.background = 'transparent';
                                }}
                            >
                                {icon}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
