import React from 'react';
import Link from 'next/link';

export default function DivisionSolutionCards(): JSX.Element {
  return (
    <section className="division-solutions-section" id="division-solutions" aria-label="Specialized Business Divisions">
      <div className="wrap">
        <div className="solutions-cards-grid">
          {/* Card 1: Automation Solutions */}
          <div className="solution-card automation-card">
            <div className="solution-card-media">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/solution-auto-products.png"
                alt="Automation Solutions"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="solution-card-body">
              <h3 className="solution-card-title">
                Automation<br />Solutions
              </h3>
              <Link
                href="/automation"
                className="solution-btn"
                id="home-solution-automation-btn"
              >
                View Products <span className="arrow" aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>

          {/* Card 2: Paper Bag Solutions */}
          <div className="solution-card paper-card">
            <div className="solution-card-media">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/solution-paper-products.png"
                alt="Paper Bag Solutions"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="solution-card-body">
              <h3 className="solution-card-title">
                Paper Bag<br />Solutions
              </h3>
              <Link
                href="/paper-bags"
                className="solution-btn"
                id="home-solution-paper-btn"
              >
                View Products <span className="arrow" aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
