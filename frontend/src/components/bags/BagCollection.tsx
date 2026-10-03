'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BAG_FILTERS, BAG_COLLECTION_PRODUCTS, BAG_COLLECTION_NOTE } from '@/content/bags';

export default function BagCollection(): JSX.Element {
  const [activeFilter, setActiveFilter] = useState<string>('all');

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

        <div className="filters" aria-label="Filter product concepts">
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

        <div className="products">
          {filteredProducts.map((product) => (
            <article key={product.id} className="product" data-category={product.category}>
              <Link
                href={`/paper-bags/${product.slug}`}
                className={`product-img ${product.imageClass || ''}`}
                style={{ display: 'block' }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={product.image}
                  alt={product.alt}
                  className={product.imageClass === 'packaging' ? 'packaging' : undefined}
                />
                <span className="product-tag">{product.tag}</span>
              </Link>
              <Link href={`/paper-bags/${product.slug}`} className="product-heading">
                {product.title} <span>↗</span>
              </Link>
              <p>{product.description}</p>
            </article>
          ))}
        </div>

        <p className="note">{BAG_COLLECTION_NOTE}</p>
      </div>
    </section>
  );
}
