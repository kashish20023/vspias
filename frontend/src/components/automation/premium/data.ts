// Auto-generated authoritative product and model data from VSPIAS Automation Refined Kit

export interface AutomationProduct {
  id: string;
  name: string;
  brand: string;
  category: string;
  division: string;
  alt: string;
  description: string;
  source: string;
  sourcePage: number;
  illustrative: boolean;
  visible: boolean;
  order: number;
  group: string;
  summary: string;
  applications: string[];
  features: string[];
  series?: string[];
  imageUrl: string;
}

export const AUTOMATION_IMAGES: Record<string, string> = {
  "schneider-drives": "/assets/automation/schneider-drives.jpeg",
  "schneider-plc": "/assets/automation/schneider-plc.jpeg",
  "schneider-hmi": "/assets/automation/schneider-hmi.jpeg",
  "schneider-acb": "/assets/automation/schneider-acb.jpeg",
  "schneider-mccb": "/assets/automation/schneider-mccb.jpeg",
  "schneider-mcb": "/assets/automation/schneider-mcb.jpeg",
  "schneider-switches": "/assets/automation/schneider-switches.jpeg",
  "schneider-contactors": "/assets/automation/schneider-contactors.jpeg",
  "schneider-relays": "/assets/automation/schneider-relays.jpeg",
  "schneider-mpcb": "/assets/automation/schneider-mpcb.jpeg",
  "schneider-meters": "/assets/automation/schneider-meters.jpeg",
  "lt-acb": "/assets/automation/lt-acb.webp",
  "lt-motor": "/assets/automation/lt-motor.webp",
  "lt-mccb": "/assets/automation/lt-mccb.webp",
  "lt-mcb": "/assets/automation/lt-mcb.webp",
  "lt-switches": "/assets/automation/lt-switches.webp",
  "abb-acb": "/assets/automation/abb-acb.webp",
  "abb-mccb": "/assets/automation/abb-mccb.webp",
  "abb-mcb": "/assets/automation/abb-mcb.webp",
  "abb-contactors": "/assets/automation/abb-contactors.webp",
  "abb-switches": "/assets/automation/abb-switches.webp",
  "siemens-drives": "/assets/automation/siemens-drives.jpeg",
  "siemens-plc": "/assets/automation/siemens-plc.png",
  "siemens-hmi": "/assets/automation/siemens-hmi.jpeg",
  "scada": "/assets/automation/scada.jpeg",
  "industrial-panels": "/assets/automation/industrial-panels.jpeg",
  "plc-cabinet-photo": "/assets/automation/plc-cabinet-photo.jpeg"
};

