'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  CASE_STUDIES,
  CaseStudy,
  WORK_FILTERS,
  WorkFilterCategory,
} from '@/data/stratcoData';
import { ArrowNeIcon } from '@/components/StratcoVectors';

export type KononenkoIndexMode = 'grid' | 'list' | 'gallery';

interface FlatGalleryFrame {
  globalIdx: number;
  src: string;
  shotTitle: string;
  rawTag: string;
  caption: string;
  projectCode: string;
  caseStudy: CaseStudy;
}

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

export default function WorkShowcase() {
  const [workIndexMode, setWorkIndexMode] =
    useState<KononenkoIndexMode>('grid');
  const [activeFilter, setActiveFilter] =
    useState<WorkFilterCategory>('All Work');

  // Interactive per-card hover scrub state: { [caseId]: frameIndex }
  const [scrubMap, setScrubMap] = useState<Record<string, number>>({});

  // Interactive Gallery Lightbox index (null when closed)
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

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
          caseStudy: cs,
        });
      });
    });
    return items;
  }, [filteredCases]);

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
    <div className="wk-showcase">
      {/* Header & Interactive Controls */}
      <div className="wk-bar">
        <div className="wk-bar__left">
          <span className="eyebrow" style={{ marginBottom: '0.6rem' }}>
            SELECTED WORK
          </span>

          <div className="wk-filters" role="tablist" aria-label="Filter work">
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
                  className={`wk-filter-pill ${isActive ? 'is-active' : ''}`}
                  onClick={() => {
                    setActiveFilter(cat);
                    setLightboxIdx(null);
                  }}
                >
                  <span>{cat}</span>
                  <span className="wk-filter-pill__count">{count}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3-Mode View Switcher (`Grid` | `List` | `Gallery`) */}
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
              <rect width="7" height="4" fill="currentColor" />
              <rect x="8" width="7" height="4" fill="currentColor" />
              <rect y="6" width="7" height="4" fill="currentColor" />
              <rect x="8" y="6" width="7" height="4" fill="currentColor" />
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

      {/* MODE 1: CLEAN EDITORIAL GRID WITH INTERACTIVE HOVER FRAME SCRUBBER */}
      {workIndexMode === 'grid' && (
        <div
          className={`wk-grid ${
            filteredCases.length === 3 ? 'wk-grid--triad' : ''
          }`}
        >
          {filteredCases.map((cs, i) => {
            const frames = cs.gallery.slice(0, 5);
            const activeFrameIdx = scrubMap[cs.id] ?? 0;
            const currentFrame = frames[activeFrameIdx] || frames[0];
            const isLead = filteredCases.length === 3 && i === 0;

            return (
              <Link
                key={cs.id}
                href={`/work/${cs.slug}`}
                className={`wk-card ${isLead ? 'wk-card--lead' : ''}`}
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

                  {/* Subtle Hover HUD: Shot Tag + Open Pill + Scrub Ticks */}
                  <div className="wk-card__hud">
                    <span className="wk-card__shot-tag">
                      {formatShotTitle(currentFrame?.tag, cs.badge)}
                    </span>
                    <span className="wk-card__open-pill">
                      <span>View project</span>
                      <ArrowNeIcon />
                    </span>
                  </div>

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
                  <div className="wk-card__meta-left">
                    <div className="wk-card__title-row">
                      <span className="wk-card__index">{cs.index}</span>
                      <h3 className="wk-card__title">{cs.shortName}</h3>
                    </div>
                    <p className="wk-card__sub">
                      {cs.client} · {cs.timeline}
                    </p>
                  </div>

                  <div className="wk-card__meta-right">
                    <div className="kn-ic-swap">
                      <p className="kn-dlx-metric">
                        {cs.heroMetric.number} {cs.heroMetric.sup}
                      </p>
                      <p className="kn-jts-visit">Case Study ↗</p>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {/* MODE 2: CLEAN INTERACTIVE FILMSTRIP LIST */}
      {workIndexMode === 'list' && (
        <div className="wk-list">
          {filteredCases.map((cs) => (
            <Link
              key={cs.id}
              href={`/work/${cs.slug}`}
              className="wk-list-row"
            >
              <div className="wk-list-row__info">
                <div className="wk-list-row__top">
                  <span className="wk-list-row__idx">{cs.index}</span>
                  <span className="wk-list-row__timeline">{cs.timeline}</span>
                </div>
                <h3 className="wk-list-row__title">{cs.shortName}</h3>
                <p className="wk-list-row__sub">
                  {cs.client} · {cs.heroMetric.number} {cs.heroMetric.sup}
                </p>
              </div>

              <div className="wk-list-row__strip">
                {cs.gallery.slice(0, 6).map((frame, fIdx) => (
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

              <div className="wk-list-row__cta">
                <span>Explore</span>
                <ArrowNeIcon />
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* MODE 3: CURATED STUDIO CONTACT SHEET + INTERACTIVE LIGHTBOX */}
      {workIndexMode === 'gallery' && (
        <div className="wk-gallery">
          {flatFrames.map((item, idx) => (
            <button
              key={`${item.caseStudy.id}-${idx}`}
              type="button"
              className="wk-gallery-item"
              onClick={() => setLightboxIdx(idx)}
            >
              <div className="wk-gallery-item__media">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.src} alt={item.caption} loading="lazy" />

                <span className="wk-gallery-item__num">
                  {String(idx + 1).padStart(2, '0')}
                </span>

                <div className="wk-gallery-item__hover">
                  <span>Inspect frame</span>
                  <span aria-hidden="true">⤢</span>
                </div>
              </div>

              <div className="wk-gallery-item__bar">
                <span className="wk-gallery-item__shot">{item.shotTitle}</span>
                <span className="wk-gallery-item__code">
                  {item.projectCode}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}

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
