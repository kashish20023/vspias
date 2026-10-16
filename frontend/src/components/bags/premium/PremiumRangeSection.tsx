'use client';

import React, { useState } from 'react';

interface FamilyData {
  id: string;
  type: string;
  paper: 'kraft' | 'ivory' | 'sage' | 'forest';
  shape: 'classic' | 'wide' | 'tall' | 'tote';
  handle: 'flat' | 'rope' | 'none';
  ink: 'forest' | 'lime';
}

const FAMILIES: FamilyData[] = [
  { id: 'kraft-takeaway', type: 'Kraft takeaway', paper: 'kraft', shape: 'classic', handle: 'flat', ink: 'forest' },
  { id: 'twisted-retail', type: 'Twisted-handle retail', paper: 'ivory', shape: 'wide', handle: 'rope', ink: 'forest' },
  { id: 'flat-grocery', type: 'Flat-handle grocery', paper: 'kraft', shape: 'tall', handle: 'flat', ink: 'forest' },
  { id: 'sos-block-bottom', type: 'SOS block-bottom', paper: 'sage', shape: 'classic', handle: 'none', ink: 'forest' },
  { id: 'euro-tote', type: 'Euro-tote', paper: 'forest', shape: 'tote', handle: 'rope', ink: 'lime' }
];

