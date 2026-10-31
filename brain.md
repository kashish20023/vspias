# BRAIN.MD: VSPIAS ECOAUTOMATION SYSTEM BLUEPRINT & ARCHITECTURE MEMORY

> **System Memory & Technical Architecture Dossier**  
> **Repository:** `VSPIAS` (`govindgautam-glitch/VSPIAS`)  
> **Company:** VSPIAS ECOAUTOMATION PVT. LTD.  
> **Headquarters:** #66, 6th Main Road, behind UCO Bank, Peenya, Bengaluru 560058, Karnataka, India  
> **Last Updated:** October 2026 / Production Baseline  
> **Primary Framework:** Next.js 14.2.33 (App Router) + React 18.3 + TypeScript 5.6 + Vanilla CSS (Public) + Scoped Tailwind CSS (Admin)  

---

## 1. Executive Identity & System Purpose

**VSPIAS Ecoautomation Pvt. Ltd.** operates an integrated B2B engineering and manufacturing enterprise in Bengaluru, India, structured around two distinct industrial divisions:

1. **Sustainable Paper Packaging Division:**
   - High-volume manufacturing of eco-friendly paper carry bags, food delivery sacks, block-bottom takeaway packaging, and luxury retail bags.
   - In-house 1- and 2-colour flexographic in-line brand printing.
   - Proprietary client-facing interactive **3D Bag Studio** for custom bag geometry, color, handle, and brand configuration.

2. **Electrical & Industrial Automation Division:**
   - Multi-brand automation components, switchgear distribution, control panel engineering (MCC, PCC, APFC), PLC/SCADA systems, and VFD drives.
   - Direct partnerships and distribution for global brands: **Schneider Electric, ABB, SIEMENS, Larsen & Toubro (L&T)**.
   - Special Purpose Machinery (SPM) and industrial printing equipment.

### Core Corporate Metadata
- **Company Name:** VSPIAS ECOAUTOMATION PVT. LTD.
- **Short Name:** VSPIAS
- **Managing Contact:** Paawan Bhargava
- **Primary Phone:** `+91 97831 33333` (WhatsApp Raw: `919783133333`)
- **Primary Email:** `info@vspias.in`
- **Location:** Peenya Industrial Area, Bengaluru, Karnataka, India
- **Production Base URL:** `https://vspias.in`

---

## 2. Repository Inventory & Directory Structure

