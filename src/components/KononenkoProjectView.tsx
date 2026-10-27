'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { CaseStudy } from '@/data/stratcoData';
import { StratcoWordmark, ArrowNeIcon } from '@/components/StratcoVectors';

interface KononenkoProjectViewProps {
  project: CaseStudy;
  allProjects: CaseStudy[];
}

/**
 * Kononenko Odometer Digit Reel (`section.avm .cob .qxw`)
 * Rolls each digit 0..9 vertically into place on load.
 */
function OdometerNumber({ value }: { value: string }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(false);
    const timer = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(timer);
  }, [value]);

  const chars = value.split('');

  return (
    <span className="kn-odo" aria-label={value}>
      {chars.map((char, idx) => {
        const digit = parseInt(char, 10);
        if (Number.isNaN(digit)) {
          return (
            <span key={idx} className="kn-odo__char">
              {char}
            </span>
          );
        }
        const steps = Array.from({ length: digit + 1 }, (_, i) => i);
        return (
          <span
            key={`${value}-${idx}`}
            className="kn-odo__col"
            aria-hidden="true"
          >
            <span
              className="kn-odo__strip"
              style={{
                transform: mounted
                  ? `translateY(-${(digit / (digit + 1)) * 100}%)`
                  : 'translateY(0%)',
                transitionDelay: `${idx * 120}ms`,
              }}
            >
              {steps.map((n) => (
                <span key={n} className="kn-odo__digit">
                  {n}
                </span>
              ))}
            </span>
          </span>
        );
      })}
    </span>
  );
}

