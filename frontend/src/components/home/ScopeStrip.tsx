import React from 'react';
import Link from 'next/link';

export const ENTRY_POINTS = [
  {
    num: '01',
    target: 'For your brand',
    label: 'Paper bags & custom printing',
    href: '/#collection-section',
    isExternal: false
  },
  {
    num: '02',
    target: 'For your production',
    label: 'Machinery & printing solutions',
    href: '/#manufacturing-section',
    isExternal: false
  },
  {
    num: '03',
    target: 'For your industry',
    label: 'Electrical & automation',
    href: '/automation',
    isExternal: true
  }
] as const;

export default function ScopeStrip(): JSX.Element {
  return (
    <nav className="scope-strip" aria-label="Useful entry points">
      {ENTRY_POINTS.map((item) => (
        <Link
          key={item.num}
          href={item.href}
          className="scope-entry-card"
        >
          <span className="scope-num">{item.num}</span>
          <span className="scope-content">
            <strong className="scope-target">{item.target}</strong>
            <span className="scope-desc">{item.label}</span>
          </span>
          <span className="scope-arrow" aria-hidden="true">↗</span>
        </Link>
      ))}
    </nav>
  );
}
