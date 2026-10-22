/**
 * VSPIAS Reference Assets Registry
 * Strictly mapped to verified original source DOM roles and content hashes (SHA-256)
 * from references/VSPIAS-Interactive-UI.html
 */

export interface AssetMeta {
  role: string;
  filename: string;
  publicPath: string;
  sizeBytes: number;
  mimeType: string;
  sha256Prefix: string;
  fullSha256: string;
  altText: string;
}

export const VERIFIED_SOURCE_ASSETS: AssetMeta[] = [
  {
    role: 'logo',
    filename: 'vspias-logo.png',
    publicPath: '/assets/reference/vspias-logo.png',
    sizeBytes: 186054,
    mimeType: 'image/png',
    sha256Prefix: '145ab5d5cca5',
    fullSha256: '145ab5d5cca54737eef8c9027d516aab4369959f3a3a7cf9a4a86de822a08bfe',
    altText: 'VSPIAS Ecoautomation Pvt Ltd'
  },
  {
    role: 'bagArtwork',
    filename: 'hero-packaging.jpg',
    publicPath: '/assets/reference/hero-packaging.jpg',
    sizeBytes: 307875,
    mimeType: 'image/jpeg',
    sha256Prefix: '1cc5f9c08fe6',
    fullSha256: '1cc5f9c08fe65fb5c86348571d7eb624d916c5da73fc88c4a52a76c6ea4349d9',
    altText: 'Illustrative kraft, forest-green and ivory paper bag concepts'
  },
  {
    role: 'foodPackaging',
    filename: 'product-ivory-packaging.png',
    publicPath: '/assets/reference/product-ivory-packaging.png',
    sizeBytes: 60351,
    mimeType: 'image/png',
    sha256Prefix: '88bbb7bf5d54',
    fullSha256: '88bbb7bf5d54c5a173068263c14163e191c18fd2442214a24092660a55138ec0',
    altText: 'Paper packaging illustration from the VSPIAS brochure'
  },
  {
    role: 'automationOverview',
    filename: 'product-counter-bags.png',
    publicPath: '/assets/reference/product-counter-bags.png',
    sizeBytes: 146097,
    mimeType: 'image/png',
    sha256Prefix: '517f93a4654b',
    fullSha256: '517f93a4654b216cf76003a998837d7105f8d29324482d4a493d9df3ddcad371',
    altText: 'Collage illustration of industrial automation equipment from the brochure'
  },
  {
    role: 'industryFood',
    filename: 'product-white-grocery-bags.png',
    publicPath: '/assets/reference/product-white-grocery-bags.png',
    sizeBytes: 124238,
    mimeType: 'image/png',
    sha256Prefix: 'addf17b38e98',
    fullSha256: 'addf17b38e98d09a92e4b6f7a898ca8ccf6343e05afd82efd35f3f9a1a8e0613',
    altText: 'Food and beverages'
  },
  {
    role: 'industryWater',
    filename: 'automation-equipment-illustration.png',
    publicPath: '/assets/reference/automation-equipment-illustration.png',
    sizeBytes: 117107,
    mimeType: 'image/png',
    sha256Prefix: 'da6cc911db28',
    fullSha256: 'da6cc911db28b8053bf981e1ac96c9d136cf28c16572bebd5ef2346a5f0d132c',
    altText: 'Water treatment'
  },
  {
    role: 'industryPower',
    filename: 'industry-food-delivery.png',
    publicPath: '/assets/reference/industry-food-delivery.png',
    sizeBytes: 104841,
    mimeType: 'image/png',
    sha256Prefix: '7c720a6b9afd',
    fullSha256: '7c720a6b9afddda8c366062a82a9876979f84e6d747870d6a2fc163571af96ce',
    altText: 'Power industry concept'
  },
  {
    role: 'industryOilGas',
    filename: 'industry-retail-fashion.png',
    publicPath: '/assets/reference/industry-retail-fashion.png',
    sizeBytes: 89172,
    mimeType: 'image/png',
    sha256Prefix: '66d34ed41c43',
    fullSha256: '66d34ed41c43828ea43566cf4d26c7ed18b246ae7f0106c37fd71d9c71b44110',
    altText: 'Oil and gas industry'
  },
  {
    role: 'plc',
    filename: 'industry-ecommerce-shipping.png',
    publicPath: '/assets/reference/industry-ecommerce-shipping.png',
    sizeBytes: 138738,
    mimeType: 'image/png',
    sha256Prefix: 'f6bf074216ab',
    fullSha256: 'f6bf074216abf3acd8f0da33a12a8eddc85cdb17cf439c803717be29769f600f',
    altText: 'Schneider Modicon PLC product examples from the brochure'
  },
  {
    role: 'vfd',
    filename: 'company-brochure-pdf.png',
    publicPath: '/assets/reference/company-brochure-pdf.png',
    sizeBytes: 84837,
    mimeType: 'image/png',
    sha256Prefix: 'c7e42bffe157',
    fullSha256: 'c7e42bffe15782183fc212d77f486bbe9fb5679557ea72d3cc27d80e2aa84ea6',
    altText: 'Altivar drive product examples from brochure'
  },
  {
    role: 'hmi',
    filename: 'detail-bag-kraft-variant.png',
    publicPath: '/assets/reference/detail-bag-kraft-variant.png',
    sizeBytes: 107140,
    mimeType: 'image/png',
    sha256Prefix: '5d94e34ef491',
    fullSha256: '5d94e34ef49105300893f96661257b3662cf42e0a287ca48a548203a2a786c4d',
    altText: 'HMI product examples from brochure'
  },
  {
    role: 'panels',
    filename: 'detail-bag-food-variant.png',
    publicPath: '/assets/reference/detail-bag-food-variant.png',
    sizeBytes: 985082,
    mimeType: 'image/png',
    sha256Prefix: '63c9478e976c',
    fullSha256: '63c9478e976cdd7899d565e75ab3b60d31576a4ddcba4f478d25939be79b355a',
    altText: 'Control panel image from brochure'
  },
  {
    role: 'scada',
    filename: 'detail-bag-custom-variant.png',
    publicPath: '/assets/reference/detail-bag-custom-variant.png',
    sizeBytes: 274912,
    mimeType: 'image/png',
    sha256Prefix: '8e62529e384f',
    fullSha256: '8e62529e384fe33f9dd04f50b1adc82dc3881fd364b2b9cd553154422c697d56',
    altText: 'SCADA visual from brochure'
  },
  {
    role: 'switchgear',
    filename: 'automation-card-control-panel.png',
    publicPath: '/assets/reference/automation-card-control-panel.png',
    sizeBytes: 267756,
    mimeType: 'image/png',
    sha256Prefix: 'd41f35344fe2',
    fullSha256: 'd41f35344fe2c34a5b797ad1117d200a560b2cdad633ff6fb71275b6323a07ef',
    altText: 'Switchgear product examples from brochure'
  },
  {
    role: 'companyBrochure',
    filename: 'vspias-company-brochure.pdf',
    publicPath: '/downloads/vspias-company-brochure.pdf',
    sizeBytes: 12558669,
    mimeType: 'application/pdf',
    sha256Prefix: '92ac82986bec',
    fullSha256: '92ac82986bec6f3e4122d575c37092a9eaf608c55089204fade4f3caf7601302',
    altText: 'VSPIAS Ecoautomation Company Brochure PDF'
  }
];

