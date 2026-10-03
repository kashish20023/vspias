'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ASSETS } from '@/content/assets';

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="site-header">
      <div className="wrap header-row">
        <Link href="/paper-bags" className="logo" aria-label="VSPIAS home" onClick={closeMenu}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={ASSETS.logo} alt="VSPIAS Logo" width={172} height={40} />
        </Link>

        <nav id="nav" aria-label="Main navigation" className={menuOpen ? 'open' : ''}>
          <Link href="/paper-bags" onClick={closeMenu}>
            Paper Bags
          </Link>
          <Link href="/industrial-solutions" onClick={closeMenu}>
            Machines &amp; Printing
          </Link>
          <Link href="/automation" onClick={closeMenu}>
            Automation
          </Link>
          <Link href="/industrial-solutions#about-section" onClick={closeMenu}>
            About
          </Link>
          <Link href="/contact" onClick={closeMenu}>
            Contact
          </Link>
        </nav>

        <Link href="/contact" className="button" id="header-quote-button" onClick={closeMenu}>
          Request a Quote <span className="arrow">↗</span>
        </Link>

        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen ? 'true' : 'false'}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-controls="nav"
          onClick={toggleMenu}
        >
          <span aria-hidden="true">☰</span>
        </button>
      </div>
    </header>
  );
}
