'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface StageData {
  id: string;
  tabLabel: string;
  stepNum: string;
  title: string;
  summary: string;
  details: { label: string; value: string }[];
}

const STAGES: StageData[] = [
  {
    id: 'stage-1',
    tabLabel: '01 / CONFIGURE',
    stepNum: '01',
    title: 'Reel Loading & Web Tension Control',
    summary:
      'Continuous kraft paper reels are loaded onto automated reel stands equipped with pneumatic web brake tension controls for uninterrupted feeding.',
    details: [
      { label: 'Paper Web Width', value: 'Custom reel slitting up to 1050 mm' },
      { label: 'Substrate Range', value: '70 to 140 GSM virgin & recycled kraft' },
      { label: 'Tension System', value: 'Automatic pneumatic web tension control' }
    ]
  },
  {
    id: 'stage-2',
    tabLabel: '02 / FORMING',
    stepNum: '02',
    title: 'Tube Forming, Gusset Creasing & Pasting',
    summary:
      'The paper web travels through forming plates that crease side gussets, apply longitudinal water-based glue lines, and form continuous paper tubing.',
    details: [
      { label: 'Forming Mechanism', value: 'Mechanical adjustable forming plates' },
      { label: 'Adhesive Type', value: 'Industrial food-safe water-based PVA adhesive' },
      { label: 'Gusset Precision', value: 'Uniform mechanical creasing across batch' }
    ]
  },
  {
    id: 'stage-3',
    tabLabel: '03 / PRINTING',
    stepNum: '03',
    title: 'In-Line 2-Colour Flexographic Printing',
    summary:
      'Integrated in-line flexographic stations use laser-engraved anilox rollers and photopolymer stereo plates to lay down crisp 1 or 2-colour brand artwork.',
    details: [
      { label: 'Colour Capability', value: '1 or 2-colour precision registration' },
      { label: 'Ink System', value: 'Eco-friendly water-based flexographic inks' },
      { label: 'Plate Technology', value: 'High-definition photopolymer stereo plates' }
    ]
  },
  {
    id: 'stage-4',
    tabLabel: '04 / DELIVER THE IDEA',
    stepNum: '04',
    title: 'Handle Bonding, Base Folding & Quality Check',
    summary:
      'Twisted or flat handles are formed from paper cord, patched onto the top lip, and the bottom is pasted and pressed before comprehensive tensile sampling.',
    details: [
      { label: 'Handle Type', value: 'Reinforced twisted cord or flat paper handles' },
      { label: 'Base Construction', value: 'Square block-bottom mechanical folding' },
      { label: 'Quality Verification', value: 'Handle pull-testing and seam tensile checks' }
    ]
  }
];