```
VSPIAS/
├── .env.example                     # Environment template (ADMIN_PASSWORD, NEXT_PUBLIC_SITE_URL)
├── .gitignore                       # Production & build exclusions (protects local customer data)
├── ADMIN_DOCUMENTATION.md           # Principal architecture & technical spec for Admin Workspace
├── README.md                        # Project header
├── package.json                     # Root orchestrator scripts (dev, build, start, lint, typecheck)
├── screenshots/                     # Multi-viewport regression visual verification captures
└── frontend/                        # Main Next.js Full-Stack Application
    ├── package.json                 # Next 14.2.33, React 18.3.1, TypeScript 5.6.3, Tailwind 3.4.19
    ├── tsconfig.json                # Strict TypeScript configuration with @/* path aliases
    ├── next.config.mjs              # Custom rewrites, permanent 301 redirects, unoptimized media
    ├── tailwind.config.ts           # Scoped Tailwind configuration (preflight: false) for /admin only
    ├── postcss.config.mjs           # PostCSS setup for Tailwind CSS and Autoprefixer
    ├── data/
    │   ├── catalog.json             # Atomic persistence for 30+ product records & brochure states
    │   └── enquiries.json           # Inbound quotation requests (generated at runtime, protected 0o600)
    ├── public/
    │   ├── admin.html               # Standalone legacy reactive admin control panel UI
    │   ├── admin.js                 # Admin client script (Catalog revisioning, enquiries, media)
    │   ├── catalog.seed.json        # Base seed file containing initial 30 catalogue items
    │   ├── assets/                  # Original high-res SHA-verified images & branding
    │   │   ├── brands/              # Partner brand SVGs (schneider-electric, abb, siemens, larsen-toubro)
    │   │   ├── reference/           # Vector & PNG brand assets (vspias-logo.png, etc.)
    │   │   └── industries/          # 12 sector application photography assets
    │   └── downloads/
    │       └── vspias-company-brochure.pdf  # Verified 12-page industrial automation brochure
    └── src/
        ├── middleware.ts            # Sliding-window rate limiter for /api/* routes (DDoS & anti-spam)
        ├── app/                     # Next.js 14 App Router
        │   ├── layout.tsx           # Global root layout with metadata, CSS loading, header & footer
        │   ├── page.tsx             # Curated 6-block Homepage (H1-H6)
        │   ├── not-found.tsx        # Branded 404 handler
        │   ├── sitemap.ts           # Dynamic XML sitemap generator
        │   ├── robots.ts            # Crawler directive (disallows /admin and /api/)
        │   ├── admin/               # Native Next.js React Admin Workspace
        │   │   ├── layout.tsx       # Dedicated admin shell layout
        │   │   └── page.tsx         # Tabbed admin workspace (Overview, Catalogue, Enquiries, Media, Publish)
        │   ├── paper-bags/          # Paper Bags Division landing page
        │   │   ├── page.tsx         # Premium Paper Bags showcase with 3D studio & materials
        │   │   └── [slug]/page.tsx  # Dynamic SSG detail pages (kraft-carry, food-takeaway, retail)
        │   ├── automation/          # Industrial Automation & Electricals portal
        │   │   └── page.tsx         # Automation catalog, technical specs, brand showcase
        │   ├── industrial-solutions/# Alias portal routing to automation
        │   │   └── page.tsx
        │   ├── printing/            # 2-Colour Flexographic Printing Machinery showcase
        │   │   └── page.tsx
        │   ├── contact/             # Quotation desk, WhatsApp integration, contact metadata
        │   │   └── page.tsx
        │   ├── privacy/ & terms/    # Compliance, data handling & privacy documentation
        │   ├── uploads/[filename]/  # Content-addressed media streaming route with MIME detection
        │   └── api/                 # RESTful Serverless Endpoints
        │       ├── catalog/         # GET public catalog
        │       ├── enquiries/       # POST customer quote requests with honeypot validation
        │       ├── login/ & logout/ # Admin session lifecycle & scrypt password verification
        │       ├── session/         # Auth status check & CSRF token issuer
        │       └── admin/           # Protected admin backend
        │           ├── catalog/     # GET full draft + published state
        │           ├── save/        # POST atomic draft update with revision locking
        │           ├── publish/     # POST promote draft to live production
        │           ├── discard/     # POST revert draft back to live published state
        │           ├── media/       # POST file upload with magic-byte inspection (PNG/JPEG/WEBP/PDF)
        │           ├── preview/     # GET draft preview state
        │           └── enquiries/   # GET & DELETE customer lead records
        ├── components/
        │   ├── admin/               # React Admin Workspace Components
        │   │   ├── AdminIcons.tsx            # SVG Icon collection for admin tools
        │   │   ├── AdminSidebar.tsx          # Collapsible navigation drawer
        │   │   ├── AdminTopbar.tsx           # Status bar with live preview & logout
        │   │   ├── OverviewView.tsx          # Key metrics, lead statistics, recent activity
        │   │   ├── CatalogueView.tsx         # Product table, filters, order management
        │   │   ├── EnquiriesView.tsx         # Inbound leads table, filter, export, delete
        │   │   ├── MediaView.tsx             # Media library, brochure manager, drag-and-drop upload
        │   │   ├── PublishingView.tsx        # Revision history, draft diffing, publish trigger
        │   │   ├── ProductEditorDialog.tsx   # Modal for adding/editing catalogue products
        │   │   ├── EnquiryDetailDialog.tsx   # Detailed customer lead inspection modal
        │   │   ├── ConfirmDialog.tsx         # Action confirmation modal
        │   │   ├── LoginModal.tsx            # Password sign-in modal
        │   │   ├── admin-types.ts            # Strongly-typed models for admin state & metrics
        │   │   └── admin-utils.ts            # Formatting, validation, and notification helpers
        │   ├── home/                # Homepage H1-H6 discrete blocks
        │   │   ├── CompanyHero.tsx               # Block H1: High-impact hero & division selector
        │   │   ├── HomeProductRails.tsx          # Blocks H2 & H3: Dual opposing marquee rails
        │   │   ├── CompanyBenefitsSection.tsx    # Block H4: 5 core enterprise advantages
        │   │   ├── DivisionSolutionCards.tsx     # Block H5: Direct division portal entry cards
        │   │   └── CompactEnquiryBand.tsx        # Block H6: Streamlined consultation action band
        │   ├── bags/                # Paper packaging components
        │   │   ├── premium/         # Premium paper page redesign components
        │   │   │   ├── PremiumHeroSection.tsx    # Editorial hero
        │   │   │   ├── PremiumRangeSection.tsx   # 5-family product accordion
        │   │   │   ├── PremiumStudioSection.tsx  # 3D Bag Studio container
        │   │   │   ├── PremiumIndustriesSection.tsx # 8-sector bento grid with spotlight
        │   │   │   ├── PremiumProcessSection.tsx # 4-step manufacturing timeline + SVG flexo schematic
        │   │   │   ├── PremiumMaterialsSection.tsx # GSM slider & tactile material inspection
        │   │   │   ├── PremiumEnquirySection.tsx # Protected RFQ commercial contact desk
        │   │   │   └── PremiumPhotoViewer.tsx    # Native HTML5 <dialog> modal viewer
        │   │   └── BagDetailModal.tsx            # Quick-view modal with specification matrix
        │   ├── automation/          # Industrial automation components
        │   │   └── premium/         # Premium automation portfolio & brand rails
        │   │       ├── AutomationHeroSection.tsx        # Technical 3D-perspective hero & spring tilt
        │   │       ├── AutomationBrandsBand.tsx         # Schneider, ABB, Siemens, L&T brand grid
        │   │       ├── AutomationRangeRail.tsx          # Interactive animated component rail
        │   │       ├── AutomationCatalogSection.tsx     # Live filterable automation catalogue
        │   │       ├── AutomationWorkingDemosSection.tsx # Interactive schematic & motor simulators
        │   │       ├── AutomationEngineeringSection.tsx  # Engineering methodology & panel fabrication
        │   │       ├── AutomationIndustriesSection.tsx   # Sector application accordions
        │   │       └── AutomationModals.tsx             # Product detail and high-res image dialogs
        │   ├── industrial/          # Machine engineering & process components
        │   ├── studio/              # Interactive 3D Canvas Paper Bag Studio
        │   │   ├── BagStudio.tsx    # React wrapper mounting studio canvas
        │   │   ├── bag-studio.js    # Canvas 2D/3D renderer, vector rasterizer & geometry engine
        │   │   ├── bag-studio.d.ts  # TypeScript interfaces for bag configurations
        │   │   └── bag-studio.css   # Studio layout, color swatch pickers, responsive frame
        │   ├── enquiry/             # Lead capture components
        │   │   ├── QuoteForm.tsx    # Multi-field RFQ form with validation & deep-link parameter parsing
        │   │   └── FAQAccordion.tsx # Expandable technical FAQ
        │   ├── layout/              # Universal site chrome
        │   │   ├── SiteHeader.tsx   # Responsive navigation, brand logo, division dropdowns
        │   │   ├── SiteFooter.tsx   # Comprehensive sitemap, legal notices & direct contact
        │   │   └── TopBar.tsx       # Live status banner
        │   └── motion/              # Micro-animations & interactive UI wrappers
        │       ├── AnimatedEnquiryButton.tsx  # Fluid enquiry button
        │       ├── EnquirySurface.tsx         # Interactive surface wrapper
        │       └── VariableHeadline.tsx       # Typography transition engine
        ├── content/                 # Ground-truth typed content models
        │   ├── site.ts              # Global brand configuration, navigation items, address data
        │   ├── bags.ts              # Bag products, filter taxonomy, dimension & GSM specs
        │   ├── industrial.ts        # Automation categories, partner brands, manufacturing steps
        │   ├── industries.ts        # 12 specific industry applications (Supermarkets, Bakery, etc.)
        │   ├── enquiry.ts           # RFQ form presets, FAQs, placeholders
        │   └── assets.ts            # Cryptographic SHA-256 asset registry & approved image map
        ├── lib/                     # Core backend & application services
        │   ├── routes.ts            # Central route constants & slug validators
        │   ├── whatsapp.ts          # Standardized wa.me URL generator with encoded draft payload
        │   ├── catalog-service.ts   # Catalog state machine, atomic writes, scrypt auth, upload filter
        │   └── enquiry-store.ts     # Thread-safe async queue for customer lead persistence
        ├── styles/                  # Clean Hybrid Styling Architecture
        │   ├── reference.css        # Core typography, resets, variables, responsive clamp scales
        │   ├── enhancements.css     # Buttons, cards, modals, form controls, glassmorphism
        │   ├── homepage-navy-theme.css # Homepage deep navy styling & opposing marquee rails
        │   ├── paper-bags-premium.css  # Premium editorial design system for paper division
        │   ├── automation-premium.css  # Technical industrial styling for automation division
        │   ├── admin-base.css       # Core baseline reset and variables for the admin dashboard
        │   └── admin-tailwind.css   # Tailwind directives scoped specifically for /admin workspace
        └── tests/                   # Automated Node.js Verification Suites
            ├── integration.mjs      # Full end-to-end API, catalog & brochure test suite
            ├── verify-matrix.mjs    # Multi-page layout & anti-cross-pollution matrix validator
            └── test_whatsapp.mjs    # WhatsApp URL format and query parameter unit tests
```

