'use client';

import React, { useState } from 'react';

interface SubstrateOption {
  id: string;
  name: string;
  color: string;
  minGsm: number;
  maxGsm: number;
  defaultGsm: number;
  description: string;
  applications: string;
}

const SUBSTRATES: SubstrateOption[] = [
  {
    id: 'brown-kraft',
    name: 'Brown kraft',
    color: '#B0885A',
    minGsm: 70,
    maxGsm: 140,
    defaultGsm: 100,
    description: 'Natural unbleached virgin and recycled kraft fibers with high tensile tear resistance.',
    applications: 'Takeaway food, cloud kitchens, retail apparel and grocery packing.'
  },
  {
    id: 'white-kraft',
    name: 'White / ivory kraft',
    color: '#F1ECDC',
    minGsm: 80,
    maxGsm: 120,
    defaultGsm: 100,
    description: 'Bleached food-contact compliant paper offering an exceptionally clean, high-contrast print surface.',
    applications: 'Boutique fashion, cosmetics, gifting, and gourmet patisserie counters.'
  },
  {
    id: 'ribbed-kraft',
    name: 'Ribbed kraft',
    color: '#9B7A52',
    minGsm: 90,
    maxGsm: 130,
    defaultGsm: 110,
    description: 'Machine-glazed vergé ribbing pattern providing tactile texture and structural rigidity.',
    applications: 'Wine & beverage carry, lifestyle boutiques, and premium unboxing.'
  },
  {
    id: 'recycled-kraft',
    name: 'Recycled kraft',
    color: '#A9B69C',
    minGsm: 80,
    maxGsm: 140,
    defaultGsm: 105,
    description: '100% post-consumer recycled paper engineered for circular economy packaging.',
    applications: 'Eco-conscious retail, organic produce, and general commercial carry.'
  }
];

