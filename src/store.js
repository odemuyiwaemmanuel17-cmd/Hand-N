// Shared mutable state between the 3D canvas and the DOM overlay.
// Mutating these does not trigger React re-renders, so the render loop stays cheap.

export const scrollState = { offset: 0 };

// Filled in by CameraRig with drei's ScrollControls element so the DOM
// progress rail can deep-link to any beat.
export const scrollApi = { el: null };

export function scrollToBeat(i) {
  const el = scrollApi.el;
  if (!el) return;
  const clamped = Math.max(0, Math.min(7, i));
  const max = el.scrollHeight - el.clientHeight;
  el.scrollTo({ top: (clamped / 7) * max, behavior: 'smooth' });
}

export function openBooking(serviceId) {
  window.dispatchEvent(
    new CustomEvent('handytrust:book', { detail: { serviceId } })
  );
}
