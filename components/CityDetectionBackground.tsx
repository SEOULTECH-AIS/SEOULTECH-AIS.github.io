import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// --- Buildings Component (Unchanged) ---
const Buildings = () => {
    const mesh = useRef();
    const dummy = useMemo(() => new THREE.Object3D(), []);

    const buildings = useMemo(() => {
        const temp = [];
        const streetWidth = 26;
        const spacing = 35;
        const rows = 12;

        for (let i = 0; i < rows; i++) {
            const z = - (i * spacing) + 50;
            const wLeft = 3 + Math.random() * 4;
            const dLeft = 3 + Math.random() * 4;
            const hLeft = 3 + Math.random() * 8;
            const wRight = 3 + Math.random() * 4;
            const dRight = 3 + Math.random() * 4;
            const hRight = 3 + Math.random() * 8;
            const xOffsetLeft = Math.random() * 5;
            temp.push({ x: -(streetWidth / 2 + 3 + xOffsetLeft), z: z, h: hLeft, w: wLeft, d: dLeft });
            const xOffsetRight = Math.random() * 5;
            temp.push({ x: (streetWidth / 2 + 3 + xOffsetRight), z: z, h: hRight, w: wRight, d: dRight });
            if (Math.random() > 0.3) temp.push({ x: -(streetWidth / 2 + 15 + Math.random() * 10), z: z, h: 5 + Math.random() * 10, w: 5 + Math.random() * 5, d: 5 + Math.random() * 5 });
            if (Math.random() > 0.3) temp.push({ x: (streetWidth / 2 + 15 + Math.random() * 10), z: z, h: 5 + Math.random() * 10, w: 5 + Math.random() * 5, d: 5 + Math.random() * 5 });
        }
        return temp;
    }, []);

    useFrame((state) => {
        if (!mesh.current) return;
        const speed = 1.5;
        const roadLength = 12 * 35;

        buildings.forEach((b, i) => {
            let z = (b.z + state.clock.elapsedTime * speed) % roadLength;
            if (z > 50) z -= roadLength;
            dummy.position.set(b.x, b.h / 2, z);
            dummy.scale.set(b.w, b.h, b.d);
            dummy.updateMatrix();
            mesh.current.setMatrixAt(i, dummy.matrix);
        });
        mesh.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={mesh} args={[null, null, buildings.length]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshBasicMaterial color="#cbd5e1" wireframe={true} transparent opacity={0.3} />
        </instancedMesh>
    );
};

// --- Road Lines (Unchanged) ---
const RoadLines = () => {
    return (
        <group>
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
                <planeGeometry args={[0.5, 1000]} />
                <meshBasicMaterial color="#e2e8f0" />
            </mesh>
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-13, 0.01, 0]}>
                <planeGeometry args={[0.2, 1000]} />
                <meshBasicMaterial color="#cbd5e1" />
            </mesh>
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[13, 0.01, 0]}>
                <planeGeometry args={[0.2, 1000]} />
                <meshBasicMaterial color="#cbd5e1" />
            </mesh>
            {Array.from({ length: 20 }).map((_, i) => (
                <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} positionOptions={{}} position={[(i - 10) * 15, 0.005, 0]}>
                    <planeGeometry args={[0.1, 1000]} />
                    <meshBasicMaterial color="#f1f5f9" />
                </mesh>
            ))}
        </group>
    )
}

const InfiniteFloor = () => {
    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
            <planeGeometry args={[1000, 1000]} />
            <meshBasicMaterial color="#f8fafc" />
        </mesh>
    )
}

// --- Car Dimensions Config ---
const CAR_DIMS = {
    sedan: { w: 2.2, h: 1.6, d: 4.2 },
    suv: { w: 2.2, h: 1.9, d: 4.2 },
    truck: { w: 2.3, h: 2.3, d: 4.8 }
};

// --- Low Poly Car Models ---
const CarModel = ({ type, color = "#e2e8f0" }) => {
    const mat = <meshStandardMaterial color={color} roughness={0.5} metalness={0.5} />;

    if (type === 'sedan') {
        return (
            <group>
                <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
                    <boxGeometry args={[2.0, 0.6, 4.0]} />
                    {mat}
                </mesh>
                <mesh position={[0, 1.0, -0.3]} castShadow receiveShadow>
                    <boxGeometry args={[1.6, 0.7, 2.0]} />
                    {mat}
                </mesh>
            </group>
        )
    } else if (type === 'suv') {
        return (
            <group>
                <mesh position={[0, 0.6, 0]} castShadow receiveShadow>
                    <boxGeometry args={[2.0, 0.8, 4.0]} />
                    {mat}
                </mesh>
                <mesh position={[0, 1.3, -0.2]} castShadow receiveShadow>
                    <boxGeometry args={[1.7, 0.7, 2.5]} />
                    {mat}
                </mesh>
            </group>
        )
    } else if (type === 'truck') {
        return (
            <group>
                <mesh position={[0, 1.1, 1.2]} castShadow receiveShadow>
                    <boxGeometry args={[2.0, 1.8, 1.5]} />
                    {mat}
                </mesh>
                <mesh position={[0, 0.5, -1.0]} castShadow receiveShadow>
                    <boxGeometry args={[2.0, 0.6, 2.8]} />
                    {mat}
                </mesh>
                <mesh position={[0, 1.1, -1.0]} castShadow receiveShadow>
                    <boxGeometry args={[1.9, 1.2, 2.6]} />
                    {mat}
                </mesh>
            </group>
        )
    }
    return (
        <mesh position={[0, 0.5, 0]}>
            <boxGeometry args={[2, 1, 4]} />
            {mat}
        </mesh>
    )
}