---

## 3. Technology Stack & Architectural Decisions

| Layer | Technology | Version | Architectural Rationale |
| :--- | :--- | :--- | :--- |
| **Framework** | Next.js (App Router) | `14.2.33` *(Pinned)* | Locked to `14.2.33` to match exact binary compatibility with `@next/swc-darwin-x64@14.2.33`. Eliminates lockfile patcher exceptions. |
| **Runtime UI** | React / React DOM | `18.3.1` | Concurrent rendering, selective hydration, client components isolated to interactive islands. |
| **Language** | TypeScript | `5.6.3` | Strict type safety across content models, catalog state, enquiries, and API contracts. |
| **Public Styling** | Vanilla CSS Tokens | CSS3 / HSL | Maximum control over micro-animations, zero build-time bloat, high performance, bespoke luxury design. |
| **Admin Styling** | Tailwind CSS (Scoped) | `3.4.19` | Fast, structured component development for internal dashboard (`preflight: false` ensures zero bleed to public pages). |
| **Graphics Engine**| HTML5 Canvas API | Native | Embedded 3D isometric & 2D vector bag visualizer (`bag-studio.js`) with zero heavy WebGL dependencies. |
| **Persistence** | File-System Atomic JSON| Node.js `fs` | High-reliability local persistence using serialized write queues and crypto-random temporary files. |
| **Security/Auth** | Node Crypto (`scrypt`) | Native | Constant-time password verification (`timingSafeEqual`), sliding-window IP rate limiting, CSRF tokens. |

