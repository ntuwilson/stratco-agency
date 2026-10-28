'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import {
  CASE_STUDIES,
  CaseStudy,
  WORK_FILTERS,
  WorkFilterCategory,
} from '@/data/stratcoData';
import { ArrowNeIcon } from '@/components/StratcoVectors';
import { trackEvent } from '@/config/analytics';

export type KononenkoIndexMode = 'grid' | 'list' | 'gallery';

interface FlatGalleryFrame {
  globalIdx: number;
  src: string;
  shotTitle: string;
  rawTag: string;
  caption: string;
  projectCode: string;
  portrait: boolean;
  caseStudy: CaseStudy;
}

// Gallery canvas: a pannable sheet larger than the viewport, frames scattered on a jittered cell grid
const CANVAS_COLS = 6;
const CANVAS_CELL = 380;

function formatShotTitle(tag?: string, fallback?: string): string {
  if (!tag) return fallback || 'Production Frame';
  const cleaned = tag.replace(/^\d+\s*\/\s*/, '').trim();
  return cleaned
    .toLowerCase()
    .replace(/\b\w/g, (ch) => ch.toUpperCase())
    .replace(/\bUcc\b/g, 'UCC')
    .replace(/\bLed\b/g, 'LED')
    .replace(/\bImag\b/g, 'IMAG')
    .replace(/\bCeo\b/g, 'CEO')
    .replace(/\bQ&a\b/gi, 'Q&A')
    .replace(/\bTep\b/g, 'TEP');
}

function getProjectCode(cs: CaseStudy): string {
  if (cs.slug === 'ucc-data-protection-2025') return 'UCC · 2025';
  if (cs.slug === 'trust-empowerment-programme') return 'TEP · 2026';
  if (cs.slug === 'digital-skilling-for-women') return 'DLW · 2024–26';
  return cs.timeline || 'Stratco';
}

// Deterministic 0–1 noise so the scattered gallery keeps the same layout between renders
function noise(i: number, k: number): number {
  const v = Math.sin(i * 12.9898 + k * 78.233) * 43758.5453;
  return v - Math.floor(v);
}

function getCanvasPlacement(idx: number, portrait: boolean) {
  const col = idx % CANVAS_COLS;
  const row = Math.floor(idx / CANVAS_COLS);
  const width = portrait
    ? CANVAS_CELL * (0.44 + noise(idx, 1) * 0.2)
    : CANVAS_CELL * (0.62 + noise(idx, 1) * 0.32);
  const height = portrait ? width * 1.3 : width * 0.66;
  const slackX = CANVAS_CELL - width - 16;
  const slackY = CANVAS_CELL - height - 16;
  return {
    left: col * CANVAS_CELL + 8 + noise(idx, 2) * Math.max(slackX, 0),
    top: row * CANVAS_CELL + 8 + noise(idx, 3) * Math.max(slackY, 0),
    width,
    height,
  };
}