export const ASSETS = {
  // Brand & Document
  logo: '/assets/reference/vspias-logo.png',
  logoWhite: '/assets/reference/vspias-logo.png',
  logoDarkBg: '/assets/reference/vspias-logo-white.png',
  companyBrochurePdf: '/downloads/vspias-company-brochure.pdf',
  paperBrochurePdf: '/assets/paper-bags-brochure.pdf',

  // Approved Package Derivatives (from VSPIAS-Antigravity-Image-First-Package)
  heroBags: '/assets/approved/01-hero-bags.png',
  aboutBags: '/assets/approved/02-about-bags.png',
  businessHighlightsCollage: '/assets/approved/05-highlights-collage.png',

  // Core Packaging Artwork (hero, kraft card, custom card, custom section, kraft/custom detail)
  bagArtwork: '/assets/reference/hero-packaging.jpg',

  // Food Packaging (food card, food detail, Packaging OEMs industry)
  foodPackaging: '/assets/reference/product-ivory-packaging.png',

  // Automation Overview collage in #automation-section
  automationOverview: '/assets/reference/product-counter-bags.png',

  // Industries (5 photo cards)
  industryFood: '/assets/reference/product-white-grocery-bags.png',
  industryPackagingOEM: '/assets/reference/product-ivory-packaging.png',
  industryWater: '/assets/reference/automation-equipment-illustration.png',
  industryPower: '/assets/reference/industry-food-delivery.png',
  industryOilGas: '/assets/reference/industry-retail-fashion.png',

  // Automation catalogue (6 product cards)
  plc: '/assets/reference/industry-ecommerce-shipping.png',
  vfd: '/assets/reference/company-brochure-pdf.png',
  hmi: '/assets/reference/detail-bag-kraft-variant.png',
  panels: '/assets/reference/detail-bag-food-variant.png',
  scada: '/assets/reference/detail-bag-custom-variant.png',
  switchgear: '/assets/reference/automation-card-control-panel.png',

  // Four New Approved Assets (VSPIAS-Visual-Fixes-20261008 distinct keys)
  automationHardware: '/images/automation/automation-hardware-premium.webp',
  paperBagsCollection: '/images/paper-bags/paper-bags-collection-premium.webp',
  paperHandlesDetail: '/images/paper-bags/paper-handles-detail-premium.webp',
  kraftCarryBags: '/images/paper-bags/kraft-carry-bags-premium.webp'
} as const;

