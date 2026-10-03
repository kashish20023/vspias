import React from 'react';
import Link from 'next/link';
import { ASSETS } from '@/content/assets';

export default function SiteFooter() {
  return (
    <footer>
      <div className="wrap">
        <div className="footer-top">
          <div>
            <Link href="/paper-bags" className="footer-title">
              VSPIAS<span style={{ color: '#c8e494' }}>.</span>
            </Link>
            <div className="footer-company">ECOAUTOMATION PVT. LTD.</div>
            <p className="footer-tagline">
              Paper bags. Printing. Possibilities.<br />Powering Industrial Excellence.
            </p>
          </div>
          <div>
            <h3>Explore</h3>
            <Link href="/paper-bags">Paper Bags</Link>
            <Link href="/industrial-solutions">Machines &amp; Printing</Link>
            <Link href="/automation">Electrical &amp; Automation</Link>
            <a href={ASSETS.companyBrochurePdf} download="vspias-company-brochure.pdf">
              Company Brochure ↓
            </a>
          </div>
          <div>
            <h3>Start a conversation</h3>
            <a href="mailto:info@vspias.in">info@vspias.in</a>
            <a href="tel:+919783133333">+91 97831 33333</a>
            <p>
              Paawan Bhargava<br />
              Peenya, Bengaluru, Karnataka, India
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© VSPIAS Ecoautomation Pvt. Ltd. · Website design concept</span>
          <span>Paper bag focus / Desktop + mobile / V1 · October 2026</span>
        </div>
      </div>
    </footer>
  );
}
