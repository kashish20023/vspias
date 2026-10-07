import React from 'react';
import Link from 'next/link';
import { ASSETS } from '@/content/assets';

export default function AutomationHero(): JSX.Element {
  return (
    <section className="hero auto-hero-dark" id="automation-hero">
      <div className="wrap">
        <div className="hero-grid auto-hero-grid">
          <div className="hero-copy">
            <div className="eyebrow" style={{ color: 'var(--lime)' }}>
              ELECTRICAL &amp; INDUSTRIAL AUTOMATION
            </div>
            <h1 style={{ color: '#ffffff' }}>
              Powering<br />
              Industrial<br />
              Excellence.
            </h1>
            <p className="hero-subtext" style={{ color: '#c7d6ce' }}>
              The right products. A connected process. Sourcing and engineering support for control, power distribution and machine automation.
            </p>
            <div className="actions">
              <a href="#portfolio-section" className="button lime" id="auto-explore-portfolio-btn">
                Explore our portfolio <span className="arrow">↗</span>
              </a>
              <a href="#industries-section" className="button light" id="auto-discuss-app-btn">
                Discuss your application
              </a>
            </div>
            <div className="hero-note" style={{ color: '#8fa89b' }}>
              SOURCE-VERIFIED INDUSTRIAL AUTOMATION PORTFOLIO &middot; PEENYA BENGALURU
            </div>
          </div>

          <div className="hero-media auto-hero-media" style={{ background: '#091310' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={ASSETS.panels}
              alt="Industrial control panel integration from the supplied company brochure"
              width={650}
              height={576}
              style={{ objectFit: 'contain', padding: '24px' }}
            />
            <div className="media-caption">
              <span>Industrial Control Panel System</span>
              <a className="round-arrow" href="#portfolio-section" aria-label="Explore automation portfolio">
                ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
