'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { StratcoWordmark, ArrowNeIcon } from '@/components/StratcoVectors';
import WorkShowcase from '@/components/WorkShowcase';

export default function WorkIndexPage() {
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
          <WorkShowcase headingAs="h1" />
        </div>
      </main>
    </div>
  );
}