export const AUTOMATION_PRODUCTS: AutomationProduct[] = [
  {
    "id": "schneider-drives",
    "name": "Altivar VFD & drives",
    "brand": "Schneider Electric",
    "category": "Drives",
    "division": "automation",
    "alt": "Altivar VFD & drives — supplied VSPIAS brochure",
    "description": "Altivar drives adjust motor speed to suit the machine or process. The brochure covers compact machine drives, general-purpose applications and process-control ranges.",
    "source": "VSPIAS company brochure",
    "sourcePage": 6,
    "illustrative": false,
    "visible": true,
    "order": 0,
    "group": "drives",
    "summary": "Variable-speed motor control for pumps, fans and machinery.",
    "applications": [
      "Pumps & fans",
      "Conveyors",
      "HVAC"
    ],
    "features": [
      "Speed control matched to the motor and load",
      "Industrial communication options by model",
      "Select the drive against motor rating and duty"
    ],
    "series": [
      "Altivar Machine ATV320",
      "Altivar Process ATV630 / ATV930",
      "Altivar 12 / 310"
    ],
    "imageUrl": "/assets/automation/schneider-drives.jpeg"
  },
  {
    "id": "schneider-plc",
    "name": "Modicon PLC & I/O modules",
    "brand": "Schneider Electric",
    "category": "Control & interfaces",
    "division": "automation",
    "alt": "Modicon PLC & I/O modules — supplied VSPIAS brochure",
    "description": "Modicon controllers run machine sequences and process inputs from connected equipment. Choose the controller and I/O around the number of signals, communication needs and control sequence.",
    "source": "VSPIAS company brochure",
    "sourcePage": 6,
    "illustrative": false,
    "visible": true,
    "order": 1,
    "group": "control",
    "summary": "Programmable machine control with modular input and output.",
    "applications": [
      "Packaging",
      "Material handling",
      "Process control"
    ],
    "features": [
      "Machine and process-controller families",
      "Modular I/O for the required signal types",
      "Network support varies by controller"
    ],
    "series": [
      "Modicon M221",
      "Modicon M241 / M251",
      "Modicon M340 / M580"
    ],
    "imageUrl": "/assets/automation/schneider-plc.jpeg"
  },
  {
    "id": "schneider-hmi",
    "name": "Magelis / Harmony HMI",
    "brand": "Schneider Electric",
    "category": "Control & interfaces",
    "division": "automation",
    "alt": "Magelis / Harmony HMI — supplied VSPIAS brochure",
    "description": "Magelis and Harmony interfaces bring machine status, controls and alarms to the operator. The brochure includes compact touch panels and higher-performance interface families.",
    "source": "VSPIAS company brochure",
    "sourcePage": 6,
    "illustrative": false,
    "visible": true,
    "order": 2,
    "group": "control",
    "summary": "Touchscreen operation and process visibility for machine panels.",
    "applications": [
      "Machine operation",
      "Production monitoring",
      "Packaging"
    ],
    "features": [
      "Touchscreen operator interfaces",
      "PLC communication and process displays",
      "Select screen size and protocol for the application"
    ],
    "series": [
      "Magelis GTU / GTX",
      "Harmony ST6 / STO",
      "Harmony GTUX"
    ],
    "imageUrl": "/assets/automation/schneider-hmi.jpeg"
  },
  {
    "id": "schneider-acb",
    "name": "ACB & accessories",
    "brand": "Schneider Electric",
    "category": "Switchgear",
    "division": "automation",
    "alt": "ACB & accessories — supplied VSPIAS brochure",
    "description": "Air circuit breakers switch and protect low-voltage power-distribution circuits. The range shown includes breakers and associated accessories for panel integration.",
    "source": "VSPIAS company brochure",
    "sourcePage": 7,
    "illustrative": false,
    "visible": true,
    "order": 3,
    "group": "protection",
    "summary": "Air circuit breakers and accessories for distribution panels.",
    "applications": [
      "Main distribution",
      "PCC panels",
      "Industrial feeders"
    ],
    "features": [
      "Air circuit breaker families",
      "Accessories matched to the selected breaker",
      "Confirm current, fault level and trip requirements"
    ],
    "imageUrl": "/assets/automation/schneider-acb.jpeg"
  },
  {
    "id": "schneider-mccb",
    "name": "MCCB",
    "brand": "Schneider Electric",
    "category": "Switchgear",
    "division": "automation",
    "alt": "MCCB — supplied VSPIAS brochure",
    "description": "Moulded-case circuit breakers combine circuit switching with overcurrent protection. Select the frame, trip arrangement and accessories for the load and installation.",
    "source": "VSPIAS company brochure",
    "sourcePage": 7,
    "illustrative": false,
    "visible": true,
    "order": 4,
    "group": "protection",
    "summary": "Moulded-case circuit protection for feeders and equipment.",
    "applications": [
      "Distribution feeders",
      "Machine panels",
      "Equipment protection"
    ],
    "features": [
      "Moulded-case breaker range",
      "Trip and accessory options vary by series",
      "Confirm poles, current rating and fault level"
    ],
    "imageUrl": "/assets/automation/schneider-mccb.jpeg"
  },
  {
    "id": "schneider-mcb",
    "name": "MCB & RCCB",
    "brand": "Schneider Electric",
    "category": "Switchgear",
    "division": "automation",
    "alt": "MCB & RCCB — supplied VSPIAS brochure",
    "description": "The brochure includes MCB and RCCB families for distribution circuits. MCBs protect against overcurrent; RCCBs detect residual current and need coordinated overcurrent protection.",
    "source": "VSPIAS company brochure",
    "sourcePage": 7,
    "illustrative": false,
    "visible": true,
    "order": 5,
    "group": "protection",
    "summary": "Miniature breakers and residual-current protection devices.",
    "applications": [
      "Distribution boards",
      "Auxiliary circuits",
      "Building services"
    ],
    "features": [
      "Miniature circuit breakers",
      "Residual-current circuit breakers",
      "Match poles, trip characteristics and sensitivity"
    ],
    "imageUrl": "/assets/automation/schneider-mcb.jpeg"
  },
  {
    "id": "schneider-switches",
    "name": "Harmony controls & isolator switches",
    "brand": "Schneider Electric",
    "category": "Controls & metering",
    "division": "automation",
    "alt": "Harmony controls & isolator switches — supplied VSPIAS brochure",
    "description": "Harmony operator devices provide local commands and status indication. The supplied range also includes isolation-switch products for electrical control applications.",
    "source": "VSPIAS company brochure",
    "sourcePage": 7,
    "illustrative": false,
    "visible": true,
    "order": 6,
    "group": "metering",
    "summary": "Push buttons, selectors, indicators and isolation controls.",
    "applications": [
      "Operator stations",
      "Control cabinets",
      "Machine interfaces"
    ],
    "features": [
      "Push buttons and selector switches",
      "Status indication and control accessories",
      "Confirm contact arrangement and mounting"
    ],
    "imageUrl": "/assets/automation/schneider-switches.jpeg"
  },
  {
    "id": "schneider-contactors",
    "name": "Contactors",
    "brand": "Schneider Electric",
    "category": "Motor protection",
    "division": "automation",
    "alt": "Contactors — supplied VSPIAS brochure",
    "description": "Contactors use a control-coil signal to switch a separate power circuit. Select the contactor for the motor or load, switching duty and control voltage.",
    "source": "VSPIAS company brochure",
    "sourcePage": 8,
    "illustrative": false,
    "visible": true,
    "order": 7,
    "group": "protection",
    "summary": "Electrically operated switching for motor and power circuits.",
    "applications": [
      "Motor starters",
      "MCC panels",
      "Power switching"
    ],
    "features": [
      "Motor and power-switching families",
      "Auxiliary contacts and accessories by model",
      "Match coil voltage and switching duty"
    ],
    "imageUrl": "/assets/automation/schneider-contactors.jpeg"
  },
  {
    "id": "schneider-relays",
    "name": "Overload relays",
    "brand": "Schneider Electric",
    "category": "Motor protection",
    "division": "automation",
    "alt": "Overload relays — supplied VSPIAS brochure",
    "description": "Overload relays monitor motor loading and operate the control circuit when an overload condition is detected. Coordinate the relay with the contactor and motor rating.",
    "source": "VSPIAS company brochure",
    "sourcePage": 8,
    "illustrative": false,
    "visible": true,
    "order": 8,
    "group": "protection",
    "summary": "Motor overload protection paired with the starter circuit.",
    "applications": [
      "Motor starters",
      "Pumps",
      "Conveyors"
    ],
    "features": [
      "Overload-relay families",
      "Starter coordination with matching components",
      "Confirm current range and reset requirements"
    ],
    "imageUrl": "/assets/automation/schneider-relays.jpeg"
  },
  {
    "id": "schneider-mpcb",
    "name": "Motor protection circuit breakers",
    "brand": "Schneider Electric",
    "category": "Motor protection",
    "division": "automation",
    "alt": "Motor protection circuit breakers — supplied VSPIAS brochure",
    "description": "Motor protection circuit breakers combine manual switching with motor-circuit protection. Selection depends on the motor current and coordination with the rest of the starter.",
    "source": "VSPIAS company brochure",
    "sourcePage": 8,
    "illustrative": false,
    "visible": true,
    "order": 9,
    "group": "protection",
    "summary": "Circuit breakers designed for motor-protection applications.",
    "applications": [
      "Motor circuits",
      "Machine panels",
      "MCC starters"
    ],
    "features": [
      "Motor-protection breaker families",
      "Adjustable range depends on selected model",
      "Coordinate with contactors and fault conditions"
    ],
    "imageUrl": "/assets/automation/schneider-mpcb.jpeg"
  },
  {
    "id": "schneider-meters",
    "name": "Digital meters",
    "brand": "Schneider Electric",
    "category": "Controls & metering",
    "division": "automation",
    "alt": "Digital meters — supplied VSPIAS brochure",
    "description": "Digital panel meters make electrical measurements visible at the panel. Choose the meter functions, input arrangement and communication options for the monitoring task.",
    "source": "VSPIAS company brochure",
    "sourcePage": 8,
    "illustrative": false,
    "visible": true,
    "order": 10,
    "group": "metering",
    "summary": "Panel meters for electrical measurement and monitoring.",
    "applications": [
      "Electrical panels",
      "Energy monitoring",
      "Distribution systems"
    ],
    "features": [
      "Panel-mounted digital meters",
      "Measurement and display options by model",
      "Confirm CT inputs, supply and communication"
    ],
    "imageUrl": "/assets/automation/schneider-meters.jpeg"
  },
  {
    "id": "lt-acb",
    "name": "Air circuit breakers",
    "brand": "Larsen & Toubro",
    "category": "Switchgear",
    "division": "automation",
    "alt": "Air circuit breakers — supplied VSPIAS brochure",
    "description": "The Larsen & Toubro range in the brochure includes air circuit breakers for power-distribution panels. Breaker configuration and accessories are selected for the project.",
    "source": "VSPIAS company brochure",
    "sourcePage": 9,
    "illustrative": false,
    "visible": true,
    "order": 11,
    "group": "protection",
    "summary": "Air circuit breaker families for low-voltage distribution.",
    "applications": [
      "PCC panels",
      "Main incomers",
      "Distribution feeders"
    ],
    "features": [
      "Air circuit breaker range",
      "Panel integration and accessory selection",
      "Confirm rating, trip unit and installation type"
    ],
    "imageUrl": "/assets/automation/lt-acb.webp"
  },
  {
    "id": "lt-motor",
    "name": "Contactors, MPCB, OLR & HRC fuses",
    "brand": "Larsen & Toubro",
    "category": "Motor protection",
    "division": "automation",
    "alt": "Contactors, MPCB, OLR & HRC fuses — supplied VSPIAS brochure",
    "description": "A range of switching and protection components for motor starters and industrial panels. Select compatible devices around the motor, control circuit and protection requirements.",
    "source": "VSPIAS company brochure",
    "sourcePage": 9,
    "illustrative": false,
    "visible": true,
    "order": 12,
    "group": "protection",
    "summary": "Contactors, motor breakers, overload relays and HRC fuses.",
    "applications": [
      "Motor starters",
      "MCC panels",
      "Industrial machines"
    ],
    "features": [
      "Contactors, MPCBs and overload relays",
      "HRC fuse products",
      "Coordinate the complete starter arrangement"
    ],
    "imageUrl": "/assets/automation/lt-motor.webp"
  },
  {
    "id": "lt-mccb",
    "name": "D-Sine MCCB",
    "brand": "Larsen & Toubro",
    "category": "Switchgear",
    "division": "automation",
    "alt": "D-Sine MCCB — supplied VSPIAS brochure",
    "description": "D-Sine MCCBs provide switching and protection for distribution circuits. Confirm the required rating, poles and trip characteristics before selecting the product.",
    "source": "VSPIAS company brochure",
    "sourcePage": 9,
    "illustrative": false,
    "visible": true,
    "order": 13,
    "group": "protection",
    "summary": "D-Sine moulded-case breakers for distribution protection.",
    "applications": [
      "Distribution boards",
      "Machine feeders",
      "Electrical panels"
    ],
    "features": [
      "D-Sine MCCB family",
      "Frame and accessory selection by requirement",
      "Match the breaker to the site fault level"
    ],
    "imageUrl": "/assets/automation/lt-mccb.webp"
  },
  {
    "id": "lt-mcb",
    "name": "MCB & RCCB",
    "brand": "Larsen & Toubro",
    "category": "Switchgear",
    "division": "automation",
    "alt": "MCB & RCCB — supplied VSPIAS brochure",
    "description": "The brochure shows miniature circuit breakers and residual-current devices. Choose the appropriate protection function and coordinate the devices for the circuit.",
    "source": "VSPIAS company brochure",
    "sourcePage": 9,
    "illustrative": false,
    "visible": true,
    "order": 14,
    "group": "protection",
    "summary": "MCB and RCCB products for branch distribution circuits.",
    "applications": [
      "Branch circuits",
      "Distribution boards",
      "Auxiliary supplies"
    ],
    "features": [
      "MCB and RCCB families",
      "Overcurrent and residual-current functions differ",
      "Confirm poles, sensitivity and circuit rating"
    ],
    "imageUrl": "/assets/automation/lt-mcb.webp"
  },
  {
    "id": "lt-switches",
    "name": "Cam-operated rotary switches",
    "brand": "Larsen & Toubro",
    "category": "Controls & metering",
    "division": "automation",
    "alt": "Cam-operated rotary switches — supplied VSPIAS brochure",
    "description": "Rotary cam switches provide defined switching positions for control and selection tasks. Choose the switching sequence and contact configuration for the intended circuit.",
    "source": "VSPIAS company brochure",
    "sourcePage": 9,
    "illustrative": false,
    "visible": true,
    "order": 15,
    "group": "metering",
    "summary": "Cam-operated rotary switches for manual circuit selection.",
    "applications": [
      "Control panels",
      "Circuit selection",
      "Operator stations"
    ],
    "features": [
      "Rotary switch range",
      "Position and contact-sequence selection",
      "Confirm electrical duty and panel mounting"
    ],
    "imageUrl": "/assets/automation/lt-switches.webp"
  },
  {
    "id": "abb-acb",
    "name": "Air circuit breakers",
    "brand": "ABB",
    "category": "Switchgear",
    "division": "automation",
    "alt": "Air circuit breakers — supplied VSPIAS brochure",
    "description": "ABB air circuit breakers support low-voltage circuit switching and protection. Match the breaker arrangement to the distribution system and panel design.",
    "source": "VSPIAS company brochure",
    "sourcePage": 10,
    "illustrative": false,
    "visible": true,
    "order": 16,
    "group": "protection",
    "summary": "Air circuit breakers for power-distribution assemblies.",
    "applications": [
      "Main distribution",
      "PCC panels",
      "Industrial feeders"
    ],
    "features": [
      "Air circuit breaker families",
      "Trip-unit and accessory selection by model",
      "Confirm current, fault level and mounting"
    ],
    "imageUrl": "/assets/automation/abb-acb.webp"
  },
  {
    "id": "abb-mccb",
    "name": "MCCB",
    "brand": "ABB",
    "category": "Switchgear",
    "division": "automation",
    "alt": "MCCB — supplied VSPIAS brochure",
    "description": "ABB MCCBs provide switching and overcurrent protection for distribution circuits. The appropriate frame, trip unit and accessories depend on the installation.",
    "source": "VSPIAS company brochure",
    "sourcePage": 10,
    "illustrative": false,
    "visible": true,
    "order": 17,
    "group": "protection",
    "summary": "Moulded-case circuit breakers for electrical distribution.",
    "applications": [
      "Distribution feeders",
      "Machine panels",
      "Equipment circuits"
    ],
    "features": [
      "Moulded-case breaker families",
      "Protection configuration by selected series",
      "Confirm poles and required breaking capacity"
    ],
    "imageUrl": "/assets/automation/abb-mccb.webp"
  },
  {
    "id": "abb-mcb",
    "name": "MCB & RCCB",
    "brand": "ABB",
    "category": "Switchgear",
    "division": "automation",
    "alt": "MCB & RCCB — supplied VSPIAS brochure",
    "description": "ABB miniature and residual-current breakers cover different protection functions. Select and coordinate the required devices for the distribution circuit.",
    "source": "VSPIAS company brochure",
    "sourcePage": 10,
    "illustrative": false,
    "visible": true,
    "order": 18,
    "group": "protection",
    "summary": "Compact circuit breakers and residual-current devices.",
    "applications": [
      "Distribution boards",
      "Auxiliary circuits",
      "Building services"
    ],
    "features": [
      "MCB and RCCB families",
      "Circuit and residual-current protection options",
      "Confirm trip curve, poles and sensitivity"
    ],
    "imageUrl": "/assets/automation/abb-mcb.webp"
  },
  {
    "id": "abb-contactors",
    "name": "Contactors & overload relays",
    "brand": "ABB",
    "category": "Motor protection",
    "division": "automation",
    "alt": "Contactors & overload relays — supplied VSPIAS brochure",
    "description": "Contactors and overload relays work together in motor-control circuits. Match the switching duty, coil supply and overload range to the motor and starter design.",
    "source": "VSPIAS company brochure",
    "sourcePage": 10,
    "illustrative": false,
    "visible": true,
    "order": 19,
    "group": "protection",
    "summary": "Switching and overload-protection components for motors.",
    "applications": [
      "Motor starters",
      "MCC panels",
      "Industrial machinery"
    ],
    "features": [
      "Contactor and overload-relay range",
      "Starter component coordination",
      "Confirm coil voltage and motor current"
    ],
    "imageUrl": "/assets/automation/abb-contactors.webp"
  },
  {
    "id": "abb-switches",
    "name": "Control & isolator switches",
    "brand": "ABB",
    "category": "Controls & metering",
    "division": "automation",
    "alt": "Control & isolator switches — supplied VSPIAS brochure",
    "description": "The brochure includes ABB operator controls and isolation devices. Select the control function and switching arrangement required at the machine or panel.",
    "source": "VSPIAS company brochure",
    "sourcePage": 10,
    "illustrative": false,
    "visible": true,
    "order": 20,
    "group": "metering",
    "summary": "Local control, indication and isolation-switch products.",
    "applications": [
      "Machine controls",
      "Operator stations",
      "Panel isolation"
    ],
    "features": [
      "Control and signalling devices",
      "Isolation-switch families",
      "Confirm mounting and contact configuration"
    ],
    "imageUrl": "/assets/automation/abb-switches.webp"
  },
  {
    "id": "siemens-drives",
    "name": "SINAMICS VFD & drives",
    "brand": "Siemens",
    "category": "Drives",
    "division": "automation",
    "alt": "SINAMICS VFD & drives — supplied VSPIAS brochure",
    "description": "SINAMICS drive families support speed control across general-purpose, modular and pump-and-fan applications. Select the range around the machine duty and motor requirements.",
    "source": "VSPIAS company brochure",
    "sourcePage": 11,
    "illustrative": false,
    "visible": true,
    "order": 21,
    "group": "drives",
    "summary": "SINAMICS variable-speed control for motors and machinery.",
    "applications": [
      "Pumps & fans",
      "Conveyors",
      "HVAC"
    ],
    "features": [
      "Motor-speed control",
      "Communication options vary by drive",
      "Match the drive to motor rating and duty"
    ],
    "series": [
      "SINAMICS V20",
      "SINAMICS G120",
      "SINAMICS G120X"
    ],
    "imageUrl": "/assets/automation/siemens-drives.jpeg"
  },
  {
    "id": "siemens-plc",
    "name": "SIMATIC PLC",
    "brand": "Siemens",
    "category": "Control & interfaces",
    "division": "automation",
    "alt": "SIMATIC PLC — supplied VSPIAS brochure",
    "description": "SIMATIC controllers execute automation logic and connect machine inputs and outputs. The brochure covers compact and modular families for different system sizes.",
    "source": "VSPIAS company brochure",
    "sourcePage": 11,
    "illustrative": false,
    "visible": true,
    "order": 22,
    "group": "control",
    "summary": "SIMATIC controllers for machine and process automation.",
    "applications": [
      "Manufacturing",
      "Packaging",
      "Process automation"
    ],
    "features": [
      "Machine and process-controller families",
      "I/O and communication selected per application",
      "Match programming and network requirements"
    ],
    "series": [
      "SIMATIC S7-1200",
      "SIMATIC S7-1500",
      "SIMATIC S7-300 / S7-400"
    ],
    "imageUrl": "/assets/automation/siemens-plc.png"
  },
  {
    "id": "siemens-hmi",
    "name": "SIMATIC HMI",
    "brand": "Siemens",
    "category": "Control & interfaces",
    "division": "automation",
    "alt": "SIMATIC HMI — supplied VSPIAS brochure",
    "description": "SIMATIC HMI panels display machine data and provide operator controls. Choose a panel family for the required screen, visualisation and controller integration.",
    "source": "VSPIAS company brochure",
    "sourcePage": 11,
    "illustrative": false,
    "visible": true,
    "order": 23,
    "group": "control",
    "summary": "SIMATIC panels for operator control and process displays.",
    "applications": [
      "Machine operation",
      "Production monitoring",
      "Process interfaces"
    ],
    "features": [
      "Touchscreen operation and visualisation",
      "PLC integration and communication by model",
      "Confirm panel size and software requirements"
    ],
    "series": [
      "SIMATIC Basic Panels",
      "SIMATIC Comfort Panels",
      "SIMATIC Unified Panels"
    ],
    "imageUrl": "/assets/automation/siemens-hmi.jpeg"
  },
  {
    "id": "scada",
    "name": "SCADA software",
    "brand": "Multi-brand",
    "category": "Software & panels",
    "division": "automation",
    "alt": "SCADA software — supplied VSPIAS brochure",
    "description": "SCADA systems collect process information and present it through supervisory screens. The brochure covers monitoring, data analysis and interaction with industrial processes.",
    "source": "VSPIAS company brochure",
    "sourcePage": 5,
    "illustrative": false,
    "visible": true,
    "order": 24,
    "group": "panels",
    "summary": "Supervisory monitoring, process visualisation and control.",
    "applications": [
      "Plant monitoring",
      "Process visualisation",
      "Industrial reporting"
    ],
    "features": [
      "Supervisory process displays",
      "System data acquisition and monitoring",
      "Define connectivity, tag count and reporting needs"
    ],
    "imageUrl": "/assets/automation/scada.jpeg"
  },
  {
    "id": "industrial-panels",
    "name": "Industrial control panels",
    "brand": "Multi-brand",
    "category": "Software & panels",
    "division": "automation",
    "alt": "Industrial control panels — supplied VSPIAS brochure",
    "description": "Industrial panels bring power, switching, protection and automation equipment into an assembly. The configuration follows the load schedule, control sequence and installation environment.",
    "source": "VSPIAS company brochure",
    "sourcePage": 5,
    "illustrative": false,
    "visible": true,
    "order": 25,
    "group": "panels",
    "summary": "MCC, PCC, APFC, PLC and drive-panel requirements.",
    "applications": [
      "Power distribution",
      "Motor control",
      "Machine automation"
    ],
    "features": [
      "MCC, PCC and distribution panels",
      "PLC / HMI, VFD and process-control panels",
      "APFC and other application-specific configurations"
    ],
    "imageUrl": "/assets/automation/industrial-panels.jpeg"
  }
];

