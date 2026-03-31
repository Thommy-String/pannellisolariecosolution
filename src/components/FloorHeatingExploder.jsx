import React, { useRef, useEffect, useState, useCallback } from 'react';

/* ── Layer metadata ── */
const LAYERS = [
  {
    num: 1,
    label: 'Massetto di Base',
    short: 'Massetto Base',
    desc: 'Il sottofondo esistente o nuovo massetto livellato, base solida per l\'intero impianto.',
    frontColor: '#78716c',
    topColor: '#a8a29e',
    rightColor: '#57534e',
    thickness: 36,
    pattern: 'concrete',
  },
  {
    num: 2,
    label: 'Pannello Isolante Bugnato',
    short: 'Pannello Bugnato',
    desc: 'Pannello in EPS con bugne per il fissaggio dei tubi e isolamento termico verso il basso.',
    frontColor: '#1e293b',
    topColor: '#334155',
    rightColor: '#0f172a',
    thickness: 12,
    pattern: 'bumps',
  },
  {
    num: 3,
    label: 'Tubo Radiante PE-Xa',
    short: 'Tubo Radiante',
    desc: 'Tubo in PE-Xa o PE-RT posato a spirale o serpentina, cuore dell\'impianto radiante.',
    frontColor: '#ea580c',
    topColor: '#fb923c',
    rightColor: '#c2410c',
    thickness: 0,
    pattern: 'tube',
  },
  {
    num: 4,
    label: 'Massetto Radiante',
    short: 'Massetto Radiante',
    desc: 'Massetto autolivellante che ingloba i tubi, pronto per la posa del pavimento.',
    frontColor: '#9ca3af',
    topColor: '#d1d5db',
    rightColor: '#6b7280',
    thickness: 6,
    pattern: 'smooth',
  },
  {
    num: 5,
    label: 'Posa Pavimento — Parquet Rovere',
    short: 'Pavimento finale',
    desc: 'Doghe in rovere naturale posate a correre, finitura calda ed elegante sopra l\'impianto radiante.',
    frontColor: '#92400e',
    topColor: '#d97706',
    rightColor: '#78350f',
    thickness: 8,
    pattern: 'parquet',
  },
];

/* ── Isometric math ── */
const COS30 = Math.cos(Math.PI / 6);
const SIN30 = 0.5;
const SLAB_W = 180;
const SLAB_D = 90;

function iso(x, y, z, cx, cy) {
  return [cx + (x - y) * COS30, cy - z + (x + y) * SIN30];
}

function slabGeo(baseZ, t, cx, cy) {
  const w = SLAB_W, d = SLAB_D;
  const c = {
    bfl: iso(-w, -d, baseZ, cx, cy),
    bfr: iso(w, -d, baseZ, cx, cy),
    bnl: iso(-w, d, baseZ, cx, cy),
    bnr: iso(w, d, baseZ, cx, cy),
    tfl: iso(-w, -d, baseZ + t, cx, cy),
    tfr: iso(w, -d, baseZ + t, cx, cy),
    tnl: iso(-w, d, baseZ + t, cx, cy),
    tnr: iso(w, d, baseZ + t, cx, cy),
  };
  const pts = arr => arr.map(p => p.join(',')).join(' ');
  return {
    top: pts([c.tfl, c.tfr, c.tnr, c.tnl]),
    front: pts([c.tnl, c.tnr, c.bnr, c.bnl]),
    right: pts([c.tnr, c.tfr, c.bfr, c.bnr]),
    c,
  };
}