export default function WorkShowcase({
  headingAs: Heading = 'h2',
}: {
  // h1 on the standalone /work page, h2 inside the home page
  headingAs?: 'h1' | 'h2';
} = {}) {
  const [workIndexMode, setWorkIndexMode] =
    useState<KononenkoIndexMode>('grid');
  const [activeFilter, setActiveFilter] =
    useState<WorkFilterCategory>('All Work');

  // Interactive per-card hover scrub state: { [caseId]: frameIndex }
  const [scrubMap, setScrubMap] = useState<Record<string, number>>({});

  // Interactive Gallery Lightbox index (null when closed)
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const rootRef = useRef<HTMLDivElement>(null);

  // Gallery canvas drag-to-pan
  const stageRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const pan = useRef({ x: 0, y: 0, tx: 0, ty: 0, raf: 0 });
  const drag = useRef({ active: false, moved: false, sx: 0, sy: 0, ox: 0, oy: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const filteredCases = useMemo(
    () =>
      CASE_STUDIES.filter((cs) => cs.filterCategories.includes(activeFilter)),
    [activeFilter]
  );

  const flatFrames: FlatGalleryFrame[] = useMemo(() => {
    const items: FlatGalleryFrame[] = [];
    filteredCases.forEach((cs) => {
      const code = getProjectCode(cs);
      cs.gallery.forEach((frame) => {
        items.push({
          globalIdx: items.length,
          src: frame.src,
          shotTitle: formatShotTitle(frame.tag, cs.shortName),
          rawTag: frame.tag || `0${items.length + 1}`,
          caption: frame.caption,
          projectCode: code,
          portrait: frame.aspect === 'portrait',
          caseStudy: cs,
        });
      });
    });
    return items;
  }, [filteredCases]);

  const canvasRows = Math.max(1, Math.ceil(flatFrames.length / CANVAS_COLS));
  const canvasW = CANVAS_COLS * CANVAS_CELL;
  const canvasH = canvasRows * CANVAS_CELL;

  // Keyboard navigation & scroll lock when Lightbox is open
  useEffect(() => {
    if (lightboxIdx === null) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxIdx(null);
      } else if (e.key === 'ArrowRight') {
        setLightboxIdx((prev) =>
          prev === null ? null : (prev + 1) % flatFrames.length
        );
      } else if (e.key === 'ArrowLeft') {
        setLightboxIdx((prev) =>
          prev === null
            ? null
            : (prev - 1 + flatFrames.length) % flatFrames.length
        );
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [lightboxIdx, flatFrames.length]);

  // Scroll reveal for cards and list rows (same motion as the page's .reveal-on-scroll)
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const targets = root.querySelectorAll('.wk-reveal:not(.is-visible)');
    if (!('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [workIndexMode, filteredCases]);

  // Centre the gallery sheet whenever it opens or its contents change
  useEffect(() => {
    if (workIndexMode !== 'gallery') return;
    const stage = stageRef.current;
    const sheet = sheetRef.current;
    if (!stage || !sheet) return;
    const p = pan.current;
    p.tx = p.x = Math.min(0, (stage.clientWidth - canvasW) / 2);
    p.ty = p.y = Math.min(0, (stage.clientHeight - canvasH) / 2);
    sheet.style.transform = `translate3d(${p.x}px, ${p.y}px, 0)`;
    return () => cancelAnimationFrame(p.raf);
  }, [workIndexMode, canvasW, canvasH]);

  const isCanvasActive = () =>
    typeof window !== 'undefined' &&
    window.matchMedia('(min-width: 768px)').matches;

  const clampPan = (x: number, y: number) => {
    const stage = stageRef.current;
    if (!stage) return { x, y };
    const minX = Math.min(0, stage.clientWidth - canvasW);
    const minY = Math.min(0, stage.clientHeight - canvasH);
    return {
      x: Math.max(minX, Math.min(0, x)),
      y: Math.max(minY, Math.min(0, y)),
    };
  };

  const animatePan = () => {
    const p = pan.current;
    p.x += (p.tx - p.x) * 0.18;
    p.y += (p.ty - p.y) * 0.18;
    if (sheetRef.current) {
      sheetRef.current.style.transform = `translate3d(${p.x}px, ${p.y}px, 0)`;
    }
    if (Math.abs(p.tx - p.x) > 0.3 || Math.abs(p.ty - p.y) > 0.3) {
      p.raf = requestAnimationFrame(animatePan);
    } else {
      p.raf = 0;
    }
  };

  const handleStagePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    drag.current.moved = false;
    if (!isCanvasActive() || e.button !== 0) return;
    drag.current = {
      active: true,
      moved: false,
      sx: e.clientX,
      sy: e.clientY,
      ox: pan.current.tx,
      oy: pan.current.ty,
    };
  };

  const handleStagePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d.active) return;
    const dx = e.clientX - d.sx;
    const dy = e.clientY - d.sy;
    if (!d.moved && Math.hypot(dx, dy) > 5) {
      d.moved = true;
      setIsDragging(true);
      e.currentTarget.setPointerCapture(e.pointerId);
    }
    if (!d.moved) return;
    const next = clampPan(d.ox + dx, d.oy + dy);
    pan.current.tx = next.x;
    pan.current.ty = next.y;
    if (!pan.current.raf) pan.current.raf = requestAnimationFrame(animatePan);
  };

  const handleStagePointerUp = () => {
    drag.current.active = false;
    setIsDragging(false);
  };

  const handleCardMouseMove = (
    e: React.MouseEvent<HTMLElement>,
    caseId: string,
    frameCount: number
  ) => {
    if (frameCount <= 1) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = Math.max(
      0,
      Math.min(0.999, (e.clientX - rect.left) / Math.max(rect.width, 1))
    );
    const nextIdx = Math.floor(relX * frameCount);
    setScrubMap((prev) =>
      prev[caseId] === nextIdx ? prev : { ...prev, [caseId]: nextIdx }
    );
  };

  const handleCardMouseLeave = (caseId: string) => {
    setScrubMap((prev) =>
      !prev[caseId] ? prev : { ...prev, [caseId]: 0 }
    );
  };

  const activeLightboxFrame =
    lightboxIdx !== null ? flatFrames[lightboxIdx] ?? null : null;

  return (
    <div className="wk-showcase" ref={rootRef}>
      {/* Header: eyebrow + display heading, inline text filters */}
      <div className="u-grid wk-head">
        <div className="wk-head__left">
          <span className="eyebrow" style={{ marginBottom: '0.65rem' }}>
            OUR WORK
          </span>
          <Heading className="display-2 wk-head__title">
            Selected Work
            <sup className="wk-head__count">
              {String(filteredCases.length).padStart(2, '0')}
            </sup>
          </Heading>
        </div>

        <div
          className="wk-filters wk-head__right"
          role="tablist"
          aria-label="Filter work"
        >
          {WORK_FILTERS.map((cat) => {
            const isActive = activeFilter === cat;
            const count = CASE_STUDIES.filter((cs) =>
              cs.filterCategories.includes(cat)
            ).length;
            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`wk-filter ${isActive ? 'is-active' : ''}`}
                onClick={() => {
                  setActiveFilter(cat);
                  setLightboxIdx(null);
                }}
              >
                <span className="wk-filter__label">{cat}</span>
                <sup className="wk-filter__count">{count}</sup>
              </button>
            );
          })}
        </div>
      </div>

      {/* MODE 1: STAGGERED 15-COLUMN GRID WITH HOVER FRAME SCRUBBER */}
      {workIndexMode === 'grid' && (
        <div className="wk-grid">
          {filteredCases.map((cs, i) => {
            const frames = cs.gallery.slice(0, 5);
            const activeFrameIdx = scrubMap[cs.id] ?? 0;
            const slot = (i % 6) + 1;

            return (
              <Link
                key={cs.id}
                href={`/work/${cs.slug}`}
                className={`wk-card wk-card--slot-${slot} wk-reveal`}
                onClick={() =>
                  trackEvent('select_content', {
                    content_type: 'case_study',
                    item_id: cs.slug,
                  })
                }
                onMouseMove={(e) =>
                  handleCardMouseMove(e, cs.id, frames.length)
                }
                onMouseLeave={() => handleCardMouseLeave(cs.id)}
              >
                <div className="wk-card__media">
                  {frames.map((fr, fIdx) => (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      key={fr.src}
                      src={fr.src}
                      alt={fr.caption || cs.title}
                      loading={i === 0 && fIdx === 0 ? 'eager' : 'lazy'}
                      className={`wk-card__img ${
                        fIdx === activeFrameIdx ? 'is-active' : ''
                      }`}
                    />
                  ))}

                  {frames.length > 1 && (
                    <div className="wk-card__scrub-bar" aria-hidden="true">
                      {frames.map((_, sIdx) => (
                        <span
                          key={sIdx}
                          className={`wk-card__scrub-seg ${
                            sIdx === activeFrameIdx ? 'is-active' : ''
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>

                <div className="wk-card__meta">
                  <div className="wk-card__text">
                    <h3 className="wk-card__title">{cs.shortName}</h3>
                    <p className="wk-card__sub">
                      {cs.client} · {cs.timeline}
                    </p>
                  </div>
                  <div className="wk-card__swap">
                    <p className="wk-card__metric">
                      {cs.heroMetric.number} {cs.heroMetric.sup}
                    </p>
                    <p className="wk-card__visit">View case ↗</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {/* MODE 2: TITLE INDEX WITH THUMBNAIL CONTACT STRIP */}
      {workIndexMode === 'list' && (
        <div className="wk-list">
          {filteredCases.map((cs) => (
            <Link
              key={cs.id}
              href={`/work/${cs.slug}`}
              className="wk-list-row wk-reveal"
            >
              <h3 className="wk-list-row__title">
                <span>{cs.titleLines[0]}</span>
                <span>{cs.titleLines[1]}</span>
              </h3>

              <div className="wk-list-row__thumbs">
                {cs.gallery.slice(0, 9).map((frame, fIdx) => (
                  <div key={frame.src} className="wk-list-row__thumb">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={frame.src}
                      alt={frame.tag || `${cs.shortName} ${fIdx + 1}`}
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* MODE 3: SCATTERED DRAG-TO-EXPLORE CANVAS + LIGHTBOX */}
      {workIndexMode === 'gallery' && (
        <div
          ref={stageRef}
          className={`wk-stage ${isDragging ? 'is-dragging' : ''}`}
          onPointerDown={handleStagePointerDown}
          onPointerMove={handleStagePointerMove}
          onPointerUp={handleStagePointerUp}
          onPointerCancel={handleStagePointerUp}
        >
          <div
            ref={sheetRef}
            className="wk-stage__sheet"
            style={
              {
                '--sheet-w': `${canvasW}px`,
                '--sheet-h': `${canvasH}px`,
              } as React.CSSProperties
            }
          >
            {flatFrames.map((item, idx) => {
              const place = getCanvasPlacement(idx, item.portrait);
              return (
                <button
                  key={`${item.caseStudy.id}-${idx}`}
                  type="button"
                  className={`wk-stage-item ${
                    item.portrait ? 'is-portrait' : ''
                  }`}
                  style={
                    {
                      '--x': `${place.left}px`,
                      '--y': `${place.top}px`,
                      '--w': `${place.width}px`,
                      '--h': `${place.height}px`,
                    } as React.CSSProperties
                  }
                  onClick={() => {
                    if (drag.current.moved) return;
                    setLightboxIdx(idx);
                  }}
                  aria-label={`${item.shotTitle} — ${item.projectCode}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.src}
                    alt={item.caption}
                    loading="lazy"
                    draggable={false}
                  />
                  <span className="wk-stage-item__label">
                    {item.shotTitle}
                  </span>
                </button>
              );
            })}
          </div>
          <p className="wk-stage__hint" aria-hidden="true">
            Drag to explore · {String(flatFrames.length).padStart(2, '0')}{' '}
            frames
          </p>
        </div>
      )}

      {/* Floating view switcher (`Grid` | `List` | `Gallery`) */}
      <div className="wk-mode-dock">
        <div
          className="wk-mode-switch"
          role="tablist"
          aria-label="Work index view mode"
        >
          <button
            type="button"
            role="tab"
            aria-selected={workIndexMode === 'grid'}
            className={`wk-mode-btn ${
              workIndexMode === 'grid' ? 'is-active' : ''
            }`}
            onClick={() => setWorkIndexMode('grid')}
          >
            <svg
              viewBox="0 0 15 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="7" height="3" fill="currentColor" />
              <rect x="8" y="7" width="7" height="3" fill="currentColor" />
              <rect y="5" width="7" height="3" fill="currentColor" />
              <rect x="8" y="2" width="7" height="3" fill="currentColor" />
            </svg>
            <span>Grid</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={workIndexMode === 'list'}
            className={`wk-mode-btn ${
              workIndexMode === 'list' ? 'is-active' : ''
            }`}
            onClick={() => setWorkIndexMode('list')}
          >
            <svg
              viewBox="0 0 15 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="3" height="11" fill="currentColor" />
              <rect x="5" width="10" height="2.5" fill="currentColor" />
              <rect x="5" y="4.25" width="10" height="2.5" fill="currentColor" />
              <rect x="5" y="8.5" width="10" height="2.5" fill="currentColor" />
            </svg>
            <span>List</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={workIndexMode === 'gallery'}
            className={`wk-mode-btn ${
              workIndexMode === 'gallery' ? 'is-active' : ''
            }`}
            onClick={() => setWorkIndexMode('gallery')}
          >
            <svg
              viewBox="0 0 16 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="4.5" height="5" fill="currentColor" />
              <rect x="5.75" width="4.5" height="5" fill="currentColor" />
              <rect x="11.5" width="4.5" height="5" fill="currentColor" />
              <rect y="6" width="4.5" height="5" fill="currentColor" />
              <rect x="5.75" y="6" width="4.5" height="5" fill="currentColor" />
              <rect x="11.5" y="6" width="4.5" height="5" fill="currentColor" />
            </svg>
            <span>Gallery</span>
          </button>
        </div>
      </div>

      {/* INTERACTIVE FULL-SCREEN STUDIO LIGHTBOX */}
      {activeLightboxFrame && lightboxIdx !== null && (
        <div
          className="wk-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={activeLightboxFrame.shotTitle}
          onClick={() => setLightboxIdx(null)}
        >
          <div
            className="wk-lightbox__inner"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="wk-lightbox__top">
              <div className="wk-lightbox__counter">
                <strong>
                  {String(lightboxIdx + 1).padStart(2, '0')} /{' '}
                  {String(flatFrames.length).padStart(2, '0')}
                </strong>
                <span>{activeLightboxFrame.caseStudy.shortName}</span>
              </div>

              <button
                type="button"
                className="wk-lightbox__close"
                onClick={() => setLightboxIdx(null)}
                aria-label="Close lightbox"
              >
                <span>Close</span>
                <span aria-hidden="true">✕</span>
              </button>
            </div>

            <div className="wk-lightbox__stage">
              <button
                type="button"
                className="wk-lightbox__nav wk-lightbox__nav--prev"
                aria-label="Previous frame"
                onClick={() =>
                  setLightboxIdx(
                    (lightboxIdx - 1 + flatFrames.length) % flatFrames.length
                  )
                }
              >
                ←
              </button>

              <div className="wk-lightbox__frame">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={activeLightboxFrame.src}
                  alt={activeLightboxFrame.caption}
                />
              </div>

              <button
                type="button"
                className="wk-lightbox__nav wk-lightbox__nav--next"
                aria-label="Next frame"
                onClick={() =>
                  setLightboxIdx((lightboxIdx + 1) % flatFrames.length)
                }
              >
                →
              </button>
            </div>

            <div className="wk-lightbox__bottom">
              <div className="wk-lightbox__caption">
                <span className="wk-lightbox__tag">
                  {activeLightboxFrame.rawTag}
                </span>
                <p>{activeLightboxFrame.caption}</p>
              </div>

              <Link
                href={`/work/${activeLightboxFrame.caseStudy.slug}`}
                className="btn-zj"
                onClick={() => setLightboxIdx(null)}
              >
                <span className="btn-zj__label">Open full case study</span>
                <span className="btn-zj__tile">
                  <ArrowNeIcon />
                </span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
