'use client';

import React, { Suspense } from 'react';
import { QuoteForm } from '@/components/enquiry/QuoteForm';
import { EnquirySurface } from '@/components/motion/EnquirySurface';

export default function PremiumEnquirySection() {
  const handleCopyEnquiry = async () => {
    // Gather details from the live QuoteForm if present, or provide a formatted template
    const nameEl = document.getElementById('enquiry-name') as HTMLInputElement | null;
    const emailEl = document.getElementById('enquiry-email') as HTMLInputElement | null;
    const phoneEl = document.getElementById('enquiry-phone') as HTMLInputElement | null;
    const qtyEl = document.getElementById('enquiry-quantity') as HTMLInputElement | null;
    const typeEl = document.getElementById('enquiry-bag-type') as HTMLSelectElement | null;
    const reqEl = document.getElementById('enquiry-requirements') as HTMLTextAreaElement | null;

    const name = nameEl?.value.trim() || '';
    const email = emailEl?.value.trim() || '';
    const phone = phoneEl?.value.trim() || '';
    const qty = qtyEl?.value.trim() || '';
    const bagType = typeEl?.value.trim() || 'Paper Bag Enquiry';
    const reqs = reqEl?.value.trim() || '';

    const text = `VSPIAS Paper Bag Enquiry
Name: ${name || 'N/A'}
Email: ${email || 'N/A'}
Phone: ${phone || 'N/A'}
Quantity: ${qty || 'N/A'}
Bag Type: ${bagType}
Requirements: ${reqs || 'Custom specifications'}`;

    const toastEl = document.getElementById('toast');
    const showToast = (msg: string) => {
      if (toastEl) {
        toastEl.textContent = msg;
        toastEl.classList.add('show');
        setTimeout(() => toastEl.classList.remove('show'), 4500);
      }
    };

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.cssText = 'position:fixed;left:-9999px;top:0';
        document.body.appendChild(textarea);
        textarea.select();
        const ok = document.execCommand('copy');
        textarea.remove();
        if (!ok) throw new Error('Copy failed');
      }
      showToast('Enquiry details copied. You can paste them into your email or message.');
    } catch (_) {
      showToast('Copy is unavailable in this browser. Please select and copy manually.');
    }
  };

  return (
    <section className="enq" id="enquiry" aria-labelledby="enquiryTitle">
      {/* Anchor alias to support existing #enquiry-section deep links */}
      <div id="enquiry-section" style={{ position: 'relative', top: '-96px' }} />

      <div className="wrap enq-grid">
        <div className="contact">
          <div className="eyebrow">Let’s make something yours</div>
          <h2 id="enquiryTitle">
            A good bag starts<br />with a <em>conversation.</em>
          </h2>
          <p className="lede">
            Tell us what you’re packaging. We’ll help you bring together the format, paper and finishing details.
          </p>

          <div className="checks">
            <span>Bag size</span>
            <span>Quantity</span>
            <span>Print colours</span>
            <span>Handle type</span>
          </div>

          <div className="crow">
            <span className="cicon">
              <svg className="icon" aria-hidden="true"><use href="#i-user" /></svg>
            </span>
            <div>
              <small>Your contact</small>
              <b>Paawan Bhargava</b>
            </div>
          </div>

          <a className="crow" href="tel:+919783133333" aria-label="Call +91 97831 33333">
            <span className="cicon">
              <svg className="icon" aria-hidden="true"><use href="#i-phone" /></svg>
            </span>
            <div>
              <small>Call us</small>
              <b>+91 97831 33333</b>
            </div>
          </a>

          <a className="crow" href="mailto:info@vspias.in" aria-label="Email info@vspias.in">
            <span className="cicon">
              <svg className="icon" aria-hidden="true"><use href="#i-mail" /></svg>
            </span>
            <div>
              <small>Email us</small>
              <b>info@vspias.in</b>
            </div>
          </a>

          <div className="crow">
            <span className="cicon">
              <svg className="icon" aria-hidden="true"><use href="#i-pin" /></svg>
            </span>
            <div>
              <small>Location</small>
              <b>Peenya, Bengaluru</b>
            </div>
          </div>

          <div className="cbtns">
            <a
              className="btn lime"
              href="https://wa.me/919783133333?text=Hi%20VSPIAS%2C%20I%27d%20like%20to%20discuss%20paper%20bags."
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="icon" aria-hidden="true"><use href="#i-chat" /></svg>
              WhatsApp us
            </a>
            <a className="btn ghost" href="tel:+919783133333">
              Call now <svg className="icon" aria-hidden="true"><use href="#i-arrow" /></svg>
            </a>
          </div>

          <button
            type="button"
            className="copy-enquiry"
            id="copyEnquiry"
            onClick={handleCopyEnquiry}
          >
            <svg className="icon" aria-hidden="true"><use href="#i-copy" /></svg>
            Copy your enquiry details
          </button>
        </div>

        <div className="enquiry-form-column">
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
