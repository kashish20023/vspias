import React, { Suspense } from 'react';
import { ASSETS } from '@/content/assets';
import { QuoteForm } from '@/components/enquiry/QuoteForm';

export default function PaperEnquirySection(): JSX.Element {
  return (
    <section
      className="section paper-enquiry-section"
      id="enquiry-section"
      aria-label="Direct Enquiry & Quotation"
    >
      <div className="wrap">
        <div className="enquiry-split-layout">
          {/* Left Column: Product Visual & Company Desk */}
          <div className="enquiry-visual-col">
            <div className="eyebrow">DIRECT PROCUREMENT &middot; BENGALURU</div>
            <h2 className="enquiry-heading">
              Ready to discuss<br />
              your paper bags?
            </h2>
            <p className="enquiry-desc">
              Speak directly with our team in Peenya, Bengaluru to specify paper grades, custom in-line print artwork, and production schedules for your business.
            </p>

            <div className="enquiry-stage-card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={ASSETS.bagArtwork}
                alt="Studio photograph of paper bags ready for commercial branding"
                className="enquiry-bag-visual"
                width={520}
                height={380}
              />
              <div className="enquiry-stage-caption">
                <strong>Direct Factory Procurement</strong> &middot; Peenya Industrial Area, Bengaluru
              </div>
            </div>

            <div className="enquiry-contacts-box">
              <div className="contact-item">
                <span className="contact-label">Technical &amp; Sales Desk</span>
                <strong className="contact-val">Paawan Bhargava</strong>
              </div>
              <div className="contact-item">
                <span className="contact-label">Telephone / WhatsApp</span>
                <a href="tel:+919783133333" className="contact-link">+91 97831 33333</a>
              </div>
              <div className="contact-item">
                <span className="contact-label">Direct Email</span>
                <a href="mailto:info@vspias.in" className="contact-link">info@vspias.in</a>
              </div>
              <div className="contact-item">
                <span className="contact-label">Facility Location</span>
                <span className="contact-val">Peenya 2nd Phase, Bengaluru, Karnataka</span>
              </div>
            </div>
          </div>

          {/* Right Column: Embedded Quote Form */}
          <div className="enquiry-form-col">
            <div className="form-card-container">
              <div className="form-card-header">
                <h3>Draft a Specific Quotation</h3>
                <p>
                  Share your estimated sizes, volume, and printing requirement. We prepare a transparent draft via Email or WhatsApp.
                </p>
              </div>
              <Suspense fallback={<div className="loading-state">Loading quotation desk...</div>}>
                <QuoteForm />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
