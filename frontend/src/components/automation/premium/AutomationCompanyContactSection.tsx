'use client';

import React, { Suspense } from 'react';
import { QuoteForm } from '@/components/enquiry/QuoteForm';

interface AutomationCompanyContactSectionProps {
  onStartConversation?: () => void;
}

export function AutomationCompanyContactSection({
  onStartConversation,
}: AutomationCompanyContactSectionProps) {
  const scrollToForm = () => {
    onStartConversation?.();
    const formEl = document.getElementById('enquiry-form-container');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="contact" id="company-section" aria-labelledby="contactTitle">
      <div className="wrap">
        <div className="contact-grid">
          <div className="contact-copy reveal">
            <p className="eyebrow">Your next project starts here</p>
            <h2 id="contactTitle">
              Let&apos;s put your
              <br />
              ideas <em>in motion.</em>
            </h2>
            <p>
              A product requirement, a panel drawing or an application to explore.
              Tell us what you&apos;re working on.
            </p>
            <button
              className="btn btn-lime"
              type="button"
              data-enquiry="Electrical & industrial automation"
              onClick={scrollToForm}
            >
              Start a conversation
              <svg className="icon" aria-hidden="true">
                <use href="#i-ne" />
              </svg>
            </button>
          </div>

          <div className="contact-details">
            <div className="contact-detail">
              <svg className="icon" aria-hidden="true">
                <use href="#i-mail" />
              </svg>
              <div>
                <span>Email your requirement</span>
                <a href="mailto:info@vspias.in">info@vspias.in</a>
              </div>
            </div>

            <div className="contact-detail">
              <svg className="icon" aria-hidden="true">
                <use href="#i-phone" />
              </svg>
              <div>
                <span>Speak with Paawan Bhargava</span>
                <a href="tel:+919783133333">+91 97831 33333</a>
              </div>
            </div>

            <div className="contact-detail">
              <svg className="icon" aria-hidden="true">
                <use href="#i-pin" />
              </svg>
              <div>
                <span>Our industrial hub</span>
                <strong>
                  Peenya, Bengaluru
                  <br />
                  Karnataka, India
                </strong>
              </div>
            </div>

            <p>
              VSPIAS Ecoautomation Pvt. Ltd.
              <br />
              Electrical, industrial automation and application-focused engineering support.
            </p>
          </div>
        </div>

        {/* Existing real project QuoteForm - strictly unchanged in markup, schema and API contract */}
        <div
          id="enquiry-form-container"
          style={{
            marginTop: '48px',
            paddingTop: '40px',
            borderTop: '1px solid rgba(255, 255, 255, 0.12)',
          }}
        >
          <div style={{ marginBottom: '24px' }}>
            <span
              className="eyebrow"
              style={{ color: 'var(--lime)', marginBottom: '8px' }}
            >
              Official Consultation &amp; Quotation Desk
            </span>
            <h3
              style={{
                fontSize: 'clamp(24px, 3vw, 36px)',
                fontWeight: 500,
                color: '#ffffff',
                margin: '8px 0 12px',
                letterSpacing: '-0.03em',
              }}
            >
              Request a formal quotation
            </h3>
            <p style={{ color: '#a6b5a8', fontSize: '14px', maxWidth: '600px' }}>
              Direct submissions route immediately to our engineering desk in
              Peenya. We verify component availability, ratings, and bill of
              materials before responding.
            </p>
          </div>

          <Suspense
            fallback={
              <div
                style={{
                  padding: '32px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '16px',
                  color: '#ffffff',
                }}
              >
                Loading quotation desk...
              </div>
            }
          >
            <QuoteForm />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
