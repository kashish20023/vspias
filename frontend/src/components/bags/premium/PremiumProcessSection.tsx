'use client';

import React, { useState } from 'react';

const STEP_COPY = [
  ['Paper & format', 'Where your bag begins.'],
  ['Brand artwork', 'A space for your identity.'],
  ['Form & finish', 'Your choices take shape.'],
  ['Review the details', 'Considered from start to finish.']
];

export default function PremiumProcessSection() {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <section className="process pb-process-section" id="process" aria-labelledby="processTitle">
      <div className="wrap">
        <div className="section-head reveal">
          <div>
            <div className="eyebrow">From paper to purpose</div>
            <h2 className="section-title" id="processTitle">
              The details behind<br />every finished bag.
            </h2>
          </div>
          <p>
            A closer look at the making process.<br />
            Follow the steps from paper selection to the finishing touches.
          </p>
        </div>

        <div className="process-grid">
          <ol className="process-list" id="processList">
            <li className={`process-step ${currentStep === 0 ? 'active' : ''} ${currentStep > 0 ? 'done' : ''}`} data-step="0">
              <button
                type="button"
                onClick={() => setCurrentStep(0)}
                aria-label="Show step 1: Paper and format"
                aria-pressed={currentStep === 0}
              >
                01
              </button>
              <h3>Start with the right paper.</h3>
              <p>Choose a paper, weight and format around the product you want to carry and the finish you have in mind.</p>
              <div className="process-tags">
                <span>Paper selection</span>
                <span>Size & format</span>
              </div>
            </li>

            <li className={`process-step ${currentStep === 1 ? 'active' : ''} ${currentStep > 1 ? 'done' : ''}`} data-step="1">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                aria-label="Show step 2: Brand artwork"
                aria-pressed={currentStep === 1}
              >
                02
              </button>
              <h3>Give your brand its space.</h3>
              <p>Bring together the artwork, print placement and colours so the finished bag feels distinctly yours.</p>
              <div className="process-tags">
                <span>Brand imprint</span>
                <span>Print placement</span>
              </div>
            </li>

            <li className={`process-step ${currentStep === 2 ? 'active' : ''} ${currentStep > 2 ? 'done' : ''}`} data-step="2">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                aria-label="Show step 3: Form and finish"
                aria-pressed={currentStep === 2}
              >
                03
              </button>
              <h3>Bring the shape together.</h3>
              <p>The chosen format takes shape, with the base, folds and handle style considered as a complete product.</p>
              <div className="process-tags">
                <span>Bag forming</span>
                <span>Handle finish</span>
              </div>
            </li>

            <li className={`process-step ${currentStep === 3 ? 'active' : ''}`} data-step="3">
              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                aria-label="Show step 4: Review details"
                aria-pressed={currentStep === 3}
              >
                04
              </button>
              <h3>Finish with the finer details.</h3>
              <p>Review the dimensions, artwork and construction against the agreed specification before the final handover.</p>
              <div className="process-tags">
                <span>Specification review</span>
                <span>Final presentation</span>
              </div>
            </li>
          </ol>

          <figure className="process-visual">
            <div className="process-visual-top">
              <span>Paper-to-bag · A visual guide</span>
              <svg className="icon" aria-hidden="true"><use href="#i-arrow" /></svg>
            </div>

            <svg
              className="machine"
              viewBox="0 0 480 260"
              role="img"
              aria-label="Illustration of paper passing through printing and bag forming"
            >
              <defs>
                <pattern id="machine-grid" width="22" height="22" patternUnits="userSpaceOnUse">
                  <circle cx="1" cy="1" r=".7" fill="#83a571" opacity=".28" />
                </pattern>
              </defs>
              <rect width="480" height="260" fill="url(#machine-grid)" />
              <path d="M45 164H434" stroke="#d5ed86" opacity=".15" />
              <path className="motion-web" d="M78 142H175L206 112H270L301 142H418" fill="none" stroke="#c8df9f" strokeWidth="2.5" />

              {/* Zone 0: Paper */}
              <g className={`stage-zone ${currentStep >= 0 ? 'lit' : ''}`} data-zone="0">
                <circle cx="78" cy="142" r="43" fill="#173a29" stroke="#d5ed86" strokeWidth="1.5" />
                <g className="motion-roll">
                  <circle cx="78" cy="142" r="31" fill="none" stroke="#d5ed86" strokeWidth="1" />
                  <path d="M78 111v62m-31-31h62" stroke="#d5ed86" strokeWidth="1" />
                </g>
                <circle cx="78" cy="142" r="7" fill="#d5ed86" />
                <text x="78" y="222" fill="#c5d9b0" fontSize="10" fontFamily="inherit" textAnchor="middle">PAPER</text>
              </g>

              {/* Zone 1: Imprint */}
              <g className={`stage-zone ${currentStep >= 1 ? 'lit' : ''}`} data-zone="1">
                <rect x="181" y="54" width="104" height="119" rx="9" fill="#173a29" stroke="#d5ed86" />
                <g className="motion-roll">
                  <circle cx="233" cy="95" r="24" fill="none" stroke="#d5ed86" />
                  <path d="M233 71v48m-24-24h48" stroke="#d5ed86" />
                </g>
                <circle cx="233" cy="151" r="20" fill="none" stroke="#b89160" />
                <circle cx="233" cy="151" r="5" fill="#b89160" />
                <path d="M197 43h72" stroke="#d5ed86" strokeWidth="2" />
                <text x="233" y="222" fill="#c5d9b0" fontSize="10" fontFamily="inherit" textAnchor="middle">IMPRINT</text>
              </g>

              {/* Zone 2: Form */}
              <g className={`stage-zone ${currentStep >= 2 ? 'lit' : ''}`} data-zone="2">
                <rect x="330" y="97" width="76" height="77" rx="5" fill="#173a29" stroke="#d5ed86" />
                <path d="M341 107h53l-9 56h-35z" fill="#c8a16d" stroke="#d5ed86" strokeWidth=".5" />
                <path d="M357 107V92q10-22 21 0v15" fill="none" stroke="#d5ed86" strokeWidth="2" />
                <path d="M385 107v56" stroke="#9b7952" />
                <text x="369" y="222" fill="#c5d9b0" fontSize="10" fontFamily="inherit" textAnchor="middle">FORM</text>
              </g>

              {/* Zone 3: Complete / Review */}
              <g className={`stage-zone ${currentStep >= 3 ? 'lit' : ''}`} data-zone="3">
                <circle cx="439" cy="142" r="17" fill="#d5ed86" />
                <path d="m431 142 5 5 10-11" fill="none" stroke="#183d2d" strokeWidth="2" />
              </g>
            </svg>

            <div className="process-visual-bottom" aria-live="polite">
              <span className="step-num" id="processNumber">
                {String(currentStep + 1).padStart(2, '0')}
              </span>
              <div>
                <b id="processCaption">{STEP_COPY[currentStep][0]}</b>
                <small id="processDescription">{STEP_COPY[currentStep][1]}</small>
              </div>
            </div>

            <figcaption className="process-caption">
              Illustrative process. Manufacturing details are confirmed for your selected format.
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
