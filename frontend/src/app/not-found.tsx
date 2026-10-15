import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Not Found (404) — VSPIAS Ecoautomation',
  description: 'The requested page could not be found. Explore our Paper Bags or Industrial Automation divisions.'
};

export default function NotFound(): JSX.Element {
  return (
    <div className="not-found-page" style={{ minHeight: '75vh', display: 'flex', alignItems: 'center', padding: '80px 0', background: 'var(--paper, #f5f3eb)' }}>
      <div className="wrap" style={{ maxWidth: '880px', margin: '0 auto', textAlign: 'center' }}>
        <div
          className="eyebrow"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            background: 'rgba(23, 59, 48, 0.08)',
            padding: '6px 14px',
            borderRadius: '20px',
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.14em',
            color: 'var(--ink, #173b30)',
            marginBottom: '24px'
          }}
        >
          <span>404 ERROR</span>
          <span aria-hidden="true">&middot;</span>
          <span>PAGE NOT FOUND</span>
        </div>

        <h1
          style={{
            fontSize: 'clamp(36px, 5vw, 56px)',
            fontWeight: 500,
            lineHeight: 1.1,
            letterSpacing: '-0.04em',
            color: 'var(--ink, #173b30)',
            marginBottom: '20px'
          }}
        >
          Looking for packaging<br />or industrial automation?
        </h1>

        <p
          style={{
            fontSize: '16px',
            lineHeight: 1.6,
            color: 'var(--muted, #5c6a60)',
            maxWidth: '560px',
            margin: '0 auto 36px'
          }}
        >
          The page you requested may have been moved, renamed, or is temporarily unavailable. 
          Use the shortcuts below to explore our two dedicated business divisions.
        </p>

        <div
          className="actions"
          style={{
            display: 'flex',
            gap: '12px',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: '48px'
          }}
        >
          <Link
            href="/"
            className="button"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              background: 'var(--ink, #173b30)',
              color: '#ffffff',
              padding: '12px 24px',
              borderRadius: '4px',
              fontSize: '13px',
              fontWeight: 600
            }}
          >
            <span>Return to Company Home</span>
            <span className="arrow" aria-hidden="true">↗</span>
          </Link>

          <Link
            href="/paper-bags"
            className="button secondary"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              background: '#ffffff',
              border: '1px solid var(--line, #d8ddd3)',
              color: 'var(--ink, #173b30)',
              padding: '12px 20px',
              borderRadius: '4px',
              fontSize: '13px',
              fontWeight: 600
            }}
          >
            <span>Paper Bags Division</span>
          </Link>

          <Link
            href="/automation"
            className="button secondary"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              background: '#ffffff',
              border: '1px solid var(--line, #d8ddd3)',
              color: 'var(--ink, #173b30)',
              padding: '12px 20px',
              borderRadius: '4px',
              fontSize: '13px',
              fontWeight: 600
            }}
          >
            <span>Industrial Automation</span>
          </Link>

          <Link
            href="/contact"
            className="button secondary"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              background: '#ffffff',
              border: '1px solid var(--line, #d8ddd3)',
              color: 'var(--ink, #173b30)',
              padding: '12px 20px',
              borderRadius: '4px',
              fontSize: '13px',
              fontWeight: 600
            }}
          >
            <span>Direct Contact Desk</span>
          </Link>
        </div>

        <div
          className="not-found-help-card"
          style={{
            background: '#ffffff',
            border: '1px solid var(--line, #d8ddd3)',
            borderRadius: '8px',
            padding: '24px 32px',
            maxWidth: '520px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            fontSize: '13px',
            color: 'var(--muted, #5c6a60)'
          }}
        >
          <strong style={{ color: 'var(--ink, #173b30)', fontSize: '14px' }}>
            Need immediate procurement or technical assistance?
          </strong>
          <span>
            Email Paawan Bhargava at{' '}
            <a href="mailto:info@vspias.in" style={{ color: 'var(--ink, #173b30)', fontWeight: 600, textDecoration: 'underline' }}>
              info@vspias.in
            </a>{' '}
            or call{' '}
            <a href="tel:+919783133333" style={{ color: 'var(--ink, #173b30)', fontWeight: 600, textDecoration: 'underline' }}>
              +91 97831 33333
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}
