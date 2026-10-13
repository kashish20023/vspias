import React from 'react';
import type { Metadata } from 'next';
import AutomationHero from '@/components/industrial/AutomationHero';
import BrochureBrandBand from '@/components/industrial/BrochureBrandBand';
import ProductRangeSection from '@/components/catalog/ProductRangeSection';
import AutomationPortfolio from '@/components/industrial/AutomationPortfolio';
import ControlPanelEngineering from '@/components/industrial/ControlPanelEngineering';
import IndustriesServedSection from '@/components/industrial/IndustriesServedSection';
import PackagingCrosslink from '@/components/industrial/PackagingCrosslink';
import AutomationCompanyContact from '@/components/industrial/AutomationCompanyContact';

export const metadata: Metadata = {
  title: 'Electrical & Industrial Automation Portfolio — VSPIAS | Bengaluru',
  description:
    'PLC & I/O modules, variable frequency drives (VFD), HMI operator interfaces, industrial control panels (MCC, PCC, APFC), SCADA software, and switchgear from VSPIAS Ecoautomation Pvt. Ltd., Peenya, Bengaluru.'
};

export default function ElectricalAutomationHomePage(): JSX.Element {
  return (
    <div className="homepage-wrapper automation-division-page" id="automation-home">
      {/* Large Graphite Industrial Hero */}
      <AutomationHero />

      {/* Brochure Brand-Reference Band */}
      <BrochureBrandBand />

      {/* Verified Catalogue Range (Left-to-Right Motion) & Full 26-Product Catalogue Discovery */}
      <ProductRangeSection pageType="automation" />

      {/* Six-Category Portfolio with Technical Specification Modals */}
      <AutomationPortfolio />

      {/* Engineering / Control Panel Feature */}
      <ControlPanelEngineering />

      {/* Five Industrial Applications */}
      <IndustriesServedSection />

      {/* Visual Cross-Link to Paper & Packaging Division removed per client feedback (Chunk 9) */}
      {/* <PackagingCrosslink /> */}

      {/* Company Section & Contact CTA */}
      <AutomationCompanyContact />
    </div>
  );
}
