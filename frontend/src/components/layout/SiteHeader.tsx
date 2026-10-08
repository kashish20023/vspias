'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ASSETS } from '@/content/assets';

export default function SiteHeader(): JSX.Element {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isAutomation = pathname.startsWith('/automation') || pathname.startsWith('/industrial-solutions');
  const isPaper = !isAutomation;

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  // Close menu on Escape key press & prevent body scroll when open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menuOpen) {
        closeMenu();
      }
    };
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [menuOpen]);

  // Reset menu when pathname changes
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const contactHref = isPaper
    ? '/contact?interest=Paper%20bags'
    : '/contact?interest=Electrical%20%26%20automation';

  return (
    <>
      <header className={`site-header ${isAutomation ? 'theme-graphite' : ''}`}>
        <div className="wrap header-row">
          <Link
            href={isPaper ? '/' : '/automation'}
            className="logo"
            aria-label="VSPIAS Ecoautomation Homepage"
            onClick={closeMenu}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={ASSETS.logo} alt="VSPIAS Logo" width={172} height={40} />
          </Link>

          <nav id="desktop-nav" aria-label="Main navigation" className="desktop-nav">
            {isPaper ? (
              <>
                <Link href="/#collection-section" onClick={closeMenu}>
                  Collection
                </Link>
                <Link href="/#customise-section" onClick={closeMenu}>
                  Customise
                </Link>
                <Link href="/#manufacturing-section" onClick={closeMenu}>
                  Manufacturing
                </Link>
                <Link href="/#company-section" onClick={closeMenu}>
                  Company
                </Link>
                <Link href="/automation" className="division-nav-link" onClick={closeMenu}>
                  Automation Division ↗
                </Link>
              </>
            ) : (
              <>
                <Link href="/automation#portfolio-section" onClick={closeMenu}>
                  Portfolio
                </Link>
                <Link href="/automation#engineering-section" onClick={closeMenu}>
                  Engineering
                </Link>
                <Link href="/automation#industries-section" onClick={closeMenu}>
                  Applications
                </Link>
                <Link href="/automation#company-section" onClick={closeMenu}>
                  Company
                </Link>
                <Link href="/" className="division-nav-link" onClick={closeMenu}>
                  Packaging Division ↗
                </Link>
              </>
            )}
          </nav>

          <Link href={contactHref} className="button header-cta" id="header-quote-button" onClick={closeMenu}>
            Let&apos;s talk <span className="arrow">↗</span>
          </Link>

          <button
            className="menu-toggle"
            type="button"
            aria-expanded={menuOpen ? 'true' : 'false'}
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-controls="mobile-drawer"
            onClick={toggleMenu}
          >
            <span aria-hidden="true" className="menu-icon">
              {menuOpen ? '✕' : '☰'}
            </span>
          </button>
        </div>
      </header>

      {/* Accessible Mobile Navigation Drawer */}
      <div
        id="mobile-drawer"
        className={`mobile-drawer ${menuOpen ? 'open' : ''} ${isAutomation ? 'theme-graphite' : ''}`}
        aria-hidden={!menuOpen}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation"
      >
        <div className="drawer-header">
          <Link
            href={isPaper ? '/' : '/automation'}
            className="logo drawer-logo"
            aria-label="VSPIAS Ecoautomation Homepage"
            onClick={closeMenu}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={ASSETS.logo} alt="VSPIAS Logo" width={140} height={32} />
          </Link>
          <button
            type="button"
            className="drawer-close"
            onClick={closeMenu}
            aria-label="Close navigation"
          >
            ✕
          </button>
        </div>

        <div className="drawer-divisions">
          <span className="drawer-label">Switch Business Division:</span>
          <div className="drawer-pill-group">
            <Link
              href="/"
              className={`drawer-pill ${isPaper ? 'active' : ''}`}
              aria-current={isPaper ? 'page' : undefined}
              onClick={closeMenu}
            >
              Paper &amp; Packaging
            </Link>
            <Link
              href="/automation"
              className={`drawer-pill ${isAutomation ? 'active' : ''}`}
              aria-current={isAutomation ? 'page' : undefined}
              onClick={closeMenu}
            >
              Electrical &amp; Automation
            </Link>
          </div>
        </div>

        <nav className="drawer-nav" aria-label="Mobile main navigation">
          {isPaper ? (
            <>
              <Link href="/#collection-section" onClick={closeMenu}>
                Collection
              </Link>
              <Link href="/#customise-section" onClick={closeMenu}>
                Customise Bag
              </Link>
              <Link href="/#manufacturing-section" onClick={closeMenu}>
                Manufacturing Journey
              </Link>
              <Link href="/#printing-section" onClick={closeMenu}>
                Flexographic Printing
              </Link>
              <Link href="/#company-section" onClick={closeMenu}>
                Company Story
              </Link>
            </>
          ) : (
            <>
              <Link href="/automation#portfolio-section" onClick={closeMenu}>
                Product Portfolio
              </Link>
              <Link href="/automation#engineering-section" onClick={closeMenu}>
                Control Panels &amp; Systems
              </Link>
              <Link href="/automation#industries-section" onClick={closeMenu}>
                Industries Served
              </Link>
              <Link href="/automation#company-section" onClick={closeMenu}>
                Company Heritage
              </Link>
            </>
          )}
          <Link href={contactHref} className="button drawer-cta" onClick={closeMenu}>
            Let&apos;s talk about your project <span className="arrow">↗</span>
          </Link>
        </nav>

        <div className="drawer-contact">
          <p>
            <strong>Paawan Bhargava</strong><br />
            Peenya, Bengaluru, Karnataka, India
          </p>
          <div className="drawer-contact-links">
            <a href="tel:+919783133333">+91 97831 33333</a>
            <a href="mailto:info@vspias.in">info@vspias.in</a>
          </div>
        </div>
      </div>

      {/* Backdrop overlay for mobile drawer */}
      {menuOpen && (
        <div
          className="drawer-backdrop"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}
    </>
  );
}
