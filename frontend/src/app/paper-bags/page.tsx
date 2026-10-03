import type { Metadata } from 'next';
import BagHero from '@/components/home/BagHero';
import BagCollection from '@/components/bags/BagCollection';
import CustomBagsSection from '@/components/home/CustomBagsSection';
import SharedCTA from '@/components/home/SharedCTA';

export const metadata: Metadata = {
  title: 'Paper Bags & Sustainable Packaging — VSPIAS',
  description:
    'FSC-certified paper bags for retail, takeaway, food delivery, and commercial packaging. Custom sizes, in-line printing, and rapid delivery across India.'
};

export default function PaperBagsHomePage() {
  return (
    <div className="view active" id="paper-bags-home">
      <BagHero />
      <BagCollection />
      <CustomBagsSection />
      <SharedCTA />
    </div>
  );
}
