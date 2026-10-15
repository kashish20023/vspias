'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { ProductItem, CatalogData } from '@/lib/catalog-service';
import ProductRangeRail from '@/components/catalog/ProductRangeRail';
import ProductDetailModal from '@/components/catalog/ProductDetailModal';
import seedCatalog from '../../../public/catalog.seed.json';

export default function HomeProductRails(): JSX.Element {
  const router = useRouter();
  const [catalog, setCatalog] = useState<CatalogData>(seedCatalog as CatalogData);
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const draftPreview = params.get('preview') === 'draft';

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
        // Fallback already loaded
      });
  }, []);

  const handleOpenFullRange = useCallback(
    (division: 'automation' | 'paper') => {
      const target = division === 'automation' ? '/automation#automation-catalog' : '/paper-bags#paper-catalog';
      router.push(target);
    },
    [router]
  );

  const visibleProducts = (catalog?.products || [])
    .filter((p) => p.visible)
    .sort((a, b) => a.order - b.order || a.name.localeCompare(b.name));

  const automationProducts = visibleProducts.filter((p) => p.division === 'automation');
  const paperProducts = visibleProducts.filter((p) => p.division === 'paper');

  return (
    <div className="home-product-rails-container" id="home-product-rails">
      {/* Block H2: Industrial Automation & Electricals (Left to Right motion) */}
      <section className="range-section automation-rail-section" id="automation-rail" aria-label="Industrial automation range">
        <ProductRangeRail
          division="automation"
          title="Industrial Automation & Electricals"
          products={automationProducts}
          onSelectProduct={setSelectedProduct}
          onOpenFullRange={() => handleOpenFullRange('automation')}
          headingTag="h2"
        />
      </section>

      {/* Block H3: Paper Bag Manufacturing (Right to Left motion) */}
      <section className="range-section paper-rail-section" id="paper-rail" aria-label="Paper bag manufacturing range">
        <ProductRangeRail
          division="paper"
          title="Paper Bag Manufacturing"
          products={paperProducts}
          onSelectProduct={setSelectedProduct}
          onOpenFullRange={() => handleOpenFullRange('paper')}
          headingTag="h2"
        />
      </section>

      {/* Selected product detail modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}
