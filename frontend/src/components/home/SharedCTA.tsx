import React from 'react';
import Link from 'next/link';

export function SharedCTA(): JSX.Element {
  return (
    <section className="cta-section" id="cta-section">
      <div className="wrap cta-row">
        <h2>
          What would you<br />like to make?
        </h2>
        <div>
          <p>
            A paper bag for your brand. A printing requirement. A new production line. Start with your idea.
          </p>
          <Link href="/contact" className="button" id="cta-contact-btn">
            Let&apos;s Talk About Your Project <span className="arrow">↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default SharedCTA;
