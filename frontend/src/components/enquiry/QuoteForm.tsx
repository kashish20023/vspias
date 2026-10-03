'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

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

  const [submitted, setSubmitted] = useState<boolean>(false);
  const [mailtoUrl, setMailtoUrl] = useState<string>('#');
  const [whatsappUrl, setWhatsappUrl] = useState<string>('#');

  useEffect(() => {
    const rawInterest = searchParams.get('interest');
    if (rawInterest) {
      if (rawInterest.toLowerCase().includes('machine')) {
        setInterest('Machinery & printing');
      } else if (rawInterest.toLowerCase().includes('auto')) {
        setInterest('Electrical & automation');
      } else {
        setInterest('Paper bags');
      }
    }

    const rawReq = searchParams.get('requirements');
    if (rawReq) {
      setRequirements(rawReq);
    }
  }, [searchParams]);

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
      : 'e.g. bags per order';

  const handleInterestChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInterest(e.target.value);
    setSubmitted(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const subject = `VSPIAS enquiry: ${interest}`;
    const body = `Name: ${name}
Company: ${company}
Email: ${email}
Phone: ${phone}
Interest: ${interest}
Quantity / capacity: ${quantity}
Requirements: ${requirements}`;

    const mailto = `mailto:info@vspias.in?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const whatsapp = `https://wa.me/919783133333?text=${encodeURIComponent(subject + '\n\n' + body)}`;

    setMailtoUrl(mailto);
    setWhatsappUrl(whatsapp);
    setSubmitted(true);
  };

  return (
    <form className="quote-form" id="quote-form" onSubmit={handleSubmit}>
      <h3>Your next step, made simple.</h3>

      <label className="field">
        I am interested in
        <select id="interest" name="interest" value={interest} onChange={handleInterestChange}>
          <option value="Paper bags">Paper bags</option>
          <option value="Machinery & printing">Machinery & printing</option>
          <option value="Electrical & automation">Electrical & automation</option>
        </select>
      </label>

      <div className="form-row">
        <label className="field">
          Your name
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
          Email
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
            placeholder="+91"
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
        Tell us about your requirements
        <textarea
          name="requirements"
          required
          placeholder="Bag size, paper, printing, application or machine requirements..."
          value={requirements}
          onChange={(e) => {
            setRequirements(e.target.value);
            setSubmitted(false);
          }}
        />
      </label>

      <label className="check">
        <input
          type="checkbox"
          required
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
        />
        <span>
          I agree to be contacted about this enquiry. My details will only be sent when I choose email or WhatsApp below.
        </span>
      </label>

      <button className="button" type="submit" id="prepare-enquiry-btn">
        Prepare My Enquiry <span className="arrow">↗</span>
      </button>

      <p className="form-info">
        Interactive UI preview: this form prepares an email or WhatsApp draft. It does not submit to a server or send automatically.
      </p>

      {submitted && (
        <div className="success" id="enquiry-success" aria-live="polite">
          <strong>Your enquiry draft is ready.</strong>
          <span style={{ display: 'block' }}>Review it in your preferred app before sending.</span>
          <a id="send-email" href={mailtoUrl}>
            Open email draft ↗
          </a>
          <a id="send-whatsapp" href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            Open WhatsApp draft ↗
          </a>
        </div>
      )}
    </form>
  );
}
