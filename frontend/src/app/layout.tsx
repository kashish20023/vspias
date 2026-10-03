import type { Metadata } from 'next';
import '@/styles/reference.css';
import TopBar from '@/components/layout/TopBar';
import SiteHeader from '@/components/layout/SiteHeader';
import SiteFooter from '@/components/layout/SiteFooter';
import ReviewBar from '@/components/layout/ReviewBar';

export const metadata: Metadata = {
  title: 'VSPIAS — Paper bags & manufacturing solutions',
  description: 'Paper bags for your brand. Machinery and printing solutions for what comes next. Bengaluru, India.'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <TopBar />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <ReviewBar />
      </body>
    </html>
  );
}
