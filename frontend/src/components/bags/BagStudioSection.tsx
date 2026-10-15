'use client';

import React from 'react';
import BagStudio from '@/components/studio/BagStudio';
import type { DesignBrief } from '@/components/studio/bag-studio';

export default function BagStudioSection(): JSX.Element {
  const handleRequestQuote = (design: DesignBrief) => {
    if (typeof window !== 'undefined') {
      const event = new CustomEvent('vspias-design-selected', { detail: design });
      window.dispatchEvent(event);

      const enquiryEl = document.getElementById('enquiry-section');
      if (enquiryEl) {
        enquiryEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        const params = new URLSearchParams({
          interest: 'Paper bags',
          brand: design.brand,
          finish: `${design.paper} (${design.paperColour})`,
          requirements: `Design Studio Preferences: Paper: ${design.paper} (${design.paperColour}), Print: ${design.print} (${design.printColour}), Brand: "${design.brand}", Handle: ${design.handle}, Shape: ${design.shape}`
        });
        window.location.href = `/contact?${params.toString()}#enquiry-form`;
      }
    }
  };

  return (
    <section className="section bag-studio-section" id="bag-studio" aria-label="Interactive Paper Bag Studio">
      <div className="wrap">
        <BagStudio onRequestQuote={handleRequestQuote} />
      </div>
    </section>
  );
}
