import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ScrollControls, ContactShadows, Stars } from '@react-three/drei';
import CameraRig from './CameraRig.jsx';
import BeatOverlay from './BeatOverlay.jsx';
import Hotspot from './Hotspot.jsx';
import House, { Compound, useHouseMats } from './House.jsx';
import Plumbing from './Plumbing.jsx';
import ACUnit from './ACUnit.jsx';
import ElectricalPanel from './ElectricalPanel.jsx';
import SolarRoof from './SolarRoof.jsx';
import Artisan from './Artisan.jsx';
import EscrowVault from './EscrowVault.jsx';
import Neighborhood from './Neighborhood.jsx';
import { openBooking } from '../store.js';

function Meta({ items }) {
  return (
    <div className="beat-meta">
      {items.map((s, i) => (
        <React.Fragment key={s}>
          {i > 0 && <span className="beat-dot" />}
          <span>{s}</span>
        </React.Fragment>
      ))}
    </div>
  );
}

function Scene() {
  const mats = useHouseMats();
  return (
    <>
      <CameraRig />

      {/* environment */}
      <Neighborhood />
      <Compound mats={mats} />
      <House mats={mats} />
      <Plumbing mats={mats} />
      <ACUnit />
      <ElectricalPanel />
      <SolarRoof mats={mats} />
      <Artisan />
      <EscrowVault />

      {/* hotspot markers */}
      <Hotspot beat={1} position={[-2.55, 0.52, -2.05]} color="#7dd3fc" size={0.11} />
      <Hotspot beat={2} position={[1.85, 2.05, -2.5]} color="#ffd9a0" size={0.11} />
      <Hotspot beat={3} position={[-1.25, 1.6, -2.48]} color="#ff8a7a" size={0.11} />
      <Hotspot beat={4} position={[-0.3, 4.45, -1.2]} color="#4ade80" size={0.2} />
      <Hotspot beat={6} position={[-0.2, 1.15, -0.32]} color="#e9b558" size={0.15} />

      {/* -------- BEAT 01 — ENTRY -------- */}
      <BeatOverlay index={0} position={[0, 5.0, 6.0]} rotation={[-0.12, 0.85, 0]} scale={1.15} width={560}>
        <div className="beat-hero">
          <span className="brand-mark">◆ HandyTrust</span>
          <h1 className="beat-title">Fix it now. Pay when it&rsquo;s done.</h1>
          <p className="beat-sub">
            Escrow-backed home repairs by verified Nigerian professionals — plumbers,
            electricians, AC and solar engineers.
          </p>
          <Meta items={['12,000+ jobs done', '4.8 average rating', '90-day warranty']} />
          <p className="beat-sub" style={{ marginTop: 14, marginBottom: 0, fontSize: 12 }}>
            ↓&nbsp;&nbsp;Scroll to explore the home&nbsp;&nbsp;↓
          </p>
        </div>
      </BeatOverlay>

      {/* -------- BEAT 02 — PLUMBING -------- */}
      <BeatOverlay index={1} position={[-2.55, 1.8, -1.45]} scale={0.45} width={300}>
        <span className="beat-kicker">Plumbing</span>
        <h2 className="beat-title">Something&rsquo;s leaking?</h2>
        <p className="beat-sub">
          That trap joint won&rsquo;t fix itself. A verified plumber arrives today with
          certified parts and a fixed quote.
        </p>
        <button className="beat-btn" onClick={() => openBooking('plumbing')}>
          Find a verified plumber →
        </button>
        <Meta items={['From ₦7,500', 'Same-day in Ibadan']} />
      </BeatOverlay>

      {/* -------- BEAT 03 — AC -------- */}
      <BeatOverlay index={2} position={[1.85, 1.45, -1.8]} scale={0.45} width={300}>
        <span className="beat-kicker">AC Repair</span>
        <h2 className="beat-title">Not cooling?</h2>
        <p className="beat-sub">
          Weak airflow and a warning light. Get a deep service, gas check and
          calibration — cooling restored or you pay nothing.
        </p>
        <button className="beat-btn" onClick={() => openBooking('ac')}>
          Find an AC technician →
        </button>
        <Meta items={['From ₦12,000', '30-day cooling guarantee']} />
      </BeatOverlay>

      {/* -------- BEAT 04 — ELECTRICAL -------- */}
      <BeatOverlay index={3} position={[-1.25, 2.45, -1.9]} scale={0.45} width={300}>
        <span className="beat-kicker">Electrical</span>
        <h2 className="beat-title">Power problem?</h2>
        <p className="beat-sub">
          A tripped breaker and a fault channel. Licensed electricians diagnose,
          fix and live-test before sign-off.
        </p>
        <button className="beat-btn" onClick={() => openBooking('electrical')}>
          Find an electrician →
        </button>
        <Meta items={['From ₦8,000', 'Licensed & insured']} />
      </BeatOverlay>

      {/* -------- BEAT 05 — SOLAR -------- */}
      <BeatOverlay index={4} position={[0.3, 5.2, 1.5]} rotation={[-0.22, 0.6, 0]} scale={0.43} width={340}>
        <span className="beat-kicker">Solar & Inverter</span>
        <h2 className="beat-title">Reliable backup power?</h2>
        <p className="beat-sub">
          Tier-1 panels and lithium storage, sized to your real load — with remote
          monitoring and a 2-year installation warranty.
        </p>
        <button className="beat-btn" onClick={() => openBooking('solar')}>
          Find a solar professional →
        </button>
        <Meta items={['Free load audit', 'Monitored 24/7']} />
      </BeatOverlay>

      {/* -------- BEAT 06 — VERIFIED ARTISANS -------- */}
      <BeatOverlay index={5} position={[0.85, 2.25, 0.5]} rotation={[0.1, 0.42, 0]} scale={0.5} width={320}>
        <span className="beat-kicker">Verified Professionals</span>
        <h2 className="beat-title">People you can trust.</h2>
        <p className="beat-sub">
          Background-checked, skill-tested and rated after every job. Meet Adebayo —
          ★4.9 across 212 jobs in Ibadan.
        </p>
        <button className="beat-btn" onClick={() => openBooking('pros')}>
          Explore professionals →
        </button>
        <Meta items={['ID verified', 'Skill tested', 'Insured']} />
      </BeatOverlay>

      {/* -------- BEAT 07 — ESCROW VAULT -------- */}
      <BeatOverlay index={6} position={[-0.2, 2.1, -0.9]} rotation={[0.1, 0, 0]} scale={0.45} width={300}>
        <span className="beat-kicker">Escrow Protection</span>
        <h2 className="beat-title">Pay when the work is done.</h2>
        <p className="beat-sub">
          Your money sits locked in the HandyTrust vault and releases only when
          you approve the finished job.
        </p>
        <button className="beat-btn" onClick={() => openBooking('escrow')}>
          How escrow works →
        </button>
        <Meta items={['100% protected', 'Instant release']} />
      </BeatOverlay>

      {/* -------- BEAT 08 — NEIGHBORHOOD -------- */}
      <BeatOverlay index={7} position={[0.4, 19.5, 24.5]} scale={1.8} width={620}>
        <div className="beat-hero">
          <span className="brand-mark">◆ HandyTrust</span>
          <h2 className="beat-title">Trusted help for every home.</h2>
          <p className="beat-sub">
            Join thousands of households across Ibadan, Lagos and Abuja keeping
            their homes running — without the wahala.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="beat-btn" onClick={() => openBooking('general')}>
              Book a Service
            </button>
            <button className="beat-btn-ghost" onClick={() => openBooking('artisan')}>
              Become an Artisan
            </button>
          </div>
          <Meta items={['Ibadan', 'Lagos', 'Abuja']} />
        </div>
      </BeatOverlay>
    </>
  );
}

