import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Ring, Box, Torus } from '@react-three/drei';
import * as THREE from 'three';

function ArcReactorRing({ radius, thickness, segments, speed, color }) {
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
      {/* Main ring - more transparent */}
      <Ring
        args={[radius - thickness, radius, 64]}
        rotation={[0, 0, Math.PI / 2]}
      >
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.12}
          side={THREE.DoubleSide}
        />
      </Ring>

      {/* Nodes around the ring */}
      {nodes.map((node, i) => (
        <mesh key={i} position={[node.x, node.y, 0]}>
          <sphereGeometry args={[thickness * 0.4, 8, 8]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.3}
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
            opacity={0.03 + (hex.ring * 0.02)}
          />
        </mesh>
      ))}
    </group>
  );
}

function ParticleField({ count = 150, spread = 25 }) {
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * spread;
      const y = (Math.random() - 0.5) * spread;
      const z = (Math.random() - 0.5) * spread - 8;
      temp.push({ x, y, z, speed: 0.2 + Math.random() * 0.3, offset: Math.random() * Math.PI * 2 });
    }
    return temp;
  }, [count, spread]);

  const pointsRef = useRef();

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.015;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.05;
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
        opacity={0.3}
        sizeAttenuation
      />
    </points>
  );
}

function ArcCore() {
  const coreRef = useRef();

  useFrame((state) => {
    if (coreRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.08;
      coreRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group ref={coreRef}>
      {/* Inner glow - more subtle */}
      <Sphere args={[0.25, 32, 32]}>
        <meshBasicMaterial
          color="#00d9ff"
          transparent
          opacity={0.4}
        />
      </Sphere>

      {/* Outer glow */}
      <Sphere args={[0.35, 32, 32]}>
        <meshBasicMaterial
          color="#4fc3f7"
          transparent
          opacity={0.1}
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

  return (
    <group ref={geomRef} position={[0, 0, -1]}>
      <mesh rotation={[0, 0, Math.PI]}>
        <shapeGeometry args={[shape]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.02}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Triangle outline - more subtle */}
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
        <lineBasicMaterial color={color} transparent opacity={0.12} />
      </line>
    </group>
  );
}

// Energy beam shooting from core
function EnergyBeam({ angle = 0, length = 4, color = "#00d9ff" }) {
  const beamRef = useRef();

  useFrame((state) => {
    if (beamRef.current) {
      const pulse = 0.3 + Math.sin(state.clock.elapsedTime * 2.5 + angle) * 0.3;
      beamRef.current.material.opacity = pulse * 0.15;
    }
  });

  const endX = Math.cos(angle) * length;
  const endY = Math.sin(angle) * length;

  return (
    <line ref={beamRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={2}
          array={new Float32Array([0, 0, 0, endX, endY, 0])}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial color={color} transparent opacity={0.12} />
    </line>
  );
}

// Floating geometric shapes - smaller and more subtle
function FloatingShape({ position, geometry, color, scale = 1, rotationSpeed = 0.5 }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.008 * rotationSpeed;
      meshRef.current.rotation.y += 0.01 * rotationSpeed;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.4 + position[0]) * 0.2;
    }
  });

  return (
    <Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.2}>
      <mesh ref={meshRef} position={position} scale={scale * 0.6}>
        {geometry === 'octahedron' && <octahedronGeometry args={[0.25]} />}
        {geometry === 'tetrahedron' && <tetrahedronGeometry args={[0.25]} />}
        {geometry === 'icosahedron' && <icosahedronGeometry args={[0.2]} />}
        {geometry === 'dodecahedron' && <dodecahedronGeometry args={[0.2]} />}
        {geometry === 'torus' && <torusGeometry args={[0.15, 0.06, 8, 16]} />}
        <meshBasicMaterial color={color} transparent opacity={0.06} wireframe />
      </mesh>
    </Float>
  );
}

// Glowing orb that moves around - more subtle
function GlowingOrb({ basePosition, color = "#ffa502", speed = 1 }) {
  const orbRef = useRef();

  useFrame((state) => {
    if (orbRef.current) {
      const t = state.clock.elapsedTime * speed * 0.5;
      orbRef.current.position.x = basePosition[0] + Math.sin(t) * 1.5;
      orbRef.current.position.y = basePosition[1] + Math.cos(t * 0.5) * 1;
      orbRef.current.position.z = basePosition[2] + Math.sin(t * 0.3) * 0.8;

      const scale = 0.6 + Math.sin(t) * 0.15;
      orbRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group ref={orbRef} position={basePosition}>
      <Sphere args={[0.08, 16, 16]}>
        <meshBasicMaterial color={color} transparent opacity={0.25} />
      </Sphere>
      <Sphere args={[0.15, 16, 16]}>
        <meshBasicMaterial color={color} transparent opacity={0.08} />
      </Sphere>
    </group>
  );
}

// Orbiting ring - more subtle
function OrbitingRing({ radius = 3, tilt = Math.PI / 4, speed = 0.3, color = "#ffa502" }) {
  const ringRef = useRef();

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.elapsedTime * speed;
      ringRef.current.rotation.x = tilt;
    }
  });

  return (
    <group ref={ringRef}>
      <Torus args={[radius, 0.015, 8, 64]}>
        <meshBasicMaterial color={color} transparent opacity={0.15} />
      </Torus>
      {/* Small nodes on the ring */}
      {[0, 0.5, 1, 1.5].map((offset, i) => (
        <mesh key={i} position={[Math.cos(offset * Math.PI) * radius, Math.sin(offset * Math.PI) * radius, 0]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshBasicMaterial color={color} transparent opacity={0.2} />
        </mesh>
      ))}
    </group>
  );
}

