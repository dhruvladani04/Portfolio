import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Ring, Box, Torus } from '@react-three/drei';
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

function ParticleField({ count = 300, spread = 20 }) {
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * spread;
      const y = (Math.random() - 0.5) * spread;
      const z = (Math.random() - 0.5) * spread - 5;
      temp.push({ x, y, z, speed: 0.2 + Math.random() * 0.5, offset: Math.random() * Math.PI * 2 });
    }
    return temp;
  }, [count, spread]);

  const pointsRef = useRef();
  const positionsRef = useRef();

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1;
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
        size={0.04}
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

// Energy beam shooting from core
function EnergyBeam({ angle = 0, length = 4, color = "#00d9ff" }) {
  const beamRef = useRef();

  useFrame((state) => {
    if (beamRef.current) {
      const pulse = 0.5 + Math.sin(state.clock.elapsedTime * 3 + angle) * 0.5;
      beamRef.current.material.opacity = pulse * 0.4;
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
      <lineBasicMaterial color={color} transparent opacity={0.3} />
    </line>
  );
}

// Floating geometric shapes
function FloatingShape({ position, geometry, color, scale = 1, rotationSpeed = 0.5, floatIntensity = 0.5 }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01 * rotationSpeed;
      meshRef.current.rotation.y += 0.015 * rotationSpeed;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * floatIntensity + position[0]) * 0.3;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.3}>
      <mesh ref={meshRef} position={position} scale={scale}>
        {geometry === 'octahedron' && <octahedronGeometry args={[0.3]} />}
        {geometry === 'tetrahedron' && <tetrahedronGeometry args={[0.3]} />}
        {geometry === 'icosahedron' && <icosahedronGeometry args={[0.25]} />}
        {geometry === 'dodecahedron' && <dodecahedronGeometry args={[0.25]} />}
        {geometry === 'torus' && <torusGeometry args={[0.2, 0.08, 8, 16]} />}
        <meshBasicMaterial color={color} transparent opacity={0.15} wireframe />
      </mesh>
    </Float>
  );
}

