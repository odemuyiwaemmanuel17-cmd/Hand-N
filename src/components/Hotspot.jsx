import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import * as THREE from 'three';

// Pulsing 3D marker ring that billboards toward the camera and fades with
// its beat — draws the eye to each fault / feature in the home.
export default function Hotspot({ beat, position, color = '#e9b558', size = 0.12 }) {
  const scroll = useScroll();
  const ring = useRef();
  const dot = useRef();
  const group = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const center = beat / 7;
    const d = Math.abs(scroll.offset - center);
    const v = Math.max(0, 1 - d / (0.5 / 7 + 0.06));
    if (group.current) {
      group.current.visible = v > 0.02;
      group.current.quaternion.copy(state.camera.quaternion);
    }
    if (ring.current) {
      const c = (t * 0.9 + beat * 0.13) % 1;
      ring.current.scale.setScalar(size * (1.6 + c * 3.2));
      ring.current.material.opacity = (1 - c) * 0.85 * v;
    }
    if (dot.current) {
      dot.current.scale.setScalar(1 + Math.sin(t * 3 + beat) * 0.15);
      dot.current.material.opacity = v;
    }
  });

  return (
    <group ref={group} position={position}>
      <mesh ref={ring}>
        <ringGeometry args={[0.8, 1, 32]} />
        <meshBasicMaterial color={color} transparent side={THREE.DoubleSide} depthWrite={false} />
      </mesh>
      <mesh ref={dot} scale={size}>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshBasicMaterial color={color} transparent depthWrite={false} />
      </mesh>
    </group>
  );
}
