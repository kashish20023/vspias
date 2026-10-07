'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface FinishOption {
  id: string;
  label: string;
  colorName: string;
  bagColor: string;
  sideColor: string;
  creaseColor: string;
  inkColor: string;
  handleColor: string;
  handleStroke: string;
  swatchHex: string;
}

const FINISHES: FinishOption[] = [
  {
    id: 'kraft',
    label: 'Natural Kraft',
    colorName: 'Unbleached virgin kraft',
    bagColor: '#B89160',
    sideColor: '#A17B4C',
    creaseColor: '#8B683D',
    inkColor: '#193B2D',
    handleColor: '#8C673B',
    handleStroke: '#74542E',
    swatchHex: '#B89160'
  },
  {
    id: 'ivory',
    label: 'Bleached Ivory',
    colorName: 'Clean ivory white kraft',
    bagColor: '#F7F6EE',
    sideColor: '#EBE7DC',
    creaseColor: '#D8D2C2',
    inkColor: '#193B2D',
    handleColor: '#D3CCBA',
    handleStroke: '#BCB4A0',
    swatchHex: '#F7F6EE'
  },
  {
    id: 'custom',
    label: 'Forest Custom Print',
    colorName: 'Deep forest green coated',
    bagColor: '#183D2D',
    sideColor: '#123023',
    creaseColor: '#0E241B',
    inkColor: '#D5ED86',
    handleColor: '#123023',
    handleStroke: '#0A1C14',
    swatchHex: '#183D2D'
  }
];

