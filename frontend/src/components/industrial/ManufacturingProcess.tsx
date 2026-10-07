'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';

interface ProcessStep {
  id: string;
  tabLabel: string;
  stepNumber: string;
  stepTitle: string;
  description: string;
  parameters: string;
  graphicType: 'feeding' | 'printing' | 'handles' | 'finished';
}

const STEPS: ProcessStep[] = [
  {
    id: 'step-machine',
    tabLabel: '1. Paper Bag Machine',
    stepNumber: '01 / CONFIGURE',
    stepTitle: 'Roll Feeding & Tube Forming',
    description:
      'Paper reels are mounted, auto-fed and tension-controlled. The continuous web passes through slitting and crease guides, then enters the forming section where the tube and side gussets are precisely shaped.',
    parameters: 'Web reel diameter: up to 1200 mm · Paper weight: 70–140 GSM · Electronic tension control',
    graphicType: 'feeding'
  },
  {
    id: 'step-printing',
    tabLabel: '2. In-line Printing',
    stepNumber: '02 / PERSONALISE',
    stepTitle: '2-Colour Flexographic Printing',
    description:
      'In-line flexographic printing applies up to two distinct ink colours to the web before tube formation. Ceramic anilox rollers and micro-registration adjustments ensure clean logo impressions and sharp typography.',
    parameters: 'Colour configuration: 2-colour option · Water-based inks · Registration accuracy to specification',
    graphicType: 'printing'
  },
  {
    id: 'step-production',
    tabLabel: '3. Bottom & Handles',
    stepNumber: '03 / PRODUCE',
    stepTitle: 'Handle Integration & Bottom Pasting',
    description:
      'Twisted paper cord or flat fold handles are fabricated and bonded to the inner rim. Rotary knives cut the continuous tube to precise bag length, and the bottom flap is folded and glued under uniform roller pressure.',
    parameters: 'Twisted cord / flat handle capability · Water-soluble adhesive · High-speed rotary bottom folding',
    graphicType: 'handles'
  },
  {
    id: 'step-finished',
    tabLabel: '4. Finished Bag',
    stepNumber: '04 / DELIVER THE IDEA',
    stepTitle: 'Inspection, Counting & Dispatch',
    description:
      'Completed paper bags emerge onto the delivery table with crisp creases and secure handles. Automated batch counting and dimensional spot checks ensure consistent production readiness for retail or food clients.',
    parameters: 'Automated batch counting · Stacking table collection · Ready for palletisation & shipment',
    graphicType: 'finished'
  }
];

