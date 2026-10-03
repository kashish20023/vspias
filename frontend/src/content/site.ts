/**
 * Site-wide configuration and global brand content
 * Source-faithful to references/VSPIAS-Interactive-UI.html
 */

export interface NavigationItem {
  label: string;
  href: string;
}

export const SITE_CONFIG = {
  name: 'VSPIAS ECOAUTOMATION PVT. LTD.',
  shortName: 'VSPIAS',
  tagline: 'Paper bags. Printing. Possibilities.\nPowering Industrial Excellence.',
  topbarText: 'PAPER BAGS · PRINTING · MANUFACTURING SOLUTIONS',
  location: 'Bengaluru, India',
  fullAddress: 'Peenya, Bengaluru, Karnataka, India',
  phone: '+91 97831 33333',
  phoneRaw: '919783133333',
  email: 'info@vspias.in',
  contactPerson: 'Paawan Bhargava',
  addressDetailed: '#66, 6th Main Road, behind UCO Bank, Peenya, Bengaluru 560058, Karnataka, India.',
  copyright: '© VSPIAS Ecoautomation Pvt. Ltd. · Website design concept',
  copyrightSubtitle: 'Paper bag focus / Desktop + mobile / V1 · October 2026'
} as const;

export const MAIN_NAV_ITEMS: NavigationItem[] = [
  { label: 'Paper Bags', href: '/paper-bags' },
  { label: 'Machines & Printing', href: '/industrial-solutions' },
  { label: 'Automation', href: '/automation' },
  { label: 'About', href: '/industrial-solutions#about-section' },
  { label: 'Contact', href: '/contact' }
];

export const FOOTER_NAV_ITEMS: NavigationItem[] = [
  { label: 'Paper Bags', href: '/paper-bags' },
  { label: 'Machines & Printing', href: '/industrial-solutions' },
  { label: 'Electrical & Automation', href: '/automation' }
];

export const SCOPE_STRIP_ITEMS = [
  {
    num: '01',
    title: 'Paper bags for your business',
    subtitle: 'Explore styles & custom printing'
  },
  {
    num: '02',
    title: 'Machinery & printing solutions',
    subtitle: 'Discuss your production requirements'
  },
  {
    num: '03',
    title: 'Electrical & automation expertise',
    subtitle: 'Discover the existing product portfolio'
  }
] as const;

export const SHARED_CTA = {
  heading: 'What would you\nlike to make?',
  description:
    'A paper bag for your brand. A printing requirement. A new production line. Start with your idea.',
  buttonText: "Let's Talk About Your Project",
  buttonHref: '/contact'
} as const;
