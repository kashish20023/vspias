import React from 'react';
import type { Metadata } from 'next';
import BagHero from '@/components/home/BagHero';
import CapabilityStrip from '@/components/home/CapabilityStrip';
import ProductRangeSection from '@/components/catalog/ProductRangeSection';
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
  title: 'VSPIAS — Paper Bags, Flexo Printing & Packaging Solutions | Bengaluru',
  description:
    'Sustainable paper bags for retail, food takeaway and commercial packaging. Precision in-line flexographic printing and volume manufacturing by VSPIAS Ecoautomation Pvt. Ltd., Bengaluru.'
};

export default function PaperPackagingHomePage(): JSX.Element {
  return (
    <div className="homepage-wrapper paper-division-page" id="paper-packaging-home">
      {/* Signature Hero Banner */}
      <BagHero />

      {/* Capability Strip connecting hero to product range */}
      <CapabilityStrip />

      {/* Opposite-Moving Product Rows & Complete Full Range Discovery */}
      <ProductRangeSection pageType="paper" />

      {/* Bag Range Showcase */}
      <BagRangeShowcase />

      {/* About VSPIAS */}
      <AboutPackagingSection />

      {/* Industry Applications Mosaic */}
      <IndustryApplicationsSection />

      {/* Business Highlights */}
      <BusinessHighlightsSection />

      {/* Material and Construction Details */}
      <MaterialDetailsSection />

      {/* Custom Packaging Process */}
      <CustomPackagingJourney />

      {/* Manufacturing & Quality Proof */}
      <ManufacturingEvidenceSection />

      {/* Industrial Division Cross-Link removed per client feedback (Chunk 9) */}
      {/* <AutomationCrosslink /> */}

      {/* Final Enquiry CTA & Direct Consultation Desk */}
      <PaperEnquirySection />
    </div>
  );
}
