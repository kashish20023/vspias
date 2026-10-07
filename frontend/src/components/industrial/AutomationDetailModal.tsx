'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';

export interface AutomationItemData {
  id: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  alt: string;
  requirementsChecklist: {
    label: string;
    detail: string;
  }[];
  supportedBrands: string[];
}

export const AUTOMATION_DETAILED_ITEMS: AutomationItemData[] = [
  {
    id: 'plc',
    title: 'PLC & I/O Modules',
    tagline: 'Deterministic Machine & Process Control',
    description:
      'Programmable Logic Controllers and distributed I/O architectures for packaging machines, process skids and manufacturing plants. Sourcing covers compact controllers up to high-capacity modular racks with industrial Ethernet fieldbuses.',
    image: '/assets/reference/industry-ecommerce-shipping.png',
    alt: 'Schneider Modicon PLC product examples from the brochure',
    requirementsChecklist: [
      { label: 'I/O Count & Mix', detail: 'Digital input/output counts, analog 4–20mA/0–10V channels, RTD/TC temperature inputs' },
      { label: 'Protocols', detail: 'Modbus TCP, EtherNet/IP, PROFINET, PROFIBUS DP, CANopen' },
      { label: 'Execution Speed', detail: 'Cycle time & scan rate requirements for high-speed packing/motion' },
      { label: 'Redundancy', detail: 'Dual CPU hot-standby, redundant power supplies, ring network topology' }
    ],
    supportedBrands: ['Schneider Electric (Modicon)', 'Siemens (SIMATIC S7)', 'ABB (AC500)']
  },
  {
    id: 'vfd',
    title: 'VFDs & Variable Speed Drives',
    tagline: 'Precision Motor Speed, Torque & Energy Efficiency',
    description:
      'Low and medium voltage AC drives for variable torque pumps and fans, constant torque conveyors, extruders and packaging web tension control. Includes integrated EMC filters and safe torque off (STO).',
    image: '/assets/reference/company-brochure-pdf.png',
    alt: 'Altivar drive product examples from brochure',
    requirementsChecklist: [
      { label: 'Motor Ratings', detail: 'Power (0.37 kW to 500 kW+), full load amperes, motor voltage & frequency' },
      { label: 'Duty Cycle', detail: 'Normal duty (variable torque / pumps) vs Heavy duty (conveyors / winders)' },
      { label: 'Harmonics & Filters', detail: 'Line chokes, dV/dt output filters, braking resistors for regenerative loads' },
      { label: 'Safety Functions', detail: 'Safe Torque Off (SIL3 / PLe), Safe Stop 1, communication bus cards' }
    ],
    supportedBrands: ['Schneider Electric (Altivar)', 'ABB (ACS series)', 'Siemens (SINAMICS)']
  },
  {
    id: 'hmi',
    title: 'HMI Interfaces',
    tagline: 'Operator Touchscreens & Visualisation Units',
    description:
      'Industrial touchscreen panels from 4-inch operator displays to 15-inch widescreen multi-touch glass front units. High ambient brightness, IP65/IP66 front ratings and extensive multi-driver PLC connectivity.',
    image: '/assets/reference/detail-bag-kraft-variant.png',
    alt: 'HMI product examples from brochure',
    requirementsChecklist: [
      { label: 'Screen Size & Type', detail: '4.3", 7", 10", 12", 15" TFT color touchscreens, capacitive or resistive' },
      { label: 'Environmental Rating', detail: 'IP65 front bezel for washdown and dusty factory environments' },
      { label: 'Connectivity', detail: 'Ethernet RJ45, RS485/RS232 serial ports, USB recipe transfer' },
      { label: 'Software Features', detail: 'Data logging, alarm history, recipe management, multi-level user passwords' }
    ],
    supportedBrands: ['Schneider Electric (Harmony)', 'Siemens (SIMATIC Comfort)', 'ABB (CP600)']
  },
  {
    id: 'panels',
    title: 'Industrial Control Panels',
    tagline: 'MCC, PCC, APFC & Tailored Enclosures',
    description:
      'Engineered electrical panels built to standard industrial fault levels and Form segregation. Comprehensive design and component supply for Motor Control Centers (MCC), Power Control Centers (PCC), APFC capacitor banks, and PLC/VFD automation panels.',
    image: '/assets/reference/detail-bag-food-variant.png',
    alt: 'Control panel image from brochure',
    requirementsChecklist: [
      { label: 'Panel Classification', detail: 'MCC, PCC, APFC (Power Factor Correction), PLC/HMI, VFD starter panel' },
      { label: 'Fault Rating & Form', detail: 'Busbar fault rating (up to 50kA/1s), Form 2b / Form 3b / Form 4 separation' },
      { label: 'Ingress Protection', detail: 'IP42 indoor standard to IP55 / IP65 outdoor weatherproof enclosures' },
      { label: 'Thermal Management', detail: 'Forced ventilation with dust filters or dedicated panel air conditioning' }
    ],
    supportedBrands: ['Custom Fabrication', 'Larsen & Toubro', 'Schneider Electric', 'ABB']
  },
  {
    id: 'scada',
    title: 'SCADA Software & Telemetry',
    tagline: 'Plant-Wide Supervisory Control & Data Acquisition',
    description:
      'Scalable SCADA architectures for real-time plant monitoring, historical trending, batch reporting and alarm notification. Interfaces across distributed PLCs, energy meters and smart switchgear.',
    image: '/assets/reference/detail-bag-custom-variant.png',
    alt: 'SCADA visual from brochure',
    requirementsChecklist: [
      { label: 'Tag Count & Architecture', detail: 'Server-client licensing, runtime tag counts (500 to 50,000+ tags)' },
      { label: 'Database & Archiving', detail: 'SQL database historian logging, production batch reporting, OEE tracking' },
      { label: 'Industrial Protocols', detail: 'OPC UA, OPC DA, Modbus, MQTT for cloud telemetry' },
      { label: 'Web Clients', detail: 'HTML5 remote browser access for control rooms and mobile maintenance tablets' }
    ],
    supportedBrands: ['Schneider (EcoStruxure / Citect)', 'Siemens (WinCC)', 'AVEVA / Wonderware']
  },
  {
    id: 'switchgear',
    title: 'Switchgear & Power Protection',
    tagline: 'Circuit Breakers, Contactors & Motor Starters',
    description:
      'Complete low-voltage electrical distribution and motor protection portfolio. Air Circuit Breakers (ACB), Moulded Case Circuit Breakers (MCCB), Miniature Circuit Breakers (MCB), contactors, thermal overload relays and motor protection circuit breakers.',
    image: '/assets/reference/automation-card-control-panel.png',
    alt: 'Switchgear product examples from brochure',
    requirementsChecklist: [
      { label: 'Current & Voltage Ratings', detail: 'Frame ratings from 9A contactors up to 4000A ACBs at 415V/690V' },
      { label: 'Breaking Capacity (Icu)', detail: 'Short-circuit ratings: 10kA, 16kA, 25kA, 36kA, 50kA, 70kA' },
      { label: 'Protection Relays', detail: 'Microprocessor trip units with LSIG (Long, Short, Instantaneous, Ground fault)' },
      { label: 'Coil & Auxiliaries', detail: 'Auxiliary contacts, shunt trips, undervoltage releases, motorized mechanisms' }
    ],
    supportedBrands: ['Schneider Electric (Compact NSX/EasyPact)', 'ABB (SACE/Tmax)', 'Larsen & Toubro', 'Siemens (SENTRON)']
  }
];