export interface WorkingModel {
  title: string;
  short: string;
  category: string;
  image: string;
  description: string;
  note: string;
  family: string;
}

export type AutomationModel = WorkingModel;

export const PRODUCT_GROUP_DESCRIPTIONS: Record<string, string> = {
  control:
    'Controllers and operator interfaces for machine logic, monitoring and operator interaction. Discuss the required I/O, communications and application with our team.',
  drives:
    'Variable-speed drive families for motor-control applications. Match the drive to the motor, load, duty cycle and site conditions.',
  protection:
    'Switchgear and motor-protection products for coordinated electrical control and protection. Selection depends on the installation and required ratings.',
  metering:
    'Control, signalling and metering products for industrial installations. Select functions and interfaces around the intended application.',
  panels:
    'Panel and supervisory-control solutions configured around the operating requirements of the project.',
};

export const PRODUCT_GROUP_CHECKLISTS: Record<string, string[]> = {
  control: [
    'I/O quantity and signal types',
    'Control sequence and communications',
    'Operator interface and environment',
    'Required model and quantity',
  ],
  drives: [
    'Motor nameplate and supply',
    'Load type and duty cycle',
    'Control and communication needs',
    'Installation and enclosure conditions',
  ],
  protection: [
    'Supply and load requirements',
    'Protection coordination and fault level',
    'Required accessories and mounting',
    'Approved model and quantity',
  ],
  metering: [
    'Functions or measurements required',
    'Supply and communications',
    'Mounting and environmental needs',
    'Model references and quantity',
  ],
  panels: [
    'Load schedule and panel type',
    'Control and protection requirements',
    'Environment and enclosure needs',
    'Drawings, quantities and timeline',
  ],
};