---

## 4. Key Architectural Pillars & Design Rules

### 1. Division Isolation Policy
- **Strict Separation:** The **Paper Bags** division and the **Industrial Automation** division operate as distinct corporate offerings.
- **No Promotional Cross-Pollination:**
  - The Paper Bags page (`/paper-bags`) contains zero electrical switchgear or VFD drives.
  - The Automation page (`/automation`) contains zero paper bag sales cards.
  - The Homepage (`/`) features balanced, separate entry cards (Block H5) without conflating the two domains.

### 2. Homepage Architecture (The 6-Block Doctrine)
The Homepage (`frontend/src/app/page.tsx`) is strictly structured into 6 focused blocks:
- **Block H1 (`CompanyHero`):** Direct B2B headline, dual division callout, hero CTA.
- **Blocks H2 & H3 (`HomeProductRails`):** Two opposing continuously animated rails:
  - Rail 1 (Top, Left-to-Right): Industrial Automation products (PLCs, VFDs, HMIs).
  - Rail 2 (Bottom, Right-to-Left): Sustainable Paper Bags (Kraft, Food bags, Luxury shopping bags).
- **Block H4 (`CompanyBenefitsSection`):** 5 enterprise pillars (Direct Manufacturing, Bengaluru Unit, In-Line Printing, Certified Materials, Multi-Brand Supply).
- **Block H5 (`DivisionSolutionCards`):** Two equal high-contrast portals leading directly to `/paper-bags` and `/automation`.
- **Block H6 (`CompactEnquiryBand`):** Minimalist direct consultation bar connecting directly to the quote desk.

