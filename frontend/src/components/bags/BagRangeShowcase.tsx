'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  BAG_COLLECTION_PRODUCTS,
  BAG_FILTERS,
  BagProduct,
  BAG_COLLECTION_NOTE
} from '@/content/bags';
import BagDetailModal from './BagDetailModal';

export default function BagRangeShowcase(): JSX.Element {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedProductId, setSelectedProductId] = useState<string>(
    BAG_COLLECTION_PRODUCTS[0].id
  );
  const [modalProduct, setModalProduct] = useState<BagProduct | null>(null);

  const filteredProducts =
    activeFilter === 'all'
      ? BAG_COLLECTION_PRODUCTS
      : BAG_COLLECTION_PRODUCTS.filter((p) => p.category.includes(activeFilter));

  const activeProduct =
    BAG_COLLECTION_PRODUCTS.find((p) => p.id === selectedProductId) ||
    filteredProducts[0] ||
    BAG_COLLECTION_PRODUCTS[0];

  const enquiryUrl = `/contact?interest=Paper%20bags&requirements=${encodeURIComponent(
    `Enquiry regarding ${activeProduct.title}. Typical use: ${activeProduct.typicalUse || activeProduct.description}. Please provide quotation for dimensions and print options.`
  )}`;

  return (
    <section
      className="section bag-range-showcase"
      id="bag-range"
      aria-label="Interactive Paper Bag Range Showcase"
    >
      <div className="wrap">
        {/* Section Header */}
        <div className="section-head-split">
          <div className="head-copy">
            <div className="eyebrow">PORTFOLIO &middot; BENGALURU</div>
            <h2 className="section-title">
              Engineered for your brand.<br />
              The paper bag range.
            </h2>
          </div>
          <p className="head-desc">
            Select a format below to inspect paper substrates, structural gussets, handle options, and custom in-line flexographic printing parameters.
          </p>
        </div>

        {/* Filter Pills */}
        <div
          className="collection-filters"
          role="group"
          aria-label="Filter bags by category"
        >
          {BAG_FILTERS.map((f) => (
            <button
              key={f.filter}
              type="button"
              className={`filter-pill ${activeFilter === f.filter ? 'active' : ''}`}
              onClick={() => {
                setActiveFilter(f.filter);
                const firstMatching =
                  f.filter === 'all'
                    ? BAG_COLLECTION_PRODUCTS[0]
                    : BAG_COLLECTION_PRODUCTS.find((p) =>
                        p.category.includes(f.filter)
                      );
                if (firstMatching) setSelectedProductId(firstMatching.id);
              }}
              aria-pressed={activeFilter === f.filter}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Interactive Showcase: Two-Column Product Explorer (Echoing Watch Reference) */}
        <div className="showcase-explorer-card">
          {/* Top/Mobile Selector Controls */}
          <div
            className="showcase-product-tabs"
            role="tablist"
            aria-label="Select bag type"
          >
            {filteredProducts.map((p) => {
              const isSelected = p.id === activeProduct.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  aria-controls={`showcase-panel-${p.id}`}
                  id={`tab-${p.id}`}
                  className={`showcase-tab-btn ${isSelected ? 'active' : ''}`}
                  onClick={() => setSelectedProductId(p.id)}
                >
                  <span className="tab-tag">{p.tag}</span>
                  <span className="tab-title">{p.title}</span>
                  {p.availableFinishes && (
                    <span className="tab-finish-badge">
                      {p.availableFinishes[0]}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Main Showcase Stage */}
          <div
            className="showcase-stage-grid"
            id={`showcase-panel-${activeProduct.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${activeProduct.id}`}
          >
            {/* Left: Active Bag Product Visual */}
            <div className="showcase-visual-col">
              <div className="showcase-image-stage">
                <div className="stage-top-labels">
                  <span className="category-badge">{activeProduct.tag}</span>
                  {activeProduct.availableFinishes && (
                    <span className="finish-list-pill">
                      Finishes: {activeProduct.availableFinishes.join(' · ')}
                    </span>
                  )}
                </div>

                <div className="stage-img-wrap">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    key={activeProduct.id}
                    src={activeProduct.image}
                    alt={activeProduct.alt}
                    className={`showcase-active-img ${activeProduct.imageClass || ''}`}
                    width={560}
                    height={480}
                  />
                </div>

                <div className="stage-bottom-bar">
                  <span className="stage-spec-hint">
                    {activeProduct.dimensions || 'Customizable to required mm dimensions'}
                  </span>
                  <button
                    type="button"
                    className="quick-view-trigger"
                    onClick={() => setModalProduct(activeProduct)}
                    aria-label={`Open detailed specifications for ${activeProduct.title}`}
                  >
                    Quick View Specs ↗
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Specifications & Enquiry Panel */}
            <div className="showcase-info-col">
              <div className="info-header">
                <div className="eyebrow">{activeProduct.tag}</div>
                <h3 className="product-showcase-title">{activeProduct.title}</h3>
                <p className="product-use-statement">
                  {activeProduct.typicalUse || activeProduct.description}
                </p>
              </div>

              <div className="specs-table-container">
                <h4 className="specs-heading">Technical Specifications</h4>
                <dl className="specs-dl">
                  <div className="spec-row">
                    <dt>Standard Dimensions</dt>
                    <dd>{activeProduct.dimensions || 'Tailored to customer packaging requirements'}</dd>
                  </div>
                  <div className="spec-row">
                    <dt>Paper Substrate</dt>
                    <dd>{activeProduct.gsmRange || '80 – 140 GSM virgin / recycled kraft'}</dd>
                  </div>
                  <div className="spec-row">
                    <dt>Handle Construction</dt>
                    <dd>{activeProduct.handleType || 'Twisted paper cord or flat folded handle'}</dd>
                  </div>
                  <div className="spec-row">
                    <dt>In-Line Flexo Print</dt>
                    <dd>{activeProduct.printCapabilities || '1 or 2-colour precision flexographic printing'}</dd>
                  </div>
                  <div className="spec-row">
                    <dt>Production &amp; Supply</dt>
                    <dd>{activeProduct.moqContext || 'Manufactured per batch in Bengaluru'}</dd>
                  </div>
                </dl>
              </div>

              <div className="showcase-actions">
                <Link
                  href={enquiryUrl}
                  className="button primary-cta"
                  id="showcase-enquire-btn"
                >
                  Enquire About This Bag <span className="arrow" aria-hidden="true">↗</span>
                </Link>
                <button
                  type="button"
                  className="button secondary-cta"
                  onClick={() => setModalProduct(activeProduct)}
                  id="showcase-modal-btn"
                >
                  View Full Specifications
                </button>
                <Link
                  href={`/paper-bags/${activeProduct.slug}`}
                  className="text-link dedicated-page-link"
                >
                  Dedicated Page ↗
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Verified Catalog Note */}
        <p className="catalog-disclaimer-note">
          <span className="info-icon" aria-hidden="true">ℹ</span>
          <span>{BAG_COLLECTION_NOTE}</span>
        </p>

        {/* Accessible Quick View Modal Dialog */}
        <BagDetailModal
          product={modalProduct}
          onClose={() => setModalProduct(null)}
        />
      </div>
    </section>
  );
}
