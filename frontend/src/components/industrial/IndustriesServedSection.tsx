import React from 'react';
import Link from 'next/link';
import { ASSETS } from '@/content/assets';

interface IndustryItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  alt: string;
  typicalProducts: string[];
}

const INDUSTRIES: IndustryItem[] = [
  {
    id: 'food-bev',
    title: 'Food & Beverages',
    subtitle: 'Hygienic processing, bottling & packaging automation',
    description:
      'Washdown-ready stainless enclosures, IP66 HMI touchscreens, food-grade motor drives, and deterministic PLC sequence controls for beverage filling, bakeries and dairy plants.',
    image: ASSETS.industryFood,
    alt: 'Food and beverages industry automation application',
    typicalProducts: ['IP66 HMIs', 'Variable speed pump drives', 'High-speed rotary packaging PLCs']
  },
  {
    id: 'packaging-oems',
    title: 'Packaging OEMs',
    subtitle: 'Bag makers, cartoners, flow wrappers & conveyors',
    description:
      'High-speed motion controllers, multi-axis servo synchronization, electronic line shafting, tension regulation for paper web roll feeders, and flexographic print register units.',
    image: ASSETS.industryPackagingOEM,
    alt: 'Packaging OEMs machinery automation application',
    typicalProducts: ['Tension controllers', 'Multi-axis VFDs', 'Fast-scan modular I/O']
  },
  {
    id: 'water-wastewater',
    title: 'Water & Wastewater',
    subtitle: 'Pumping stations, treatment plants & distribution skids',
    description:
      'Cascaded pump macro VFDs, telemetry SCADA software, flow and pressure transmitter interfaces, and motor protection switchgear with low harmonic distortion.',
    image: ASSETS.industryWater,
    alt: 'Water treatment industrial automation application',
    typicalProducts: ['Pump macro VFDs', 'Telemetry SCADA', 'APFC capacitor panels']
  },
  {
    id: 'power',
    title: 'Power & Distribution',
    subtitle: 'Substations, HT/LT panels & energy monitoring',
    description:
      'Heavy-duty Air Circuit Breakers (ACB), intelligent microprocessor trip units, automatic power factor correction (APFC) relays, and centralized energy management software.',
    image: ASSETS.industryPower,
    alt: 'Power industry electrical distribution concept',
    typicalProducts: ['Air Circuit Breakers (ACB)', 'APFC relays', 'Power quality meters']
  },
  {
    id: 'oil-gas',
    title: 'Oil & Gas',
    subtitle: 'Hazardous area motor control & pipeline instrumentation',
    description:
      'Flameproof pushbuttons, hazardous area certified drive enclosures, redundant PLC hot-standby architectures, and high-breaking capacity switchgear for extreme operational environments.',
    image: ASSETS.industryOilGas,
    alt: 'Oil and gas industry heavy switchgear application',
    typicalProducts: ['Redundant PLC CPUs', 'Severe-duty switchgear', 'Hazardous area drives']
  }
];

export default function IndustriesServedSection(): JSX.Element {
  return (
    <section className="section industries-fullwidth-section" id="industries-section">
      <div className="wrap">
        <div className="section-head">
          <div>
            <div className="eyebrow">Target Industrial Sectors</div>
            <h2>
              Engineered for<br />
              critical industries.
            </h2>
          </div>
          <p>
            From packaging machinery OEMs to heavy utility infrastructure, our multi-brand sourcing supports tailored electrical requirements across demanding environments.
          </p>
        </div>

        <div className="industries-stack">
          {INDUSTRIES.map((ind, idx) => {
            const enquiryHref = `/contact?interest=Electrical%20%26%20automation&industry=${encodeURIComponent(
              ind.title
            )}&requirements=${encodeURIComponent(
              `Industrial enquiry for ${ind.title} sector. Need component recommendations and supply for ${ind.subtitle}.`
            )}`;

            return (
              <article key={ind.id} className="industry-full-row">
                <div className="industry-row-thumb">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={ind.image} alt={ind.alt} className="industry-thumb-img" />
                  <span className="industry-number-badge">0{idx + 1}</span>
                </div>

                <div className="industry-row-body">
                  <div className="industry-title-group">
                    <h3>{ind.title}</h3>
                    <span className="industry-sub">{ind.subtitle}</span>
                  </div>
                  <p className="industry-text">{ind.description}</p>
                  <div className="industry-tags-list">
                    {ind.typicalProducts.map((p, i) => (
                      <span key={i} className="industry-pill">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="industry-row-cta">
                  <Link
                    href={enquiryHref}
                    className="button secondary industry-enquire-btn"
                    id={`enquire-industry-${ind.id}`}
                  >
                    Enquire for {ind.title} <span className="arrow">↗</span>
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
