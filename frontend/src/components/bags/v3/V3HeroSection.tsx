'use client';

import React from 'react';
import Link from 'next/link';

export default function V3HeroSection(): JSX.Element {
  return (
    <section className="pb-hero" id="home-hero" aria-label="Paper Packaging Division Overview">
      <div className="pb-wrap pb-hero-grid">
        {/* Left Column: Value proposition and CTAs */}
        <div className="pb-hero-copy">
          <div className="pb-eyebrow">Paper packaging division &middot; Bengaluru</div>
          <h1>
            Paper bags, <em>crafted</em> for brands that carry weight.
          </h1>
          <p className="pb-hero-lead">
            Reel-fed manufacturing with in-line 2-colour flexographic printing. Custom sizes,
            reinforced handles and brand imprints, supplied direct from our Bengaluru production hub.
          </p>

          <div className="pb-hero-ctas">
            <a className="pb-btn pb-pri" href="#range" id="hero-explore-collection-btn">
              Explore bag range &rarr;
            </a>
            <a className="pb-btn pb-sec" href="#studio" id="hero-design-studio-btn">
              Design in 3D
            </a>
          </div>

          <div className="pb-hero-metrics">
            <div>
              <b>100%</b>
              <span>Recyclable paper</span>
            </div>
            <div>
              <b>2-COL</b>
              <span>In-line flexo print</span>
            </div>
            <div>
              <div>
                <b>70&ndash;140</b>
                <span>GSM substrate range</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Architectural Arch + Dual Bag Composition */}
        <div className="pb-hv">
          <div className="pb-hv-card" role="img" aria-label="VSPIAS manufactured kraft and white paper bags">
            <div className="pb-hv-dots" aria-hidden="true" />
            <div className="pb-hv-arch" aria-hidden="true" />

            {/* Secondary bag (White / Ivory luxury tote) */}
            <div className="pb-hv-second" aria-hidden="true">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/approved/02-about-bags.png"
                alt="White kraft luxury bag with rope handle"
                loading="eager"
                decoding="async"
              />
            </div>

            {/* Primary bag (Natural brown kraft carry bag) */}
            <div className="pb-hv-main" aria-hidden="true">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/approved/01-hero-bags.png"
                alt="Premium kraft paper shopping bag manufactured by VSPIAS"
                loading="eager"
                decoding="async"
              />
            </div>

            {/* Floating feature chips */}
            <div className="pb-chip c1">
              <i>♻</i>
              <div>
                Recyclable kraft
                <small>Virgin &amp; recycled options</small>
              </div>
            </div>

            <div className="pb-chip c2">
              <i>✦</i>
              <div>
                Brand imprint
                <small>1 or 2-colour flexo</small>
              </div>
            </div>

            <div className="pb-chip c3">
              <i>⌂</i>
              <div>
                Direct factory supply
                <small>Bengaluru, India</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
