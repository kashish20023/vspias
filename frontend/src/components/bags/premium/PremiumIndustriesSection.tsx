'use client';

import React from 'react';

interface IndustryItem {
  id: string;
  gridArea: string;
  num: string;
  title: string;
  subtitle: string;
  desc: string;
  bagType: string;
  iconId: string;
  isPhoto?: boolean;
  photoSrc?: string;
  isGift?: boolean;
}

const INDUSTRIES: IndustryItem[] = [
  {
    id: 'food',
    gridArea: 'food',
    num: '01',
    title: 'Food delivery',
    subtitle: 'Square bottom &middot; sturdy handles',
    desc: 'For hot takeaways and rapid order packing. Grease-resistant paper options that hold up.',
    bagType: 'Kraft takeaway',
    iconId: 'i-basket',
    isPhoto: true,
    photoSrc: '/assets/premium/industry-kraft-carry.webp'
  },
  {
    id: 'fashion',
    gridArea: 'fashion',
    num: '02',
    title: 'Fashion retail',
    subtitle: 'Twisted cord &middot; wide opening',
    desc: 'Boutique shopping bags with twisted paper handles. Clean branding that carries your style onto the street.',
    bagType: 'Twisted-handle retail',
    iconId: 'i-shirt'
  },
  {
    id: 'grocery',
    gridArea: 'grocery',
    num: '03',
    title: 'Grocery & market',
    subtitle: 'Tall &middot; reinforced base',
    desc: 'Heavy-duty block bottom bags for produce and full baskets. Comfortable flat-fold handles that spread the weight.',
    bagType: 'Flat-handle grocery',
    iconId: 'i-basket'
  },
  {
    id: 'pharmacy',
    gridArea: 'pharmacy',
    num: '04',
    title: 'Pharmacy & health',
    subtitle: 'Compact &middot; handle-free',
    desc: 'Clean self-opening satchels for counter handoffs, medicines and small wellness goods.',
    bagType: 'SOS block-bottom',
    iconId: 'i-cross'
  },
  {
    id: 'tea',
    gridArea: 'tea',
    num: '05',
    title: 'Tea & coffee',
    subtitle: 'Shelf-ready &middot; printed',
    desc: 'A bag that looks right next to your beans. Brand-forward print for roasteries, cafes and specialty tea counters.',
    bagType: 'Twisted-handle retail',
    iconId: 'i-coffee'
  },
  {
    id: 'cosmetics',
    gridArea: 'cosmetics',
    num: '06',
    title: 'Cosmetics',
    subtitle: 'Compact &middot; refined finish',
    desc: 'Boutique-grade small bags for perfumes, skincare and personal care essentials.',
    bagType: 'Euro-tote',
    iconId: 'i-bottle'
  },
  {
    id: 'bakery',
    gridArea: 'bakery',
    num: '07',
    title: 'Bakery & patisserie',
    subtitle: 'Handle-free &middot; clean paper',
    desc: 'Light, clean counter bags for warm bread, pastries and daily bakes.',
    bagType: 'SOS block-bottom',
    iconId: 'i-bread'
  },
  {
    id: 'gifting',
    gridArea: 'gifting',
    num: '08',
    title: 'Corporate gifting',
    subtitle: 'Tote &middot; custom branding',
    desc: 'Hampers, client gifts and celebration packaging that unbox with purpose.',
    bagType: 'Euro-tote',
    iconId: 'i-cube',
    isPhoto: true,
    photoSrc: '/assets/premium/industry-gift-concept.webp',
    isGift: true
  }
];

export default function PremiumIndustriesSection(): JSX.Element {
  const handleSelectIndustry = (item: IndustryItem) => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('vspias-design-selected', {
          detail: {
            family: item.bagType,
            industry: item.title,
            requirements: `Industry Application: ${item.title} (Recommended format: ${item.bagType})`
          }
        })
      );

      const enquiryEl = document.getElementById('enquiry') || document.getElementById('enquiry-section');
      if (enquiryEl) {
        enquiryEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="section" id="industries" aria-labelledby="industryTitle">
      {/* Anchor alias to support existing #industry-applications deep links */}
      <div id="industry-applications" style={{ position: 'relative', top: '-112px' }} />

      <div className="wrap">
        <div className="section-head reveal">
          <div>
            <div className="eyebrow">Made for your world</div>
            <h2 className="section-title" id="industryTitle">Packaging shaped for your counter.</h2>
          </div>
          <p>Every sector has its own pace and presentation. See where our paper bags work best.</p>
        </div>

        <div className="industry-grid">
          {INDUSTRIES.map((item) => {
            const cardClasses = `industry-card reveal ${item.isPhoto ? 'photo-card' : ''} ${item.isGift ? 'gift' : ''}`;

            return (
              <a
                key={item.id}
                className={cardClasses}
                style={{ gridArea: item.gridArea }}
                href="#enquiry"
                onClick={(e) => {
                  e.preventDefault();
                  handleSelectIndustry(item);
                }}
                data-bag-type={item.bagType}
                aria-label={`${item.title} — Start with ${item.bagType}`}
              >
                {item.isPhoto && item.photoSrc && (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img src={item.photoSrc} alt={item.title} loading="lazy" decoding="async" />
                )}

                <span className="number">{item.num}</span>

                <svg className="industry-symbol icon" aria-hidden="true">
                  <use href={`#${item.iconId}`}></use>
                </svg>

                <div style={{ position: 'relative', zIndex: 1 }}>
                  {item.isPhoto && <div className="small-cap" dangerouslySetInnerHTML={{ __html: item.subtitle }} />}
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>

                <svg className="card-arrow icon" aria-hidden="true">
                  <use href="#i-arrow"></use>
                </svg>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
