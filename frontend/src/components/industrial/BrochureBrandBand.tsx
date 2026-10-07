import React from 'react';

const BRAND_REFERENCES = [
  'Schneider Electric',
  'ABB',
  'Siemens',
  'Larsen & Toubro'
];

export default function BrochureBrandBand(): JSX.Element {
  return (
    <div className="brochure-brand-band" id="brands-section">
      <div className="wrap">
        <div className="brand-band-inner">
          <div className="brand-provenance-text">
            <span className="dot" aria-hidden="true" />
            <span>Product brand references from the supplied company brochure &middot; Specific model availability and authorised status confirmed per project.</span>
          </div>
          <div className="brand-badges-list">
            {BRAND_REFERENCES.map((brand) => (
              <div key={brand} className="brand-badge-item">
                <strong>{brand}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
