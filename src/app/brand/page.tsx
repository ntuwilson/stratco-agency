'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  StratcoMark,
  StratcoWordmark,
  ArrowNeIcon,
} from '@/components/StratcoVectors';

export default function BrandGuidelinesPage() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToken = (val: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(val).catch(() => {});
    }
    setCopied(val);
    setTimeout(() => setCopied(null), 1600);
  };

  return (
    <div className="section-light" style={{ minHeight: '100vh' }}>
      <header
        style={{
          backgroundColor: '#1B1B1B',
          color: '#FFFFFF',
          padding: '1.25rem 0',
          borderBottom: '1px solid rgba(255,255,255,0.12)',
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Link href="/" aria-label="Back to Stratco Home">
            <StratcoWordmark variant="inverted" width={112} />
          </Link>

          <Link href="/" className="btn-zj">
            <span className="btn-zj__label">Back to site</span>
            <span className="btn-zj__tile">
              <ArrowNeIcon />
            </span>
          </Link>
        </div>
      </header>

      <section className="section-dark section-pad">
        <StratcoMark
          className="watermark"
          style={{ right: '-2rem', top: '2rem', width: '28rem', height: '28rem', opacity: 0.045 }}
          color="#FFFFFF"
        />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <span className="eyebrow" style={{ marginBottom: '0.6rem' }}>
            Brand guidelines
          </span>
          <h1 className="display-2" style={{ maxWidth: '42rem', marginBottom: '1.25rem' }}>
            Making Brands Unforgettable.
          </h1>
          <p className="body-lg" style={{ color: 'var(--grey-250)', maxWidth: '34rem' }}>
            Our logotype and symbol endorse all communications we create. Below are our core logo variations, color standards and typography rules.
          </p>
        </div>
      </section>

      <section className="section-light section-pad">
        <div className="container">
          <span className="eyebrow" style={{ marginBottom: '0.6rem' }}>
            Logo variations
          </span>
          <h2 className="h2 ink" style={{ marginBottom: '2.5rem' }}>
            Four approved lockups.
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1.25rem',
            }}
          >
            <div style={{ border: '1px solid var(--line-light)', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ height: '10rem', background: '#EAEAEA', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <StratcoWordmark variant="full-color" width={160} />
              </div>
              <div style={{ padding: '1.25rem' }}>
                <h3 className="h4 ink">Full colour</h3>
                <p className="body-sm" style={{ marginTop: '0.35rem' }}>
                  Preferred version against white or light backgrounds.
                </p>
              </div>
            </div>

            <div style={{ border: '1px solid var(--line-light)', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ height: '10rem', background: '#3C3C3B', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <StratcoWordmark variant="inverted" width={160} />
              </div>
              <div style={{ padding: '1.25rem' }}>
                <h3 className="h4 ink">Inverted colour</h3>
                <p className="body-sm" style={{ marginTop: '0.35rem' }}>
                  For medium-to-dark backgrounds and photography.
                </p>
              </div>
            </div>

            <div style={{ border: '1px solid var(--line-light)', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ height: '10rem', background: '#EAEAEA', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <StratcoWordmark variant="mono-black" width={160} />
              </div>
              <div style={{ padding: '1.25rem' }}>
                <h3 className="h4 ink">Black &amp; white</h3>
                <p className="body-sm" style={{ marginTop: '0.35rem' }}>
                  Single-color application on light backgrounds.
                </p>
              </div>
            </div>

            <div style={{ border: '1px solid var(--line-light)', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ height: '10rem', background: '#1B1B1B', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <StratcoWordmark variant="mono-white" width={160} />
              </div>
              <div style={{ padding: '1.25rem' }}>
                <h3 className="h4 ink">Reverse white</h3>
                <p className="body-sm" style={{ marginTop: '0.35rem' }}>
                  Single-color application on dark backgrounds.
                </p>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '5rem', paddingTop: '3.5rem', borderTop: '1px solid var(--line-light)' }}>
            <span className="eyebrow" style={{ marginBottom: '0.6rem' }}>
              Palette &amp; type
            </span>
            <h2 className="h2 ink" style={{ marginBottom: '2rem' }}>
              Colors &amp; typography.
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
              {[
                { name: 'Stratco Red', hex: '#AA0622', specs: 'RGB 170, 6, 34 · CMYK 15, 100, 90, 10' },
                { name: 'Stratco Charcoal', hex: '#1B1B1B', specs: 'CMYK 75, 68, 67, 90' },
              ].map((c) => (
                <div
                  key={c.hex}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '1.5rem',
                    border: '1px solid var(--line-light)',
                    borderRadius: '4px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span
                      style={{
                        width: '2.75rem',
                        height: '2.75rem',
                        borderRadius: '4px',
                        backgroundColor: c.hex,
                        display: 'inline-block',
                      }}
                    />
                    <div>
                      <strong className="body-md ink" style={{ display: 'block' }}>
                        {c.name}
                      </strong>
                      <span className="body-sm">{c.specs}</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="link-arrow"
                    onClick={() => copyToken(c.hex)}
                  >
                    {copied === c.hex ? 'Copied' : c.hex}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
