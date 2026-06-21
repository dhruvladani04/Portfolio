import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Ring, Box } from '@react-three/drei';
import * as THREE from 'three';

function ArcReactorRing({ radius, thickness, segments, speed, color, inner = false }) {
  const ringRef = useRef();

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.elapsedTime * speed;
    }
  });

  const nodes = useMemo(() => {
    const points = [];
    for (let i = 0; i < segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      points.push({ x, y, angle });
    }
    return points;
  }, [radius, segments]);

  return (
    <group ref={ringRef}>
      {/* Main ring */}
      <Ring
        args={[radius - thickness, radius, 64]}
        rotation={[0, 0, Math.PI / 2]}
      >
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
        />
      </Ring>

      {/* Nodes around the ring */}
      {nodes.map((node, i) => (
        <mesh key={i} position={[node.x, node.y, 0]}>
          <sphereGeometry args={[thickness * 0.5, 8, 8]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}
    </group>
  );
}

function HexGridCircle({ radius = 5, rings = 4 }) {
  const hexagons = useMemo(() => {
    const hexs = [];
    for (let ring = 0; ring < rings; ring++) {
      const count = ring === 0 ? 1 : ring * 6;
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2;
        const r = ring * 0.8;
        const x = Math.cos(angle) * r;
        const y = Math.sin(angle) * r;
        hexs.push({ x, y, ring });
      }
    }
    return hexs;
  }, [rings]);

  return (
    <group position={[0, 0, -2]} rotation={[0, 0, 0]}>
      {hexagons.map((hex, i) => (
        <mesh key={i} position={[hex.x, hex.y, 0]} rotation={[0, 0, Math.PI / 6]}>
          <circleGeometry args={[0.15, 6]} />
          <meshBasicMaterial
            color="#00d9ff"
            transparent
            opacity={0.1 + (hex.ring * 0.05)}
          />
        </mesh>
      ))}
    </group>
  );
}

function ParticleField({ count = 200, spread = 15 }) {
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * spread;
      const y = (Math.random() - 0.5) * spread;
      const z = (Math.random() - 0.5) * spread - 5;
      temp.push({ x, y, z, speed: 0.5 + Math.random() });
    }
    return temp;
  }, [count, spread]);

  const pointsRef = useRef();

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    particles.forEach((p, i) => {
      pos[i * 3] = p.x;
      pos[i * 3 + 1] = p.y;
      pos[i * 3 + 2] = p.z;
    });
    return pos;
  }, [particles, count]);

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#00d9ff"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

function ArcCore() {
  const coreRef = useRef();

  useFrame((state) => {
    if (coreRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      coreRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group ref={coreRef}>
      {/* Inner glow */}
      <Sphere args={[0.3, 32, 32]}>
        <meshBasicMaterial
          color="#00d9ff"
          transparent
          opacity={0.9}
        />
      </Sphere>

      {/* Outer glow */}
      <Sphere args={[0.4, 32, 32]}>
        <meshBasicMaterial
          color="#4fc3f7"
          transparent
          opacity={0.3}
        />
      </Sphere>
    </group>
  );
}

function TriangleFrame({ size = 6, color = "#e63946" }) {
  const shape = useMemo(() => {
    const s = new THREE.Shape();
    const h = size * Math.sqrt(3) / 2;
    s.moveTo(0, h * 0.67);
    s.lineTo(-size / 2, -h * 0.33);
    s.lineTo(size / 2, -h * 0.33);
    s.lineTo(0, h * 0.67);
    return s;
  }, [size]);

  const geomRef = useRef();

  useFrame((state) => {
    if (geomRef.current) {
      geomRef.current.rotation.z = Math.PI;
    }
  });

  return (
    <group ref={geomRef} position={[0, 0, -1]}>
      <mesh rotation={[0, 0, Math.PI]}>
        <shapeGeometry args={[shape]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.05}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Triangle outline */}
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={4}
            array={new Float32Array([
              0, size * Math.sqrt(3) / 2 * 0.67, 0,
              -size / 2, -size * Math.sqrt(3) / 2 * 0.33, 0,
              size / 2, -size * Math.sqrt(3) / 2 * 0.33, 0,
              0, size * Math.sqrt(3) / 2 * 0.67, 0,
            ])}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color={color} transparent opacity={0.3} />
      </line>
    </group>
  );
}

export default function ArcReactorScene({ theme = 'dark' }) {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle floating motion
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  const blueColor = "#00d9ff";
  const goldColor = "#ffa502";
  const redColor = "#e63946";

  return (
    <>
      {/* Ambient light */}
      <ambientLight intensity={0.1} />

      {/* Point lights for glow effect */}
      <pointLight position={[0, 0, 0]} color={blueColor} intensity={2} distance={10} />
      <pointLight position={[0, 2, 0]} color={goldColor} intensity={0.5} distance={8} />

      <group ref={groupRef} position={[0, 0, 0]} rotation={[0, 0, 0]}>
        {/* Triangle frame (Iron Man style) */}
        <TriangleFrame size={8} color={redColor} />

        {/* Outer rings */}
        <ArcReactorRing radius={3} thickness={0.08} segments={12} speed={0.1} color={blueColor} />
        <ArcReactorRing radius={2.5} thickness={0.06} segments={8} speed={-0.15} color={goldColor} />
        <ArcReactorRing radius={2} thickness={0.05} segments={6} speed={0.2} color={blueColor} />
        <ArcReactorRing radius={1.5} thickness={0.04} segments={4} speed={-0.25} color={goldColor} />
        <ArcReactorRing radius={1} thickness={0.03} segments={6} speed={0.4} color={blueColor} />

        {/* Core */}
        <ArcCore />

        {/* Background elements */}
        <HexGridCircle rings={5} />
        <ParticleField count={150} spread={20} />
      </group>
    </>
  );
}