export function ManufacturingProcess(): JSX.Element {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const activeStep = STEPS[activeStepIndex];

  // ARIA keyboard navigation between tabs (Arrow keys, Home, End)
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let nextIndex = index;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      nextIndex = (index + 1) % STEPS.length;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      nextIndex = (index - 1 + STEPS.length) % STEPS.length;
    } else if (e.key === 'Home') {
      e.preventDefault();
      nextIndex = 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      nextIndex = STEPS.length - 1;
    }

    if (nextIndex !== index) {
      setActiveStepIndex(nextIndex);
      tabRefs.current[nextIndex]?.focus();
    }
  };

  return (
    <section className="section dark manufacturing-journey" id="manufacturing-section">
      <div className="wrap">
        <div className="section-head">
          <div>
            <div className="eyebrow" style={{ color: 'var(--lime)' }}>
              Complete Manufacturing Workflow
            </div>
            <h2 style={{ color: '#ffffff' }}>
              From a paper roll<br />to a finished bag.
            </h2>
          </div>
          <p style={{ color: '#c7d6ce' }}>
            A synchronized, four-stage manufacturing sequence. Explore how reels transform into retail-ready packaging.
          </p>
        </div>

        {/* 4 Interactive Tab Buttons */}
        <div
          className="process-tabs-header"
          role="tablist"
          aria-label="Manufacturing journey steps"
        >
          {STEPS.map((step, idx) => (
            <button
              key={step.id}
              ref={(el) => {
                tabRefs.current[idx] = el;
              }}
              type="button"
              role="tab"
              id={`tab-${step.id}`}
              aria-selected={activeStepIndex === idx}
              aria-controls={`panel-${step.id}`}
              tabIndex={activeStepIndex === idx ? 0 : -1}
              className={`process-tab-btn ${activeStepIndex === idx ? 'active' : ''}`}
              onClick={() => setActiveStepIndex(idx)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
            >
              <span className="tab-step-indicator">{step.stepNumber}</span>
              <span className="tab-step-name">{step.tabLabel}</span>
            </button>
          ))}
        </div>

        {/* Active Tab Panel */}
        <div
          className="process-panel-card"
          role="tabpanel"
          id={`panel-${activeStep.id}`}
          aria-labelledby={`tab-${activeStep.id}`}
        >
          <div className="process-panel-grid">
            <div className="process-info-col">
              <div className="process-number-badge">
                <span>{activeStep.stepNumber}</span>
              </div>
              <h3 className="process-step-title">{activeStep.stepTitle}</h3>
              <p className="process-step-desc">{activeStep.description}</p>

              <div className="process-specs-box">
                <span className="specs-box-label">Technical Parameters:</span>
                <p className="specs-box-text">{activeStep.parameters}</p>
              </div>

              <div className="process-actions">
                <Link
                  href={`/contact?interest=Machinery%20%26%20printing&requirements=${encodeURIComponent(
                    `I would like to plan a production setup for ${activeStep.stepTitle}.`
                  )}`}
                  className="button lime"
                  id="process-plan-production-btn"
                >
                  Plan your production <span className="arrow">↗</span>
                </Link>
                <Link href="/printing" className="button light">
                  Explore Printing Options ↗
                </Link>
              </div>
            </div>

            {/* Schematic Process Graphic */}
            <div className="process-graphic-col" aria-label={`Schematic diagram for ${activeStep.stepTitle}`}>
              <div className="graphic-frame">
                <span className="graphic-label">Process Schematic &middot; Step 0{activeStepIndex + 1}</span>
                <svg
                  viewBox="0 0 460 260"
                  className="process-schematic-svg"
                  role="img"
                  aria-label={`Visual diagram of ${activeStep.stepTitle}`}
                >
                  <defs>
                    <linearGradient id="metal-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#314B3E" />
                      <stop offset="100%" stopColor="#193B2D" />
                    </linearGradient>
                    <linearGradient id="kraft-flow" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#B89160" />
                      <stop offset="100%" stopColor="#D5ED86" />
                    </linearGradient>
                  </defs>

                  {/* Base Track */}
                  <line x1="30" y1="200" x2="430" y2="200" stroke="#314B3E" strokeWidth="2" strokeDasharray="4 4" />

                  {activeStep.graphicType === 'feeding' && (
                    <g>
                      {/* Reel Roll */}
                      <circle cx="80" cy="140" r="50" fill="url(#metal-grad)" stroke="#D5ED86" strokeWidth="2" />
                      <circle cx="80" cy="140" r="16" fill="#101B17" stroke="#D5ED86" strokeWidth="1.5" />
                      <text x="80" y="144" textAnchor="middle" fill="#D5ED86" fontSize="10" fontWeight="bold">PAPER REEL</text>

                      {/* Web Guide Rollers */}
                      <circle cx="180" cy="130" r="14" fill="#314B3E" stroke="#D9DFD4" strokeWidth="1.5" />
                      <circle cx="230" cy="170" r="14" fill="#314B3E" stroke="#D9DFD4" strokeWidth="1.5" />

                      {/* Moving Paper Web */}
                      <path d="M 80 90 L 180 116 L 230 184 L 320 184" fill="none" stroke="url(#kraft-flow)" strokeWidth="4" />

                      {/* Tube Forming Former */}
                      <polygon points="320,150 420,170 420,200 320,215" fill="#193B2D" stroke="#D5ED86" strokeWidth="1.5" />
                      <text x="370" y="188" textAnchor="middle" fill="#F5F5EF" fontSize="11" fontWeight="600">FORMING TUBE</text>
                    </g>
                  )}

                  {activeStep.graphicType === 'printing' && (
                    <g>
                      {/* Substrate Web Line */}
                      <line x1="30" y1="160" x2="430" y2="160" stroke="#B89160" strokeWidth="4" />

                      {/* Print Unit 1 (Lime Accent) */}
                      <circle cx="150" cy="110" r="32" fill="url(#metal-grad)" stroke="#D5ED86" strokeWidth="2" />
                      <text x="150" y="114" textAnchor="middle" fill="#D5ED86" fontSize="10" fontWeight="bold">COLOUR 1</text>
                      <circle cx="150" cy="190" r="20" fill="#314B3E" stroke="#c7d6ce" strokeWidth="1.5" />

                      {/* Print Unit 2 (Ink Accent) */}
                      <circle cx="290" cy="110" r="32" fill="url(#metal-grad)" stroke="#D5ED86" strokeWidth="2" />
                      <text x="290" y="114" textAnchor="middle" fill="#D5ED86" fontSize="10" fontWeight="bold">COLOUR 2</text>
                      <circle cx="290" cy="190" r="20" fill="#314B3E" stroke="#c7d6ce" strokeWidth="1.5" />

                      {/* Registration Mark Indicator */}
                      <circle cx="390" cy="140" r="12" fill="none" stroke="#D5ED86" strokeWidth="1.5" />
                      <line x1="390" y1="124" x2="390" y2="156" stroke="#D5ED86" strokeWidth="1" />
                      <line x1="374" y1="140" x2="406" y2="140" stroke="#D5ED86" strokeWidth="1" />
                      <text x="390" y="176" textAnchor="middle" fill="#c7d6ce" fontSize="9">REGISTRATION</text>
                    </g>
                  )}

                  {activeStep.graphicType === 'handles' && (
                    <g>
                      {/* Tube Feed */}
                      <rect x="40" y="130" width="120" height="60" rx="3" fill="#B89160" stroke="#74542E" strokeWidth="1.5" />
                      <text x="100" y="165" textAnchor="middle" fill="#193B2D" fontSize="11" fontWeight="bold">FOLDED TUBE</text>

                      {/* Handle Applicator Wheel */}
                      <circle cx="230" cy="90" r="36" fill="url(#metal-grad)" stroke="#D5ED86" strokeWidth="2" />
                      <path d="M 210 90 C 210 65, 250 65, 250 90" fill="none" stroke="#D5ED86" strokeWidth="3" />
                      <text x="230" y="118" textAnchor="middle" fill="#D5ED86" fontSize="9">CORD APPLICATOR</text>

                      {/* Bottom Gluing Rotary Station */}
                      <circle cx="350" cy="160" r="32" fill="#314B3E" stroke="#D5ED86" strokeWidth="2" />
                      <text x="350" y="164" textAnchor="middle" fill="#F5F5EF" fontSize="10" fontWeight="bold">BOTTOM GLUE</text>
                    </g>
                  )}

                  {activeStep.graphicType === 'finished' && (
                    <g>
                      {/* Conveyor Belt */}
                      <line x1="30" y1="190" x2="430" y2="190" stroke="#314B3E" strokeWidth="4" />
                      <circle cx="50" cy="190" r="10" fill="#D5ED86" />
                      <circle cx="410" cy="190" r="10" fill="#D5ED86" />

                      {/* Stacked Finished Bags */}
                      <g transform="translate(140, 70)">
                        <rect x="0" y="40" width="60" height="80" rx="2" fill="#B89160" stroke="#74542E" strokeWidth="1" />
                        <path d="M 18 40 C 18 20, 42 20, 42 40" fill="none" stroke="#74542E" strokeWidth="2.5" />
                      </g>
                      <g transform="translate(190, 70)">
                        <rect x="0" y="40" width="60" height="80" rx="2" fill="#F7F6EE" stroke="#BCB4A0" strokeWidth="1" />
                        <path d="M 18 40 C 18 20, 42 20, 42 40" fill="none" stroke="#BCB4A0" strokeWidth="2.5" />
                      </g>
                      <g transform="translate(240, 70)">
                        <rect x="0" y="40" width="60" height="80" rx="2" fill="#183D2D" stroke="#D5ED86" strokeWidth="1" />
                        <path d="M 18 40 C 18 20, 42 20, 42 40" fill="none" stroke="#D5ED86" strokeWidth="2.5" />
                        <text x="30" y="86" textAnchor="middle" fill="#D5ED86" fontSize="7" fontWeight="bold">VSPIAS</text>
                      </g>

                      {/* Sensor Counter Indicator */}
                      <rect x="340" y="110" width="70" height="40" rx="4" fill="#101B17" stroke="#D5ED86" strokeWidth="1.5" />
                      <text x="375" y="128" textAnchor="middle" fill="#D5ED86" fontSize="10" fontWeight="bold">BATCH</text>
                      <text x="375" y="142" textAnchor="middle" fill="#c7d6ce" fontSize="9">COUNT OK</text>
                    </g>
                  )}
                </svg>
                <div className="graphic-footer-note">
                  <span>Precision automation sequence</span>
                  <span>ISO standard machine integration</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="process-foot-banner">
          <p>
            Connected engineering from paper roll to commercial bag. Discuss machine configurations, floor space and target cycle times with our team.
          </p>
          <Link href="/contact?interest=Machinery%20%26%20printing" className="button lime" id="discuss-production-line-btn">
            Discuss Your Production Line <span className="arrow">↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ManufacturingProcess;
