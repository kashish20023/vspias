import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ASSETS } from '@/content/assets';
import { AUTOMATION_CATALOGUE_ITEMS } from '@/content/industrial';

export const metadata: Metadata = {
  title: 'Electrical & Automation Portfolio — VSPIAS',
  description:
    'PLC & I/O modules, VFD & drives, HMI interfaces, industrial panels, SCADA software, and switchgear from VSPIAS Ecoautomation Pvt. Ltd.'
};

export default function AutomationPage(): JSX.Element {
  return (
    <main id="main-content">
      <div className="wrap page-intro">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link> &nbsp; / &nbsp; Electrical & automation
        </nav>

        <div className="section-head">
          <div>
            <div className="eyebrow">From the VSPIAS company brochure</div>
            <h1 style={{ fontSize: 'clamp(48px, 5vw, 76px)', fontWeight: 500, letterSpacing: '-0.052em', lineHeight: 1.02 }}>
              The right products.<br />A connected process.
            </h1>
          </div>
          <a
            className="button secondary"
            href={ASSETS.companyBrochurePdf}
            download="vspias-company-brochure.pdf"
            id="download-brochure-btn"
          >
            Company Brochure ↓
          </a>
        </div>

        <div className="auto-detail-grid">
          {AUTOMATION_CATALOGUE_ITEMS.map((prod) => (
            <article key={prod.title}>
              <Image
                src={prod.image}
                alt={prod.alt}
                width={360}
                height={200}
                style={{ height: '200px', objectFit: 'contain', width: '100%', mixBlendMode: 'multiply' }}
              />
              <h3>{prod.title}</h3>
              <p>{prod.description}</p>
              <Link
                className="text-link"
                href={`/contact?interest=Electrical%20%26%20automation&requirements=${encodeURIComponent(`I would like to discuss requirements for ${prod.title}.`)}`}
              >
                Discuss Requirements ↗
              </Link>
            </article>
          ))}
        </div>

        <p className="note">
          Images and product families reproduced from the supplied company brochure. Confirm current model availability and authorised status separately.
        </p>

        <div style={{ height: '40px' }} />
      </div>
    </main>
  );
}
