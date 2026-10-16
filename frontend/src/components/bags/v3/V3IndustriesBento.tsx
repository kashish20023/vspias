'use client';

import React from 'react';
import Link from 'next/link';
import { APPROVED_ASSETS } from '@/content/assets';

interface IndustryCardData {
  id: string;
  num: string;
  title: string;
  desc: string;
  recommendation: string;
  image: string;
  bg: string;
  gridClass: string;
}

const INDUSTRY_CARDS: IndustryCardData[] = [
  {
    id: 'food-delivery',
    num: '01',
    title: 'Food delivery',
    desc: 'Grease-aware kraft and sturdy reinforced handles for hot food orders and cloud kitchen transit.',
    recommendation: 'Square-bottom · flat handle',
    image: APPROVED_ASSETS.industries.quickServiceRestaurants,
    bg: '#EADFC9',
    gridClass: 'w2 h2'
  },
  {
    id: 'fashion-retail',
    num: '02',
    title: 'Fashion retail',
    desc: 'Twisted paper handles and rich in-line colour reproduction for boutique retail floors.',
    recommendation: 'Wide · twisted cord',
    image: APPROVED_ASSETS.industries.fashionRetail,
    bg: '#E6EADB',
    gridClass: ''
  },
  {
    id: 'grocery',
    num: '03',
    title: 'Grocery',
    desc: 'High-tensile block bottoms engineered to bear high-volume supermarket weights.',
    recommendation: 'Tall · block bottom',
    image: APPROVED_ASSETS.industries.groceries,
    bg: '#EFE3CC',
    gridClass: ''
  },
  {
    id: 'pharmacy',
    num: '04',
    title: 'Pharmacy',
    desc: 'Compact handle-free satchels for counter dispensary and personal wellness goods.',
    recommendation: 'SOS satchel',
    image: APPROVED_ASSETS.industries.pharmaceuticals,
    bg: '#E1E8D8',
    gridClass: ''
  },
  {
    id: 'tea-coffee',
    num: '05',
    title: 'Specialty tea & coffee',
    desc: 'Brand-forward carriers tailored for artisanal roasters, loose-leaf canisters and gift tins.',
    recommendation: 'Tall · printed',
    image: APPROVED_ASSETS.industries.agricultureProduce,
    bg: '#D8E2D6',
    gridClass: ''
  },
  {
    id: 'cosmetics',
    num: '06',
    title: 'Cosmetics',
    desc: 'A premium unboxing finish with turn-top rims for small, high-value skincare products.',
    recommendation: 'Euro-tote',
    image: APPROVED_ASSETS.industries.travel,
    bg: '#DDE2EA',
    gridClass: ''
  },
  {
    id: 'bakery',
    num: '07',
    title: 'Bakery',
    desc: 'Light, clean counter bags with food-contact compliance for artisan bread and patisserie.',
    recommendation: 'SOS satchel',
    image: APPROVED_ASSETS.industries.bakery,
    bg: '#F1E8D4',
    gridClass: ''
  },
  {
    id: 'corporate-gifting',
    num: '08',
    title: 'Corporate gifting',
    desc: 'Bespoke custom-branded paper bags for business events, merchandise kits and festive hampers.',
    recommendation: 'Tote · rope handle',
    image: APPROVED_ASSETS.industries.ecommerce,
    bg: '#D8E2D6',
    gridClass: 'w2'
  }
];

export default function V3IndustriesBento(): JSX.Element {
  return (
    <section className="pb-section" id="industries" aria-label="Packaging Solutions by Industry Sector">
      {/* Anchor alias to support existing #industry-applications deep links */}
      <div id="industry-applications" style={{ position: 'relative', top: '-96px' }} />

      <div className="pb-wrap">
        <div className="pb-eyebrow">Packaging for every sector</div>
        <h2 className="pb-h2">Built around how your customers carry.</h2>
        <p className="pb-sub">
          Select your industry sector to review starting formats, capacity standards, and custom flexo printing configurations.
        </p>

        <div className="pb-bento">
          {INDUSTRY_CARDS.map((card) => (
            <a
              key={card.id}
              href={`#enquiry-section`}
              className={`pb-bt ${card.gridClass}`}
              style={{ '--bt-bg': card.bg } as React.CSSProperties}
              aria-label={`${card.title}: ${card.desc}. Recommended format: ${card.recommendation}. Click to enquire.`}
            >
              <span className="pb-bt-no" aria-hidden="true">{card.num}</span>

              <div className="pb-bt-ico" aria-hidden="true">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={card.image}
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <h3>{card.title}</h3>
              <p>{card.desc}</p>
              <span className="pb-bt-rec">Start with: {card.recommendation}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