export default function ManufacturingEvidenceSection(): JSX.Element {
  const [activeStageId, setActiveStageId] = useState<string>('stage-1');
  const currentStage = STAGES.find((s) => s.id === activeStageId) || STAGES[0];

  return (
    <section
      className="section manufacturing-evidence-contrast"
      id="manufacturing-section"
      aria-label="Manufacturing and Quality Evidence"
    >
      <div className="wrap">
        {/* Section Header with verified deliberate text */}
        <div className="section-head-split light-on-dark">
          <div className="head-copy">
            <div className="eyebrow contrast-eyebrow">
              PRODUCTION CAPABILITY &middot; PEENYA, BENGALURU
            </div>
            <h2 className="section-title contrast-title">
              Your brand.<br />
              In every<br />
              impression.
            </h2>
          </div>
          <div className="head-desc-block">
            <p className="head-desc contrast-desc">
              Engineered for consistency at volume. Automatic reel-fed bag making machines, integrated 2-colour in-line flexographic printing, and rigorous handle pull testing from our facility in Peenya Industrial Area.
            </p>
            <div className="quality-pill-row">
              <span className="q-pill">Automated Reel-Fed Machinery</span>
              <span className="q-pill">2-Colour In-Line Flexo</span>
              <span className="q-pill">Handle Pull Testing</span>
              <span className="q-pill">Peenya 2nd Phase Hub</span>
            </div>
          </div>
        </div>

        {/* 4-Stage Process Tabs */}
        <div className="manufacturing-stage-container">
          <div
            className="manufacturing-tabs"
            role="tablist"
            aria-label="Manufacturing process stages"
          >
            {STAGES.map((stage) => {
              const isSelected = stage.id === currentStage.id;
              return (
                <button
                  key={stage.id}
                  type="button"
                  role="tab"
                  id={`tab-${stage.id}`}
                  aria-selected={isSelected}
                  aria-controls={`panel-${stage.id}`}
                  className={`mfg-tab-btn ${isSelected ? 'active' : ''}`}
                  onClick={() => setActiveStageId(stage.id)}
                >
                  <span className="tab-pill-label">{stage.tabLabel}</span>
                  <span className="tab-stage-title">{stage.title}</span>
                </button>
              );
            })}
          </div>

          {/* Active Stage Panel */}
          <div
            className="mfg-panel-card"
            id={`panel-${currentStage.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${currentStage.id}`}
          >
            <div className="mfg-panel-grid">
              {/* Left Column: Description & Technical Parameters */}
              <div className="mfg-panel-info">
                <div className="mfg-step-indicator">
                  <span className="step-badge">STAGE {currentStage.stepNum}</span>
                  <span className="step-tagline">{currentStage.tabLabel}</span>
                </div>
                <h3 className="mfg-panel-title">{currentStage.title}</h3>
                <p className="mfg-panel-summary">{currentStage.summary}</p>

                <div className="mfg-specs-box">
                  <h4 className="mfg-specs-header">Technical Process Parameters</h4>
                  <div className="mfg-specs-list">
                    {currentStage.details.map((item, idx) => (
                      <div key={idx} className="mfg-spec-item">
                        <span className="mfg-spec-label">{item.label}</span>
                        <strong className="mfg-spec-val">{item.value}</strong>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mfg-actions">
                  <Link
                    href={`/contact?interest=Paper%20bags&requirements=${encodeURIComponent(
                      `Enquiry regarding manufacturing stage ${currentStage.title}.`
                    )}`}
                    className="button contrast-btn"
                  >
                    Discuss Production Specifications <span>↗</span>
                  </Link>
                </div>
              </div>

              {/* Right Column: In-Line Flexo Schematic / Process Diagram */}
              <div className="mfg-panel-schematic">
                <div className="schematic-diagram-box">
                  <div className="schematic-header">
                    <span className="schematic-title">IN-LINE PROCESS SCHEMATIC</span>
                    <span className="schematic-status">AUTOMATED</span>
                  </div>

                  <svg
                    viewBox="0 0 460 260"
                    className="process-schematic-svg"
                    role="img"
                    aria-label={`Process diagram for ${currentStage.title}`}
                  >
                    <rect x="10" y="10" width="440" height="240" rx="8" fill="#132B20" stroke="#254F3D" strokeWidth="1.5" />

                    {/* Paper web line */}
                    <line x1="30" y1="130" x2="430" y2="130" stroke="#D5ED86" strokeWidth="3" strokeDasharray="6 3" />

                    {/* Cylinder 1: Reel / Impression */}
                    <circle cx="90" cy="130" r="42" fill="#193B2D" stroke="#D5ED86" strokeWidth="2" />
                    <circle cx="90" cy="130" r="12" fill="#D5ED86" />
                    <text x="90" y="195" textAnchor="middle" fill="#E9ECDF" fontSize="11" fontFamily="sans-serif">
                      Reel Feed
                    </text>

                    {/* Cylinder 2: Anilox Inking Unit */}
                    <circle cx="210" cy="80" r="34" fill="#193B2D" stroke="#B89160" strokeWidth="2" />
                    <circle cx="210" cy="80" r="9" fill="#B89160" />
                    <text x="210" y="38" textAnchor="middle" fill="#E9ECDF" fontSize="11" fontFamily="sans-serif">
                      Anilox Roller
                    </text>

                    {/* Cylinder 3: Plate Cylinder */}
                    <circle cx="210" cy="154" r="38" fill="#183D2D" stroke="#D5ED86" strokeWidth="2" />
                    <circle cx="210" cy="154" r="10" fill="#D5ED86" />
                    <text x="210" y="214" textAnchor="middle" fill="#E9ECDF" fontSize="11" fontFamily="sans-serif">
                      Stereo Plate (Print)
                    </text>

                    {/* Forming & Handle Assembly */}
                    <rect x="310" y="90" width="100" height="80" rx="4" fill="#193B2D" stroke="#D5ED86" strokeWidth="1.5" />
                    <text x="360" y="125" textAnchor="middle" fill="#D5ED86" fontSize="12" fontWeight="bold" fontFamily="sans-serif">
                      BAG FORMING
                    </text>
                    <text x="360" y="145" textAnchor="middle" fill="#E9ECDF" fontSize="10" fontFamily="sans-serif">
                      &amp; Handle Bonding
                    </text>

                    {/* Arrow Indicators */}
                    <path d="M 136 130 L 166 130" stroke="#D5ED86" strokeWidth="2" markerEnd="url(#arrow)" />
                    <path d="M 252 130 L 306 130" stroke="#D5ED86" strokeWidth="2" />
                  </svg>

                  <div className="schematic-caption">
                    <span>Continuous Reel-Fed Substrate Path &middot; 2-Colour Flexo &amp; Automated Forming</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
