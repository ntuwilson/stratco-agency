'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ArrowNeIcon } from '@/components/StratcoVectors';

/**
 * 16 real compressed Stratco production photographs across UCC Conference,
 * Trust Empowerment Programme (TEP), and Digital Skilling for Women (50+ Districts).
 */
const BOWL_PHOTOS: { src: string; aspect: number }[] = [
  { src: '/images/ucc/0R7A9106.jpg', aspect: 1.5 },
  { src: '/images/ftb/6F1A1300.jpg', aspect: 1.5 },
  { src: '/images/dlw/UCC00169.jpg', aspect: 1.5 },
  { src: '/images/ucc/0R7A9084.jpg', aspect: 1.35 },
  { src: '/images/ftb/6F1A1420.jpg', aspect: 0.85 },
  { src: '/images/dlw/UCC0362.jpg', aspect: 0.85 },
  { src: '/images/ucc/0R7A8991.jpg', aspect: 1.45 },
  { src: '/images/ftb/6F1A1487.jpg', aspect: 1.5 },
  { src: '/images/dlw/UCC00269.jpg', aspect: 0.85 },
  { src: '/images/ucc/0R7A8854.jpg', aspect: 0.88 },
  { src: '/images/ftb/6F1A1298.jpg', aspect: 0.88 },
  { src: '/images/dlw/UCC0C130.jpg', aspect: 1.48 },
  { src: '/images/ucc/0R7A8840.jpg', aspect: 1.5 },
  { src: '/images/ftb/6F1A2487.jpg', aspect: 1.5 },
  { src: '/images/dlw/UCCB114.jpg', aspect: 1.48 },
  { src: '/images/ftb/6F1A2122.jpg', aspect: 1.5 },
];

interface BowlPlate {
  baseX: number;
  baseY: number;
  width: number;
  height: number;
  photoIdx: number;
}

/**
 * Organically spaced 3D plates across the periodic concave bowl domain [-8.4, 8.4] x [-5.6, 5.6].
 * Leaves generous obsidian breathing room between sharp photographs (no jammed grid or blur),
 * curving forward & large around the outer rim while receding compactly into the deep center.
 */
const BOWL_PLATES: BowlPlate[] = [
  // Outer & mid-left arc
  { baseX: -5.4, baseY: 0.2, width: 2.35, height: 1.62, photoIdx: 0 },
  { baseX: -4.6, baseY: 2.85, width: 2.25, height: 1.5, photoIdx: 1 },
  { baseX: -4.9, baseY: -2.75, width: 2.3, height: 1.55, photoIdx: 3 },
  { baseX: -7.4, baseY: -1.35, width: 2.2, height: 1.48, photoIdx: 7 },
  { baseX: -7.2, baseY: 2.1, width: 1.85, height: 2.1, photoIdx: 4 },

  // Outer & mid-right arc
  { baseX: 5.35, baseY: -0.25, width: 2.35, height: 1.58, photoIdx: 2 },
  { baseX: 4.65, baseY: 2.8, width: 2.25, height: 1.5, photoIdx: 6 },
  { baseX: 4.85, baseY: -2.85, width: 2.25, height: 1.52, photoIdx: 11 },
  { baseX: 7.35, baseY: 1.45, width: 2.2, height: 1.48, photoIdx: 13 },
  { baseX: 7.15, baseY: -2.15, width: 1.85, height: 2.1, photoIdx: 5 },

  // Upper & lower bowl curvature
  { baseX: -1.55, baseY: 3.45, width: 2.15, height: 1.44, photoIdx: 12 },
  { baseX: 1.75, baseY: 3.55, width: 1.8, height: 2.02, photoIdx: 9 },
  { baseX: -1.75, baseY: -3.45, width: 1.82, height: 2.05, photoIdx: 10 },
  { baseX: 1.65, baseY: -3.5, width: 2.2, height: 1.48, photoIdx: 15 },
  { baseX: 0.05, baseY: 4.85, width: 2.25, height: 1.5, photoIdx: 14 },
  { baseX: -0.15, baseY: -4.85, width: 2.25, height: 1.5, photoIdx: 8 },

  // Deeper recessed inner-bowl plates (smaller in perspective, framing the center void)
  { baseX: -2.65, baseY: 1.25, width: 1.72, height: 1.18, photoIdx: 6 },
  { baseX: 2.75, baseY: 1.35, width: 1.52, height: 1.75, photoIdx: 8 },
  { baseX: -2.55, baseY: -1.35, width: 1.52, height: 1.75, photoIdx: 5 },
  { baseX: 2.65, baseY: -1.3, width: 1.75, height: 1.2, photoIdx: 0 },
  { baseX: -0.85, baseY: 1.75, width: 1.48, height: 1.02, photoIdx: 3 },
  { baseX: 0.95, baseY: -1.75, width: 1.48, height: 1.02, photoIdx: 1 },
];

