import React from 'react';
import type { Metadata } from 'next';
import { AutomationOverview } from '@/components/industrial/AutomationOverview';
import { ManufacturingProcess } from '@/components/industrial/ManufacturingProcess';
import { PrintingOverview } from '@/components/industrial/PrintingOverview';
import { IndustriesSection } from '@/components/industrial/IndustriesSection';
import { SharedCTA } from '@/components/home/SharedCTA';

export const metadata: Metadata = {
  title: 'Machinery, Printing & Industrial Solutions — VSPIAS',
  description:
    'Multi-brand electrical & automation portfolio, paper bag manufacturing machinery, and flexographic printing solutions by VSPIAS Ecoautomation Pvt. Ltd.'
};

export default function IndustrialSolutionsPage(): JSX.Element {
  return (
    <main id="main-content">
      <AutomationOverview />
      <ManufacturingProcess />
      <PrintingOverview />
      <IndustriesSection />
      <SharedCTA />
    </main>
  );
}
