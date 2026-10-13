'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { BagDetailData } from '@/content/bags';
import { FinishSelector } from './FinishSelector';

interface BagDetailProps {
  bag: BagDetailData;
}

export function BagDetail({ bag }: BagDetailProps): JSX.Element {
  const [activeFinish, setActiveFinish] = useState<string>('Natural kraft');

  const cleanTitle = bag.title.replace(/\.+$/, '');
  const quoteRequirements = `I am interested in ${cleanTitle}. Preferred finish: ${activeFinish}.`;

  const isKraft = activeFinish === 'Natural kraft';
  const finishSlug = activeFinish.toLowerCase().replace(/\s+/g, '-');
  const imageAlt = isKraft
    ? `${cleanTitle} in Natural kraft finish`
    : `${cleanTitle} in ${activeFinish} finish (illustrative finish preview)`;

  return (
    <div className="wrap page-intro">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/paper-bags">Home</Link>
        <span className="breadcrumb-separator" aria-hidden="true">/</span>
        <Link href="/paper-bags#collection">Paper bags</Link>
        <span className="breadcrumb-separator" aria-hidden="true">/</span>
        <span id="bag-crumb">{bag.breadcrumb}</span>
      </nav>

      <div className="detail-grid">
        <div className="detail-image">
          <div className={`detail-image-visual finish-${finishSlug}`}>
            <Image
              id="detail-bag-img"
              src={bag.image}
              alt={imageAlt}
              width={640}
              height={590}
              priority
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            {!isKraft && (
              <div
                className={`detail-image-overlay finish-${finishSlug}`}
                aria-hidden="true"
              />
            )}
          </div>
          {!isKraft && (
            <div className="finish-preview-badge" aria-live="polite">
              Illustrative finish preview
            </div>
          )}
        </div>

        <div className="detail-copy">
          <div className="eyebrow">Paper bag collection / Concept range</div>
          <h1 id="bag-title">{cleanTitle}.</h1>
          <p id="bag-description">{bag.description}</p>

          <span className="sub-label">Your preferred finish</span>
          <FinishSelector activeFinish={activeFinish} onSelect={setActiveFinish} />

          <div className="spec-mini">
            <div>Size & paper GSM</div>
            <div>Discuss your requirements</div>
            <div>Handle & finish</div>
            <div>Confirm available options</div>
            <div>Minimum order & lead time</div>
            <div>Confirmed with quotation</div>
          </div>

          <div className="actions">
            <Link
              href={`/contact?interest=Paper%20bags&requirements=${encodeURIComponent(quoteRequirements)}`}
              className="button"
              id="bag-quote"
            >
              Request a Bag Quote <span className="arrow">↗</span>
            </Link>
            <Link
              href={`/contact?interest=Paper%20bags&requirements=${encodeURIComponent(`I would like to discuss sample swatches for ${cleanTitle}.`)}`}
              className="button secondary"
              id="bag-sample"
            >
              Discuss a Sample
            </Link>
          </div>

          <p className="note">Concept imagery. Final product, artwork and specifications require approval.</p>
        </div>
      </div>

      <div className="detail-under">
        <div>
          <h3>Made around your requirement.</h3>
          <table className="spec-table">
            <tbody>
              {bag.specifications.map((spec) => (
                <tr key={spec.label}>
                  <td>{spec.label}</td>
                  <td>{spec.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>
          <h3>Your application, first.</h3>
          <div className="application-tags">
            {bag.applicationTags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <p>
            Tell us what the bag will carry, whether food contact is required and any branding specifications. We will suggest the right paper grade and handles.
          </p>
          <p>
            Need something different? Share an image or reference of what you have in mind.
          </p>
        </div>
      </div>
    </div>
  );
}