### 3. Responsive Design & Aesthetic Hierarchy
- **Primary Color Palette:**
  - Deep Industrial Navy: `#0a192f`, `#102a43`
  - Forest / Eco Green: `#173b30`, `#275c4c`, `#e8f0ec`
  - Crisp Cream / Ivory: `#faf8f5`, `#f3eee6`
  - Lime / Technical Accent: `#d5ed86`, `#e9ecdf`
  - Precision Gold / Warm Ochre: `#d4a373`, `#c58b4b`
  - Engineering White & Slate: `#ffffff`, `#64748b`, `#0f172a`
- **Typography:**
  - Modern sans-serif stack utilizing system-native font rendering (`Manrope`, system-ui, sans-serif).
  - Fluid clamp typography for responsive headings without layout shift (`clamp(2rem, 5vw, 3.5rem)`).

---

## 5. Division Taxonomies & Product Catalogs

### Division 1: Paper Bags & Packaging
- **Live Products in Published Catalog:**
  1. `kraft-carry-bags`: Natural brown kraft carry bags, twisted paper cord handle, 80–140 GSM virgin/recycled kraft.
  2. `food-takeaway`: Cafes, bakeries, food delivery, flat fold-in handle, grease-resistant barrier, 70–120 GSM.
  3. `retail-custom-print`: Luxury lifestyle boutique shopping bags, reinforced twisted cord, 100–160 GSM premium ivory.
- **Specification Ranges:**
  - **GSM Range:** 70 GSM to 160 GSM.
  - **Handle Options:** Twisted paper loop, flat paper tape handle, luxury cotton-feel rope, punch-out/die-cut handle, handle-less pinch bottom.
  - **Inks:** 100% water-based, non-toxic, food-grade compliant flexographic inks.
- **12 Targeted Industry Sectors:**
  1. Agriculture & Produce (Heavyweight breathable kraft)
  2. Supermarkets (High-capacity reinforced carry)
  3. Bakery (Grease-resistant pinch bottom)
  4. Travel & Hospitality (Boutique gift carriers)
  5. E-Commerce (Gusseted mailer bags)
  6. Electronics & Tech (Rigid base structured bags)
  7. Fashion & Lifestyle Retail (Brand-led flexo printing)
  8. Books & Stationery (Durable flat base)
  9. Healthcare & Pharmaceuticals (Counter dispensing pouches)
  10. Groceries (Volume self-standing sacks)
  11. Quick-Service Restaurants (Wide gusset hot food carriers)
  12. Food & Beverages (Beverage counter carriers)

### Division 2: Electrical & Industrial Automation
- **26 Live Verified Catalog Products:**
  - **Variable Frequency Drives (VFD):** Schneider Altivar (ATV310, ATV630, ATV12), ABB (ACS355, ACS580, ACS880), Siemens (Sinamics G120).
  - **Programmable Logic Controllers (PLC) & I/O:** Schneider Modicon (M221, M241, M251), Siemens (Simatic S7-1200, S7-1500), ABB (AC500).
  - **Operator Interfaces (HMI):** Schneider Harmony, Siemens Simatic Comfort Panel, ABB CP600.
  - **Switchgear & Protection:** Air Circuit Breakers (ACB), Moulded Case Circuit Breakers (MCCB), Contactors, Overload Relays (Schneider TeSys, L&T, Siemens).
  - **Custom Engineered Panels:** Motor Control Centers (MCC), Power Control Centers (PCC), Automatic Power Factor Correction (APFC), PLC Control Desks.
- **Authorized / Supported Partner Brands:**
  - **Schneider Electric** (Altivar, Modicon, Harmony, TeSys, Masterpact)
  - **ABB** (Drives, Controls, Low-Voltage Switchgear)
  - **SIEMENS** (Sinamics, Simatic, Sirius)
  - **Larsen & Toubro / L&T** (Industrial Switchgear, Contactors, Motor Protection)

### Division 3: Printing Machinery
- **Flexographic Printing Equipment:**
  - In-line 1- and 2-colour flexographic printing systems for reel-to-sheet and roll-fed bag machines.
  - High registration accuracy, fast-drying water-based ink chambers.

---

