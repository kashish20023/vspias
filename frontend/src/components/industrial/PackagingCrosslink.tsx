import React from 'react';
import Link from 'next/link';
import { APPROVED_ASSETS } from '@/content/assets';

export default function PackagingCrosslink(): JSX.Element {
  return (
    <section className="section packaging-crosslink-section" id="packaging-crosslink">
      <div className="wrap">
        <div className="packaging-crosslink-card">
          <div className="packaging-crosslink-copy">
            <div className="eyebrow">Discover our primary division</div>
            <h2>
              Looking for sustainable<br />
              paper packaging?
            </h2>
            <p className="crosslink-desc">
              Explore our dedicated Paper &amp; Packaging division. From retail kraft carry bags and food takeaway packaging to 2-colour flexographic printing and complete paper bag manufacturing machines.
            </p>
            <div className="crosslink-bullets">
              <span>&check; FSC-certified natural &amp; white kraft options</span>
              <span>&check; In-line flexographic brand printing</span>
              <span>&check; Complete roll-to-bag production machinery</span>
            </div>
            <div className="actions" style={{ marginTop: '28px' }}>
              <Link href="/" className="button lime" id="visit-paper-division-btn">
                Visit Paper &amp; Packaging Division <span className="arrow">↗</span>
              </Link>
            </div>
          </div>

          <div className="packaging-crosslink-media">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <picture>
              <source srcSet={APPROVED_ASSETS.paperBagsCollection} type="image/webp" />
              <img
                src={APPROVED_ASSETS.paperBagsCollectionPng}
                alt="Studio collection preview of VSPIAS sustainable kraft and white paper bags with twisted cord and ribbon handles"
                className="crosslink-bag-img"
                width={768}
                height={512}
                loading="lazy"
              />
            </picture>
            <div className="media-caption">
              <span>Paper Bags &middot; Printing &middot; Possibilities</span>
              <span className="division-badge">PRIMARY DIVISION</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