export const APPROVED_ASSETS = {
  heroBags: '/assets/approved/01-hero-bags.png',
  aboutBags: '/assets/approved/02-about-bags.png',
  businessHighlightsCollage: '/assets/approved/05-highlights-collage.png',
  automationHardware: '/images/automation/automation-hardware-premium.webp',
  paperBagsCollection: '/images/paper-bags/paper-bags-collection-premium.webp',
  paperHandlesDetail: '/images/paper-bags/paper-handles-detail-premium.webp',
  kraftCarryBags: '/images/paper-bags/kraft-carry-bags-premium.webp',
  automationHardwarePng: '/assets/approved/automation-hardware-premium.png',
  paperBagsCollectionPng: '/assets/approved/paper-bags-collection-premium.png',
  paperHandlesDetailPng: '/assets/approved/paper-handles-detail-premium.png',
  kraftCarryBagsPng: '/assets/approved/kraft-carry-bags-premium.png',
  highlightTiles: {
    kraftBags: '/assets/approved/05-highlight-tile-kraft-bags.png',
    pouch: '/assets/approved/05-highlight-tile-pouch.png',
    handles: '/assets/approved/05-highlight-tile-handles.png',
    whiteKraft: '/assets/approved/05-highlight-tile-white-kraft.png',
  },
  industries: {
    agricultureProduce: '/assets/approved/01-agriculture-produce.png',
    supermarkets: '/assets/approved/02-supermarkets.png',
    bakery: '/assets/approved/03-bakery.png',
    travel: '/assets/approved/04-travel.png',
    ecommerce: '/assets/approved/05-ecommerce.png',
    electronics: '/assets/approved/06-electronics.png',
    fashionRetail: '/assets/approved/07-fashion-retail.png',
    booksStationery: '/assets/approved/08-books-stationery.png',
    pharmaceuticals: '/assets/approved/09-pharmaceuticals.png',
    groceries: '/assets/approved/10-groceries.png',
    quickServiceRestaurants: '/assets/approved/11-quick-service-restaurants.png',
    foodBeverages: '/assets/approved/12-food-beverages.png',
  }
} as const;

export type AssetKey = keyof typeof ASSETS;
