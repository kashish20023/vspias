# VSPIAS — Master Architecture, Engineering & Systems Knowledge Base (`brain.md`)

> **Repository**: `VSPIAS Ecoautomation Pvt Ltd`  
> **Classification**: Enterprise Core Architecture, Technical Specification & Operations Guide  
> **Status**: Production-Grade / Active Specification  
> **Runtime Environment**: Next.js (App Router, Node.js Runtime), React 18, TypeScript, Tailwind CSS (Scoped)  
> **Last Verified & Synchronized**: October 2026

---

## 1. Executive Summary & Business Architecture

**VSPIAS Ecoautomation Pvt. Ltd.** operates an integrated dual-division manufacturing and engineering business:
1. **Industrial Automation Division**: Authorized channel solutions for Schneider Electric, Siemens, ABB, and L&T systems — including Variable Frequency Drives (Altivar VFDs), Modicon PLCs, HMIs, contactors, switchgear, and turnkey industrial electrical control panels.
2. **Sustainable Paper Packaging Division**: Eco-friendly, automated high-speed paper bag manufacturing — delivering custom-printed brown kraft carry bags, luxury boutique shopping bags with twisted paper rope handles, pinch-bottom grocery/patisserie sacks, and industrial packaging paper rolls.

### Architectural Core Principles
* **Zero-Bloat Headless Architecture**: Eliminates monolithic, sluggish CMS platforms (WordPress, Strapi) in favor of lightweight, atomic, file-backed persistence with zero vendor lock-in.
* **Dual-Surface CSS Isolation (`[data-admin]`)**: Admin styles and public storefront styles are strictly segregated. Admin rules reside under `[data-admin]` selectors, guaranteeing zero visual regressions or CSS leaks to public customer-facing routes.
* **Optimistic Staged Publishing**: Changes to products and technical documents are staged in a live working draft tree before being committed and published to the live store with revision tracking.
* **Enterprise Security Standards**: Constant-time cryptographic password verification, CSRF token validation on all mutating verbs, HTTP-only SameSite cookies, host/origin verification, and rate limiting.

---

## 2. Repository & Directory Structure

