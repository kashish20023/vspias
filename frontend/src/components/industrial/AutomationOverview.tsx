import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ASSETS } from '@/content/assets';
import { AUTOMATION_OVERVIEW } from '@/content/industrial';

export function AutomationOverview(): JSX.Element {
  return (
    <section className="section automation" id="automation-section">
      <div className="wrap">
        <div className="auto-grid">
          <div>
            <div className="eyebrow">Our electrical & automation portfolio</div>
            <h2>
              The engineering<br />behind the<br />possibilities.
            </h2>
            <p>
              Multi-brand electrical and industrial materials for panel builders, contractors and industrial clients.
            </p>
            <Link href="/automation" className="text-link" id="explore-automation-link">
              Explore Automation <span>↗</span>
            </Link>
            <div className="auto-cats">
              <span>PLC & I/O</span>
              <span>HMI</span>
              <span>VFD & drives</span>
              <span>SCADA</span>
              <span>Control panels</span>
              <span>Switchgear</span>
            </div>
          </div>
          <Image
            src={AUTOMATION_OVERVIEW.image}
            alt="Electrical and automation equipment"
            width={600}
            height={360}
            priority
          />
        </div>

        <div className="brand-row">
          <small>Brands in the supplied product brochure</small>
          <strong>Schneider Electric</strong>
          <strong>ABB</strong>
          <strong>SIEMENS</strong>
          <strong>Larsen & Toubro</strong>
        </div>
      </div>
    </section>
  );
}
