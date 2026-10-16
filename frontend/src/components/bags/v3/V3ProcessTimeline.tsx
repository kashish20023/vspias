'use client';

import React, { useState } from 'react';

interface ProcessStep {
  id: string;
  stepNum: string;
  shortTitle: string;
  title: string;
  desc: string;
  specs: string[];
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    id: 'step-1',
    stepNum: '01',
    shortTitle: 'Reel loading',
    title: 'Reel loading & web tension',
    desc: 'Continuous kraft reels feed through automated reel stands with pneumatic web-brake tension control for uninterrupted high-speed conversion.',
    specs: ['Slitting up to 1050 mm', '70–140 GSM range', 'Automatic web tension']
  },
  {
    id: 'step-2',
    stepNum: '02',
    shortTitle: 'Forming',
    title: 'Tube forming, gusset creasing & pasting',
    desc: 'Precision forming plates crease side gussets, apply longitudinal food-safe PVA adhesive lines, and form continuous paper tubing.',
    specs: ['Adjustable forming plates', 'Food-safe water-based glue', 'Uniform mechanical gussets']
  },
  {
    id: 'step-3',
    stepNum: '03',
    shortTitle: 'Printing',
    title: 'In-line 2-colour flexo printing',
    desc: 'Laser-engraved anilox rollers and photopolymer stereo plates lay down crisp 1 or 2-colour brand artwork synchronously before bag cutting.',
    specs: ['1 or 2-colour registration', 'Water-based flexo inks', 'HD photopolymer stereos']
  },
  {
    id: 'step-4',
    stepNum: '04',
    shortTitle: 'Finishing',
    title: 'Handles, base folding & quality check',
    desc: 'Twisted or flat handles are formed and patched onto top lips, bottoms are mechanically block-folded and pressed, followed by batch tensile sampling.',
    specs: ['Twisted or flat handles', 'Block-bottom folding', 'Handle pull & seam checks']
  }
];

export default function V3ProcessTimeline(): JSX.Element {
  const [activeStep, setActiveStep] = useState<number>(0);
  const current = PROCESS_STEPS[activeStep];

  return (
    <section className="pb-section pb-process" id="process" aria-label="Manufacturing Process and Quality Control">
      {/* Anchor alias to support existing #manufacturing-section deep links */}
      <div id="manufacturing-section" style={{ position: 'relative', top: '-96px' }} />

      <div className="pb-wrap">
        <div className="pb-eyebrow">Production capability &middot; Bengaluru</div>
        <h2 className="pb-h2">From reel to finished bag.</h2>
        <p className="pb-sub">
          Four controlled manufacturing stages. Engineered for high-volume consistency, structural tensile strength, and exact flexographic print registration.
        </p>

        <div className="pb-tl-grid">
          {/* Left Column: Numbered Timeline Steps */}
          <div className="pb-tl" role="list">
            {PROCESS_STEPS.map((step, idx) => {
              const isActive = idx === activeStep;
              const isDone = idx < activeStep;
              return (
                <div
                  key={step.id}
                  role="listitem"
                  className={`pb-st ${isActive ? 'on' : ''} ${isDone ? 'done' : ''}`}
                  onClick={() => setActiveStep(idx)}
                >
                  <span className="pb-dot" aria-hidden="true">{step.stepNum}</span>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                  <ul>
                    {step.specs.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          {/* Right Column: Sticky In-Line Flexo Schematic */}
          <div className="pb-sticky-card">
            <svg
              className="pb-flexo-svg"
              viewBox="0 0 460 260"
              role="img"
              aria-label={`In-line flexographic printing schematic: currently on Stage ${current.stepNum} (${current.shortTitle})`}
            >
              <rect x="10" y="10" width="440" height="240" rx="8" fill="#132B20" stroke="#254F3D" strokeWidth="1.5" />
              
              {/* Paper substrate path */}
              <line className="pb-web-line" x1="30" y1="130" x2="430" y2="130" stroke="#D5ED86" strokeWidth="3" strokeDasharray="6 3" />

              {/* Cylinder 1: Reel / Impression Feed */}
              <g className={`pb-rot ${activeStep === 0 ? 'highlight-cylinder' : ''}`}>
                <circle cx="90" cy="130" r="42" fill="none" stroke={activeStep === 0 ? '#D5ED86' : '#2D6B50'} strokeWidth="2" />
                <circle cx="90" cy="130" r="8" fill="#D5ED86" />
                <path d="M90 92v76M52 130h76" stroke="#D5ED86" opacity="0.4" />
              </g>
              <text x="90" y="195" textAnchor="middle" fill="#E9ECDF" fontSize="11" fontFamily="sans-serif">
                Reel Feed
              </text>

              {/* Cylinder 2: Anilox Inking Roller */}
              <g className={`pb-rot r ${activeStep === 2 ? 'highlight-cylinder' : ''}`}>
                <circle cx="210" cy="80" r="34" fill="none" stroke="#B89160" strokeWidth="2" />
                <circle cx="210" cy="80" r="6" fill="#B89160" />
                <path d="M210 46v68M176 80h68" stroke="#B89160" opacity="0.4" />
              </g>
              <text x="210" y="38" textAnchor="middle" fill="#E9ECDF" fontSize="11" fontFamily="sans-serif">
                Anilox Inking
              </text>

              {/* Cylinder 3: Plate Stereo Cylinder */}
              <g className={`pb-rot ${activeStep === 2 ? 'highlight-cylinder' : ''}`}>
                <circle cx="210" cy="154" r="38" fill="none" stroke={activeStep === 2 ? '#D5ED86' : '#2D6B50'} strokeWidth="2" />
                <circle cx="210" cy="154" r="6" fill="#D5ED86" />
                <path d="M210 116v76M172 154h76" stroke="#D5ED86" opacity="0.4" />
              </g>
              <text x="210" y="214" textAnchor="middle" fill="#E9ECDF" fontSize="11" fontFamily="sans-serif">
                Stereo Plate
              </text>

              {/* Forming & Handle Assembly */}
              <rect
                x="310"
                y="90"
                width="100"
                height="80"
                rx="4"
                fill="#1B3A2C"
                stroke={activeStep >= 1 ? '#D5ED86' : '#2D6B50'}
                strokeWidth="1.5"
              />
              <text x="360" y="125" textAnchor="middle" fill="#D5ED86" fontSize="11" fontWeight="700" fontFamily="sans-serif">
                BAG FORMING
              </text>
              <text x="360" y="145" textAnchor="middle" fill="#ffffff" fontSize="9" opacity="0.75" fontFamily="sans-serif">
                &amp; Handle Bonding
              </text>
            </svg>

            <div className="pb-cap">
              <span>
                Stage <b>{current.stepNum}</b> / 04
              </span>
              <span>{current.shortTitle}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
