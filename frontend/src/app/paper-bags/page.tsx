import React from 'react';
import type { Metadata } from 'next';
import '@/styles/paper-bags-premium.css';

import PremiumSymbols from '@/components/bags/premium/PremiumSymbols';
import PremiumHeroSection from '@/components/bags/premium/PremiumHeroSection';
import PremiumRangeSection from '@/components/bags/premium/PremiumRangeSection';
import PremiumStudioSection from '@/components/bags/premium/PremiumStudioSection';
import PremiumIndustriesSection from '@/components/bags/premium/PremiumIndustriesSection';
import PremiumProcessSection from '@/components/bags/premium/PremiumProcessSection';
import PremiumMaterialsSection from '@/components/bags/premium/PremiumMaterialsSection';
import PremiumEnquirySection from '@/components/bags/premium/PremiumEnquirySection';
import PremiumPhotoViewer from '@/components/bags/premium/PremiumPhotoViewer';
import PremiumMotionController from '@/components/bags/premium/PremiumMotionController';

export const metadata: Metadata = {
  title: 'Paper Bags & Packaging Division — VSPIAS Ecoautomation | Bengaluru',
  description:
    'Sustainable paper bags for retail, food takeaway and commercial packaging. Precision in-line flexographic printing and volume manufacturing by VSPIAS Ecoautomation Pvt. Ltd., Bengaluru.'
};

export default function PaperBagsPage(): JSX.Element {
  return (
    <div className="homepage-wrapper paper-division-page pb-premium-page" id="paper-packaging-home">
      {/* SVG symbols definition sprite */}
      <PremiumSymbols />

      {/* 1. Large editorial hero with green image frame and considered typography */}
      <PremiumHeroSection />

      {/* 2. Expanding 5-family product collection accordion */}
      <PremiumRangeSection />

      {/* 3. Interactive 3D Bag Studio in reference framing (preserving working 3D renderer) */}
      <PremiumStudioSection />

      {/* 4. Balanced 8-sector industry bento grid with spotlight hover */}
      <PremiumIndustriesSection />

      {/* 5. 4-step manufacturing timeline with interactive SVG flexo schematic */}
      <PremiumProcessSection />

      {/* 6. Tactile material explorer, GSM slider, and texture inspection */}
      <PremiumMaterialsSection />

      {/* 7. Commercial contact desk & protected quotation form */}
      <PremiumEnquirySection />

      {/* Accessible native <dialog> photo viewer & toast */}
      <PremiumPhotoViewer />

      {/* High-performance spring follower, spotlights, and motion controller */}
      <PremiumMotionController />
    </div>
  );
}
