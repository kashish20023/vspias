import React from 'react';
import Link from 'next/link';
import { CUSTOM_SECTION_DATA } from '@/content/bags';

export default function CustomBagsSection(): JSX.Element {
  return (
    <div className="wrap" id="custom-section">
      <section className="custom-section">
        <div className="custom-image">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={CUSTOM_SECTION_DATA.image} alt={CUSTOM_SECTION_DATA.imageAlt} />
        </div>
        <div className="custom-copy">
          <div className="eyebrow">{CUSTOM_SECTION_DATA.eyebrow}</div>
          <h2>
            Make every<br />carry count.
          </h2>
          <p>{CUSTOM_SECTION_DATA.description}</p>
          <Link href={CUSTOM_SECTION_DATA.linkHref} className="text-link" id="discuss-bag-link">
            {CUSTOM_SECTION_DATA.linkText} <span>↗</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
