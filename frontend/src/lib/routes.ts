/**
 * Centralized Application Routes
 */

export const ROUTES = {
  home: '/',
  paperBags: '/paper-bags',
  industrialSolutions: '/industrial-solutions',
  bagDetail: (slug: string) => `/paper-bags/${slug}`,
  printing: '/printing',
  automation: '/automation',
  contact: '/contact',
  contactWithInterest: (interest: string) => `/contact?interest=${encodeURIComponent(interest)}`,
  brochure: '/downloads/vspias-company-brochure.pdf'
} as const;

export const VALID_BAG_SLUGS = [
  'kraft-carry-bags',
  'food-takeaway',
  'retail-custom-print'
] as const;

export type ValidBagSlug = (typeof VALID_BAG_SLUGS)[number];

export function isValidBagSlug(slug: string): slug is ValidBagSlug {
  return VALID_BAG_SLUGS.includes(slug as ValidBagSlug);
}
