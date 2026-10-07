import React from 'react';
import Link from 'next/link';
import { ASSETS } from '@/content/assets';

export default function SiteFooter(): JSX.Element {
  return (
    <footer id="footer">
      <div className="wrap">
        <div className="footer-top">
          <div className="footer-brand-col">
            <Link href="/" className="footer-title">
              VSPIAS<span style={{ color: 'var(--lime)' }}>.</span>
            </Link>
            <div className="footer-company">ECOAUTOMATION PVT. LTD.</div>
            <p className="footer-tagline">
              Paper bags. Printing. Possibilities.<br />
              Powering Industrial Excellence.
            </p>
            <div className="footer-divisions">
              <span className="footer-subheading">Business Divisions:</span>
              <div className="footer-pill-row">
                <Link href="/" className="footer-div-pill">
                  Paper &amp; Packaging
                </Link>
                <Link href="/automation" className="footer-div-pill">
                  Electrical &amp; Automation
                </Link>
              </div>
            </div>
          </div>

          <div className="footer-nav-col">
            <h3>Packaging &amp; Machines</h3>
            <Link href="/#collection-section">Bag Collection</Link>
            <Link href="/#customise-section">Finish &amp; Brand Preview</Link>
            <Link href="/#manufacturing-section">Manufacturing Process</Link>
            <Link href="/printing">Flexographic Printing</Link>
            <Link href="/paper-bags/kraft-carry-bags">Kraft Carry Bags</Link>
            <Link href="/paper-bags/food-takeaway">Food &amp; Takeaway Bags</Link>
            <Link href="/paper-bags/retail-custom-print">Retail &amp; Custom Print</Link>
          </div>

          <div className="footer-nav-col">
            <h3>Industrial Automation</h3>
            <Link href="/automation#portfolio-section">Electrical Portfolio (6 Categories)</Link>
            <Link href="/automation#engineering-section">Control Panels &amp; Systems</Link>
            <Link href="/automation#industries-section">Industries Served</Link>
            <a
              href={ASSETS.companyBrochurePdf}
              download="vspias-company-brochure.pdf"
              className="brochure-link"
              id="footer-download-brochure"
            >
              Company Brochure PDF ↓
            </a>
          </div>

          <div className="footer-contact-col">
            <h3>Start a conversation</h3>
            <p className="footer-person">
              <strong>Paawan Bhargava</strong><br />
              #66, 6th Main Road, behind UCO Bank,<br />
              Peenya, Bengaluru 560058,<br />
              Karnataka, India.
            </p>
            <div className="footer-contact-actions">
              <a href="mailto:info@vspias.in" className="footer-link">
                info@vspias.in ↗
              </a>
              <a href="tel:+919783133333" className="footer-link">
                +91 97831 33333 ↗
              </a>
              <a
                href="https://wa.me/919783133333?text=Hello%20VSPIAS%2C%20I%20would%20like%20to%20discuss%20my%20requirements."
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link whatsapp-link"
              >
                WhatsApp Message ↗
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>&copy; VSPIAS Ecoautomation Pvt. Ltd. &middot; B2B Product Showcase</span>
          <span>Peenya Industrial Area &middot; Bengaluru, Karnataka, India</span>
        </div>
      </div>
    </footer>
  );
}
