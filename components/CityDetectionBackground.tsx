import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// --- Buildings Component ---
const Buildings = () => {
    const mesh = useRef<THREE.InstancedMesh>(null);
    const dummy = useMemo(() => new THREE.Object3D(), []);
    const [isHovered, setIsHovered] = useState(false);

    const buildings = useMemo(() => {
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
        buildings.forEach((data, i) => {
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
            args={[undefined, undefined, buildings.length]}
            onPointerOver={() => setIsHovered(true)}
            onPointerOut={() => setIsHovered(false)}
        >
            <boxGeometry args={[1, 1, 1]} />
            <meshPhongMaterial
                attach="material"
                color={isHovered ? "#e2e8f0" : "#94a3b8"}
                transparent
                opacity={isHovered ? 1.0 : 0.9}
            />
        </instancedMesh>
    );
};

// --- Ground Component ---
const Ground = () => {
    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
            <planeGeometry args={[1000, 1000]} />
            <meshBasicMaterial attach="material" color="#f8fafc" />
        </mesh>
    );
}

const CityDetectionBackground = () => {
    return (
        <div className="absolute inset-0 z-0">
            <Canvas
                shadows
                camera={{ position: [0, 20, 40], fov: 60 }}
                gl={{ alpha: true, antialias: true }}
                dpr={[1, 2]}
            >
                <fog attach="fog" args={['#f8fafc', 5, 90]} />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={0.5} />

                <Buildings />
                <Ground />
            </Canvas>

            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-80 pointer-events-none"></div>
        </div>
    );
};

export default CityDetectionBackground;