const VERTEX_SHADER = `
attribute vec2 aGridUv;

uniform vec2 uCardCenter;
uniform vec2 uCardSize;
uniform float uAspect;

varying vec2 vLocalUv;
varying float vDepthNorm;

void main() {
  vLocalUv = aGridUv;

  vec2 centered = aGridUv - 0.5;
  vec2 localOffset = centered * uCardSize;
  vec2 sheetPos = uCardCenter + localOffset;

  // =========================================================================
  // REFINED 3D CONCAVE BOWL GEOMETRY (MINIMAL STRETCH, NATURAL PROPORTIONS)
  // - Depth is anchored by the card's center position in the bowl so individual
  //   photographs never stretch across steep depth gradients.
  // - Gentle ~10 deg inward tilt + subtle dish curve preserves the 3D bowl feel.
  // =========================================================================
  float rCenter2 = dot(uCardCenter, uCardCenter);
  float rCenter = sqrt(rCenter2);
  vec2 radialDir = rCenter > 0.001 ? (uCardCenter / rCenter) : vec2(0.0);

  float zDeep = -10.8;
  float zRise = min(rCenter2 * 0.14, 4.6);
  float gentleInwardTilt = dot(localOffset, radialDir) * min(rCenter * 0.038, 0.20);
  float gentleCurve = -dot(centered, centered) * 0.04;
  float z = zDeep + zRise + gentleInwardTilt + gentleCurve;

  float inwardPull = 1.0 / (1.0 + rCenter2 * 0.006);
  vec2 xy = uCardCenter * inwardPull + localOffset;

  vDepthNorm = clamp(zRise / 4.6, 0.0, 1.0);

  float f = 1.85;
  float zNear = 0.8;
  float zFar = 28.0;

  vec4 clip;
  clip.x = (xy.x * f) / max(uAspect, 0.55);
  clip.y = xy.y * f;
  clip.z = (z * (zFar + zNear) + 2.0 * zFar * zNear) / (zNear - zFar);
  clip.w = -z;

  gl_Position = clip;
}
`;

const FRAGMENT_SHADER = `
precision highp float;

varying vec2 vLocalUv;
varying float vDepthNorm;

uniform sampler2D uAtlas;
uniform vec2 uAtlasSlot;
uniform float uCardAspect;
uniform float uCardAlpha;
uniform float uReady;

void main() {
  // Preserve 1:1 natural photo proportions (object-fit: cover) with zero stretch
  vec2 uv = vec2(vLocalUv.x, 1.0 - vLocalUv.y) - 0.5;
  if (uCardAspect > 1.0) {
    uv.y /= uCardAspect;
  } else {
    uv.x *= uCardAspect;
  }
  uv += 0.5;

  vec2 safeUv = mix(vec2(0.025), vec2(0.975), clamp(uv, 0.0, 1.0));
  vec2 atlasUv = (uAtlasSlot + safeUv) * 0.25;

  vec3 tex = texture2D(uAtlas, atlasUv).rgb;

  vec2 edgeDist = min(vLocalUv, 1.0 - vLocalUv);
  float borderAa = smoothstep(0.0, 0.016, min(edgeDist.x, edgeDist.y));

  float bowlExposure = mix(0.28, 0.86, smoothstep(0.05, 0.88, vDepthNorm));
  vec3 col = tex * bowlExposure * uReady;

  float rimLine = (1.0 - smoothstep(0.010, 0.022, min(edgeDist.x, edgeDist.y))) * borderAa;
  col += vec3(1.0) * rimLine * 0.05 * vDepthNorm;

  gl_FragColor = vec4(col, borderAa * uCardAlpha);
}
`;

function createShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string
): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function buildSubdividedPlaneGrid(subdivisions: number): Float32Array {
  const verts: number[] = [];
  const step = 1 / subdivisions;
  for (let iy = 0; iy < subdivisions; iy++) {
    for (let ix = 0; ix < subdivisions; ix++) {
      const u0 = ix * step;
      const v0 = iy * step;
      const u1 = (ix + 1) * step;
      const v1 = (iy + 1) * step;

      verts.push(u0, v0, u1, v0, u0, v1);
      verts.push(u0, v1, u1, v0, u1, v1);
    }
  }
  return new Float32Array(verts);
}

