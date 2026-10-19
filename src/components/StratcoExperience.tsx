'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { CASE_STUDIES, CaseStudy } from '@/data/stratcoData';
import {
  StratcoMark,
  StratcoWordmark,
  ArrowNeIcon,
} from '@/components/StratcoVectors';

export default function StratcoExperience() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeCase, setActiveCase] = useState<CaseStudy | null>(null);
  const [formIntent, setFormIntent] = useState<'branding' | 'events'>('branding');
  const [name, setName] = useState('');
  const [org, setOrg] = useState('');
  const [email, setEmail] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [notes, setNotes] = useState('');
  const [mailtoHref, setMailtoHref] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const typeLabel =
      formIntent === 'events' ? 'Event Coverage Inquiry' : 'Branding Inquiry';
    const subject = encodeURIComponent(
      `${typeLabel}: ${org || name || 'New Project'}`
    );
    const body = encodeURIComponent(
      [
        `Name: ${name}`,
        `Organization: ${org}`,
        `Email: ${email}`,
        ...(formIntent === 'events' ? [`Event Date: ${eventDate || 'TBD'}`] : []),
        '',
        notes,
      ].join('\n')
    );
    setMailtoHref(`mailto:info@stratco.agency?subject=${subject}&body=${body}`);
  };

  return (
    <>
      {/* ====================================================================
          NAVBAR
          ==================================================================== */}
      <header className={`navbar ${isScrolled ? 'is-scrolled' : ''}`}>
        <div className="container navbar__inner">
          <a href="#top" aria-label="Stratco Home">
            <StratcoWordmark variant="adaptive-nav" width={112} />
          </a>

          <nav className="navbar__links" aria-label="Primary">
            <a href="#about" className="navbar__link">
              About
            </a>
            <a href="#branding" className="navbar__link">
              Services
            </a>
            <a href="#work" className="navbar__link">
              Work
            </a>
            <Link href="/brand" className="navbar__link">
              Brand
            </Link>
          </nav>

          <a href="#contact" className="btn-zj">
            <span className="btn-zj__label">Contact us</span>
            <span className="btn-zj__tile">
              <ArrowNeIcon />
            </span>
          </a>
        </div>
      </header>

      <main id="top">
        {/* ==================================================================
            01. HERO
            ================================================================== */}
        <section className="hero section-dark">
          <StratcoMark
            className="watermark hero__watermark"
            color="#FFFFFF"
          />

          <div className="container hero__content">
            <div className="u-grid">
              <div className="hero__headline">
                <h1 className="display-1">
                  We make brands
                  <br />
                  people remember.
                </h1>
              </div>

              <div className="hero__sub">
                <p className="body-lg">
                  Stratco is a corporate branding and events agency. We plan,
                  create and capture the work that gets a brand noticed and
                  keeps it in mind.
                </p>
              </div>

              <div className="hero__actions">
                <a href="#contact" className="btn-zj">
                  <span className="btn-zj__label">Start a project</span>
                  <span className="btn-zj__tile">
                    <ArrowNeIcon />
                  </span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================================
            02. WHO WE ARE (Brand Manual Page 13 Lower Layout)
            ================================================================== */}
        <section className="section-light section-pad-lg" id="about">
          <div className="container">
            <div className="u-grid intro-split">
              <div className="intro-split__label">
                <h2 className="eyebrow">Who we are</h2>
              </div>

              <div className="intro-split__title">
                <p className="h2 ink">
                  An agency built on one idea: a brand only works if people
                  remember it.
                </p>
              </div>

              <div className="intro-split__body">
                <p className="body-md">
                  Most communication is seen once and gone by the next day. We
                  set a harder test for our work: will someone recall the name,
                  the feeling and the reason to choose you when it is time to
                  act?
                </p>
                <p className="body-md">
                  That test shapes every brief we take on, from a new corporate
                  identity to live coverage of a national summit. Strategy,
                  design, print production and film sit in one team, so the idea
                  stays intact from the first meeting to the final placement.
                </p>
              </div>
            </div>

            <div className="principles-grid">
              <article className="principle-card">
                <div>
                  <h3 className="h4 ink" style={{ marginBottom: '0.65rem' }}>
                    Start with the audience
                  </h3>
                  <p className="body-sm">
                    Before we draw a mark or set up a camera, we find out who
                    you need to reach and what they already think of you.
                  </p>
                </div>
                <div className="principle-card__photo">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=800&q=80"
                    alt="Strategy session"
                    loading="lazy"
                  />
                </div>
              </article>

              <article className="principle-card principle-card--tinted">
                <StratcoMark
                  className="watermark"
                  style={{
                    right: '-2rem',
                    top: '1rem',
                    width: '17rem',
                    height: '17rem',
                    opacity: 0.05,
                  }}
                  color="#1B1B1B"
                />
                <div
                  className="principle-card__photo"
                  style={{ marginTop: 0, marginBottom: '1.75rem' }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80"
                    alt="Brand design review"
                    loading="lazy"
                  />
                </div>
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <h3 className="h4 ink" style={{ marginBottom: '0.65rem' }}>
                    Be worth remembering
                  </h3>
                  <p className="body-sm">
                    Attention is easy to buy and quick to lose. We aim for the
                    idea people repeat to someone else the next day.
                  </p>
                </div>
              </article>

              <article className="principle-card">
                <div>
                  <h3 className="h4 ink" style={{ marginBottom: '0.65rem' }}>
                    Stay accountable
                  </h3>
                  <p className="body-sm">
                    Every project has clear deliverables and timelines agreed up
                    front, and we report against them in plain numbers.
                  </p>
                </div>
                <div className="principle-card__photo">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
                    alt="Production team"
                    loading="lazy"
                  />
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* ==================================================================
            03. CORPORATE BRANDING ("Identity.")
            ================================================================== */}
        <section className="section-stone section-pad" id="branding">
          <div className="container">
            <div className="u-grid chapter-head">
              <div className="chapter-head__left">
                <h2 className="eyebrow" style={{ marginBottom: '0.6rem' }}>
                  Corporate branding
                </h2>
                <p className="display-2 ink">Identity.</p>
              </div>
              <div className="chapter-head__right">
                <p className="body-lg">
                  We design complete visual systems that hold together everywhere
                  your organization appears, from boardroom stationery to street
                  signage and commercial fleets.
                </p>
              </div>
            </div>

            <div className="service-columns">
              <div className="service-col">
                <h3 className="h4 ink">Brand systems &amp; manuals</h3>
                <p className="body-sm">
                  Logo creation, typography, color standards and clear brand
                  guidelines that keep every department consistent.
                </p>
              </div>

              <div className="service-col">
                <h3 className="h4 ink">Stationery &amp; print</h3>
                <p className="body-sm">
                  Business cards, letterheads, presentation folders, annual
                  reports and commercial documentation.
                </p>
              </div>

              <div className="service-col">
                <h3 className="h4 ink">Signage &amp; environments</h3>
                <p className="body-sm">
                  Outdoor monolith totems, 3D building signage, reception walls
                  and exhibition displays.
                </p>
              </div>

              <div className="service-col">
                <h3 className="h4 ink">Fleet &amp; merchandise</h3>
                <p className="body-sm">
                  Commercial vehicle wraps, staff ID systems, corporate apparel
                  and executive gift kits.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================================
            04. EVENTS COVERAGE ("Presence.")
            ================================================================== */}
        <section className="section-beige section-pad" id="events">
          <div className="container">
            <div className="u-grid chapter-head">
              <div className="chapter-head__left">
                <h2 className="eyebrow" style={{ marginBottom: '0.6rem' }}>
                  Events coverage &amp; production
                </h2>
                <p className="display-2 ink">Presence.</p>
              </div>
              <div className="chapter-head__right">
                <p className="body-lg">
                  Conferences, AGMs and product launches happen once, but the
                  media captured in that room shapes your reputation all year.
                </p>
              </div>
            </div>

            <div className="service-columns">
              <div className="service-col">
                <h3 className="h4 ink">Multi-camera video</h3>
                <p className="body-sm">
                  Broadcast-grade 4K capture and livestreaming for conferences,
                  summits and corporate galas.
                </p>
              </div>

              <div className="service-col">
                <h3 className="h4 ink">Executive photography</h3>
                <p className="body-sm">
                  Natural, unobtrusive documentary photography capturing
                  keynotes, VIP protocol and delegates.
                </p>
              </div>

              <div className="service-col">
                <h3 className="h4 ink">Same-day edits</h3>
                <p className="body-sm">
                  On-site editors delivering press selects and highlight films
                  before your guests leave the venue.
                </p>
              </div>

              <div className="service-col">
                <h3 className="h4 ink">Stage &amp; venue branding</h3>
                <p className="body-sm">
                  Custom stage backdrops, podiums, media walls, banners and
                  delegate kits built by the same team.
                </p>
              </div>
            </div>

            <div className="feature-photo-frame">
              <div className="feature-photo-frame__img">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1400&q=85"
                  alt="Corporate conference coverage"
                  loading="lazy"
                />
              </div>
              <div className="feature-photo-frame__copy">
                <div>
                  <span className="eyebrow" style={{ marginBottom: '0.6rem' }}>
                    One team on the floor
                  </span>
                  <h3 className="h3 ink" style={{ marginBottom: '0.85rem' }}>
                    When the team that designs the stage also directs the
                    cameras, every frame looks right.
                  </h3>
                  <p className="body-sm">
                    No handoff gaps between designers, fabricators and camera
                    crews. We manage the stage look and the live broadcast under
                    one brief.
                  </p>
                </div>
                <div>
                  <a
                    href="#contact"
                    className="link-arrow"
                    onClick={() => setFormIntent('events')}
                  >
                    <span>Book event coverage</span>
                    <span>↗</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================================
            05. SELECTED WORK
            ================================================================== */}
        <section className="section-dark section-pad" id="work">
          <div className="container">
            <div className="u-grid chapter-head" style={{ marginBottom: '1.5rem' }}>
              <div className="chapter-head__left">
                <h2 className="eyebrow" style={{ marginBottom: '0.6rem' }}>
                  Selected work
                </h2>
                <p className="display-2">Proof in the work.</p>
              </div>
              <div className="chapter-head__right">
                <p className="body-lg" style={{ color: 'var(--grey-250)' }}>
                  Recent identity systems, physical rollouts and live event
                  productions.
                </p>
              </div>
            </div>

            <div className="work-list">
              {CASE_STUDIES.map((cs) => (
                <article
                  key={cs.id}
                  className="work-card"
                  onClick={() => setActiveCase(cs)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="work-card__img">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={cs.image} alt={cs.title} loading="lazy" />
                  </div>
                  <div className="work-card__body">
                    <div>
                      <span
                        className="body-sm"
                        style={{
                          color: 'var(--grey-350)',
                          display: 'block',
                          marginBottom: '0.5rem',
                        }}
                      >
                        {cs.badge}
                      </span>
                      <h3
                        className="h4"
                        style={{ color: '#FFFFFF', marginBottom: '0.65rem' }}
                      >
                        {cs.title}
                      </h3>
                      <p className="body-sm" style={{ color: 'var(--grey-250)' }}>
                        {cs.summary}
                      </p>
                    </div>
                    <div>
                      <span className="link-arrow">
                        <span>Read brief</span>
                        <span>↗</span>
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ==================================================================
            06. SECTORS
            ================================================================== */}
        <section className="section-light section-pad">
          <div className="container">
            <div className="u-grid">
              <div style={{ gridColumn: '1 / 7' }}>
                <h2 className="eyebrow" style={{ marginBottom: '0.6rem' }}>
                  Industries
                </h2>
                <p className="h2 ink">Who we work with.</p>
              </div>
            </div>

            <div className="sector-table">
              <div className="sector-item">
                <h3 className="h3 ink">Financial services &amp; banking</h3>
                <p className="body-md">
                  Corporate rebrands, branch signage systems, annual reports and
                  AGM coverage.
                </p>
              </div>
              <div className="sector-item">
                <h3 className="h3 ink">Mobility, energy &amp; infrastructure</h3>
                <p className="body-md">
                  Commercial fleet livery, site totems, launch films and
                  stakeholder documentaries.
                </p>
              </div>
              <div className="sector-item">
                <h3 className="h3 ink">Government &amp; institutions</h3>
                <p className="body-md">
                  Summit stage branding, multi-day conference coverage and
                  public-facing communications.
                </p>
              </div>
              <div className="sector-item">
                <h3 className="h3 ink">Telecom &amp; enterprise</h3>
                <p className="body-md">
                  Product launches, executive portraiture, corporate stationery
                  and merchandise.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================================
            07. CONTACT & FOOTER
            ================================================================== */}
        <section className="section-dark section-pad" id="contact">
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

          <div className="container" style={{ position: 'relative', zIndex: 2 }}>
            <div className="u-grid">
              <div style={{ gridColumn: '1 / 10' }}>
                <h2 className="eyebrow" style={{ marginBottom: '0.6rem' }}>
                  Contact
                </h2>
                <p className="display-2">Start a conversation.</p>
              </div>
            </div>

            <div className="u-grid contact-layout">
              <div className="contact-details">
                <div>
                  <p className="body-md" style={{ color: '#FFFFFF', fontWeight: 500 }}>
                    Stratco Limited
                  </p>
                  <p className="body-sm" style={{ color: 'var(--grey-250)', marginTop: '0.35rem' }}>
                    Kisakye Complex, Office 301, Bugolobi
                    <br />
                    P.O. Box 144568, Kampala, Uganda
                  </p>
                </div>

                <div>
                  <p className="body-sm" style={{ color: 'var(--grey-350)' }}>
                    Telephone
                  </p>
                  <p className="body-md" style={{ color: '#FFFFFF', marginTop: '0.2rem' }}>
                    <a href="tel:+256772833500">+256 772 833500</a>
                    <br />
                    <a href="tel:+256772700708">+256 772 700708</a>
                  </p>
                </div>

                <div>
                  <p className="body-sm" style={{ color: 'var(--grey-350)' }}>
                    Email
                  </p>
                  <p className="body-md" style={{ color: '#FFFFFF', marginTop: '0.2rem' }}>
                    <a href="mailto:info@stratco.agency">info@stratco.agency</a>
                  </p>
                </div>
              </div>

              <div className="contact-form-wrap">
                <div className="intent-tabs" role="tablist">
                  <button
                    type="button"
                    className={`intent-tab ${
                      formIntent === 'branding' ? 'is-active' : ''
                    }`}
                    onClick={() => setFormIntent('branding')}
                  >
                    Corporate branding
                  </button>
                  <button
                    type="button"
                    className={`intent-tab ${
                      formIntent === 'events' ? 'is-active' : ''
                    }`}
                    onClick={() => setFormIntent('events')}
                  >
                    Event coverage
                  </button>
                </div>

                <form className="minimal-form" onSubmit={handleSubmit}>
                  <div className="field">
                    <label htmlFor="name">Name</label>
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="field">
                    <label htmlFor="org">Organization</label>
                    <input
                      id="org"
                      type="text"
                      value={org}
                      onChange={(e) => setOrg(e.target.value)}
                      required
                    />
                  </div>

                  <div className="field">
                    <label htmlFor="email">Email</label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  {formIntent === 'events' ? (
                    <div className="field">
                      <label htmlFor="eventDate">Event date</label>
                      <input
                        id="eventDate"
                        type="date"
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                      />
                    </div>
                  ) : (
                    <div className="field" />
                  )}

                  <div className="field field--full">
                    <label htmlFor="notes">Tell us about your project or event</label>
                    <textarea
                      id="notes"
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                    />
                  </div>

                  <div className="field field--full" style={{ marginTop: '0.75rem' }}>
                    <div>
                      <button type="submit" className="btn-zj">
                        <span className="btn-zj__label">Send inquiry</span>
                        <span className="btn-zj__tile">
                          <ArrowNeIcon />
                        </span>
                      </button>
                    </div>

                    {mailtoHref && (
                      <p className="body-sm" style={{ marginTop: '1rem' }}>
                        <a
                          href={mailtoHref}
                          style={{ color: '#FFFFFF', textDecoration: 'underline' }}
                        >
                          Open email draft to info@stratco.agency ↗
                        </a>
                      </p>
                    )}
                  </div>
                </form>
              </div>
            </div>

            <footer className="footer-bar">
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <StratcoWordmark
                  variant="inverted"
                  width={105}
                  showTagline={false}
                />
                <span>© 2026 Stratco Limited</span>
              </div>

              <div style={{ display: 'flex', gap: '1.75rem' }}>
                <Link href="/brand">Brand guidelines</Link>
                <a href="mailto:info@stratco.agency">info@stratco.agency</a>
              </div>
            </footer>
          </div>
        </section>
      </main>

      {/* ====================================================================
          MINIMAL CASE STUDY MODAL
          ==================================================================== */}
      <div
        className={`modal-backdrop ${activeCase ? 'is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        onClick={(e) => {
          if (e.target === e.currentTarget) setActiveCase(null);
        }}
      >
        {activeCase && (
          <div className="modal-card">
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                gap: '1rem',
                paddingBottom: '1.25rem',
                borderBottom: '1px solid var(--line-dark)',
              }}
            >
              <div>
                <span className="eyebrow" style={{ marginBottom: '0.35rem' }}>
                  {activeCase.badge}
                </span>
                <h3 className="h3" style={{ color: '#FFFFFF' }}>
                  {activeCase.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveCase(null)}
                style={{ color: '#FFFFFF', fontSize: '1.1rem', padding: '0.25rem 0.5rem' }}
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div style={{ marginTop: '1.5rem', display: 'grid', gap: '1rem' }}>
              <p className="body-md">{activeCase.challenge}</p>
              <p className="body-md">{activeCase.solution}</p>

              <div
                style={{
                  paddingTop: '1.25rem',
                  borderTop: '1px solid var(--line-dark)',
                }}
              >
                <span
                  className="body-sm"
                  style={{ color: '#FFFFFF', display: 'block', marginBottom: '0.5rem' }}
                >
                  Deliverables
                </span>
                <ul style={{ display: 'grid', gap: '0.35rem' }}>
                  {activeCase.deliverables.map((item) => (
                    <li key={item} className="body-sm">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
