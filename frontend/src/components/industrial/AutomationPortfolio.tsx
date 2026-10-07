'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  AUTOMATION_DETAILED_ITEMS,
  AutomationItemData
} from './AutomationDetailModal';
import AutomationDetailModal from './AutomationDetailModal';

export default function AutomationPortfolio(): JSX.Element {
  const [selectedItem, setSelectedItem] = useState<AutomationItemData | null>(null);

  return (
    <section className="section auto-portfolio-section" id="portfolio-section">
      <div className="wrap">
        <div className="section-head">
          <div>
            <div className="eyebrow">Six Core Product Families</div>
            <h2>
              Industrial Automation<br />
              &amp; Electrical Sourcing.
            </h2>
          </div>
          <p>
            Explore our six primary automation categories from the supplied company brochure. Click any product family to review technical specifications and sourcing parameters.
          </p>
        </div>

        <div className="auto-portfolio-grid">
          {AUTOMATION_DETAILED_ITEMS.map((item) => (
            <article key={item.id} className="auto-card">
              <div
                className="auto-card-media"
                role="button"
                tabIndex={0}
                onClick={() => setSelectedItem(item)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedItem(item);
                  }
                }}
                aria-label={`View technical specifications for ${item.title}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={item.alt}
                  className="auto-card-img"
                />
                <span className="auto-card-tag">{item.supportedBrands[0]?.split(' ')[0] || 'INDUSTRIAL'}</span>
              </div>

              <div className="auto-card-content">
                <button
                  type="button"
                  className="auto-card-heading-btn"
                  onClick={() => setSelectedItem(item)}
                >
                  <h3>{item.title}</h3>
                  <span className="arrow" aria-hidden="true">↗</span>
                </button>
                <p className="auto-card-tagline">{item.tagline}</p>
                <p className="auto-card-desc">{item.description}</p>

                <div className="auto-card-actions">
                  <button
                    type="button"
                    className="button secondary mini-btn"
                    onClick={() => setSelectedItem(item)}
                    aria-label={`Open requirements modal for ${item.title}`}
                  >
                    View Requirements &amp; Specs
                  </button>
                  <Link
                    href={`/contact?interest=Electrical%20%26%20automation&requirements=${encodeURIComponent(
                      `I would like to request quotation and sizing details for ${item.title}.`
                    )}`}
                    className="text-link mini-link"
                  >
                    Discuss Requirements ↗
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="note" style={{ marginTop: '30px' }}>
          Product illustrations reproduced from the supplied VSPIAS company brochure. Sourcing, brand distribution rights and active part availability confirmed per enquiry.
        </p>
      </div>

      {/* Accessible Detail Modal */}
      <AutomationDetailModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </section>
  );
}
