'use client';

import { useEffect, useRef } from 'react';
import { mountBagStudio } from './bag-studio.js';
import type { BagDesign, DesignBrief } from './bag-studio.js';
// Import bag-studio.css from the appropriate global stylesheet entry for your router.

type Props = {
  initialDesign?: Partial<BagDesign>;
  onDesignChange?: (design: DesignBrief) => void;
  onRequestQuote?: (design: DesignBrief) => void;
};

export default function BagStudio(props: Props) {
  const container = useRef<HTMLDivElement>(null);
  const callbacks = useRef(props);
  const initial = useRef(props.initialDesign);
  const hasQuoteAction = Boolean(props.onRequestQuote);

  useEffect(() => { callbacks.current = props; }, [props]);
  useEffect(() => {
    if (!container.current) return;
    const studio = mountBagStudio(container.current, {
      initialDesign: initial.current,
      onDesignChange: design => callbacks.current.onDesignChange?.(design),
      onRequestQuote: hasQuoteAction ? design => callbacks.current.onRequestQuote?.(design) : undefined
    });
    return () => studio.destroy();
  }, [hasQuoteAction]);

  return <div ref={container}><p>Loading the bag studio…</p></div>;
}
