import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

// Open distribution board with breaker rows, live LED indicators and
// surface conduits running to the ceiling.
function PanelLEDs() {
  const leds = useRef([]);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    leds.current.forEach((m, i) => {
      if (!m) return;
      if (i === 2) {
        // fault channel — red blink
        m.material.emissiveIntensity = Math.sin(t * 6) > 0 ? 3 : 0.2;
      } else {
        m.material.emissiveIntensity = 1.6 + Math.sin(t * 2 + i * 2) * 0.5;
      }
    });
  });
  return (
    <group>
      {[
        { x: -0.16, c: '#22ff88' },
        { x: -0.06, c: '#22ff88' },
        { x: 0.04, c: '#ff3344' },
      ].map((l, i) => (
        <mesh key={i} ref={(m) => (leds.current[i] = m)} position={[-1.25 + l.x + 0.06, 1.78, -2.56]}>
          <sphereGeometry args={[0.02, 10, 10]} />
          <meshStandardMaterial color="#111111" emissive={l.c} emissiveIntensity={1.6} />
        </mesh>
      ))}
    </group>
  );
}

export default function ElectricalPanel() {
  const steel = { color: '#8f979e', roughness: 0.35, metalness: 0.7 };
  return (
    <group>
      {/* enclosure */}
      <mesh castShadow position={[-1.25, 1.6, -2.68]}>
        <boxGeometry args={[0.62, 0.85, 0.2]} />
        <meshStandardMaterial {...steel} />
      </mesh>
      {/* interior backplate */}
      <mesh position={[-1.25, 1.6, -2.6]}>
        <boxGeometry args={[0.54, 0.77, 0.02]} />
        <meshStandardMaterial color="#2b2e33" roughness={0.7} />
      </mesh>
      {/* open door */}
      <group position={[-0.94, 1.6, -2.58]} rotation={[0, -0.9, 0]}>
        <mesh position={[0.28, 0, 0]} castShadow>
          <boxGeometry args={[0.56, 0.85, 0.04]} />
          <meshStandardMaterial {...steel} />
        </mesh>
        <mesh position={[0.28, 0, 0.025]}>
          <planeGeometry args={[0.4, 0.5]} />
          <meshStandardMaterial color="#c9a13a" roughness={0.6} />
        </mesh>
      </group>
      {/* breaker rows */}
      {[1.72, 1.52].map((y, r) => (
        <group key={r} position={[-1.25, y, -2.57]}>
          <mesh>
            <boxGeometry args={[0.46, 0.05, 0.04]} />
            <meshStandardMaterial color="#15171a" roughness={0.6} />
          </mesh>
          {Array.from({ length: 6 }).map((_, i) => (
            <mesh key={i} position={[-0.19 + i * 0.076, 0.055, 0]}>
              <boxGeometry args={[0.06, 0.1, 0.07]} />
              <meshStandardMaterial
                color={r === 1 && i === 3 ? '#8a2f23' : '#1d2126'}
                roughness={0.5}
              />
            </mesh>
          ))}
          {/* tripped breaker toggle */}
          {r === 1 && (
            <mesh position={[0.038, 0.03, 0.045]} rotation={[0.5, 0, 0]}>
              <boxGeometry args={[0.03, 0.06, 0.02]} />
              <meshStandardMaterial color="#e9b558" roughness={0.5} />
            </mesh>
          )}
        </group>
      ))}
      <PanelLEDs />
      {/* meter + isolator beside */}
      <mesh castShadow position={[-0.55, 1.62, -2.7]}>
        <boxGeometry args={[0.34, 0.5, 0.16]} />
        <meshStandardMaterial color="#d8d4c8" roughness={0.5} />
      </mesh>
      <mesh position={[-0.55, 1.66, -2.61]}>
        <planeGeometry args={[0.2, 0.1]} />
        <meshBasicMaterial color="#bfe3ff" />
      </mesh>
      {/* conduits to ceiling */}
      {[[-1.4, 0.03], [-1.1, 0.03], [-0.55, 0.025]].map(([x, r], i) => (
        <mesh key={i} position={[x, 2.6, -2.78]}>
          <cylinderGeometry args={[r, r, 1.6, 10]} />
          <meshStandardMaterial color="#b9b3a4" roughness={0.6} />
        </mesh>
      ))}
      {/* cable clips */}
      {[2.2, 2.7].map((y) => (
        <mesh key={y} position={[-1.25, y, -2.78]}>
          <boxGeometry args={[0.5, 0.04, 0.06]} />
          <meshStandardMaterial color="#6b675f" roughness={0.7} />
        </mesh>
      ))}
    </group>
  );
}
