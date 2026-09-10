import * as THREE from 'three';

// Procedural CanvasTextures — realistic PBR surface detail with zero network
// fetches, so the experience works fully offline.

const cache = {};

function makeTexture(key, size, draw, repeat = [1, 1]) {
  if (cache[key]) return cache[key];
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d');
  draw(ctx, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(repeat[0], repeat[1]);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  cache[key] = tex;
  return tex;
}

function speckle(ctx, size, count, alpha, light = true) {
  for (let i = 0; i < count; i++) {
    const v = light ? 255 : 0;
    ctx.fillStyle = `rgba(${v},${v},${v},${Math.random() * alpha})`;
    ctx.fillRect(Math.random() * size, Math.random() * size, 1.5, 1.5);
  }
}

export function solarTexture() {
  return makeTexture('solar', 512, (ctx, s) => {
    const g = ctx.createLinearGradient(0, 0, s, s);
    g.addColorStop(0, '#16407c');
    g.addColorStop(0.5, '#0e2c58');
    g.addColorStop(1, '#123464');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, s, s);
    // cell grid
    ctx.strokeStyle = 'rgba(215, 230, 255, 0.55)';
    ctx.lineWidth = 2;
    const cols = 6;
    const rows = 10;
    for (let c = 0; c <= cols; c++) {
      ctx.beginPath();
      ctx.moveTo((c * s) / cols, 0);
      ctx.lineTo((c * s) / cols, s);
      ctx.stroke();
    }
    for (let r = 0; r <= rows; r++) {
      ctx.beginPath();
      ctx.moveTo(0, (r * s) / rows);
      ctx.lineTo(s, (r * s) / rows);
      ctx.stroke();
    }
    // busbars
    ctx.strokeStyle = 'rgba(230, 240, 255, 0.8)';
    ctx.lineWidth = 3;
    [0.25, 0.5, 0.75].forEach((x) => {
      ctx.beginPath();
      ctx.moveTo(x * s, 0);
      ctx.lineTo(x * s, s);
      ctx.stroke();
    });
    // sheen
    const sheen = ctx.createLinearGradient(0, 0, s, s);
    sheen.addColorStop(0.35, 'rgba(255,255,255,0)');
    sheen.addColorStop(0.5, 'rgba(255,255,255,0.10)');
    sheen.addColorStop(0.65, 'rgba(255,255,255,0)');
    ctx.fillStyle = sheen;
    ctx.fillRect(0, 0, s, s);
    // frame
    ctx.strokeStyle = '#9aa4b2';
    ctx.lineWidth = 14;
    ctx.strokeRect(0, 0, s, s);
  });
}

export function tileTexture() {
  return makeTexture('tile', 512, (ctx, s) => {
    ctx.fillStyle = '#b39d7d';
    ctx.fillRect(0, 0, s, s);
    const n = 4;
    const gap = 6;
    const t = s / n;
    for (let y = 0; y < n; y++) {
      for (let x = 0; x < n; x++) {
        const shade = 205 + Math.floor(Math.random() * 14);
        ctx.fillStyle = `rgb(${shade},${shade - 22},${shade - 58})`;
        ctx.fillRect(x * t + gap / 2, y * t + gap / 2, t - gap, t - gap);
        ctx.fillStyle = 'rgba(255,255,255,0.05)';
        ctx.fillRect(x * t + gap / 2, y * t + gap / 2, t - gap, (t - gap) / 3);
      }
    }
    speckle(ctx, s, 900, 0.05, false);
  }, [3, 2]);
}

export function plasterTexture() {
  return makeTexture('plaster', 256, (ctx, s) => {
    ctx.fillStyle = '#e9dcc4';
    ctx.fillRect(0, 0, s, s);
    speckle(ctx, s, 2600, 0.06, false);
    speckle(ctx, s, 1500, 0.05, true);
  }, [2, 1]);
}

export function concreteTexture() {
  return makeTexture('concrete', 256, (ctx, s) => {
    ctx.fillStyle = '#43413d';
    ctx.fillRect(0, 0, s, s);
    speckle(ctx, s, 3200, 0.09, false);
    speckle(ctx, s, 1200, 0.05, true);
  }, [3, 3]);
}

export function compoundTexture() {
  return makeTexture('compound', 256, (ctx, s) => {
    ctx.fillStyle = '#2b2823';
    ctx.fillRect(0, 0, s, s);
    speckle(ctx, s, 2200, 0.08, false);
    speckle(ctx, s, 900, 0.05, true);
    ctx.strokeStyle = 'rgba(0,0,0,0.35)';
    ctx.lineWidth = 3;
    ctx.strokeRect(0, 0, s, s);
  }, [6, 5]);
}

export function woodTexture() {
  return makeTexture('wood', 256, (ctx, s) => {
    ctx.fillStyle = '#6e4a2c';
    ctx.fillRect(0, 0, s, s);
    for (let i = 0; i < 46; i++) {
      const y = Math.random() * s;
      ctx.strokeStyle = `rgba(40, 22, 10, ${0.1 + Math.random() * 0.16})`;
      ctx.lineWidth = 1 + Math.random() * 2;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.bezierCurveTo(s * 0.3, y + 6, s * 0.6, y - 6, s, y + 3);
      ctx.stroke();
    }
    speckle(ctx, s, 500, 0.05, true);
  });
}

export function tvScreenTexture() {
  return makeTexture('tv', 256, (ctx, s) => {
    const g = ctx.createLinearGradient(0, 0, s, s);
    g.addColorStop(0, '#0b1e3a');
    g.addColorStop(0.45, '#123a6e');
    g.addColorStop(0.7, '#1c5f9e');
    g.addColorStop(1, '#0a1830');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, s, s);
    ctx.fillStyle = 'rgba(255,255,255,0.10)';
    ctx.beginPath();
    ctx.ellipse(s * 0.62, s * 0.34, s * 0.2, s * 0.12, -0.4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.05)';
    ctx.fillRect(0, s * 0.78, s, s * 0.22);
  });
}
