import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import { useTheme } from '../context/ThemeContext';

// Reduced count for performance
function Stars({ count = 1500, color }) {
    const ref = useRef();
    const positions = useMemo(() => {
        const arr = new Float32Array(count * 3);
        for (let i = 0; i < count * 3; i++) {
            arr[i] = (Math.random() - 0.5) * 18;
        }
        return arr;
    }, [count]);

    useFrame((_, delta) => {
        if (!ref.current) return;
        ref.current.rotation.x -= delta / 20;
        ref.current.rotation.y -= delta / 28;
    });

    return (
        <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
            <PointMaterial transparent color={color} size={0.012} sizeAttenuation depthWrite={false} opacity={0.6} />
        </Points>
    );
}

function WireShape({ geo, position, color, speedX = 0.4, speedY = 0.6, amplitude = 0.25 }) {
    const ref = useRef();
    useFrame((state, delta) => {
        if (!ref.current) return;
        ref.current.rotation.x += delta * speedX;
        ref.current.rotation.y += delta * speedY;
        ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * amplitude;
    });
    return (
        <mesh ref={ref} position={position}>
            {geo}
            <meshStandardMaterial color={color} wireframe transparent opacity={0.25} emissive={color} emissiveIntensity={0.2} />
        </mesh>
    );
}

function Scene({ accentColor, blueColor }) {
    return (
        <>
            <ambientLight intensity={0.3} />
            <pointLight position={[8, 8, 8]} color={accentColor} intensity={1} />
            <pointLight position={[-8, -8, -8]} color={blueColor} intensity={0.7} />
            <Stars color={accentColor} count={1500} />
            <WireShape geo={<torusGeometry args={[0.7, 0.1, 12, 48]} />} position={[-4, 1, -3]} color={accentColor} speedX={0.2} speedY={0.4} />
            <WireShape geo={<icosahedronGeometry args={[0.5, 0]} />} position={[3.5, 1.5, -3]} color={blueColor} speedX={0.3} speedY={0.5} />
            <WireShape geo={<octahedronGeometry args={[0.45, 0]} />} position={[0, -2, -3]} color={accentColor} speedX={0.5} speedY={0.3} amplitude={0.35} />
        </>
    );
}

export default function ThreeBackground() {
    const { theme } = useTheme();
    // Don't render on mobile for performance
    if (typeof window !== 'undefined' && window.innerWidth < 768) return null;

    return (
        <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
            <Canvas
                camera={{ position: [0, 0, 5], fov: 75 }}
                gl={{ alpha: true, antialias: false, powerPreference: 'low-power' }}
                dpr={[1, 1.5]}
                frameloop="always"
                style={{ background: 'transparent' }}
            >
                <Scene accentColor={theme.accent} blueColor={theme.accentBlue} />
            </Canvas>
        </div>
    );
}
