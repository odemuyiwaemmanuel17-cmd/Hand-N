import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

// Roof array: 6 tilted panels on aluminium rails, plus the hybrid inverter
// and lithium battery cabinet on the veranda wall below.
function Panel({ position, solarMap }) {
  const side = { color: '#9aa4b2', roughness: 0.4, metalness: 0.8 };
  return (
    <group position={position} rotation={[-0.21, 0, 0]}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.9, 0.07, 1.2]} />
        {[
          <meshStandardMaterial key="0" attach="material-0" {...side} />,
          <meshStandardMaterial key="1" attach="material-1" {...side} />,
          <meshStandardMaterial
            key="2"
            attach="material-2"
            map={solarMap}
            roughness={0.22}
            metalness={0.55}
          />,
          <meshStandardMaterial key="3" attach="material-3" color="#3a3f45" roughness={0.7} />,
          <meshStandardMaterial key="4" attach="material-4" {...side} />,
          <meshStandardMaterial key="5" attach="material-5" {...side} />,
        ]}
      </mesh>
      {/* junction box */}
      <mesh position={[0.6, -0.07, 0.3]}>
        <boxGeometry args={[0.22, 0.06, 0.14]} />
        <meshStandardMaterial color="#22252a" roughness={0.7} />
      </mesh>
    </group>
  );
}

function InverterLED() {
  const led = useRef();
  useFrame(({ clock }) => {
    if (led.current) {
      led.current.material.emissiveIntensity = 1.8 + Math.sin(clock.elapsedTime * 2.4) * 0.7;
    }
  });
  return (
    <mesh ref={led} position={[4.12, 1.62, 0.8]}>
      <boxGeometry args={[0.03, 0.12, 0.05]} />
      <meshStandardMaterial color="#0b2b18" emissive="#2bff88" emissiveIntensity={1.8} />
    </mesh>
  );
}

export default function SolarRoof({ mats }) {
  const cols = [-2.6, 0, 2.6];
  const rows = [-2.25, -0.75];
  return (
    <group>
      {/* mounting rails */}
      {rows.map((z) =>
        [-0.45, 0.45].map((dz) => (
          <mesh key={`${z}-${dz}`} castShadow position={[0, 3.86, z + dz]}>
            <boxGeometry args={[8.2, 0.08, 0.08]} />
            <meshStandardMaterial color="#8b939c" roughness={0.35} metalness={0.8} />
          </mesh>
        ))
      )}
      {/* rail legs */}
      {rows.map((z) =>
        cols.map((x) =>
          [-0.45, 0.45].map((dz) => (
            <mesh key={`${x}-${z}-${dz}`} position={[x, 3.78, z + dz]}>
              <boxGeometry args={[0.08, 0.14, 0.08]} />
              <meshStandardMaterial color="#6d757e" roughness={0.5} metalness={0.7} />
            </mesh>
          ))
        )
      )}
      {/* panels */}
      {rows.map((z) =>
        cols.map((x) => (
          <Panel key={`${x}-${z}`} position={[x, 4.02, z]} solarMap={mats.solar} />
        ))
      )}
      {/* DC isolator box on roof */}
      <mesh castShadow position={[3.9, 3.9, -2.9]}>
        <boxGeometry args={[0.4, 0.3, 0.24]} />
        <meshStandardMaterial color="#c9c6bc" roughness={0.6} />
      </mesh>

      {/* hybrid inverter on veranda wall */}
      <mesh castShadow position={[4.2, 1.5, 0.8]}>
        <boxGeometry args={[0.24, 0.72, 0.52]} />
        <meshStandardMaterial color="#e8e6e0" roughness={0.4} />
      </mesh>
      <mesh position={[4.07, 1.5, 0.8]}>
        <planeGeometry args={[0.34, 0.2]} />
        <meshBasicMaterial color="#0e2c58" />
      </mesh>
      <InverterLED />
      {/* lithium battery cabinet below */}
      <mesh castShadow receiveShadow position={[4.05, 0.45, 1.65]}>
        <boxGeometry args={[0.5, 0.9, 0.42]} />
        <meshStandardMaterial color="#dcd8cc" roughness={0.5} />
      </mesh>
      <mesh position={[3.79, 0.45, 1.65]}>
        <boxGeometry args={[0.02, 0.7, 0.06]} />
        <meshStandardMaterial color="#0b2b18" emissive="#2bff88" emissiveIntensity={1.2} />
      </mesh>
      {/* conduit linking inverter to roof */}
      <mesh position={[4.3, 2.6, 0.8]}>
        <cylinderGeometry args={[0.03, 0.03, 1.6, 10]} />
        <meshStandardMaterial color="#b9b3a4" roughness={0.6} />
      </mesh>
    </group>
  );
}
