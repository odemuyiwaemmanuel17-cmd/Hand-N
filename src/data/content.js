// ---------------------------------------------------------------------------
// HandyTrust — single source of truth for the 3D scrollytelling timeline,
// services, artisans and escrow copy.
// ---------------------------------------------------------------------------

// 8-beat camera timeline. Each keyframe is [x, y, z] in world units.
// Tuned for the dollhouse-style Nigerian residence built in src/components.
export const CAMERA_KEYFRAMES = [
  { pos: [9.5, 8.5, 13.5], lookAt: [0, 1.0, -0.5], fov: 50 }, // 0 Entry (aerial)
  { pos: [-2.1, 1.35, 0.4], lookAt: [-2.55, 0.6, -2.25], fov: 40 }, // 1 Plumbing
  { pos: [1.5, 1.65, 0.6], lookAt: [1.85, 2.35, -2.7], fov: 40 }, // 2 AC repair
  { pos: [-0.9, 1.6, -0.4], lookAt: [-1.25, 1.6, -2.7], fov: 40 }, // 3 Electrical
  { pos: [3.6, 6.6, 5.6], lookAt: [-0.3, 3.8, -1.0], fov: 48 }, // 4 Solar roof
  { pos: [2.0, 1.5, 2.3], lookAt: [0.85, 1.0, 0.1], fov: 38 }, // 5 Verified artisan
  { pos: [-0.15, 1.35, 1.15], lookAt: [-0.2, 1.0, -0.95], fov: 36 }, // 6 Escrow vault
  { pos: [0.5, 24, 33], lookAt: [0, 0.5, -1], fov: 55 }, // 7 Neighborhood reveal
];

export const BEATS = [
  { id: 'entry', label: 'Welcome' },
  { id: 'plumbing', label: 'Plumbing' },
  { id: 'ac', label: 'AC Repair' },
  { id: 'electrical', label: 'Electrical' },
  { id: 'solar', label: 'Solar' },
  { id: 'pros', label: 'Verified Pros' },
  { id: 'escrow', label: 'Escrow' },
  { id: 'book', label: 'Get Started' },
];

export const SERVICES = {
  plumbing: {
    name: 'Plumbing',
    tagline: 'Leaks, blockages & fittings',
    price: '₦7,500',
    unit: 'starting price',
    eta: 'Same-day in Ibadan',
    desc: 'A verified plumber diagnoses the fault on arrival and confirms an upfront, fixed quote before touching a single pipe.',
    includes: [
      'In-home diagnosis & fixed upfront quote',
      'Certified parts with receipts',
      '90-day workmanship warranty',
      'Free re-visit if the fault returns',
    ],
  },
  ac: {
    name: 'AC Repair & Servicing',
    tagline: 'Split units, cassettes & chillers',
    price: '₦12,000',
    unit: 'full service',
    eta: 'Same-day in Lagos & Ibadan',
    desc: 'Deep chemical wash, gas top-up with gauge readings, and electrical checks — cooling restored or you pay nothing.',
    includes: [
      'Indoor + outdoor deep service',
      'Gas pressure check & top-up option',
      'Thermostat & drainage calibration',
      '30-day cooling guarantee',
    ],
  },
  electrical: {
    name: 'Electrical',
    tagline: 'Panels, wiring & faults',
    price: '₦8,000',
    unit: 'starting price',
    eta: 'Emergency callouts available',
    desc: 'Licensed electricians for distribution boards, rewiring, and stubborn faults — tested live and certified safe.',
    includes: [
      'Full safety & load inspection',
      'Genuine breakers & accessories',
      'Live testing before sign-off',
      '90-day workmanship warranty',
    ],
  },
  solar: {
    name: 'Solar & Inverter',
    tagline: 'Design, install & maintain',
    price: '₦15,000',
    unit: 'site assessment (waived on install)',
    eta: 'Assessment within 48 hours',
    desc: 'Load-matched solar + inverter systems sized for your actual consumption — no guesswork, no oversized quotes.',
    includes: [
      'Load audit & shade analysis',
      'Tier-1 panels & lithium storage',
      'Remote monitoring setup',
      '2-year installation warranty',
    ],
  },
  general: {
    name: 'General Repairs',
    tagline: 'Painting, masonry, cleaning & more',
    price: '₦6,000',
    unit: 'starting price',
    eta: 'Next-day availability',
    desc: 'One booking for everything else — painting, tiling, carpentry, deep cleaning and generator servicing.',
    includes: [
      'Background-checked professionals',
      'Photo-documented before & after',
      'Escrow protection on every job',
      '90-day workmanship warranty',
    ],
  },
};

export const ARTISANS = [
  { name: 'Adebayo O.', trade: 'plumbing', label: 'Master Plumber', city: 'Ibadan', rating: 4.9, jobs: 212, years: 7, color: '#38bdf8' },
  { name: 'Chidi E.', trade: 'electrical', label: 'Licensed Electrician', city: 'Lagos', rating: 4.8, jobs: 340, years: 9, color: '#fbbf24' },
  { name: 'Fatima B.', trade: 'ac', label: 'AC Specialist', city: 'Abuja', rating: 4.9, jobs: 187, years: 6, color: '#7dd3fc' },
  { name: 'Tunde A.', trade: 'solar', label: 'Solar Engineer', city: 'Ibadan', rating: 5.0, jobs: 96, years: 8, color: '#4ade80' },
  { name: 'Emeka N.', trade: 'general', label: 'Painter & Mason', city: 'Lagos', rating: 4.7, jobs: 265, years: 11, color: '#f472b6' },
  { name: 'Aisha K.', trade: 'general', label: 'Deep-Clean Lead', city: 'Abuja', rating: 4.9, jobs: 158, years: 5, color: '#c084fc' },
];

export const ESCROW_STEPS = [
  {
    t: 'Fund escrow',
    d: 'Your payment moves into the HandyTrust vault — never straight to the artisan.',
  },
  {
    t: 'Work gets done',
    d: 'The artisan completes the job. You inspect and approve with photos.',
  },
  {
    t: 'Money releases',
    d: 'Funds release instantly on approval. Warranty stays active for 90 days.',
  },
];

export const TRADES = ['Plumbing', 'Electrical', 'AC & Refrigeration', 'Solar & Inverter', 'Painting', 'Masonry', 'Carpentry', 'Cleaning', 'Generator'];
