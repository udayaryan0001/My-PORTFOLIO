import { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function ParticlesCanvas() {
    const canvasRef = useRef(null);
    const { theme } = useTheme();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animId;
        let W = window.innerWidth, H = window.innerHeight;
        canvas.width = W;
        canvas.height = H;

        // Fewer particles on mobile for performance
        const isMobile = W < 768;
        const N = isMobile ? 25 : 50;
        const CONNECTION_DIST = isMobile ? 80 : 110;
        const MOUSE_DIST = isMobile ? 0 : 140; // disable mouse attraction on mobile

        const mouse = { x: -9999, y: -9999 };
        const onMouse = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; };
        if (!isMobile) window.addEventListener('mousemove', onMouse, { passive: true });

        const accentColor = theme.accent;
        const particles = Array.from({ length: N }, () => ({
            x: Math.random() * W,
            y: Math.random() * H,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3,
            size: Math.random() * 2 + 0.5,
            pulse: Math.random() * Math.PI * 2,
        }));

        let lastTime = 0;
        const draw = (ts) => {
            animId = requestAnimationFrame(draw);
            // Throttle to ~40fps for performance
            if (ts - lastTime < 25) return;
            lastTime = ts;

            ctx.clearRect(0, 0, W, H);

            for (let i = 0; i < N; i++) {
                const p = particles[i];
                p.pulse += 0.025;
                const alpha = 0.2 + 0.15 * Math.sin(p.pulse);

                // Connections
                for (let j = i + 1; j < N; j++) {
                    const q = particles[j];
                    const dx = p.x - q.x, dy = p.y - q.y;
                    const d = Math.sqrt(dx * dx + dy * dy);
                    if (d < CONNECTION_DIST) {
                        ctx.beginPath();
                        ctx.strokeStyle = `${accentColor}${Math.floor(12 * (1 - d / CONNECTION_DIST)).toString(16).padStart(2, '0')}`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(q.x, q.y);
                        ctx.stroke();
                    }
                }

                // Mouse connection
                if (MOUSE_DIST > 0) {
                    const mdx = p.x - mouse.x, mdy = p.y - mouse.y;
                    const md = Math.sqrt(mdx * mdx + mdy * mdy);
                    if (md < MOUSE_DIST) {
                        ctx.beginPath();
                        ctx.strokeStyle = `${accentColor}${Math.floor(40 * (1 - md / MOUSE_DIST)).toString(16).padStart(2, '0')}`;
                        ctx.lineWidth = 0.8;
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(mouse.x, mouse.y);
                        ctx.stroke();
                        p.vx -= (mdx / md) * 0.012;
                        p.vy -= (mdy / md) * 0.012;
                    }
                }

                // Draw dot
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = accentColor;
                ctx.globalAlpha = alpha;
                ctx.fill();
                ctx.globalAlpha = 1;

                // Update
                p.x += p.vx;
                p.y += p.vy;
                p.vx *= 0.99;
                p.vy *= 0.99;
                p.vx += (Math.random() - 0.5) * 0.015;
                p.vy += (Math.random() - 0.5) * 0.015;
                if (p.x < 0) p.x = W;
                if (p.x > W) p.x = 0;
                if (p.y < 0) p.y = H;
                if (p.y > H) p.y = 0;
            }
        };

        animId = requestAnimationFrame(draw);

        const onResize = () => {
            W = window.innerWidth; H = window.innerHeight;
            canvas.width = W; canvas.height = H;
        };
        window.addEventListener('resize', onResize, { passive: true });

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('mousemove', onMouse);
            window.removeEventListener('resize', onResize);
        };
    }, [theme.accent]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-[1] pointer-events-none"
            aria-hidden="true"
            style={{ opacity: 0.5 }}
        />
    );
}
