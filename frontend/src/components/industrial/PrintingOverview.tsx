import React from 'react';
import Link from 'next/link';

export function PrintingOverview(): JSX.Element {
  return (
    <section className="section dark-forest printing-feature" id="printing-section">
      <div className="wrap">
        <div className="printing-grid">
          <div className="printing-copy">
            <div className="eyebrow" style={{ color: 'var(--lime)' }}>
              Flexographic printing solutions
            </div>
            <h2 style={{ color: '#ffffff' }}>
              Your brand.<br />
              In every<br />
              impression.
            </h2>
            <p style={{ color: '#c7d6ce', marginTop: '24px', fontSize: '17px', lineHeight: 1.6 }}>
              Explore 2-colour flexographic printing solutions engineered for paper bags and custom packaging applications. Achieve crisp brand reproduction on natural and white kraft substrates.
            </p>

            <div className="spec-mini-grid">
              <div className="spec-mini-item">
                <span className="spec-k">Colour configuration</span>
                <strong className="spec-v">2-colour in-line option</strong>
              </div>
              <div className="spec-mini-item">
                <span className="spec-k">Printing width &amp; speed</span>
                <strong className="spec-v">Confirm by machine model</strong>
              </div>
              <div className="spec-mini-item">
                <span className="spec-k">Substrate compatibility</span>
                <strong className="spec-v">Kraft, virgin &amp; coated paper</strong>
              </div>
              <div className="spec-mini-item">
                <span className="spec-k">Inking system</span>
                <strong className="spec-v">Water-based flexographic inks</strong>
              </div>
            </div>

            <div className="printing-actions" style={{ marginTop: '36px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <Link
                href="/printing"
                className="button lime"
                id="explore-printing-solutions-btn"
              >
                Explore Printing Solutions <span className="arrow">↗</span>
              </Link>
              <Link
                href="/contact?interest=Machinery%20%26%20printing&requirements=I%20would%20like%20to%20discuss%202-colour%20flexographic%20printing%20specifications."
                className="button light"
              >
                Discuss Printing Requirements ↗
              </Link>
            </div>

            <p className="note" style={{ color: '#8fa89b', marginTop: '20px' }}>
              Model selection, web widths, registration tolerance and motor ratings are confirmed per project requirements.
            </p>
          </div>

          {/* Restrained Two-Colour SVG Print Study */}
          <div className="printing-visual-stage" aria-label="Two-colour flexographic print study demonstration">
            <div className="print-art-card">
              <div className="print-art-header">
                <span className="big-number">02</span>
                <div className="overprint-tag">
                  <strong>Colours.</strong>
                  <span>Endless impressions.</span>
                </div>
              </div>

              {/* Technical SVG Print Study */}
              <div className="print-study-svg-container">
                <svg
                  viewBox="0 0 380 220"
                  className="print-study-svg"
                  role="img"
                  aria-label="Illustration of 2-colour print cylinders and registration alignment"
                >
                  <defs>
                    <linearGradient id="print-substrate" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#B89160" />
                      <stop offset="50%" stopColor="#cfab7a" />
                      <stop offset="100%" stopColor="#B89160" />
                    </linearGradient>
                  </defs>

                  {/* Substrate Moving Web */}
                  <rect x="20" y="95" width="340" height="30" rx="2" fill="url(#print-substrate)" />
                  <line x1="20" y1="110" x2="360" y2="110" stroke="#8C673B" strokeWidth="1" strokeDasharray="3 3" />

                  {/* Cylinder 1: Deep Ink Cylinder */}
                  <g transform="translate(100, 45)">
                    <circle cx="25" cy="25" r="30" fill="#101B17" stroke="#D9DFD4" strokeWidth="1.5" />
                    <circle cx="25" cy="25" r="8" fill="#193B2D" />
                    <text x="25" y="68" textAnchor="middle" fill="#c7d6ce" fontSize="9" fontWeight="600">CYLINDER 01</text>
                  </g>

                  {/* Impression Cylinder 1 (Below Web) */}
                  <circle cx="125" cy="155" r="22" fill="#243d32" stroke="#486859" strokeWidth="1" />

                  {/* Printed Mark 1 on Web */}
                  <rect x="110" y="100" width="30" height="20" fill="#193B2D" rx="1" />
                  <text x="125" y="114" textAnchor="middle" fill="#D5ED86" fontSize="8" fontWeight="bold">VS</text>

                  {/* Cylinder 2: Lime Accent Cylinder */}
                  <g transform="translate(240, 45)">
                    <circle cx="25" cy="25" r="30" fill="#101B17" stroke="#D5ED86" strokeWidth="1.5" />
                    <circle cx="25" cy="25" r="8" fill="#D5ED86" />
                    <text x="25" y="68" textAnchor="middle" fill="#D5ED86" fontSize="9" fontWeight="600">CYLINDER 02</text>
                  </g>

                  {/* Impression Cylinder 2 (Below Web) */}
                  <circle cx="265" cy="155" r="22" fill="#243d32" stroke="#486859" strokeWidth="1" />

                  {/* Printed Mark 2 on Web */}
                  <rect x="250" y="100" width="30" height="20" fill="#193B2D" stroke="#D5ED86" strokeWidth="1.5" rx="1" />
                  <text x="265" y="114" textAnchor="middle" fill="#D5ED86" fontSize="8" fontWeight="bold">PIAS</text>

                  {/* Alignment Crosshairs */}
                  <g transform="translate(325, 110)">
                    <circle cx="0" cy="0" r="9" fill="none" stroke="#D5ED86" strokeWidth="1" />
                    <line x1="-12" y1="0" x2="12" y2="0" stroke="#D5ED86" strokeWidth="1" />
                    <line x1="0" y1="-12" x2="0" y2="12" stroke="#D5ED86" strokeWidth="1" />
                  </g>
                </svg>
              </div>

              <div className="art-rule" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.15)', margin: '20px 0' }} />

              <div className="art-bottom" style={{ display: 'flex', justifyContent: 'space-between', color: '#c7d6ce', fontSize: '11px' }}>
                <span>FLEXOGRAPHIC PRINTING IN-LINE</span>
                <span style={{ color: 'var(--lime)' }}>2-COLOUR OPTION ↗</span>
              </div>
              <div className="art-note" style={{ color: '#8fa89b', fontSize: '10px', marginTop: '10px' }}>
                Illustrative print mechanism study &middot; Machine datasheets &amp; videos confirmed per model
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PrintingOverview;
