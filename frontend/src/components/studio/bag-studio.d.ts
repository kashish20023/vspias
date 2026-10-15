export type BagDesign = { version: 1; paper: 'kraft' | 'ivory' | 'forest' | 'sage'; print: 'forest' | 'ivory' | 'charcoal'; brand: string; pattern: 'plain' | 'dots' | 'stripes'; handle: 'rope' | 'flat'; shape: 'classic' | 'tall' | 'wide' };
export type DesignBrief = BagDesign & { paperColour: string; printColour: string; note: string };
export const DEFAULT_DESIGN: Readonly<BagDesign>;
export const PAPER_COLOURS: ReadonlyArray<{ id: string; label: string; value: string }>;
export const PRINT_COLOURS: ReadonlyArray<{ id: string; label: string; value: string }>;
export function normalizeDesign(value?: unknown): BagDesign;
export function designBrief(value?: unknown): DesignBrief;
export function mountBagStudio(root: HTMLElement, options?: { initialDesign?: Partial<BagDesign>; onDesignChange?: (design: DesignBrief) => void; onRequestQuote?: (design: DesignBrief) => void }): { getDesign(): DesignBrief; setDesign(value: unknown): void; destroy(): void };
