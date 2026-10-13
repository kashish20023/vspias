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
    description: 'Ventilated, breathable kraft sacks engineered for fresh farm produce, grains, and bulk agricultural harvest transport.',
    image: APPROVED_ASSETS.industries.agricultureProduce,
    isFeatured: true,
    filterSlug: 'retail',
    enquiryHref: '/contact?interest=Paper%20bags&requirements=Enquiry%20for%20Agriculture%20%26%20Produce%20packaging%20bags.'
  },
  {
    id: 'supermarkets',
    title: 'Supermarkets',
    categoryTag: 'HIGH-CAPACITY CARRY',
    description: 'Flat and twisted handle grocery carriers engineered with reinforced bases for checkout counter packing and retail shopping.',
    image: APPROVED_ASSETS.industries.supermarkets,
    filterSlug: 'retail',
    enquiryHref: '/contact?interest=Paper%20bags&requirements=Enquiry%20for%20Supermarket%20carry%20bags.'
  },
  {
    id: 'bakery',
    title: 'Bakery',
    categoryTag: 'GREASE RESISTANT',
    description: 'Pinch-bottom and windowed kraft pouches designed for artisanal bread loaves, warm patisseries, and fresh bakery counter display.',
    image: APPROVED_ASSETS.industries.bakery,
    filterSlug: 'food',
    enquiryHref: '/contact?interest=Paper%20bags&requirements=Enquiry%20for%20Bakery%20paper%20packaging.'
  },
  {
    id: 'travel',
    title: 'Travel & Hospitality',
    categoryTag: 'AMENITY & RETAIL',
    description: 'Compact boutique carriers with twisted paper handles tailored for airport duty-free retail, hotel amenities, and souvenir gifting.',
    image: APPROVED_ASSETS.industries.travel,
    filterSlug: 'retail',
    enquiryHref: '/contact?interest=Paper%20bags&requirements=Enquiry%20for%20Travel%20%26%20Hospitality%20paper%20bags.'
  },
  {
    id: 'ecommerce',
    title: 'E-Commerce',
    categoryTag: 'POSTAL & DISPATCH',
    description: 'Gusseted mailer bags engineered with durable kraft fibers and secure closure strips for online order fulfillment and parcel transit.',
    image: APPROVED_ASSETS.industries.ecommerce,
    filterSlug: 'custom',
    enquiryHref: '/contact?interest=Paper%20bags&requirements=Enquiry%20for%20E-Commerce%20dispatch%20packaging.'
  },
  {
    id: 'electronics',
    title: 'Electronics',
    categoryTag: 'RIGID BASE CARRIERS',
    description: 'Structured block-bottom bags with reinforced paper handles designed to carry boxed electronic devices, accessories, and tech items.',
    image: APPROVED_ASSETS.industries.electronics,
    filterSlug: 'retail',
    enquiryHref: '/contact?interest=Paper%20bags&requirements=Enquiry%20for%20Electronics%20retail%20bags.'
  },
  {
    id: 'fashion-retail',
    title: 'Fashion & Retail',
    categoryTag: 'BRAND-LED PACKAGING',
    description: 'Bleached ivory and natural kraft shopping bags with custom flexographic branding tailored for apparel boutiques and lifestyle stores.',
    image: APPROVED_ASSETS.industries.fashionRetail,
    filterSlug: 'custom',
    enquiryHref: '/contact?interest=Paper%20bags&requirements=Enquiry%20for%20Fashion%20%26%20Retail%20shopping%20bags.'
  },
  {
    id: 'books-stationery',
    title: 'Books & Stationery',
    categoryTag: 'DURABLE FLAT BASE',
    description: 'Square-bottom carriers with high-tensile paper handles designed to carry heavy hardcover books, art supplies, and printed literature.',
    image: APPROVED_ASSETS.industries.booksStationery,
    filterSlug: 'retail',
    enquiryHref: '/contact?interest=Paper%20bags&requirements=Enquiry%20for%20Books%20%26%20Stationery%20bags.'
  },
  {
    id: 'pharmaceuticals',
    title: 'Pharmaceuticals',
    categoryTag: 'COMPACT DISPENSING',
    description: 'Precision-folded counter bags engineered for secure pharmacy prescription dispensing, healthcare goods, and personal care retail.',
    image: APPROVED_ASSETS.industries.pharmaceuticals,
    filterSlug: 'food',
    enquiryHref: '/contact?interest=Paper%20bags&requirements=Enquiry%20for%20Pharmaceutical%20counter%20bags.'
  },
  {
    id: 'groceries',
    title: 'Groceries',
    categoryTag: 'HIGH-VOLUME PRODUCTION',
    description: 'Self-standing unbleached kraft grocery sacks featuring deep side gussets and sturdy bases for quick checkout packing and bulk carry.',
    image: APPROVED_ASSETS.industries.groceries,
    isFeatured: true,
    filterSlug: 'retail',
    enquiryHref: '/contact?interest=Paper%20bags&requirements=Enquiry%20for%20Grocery%20volume%20paper%20sacks.'
  },
  {
    id: 'quick-service-restaurants',
    title: 'Quick-Service Restaurants',
    categoryTag: 'HOT FOOD COMPATIBLE',
    description: 'Block-bottom takeaway bags engineered with wide gussets to accommodate hot food containers, beverage trays, and meal delivery orders.',
    image: APPROVED_ASSETS.industries.quickServiceRestaurants,
    filterSlug: 'food',
    enquiryHref: '/contact?interest=Paper%20bags&requirements=Enquiry%20for%20QSR%20Takeaway%20packaging.'
  },
  {
    id: 'food-beverages',
    title: 'Food & Beverages',
    categoryTag: 'FOOD GRADE INKS',
    description: 'Food-contact compatible paper bags finished with water-based flexographic inks for cafes, takeaway beverage counters, and food stalls.',
    image: APPROVED_ASSETS.industries.foodBeverages,
    filterSlug: 'food',
    enquiryHref: '/contact?interest=Paper%20bags&requirements=Enquiry%20for%20Food%20%26%20Beverages%20packaging.'
  }
];
