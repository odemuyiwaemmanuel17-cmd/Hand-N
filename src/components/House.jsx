import { useMemo } from 'react';
import * as THREE from 'three';
import {
  tileTexture,
  plasterTexture,
  concreteTexture,
  compoundTexture,
  woodTexture,
  tvScreenTexture,
  solarTexture,
} from '../utils/textures.js';

// ---------------------------------------------------------------------------
// Modern Nigerian bungalow — dollhouse cutaway (open veranda front) with a
// warm, furnished interior and full compound: fence, gate, driveway, trees.
// ---------------------------------------------------------------------------

export function useHouseMats() {
  return useMemo(
    () => ({
      tile: tileTexture(),
      plaster: plasterTexture(),
      concrete: concreteTexture(),
      compound: compoundTexture(),
      wood: woodTexture(),
      tv: tvScreenTexture(),
      solar: solarTexture(),
    }),
    []
  );
}

function Window({ position, rotationY = 0, width = 1.4, height = 1.1 }) {
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <mesh castShadow>
        <boxGeometry args={[width + 0.16, height + 0.16, 0.1]} />
        <meshStandardMaterial color="#2e2a25" roughness={0.7} />
      </mesh>
      <mesh position={[0, 0, 0.02]}>
        <boxGeometry args={[width, height, 0.12]} />
        <meshStandardMaterial
          color="#141a26"
          roughness={0.12}
          metalness={0.65}
          emissive="#ffca7a"
          emissiveIntensity={0.12}
        />
      </mesh>
      <mesh position={[0, 0, 0.09]}>
        <boxGeometry args={[0.05, height, 0.02]} />
        <meshStandardMaterial color="#3a352f" roughness={0.6} />
      </mesh>
      <mesh position={[0, 0, 0.09]}>
        <boxGeometry args={[width, 0.05, 0.02]} />
        <meshStandardMaterial color="#3a352f" roughness={0.6} />
      </mesh>
    </group>
  );
}

function Pendant({ position, shade = '#1f1d1a' }) {
  return (
    <group position={position}>
      <mesh>
        <cylinderGeometry args={[0.012, 0.012, 1.1, 8]} />
        <meshStandardMaterial color="#111111" roughness={0.8} />
      </mesh>
      <mesh position={[0, -0.62, 0]} castShadow>
        <coneGeometry args={[0.22, 0.24, 24, 1, true]} />
        <meshStandardMaterial color={shade} roughness={0.5} metalness={0.3} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, -0.72, 0]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshBasicMaterial color="#ffdca8" />
      </mesh>
    </group>
  );
}

function Tree({ position, s = 1 }) {
  return (
    <group position={position} scale={s}>
      <mesh position={[0, 0.9, 0]} castShadow>
        <cylinderGeometry args={[0.09, 0.13, 1.8, 10]} />
        <meshStandardMaterial color="#4a3524" roughness={1} />
      </mesh>
      {[
        [0, 2.1, 0, 0.95],
        [0.55, 1.75, 0.2, 0.6],
        [-0.5, 1.85, -0.15, 0.65],
      ].map(([x, y, z, r], i) => (
        <mesh key={i} position={[x, y, z]} castShadow>
          <sphereGeometry args={[r, 14, 12]} />
          <meshStandardMaterial color={i === 0 ? '#24402a' : '#1c3523'} roughness={1} />
        </mesh>
      ))}
    </group>
  );
}

