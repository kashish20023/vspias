'use client';

import React from 'react';

export default function PremiumHeroSection(): JSX.Element {
  return (
    <section className="hero" id="top" aria-labelledby="heroTitle">
      {/* Anchor alias to support existing #home-hero deep links */}
      <div id="home-hero" style={{ position: 'relative', top: '-112px' }} />

      <div className="wrap hero-grid">
        <div className="hero-copy">
          <div className="eyebrow">Paper packaging &middot; Bengaluru</div>
          <h1 id="heroTitle">
            <span className="title-clip">
              <span className="title-line">Paper bags.</span>
            </span>
            <span className="title-clip">
              <span className="title-line">Thoughtfully</span>
            </span>
            <span className="title-clip">
              <span className="title-line">
                <span className="mark">made yours.</span>
              </span>
            </span>
          </h1>
          <p className="hero-lead">
            A better first impression. A considered final detail.
            <br />
            Explore paper bags shaped, finished and printed for your brand &mdash; crafted at our Peenya manufacturing facility.
          </p>
          <div className="hero-actions">
            <a className="btn pri" href="#range">
              <span className="magnetic-content">
                Explore the collection <svg className="icon" aria-hidden="true"><use href="#i-arrow"></use></svg>
              </span>
            </a>
            <a className="btn sec" href="#studio">
              <span className="magnetic-content">
                Make it in 3D <svg className="icon" aria-hidden="true"><use href="#i-cube"></use></svg>
              </span>
            </a>
          </div>
          <div className="hero-proof">
            <div>
              <b>Your size.</b>
              <span>Made-to-order formats</span>
            </div>
            <div>
              <b>Your colour.</b>
              <span>1 or 2-colour flexo</span>
            </div>
            <div>
              <b>Your standard.</b>
              <span>100% recyclable paper</span>
            </div>
          </div>
        </div>

        <div className="hero-depth-shell">
          <figure className="hero-art">
            <span className="hero-glare" aria-hidden="true" />
            <div className="hero-scene">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                id="heroStudyImage"
                src="/assets/premium/hero-study-bags.webp"
                alt="Kraft, forest green and ivory paper bag styling concepts on warm stone"
                width={560}
                height={496}
                loading="eager"
                decoding="async"
              />
              <button
                className="photo-inspect"
                type="button"
                data-inspect-photo="heroStudyImage"
                data-viewer-title="Paper bag styling concepts"
                aria-label="Inspect hero photograph in high resolution"
              >
                <svg className="icon" aria-hidden="true">
                  <use href="#i-cube"></use>
                </svg>
                Tactile details
              </button>
            </div>

            <div className="hero-label">
              <span className="label-icon">
                <svg className="icon">
                  <use href="#i-leaf"></use>
                </svg>
              </span>
              <div>
                <b>Recyclable &amp; biodegradable</b>
                <small>Natural &amp; bleached kraft options</small>
              </div>
            </div>

            <a className="hero-seal" href="#studio" aria-label="Create your bag in the 3D studio">
              <svg className="icon">
                <use href="#i-cube"></use>
              </svg>
              Design
              <br />
              in 3D &nearr;
            </a>

            <figcaption className="hero-art-foot">
              <div>
                <strong>Natural. Versatile. Distinctively you.</strong>
                <br />
                <span>Explore paper substrates, custom handles and branding.</span>
              </div>
              <a className="round-arrow" href="#range" aria-label="Explore the bag collection">
                <svg className="icon" style={{ width: 14, height: 14 }}>
                  <use href="#i-arrow"></use>
                </svg>
              </a>
            </figcaption>
          </figure>
        </div>
      </div>

      <div className="wrap hero-bottom">
        <p>From the everyday counter to the memorable unboxing.</p>
        <a className="scroll-link" href="#range">
          Scroll to explore <svg className="icon"><use href="#i-down"></use></svg>
        </a>
      </div>

      {/* Continuous decorative text ribbon marquee */}
      <div className="brand-ribbon" aria-hidden="true">
        <div className="ribbon-track">
          {[1, 2].map((grp) => (
            <div key={grp} className="ribbon-group">
              <span className="ribbon-word">Sustainable paper packaging</span>
              <span className="ribbon-star">&lowast;</span>
              <span className="ribbon-word light">Direct from our Peenya facility</span>
              <span className="ribbon-star">&lowast;</span>
              <span className="ribbon-word">Custom sizes &amp; flexo printing</span>
              <span className="ribbon-star">&lowast;</span>
              <span className="ribbon-word light">Food, retail, pharmacy &amp; gifting</span>
              <span className="ribbon-star">&lowast;</span>
              <span className="ribbon-word">Square &amp; V-bottom formats</span>
              <span className="ribbon-star">&lowast;</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