## 6. Interactive Engines & Technical Features

### 1. 3D Bag Studio Engine (`BagStudio.tsx` + `bag-studio.js`)
- **Technology:** Pure HTML5 Canvas 2D/3D projection math (no bulky Three.js/WebGL runtime required).
- **Interactive State Attributes:**
  - `paper`: `'kraft'` | `'ivory'` | `'forest'` | `'sage'` | `'navy'`
  - `print`: `'forest'` | `'ivory'` | `'charcoal'` | `'lime'` | `'orange'`
  - `shape`: `'classic'` | `'tall'` | `'wide'` | `'tote'`
  - `handle`: `'rope'` | `'flat'` | `'none'`
  - `pattern`: `'plain'` | `'dots'` | `'stripes'`
  - `brand`: Custom user text rendered directly onto the bag surface with perspective warping.
- **Workflow:** Real-time 360-degree rotation drag, live lighting simulation, instant design brief export, and direct link into the quote desk.

### 2. WhatsApp Lead Engine (`whatsapp.ts`)
- **Phone:** `+91 97831 33333` (`919783133333`)
- **Standard:** Clean URL generation using official WhatsApp API (`https://wa.me/919783133333?text=...`).
- **Features:**
  - Strips non-digits from phone inputs.
  - Automatic URI encoding of multi-line quotation briefs.
  - Fallback to clean chat if no message is passed.

### 3. Deep-Linking RFQ Integration (`QuoteForm.tsx`)
- The quote form automatically ingests and validates URL query parameters:
  - `?interest=...` or `?division=...`: Selects active industrial stream.
  - `?topic=...`: Prefills requirement brief (e.g. `Enquiry for VFD Drives`).
  - `?requirements=...`: Ingests full serialized configuration from 3D Bag Studio or Product Cards.

---

## 7. Data Layer, Persistence & State Management

### 1. Catalog State Machine (`catalog.json` & `catalog-service.ts`)
- **Schema Version:** 1
- **Dual State Architecture:**
  - `published`: The live catalogue visible to all public website visitors.
  - `draft`: Working revision modified inside the `/admin` workspace.
- **Concurrency & Revision Control:**
  - State holds an integer `revision` counter.
  - Atomic saves require `client.revision === server.revision` (rejects with `409 Conflict` if modified elsewhere).
- **Atomic File Writing Pattern:**
  ```typescript
  // Thread-safe serial write with atomic rename
  const tmp = STATE_FILE + '.' + randomBytes(6).toString('hex') + '.tmp';
  await fs.writeFile(tmp, JSON.stringify(next, null, 2), { mode: 0o600 });
  await fs.rename(tmp, STATE_FILE);
  ```
- **Fallback Seeding:** Automatically initializes from `public/catalog.seed.json` if `data/catalog.json` does not exist.

### 2. Customer Enquiry Storage (`enquiries.json` & `enquiry-store.ts`)
- **Data Location:** `data/enquiries.json` (filesystem mode `0o600`, directory mode `0o700`).
- **Thread Safety:** All writes are piped through a Promise queue (`serialize()`) preventing race conditions during concurrent submissions.
- **Record Structure:**
  - `id`: UUIDv4
  - `createdAt`: ISO 8601 Timestamp
  - `name`: string (max 100 chars)
  - `email`: string (validated email regex)
  - `phone`: string (max 20 chars)
  - `message`: string (max 2000 chars)
  - `division`: `'Paper bags'` | `'Machinery & printing'` | `'Electrical & automation'`
  - Optional: `company`, `quantity`, `bagFinish`, `brandName`, `industrySector`

### 3. Media Upload Pipeline (`uploads/[filename]` & `uploadMedia()`)
- **Storage Directory:** `data/uploads/`
- **Security & Integrity Checks:**
  - **Magic-Byte Sniffing:** Verifies binary headers for PNG (`89 50 4E 47`), JPEG (`FF D8 FF`), WebP (`RIFF...WEBP`), and PDF (`%PDF-`). Rejects any mismatched extension.
  - **SHA-256 Content Addressing:** Filename is strictly `sha256(fileBytes) + ext` to prevent overwrites, path traversals, or duplicate storage.
  - **Size Guardrails:** 10 MB maximum for images; 18 MB maximum for PDF brochures.
