export interface FAQItem {
  question: string;
  answer: string;
}

export const INTEREST_OPTIONS = [
  'Paper bags',
  'Machinery & printing',
  'Electrical & automation'
] as const;

export const FIELD_PLACEHOLDERS = {
  default: {
    label: 'Approximate quantity',
    placeholder: 'e.g. bags per order'
  },
  machine: {
    label: 'Target output / required capacity',
    placeholder: 'e.g. bags per minute, required print width'
  },
  automation: {
    label: 'Product / model / quantity',
    placeholder: 'e.g. product family, rating, quantity'
  }
} as const;

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'Can I enquire about custom-printed paper bags?',
    answer:
      'Yes. Share your artwork requirements, colours, bag size and expected quantity. Availability and printing configuration are confirmed with the quotation.'
  },
  {
    question: 'What is needed to recommend a printing machine?',
    answer:
      'Paper type, GSM, web or print width, colour count, target output and how the printer will fit into the wider production workflow.'
  },
  {
    question: 'Where can I see technical specifications?',
    answer:
      'Approved machine datasheets, videos and exact specifications are pending. Request model-specific details directly; the company brochure currently covers electrical and automation products.'
  }
];

export const FAQS = FAQ_ITEMS;

export const CONTACT_PAGE_DATA = {
  eyebrow: "Let's make it happen",
  heading: 'Good things\nstart with a\nconversation.',
  description: 'Tell us what you need. We will use your requirements to start the right discussion.',
  contactPerson: {
    name: 'Paawan Bhargava',
    phone: '+91 97831 33333',
    phoneTel: 'tel:+919783133333',
    email: 'info@vspias.in',
    emailMailto: 'mailto:info@vspias.in',
    addressLine1: '#66, 6th Main Road, behind UCO Bank,',
    addressLine2: 'Peenya, Bengaluru 560058,',
    addressLine3: 'Karnataka, India.',
    note: 'Address supplied for the design; confirm the exact business location before launch.'
  }
} as const;