function wrapCoord(val: number, halfSpan: number): number {
  const span = halfSpan * 2;
  return ((((val + halfSpan) % span) + span) % span) - halfSpan;
}

function smoothstepJs(edge0: number, edge1: number, x: number): number {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

export default function ConcaveBowlHero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const monumentRef = useRef<HTMLDivElement | null>(null);

  const [webglSupported, setWebglSupported] = useState(true);
  const [isDragging, setIsDragging] = useState(false);

  const targetPointerRef = useRef<[number, number]>([0, 0]);
  const smoothPointerRef = useRef<[number, number]>([0, 0]);
  const panOffsetRef = useRef<[number, number]>([0, 0]);
  const smoothPanRef = useRef<[number, number]>([0, 0]);
  const dragStateRef = useRef<{
    active: boolean;
    lastX: number;
    lastY: number;
    velX: number;
    velY: number;
  }>({
    active: false,
    lastX: 0,
    lastY: 0,
    velX: 0,
    velY: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    const gl =
      canvas.getContext('webgl', {
        alpha: false,
        antialias: true,
        powerPreference: 'high-performance',
      }) ||
      (canvas.getContext('experimental-webgl') as WebGLRenderingContext | null);

    if (!gl) {
      setWebglSupported(false);
      return;
    }

    const vs = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const fs = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vs || !fs) {
      setWebglSupported(false);
      return;
    }

    const program = gl.createProgram();
    if (!program) {
      setWebglSupported(false);
      return;
    }
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      setWebglSupported(false);
      return;
    }
    gl.useProgram(program);

    // Subdivided 8x8 mesh per plate so each card curves smoothly along the 3D sphere
    const subdivisions = 8;
    const planeVerts = buildSubdividedPlaneGrid(subdivisions);
    const vertexCount = planeVerts.length / 2;

    const gridBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, gridBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, planeVerts, gl.STATIC_DRAW);

    const aGridUv = gl.getAttribLocation(program, 'aGridUv');
    gl.enableVertexAttribArray(aGridUv);
    gl.vertexAttribPointer(aGridUv, 2, gl.FLOAT, false, 0, 0);

    const uCardCenterLoc = gl.getUniformLocation(program, 'uCardCenter');
    const uCardSizeLoc = gl.getUniformLocation(program, 'uCardSize');
    const uAspectLoc = gl.getUniformLocation(program, 'uAspect');
    const uAtlasLoc = gl.getUniformLocation(program, 'uAtlas');
    const uAtlasSlotLoc = gl.getUniformLocation(program, 'uAtlasSlot');
    const uCardAspectLoc = gl.getUniformLocation(program, 'uCardAspect');
    const uCardAlphaLoc = gl.getUniformLocation(program, 'uCardAlpha');
    const uReadyLoc = gl.getUniformLocation(program, 'uReady');

    // High-resolution POT atlas (4096x4096 if supported, else 2048x2048) for tack-sharp photos
    const maxTex = gl.getParameter(gl.MAX_TEXTURE_SIZE) || 2048;
    const atlasDim = maxTex >= 4096 ? 4096 : 2048;
    const cellDim = atlasDim / 4;

    const atlasCanvas = document.createElement('canvas');
    atlasCanvas.width = atlasDim;
    atlasCanvas.height = atlasDim;
    const atlasCtx = atlasCanvas.getContext('2d');

    if (atlasCtx) {
      atlasCtx.fillStyle = '#111116';
      atlasCtx.fillRect(0, 0, atlasDim, atlasDim);
    }

    const atlasTex = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, atlasTex);
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      atlasCanvas
    );
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(
      gl.TEXTURE_2D,
      gl.TEXTURE_MIN_FILTER,
      gl.LINEAR_MIPMAP_LINEAR
    );
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.generateMipmap(gl.TEXTURE_2D);

    gl.uniform1i(uAtlasLoc, 0);

    let cancelled = false;
    let loadedCount = 0;
    let readyProgress = 0.15;

    const uploadAtlas = () => {
      if (cancelled) return;
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, atlasTex);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        atlasCanvas
      );
      gl.generateMipmap(gl.TEXTURE_2D);
    };

    BOWL_PHOTOS.forEach((item, idx) => {
      const img = new Image();
      img.decoding = 'async';
      img.onload = () => {
        if (cancelled || !atlasCtx) return;
        const cx = (idx % 4) * cellDim;
        const cy = Math.floor(idx / 4) * cellDim;

        const iw = img.naturalWidth || 1;
        const ih = img.naturalHeight || 1;
        const scale = Math.max(cellDim / iw, cellDim / ih);
        const sw = cellDim / scale;
        const sh = cellDim / scale;
        const sx = (iw - sw) * 0.5;
        const sy = (ih - sh) * 0.5;

        atlasCtx.drawImage(img, sx, sy, sw, sh, cx, cy, cellDim, cellDim);
        loadedCount += 1;

        if (loadedCount <= 4 || loadedCount % 4 === 0 || loadedCount === 16) {
          uploadAtlas();
        }
      };
      img.src = item.src;
    });

    const handleResize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = section.getBoundingClientRect();
      const w = Math.max(1, Math.floor(rect.width * dpr));
      const h = Math.max(1, Math.floor(rect.height * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    };

    handleResize();
    const ro = new ResizeObserver(handleResize);
    ro.observe(section);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.clearColor(0.02, 0.02, 0.026, 1.0);

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const halfW = 8.8;
    const halfH = 6.0;

    let rafId = 0;
    let prevTime = performance.now();

    const render = (now: number) => {
      if (cancelled) return;
      const dt = Math.min((now - prevTime) * 0.001, 0.05);
      prevTime = now;

      // Calm, ultra-gentle ambient drift (no fast motion blur)
      if (!dragStateRef.current.active && !prefersReduced) {
        panOffsetRef.current[0] += dt * 0.14;
        panOffsetRef.current[1] += Math.sin(now * 0.0002) * dt * 0.05;
      }

      if (!dragStateRef.current.active) {
        panOffsetRef.current[0] += dragStateRef.current.velX;
        panOffsetRef.current[1] += dragStateRef.current.velY;
        dragStateRef.current.velX *= 0.92;
        dragStateRef.current.velY *= 0.92;
      }

      const [tx, ty] = targetPointerRef.current;
      smoothPointerRef.current[0] += (tx - smoothPointerRef.current[0]) * 0.055;
      smoothPointerRef.current[1] += (ty - smoothPointerRef.current[1]) * 0.055;

      const targetPanX =
        panOffsetRef.current[0] + smoothPointerRef.current[0] * 0.95;
      const targetPanY =
        panOffsetRef.current[1] + smoothPointerRef.current[1] * 0.65;

      smoothPanRef.current[0] +=
        (targetPanX - smoothPanRef.current[0]) * 0.07;
      smoothPanRef.current[1] +=
        (targetPanY - smoothPanRef.current[1]) * 0.07;

      const targetReady =
        loadedCount > 0 ? Math.min(1, 0.25 + (loadedCount / 12) * 0.75) : 0.15;
      readyProgress += (targetReady - readyProgress) * 0.06;

      gl.clear(gl.COLOR_BUFFER_BIT);

      const aspect = canvas.width / Math.max(canvas.height, 1);
      gl.uniform1f(uAspectLoc, aspect);
      gl.uniform1f(uReadyLoc, readyProgress);

      // Compute wrapped 3D bowl positions & sort back-to-front (deepest center first, closest rim last)
      const drawList = BOWL_PLATES.map((plate) => {
        const wx = wrapCoord(plate.baseX + smoothPanRef.current[0], halfW);
        const wy = wrapCoord(plate.baseY + smoothPanRef.current[1], halfH);
        const r2 = wx * wx + wy * wy;

        // Smooth fade near wrap boundary so plates never pop
        const alphaX = 1 - smoothstepJs(halfW * 0.78, halfW * 0.98, Math.abs(wx));
        const alphaY = 1 - smoothstepJs(halfH * 0.78, halfH * 0.98, Math.abs(wy));

        return {
          plate,
          wx,
          wy,
          r2,
          alpha: alphaX * alphaY,
        };
      }).sort((a, b) => a.r2 - b.r2);

      for (let i = 0; i < drawList.length; i++) {
        const item = drawList[i];
        if (item.alpha <= 0.01) continue;

        const colIdx = item.plate.photoIdx % 4;
        const rowIdx = Math.floor(item.plate.photoIdx / 4);

        gl.uniform2f(uCardCenterLoc, item.wx, item.wy);
        gl.uniform2f(uCardSizeLoc, item.plate.width, item.plate.height);
        gl.uniform2f(uAtlasSlotLoc, colIdx, rowIdx);
        gl.uniform1f(
          uCardAspectLoc,
          item.plate.width / Math.max(item.plate.height, 0.01)
        );
        gl.uniform1f(uCardAlphaLoc, item.alpha);

        gl.drawArrays(gl.TRIANGLES, 0, vertexCount);
      }

      if (monumentRef.current) {
        const px = smoothPointerRef.current[0];
        const py = smoothPointerRef.current[1];
        monumentRef.current.style.transform = `translate3d(${(px * 8).toFixed(
          2
        )}px, ${(-py * 6).toFixed(2)}px, 0)`;
      }

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      ro.disconnect();
      gl.deleteTexture(atlasTex);
      gl.deleteBuffer(gridBuffer);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, []);

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / Math.max(rect.width, 1)) * 2 - 1;
    const ny = -(((e.clientY - rect.top) / Math.max(rect.height, 1)) * 2 - 1);
    targetPointerRef.current = [nx, ny];

    if (dragStateRef.current.active) {
      const dx = (e.clientX - dragStateRef.current.lastX) / rect.width;
      const dy = (e.clientY - dragStateRef.current.lastY) / rect.height;
      dragStateRef.current.lastX = e.clientX;
      dragStateRef.current.lastY = e.clientY;
      const vx = dx * 5.2;
      const vy = -dy * 3.8;
      panOffsetRef.current[0] += vx;
      panOffsetRef.current[1] += vy;
      dragStateRef.current.velX = vx * 0.3;
      dragStateRef.current.velY = vy * 0.3;
    }
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLElement>) => {
    if ((e.target as HTMLElement).closest('a, button')) return;
    dragStateRef.current.active = true;
    dragStateRef.current.lastX = e.clientX;
    dragStateRef.current.lastY = e.clientY;
    dragStateRef.current.velX = 0;
    dragStateRef.current.velY = 0;
    setIsDragging(true);
  };

  const handlePointerUp = () => {
    if (dragStateRef.current.active) {
      dragStateRef.current.active = false;
      setIsDragging(false);
    }
  };

  const handlePointerLeave = () => {
    targetPointerRef.current = [0, 0];
    dragStateRef.current.active = false;
    setIsDragging(false);
  };

  return (
    <section
      ref={sectionRef}
      className={`hero-bowl section-dark ${isDragging ? 'is-dragging' : ''}`}
      onPointerMove={handlePointerMove}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onPointerLeave={handlePointerLeave}
    >
      {/* ====================================================================
          LAYER 1: 3D CONCAVE SPHERICAL BOWL OF CRISP STRATCO PHOTOGRAPHS
          ==================================================================== */}
      {webglSupported ? (
        <canvas
          ref={canvasRef}
          className="hero-bowl__canvas"
          aria-hidden="true"
        />
      ) : (
        <div className="hero-bowl__fallback" aria-hidden="true">
          {BOWL_PHOTOS.slice(0, 12).map((item, i) => (
            <div key={item.src} className={`hero-bowl__fallback-cell cell-${i}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.src} alt="" />
            </div>
          ))}
        </div>
      )}

      {/* Subtle optical radial scrim keeping center cavity calm & readable */}
      <div className="hero-bowl__vignette" aria-hidden="true" />

      {/* ====================================================================
          LAYER 2: MONUMENTAL IMMERSIVE HEADLINE + CLEAN BOTTOM ACTION LINE
          ==================================================================== */}
      <div className="container hero-bowl__inner">
        <div className="hero-bowl__spacer" aria-hidden="true" />

        <div ref={monumentRef} className="hero-bowl__center">
          <h1 className="hero-bowl__title">
            <span className="hero-bowl__line hero-bowl__line--mist">
              SHAPING WHAT
            </span>
            <span className="hero-bowl__line hero-bowl__line--focal">
              MILLIONS
            </span>
            <span className="hero-bowl__line hero-bowl__line--submerged">
              REMEMBER
            </span>
          </h1>

          <p className="hero-bowl__copy">
            Strategy, commercial cinema, national documentaries, and live
            broadcast stages—crafted to move a nation.
          </p>
        </div>

        {/* ==================================================================
            CLEAN BOTTOM LINE: ONLY "Our Work" & "Get your project done"
            ================================================================== */}
        <div className="hero-bowl__dock">
          <a href="#work" className="kn-hero-scroll-link hero-bowl__work-link">
            <span>Our Work</span>
            <span aria-hidden="true">↓</span>
          </a>

          <a href="#contact" className="btn-zj">
            <span className="btn-zj__label">Get your project done</span>
            <span className="btn-zj__tile">
              <ArrowNeIcon />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