- **Access Governance:** Files linked in the published catalogue are publicly accessible; unlinked draft files require an active admin session.

---

## 8. Security, Authentication & Rate Limiting

### 1. Admin Authentication (`catalog-service.ts` & `/api/login`)
- **Password Hashing:** Node.js `crypto.scryptSync` with a cryptographic 32-byte salt and constant-time comparison via `crypto.timingSafeEqual`.
- **Brute-Force Shield:** Max 8 invalid attempts per IP within a 15-minute sliding window; subsequent attempts are rejected with `429 Too Many Requests`.
- **Session Management:** In-memory session table mapped to random 64-hex cookie tokens (`vspias_admin`) with an 8-hour expiry.
- **CSRF Defense:** `X-CSRF-Token` required on all state-mutating requests (`POST /api/admin/*`).
- **Environment Toggle:** `ADMIN_AUTH_DISABLED = process.env.ADMIN_AUTH_DISABLED === 'true'`. Allows local debugging when needed, with strict password enforcement in production. Default fallback password: `vspias@admin2026`.

### 2. Edge Middleware Rate Limiting (`middleware.ts`)
Sliding-window in-memory rate limiter applied to all `/api/*` routes with automatic garbage collection every 60 seconds:
- **`/api/login`:** 10 requests / minute (anti-brute force).
- **`/api/enquiries`:** 30 requests / minute (anti-spam / lead flooding).
- **`/api/admin/*`:** 60 requests / minute.
- **General API:** 120 requests / minute.
- **Response Headers:** Exposes `X-RateLimit-Limit`, `X-RateLimit-Remaining`, and `Retry-After`.

### 3. Form Anti-Spam (Honeypot)
The contact form includes invisible trap fields (`hp`, `honeypot`, `website_url`). If populated by automated spam bots, submissions are silently rejected with `400 Bad Request`.

---

## 9. Comprehensive Route & API Matrix

### Public Pages (App Router)

| Route Path | Type | Component Source | Primary Description |
| :--- | :--- | :--- | :--- |
| `/` | SSR / SSG | `src/app/page.tsx` | Master Homepage featuring 6 discrete blocks H1-H6. |
| `/paper-bags` | SSR / SSG | `src/app/paper-bags/page.tsx` | Paper Bags landing page, product accordion, 3D studio, bento grid, materials. |
| `/paper-bags/[slug]` | SSG (`generateStaticParams`) | `src/app/paper-bags/[slug]/page.tsx` | Deep product detail for `kraft-carry-bags`, `food-takeaway`, `retail-custom-print`. |
| `/automation` | SSR / SSG | `src/app/automation/page.tsx` | Electrical & Industrial Automation portal, switchgear, PLC/VFD rails. |
| `/industrial-solutions` | SSR / SSG | `src/app/industrial-solutions/page.tsx` | Direct routing mirror to automation solutions. |
| `/printing` | SSR / SSG | `src/app/printing/page.tsx` | Flexographic 2-colour printing machinery specifications. |
| `/contact` | SSR | `src/app/contact/page.tsx` | B2B Quotation Desk, WhatsApp CTA, Paawan Bhargava contact, FAQ accordion. |
| `/privacy` | Static | `src/app/privacy/page.tsx` | Corporate Privacy Policy & data protection terms. |
| `/terms` | Static | `src/app/terms/page.tsx` | Terms of Service & commercial supply conditions. |
| `/sitemap.xml` | Dynamic XML | `src/app/sitemap.ts` | Search engine indexing with weekly/monthly priorities. |
| `/robots.txt` | Dynamic Text | `src/app/robots.ts` | Directs web crawlers to allow public pages and block `/admin` and `/api/`. |
| `/admin` | React App Router | `src/app/admin/page.tsx` | Full-featured Next.js React Admin Workspace with tabs for Overview, Catalogue, Enquiries, Media, and Publishing. |

### API Endpoints

