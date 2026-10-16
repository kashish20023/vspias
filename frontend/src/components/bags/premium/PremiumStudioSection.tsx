'use client';

import React from 'react';
import BagStudio from '@/components/studio/BagStudio';
import type { DesignBrief } from '@/components/studio/bag-studio';

export default function PremiumStudioSection(): JSX.Element {
  const handleRequestQuote = (design: DesignBrief) => {
    if (typeof window !== 'undefined') {
      const formatStr = design.formatLabel || 'Custom';
      const specBlock = `[Bag design]\nFormat: ${formatStr}\nPaper: ${design.paper} (${design.paperColour})\nPrint: ${design.print} (${design.printColour})\nBrand: "${design.brand}"\nHandle: ${design.handle}\nShape: ${design.shape}`;

      window.dispatchEvent(
        new CustomEvent('vspias-design-selected', {
          detail: {
            ...design,
            requirements: specBlock
          }
        })
      );

      const enquiryEl = document.getElementById('enquiry') || document.getElementById('enquiry-section');
      if (enquiryEl) {
        enquiryEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <section className="section studio" id="studio" aria-labelledby="studioTitle">
      {/* Anchor alias to support existing #bag-studio deep links */}
      <div id="bag-studio" style={{ position: 'relative', top: '-112px' }} />

      <div className="wrap">
        <div className="eyebrow" style={{ color: 'var(--lime)' }}>Your ideas, in another dimension</div>
        <h2 id="studioTitle">Make it unmistakably yours.</h2>
        <p className="sub">
          Turn it. Colour it. Put your name on it. Explore a bag that feels like your brand, then carry that exact specification into your quote.
        </p>

        <div className="studio-host" style={{ marginTop: '36px' }}>
          {/* Preserved original working 3D Studio component with drag, continuous rotation, extended colors & bag formats */}
          <BagStudio onRequestQuote={handleRequestQuote} />
        </div>

        <div className="studio-bottom-note">
          <svg className="icon" aria-hidden="true"><use href="#i-info"></use></svg>
          Digital concept preview. Continuous auto-rotation and interactive drag allow 360&deg; inspection. Dimensions, materials, and print registration are confirmed during pre-production sign-off.
        </div>
      </div>
    </section>
  );
}