export default function ScrollytellingExperience() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        shadows
        dpr={[1, 1.75]}
        camera={{ fov: 50, near: 0.1, far: 400, position: [9.5, 8.5, 13.5] }}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
      >
        <color attach="background" args={['#0a0a0a']} />
        <fog attach="fog" args={['#0a0a0a', 48, 140]} />

        {/* golden-dusk key + warm interior practicals */}
        <ambientLight intensity={0.35} color="#ffe9d0" />
        <hemisphereLight args={['#2a3348', '#1a140f', 0.5]} />
        <directionalLight
          position={[-14, 9, 10]}
          intensity={1.15}
          color="#ffc38f"
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-camera-left={-14}
          shadow-camera-right={14}
          shadow-camera-top={14}
          shadow-camera-bottom={-14}
          shadow-camera-near={1}
          shadow-camera-far={45}
          shadow-bias={-0.0004}
          shadow-normalBias={0.03}
        />
        <pointLight position={[0.5, 2.7, 0.5]} intensity={16} distance={13} decay={2} color="#ffd9a3" />
        <pointLight position={[-3, 2.4, -1.8]} intensity={7} distance={7} decay={2} color="#ffd9a3" />
        <pointLight position={[2.2, 2.8, 3.6]} intensity={9} distance={11} decay={2} color="#ffcf96" />
        <pointLight position={[-0.2, 2.8, -0.9]} intensity={6} distance={6} decay={2} color="#ffe6b8" />
        <pointLight position={[1.85, 2.0, -1.8]} intensity={4} distance={5} decay={2} color="#aed6ff" />
        <pointLight position={[1.9, 3.2, 7.6]} intensity={10} distance={14} decay={2} color="#ffcf96" />

        <Stars radius={120} depth={40} count={2200} factor={3} saturation={0} fade speed={0.6} />

        <Suspense fallback={null}>
          <ScrollControls pages={8} damping={0.28}>
            <Scene />
            <ContactShadows position={[0, 0.02, 0]} scale={22} blur={2.2} opacity={0.55} far={6} resolution={512} color="#000000" />
          </ScrollControls>
        </Suspense>
      </Canvas>
    </div>
  );
}
