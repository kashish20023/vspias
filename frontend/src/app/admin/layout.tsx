import React from 'react';
import type { Metadata } from 'next';
import '@/styles/admin-base.css';
import '@/styles/admin-tailwind.css';

export const metadata: Metadata = {
  title: 'VSPIAS · Admin Workspace',
  description: 'Editorial workspace for catalogue, enquiries, and publishing.'
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