export function Compound({ mats }) {
  const fenceMat = { color: '#cfc0a4', roughness: 0.9 };
  return (
    <group>
      {/* compound slab */}
      <mesh receiveShadow position={[0, -0.085, 1]}>
        <boxGeometry args={[19, 0.15, 16]} />
        <meshStandardMaterial map={mats.compound} roughness={0.95} />
      </mesh>
      {/* driveway */}
      <mesh receiveShadow position={[0, 0.005, 5.4]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3.4, 5.6]} />
        <meshStandardMaterial color="#33302b" roughness={0.95} />
      </mesh>

      {/* fence: back + sides + front with gate opening */}
      <mesh castShadow receiveShadow position={[0, 0.75, -6.5]}>
        <boxGeometry args={[17.4, 1.5, 0.22]} />
        <meshStandardMaterial {...fenceMat} />
      </mesh>
      {[-8.6, 8.6].map((x) => (
        <mesh key={x} castShadow receiveShadow position={[x, 0.75, 1]}>
          <boxGeometry args={[0.22, 1.5, 15.2]} />
          <meshStandardMaterial {...fenceMat} />
        </mesh>
      ))}
      {[[-5.2, 6.6], [5.2, 6.6]].map(([x, w], i) => (
        <mesh key={i} castShadow receiveShadow position={[x, 0.75, 8.4]}>
          <boxGeometry args={[w, 1.5, 0.22]} />
          <meshStandardMaterial {...fenceMat} />
        </mesh>
      ))}
      {/* fence coping */}
      <mesh position={[0, 1.55, -6.5]}>
        <boxGeometry args={[17.4, 0.08, 0.3]} />
        <meshStandardMaterial color="#8a7a5e" roughness={0.8} />
      </mesh>

      {/* gate pillars with lamps */}
      {[-1.9, 1.9].map((x) => (
        <group key={x} position={[x, 0, 8.4]}>
          <mesh castShadow position={[0, 1.0, 0]}>
            <boxGeometry args={[0.5, 2.0, 0.5]} />
            <meshStandardMaterial color="#b8a888" roughness={0.85} />
          </mesh>
          <mesh position={[0, 2.08, 0]}>
            <boxGeometry args={[0.62, 0.12, 0.62]} />
            <meshStandardMaterial color="#3a352f" roughness={0.7} />
          </mesh>
          <mesh position={[0, 2.3, 0]}>
            <sphereGeometry args={[0.11, 14, 12]} />
            <meshBasicMaterial color="#ffd9a0" />
          </mesh>
        </group>
      ))}
      {/* metal gate (closed) */}
      <group position={[0, 0, 8.4]}>
        {[ -1.55, 1.55 ].map((x) => (
          <mesh key={x} position={[x, 0.8, 0]}>
            <boxGeometry args={[0.08, 1.6, 0.08]} />
            <meshStandardMaterial color="#26241f" roughness={0.5} metalness={0.6} />
          </mesh>
        ))}
        {Array.from({ length: 11 }).map((_, i) => (
          <mesh key={i} position={[-1.35 + i * 0.27, 0.8, 0]}>
            <cylinderGeometry args={[0.025, 0.025, 1.6, 8]} />
            <meshStandardMaterial color="#35322c" roughness={0.45} metalness={0.65} />
          </mesh>
        ))}
        {[0.45, 1.15].map((y) => (
          <mesh key={y} position={[0, y, 0]}>
            <boxGeometry args={[3.2, 0.07, 0.06]} />
            <meshStandardMaterial color="#26241f" roughness={0.5} metalness={0.6} />
          </mesh>
        ))}
      </group>

      {/* corner pillars */}
      {[[-8.6, -6.5], [8.6, -6.5], [-8.6, 8.4], [8.6, 8.4]].map(([x, z], i) => (
        <mesh key={i} castShadow position={[x, 0.9, z]}>
          <boxGeometry args={[0.45, 1.8, 0.45]} />
          <meshStandardMaterial color="#b8a888" roughness={0.85} />
        </mesh>
      ))}

      {/* trees */}
      <Tree position={[-6.4, 0, 4.6]} s={1.15} />
      <Tree position={[6.7, 0, -3.2]} s={1.3} />
      <Tree position={[-6.8, 0, -4.4]} s={0.9} />

      {/* generator hut — a nod to every Nigerian compound */}
      <group position={[-6.4, 0, -1.6]}>
        <mesh castShadow receiveShadow position={[0, 0.5, 0]}>
          <boxGeometry args={[1.3, 1.0, 1.0]} />
          <meshStandardMaterial color="#5c5a54" roughness={0.8} />
        </mesh>
        <mesh castShadow position={[0, 1.08, 0]}>
          <boxGeometry args={[1.5, 0.12, 1.2]} />
          <meshStandardMaterial color="#33312d" roughness={0.8} />
        </mesh>
        <mesh position={[0.2, 0.55, 0.51]}>
          <boxGeometry args={[0.7, 0.4, 0.03]} />
          <meshStandardMaterial color="#26241f" roughness={0.7} />
        </mesh>
        <mesh position={[-0.4, 1.35, -0.2]}>
          <cylinderGeometry args={[0.05, 0.05, 0.6, 10]} />
          <meshStandardMaterial color="#2b2925" roughness={0.6} metalness={0.4} />
        </mesh>
      </group>

      {/* parked car */}
      <group position={[-3.1, 0, 5.4]} rotation={[0, 0.07, 0]}>
        <mesh castShadow receiveShadow position={[0, 0.55, 0]}>
          <boxGeometry args={[1.7, 0.55, 3.6]} />
          <meshStandardMaterial color="#5d6a76" roughness={0.35} metalness={0.6} />
        </mesh>
        <mesh castShadow position={[0, 1.08, -0.2]}>
          <boxGeometry args={[1.5, 0.5, 1.9]} />
          <meshStandardMaterial color="#14181f" roughness={0.15} metalness={0.7} />
        </mesh>
        {[
          [-0.85, 1.15], [0.85, 1.15], [-0.85, -1.15], [0.85, -1.15],
        ].map(([x, z], i) => (
          <mesh key={i} position={[x, 0.32, z]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.32, 0.32, 0.24, 18]} />
            <meshStandardMaterial color="#17181a" roughness={0.9} />
          </mesh>
        ))}
        <mesh position={[0, 0.62, 1.82]}>
          <boxGeometry args={[1.5, 0.14, 0.04]} />
          <meshBasicMaterial color="#ffe9bd" />
        </mesh>
      </group>

      {/* compound lamp */}
      <group position={[4.6, 0, 6.6]}>
        <mesh castShadow position={[0, 1.5, 0]}>
          <cylinderGeometry args={[0.05, 0.07, 3.0, 10]} />
          <meshStandardMaterial color="#2b2925" roughness={0.6} metalness={0.4} />
        </mesh>
        <mesh position={[0, 3.1, 0]}>
          <sphereGeometry args={[0.14, 14, 12]} />
          <meshBasicMaterial color="#ffd9a0" />
        </mesh>
      </group>
    </group>
  );
}

