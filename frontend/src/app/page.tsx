import React from 'react';
import type { Metadata } from 'next';
import BagHero from '@/components/home/BagHero';
import CapabilityStrip from '@/components/home/CapabilityStrip';
import BagRangeShowcase from '@/components/bags/BagRangeShowcase';
import MaterialDetailsSection from '@/components/bags/MaterialDetailsSection';
import BagsInUseSection from '@/components/bags/BagsInUseSection';
import CustomPackagingJourney from '@/components/bags/CustomPackagingJourney';
import ManufacturingEvidenceSection from '@/components/industrial/ManufacturingEvidenceSection';
import AutomationCrosslink from '@/components/home/AutomationCrosslink';
import CompanyStorySection from '@/components/home/CompanyStorySection';
import PaperEnquirySection from '@/components/bags/PaperEnquirySection';

export const metadata: Metadata = {
  title: 'VSPIAS — Paper Bags, Flexo Printing & Packaging Solutions | Peenya, Bengaluru',
  description:
    'Sustainable paper bags for retail, food takeaway and commercial packaging. Precision in-line flexographic printing and volume manufacturing by VSPIAS Ecoautomation Pvt. Ltd., Peenya, Bengaluru.'
};

export default function PaperPackagingHomePage(): JSX.Element {
  return (
    <div className="homepage-wrapper paper-division-page" id="paper-packaging-home">
      {/* 4.B Signature Product Hero (Dominant visual on left, concise copy on right) */}
      <BagHero />

      {/* 4.C Compact Capability Strip (4 verified capabilities with fine dividers) */}
      <CapabilityStrip />

      {/* 4.D Interactive Bag-Range Showcase (Product selector updating image, specs & enquiry) */}
      <BagRangeShowcase />

      {/* 4.E Material and Construction Details (Tactile close-ups, handles, substrate & base) */}
      <MaterialDetailsSection />

      {/* 4.F Paper Bags in Real Business Applications (Retail, Food Takeaway, E-Commerce) */}
      <BagsInUseSection />

      {/* 4.G Custom Packaging Process (4-step buyer journey: "Make every carry count") */}
      <CustomPackagingJourney />

      {/* 4.H Manufacturing & Quality Evidence (Contrasting deep section: "Your brand. In every impression.") */}
      <ManufacturingEvidenceSection />

      {/* Industrial Division Cross-Link */}
      <AutomationCrosslink />

      {/* Company Heritage & Provenance */}
      <CompanyStorySection />

      {/* 4.I Final Enquiry CTA & Consultation Desk */}
      <PaperEnquirySection />
    </div>
  );
}
