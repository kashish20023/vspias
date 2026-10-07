import React from 'react';
import { ASSETS } from '@/content/assets';

const DETAILS = [
  {
    id: 'handles',
    title: 'Reinforced Handle Attachment',
    summary: 'Twisted paper cord and flat folded handles secured with high-tack adhesive patches to the top interior lip of each bag.',
    tag: 'CONSTRUCTION'
  },
  {
    id: 'substrate',
    title: 'Virgin & Recycled Paper Grades',
    summary: 'Selected 70 to 140 GSM kraft substrates offering natural tactile warmth, tensile tear resistance, and uniform surface smoothness.',
    tag: 'SUBSTRATE'
  },
  {
    id: 'gusset-base',
    title: 'Precision Gussets & Block Bottom',
    summary: 'Crisp automated mechanical creasing ensures self-standing balance on retail counters and smooth flat storage when empty.',
    tag: 'STRUCTURE'
  },
  {
    id: 'print-register',
    title: 'In-Line 2-Colour Flexo Register',
    summary: 'Water-based inks transferred directly via photopolymer plates, producing sharp typography, logos, and custom graphics.',
    tag: 'PRINTING'
  }
];

export default function MaterialDetailsSection(): JSX.Element {
  return (
    <section
      className="section material-details-section"
      id="material-details"
      aria-label="Material and Construction Details"
    >
      <div className="wrap">
        <div className="section-head-split">
          <div className="head-copy">
            <div className="eyebrow">TACTILE QUALITY &middot; CRAFTSMANSHIP</div>
            <h2 className="section-title">
              Crafted from the fold up.<br />
              Material &amp; structural detail.
            </h2>
          </div>
          <p className="head-desc">
            Inspect the tactile elements that make VSPIAS paper bags dependable: strong internal handle anchors, durable paper fibers, and sharp mechanical creasing.
          </p>
        </div>

        <div className="material-details-grid">
          {/* Main Large Visual Stage */}
          <div className="material-primary-card">
            <div className="primary-media-wrapper">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={ASSETS.bagArtwork}
                alt="Close-up photograph showing paper texture, twisted paper handle attachments and crisp side gussets"
                className="material-macro-img"
                width={700}
                height={480}
              />
              <div className="media-overlay-badge">
                <span>Natural Paper Texture &amp; Formed Handles</span>
              </div>
            </div>
            <div className="primary-caption">
              <h3>Precision Assembly at Volume</h3>
              <p>
                Every bag is produced on automated reel-fed machinery that continuously feeds paper webs, applies precision glue lines, bonds handle patches, and folds structural gussets without manual handling inconsistencies.
              </p>
            </div>
          </div>

          {/* Supporting 3 Tactical Detail Cards */}
          <div className="material-secondary-stack">
            {DETAILS.map((item, idx) => (
              <div key={item.id} className="detail-feature-card">
                <div className="feature-card-header">
                  <span className="feature-idx">0{idx + 1}</span>
                  <span className="feature-tag">{item.tag}</span>
                </div>
                <h4 className="feature-title">{item.title}</h4>
                <p className="feature-summary">{item.summary}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
