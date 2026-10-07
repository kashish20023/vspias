import React from 'react';
import Link from 'next/link';
import { ASSETS } from '@/content/assets';

export default function AutomationCrosslink(): JSX.Element {
  return (
    <section className="section automation-crosslink" id="automation-link-section">
      <div className="wrap">
        <div className="auto-crosslink-card">
          <div className="auto-crosslink-media">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={ASSETS.automationOverview}
              alt="Multi-brand electrical and automation equipment from the supplied product brochure"
              className="auto-crosslink-img"
            />
            <div className="media-caption">
              <span>Brochure collage &middot; Illustrative portfolio overview</span>
              <span className="division-badge">ELECTRICAL &amp; AUTOMATION</span>
            </div>
          </div>

          <div className="auto-crosslink-copy">
            <div className="eyebrow">Our second business division</div>
            <h2>
              The engineering<br />
              behind the<br />
              possibilities.
            </h2>
            <p className="auto-crosslink-desc">
              VSPIAS Ecoautomation sources multi-brand electrical, control and automation materials for panel builders, machine manufacturers and industrial facilities.
            </p>

            <div className="auto-cats-tags" aria-label="Key automation categories">
              <span className="cat-tag">PLC &amp; I/O</span>
              <span className="cat-tag">VFDs &amp; Drives</span>
              <span className="cat-tag">HMI</span>
              <span className="cat-tag">SCADA</span>
              <span className="cat-tag">Control Panels</span>
              <span className="cat-tag">Switchgear</span>
            </div>

            <div className="brand-provenance-box">
              <span className="provenance-label">Brand references from brochure:</span>
              <div className="brand-names-list">
                <span>Schneider Electric</span> &middot;
                <span>ABB</span> &middot;
                <span>Siemens</span> &middot;
                <span>Larsen &amp; Toubro</span>
              </div>
            </div>

            <div className="actions" style={{ marginTop: '28px' }}>
              <Link
                href="/automation"
                className="button"
                id="visit-automation-division-btn"
              >
                Explore Electrical &amp; Automation Division <span className="arrow">↗</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
