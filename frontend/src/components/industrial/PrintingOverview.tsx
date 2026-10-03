import React from 'react';
import Link from 'next/link';

export function PrintingOverview(): JSX.Element {
  return (
    <section className="section" id="printing-section">
      <div className="wrap printing">
        <div>
          <div className="eyebrow">Flexographic printing solutions</div>
          <h2>
            Your brand.<br />In every<br />impression.
          </h2>
          <p>
            Explore 2-colour flexographic printing solutions for paper bag and packaging applications.
          </p>
          <Link href="/printing" className="text-link" id="explore-printing-solutions-link">
            Explore Printing Solutions <span>↗</span>
          </Link>
          <div className="spec-mini">
            <div>Colour configuration</div>
            <div>2-colour option</div>
            <div>Printing width & speed</div>
            <div>Confirm by model</div>
            <div>Substrate compatibility</div>
            <div>Confirm by application</div>
          </div>
        </div>

        <div className="print-art" aria-label="Concept graphic for two-colour flexographic printing">
          <div className="big-number">02</div>
          <div className="overprint">
            Colours.<br />Endless ideas.
          </div>
          <div className="art-rule" />
          <div className="art-bottom">
            <span>FLEXOGRAPHIC PRINTING</span>
            <span>VSPIAS ↗</span>
          </div>
          <div className="art-note">
            Concept graphic · Machine photographs & video to be supplied
          </div>
        </div>
      </div>
    </section>
  );
}