export default function KononenkoProjectView({
  project,
  allProjects,
}: KononenkoProjectViewProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [klaTime, setKlaTime] = useState('21:00');

  // Live Kampala Clock
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

  // Scroll listener for navbar state
  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const currentIdx = allProjects.findIndex((p) => p.id === project.id);
  const nextProject =
    allProjects[(currentIdx + 1) % allProjects.length] || allProjects[0];

  const frames = project.gallery;

  // Masonry 3-column distribution with original frame index preserved
  const masonryCols = [0, 1, 2].map((colIdx) =>
    frames
      .map((frame, originalIdx) => ({ frame, originalIdx }))
      .filter(({ originalIdx }) => originalIdx % 3 === colIdx)
  );

  return (
    <div className="kn-standalone-page">
      {/* ====================================================================
          CONSISTENT STRATCO NAVBAR
          ==================================================================== */}
      <header
        className={`navbar ${isScrolled ? 'is-scrolled' : ''} ${
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
              <Link href="/#work" className="navbar__link">
                ← All Work
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
                  href="/#work"
                  className="mobile-drawer__link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="mobile-drawer__num">01</span>
                  <span className="mobile-drawer__text">All Work</span>
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

      <main>
        {/* ==================================================================
            01. FULL-VIEWPORT HERO WITH ROLLING ODOMETER (`section.avm`)
            ================================================================== */}
        <section className="kn-avm-hero kn-avm-hero--fullbleed">
          <div className="kn-avm-hero__bg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.image}
              alt={project.title}
              className="kn-avm-hero__img"
            />
            <div className="kn-avm-hero__scrim" />
          </div>

          <div className="container kn-avm-hero__bottom">
            <div className="kn-avm-hero__title-wrap">
              <h1 className="kn-avm-hero__title">
                <span>{project.titleLines[0]}</span>
                <span>{project.titleLines[1]}</span>
              </h1>
            </div>

            <div className="kn-avm-hero__metric">
              <div className="kn-avm-hero__odo-row">
                <OdometerNumber value={project.heroMetric.number} />
                <sup className="kn-avm-hero__sup">{project.heroMetric.sup}</sup>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================================
            02. CLEAN SPEC & CONCEPT STATEMENT (`section.aie`)
            ================================================================== */}
        <section className="section-light">
          <div className="container">
            <div className="kn-aie-info">
              <div className="kn-aie-grid">
                <div className="kn-aie-specs">
                  <div className="kn-aie-spec-row">
                    <h2 className="kn-aie-spec-label">Client</h2>
                    <p className="kn-aie-spec-val">{project.client}</p>
                  </div>
                  {project.partners && (
                    <div className="kn-aie-spec-row">
                      <h2 className="kn-aie-spec-label">Partners</h2>
                      <p className="kn-aie-spec-val">{project.partners}</p>
                    </div>
                  )}
                  {project.timeline && (
                    <div className="kn-aie-spec-row">
                      <h2 className="kn-aie-spec-label">Timeline</h2>
                      <p className="kn-aie-spec-val">{project.timeline}</p>
                    </div>
                  )}
                  <div className="kn-aie-spec-row">
                    <h2 className="kn-aie-spec-label">Coverage</h2>
                    <p className="kn-aie-spec-val">{project.location}</p>
                  </div>
                  <div className="kn-aie-spec-row">
                    <h2 className="kn-aie-spec-label">Services</h2>
                    <p className="kn-aie-spec-val">
                      {project.execution.join(', ')}
                    </p>
                  </div>
                </div>

                <div className="kn-aie-concept">
                  <p className="kn-aie-concept__lead">{project.summary}</p>
                </div>
              </div>
            </div>

            {/* ==============================================================
                03. MASONRY VISUAL EXHIBITION (3-Column Staggered Display)
                ============================================================== */}
            <section className="kn-ijt-showcase">
              <div className="kn-ddh-masonry">
                {masonryCols.map((colItems, colIdx) => (
                  <div key={colIdx} className="kn-fzs-col">
                    {colItems.map(({ frame, originalIdx }, rowIdx) => {
                      const aspectClass =
                        (colIdx + rowIdx) % 2 === 1
                          ? 'is-portrait'
                          : colIdx === 2 && rowIdx === 0
                          ? 'is-medium'
                          : 'is-landscape';
                      return (
                        <figure
                          key={`${frame.src}-${originalIdx}`}
                          className={`kn-zdm-card ${aspectClass}`}
                        >
                          <div className="kn-zdm-card__media">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={frame.src}
                              alt={frame.caption}
                              loading="lazy"
                            />
                          </div>
                        </figure>
                      );
                    })}
                  </div>
                ))}
              </div>
            </section>

            {/* ==============================================================
                05. CLEAN INDENTED EDITORIAL THESIS (`section.tid`)
                ============================================================== */}
            <section className="kn-tid-thesis">
              <div className="kn-tid-grid">
                <div className="kn-muy-col">
                  <p className="kn-muy-label serif-italic">
                    {project.thesisTitle}
                  </p>
                </div>

                <div className="kn-ayj-col">
                  {project.thesisParagraphs.map((paragraph, i) => (
                    <p key={i} className="kn-dxw-paragraph">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </section>

            {/* ==============================================================
                06. KONONENKO "NEXT WORK" REVEAL (`section.kma`)
                ============================================================== */}
            <section className="kn-kma-next">
              <Link href={`/work/${nextProject.slug}`} className="kn-bjz-link">
                <span className="kn-rsx-label serif-italic">Next work</span>
                <div className="kn-fcr-row">
                  <div className="kn-tit-box">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={nextProject.image} alt={nextProject.title} />
                  </div>
                  <div className="kn-wmq-title">
                    <h2 className="kn-llg-heading">
                      <span>{nextProject.titleLines[0]}</span>
                      <span>{nextProject.titleLines[1]}</span>
                    </h2>
                  </div>
                </div>
              </Link>
            </section>
          </div>
        </section>

        {/* ==================================================================
            CONSISTENT STRATCO FOOTER
            ================================================================== */}
        <section className="section-dark" style={{ padding: '4rem 0 3rem' }}>
          <div className="container">
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '2rem',
                paddingBottom: '3rem',
              }}
            >
              <div>
                <span className="eyebrow" style={{ marginBottom: '0.5rem' }}>
                  READY TO START?
                </span>
                <h2 className="h2">
                  Commission a project of this standard.
                </h2>
              </div>

              <Link href="/#contact" className="btn-zj">
                <span className="btn-zj__label">Start a project</span>
                <span className="btn-zj__tile">
                  <ArrowNeIcon />
                </span>
              </Link>
            </div>

            <footer className="footer-bar" style={{ marginTop: 0 }}>
              <div
                style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}
              >
                <StratcoWordmark
                  variant="inverted"
                  width={142}
                  showTagline={false}
                />
                <span>© 2026 Stratco Limited · Kampala, Uganda</span>
              </div>

              <div style={{ display: 'flex', gap: '1.5rem' }}>
                <Link href="/#work">Work</Link>
                <Link href="/#services">What we do</Link>
                <Link href="/#process">Approach</Link>
                <Link href="/#about">About</Link>
                <a href="mailto:info@stratco.agency">info@stratco.agency</a>
              </div>
            </footer>
          </div>
        </section>
      </main>
    </div>
  );
}
