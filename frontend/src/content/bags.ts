import { ASSETS, APPROVED_ASSETS } from './assets';

export interface BagProduct {
  id: string;
  tag: string;
  title: string;
  description: string;
  category: string;
  slug: string;
  image: string;
  imageClass?: string;
  alt: string;
  dimensions?: string;
  gsmRange?: string;
  handleType?: string;
  printCapabilities?: string;
  typicalUse?: string;
  moqContext?: string;
  availableFinishes?: string[];
}

export interface BagDetailData {
  slug: string;
  title: string;
  breadcrumb: string;
  description: string;
  image: string;
  imageAlt: string;
  specifications: {
    label: string;
    value: string;
  }[];
  applicationTags: string[];
}

export const BAG_FILTERS = [
  { label: 'All styles', filter: 'all' },
  { label: 'Retail & gifting', filter: 'retail' },
  { label: 'Food & takeaway', filter: 'food' },
  { label: 'Custom printing', filter: 'custom' }
] as const;

export const BAG_COLLECTION_PRODUCTS: BagProduct[] = [
  {
    id: 'kraft-carry',
    tag: 'EVERYDAY VERSATILITY',
    title: 'Kraft carry bags',
    description: 'Retail · Shopping · Everyday carry',
    category: 'retail custom',
    slug: 'kraft-carry-bags',
    image: APPROVED_ASSETS.kraftCarryBags,
    imageClass: 'family-kraft',
    alt: 'Studio family view of natural brown kraft carry bags with twisted paper loop handles',
    dimensions: '220 × 110 × 310 mm (Customizable)',
    gsmRange: '80 – 140 GSM virgin / recycled kraft',
    handleType: 'Twisted paper cord or flat paper handle',
    printCapabilities: 'In-line 1 or 2-colour flexographic printing',
    typicalUse: 'Apparel stores, bookshops, boutique retail and gift packaging',
    moqContext: 'Volume production batches manufactured at Peenya unit',
    availableFinishes: ['Natural Kraft', 'Bleached Ivory', 'Custom Tinted']
  },
  {
    id: 'food-takeaway',
    tag: 'MADE FOR THE MOMENT',
    title: 'Food & takeaway',
    description: 'Cafés · Bakeries · Takeaway packaging',
    category: 'food',
    slug: 'food-takeaway',
    image: ASSETS.foodPackaging,
    imageClass: 'packaging',
    alt: 'Paper packaging illustration from the VSPIAS brochure',
    dimensions: '260 × 140 × 320 mm (Customizable)',
    gsmRange: '70 – 120 GSM food-contact compatible kraft',
    handleType: 'Flat fold-in handle or pinch bottom (handle-less)',
    printCapabilities: 'Food-grade water-based flexographic inks',
    typicalUse: 'Cafés, quick-service food deliveries, bakeries, and patisseries',
    moqContext: 'Bulk orders dispatched across commercial food chains',
    availableFinishes: ['Natural Brown', 'Bleached White', 'Grease-Resistant']
  },
  {
    id: 'retail-custom',
    tag: 'YOUR BRAND, IN HAND',
    title: 'Retail & custom print',
    description: 'Boutiques · Gifting · Brand experiences',
    category: 'retail custom',
    slug: 'retail-custom-print',
    image: ASSETS.bagArtwork,
    imageClass: 'crop-ivory',
    alt: 'Illustrative ivory paper shopping bag with printed brand identity',
    dimensions: '300 × 120 × 400 mm (Customizable)',
    gsmRange: '100 – 160 GSM premium smooth kraft / ivory',
    handleType: 'Reinforced twisted cord or custom cotton-feel rope',
    printCapabilities: 'Edge-to-edge 2-colour flexo brand printing',
    typicalUse: 'Luxury lifestyle boutiques, corporate hampers, exhibition gift bags',
    moqContext: 'Tailored manufacturing runs with pre-production sample sign-off',
    availableFinishes: ['Bleached Ivory', 'Forest Green', 'Natural Kraft']
  }
];

export const BAG_COLLECTION_NOTE =
  'Style concepts shown for discussion. Availability, materials, sizes and food-contact suitability are confirmed per enquiry.';

export const CUSTOM_SECTION_DATA = {
  eyebrow: 'Make it your own',
  heading: 'Make every\ncarry count.',
  description:
    'Bring your identity to the bag. Discuss paper, dimensions, handles and custom printing with our team.',
  linkText: 'Discuss Your Bag',
  linkHref: '/contact?interest=Paper%20bags',
  image: ASSETS.bagArtwork,
  imageAlt: 'Illustrative bag colours and finishes'
} as const;

export const SHARED_BAG_DESCRIPTION =
  'A considered starting point for everyday retail packaging. Tell us about your use case and we will discuss the right dimensions, paper and printing options.';

export const SHARED_BAG_SPECS = [
  { label: 'Dimensions', value: 'Width × gusset × height, in mm' },
  { label: 'Paper', value: 'Type, colour and GSM to confirm' },
  { label: 'Printing', value: 'Artwork and colours to confirm' },
  { label: 'Quantity', value: 'Share expected order volume' }
] as const;

export const SHARED_BAG_TAGS = ['Retail', 'Boutiques', 'Events', 'Gifting'] as const;

export const BAG_DETAILS: Record<string, BagDetailData> = {
  'kraft-carry-bags': {
    slug: 'kraft-carry-bags',
    title: 'Kraft carry bags.',
    breadcrumb: 'Kraft carry bags',
    description: SHARED_BAG_DESCRIPTION,
    image: APPROVED_ASSETS.kraftCarryBags,
    imageAlt: 'Studio family view of natural brown kraft carry bags with twisted paper loop handles',
    specifications: [...SHARED_BAG_SPECS],
    applicationTags: [...SHARED_BAG_TAGS]
  },
  'food-takeaway': {
    slug: 'food-takeaway',
    title: 'Food & takeaway bags.',
    breadcrumb: 'Food & takeaway bags',
    description: SHARED_BAG_DESCRIPTION,
    image: ASSETS.foodPackaging,
    imageAlt: 'Paper packaging illustration from the VSPIAS brochure',
    specifications: [...SHARED_BAG_SPECS],
    applicationTags: [...SHARED_BAG_TAGS]
  },
  'retail-custom-print': {
    slug: 'retail-custom-print',
    title: 'Retail & custom-printed bags.',
    breadcrumb: 'Retail & custom-printed bags',
    description: SHARED_BAG_DESCRIPTION,
    image: ASSETS.bagArtwork,
    imageAlt: 'Illustrative ivory paper shopping bag',
    specifications: [...SHARED_BAG_SPECS],
    applicationTags: [...SHARED_BAG_TAGS]
  }
};
