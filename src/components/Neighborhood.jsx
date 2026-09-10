import { useMemo } from 'react';

// Connected Nigerian neighbourhood for the final reveal: surrounding homes
// with lit windows, street lamps, roads and greenery around the hero home.
const PALETTE = ['#cfc3ad', '#b98d6b', '#9aa0a6', '#d8cfc0', '#8f7b63', '#c2b49a'];
const ROOFS = ['#3a3f44', '#5a3b2e', '#46484c', '#4e3a30'];

function House({ position, rotationY, w, d, h, color, roof }) {
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <mesh castShadow receiveShadow position={[0, h / 2, 0]}>
        <boxGeometry args={[w, h, d]} />
        <meshStandardMaterial color={color} roughness={0.9} />
      </mesh>
      <mesh castShadow position={[0, h + 0.55, 0]} rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[Math.max(w, d) * 0.72, 1.3, 4]} />
        <meshStandardMaterial color={roof} roughness={0.85} flatShading />
      </mesh>
      {/* lit windows */}
      {[-w / 4, w / 4].map((x, i) => (
        <mesh key={i} position={[x, h * 0.55, d / 2 + 0.01]}>
          <planeGeometry args={[w / 5, h / 3]} />
          <meshBasicMaterial color="#ffca7a" />
        </mesh>
      ))}
      <mesh position={[0, 0.6, d / 2 + 0.01]}>
        <planeGeometry args={[0.7, 1.2]} />
        <meshStandardMaterial color="#2b2620" roughness={0.9} />
      </mesh>
    </group>
  );
}

function StreetLamp({ position }) {
  return (
    <group position={position}>
      <mesh position={[0, 2, 0]}>
        <cylinderGeometry args={[0.06, 0.09, 4, 8]} />
        <meshStandardMaterial color="#23211d" roughness={0.7} />
      </mesh>
      <mesh position={[0.35, 3.95, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.04, 0.04, 0.8, 8]} />
        <meshStandardMaterial color="#23211d" roughness={0.7} />
      </mesh>
      <mesh position={[0.7, 3.85, 0]}>
        <sphereGeometry args={[0.14, 12, 10]} />
        <meshBasicMaterial color="#ffd9a0" />
      </mesh>
    </group>
  );
}

export default function Neighborhood() {
  const houses = useMemo(() => {
    // deterministic ring of homes, avoiding the hero compound footprint
    const spots = [
      [-20, -14, 0.3], [-8, -17, -0.1], [6, -16, 0.15], [19, -13, -0.4],
      [-26, -2, 0.5], [-17, 2, 0.1], [17, 3, -0.2], [27, -1, -0.5],
      [-24, 16, 0.2], [-12, 19, 0], [1, 21, 0.05], [13, 19, -0.15], [25, 16, 0.35],
      [-33, 8, 0.4], [34, 9, -0.3], [-4, -28, 0.1], [12, -28, -0.2],
    ];
    return spots.map(([x, z, r], i) => ({
      position: [x, 0, z],
      rotationY: r,
      w: 4.2 + ((i * 37) % 20) / 10,
      d: 3.8 + ((i * 53) % 16) / 10,
      h: 2.5 + ((i * 29) % 12) / 10,
      color: PALETTE[i % PALETTE.length],
      roof: ROOFS[i % ROOFS.length],
    }));
  }, []);

  return (
    <group>
      {/* earth */}
      <mesh receiveShadow position={[0, -0.18, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[110, 48]} />
        <meshStandardMaterial color="#0b0d0a" roughness={1} />
      </mesh>

      {/* roads */}
      <mesh receiveShadow position={[0, -0.1, 14]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[110, 5.5]} />
        <meshStandardMaterial color="#17181b" roughness={1} />
      </mesh>
      <mesh receiveShadow position={[16, -0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[5.5, 110]} />
        <meshStandardMaterial color="#17181b" roughness={1} />
      </mesh>
      {/* lane dashes */}
      {Array.from({ length: 18 }).map((_, i) => (
        <mesh key={i} position={[-42 + i * 5, -0.09, 14]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[1.6, 0.14]} />
          <meshBasicMaterial color="#8a8578" />
        </mesh>
      ))}

      {houses.map((h, i) => (
        <House key={i} {...h} />
      ))}

      {/* street lamps along the main road */}
      {[-14, -7, 0, 7, 14, 21].map((x) => (
        <StreetLamp key={x} position={[x, 0, 11]} />
      ))}
      <StreetLamp position={[13, 0, -6]} />
      <StreetLamp position={[13, 0, 4]} />

      {/* scattered trees */}
      {[
        [-14, -9, 1.2], [11, -8, 1], [-11, 9, 0.9], [22, 8, 1.25],
        [-28, 8, 1.1], [8, 9, 0.8], [-19, -6, 1],
      ].map(([x, z, s], i) => (
        <group key={i} position={[x, 0, z]} scale={s}>
          <mesh position={[0, 0.9, 0]}>
            <cylinderGeometry args={[0.09, 0.13, 1.8, 8]} />
            <meshStandardMaterial color="#3a2a1e" roughness={1} />
          </mesh>
          <mesh position={[0, 2.1, 0]}>
            <sphereGeometry args={[1, 10, 8]} />
            <meshStandardMaterial color="#1d3322" roughness={1} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
