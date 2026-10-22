import React from 'react';
import Link from 'next/link';

export default function CompanyHero(): JSX.Element {
  return (
    <section className="company-hero-section" id="company-hero" aria-label="VSPIAS Ecoautomation Overview">
      <div className="company-hero-bg-stage" aria-hidden="true">
        <picture>
          <source type="image/webp" srcSet="/assets/approved-hero-composite.webp" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/approved-hero-composite.png"
            alt=""
            className="company-hero-bg-img"
            loading="eager"
            decoding="async"
            width={2400}
            height={720}
          />
        </picture>
      </div>

      <div className="wrap company-hero-wrap">
        <div className="company-hero-content">
          <h1 className="company-hero-title">
            <span className="title-line-1">Powering Industries.</span>
            <span className="title-line-2">Packaging the Future.</span>
          </h1>

          <p className="company-hero-body">
            Automation, electricals and paper packaging.
          </p>

          <div className="company-hero-actions">
            <Link
              href="/automation"
              className="hero-btn-primary"
              id="hero-explore-automation-btn"
            >
              Explore Automation <span className="arrow" aria-hidden="true">&rarr;</span>
            </Link>
            <Link
              href="/paper-bags"
              className="hero-btn-secondary"
              id="hero-explore-paper-btn"
            >
              Explore Paper Bags <span className="arrow" aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
