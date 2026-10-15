'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ASSETS } from '@/content/assets';

export default function SiteHeader(): JSX.Element {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const isHome = pathname === '/';
  const isAutomation = pathname.startsWith('/automation') || pathname.startsWith('/industrial-solutions');
  const isPaper = pathname.startsWith('/paper-bags');
  const isContact = pathname.startsWith('/contact');

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  // Close menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeMenu();
      }
    };
    if (menuOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [menuOpen]);

  // Reset menu when pathname changes
  useEffect(() => {
    closeMenu();
  }, [pathname]);

  return (
    <header className="claude-sticky-header">
      <div className="claude-header-container">
        <div className={`claude-header-pill ${menuOpen ? 'menu-expanded' : ''}`}>
          <div className="claude-pill-bar">
            {/* Authentic Original VSPIAS Logo */}
            <Link
              href="/"
              className="claude-logo"
              aria-label="VSPIAS Ecoautomation Homepage"
              onClick={closeMenu}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={ASSETS.logo}
                alt="VSPIAS Ecoautomation Pvt Ltd"
                className="claude-logo-img"
                width={172}
                height={38}
              />
            </Link>

            {/* Desktop Navigation - Direct links without dropdowns */}
            <nav id="desktop-nav" aria-label="Main navigation" className="claude-desktop-nav">
              <Link
                href="/"
                className={`claude-nav-link ${isHome ? 'active' : ''}`}
                onClick={closeMenu}
              >
                {isHome && <span className="claude-active-dot" aria-hidden="true" />}
                <span>Home</span>
              </Link>

              <Link
                href="/automation"
                className={`claude-nav-link ${isAutomation ? 'active' : ''}`}
                onClick={closeMenu}
              >
                {isAutomation && <span className="claude-active-dot" aria-hidden="true" />}
                <span>Automation</span>
              </Link>

              <Link
                href="/paper-bags"
                className={`claude-nav-link ${isPaper ? 'active' : ''}`}
                onClick={closeMenu}
              >
                {isPaper && <span className="claude-active-dot" aria-hidden="true" />}
                <span>Paper Bags</span>
              </Link>

              <Link
                href="/contact"
                className={`claude-nav-link ${isContact ? 'active' : ''}`}
                onClick={closeMenu}
              >
                {isContact && <span className="claude-active-dot" aria-hidden="true" />}
                <span>Contact</span>
              </Link>
            </nav>

            {/* Send Enquiry CTA Button */}
            <Link
              href="/contact#quote"
              className="claude-cta-btn"
              id="header-quote-button"
              onClick={closeMenu}
            >
              <span>Send Enquiry</span>
              <span className="claude-cta-icon-box" aria-hidden="true">
                <svg
                  className="claude-cta-arw"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#12372a"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="3" y="5" width="18" height="14" rx="3" />
                  <path d="M3.5 7.5l8.5 6 8.5-6" />
                </svg>
              </span>
            </Link>

            {/* Mobile Toggle Button */}
            <button
              type="button"
              className="claude-mobile-toggle"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              onClick={toggleMenu}
            >
              {menuOpen ? (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#f2f3ec"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              ) : (
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#f2f3ec"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <line x1="4" y1="7" x2="20" y2="7" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="17" x2="20" y2="17" />
                </svg>
              )}
            </button>
          </div>

          {/* Mobile Drawer */}
          {menuOpen && (
            <div className="claude-mobile-menu">
              <Link
                href="/"
                className={`claude-mobile-link ${isHome ? 'active' : ''}`}
                onClick={closeMenu}
              >
                <span>Home</span>
                {isHome ? (
                  <span className="claude-mobile-dot" aria-hidden="true" />
                ) : (
                  <span className="claude-mobile-chev" aria-hidden="true">&rsaquo;</span>
                )}
              </Link>
              <Link
                href="/automation"
                className={`claude-mobile-link ${isAutomation ? 'active' : ''}`}
                onClick={closeMenu}
              >
                <span>Automation</span>
                {isAutomation ? (
                  <span className="claude-mobile-dot" aria-hidden="true" />
                ) : (
                  <span className="claude-mobile-chev" aria-hidden="true">&rsaquo;</span>
                )}
              </Link>
              <Link
                href="/paper-bags"
                className={`claude-mobile-link ${isPaper ? 'active' : ''}`}
                onClick={closeMenu}
              >
                <span>Paper Bags</span>
                {isPaper ? (
                  <span className="claude-mobile-dot" aria-hidden="true" />
                ) : (
                  <span className="claude-mobile-chev" aria-hidden="true">&rsaquo;</span>
                )}
              </Link>
              <Link
                href="/contact"
                className={`claude-mobile-link ${isContact ? 'active' : ''}`}
                onClick={closeMenu}
              >
                <span>Contact</span>
                {isContact ? (
                  <span className="claude-mobile-dot" aria-hidden="true" />
                ) : (
                  <span className="claude-mobile-chev" aria-hidden="true">&rsaquo;</span>
                )}
              </Link>
              <Link
                href="/contact#quote"
                className="claude-mobile-cta"
                onClick={closeMenu}
              >
                <span>Send Enquiry</span>
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
