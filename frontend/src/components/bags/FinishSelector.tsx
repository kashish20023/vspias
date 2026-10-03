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
            className={`swatch ${isActive ? 'active' : ''}`}
            data-color={swatch.name}
            aria-pressed={isActive}
            onClick={() => onSelect(swatch.name)}
          >
            <i aria-hidden="true" />
            {swatch.label}
          </button>
        );
      })}
    </div>
  );
}
