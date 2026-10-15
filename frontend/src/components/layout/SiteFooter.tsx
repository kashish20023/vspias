'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ASSETS } from '@/content/assets';
import { buildWhatsAppUrl } from '@/lib/whatsapp';

export default function SiteFooter(): JSX.Element {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const isAutomation = pathname.startsWith('/automation') || pathname.startsWith('/industrial-solutions');
  const isPaper = pathname.startsWith('/paper-bags');

  if (isHome) {
    return (
      <footer id="footer" className="home-footer-compact">
        <div className="wrap">
          <div className="home-footer-main">
            <Link href="/" className="home-footer-brand" aria-label="VSPIAS Ecoautomation Homepage">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={ASSETS.logoWhite}
                alt="VSPIAS Ecoautomation"
                width={174}
                height={48}
                className="home-footer-logo-img"
              />
            </Link>

            <nav className="home-footer-nav" aria-label="Footer navigation">
              <Link href="/">Home</Link>
              <span className="footer-pipe" aria-hidden="true">|</span>
              <Link href="/automation">Automation</Link>
              <span className="footer-pipe" aria-hidden="true">|</span>
              <Link href="/paper-bags">Paper Bags</Link>
              <span className="footer-pipe" aria-hidden="true">|</span>
              <Link href="/contact">Contact</Link>
            </nav>

            <div className="home-footer-contacts">
              <a href="mailto:info@vspias.in" className="footer-contact-link">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <span>info@vspias.in</span>
              </a>
              <a href="tel:+919783133333" className="footer-contact-link">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span>+91 97831 33333</span>
              </a>
            </div>
          </div>

          <div className="home-footer-bottom">
            <span>&copy; {new Date().getFullYear()} VSPIAS Ecoautomation Pvt. Ltd.</span>
            <div className="footer-legal-links" style={{ display: 'inline-flex', gap: '14px', alignItems: 'center' }}>
              <Link href="/privacy" className="footer-link" style={{ fontSize: '11px', textDecoration: 'underline', color: 'rgba(255,255,255,0.7)' }}>
                Privacy Policy
              </Link>
              <span aria-hidden="true" style={{ opacity: 0.5, color: 'rgba(255,255,255,0.4)' }}>&middot;</span>
              <Link href="/terms" className="footer-link" style={{ fontSize: '11px', textDecoration: 'underline', color: 'rgba(255,255,255,0.7)' }}>
                Terms &amp; Conditions
              </Link>
            </div>
            <span>Bengaluru, Karnataka, India</span>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer id="footer">
      <div className="wrap">
        <div className="footer-top">
          <div className="footer-brand-col">
            <Link href="/" className="footer-brand-link" aria-label="VSPIAS Ecoautomation Homepage" style={{ display: 'inline-block', marginBottom: '14px' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={ASSETS.logoWhite}
                alt="VSPIAS Ecoautomation"
                width={174}
                height={48}
                className="home-footer-logo-img"
              />
            </Link>
            <p className="footer-tagline">
              {isAutomation ? (
                <>
                  Powering Industrial Excellence.<br />
                  Drives, Switchgear &amp; Turnkey Automation.
                </>
              ) : (
                <>
                  Paper bags. Printing. Possibilities.<br />
                  Sustainable Packaging Manufactured in Bengaluru.
                </>
              )}
            </p>
            <div className="footer-divisions">
              <span className="footer-subheading">Business Divisions:</span>
              <div className="footer-pill-row">
                <Link href="/paper-bags" className="footer-div-pill">
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
            <Link href="/paper-bags#collection-section">Bag Collection</Link>
            <Link href="/paper-bags#customise-section">Finish &amp; Brand Preview</Link>
            <Link href="/paper-bags#manufacturing-section">Manufacturing Process</Link>
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
              {isPaper ? 'Bengaluru 560058,' : 'Peenya, Bengaluru 560058,'}<br />
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
                href={buildWhatsAppUrl('Hello VSPIAS, I would like to discuss my requirements.')}
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
          <span>&copy; {new Date().getFullYear()} VSPIAS Ecoautomation Pvt. Ltd. &middot; B2B Product Showcase</span>
          <div className="footer-legal-links" style={{ display: 'inline-flex', gap: '14px', alignItems: 'center' }}>
            <Link href="/privacy" className="footer-link" style={{ fontSize: '11px', textDecoration: 'underline' }}>
              Privacy Policy
            </Link>
            <span aria-hidden="true" style={{ opacity: 0.5 }}>&middot;</span>
            <Link href="/terms" className="footer-link" style={{ fontSize: '11px', textDecoration: 'underline' }}>
              Terms &amp; Conditions
            </Link>
          </div>
          <span>
            {isPaper
              ? 'Bengaluru, Karnataka, India'
              : 'Peenya Industrial Area \u00b7 Bengaluru, Karnataka, India'}
          </span>
        </div>
      </div>
    </footer>
  );
}
