import React from 'react';
import Link from 'next/link';
import { ASSETS } from '@/content/assets';
import ScopeStrip from './ScopeStrip';

export default function BagHero(): JSX.Element {
  return (
    <section className="hero" id="home-hero">
      <div className="wrap">
        <div className="hero-grid">
          <div>
            <div className="eyebrow">A new chapter in paper packaging</div>
            <h1>
              Better bags.<br />
              <span className="soft">Bigger</span><br />
              possibilities.
            </h1>
            <p>Paper bags for your brand. Machinery and printing solutions for what comes next.</p>
            <div className="actions">
              <a href="#collection-section" className="button" id="hero-explore-bags-btn">
                Explore Paper Bags <span className="arrow">↗</span>
              </a>
              <Link href="/industrial-solutions" className="button secondary" id="hero-plan-production-btn">
                Plan Your Production
              </Link>
            </div>
            <div className="hero-note">YOUR IDEA. THE RIGHT PAPER. A NEW POSSIBILITY.</div>
          </div>
          <div className="hero-media">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={ASSETS.bagArtwork}
              alt="Illustrative kraft, forest-green and ivory paper bag concepts"
              width={650}
              height={576}
            />
            <div className="media-caption">
              <span>Paper. With purpose.</span>
              <a className="round-arrow" href="#collection-section" aria-label="Explore paper bags">
                ↗
              </a>
            </div>
          </div>
        </div>
        <ScopeStrip />
      </div>
    </section>
  );
}
