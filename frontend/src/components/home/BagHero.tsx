import React from 'react';
import Link from 'next/link';
import { ASSETS, APPROVED_ASSETS } from '@/content/assets';

export default function BagHero(): JSX.Element {
  return (
    <section className="hero bag-signature-hero" id="home-hero" aria-label="Paper bags product showcase hero">
      <div className="wrap">
        <div className="hero-stage-layout">
          {/* Left: 40-45% Live Editorial Copy Column */}
          <div className="hero-copy-column">
            <div className="hero-eyebrow">
              <span className="eyebrow-accent">VSPIAS</span> / PAPER BAGS &middot; Printing. Possibilities.
            </div>

            <h1 className="hero-title">
              <span className="hero-line">Paper bags.</span>
              <span className="hero-line highlight">Made for your brand.</span>
            </h1>

            <div className="hero-proposition">
              <p className="hero-core-statement">
                Explore our paper bag range and find the right fit for your business.
              </p>
              <p className="hero-description">
                Direct manufacturing from our Bengaluru facility with precision in-line 2-colour flexographic printing, custom dimensions, and certified commercial paper grades.
              </p>
            </div>

            <div className="hero-cta-group">
              <a
                href="#bag-range"
                className="button orange-accent-cta"
                id="hero-explore-collection-btn"
                style={{ backgroundColor: '#C4460F', borderColor: '#C4460F', color: '#ffffff' }}
              >
                Explore Bag Range <span className="arrow" aria-hidden="true">&rarr;</span>
              </a>
              <Link
                href="/contact?interest=Paper%20bags"
                className="button secondary"
                id="hero-quote-btn"
                style={{ backgroundColor: 'transparent', borderColor: 'rgba(25, 59, 45, 0.45)', color: '#183D2D' }}
              >
                Request a Quote
              </Link>
            </div>

            <div className="hero-meta-strip">
              <a
                href={ASSETS.companyBrochurePdf}
                target="_blank"
                rel="noopener noreferrer"
                className="brochure-download-link"
                title="Download technical brochure PDF (12.5 MB)"
              >
                <span className="pdf-icon" aria-hidden="true">&darr;</span>
                <span>Download Technical Brochure (PDF, 12.5 MB)</span>
              </a>

              <div className="hero-proof-point">
                <span className="proof-indicator" aria-hidden="true">&bull;</span>
                <span>Direct Bengaluru Manufacturing &middot; Verified B2B Supply</span>
              </div>
            </div>
          </div>

          {/* Right: 55-60% Dominant Product Stage featuring approved 01-hero four-bag photography */}
          <div className="hero-product-stage">
            <div className="hero-stage-canvas">
              {/* Tactical material / construction badges */}
              <div className="stage-badge top-right" aria-label="Material feature">
                <span className="badge-dot" aria-hidden="true" />
                <span>Natural Kraft &amp; Ivory Papers</span>
              </div>
              <div className="stage-badge bottom-left" aria-label="Handle construction">
                <span className="badge-dot" aria-hidden="true" />
                <span>Twisted &amp; Flat Paper Handles</span>
              </div>

              {/* Dominant 4-bag photography from approved 01-hero.png */}
              <div className="stage-image-container">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={APPROVED_ASSETS.heroBags}
                  alt="High-resolution studio photograph of four VSPIAS paper bags: yellow boutique shopper, tall botanical leaf bag, contour line-art kraft bag, and botanical kraft shopper on wooden surface"
                  className="dominant-bag-img hero-approved-bag-img"
                  width={1108}
                  height={768}
                  loading="eager"
                  fetchPriority="high"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
