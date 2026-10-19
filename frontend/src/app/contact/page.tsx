import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { QuoteForm } from '@/components/enquiry/QuoteForm';
import { FAQAccordion } from '@/components/enquiry/FAQAccordion';
import { EnquirySurface } from '@/components/motion/EnquirySurface';

export const metadata: Metadata = {
  title: 'Contact & Enquiries — VSPIAS',
  description:
    'Start a conversation with VSPIAS Ecoautomation for paper bag supply, printing machinery, or industrial automation products.'
};

export default function ContactPage(): JSX.Element {
  return (
    <main id="main-content">
      <div className="wrap page-intro">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span className="breadcrumb-separator" aria-hidden="true">/</span>
          <span>Start a conversation</span>
        </nav>

        <div className="quote-grid">
          <div className="quote-copy">
            <div>Let&apos;s make it happen</div>
            <h1>
              Good things<br />start with a<br />conversation.
            </h1>
            <p>Tell us what you need. We will use your requirements to start the right discussion.</p>

            <div className="contact-person">
              <h3>Paawan Bhargava</h3>
              <a href="tel:+919783133333">+91 97831 33333 ↗</a>
              <a href="mailto:info@vspias.in">info@vspias.in ↗</a>
              <p>
                #66, 6th Main Road, behind UCO Bank,<br />
                Peenya, Bengaluru 560058,<br />
                Karnataka, India.
              </p>
              <p className="note">
                Address supplied for the design; confirm the exact business location before launch.
              </p>
            </div>
          </div>

          <EnquirySurface label="Direct consultation and quotation request">
            <Suspense fallback={<div className="quote-form"><h3>Your next step, made simple.</h3><p>Loading form...</p></div>}>
              <QuoteForm />
            </Suspense>
          </EnquirySurface>
        </div>

        <FAQAccordion />
      </div>
    </main>
  );
}
