'use client';

import React, { Suspense } from 'react';
import { QuoteForm } from '@/components/enquiry/QuoteForm';
import { EnquirySurface } from '@/components/motion/EnquirySurface';

export default function V3PaperEnquirySection(): JSX.Element {
  return (
    <section className="pb-enq-section" id="enquiry" aria-label="Paper Bag Volume Enquiry and Quotation Desk">
      {/* Anchor alias to support existing #enquiry-section deep links */}
      <div id="enquiry-section" style={{ position: 'relative', top: '-96px' }} />

      <div className="pb-wrap pb-enq-grid">
        {/* Left Column: Redesigned Premium Forest Green Contact Card */}
        <div className="pb-contact-card">
          <div className="pb-eyebrow">Commercial Desk &middot; Direct Sourcing</div>
          <h2>
            Request a custom <em>paper bag</em> quotation.
          </h2>
          <p className="pb-lede">
            Specify your desired size, estimated volume, and flexographic print details. Our Bengaluru manufacturing desk provides formal pricing and pre-production technical sign-off.
          </p>

          <div className="pb-checks-row" aria-label="Enquiry checklist">
            <span>Bag dimensions</span>
            <span>Order volume</span>
            <span>Print colours</span>
            <span>Handle style</span>
          </div>

          <div className="pb-crow">
            <i>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 21c1-4 4.5-6 8-6s7 2 8 6" />
              </svg>
            </i>
            <div>
              <small>Technical &amp; Sales Desk</small>
              <b>Paawan Bhargava</b>
            </div>
          </div>

          <a className="pb-crow" href="tel:+919783133333" aria-label="Call +91 97831 33333">
            <i>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
              </svg>
            </i>
            <div>
              <small>Telephone / Direct Call</small>
              <b>+91 97831 33333</b>
            </div>
          </a>

          <a className="pb-crow" href="mailto:info@vspias.in" aria-label="Email info@vspias.in">
            <i>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m3 7 9 6 9-6" />
              </svg>
            </i>
            <div>
              <small>Direct Email</small>
              <b>info@vspias.in</b>
            </div>
          </a>

          <div className="pb-crow">
            <i>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 21s7-6.2 7-11a7 7 0 0 0-14 0c0 4.8 7 11 7 11z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
            </i>
            <div>
              <small>Production Unit</small>
              <b>Bengaluru, Karnataka</b>
            </div>
          </div>

          <div className="pb-cbtns">
            <a
              className="pb-btn pb-lime"
              href="https://wa.me/919783133333?text=Hi%20VSPIAS%2C%20I%27d%20like%20a%20volume%20quotation%20for%20paper%20bags."
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp us &rarr;
            </a>
            <a className="pb-btn pb-ghost" href="tel:+919783133333">
              Call now
            </a>
          </div>
        </div>

        {/* Right Column: Protected Real Form with Backend Integration & Studio Sync */}
        <div className="pb-enq-form-wrap">
          <EnquirySurface label="Draft a specific quotation">
            <Suspense fallback={<div className="loading-state">Loading quotation desk...</div>}>
              <QuoteForm />
            </Suspense>
          </EnquirySurface>
        </div>
      </div>
    </section>
  );
}
