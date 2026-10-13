'use client';

import React, { useState, useMemo } from 'react';
import { ProductItem } from '@/lib/catalog-service';

interface FullRangeDiscoveryProps {
  division: 'automation' | 'paper';
  title?: string;
  products: ProductItem[];
  onSelectProduct: (product: ProductItem) => void;
  id?: string;
}

export default function FullRangeDiscovery({
  division,
  title,
  products,
  onSelectProduct,
  id
}: FullRangeDiscoveryProps): JSX.Element {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');

  const divisionProducts = useMemo(
    () => products.filter((p) => p.division === division),
    [products, division]
  );

  const categories = useMemo(() => {
    return Array.from(new Set(divisionProducts.map((p) => p.category))).sort();
  }, [divisionProducts]);

  const brands = useMemo(() => {
    return Array.from(new Set(divisionProducts.map((p) => p.brand))).sort();
  }, [divisionProducts]);

  const filteredProducts = useMemo(() => {
    const q = query.trim().toLowerCase();
    return divisionProducts.filter((p) => {
      if (selectedCategory && p.category !== selectedCategory) return false;
      if (selectedBrand && p.brand !== selectedBrand) return false;
      if (!q) return true;
      const haystack = [p.name, p.brand, p.category, p.description].join(' ').toLowerCase();
      return haystack.includes(q);
    });
  }, [divisionProducts, query, selectedCategory, selectedBrand]);

  return (
    <section className="catalog-section wrap" id={id}>
      {title && (
        <div className="section-head">
          <div>
            <div className="eyebrow">
              {division === 'automation' ? 'TECHNICAL SPECIFICATIONS & SOURCING' : 'EXPLORE STYLES & FINISHES'}
            </div>
            <h2>{title}</h2>
          </div>
          <p>
            {division === 'automation'
              ? 'Filter by equipment family, manufacturer brand, or industrial category to review catalogue references.'
              : 'Browse our full paper packaging styles. Dimensions, paper GSM and flexo printing options confirmed per quotation.'}
          </p>
        </div>
      )}

      <div className="catalog-tools">
        <label>
          Search the range
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products, brands or applications"
            aria-label="Search catalogue"
          />
        </label>

        <label>
          Category
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            aria-label="Filter by category"
          >
            <Option value="">All categories</Option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>

        <label>
          Brand
          <select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            aria-label="Filter by brand"
          >
            <Option value="">All brands</Option>
            {brands.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </label>
      </div>

      <p className="catalog-status" role="status" aria-live="polite">
        {filteredProducts.length} of {divisionProducts.length} catalogue groups
      </p>

      <div className="catalog-grid">
        {filteredProducts.map((p) => (
          <article
            key={p.id}
            className="catalog-card"
            data-division={division}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={'/' + p.image.replace(/^\//, '')}
              alt={p.alt}
              loading="lazy"
              decoding="async"
            />
            <p className="catalog-brand">{p.brand}</p>
            <h3>{p.name}</h3>
            <p>
              {p.illustrative
                ? 'Illustrative style concept. Discuss sizes, materials and printing.'
                : `${p.category} · Catalogue page ${p.sourcePage || 'N/A'}`}
            </p>
            <button
              type="button"
              onClick={() => onSelectProduct(p)}
              aria-label={`View details and enquire about ${p.name}`}
            >
              View Product &amp; Enquire &rarr;
            </button>
          </article>
        ))}

        {filteredProducts.length === 0 && (
          <div className="catalog-empty">
            No matching products. Try another term or clear the filters.
          </div>
        )}
      </div>
    </section>
  );
}

function Option({ value, children }: { value: string; children: React.ReactNode }) {
  return <option value={value}>{children}</option>;
}
