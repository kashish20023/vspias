import React from 'react';
import Link from 'next/link';

export default function CompactEnquiryBand(): JSX.Element {
  return (
    <section className="compact-enquiry-band" id="enquiry-connect" aria-label="Quick Enquiry">
      <div className="wrap">
        <div className="compact-enquiry-container">
          <div className="compact-enquiry-lead">
            <div className="enquiry-icon-box" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </div>
            <div className="enquiry-lead-divider" aria-hidden="true" />
            <h2 className="compact-enquiry-title">Have a requirement? Let&apos;s connect.</h2>
          </div>

          <div className="compact-enquiry-action">
            <Link href="/contact" className="enquiry-cta-btn" id="enquiry-band-cta">
              Send Enquiry <span className="arrow" aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
