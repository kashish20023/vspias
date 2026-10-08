import React from 'react';
import type { Metadata } from 'next';
import BagHero from '@/components/home/BagHero';
import CapabilityStrip from '@/components/home/CapabilityStrip';
import BagRangeShowcase from '@/components/bags/BagRangeShowcase';
import AboutPackagingSection from '@/components/home/AboutPackagingSection';
import IndustryApplicationsSection from '@/components/home/IndustryApplicationsSection';
import BusinessHighlightsSection from '@/components/home/BusinessHighlightsSection';
import MaterialDetailsSection from '@/components/bags/MaterialDetailsSection';
import CustomPackagingJourney from '@/components/bags/CustomPackagingJourney';
import ManufacturingEvidenceSection from '@/components/industrial/ManufacturingEvidenceSection';
import AutomationCrosslink from '@/components/home/AutomationCrosslink';
import PaperEnquirySection from '@/components/bags/PaperEnquirySection';

export const metadata: Metadata = {
  title: 'VSPIAS — Paper Bags, Flexo Printing & Packaging Solutions | Peenya, Bengaluru',
  description:
    'Sustainable paper bags for retail, food takeaway and commercial packaging. Precision in-line flexographic printing and volume manufacturing by VSPIAS Ecoautomation Pvt. Ltd., Peenya, Bengaluru.'
};

export default function PaperPackagingHomePage(): JSX.Element {
  return (
    <div className="homepage-wrapper paper-division-page" id="paper-packaging-home">
      {/* 6.B Signature Hero Banner (Design 1: Warm boutique background, large bag visual on right, copy on left) */}
      <BagHero />

      {/* Capability Strip connecting hero to product range */}
      <CapabilityStrip />

      {/* 6.C Existing Bag Range (Product selector updating image, specs & enquiry) */}
      <BagRangeShowcase />

      {/* 6.D About VSPIAS (Design 2: Dark olive composition, ivory text, burnt orange CTA) */}
      <AboutPackagingSection />

      {/* 6.E Industry Applications (Designs 3 & 4: Combined 12-sector responsive CSS Grid mosaic) */}
      <IndustryApplicationsSection />

      {/* 6.F Business Highlights (Design 5: Three-part composition: Headline, central collage, 3 supporting rows) */}
      <BusinessHighlightsSection />

      {/* Material and Construction Details (Tactile close-ups, handles, substrate & base) */}
      <MaterialDetailsSection />

      {/* 6.G Custom Packaging Process (4-step buyer journey: "Make every carry count") */}
      <CustomPackagingJourney />

      {/* Manufacturing & Quality Proof (Deep contrast section: "Your brand. In every impression.") */}
      <ManufacturingEvidenceSection />

      {/* Industrial Division Cross-Link */}
      <AutomationCrosslink />

      {/* Final Enquiry CTA & Direct Consultation Desk */}
      <PaperEnquirySection />
    </div>
  );
}
