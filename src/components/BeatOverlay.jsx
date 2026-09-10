import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, useScroll } from '@react-three/drei';

// Spatial typography anchored in 3D space. Fades in/out based on how close
// the scroll offset is to this beat's center (index / 7).
export default function BeatOverlay({
  index,
  position,
  rotation = [0, 0, 0],
  scale = 0.5,
  width = 300,
  children,
}) {
  const scroll = useScroll();
  const ref = useRef();
  // Shrink spatial cards on narrow/portrait screens so they stay in frame.
  const aspect = useThree((s) => s.size.width / Math.max(1, s.size.height));
  const responsive = scale * THREE.MathUtils.clamp(aspect / 1.3, 0.45, 1);

  useFrame(() => {
    const center = index / 7;
    const d = Math.abs(scroll.offset - center);
    const half = 0.5 / 7 + 0.05;
    const v = Math.max(0, 1 - d / half);
    const eased = v * v * (3 - 2 * v);
    const el = ref.current;
    if (el) {
      el.style.opacity = eased.toFixed(3);
      el.style.transform = `translateY(${(1 - eased) * 26}px)`;
      // NOTE: card body stays pointer-transparent so wheel/touch scroll passes
      // through to the ScrollControls layer; only buttons capture pointer.
      el.style.visibility = eased <= 0.02 ? 'hidden' : 'visible';
    }
  });

  return (
    <Html
      transform
      position={position}
      rotation={rotation}
      scale={scale}
      distanceFactor={6}
      zIndexRange={[30, 0]}
      wrapperClass="beat-html"
    >
      <div ref={ref} style={{ width }} className="beat-card">
        {children}
      </div>
    </Html>
  );
}
