import { useEffect, useRef } from 'react';

export default function CustomCursor() {
    const dotRef = useRef(null);
    const ringRef = useRef(null);

    useEffect(() => {
        const dot = dotRef.current;
        const ring = ringRef.current;
        let mouseX = 0, mouseY = 0;
        let ringX = 0, ringY = 0;

        const move = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            dot.style.left = mouseX + 'px';
            dot.style.top = mouseY + 'px';
        };

        const animate = () => {
            ringX += (mouseX - ringX) * 0.12;
            ringY += (mouseY - ringY) * 0.12;
            ring.style.left = ringX + 'px';
            ring.style.top = ringY + 'px';
            requestAnimationFrame(animate);
        };

        const handleHover = () => {
            ring.style.width = '60px';
            ring.style.height = '60px';
            ring.style.borderColor = 'rgba(0, 245, 196, 0.8)';
        };
        const handleLeave = () => {
            ring.style.width = '36px';
            ring.style.height = '36px';
            ring.style.borderColor = 'rgba(0, 245, 196, 0.5)';
        };

        window.addEventListener('mousemove', move);
        const interactives = document.querySelectorAll('a, button, [data-cursor]');
        interactives.forEach(el => {
            el.addEventListener('mouseenter', handleHover);
            el.addEventListener('mouseleave', handleLeave);
        });

        animate();
        return () => window.removeEventListener('mousemove', move);
    }, []);

    return (
        <>
            <div ref={dotRef} className="cursor-dot" style={{ transform: 'translate(-50%, -50%)' }} />
            <div ref={ringRef} className="cursor-ring" style={{ transform: 'translate(-50%, -50%)' }} />
        </>
    );
}
