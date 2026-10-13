import React from 'react';

const CAPABILITIES = [
  {
    number: '01',
    title: 'In-Line Flexo Printing',
    detail: '2-colour brand printing applied in-line during continuous bag formation.'
  },
  {
    number: '02',
    title: 'Precision Gussets & Bases',
    detail: 'Crisp machine creasing for rigid, self-standing block-bottom stability.'
  },
  {
    number: '03',
    title: 'Reinforced Paper Handles',
    detail: 'Firmly glued twisted cord and flat handles engineered for retail carrying loads.'
  },
  {
    number: '04',
    title: 'Bengaluru Manufacturing Hub',
    detail: 'Direct factory production and reliable batch dispatch from Bengaluru.'
  }
];

export default function CapabilityStrip(): JSX.Element {
  return (
    <section className="capability-strip" aria-label="Verified manufacturing capabilities">
      <div className="wrap">
        <div className="capability-grid">
          {CAPABILITIES.map((cap) => (
            <div key={cap.number} className="capability-item">
              <div className="cap-header">
                <span className="cap-num">{cap.number}</span>
                <span className="cap-dot" aria-hidden="true" />
              </div>
              <h3 className="cap-title">{cap.title}</h3>
              <p className="cap-detail">{cap.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
