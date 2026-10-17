'use client';

import React, { useState } from 'react';
import { AUTOMATION_PANEL_PHOTOS, AUTOMATION_IMAGES, AutomationProduct } from './data';

interface AutomationEngineeringSectionProps {
  onOpenProductById?: (productId: string) => void;
}

const STEPS = [
  {
    num: '01',
    title: 'Understand the application',
    desc: 'Review load schedules, motor ratings, ambient conditions, protection requirements and the installation environment.',
  },
  {
    num: '02',
    title: 'Define the right configuration',
    desc: 'Coordinate protection, drives, control hardware, I/O and the enclosure around a clear bill of materials.',
  },
  {
    num: '03',
    title: 'Resolve the practical details',
    desc: 'Clear terminal arrangements, ventilation, wiring discipline and testing before commissioning.',
  },
];

export function AutomationEngineeringSection({
  onOpenProductById,
}: AutomationEngineeringSectionProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [activePhotoKey, setActivePhotoKey] = useState<'plc' | 'panels' | 'scada'>('plc');

  const activePhoto = AUTOMATION_PANEL_PHOTOS[activePhotoKey];

  return (
    <section
      className="section engineering"
      id="engineering-section"
      aria-labelledby="engineeringTitle"
    >
      <div className="wrap engineering-grid">
        <div className="engineering-copy reveal">
          <p className="eyebrow">Control panel engineering</p>
          <h2 id="engineeringTitle">
            Real components.
            <br />
            Connected control.
          </h2>
          <p>
            PLC, I/O, drives and protection, selected around your panel requirements.
          </p>

          <div className="engineering-steps" id="engineeringSteps">
            {STEPS.map((s, idx) => {
              const isExpanded = activeStep === idx;
              return (
                <button
                  key={s.num}
                  className="engineering-step"
                  type="button"
                  aria-expanded={isExpanded}
                  aria-controls={`engineStep${idx}`}
                  data-engine-step={idx}
                  onClick={() => setActiveStep(idx)}
                >
                  <span>{s.num}</span>
                  <span className="step-copy">
                    <strong className="engine-title">{s.title}</strong>
                    <span
                      className="engine-description"
                      id={`engineStep${idx}`}
                      hidden={!isExpanded}
                    >
                      {s.desc}
                    </span>
                  </span>
                  <svg className="icon" aria-hidden="true">
                    <use href="#i-arrow" />
                  </svg>
                </button>
              );
            })}
          </div>
        </div>

        <figure className="panel-art reveal" id="panelArt" data-step={activeStep} data-photo={activePhotoKey}>
          <div className="panel-art-top">
            <strong>Inside the control system</strong>
          </div>

          <div className="panel-photo-frame">
            <img
              id="panelPhoto"
              src={activePhoto.src}
              alt={activePhoto.alt}
              width={560}
              height={380}
            />
          </div>

          <div className="panel-photo-tabs" aria-label="Panel photographs">
            <button
              type="button"
              data-panel-photo="plc"
              aria-pressed={activePhotoKey === 'plc'}
              onClick={() => setActivePhotoKey('plc')}
            >
              PLC &amp; I/O
            </button>
            <button
              type="button"
              data-panel-photo="panels"
              aria-pressed={activePhotoKey === 'panels'}
              onClick={() => setActivePhotoKey('panels')}
            >
              Panel range
            </button>
            <button
              type="button"
              data-panel-photo="scada"
              aria-pressed={activePhotoKey === 'scada'}
              onClick={() => setActivePhotoKey('scada')}
            >
              SCADA
            </button>
          </div>

          <figcaption className="panel-art-bottom">
            <div>
              <b id="engineeringCaption">{activePhoto.title}</b>
              <span id="panelPhotoCaption">{activePhoto.caption}</span>
            </div>
            <button
              className="panel-badge"
              type="button"
              data-show-product={activePhoto.product}
              aria-label={`View ${activePhoto.title} details`}
              onClick={() => onOpenProductById?.(activePhoto.product)}
            >
              <svg className="icon" aria-hidden="true">
                <use href="#i-ne" />
              </svg>
            </button>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
