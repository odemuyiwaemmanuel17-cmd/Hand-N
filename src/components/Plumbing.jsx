import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Kitchen corner with an exposed under-sink trap joint, animated water
// drips falling into a bucket, and a spreading puddle.
const DRIP_TOP = 0.42;
const DRIP_FALL = 0.28;

function Drips() {
  const drops = useRef([]);
  const puddle = useRef();
  const ripple = useRef();

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    drops.current.forEach((m, i) => {
      if (!m) return;
      const cycle = (t * 0.9 + i / 3) % 1;
      m.position.y = DRIP_TOP - cycle * (DRIP_TOP - DRIP_FALL);
      m.scale.set(0.7, 1 + cycle * 1.4, 0.7);
      m.material.opacity = 0.95;
      // splash squash at the bottom of the cycle
      if (cycle > 0.93) m.scale.set(1.4, 0.4, 1.4);
    });
    if (puddle.current) {
      const pulse = 1 + Math.sin(t * 5.4) * 0.04;
      puddle.current.scale.set(pulse, pulse, pulse);
    }
    if (ripple.current) {
      const c = (t * 0.9) % 1;
      ripple.current.scale.setScalar(0.4 + c * 1.4);
      ripple.current.material.opacity = (1 - c) * 0.5;
    }
  });

  return (
    <group position={[-2.55, 0, -2.18]}>
      {[0, 1, 2].map((i) => (
        <mesh
          key={i}
          ref={(m) => (drops.current[i] = m)}
          position={[0, DRIP_TOP, 0]}
        >
          <sphereGeometry args={[0.022, 12, 12]} />
          <meshStandardMaterial
            color="#9fd4ff"
            roughness={0.05}
            metalness={0.1}
            transparent
            opacity={0.95}
          />
        </mesh>
      ))}
      {/* bucket */}
      <mesh position={[0, 0.14, 0]} castShadow>
        <cylinderGeometry args={[0.17, 0.13, 0.28, 20, 1, true]} />
        <meshStandardMaterial color="#a8432f" roughness={0.6} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, 0.005, 0]}>
        <cylinderGeometry args={[0.13, 0.13, 0.02, 20]} />
        <meshStandardMaterial color="#7c2f21" roughness={0.7} />
      </mesh>
      <mesh ref={puddle} position={[0, 0.245, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.145, 24]} />
        <meshStandardMaterial
          color="#bfe3ff"
          roughness={0.05}
          metalness={0.35}
          transparent
          opacity={0.9}
        />
      </mesh>
      <mesh ref={ripple} position={[0, 0.25, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.05, 0.07, 24]} />
        <meshBasicMaterial color="#dff1ff" transparent opacity={0.4} depthWrite={false} />
      </mesh>
      {/* spilled puddle beside the bucket */}
      <mesh position={[0.42, 0.004, 0.3]} rotation={[-Math.PI / 2, 0, 0.5]}>
        <circleGeometry args={[0.22, 24]} />
        <meshStandardMaterial
          color="#8fc3ee"
          roughness={0.05}
          metalness={0.4}
          transparent
          opacity={0.75}
        />
      </mesh>
    </group>
  );
}

export default function Plumbing({ mats }) {
  const chrome = { color: '#d7dce2', roughness: 0.15, metalness: 1.0 };
  return (
    <group>
      {/* counter run */}
      <mesh castShadow receiveShadow position={[-3.05, 0.425, -2.375]}>
        <boxGeometry args={[2.5, 0.85, 0.65]} />
        <meshStandardMaterial map={mats.wood} roughness={0.6} />
      </mesh>
      {/* open service bay under the sink (no doors — pipes exposed) */}
      <mesh position={[-2.55, 0.425, -2.36]}>
        <boxGeometry args={[0.9, 0.78, 0.6]} />
        <meshStandardMaterial color="#171310" roughness={1} />
      </mesh>
      {/* cabinet doors flanking the bay */}
      {[-3.75, -3.35, -1.75].map((x) => (
        <mesh key={x} position={[x, 0.425, -2.04]}>
          <boxGeometry args={[0.36, 0.7, 0.03]} />
          <meshStandardMaterial color="#54341d" roughness={0.6} />
        </mesh>
      ))}
      {/* worktop */}
      <mesh castShadow receiveShadow position={[-3.05, 0.9, -2.375]}>
        <boxGeometry args={[2.6, 0.07, 0.75]} />
        <meshStandardMaterial color="#d8d2c2" roughness={0.3} />
      </mesh>
      {/* sink basin + faucet */}
      <mesh position={[-2.55, 0.9, -2.375]}>
        <boxGeometry args={[0.62, 0.1, 0.44]} />
        <meshStandardMaterial {...chrome} />
      </mesh>
      <mesh position={[-2.55, 0.86, -2.375]}>
        <boxGeometry args={[0.5, 0.06, 0.34]} />
        <meshStandardMaterial color="#6b7076" roughness={0.4} metalness={0.8} />
      </mesh>
      <mesh position={[-2.55, 1.08, -2.56]} castShadow>
        <cylinderGeometry args={[0.025, 0.03, 0.36, 12]} />
        <meshStandardMaterial {...chrome} />
      </mesh>
      <mesh position={[-2.55, 1.24, -2.46]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.24, 12]} />
        <meshStandardMaterial {...chrome} />
      </mesh>

      {/* waste + trap assembly */}
      <mesh position={[-2.55, 0.68, -2.3]}>
        <cylinderGeometry args={[0.035, 0.035, 0.3, 12]} />
        <meshStandardMaterial {...chrome} />
      </mesh>
      <mesh position={[-2.55, 0.5, -2.3]} rotation={[0, 0, 0]}>
        <torusGeometry args={[0.09, 0.032, 12, 20, Math.PI]} />
        <meshStandardMaterial {...chrome} />
      </mesh>
      <mesh position={[-2.55, 0.5, -2.48]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.032, 0.032, 0.35, 12]} />
        <meshStandardMaterial {...chrome} />
      </mesh>
      {/* leaking joint collar */}
      <mesh position={[-2.55, 0.44, -2.3]}>
        <cylinderGeometry args={[0.045, 0.045, 0.05, 12]} />
        <meshStandardMaterial color="#8a2f23" roughness={0.5} metalness={0.4} />
      </mesh>

      <Drips />

      {/* upper cabinet + under-light */}
      <mesh castShadow position={[-3.05, 2.35, -2.6]}>
        <boxGeometry args={[2.5, 0.75, 0.4]} />
        <meshStandardMaterial map={mats.wood} roughness={0.6} />
      </mesh>
      <mesh position={[-3.05, 1.96, -2.6]}>
        <boxGeometry args={[2.3, 0.03, 0.3]} />
        <meshBasicMaterial color="#ffd9a0" />
      </mesh>

      {/* wrench left on the worktop */}
      <group position={[-1.95, 0.95, -2.3]} rotation={[0, 0.4, 0]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.3, 10]} />
          <meshStandardMaterial {...chrome} />
        </mesh>
        <mesh position={[0, 0, 0.17]}>
          <torusGeometry args={[0.045, 0.016, 10, 16, Math.PI * 1.5]} />
          <meshStandardMaterial {...chrome} />
        </mesh>
      </group>
    </group>
  );
}
