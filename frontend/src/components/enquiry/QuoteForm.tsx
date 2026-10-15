'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import { EnquirySurface } from '@/components/motion/EnquirySurface';
import { AnimatedEnquiryButton } from '@/components/motion/AnimatedEnquiryButton';

export function QuoteForm(): JSX.Element {
  const searchParams = useSearchParams();

  const [interest, setInterest] = useState<string>('Paper bags');
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

  const [submitted, setSubmitted] = useState<boolean>(false);
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
    setErrorMessage('');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
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

    setErrorMessage('');

    let contextLines = '';
    if (isPaper) {
      if (bagFinish) contextLines += `Preferred Bag Finish: ${bagFinish}\n`;
      if (brandName) contextLines += `Brand Imprint Name: ${brandName}\n`;
    } else if (isAuto && industrySector) {
      contextLines += `Target Industrial Sector: ${industrySector}\n`;
    }

    const subject = `VSPIAS Enquiry: ${interest}${industrySector ? ` — ${industrySector}` : ''}`;
    const body = `Name: ${name.trim()}
Company: ${company.trim() || 'N/A'}
Email: ${email.trim()}
Phone / WhatsApp: ${phone.trim() || 'N/A'}
Business Interest: ${interest}
${contextLines}Quantity / Capacity: ${quantity.trim() || 'To be discussed'}

Requirements:
${requirements.trim()}

---
Enquiry initiated from VSPIAS web showcase (${interest === 'Paper bags' ? 'Bengaluru' : 'Peenya, Bengaluru'})`;

    const mailto = `mailto:info@vspias.in?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const whatsapp = buildWhatsAppUrl(subject + '\n\n' + body);

    setMailtoUrl(mailto);
    setWhatsappUrl(whatsapp);
    setDraftSummary(body);

    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          message: requirements.trim(),
          company: company.trim(),
          division: interest,
          quantity: quantity.trim(),
          bagFinish,
          brandName,
          industrySector,
          hp: ''
        })
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data.ok) {
        setSubmitted(true);
        setErrorMessage('');
      } else {
        setSubmitted(false);
        setErrorMessage(data.error || 'Unable to save enquiry to server. You can still reach us directly via email or WhatsApp below.');
      }
    } catch {
      setSubmitted(false);
      setErrorMessage('Unable to connect to server. You can still reach us directly via email or WhatsApp below.');
    }
  };

  return (
    <form className="quote-form" id="quote-form" ref={formRef} onSubmit={handleSubmit} noValidate>
        {/* Invisible honeypot field for bot defense */}
        <input type="text" name="hp" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" aria-hidden="true" />
        <h3>Your next step, made simple.</h3>
        <p style={{ fontSize: '14px', color: 'var(--muted)', marginBottom: '20px' }}>
          Configure your specifications below. We will generate a structured draft for your review.
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
          I am interested in
          <select id="interest" name="interest" value={interest} onChange={handleInterestChange}>
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
            Your name <span aria-hidden="true" style={{ color: '#b91c1c' }}>*</span>
            <input
              name="name"
              required
              placeholder="Full name"
              autoComplete="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setSubmitted(false);
              }}
            />
          </label>
          <label className="field">
            Company
            <input
              name="company"
              placeholder="Company name"
              autoComplete="organization"
              value={company}
              onChange={(e) => {
                setCompany(e.target.value);
                setSubmitted(false);
              }}
            />
          </label>
        </div>

        <div className="form-row">
          <label className="field">
            Email <span aria-hidden="true" style={{ color: '#b91c1c' }}>*</span>
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
              }}
            />
          </label>
          <label className="field">
            Phone / WhatsApp
            <input
              type="tel"
              name="phone"
              placeholder="+91 97831 33333"
              autoComplete="tel"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                setSubmitted(false);
              }}
            />
          </label>
        </div>

        <label className="field">
          <span id="quantity-label">{quantityLabel}</span>
          <input
            name="quantity"
            id="quantity-input"
            placeholder={quantityPlaceholder}
            value={quantity}
            onChange={(e) => {
              setQuantity(e.target.value);
              setSubmitted(false);
            }}
          />
        </label>

        <label className="field">
          Tell us about your requirements <span aria-hidden="true" style={{ color: '#b91c1c' }}>*</span>
          <textarea
            name="requirements"
            required
            rows={4}
            placeholder="Bag size, paper GSM, print colours, target monthly volume or machine specifications..."
            value={requirements}
            onChange={(e) => {
              setRequirements(e.target.value);
              setSubmitted(false);
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
          <span>
            I agree to be contacted by VSPIAS regarding this enquiry. My details are prepared into a reviewed draft and only sent when I choose email or WhatsApp below.
          </span>
        </label>

        <div style={{ marginTop: '20px', width: '100%' }}>
          <AnimatedEnquiryButton
            type="submit"
            id="prepare-enquiry-btn"
            style={{ width: '100%', justifyContent: 'center' }}
          >
            Prepare My Enquiry Draft
          </AnimatedEnquiryButton>
        </div>

        <p className="form-info" style={{ marginTop: '14px', fontSize: '11px', color: 'var(--muted)' }}>
          <strong>Transparent workflow:</strong> This system prepares an email or WhatsApp draft containing your exact specifications. You retain full control to review the text before sending it to our {interest === 'Paper bags' ? 'Bengaluru' : 'Peenya'} office.
        </p>

        {submitted && (
          <div className="success" id="enquiry-success" aria-live="polite" style={{ marginTop: '24px', padding: '20px', background: 'var(--sage)', borderRadius: '4px', border: '1px solid var(--line)' }}>
            <strong style={{ fontSize: '16px', display: 'block', color: 'var(--ink)' }}>
              Your enquiry draft is ready for review.
            </strong>
            <p style={{ fontSize: '13px', margin: '8px 0 16px', color: 'var(--muted)' }}>
              Review the drafted parameters and choose your preferred messaging method to dispatch your enquiry directly to Paawan Bhargava.
            </p>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <a
                id="send-email"
                href={mailtoUrl}
                className="button"
                style={{ fontSize: '13px', padding: '12px 20px', minHeight: '44px' }}
              >
                Open in Email (info@vspias.in) ↗
              </a>
              <a
                id="send-whatsapp"
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="button secondary"
                style={{ fontSize: '13px', padding: '12px 20px', minHeight: '44px' }}
              >
                Open in WhatsApp (+91 97831 33333) ↗
              </a>
            </div>

            <details style={{ marginTop: '16px', fontSize: '12px' }}>
              <summary style={{ cursor: 'pointer', color: 'var(--ink)', fontWeight: 600 }}>
                View Draft Text Preview
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
