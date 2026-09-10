import { useEffect, useRef, useState } from 'react';
import { scrollState, scrollToBeat } from '../store.js';
import { BEATS, SERVICES, ARTISANS, ESCROW_STEPS, TRADES } from '../data/content.js';

const CAPTIONS = [
  'A home, full of small faults — and one trusted fix.',
  'Leaks, blockages & fittings — fixed same-day.',
  'Split units & cassettes — cooling restored.',
  'Panels, wiring & faults — certified safe.',
  'Solar & storage — power on your terms.',
  'Background-checked. Skill-tested. Rated.',
  'Money locked until you approve the job.',
  'Your home is next. Let’s fix it.',
];

function Shield({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none">
      <path d="M16 3l9 3.4V13c0 5.6-3.9 9.6-9 12.4C10.9 22.6 7 18.6 7 13V6.4L16 3z" fill="#e9b558" />
      <path d="M13.2 15.6l2.6 2.6 4.9-5.2" stroke="#0a0a0a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Star() {
  return (
    <svg viewBox="0 0 20 20" className="w-3.5 h-3.5 inline -mt-0.5" fill="#e9b558">
      <path d="M10 1.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8L10 14.9l-5.3 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
    </svg>
  );
}

function Check() {
  return (
    <svg viewBox="0 0 20 20" className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none">
      <circle cx="10" cy="10" r="9" fill="#1a7a4c" />
      <path d="M6.5 10.2l2.4 2.4 4.6-5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Avatar({ name, color }) {
  const initials = name.split(' ').map((p) => p[0]).join('').slice(0, 2).toUpperCase();
  return (
    <div
      className="w-10 h-10 rounded-full flex items-center justify-center text-[13px] font-semibold text-black flex-shrink-0"
      style={{ background: `linear-gradient(135deg, ${color}, #e9d08a)` }}
    >
      {initials}
    </div>
  );
}

/* ------------------------------- Booking modal ------------------------------- */
function Modal({ serviceId, onClose, onSwitch }) {
  const [funded, setFunded] = useState(false);
  const [refCode] = useState(() => `HT-${Math.floor(100000 + Math.random() * 900000)}`);
  const [form, setForm] = useState({ name: '', phone: '', trade: TRADES[0], city: 'Ibadan' });
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    setFunded(false);
    setApplied(false);
  }, [serviceId]);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const isArtisan = serviceId === 'artisan';
  const isEscrow = serviceId === 'escrow';
  const isPros = serviceId === 'pros';
  const service = SERVICES[serviceId];
  const relevant = ARTISANS.filter((a) => a.trade === serviceId);
  const shown = relevant.length ? relevant : ARTISANS.slice(0, 3);

  return (
    <div
      className="absolute inset-0 z-[60] flex items-end sm:items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm pointer-events-auto"
      onClick={onClose}
    >
      <div
        className="ht-modal-in w-full max-w-lg max-h-[88vh] overflow-y-auto ht-no-scrollbar rounded-2xl border border-white/10 bg-[#14120e]/95 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 sm:p-7">
          <div className="flex items-start justify-between mb-1">
            <div className="flex items-center gap-2 text-brass-400 text-[11px] font-semibold tracking-[0.25em] uppercase">
              <Shield className="w-4 h-4" />
              {isArtisan ? 'Artisan network' : isEscrow ? 'Escrow protection' : isPros ? 'Verified roster' : 'Book a service'}
            </div>
            <button onClick={onClose} className="text-white/50 hover:text-white text-xl leading-none px-1 -mt-1">×</button>
          </div>

          {isArtisan ? (
            applied ? (
              <SuccessBlock
                title="Application received"
                body={`Thanks ${form.name.split(' ')[0] || 'friend'} — our verification team will call ${form.phone || 'you'} within 48 hours to schedule your skill assessment for ${form.trade} in ${form.city}.`}
                refCode={refCode}
                refLabel="Application ID"
                onClose={onClose}
              />
            ) : (
              <>
                <h3 className="font-display text-3xl text-[#faf7f0] mb-1">Earn with HandyTrust.</h3>
                <p className="text-[13px] text-white/60 mb-5">Verified artisans earn 2–3× more with guaranteed escrow payouts. No chasing clients for payment — ever.</p>
                <div className="space-y-3">
                  <input
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-brass-400/60 placeholder:text-white/30"
                    placeholder="Full name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                  <input
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-brass-400/60 placeholder:text-white/30"
                    placeholder="Phone / WhatsApp e.g. 0803 123 4567"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <select
                      className="bg-white/5 border border-white/15 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-brass-400/60 text-white/85"
                      value={form.trade}
                      onChange={(e) => setForm({ ...form, trade: e.target.value })}
                    >
                      {TRADES.map((t) => <option key={t} className="bg-[#14120e]">{t}</option>)}
                    </select>
                    <select
                      className="bg-white/5 border border-white/15 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-brass-400/60 text-white/85"
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                    >
                      {['Ibadan', 'Lagos', 'Abuja'].map((c) => <option key={c} className="bg-[#14120e]">{c}</option>)}
                    </select>
                  </div>
                </div>
                <button
                  onClick={() => setApplied(true)}
                  className="mt-5 w-full rounded-full py-3 text-sm font-semibold text-black bg-gradient-to-b from-brass-300 to-brass-500 hover:brightness-105 transition"
                >
                  Apply for verification →
                </button>
                <div className="flex gap-4 mt-4 text-[11px] text-white/50">
                  {['Free to join', 'Escrow payouts', 'Free skill training'].map((t) => (
                    <span key={t} className="flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-brass-400" />{t}</span>
                  ))}
                </div>
              </>
            )
          ) : isEscrow ? (
            <>
              <h3 className="font-display text-3xl text-[#faf7f0] mb-1">Money that waits for quality.</h3>
              <p className="text-[13px] text-white/60 mb-5">Every naira is locked in the HandyTrust vault until you approve the finished work.</p>
              <div className="space-y-3">
                {ESCROW_STEPS.map((s, i) => (
                  <div key={s.t} className="flex gap-3 bg-white/[0.04] border border-white/10 rounded-xl p-3.5">
                    <div className="w-7 h-7 rounded-full bg-brass-400/15 border border-brass-400/40 text-brass-300 text-[13px] font-semibold flex items-center justify-center flex-shrink-0">{i + 1}</div>
                    <div>
                      <div className="text-sm font-medium text-white/90">{s.t}</div>
                      <div className="text-[12px] text-white/55 leading-relaxed">{s.d}</div>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => onSwitch('general')}
                className="mt-5 w-full rounded-full py-3 text-sm font-semibold text-black bg-gradient-to-b from-brass-300 to-brass-500 hover:brightness-105 transition"
              >
                Book a protected service →
              </button>
            </>
          ) : isPros ? (
            <>
              <h3 className="font-display text-3xl text-[#faf7f0] mb-1">Verified professionals.</h3>
              <p className="text-[13px] text-white/60 mb-5">ID-verified, skill-tested and insured. Pick your trade to book instantly.</p>
              <div className="space-y-2.5">
                {ARTISANS.map((a) => (
                  <div key={a.name} className="flex items-center gap-3 bg-white/[0.04] border border-white/10 rounded-xl p-3">
                    <Avatar name={a.name} color={a.color} />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-white/90">{a.name} <span className="text-white/40 font-normal">· {a.label}</span></div>
                      <div className="text-[12px] text-white/55"><Star /> {a.rating} · {a.jobs} jobs · {a.city}</div>
                    </div>
                    <button
                      onClick={() => onSwitch(a.trade)}
                      className="text-[12px] font-medium text-brass-300 border border-brass-400/40 rounded-full px-3.5 py-1.5 hover:bg-brass-400/10 transition flex-shrink-0"
                    >
                      Book →
                    </button>
                  </div>
                ))}
              </div>
            </>
          ) : service ? (
            funded ? (
              <SuccessBlock
                title="Escrow funded — job booked"
                body={`${shown[0]?.name || 'Your artisan'} (${shown[0]?.label || 'Verified Pro'}) has been notified and will call you within 30 minutes to confirm arrival. Your ${service.price} stays locked until you approve the work.`}
                refCode={refCode}
                refLabel="Booking reference"
                onClose={onClose}
              />
            ) : (
              <>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display text-3xl text-[#faf7f0] leading-tight">{service.name}</h3>
                    <p className="text-[12px] text-white/50">{service.tagline} · {service.eta}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-xl font-semibold text-brass-300">{service.price}</div>
                    <div className="text-[11px] text-white/45">{service.unit}</div>
                  </div>
                </div>
                <p className="text-[13px] text-white/65 leading-relaxed mt-3">{service.desc}</p>
                <div className="grid grid-cols-1 gap-1.5 mt-4">
                  {service.includes.map((inc) => (
                    <div key={inc} className="flex items-start gap-2 text-[12.5px] text-white/70"><Check />{inc}</div>
                  ))}
                </div>
                <div className="mt-4 text-[11px] font-semibold tracking-[0.2em] uppercase text-white/40 mb-2">Your artisan options</div>
                <div className="space-y-2">
                  {shown.map((a) => (
                    <div key={a.name} className="flex items-center gap-3 bg-white/[0.04] border border-white/10 rounded-xl p-2.5">
                      <Avatar name={a.name} color={a.color} />
                      <div className="flex-1">
                        <div className="text-[13px] font-medium text-white/90">{a.name}</div>
                        <div className="text-[11.5px] text-white/55"><Star /> {a.rating} · {a.jobs} jobs · {a.years}y exp · {a.city}</div>
                      </div>
                      <span className="text-[10px] font-semibold tracking-wider uppercase text-emerald-300/90 border border-emerald-400/30 bg-emerald-400/10 rounded-full px-2.5 py-1">Verified</span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setFunded(true)}
                  className="mt-5 w-full rounded-full py-3 text-sm font-semibold text-black bg-gradient-to-b from-brass-300 to-brass-500 hover:brightness-105 transition"
                >
                  Fund escrow · {service.price} →
                </button>
                <p className="text-center text-[11px] text-white/40 mt-2.5">🔒 Locked in vault · Released only on your approval</p>
              </>
            )
          ) : null}
        </div>
      </div>
    </div>
  );
}

function SuccessBlock({ title, body, refCode, refLabel, onClose }) {
  return (
    <div className="text-center py-4">
      <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/15 border border-emerald-400/40 flex items-center justify-center mb-4">
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
          <path d="M5 12.5l5 5L19 7" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h3 className="font-display text-2xl text-[#faf7f0] mb-2">{title}</h3>
      <p className="text-[13px] text-white/60 leading-relaxed max-w-sm mx-auto">{body}</p>
      <div className="inline-block mt-4 bg-white/[0.05] border border-white/12 rounded-xl px-5 py-2.5">
        <div className="text-[10px] tracking-[0.22em] uppercase text-white/40">{refLabel}</div>
        <div className="text-lg font-semibold text-brass-300 tracking-wider">{refCode}</div>
      </div>
      <div>
        <button onClick={onClose} className="mt-5 rounded-full px-8 py-2.5 text-sm font-medium text-white/85 border border-white/20 hover:bg-white/10 transition">
          Keep exploring ↓
        </button>
      </div>
    </div>
  );
}

/* --------------------------------- Overlay --------------------------------- */
export default function OverlayUI() {
  const [active, setActive] = useState(0);
  const [modal, setModal] = useState(null);
  const barRef = useRef();
  const hintRef = useRef();
  const activeRef = useRef(0);

  useEffect(() => {
    let raf;
    const tick = () => {
      const o = scrollState.offset;
      if (barRef.current) barRef.current.style.transform = `scaleX(${o.toFixed(4)})`;
      if (hintRef.current) hintRef.current.style.opacity = o < 0.025 ? '1' : '0';
      const idx = Math.max(0, Math.min(7, Math.round(o * 7)));
      if (idx !== activeRef.current) {
        activeRef.current = idx;
        setActive(idx);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const onBook = (e) => setModal(e.detail?.serviceId || 'general');
    window.addEventListener('handytrust:book', onBook);
    return () => window.removeEventListener('handytrust:book', onBook);
  }, []);

  return (
    <div className="absolute inset-0 z-50 pointer-events-none">
      {/* progress bar */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-white/10">
        <div ref={barRef} className="h-full w-full origin-left bg-gradient-to-r from-brass-500 via-brass-300 to-brass-500" style={{ transform: 'scaleX(0)' }} />
      </div>

      {/* header */}
      <header className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 sm:px-7 py-4">
        <div className="flex items-center gap-2.5">
          <Shield className="w-6 h-6" />
          <div>
            <div className="text-[15px] font-bold tracking-[0.18em] text-white leading-none">HANDYTRUST</div>
            <div className="text-[9px] tracking-[0.3em] text-brass-400/90 mt-1">ESCROW-BACKED REPAIRS</div>
          </div>
        </div>
        <div className="flex items-center gap-3 pointer-events-auto">
          <span className="hidden md:block text-[11px] text-white/50 tracking-wide">Ibadan · Lagos · Abuja</span>
          <button
            onClick={() => setModal('general')}
            className="rounded-full px-4 sm:px-5 py-2 text-[12px] font-semibold text-black bg-gradient-to-b from-brass-300 to-brass-500 hover:brightness-105 transition shadow-lg shadow-brass-500/20"
          >
            Book a service
          </button>
        </div>
      </header>

      {/* beat rail */}
      <nav className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 flex flex-col gap-1.5 pointer-events-auto">
        {BEATS.map((b, i) => {
          const on = i === active;
          return (
            <button
              key={b.id}
              onClick={() => scrollToBeat(i)}
              className="group flex items-center justify-end gap-2.5 py-1"
              title={b.label}
            >
              <span className={`hidden lg:block text-[10.5px] tracking-wider transition ${on ? 'text-white font-medium' : 'text-white/35 group-hover:text-white/70'}`}>
                {b.label}
              </span>
              <span className={`ht-rail-dot rounded-full ${on ? 'w-2.5 h-2.5 bg-brass-400 shadow-[0_0_12px_rgba(233,181,88,0.9)]' : 'w-1.5 h-1.5 bg-white/25 group-hover:bg-white/60'}`} />
            </button>
          );
        })}
      </nav>

      {/* beat caption */}
      <div key={active} className="ht-fade-up absolute left-4 sm:left-7 bottom-5 sm:bottom-7 max-w-[60vw]">
        <div className="text-[11px] font-semibold tracking-[0.3em] text-brass-400">
          {String(active + 1).padStart(2, '0')} / 08 — {BEATS[active].label.toUpperCase()}
        </div>
        <div className="font-display text-lg sm:text-2xl text-white/90 mt-1 font-light">{CAPTIONS[active]}</div>
      </div>

      {/* scroll hint */}
      <div ref={hintRef} className="absolute left-1/2 -translate-x-1/2 bottom-5 sm:bottom-7 flex flex-col items-center gap-1 transition-opacity duration-500">
        <span className="text-[10px] tracking-[0.3em] uppercase text-white/50">Scroll</span>
        <svg viewBox="0 0 24 24" className="w-5 h-5 ht-scroll-hint" fill="none">
          <path d="M6 9l6 6 6-6" stroke="#e9b558" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* trust badges */}
      <div className="absolute right-4 sm:right-7 bottom-5 sm:bottom-7 hidden md:flex items-center gap-4 text-[10.5px] text-white/45">
        <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5" /> Verified IDs</span>
        <span className="flex items-center gap-1.5"><span className="text-brass-400">🔒</span> Escrow protected</span>
        <span className="flex items-center gap-1.5"><Star /> 4.8 · 12k jobs</span>
      </div>

      {modal && <Modal serviceId={modal} onClose={() => setModal(null)} onSwitch={setModal} />}
    </div>
  );
}
