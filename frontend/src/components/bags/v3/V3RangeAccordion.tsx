'use client';

import React, { useState } from 'react';

interface BagFamily {
  id: string;
  name: string;
  category: string;
  color: string;
  description: string;
  image: string;
  specs: { label: string; value: string }[];
}

const BAG_FAMILIES: BagFamily[] = [
  {
    id: 'kraft-takeaway',
    name: 'Kraft takeaway',
    category: 'QSR & food service',
    color: '#EADFC9',
    description:
      'Square-bottom bag with reinforced flat-fold handles for hot-counter takeaway and quick-service delivery volume.',
    image: '/assets/approved/05-highlight-tile-kraft-bags.png',
    specs: [
      { label: 'GSM Range', value: '70–120 GSM' },
      { label: 'Handle Type', value: 'Flat-fold paper' },
      { label: 'Base Style', value: 'Square bottom' },
      { label: 'Flexo Print', value: '1–2 colour in-line' }
    ]
  },
  {
    id: 'twisted-retail',
    name: 'Twisted retail',
    category: 'Retail & boutique',
    color: '#E6EADB',
    description:
      'A presentation-grade shopping bag with twisted paper cord handles and a clean, crisp surface for high-impact brand marks.',
    image: '/assets/approved/paper-bags-collection-premium.webp',
    specs: [
      { label: 'GSM Range', value: '90–140 GSM' },
      { label: 'Handle Type', value: 'Twisted paper cord' },
      { label: 'Base Style', value: 'Block bottom' },
      { label: 'Flexo Print', value: '1–2 colour in-line' }
    ]
  },
  {
    id: 'flat-grocery',
    name: 'Flat grocery',
    category: 'Grocery & supermarket',
    color: '#EFE3CC',
    description:
      'A taller, high-capacity carrier built for everyday checkout loads. Wide flat handles spread weight comfortably in hand.',
    image: '/assets/approved/kraft-carry-bags-premium.webp',
    specs: [
      { label: 'GSM Range', value: '80–140 GSM' },
      { label: 'Handle Type', value: 'Flat-fold handle' },
      { label: 'Base Style', value: 'Block bottom' },
      { label: 'Flexo Print', value: '1–2 colour in-line' }
    ]
  },
  {
    id: 'sos-block-bottom',
    name: 'SOS block-bottom',
    category: 'Bakery & pharmacy',
    color: '#E1E8D8',
    description:
      'Handle-free self-opening satchel format engineered for bakery loaves, pharmacy prescription dispensing and counter packs.',
    image: '/assets/approved/05-highlight-tile-pouch.png',
    specs: [
      { label: 'GSM Range', value: '70–100 GSM' },
      { label: 'Handle Type', value: 'Handle-free satchel' },
      { label: 'Base Style', value: 'SOS block bottom' },
      { label: 'Flexo Print', value: '1–2 colour in-line' }
    ]
  },
  {
    id: 'euro-tote',
    name: 'Euro-tote',
    category: 'Premium & luxury',
    color: '#D8E2D6',
    description:
      'Boutique-grade luxury tote featuring reinforced turn-top rims, rope handles and rich surface finishes for unboxing impact.',
    image: '/assets/approved/05-highlight-tile-handles.png',
    specs: [
      { label: 'GSM Range', value: '100–140 GSM' },
      { label: 'Handle Type', value: 'Rope / Cotton-feel' },
      { label: 'Base Style', value: 'Reinforced base' },
      { label: 'Flexo Print', value: '1–2 colour in-line' }
    ]
  }
];

export default function V3RangeAccordion(): JSX.Element {
  const [activeId, setActiveId] = useState<string>('kraft-takeaway');

  return (
    <section className="pb-section" id="range" aria-label="Paper Bag Product Families">
      {/* Anchor alias to support existing #bag-range deep links */}
      <div id="bag-range" style={{ position: 'relative', top: '-96px' }} />

      <div className="pb-wrap">
        <div className="pb-eyebrow">5 Product Families &middot; Direct Supply</div>
        <h2 className="pb-h2">Find the bag that fits your counter.</h2>
        <p className="pb-sub">
          Tap or hover a family to explore details. All dimensions, paper GSM and flexo printing options are manufactured to order.
        </p>

        <div className="pb-acc" role="tablist" aria-label="Paper bag families expanding accordion">
          {BAG_FAMILIES.map((family, idx) => {
            const isOpen = family.id === activeId;
            return (
              <div
                key={family.id}
                role="tab"
                tabIndex={0}
                aria-selected={isOpen}
                aria-expanded={isOpen}
                aria-controls={`panel-${family.id}`}
                id={`tab-${family.id}`}
                className={`pb-pn ${isOpen ? 'on' : ''}`}
                style={{ '--p-bg': family.color } as React.CSSProperties}
                onClick={() => setActiveId(family.id)}
                onMouseEnter={() => {
                  if (typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (min-width: 1001px)').matches) {
                    setActiveId(family.id);
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveId(family.id);
                  }
                }}
              >
                {/* Collapsed State Bar */}
                <div className="pb-pn-c" aria-hidden={isOpen}>
                  <span className="pb-pn-n">{String(idx + 1).padStart(2, '0')}</span>
                  <span className="pb-pn-v">{family.name}</span>
                  <span className="pb-pn-plus" aria-hidden="true">+</span>
                </div>

                {/* Expanded State Content */}
                <div
                  className="pb-pn-o"
                  id={`panel-${family.id}`}
                  role="tabpanel"
                  aria-labelledby={`tab-${family.id}`}
                  hidden={!isOpen}
                >
                  <div className="pb-pn-t">
                    <span className="pb-tag">{family.category}</span>
                    <h3>{family.name}</h3>
                    <p>{family.description}</p>

                    <div className="pb-mini-grid">
                      {family.specs.map((s, i) => (
                        <div key={i}>
                          <small>{s.label}</small>
                          <b>{s.value}</b>
                        </div>
                      ))}
                    </div>

                    <div className="pb-pn-actions">
                      <a href="#enquiry-section" className="pb-btn pb-pri">
                        Request quote
                      </a>
                      <a href="#studio" className="pb-btn pb-sec">
                        Customise in 3D
                      </a>
                    </div>
                  </div>

                  <div className="pb-pn-i">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={family.image}
                      alt={`${family.name} specification presentation`}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
