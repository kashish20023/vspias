import React from 'react';
import Link from 'next/link';
import { ASSETS } from '@/content/assets';

const STEPS = [
  {
    step: '01',
    phase: 'CHOOSE A FORMAT',
    title: 'Select Your Bag Format',
    description:
      'Choose between twisted paper cord carry bags, flat-handle grocery bags, or handle-less block-bottom takeaway pouches.'
  },
  {
    step: '02',
    phase: 'DEFINE SPECIFICATIONS',
    title: 'Share Dimensions & Quantity',
    description:
      'Provide your target bag dimensions (width × gusset × height in mm), preferred GSM weight, and projected order batch size.'
  },
  {
    step: '03',
    phase: 'BRAND IDENTITY',
    title: 'Discuss Branding & Flexo Print',
    description:
      'Review your vector brand logo and colours for precision 1 or 2-colour flexographic photopolymer stereo printing.'
  },
  {
    step: '04',
    phase: 'PRODUCTION & SUPPLY',
    title: 'Receive Quotation & Confirm',
    description:
      'Our Peenya team shares transparent pricing, paper availability, and production schedules directly from Bengaluru.'
  }
];

export default function CustomPackagingJourney(): JSX.Element {
  return (
    <section
      className="section custom-packaging-journey"
      id="customise-section"
      aria-label="Custom Packaging Process"
    >
      <div className="wrap">
        <div className="journey-card-layout">
          {/* Left Column: Heading and 4 Steps */}
          <div className="journey-steps-col">
            <div className="eyebrow">CUSTOM PACKAGING PROCESS &middot; BENGALURU</div>
            <h2 className="section-title">
              Make every<br />
              carry count.
            </h2>
            <p className="journey-lead">
              A transparent, 4-step path from your brand concept to high-speed reel-fed bag manufacturing at our Peenya facility.
            </p>

            <div className="steps-list" role="list">
              {STEPS.map((s) => (
                <div key={s.step} className="step-row" role="listitem">
                  <div className="step-num-box">
                    <span className="step-number">{s.step}</span>
                  </div>
                  <div className="step-detail">
                    <span className="step-phase">{s.phase}</span>
                    <h3 className="step-title">{s.title}</h3>
                    <p className="step-desc">{s.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="journey-actions">
              <Link
                href="/contact?interest=Paper%20bags&requirements=I%20would%20like%20to%20discuss%20a%20custom%20branded%20paper%20bag%20project."
                className="button primary-cta"
                id="journey-start-custom-btn"
              >
                Discuss Your Custom Bag <span className="arrow" aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Visual Stage */}
          <div className="journey-media-col">
            <div className="journey-media-card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={ASSETS.bagArtwork}
                alt="Custom printed paper bags illustrating brand identity and flexo printing options"
                className="journey-media-img"
                width={560}
                height={520}
              />
              <div className="journey-media-badge">
                <span className="badge-title">Direct Peenya Manufacturing</span>
                <span className="badge-subtitle">1 &amp; 2-colour flexo print in-line</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
