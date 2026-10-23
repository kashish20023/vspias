'use client';

import React, { useEffect, useRef } from 'react';
import {
  AutomationProduct,
  AUTOMATION_IMAGES,
  PRODUCT_GROUP_DESCRIPTIONS,
  PRODUCT_GROUP_CHECKLISTS,
} from './data';

interface AutomationModalsProps {
  selectedProduct: AutomationProduct | null;
  isHeroImageModalOpen: boolean;
  isNotesModalOpen: boolean;
  onCloseProduct: () => void;
  onCloseHeroImage: () => void;
  onCloseNotes: () => void;
  onEnquireProduct: (product: AutomationProduct, isDatasheet?: boolean) => void;
}

export function AutomationModals({
  selectedProduct,
  isHeroImageModalOpen,
  isNotesModalOpen,
  onCloseProduct,
  onCloseHeroImage,
  onCloseNotes,
  onEnquireProduct,
}: AutomationModalsProps) {
  const productDialogRef = useRef<HTMLDialogElement>(null);
  const heroImageDialogRef = useRef<HTMLDialogElement>(null);
  const notesDialogRef = useRef<HTMLDialogElement>(null);

  const prevActiveElementRef = useRef<HTMLElement | null>(null);

  // Sync modal state with native dialog elements
  useEffect(() => {
    const pDialog = productDialogRef.current;
    if (!pDialog) return;

    if (selectedProduct) {
      prevActiveElementRef.current = document.activeElement as HTMLElement;
      if (!pDialog.open) {
        pDialog.showModal();
        document.body.classList.add('dialog-open');
      }
    } else {
      if (pDialog.open) {
        pDialog.close();
        if (!isHeroImageModalOpen && !isNotesModalOpen) {
          document.body.classList.remove('dialog-open');
        }
      }
    }
  }, [selectedProduct, isHeroImageModalOpen, isNotesModalOpen]);

  useEffect(() => {
    const hDialog = heroImageDialogRef.current;
    if (!hDialog) return;

    if (isHeroImageModalOpen) {
      prevActiveElementRef.current = document.activeElement as HTMLElement;
      if (!hDialog.open) {
        hDialog.showModal();
        document.body.classList.add('dialog-open');
      }
    } else {
      if (hDialog.open) {
        hDialog.close();
        if (!selectedProduct && !isNotesModalOpen) {
          document.body.classList.remove('dialog-open');
        }
      }
    }
  }, [isHeroImageModalOpen, selectedProduct, isNotesModalOpen]);

  useEffect(() => {
    const nDialog = notesDialogRef.current;
    if (!nDialog) return;

    if (isNotesModalOpen) {
      prevActiveElementRef.current = document.activeElement as HTMLElement;
      if (!nDialog.open) {
        nDialog.showModal();
        document.body.classList.add('dialog-open');
      }
    } else {
      if (nDialog.open) {
        nDialog.close();
        if (!selectedProduct && !isHeroImageModalOpen) {
          document.body.classList.remove('dialog-open');
        }
      }
    }
  }, [isNotesModalOpen, selectedProduct, isHeroImageModalOpen]);

  // Click on backdrop to close
  const handleBackdropClick = (
    e: React.MouseEvent<HTMLDialogElement>,
    closeFn: () => void
  ) => {
    const dialog = e.currentTarget;
    const rect = dialog.getBoundingClientRect();
    if (
      e.clientX < rect.left ||
      e.clientX > rect.right ||
      e.clientY < rect.top ||
      e.clientY > rect.bottom
    ) {
      closeFn();
    }
  };

  return (
    <>
      {/* Product Detail Modal */}
      <dialog
        className="modal"
        id="productModal"
        ref={productDialogRef}
        aria-labelledby="productTitle"
        onClick={(e) => handleBackdropClick(e, onCloseProduct)}
        onCancel={(e) => {
          e.preventDefault();
          onCloseProduct();
        }}
      >
        {selectedProduct && (
          <>
            <div className="modal-head">
              <div>
                <p id="productBrand">
                  {selectedProduct.brand} / {selectedProduct.category}
                </p>
                <h2 id="productTitle">{selectedProduct.name}</h2>
              </div>
              <button
                className="close-modal"
                data-close
                type="button"
                aria-label="Close product details"
                autoFocus
                onClick={onCloseProduct}
              >
                <svg className="icon" aria-hidden="true">
                  <use href="#i-close" />
                </svg>
              </button>
            </div>

            <div className="modal-body" id="productDetail">
              <div className="product-detail-grid">
                <div>
                  <div className="detail-image">
                    <img
                      src={
                        AUTOMATION_IMAGES[selectedProduct.id] ||
                        `/assets/automation/${selectedProduct.id}.png`
                      }
                      alt={selectedProduct.alt}
                    />
                  </div>
                  <p className="detail-source">
                    {selectedProduct.source} · page {selectedProduct.sourcePage}
                    <br />
                    Product family reference from the supplied brochure.
                  </p>
                </div>

                <div className="detail-copy">
                  <p>{PRODUCT_GROUP_DESCRIPTIONS[selectedProduct.group]}</p>

                  {selectedProduct.series && selectedProduct.series.length > 0 && (
                    <div style={{ margin: '14px 0 18px' }}>
                      <h4
                        style={{
                          fontSize: '11px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.08em',
                          color: 'var(--muted)',
                          marginBottom: '8px',
                        }}
                      >
                        Brochure-listed series &amp; models
                      </h4>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {selectedProduct.series.map((s) => (
                          <span
                            key={s}
                            style={{
                              fontSize: '10px',
                              padding: '4px 8px',
                              borderRadius: '4px',
                              background: '#edf0e4',
                              color: 'var(--forest)',
                              fontWeight: 600,
                            }}
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <h3>Useful details for your enquiry</h3>
                  <ul>
                    {PRODUCT_GROUP_CHECKLISTS[selectedProduct.group]?.map(
                      (item: string, idx: number) => (
                        <li key={idx}>{item}</li>
                      )
                    )}
                  </ul>

                  <div className="detail-actions">
                    <button
                      className="btn btn-dark"
                      type="button"
                      id="enquireProduct"
                      style={{ color: '#ffffff' }}
                      onClick={() => onEnquireProduct(selectedProduct, false)}
                    >
                      <span style={{ color: '#ffffff' }}>Enquire about this product</span>
                      <svg className="icon" aria-hidden="true" style={{ stroke: '#ffffff' }}>
                        <use href="#i-ne" />
                      </svg>
                    </button>
                    <button
                      className="btn btn-line"
                      type="button"
                      id="requestData"
                      onClick={() => onEnquireProduct(selectedProduct, true)}
                    >
                      Request datasheet
                    </button>
                  </div>
                </div>
              </div>

              <p className="detail-foot">
                Specific model, technical ratings, availability and authorised status
                are confirmed per project. This entry does not represent a live stock
                or price listing.
              </p>
            </div>
          </>
        )}
      </dialog>

      {/* Hero Equipment Enlarged Image Modal */}
      <dialog
        className="modal hero-image-modal"
        id="imageModal"
        ref={heroImageDialogRef}
        aria-labelledby="imageTitle"
        onClick={(e) => handleBackdropClick(e, onCloseHeroImage)}
        onCancel={(e) => {
          e.preventDefault();
          onCloseHeroImage();
        }}
      >
        <div className="modal-head">
          <div>
            <p>Industrial automation range</p>
            <h2 id="imageTitle">Altivar variable-speed drives</h2>
          </div>
          <button
            className="close-modal"
            data-close
            type="button"
            aria-label="Close equipment image"
            autoFocus
            onClick={onCloseHeroImage}
          >
            <svg className="icon" aria-hidden="true">
              <use href="#i-close" />
            </svg>
          </button>
        </div>
        <div className="modal-body">
          <img
            id="enlargedImage"
            src="/assets/automation/hero-altivar.png"
            alt="Altivar variable-speed drives composition"
          />
          <p style={{ padding: '13px 5px 1px' }}>
            Product-family photograph from the VSPIAS brochure.
          </p>
        </div>
      </dialog>

      {/* Working Demos Notes Modal */}
      <dialog
        className="modal"
        id="notesModal"
        ref={notesDialogRef}
        aria-labelledby="notesTitle"
        onClick={(e) => handleBackdropClick(e, onCloseNotes)}
        onCancel={(e) => {
          e.preventDefault();
          onCloseNotes();
        }}
      >
        <div className="modal-head">
          <div>
            <p>Behind the working models</p>
            <h2 id="notesTitle">Simple principles. Clear assumptions.</h2>
          </div>
          <button
            className="close-modal"
            data-close
            type="button"
            aria-label="Close model notes"
            autoFocus
            onClick={onCloseNotes}
          >
            <svg className="icon" aria-hidden="true">
              <use href="#i-close" />
            </svg>
          </button>
        </div>
        <div className="modal-body detail-copy">
          <p>
            These six models illustrate operating principles. They are not live
            equipment, protection coordination studies or device specifications.
          </p>
          <h3>Drive and fan</h3>
          <p>
            The display uses an illustrative 1,450 rpm at 50 Hz. The relative
            fan-power estimate follows the ideal cubic speed relationship,
            assuming similar operating conditions and constant efficiency. Actual
            motor speed, energy use and savings depend on the system.
          </p>
          <h3>Tank and thermal relay</h3>
          <p>
            The tank uses 20% and 85% illustrative control thresholds. The thermal
            relay uses a simplified heat accumulator and cooldown; it does not
            reproduce a manufacturer&apos;s time-current curve.
          </p>
          <h3>Power factor</h3>
          <p>
            The APFC example assumes a balanced three-phase 415 V supply, 100 kW
            active power, and power factor changing from 0.78 to 0.98. Apparent
            power is P/PF; current is S/(&#8730;3 &times; V). Active power
            remains unchanged. Utility charges depend on the applicable tariff.
          </p>
          <h3>References</h3>
          <p>
            <a
              className="text-link"
              href="https://www.se.com/sg/en/faqs/FAQ000259683/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Schneider Electric: power factor correction &#x2197;
            </a>
            <br />
            <a
              className="text-link"
              href="https://arxiv.org/abs/1211.0676"
              target="_blank"
              rel="noopener noreferrer"
            >
              Fan affinity laws: research reference &#x2197;
            </a>
          </p>
        </div>
      </dialog>
    </>
  );
}
