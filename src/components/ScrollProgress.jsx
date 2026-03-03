import { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function ScrollProgress() {
    const [pct, setPct] = useState(0);
    const { theme } = useTheme();

    useEffect(() => {
        const fn = () => {
            const max = document.body.scrollHeight - window.innerHeight;
            setPct(max > 0 ? (window.scrollY / max) * 100 : 0);
        };
        window.addEventListener('scroll', fn, { passive: true });
        return () => window.removeEventListener('scroll', fn);
    }, []);

    return (
        <>
            {/* Top bar */}
            <div
                className="fixed top-0 left-0 h-[2px] z-[200] origin-left"
                style={{
                    width: `${pct}%`,
                    background: theme.gradient,
                    boxShadow: `0 0 10px ${theme.accent}`,
                    transition: 'width 0.1s linear',
                }}
            />
            {/* Right sidebar — desktop only */}
            <div className="fixed right-4 top-1/2 -translate-y-1/2 z-[200] hidden lg:flex flex-col items-center gap-1.5">
                <div className="w-px h-20 rounded-full overflow-hidden" style={{ background: `${theme.text}10` }}>
                    <div
                        className="w-full rounded-full"
                        style={{
                            height: `${pct}%`,
                            background: theme.gradient,
                            boxShadow: `0 0 6px ${theme.accent}`,
                            transition: 'height 0.1s linear',
                        }}
                    />
                </div>
                <span
                    className="text-[9px] font-mono tabular-nums"
                    style={{ color: `${theme.textMuted}60`, writingMode: 'vertical-rl' }}
                >
                    {Math.round(pct)}%
                </span>
            </div>
        </>
    );
}