/* ── Generate serpentine tube path on isometric surface ── */
function buildSerpentinePath(baseZ, cx, cy) {
  const w = SLAB_W;
  const d = SLAB_D;
  const tubeZ = baseZ + 6;
  const passes = 11;
  const margin = 0.06;
  const points = [];

  for (let i = 0; i < passes; i++) {
    const t = margin + (i / (passes - 1)) * (1 - 2 * margin);
    const yVal = -d + t * 2 * d;
    if (i % 2 === 0) {
      points.push(iso(-w * (1 - margin), yVal, tubeZ, cx, cy));
      points.push(iso(w * (1 - margin), yVal, tubeZ, cx, cy));
    } else {
      points.push(iso(w * (1 - margin), yVal, tubeZ, cx, cy));
      points.push(iso(-w * (1 - margin), yVal, tubeZ, cx, cy));
    }
  }

  let pathD = 'M ' + points[0][0] + ',' + points[0][1];
  for (let i = 0; i < points.length - 1; i++) {
    const next = points[i + 1];
    if (i % 2 === 0) {
      pathD += ' L ' + next[0] + ',' + next[1];
    } else {
      const curr = points[i];
      const midX = (curr[0] + next[0]) / 2;
      const midY = (curr[1] + next[1]) / 2;
      const cp1X = curr[0] * 0.7 + midX * 0.3;
      const cp2X = next[0] * 0.7 + midX * 0.3;
      pathD += ' Q ' + cp1X + ',' + midY + ' ' + midX + ',' + midY;
      pathD += ' Q ' + cp2X + ',' + midY + ' ' + next[0] + ',' + next[1];
    }
  }
  return pathD;
}

/* ── Generate parquet planks on isometric top surface ── */
function buildParquetPlanks(baseZ, t, cx, cy) {
  const w = SLAB_W;
  const d = SLAB_D;
  const topZ = baseZ + t;
  const plankRows = 8;
  const planksPerRow = 4;
  const plankW = (2 * w) / planksPerRow;
  const gap = 1.2;
  const planks = [];

  for (let row = 0; row < plankRows; row++) {
    const y0 = -d + (row / plankRows) * 2 * d + gap;
    const y1 = -d + ((row + 1) / plankRows) * 2 * d - gap;
    const offset = (row % 2 === 0) ? 0 : plankW * 0.5;
    const startCol = offset > 0 ? -1 : 0;
    const endCol = planksPerRow + 1;
    for (let col = startCol; col < endCol; col++) {
      let x0 = -w + offset + col * plankW + gap;
      let x1 = -w + offset + (col + 1) * plankW - gap;
      x0 = Math.max(x0, -w + gap);
      x1 = Math.min(x1, w - gap);
      if (x1 - x0 < plankW * 0.15) continue;

      const tl = iso(x0, y0, topZ, cx, cy);
      const tr = iso(x1, y0, topZ, cx, cy);
      const br = iso(x1, y1, topZ, cx, cy);
      const bl = iso(x0, y1, topZ, cx, cy);
      const seed = row * 17 + col * 7;
      const lum = 0.88 + ((seed * 9301 + 49297) % 233 / 233) * 0.12;
      planks.push({
        points: [tl, tr, br, bl].map(p => p.join(',')).join(' '),
        lum,
      });
    }
  }
  return planks;
}

/* ── Layout constants ── */
const SLAB_GAP = 40;
const SERP_GAP = 50;
const SERP_LENGTH = 5200;
const SVG_W = 1100;
const SVG_H = 650;
const CX = SVG_W / 2;
const CY = 400;

/* ── Delay helpers ── */
const SERP_DONE = 1.1 + 0.3 + 2.0;
function layerDelay(i) {
  if (i <= 2) return i * 0.55;
  if (i === 3) return SERP_DONE;
  return SERP_DONE + 1.2;
}
const SLIDE = 80;

/* ── Phase timing ── */
const EXPLODE_DURATION = 6300;
const PAUSE_BEFORE_COMPRESS = 1000;
const COMPRESS_DURATION = 1200;
const PAUSE_BEFORE_PULSE = 400;
const PULSE_DURATION = 3500;
const PAUSE_BEFORE_RESTART = 1500;

