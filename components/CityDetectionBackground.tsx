import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { CITY_THEMES } from '../data/cityTheme';

// --- Buildings Component ---
const Buildings = ({ themeColors }: { themeColors: any }) => {
    const mesh = useRef<THREE.InstancedMesh>(null);
    const dummy = useMemo(() => new THREE.Object3D(), []);
    const [isHovered, setIsHovered] = useState(false);

    // Memoize random data 
    const buildingsData = useMemo(() => {
        const spacing = 15;
        const count = 15; // 15x15 grid
        const data = [];
        for (let i = 0; i < count; i++) {
            for (let j = 0; j < count; j++) {
                if (Math.random() > 0.2) {
                    data.push({
                        x: (i - count / 2) * spacing,
                        z: (j - count / 2) * spacing,
                        h: 10 + Math.random() * 30,
                        w: 5 + Math.random() * 5,
                        d: 5 + Math.random() * 5,
                        speed: Math.random() * 0.05
                    });
                }
            }
        }
        return data;
    }, []);

    useFrame((state) => {
        if (!mesh.current) return;
        buildingsData.forEach((data, i) => {
            dummy.position.set(data.x, data.h / 2, data.z);
            dummy.scale.set(data.w, data.h, data.d);
            dummy.updateMatrix();
            mesh.current.setMatrixAt(i, dummy.matrix);
        });
        mesh.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh
            ref={mesh}
            args={[undefined, undefined, buildingsData.length]}
            onPointerOver={() => setIsHovered(true)}
            onPointerOut={() => setIsHovered(false)}
        >
            <boxGeometry args={[1, 1, 1]} />
            <meshPhongMaterial
                attach="material"
                color={isHovered ? themeColors.buildingHover : themeColors.buildingStart}
                transparent
                opacity={isHovered ? 1.0 : 0.9}
            />
        </instancedMesh>
    );
};

// --- Ground Component ---
const Ground = ({ color }: { color: string }) => {
    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
            <planeGeometry args={[1000, 1000]} />
            <meshBasicMaterial attach="material" color={color} />
        </mesh>
    );
}

const CityDetectionBackground = () => {
    // Theme Detection
    const [theme, setTheme] = useState<'light' | 'dark'>(() => {
        if (typeof window !== 'undefined' && window.matchMedia) {
            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
        return 'light';
    });

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = (e: MediaQueryListEvent) => setTheme(e.matches ? 'dark' : 'light');
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    const colors = CITY_THEMES[theme];

    return (
        <div className="absolute inset-0 z-0">
            <Canvas
                shadows
                camera={{ position: [0, 20, 40], fov: 60 }}
                gl={{ alpha: true, antialias: true }}
                dpr={[1, 2]}
            >
                {/* Use original density of 5 */}
                <fog attach="fog" args={[colors.fog, 5, 90]} />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={0.5} />

                <Buildings themeColors={colors} />
                <Ground color={colors.background} />
            </Canvas>

            {/* Gradient Overlay for Text Readability */}
            <div className={`absolute inset-0 bg-gradient-to-t ${theme === 'dark' ? 'from-slate-900 via-slate-900/50 to-transparent' : 'from-white via-transparent to-transparent'} opacity-80 pointer-events-none`}></div>
        </div>
    );
};

export default CityDetectionBackground;
