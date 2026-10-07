'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BAG_FILTERS, BAG_COLLECTION_PRODUCTS, BAG_COLLECTION_NOTE, BagProduct } from '@/content/bags';
import BagDetailModal from './BagDetailModal';

export default function BagCollection(): JSX.Element {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedProduct, setSelectedProduct] = useState<BagProduct | null>(null);

  const filteredProducts = BAG_COLLECTION_PRODUCTS.filter((product) => {
    if (activeFilter === 'all') return true;
    return product.category.includes(activeFilter);
  });

  return (
    <section className="section" id="collection-section">
      <span id="collection" style={{ display: 'block', position: 'relative', top: '-110px', visibility: 'hidden' }} />
      <div className="wrap">
        <div className="section-head">
          <div>
            <div className="eyebrow">The paper bag collection</div>
            <h2>
              A bag for<br />every business.
            </h2>
          </div>
          <p>
            Start with how you will use it.<br />
            We will help you discuss the style, size and print that fit your requirements.
          </p>
        </div>

        <div className="filters" role="group" aria-label="Filter product collection">
          {BAG_FILTERS.map((btn) => (
            <button
              key={btn.filter}
              type="button"
              className={`filter ${activeFilter === btn.filter ? 'active' : ''}`}
              data-filter={btn.filter}
              aria-pressed={activeFilter === btn.filter}
              onClick={() => setActiveFilter(btn.filter)}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Live announcer for screen readers */}
        <div className="sr-only" aria-live="polite" role="status">
          Showing {filteredProducts.length} bag style{filteredProducts.length === 1 ? '' : 's'}
        </div>

        <div className="products">
          {filteredProducts.map((product) => (
            <article key={product.id} className="product" data-category={product.category}>
              <div
                className={`product-img ${product.imageClass || ''}`}
                style={{ cursor: 'pointer' }}
                onClick={() => setSelectedProduct(product)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedProduct(product);
                  }
                }}
                aria-label={`View details and specifications for ${product.title}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={product.image}
                  alt={product.alt}
                  className={product.imageClass === 'packaging' ? 'packaging' : undefined}
                />
                <span className="product-tag">{product.tag}</span>
              </div>

              <div className="product-details-bar">
                <button
                  type="button"
                  className="product-heading-btn"
                  onClick={() => setSelectedProduct(product)}
                >
                  <h3>{product.title}</h3>
                  <span className="arrow" aria-hidden="true">↗</span>
                </button>
                <p>{product.description}</p>
                <div className="product-actions-row">
                  <button
                    type="button"
                    className="button secondary mini-btn"
                    onClick={() => setSelectedProduct(product)}
                    aria-label={`Quick view specifications for ${product.title}`}
                  >
                    View Specs &amp; Options
                  </button>
                  <Link
                    href={`/contact?interest=Paper%20bags&requirements=${encodeURIComponent(`I would like to request a quotation for ${product.title}.`)}`}
                    className="text-link mini-link"
                  >
                    Request Quote ↗
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="note">{BAG_COLLECTION_NOTE}</p>
      </div>

      {/* Accessible Detail Dialog */}
      <BagDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </section>
  );
}