export const AUTOMATION_MODELS: WorkingModel[] = [
  {
    title: 'Circuit breaker',
    short: 'Protection, when it matters',
    category: 'Protection',
    image: 'schneider-mccb',
    description: 'A protective switching device opens the circuit when an overcurrent condition triggers it.',
    note: 'Try closing the breaker, then simulate a fault. The example opens the circuit; actual operation depends on the device, trip setting and installation.',
    family: 'Circuit breakers & protection'
  },
  {
    title: 'Contactor',
    short: 'Small signal. Bigger action.',
    category: 'Motor control',
    image: 'schneider-contactors',
    description: 'A control signal energises a coil, bringing the main contacts together to switch a motor load.',
    note: 'The control circuit and motor circuit perform different jobs. This simplified model shows the coil moving the main contacts.',
    family: 'Contactors & motor control'
  },
  {
    title: 'Variable frequency drive',
    short: 'A better way to set the pace',
    category: 'Drive & motion',
    image: 'schneider-drives',
    description: 'Change the output frequency and explore its relationship with motor speed and an ideal fan load.',
    note: 'Illustrative 1,450 rpm at 50 Hz. Fan power follows the ideal cube relationship at similar conditions and constant efficiency; actual results vary.',
    family: 'Variable-speed drives'
  },
  {
    title: 'PLC & HMI',
    short: 'Logic that keeps things moving',
    category: 'Control & interfaces',
    image: 'siemens-plc',
    description: 'A controller reads the tank level and starts or stops the pump. The HMI makes its state visible.',
    note: 'Example logic starts the pump at 20% and stops it at 85%. Turn off automatic control or close the outlet to see the sequence change.',
    family: 'PLC, I/O & operator interfaces'
  },
  {
    title: 'Overload relay',
    short: 'Protection that remembers heat',
    category: 'Motor protection',
    image: 'schneider-relays',
    description: 'Increase the load and watch a simplified thermal model build up heat, then interrupt the motor.',
    note: 'This is an illustrative heat model, not a time-current curve. Reduce the load and let it cool before resetting the trip.',
    family: 'Overload relays & motor protection'
  },
  {
    title: 'APFC panel',
    short: 'The same work. Less current.',
    category: 'Power management',
    image: 'industrial-panels',
    description: 'Switch in power-factor correction and compare apparent power and line current at the same active load.',
    note: 'Example: balanced three-phase 415 V supply and 100 kW active load. Lower current does not directly imply the same percentage reduction in energy bills.',
    family: 'Power-factor correction panels'
  }
];

