'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  AUTOMATION_PRODUCTS,
  AUTOMATION_IMAGES,
  AutomationProduct,
} from './data';

interface AutomationCatalogSectionProps {
  onOpenProduct: (product: AutomationProduct) => void;
  externalCategory?: string;
}

const CATEGORY_GROUPS = [
  { id: '', name: 'All products' },
  { id: 'control', name: 'Control & HMI' },
  { id: 'drives', name: 'Drives' },
  { id: 'protection', name: 'Protection' },
  { id: 'panels', name: 'Panels & software' },
  { id: 'metering', name: 'Controls & metering' },
];

const BRANDS = [
  'Schneider Electric',
  'ABB',
  'Siemens',
  'Larsen & Toubro',
  'Multi-brand',
];

export function AutomationCatalogSection({
  onOpenProduct,
  externalCategory,
}: AutomationCatalogSectionProps) {
  const [selectedGroup, setSelectedGroup] = useState<string>('');
  const [selectedBrands, setSelectedBrands] = useState<Set<string>>(new Set());
  const [query, setQuery] = useState('');
  const [limit, setLimit] = useState(9);
  const [isBrandMenuOpen, setIsBrandMenuOpen] = useState(false);

  const brandMenuRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Sync external category if selected from hero or rail
  useEffect(() => {
    if (externalCategory !== undefined) {
      setSelectedGroup(externalCategory || '');
      setLimit(9);
    }
  }, [externalCategory]);

  // Handle click outside brand menu
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        brandMenuRef.current &&
        !brandMenuRef.current.contains(e.target as Node)
      ) {
        setIsBrandMenuOpen(false);
      }
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && isBrandMenuOpen) {
        setIsBrandMenuOpen(false);
      }
    }
    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isBrandMenuOpen]);

  // Filtering products
  const matchingProducts = useMemo(() => {
    const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
    return AUTOMATION_PRODUCTS.filter((p) => {
      // Group check (single-select mutual exclusion)
      if (selectedGroup && p.group !== selectedGroup) {
        return false;
      }
      // Brand check
      if (selectedBrands.size > 0 && !selectedBrands.has(p.brand)) {
        return false;
      }
      // Query check across name, brand, category, description, and brochure series
      if (terms.length > 0) {
        const seriesText = p.series ? p.series.join(' ') : '';
        const haystack = `${p.name} ${p.brand} ${p.category} ${p.description} ${seriesText}`.toLowerCase();
        const matchesAll = terms.every((term) => haystack.includes(term));
        if (!matchesAll) return false;
      }
      return true;
    });
  }, [selectedGroup, selectedBrands, query]);

  const visibleProducts = useMemo(() => {
    return matchingProducts.slice(0, limit);
  }, [matchingProducts, limit]);

  const handleCategoryToggle = (groupId: string) => {
    // Mutually exclusive: selecting a category deselects any previously selected one
    if (!groupId || selectedGroup === groupId) {
      setSelectedGroup('');
    } else {
      setSelectedGroup(groupId);
    }
    setLimit(9);
  };

  const handleBrandToggle = (brand: string) => {
    const next = new Set(selectedBrands);
    if (next.has(brand)) {
      next.delete(brand);
    } else {
      next.add(brand);
    }
    setSelectedBrands(next);
    setLimit(9);
  };

  const handleResetFilters = () => {
    setSelectedGroup('');
    setSelectedBrands(new Set());
    setQuery('');
    setLimit(9);
    searchInputRef.current?.focus();
  };

  const hasActiveFilters =
    Boolean(selectedGroup) || selectedBrands.size > 0 || query.trim() !== '';

  const brandFilterLabel =
    selectedBrands.size === 0
      ? 'All brands'
      : `${selectedBrands.size} brand${selectedBrands.size > 1 ? 's' : ''} selected`;

  return (
    <section
      className="section catalog"
      id="automation-catalog"
      aria-labelledby="catalogTitle"
    >
      <div className="wrap">
        <div className="section-head reveal">
          <div>
            <p className="eyebrow">The product portfolio</p>
            <h2 id="catalogTitle">
              Products for every
              <br />
              part of your system.
            </h2>
          </div>
          <p>Explore drives, controllers, switchgear and industrial panels.</p>
        </div>

        <div className="catalog-tools">
          <div
            className="category-filters"
            id="categoryFilters"
            role="group"
            aria-label="Filter by product category"
          >
            {CATEGORY_GROUPS.map((g) => {
              const isPressed = g.id
                ? selectedGroup === g.id
                : !selectedGroup;
              return (
                <button
                  key={g.id}
                  className="chip"
                  type="button"
                  data-category={g.id}
                  aria-pressed={isPressed}
                  onClick={() => handleCategoryToggle(g.id)}
                >
                  {g.name}
                </button>
              );
            })}
          </div>

          <label className="search-box">
            <svg className="icon" aria-hidden="true">
              <use href="#i-search" />
            </svg>
            <input
              id="catalogSearch"
              ref={searchInputRef}
              type="search"
              placeholder="Search products or brands"
              aria-label="Search products or brands"
              autoComplete="off"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setLimit(9);
              }}
            />
          </label>
        </div>

        <div className="catalog-meta">
          <span id="catalogCount" role="status" aria-live="polite">
            Showing {visibleProducts.length} of {matchingProducts.length} products
          </span>

          <div className="brand-filter" ref={brandMenuRef}>
            <button
              type="button"
              className="brand-filter-toggle"
              id="brandFilterToggle"
              aria-expanded={isBrandMenuOpen}
              aria-controls="brandMenu"
              onClick={() => setIsBrandMenuOpen((prev) => !prev)}
            >
              <span>{brandFilterLabel}</span>
              <svg className="icon" aria-hidden="true">
                <use href="#i-down" />
              </svg>
            </button>

            <div className="brand-menu" id="brandMenu" hidden={!isBrandMenuOpen}>
              <p>Filter by brand</p>
              {BRANDS.map((b) => (
                <label key={b}>
                  <input
                    type="checkbox"
                    value={b}
                    checked={selectedBrands.has(b)}
                    onChange={() => handleBrandToggle(b)}
                  />
                  {b}
                </label>
              ))}
            </div>
          </div>

          <button
            id="resetFilters"
            className="catalog-reset"
            type="button"
            hidden={!hasActiveFilters}
            onClick={handleResetFilters}
          >
            Clear filters
          </button>
        </div>

        <div className="catalog-grid" id="catalogGrid">
          {visibleProducts.length > 0 ? (
            visibleProducts.map((p) => {
              const imgSrc = AUTOMATION_IMAGES[p.id] || `/assets/automation/${p.id}.png`;
              return (
                <article
                  key={p.id}
                  className="product-card"
                  data-product-card={p.id}
                  tabIndex={0}
                  role="button"
                  onClick={() => onOpenProduct(p)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onOpenProduct(p);
                    }
                  }}
                >
                  <div className="product-media">
                    <span className="product-ref">
                      Product family / {String(p.order + 1).padStart(2, '0')}
                    </span>
                    <img
                      src={imgSrc}
                      alt={p.alt}
                      loading="lazy"
                      width={280}
                      height={150}
                    />
                  </div>
                  <div className="product-content">
                    <span className="brand-label">{p.brand}</span>
                    <h3>{p.name}</h3>
                    <div className="product-bottom">
                      <span>{p.category}</span>
                      <button
                        type="button"
                        data-product={p.id}
                        aria-label={`View ${p.brand} ${p.name}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenProduct(p);
                        }}
                      >
                        <svg className="icon" aria-hidden="true">
                          <use href="#i-ne" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </article>
              );
            })
          ) : (
            <div className="empty-catalog">
              <h3>No matching products.</h3>
              <p>
                Try another search, or clear your filters to explore the full
                portfolio.
              </p>
            </div>
          )}
        </div>

        <div className="catalog-foot">
          <p>
            Choose a product to view its applications and discuss your requirement.
          </p>
          <button
            className="btn btn-line load-more"
            id="loadMore"
            type="button"
            hidden={visibleProducts.length >= matchingProducts.length}
            onClick={() => setLimit((prev) => prev + 9)}
          >
            Explore more products (
            {matchingProducts.length - visibleProducts.length} remaining)
            <svg className="icon" aria-hidden="true">
              <use href="#i-arrow" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