| Method | Endpoint | Auth Required | Purpose / Behavior |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/catalog` | None (Public) | Fetches sanitized list of all visible products and live brochures. |
| `POST` | `/api/enquiries` | None (Public) | Submits customer quote enquiry; checks honeypot, validates email/phone, saves to `enquiries.json`. |
| `POST` | `/api/login` | None (Public) | Validates admin password via scrypt; issues `vspias_admin` cookie and CSRF token. |
| `POST` | `/api/logout` | Session Cookie | Clears server session record and cookie. |
| `GET` | `/api/session` | Optional | Returns current authentication status and active CSRF token. |
| `GET` | `/api/admin/catalog`| Admin Session | Returns complete catalog state including revision, drafts, hidden items, and brochures. |
| `POST` | `/api/admin/save` | Admin + CSRF | Validates schema, checks revision lock, atomically persists draft updates to `catalog.json`. |
| `POST` | `/api/admin/publish` | Admin + CSRF | Promotes current draft to live published catalog with fresh timestamp. |
| `POST` | `/api/admin/discard` | Admin + CSRF | Discards working draft and reverts state back to currently published catalog. |
| `POST` | `/api/admin/media` | Admin + CSRF | Uploads base64 image or PDF; inspects magic bytes, hashes content, saves to `data/uploads/`. |
| `GET` | `/api/admin/preview`| Admin Session | Returns draft preview state. |
| `GET` | `/api/admin/enquiries`| Admin Session | Returns reverse-chronological list of all received customer lead records. |
| `DELETE`| `/api/admin/enquiries`| Admin + CSRF | Deletes a customer enquiry record by UUID. |
| `GET` | `/uploads/[filename]`| Conditional | Serves uploaded media. Public if item is in published catalog; requires auth if draft-only. |

---

## 10. Verification, Testing & Quality Assurance

The codebase includes an automated multi-tier testing and verification framework in `frontend/src/tests/`:

### 1. `test_whatsapp.mjs` (Unit Tests)
- Verifies `buildWhatsAppUrl` with empty strings, undefined inputs, and complex multi-line enquiry drafts.
- Asserts presence of India international dialing code (`919783133333`) and absence of invalid `+` symbols in URL path.

### 2. `verify-matrix.mjs` (Integration Matrix Suite)
- **Route Health:** Queries HTTP status for `/`, `/paper-bags`, `/automation`, `/contact`.
- **Homepage Structure:** Verifies exact presence of blocks `id="company-hero"` (H1), `id="automation-rail"` (H2), `id="paper-rail"` (H3), `id="benefits"` (H4), `id="division-solutions"` (H5), and `id="enquiry-connect"` (H6).
- **Anti-Cross-Pollution Gate:** Validates that large division showcases do NOT leak across boundaries.
- **Motion Verification:** Confirms active presence of `vsp-enquiry-button`, `vsp-enquiry-surface`, and `vsp-variable-headline`.

### 3. `integration.mjs` (Comprehensive Backend & Catalog Suite)
- Validates that public catalog returns all active automation and paper packaging products.
- Iterates over product images to verify `HTTP 200` status and valid MIME headers.
- Fetches the published company brochure PDF and cryptographically verifies the `%PDF-` binary magic bytes.
- Asserts that anonymous requests to `/api/admin/catalog` and `/api/admin/save` are rejected with `401 Unauthorized`.

---

## 11. Environment Configuration & Deployment

### Environment Variables Template (`.env.example` & `.env.local`)
```bash
# Admin Dashboard Access Password (minimum 8 characters for production)
ADMIN_PASSWORD=vspias@admin2026

# Optional Auth Bypass for local development/testing (defaults to false)
# ADMIN_AUTH_DISABLED=true

# Site Base URL (used for sitemap.xml, robots.txt, and metadata canonical tags)
NEXT_PUBLIC_SITE_URL=https://vspias.in
```

### Next.js Production Configuration (`next.config.mjs`)
- `images.unoptimized: true`: Ensures static asset serving reliability across diverse hosting platforms without requiring external image optimization servers.
- **Redirects:**
  - Permanent 301 redirects from legacy URLs (`/privacy-policy` -> `/privacy`, `/terms-and-conditions` -> `/terms`).
  - Non-permanent 307 redirects from `.html` extensions (`/automation.html` -> `/automation`, `/index.html` -> `/`).

### Build & Verification Commands
- `npm run typecheck`: Validates strict TypeScript compilation without emission.
- `npm run build`: Compiles production assets and statically prerenders all 17 site routes.
- `npm run dev`: Boots local development server on `http://localhost:3000`.
