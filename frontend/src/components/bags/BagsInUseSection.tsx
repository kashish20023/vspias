import React from 'react';
import Link from 'next/link';
import { ASSETS } from '@/content/assets';

const APPLICATIONS = [
  {
    id: 'retail',
    title: 'Retail & Fashion Boutiques',
    subtitle: 'Apparel · Footwear · Lifestyle Gifts',
    description:
      'High-tensile twisted handle bags in natural brown or bleached ivory kraft. Conveys sustainable brand values at retail checkout counters.',
    image: ASSETS.bagArtwork,
    imageAlt: 'Branded paper shopping bags displayed in retail store setting',
    tag: 'RETAIL'
  },
  {
    id: 'food',
    title: 'Cafés, Bakeries & Food Takeaway',
    subtitle: 'Bakeries · Gourmet Delis · Quick Service',
    description:
      'Self-standing block-bottom packaging with wide side gussets, engineered to keep food containers, pastry boxes, and takeaway orders upright during delivery.',
    image: ASSETS.foodPackaging,
    imageAlt: 'Takeaway food packaging bag options from brochure',
    tag: 'HORECA'
  },
  {
    id: 'ecommerce',
    title: 'E-Commerce Dispatch & Corporate Gifting',
    subtitle: 'Curated Hampers · Brand Unboxing · Events',
    description:
      'Heavy-duty paper bags providing a memorable physical touchpoint for seasonal brand promotions, premium product launches, and festive corporate gifting.',
    image: ASSETS.industryFood,
    imageAlt: 'E-commerce shipping bags and grocery formats',
    tag: 'COMMERCIAL'
  }
];

export default function BagsInUseSection(): JSX.Element {
  return (
    <section
      className="section bags-in-use-section"
      id="applications"
      aria-label="Paper Bags in Real Business Applications"
    >
      <div className="wrap">
        <div className="section-head-split">
          <div className="head-copy">
            <div className="eyebrow">APPLICATIONS &middot; MULTI-INDUSTRY</div>
            <h2 className="section-title">
              Paper bags in business.<br />
              Tailored for retail, food &amp; delivery.
            </h2>
          </div>
          <p className="head-desc">
            Explore how enterprise clients specify dimensions, paper weights, and handle formats across retail shopping, food services, and brand logistics.
          </p>
        </div>

        <div className="applications-grid">
          {APPLICATIONS.map((app) => (
            <div key={app.id} className="application-card">
              <div className="app-media-container">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={app.image}
                  alt={app.imageAlt}
                  className="app-img"
                  width={420}
                  height={280}
                  loading="lazy"
                />
                <span className="app-badge">{app.tag}</span>
              </div>
              <div className="app-content">
                <span className="app-sub">{app.subtitle}</span>
                <h3 className="app-title">{app.title}</h3>
                <p className="app-desc">{app.description}</p>
                <div className="app-action-row">
                  <Link
                    href={`/contact?interest=Paper%20bags&requirements=${encodeURIComponent(
                      `Enquiring about ${app.title} packaging solutions.`
                    )}`}
                    className="app-link"
                  >
                    Discuss This Application <span>↗</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
