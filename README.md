# HandyTrust — Fix it now. Pay when it's done.

**HandyTrust** is an escrow-backed home maintenance platform, presented as an
interactive **3D scrollytelling experience**: a guided, scroll-driven camera
timeline travels through a realistic Nigerian residence — from a leaking pipe
under the sink, to the AC unit, the distribution board, the rooftop solar
array, a verified artisan, a glass escrow vault, and finally a cinematic
neighbourhood reveal.

## The 8-beat timeline

| # | Beat | Scroll | Focus |
|---|------|--------|-------|
| 01 | Entry | 0.00 – 0.12 | Aerial view of the home |
| 02 | Plumbing | 0.13 – 0.25 | Leaking trap joint + animated drips |
| 03 | AC Repair | 0.26 – 0.38 | Faulty split unit, weak airflow |
| 04 | Electrical | 0.39 – 0.50 | Open distribution board, live LEDs |
| 05 | Solar | 0.51 – 0.63 | Rooftop array + inverter & battery |
| 06 | Verified Artisans | 0.64 – 0.75 | Realistic artisan character + tools |
| 07 | Escrow Vault | 0.76 – 0.88 | Glass vault, coins, padlock |
| 08 | Neighbourhood | 0.89 – 1.00 | Wide pull-back, Book / Join CTAs |

Camera motion is **strictly scroll-governed** (no orbit/free-look): keyframes
are interpolated with per-segment smoothstep easing plus critically-damped
smoothing, with per-beat FOV shifts for a cinematic feel. All typography is
anchored in 3D space via `<Html transform>`.

## Stack

- React 18 + Vite 5
- three.js + `@react-three/fiber` + `@react-three/drei` (`ScrollControls`)
- Tailwind CSS
- 100% procedural geometry & canvas-generated PBR textures — zero external
  3D assets, works fully offline (except Google Fonts, which degrade
  gracefully to system fonts).

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build -> dist/
```

Scroll (mouse wheel / trackpad / touch) to travel the timeline. Click any
service CTA to open the escrow booking flow; use the right-hand rail to jump
between beats.

## Project layout

```
src/
  App.jsx                          # canvas + DOM overlay shell
  store.js                         # shared scroll state (render-loop safe)
  data/content.js                  # camera keyframes, services, artisans, copy
  utils/textures.js                # procedural CanvasTextures (solar, tile…)
  components/
    ScrollytellingExperience.jsx   # Canvas, lights, beats, spatial cards
    CameraRig.jsx                  # scroll-driven keyframe interpolation
    BeatOverlay.jsx                # fading 3D-anchored typography
    Hotspot.jsx                    # pulsing 3D markers
    House.jsx                      # bungalow + compound (fence, gate, car…)
    Plumbing.jsx / ACUnit.jsx / ElectricalPanel.jsx / SolarRoof.jsx
    Artisan.jsx / EscrowVault.jsx / Neighborhood.jsx
    OverlayUI.jsx                  # header, rail, captions, booking modals
```
