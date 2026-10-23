'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import { AnimatedEnquiryButton } from '@/components/motion/AnimatedEnquiryButton';

// Direct Google Apps Script Web App Endpoint
// Reads from NEXT_PUBLIC_GOOGLE_SCRIPT_URL (set in .env.local and hosting environment variables)
const GOOGLE_SCRIPT_URL =
  process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL ||
  'https://script.google.com/macros/s/AKfycbxWv5k0lPgpeeSep6nsaSrtWCFRTnOcNY-2K3f9SOZMIGDgC4vMiQEwM5m_eeHkwIQUPQ/exec';

// RFC-compatible email regex for strict client-side validation
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export function QuoteForm(): JSX.Element {
  const searchParams = useSearchParams();

  const [interest, setInterest] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [company, setCompany] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [quantity, setQuantity] = useState<string>('');
  const [requirements, setRequirements] = useState<string>('');
  const [consent, setConsent] = useState<boolean>(false);

  // Additional context parameters
  const [bagFinish, setBagFinish] = useState<string>('');
  const [brandName, setBrandName] = useState<string>('');
  const [industrySector, setIndustrySector] = useState<string>('');

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [referenceId, setReferenceId] = useState<string>('');
  const [mailtoUrl, setMailtoUrl] = useState<string>('#');
  const [whatsappUrl, setWhatsappUrl] = useState<string>('#');
  const [draftSummary, setDraftSummary] = useState<string>('');

  const [errorMessage, setErrorMessage] = useState<string>('');
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const rawInterest = searchParams.get('interest');
    if (rawInterest) {
      if (rawInterest.toLowerCase().includes('machine') || rawInterest.toLowerCase().includes('print')) {
        setInterest('Machinery & printing');
      } else if (rawInterest.toLowerCase().includes('auto') || rawInterest.toLowerCase().includes('elect')) {
        setInterest('Electrical & automation');
      } else {
        setInterest('Paper bags');
      }
    }

    const rawFinish = searchParams.get('finish');
    if (rawFinish) setBagFinish(rawFinish);

    const rawBrand = searchParams.get('brand');
    if (rawBrand) setBrandName(rawBrand);

    const rawIndustry = searchParams.get('industry');
    if (rawIndustry) setIndustrySector(rawIndustry);

    const rawReq = searchParams.get('requirements');
    if (rawReq) {
      setRequirements(rawReq);
    }

    const handleDesignSelected = (e: Event) => {
      const customEvent = e as CustomEvent;
      const design = customEvent.detail;
      if (!design) return;
      setInterest('Paper bags');
      if (design.brand) setBrandName(design.brand);
      if (design.paper) setBagFinish(`${design.paper} (${design.paperColour || ''})`);
      setRequirements(
        `Bag Studio Custom Configuration:\n- Paper: ${design.paper} (${design.paperColour})\n- Print: ${design.print} (${design.printColour})\n- Brand: "${design.brand}"\n- Pattern: ${design.pattern}\n- Handle: ${design.handle}\n- Proportions: ${design.shape}`
      );
    };

    window.addEventListener('vspias-design-selected', handleDesignSelected);
    return () => {
      window.removeEventListener('vspias-design-selected', handleDesignSelected);
    };
  }, [searchParams]);

  const isPaper = interest === 'Paper bags';
  const isMachine = interest === 'Machinery & printing';
  const isAuto = interest === 'Electrical & automation';

  const quantityLabel = isMachine
    ? 'Target output / required capacity'
    : isAuto
      ? 'Product / model / quantity'
      : 'Approximate quantity';

  const quantityPlaceholder = isMachine
    ? 'e.g. bags per minute, required print width'
    : isAuto
      ? 'e.g. product family, rating, quantity'
      : 'e.g. 10,000 bags per order';

  const handleInterestChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInterest(e.target.value);
    setSubmitted(false);
    setReferenceId('');
    setErrorMessage('');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Prevent duplicate in-flight requests
    if (isSubmitting) return;

    if (!interest) {
      setErrorMessage('Please select what you are interested in.');
      return;
    }
    if (!name.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!email.trim() || !EMAIL_REGEX.test(email.trim())) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (!requirements.trim()) {
      setErrorMessage('Please provide a brief summary of your requirements.');
      return;
    }
    if (!consent) {
      setErrorMessage('Please indicate your consent to be contacted.');
      return;
    }

    if (!GOOGLE_SCRIPT_URL) {
      setErrorMessage(
        'Google Apps Script endpoint is not configured. Please set NEXT_PUBLIC_GOOGLE_SCRIPT_URL in your environment.'
      );
      return;
    }

    setErrorMessage('');
    setIsSubmitting(true);

    let contextLines = '';
    if (isPaper) {
      if (bagFinish) contextLines += `Preferred Bag Finish: ${bagFinish}\n`;
      if (brandName) contextLines += `Brand Imprint Name: ${brandName}\n`;
    } else if (isAuto && industrySector) {
      contextLines += `Target Industrial Sector: ${industrySector}\n`;
    }

    const initialSubject = `VSPIAS Enquiry: ${interest}${industrySector ? ` — ${industrySector}` : ''}`;
    const initialBody = `Name: ${name.trim()}
Company: ${company.trim() || 'N/A'}
Email: ${email.trim()}
Phone / WhatsApp: ${phone.trim() || 'N/A'}
Business Interest: ${interest}
${contextLines}Quantity / Capacity: ${quantity.trim() || 'To be discussed'}

Requirements:
${requirements.trim()}

---
Enquiry initiated from VSPIAS web showcase (${interest === 'Paper bags' ? 'Bengaluru' : 'Peenya, Bengaluru'})`;

    setDraftSummary(initialBody);

    try {
      /**
       * GOOGLE APPS SCRIPT SUBMISSION WITH NO-CORS:
       * Google Apps Script Web Apps execute doPost(e) and record to Google Sheets / send email,
       * but return a 302 redirect that is subject to browser CORS and Google account restrictions.
       * By using mode: 'no-cors' with 'text/plain;charset=utf-8', the browser sends the payload
       * directly to Google Apps Script without throwing CORS redirect errors.
       */
      const generatedRef = 'VS-' + Math.random().toString(36).substring(2, 10).toUpperCase();

      const payload = {
        referenceId: generatedRef,
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        company: company.trim(),
        division: interest,
        quantity: quantity.trim(),
        requirements: requirements.trim(),
        bagFinish,
        brandName,
        industrySector,
        consent: true,
        hp: '' // Honeypot spam defense
      };

      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8'
        },
        body: JSON.stringify(payload)
      });

      // Successful dispatch to Google Apps Script
      setReferenceId(generatedRef);
      setSubmitted(true);
      setErrorMessage('');

      const refPrefix = `[Ref: ${generatedRef}] `;
      const updatedSubject = `VSPIAS Enquiry ${refPrefix}: ${interest}${industrySector ? ` — ${industrySector}` : ''}`;
      const updatedBody = `Reference ID: ${generatedRef}\n\n` + initialBody;

      setMailtoUrl(`mailto:info@vspias.in?subject=${encodeURIComponent(updatedSubject)}&body=${encodeURIComponent(updatedBody)}`);
      setWhatsappUrl(buildWhatsAppUrl(updatedSubject + '\n\n' + updatedBody));
      setDraftSummary(updatedBody);
    } catch {
      setSubmitted(false);
      setErrorMessage(
        'Connection error reaching Google Apps Script. Please verify your network or connect with us directly via WhatsApp or email below.'
      );
      setMailtoUrl(`mailto:info@vspias.in?subject=${encodeURIComponent(initialSubject)}&body=${encodeURIComponent(initialBody)}`);
      setWhatsappUrl(buildWhatsAppUrl(initialSubject + '\n\n' + initialBody));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="quote-form" id="quote-form" ref={formRef} onSubmit={handleSubmit} noValidate>
      {/* Invisible honeypot field for bot defense */}
      <input type="text" name="hp" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <h3>Your next step, made simple.</h3>
      <p style={{ fontSize: '14px', color: 'var(--muted)', marginBottom: '20px' }}>
        Configure your specifications below. Your request will be directly registered and confirmed with our engineering desk.
      </p>

      {errorMessage && (
        <div className="form-error-alert" role="alert" style={{ background: '#fdf2f2', border: '1px solid #f8b4b4', color: '#9b1c1c', padding: '12px 16px', borderRadius: '4px', marginBottom: '16px', fontSize: '13px' }}>
          <strong>Attention:</strong> {errorMessage}
          {mailtoUrl !== '#' && (
            <div style={{ marginTop: '12px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <a href={mailtoUrl} className="button" style={{ fontSize: '12px', padding: '8px 14px', minHeight: '36px' }}>
                Open in Email (info@vspias.in) ↗
              </a>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="button secondary" style={{ fontSize: '12px', padding: '8px 14px', minHeight: '36px' }}>
                Open in WhatsApp (+91 97831 33333) ↗
              </a>
            </div>
          )}
        </div>
      )}

      <label className="field">
        <span className="field-label">
          I am interested in <span aria-hidden="true" style={{ color: '#b91c1c' }}>*</span>
        </span>
        <select id="interest" name="interest" required value={interest} onChange={handleInterestChange}>
          <option value="">Select any one</option>
          <option value="Paper bags">Paper bags</option>
          <option value="Machinery & printing">Machinery & printing</option>
          <option value="Electrical & automation">Electrical & automation</option>
        </select>
      </label>

      {/* Contextual Indicators */}
      {isPaper && (bagFinish || brandName) && (
        <div className="form-context-badge" style={{ background: 'var(--sage)', padding: '10px 14px', borderRadius: '4px', marginBottom: '16px', fontSize: '12px', color: 'var(--ink)' }}>
          <span><strong>Carried from Preview:</strong> {bagFinish ? `Finish: ${bagFinish}` : ''}{bagFinish && brandName ? ' · ' : ''}{brandName ? `Brand: "${brandName}"` : ''}</span>
        </div>
      )}

      {isAuto && industrySector && (
        <div className="form-context-badge" style={{ background: 'var(--sage)', padding: '10px 14px', borderRadius: '4px', marginBottom: '16px', fontSize: '12px', color: 'var(--ink)' }}>
          <span><strong>Target Sector:</strong> {industrySector}</span>
        </div>
      )}

      <div className="form-row">
        <label className="field">
          <span className="field-label">
            Your name <span aria-hidden="true" style={{ color: '#b91c1c' }}>*</span>
          </span>
          <input
            name="name"
            required
            placeholder="Full name"
            autoComplete="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setSubmitted(false);
              setReferenceId('');
            }}
          />
        </label>
        <label className="field">
          <span className="field-label">Company</span>
          <input
            name="company"
            placeholder="Company name"
            autoComplete="organization"
            value={company}
            onChange={(e) => {
              setCompany(e.target.value);
              setSubmitted(false);
              setReferenceId('');
            }}
          />
        </label>
      </div>

      <div className="form-row">
        <label className="field">
          <span className="field-label">
            Email <span aria-hidden="true" style={{ color: '#b91c1c' }}>*</span>
          </span>
          <input
            type="email"
            name="email"
            required
            placeholder="you@company.com"
            autoComplete="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setSubmitted(false);
              setReferenceId('');
            }}
          />
        </label>
        <label className="field">
          <span className="field-label">Phone / WhatsApp</span>
          <input
            type="tel"
            name="phone"
            placeholder="+91 97831 33333"
            autoComplete="tel"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              setSubmitted(false);
              setReferenceId('');
            }}
          />
        </label>
      </div>

      <label className="field">
        <span className="field-label" id="quantity-label">{quantityLabel}</span>
        <input
          name="quantity"
          id="quantity-input"
          placeholder={quantityPlaceholder}
          value={quantity}
          onChange={(e) => {
            setQuantity(e.target.value);
            setSubmitted(false);
            setReferenceId('');
          }}
        />
      </label>

      <label className="field">
        <span className="field-label">
          Tell us about your requirements <span aria-hidden="true" style={{ color: '#b91c1c' }}>*</span>
        </span>
        <textarea
          name="requirements"
          required
          rows={4}
          placeholder="Bag size, paper GSM, print colours, target monthly volume or machine specifications..."
          value={requirements}
          onChange={(e) => {
            setRequirements(e.target.value);
            setSubmitted(false);
            setReferenceId('');
          }}
        />
      </label>

      <label className="check" style={{ marginTop: '12px' }}>
        <input
          type="checkbox"
          required
          checked={consent}
          onChange={(e) => {
            setConsent(e.target.checked);
            setErrorMessage('');
          }}
        />
        <span style={{ color: '#000000' }}>
          I agree to be contacted by VSPIAS regarding this enquiry and receive an automated confirmation email.
        </span>
      </label>

      <div style={{ marginTop: '20px', width: '100%' }}>
        <AnimatedEnquiryButton
          type="submit"
          id="prepare-enquiry-btn"
          disabled={isSubmitting}
          busy={isSubmitting}
          busyLabel="Submitting enquiry..."
          style={{ width: '100%', justifyContent: 'center' }}
        >
          {submitted ? 'Enquiry Submitted' : 'Submit Enquiry & Request Quote'}
        </AnimatedEnquiryButton>
      </div>

      <p className="form-info" style={{ marginTop: '14px', fontSize: '11px', color: 'var(--muted)' }}>
        <strong>Direct registry:</strong> Your specifications are recorded directly in our Google Workspace communication desk. You will immediately receive a confirmation email with a unique Reference ID for follow-up.
      </p>

      {submitted && (
        <div className="success" id="enquiry-success" aria-live="polite" style={{ marginTop: '24px', padding: '20px', background: 'var(--sage)', borderRadius: '4px', border: '1px solid var(--line)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: '#059669' }} />
            <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--ink)' }}>
              Enquiry Received &amp; Logged
            </span>
          </div>

          <strong style={{ fontSize: '18px', display: 'block', color: 'var(--ink)', marginBottom: '6px' }}>
            Thank you, {name.trim()}.
          </strong>

          {referenceId && (
            <div style={{ margin: '8px 0 12px', padding: '6px 14px', background: '#ffffff', borderRadius: '4px', display: 'inline-block', border: '1px solid var(--line)', fontSize: '13px', fontWeight: 600, color: 'var(--ink)' }}>
              Reference ID: <span style={{ fontFamily: 'monospace', color: '#173b30', letterSpacing: '0.5px' }}>{referenceId}</span>
            </div>
          )}

          <p style={{ fontSize: '13px', margin: '4px 0 16px', color: 'var(--muted)', lineHeight: 1.5 }}>
            Your requirements have been securely recorded in our client registry and a confirmation email has been dispatched to <strong>{email.trim()}</strong>. Paawan Bhargava and our technical team will review your specifications.
          </p>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <a
              id="send-whatsapp"
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="button"
              style={{ fontSize: '13px', padding: '12px 20px', minHeight: '44px' }}
            >
              Open in WhatsApp (+91 97831 33333) ↗
            </a>
            <a
              id="send-email"
              href={mailtoUrl}
              className="button secondary"
              style={{ fontSize: '13px', padding: '12px 20px', minHeight: '44px' }}
            >
              Open in Email (info@vspias.in) ↗
            </a>
          </div>

          <details style={{ marginTop: '16px', fontSize: '12px' }}>
            <summary style={{ cursor: 'pointer', color: 'var(--ink)', fontWeight: 600 }}>
              View Submitted Specification Summary
            </summary>
            <pre style={{ marginTop: '8px', padding: '12px', background: '#ffffff', borderRadius: '4px', whiteSpace: 'pre-wrap', fontSize: '11px', color: 'var(--ink)', border: '1px solid var(--line)' }}>
              {draftSummary}
            </pre>
          </details>
        </div>
      )}
    </form>
  );
}

export default QuoteForm;
