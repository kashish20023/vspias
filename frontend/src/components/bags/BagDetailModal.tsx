'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { BagProduct, BAG_DETAILS } from '@/content/bags';

interface BagDetailModalProps {
  product: BagProduct | null;
  onClose: () => void;
}

export default function BagDetailModal({ product, onClose }: BagDetailModalProps): JSX.Element | null {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!product) return;

    // Focus close button on open
    closeBtnRef.current?.focus();

    // Trap Escape key
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [product, onClose]);

  if (!product) return null;

  const detailData = BAG_DETAILS[product.slug] || {
    title: product.title,
    description: product.description,
    specifications: [
      { label: 'Dimensions', value: 'Width × gusset × height, customized in mm' },
      { label: 'Paper Type', value: 'Natural brown kraft / bleached ivory / virgin pulp' },
      { label: 'Paper GSM', value: '70 to 140 GSM to confirm based on load' },
      { label: 'Handles', value: 'Twisted paper cord, flat fold, or handleless' },
      { label: 'Printing', value: 'Up to 2-colour flexographic in-line printing' },
      { label: 'Minimum Order', value: 'Quote-based according to size and print run' }
    ],
    applicationTags: ['Retail', 'Shopping', 'Takeaway', 'Commercial']
  };

  const enquiryUrl = `/contact?interest=Paper%20bags&requirements=${encodeURIComponent(
    `I would like to enquire about ${product.title}. Preferred application: ${product.description}. Please share quotation and size options.`
  )}`;

  return (
    <div
      className="vspias-modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-bag-title"
    >
      <div className="vspias-modal-content" ref={modalRef}>
        <div className="modal-header">
          <div className="eyebrow" style={{ marginBottom: 8 }}>{product.tag}</div>
          <h2 id="modal-bag-title" style={{ fontSize: 'clamp(28px, 4vw, 38px)' }}>
            {product.title}
          </h2>
          <button
            type="button"
            className="modal-close-btn"
            ref={closeBtnRef}
            onClick={onClose}
            aria-label="Close product details dialog"
          >
            ✕
          </button>
        </div>

        <div className="modal-body-grid">
          <div className="modal-media">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={product.image}
              alt={product.alt}
              className={product.imageClass || ''}
              style={{ maxHeight: '360px', width: '100%', objectFit: 'contain' }}
            />
            <p className="note" style={{ marginTop: '12px' }}>
              Illustrative concept. Final substrate, dimensions and handle specification confirmed upon quotation.
            </p>
          </div>

          <div className="modal-info">
            <p className="modal-description">{detailData.description}</p>

            <div className="modal-specs">
              <h3>Specification Guidelines</h3>
              <table className="spec-table" style={{ width: '100%', marginTop: '12px' }}>
                <tbody>
                  {detailData.specifications.map((spec, i) => (
                    <tr key={i}>
                      <td style={{ fontWeight: 600, padding: '8px 12px 8px 0', width: '38%' }}>
                        {spec.label}
                      </td>
                      <td style={{ padding: '8px 0' }}>{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="modal-tags" style={{ marginTop: '16px' }}>
              <span style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Applications:
              </span>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '6px' }}>
                {detailData.applicationTags.map((tag, i) => (
                  <span
                    key={i}
                    style={{
                      fontSize: '11px',
                      background: 'var(--sage)',
                      padding: '4px 10px',
                      borderRadius: '3px'
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="modal-actions" style={{ marginTop: '24px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link
                href={enquiryUrl}
                className="button"
                onClick={onClose}
                id="modal-request-quote-btn"
              >
                Request Quotation for This Bag <span className="arrow">↗</span>
              </Link>
              <Link
                href={`/paper-bags/${product.slug}`}
                className="button secondary"
                onClick={onClose}
              >
                Dedicated Page ↗
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
