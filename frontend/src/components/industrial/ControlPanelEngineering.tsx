import React from 'react';
import Link from 'next/link';
import { ASSETS } from '@/content/assets';

export default function ControlPanelEngineering(): JSX.Element {
  return (
    <section className="section dark control-panel-feature" id="engineering-section">
      <div className="wrap">
        <div className="panel-feature-head">
          <div className="eyebrow" style={{ color: 'var(--lime)' }}>
            CONTROL SYSTEMS &amp; CUSTOM ENCLOSURES
          </div>
          <h2 style={{ color: '#ffffff' }}>
            From component selection<br />
            to integrated control.
          </h2>
          <p style={{ color: '#c7d6ce', maxWidth: '640px', marginTop: '16px' }}>
            Whether you require bare switchgear components or fully wired industrial panels, we help bridge the gap between engineering specifications and dependable hardware.
          </p>
        </div>

        <div className="panel-feature-grid">
          <div className="panel-feature-image-card">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={ASSETS.panels}
              alt="Engineered industrial control panel enclosure from brochure"
              className="panel-img"
            />
            <div className="panel-image-caption">
              <span>MCC &amp; PCC Control Panel Fabrication</span>
              <span>Peenya Hub</span>
            </div>
          </div>

          <div className="panel-feature-steps">
            <div className="feature-step-block">
              <div className="step-tag">
                <span className="step-num">01</span>
                <strong>UNDERSTAND</strong>
              </div>
              <p>
                We review your load schedules, motor kW ratings, ambient temperatures, IP protection requirements, and fault level limits (kA) to establish precise component boundaries.
              </p>
            </div>

            <div className="feature-step-block">
              <div className="step-tag">
                <span className="step-num">02</span>
                <strong>DEFINE</strong>
              </div>
              <p>
                We configure coordinated Bills of Materials: type-tested ACBs/MCCBs, variable frequency drives, harmonic chokes, contactors, PLC I/O racks, and HMI operator displays.
              </p>
            </div>

            <div className="feature-step-block">
              <div className="step-tag">
                <span className="step-num">03</span>
                <strong>DISCUSS</strong>
              </div>
              <p>
                Connect directly with our engineering team to review lead times, alternate brand crosses, panel dimensional clearances, and commercial quotation terms.
              </p>
            </div>

            <div className="panel-step-cta">
              <Link
                href="/contact?interest=Electrical%20%26%20automation&requirements=I%20would%20like%20to%20discuss%20control%20panel%20and%20switchgear%20requirements."
                className="button lime"
                id="discuss-panel-engineering-btn"
              >
                Discuss Control Panel Requirements <span className="arrow">↗</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