export default function V3MaterialsExplorer(): JSX.Element {
  const [selectedSubstrate, setSelectedSubstrate] = useState<SubstrateOption>(SUBSTRATES[0]);
  const [gsm, setGsm] = useState<number>(SUBSTRATES[0].defaultGsm);

  const handleSelectSubstrate = (sub: SubstrateOption) => {
    setSelectedSubstrate(sub);
    setGsm(Math.min(Math.max(gsm, sub.minGsm), sub.maxGsm));
  };

  const min = selectedSubstrate.minGsm;
  const max = selectedSubstrate.maxGsm;
  const mid = Math.round((min + max) / 2);
  const percentage = Math.round(((gsm - min) / (max - min)) * 100);

  // Verified tier guidance
  const tierInfo =
    gsm <= 85
      ? { title: 'Lightweight Carry', use: 'Counters, bakery satchels, pharmacy dispensing (up to 2–3 kg).' }
      : gsm <= 110
        ? { title: 'Standard Commercial Carry', use: 'Everyday retail, food delivery containers, apparel (up to 5–6 kg).' }
        : gsm <= 125
          ? { title: 'Heavy-Duty Commercial Carry', use: 'Supermarket checkout, books, boxed items (up to 7–8 kg).' }
          : { title: 'Industrial Heavy-Duty Carry', use: 'Bulk grocery, beverage bottles, dense products (up to 10 kg with reinforced handles).' };

  return (
    <section className="pb-section" id="materials" aria-label="Substrate and Finishing Specifications">
      {/* Anchor alias to support existing #material-details deep links */}
      <div id="material-details" style={{ position: 'relative', top: '-96px' }} />

      <div className="pb-wrap">
        <div className="pb-eyebrow">Substrate &amp; Finishing</div>
        <h2 className="pb-h2">Choose the strength, not just the colour.</h2>
        <p className="pb-sub">
          Slide through the GSM spectrum to review paper weight specifications. Final grammage is confirmed against your specific dimensional capacity and drop-test requirements.
        </p>

        <div className="pb-gsm-grid">
          {/* Left Card: Substrate Selection & GSM Slider */}
          <div className="pb-card">
            <div className="pb-chips-row" role="tablist" aria-label="Paper Substrate selection">
              {SUBSTRATES.map((sub) => {
                const isSelected = sub.id === selectedSubstrate.id;
                return (
                  <button
                    key={sub.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    className={`pb-chip-btn ${isSelected ? 'on' : ''}`}
                    onClick={() => handleSelectSubstrate(sub)}
                  >
                    <i style={{ background: sub.color }} aria-hidden="true" />
                    <span>{sub.name}</span>
                    <span className="sub-range">({sub.minGsm}&ndash;{sub.maxGsm})</span>
                  </button>
                );
              })}
            </div>

            <div className="pb-dial">
              <div className="pb-dial-big">
                <span>{gsm}</span>
                <small>GSM</small>
              </div>
              <div>
                <div className="pb-dial-tier">{tierInfo.title}</div>
                <div className="pb-dial-use">{tierInfo.use}</div>
              </div>
            </div>

            <input
              type="range"
              className="pb-gs-slider"
              min={min}
              max={max}
              step={5}
              value={gsm}
              aria-label={`Paper weight in GSM for ${selectedSubstrate.name}`}
              onChange={(e) => setGsm(Number(e.target.value))}
            />

            <div className="pb-ticks">
              <span>{min} GSM &middot; Minimum</span>
              <span>{mid} GSM &middot; Standard</span>
              <span>{max} GSM &middot; Maximum</span>
            </div>

            <div className="pb-paper-stack">
              <div className="pb-layer">
                <small>Substrate weight representation</small>
                <div
                  className="pb-sheet-vis"
                  style={{
                    height: `${6 + (percentage / 100) * 18}px`,
                    background: selectedSubstrate.color
                  }}
                />
              </div>
              <div className="pb-layer">
                <small>Relative tensile gauge</small>
                <div className="pb-meter">
                  <i style={{ width: `${Math.max(15, percentage)}%` }} />
                </div>
              </div>
            </div>
          </div>

          {/* Right Card: Handles & Flexo Printing Options */}
          <div className="pb-card">
            <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--pb-ink)', margin: '0 0 18px 0' }}>
              Handles &amp; Flexo Inks
            </h3>

            <div className="pb-hand-stack">
              <div className="pb-hd-item">
                <svg width="42" height="42" viewBox="0 0 46 46" fill="none" stroke="#B89160" strokeWidth="3.5" strokeLinecap="round" aria-hidden="true">
                  <path d="M10 38V24a13 13 0 0 1 26 0v14" />
                </svg>
                <div>
                  <b>Twisted paper cord</b>
                  <small>High-tensile paper cord with inside reinforced glue patch.</small>
                </div>
              </div>

              <div className="pb-hd-item">
                <svg width="42" height="42" viewBox="0 0 46 46" fill="none" stroke="#B89160" strokeWidth="7" aria-hidden="true">
                  <path d="M13 38V20h20v18" />
                </svg>
                <div>
                  <b>Flat-fold handle</b>
                  <small>Wide flat paper ribbon offering relaxed grip comfort for retail packaging.</small>
                </div>
              </div>

              <div className="pb-hd-item">
                <svg width="42" height="42" viewBox="0 0 46 46" fill="none" stroke="#B89160" strokeWidth="3" aria-hidden="true">
                  <rect x="9" y="12" width="28" height="26" rx="2" />
                  <path d="M9 20h28" opacity="0.45" />
                </svg>
                <div>
                  <b>Handle-free block bottom</b>
                  <small>Self-opening satchel (SOS) and pinch-bottom formats for counters.</small>
                </div>
              </div>
            </div>

            <div className="pb-ink-box">
              <i>
                <s style={{ background: '#183D2D' }} />
                <s style={{ background: '#C4460F' }} />
              </i>
              <span>1 or 2-colour in-line flexographic printing with food-safe water-based inks.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
