import React from 'react';
import { SCOPE_STRIP_ITEMS } from '@/content/site';

export default function ScopeStrip(): JSX.Element {
  return (
    <div className="scope-strip">
      {SCOPE_STRIP_ITEMS.map((item) => (
        <div key={item.num}>
          <b>{item.num}</b>
          <span>
            {item.title}
            <small>{item.subtitle}</small>
          </span>
        </div>
      ))}
    </div>
  );
}
