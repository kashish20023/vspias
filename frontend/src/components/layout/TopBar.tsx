'use client';

import React from 'react';

export default function TopBar(): JSX.Element {
  return (
    <div className="claude-utility-strip">
      <div className="claude-utility-wrap">
        <div className="claude-utility-left">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#6fa83a"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 19C5 10 11 4 20 4c0 9-6 15-15 15z" />
            <path d="M5 19c3-5 6-8 10-10" />
          </svg>
          <span>Eco Automation &middot; Paper Bags</span>
        </div>
        <div className="claude-utility-right">
          <a href="tel:+919783133333" className="claude-utility-link">
            +91 97831 33333
          </a>
          <a href="mailto:info@vspias.in" className="claude-utility-link">
            info@vspias.in
          </a>
        </div>
      </div>
    </div>
  );
}