function FloorHeatingExploder() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [phase, setPhase] = useState('idle');
  const [animKey, setAnimKey] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting && !visible) setVisible(true); },
      { threshold: 0.12 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [visible]);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!visible) return;

    const schedule = (fn, ms) => {
      clearTimer();
      timerRef.current = setTimeout(fn, ms);
    };

    const startCycle = () => {
      setPhase('hidden');
      setAnimKey(k => k + 1);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setPhase('showing');
          schedule(() => {
            setPhase('compressing');
            schedule(() => {
              schedule(() => {
                setPhase('pulsing');
                schedule(() => {
                  startCycle();
                }, PULSE_DURATION + PAUSE_BEFORE_RESTART);
              }, PAUSE_BEFORE_PULSE);
            }, COMPRESS_DURATION);
          }, EXPLODE_DURATION + PAUSE_BEFORE_COMPRESS);
        });
      });
    };

    startCycle();
    return clearTimer;
  }, [visible, clearTimer]);

  const show = phase === 'showing' || phase === 'compressing' || phase === 'pulsing';
  const compressing = phase === 'compressing' || phase === 'pulsing';
  const pulsing = phase === 'pulsing';

  /* Build geometry — EXPLODED */
  const geo = [];
  let z = 0;

  const L1 = LAYERS[0];
  geo.push({ ...L1, ...slabGeo(z, L1.thickness, CX, CY), baseZ: z });
  z += L1.thickness + SLAB_GAP;

  const L2 = LAYERS[1];
  geo.push({ ...L2, ...slabGeo(z, L2.thickness, CX, CY), baseZ: z });
  const serpBaseZ = z + L2.thickness;
  z += L2.thickness + SERP_GAP;

  const L3 = LAYERS[2];
  const serpZ = serpBaseZ + SERP_GAP * 0.5;
  const serpPath = buildSerpentinePath(serpZ, CX, CY);
  geo.push({
    ...L3,
    baseZ: serpZ,
    isSerpentina: true,
    path: serpPath,
    c: {
      tnl: iso(-SLAB_W, SLAB_D, serpZ + 6, CX, CY),
      bnl: iso(-SLAB_W, SLAB_D, serpZ, CX, CY),
      tfr: iso(SLAB_W, -SLAB_D, serpZ + 6, CX, CY),
      bfr: iso(SLAB_W, -SLAB_D, serpZ, CX, CY),
      tfl: iso(-SLAB_W, -SLAB_D, serpZ + 6, CX, CY),
      tnr: iso(SLAB_W, SLAB_D, serpZ + 6, CX, CY),
    },
  });
  z = serpZ + 12 + SLAB_GAP;

  const L4 = LAYERS[3];
  geo.push({ ...L4, ...slabGeo(z, L4.thickness, CX, CY), baseZ: z });
  z += L4.thickness + SLAB_GAP;

  const L5 = LAYERS[4];
  const parquetGeo = slabGeo(z, L5.thickness, CX, CY);
  const parquetPlanks = buildParquetPlanks(z, L5.thickness, CX, CY);
  const explodedParquetZ = z;
  geo.push({ ...L5, ...parquetGeo, baseZ: z, isParquet: true, planks: parquetPlanks });

  /* Build geometry — COMPRESSED */
  const compressedParquetZ = L1.thickness;
  const compressedGeo = slabGeo(compressedParquetZ, L5.thickness, CX, CY);
  const compressedSerpZ = L1.thickness + 2;
  const compressedSerpPath = buildSerpentinePath(compressedSerpZ, CX, CY);

  const compressDeltaY = explodedParquetZ - compressedParquetZ;

  const serpLengthVal = SERP_LENGTH;
  const COMPRESS_EASE = 'cubic-bezier(0.4, 0, 0.2, 1)';
  const COMPRESS_T = COMPRESS_DURATION + 'ms';

  return (
    <div ref={ref} className="w-full overflow-hidden">
      <div className="relative max-w-4xl mx-auto">
        <div key={animKey} className="relative w-full" style={{ aspectRatio: SVG_W + ' / ' + SVG_H }}>

          <style dangerouslySetInnerHTML={{ __html: [
            '@keyframes drawSerp {',
            '  from { stroke-dashoffset: ' + serpLengthVal + '; }',
            '  to   { stroke-dashoffset: 0; }',
            '}',
            '@keyframes glowPulse {',
            '  0%, 100% { filter: drop-shadow(0 0 3px rgba(234,88,12,0.3)); }',
            '  50%      { filter: drop-shadow(0 0 10px rgba(234,88,12,0.7)); }',
            '}',
            '@keyframes heatPulse {',
            '  0%   { opacity: 0; }',
            '  15%  { opacity: 0.10; }',
            '  35%  { opacity: 0.02; }',
            '  50%  { opacity: 0.10; }',
            '  70%  { opacity: 0.02; }',
            '  85%  { opacity: 0.10; }',
            '  100% { opacity: 0; }',
            '}',
            '@keyframes tubePulseStroke {',
            '  0%   { stroke: #fdba74; stroke-width: 4; }',
            '  15%  { stroke: #ea580c; stroke-width: 6; }',
            '  35%  { stroke: #fdba74; stroke-width: 4; }',
            '  50%  { stroke: #ea580c; stroke-width: 6; }',
            '  70%  { stroke: #fdba74; stroke-width: 4; }',
            '  85%  { stroke: #ea580c; stroke-width: 6; }',
            '  100% { stroke: #fdba74; stroke-width: 4; }',
            '}',
            '@keyframes heatGlow {',
            '  0%   { filter: drop-shadow(0 0 0px rgba(234,88,12,0)); }',
            '  15%  { filter: drop-shadow(0 0 6px rgba(234,88,12,0.3)); }',
            '  35%  { filter: drop-shadow(0 0 2px rgba(234,88,12,0.08)); }',
            '  50%  { filter: drop-shadow(0 0 6px rgba(234,88,12,0.3)); }',
            '  70%  { filter: drop-shadow(0 0 2px rgba(234,88,12,0.08)); }',
            '  85%  { filter: drop-shadow(0 0 6px rgba(234,88,12,0.3)); }',
            '  100% { filter: drop-shadow(0 0 0px rgba(234,88,12,0)); }',
            '}',
            '@keyframes floorWarmth {',
            '  0%   { filter: brightness(1) drop-shadow(0 -4px 6px rgba(234,88,12,0)); }',
            '  15%  { filter: brightness(1.18) drop-shadow(0 -8px 14px rgba(234,88,12,0.3)); }',
            '  35%  { filter: brightness(1.05) drop-shadow(0 -3px 5px rgba(234,88,12,0.06)); }',
            '  50%  { filter: brightness(1.18) drop-shadow(0 -8px 14px rgba(234,88,12,0.3)); }',
            '  70%  { filter: brightness(1.05) drop-shadow(0 -3px 5px rgba(234,88,12,0.06)); }',
            '  85%  { filter: brightness(1.18) drop-shadow(0 -8px 14px rgba(234,88,12,0.3)); }',
            '  100% { filter: brightness(1) drop-shadow(0 -4px 6px rgba(234,88,12,0)); }',
            '}',
            '@keyframes heatRise {',
            '  0%   { opacity: 0; transform: translateY(0); }',
            '  20%  { opacity: 0.6; }',
            '  50%  { opacity: 0.35; transform: translateY(-18px); }',
            '  80%  { opacity: 0.12; transform: translateY(-36px); }',
            '  100% { opacity: 0; transform: translateY(-48px); }',
            '}',
            '.serp-tube {',
            '  stroke-dasharray: ' + serpLengthVal + ';',
            '  stroke-dashoffset: ' + serpLengthVal + ';',
            '}',
            '.serp-tube.animate {',
            '  animation: drawSerp 2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;',
            '}',
            '.serp-glow.animate {',
            '  animation: glowPulse 2s ease-in-out infinite;',
            '  animation-delay: 3.5s;',
            '}',
            '.heat-pulse-overlay {',
            '  animation: heatPulse ' + PULSE_DURATION + 'ms ease-in-out forwards;',
            '}',
            '.heat-tube-pulse {',
            '  animation: tubePulseStroke ' + PULSE_DURATION + 'ms ease-in-out forwards;',
            '}',
            '.heat-glow-group {',
            '  animation: heatGlow ' + PULSE_DURATION + 'ms ease-in-out forwards;',
            '}',
            '.floor-warmth {',
            '  animation: floorWarmth ' + PULSE_DURATION + 'ms ease-in-out forwards;',
            '}',
            '.heat-rise-wisp {',
            '  animation: heatRise 1.8s ease-out forwards;',
            '}',
          ].join('\n') }} />

          <svg viewBox={'0 0 ' + SVG_W + ' ' + SVG_H} className="absolute inset-0 w-full h-full">
            <defs>
              <pattern id="heatConcrete" width="20" height="20" patternUnits="userSpaceOnUse">
                <rect width="20" height="20" fill="none" />
                <circle cx="3" cy="5" r="1" fill="#000" opacity="0.06" />
                <circle cx="12" cy="3" r="0.8" fill="#000" opacity="0.05" />
                <circle cx="8" cy="14" r="1.2" fill="#000" opacity="0.04" />
                <circle cx="17" cy="10" r="0.7" fill="#000" opacity="0.06" />
                <circle cx="5" cy="18" r="0.9" fill="#000" opacity="0.05" />
              </pattern>
              <pattern id="heatBumps" width="28" height="28" patternUnits="userSpaceOnUse">
                <rect width="28" height="28" fill="none" />
                <circle cx="7" cy="7" r="5" fill="#475569" opacity="0.5" />
                <circle cx="21" cy="7" r="5" fill="#475569" opacity="0.5" />
                <circle cx="7" cy="21" r="5" fill="#475569" opacity="0.5" />
                <circle cx="21" cy="21" r="5" fill="#475569" opacity="0.5" />
                <circle cx="14" cy="14" r="5" fill="#475569" opacity="0.5" />
                <circle cx="6" cy="6" r="2" fill="#64748b" opacity="0.35" />
                <circle cx="20" cy="6" r="2" fill="#64748b" opacity="0.35" />
                <circle cx="6" cy="20" r="2" fill="#64748b" opacity="0.35" />
                <circle cx="20" cy="20" r="2" fill="#64748b" opacity="0.35" />
                <circle cx="13" cy="13" r="2" fill="#64748b" opacity="0.35" />
              </pattern>
              <pattern id="heatBumpsSide" width="14" height="14" patternUnits="userSpaceOnUse">
                <rect width="14" height="14" fill="none" />
                <circle cx="7" cy="4" r="3" fill="#1e293b" opacity="0.3" />
                <circle cx="7" cy="11" r="2" fill="#1e293b" opacity="0.2" />
              </pattern>
              <pattern id="heatSmooth" width="30" height="30" patternUnits="userSpaceOnUse">
                <rect width="30" height="30" fill="none" />
                <circle cx="10" cy="8" r="0.6" fill="#000" opacity="0.04" />
                <circle cx="25" cy="20" r="0.5" fill="#000" opacity="0.03" />
              </pattern>
              <linearGradient id="tubeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fb923c" />
                <stop offset="50%" stopColor="#ea580c" />
                <stop offset="100%" stopColor="#c2410c" />
              </linearGradient>
              <linearGradient id="heatOverlayGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fb923c" />
                <stop offset="50%" stopColor="#ea580c" />
                <stop offset="100%" stopColor="#fb923c" />
              </linearGradient>
              <linearGradient id="heatRiseGrad" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="#ea580c" stopOpacity="0.55" />
                <stop offset="30%" stopColor="#fb923c" stopOpacity="0.35" />
                <stop offset="70%" stopColor="#fdba74" stopOpacity="0.12" />
                <stop offset="100%" stopColor="#fdba74" stopOpacity="0" />
              </linearGradient>
              <pattern id="heatWoodGrain" width="40" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(-30)">
                <rect width="40" height="12" fill="none" />
                <line x1="0" y1="3" x2="40" y2="3" stroke="#8b6f47" strokeWidth="0.5" opacity="0.15" />
                <line x1="0" y1="6" x2="40" y2="6.5" stroke="#704c2a" strokeWidth="0.4" opacity="0.12" />
                <line x1="0" y1="9" x2="40" y2="9" stroke="#9a7a5f" strokeWidth="0.4" opacity="0.14" />
                <line x1="0" y1="11" x2="40" y2="11.3" stroke="#6b5544" strokeWidth="0.3" opacity="0.10" />
              </pattern>
            </defs>

            {geo.map((g, i) => {
              const delay = layerDelay(i);

              /* ── SERPENTINA ── */
              if (g.isSerpentina) {
                const isLeft = i % 2 === 0;
                const anchorY = isLeft ? (g.c.tnl[1] + g.c.bnl[1]) / 2 : (g.c.tfr[1] + g.c.bfr[1]) / 2;
                const dotX = isLeft ? g.c.tnl[0] - 4 : g.c.tfr[0] + 4;
                const endX = isLeft ? g.c.tnl[0] - 50 : g.c.tfr[0] + 50;
                return (
                  <g
                    key={g.num}
                    className={show && !compressing ? 'serp-glow animate' : ''}
                    style={{
                      opacity: show && !compressing ? 1 : 0,
                      transform: show
                        ? (compressing ? 'translateY(' + compressDeltaY + 'px) scale(0.95)' : 'translateY(0)')
                        : 'translateY(' + SLIDE + 'px)',
                      transition: compressing
                        ? 'opacity 0.6s ease, transform ' + COMPRESS_T + ' ' + COMPRESS_EASE
                        : 'opacity 1.6s cubic-bezier(0.16,1,0.3,1) ' + delay + 's, transform 1.6s cubic-bezier(0.16,1,0.3,1) ' + delay + 's',
                    }}
                  >
                    <path d={g.path} fill="none" stroke="#7c2d12" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" opacity="0.2"
                      className={'serp-tube' + (show ? ' animate' : '')} style={{ animationDelay: (delay + 0.3) + 's' }} />
                    <path d={g.path} fill="none" stroke="url(#tubeGrad)" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round"
                      className={'serp-tube' + (show ? ' animate' : '')} style={{ animationDelay: (delay + 0.3) + 's' }} />
                    <path d={g.path} fill="none" stroke="#fdba74" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"
                      className={'serp-tube' + (show ? ' animate' : '')} style={{ animationDelay: (delay + 0.3) + 's' }} />
                    <g style={{ opacity: show && !compressing ? 1 : 0, transition: compressing ? 'opacity 0.4s ease' : 'opacity 1s ease ' + (delay + 0.8) + 's' }}>
                      <circle cx={dotX} cy={anchorY} r="3.5" fill="#ea580c" />
                      <line x1={dotX} y1={anchorY} x2={endX} y2={anchorY} stroke="#ea580c" strokeWidth="2.2" strokeDasharray="6,4" opacity="0.6" />
                    </g>
                  </g>
                );
              }

              /* ── PARQUET ── */
              if (g.isParquet) {
                const isLeft = i % 2 === 0;
                const anchorY = isLeft ? (g.c.tnl[1] + g.c.bnl[1]) / 2 : (g.c.tfr[1] + g.c.bfr[1]) / 2;
                const dotX = isLeft ? g.c.tnl[0] - 4 : g.c.tfr[0] + 4;
                const endX = isLeft ? g.c.tnl[0] - 50 : g.c.tfr[0] + 50;
                return (
                  <g
                    key={g.num}
                    className={pulsing ? 'floor-warmth' : ''}
                    style={{
                      opacity: show ? 1 : 0,
                      transform: show
                        ? (compressing ? 'translateY(' + compressDeltaY + 'px)' : 'translateY(0)')
                        : 'translateY(' + SLIDE + 'px)',
                      transition: compressing
                        ? 'transform ' + COMPRESS_T + ' ' + COMPRESS_EASE
                        : 'opacity 1.6s cubic-bezier(0.16,1,0.3,1) ' + delay + 's, transform 1.6s cubic-bezier(0.16,1,0.3,1) ' + delay + 's',
                    }}
                  >
                    <polygon points={g.right} fill={g.rightColor} stroke="#00000010" strokeWidth="0.5" />
                    <polygon points={g.front} fill={g.frontColor} stroke="#00000010" strokeWidth="0.5" />
                    {g.planks.map((plank, pi) => {
                      const plankDelay = delay + 0.04 * pi;
                      const r = Math.round(180 * plank.lum + 40);
                      const gC = Math.round(145 * plank.lum + 35);
                      const b = Math.round(95 * plank.lum + 20);
                      return (
                        <polygon
                          key={'plank-' + pi}
                          points={plank.points}
                          fill={'rgb(' + r + ',' + gC + ',' + b + ')'}
                          stroke="#9a7a5f"
                          strokeWidth="0.6"
                          style={{
                            opacity: show ? 1 : 0,
                            transform: show ? 'translateY(0)' : 'translateY(12px)',
                            transition: 'opacity 0.5s ease ' + plankDelay + 's, transform 0.5s ease ' + plankDelay + 's',
                          }}
                        />
                      );
                    })}
                    <polygon points={g.top} fill="url(#heatWoodGrain)" style={{ pointerEvents: 'none' }} />
                    <g style={{ opacity: show && !compressing ? 1 : 0, transition: compressing ? 'opacity 0.4s ease' : 'opacity 1s ease ' + (delay + 0.8) + 's' }}>
                      <circle cx={dotX} cy={anchorY} r="3.5" fill={g.frontColor} />
                      <line x1={dotX} y1={anchorY} x2={endX} y2={anchorY} stroke={g.frontColor} strokeWidth="2.2" strokeDasharray="6,4" opacity="0.6" />
                    </g>
                  </g>
                );
              }

              /* ── REGULAR SLAB ── */
              const isLeft = i % 2 === 0;
              const anchorY = isLeft ? (g.c.tnl[1] + g.c.bnl[1]) / 2 : (g.c.tfr[1] + g.c.bfr[1]) / 2;
              const dotX = isLeft ? g.c.tnl[0] - 4 : g.c.tfr[0] + 4;
              const endX = isLeft ? g.c.tnl[0] - 50 : g.c.tfr[0] + 50;

              const isBase = i === 0;
              const hideOnCompress = !isBase;

              return (
                <g
                  key={g.num}
                  style={{
                    opacity: show ? (compressing && hideOnCompress ? 0 : 1) : 0,
                    transform: show
                      ? (compressing && hideOnCompress ? 'translateY(20px) scale(0.96)' : 'translateY(0)')
                      : 'translateY(' + SLIDE + 'px)',
                    transition: compressing
                      ? 'opacity 0.6s ease, transform ' + COMPRESS_T + ' ' + COMPRESS_EASE
                      : 'opacity 1.6s cubic-bezier(0.16,1,0.3,1) ' + delay + 's, transform 1.6s cubic-bezier(0.16,1,0.3,1) ' + delay + 's',
                  }}
                >
                  <polygon points={g.right} fill={g.rightColor} stroke="#00000010" strokeWidth="0.5" />
                  <polygon points={g.front} fill={g.frontColor} stroke="#00000010" strokeWidth="0.5" />
                  <polygon points={g.top} fill={g.topColor} stroke="#00000010" strokeWidth="0.5" />
                  {g.pattern === 'concrete' && <polygon points={g.top} fill="url(#heatConcrete)" />}
                  {g.pattern === 'bumps' && (
                    <>
                      <polygon points={g.top} fill="url(#heatBumps)" />
                      <polygon points={g.front} fill="url(#heatBumpsSide)" />
                      <polygon points={g.right} fill="url(#heatBumpsSide)" />
                    </>
                  )}
                  {g.pattern === 'smooth' && <polygon points={g.top} fill="url(#heatSmooth)" />}
                  <g style={{ opacity: show && !compressing ? 1 : 0, transition: compressing ? 'opacity 0.4s ease' : 'opacity 1s ease ' + (delay + 0.8) + 's' }}>
                    <circle cx={dotX} cy={anchorY} r="3.5" fill={g.frontColor} />
                    <line x1={dotX} y1={anchorY} x2={endX} y2={anchorY} stroke={g.frontColor} strokeWidth="2.2" strokeDasharray="6,4" opacity="0.6" />
                  </g>
                </g>
              );
            })}

            {/* ── PULSING: tubes underneath + heat shimmer rising ── */}
            {pulsing && (
              <g>
                {/* Tubes visible underneath */}
                <g className="heat-glow-group" opacity="0.55">
                  <path d={compressedSerpPath} fill="none" stroke="#7c2d12" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" opacity="0.12" />
                  <path d={compressedSerpPath} fill="none" stroke="url(#tubeGrad)" strokeLinecap="round" strokeLinejoin="round"
                    className="heat-tube-pulse"
                    style={{ strokeDasharray: 'none', strokeDashoffset: 0 }} />
                </g>
                {/* Subtle warm tint on parquet surface */}
                <polygon
                  points={compressedGeo.top}
                  fill="url(#heatOverlayGrad)"
                  className="heat-pulse-overlay"
                  style={{ mixBlendMode: 'overlay' }}
                />
                {/* Vertical heat lines rising from across the parquet surface */}
                {(() => {
                  const c = compressedGeo.c;
                  const lines = [];
                  const cols = 6;
                  const rows = 5;
                  let idx = 0;
                  for (let r = 0; r < rows; r++) {
                    for (let cIdx = 0; cIdx < cols; cIdx++) {
                      const u = (cIdx + 0.5 + (r % 2 === 0 ? 0 : 0.4)) / cols;
                      const v = (r + 0.5) / rows;
                      if (u < 0.05 || u > 0.95 || v < 0.05 || v > 0.95) continue;
                      const topL = c.tfl;
                      const topR = c.tfr;
                      const botL = c.tnl;
                      const botR = c.tnr;
                      const tx = topL[0] + u * (topR[0] - topL[0]);
                      const ty = topL[1] + u * (topR[1] - topL[1]);
                      const bx = botL[0] + u * (botR[0] - botL[0]);
                      const by = botL[1] + u * (botR[1] - botL[1]);
                      const px = tx + v * (bx - tx);
                      const py = ty + v * (by - ty);
                      const seed = r * 17 + cIdx * 31;
                      const h = 18 + (seed % 14);
                      const del = (idx * 0.22) + (seed % 100) * 0.005;
                      const dur = 1.4 + (seed % 8) * 0.12;
                      lines.push(
                        <line
                          key={'hl-' + idx}
                          x1={px} y1={py}
                          x2={px} y2={py - h}
                          stroke="url(#heatRiseGrad)"
                          strokeWidth={1.2 + (seed % 3) * 0.3}
                          strokeLinecap="round"
                          className="heat-rise-wisp"
                          style={{
                            animationDelay: del + 's',
                            animationDuration: dur + 's',
                          }}
                        />
                      );
                      idx++;
                    }
                  }
                  return lines;
                })()}
              </g>
            )}

          </svg>

          {/* HTML LABELS */}
          {geo.map((g, i) => {
            const delay = layerDelay(i);
            const isLeft = i % 2 === 0;
            const anchorY = isLeft ? (g.c.tnl[1] + g.c.bnl[1]) / 2 : (g.c.tfr[1] + g.c.bfr[1]) / 2;
            const topPct = (anchorY / SVG_H) * 100;
            const endX = isLeft ? g.c.tnl[0] - 50 : g.c.tfr[0] + 50;
            const labelX = isLeft ? endX - 8 : endX + 8;
            const leftPct = (labelX / SVG_W) * 100;
            return (
              <div
                key={'lbl-' + g.num}
                className="absolute pointer-events-none flex items-center"
                style={{
                  top: topPct + '%',
                  gap: '0.15rem',
                  ...(isLeft
                    ? { right: (100 - leftPct) + '%', flexDirection: 'row-reverse' }
                    : { left: leftPct + '%', flexDirection: 'row' }),
                  transform: 'translateY(-50%)',
                  opacity: show && !compressing ? 1 : 0,
                  transition: compressing
                    ? 'opacity 0.5s ease'
                    : 'opacity 1s ease ' + (delay + 0.8) + 's',
                }}
              >
                <span className="font-black text-[8px] md:text-[10px] leading-none" style={{ color: g.frontColor }}>
                  {g.num}
                </span>
                <span className="text-[7px] md:text-[9px] uppercase leading-none whitespace-nowrap text-slate-500 font-medium" style={{ letterSpacing: '-0.03em' }}>
                  {g.short}
                </span>
              </div>
            );
          })}

        </div>
      </div>
    </div>
  );
}

export default FloorHeatingExploder;
