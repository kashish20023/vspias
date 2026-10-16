'use client';

import React from 'react';
import BagStudio from '@/components/studio/BagStudio';
import type { DesignBrief } from '@/components/studio/bag-studio';

export default function V3BagStudioFraming(): JSX.Element {
  const handleRequestQuote = (design: DesignBrief) => {
    if (typeof window !== 'undefined') {
      const event = new CustomEvent('vspias-design-selected', { detail: design });
      window.dispatchEvent(event);

      const enquiryEl = document.getElementById('enquiry-section') || document.getElementById('enquiry');
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
    <section className="pb-section pb-studio-frame" id="studio" aria-label="Interactive 3D Bag Studio">
      {/* Anchor alias to support existing #bag-studio deep links */}
      <div id="bag-studio" style={{ position: 'relative', top: '-96px' }} />

      <div className="pb-wrap">
        <div className="pb-eyebrow">Interactive 3D Studio</div>
        <h2 className="pb-h2">See your bag before production.</h2>
        <p className="pb-sub">
          Rotate 360&deg;, choose a substrate, preview handles and set your brand imprint in real-time.
          Your custom configuration flows straight into the enquiry desk below.
        </p>

        <div className="pb-studio-host">
          {/* Preserved original working 3D Studio component with drag, rotation, and full state controls */}
          <BagStudio onRequestQuote={handleRequestQuote} />
        </div>
      </div>
    </section>
  );
}
