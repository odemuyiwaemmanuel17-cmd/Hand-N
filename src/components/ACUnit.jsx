import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

// Wall-mounted split AC with a weak, faulty airflow: slow air streaks and a
// blinking amber warning LED.
function Airflow() {
  const streaks = useRef([]);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    streaks.current.forEach((m, i) => {
      if (!m) return;
      const c = (t * 0.35 + i / 4) % 1; // slow — it's faulty
      m.position.y = 2.1 - c * 1.1;
      m.material.opacity = (1 - c) * 0.28;
      m.scale.set(1, 0.6 + c * 0.8, 1);
    });
  });

  return (
    <group position={[1.85, 0, -2.45]}>
      {[0, 1, 2, 3].map((i) => (
        <mesh
          key={i}
          ref={(m) => (streaks.current[i] = m)}
          position={[-0.33 + i * 0.22, 2.0, 0.1 + (i % 2) * 0.08]}
        >
          <planeGeometry args={[0.1, 0.5]} />
          <meshBasicMaterial color="#aed6ff" transparent opacity={0.2} depthWrite={false} />
        </mesh>
      ))}
    </group>
  );
}

function WarningLED() {
  const led = useRef();
  useFrame(({ clock }) => {
    if (led.current) {
      led.current.material.emissiveIntensity = (Math.sin(clock.elapsedTime * 4) > 0 ? 2.4 : 0.25);
    }
  });
  return (
    <mesh ref={led} position={[2.28, 2.28, -2.55]}>
      <sphereGeometry args={[0.022, 10, 10]} />
      <meshStandardMaterial color="#3a1c00" emissive="#ff9a2e" emissiveIntensity={2} />
    </mesh>
  );
}

export default function ACUnit() {
  return (
    <group>
      {/* indoor unit */}
      <mesh castShadow position={[1.85, 2.38, -2.68]}>
        <boxGeometry args={[1.15, 0.34, 0.26]} />
        <meshStandardMaterial color="#eceae4" roughness={0.35} />
      </mesh>
      {/* louvre vent */}
      <mesh position={[1.85, 2.26, -2.55]} rotation={[0.5, 0, 0]}>
        <boxGeometry args={[0.95, 0.03, 0.12]} />
        <meshStandardMaterial color="#c9c6bc" roughness={0.5} />
      </mesh>
      {/* intake grille lines */}
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[1.85, 2.5 - i * 0.045, -2.545]}>
          <boxGeometry args={[0.95, 0.012, 0.01]} />
          <meshStandardMaterial color="#b9b6ac" roughness={0.6} />
        </mesh>
      ))}
      {/* display */}
      <mesh position={[1.45, 2.38, -2.545]}>
        <planeGeometry args={[0.16, 0.07]} />
        <meshBasicMaterial color="#9fd8ff" />
      </mesh>
      <WarningLED />
      {/* condensate pipe down the wall */}
      <mesh position={[2.5, 1.4, -2.78]}>
        <cylinderGeometry args={[0.025, 0.025, 2.1, 10]} />
        <meshStandardMaterial color="#cfc9ba" roughness={0.7} />
      </mesh>
      {/* water stain patch under the unit — it's leaking too */}
      <mesh position={[1.7, 1.55, -2.845]} rotation={[0, 0, 0.2]}>
        <circleGeometry args={[0.16, 20]} />
        <meshStandardMaterial color="#8a7a5c" roughness={1} transparent opacity={0.55} />
      </mesh>

      <Airflow />
    </group>
  );
}
