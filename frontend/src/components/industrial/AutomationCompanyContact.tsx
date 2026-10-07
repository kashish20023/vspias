import React from 'react';
import Link from 'next/link';

export default function AutomationCompanyContact(): JSX.Element {
  return (
    <section className="section auto-company-contact-section" id="company-section">
      <div className="wrap">
        <div className="cta-row auto-cta-row">
          <div>
            <div className="eyebrow" style={{ color: 'var(--lime)' }}>
              LET&apos;S POWER YOUR NEXT INSTALLATION
            </div>
            <h2 style={{ color: '#ffffff' }}>
              What would you<br />
              like to power?
            </h2>
          </div>

          <div className="auto-cta-body">
            <p style={{ color: '#c7d6ce', fontSize: '16px', lineHeight: 1.6 }}>
              A new factory automation line. A motor control replacement. A control panel Bill of Materials. Share your electrical specifications and our Peenya team will assist with sourcing and quotations.
            </p>

            <div className="company-facts-box" style={{ marginTop: '20px', padding: '16px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '4px' }}>
              <div style={{ color: '#ffffff', fontWeight: 600, fontSize: '14px' }}>
                VSPIAS Ecoautomation Pvt. Ltd. &middot; Peenya, Bengaluru
              </div>
              <div style={{ color: '#c7d6ce', fontSize: '13px', marginTop: '6px' }}>
                Contact: Paawan Bhargava &middot; <a href="mailto:info@vspias.in" style={{ color: 'var(--lime)', textDecoration: 'underline' }}>info@vspias.in</a> &middot; <a href="tel:+919783133333" style={{ color: 'var(--lime)', textDecoration: 'underline' }}>+91 97831 33333</a>
              </div>
            </div>

            <div className="actions" style={{ marginTop: '28px' }}>
              <Link
                href="/contact?interest=Electrical%20%26%20automation"
                className="button lime"
                id="auto-contact-enquiry-btn"
              >
                Discuss Automation Requirements <span className="arrow">↗</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
