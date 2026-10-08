import React from 'react';
import Link from 'next/link';
import { APPROVED_ASSETS } from '@/content/assets';

const HIGHLIGHT_ROWS = [
  {
    id: 'explore',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
    title: 'Explore the range',
    desc: 'Compare bag styles and details.',
    href: '#bag-range',
    actionText: 'Compare Styles &rarr;'
  },
  {
    id: 'make-it-yours',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
    ),
    title: 'Make it yours',
    desc: 'Discuss your brand and packaging ideas.',
    href: '#customise-section',
    actionText: 'Custom Packaging &rarr;'
  },
  {
    id: 'plan-order',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
    ),
    title: 'Plan your order',
    desc: 'Share your requirements for a quote.',
    href: '/contact?interest=Paper%20bags',
    actionText: 'Request Quotation &rarr;'
  }
];

export default function BusinessHighlightsSection(): JSX.Element {
  return (
    <section
      className="section business-highlights-section"
      id="business-highlights"
      aria-label="Business Highlights & Portfolio Capabilities"
    >
      <div className="wrap">
        <div className="highlights-triptych-layout">
          {/* Left Column: Headline, Copy & CTA */}
          <div className="highlights-lead-col">
            <div className="eyebrow">BUSINESS HIGHLIGHTS</div>
            <h2 className="highlights-title">
              One range.<br />
              Many possibilities.
            </h2>
            <p className="highlights-desc">
              Explore the range, compare product details and tell us what your business needs. Precision-formed paper bags and custom flexographic printing built to elevate your brand.
            </p>
            <div className="highlights-cta-box">
              <Link
                href="/contact?interest=Paper%20bags"
                className="button primary-cta"
                id="highlights-quote-btn"
              >
                Request a Quote <span className="arrow" aria-hidden="true">&rarr;</span>
              </Link>
              <a
                href="#bag-range"
                className="button secondary-cta"
              >
                Inspect Range
              </a>
            </div>
          </div>

          {/* Central Column: Approved 4-Photo Collage from 05-business-highlights.png */}
          <div className="highlights-collage-col">
            <div className="collage-card">
              <div className="collage-img-box main-img">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={APPROVED_ASSETS.businessHighlightsCollage}
                  alt="Approved 4-photo photographic collage: kraft bags with twisted handles, kraft stand-up pouch, macro handle close-up, and bleached white and kraft bags"
                  className="collage-photo highlights-approved-collage-img"
                  width={692}
                  height={634}
                  loading="lazy"
                />
              </div>
              <div className="collage-caption-pill">
                <span>Natural Kraft &middot; Bleached White &middot; Stand-Up Pouch &middot; Twisted Handles</span>
              </div>
            </div>
          </div>

          {/* Right Column: Three Supporting Interactive Rows with Icons */}
          <div className="highlights-rows-col">
            <div className="highlights-rows-stack">
              {HIGHLIGHT_ROWS.map((row) => (
                <div key={row.id} className="highlight-row-item">
                  <div className="row-icon-badge" aria-hidden="true">
                    {row.icon}
                  </div>
                  <div className="row-content">
                    <h3 className="row-title">{row.title}</h3>
                    <p className="row-desc">{row.desc}</p>
                    <a href={row.href} className="row-action-link">
                      <span dangerouslySetInnerHTML={{ __html: row.actionText }} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
