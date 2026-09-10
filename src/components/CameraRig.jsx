import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import * as THREE from 'three';
import { CAMERA_KEYFRAMES } from '../data/content.js';
import { scrollState, scrollApi } from '../store.js';

// Scroll-driven camera only — no OrbitControls / free-look by design.
// Interpolates across the 8 keyframes with per-segment smoothstep easing,
// then critically-damped smoothing for a cinematic glide.
const _a = new THREE.Vector3();
const _b = new THREE.Vector3();
const _target = new THREE.Vector3();
const _la = new THREE.Vector3();
const _lb = new THREE.Vector3();
const _lookTarget = new THREE.Vector3();

export default function CameraRig() {
  const scroll = useScroll();
  const pos = useRef(new THREE.Vector3(...CAMERA_KEYFRAMES[0].pos));
  const look = useRef(new THREE.Vector3(...CAMERA_KEYFRAMES[0].lookAt));
  const fov = useRef(CAMERA_KEYFRAMES[0].fov);

  useFrame((state, delta) => {
    scrollApi.el = scroll.el;
    const progress = THREE.MathUtils.clamp(scroll.offset, 0, 1);
    scrollState.offset = progress;

    const total = CAMERA_KEYFRAMES.length - 1;
    const exact = progress * total;
    const i = Math.min(Math.floor(exact), total - 1);
    const j = Math.min(i + 1, total);
    const t = exact - i;
    // smoothstep within the segment
    const e = t * t * (3 - 2 * t);

    const A = CAMERA_KEYFRAMES[i];
    const B = CAMERA_KEYFRAMES[j];

    _target.copy(_a.set(...A.pos)).lerp(_b.set(...B.pos), e);
    _lookTarget.copy(_la.set(...A.lookAt)).lerp(_lb.set(...B.lookAt), e);
    const fovGoal = A.fov + (B.fov - A.fov) * e;

    // frame-rate independent damping toward the timeline pose
    const k = 1 - Math.exp(-3.4 * Math.min(delta, 0.05));
    pos.current.lerp(_target, k);
    look.current.lerp(_lookTarget, k);
    fov.current = THREE.MathUtils.damp(fov.current, fovGoal, 3.0, Math.min(delta, 0.05));

    state.camera.position.copy(pos.current);
    state.camera.lookAt(look.current);
    if (Math.abs(state.camera.fov - fov.current) > 0.01) {
      state.camera.fov = fov.current;
      state.camera.updateProjectionMatrix();
    }
  });

  return null;
}
