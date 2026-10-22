import type { Metadata } from 'next';
import '@/styles/reference.css';
import '@/styles/enhancements.css';
import '@/components/motion/animated-enquiry-button.css';
import '@/components/motion/enquiry-surface.css';
import '@/components/motion/variable-headline.css';
import '@/components/studio/bag-studio.css';
import SiteHeader from '@/components/layout/SiteHeader';
import SiteFooter from '@/components/layout/SiteFooter';
import ReviewBar from '@/components/layout/ReviewBar';

export const metadata: Metadata = {
  title: 'VSPIAS — Paper bags & manufacturing solutions',
  description: 'Paper bags for your brand. Machinery and printing solutions for what comes next. Bengaluru, India.',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon.png', sizes: '512x512', type: 'image/png' }
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ]
  }
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
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <ReviewBar />
      </body>
    </html>
  );
}