// --- Traffic with Dynamic Bounding Boxes ---
const TrafficController = () => {
    const { camera, raycaster, mouse } = useThree();
    const floorPlane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 1, 0), 0), []);

    const [hoveredID, setHoveredID] = useState(null);

    const cars = useMemo(() => {
        const temp = [];
        const countPerLane = 5;
        const spacing = 40;
        const types = ['sedan', 'suv', 'truck'];
        const genType = () => types[Math.floor(Math.random() * types.length)];

        for (let i = 0; i < countPerLane; i++) {
            temp.push({ id: i, isLeft: true, x: -7, offset: i * spacing + Math.random() * 10, speed: 8, type: genType() });
        }
        for (let i = 0; i < countPerLane; i++) {
            temp.push({ id: i + countPerLane, isLeft: false, x: 7, offset: i * spacing + Math.random() * 10, speed: 6, type: genType() });
        }
        return temp;
    }, []);

    const groupRef = useRef();

    useFrame((state) => {
        if (!groupRef.current) return;
        const time = state.clock.elapsedTime;
        const roadLength = 200;

        groupRef.current.children.forEach((child, i) => {
            const car = cars[i];
            let z;
            if (car.isLeft) {
                let dist = (time * car.speed + car.offset) % roadLength;
                z = dist - 150;
            } else {
                let dist = (time * car.speed + car.offset) % roadLength;
                z = 50 - dist;
            }
            child.position.set(car.x, 0, z);
        });

        raycaster.setFromCamera(mouse, camera);
        const targetPos = new THREE.Vector3();
        raycaster.ray.intersectPlane(floorPlane, targetPos);

        if (targetPos) {
            let minDist = Infinity;
            let closestIndex = -1;

            groupRef.current.children.forEach((child, i) => {
                const dist = child.position.distanceTo(targetPos);
                if (dist < minDist) {
                    minDist = dist;
                    closestIndex = cars[i].id;
                }
            });

            if (minDist < 8) {
                setHoveredID(closestIndex);
            } else {
                setHoveredID(null);
            }
        } else {
            setHoveredID(null);
        }
    });

    return (
        <group ref={groupRef}>
            {cars.map((car) => {
                const isHovered = hoveredID === car.id;
                const dims = CAR_DIMS[car.type] || CAR_DIMS.sedan;

                return (
                    <group key={car.id} rotation={[0, car.isLeft ? 0 : Math.PI, 0]}>
                        <CarModel type={car.type} color={car.isLeft ? "#e2e8f0" : "#f1f5f9"} />

                        {/* Dynamic Bounding Box */}
                        {/* Position Y = height/2 to sit on ground */}
                        <lineSegments position={[0, dims.h / 2, 0]}>
                            <edgesGeometry args={[new THREE.BoxGeometry(dims.w, dims.h, dims.d)]} />
                            <lineBasicMaterial
                                color={isHovered ? "#2563eb" : "#94a3b8"}
                                transparent
                                opacity={isHovered ? 1.0 : 0.3}
                            />
                        </lineSegments>

                        {/* Dynamic Highlight Box */}
                        {isHovered && (
                            <mesh position={[0, dims.h / 2, 0]}>
                                <boxGeometry args={[dims.w, dims.h, dims.d]} />
                                <meshBasicMaterial color="#3b82f6" transparent opacity={0.1} depthWrite={false} />
                            </mesh>
                        )}
                    </group>
                );
            })}
        </group>
    );
};

const CityDetectionBackground = () => {
    return (
        <div className="absolute inset-0 w-full h-full bg-slate-50 overflow-hidden relative">
            <Canvas
                camera={{ position: [0, 8, 20], fov: 50 }}
                gl={{ alpha: true, antialias: true }}
                dpr={[1, 2]}
            >
                <fog attach="fog" args={['#f8fafc', 5, 90]} />
                <ambientLight intensity={1.5} />
                <pointLight position={[20, 20, 20]} intensity={0.8} />
                <pointLight position={[-20, 10, -10]} intensity={0.5} />

                <InfiniteFloor />
                <RoadLines />
                <Buildings />

                <TrafficController />

            </Canvas>
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent pointer-events-none opacity-90"></div>
        </div>
    );
};

export default CityDetectionBackground;
