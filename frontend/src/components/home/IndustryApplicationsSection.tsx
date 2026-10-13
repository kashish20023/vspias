import React from 'react';
import Link from 'next/link';
import { TWELVE_INDUSTRY_APPLICATIONS } from '@/content/industries';

export default function IndustryApplicationsSection(): JSX.Element {
  return (
    <section
      className="section industry-applications-mosaic"
      id="industry-applications"
      aria-label="Twelve Industry Paper Bag Applications"
    >
      <div className="wrap">
        <div className="section-head-split">
          <div className="head-copy">
            <div className="eyebrow">INDUSTRY APPLICATIONS &middot; 12 COMMERCIAL SECTORS</div>
            <h2 className="section-title">
              Bags for everyday business.<br />
              More ways to carry your brand.
            </h2>
          </div>
          <p className="head-desc">
            Explore authentic commercial packaging formats across 12 sectors. From heavy produce sacks to boutique fashion carriers, engineered from certified paper reels at our Bengaluru facility.
          </p>
        </div>

        {/* 12-Tile Responsive CSS Grid with Featured Cards */}
        <div className="mosaic-grid">
          {TWELVE_INDUSTRY_APPLICATIONS.map((ind) => (
            <Link
              key={ind.id}
              href={ind.enquiryHref}
              className={`mosaic-card ${ind.isFeatured ? 'featured-tile' : ''} ${ind.id === 'groceries' ? 'wide-tile' : ''}`}
              aria-label={`Enquire about ${ind.title} paper packaging bags`}
            >
              <div className="mosaic-media-container">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={ind.image}
                  alt={`${ind.title} commercial paper bag packaging`}
                  className="mosaic-img"
                  loading="lazy"
                  width={ind.isFeatured ? 640 : 380}
                  height={ind.isFeatured ? 420 : 260}
                />
                <div className="mosaic-overlay" />
                <span className="mosaic-badge">{ind.categoryTag}</span>
                <span className="mosaic-arrow-btn" aria-hidden="true">↗</span>
              </div>

              <div className="mosaic-content">
                <h3 className="mosaic-card-title">{ind.title}</h3>
                <p className="mosaic-card-desc">{ind.description}</p>
                <span className="mosaic-cta-text">
                  Enquire Format <span>↗</span>
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mosaic-footer-note">
          <span className="note-icon" aria-hidden="true">ℹ</span>
          <span>
            Industry applications shown for commercial packaging inspiration. Paper weights, food-contact certifications, and custom dimensions are confirmed upon quotation.
          </span>
        </div>
      </div>
    </section>
  );
}