```
VSPIAS/
├── brain.md                        # Master systems architecture & knowledge base (this file)
├── ADMIN_DOCUMENTATION.md          # Technical manual & operations guide for admin workspace
├── package.json                    # Monorepo scripts and root configuration
├── frontend/
│   ├── .env.example                # Template for environment variables
│   ├── .env.local                  # Local development secrets (ADMIN_PASSWORD, NEXT_PUBLIC_SITE_URL)
│   ├── next.config.mjs             # Next.js compiler, image domains & security headers
│   ├── tailwind.config.ts          # Tailwind config (preflight: false to prevent bleed)
│   ├── postcss.config.mjs          # PostCSS processing pipeline
│   ├── data/                       # File-backed persistence store
│   │   ├── catalog.json            # Active catalog state (published & draft revision tree)
│   │   ├── enquiries.json          # Serialized queue of incoming customer RFQs/enquiries
│   │   └── uploads/                # Sanitized user uploads (brochures, custom product photos)
│   ├── public/                     # Static production assets
│   │   ├── catalog.seed.json       # Immutable fallback seed for cold boots
│   │   ├── assets/
│   │   │   ├── approved-hero-composite.png   # 2400x720 2x Retina 4K UHD homepage banner
│   │   │   ├── approved-hero-composite.webp  # Ultra-fast high-compression hero banner
│   │   │   ├── reference/
│   │   │   │   ├── vspias-logo.png           # Official primary brand logo (light backgrounds)
│   │   │   │   └── vspias-logo-white.png     # High-contrast official logo (dark backgrounds)
│   │   │   └── approved/                     # Curated division and category imagery
│   ├── src/
│   │   ├── app/                    # Next.js App Router root
│   │   │   ├── layout.tsx          # Storefront root layout (SiteHeader, SiteFooter)
│   │   │   ├── page.tsx            # Storefront homepage (Blocks H1-H6)
│   │   │   ├── automation/page.tsx # Industrial automation showcase & solutions
│   │   │   ├── paper-bags/page.tsx # Paper packaging product showcase & specifications
│   │   │   ├── contact/page.tsx    # Customer enquiry desk & RFQ form
│   │   │   ├── admin/
│   │   │   │   ├── layout.tsx      # Admin wrapper injecting [data-admin] and scoped styles
│   │   │   │   └── page.tsx        # Admin SPA state machine & view router
│   │   │   └── api/                # Secure server route handlers
│   │   │       ├── session/route.ts        # Session introspection & auth status
│   │   │       ├── login/route.ts          # Constant-time auth & session cookie issuer
│   │   │       ├── logout/route.ts         # Session teardown & cookie revocation
│   │   │       ├── enquiries/route.ts      # Public customer enquiry ingestion
│   │   │       └── admin/
│   │   │           ├── catalog/route.ts    # Admin catalog read & staged draft inspection
│   │   │           ├── save/route.ts       # Save staged modifications to working draft
│   │   │           ├── publish/route.ts    # Commit working draft to published live store
│   │   │           ├── discard/route.ts    # Rollback working draft to live published state
│   │   │           ├── enquiries/route.ts  # Admin enquiry retrieval, update & deletion
│   │   │           ├── media/route.ts      # PDF brochure & media file management
│   │   │           └── preview/route.ts    # Live storefront preview synchronization
│   │   ├── components/
│   │   │   ├── admin/              # Admin workspace component suite
│   │   │   │   ├── AdminSidebar.tsx        # Brand block, workspace switcher, nav & sign-out
│   │   │   │   ├── AdminTopbar.tsx         # Breadcrumbs, global search & action triggers
│   │   │   │   ├── OverviewView.tsx        # KPIs, analytics chart, enquiry table & donut
│   │   │   │   ├── CatalogueView.tsx       # Product grid/table, filters & drawer triggers
│   │   │   │   ├── EnquiriesView.tsx       # Customer lead pipeline & status management
│   │   │   │   ├── MediaView.tsx           # Brochure PDF manager & asset preview
│   │   │   │   ├── PublishingView.tsx      # Staged change diff list & live release engine
│   │   │   │   ├── LoginModal.tsx          # Centered enterprise authentication modal
│   │   │   │   ├── ProductEditorDialog.tsx # Side-sheet product creation & editing drawer
│   │   │   │   ├── EnquiryDetailDialog.tsx # Customer enquiry deep-dive & contact drawer
│   │   │   │   ├── ConfirmDialog.tsx       # Accessible modal for dangerous destructive actions
│   │   │   │   ├── AdminIcons.tsx          # High-performance inline SVG icon registry
│   │   │   │   ├── admin-types.ts          # Strict TypeScript interfaces for admin domain
│   │   │   │   └── admin-utils.ts          # Difference computation & formatting utilities
│   │   │   ├── home/               # Homepage structural section blocks (H1-H6)
│   │   │   │   ├── CompanyHero.tsx         # Panoramic hero with 2400x720 UHD composite
│   │   │   │   ├── AutomationRail.tsx      # Industrial electrical hardware slider
│   │   │   │   ├── PaperRail.tsx           # Paper packaging products rail
│   │   │   │   ├── BenefitsSection.tsx     # Company core value propositions
│   │   │   │   ├── DivisionSolutions.tsx   # Dual division solution cards
│   │   │   │   └── EnquiryConnect.tsx      # Homepage RFQ connect section
│   │   │   ├── bags/               # Paper bags division interactive components
│   │   │   ├── automation/         # Automation division interactive components
│   │   │   ├── studio/             # Interactive packaging customizer (Bag Studio)
│   │   │   └── layout/             # SiteHeader & SiteFooter
│   │   ├── styles/
│   │   │   ├── admin-base.css      # Core scoped admin design system (~1000 lines)
│   │   │   ├── admin-tailwind.css  # Scoped utility imports for admin
│   │   │   ├── enhancements.css    # Public storefront theme, animations & layouts
│   │   │   └── globals.css         # Font-face declarations & core CSS reset
│   │   ├── lib/
│   │   │   ├── catalog-service.ts  # Core server-side data management & security engine
│   │   │   └── whatsapp.ts         # Direct WhatsApp lead integration generator
│   │   └── content/
│   │       └── assets.ts           # Verified asset registry with SHA-256 hashes
│   └── tests/
│       ├── verify-matrix.mjs       # Automated route, DOM & matrix verification test
│       └── integration.mjs         # End-to-end admin API workflow test suite
```

---

## 3. Design System & Aesthetic Tokens

The visual identity follows the **Nordic Industrial & Eco-Craft** design philosophy, balancing precision industrial engineering with tactile sustainability.

### 3.1 Color Palette & Design Tokens