export default function PremiumRangeSection(): JSX.Element {
  const [activeTab, setActiveTab] = useState(0);

  const handleSelectFamily = (index: number, action: 'studio' | 'quote') => {
    const family = FAMILIES[index];
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('vspias-design-selected', {
          detail: {
            family: family.type,
            paper: family.paper,
            shape: family.shape,
            handle: family.handle,
            ink: family.ink,
            brand: 'VSPIAS',
            requirements: `Preferred Bag Family: ${family.type} (Paper: ${family.paper}, Handle: ${family.handle}, Ink: ${family.ink})`
          }
        })
      );

      const targetId = action === 'quote' ? 'enquiry' : 'studio';
      const targetEl = document.getElementById(targetId) || document.getElementById('enquiry-section');
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="section collection" id="range" aria-labelledby="rangeTitle">
      {/* Anchor alias to support existing #bag-range deep links */}
      <div id="bag-range" style={{ position: 'relative', top: '-112px' }} />

      <div className="wrap">
        <div className="section-head reveal">
          <div>
            <div className="eyebrow">The collection</div>
            <h2 className="section-title" id="rangeTitle">Five families, endless applications.</h2>
          </div>
          <div className="range-intro">
            <span className="range-count">05</span>
            <p>Made-to-order paper bags engineered for your counter, your products and your customers.</p>
          </div>
        </div>

        <div className="collection-panels reveal" id="collectionPanels">

          <article
            className={`range-panel ${activeTab === 0 ? 'active' : ''}`}
            style={{ '--tone': '#EADFC9' } as React.CSSProperties}
          >
            <button
              className="range-toggle"
              type="button"
              aria-expanded={activeTab === 0}
              aria-controls="panel-0"
              onClick={() => setActiveTab(0)}
            >
              <span className="index">01</span>
              <span className="label">Kraft takeaway</span>
              <span className="plus" aria-hidden="true">
                <svg className="icon"><use href="#i-plus"></use></svg>
              </span>
            </button>

            <div
              className="range-body"
              id="panel-0"
              style={{ display: activeTab === 0 ? 'grid' : undefined }}
            >
              <div className="range-copy">
                <div className="range-audience">QSR & takeaway</div>
                <h3>Everyday, thoughtfully packaged.</h3>
                <p>A familiar kraft format for counters, collections and everything on the go.</p>
                <div className="range-spec">
                  <span><small>Handle</small>Flat-fold</span><span><small>Format</small>Square bottom</span>
                </div>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '22px' }}>
                  <button
                    type="button"
                    className="btn pri mini-btn"
                    onClick={() => handleSelectFamily(0, 'quote')}
                  >
                    Request quote for this family &rarr;
                  </button>
                  <button
                    type="button"
                    className="btn sec mini-btn"
                    onClick={() => handleSelectFamily(0, 'studio')}
                  >
                    Start with this family in 3D
                  </button>
                </div>
              </div>

              <div className="range-image">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 360" role="img" aria-label="YOUR BRAND bag shape concept"><defs><linearGradient id="range-bag-0" x1="0" x2="1" y1="0" y2="1"><stop stopColor="#c8a475"/><stop offset="1" stopColor="#a78252"/></linearGradient><pattern id="range-bag-0-grain" width="7" height="9" patternUnits="userSpaceOnUse"><path d="M0 1h3m2 3h2M1 7h3" stroke="#fff" strokeOpacity=".09" strokeWidth=".6"/><path d="M3 0v2m3 4v2" stroke="#000" strokeOpacity=".035"/></pattern></defs><ellipse cx="150" cy="326" rx="91.19999999999999" ry="9" fill="#193b2d" opacity=".08"/><path d="M110.2 119v-40h57.599999999999994v40" fill="none" stroke="#8c693e" strokeWidth="10"/><path d="M219.0 115l24 13v182l-24 5z" fill="#a78252"/><rect x="59.0" y="115" width="160" height="200" fill="url(#range-bag-0)"/><rect x="59.0" y="115" width="160" height="200" fill="url(#range-bag-0-grain)"/><path d="M59.0 127h160" stroke="#a78252" strokeOpacity=".55"/><path d="M231.0 129v178" stroke="#c8a475" opacity=".35"/><path d="M59.0 292l80.0-12 80.0 12" fill="none" stroke="#a78252" opacity=".4"/><text x="139.0" y="219.0" textAnchor="middle" fill="#244832" fontFamily="Manrope,Arial,sans-serif" fontSize="13" fontWeight="700" letterSpacing="2">YOUR BRAND</text><path d="M124.0 231.0h30" stroke="#244832" opacity=".55"/><text x="139.0" y="248.0" textAnchor="middle" fill="#244832" opacity=".8" fontFamily="Manrope,Arial,sans-serif" fontSize="6" letterSpacing="1.5">THOUGHTFULLY MADE</text></svg>
              </div>
            </div>
          </article>

          <article
            className={`range-panel ${activeTab === 1 ? 'active' : ''}`}
            style={{ '--tone': '#E6EADB' } as React.CSSProperties}
          >
            <button
              className="range-toggle"
              type="button"
              aria-expanded={activeTab === 1}
              aria-controls="panel-1"
              onClick={() => setActiveTab(1)}
            >
              <span className="index">02</span>
              <span className="label">Twisted retail</span>
              <span className="plus" aria-hidden="true">
                <svg className="icon"><use href="#i-plus"></use></svg>
              </span>
            </button>

            <div
              className="range-body"
              id="panel-1"
              style={{ display: activeTab === 1 ? 'grid' : undefined }}
            >
              <div className="range-copy">
                <div className="range-audience">Retail & boutique</div>
                <h3>A little more presence.</h3>
                <p>A clean presentation, a distinctive imprint and a twisted handle to finish it.</p>
                <div className="range-spec">
                  <span><small>Handle</small>Twisted cord</span><span><small>Format</small>Wide profile</span>
                </div>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '22px' }}>
                  <button
                    type="button"
                    className="btn pri mini-btn"
                    onClick={() => handleSelectFamily(1, 'quote')}
                  >
                    Request quote for this family &rarr;
                  </button>
                  <button
                    type="button"
                    className="btn sec mini-btn"
                    onClick={() => handleSelectFamily(1, 'studio')}
                  >
                    Start with this family in 3D
                  </button>
                </div>
              </div>

              <div className="range-image">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 360" role="img" aria-label="YOUR BRAND bag shape concept"><defs><linearGradient id="range-bag-1" x1="0" x2="1" y1="0" y2="1"><stop stopColor="#f7f4e6"/><stop offset="1" stopColor="#d9d4bf"/></linearGradient><pattern id="range-bag-1-grain" width="7" height="9" patternUnits="userSpaceOnUse"><path d="M0 1h3m2 3h2M1 7h3" stroke="#fff" strokeOpacity=".09" strokeWidth=".6"/><path d="M3 0v2m3 4v2" stroke="#000" strokeOpacity=".035"/></pattern></defs><ellipse cx="150" cy="326" rx="110.57999999999998" ry="9" fill="#193b2d" opacity=".08"/><path d="M96.32000000000001 140c0-68 85.36-68 85.36 0" fill="none" stroke="#b8b39a" strokeWidth="5.5" strokeLinecap="round"/><path d="M236.0 138l24 13v159l-24 5z" fill="#d9d4bf"/><rect x="42.0" y="138" width="194" height="177" fill="url(#range-bag-1)"/><rect x="42.0" y="138" width="194" height="177" fill="url(#range-bag-1-grain)"/><path d="M42.0 150h194" stroke="#d9d4bf" strokeOpacity=".55"/><path d="M248.0 152v155" stroke="#f7f4e6" opacity=".35"/><path d="M42.0 292l97.0-12 97.0 12" fill="none" stroke="#d9d4bf" opacity=".4"/><text x="139.0" y="230.04000000000002" textAnchor="middle" fill="#244832" fontFamily="Manrope,Arial,sans-serif" fontSize="13" fontWeight="700" letterSpacing="2">YOUR BRAND</text><path d="M124.0 242.04000000000002h30" stroke="#244832" opacity=".55"/><text x="139.0" y="259.04" textAnchor="middle" fill="#244832" opacity=".8" fontFamily="Manrope,Arial,sans-serif" fontSize="6" letterSpacing="1.5">THOUGHTFULLY MADE</text></svg>
              </div>
            </div>
          </article>

          <article
            className={`range-panel ${activeTab === 2 ? 'active' : ''}`}
            style={{ '--tone': '#EFE3CC' } as React.CSSProperties}
          >
            <button
              className="range-toggle"
              type="button"
              aria-expanded={activeTab === 2}
              aria-controls="panel-2"
              onClick={() => setActiveTab(2)}
            >
              <span className="index">03</span>
              <span className="label">Flat grocery</span>
              <span className="plus" aria-hidden="true">
                <svg className="icon"><use href="#i-plus"></use></svg>
              </span>
            </button>

            <div
              className="range-body"
              id="panel-2"
              style={{ display: activeTab === 2 ? 'grid' : undefined }}
            >
              <div className="range-copy">
                <div className="range-audience">Grocery & daily essentials</div>
                <h3>Made for the everyday.</h3>
                <p>A taller format with a neat handle and plenty of room for your brand.</p>
                <div className="range-spec">
                  <span><small>Handle</small>Flat-fold</span><span><small>Format</small>Tall profile</span>
                </div>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '22px' }}>
                  <button
                    type="button"
                    className="btn pri mini-btn"
                    onClick={() => handleSelectFamily(2, 'quote')}
                  >
                    Request quote for this family &rarr;
                  </button>
                  <button
                    type="button"
                    className="btn sec mini-btn"
                    onClick={() => handleSelectFamily(2, 'studio')}
                  >
                    Start with this family in 3D
                  </button>
                </div>
              </div>

              <div className="range-image">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 360" role="img" aria-label="YOUR BRAND bag shape concept"><defs><linearGradient id="range-bag-2" x1="0" x2="1" y1="0" y2="1"><stop stopColor="#c8a475"/><stop offset="1" stopColor="#a78252"/></linearGradient><pattern id="range-bag-2-grain" width="7" height="9" patternUnits="userSpaceOnUse"><path d="M0 1h3m2 3h2M1 7h3" stroke="#fff" strokeOpacity=".09" strokeWidth=".6"/><path d="M3 0v2m3 4v2" stroke="#000" strokeOpacity=".035"/></pattern></defs><ellipse cx="150" cy="326" rx="82.64999999999999" ry="9" fill="#193b2d" opacity=".08"/><path d="M112.9 84v-40h52.199999999999996v40" fill="none" stroke="#8c693e" strokeWidth="10"/><path d="M211.5 80l24 13v217l-24 5z" fill="#a78252"/><rect x="66.5" y="80" width="145" height="235" fill="url(#range-bag-2)"/><rect x="66.5" y="80" width="145" height="235" fill="url(#range-bag-2-grain)"/><path d="M66.5 92h145" stroke="#a78252" strokeOpacity=".55"/><path d="M223.5 94v213" stroke="#c8a475" opacity=".35"/><path d="M66.5 292l72.5-12 72.5 12" fill="none" stroke="#a78252" opacity=".4"/><text x="139.0" y="202.2" textAnchor="middle" fill="#193b2d" fontFamily="Manrope,Arial,sans-serif" fontSize="13" fontWeight="700" letterSpacing="2">YOUR BRAND</text><path d="M124.0 214.2h30" stroke="#193b2d" opacity=".55"/><text x="139.0" y="231.2" textAnchor="middle" fill="#193b2d" opacity=".8" fontFamily="Manrope,Arial,sans-serif" fontSize="6" letterSpacing="1.5">THOUGHTFULLY MADE</text></svg>
              </div>
            </div>
          </article>

          <article
            className={`range-panel ${activeTab === 3 ? 'active' : ''}`}
            style={{ '--tone': '#E1E8D8' } as React.CSSProperties}
          >
            <button
              className="range-toggle"
              type="button"
              aria-expanded={activeTab === 3}
              aria-controls="panel-3"
              onClick={() => setActiveTab(3)}
            >
              <span className="index">04</span>
              <span className="label">SOS block-bottom</span>
              <span className="plus" aria-hidden="true">
                <svg className="icon"><use href="#i-plus"></use></svg>
              </span>
            </button>

            <div
              className="range-body"
              id="panel-3"
              style={{ display: activeTab === 3 ? 'grid' : undefined }}
            >
              <div className="range-copy">
                <div className="range-audience">Bakery & pharmacy</div>
                <h3>Simple. Useful. Considered.</h3>
                <p>A compact, handle-free starting point for quick counter presentation.</p>
                <div className="range-spec">
                  <span><small>Handle</small>Handle-free</span><span><small>Format</small>Block bottom</span>
                </div>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '22px' }}>
                  <button
                    type="button"
                    className="btn pri mini-btn"
                    onClick={() => handleSelectFamily(3, 'quote')}
                  >
                    Request quote for this family &rarr;
                  </button>
                  <button
                    type="button"
                    className="btn sec mini-btn"
                    onClick={() => handleSelectFamily(3, 'studio')}
                  >
                    Start with this family in 3D
                  </button>
                </div>
              </div>

              <div className="range-image">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 360" role="img" aria-label="YOUR BRAND bag shape concept"><defs><linearGradient id="range-bag-3" x1="0" x2="1" y1="0" y2="1"><stop stopColor="#bec7ad"/><stop offset="1" stopColor="#929f84"/></linearGradient><pattern id="range-bag-3-grain" width="7" height="9" patternUnits="userSpaceOnUse"><path d="M0 1h3m2 3h2M1 7h3" stroke="#fff" strokeOpacity=".09" strokeWidth=".6"/><path d="M3 0v2m3 4v2" stroke="#000" strokeOpacity=".035"/></pattern></defs><ellipse cx="150" cy="326" rx="91.19999999999999" ry="9" fill="#193b2d" opacity=".08"/><path d="M219.0 115l24 13v182l-24 5z" fill="#929f84"/><rect x="59.0" y="115" width="160" height="200" fill="url(#range-bag-3)"/><rect x="59.0" y="115" width="160" height="200" fill="url(#range-bag-3-grain)"/><path d="M59.0 127h160" stroke="#929f84" strokeOpacity=".55"/><path d="M231.0 129v178" stroke="#bec7ad" opacity=".35"/><path d="M59.0 292l80.0-12 80.0 12" fill="none" stroke="#929f84" opacity=".4"/><text x="139.0" y="219.0" textAnchor="middle" fill="#244832" fontFamily="Manrope,Arial,sans-serif" fontSize="13" fontWeight="700" letterSpacing="2">YOUR BRAND</text><path d="M124.0 231.0h30" stroke="#244832" opacity=".55"/><text x="139.0" y="248.0" textAnchor="middle" fill="#244832" opacity=".8" fontFamily="Manrope,Arial,sans-serif" fontSize="6" letterSpacing="1.5">THOUGHTFULLY MADE</text></svg>
              </div>
            </div>
          </article>

          <article
            className={`range-panel ${activeTab === 4 ? 'active' : ''}`}
            style={{ '--tone': '#DCE5D2' } as React.CSSProperties}
          >
            <button
              className="range-toggle"
              type="button"
              aria-expanded={activeTab === 4}
              aria-controls="panel-4"
              onClick={() => setActiveTab(4)}
            >
              <span className="index">05</span>
              <span className="label">Euro-tote</span>
              <span className="plus" aria-hidden="true">
                <svg className="icon"><use href="#i-plus"></use></svg>
              </span>
            </button>

            <div
              className="range-body"
              id="panel-4"
              style={{ display: activeTab === 4 ? 'grid' : undefined }}
            >
              <div className="range-copy">
                <div className="range-audience">Premium & gifting</div>
                <h3>A finishing touch worth keeping.</h3>
                <p>Explore a rich colour, a considered imprint and a more distinctive presentation.</p>
                <div className="range-spec">
                  <span><small>Handle</small>Cord handle</span><span><small>Format</small>Tote profile</span>
                </div>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '22px' }}>
                  <button
                    type="button"
                    className="btn pri mini-btn"
                    onClick={() => handleSelectFamily(4, 'quote')}
                  >
                    Request quote for this family &rarr;
                  </button>
                  <button
                    type="button"
                    className="btn sec mini-btn"
                    onClick={() => handleSelectFamily(4, 'studio')}
                  >
                    Start with this family in 3D
                  </button>
                </div>
              </div>

              <div className="range-image">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 360" role="img" aria-label="YOUR BRAND bag shape concept"><defs><linearGradient id="range-bag-4" x1="0" x2="1" y1="0" y2="1"><stop stopColor="#28523c"/><stop offset="1" stopColor="#123324"/></linearGradient><pattern id="range-bag-4-grain" width="7" height="9" patternUnits="userSpaceOnUse"><path d="M0 1h3m2 3h2M1 7h3" stroke="#fff" strokeOpacity=".09" strokeWidth=".6"/><path d="M3 0v2m3 4v2" stroke="#000" strokeOpacity=".035"/></pattern></defs><ellipse cx="150" cy="326" rx="102.6" ry="9" fill="#193b2d" opacity=".08"/><path d="M99.4 112c0-68 79.2-68 79.2 0" fill="none" stroke="#c5d99b" strokeWidth="5.5" strokeLinecap="round"/><path d="M229.0 110l24 13v187l-24 5z" fill="#123324"/><rect x="49.0" y="110" width="180" height="205" fill="url(#range-bag-4)"/><rect x="49.0" y="110" width="180" height="205" fill="url(#range-bag-4-grain)"/><path d="M49.0 122h180" stroke="#123324" strokeOpacity=".55"/><path d="M241.0 124v183" stroke="#28523c" opacity=".35"/><path d="M49.0 292l90.0-12 90.0 12" fill="none" stroke="#123324" opacity=".4"/><text x="139.0" y="216.60000000000002" textAnchor="middle" fill="#d5ed86" fontFamily="Manrope,Arial,sans-serif" fontSize="13" fontWeight="700" letterSpacing="2">YOUR BRAND</text><path d="M124.0 228.60000000000002h30" stroke="#d5ed86" opacity=".55"/><text x="139.0" y="245.60000000000002" textAnchor="middle" fill="#d5ed86" opacity=".8" fontFamily="Manrope,Arial,sans-serif" fontSize="6" letterSpacing="1.5">THOUGHTFULLY MADE</text></svg>
              </div>
            </div>
          </article>

        </div>

        <div className="range-note">
          <span>Illustrative formats. Final size, paper and finish are confirmed with your quotation.</span>
          <span>Peenya facility &middot; In-line flexo &middot; Volume manufacturing</span>
        </div>
      </div>
    </section>
  );
}
