'use client';

import React, { useState } from 'react';
import { AUTOMATION_INDUSTRIES } from './data';

interface AutomationIndustriesSectionProps {
  onOpenEnquiry: (context: string) => void;
}

export function AutomationIndustriesSection({
  onOpenEnquiry,
}: AutomationIndustriesSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      className="section industries automation-industries-section"
      id="industries-section"
      aria-labelledby="industriesTitle"
    >
      <div className="wrap">
        <div className="section-head reveal">
          <div>
            <p className="eyebrow">Industries we serve</p>
            <h2 id="industriesTitle">
              Different processes.
              <br />
              A shared ambition.
            </h2>
          </div>
          <p>
            Application-focused product selection for OEMs, panel builders and
            industrial operations.
          </p>
        </div>

        <div className="industry-list" id="industryList">
          {AUTOMATION_INDUSTRIES.map((ind, i) => {
            const isOpen = openIndex === i;
            return (
              <article
                key={ind.name}
                className={`industry-item ${isOpen ? 'open' : ''}`}
              >
                <button
                  className="industry-toggle"
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`industryDetail${i}`}
                  onClick={() => toggleIndex(i)}
                >
                  <span className="industry-symbol">
                    <svg className="icon" aria-hidden="true">
                      <use href={`#i-${ind.icon}`} />
                    </svg>
                  </span>
                  <strong className="industry-title">
                    {ind.name}
                  </strong>
                  <span className="industry-desc">{ind.description}</span>
                  {/* <span className="industry-arrow">
                    <svg className="icon" aria-hidden="true">
                      <use href="#i-arrow" />
                    </svg>
                  </span> */}
                </button>

                <div
                  className="industry-details"
                  id={`industryDetail${i}`}
                  hidden={!isOpen}
                >
                  <div className="industry-tags">
                    {ind.tags.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                  <button
                    type="button"
                    className="industry-action-btn"
                    data-enquiry={ind.enquiry}
                    onClick={() => onOpenEnquiry(ind.enquiry)}
                  >
                    Discuss your application
                    <svg className="icon" aria-hidden="true">
                      <use href="#i-ne" />
                    </svg>
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
