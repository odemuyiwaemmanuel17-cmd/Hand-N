import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Transparent vault on a stone pedestal: stacked gold coins, naira notes
// and a padlock whose LED pulses green — payment locked until approval.
function Coins() {
  const group = useRef();
  useFrame(({ clock }, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.5;
  });
  const gold = { color: '#d9a441', roughness: 0.25, metalness: 1.0 };
  return (
    <group ref={group} position={[-0.32, 0.92, -0.95]}>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <mesh key={i} position={[(i % 2) * 0.012, i * 0.028, 0]} castShadow>
          <cylinderGeometry args={[0.085, 0.085, 0.026, 24]} />
          <meshStandardMaterial {...gold} />
        </mesh>
      ))}
      <mesh position={[0.16, 0.014, 0.05]} rotation={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.085, 0.085, 0.026, 24]} />
        <meshStandardMaterial {...gold} />
      </mesh>
      <mesh position={[0.16, 0.042, 0.05]} rotation={[0, 0.9, 0]}>
        <cylinderGeometry args={[0.085, 0.085, 0.026, 24]} />
        <meshStandardMaterial {...gold} />
      </mesh>
    </group>
  );
}

function LockLED() {
  const led = useRef();
  useFrame(({ clock }) => {
    if (led.current) {
      led.current.material.emissiveIntensity = 1.4 + Math.sin(clock.elapsedTime * 3.2) * 1.1;
    }
  });
  return (
    <mesh ref={led} position={[-0.2, 1.06, -0.62]}>
      <sphereGeometry args={[0.022, 12, 10]} />
      <meshStandardMaterial color="#06130b" emissive="#2bff88" emissiveIntensity={1.8} />
    </mesh>
  );
}

export default function EscrowVault() {
  const glassEdges = useRef();
  return (
    <group>
      {/* pedestal */}
      <mesh castShadow receiveShadow position={[-0.2, 0.4, -0.9]}>
        <cylinderGeometry args={[0.34, 0.4, 0.8, 28]} />
        <meshStandardMaterial color="#2e2b27" roughness={0.6} />
      </mesh>
      <mesh position={[-0.2, 0.82, -0.9]}>
        <cylinderGeometry args={[0.37, 0.37, 0.04, 28]} />
        <meshStandardMaterial color="#4a443c" roughness={0.4} metalness={0.3} />
      </mesh>

      {/* glass chamber */}
      <mesh position={[-0.2, 1.14, -0.9]}>
        <boxGeometry args={[0.68, 0.56, 0.5]} />
        <meshPhysicalMaterial
          color="#cfe4f5"
          roughness={0.06}
          metalness={0}
          transmission={1}
          thickness={0.25}
          ior={1.45}
          clearcoat={1}
          clearcoatRoughness={0.08}
        />
      </mesh>
      <lineSegments ref={glassEdges} position={[-0.2, 1.14, -0.9]}>
        <edgesGeometry args={[new THREE.BoxGeometry(0.68, 0.56, 0.5)]} />
        <lineBasicMaterial color="#e9b558" transparent opacity={0.7} />
      </lineSegments>

      <Coins />

      {/* naira note stacks */}
      {[0, 1, 2, 3].map((i) => (
        <mesh key={i} position={[-0.02, 0.9 + i * 0.024, -0.95]} rotation={[0, -0.12, 0]}>
          <boxGeometry args={[0.24, 0.02, 0.13]} />
          <meshStandardMaterial color={i % 2 ? '#1a7a4c' : '#23a05f'} roughness={0.8} />
        </mesh>
      ))}
      <mesh position={[-0.02, 0.925, -0.95]} rotation={[0, -0.12, 0]}>
        <boxGeometry args={[0.05, 0.09, 0.135]} />
        <meshStandardMaterial color="#e8e2d4" roughness={0.8} />
      </mesh>

      {/* padlock on the chamber face */}
      <group position={[-0.2, 1.0, -0.63]}>
        <mesh castShadow>
          <boxGeometry args={[0.13, 0.11, 0.05]} />
          <meshStandardMaterial color="#8a6a2f" roughness={0.3} metalness={0.9} />
        </mesh>
        <mesh position={[0, 0.09, 0]}>
          <torusGeometry args={[0.05, 0.014, 10, 20, Math.PI]} />
          <meshStandardMaterial color="#d7dce2" roughness={0.2} metalness={1} />
        </mesh>
        <mesh position={[0, -0.01, 0.026]}>
          <cylinderGeometry args={[0.012, 0.012, 0.02, 10]} />
          <meshStandardMaterial color="#1a1408" roughness={0.6} />
        </mesh>
      </group>
      <LockLED />

      {/* brass nameplate */}
      <mesh position={[-0.2, 0.55, -0.5]} rotation={[-0.15, 0, 0]}>
        <boxGeometry args={[0.4, 0.1, 0.02]} />
        <meshStandardMaterial color="#8a6a2f" roughness={0.3} metalness={0.9} />
      </mesh>
    </group>
  );
}