// Glowing orb that moves around
function GlowingOrb({ basePosition, color = "#ffa502", speed = 1 }) {
  const orbRef = useRef();

  useFrame((state) => {
    if (orbRef.current) {
      const t = state.clock.elapsedTime * speed;
      orbRef.current.position.x = basePosition[0] + Math.sin(t) * 2;
      orbRef.current.position.y = basePosition[1] + Math.cos(t * 0.7) * 1.5;
      orbRef.current.position.z = basePosition[2] + Math.sin(t * 0.5) * 1;

      const scale = 0.8 + Math.sin(t * 2) * 0.2;
      orbRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group ref={orbRef} position={basePosition}>
      <Sphere args={[0.15, 16, 16]}>
        <meshBasicMaterial color={color} transparent opacity={0.8} />
      </Sphere>
      <Sphere args={[0.25, 16, 16]}>
        <meshBasicMaterial color={color} transparent opacity={0.2} />
      </Sphere>
    </group>
  );
}

// Data flow lines
function DataFlowLine({ startPos, endPos, color = "#00d9ff", duration = 3 }) {
  const lineRef = useRef();
  const progressRef = useRef(0);

  useFrame((state, delta) => {
    if (lineRef.current) {
      progressRef.current = (progressRef.current + delta / duration) % 1;
      const progress = progressRef.current;

      // Update line positions for flowing effect
      const positions = lineRef.current.geometry.attributes.position.array;
      const segments = 20;

      for (let i = 0; i <= segments; i++) {
        const t = i / segments;
        const flowT = (progress + t) % 1;
        const alpha = Math.sin(flowT * Math.PI);

        positions[i * 3] = startPos[0] + (endPos[0] - startPos[0]) * t;
        positions[i * 3 + 1] = startPos[1] + (endPos[1] - startPos[1]) * t + Math.sin(t * Math.PI * 4) * 0.3;
        positions[i * 3 + 2] = startPos[2] + (endPos[2] - startPos[2]) * t;
      }

      lineRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  const positions = useMemo(() => {
    const pos = new Float32Array(21 * 3); // 20 segments + 1
    for (let i = 0; i <= 20; i++) {
      const t = i / 20;
      pos[i * 3] = startPos[0] + (endPos[0] - startPos[0]) * t;
      pos[i * 3 + 1] = startPos[1] + (endPos[1] - startPos[1]) * t;
      pos[i * 3 + 2] = startPos[2] + (endPos[2] - startPos[2]) * t;
    }
    return pos;
  }, [startPos, endPos]);

  return (
    <line ref={lineRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={21}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial color={color} transparent opacity={0.3} />
    </line>
  );
}

// Orbiting ring
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
      <Torus args={[radius, 0.02, 8, 64]}>
        <meshBasicMaterial color={color} transparent opacity={0.4} />
      </Torus>
      {/* Small nodes on the ring */}
      {[0, 0.5, 1, 1.5].map((offset, i) => (
        <mesh key={i} position={[Math.cos(offset * Math.PI) * radius, Math.sin(offset * Math.PI) * radius, 0]}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshBasicMaterial color={color} transparent opacity={0.7} />
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
      const scale = 0.8 + Math.sin(state.clock.elapsedTime * 1.5) * 0.15;
      hexRef.current.scale.set(scale, scale, 1);
      hexRef.current.material.opacity = 0.1 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
    }
  });

  return (
    <mesh ref={hexRef} position={position} rotation={[0, 0, Math.PI / 6]}>
      <circleGeometry args={[maxRadius, 6]} />
      <meshBasicMaterial color="#00d9ff" transparent opacity={0.1} />
    </mesh>
  );
}

export default function ArcReactorScene() {
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

  // Floating shapes positions
  const floatingShapes = useMemo(() => [
    { position: [-4, 2, -3], geometry: 'octahedron', color: blueColor, scale: 1.2, speed: 0.3 },
    { position: [4, -1.5, -2], geometry: 'tetrahedron', color: goldColor, scale: 0.8, speed: 0.4 },
    { position: [-3, -2, -4], geometry: 'icosahedron', color: redColor, scale: 0.9, speed: 0.25 },
    { position: [3.5, 2.5, -3], geometry: 'dodecahedron', color: blueColor, scale: 0.7, speed: 0.35 },
    { position: [-5, 0, -5], geometry: 'torus', color: goldColor, scale: 1, speed: 0.2 },
    { position: [5, 1, -4], geometry: 'octahedron', color: redColor, scale: 0.6, speed: 0.45 },
  ], []);

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

        {/* Orbiting rings */}
        <OrbitingRing radius={3.5} tilt={0.3} speed={0.2} color={goldColor} />
        <OrbitingRing radius={4} tilt={-0.2} speed={-0.15} color={blueColor} />

        {/* Main reactor rings */}
        <ArcReactorRing radius={3} thickness={0.08} segments={12} speed={0.1} color={blueColor} />
        <ArcReactorRing radius={2.5} thickness={0.06} segments={8} speed={-0.15} color={goldColor} />
        <ArcReactorRing radius={2} thickness={0.05} segments={6} speed={0.2} color={blueColor} />
        <ArcReactorRing radius={1.5} thickness={0.04} segments={4} speed={-0.25} color={goldColor} />
        <ArcReactorRing radius={1} thickness={0.03} segments={6} speed={0.4} color={blueColor} />

        {/* Core */}
        <ArcCore />

        {/* Energy beams radiating from core */}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <EnergyBeam key={i} angle={(i / 6) * Math.PI * 2} length={3.5} color={i % 2 === 0 ? blueColor : goldColor} />
        ))}

        {/* Background elements */}
        <HexGridCircle rings={5} />

        {/* Enhanced particle field */}
        <ParticleField count={250} spread={25} />

        {/* Pulsing hexagon */}
        <PulsingHexagon position={[0, 0, -4]} maxRadius={2.5} />

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

        {/* Glowing orbs */}
        <GlowingOrb basePosition={[3, 1, -2]} color={goldColor} speed={0.8} />
        <GlowingOrb basePosition={[-3, -1, -2]} color={blueColor} speed={0.6} />
        <GlowingOrb basePosition={[0, 3, -3]} color={redColor} speed={1} />
      </group>
    </>
  );
}