// Pulsing hexagon pattern
function PulsingHexagon({ position = [0, 0, -3], maxRadius = 2 }) {
  const hexRef = useRef();

  useFrame((state) => {
    if (hexRef.current) {
      const scale = 0.7 + Math.sin(state.clock.elapsedTime * 1.2) * 0.1;
      hexRef.current.scale.set(scale, scale, 1);
      hexRef.current.material.opacity = 0.03 + Math.sin(state.clock.elapsedTime * 1.5) * 0.02;
    }
  });

  return (
    <mesh ref={hexRef} position={position} rotation={[0, 0, Math.PI / 6]}>
      <circleGeometry args={[maxRadius, 6]} />
      <meshBasicMaterial color="#00d9ff" transparent opacity={0.03} />
    </mesh>
  );
}

export default function ArcReactorScene() {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle floating motion
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.08;
    }
  });

  const blueColor = "#00d9ff";
  const goldColor = "#ffa502";
  const redColor = "#e63946";

  // Floating shapes positions - moved further back
  const floatingShapes = useMemo(() => [
    { position: [-5, 2.5, -5], geometry: 'octahedron', color: blueColor, scale: 1, speed: 0.25 },
    { position: [5, -2, -4], geometry: 'tetrahedron', color: goldColor, scale: 0.8, speed: 0.3 },
    { position: [-4, -2.5, -6], geometry: 'icosahedron', color: redColor, scale: 0.9, speed: 0.2 },
    { position: [4.5, 3, -5], geometry: 'dodecahedron', color: blueColor, scale: 0.7, speed: 0.3 },
    { position: [-6, 0.5, -7], geometry: 'torus', color: goldColor, scale: 1, speed: 0.15 },
    { position: [6, 1.5, -6], geometry: 'octahedron', color: redColor, scale: 0.6, speed: 0.35 },
  ], []);

  return (
    <>
      {/* Ambient light - reduced */}
      <ambientLight intensity={0.05} />

      {/* Point lights for glow effect - reduced intensity */}
      <pointLight position={[0, 0, 0]} color={blueColor} intensity={0.8} distance={8} />
      <pointLight position={[0, 2, 0]} color={goldColor} intensity={0.2} distance={6} />

      <group ref={groupRef} position={[0, 0, 0]} rotation={[0, 0, 0]}>
        {/* Triangle frame */}
        <TriangleFrame size={8} color={redColor} />

        {/* Orbiting rings */}
        <OrbitingRing radius={3.5} tilt={0.3} speed={0.15} color={goldColor} />
        <OrbitingRing radius={4} tilt={-0.2} speed={-0.1} color={blueColor} />

        {/* Main reactor rings */}
        <ArcReactorRing radius={3} thickness={0.08} segments={12} speed={0.08} color={blueColor} />
        <ArcReactorRing radius={2.5} thickness={0.06} segments={8} speed={-0.1} color={goldColor} />
        <ArcReactorRing radius={2} thickness={0.05} segments={6} speed={0.15} color={blueColor} />
        <ArcReactorRing radius={1.5} thickness={0.04} segments={4} speed={-0.18} color={goldColor} />
        <ArcReactorRing radius={1} thickness={0.03} segments={6} speed={0.3} color={blueColor} />

        {/* Core */}
        <ArcCore />

        {/* Energy beams radiating from core */}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <EnergyBeam key={i} angle={(i / 6) * Math.PI * 2} length={3} color={i % 2 === 0 ? blueColor : goldColor} />
        ))}

        {/* Background elements */}
        <HexGridCircle rings={4} />

        {/* Enhanced particle field - moved back */}
        <ParticleField count={120} spread={30} />

        {/* Pulsing hexagon */}
        <PulsingHexagon position={[0, 0, -5]} maxRadius={2} />

        {/* Floating geometric shapes */}
        {floatingShapes.map((shape, i) => (
          <FloatingShape
            key={i}
            position={shape.position}
            geometry={shape.geometry}
            color={shape.color}
            scale={shape.scale}
            rotationSpeed={shape.speed}
          />
        ))}

        {/* Glowing orbs - moved back */}
        <GlowingOrb basePosition={[4, 1.5, -4]} color={goldColor} speed={0.6} />
        <GlowingOrb basePosition={[-4, -1.5, -4]} color={blueColor} speed={0.4} />
        <GlowingOrb basePosition={[0, 4, -5]} color={redColor} speed={0.8} />
      </group>
    </>
  );
}
