import { APPROVED_ASSETS } from './assets';

export interface IndustryApplication {
  id: string;
  title: string;
  categoryTag: string;
  description: string;
  image: string;
  isFeatured?: boolean;
  filterSlug?: string;
  enquiryHref: string;
}

export const TWELVE_INDUSTRY_APPLICATIONS: IndustryApplication[] = [
  {
    id: 'agriculture-produce',
    title: 'Agriculture & Produce',
    categoryTag: 'HEAVYWEIGHT KRAFT',
    description: 'Ventilated, high-burst strength kraft sacks for fresh produce and agricultural commodities.',
    image: APPROVED_ASSETS.industries.agricultureProduce,
    isFeatured: true,
    filterSlug: 'retail',
    enquiryHref: '/contact?interest=Paper%20bags&requirements=Enquiry%20for%20Agriculture%20%26%20Produce%20packaging%20bags.'
  },
  {
    id: 'supermarkets',
    title: 'Supermarkets',
    categoryTag: 'HIGH-CAPACITY CARRY',
    description: 'Flat and twisted handle grocery carriers engineered for heavy checkout basket volumes.',
    image: APPROVED_ASSETS.industries.supermarkets,
    filterSlug: 'retail',
    enquiryHref: '/contact?interest=Paper%20bags&requirements=Enquiry%20for%20Supermarket%20carry%20bags.'
  },
  {
    id: 'bakery',
    title: 'Bakery',
    categoryTag: 'GREASE RESISTANT',
    description: 'Pinch-bottom and windowed kraft pouches for bread loaves, patisseries and baked items.',
    image: APPROVED_ASSETS.industries.bakery,
    filterSlug: 'food',
    enquiryHref: '/contact?interest=Paper%20bags&requirements=Enquiry%20for%20Bakery%20paper%20packaging.'
  },
  {
    id: 'travel',
    title: 'Travel & Hospitality',
    categoryTag: 'AMENITY & RETAIL',
    description: 'Compact boutique carriers for airport retail, hotel amenities and souvenir packaging.',
    image: APPROVED_ASSETS.industries.travel,
    filterSlug: 'retail',
    enquiryHref: '/contact?interest=Paper%20bags&requirements=Enquiry%20for%20Travel%20%26%20Hospitality%20paper%20bags.'
  },
  {
    id: 'ecommerce',
    title: 'E-Commerce',
    categoryTag: 'POSTAL & DISPATCH',
    description: 'Gusseted mailer bags with tear-resistant fibers for retail brand parcel delivery.',
    image: APPROVED_ASSETS.industries.ecommerce,
    filterSlug: 'custom',
    enquiryHref: '/contact?interest=Paper%20bags&requirements=Enquiry%20for%20E-Commerce%20dispatch%20packaging.'
  },
  {
    id: 'electronics',
    title: 'Electronics',
    categoryTag: 'RIGID BASE CARRIERS',
    description: 'Structured block-bottom bags with reinforced cord handles for device boxes and accessories.',
    image: APPROVED_ASSETS.industries.electronics,
    filterSlug: 'retail',
    enquiryHref: '/contact?interest=Paper%20bags&requirements=Enquiry%20for%20Electronics%20retail%20bags.'
  },
  {
    id: 'fashion-retail',
    title: 'Fashion & Retail',
    categoryTag: 'BRAND-LED PACKAGING',
    description: 'Bleached ivory and tinted kraft shopping bags with crisp 2-colour flexo logo branding.',
    image: APPROVED_ASSETS.industries.fashionRetail,
    filterSlug: 'custom',
    enquiryHref: '/contact?interest=Paper%20bags&requirements=Enquiry%20for%20Fashion%20%26%20Retail%20shopping%20bags.'
  },
  {
    id: 'books-stationery',
    title: 'Books & Stationery',
    categoryTag: 'DURABLE FLAT BASE',
    description: 'Square-bottom carriers with high tensile paper cords designed to carry heavy publication loads.',
    image: APPROVED_ASSETS.industries.booksStationery,
    filterSlug: 'retail',
    enquiryHref: '/contact?interest=Paper%20bags&requirements=Enquiry%20for%20Books%20%26%20Stationery%20bags.'
  },
  {
    id: 'pharmaceuticals',
    title: 'Pharmaceuticals',
    categoryTag: 'COMPACT DISPENSING',
    description: 'Precision-folded counter bags for pharmacy dispensary orders and personal care products.',
    image: APPROVED_ASSETS.industries.pharmaceuticals,
    filterSlug: 'food',
    enquiryHref: '/contact?interest=Paper%20bags&requirements=Enquiry%20for%20Pharmaceutical%20counter%20bags.'
  },
  {
    id: 'groceries',
    title: 'Groceries',
    categoryTag: 'HIGH-VOLUME PRODUCTION',
    description: 'Self-standing unbleached kraft grocery sacks featuring deep side gussets for rapid counter packing.',
    image: APPROVED_ASSETS.industries.groceries,
    isFeatured: true,
    filterSlug: 'retail',
    enquiryHref: '/contact?interest=Paper%20bags&requirements=Enquiry%20for%20Grocery%20volume%20paper%20sacks.'
  },
  {
    id: 'quick-service-restaurants',
    title: 'Quick-Service Restaurants',
    categoryTag: 'HOT FOOD COMPATIBLE',
    description: 'Block-bottom takeaway bags engineered to transport hot food trays and cup carriers securely.',
    image: APPROVED_ASSETS.industries.quickServiceRestaurants,
    filterSlug: 'food',
    enquiryHref: '/contact?interest=Paper%20bags&requirements=Enquiry%20for%20QSR%20Takeaway%20packaging.'
  },
  {
    id: 'food-beverages',
    title: 'Food & Beverages',
    categoryTag: 'FOOD GRADE INKS',
    description: 'Certified water-based flexographic print on natural food-contact compatible virgin paper reels.',
    image: APPROVED_ASSETS.industries.foodBeverages,
    filterSlug: 'food',
    enquiryHref: '/contact?interest=Paper%20bags&requirements=Enquiry%20for%20Food%20%26%20Beverages%20packaging.'
  }
];
