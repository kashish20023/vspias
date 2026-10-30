import React from 'react';
import { PARTNER_BRANDS, PartnerBrand } from '@/content/industrial';

export function AutomationBrandsBand() {
  return (
    <section className="brands" id="brands-section" aria-label="Electrical & automation brands">
      <div className="wrap brand-grid">
        <div className="brand-note">
          <strong>Electrical &amp; automation brands</strong>
        </div>
        <div
          className="brand-tiles"
          aria-label="Schneider Electric, ABB, SIEMENS, and Larsen & Toubro"
        >
          {PARTNER_BRANDS.map((brand: PartnerBrand) => {
            const hasLogo = Boolean(brand.logo && brand.isAvailable);

            return (
              <div key={brand.id} className="brand-tile" title={brand.name}>
                {hasLogo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={brand.logo}
                    alt={brand.alt}
                    width={140}
                    height={32}
                    loading="lazy"
                    className="brand-logo-img"
                    style={{
                      transform: brand.scale ? `scale(${brand.scale})` : undefined,
                    }}
                  />
                ) : (
                  <span className="brand-wordmark">{brand.name}</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
