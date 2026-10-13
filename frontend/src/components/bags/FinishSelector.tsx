'use client';

import React from 'react';

interface FinishSelectorProps {
  activeFinish: string;
  onSelect: (finish: string) => void;
}

const SWATCHES = [
  { name: 'Natural kraft', label: 'Kraft' },
  { name: 'Ivory', label: 'Ivory' },
  { name: 'Custom print', label: 'Custom print' }
];

export function FinishSelector({ activeFinish, onSelect }: FinishSelectorProps): JSX.Element {
  return (
    <div className="swatches" role="radiogroup" aria-label="Preferred finish swatches">
      {SWATCHES.map((swatch) => {
        const isActive = activeFinish === swatch.name;
        return (
          <button
            key={swatch.name}
            type="button"
            role="radio"
            className={`swatch ${isActive ? 'active' : ''}`}
            data-color={swatch.name}
            aria-checked={isActive}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onSelect(swatch.name)}
            onKeyDown={(e) => {
              if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                e.preventDefault();
                const idx = SWATCHES.findIndex((s) => s.name === swatch.name);
                const next = SWATCHES[(idx + 1) % SWATCHES.length];
                onSelect(next.name);
              } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                e.preventDefault();
                const idx = SWATCHES.findIndex((s) => s.name === swatch.name);
                const prev = SWATCHES[(idx - 1 + SWATCHES.length) % SWATCHES.length];
                onSelect(prev.name);
              }
            }}
          >
            <i aria-hidden="true" />
            {swatch.label}
          </button>
        );
      })}
    </div>
  );
}
