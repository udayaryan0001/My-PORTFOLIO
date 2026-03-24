import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import mine3 from '../assets/mine3.jpeg';
import mine4 from '../assets/mine4.jpeg';
import mine5 from '../assets/mine5.jpeg';

const images = [
    { src: mine3, caption: 'LinkedIn AI Summit' },
    { src: mine4, caption: 'Startup Expo & Pitching' },
    { src: mine5, caption: 'Mentorship & Collaboration' },
];

export default function FeaturedGallery() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });
    const { theme } = useTheme();

    return (
        <section className="py-20 sm:py-28 relative overflow-hidden" ref={ref}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-14"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold mb-6 tracking-widest uppercase"
                        style={{ borderColor: `${theme.accentBlue}40`, background: `${theme.accentBlue}08`, color: theme.accentBlue }}>
                        In Action
                    </div>
                    <h2 className="font-heading font-bold text-4xl sm:text-5xl leading-tight" style={{ color: theme.text }}>
                        Moments that{' '}
                        <span style={{
                            backgroundImage: theme.gradient, WebkitBackgroundClip: 'text', color: 'transparent',
                            backgroundClip: 'text',
                        }}>define the journey</span>
                    </h2>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-5">
                    {images.map((img, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 40 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.15 + i * 0.15 }}
                            className="group relative rounded-2xl overflow-hidden border transition-all duration-300"
                            style={{ borderColor: theme.border }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = `${theme.accent}50`;
                                e.currentTarget.style.boxShadow = `0 0 30px ${theme.accent}15`;
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = theme.border;
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            <div className="aspect-[4/3] overflow-hidden">
                                <img
                                    src={img.src}
                                    alt={img.caption}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>
                            {/* Overlay caption */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                                <div className="p-5 w-full">
                                    <span className="text-sm font-semibold text-white">{img.caption}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