export default function House({ mats }) {
  const wallMat = { map: mats.plaster, roughness: 0.92 };
  return (
    <group>
      {/* floor slab — tiled top, concrete sides */}
      <mesh receiveShadow castShadow position={[0, -0.125, -0.15]}>
        <boxGeometry args={[9.5, 0.25, 6.1]} />
        {[
          <meshStandardMaterial key="0" map={mats.concrete} roughness={0.9} />,
          <meshStandardMaterial key="1" map={mats.concrete} roughness={0.9} />,
          <meshStandardMaterial key="2" map={mats.tile} roughness={0.35} />,
          <meshStandardMaterial key="3" map={mats.concrete} roughness={0.9} />,
          <meshStandardMaterial key="4" map={mats.concrete} roughness={0.9} />,
          <meshStandardMaterial key="5" map={mats.concrete} roughness={0.9} />,
        ]}
      </mesh>

      {/* walls */}
      <mesh castShadow receiveShadow position={[0, 1.7, -2.975]}>
        <boxGeometry args={[9.5, 3.4, 0.25]} />
        <meshStandardMaterial {...wallMat} />
      </mesh>
      <mesh castShadow receiveShadow position={[-4.625, 1.7, -0.15]}>
        <boxGeometry args={[0.25, 3.4, 6.1]} />
        <meshStandardMaterial {...wallMat} />
      </mesh>
      <mesh castShadow receiveShadow position={[4.625, 1.7, -0.15]}>
        <boxGeometry args={[0.25, 3.4, 6.1]} />
        <meshStandardMaterial {...wallMat} />
      </mesh>

      {/* exterior base band */}
      <mesh position={[0, 0.17, -0.15]}>
        <boxGeometry args={[9.66, 0.34, 6.26]} />
        <meshStandardMaterial color="#4a3a2c" roughness={0.9} />
      </mesh>

      {/* veranda columns + beam (open centre for the camera flight path) */}
      {[-4.4, -1.5, 1.5, 4.4].map((x) => (
        <mesh key={x} castShadow receiveShadow position={[x, 1.7, 2.9]}>
          <cylinderGeometry args={[0.12, 0.14, 3.4, 14]} />
          <meshStandardMaterial color="#ded2b8" roughness={0.8} />
        </mesh>
      ))}
      <mesh castShadow position={[0, 3.32, 2.9]}>
        <boxGeometry args={[9.5, 0.16, 0.28]} />
        <meshStandardMaterial color="#cfc0a4" roughness={0.8} />
      </mesh>
      {/* pergola stubs (kept clear of the flight corridor) */}
      {[-3, 3].map((x) => (
        <mesh key={x} castShadow position={[x, 3.3, 2.1]}>
          <boxGeometry args={[0.14, 0.12, 1.7]} />
          <meshStandardMaterial color="#8a6f4d" roughness={0.8} />
        </mesh>
      ))}
      {/* veranda railing — side bays only, centre open */}
      {[-2.95, 2.95].map((x) => (
        <group key={x} position={[x, 0, 2.9]}>
          <mesh castShadow receiveShadow position={[0, 0.42, 0]}>
            <boxGeometry args={[2.8, 0.84, 0.14]} />
            <meshStandardMaterial {...wallMat} />
          </mesh>
          <mesh position={[0, 0.88, 0]}>
            <boxGeometry args={[2.9, 0.07, 0.2]} />
            <meshStandardMaterial color="#8a7a5e" roughness={0.7} />
          </mesh>
        </group>
      ))}

      {/* roof slab — concrete top, plaster soffit */}
      <mesh castShadow receiveShadow position={[0, 3.55, -1.0]}>
        <boxGeometry args={[9.9, 0.3, 4.9]} />
        {[
          <meshStandardMaterial key="0" attach="material-0" color="#6b675f" roughness={0.85} />,
          <meshStandardMaterial key="1" attach="material-1" color="#6b675f" roughness={0.85} />,
          <meshStandardMaterial key="2" attach="material-2" map={mats.concrete} roughness={0.95} />,
          <meshStandardMaterial key="3" attach="material-3" {...wallMat} />,
          <meshStandardMaterial key="4" attach="material-4" color="#6b675f" roughness={0.85} />,
          <meshStandardMaterial key="5" attach="material-5" color="#6b675f" roughness={0.85} />,
        ]}
      </mesh>
      {/* parapet */}
      <mesh castShadow position={[0, 3.95, -3.32]}>
        <boxGeometry args={[9.9, 0.5, 0.18]} />
        <meshStandardMaterial {...wallMat} />
      </mesh>
      {[-4.86, 4.86].map((x) => (
        <mesh key={x} castShadow position={[x, 3.95, -1.0]}>
          <boxGeometry args={[0.18, 0.5, 4.9]} />
          <meshStandardMaterial {...wallMat} />
        </mesh>
      ))}

      {/* windows on side walls */}
      <Window position={[-4.48, 1.9, 0.9]} rotationY={Math.PI / 2} />
      <Window position={[4.48, 1.9, -0.6]} rotationY={-Math.PI / 2} width={1.1} />

      {/* porch light fixture + column lanterns */}
      <mesh position={[2.2, 3.18, 2.9]}>
        <boxGeometry args={[0.3, 0.1, 0.18]} />
        <meshStandardMaterial color="#2b2925" roughness={0.6} />
      </mesh>
      <mesh position={[2.2, 3.11, 2.9]}>
        <boxGeometry args={[0.24, 0.04, 0.13]} />
        <meshBasicMaterial color="#ffd9a0" />
      </mesh>
      {[-4.4, 4.4].map((x) => (
        <mesh key={x} position={[x, 2.4, 3.04]}>
          <boxGeometry args={[0.12, 0.2, 0.06]} />
          <meshBasicMaterial color="#ffd9a0" />
        </mesh>
      ))}

      {/* ------- living area ------- */}
      {/* rug */}
      <mesh receiveShadow position={[2.5, 0.012, 0.35]} rotation={[-Math.PI / 2, 0, 0.4]}>
        <circleGeometry args={[1.25, 40]} />
        <meshStandardMaterial color="#7c4438" roughness={1} />
      </mesh>
      <mesh receiveShadow position={[2.5, 0.016, 0.35]} rotation={[-Math.PI / 2, 0, 0.4]}>
        <circleGeometry args={[0.9, 40]} />
        <meshStandardMaterial color="#8f5a48" roughness={1} />
      </mesh>

      {/* sofa along right wall */}
      <group position={[3.75, 0, 0.25]}>
        <mesh castShadow receiveShadow position={[0, 0.3, 0]}>
          <boxGeometry args={[0.85, 0.42, 2.0]} />
          <meshStandardMaterial color="#6f6a63" roughness={1} />
        </mesh>
        <mesh castShadow position={[0.32, 0.68, 0]}>
          <boxGeometry args={[0.24, 0.62, 2.0]} />
          <meshStandardMaterial color="#66615a" roughness={1} />
        </mesh>
        {[-0.62, 0.62].map((z) => (
          <mesh key={z} castShadow position={[0.05, 0.62, z]}>
            <boxGeometry args={[0.7, 0.18, 0.55]} />
            <meshStandardMaterial color="#7d7871" roughness={1} />
          </mesh>
        ))}
        {[-0.95, 0.95].map((z) => (
          <mesh key={z} castShadow position={[0, 0.52, z]}>
            <boxGeometry args={[0.85, 0.5, 0.14]} />
            <meshStandardMaterial color="#66615a" roughness={1} />
          </mesh>
        ))}
        {/* throw pillows */}
        {[[-0.5, '#a8432f'], [0.35, '#c99a4b']].map(([z, c], i) => (
          <mesh key={i} position={[0.18, 0.72, z]} rotation={[0, 0, -0.25]}>
            <boxGeometry args={[0.12, 0.34, 0.34]} />
            <meshStandardMaterial color={c} roughness={1} />
          </mesh>
        ))}
      </group>

      {/* coffee table */}
      <group position={[2.5, 0, 0.3]}>
        <mesh castShadow position={[0, 0.4, 0]}>
          <cylinderGeometry args={[0.48, 0.48, 0.05, 24]} />
          <meshStandardMaterial map={mats.wood} roughness={0.5} />
        </mesh>
        <mesh position={[0, 0.2, 0]}>
          <cylinderGeometry args={[0.05, 0.08, 0.38, 12]} />
          <meshStandardMaterial color="#2b2925" roughness={0.6} metalness={0.3} />
        </mesh>
        {/* book + cup props */}
        <mesh position={[-0.15, 0.45, 0.1]} rotation={[0, 0.5, 0]}>
          <boxGeometry args={[0.26, 0.04, 0.2]} />
          <meshStandardMaterial color="#27435f" roughness={0.7} />
        </mesh>
        <mesh position={[0.18, 0.48, -0.12]}>
          <cylinderGeometry args={[0.045, 0.04, 0.09, 14]} />
          <meshStandardMaterial color="#e8e2d4" roughness={0.4} />
        </mesh>
      </group>

      {/* TV + console on back wall */}
      <group position={[3.3, 0, -2.72]}>
        <mesh castShadow position={[0, 1.5, 0]}>
          <boxGeometry args={[1.15, 0.68, 0.07]} />
          <meshStandardMaterial color="#101114" roughness={0.4} />
        </mesh>
        <mesh position={[0, 1.5, 0.045]}>
          <planeGeometry args={[1.05, 0.58]} />
          <meshBasicMaterial map={mats.tv} />
        </mesh>
        <mesh castShadow receiveShadow position={[0, 0.32, 0.22]}>
          <boxGeometry args={[1.4, 0.42, 0.4]} />
          <meshStandardMaterial map={mats.wood} roughness={0.6} />
        </mesh>
      </group>

      {/* pendants */}
      <Pendant position={[-2.8, 2.85, -1.4]} />
      <Pendant position={[2.6, 2.85, 0.4]} />

      {/* plant */}
      <group position={[4.0, 0, 2.15]}>
        <mesh castShadow position={[0, 0.2, 0]}>
          <cylinderGeometry args={[0.16, 0.13, 0.4, 14]} />
          <meshStandardMaterial color="#9a5f3c" roughness={0.9} />
        </mesh>
        <mesh castShadow position={[0, 0.75, 0]}>
          <sphereGeometry args={[0.34, 12, 10]} />
          <meshStandardMaterial color="#2a4a2e" roughness={1} />
        </mesh>
        <mesh castShadow position={[0.15, 0.55, 0.1]}>
          <sphereGeometry args={[0.22, 12, 10]} />
          <meshStandardMaterial color="#24402a" roughness={1} />
        </mesh>
      </group>

      {/* framed art on left wall */}
      <group position={[-4.47, 1.75, 0.6]} rotation={[0, Math.PI / 2, 0]}>
        <mesh>
          <boxGeometry args={[0.9, 1.1, 0.05]} />
          <meshStandardMaterial color="#3a2c1c" roughness={0.6} />
        </mesh>
        <mesh position={[0, 0, 0.03]}>
          <planeGeometry args={[0.78, 0.98]} />
          <meshStandardMaterial color="#c8b088" roughness={0.9} />
        </mesh>
        <mesh position={[-0.12, 0.1, 0.04]}>
          <circleGeometry args={[0.2, 24]} />
          <meshStandardMaterial color="#8a4a3a" roughness={0.9} />
        </mesh>
        <mesh position={[0.15, -0.15, 0.04]}>
          <planeGeometry args={[0.3, 0.42]} />
          <meshStandardMaterial color="#3f5a4a" roughness={0.9} />
        </mesh>
      </group>

      {/* fridge */}
      <group position={[-4.0, 0, -2.25]}>
        <mesh castShadow receiveShadow position={[0, 0.9, 0]}>
          <boxGeometry args={[0.62, 1.8, 0.6]} />
          <meshStandardMaterial color="#b9bec4" roughness={0.35} metalness={0.55} />
        </mesh>
        <mesh position={[0.2, 1.0, 0.31]}>
          <boxGeometry args={[0.04, 0.5, 0.03]} />
          <meshStandardMaterial color="#3a3d42" roughness={0.5} metalness={0.5} />
        </mesh>
      </group>
    </group>
  );
}
