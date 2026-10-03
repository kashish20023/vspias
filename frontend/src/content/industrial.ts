import { ASSETS } from './assets';

export const AUTOMATION_OVERVIEW = {
  eyebrow: 'Our electrical & automation portfolio',
  heading: 'The engineering\nbehind the\npossibilities.',
  description:
    'Multi-brand electrical and industrial materials for panel builders, contractors and industrial clients.',
  categoryTags: [
    'PLC & I/O',
    'HMI',
    'VFD & drives',
    'SCADA',
    'Control panels',
    'Switchgear'
  ],
  brandProvenance: 'Brands in the supplied product brochure',
  brands: [
    'Schneider Electric',
    'ABB',
    'SIEMENS',
    'Larsen & Toubro'
  ],
  image: ASSETS.automationOverview
} as const;

export const MANUFACTURING_PROCESS_STEPS = [
  {
    number: '01 / CONFIGURE',
    title: 'Paper bag\nmachine',
    description: 'Discuss bag style, dimensions and required production capacity.'
  },
  {
    number: '02 / PERSONALISE',
    title: 'Printing',
    description: 'Explore flexographic printing and colour configurations.'
  },
  {
    number: '03 / PRODUCE',
    title: 'Production',
    description: 'Align materials and machine configuration with your output needs.'
  },
  {
    number: '04 / DELIVER THE IDEA',
    title: 'Finished\npaper bag',
    description: 'Define the finished bag and application before finalising the setup.'
  }
] as const;

export const PRINTING_OVERVIEW = {
  eyebrow: 'Flexographic printing solutions',
  heading: 'Your brand.\nIn every\nimpression.',
  description:
    'Explore 2-colour flexographic printing solutions for paper bag and packaging applications.',
  bigNumber: '02',
  overprintText: 'Colours.\nEndless ideas.',
  specsMini: [
    { label: 'Colour configuration', value: '2-colour option' },
    { label: 'Printing width & speed', value: 'Confirm by model' },
    { label: 'Substrate compatibility', value: 'Confirm by application' }
  ],
  artBottomLeft: 'FLEXOGRAPHIC PRINTING',
  artBottomRight: 'VSPIAS ↗',
  artNote: 'Concept graphic · Machine photographs & video to be supplied',
  ctaText: 'Explore Printing Solutions',
  ctaHref: '/printing'
} as const;

export const INDUSTRIES_SERVED = [
  {
    title: 'Food & Beverages',
    alt: 'Food and beverages',
    image: ASSETS.industryFood
  },
  {
    title: 'Packaging OEMs',
    alt: 'Paper packaging',
    image: ASSETS.industryPackagingOEM
  },
  {
    title: 'Water & Wastewater',
    alt: 'Water treatment',
    image: ASSETS.industryWater
  },
  {
    title: 'Power',
    alt: 'Power industry concept',
    image: ASSETS.industryPower
  },
  {
    title: 'Oil & Gas',
    alt: 'Oil and gas industry',
    image: ASSETS.industryOilGas
  }
] as const;

export const INDUSTRIES = INDUSTRIES_SERVED;

export const ABOUT_STRIP = {
  heading: 'A practical partner.\nA forward-looking focus.',
  description:
    'VSPIAS Ecoautomation brings a professionally managed approach to sourcing electrical and industrial materials. Our next chapter puts paper bags, printing and manufacturing solutions at the centre of the conversation.'
} as const;

export const AUTOMATION_CATALOGUE_ITEMS = [
  {
    id: 'plc',
    title: 'PLC & I/O modules',
    description:
      'Explore machine and process control options, including Modicon and SIMATIC families in the supplied brochure.',
    image: ASSETS.plc,
    alt: 'Schneider Modicon PLC product examples from the brochure'
  },
  {
    id: 'vfd',
    title: 'VFD & drives',
    description:
      'Discuss drive selection for the motor, load, environment and control requirements of your application.',
    image: ASSETS.vfd,
    alt: 'Altivar drive product examples from brochure'
  },
  {
    id: 'hmi',
    title: 'HMI interfaces',
    description:
      'Operator interfaces for viewing process data, alarms and machine controls.',
    image: ASSETS.hmi,
    alt: 'HMI product examples from brochure'
  },
  {
    id: 'panels',
    title: 'Industrial panels',
    description:
      'MCC, PCC, APFC, PLC/HMI and VFD control panel requirements.',
    image: ASSETS.panels,
    alt: 'Control panel image from brochure'
  },
  {
    id: 'scada',
    title: 'SCADA software',
    description:
      'Process monitoring, visualisation and supervisory control requirements.',
    image: ASSETS.scada,
    alt: 'SCADA visual from brochure'
  },
  {
    id: 'switchgear',
    title: 'Switchgear & protection',
    description:
      'Circuit breakers, contactors, overload relays, motor protection and associated accessories.',
    image: ASSETS.switchgear,
    alt: 'Switchgear product examples from brochure'
  }
] as const;
