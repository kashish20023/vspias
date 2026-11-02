import React from 'react';
import type { Metadata } from 'next';
import '@/styles/admin-base.css';
import '@/styles/admin-tailwind.css';

export const metadata: Metadata = {
  title: 'VSPIAS · Admin Workspace',
  description: 'Editorial workspace for catalogue, enquiries, and publishing.',
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

export default function AdminLayout({
  children
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div data-admin="">
      {children}
    </div>
  );
}
