'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function TopBar(): JSX.Element {
  const pathname = usePathname();
  const isAutomation = pathname.startsWith('/automation') || pathname.startsWith('/industrial-solutions');
  const isPaper = !isAutomation;

  return (
    <div className="topbar">
      <div className="wrap">
        <nav className="division-switch" aria-label="Business Divisions">
          <Link
            href="/"
            className={`division-pill ${isPaper ? 'active' : ''}`}
            aria-current={isPaper ? 'page' : undefined}
          >
            <span>Paper &amp; Packaging</span>
          </Link>
          <Link
            href="/automation"
            className={`division-pill ${isAutomation ? 'active' : ''}`}
            aria-current={isAutomation ? 'page' : undefined}
          >
            <span>Electrical &amp; Automation</span>
          </Link>
        </nav>
        <div className="top-contact">
          <span className="location">{isPaper ? 'Bengaluru' : 'Peenya, Bengaluru'}</span>
          <span aria-hidden="true">/</span>
          <a href="tel:+919783133333" className="phone" aria-label="Call +91 97831 33333">
            +91 97831 33333
          </a>
        </div>
      </div>
    </div>
  );
}
