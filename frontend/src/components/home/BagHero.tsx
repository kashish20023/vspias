import React from 'react';
import Link from 'next/link';
import { ASSETS } from '@/content/assets';

export default function BagHero(): JSX.Element {
  return (
    <section className="hero bag-signature-hero" id="home-hero" aria-label="Paper bags product showcase hero">
      <div className="wrap">
        <div className="hero-stage-layout">
          {/* Left: 55-60% Product Stage echoing the watch reference */}
          <div className="hero-product-stage">
            <div className="hero-stage-canvas">
              {/* Tactical material / construction badges (max 2) */}
              <div className="stage-badge top-right" aria-label="Material feature">
                <span className="badge-dot" aria-hidden="true" />
                <span>Natural Kraft &amp; Ivory Papers</span>
              </div>
              <div className="stage-badge bottom-left" aria-label="Handle construction">
                <span className="badge-dot" aria-hidden="true" />
                <span>Twisted &amp; Flat Paper Handles</span>
              </div>

              {/* Dominant bag visual filling 70-80% of stage */}
              <div className="stage-image-container">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={ASSETS.bagArtwork}
                  alt="High-resolution studio photograph of natural kraft, forest-green and ivory paper bags showing handles, side gussets and structural base"
                  className="dominant-bag-img"
                  width={680}
                  height={580}
                  loading="eager"
                />
              </div>

              <div className="stage-caption-bar">
                <span className="caption-text">
                  Studio Presentation &middot; Natural Kraft, Forest Green &amp; Ivory Bags
                </span>
                <a href="#bag-range" className="caption-anchor" aria-label="Explore the bag collection">
                  Explore Range ↘
                </a>
              </div>
            </div>
          </div>

          {/* Right: 40-45% Copy Column */}
          <div className="hero-copy-column">
            <div className="hero-eyebrow">
              <span className="eyebrow-accent">PEENYA, BENGALURU</span> &middot; PACKAGING DIVISION
            </div>

            <h1 className="hero-title">
              <span className="hero-line">Paper bags.</span>
              <span className="hero-line">Printing.</span>
              <span className="hero-line highlight">Possibilities.</span>
            </h1>

            <div className="hero-proposition">
              <p className="hero-core-statement">
                Paper bags. Made for your brand.
              </p>
              <p className="hero-description">
                Explore our paper bag range and discuss the right format for your business. Precision in-line flexographic printing and volume manufacturing from our Bengaluru facility.
              </p>
            </div>

            <div className="hero-cta-group">
              <a href="#bag-range" className="button primary-cta" id="hero-explore-collection-btn">
                Explore Bag Range <span className="arrow" aria-hidden="true">↘</span>
              </a>
              <Link href="/contact?interest=Paper%20bags" className="button secondary-cta" id="hero-quote-btn">
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
                <span className="pdf-icon" aria-hidden="true">↓</span>
                <span>Download Technical Brochure (PDF, 12.5 MB)</span>
              </a>

              <div className="hero-proof-point">
                <span className="proof-indicator" aria-hidden="true">●</span>
                <span>Direct Peenya Manufacturing &middot; Verified B2B Supply</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
