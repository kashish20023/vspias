'use client';

import React, { useState } from 'react';

interface MaterialInfo {
  label: string;
  min: number;
  max: number;
  defaultVal: number;
  swatch: string;
}

const MATERIAL_DATA: Record<string, MaterialInfo> = {
  brown: { label: 'Brown kraft', min: 70, max: 140, defaultVal: 100, swatch: '#b0885a' },
  white: { label: 'White kraft', min: 80, max: 120, defaultVal: 100, swatch: '#f1ecdc' },
  ribbed: { label: 'Ribbed kraft', min: 90, max: 130, defaultVal: 110, swatch: '#9b7a52' },
  recycled: { label: 'Recycled kraft', min: 80, max: 140, defaultVal: 120, swatch: '#b7a98c' }
};

export default function PremiumMaterialsSection() {
  const [selectedMaterial, setSelectedMaterial] = useState<string>('brown');
  const matInfo = MATERIAL_DATA[selectedMaterial];
  const [weight, setWeight] = useState<number>(matInfo.defaultVal);

  const handleSelectMaterial = (key: string) => {
    setSelectedMaterial(key);
    const newInfo = MATERIAL_DATA[key];
    setWeight(prev => Math.min(newInfo.max, Math.max(newInfo.min, prev)));
  };

  const midWeight = Math.round((matInfo.min + matInfo.max) / 2);

  return (
    <section className="section" id="materials" aria-labelledby="materialTitle">
      <div className="wrap">
        <div className="section-head reveal">
          <div>
            <div className="eyebrow">The feel of good packaging</div>
            <h2 className="section-title" id="materialTitle">
              Good design starts<br />with the material.
            </h2>
          </div>
          <p>
            Explore paper weights, handle styles and print possibilities.
            We’ll help refine the specification around your product.
          </p>
        </div>

        <div className="materials-grid">
          <div className="material-main reveal">
            <div className="material-photo">
              <img
                id="materialDetailImage"
                src="/assets/premium/material-kraft-texture.webp"
                width={1536}
                height={1024}
                loading="lazy"
                alt="Illustrative close-up of natural kraft paper texture and a twisted paper handle"
              />
              <span>The tactile details</span>
              <button
                className="photo-inspect"
                type="button"
                data-inspect-photo="materialDetailImage"
                data-viewer-title="The tactile details."
                aria-haspopup="dialog"
              >
                <svg className="icon" aria-hidden="true" viewBox="0 0 24 24">
                  <circle cx="10.5" cy="10.5" r="6.5" />
                  <path d="m15.5 15.5 5 5M10.5 7v7M7 10.5h7" />
                </svg>
                Explore texture
              </button>
            </div>

            <div className="material-main-content">
              <div className="material-options" id="materialOptions" aria-label="Paper material">
                {Object.entries(MATERIAL_DATA).map(([key, info]) => (
                  <button
                    key={key}
                    type="button"
                    data-material={key}
                    aria-pressed={selectedMaterial === key}
                    onClick={() => handleSelectMaterial(key)}
                  >
                    <i style={{ ['--swatch' as string]: info.swatch }} />
                    {info.label}
                  </button>
                ))}
              </div>

              <div className="material-readout">
                <div className="weight">
                  <output id="weightValue" htmlFor="weightSlider">{weight}</output>
                  <span className="unit">GSM</span>
                </div>
                <div className="weight-label" id="weightLabel">
                  {matInfo.label}
                  <span>Paper-weight concept</span>
                </div>
              </div>

              <input
                className="material-slider"
                id="weightSlider"
                type="range"
                min={matInfo.min}
                max={matInfo.max}
                step={5}
                value={weight}
                onChange={e => setWeight(Number(e.target.value))}
                aria-label="Indicative paper weight in grams per square metre"
                aria-valuetext={`${weight} grams per square metre; ${matInfo.label}; illustrative selection`}
              />

              <div className="material-ticks" aria-hidden="true">
                <span id="weightMin">{matInfo.min} GSM</span>
                <span id="weightMid">{midWeight} GSM</span>
                <span id="weightMax">{matInfo.max} GSM</span>
              </div>

              <div className="material-summary">
                <svg className="icon" aria-hidden="true"><use href="#i-info" /></svg>
                <span>Illustrative selection. Availability and suitability are confirmed with your quote.</span>
              </div>
            </div>
          </div>

          <div className="materials-aside reveal">
            <div className="handle-card">
              <div className="eyebrow" style={{ marginBottom: '12px' }}>Small choices. A different feel.</div>
              <h3>A handle on the details.</h3>

              <div className="handle-line">
                <svg className="handle-art" viewBox="0 0 48 48" fill="none" aria-hidden="true">
                  <path d="M10 40V23a14 14 0 0 1 28 0v17" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" />
                  <path d="m11 20 4 3m-4 4 4 3m-3 4 4 3m20-17-4 3m4 4-4 3m4 4-4 3" stroke="#e9dbbb" strokeWidth="1" />
                </svg>
                <div>
                  <b>Twisted paper cord</b>
                  <span>A familiar finish for retail and gifting.</span>
                </div>
              </div>

              <div className="handle-line">
                <svg className="handle-art" viewBox="0 0 48 48" fill="none" aria-hidden="true">
                  <path d="M13 40V16h22v24" stroke="currentColor" strokeWidth="8" />
                  <path d="M13 40V16h22v24" stroke="#c1a16d" strokeWidth="3" />
                </svg>
                <div>
                  <b>Flat-fold handle</b>
                  <span>A neat profile for everyday packaging.</span>
                </div>
              </div>

              <div className="handle-line">
                <svg className="handle-art" viewBox="0 0 48 48" fill="none" aria-hidden="true">
                  <path d="M10 11h28v29H10z" fill="#c6a06b" stroke="currentColor" />
                  <path d="M10 17h28M10 34l14-6 14 6M24 28v12" stroke="currentColor" />
                </svg>
                <div>
                  <b>Handle-free format</b>
                  <span>Clean, compact counter presentation.</span>
                </div>
              </div>
            </div>

            <div className="print-card">
              <div>
                <h3>A place for your signature.</h3>
                <p>Explore brand artwork in the 3D Studio.</p>
              </div>
              <a href="#studio" className="ink-dots" aria-label="Explore print colours in the Studio">
                <i style={{ background: '#d5ed86' }} />
                <i style={{ background: '#b89160' }} />
                <i style={{ background: '#f5f5ef' }} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