| Token Name | CSS Custom Property | Value | Semantic Role |
| :--- | :--- | :--- | :--- |
| **Deep Forest Ink** | `--ink` | `#173b30` | Primary brand color, sidebar background, headings, primary buttons |
| **Tactile Warm Paper** | `--paper` | `#f5f3eb` | Primary page canvas, card backgrounds, natural craft aesthetic |
| **Pure White** | `--white` | `#fffef9` | Card surfaces, dialog backgrounds, input canvas |
| **Subtle Border Line** | `--line` | `#d8ddd3` | Structural dividers, card borders, table row separators |
| **Eco Lime Accent** | `--lime` | `#dbe999` | Active navigation pill, brand status dots, accent metric indicators |
| **Muted Forest Green** | `--muted` | `#5c6a60` | Secondary copy, metadata captions, inactive icons |
| **Soft Surface** | `--soft` | `#edf0e7` | Hover states, search inputs, subtle chip backgrounds |
| **Safety / Error** | `--error` | `#742e27` | Form validation errors, destructive button states |

### 3.2 Typography Guidelines
* **Primary Typeface**: `Manrope` (Self-hosted `/assets/Manrope.ttf`, 200–800 weights).
* **Headings**: Clean geometric sans-serif with tight letter-spacing (`-0.03em` to `-0.045em`).
* **Technical Labels & Eyebrows**: Small uppercase tracking (`0.14em` to `0.22em`), font-weight 700.
* **Numbers & Metrics**: Tabular figures with clear visual hierarchy.

---

## 4. Administrative Workspace & Security Architecture

### 4.1 Authentication & Session Lifecycle
```
[User Browser]
      │
      │  1. GET /api/session (checks for 'vspias_admin' cookie)
      ▼
[API Server] ────► [Session Found & Valid?]
                         ├── YES ──► Return { authenticated: true, csrf: token }
                         └── NO  ──► Return { authenticated: false, csrf: null }
                                          │
                                          ▼
                                   [Show LoginModal]
                                          │
                                          │  2. POST /api/login { password }
                                          ▼
                                   [Constant-Time Scrypt Check]
                                          │
                                          ├── FAIL ──► 401 Incorrect Password
                                          └── PASS ──► Set-Cookie: vspias_admin (HttpOnly, SameSite=Strict)
                                                       Return { authenticated: true, csrf: token }
```

* **Password Security**: Evaluated using Node.js `scryptSync` with a cryptographic 32-byte salt and constant-time buffer comparison (`timingSafeEqual`) to prevent timing attacks.
* **Cookie Configuration**: `vspias_admin`, `HttpOnly: true`, `SameSite: strict`, `path: /`, `maxAge: 28800` (8 hours).
* **CSRF Mitigation**: Every mutating administrative request (`POST`, `PUT`, `DELETE`) requires an `X-CSRF-Token` header that matches the active cryptographic session token.
* **Origin / Host Verification**: Host and origin headers are strictly validated against verified domains (`localhost`, `127.0.0.1`, `vspias.in`) to prevent DNS rebinding and cross-site scripting.

### 4.2 Optimistic Staging & Publishing Workflow
1. **Working Draft (`catalogState.draft`)**: All edits made in the admin UI modify the client's working draft in memory.
2. **Save Draft (`POST /api/admin/save`)**: Flushes working copy to `data/catalog.json` under `draft`. The live website remains untouched.
3. **Difference Engine (`computeDifferences`)**: Real-time algorithmic comparison between `published` and `draft` objects. Categorizes changes into `added`, `modified`, and `removed`.
4. **Publish Live (`POST /api/admin/publish`)**: Atomically copies `draft` into `published`, increments `revision`, stamps `publishedAt` timestamp, and writes atomically using temporary file renaming.
5. **Discard Draft (`POST /api/admin/discard`)**: Resets `draft` back to match `published`, clearing all uncommitted changes.

### 4.3 Data Structures (`catalog.json`)

```typescript
export interface ProductItem {
  id: string;                    // Unique slug, e.g. "schneider-atv630"
  name: string;                  // Display title
  brand: string;                 // "Schneider Electric", "Siemens", "VSPIAS", etc.
  category: string;              // "VFD Drives", "Paper Bags", "PLC", etc.
  division: 'paper' | 'automation';
  image: string;                 // Relative asset URL (/assets/...)
  alt: string;                   // Accessible image description
  description: string;           // Technical specification summary
  source: string;                // Catalog reference source
  sourcePage: number | null;     // Page number in official brochure
  illustrative: boolean;         // Designates illustrative vs exact product photo
  visible: boolean;              // Public storefront visibility flag
  order: number;                 // Sort order integer
}

export interface CatalogData {
  schemaVersion: number;
  brochure: string;              // Automation brochure PDF path
  paperBrochure?: string;        // Paper packaging brochure PDF path
  products: ProductItem[];
}

export interface CatalogState {
  revision: number;
  publishedAt: string | null;
  published: CatalogData;
  draft: CatalogData;
}
```

