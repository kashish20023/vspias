import React from 'react';
import Link from 'next/link';
import { APPROVED_ASSETS } from '@/content/assets';

export default function AboutPackagingSection(): JSX.Element {
  return (
    <section
      className="section about-packaging-olive"
      id="about-packaging-section"
      aria-label="About VSPIAS Paper Packaging"
    >
      <div className="wrap">
        <div className="about-olive-grid">
          {/* Left Column: Dark Olive Live Ivory Typography and Burnt Orange CTA */}
          <div className="about-olive-copy">
            <div className="eyebrow olive-eyebrow">ABOUT VSPIAS</div>
            
            <h2 className="olive-heading">
              Packaging that represents your brand.
            </h2>

            <div className="olive-text-body">
              <p className="olive-lead-text">
                Explore paper bag options for your business and bring your packaging ideas to life.
              </p>
              <p>
                <strong>VSPIAS Ecoautomation Pvt. Ltd.</strong> operates from Peenya Industrial Area, Bengaluru, delivering precision bag forming, in-line 2-colour flexographic printing, and volume manufacturing for commercial retail and foodservice chains.
              </p>
            </div>

            <div className="olive-stats-row">
              <div className="olive-stat-item">
                <span className="stat-label">Production Base</span>
                <strong className="stat-value">Peenya, Bengaluru</strong>
              </div>
              <div className="olive-stat-item">
                <span className="stat-label">In-Line Printing</span>
                <strong className="stat-value">2-Colour Flexo</strong>
              </div>
              <div className="olive-stat-item">
                <span className="stat-label">Substrate Range</span>
                <strong className="stat-value">70 &ndash; 140 GSM</strong>
              </div>
            </div>

            <div className="olive-action-row">
              <a
                href="#bag-range"
                className="button orange-accent-cta"
                id="about-explore-range-btn"
              >
                Explore Our Range <span className="arrow" aria-hidden="true">&rarr;</span>
              </a>
              <Link
                href="/contact?interest=Paper%20bags"
                className="button outline-ivory-cta"
              >
                Direct Consultation
              </Link>
            </div>
          </div>

          {/* Right Column: Visual Stage with approved 02-about bag photography */}
          <div className="about-olive-media">
            <div className="about-media-canvas">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={APPROVED_ASSETS.aboutBags}
                alt="Approved studio photograph of VSPIAS natural kraft and bleached white paper bags on stone counter with palm leaves against olive wall"
                className="about-bag-img about-approved-bag-img"
                width={982}
                height={941}
                loading="lazy"
              />
              <div className="about-media-tag">
                <span>Peenya 2nd Phase &middot; Bengaluru Manufacturing</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