export interface PanelPhotoOption {
  key: string;
  src: string;
  alt: string;
  title: string;
  caption: string;
  product: string;
}

export const AUTOMATION_PANEL_PHOTOS: Record<string, PanelPhotoOption> = {
  plc: {
    key: 'plc',
    src: '/assets/automation/plc-cabinet-photo.jpeg',
    alt: 'Siemens SIMATIC controller and I/O modules in a wired cabinet',
    title: 'PLC & I/O integration',
    caption: 'Controller, signal modules and field wiring.',
    product: 'siemens-plc'
  },
  panels: {
    key: 'panels',
    src: '/assets/automation/industrial-panels.jpeg',
    alt: 'Industrial panel product range from the supplied brochure',
    title: 'Industrial panel range',
    caption: 'PCC, MCC, APFC, VFD and control-panel configurations.',
    product: 'industrial-panels'
  },
  scada: {
    key: 'scada',
    src: '/assets/automation/scada.jpeg',
    alt: 'SCADA supervisory-control displays from the supplied brochure',
    title: 'SCADA & process visibility',
    caption: 'Supervisory displays for connected industrial processes.',
    product: 'scada'
  }
};

export interface IndustryItem {
  name: string;
  description: string;
  icon: string;
  tags: string[];
  enquiry: string;
}