---

## 5. Storefront & Customer Journey Architecture

### 5.1 Homepage Structural Sections (Blocks H1–H6)
* **H1: `CompanyHero`**: Full-bleed panoramic hero featuring the high-resolution (`2400x720` UHD) dual-division composite banner seamlessly feathered into solid `#12382c` background.
* **H2: `AutomationRail`**: Interactive product rail displaying flagship industrial drives, PLCs, and electrical switchgear with instant RFQ inquiry modal triggers.
* **H3: `PaperRail`**: Tactile packaging showcase presenting natural kraft carry bags, luxury boutique bags, and food-grade packaging.
* **H4: `BenefitsSection`**: Core value pillars (Sustainable Eco-Craft, Engineered Reliability, Bulk Procurement Logistics).
* **H5: `DivisionSolutions`**: High-impact split cards routing traffic directly to the dedicated Automation and Paper Bags portals.
* **H6: `EnquiryConnect`**: Direct RFQ inquiry submission desk persisting directly into `data/enquiries.json` and notifying operators.

### 5.2 Interactive Packaging Studio (`BagStudio`)
* Allows clients to configure paper packaging specifications in real time:
  * Dimensions (Height × Width × Gusset)
  * Paper substrate (Brown Kraft, White Kraft, Virgin Pulp, Recycled)
  * GSM thickness (80 GSM to 220 GSM)
  * Handle styles (Twisted paper rope, flat fold, die-cut, cotton ribbon)
  * Printing options (1-color flexo up to 6-color high-definition offset)
* Generates instant specification summaries and routes direct inquiry payloads to the sales desk.

---

## 6. High-Resolution Asset Management

### 6.1 Brand Identity Assets
* Primary Storefront Logo: [`/assets/reference/vspias-logo.png`](file:///Users/ideaind/Desktop/tech/VSPIAS/frontend/public/assets/reference/vspias-logo.png) (`835x231` RGBA, transparent, dark typography with yellow bolt & green leaf).
* Dark-Surface Admin & Footer Logo: [`/assets/reference/vspias-logo-white.png`](file:///Users/ideaind/Desktop/tech/VSPIAS/frontend/public/assets/reference/vspias-logo-white.png) (`835x231` RGBA, transparent, crisp white typography with preserved yellow bolt & green leaf).

### 6.2 Flagship Hero Banner
* Composite PNG: [`/assets/approved-hero-composite.png`](file:///Users/ideaind/Desktop/tech/VSPIAS/frontend/public/assets/approved-hero-composite.png) (`2400x720`, 2x Retina 4K UHD).
* Modern WebP: [`/assets/approved-hero-composite.webp`](file:///Users/ideaind/Desktop/tech/VSPIAS/frontend/public/assets/approved-hero-composite.webp) (`2400x720`, 150KB ultra-fast compression).
* Rendered via semantic `<picture>` tags for optimal Core Web Vitals and zero LCP layout shifts.

---

## 7. Quality Assurance & Verification Matrix

The repository enforces strict verification standards before deployment:

```bash
# 1. Strict TypeScript Compile Check (Zero errors policy)
npx tsc --noEmit

# 2. Automated Route & Structural DOM Matrix Test
node src/tests/verify-matrix.mjs

# 3. Full Integration & API State Machine Test
node src/tests/integration.mjs
```

### Verified Test Matrix Status
* `GET /` — 200 OK (Contains H1–H6 blocks, disallows unauthorized long sections)
* `GET /paper-bags` — 200 OK (Verified packaging catalog & promotional cross-rails)
* `GET /automation` — 200 OK (Verified industrial automation rail & hardware showcase)
* `GET /contact` — 200 OK (Verified contact desk & lead intake form)
* `GET /admin` — 200 OK (Protected behind authentication gate; verified centered login card)
* `GET /api/session` — 200 OK (Verified session cookie and CSRF introspection)

---

## 8. Deployment & Environment Setup

### Environment Variables (`frontend/.env.local`)
```env
# Admin Workspace Master Password (minimum 8 characters)
ADMIN_PASSWORD=your_secure_admin_password_here

# Canonical Public Domain URL
NEXT_PUBLIC_SITE_URL=https://vspias.in
```

### Local Development Quickstart
```bash
# Navigate to frontend workspace
cd frontend

# Install exact locked dependencies
npm install

# Launch local development server on port 3000
npm run dev

# Open workspace in browser
# Storefront: http://localhost:3000
# Admin CMS:   http://localhost:3000/admin (Default dev password: vspias@admin2026)
```

---
*Documented and maintained by the VSPIAS Systems & Platform Engineering Team.*
