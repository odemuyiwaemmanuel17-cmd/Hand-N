import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

// Realistic-proportioned Nigerian artisan built from smooth lathed forms
// (capsules/spheres — no blocky parts), with tools and a subtle idle motion.
export default function Artisan({ position = [0.9, 0, 0] }) {
  const root = useRef();
  const torso = useRef();
  const head = useRef();
  const armR = useRef();

  const skin = { color: '#6b4226', roughness: 0.55 };
  const shirt = { color: '#1e4d3b', roughness: 0.85 };
  const trousers = { color: '#232a35', roughness: 0.9 };
  const steel = { color: '#d7dce2', roughness: 0.2, metalness: 1.0 };

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (root.current) root.current.position.y = Math.sin(t * 1.6) * 0.012;
    if (torso.current) torso.current.rotation.y = Math.sin(t * 0.5) * 0.05;
    if (head.current) head.current.rotation.y = Math.sin(t * 0.4 + 1) * 0.22;
    if (armR.current) armR.current.rotation.x = -0.5 + Math.sin(t * 1.6) * 0.05;
  });

  return (
    <group position={position} rotation={[0, -0.35, 0]}>
      <group ref={root}>
        {/* boots */}
        {[-0.11, 0.11].map((x) => (
          <group key={x} position={[x, 0, 0]}>
            <mesh position={[0, 0.07, 0.05]} rotation={[Math.PI / 2, 0, 0]} castShadow>
              <capsuleGeometry args={[0.075, 0.14, 6, 12]} />
              <meshStandardMaterial color="#2e2018" roughness={0.7} />
            </mesh>
          </group>
        ))}
        {/* legs */}
        {[-0.11, 0.11].map((x) => (
          <mesh key={x} position={[x, 0.45, 0]} castShadow>
            <capsuleGeometry args={[0.085, 0.5, 6, 14]} />
            <meshStandardMaterial {...trousers} />
          </mesh>
        ))}
        {/* torso */}
        <group ref={torso}>
          <mesh position={[0, 1.08, 0]} castShadow>
            <capsuleGeometry args={[0.165, 0.42, 8, 18]} />
            <meshStandardMaterial {...shirt} />
          </mesh>
          {/* reflective band */}
          <mesh position={[0, 1.02, 0]}>
            <cylinderGeometry args={[0.172, 0.172, 0.06, 20]} />
            <meshStandardMaterial color="#c99a4b" emissive="#c99a4b" emissiveIntensity={0.35} roughness={0.5} />
          </mesh>
          {/* left arm relaxed */}
          <mesh position={[-0.24, 1.02, 0]} rotation={[0, 0, 0.18]} castShadow>
            <capsuleGeometry args={[0.055, 0.42, 6, 12]} />
            <meshStandardMaterial {...shirt} />
          </mesh>
          <mesh position={[-0.28, 0.72, 0.01]}>
            <sphereGeometry args={[0.055, 12, 10]} />
            <meshStandardMaterial {...skin} />
          </mesh>
          {/* right arm holding wrench forward */}
          <group ref={armR} position={[0.24, 1.28, 0]}>
            <mesh position={[0, -0.2, 0.08]} rotation={[-0.5, 0, -0.15]} castShadow>
              <capsuleGeometry args={[0.055, 0.36, 6, 12]} />
              <meshStandardMaterial {...shirt} />
            </mesh>
            <mesh position={[0.03, -0.38, 0.22]}>
              <sphereGeometry args={[0.058, 12, 10]} />
              <meshStandardMaterial {...skin} />
            </mesh>
            {/* wrench */}
            <group position={[0.03, -0.42, 0.3]} rotation={[0.9, 0, 0.2]}>
              <mesh rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.018, 0.018, 0.26, 10]} />
                <meshStandardMaterial {...steel} />
              </mesh>
              <mesh position={[0, 0.15, 0]}>
                <torusGeometry args={[0.045, 0.016, 10, 18, Math.PI * 1.55]} />
                <meshStandardMaterial {...steel} />
              </mesh>
            </group>
          </group>
          {/* head */}
          <group ref={head} position={[0, 1.52, 0]}>
            <mesh castShadow>
              <sphereGeometry args={[0.125, 24, 18]} />
              <meshStandardMaterial {...skin} />
            </mesh>
            {/* cap */}
            <mesh position={[0, 0.085, -0.01]}>
              <cylinderGeometry args={[0.128, 0.132, 0.075, 20]} />
              <meshStandardMaterial color="#1d2a44" roughness={0.8} />
            </mesh>
            <mesh position={[0, 0.055, 0.14]} rotation={[-0.12, 0, 0]}>
              <cylinderGeometry args={[0.075, 0.085, 0.02, 16, 1, false, 0, Math.PI]} />
              <meshStandardMaterial color="#16213a" roughness={0.8} />
            </mesh>
          </group>
        </group>

        {/* tool belt pouch */}
        <mesh position={[-0.14, 0.82, 0.12]} rotation={[0.2, 0, 0.15]}>
          <boxGeometry args={[0.12, 0.14, 0.07]} />
          <meshStandardMaterial color="#4a2f1c" roughness={0.85} />
        </mesh>
      </group>

      {/* toolbox */}
      <group position={[0.75, 0, 0.45]} rotation={[0, 0.3, 0]}>
        <mesh castShadow receiveShadow position={[0, 0.12, 0]}>
          <boxGeometry args={[0.46, 0.22, 0.22]} />
          <meshStandardMaterial color="#a32e22" roughness={0.5} />
        </mesh>
        <mesh position={[0, 0.24, 0]}>
          <boxGeometry args={[0.4, 0.03, 0.18]} />
          <meshStandardMaterial color="#7c1f16" roughness={0.5} />
        </mesh>
        <mesh position={[0, 0.3, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.07, 0.014, 8, 16, Math.PI]} />
          <meshStandardMaterial color="#2b2925" roughness={0.5} metalness={0.5} />
        </mesh>
        {/* cordless drill leaning on the box */}
        <group position={[-0.3, 0.1, 0.05]} rotation={[0, 0, -0.5]}>
          <mesh>
            <cylinderGeometry args={[0.035, 0.035, 0.22, 12]} />
            <meshStandardMaterial color="#1f5fa8" roughness={0.5} />
          </mesh>
          <mesh position={[0, -0.1, 0.06]} rotation={[0.4, 0, 0]}>
            <boxGeometry args={[0.06, 0.14, 0.06]} />
            <meshStandardMaterial color="#22252a" roughness={0.6} />
          </mesh>
        </group>
      </group>

      {/* duffel tool bag */}
      <group position={[-0.7, 0, 0.35]} rotation={[0, -0.5, 0]}>
        <mesh castShadow receiveShadow position={[0, 0.14, 0]} rotation={[0, 0, Math.PI / 2]}>
          <capsuleGeometry args={[0.14, 0.4, 8, 14]} />
          <meshStandardMaterial color="#33302b" roughness={0.9} />
        </mesh>
        <mesh position={[0, 0.26, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.1, 0.016, 8, 16, Math.PI]} />
          <meshStandardMaterial color="#171512" roughness={0.8} />
        </mesh>
      </group>
    </group>
  );
}