export const AUTOMATION_INDUSTRIES: IndustryItem[] = [
  {
    name: 'Food & beverages',
    description: 'Hygienic processing, bottling, dairy and packaging.',
    icon: 'factory',
    tags: ['Process control', 'Operator interfaces', 'Variable-speed drives'],
    enquiry: 'Food & beverage automation'
  },
  {
    name: 'Packaging OEMs',
    description: 'Connected control for bag makers, cartoners and wrapping lines.',
    icon: 'box',
    tags: ['PLC & I/O', 'Drive coordination', 'Machine interfaces'],
    enquiry: 'Packaging OEM automation'
  },
  {
    name: 'Water & wastewater',
    description: 'Control and visibility for pumping and treatment processes.',
    icon: 'drop',
    tags: ['Pump drives', 'Telemetry & SCADA', 'Power-factor correction'],
    enquiry: 'Water & wastewater automation'
  },
  {
    name: 'Power & distribution',
    description: 'Protection, monitoring and coordinated power distribution.',
    icon: 'bolt',
    tags: ['Circuit protection', 'Energy monitoring', 'MCC / PCC panels'],
    enquiry: 'Power & distribution'
  },
  {
    name: 'Oil & gas',
    description: 'Application-led selection for demanding industrial environments.',
    icon: 'flame',
    tags: ['Control architecture', 'Motor protection', 'Project specifications'],
    enquiry: 'Oil & gas application requirements'
  }
];

export interface RangeFamily {
  title: string;
  subtitle: string;
  imageKey: string;
}

export const AUTOMATION_PRODUCT_FAMILIES: RangeFamily[] = [
  { title: 'PLC & I/O', subtitle: 'Control & interfaces', imageKey: 'schneider-plc' },
  { title: 'VFD & drives', subtitle: 'Motor & motion', imageKey: 'schneider-drives' },
  { title: 'HMI interfaces', subtitle: 'Operator visualisation', imageKey: 'schneider-hmi' },
  { title: 'Switchgear', subtitle: 'Power & protection', imageKey: 'schneider-mccb' },
  { title: 'Control panels', subtitle: 'Engineered assemblies', imageKey: 'industrial-panels' },
  { title: 'SCADA', subtitle: 'Supervisory control', imageKey: 'scada' }
];
