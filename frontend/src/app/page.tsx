import React from 'react';
import type { Metadata } from 'next';
import CompanyHero from '@/components/home/CompanyHero';
import HomeProductRails from '@/components/home/HomeProductRails';
import CompanyBenefitsSection from '@/components/home/CompanyBenefitsSection';
import DivisionSolutionCards from '@/components/home/DivisionSolutionCards';
import CompactEnquiryBand from '@/components/home/CompactEnquiryBand';

export const metadata: Metadata = {
  title: 'VSPIAS Ecoautomation — Industrial Automation & Paper Bag Manufacturing | Bengaluru',
  description:
    'Your trusted partner for industrial automation, electrical switchgear and paper bag manufacturing solutions. Direct B2B operations in Bengaluru, India.'
};

export default function CompanyHomePage(): JSX.Element {
  return (
    <div className="homepage-wrapper company-home-page" id="company-home">
      {/* Block H1: Company Hero */}
      <CompanyHero />

      {/* Blocks H2 & H3: Opposite-Moving Product Rails (Automation L->R, Paper R->L) */}
      <HomeProductRails />

      {/* Block H4: Why Choose VSPIAS ECOAUTOMATION (5 Benefits) */}
      <CompanyBenefitsSection />

      {/* Block H5: Division Solution Cards (Automation & Paper Bags) */}
      <DivisionSolutionCards />

      {/* Block H6: Compact Enquiry Band */}
      <CompactEnquiryBand />
    </div>
  );
}
