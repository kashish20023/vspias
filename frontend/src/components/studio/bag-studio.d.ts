export type BagDesign = {
  version: 1;
  paper: 'kraft' | 'ivory' | 'forest' | 'sage' | 'navy';
  print: 'forest' | 'ivory' | 'charcoal' | 'lime' | 'orange';
  brand: string;
  pattern: 'plain' | 'dots' | 'stripes';
  handle: 'rope' | 'flat' | 'none';
  shape: 'classic' | 'tall' | 'wide' | 'tote';
  format?: string;
};
export type DesignBrief = BagDesign & { paperColour: string; printColour: string; formatLabel?: string; note: string };
export const DEFAULT_DESIGN: Readonly<BagDesign>;
export const PAPER_COLOURS: ReadonlyArray<{ id: string; label: string; value: string }>;
export const PRINT_COLOURS: ReadonlyArray<{ id: string; label: string; value: string }>;
export const BAG_FORMATS: ReadonlyArray<{ id: string; label: string }>;
export function normalizeDesign(value?: unknown): BagDesign;
export function designBrief(value?: unknown): DesignBrief;
export function mountBagStudio(root: HTMLElement, options?: { initialDesign?: Partial<BagDesign>; onDesignChange?: (design: DesignBrief) => void; onRequestQuote?: (design: DesignBrief) => void }): { getDesign(): DesignBrief; setDesign(value: unknown): void; destroy(): void };
