import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions — VSPIAS Ecoautomation Pvt. Ltd. | Bengaluru',
  description:
    'Commercial terms and conditions governing the use of the VSPIAS Ecoautomation website, interactive design studio, and procurement quotation desks.'
};

export default function TermsAndConditionsPage(): JSX.Element {
  return (
    <div className="legal-page" style={{ padding: '60px 0 100px', background: 'var(--paper, #f5f3eb)' }}>
      <div className="wrap" style={{ maxWidth: '920px', margin: '0 auto' }}>
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" style={{ marginBottom: '28px', fontSize: '12px', color: 'var(--muted, #5c6a60)' }}>
          <Link href="/" style={{ textDecoration: 'underline' }}>Home</Link>
          <span style={{ margin: '0 8px' }}>/</span>
          <span aria-current="page" style={{ color: 'var(--ink, #173b30)', fontWeight: 600 }}>Terms &amp; Conditions</span>
        </nav>

        <header style={{ marginBottom: '44px', borderBottom: '1px solid var(--line, #d8ddd3)', paddingBottom: '32px' }}>
          <div className="eyebrow" style={{ fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, color: 'var(--ink, #173b30)', marginBottom: '12px' }}>
            COMMERCIAL TERMS &middot; LEGAL AGREEMENT
          </div>
          <h1 style={{ fontSize: 'clamp(36px, 4.5vw, 52px)', fontWeight: 500, letterSpacing: '-0.04em', lineHeight: 1.1, color: 'var(--ink, #173b30)', marginBottom: '16px' }}>
            Terms &amp; Conditions
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--muted, #5c6a60)' }}>
            <strong>VSPIAS Ecoautomation Private Limited</strong> &middot; Last Revised: October 2026 &middot; Bengaluru, Karnataka, India
          </p>
        </header>

        <div className="legal-content" style={{ fontSize: '15px', lineHeight: 1.75, color: '#2c3e35', display: 'flex', flexDirection: 'column', gap: '36px' }}>
          <section>
            <h2 style={{ fontSize: '22px', fontWeight: 600, color: 'var(--ink, #173b30)', marginBottom: '14px', letterSpacing: '-0.02em' }}>
              1. Acceptance &amp; Scope
            </h2>
            <p>
              Welcome to the corporate product showcase of <strong>VSPIAS Ecoautomation Private Limited</strong> (&ldquo;VSPIAS&rdquo;). By accessing, browsing, or utilizing this website (<a href="https://vspias.in" style={{ color: 'var(--ink, #173b30)', fontWeight: 600, textDecoration: 'underline' }}>vspias.in</a>), our online quotation tools, or the interactive Bag Studio, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
            </p>
            <p style={{ marginTop: '12px' }}>
              If you do not agree with these terms, please refrain from using this website. All commercial transactions and manufacturing purchase orders are governed by formal written quotations and contracts entered into between VSPIAS and the client.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '22px', fontWeight: 600, color: 'var(--ink, #173b30)', marginBottom: '14px', letterSpacing: '-0.02em' }}>
              2. Nature of the Website (B2B Showcase)
            </h2>
            <p>
              This website serves as an informational and consultative B2B product showcase for our two primary business divisions:
            </p>
            <ul style={{ paddingLeft: '24px', marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li><strong>Paper Bags &amp; Packaging Division:</strong> Volume manufacturing of sustainable paper bags, square-bottom food takeaway bags, and flexographic print custom packaging.</li>
              <li><strong>Industrial Automation &amp; Electricals Division:</strong> Distribution of switchgear, variable frequency drives (VFDs), PLCs, and turnkey industrial automation control panels.</li>
            </ul>
            <p style={{ marginTop: '12px' }}>
              The website does not operate as an automated consumer checkout portal. Inquiries submitted via online forms or WhatsApp initiate pre-contractual commercial discussions only.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '22px', fontWeight: 600, color: 'var(--ink, #173b30)', marginBottom: '14px', letterSpacing: '-0.02em' }}>
              3. Interactive Bag Studio &amp; Catalogue Disclaimers
            </h2>
            <p>
              The interactive 360&deg; &ldquo;Design Your Own Bag&rdquo; Studio, product imagery, and model representations are illustrative visual tools designed to help prospective clients formulate packaging concepts.
            </p>
            <ul style={{ paddingLeft: '24px', marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li><strong>Illustrative Nature:</strong> Renderings, colors, and proportions displayed on digital screens are simulations. Exact paper shades, tensile strength, burst factor, grammage (GSM), and ink pigmentation (Pantone / CMYK match) must be confirmed via physical samples or technical data sheets prior to production.</li>
              <li><strong>No Immediate Contract:</strong> Generating a design brief or downloading a design summary does not constitute an accepted order, price lock, stock reservation, or production commitment.</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontSize: '22px', fontWeight: 600, color: 'var(--ink, #173b30)', marginBottom: '14px', letterSpacing: '-0.02em' }}>
              4. Commercial Quotations &amp; Orders
            </h2>
            <p>
              Formal procurement terms, including unit pricing, Minimum Order Quantities (MOQ), cylinder / stereos tooling costs, delivery lead times, applicable Goods and Services Tax (GST), and payment milestones are established exclusively in formal written Proforma Invoices or Purchase Orders.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '22px', fontWeight: 600, color: 'var(--ink, #173b30)', marginBottom: '14px', letterSpacing: '-0.02em' }}>
              5. Intellectual Property &amp; Client Artwork
            </h2>
            <p>
              All trademarks, trade names, logos, technical diagrams, and website designs appearing on this site are the property of VSPIAS Ecoautomation Pvt. Ltd. or their respective OEM brand holders (including ABB, Siemens, Schneider Electric, and L&amp;T where cited for electrical distribution).
            </p>
            <p style={{ marginTop: '12px' }}>
              Clients submitting brand names, trademarks, or artwork for custom-printed paper packaging warrant that they possess all necessary copyrights, trademark licenses, and legal authorizations to use such marks. The client agrees to indemnify VSPIAS against any third-party claims arising from unauthorized trademark use.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '22px', fontWeight: 600, color: 'var(--ink, #173b30)', marginBottom: '14px', letterSpacing: '-0.02em' }}>
              6. Limitation of Liability
            </h2>
            <p>
              While VSPIAS makes reasonable efforts to ensure accuracy, the content on this website is provided on an &ldquo;as is&rdquo; basis without warranties of any kind. VSPIAS shall not be liable for any indirect, incidental, or consequential damages resulting from the use or inability to use this showcase website.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '22px', fontWeight: 600, color: 'var(--ink, #173b30)', marginBottom: '14px', letterSpacing: '-0.02em' }}>
              7. Governing Law &amp; Jurisdiction
            </h2>
            <p>
              These Terms and Conditions shall be governed by and construed in accordance with the laws of the Republic of India. Any legal dispute, controversy, or claim arising out of or in connection with this website shall be subject to the exclusive jurisdiction of the competent courts in <strong>Bengaluru, Karnataka, India</strong>.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '22px', fontWeight: 600, color: 'var(--ink, #173b30)', marginBottom: '14px', letterSpacing: '-0.02em' }}>
              8. Contact &amp; Corporate Inquiries
            </h2>
            <div style={{ background: '#ffffff', border: '1px solid var(--line, #d8ddd3)', borderRadius: '8px', padding: '24px 28px' }}>
              <p style={{ fontSize: '14px', color: 'var(--muted, #5c6a60)', margin: 0, lineHeight: 1.6 }}>
                <strong>VSPIAS Ecoautomation Private Limited</strong><br />
                #66, 6th Main Road, behind UCO Bank, Peenya Industrial Area,<br />
                Bengaluru, Karnataka 560058, India<br />
                Official Email:{' '}
                <a href="mailto:info@vspias.in" style={{ color: 'var(--ink, #173b30)', fontWeight: 600, textDecoration: 'underline' }}>
                  info@vspias.in
                </a><br />
                Desk Phone:{' '}
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
