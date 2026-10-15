import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — VSPIAS Ecoautomation Pvt. Ltd. | Bengaluru',
  description:
    'Privacy Policy and data protection terms for VSPIAS Ecoautomation Pvt. Ltd., Bengaluru. Learn how we handle commercial inquiries, technical briefs, and client data.'
};

export default function PrivacyPolicyPage(): JSX.Element {
  return (
    <div className="legal-page" style={{ padding: '60px 0 100px', background: 'var(--paper, #f5f3eb)' }}>
      <div className="wrap" style={{ maxWidth: '920px', margin: '0 auto' }}>
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" style={{ marginBottom: '28px', fontSize: '12px', color: 'var(--muted, #5c6a60)' }}>
          <Link href="/" style={{ textDecoration: 'underline' }}>Home</Link>
          <span style={{ margin: '0 8px' }}>/</span>
          <span aria-current="page" style={{ color: 'var(--ink, #173b30)', fontWeight: 600 }}>Privacy Policy</span>
        </nav>

        <header style={{ marginBottom: '44px', borderBottom: '1px solid var(--line, #d8ddd3)', paddingBottom: '32px' }}>
          <div className="eyebrow" style={{ fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, color: 'var(--ink, #173b30)', marginBottom: '12px' }}>
            LEGAL NOTICE &middot; DATA PRIVACY
          </div>
          <h1 style={{ fontSize: 'clamp(36px, 4.5vw, 52px)', fontWeight: 500, letterSpacing: '-0.04em', lineHeight: 1.1, color: 'var(--ink, #173b30)', marginBottom: '16px' }}>
            Privacy Policy
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--muted, #5c6a60)' }}>
            <strong>VSPIAS Ecoautomation Private Limited</strong> &middot; Effective Date: October 2026 &middot; Bengaluru, Karnataka, India
          </p>
        </header>

        <div className="legal-content" style={{ fontSize: '15px', lineHeight: 1.75, color: '#2c3e35', display: 'flex', flexDirection: 'column', gap: '36px' }}>
          <section>
            <h2 style={{ fontSize: '22px', fontWeight: 600, color: 'var(--ink, #173b30)', marginBottom: '14px', letterSpacing: '-0.02em' }}>
              1. Overview &amp; Commitment
            </h2>
            <p>
              VSPIAS Ecoautomation Private Limited (&ldquo;VSPIAS&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) is committed to protecting the privacy, confidentiality, and security of all commercial partners, industrial clients, and visitors who interact with our website and product showcase.
            </p>
            <p style={{ marginTop: '12px' }}>
              This policy explains how we collect, process, store, and safeguard personal and business information gathered through our online showcase (<a href="https://vspias.in" style={{ color: 'var(--ink, #173b30)', fontWeight: 600, textDecoration: 'underline' }}>vspias.in</a>), interactive Design Studio, and direct consultation channels, in compliance with applicable Indian laws, including the <em>Information Technology Act, 2000</em> and the <em>Digital Personal Data Protection Act, 2023 (DPDP Act)</em>.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '22px', fontWeight: 600, color: 'var(--ink, #173b30)', marginBottom: '14px', letterSpacing: '-0.02em' }}>
              2. Information We Collect
            </h2>
            <p>We collect only information reasonably necessary to conduct commercial evaluations and fulfil manufacturing and automation requests:</p>
            <ul style={{ paddingLeft: '24px', marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li>
                <strong>B2B Enquiry Information:</strong> Your name, official company name, designation, corporate email address, telephone number, and business location when you submit an enquiry or quotation request.
              </li>
              <li>
                <strong>Design &amp; Technical Specifications:</strong> Bag sizes, paper grades (GSM), ink colour preferences, handle options, brand text configured in the Bag Studio, and required industrial automation equipment or panel specifications.
              </li>
              <li>
                <strong>Communication Records:</strong> Correspondence exchanged with our sales desk via email (<a href="mailto:info@vspias.in">info@vspias.in</a>) or WhatsApp consultation.
              </li>
              <li>
                <strong>Technical Log Data:</strong> Internet Protocol (IP) addresses, browser user agent, referring URLs, and access timestamps collected automatically by web server infrastructure to maintain security, prevent unauthorized access, and enforce API rate limiting.
              </li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontSize: '22px', fontWeight: 600, color: 'var(--ink, #173b30)', marginBottom: '14px', letterSpacing: '-0.02em' }}>
              3. Purpose &amp; Legal Basis for Processing
            </h2>
            <p>We process your data exclusively for legitimate commercial purposes:</p>
            <ul style={{ paddingLeft: '24px', marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li>Preparing proforma quotations, technical drawings, sample dispatches, and manufacturing estimates.</li>
              <li>Coordinating production timelines, raw material planning, and logistics for confirmed purchase orders.</li>
              <li>Ensuring network security, diagnosing server issues, and safeguarding our administrative interfaces against malicious attacks.</li>
              <li>Complying with statutory accounting, tax (GST), and audit obligations under Indian corporate law.</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontSize: '22px', fontWeight: 600, color: 'var(--ink, #173b30)', marginBottom: '14px', letterSpacing: '-0.02em' }}>
              4. Strict No-Sale &amp; Non-Disclosure Policy
            </h2>
            <p>
              <strong>We do not sell, rent, lease, or monetize your personal or commercial data to any third-party marketing companies, advertisers, or data brokers.</strong>
            </p>
            <p style={{ marginTop: '12px' }}>
              Information is accessed solely by authorized VSPIAS engineering, manufacturing, and commercial personnel. Data is shared externally only when strictly necessary to complete logistics deliveries (e.g. freight carriers) or where required by statutory government authorities under due process of law.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '22px', fontWeight: 600, color: 'var(--ink, #173b30)', marginBottom: '14px', letterSpacing: '-0.02em' }}>
              5. Cookies &amp; Local Storage
            </h2>
            <p>
              Our website uses strictly necessary session cookies and local state storage. We do not employ third-party behavioral tracking cookies or invasive cross-site ad networks. Administrative users receive a temporary encrypted session cookie (<code>vspias_admin</code>) solely for authenticating catalogue management tasks.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '22px', fontWeight: 600, color: 'var(--ink, #173b30)', marginBottom: '14px', letterSpacing: '-0.02em' }}>
              6. Data Security &amp; Retention
            </h2>
            <p>
              We maintain reasonable technical and organizational safeguards—including cryptographic password hashing, strict access control, TLS encryption in transit, and server-side authorization checks—to prevent unauthorized disclosure or loss.
            </p>
            <p style={{ marginTop: '12px' }}>
              Commercial enquiry records are retained only for the duration required to service ongoing business relations and meet legal statutory retention periods.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '22px', fontWeight: 600, color: 'var(--ink, #173b30)', marginBottom: '14px', letterSpacing: '-0.02em' }}>
              7. Your Rights &amp; Grievance Redressal
            </h2>
            <p>
              Under applicable data protection legislation, you have the right to request access to the personal data we hold about you, seek corrections, or request deletion of contact information where no statutory retention requirement applies.
            </p>
            <div style={{ marginTop: '20px', background: '#ffffff', border: '1px solid var(--line, #d8ddd3)', borderRadius: '8px', padding: '24px 28px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--ink, #173b30)', marginBottom: '8px' }}>
                Grievance &amp; Data Privacy Officer
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--muted, #5c6a60)', margin: 0, lineHeight: 1.6 }}>
                <strong>Paawan Bhargava</strong><br />
                VSPIAS Ecoautomation Private Limited<br />
                #66, 6th Main Road, behind UCO Bank, Peenya Industrial Area,<br />
                Bengaluru, Karnataka 560058, India<br />
                Direct Email:{' '}
                <a href="mailto:info@vspias.in" style={{ color: 'var(--ink, #173b30)', fontWeight: 600, textDecoration: 'underline' }}>
                  info@vspias.in
                </a><br />
                Telephone:{' '}
                <a href="tel:+919783133333" style={{ color: 'var(--ink, #173b30)', fontWeight: 600, textDecoration: 'underline' }}>
                  +91 97831 33333
                </a>
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
