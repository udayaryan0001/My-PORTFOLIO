import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader({ onDone }) {
    const [progress, setProgress] = useState(0);
    const [phase, setPhase] = useState('loading'); // loading | reveal | done

    useEffect(() => {
        let val = 0;
        const iv = setInterval(() => {
            val += Math.random() * 8 + 2;
            if (val >= 100) {
                val = 100;
                clearInterval(iv);
                setTimeout(() => setPhase('reveal'), 300);
                setTimeout(() => {
                    setPhase('done');
                    onDone();
                }, 1600);
            }
            setProgress(Math.min(val, 100));
        }, 60);
        return () => clearInterval(iv);
    }, [onDone]);

    return (
        <AnimatePresence>
            {phase !== 'done' && (
                <motion.div
                    key="preloader"
                    exit={{ scaleY: 0, transformOrigin: 'top' }}
                    transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
                    style={{ background: '#0a0a0a' }}
                >
                    {/* Animated grid lines */}
                    <div className="absolute inset-0 overflow-hidden opacity-30">
                        {[...Array(10)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute top-0 bottom-0 w-px"
                                style={{ left: `${(i + 1) * 10}%`, background: 'linear-gradient(to bottom, transparent, #00f5c4, transparent)' }}
                                initial={{ scaleY: 0, opacity: 0 }}
                                animate={{ scaleY: 1, opacity: 0.4 }}
                                transition={{ delay: i * 0.05, duration: 0.8, ease: 'easeOut' }}
                            />
                        ))}
                    </div>

                    {/* Scan line effect */}
                    <motion.div
                        className="absolute left-0 right-0 h-px z-10 opacity-60"
                        style={{ background: 'linear-gradient(90deg, transparent, #00f5c4, transparent)' }}
                        animate={{ top: ['0%', '100%'] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    />

                    {/* Center content */}
                    <div className="relative z-20 flex flex-col items-center gap-8">
                        {/* Logo / Name */}
                        <div className="relative">
                            <motion.div
                                className="absolute -inset-6 rounded-full blur-3xl opacity-30"
                                style={{ background: 'radial-gradient(circle, #00f5c4, #0099ff)' }}
                                animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                            {'UDAY PANDIT'.split('').map((char, i) => (
                                <motion.span
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.06, duration: 0.4 }}
                                    className="font-heading font-black text-4xl md:text-6xl inline-block"
                                    style={{
                                        backgroundImage: 'linear-gradient(135deg, #00f5c4, #0099ff)',
                                        WebkitBackgroundClip: 'text',
                                        color: 'transparent',
                                        backgroundClip: 'text',
                                        letterSpacing: char === ' ' ? '0.5em' : '0.05em',
                                    }}
                                >
                                    {char === ' ' ? '\u00A0' : char}
                                </motion.span>
                            ))}
                        </div>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className="text-white/30 text-sm tracking-[0.4em] uppercase"
                        >
                            Founder · Tech Entrepreneur
                        </motion.p>

                        {/* Progress bar */}
                        <div className="w-64 md:w-96 h-px bg-white/10 relative overflow-hidden rounded-full">
                            <motion.div
                                className="absolute left-0 top-0 h-full rounded-full"
                                style={{
                                    width: `${progress}%`,
                                    background: 'linear-gradient(90deg, #00f5c4, #0099ff)',
                                    boxShadow: '0 0 12px #00f5c4',
                                }}
                                transition={{ duration: 0.1 }}
                            />
                        </div>
                        <motion.span
                            className="text-xs font-mono text-accent tabular-nums"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            {Math.round(progress).toString().padStart(3, '0')}%
                        </motion.span>
                    </div>

                    {/* Corner decorations */}
                    {[
                        'top-6 left-6',
                        'top-6 right-6',
                        'bottom-6 left-6',
                        'bottom-6 right-6',
                    ].map((pos, i) => (
                        <motion.div
                            key={pos}
                            className={`absolute ${pos} w-8 h-8`}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 + i * 0.1 }}
                        >
                            <div className={`w-4 h-px bg-accent absolute ${i < 2 ? 'top-0' : 'bottom-0'} ${i % 2 === 0 ? 'left-0' : 'right-0'}`} />
                            <div className={`h-4 w-px bg-accent absolute ${i < 2 ? 'top-0' : 'bottom-0'} ${i % 2 === 0 ? 'left-0' : 'right-0'}`} />
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
