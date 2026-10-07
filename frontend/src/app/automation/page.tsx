import React from 'react';
import type { Metadata } from 'next';
import AutomationHero from '@/components/industrial/AutomationHero';
import BrochureBrandBand from '@/components/industrial/BrochureBrandBand';
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
      {/* B2. Large Graphite Industrial Hero */}
      <AutomationHero />

      {/* B3. Restrained Brochure Brand-Reference Band */}
      <BrochureBrandBand />

      {/* B4. Six-Category Portfolio with Technical Specification Modals */}
      <AutomationPortfolio />

      {/* B5. Engineering / Control Panel Feature (Understand / Define / Discuss) */}
      <ControlPanelEngineering />

      {/* B6. Five Industrial Applications (Full-Width Rows with Prefilled Enquiries) */}
      <IndustriesServedSection />

      {/* B7. Visual Cross-Link to Paper & Packaging Division */}
      <PackagingCrosslink />

      {/* B8. Company Section & "What would you like to power?" Contact CTA */}
      <AutomationCompanyContact />
    </div>
  );
}
