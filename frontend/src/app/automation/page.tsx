import React from 'react';
import type { Metadata } from 'next';
import { AutomationPremiumPage } from '@/components/automation/premium/AutomationPremiumPage';

export const metadata: Metadata = {
  title: 'Electrical & Industrial Automation Portfolio — VSPIAS | Bengaluru',
  description:
    'PLC & I/O modules, variable frequency drives (VFD), HMI operator interfaces, industrial control panels (MCC, PCC, APFC), SCADA software, and switchgear from VSPIAS Ecoautomation Pvt. Ltd., Peenya, Bengaluru.'
};

export default function ElectricalAutomationHomePage(): JSX.Element {
  return <AutomationPremiumPage />;
}