interface AutomationDetailModalProps {
  item: AutomationItemData | null;
  onClose: () => void;
}

export default function AutomationDetailModal({ item, onClose }: AutomationDetailModalProps): JSX.Element | null {
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!item) return;

    closeBtnRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [item, onClose]);

  if (!item) return null;

  const enquiryUrl = `/contact?interest=Electrical%20%26%20automation&requirements=${encodeURIComponent(
    `I would like to discuss requirements for ${item.title}. Need assistance with component sizing, brand availability and Bill of Materials quotation.`
  )}`;

  return (
    <div
      className="vspias-modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-auto-title"
    >
      <div className="vspias-modal-content auto-modal-content">
        <div className="modal-header">
          <div className="eyebrow" style={{ marginBottom: 8, color: 'var(--lime)' }}>
            ELECTRICAL &amp; AUTOMATION SPECIFICATIONS
          </div>
          <h2 id="modal-auto-title" style={{ fontSize: 'clamp(28px, 4vw, 36px)', color: '#ffffff' }}>
            {item.title}
          </h2>
          <button
            type="button"
            className="modal-close-btn"
            ref={closeBtnRef}
            onClick={onClose}
            aria-label="Close specifications dialog"
          >
            ✕
          </button>
        </div>

        <div className="modal-body-grid">
          <div className="modal-media" style={{ background: '#0e1814', padding: '16px', borderRadius: '4px' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.image}
              alt={item.alt}
              style={{ maxHeight: '280px', width: '100%', objectFit: 'contain' }}
            />
            <div style={{ marginTop: '16px', color: '#c7d6ce', fontSize: '12px' }}>
              <strong>Brand references:</strong>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '6px' }}>
                {item.supportedBrands.map((b, i) => (
                  <span
                    key={i}
                    style={{
                      background: 'rgba(213, 237, 134, 0.12)',
                      color: 'var(--lime)',
                      padding: '3px 8px',
                      borderRadius: '3px',
                      fontSize: '11px'
                    }}
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>
            <p className="note" style={{ marginTop: '12px', color: '#8fa89b' }}>
              Product photos reproduced from company brochure. Model numbers and authorised status confirmed per project.
            </p>
          </div>

          <div className="modal-info">
            <h3 style={{ fontSize: '18px', color: '#ffffff', marginBottom: '8px' }}>
              {item.tagline}
            </h3>
            <p style={{ color: '#c7d6ce', fontSize: '14px', lineHeight: 1.6 }}>
              {item.description}
            </p>

            <div className="modal-specs" style={{ marginTop: '20px' }}>
              <h4 style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--lime)', marginBottom: '10px' }}>
                Technical Requirements Checklist
              </h4>
              <table className="spec-table" style={{ width: '100%', fontSize: '13px' }}>
                <tbody>
                  {item.requirementsChecklist.map((req, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                      <td style={{ fontWeight: 600, color: '#ffffff', padding: '8px 10px 8px 0', width: '36%' }}>
                        {req.label}
                      </td>
                      <td style={{ padding: '8px 0', color: '#c7d6ce' }}>{req.detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="modal-actions" style={{ marginTop: '24px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link
                href={enquiryUrl}
                className="button lime"
                onClick={onClose}
                id="modal-discuss-requirements-btn"
              >
                Discuss Requirements for {item.title.split(' ')[0]} <span className="arrow">↗</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