export default function BagExpressionPreview(): JSX.Element {
  const [selectedFinish, setSelectedFinish] = useState<FinishOption>(FINISHES[0]);
  const [brandName, setBrandName] = useState<string>('YOUR BRAND');

  // Compute safe dynamic font size based on text length to prevent overflow
  const cleanBrand = brandName.trim() || 'YOUR BRAND';
  const dynamicFontSize = Math.max(
    14,
    Math.min(26, Math.round(280 / Math.max(9, cleanBrand.length)))
  );

  const enquiryUrl = `/contact?interest=Paper%20bags&finish=${encodeURIComponent(
    selectedFinish.label
  )}&brand=${encodeURIComponent(cleanBrand)}&requirements=${encodeURIComponent(
    `Custom bag enquiry — Preferred finish: ${selectedFinish.label} (${selectedFinish.colorName}). Target brand imprint: "${cleanBrand}". Please advise on MOQ and print lead times.`
  )}`;

  return (
    <section className="section customise-section" id="customise-section">
      <div className="wrap">
        <div className="section-head">
          <div>
            <div className="eyebrow">Interactive visual expression</div>
            <h2>
              Make every<br />carry count.
            </h2>
          </div>
          <p>
            Bring your brand identity to the bag. Test visual finishes and see your brand name come to life in real time.
          </p>
        </div>

        <div className="bag-expression-stage">
          {/* Left: Sage Stage with Interactive Bag SVG Model */}
          <div className="stage-canvas-card">
            <div className="stage-badge">
              <span className="dot" aria-hidden="true" />
              <span>LIVE PREVIEW &middot; {selectedFinish.label.toUpperCase()}</span>
            </div>

            <div className="bag-model-viewport" aria-label={`Preview of ${selectedFinish.label} paper bag with brand name ${cleanBrand}`}>
              <svg
                viewBox="0 0 400 480"
                className="bag-svg-model"
                role="img"
                aria-label={`Interactive paper bag visualization in ${selectedFinish.label}`}
              >
                <defs>
                  <clipPath id="print-area-clip">
                    <rect x="80" y="160" width="240" height="150" rx="4" />
                  </clipPath>
                  <filter id="bag-drop-shadow" x="-10%" y="-10%" width="120%" height="120%">
                    <feDropShadow dx="0" dy="18" stdDeviation="16" floodColor="#193B2D" floodOpacity="0.12" />
                  </filter>
                </defs>

                {/* Handle: Twisted Paper Cord extending above bag */}
                <path
                  d="M 140 120 C 140 30, 260 30, 260 120"
                  fill="none"
                  stroke={selectedFinish.handleColor}
                  strokeWidth="12"
                  strokeLinecap="round"
                  filter="url(#bag-drop-shadow)"
                />
                <path
                  d="M 140 120 C 140 30, 260 30, 260 120"
                  fill="none"
                  stroke={selectedFinish.handleStroke}
                  strokeWidth="3"
                  strokeDasharray="4 2"
                  strokeLinecap="round"
                />

                {/* Handle Attachments / Reinforcement patches */}
                <rect x="132" y="112" width="16" height="24" rx="2" fill={selectedFinish.creaseColor} opacity="0.6" />
                <rect x="252" y="112" width="16" height="24" rx="2" fill={selectedFinish.creaseColor} opacity="0.6" />

                {/* Bag Main Body */}
                <rect
                  x="60"
                  y="110"
                  width="280"
                  height="320"
                  rx="3"
                  fill={selectedFinish.bagColor}
                  filter="url(#bag-drop-shadow)"
                />

                {/* Left Gusset Shadow / 3D Perspective Fold */}
                <path
                  d="M 60 110 L 85 125 L 85 415 L 60 430 Z"
                  fill={selectedFinish.sideColor}
                  opacity="0.85"
                />

                {/* Top Fold Crease Line */}
                <line
                  x1="60"
                  y1="135"
                  x2="340"
                  y2="135"
                  stroke={selectedFinish.creaseColor}
                  strokeWidth="2"
                  opacity="0.4"
                />

                {/* Bottom Gusset Fold Line */}
                <path
                  d="M 60 395 L 85 415 L 340 415"
                  fill="none"
                  stroke={selectedFinish.creaseColor}
                  strokeWidth="1.5"
                  opacity="0.5"
                />

                {/* Central Print Area Boundary */}
                <rect
                  x="80"
                  y="160"
                  width="240"
                  height="150"
                  rx="4"
                  fill="none"
                  stroke={selectedFinish.inkColor}
                  strokeWidth="1"
                  strokeDasharray="3 3"
                  opacity="0.25"
                />

                {/* Safe Brand Imprint rendered via pure text element */}
                <g clipPath="url(#print-area-clip)">
                  <text
                    x="200"
                    y="228"
                    textAnchor="middle"
                    fill={selectedFinish.inkColor}
                    fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
                    fontSize={dynamicFontSize}
                    fontWeight="700"
                    letterSpacing="0.08em"
                  >
                    {cleanBrand.toUpperCase()}
                  </text>
                  <text
                    x="200"
                    y="256"
                    textAnchor="middle"
                    fill={selectedFinish.inkColor}
                    opacity="0.75"
                    fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
                    fontSize="10"
                    letterSpacing="0.2em"
                  >
                    EST. 2026 &middot; SUSTAINABLE PACKAGING
                  </text>
                  <line
                    x1="120"
                    y1="272"
                    x2="280"
                    y2="272"
                    stroke={selectedFinish.inkColor}
                    strokeWidth="1"
                    opacity="0.3"
                  />
                  <text
                    x="200"
                    y="290"
                    textAnchor="middle"
                    fill={selectedFinish.inkColor}
                    opacity="0.65"
                    fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
                    fontSize="9"
                    letterSpacing="0.1em"
                  >
                    VSPIAS ECOAUTOMATION &middot; BENGALURU
                  </text>
                </g>
              </svg>
            </div>

            <div className="stage-caption">
              <span>{selectedFinish.colorName}</span>
              <span>Twisted Paper Cord &middot; In-line Creasing</span>
            </div>
          </div>

          {/* Right: Controls & Parameters */}
          <div className="stage-controls-card">
            <div className="control-group">
              <label className="control-label">
                1. Select Paper Finish:
              </label>
              <div className="finish-button-group" role="radiogroup" aria-label="Select paper bag finish">
                {FINISHES.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    role="radio"
                    aria-checked={selectedFinish.id === f.id}
                    className={`finish-toggle-btn ${selectedFinish.id === f.id ? 'active' : ''}`}
                    onClick={() => setSelectedFinish(f)}
                  >
                    <span
                      className="swatch-indicator"
                      style={{
                        backgroundColor: f.swatchHex,
                        border: f.id === 'ivory' ? '1px solid #D9DFD4' : 'none'
                      }}
                      aria-hidden="true"
                    />
                    <span className="finish-name">{f.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="control-group">
              <label htmlFor="bag-brand-input" className="control-label">
                2. Enter Brand Name (Live Stamp Preview):
              </label>
              <div className="input-wrapper">
                <input
                  id="bag-brand-input"
                  type="text"
                  maxLength={28}
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  placeholder="e.g. YOUR BRAND"
                  className="brand-text-input"
                  aria-describedby="brand-input-hint"
                />
                <span className="char-counter" aria-hidden="true">
                  {brandName.length}/28
                </span>
              </div>
              <span id="brand-input-hint" className="input-hint">
                Safely scaled to fit within printable dimensions. Letters and numbers supported.
              </span>
            </div>

            <div className="control-group specs-summary">
              <span className="control-label">3. Specifications to Discuss:</span>
              <div className="specs-mini-table">
                <div className="spec-row">
                  <span className="spec-k">Dimensions</span>
                  <span className="spec-v">260 &times; 120 &times; 350 mm (Width &times; Gusset &times; Height)</span>
                </div>
                <div className="spec-row">
                  <span className="spec-k">Handle Style</span>
                  <span className="spec-v">Twisted paper cord (Natural or matching tint)</span>
                </div>
                <div className="spec-row">
                  <span className="spec-k">Printing</span>
                  <span className="spec-v">In-line 2-colour flexographic printing</span>
                </div>
                <div className="spec-row">
                  <span className="spec-k">Minimum Run</span>
                  <span className="spec-v">Calculated with quotation &middot; Custom sizes available</span>
                </div>
              </div>
            </div>

            <div className="control-actions">
              <Link
                href={enquiryUrl}
                className="button lime"
                id="discuss-custom-bag-btn"
              >
                Discuss Your Bag <span className="arrow">↗</span>
              </Link>
            </div>

            <p className="note" style={{ marginTop: '16px' }}>
              <strong>Visual preference indicator:</strong> This is an interactive design preview for enquiry planning. It is not an automated manufacturing proof, live inventory selector or guarantee of immediate stock. Substrate weights and ink tolerances are confirmed per enquiry.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
