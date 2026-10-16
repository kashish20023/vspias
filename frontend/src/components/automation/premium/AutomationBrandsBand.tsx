import React from 'react';

export function AutomationBrandsBand() {
  return (
    <section className="brands" id="brands-section" aria-label="Brand references">
      <div className="wrap brand-grid">
        <p className="brand-note">
          <strong>Electrical & automation brands</strong>
        </p>
        <div
          className="brand-names"
          aria-label="Schneider Electric, ABB, Siemens and Larsen & Toubro"
        >
          <span>Schneider Electric</span>
          <span className="abb">ABB</span>
          <span className="siemens">SIEMENS</span>
          <span className="lt">Larsen & Toubro</span>
        </div>
      </div>
    </section>
  );
}
