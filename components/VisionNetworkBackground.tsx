import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Particles = ({ count = 400 }) => {
    const mesh = useRef();
    const light = useRef();

    // Generate random particles
    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const t = Math.random() * 100;
            const factor = 20 + Math.random() * 100;
            const speed = 0.01 + Math.random() / 200;
            const xFactor = -50 + Math.random() * 100;
            const yFactor = -50 + Math.random() * 100;
            const zFactor = -50 + Math.random() * 100;
            temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
        }
        return temp;
    }, [count]);

    // Dummy object for efficient instancing
    const dummy = useMemo(() => new THREE.Object3D(), []);

    useFrame((state) => {
        if (!mesh.current) return;

        particles.forEach((particle, i) => {
            let { t, factor, speed, xFactor, yFactor, zFactor } = particle;

            // Update time
            t = particle.t += speed / 2;
            const a = Math.cos(t) + Math.sin(t * 1) / 10;
            const b = Math.sin(t) + Math.cos(t * 2) / 10;
            const s = Math.cos(t);

            // Mouse interaction
            // Smoothly interpolate mouse position influence
            particle.mx += (state.mouse.x * 100 - particle.mx) * 0.1;
            particle.my += (state.mouse.y * 100 - particle.my) * 0.1;

            // Position calculation (Lissajous figures-ish + Mouse)
            dummy.position.set(
                (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
                (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
                (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
            );

            // Scale based on position (fake depth of field)
            const scale = Math.max(0.5, Math.cos(t) * 1.5);
            dummy.scale.set(scale, scale, scale);

            dummy.rotation.set(s * 5, s * 5, s * 5);
            dummy.updateMatrix();

            mesh.current.setMatrixAt(i, dummy.matrix);
        });
        mesh.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <>
            {/* Instanced Mesh for High Performance */}
            <instancedMesh ref={mesh} args={[null, null, count]}>
                <dodecahedronGeometry args={[0.15, 0]} />
                <meshPhongMaterial color="#3b82f6" transparent opacity={0.6} />
            </instancedMesh>
        </>
    );
};

const ConnectingLines = () => {
    // A simplified visual representation of network/camera grid
    return (
        <gridHelper args={[60, 60, 0xe2e8f0, 0xf1f5f9]} position={[0, -5, 0]} rotation={[Math.PI / 2.5, 0, 0]} />
    )
}

const VisionNetworkBackground = () => {
    return (
        <div className="absolute inset-0 w-full h-full bg-slate-50">
            <Canvas camera={{ position: [0, 0, 25], fov: 75 }} gl={{ alpha: true, antialias: true }} dpr={[1, 2]}>
                <ambientLight intensity={0.8} />
                <pointLight position={[100, 100, 100]} intensity={1} color="#3b82f6" />
                <pointLight position={[-100, -100, -100]} intensity={1} color="#6366f1" />

                {/* Subtle Grid for "Camera/Vision" feel */}
                <ConnectingLines />

                {/* Floating Particles for "AI/Data" feel */}
                <Particles count={300} />

                {/* Fog for depth and clean look */}
                <fog attach="fog" args={['#f8fafc', 5, 45]} />
            </Canvas>
        </div>
    );
};

export default VisionNetworkBackground;
