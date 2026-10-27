'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  INTERACTIVE_SERVICES,
  PRODUCTION_STEPS,
  ProjectIntent,
  SCOPE_OPTIONS,
  SECTOR_TICKER,
} from '@/data/stratcoData';
import {
  StratcoMark,
  StratcoWordmark,
  ArrowNeIcon,
} from '@/components/StratcoVectors';
import ConcaveBowlHero from '@/components/ConcaveBowlHero';
import WorkShowcase, { KononenkoIndexMode } from '@/components/WorkShowcase';

export type { KononenkoIndexMode };

const TIMELINE_PRESETS = [
  'Immediate (< 1 Month)',
  '1 – 3 Months',
  'Q3 / Q4 Rollout',
  'Multi-District / Ongoing',
];

export default function StratcoExperience() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [klaTime, setKlaTime] = useState('21:00');

  // Interactive (1)-(4) Services Matrix State
  const [activeServiceIdx, setActiveServiceIdx] = useState(0);

  // Interactive Process Pipeline State
  const [activeStepIdx, setActiveStepIdx] = useState(0);
  const [isProcessPaused, setIsProcessPaused] = useState(false);

  // Contact Brief Builder State
  const [formIntent, setFormIntent] = useState<ProjectIntent>('live');
  const [selectedScopes, setSelectedScopes] = useState<string[]>([
    'Full Conference / Launch Production',
    'Stage, Set & LED Wall Design',
  ]);
  const [name, setName] = useState('');
  const [org, setOrg] = useState('');
  const [email, setEmail] = useState('');
  const [timeline, setTimeline] = useState('1 – 3 Months');
  const [notes, setNotes] = useState('');
  const [mailtoHref, setMailtoHref] = useState<string | null>(null);
  const [preparedBriefText, setPreparedBriefText] = useState('');
  const [emailCopied, setEmailCopied] = useState(false);
  const [briefCopied, setBriefCopied] = useState(false);

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

  // Scroll listener for navbar + smooth scroll reveal
  useEffect(() => {
    const onScroll = () =>
      setIsScrolled(window.scrollY > Math.max(window.innerHeight * 0.72, 320));
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    );

    const els = document.querySelectorAll('.reveal-on-scroll');
    els.forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener('scroll', onScroll);
      observer.disconnect();
    };
  }, []);

  const handleIntentChange = (intent: ProjectIntent) => {
    setFormIntent(intent);
    const defaults = SCOPE_OPTIONS[intent].slice(0, 2);
    setSelectedScopes(defaults);
  };

  const toggleScopeChip = (chip: string) => {
    setSelectedScopes((prev) =>
      prev.includes(chip)
        ? prev.filter((item) => item !== chip)
        : [...prev, chip]
    );
  };

  const getIntentLabel = (intent: ProjectIntent) => {
    switch (intent) {
      case 'tvc':
        return 'TVCs & Commercial Film';
      case 'brand':
        return 'Campaigns & Brand Systems';
      case 'live':
        return 'Live & Broadcast Production';
      case 'strategy':
        return 'Strategy & Positioning';
    }
  };

  const handleCopyStudioEmail = async () => {
    try {
      await navigator.clipboard.writeText('info@stratco.agency');
      setEmailCopied(true);
      window.setTimeout(() => setEmailCopied(false), 2400);
    } catch {
      // Fallback ignored if clipboard blocked
    }
  };

  const handleCopyBrief = async () => {
    if (!preparedBriefText) return;
    try {
      await navigator.clipboard.writeText(preparedBriefText);
      setBriefCopied(true);
      window.setTimeout(() => setBriefCopied(false), 2400);
    } catch {
      // Fallback ignored
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const typeLabel = getIntentLabel(formIntent);
    const rawSubject = `${typeLabel} Brief: ${org || name || 'New Project'}`;
    const rawBody = [
      `Primary Pillar: ${typeLabel}`,
      `Selected Deliverables: ${
        selectedScopes.join(', ') || 'General Inquiry'
      }`,
      `Name: ${name}`,
      `Organization: ${org}`,
      `Email: ${email}`,
      ...(timeline ? [`Target Timeline / Launch: ${timeline}`] : []),
      '',
      'Project Notes:',
      notes || '—',
    ].join('\n');

    const href = `mailto:info@stratco.agency?subject=${encodeURIComponent(
      rawSubject
    )}&body=${encodeURIComponent(rawBody)}`;
    setPreparedBriefText(`To: info@stratco.agency\nSubject: ${rawSubject}\n\n${rawBody}`);
    setMailtoHref(href);
    window.location.href = href;
  };

  // Lock body scroll while full-screen mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Auto-advance Approach pipeline unless hovered/interacted or reduced-motion
  useEffect(() => {
    if (isProcessPaused) return;
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }
    const timer = window.setInterval(() => {
      setActiveStepIdx((prev) => (prev + 1) % PRODUCTION_STEPS.length);
    }, 5500);
    return () => window.clearInterval(timer);
  }, [isProcessPaused, activeStepIdx]);

  const currentService = INTERACTIVE_SERVICES[activeServiceIdx];
  const currentStep = PRODUCTION_STEPS[activeStepIdx];

  return (
    <div>
      {/* ====================================================================
          NAVBAR
          ==================================================================== */}
      <header
        className={`navbar ${isScrolled ? 'is-scrolled' : ''} ${
          mobileMenuOpen ? 'is-menu-open' : ''
        }`}
      >
        <div className="container">
          <div className="navbar__inner">
            <a
              href="#top"
              className="navbar__brand"
              aria-label="Stratco Home"
              onClick={() => setMobileMenuOpen(false)}
            >
              <StratcoWordmark
                variant="adaptive-nav"
                width={192}
                className="navbar__logo-svg"
              />
            </a>

            <nav className="navbar__links" aria-label="Primary">
              <a href="#work" className="navbar__link">
                Work
              </a>
              <a href="#services" className="navbar__link">
                What we do
              </a>
              <a href="#process" className="navbar__link">
                Approach
              </a>
              <a href="#about" className="navbar__link">
                About
              </a>
            </nav>

            <div className="navbar__right">
              <div className="navbar__clock" title="Kampala, Uganda (EAT)">
                <span className="navbar__clock-dot" />
                <span className="navbar__clock-city">KLA</span>
                <span className="navbar__clock-time">{klaTime}</span>
              </div>

              <a href="#contact" className="btn-zj navbar__cta-desktop">
                <span className="btn-zj__label">Plan a call</span>
                <span className="btn-zj__tile">
                  <ArrowNeIcon />
                </span>
              </a>

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
                <a
                  href="#work"
                  className="mobile-drawer__link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="mobile-drawer__num">01</span>
                  <span className="mobile-drawer__text">Work</span>
                  <span className="mobile-drawer__arrow">↗</span>
                </a>
                <a
                  href="#services"
                  className="mobile-drawer__link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="mobile-drawer__num">02</span>
                  <span className="mobile-drawer__text">What we do</span>
                  <span className="mobile-drawer__arrow">↗</span>
                </a>
                <a
                  href="#process"
                  className="mobile-drawer__link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="mobile-drawer__num">03</span>
                  <span className="mobile-drawer__text">Approach</span>
                  <span className="mobile-drawer__arrow">↗</span>
                </a>
                <a
                  href="#about"
                  className="mobile-drawer__link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="mobile-drawer__num">04</span>
                  <span className="mobile-drawer__text">About</span>
                  <span className="mobile-drawer__arrow">↗</span>
                </a>
              </div>

              <div className="mobile-drawer__bottom">
                <a
                  href="#contact"
                  className="btn-zj mobile-drawer__cta"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="btn-zj__label">Get your project done</span>
                  <span className="btn-zj__tile">
                    <ArrowNeIcon />
                  </span>
                </a>

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

      <main id="top">
        {/* ==================================================================
            01. IMMERSIVE CONCAVE OPTICAL BOWL HERO (3D Spherical Bowl)
            ================================================================== */}
        <ConcaveBowlHero />

        {/* ==================================================================
            02. SELECTED WORK — INTERACTIVE SHOWCASE & LIGHTBOX
            ================================================================== */}
        <section className="section-light section-pad-lg" id="work">
          <div className="container reveal-on-scroll is-visible">
            <WorkShowcase />
          </div>
        </section>

        {/* ==================================================================
            03. WHAT WE DO — ARCHITECTURAL DISCIPLINE INDEX & LIVE STAGE
            ================================================================== */}
        <section className="section-dark section-pad-lg" id="services">
          <div className="container">
            <div className="u-grid sv-header reveal-on-scroll">
              <div className="sv-header__left">
                <span className="eyebrow" style={{ marginBottom: '0.65rem' }}>
                  WHAT WE DO
                </span>
                <h2 className="display-2">
                  Strategy to broadcast, under one roof.
                </h2>
              </div>

              <div className="sv-header__right">
                <p className="body-lg" style={{ color: 'var(--grey-250)' }}>
                  Most agencies stop at the deck. Most production houses wait
                  for a script. Stratco leads both.
                </p>
              </div>
            </div>

            <div className="sv-matrix reveal-on-scroll">
              {/* Left: Clean Zero-Jump Discipline Index */}
              <div className="sv-list" role="tablist">
                {INTERACTIVE_SERVICES.map((svc, idx) => {
                  const isActive = idx === activeServiceIdx;
                  return (
                    <button
                      key={svc.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      className={`sv-row ${isActive ? 'is-active' : ''}`}
                      onMouseEnter={() => setActiveServiceIdx(idx)}
                      onClick={() => setActiveServiceIdx(idx)}
                    >
                      <span className="sv-row__num">{svc.num}</span>

                      <div className="sv-row__body">
                        <h3 className="sv-row__title">{svc.title}</h3>
                        <p className="sv-row__sub">{svc.summary}</p>
                      </div>

                      <span className="sv-row__arrow" aria-hidden="true">
                        →
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Right: Widescreen Full-Color Production Stage + Structured Specs */}
              <div className="sv-stage">
                <div className="sv-stage__media">
                  {INTERACTIVE_SERVICES.map((svc, idx) => (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      key={svc.id}
                      src={svc.image}
                      alt={svc.title}
                      className={`sv-stage__img ${
                        idx === activeServiceIdx ? 'is-active' : ''
                      }`}
                    />
                  ))}
                  <div className="sv-stage__caption-bar">
                    <span className="sv-stage__caption-num">
                      {currentService.num}
                    </span>
                    <span>{currentService.caption}</span>
                  </div>
                </div>

                <div className="sv-stage__details">
                  <p className="sv-stage__desc">{currentService.description}</p>

                  <div className="sv-stage__caps">
                    {currentService.capabilities.slice(0, 4).map((cap) => (
                      <div key={cap} className="sv-stage__cap-item">
                        <span className="sv-stage__cap-dot" />
                        <span>{cap}</span>
                      </div>
                    ))}
                  </div>

                  <div className="sv-stage__cta">
                    <a
                      href="#contact"
                      className="btn-zj"
                      onClick={() => handleIntentChange(currentService.intent)}
                    >
                      <span className="btn-zj__label">
                        Brief {currentService.title}
                      </span>
                      <span className="btn-zj__tile">
                        <ArrowNeIcon />
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================================
            04. CLEAN SECTOR MARQUEE BAND
            ================================================================== */}
        <div
          className="section-stone"
          style={{ padding: '2.25rem 0', borderBottom: '1px solid var(--line-light)' }}
        >
          <div
            className="ticker-wrap"
            aria-label="Sectors and institutions we serve"
          >
            <div className="ticker-track">
              {[...SECTOR_TICKER, ...SECTOR_TICKER].map((item, i) => (
                <span key={`${item}-${i}`} className="ticker-item">
                  <span className="ticker-dot" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ==================================================================
            05. APPROACH — INTERACTIVE 4-STAGE PRODUCTION PIPELINE
            ================================================================== */}
        <section
          className="section-light section-pad-lg"
          id="process"
          onMouseEnter={() => setIsProcessPaused(true)}
          onMouseLeave={() => setIsProcessPaused(false)}
        >
          <div className="container">
            <div className="u-grid ap-header reveal-on-scroll">
              <div className="ap-header__left">
                <span className="eyebrow" style={{ marginBottom: '0.6rem' }}>
                  APPROACH
                </span>
                <h2 className="display-2 ink">
                  From the boardroom to the broadcast.
                </h2>
              </div>

              <div className="ap-header__right">
                <div className="ap-controls">
                  <div className="ap-controls__status">
                    <span className="ap-controls__count">
                      {currentStep.step} / 0{PRODUCTION_STEPS.length}
                    </span>
                    <span className="ap-controls__phase">
                      {currentStep.phase}
                    </span>
                  </div>

                  <div className="ap-controls__btns">
                    <button
                      type="button"
                      className="ap-nav-btn"
                      aria-label="Previous stage"
                      onClick={() =>
                        setActiveStepIdx(
                          (prev) =>
                            (prev - 1 + PRODUCTION_STEPS.length) %
                            PRODUCTION_STEPS.length
                        )
                      }
                    >
                      ←
                    </button>
                    <button
                      type="button"
                      className="ap-nav-btn"
                      aria-label="Next stage"
                      onClick={() =>
                        setActiveStepIdx(
                          (prev) => (prev + 1) % PRODUCTION_STEPS.length
                        )
                      }
                    >
                      →
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive 4-Segment Pipeline Rail */}
            <div
              className={`ap-rail reveal-on-scroll ${
                isProcessPaused ? 'is-paused' : ''
              }`}
              role="tablist"
              aria-label="Production pipeline stages"
            >
              {PRODUCTION_STEPS.map((st, idx) => {
                const isActive = idx === activeStepIdx;
                const isPast = idx < activeStepIdx;
                return (
                  <button
                    key={st.step}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`ap-rail__seg ${isActive ? 'is-active' : ''} ${
                      isPast ? 'is-past' : ''
                    }`}
                    onClick={() => setActiveStepIdx(idx)}
                  >
                    <span className="ap-rail__label">
                      <strong>{st.step}</strong>
                      <span>{st.phase}</span>
                    </span>
                    <span className="ap-rail__track">
                      <span
                        key={`${st.step}-${isActive ? 'active' : 'idle'}`}
                        className="ap-rail__fill"
                      />
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Interactive Horizontal Expanding Accordion Deck */}
            <div className="ap-deck reveal-on-scroll">
              {PRODUCTION_STEPS.map((st, idx) => {
                const isActive = idx === activeStepIdx;
                return (
                  <article
                    key={st.step}
                    role="button"
                    tabIndex={0}
                    aria-expanded={isActive}
                    className={`ap-card ${isActive ? 'is-active' : ''}`}
                    onClick={() => setActiveStepIdx(idx)}
                    onMouseEnter={() => {
                      if (
                        typeof window !== 'undefined' &&
                        window.matchMedia('(hover: hover) and (min-width: 992px)')
                          .matches
                      ) {
                        setActiveStepIdx(idx);
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setActiveStepIdx(idx);
                      }
                    }}
                  >
                    {/* Collapsed Architectural Strip */}
                    <div className="ap-card__collapsed">
                      <div className="ap-card__col-top">
                        <span className="ap-card__num">{st.step}</span>
                        <span className="ap-card__plus" aria-hidden="true">
                          +
                        </span>
                      </div>

                      <div className="ap-card__col-mid">
                        <span className="ap-card__phase">{st.phase}</span>
                        <h3 className="ap-card__col-title">{st.title}</h3>
                      </div>

                      <div className="ap-card__mini-media">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={st.image}
                          alt={st.title}
                          loading="lazy"
                        />
                      </div>
                    </div>

                    {/* Expanded Full Stage View */}
                    <div className="ap-card__expanded">
                      <div className="ap-card__info">
                        <div className="ap-card__info-top">
                          <div className="ap-card__badge">
                            <span className="ap-card__badge-dot" />
                            <span>
                              {st.step} · {st.phase}
                            </span>
                          </div>

                          <h3 className="ap-card__title">{st.title}</h3>
                          <p className="ap-card__desc">{st.description}</p>
                        </div>

                        <div className="ap-card__info-bottom">
                          <span className="ap-card__deliv-label">
                            KEY DELIVERABLES
                          </span>
                          <div className="ap-card__delivs">
                            {st.deliverables.map((item) => (
                              <div key={item} className="ap-card__deliv-chip">
                                <span className="ap-card__deliv-bullet" />
                                <span>{item}</span>
                              </div>
                            ))}
                          </div>

                          <div className="ap-card__footer">
                            <Link
                              href={`/work/${st.projectSlug}`}
                              className="ap-card__link"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <span>See in {st.projectLabel}</span>
                              <ArrowNeIcon />
                            </Link>
                          </div>
                        </div>
                      </div>

                      <div className="ap-card__media">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={st.image} alt={st.caption} />
                        <div className="ap-card__media-cap">
                          <span>{st.caption}</span>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* ==================================================================
            06. ABOUT STRATCO
            ================================================================== */}
        <section className="section-beige section-pad-lg" id="about">
          <div className="container">
            <div className="u-grid intro-split reveal-on-scroll">
              <div className="intro-split__label">
                <h2 className="eyebrow">ABOUT STRATCO</h2>
              </div>

              <div className="intro-split__title">
                <p className="h2 ink">
                  We don’t create adverts. We build brands people remember.
                </p>
              </div>

              <div className="intro-split__body">
                <p className="body-md">
                  Founded in Kampala, Stratco (Strategy + Company) unites senior
                  brand strategists, commercial film directors, identity
                  designers, and live broadcast engineers under one roof—so the
                  big idea survives intact from strategy deck to final broadcast
                  master.
                </p>
              </div>
            </div>

            <div className="principles-grid reveal-on-scroll">
              <article className="principle-card">
                <div>
                  <span
                    className="eyebrow"
                    style={{
                      color: 'var(--brand-red)',
                      marginBottom: '0.45rem',
                    }}
                  >
                    01 / STRATEGY
                  </span>
                  <h3 className="h4 ink" style={{ marginBottom: '0.5rem' }}>
                    Strategy before execution
                  </h3>
                  <p className="body-sm">
                    Every campaign, screenplay, and stage begins with a clear
                    commercial objective and audience truth.
                  </p>
                </div>
                <div className="principle-card__photo">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/ucc/0R7A8991.jpg"
                    alt="UCC Data Protection Conference panel"
                    loading="lazy"
                  />
                </div>
              </article>

              <article className="principle-card principle-card--tinted">
                <div
                  className="principle-card__photo"
                  style={{ marginTop: 0, marginBottom: '1.75rem' }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/ftb/6F1A1300.jpg"
                    alt="Trust Empowerment Programme plenary session"
                    loading="lazy"
                  />
                </div>
                <div>
                  <span
                    className="eyebrow"
                    style={{
                      color: 'var(--brand-red)',
                      marginBottom: '0.45rem',
                    }}
                  >
                    02 / CRAFT
                  </span>
                  <h3 className="h4 ink" style={{ marginBottom: '0.5rem' }}>
                    Built to be remembered
                  </h3>
                  <p className="body-sm">
                    From 50+ district national documentaries with Penda to
                    flagship summits for UCC and the Ministry of ICT, we execute
                    at broadcast standard.
                  </p>
                </div>
              </article>

              <article className="principle-card">
                <div>
                  <span
                    className="eyebrow"
                    style={{
                      color: 'var(--brand-red)',
                      marginBottom: '0.45rem',
                    }}
                  >
                    03 / PRODUCTION
                  </span>
                  <h3 className="h4 ink" style={{ marginBottom: '0.5rem' }}>
                    In-house from brief to screen
                  </h3>
                  <p className="body-sm">
                    Senior directors and technical producers run your production
                    directly—on schedule and on budget.
                  </p>
                </div>
                <div className="principle-card__photo">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/ucc/0R7A9084.jpg"
                    alt="Stratco multi-camera broadcast execution"
                    loading="lazy"
                  />
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* ==================================================================
            07. CONTACT & BRIEF BUILDER
            ================================================================== */}
        <section className="section-dark section-pad-lg" id="contact">
          <StratcoMark
            className="watermark"
            style={{
              left: '-4rem',
              bottom: '2rem',
              width: '32rem',
              height: '32rem',
              opacity: 0.03,
            }}
            color="#FFFFFF"
          />

          <div
            className="container"
            style={{ position: 'relative', zIndex: 2 }}
          >
            <div className="u-grid reveal-on-scroll">
              <div style={{ gridColumn: '1 / 11' }}>
                <span className="eyebrow" style={{ marginBottom: '0.6rem' }}>
                  CONTACT
                </span>
                <h2 className="display-2">
                  Tell us what you need to move.
                </h2>
              </div>
            </div>

            <div className="u-grid ct-layout reveal-on-scroll">
              {/* Left: Clean Interactive Studio Desk */}
              <div className="ct-desk">
                <div className="ct-desk__status">
                  <span className="navbar__clock-dot" />
                  <span>Kampala · {klaTime} EAT · Production Desk</span>
                </div>

                <div className="ct-desk__card">
                  <span className="ct-desk__label">DIRECT EMAIL</span>
                  <div className="ct-desk__email-row">
                    <a
                      href="mailto:info@stratco.agency"
                      className="ct-desk__email"
                    >
                      info@stratco.agency
                    </a>
                    <button
                      type="button"
                      className={`ct-copy-btn ${
                        emailCopied ? 'is-copied' : ''
                      }`}
                      onClick={handleCopyStudioEmail}
                    >
                      {emailCopied ? 'Copied ✓' : 'Copy'}
                    </button>
                  </div>
                </div>

                <div className="ct-desk__block">
                  <span className="ct-desk__label">DIRECT LINES</span>
                  <div className="ct-desk__phones">
                    <a href="tel:+256772833500">+256 772 833500</a>
                    <a href="tel:+256772700708">+256 772 700708</a>
                  </div>
                </div>

                <div className="ct-desk__block">
                  <span className="ct-desk__label">STUDIO HEADQUARTERS</span>
                  <p className="ct-desk__address">
                    Stratco Limited
                    <br />
                    Kisakye Complex, Office 301, Bugolobi
                    <br />
                    P.O. Box 144568, Kampala, Uganda
                  </p>
                </div>
              </div>

              {/* Right: Clean Interactive Brief Composer */}
              <div className="ct-composer">
                {/* Step 01: Segmented Discipline Pills */}
                <div className="ct-step">
                  <div className="ct-step__head">
                    <span className="ct-step__num">01</span>
                    <span className="ct-step__title">Select discipline</span>
                  </div>

                  <div className="ct-seg-tabs" role="tablist">
                    {(
                      [
                        ['live', 'Live & Broadcast'],
                        ['tvc', 'TVCs & Film'],
                        ['brand', 'Brand & Campaigns'],
                        ['strategy', 'Strategy'],
                      ] as [ProjectIntent, string][]
                    ).map(([key, label]) => (
                      <button
                        key={key}
                        type="button"
                        role="tab"
                        aria-selected={formIntent === key}
                        className={`ct-seg-btn ${
                          formIntent === key ? 'is-active' : ''
                        }`}
                        onClick={() => handleIntentChange(key)}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 02: Clean Interactive Deliverable Pills */}
                <div className="ct-step">
                  <div className="ct-step__head">
                    <span className="ct-step__num">02</span>
                    <span className="ct-step__title">Scope & deliverables</span>
                    <span className="ct-step__meta">
                      {selectedScopes.length} selected
                    </span>
                  </div>

                  <div className="ct-pills">
                    {SCOPE_OPTIONS[formIntent].map((chip) => {
                      const active = selectedScopes.includes(chip);
                      return (
                        <button
                          key={chip}
                          type="button"
                          className={`ct-pill ${active ? 'is-active' : ''}`}
                          onClick={() => toggleScopeChip(chip)}
                        >
                          <span className="ct-pill__dot" />
                          <span>{chip}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Step 03: Target Timeline Quick Pills */}
                <div className="ct-step">
                  <div className="ct-step__head">
                    <span className="ct-step__num">03</span>
                    <span className="ct-step__title">Target timeline</span>
                  </div>

                  <div className="ct-pills">
                    {TIMELINE_PRESETS.map((preset) => {
                      const active = timeline === preset;
                      return (
                        <button
                          key={preset}
                          type="button"
                          className={`ct-pill ct-pill--compact ${
                            active ? 'is-active' : ''
                          }`}
                          onClick={() =>
                            setTimeline((prev) =>
                              prev === preset ? '' : preset
                            )
                          }
                        >
                          <span>{preset}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Step 04: Clean Contact & Brief Fields */}
                <form className="ct-form" onSubmit={handleSubmit}>
                  <div className="ct-field">
                    <label htmlFor="name">Your Name</label>
                    <input
                      id="name"
                      type="text"
                      placeholder="Full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="ct-field">
                    <label htmlFor="org">Organization</label>
                    <input
                      id="org"
                      type="text"
                      placeholder="Company, ministry, or institution"
                      value={org}
                      onChange={(e) => setOrg(e.target.value)}
                      required
                    />
                  </div>

                  <div className="ct-field ct-field--full">
                    <label htmlFor="email">Work Email</label>
                    <input
                      id="email"
                      type="email"
                      placeholder="name@organization.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="ct-field ct-field--full">
                    <label htmlFor="notes">Project Brief</label>
                    <textarea
                      id="notes"
                      rows={3}
                      placeholder="Share your campaign objective, target districts or venue, and key dates..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                    />
                  </div>

                  <div className="ct-form__actions">
                    <button type="submit" className="btn-zj">
                      <span className="btn-zj__label">Send project brief</span>
                      <span className="btn-zj__tile">
                        <ArrowNeIcon />
                      </span>
                    </button>

                    <span className="ct-form__hint">
                      Direct to Stratco Production Desk · Response within 24h
                    </span>
                  </div>

                  {mailtoHref && (
                    <div className="ct-dispatch-card">
                      <div className="ct-dispatch-card__left">
                        <span className="ct-dispatch-card__dot" />
                        <div>
                          <strong>Brief ready for Stratco</strong>
                          <p>
                            {getIntentLabel(formIntent)} ·{' '}
                            {selectedScopes.length || 1} deliverable
                            {selectedScopes.length === 1 ? '' : 's'}
                          </p>
                        </div>
                      </div>

                      <div className="ct-dispatch-card__btns">
                        <button
                          type="button"
                          className="ct-copy-btn"
                          onClick={handleCopyBrief}
                        >
                          {briefCopied ? 'Brief copied ✓' : 'Copy brief'}
                        </button>
                        <a href={mailtoHref} className="ct-mail-btn">
                          <span>Open Mail App</span>
                          <ArrowNeIcon />
                        </a>
                      </div>
                    </div>
                  )}
                </form>
              </div>
            </div>

            <footer className="footer-bar">
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.25rem',
                }}
              >
                <StratcoWordmark
                  variant="inverted"
                  width={142}
                  showTagline={false}
                />
                <span>© 2026 Stratco Limited · Kampala, Uganda</span>
              </div>

              <div style={{ display: 'flex', gap: '1.5rem' }}>
                <a href="#work">Work</a>
                <a href="#services">What we do</a>
                <a href="#process">Approach</a>
                <a href="#about">About</a>
                <a href="mailto:info@stratco.agency">info@stratco.agency</a>
              </div>
            </footer>
          </div>
        </section>
      </main>
    </div>
  );
}
