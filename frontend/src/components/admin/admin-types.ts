export type AdminView = 'overview' | 'catalogue' | 'enquiries' | 'media' | 'publishing';

export interface ProductItem {
  id: string;
  name: string;
  brand: string;
  category: string;
  division: 'paper' | 'automation';
  image: string;
  alt: string;
  description: string;
  source: string;
  sourcePage: number | null;
  illustrative: boolean;
  visible: boolean;
  order: number;
}

export interface CatalogData {
  schemaVersion: number;
  brochure: string;
  paperBrochure?: string;
  products: ProductItem[];
}

export interface CatalogState {
  revision: number;
  publishedAt: string | null;
  published: CatalogData;
  draft: CatalogData;
}

export interface EnquiryRecord {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  division?: string;
  company?: string;
  quantity?: string;
  bagFinish?: string;
  brandName?: string;
  industrySector?: string;
  [key: string]: unknown;
}

export interface DiffRow {
  id?: string;
  name: string;
  type: 'Added' | 'Updated' | 'Removed';
  description: string;
}

export interface FilterState {
  catalogue: string;
  division: 'all' | 'paper' | 'automation';
  visibility: 'all' | 'visible' | 'hidden';
  enquiries: string;
  enquiryDivision: 'all' | 'paper' | 'automation';
  enquiryPeriod: 'all' | '7' | '30';
  chartDays: 7 | 14;
}
