'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  CASE_STUDIES,
  WORK_FILTERS,
  WorkFilterCategory,
} from '@/data/stratcoData';
import { StratcoWordmark, ArrowNeIcon } from '@/components/StratcoVectors';
import { KononenkoIndexMode } from '@/components/StratcoExperience';

export default function WorkIndexPage() {
  const [workIndexMode, setWorkIndexMode] =
    useState<KononenkoIndexMode>('grid');
  const [activeFilter, setActiveFilter] =
    useState<WorkFilterCategory>('All Work');
  const [klaTime, setKlaTime] = useState('21:00');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const updateClock = () => {
      try {
        const formatted = new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Africa/Kampala',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }).format(new Date());
        setKlaTime(formatted);
      } catch {
        setKlaTime('21:00');
      }
    };
    updateClock();
    const timer = setInterval(updateClock, 15000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const filteredCases = CASE_STUDIES.filter((cs) =>
    cs.filterCategories.includes(activeFilter)
  );

  return (
    <div>
      <header
        className={`navbar is-scrolled ${
          mobileMenuOpen ? 'is-menu-open' : ''
        }`}
      >
        <div className="container">
          <div className="navbar__inner">
            <Link
              href="/"
              className="navbar__brand"
              aria-label="Stratco Home"
              onClick={() => setMobileMenuOpen(false)}
            >
              <StratcoWordmark
                variant="adaptive-nav"
                width={192}
                className="navbar__logo-svg"
              />
            </Link>

            <nav className="navbar__links" aria-label="Primary">
              <Link href="/work" className="navbar__link">
                Work
              </Link>
              <Link href="/#services" className="navbar__link">
                What we do
              </Link>
              <Link href="/#process" className="navbar__link">
                Approach
              </Link>
              <Link href="/#about" className="navbar__link">
                About
              </Link>
            </nav>

            <div className="navbar__right">
              <div className="navbar__clock" title="Kampala, Uganda (EAT)">
                <span className="navbar__clock-dot" />
                <span className="navbar__clock-city">KLA</span>
                <span className="navbar__clock-time">{klaTime}</span>
              </div>

              <Link href="/#contact" className="btn-zj navbar__cta-desktop">
                <span className="btn-zj__label">Plan a call</span>
                <span className="btn-zj__tile">
                  <ArrowNeIcon />
                </span>
              </Link>

              <button
                type="button"
                className={`navbar__menu-btn ${
                  mobileMenuOpen ? 'is-active' : ''
                }`}
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                aria-expanded={mobileMenuOpen}
                aria-label="Toggle navigation menu"
              >
                <span className="navbar__menu-label">
                  {mobileMenuOpen ? 'Close' : 'Menu'}
                </span>
                <span className="navbar__burger" aria-hidden="true">
                  <span />
                  <span />
                </span>
              </button>
            </div>
          </div>

          <nav
            className={`mobile-drawer ${mobileMenuOpen ? 'is-open' : ''}`}
            aria-label="Mobile Navigation"
          >
            <div className="mobile-drawer__panel">
              <div className="mobile-drawer__list">
                <Link
                  href="/"
                  className="mobile-drawer__link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="mobile-drawer__num">01</span>
                  <span className="mobile-drawer__text">Home</span>
                  <span className="mobile-drawer__arrow">↗</span>
                </Link>
                <Link
                  href="/#services"
                  className="mobile-drawer__link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="mobile-drawer__num">02</span>
                  <span className="mobile-drawer__text">What we do</span>
                  <span className="mobile-drawer__arrow">↗</span>
                </Link>
                <Link
                  href="/#process"
                  className="mobile-drawer__link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="mobile-drawer__num">03</span>
                  <span className="mobile-drawer__text">Approach</span>
                  <span className="mobile-drawer__arrow">↗</span>
                </Link>
                <Link
                  href="/#about"
                  className="mobile-drawer__link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="mobile-drawer__num">04</span>
                  <span className="mobile-drawer__text">About</span>
                  <span className="mobile-drawer__arrow">↗</span>
                </Link>
              </div>

              <div className="mobile-drawer__bottom">
                <Link
                  href="/#contact"
                  className="btn-zj mobile-drawer__cta"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="btn-zj__label">Get your project done</span>
                  <span className="btn-zj__tile">
                    <ArrowNeIcon />
                  </span>
                </Link>

                <div className="mobile-drawer__meta">
                  <div className="mobile-drawer__clock">
                    <span className="navbar__clock-dot" />
                    <span>Kampala · {klaTime} EAT</span>
                  </div>
                  <div className="mobile-drawer__contact">
                    <a href="mailto:info@stratco.agency">info@stratco.agency</a>
                    <a href="tel:+256772833500">+256 772 833500</a>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </header>

      <main
        className="section-light"
        style={{ paddingTop: '9.5rem', minHeight: '100vh' }}
      >
        <div className="container" style={{ paddingBottom: '7rem' }}>
          <div className="kn-work-header">
            <div className="kn-work-header__left">
              <span className="eyebrow" style={{ marginBottom: '0.5rem' }}>
                SELECTED WORK
              </span>
              <div className="kn-clean-filters" role="tablist">
                {WORK_FILTERS.map((cat) => {
                  const isActive = activeFilter === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      className={`kn-clean-filter-btn ${
                        isActive ? 'is-active' : ''
                      }`}
                      onClick={() => setActiveFilter(cat)}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>

            <div
              className="kn-ouf-switcher"
              role="tablist"
              aria-label="Work index view mode"
            >
              <button
                type="button"
                role="tab"
                aria-selected={workIndexMode === 'grid'}
                className={`kn-qgi-btn ${
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
                className={`kn-qgi-btn ${
                  workIndexMode === 'list' ? 'is-active' : ''
                }`}
                onClick={() => setWorkIndexMode('list')}
              >
                <svg
                  viewBox="0 0 15 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect x="4" width="3" height="3" fill="currentColor" />
                  <rect x="4" y="4" width="3" height="3" fill="currentColor" />
                  <rect x="4" y="8" width="3" height="3" fill="currentColor" />
                  <rect x="8" width="3" height="3" fill="currentColor" />
                  <rect x="12" width="3" height="3" fill="currentColor" />
                  <rect x="12" y="4" width="3" height="3" fill="currentColor" />
                  <rect x="12" y="8" width="3" height="3" fill="currentColor" />
                  <rect x="8" y="4" width="3" height="3" fill="currentColor" />
                  <rect x="8" y="8" width="3" height="3" fill="currentColor" />
                  <rect width="3" height="11" fill="currentColor" />
                </svg>
                <span>List</span>
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={workIndexMode === 'gallery'}
                className={`kn-qgi-btn ${
                  workIndexMode === 'gallery' ? 'is-active' : ''
                }`}
                onClick={() => setWorkIndexMode('gallery')}
              >
                <svg
                  viewBox="0 0 16 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="6.15385" height="3" fill="currentColor" />
                  <rect y="4" width="3.69231" height="3" fill="currentColor" />
                  <rect y="8" width="6.15385" height="3" fill="currentColor" />
                  <rect
                    x="4.92383"
                    y="4"
                    width="6.15385"
                    height="3"
                    fill="currentColor"
                  />
                  <rect
                    x="7.38477"
                    y="8"
                    width="3.69231"
                    height="3"
                    fill="currentColor"
                  />
                  <rect
                    x="7.38477"
                    width="8.61539"
                    height="3"
                    fill="currentColor"
                  />
                  <rect
                    x="12.3086"
                    y="8"
                    width="3.69231"
                    height="3"
                    fill="currentColor"
                  />
                  <rect
                    x="12.3086"
                    y="4"
                    width="3.69231"
                    height="3"
                    fill="currentColor"
                  />
                </svg>
                <span>Gallery</span>
              </button>
            </div>
          </div>

          {workIndexMode === 'grid' && (
            <div className="kn-frl-grid">
              {filteredCases.map((cs, i) => (
                <Link
                  key={cs.id}
                  href={`/work/${cs.slug}`}
                  className={`kn-qct-card kn-qct-pos-${(i % 4) + 1}`}
                >
                  <div className="kn-piz-thumb">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={cs.image} alt={cs.title} />
                  </div>

                  <div className="kn-iw-bar">
                    <h2 className="kn-it-title">{cs.shortName}</h2>

                    <div className="kn-qcm-right">
                      <div className="kn-ic-swap">
                        <p className="kn-dlx-metric">
                          {cs.heroMetric.number} {cs.heroMetric.sup}
                        </p>
                        <p className="kn-jts-visit">Visit</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {workIndexMode === 'list' && (
            <div className="kn-srj-list">
              {filteredCases.map((cs) => (
                <Link
                  key={cs.id}
                  href={`/work/${cs.slug}`}
                  className="kn-vjk-row"
                >
                  <div className="kn-pdx-title-col">
                    <h2 className="kn-zzg-heading">
                      <span>{cs.titleLines[0]}</span>
                      <span>{cs.titleLines[1]}</span>
                    </h2>
                  </div>

                  <div className="kn-spm-filmstrip">
                    {cs.gallery.map((frame, fIdx) => (
                      <div key={fIdx} className="kn-kvl-thumb">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={frame.src} alt={frame.tag || cs.title} />
                      </div>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          )}

          {workIndexMode === 'gallery' && (
            <div className="kn-studio-gallery">
              {filteredCases.flatMap((cs) =>
                cs.gallery.map((frame, fIdx) => (
                  <Link
                    key={`${cs.id}-${fIdx}`}
                    href={`/work/${cs.slug}`}
                    className="kn-gallery-sheet-item"
                  >
                    <div className="kn-gallery-sheet-item__media">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={frame.src} alt={frame.caption} />
                    </div>
                    <div className="kn-gallery-sheet-item__cap">
                      <strong>{cs.titleLines[0]}</strong>
                    </div>
                  </Link>
                ))
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
