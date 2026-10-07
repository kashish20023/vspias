import React from 'react';
import Link from 'next/link';

export default function CompanyStorySection(): JSX.Element {
  return (
    <section className="section company-story" id="company-section">
      <div className="wrap">
        <div className="about-strip">
          <div className="about-lead">
            <div className="eyebrow">Company Heritage &middot; Bengaluru</div>
            <h2>
              A new chapter<br />
              in paper packaging.<br />
              Built on an industrial<br />
              foundation.
            </h2>
          </div>

          <div className="about-body">
            <p className="about-paragraph">
              <strong>VSPIAS Ecoautomation Pvt. Ltd.</strong> brings a professionally managed approach to sourcing electrical, automation and industrial materials from Peenya, Bengaluru. Our established sourcing relationships and engineering discipline provide the bedrock for our business.
            </p>
            <p className="about-paragraph" style={{ marginTop: '18px' }}>
              Our next chapter places <strong>sustainable paper bags, flexographic printing and packaging machinery</strong> at the center of the conversation. Whether you need branded carry bags for retail, takeaway packaging for food services, or complete bag manufacturing machinery, we provide practical, transparent solutions tailored to your operational scale.
            </p>

            <div className="company-facts-grid" style={{ marginTop: '32px' }}>
              <div className="fact-item">
                <span className="fact-label">Registered Entity</span>
                <strong className="fact-value">VSPIAS Ecoautomation Pvt. Ltd.</strong>
              </div>
              <div className="fact-item">
                <span className="fact-label">Operating Hub</span>
                <strong className="fact-value">Peenya, Bengaluru, Karnataka, India</strong>
              </div>
              <div className="fact-item">
                <span className="fact-label">Core Focus</span>
                <strong className="fact-value">Paper Packaging &amp; Industrial Automation</strong>
              </div>
              <div className="fact-item">
                <span className="fact-label">Leadership &amp; Enquiries</span>
                <strong className="fact-value">Paawan Bhargava &middot; info@vspias.in</strong>
              </div>
            </div>

            <div style={{ marginTop: '28px' }}>
              <Link href="/contact" className="text-link" id="about-conversation-link">
                Start a Conversation with Our Team <span>↗</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
