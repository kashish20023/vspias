'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ProductItem } from '@/lib/catalog-service';

interface ProductDetailModalProps {
  product: ProductItem | null;
  onClose: () => void;
}

export default function ProductDetailModal({
  product,
  onClose
}: ProductDetailModalProps): JSX.Element | null {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (product) {
      previousActiveElement.current = document.activeElement as HTMLElement;
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
        if (previousActiveElement.current) {
          previousActiveElement.current.focus({ preventScroll: true });
        }
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [product, onClose]);

  if (!product) return null;

  const enquiryText = `I am interested in ${product.name} (${product.brand}). Please discuss the right specification, technical configuration and availability for my application.`;
  const contactHref =
    product.division === 'paper'
      ? `/contact?interest=Paper%20bags&requirements=${encodeURIComponent(enquiryText)}`
      : `/contact?interest=Electrical%20%26%20automation&requirements=${encodeURIComponent(enquiryText)}`;

  return (
    <div
      className="dialog-backdrop"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2500,
        backgroundColor: 'rgba(7, 29, 24, 0.75)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
    >
      <div
        className="product-dialog"
        ref={dialogRef as unknown as React.RefObject<HTMLDivElement>}
        style={{
          margin: 0,
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="dialog-top">
          <span>VSPIAS / PRODUCT ENQUIRY</span>
          <button
            type="button"
            className="dialog-close"
            onClick={onClose}
            aria-label="Close product details"
          >
            &times;
          </button>
        </div>

        <div className="dialog-body">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={'/' + product.image.replace(/^\//, '')}
            alt={product.alt}
            loading="lazy"
          />

          <div>
            <p className="catalog-brand" style={{ margin: '0 0 6px' }}>
              {product.brand} / {product.category}
            </p>
            <h2 id="dialog-title">{product.name}</h2>
            <p>{product.description}</p>

            <p className="dialog-source">
              {product.illustrative
                ? 'Style concept. Final materials, dimensions, print and availability are confirmed with the quotation.'
                : `${product.source}${product.sourcePage ? ` · Page ${product.sourcePage}` : ''}. Confirm the current model and availability.`}
            </p>

            <Link
              href={contactHref}
              className="button"
              onClick={() => {
                onClose();
              }}
            >
              Enquire About This {product.division === 'paper' ? 'Bag' : 'Product'} <span className="arrow">&rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
