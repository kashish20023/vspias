'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { ProductItem, CatalogData } from '@/lib/catalog-service';
import ProductRangeRail from './ProductRangeRail';
import FullRangeDiscovery from './FullRangeDiscovery';
import ProductDetailModal from './ProductDetailModal';

interface ProductRangeSectionProps {
  pageType: 'paper' | 'automation';
}

export default function ProductRangeSection({
  pageType
}: ProductRangeSectionProps): JSX.Element {
  const [catalog, setCatalog] = useState<CatalogData | null>(null);
  const [isPreview, setIsPreview] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [showFullRange, setShowFullRange] = useState(pageType === 'automation');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const draftPreview = params.get('preview') === 'draft';
    setIsPreview(draftPreview);

    const endpoint = draftPreview ? '/api/admin/preview' : '/api/catalog';
    fetch(endpoint, { cache: 'no-store' })
      .then((res) => {
        if (!res.ok) throw new Error('API fetch failed');
        return res.json();
      })
      .then((data: CatalogData) => {
        setCatalog(data);
      })
      .catch(() => {
        // Fallback to static seed
        fetch('/catalog.seed.json')
          .then((r) => r.json())
          .then((seed: CatalogData) => {
            const visibleProducts = seed.products.filter((p) => p.visible);
            setCatalog({ ...seed, products: visibleProducts });
          })
          .catch((err) => console.error('Error loading fallback catalog', err));
      });
  }, []);

  // Update all brochure download links across the DOM to match published brochure
  useEffect(() => {
    if (catalog?.brochure) {
      const brochurePath = '/' + catalog.brochure.replace(/^\//, '');
      const links = document.querySelectorAll<HTMLAnchorElement>('.brochure-link');
      links.forEach((a) => {
        a.href = brochurePath;
        a.download = 'VSPIAS-Company-Brochure.pdf';
      });
    }
  }, [catalog?.brochure]);

  const handleOpenFullRange = useCallback((division: 'automation' | 'paper') => {
    setShowFullRange(true);
    const targetId = division === 'automation' ? 'automation-catalog' : 'paper-catalog';
    setTimeout(() => {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  }, []);

  if (!catalog) return <div className="range-loading" style={{ minHeight: '120px' }} />;

  const visibleProducts = catalog.products
    .filter((p) => p.visible)
    .sort((a, b) => a.order - b.order || a.name.localeCompare(b.name));

  const automationProducts = visibleProducts.filter((p) => p.division === 'automation');
  const paperProducts = visibleProducts.filter((p) => p.division === 'paper');

  return (
    <>
      {isPreview && (
        <div className="preview-banner">
          Saved draft preview &mdash; these changes are not published yet.{' '}
          <Link href="/admin.html">Return to admin</Link>
        </div>
      )}

      {pageType === 'paper' ? (
        <>
          <section className="range-section" id="ranges" aria-label="Paper packaging range">
            <div className="wrap">
              <div className="eyebrow">Bengaluru Manufacturing &middot; Direct B2B Supply</div>
              <h2>Explore our paper bag range.</h2>
            </div>

            {/* Paper Bag Manufacturing moves RIGHT TO LEFT */}
            <ProductRangeRail
              division="paper"
              title="Paper Bag Manufacturing"
              subtitle="High quality V-Bottom, Square-Bottom and Flexo-Printed paper bags."
              footnote="Illustrative bag and packaging concepts. Custom specifications manufactured to order."
              products={paperProducts}
              onSelectProduct={setSelectedProduct}
              onOpenFullRange={() => handleOpenFullRange('paper')}
            />
          </section>

          {/* Accessible Full Paper Range Discovery */}
          <FullRangeDiscovery
            division="paper"
            title="Complete Paper Bag & Packaging Range"
            products={paperProducts}
            onSelectProduct={setSelectedProduct}
            id="paper-catalog"
          />
        </>
      ) : (
        <>
          <section className="range-section" id="ranges" aria-label="Industrial automation range">
            <div className="wrap">
              <div className="eyebrow">Verified catalogue categories</div>
              <h2>From the company brochure.</h2>
            </div>

            {/* Automation moves LEFT TO RIGHT */}
            <ProductRangeRail
              division="automation"
              title="Industrial Automation & Electricals"
              subtitle="Electrical and automation categories from our company brochure."
              footnote="Catalogue categories shown. Select a product or browse the complete range."
              products={automationProducts}
              onSelectProduct={setSelectedProduct}
              onOpenFullRange={() => handleOpenFullRange('automation')}
            />
          </section>

          {/* Full searchable automation catalog gallery */}
          <FullRangeDiscovery
            division="automation"
            title="Industrial Automation & Electricals Full Catalogue"
            products={automationProducts}
            onSelectProduct={setSelectedProduct}
            id="automation-catalog"
          />
        </>
      )}

      {/* Selected product detail dialog modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </>
  );
}
