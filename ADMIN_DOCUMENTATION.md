# VSPIAS Admin Workspace — Comprehensive Architecture & Technical Specification

> **Author**: Staff / Principal Systems Architect (25+ Years Experience)  
> **Target Audience**: Engineering Team, Technical Leads, System Operators  
> **Status**: Production-Ready / Active Specification  
> **Last Updated**: October 2026

---

## 1. Executive Summary & Design Philosophy

The VSPIAS Admin Dashboard is an **editorial-grade, zero-bloat content management and lead processing system**. Designed intentionally without the bloat, sluggishness, and vulnerability surface of monolithic CMS platforms (such as WordPress or Strapi), the system leverages a **dual-tier architecture**:

1. **Client Tier**: A native, dependency-free Single Page Workspace built with **HTML5, ES6+ Modules, and Vanilla CSS3 custom properties**. It boots instantly, introduces zero vendor lock-in, requires no build compilation step for admin UI tweaks, and delivers 60fps interaction speeds.
2. **Server Tier**: Robust **Next.js App Router (Node.js runtime)** API routes adhering to strict Twelve-Factor App principles, incorporating atomic file operations, optimistic locking revisions, cryptographic CSRF mitigation, constant-time authentication, and in-memory rate-limiting.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           CLIENT BROWSER (/admin)                           │
│  ┌───────────────────────────────┐     ┌──────────────────────────────────┐ │
│  │     Catalogue Workspace       │     │     Customer Enquiries Hub       │ │
│  │ (CRUD, Search, Media, Staging)│     │  (Lead Pipeline, Auditing, IST)  │ │
│  └──────────────┬────────────────┘     └─────────────────┬────────────────┘ │
└─────────────────┼────────────────────────────────────────┼──────────────────┘
                  │ HTTPS JSON / FormData (CSRF + Cookie)  │
                  ▼                                        ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                 NEXT.JS APP ROUTER RUNTIME & MIDDLEWARE                     │
│  ┌───────────────────────────────┐     ┌──────────────────────────────────┐ │
│  │    middleware.ts Rate-Limiter │     │     Auth / CSRF Token Engine     │ │
│  └──────────────┬────────────────┘     └─────────────────┬────────────────┘ │
│                 │                                        │                  │
│                 ▼                                        ▼                  │
│  ┌───────────────────────────────┐     ┌──────────────────────────────────┐ │
│  │  /api/admin/catalog, save,    │     │      /api/admin/enquiries        │ │
│  │  publish, discard, media      │     │                                  │ │
│  └──────────────┬────────────────┘     └─────────────────┬────────────────┘ │
└─────────────────┼────────────────────────────────────────┼──────────────────┘
                  │                                        │
                  ▼                                        ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                        DATA PERSISTENCE & ASSETS                            │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │ • data/catalog.json (Draft & Published Revision Tree)                 │  │
│  │ • data/enquiries.json (Serialized Write Queue)                        │  │
│  │ • public/uploads/* (Sanitized binary assets: WebP/PNG/PDF)            │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Visual Theme & Aesthetics Specification

The dashboard follows the **VSPIAS Nordic Industrial & Eco-Craft design language**. It mirrors the high-end, tactile identity of the public website while providing high-density ergonomic workflows for content managers.

### 2.1 Color Palette & Design Tokens
Defined in [`public/base.css`](file:///Users/ideaind/Desktop/tech/VSPIAS/frontend/public/base.css) and scoped in [`public/admin.css`](file:///Users/ideaind/Desktop/tech/VSPIAS/frontend/public/admin.css):

| Token Name | Hex Code | Semantic Role |
| :--- | :--- | :--- |
| `--ink` | `#173b30` | Deep Forest Emerald. Used for headers, primary action buttons, active tabs, and primary typography. |
| `--paper` | `#f5f3eb` | Organic warm eggshell background. Prevents eye fatigue during extended editing sessions. |
| `--white` | `#fffef9` | Card and input background; crisp contrast against the `--paper` canvas. |
| `--line` | `#d8ddd3` | Soft olive-gray border lines separating panels, inputs, and list rows. |
| `--lime` | `#dbe999` | Accent highlight color indicating active states, badges, and progress feedback. |
| `--muted` | `#5c6a60` | Secondary metadata text, instructions, and input placeholder elements. |
| `Error state` | `#742e27` / `#9b1c1c` | Crimson alert background for validation or authorization exceptions. |

### 2.2 Typography & Visual Rhythm
- **Primary Typeface**: System-native grotesque stack (`Arial, Helvetica, sans-serif`) optimized for zero layout shift (CLS) and instant font rendering without remote CDN dependencies.
- **Display Headings**: High-contrast, negative letter-spacing (`letter-spacing: -0.052em`) for titles (`50px` – `58px`).
- **Data Tables & Fields**: Crisp `11px` – `13px` labeling with uppercase tracking (`letter-spacing: 0.1em – 0.17em`) for operational metadata.
- **Responsive Layout**:
  - **Desktop (>1100px)**: 2-column workspace with a `300px` sticky product selector alongside an expansive multi-column editor.
  - **Tablet (800px – 1100px)**: Fluid adjustment to `250px` sidebar.
  - **Mobile (<800px)**: Single-column linear layout with touch-friendly 44px minimum touch targets and mobile-safe `16px` inputs preventing iOS zoom.

---

## 3. Completed Modules & Functional Capabilities

The admin system currently encapsulates four operational pillars:

### 3.1 Authentication, Session, & Rate-Limiting
- **Authentication Method**: Password-gated challenge via `/api/login` leveraging Node crypto `scryptSync` / `timingSafeEqual` constant-time string evaluation to prevent side-channel timing attacks.
- **Session Transport**: Secure HTTP-only session cookies paired with dynamic CSRF tokens (`X-CSRF-Token`).
- **Session Introspection**: `/api/session` automatically determines whether the local instance has `ADMIN_PASSWORD` initialized and automatically hydrates authenticated sessions on page refresh.
- **Rate-Limiting Defense**: [`src/middleware.ts`](file:///Users/ideaind/Desktop/tech/VSPIAS/frontend/src/middleware.ts) enforces an in-memory sliding window:
  - Max 10 login attempts per minute per IP.
  - Max 30 write operations per minute on administrative mutation endpoints.
  - Returns `429 Too Many Requests` with retry headers.

### 3.2 Module 1: Product Catalogue Lifecycle Management
Located under the **"Catalogue Range"** tab:
1. **Real-Time Search & Filtering**: Client-side filtering through the product catalog by name and brand substring without triggering roundtrips.
2. **Product CRUD**:
   - Add new items with cryptographic UUIDs (`product-xxxxxxxx`).
   - Edit Name, Brand, Category, Division (*Paper Bag Manufacturing* vs. *Industrial Automation & Electricals*), Description, Display Order, and Brochure Citation Page.
   - Toggle visibility on the live site without deleting records.
   - Toggle "Illustrative Image" disclaimer flags for compliance.
3. **Optimistic Revision Staging**:
   - **Save Draft**: Saves modifications into a draft staging tree. Each save increments the integer `revision`.
   - **Concurrency / Conflict Protection**: If another session or tab modified the draft, the server returns `409 Conflict`, preventing accidental overwrites.
   - **Discard Draft**: Instant rollback to the published snapshot in one click.
4. **Draft Preview Pipeline**:
   - Content editors can click **"Preview Saved Draft ↗"**.
   - This opens the public storefront with `?preview=draft`, allowing live visualization of how new products, orders, and images will look before publishing.
5. **Atomic Publish**:
   - One-click deployment from staged draft to production catalogue (`/api/admin/publish`).
   - The public storefront `/api/catalog` immediately reflects the new catalogue state with zero server restarts.

### 3.3 Module 2: Digital Asset & Brochure Management
1. **Image Media Pipeline**:
   - Accepts PNG, JPEG, and WebP up to 10 MB.
   - Inspects binary magic bytes on the backend to guarantee file integrity (rejects SVGs, executables, or disguised HTML to prevent XSS).
   - Writes to `public/uploads/` with SHA-hashed filenames and binds relative URLs directly to the product record.
2. **Dual Division Brochure Ingestion**:
   - **Industrial Automation & Electricals Brochure**: Upload and overwrite the master PDF specification (up to 18 MB).
   - **Paper Packaging Brochure**: Upload and bind dedicated paper catalog PDF (with graceful fallback to quote request action if not present).

### 3.4 Module 3: Customer Enquiries & Lead Pipeline
Located under the **"Customer Enquiries"** tab:
1. **Submission Pipeline**: Contact and quote forms on the frontend serialize customer intent into `/api/enquiries`.
2. **Lead Card Visualizer**:
   - Displays Name, clickable email (`mailto:`), phone (`tel:`), company, and division tag.
   - Formats timestamp to **Indian Standard Time (IST)** (`Asia/Kolkata`).
   - Extracts custom quotation attributes: requested quantity, bag finish, brand customizer specs, and industry sector.
3. **Lead Governance & Deletion**:
   - Real-time lead count badge on the tab header.
   - Individual lead deletion with dual-confirmation safeguards (`/api/admin/enquiries?id=...`).
   - In-memory/disk queue serialization ensuring zero data corruption during simultaneous writes.

---

## 4. Architectural Implementation & Code Map

### 4.1 File Inventory

```
frontend/
├── public/
│   ├── admin.html          # Semantic HTML layout of the workspace & login gate
│   ├── admin.js            # Modular reactive client controller (no external runtime)
│   ├── admin.css           # Layout grids, responsive queries, and design tokens
│   ├── base.css            # Global CSS variables & typography tokens
│   └── catalog.seed.json   # Immutable baseline seed data
├── data/
│   ├── catalog.json        # Active state tree (contains revision, published, draft)
│   └── enquiries.json      # Structured lead submissions store
├── src/
│   ├── middleware.ts       # Rate limiting, security headers, IP governance
│   ├── lib/
│   │   ├── catalog-service.ts # Core domain service: schema checks, file IO, atomic renames
│   │   └── enquiry-store.ts   # Thread-safe queue for lead persistence
│   └── app/
│       ├── api/
│       │   ├── session/     # Auth verification & configuration status
│       │   ├── login/       # Password challenge & CSRF generation
│       │   ├── logout/      # Cookie expiration
│       │   ├── catalog/     # Public published catalog feed
│       │   └── admin/
│       │       ├── catalog/ # Draft inspection endpoint
│       │       ├── save/    # Staging write with revision check
│       │       ├── publish/ # Atomic promotion of draft to production
│       │       ├── discard/ # Draft rollback
│       │       ├── preview/ # Authenticated preview feed
│       │       ├── media/   # Magic-byte validated file upload
│       │       └── enquiries/# Lead collection and deletion
```

### 4.2 Data Storage Model (`data/catalog.json`)

```json
{
  "revision": 14,
  "publishedAt": "2026-10-21T18:30:00.000Z",
  "published": {
    "schemaVersion": 1,
    "brochure": "/uploads/automation-brochure.pdf",
    "paperBrochure": "/uploads/paper-brochure.pdf",
    "products": [
      {
        "id": "product-e4a8b1c2",
        "name": "Luxury Boutique Kraft Bag",
        "brand": "VSPIAS EcoPackaging",
        "category": "Retail Packaging",
        "division": "paper",
        "image": "assets/paper-luxury-boutique-bags.webp",
        "alt": "Custom luxury paper shopping bag",
        "description": "Premium FSC-certified kraft bag with twisted paper handles.",
        "source": "Catalog 2026",
        "sourcePage": 12,
        "illustrative": false,
        "visible": true,
        "order": 1
      }
    ]
  },
  "draft": {
    "schemaVersion": 1,
    "brochure": "/uploads/automation-brochure.pdf",
    "paperBrochure": "/uploads/paper-brochure.pdf",
    "products": [ /* Staged items */ ]
  }
}
```

### 4.3 Atomic File-Write Mechanism
To eliminate file-lock collisions and partial writes in Node.js, both `catalog-service.ts` and `enquiry-store.ts` employ **serialized promises combined with temporary file renames**:

```typescript
// Pattern utilized across catalog-service.ts & enquiry-store.ts
const tmpFile = TARGET_FILE + '.' + crypto.randomBytes(6).toString('hex') + '.tmp';
await fs.writeFile(tmpFile, JSON.stringify(data, null, 2), { mode: 0o600 });
await fs.rename(tmpFile, TARGET_FILE); // Atomic POSIX rename
```

---

## 5. Security & Production Hardening

1. **CSRF Prevention**: Every mutation (`POST`, `DELETE`) verifies the `X-CSRF-Token` header against the token cryptographically tied to the user's active session. Untrusted origins are rejected with `403 Forbidden`.
2. **MIME Magic Byte Sniffing**: Files uploaded via `/api/admin/media` have their buffer headers inspected:
   - PNG: `89 50 4E 47`
   - JPEG: `FF D8 FF`
   - WebP: `52 49 46 46 ... 57 45 42 50`
   - PDF: `25 50 44 46` (`%PDF`)
   Any spoofed file extension is rejected with `400 Bad Request`.
3. **Crawler Isolation**: [`src/app/robots.ts`](file:///Users/ideaind/Desktop/tech/VSPIAS/frontend/src/app/robots.ts) explicitly disallows search engines:
   ```typescript
   disallow: ['/admin', '/admin.html', '/api/']
   ```
4. **Data Validation**: Strict length caps, enum checks, and type guards on all form inputs prevent database pollution and buffer bloat.

---

## 6. How to Run, Test, and Extend

### 6.1 Local Configuration
Create or update `frontend/.env.local`:
```bash
ADMIN_PASSWORD=your_strong_admin_passphrase
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 6.2 Accessing the Workspace
1. Start the development server:
   ```bash
   cd frontend
   npm run dev
   ```
2. Navigate to: **`http://localhost:3000/admin`**
3. Enter `ADMIN_PASSWORD` and click **Sign in ↗**.

### 6.3 Standard Operating Procedures (SOPs)

#### How to Add a New Product:
1. Sign in to `/admin`.
2. Click **"+ Add"** in the sidebar.
3. Fill in product details (Name, Brand, Division, Category, Description).
4. Upload an optimized image (`.webp` recommended).
5. Check **"Visible on website"**.
6. Click **"Save Draft"** -> Click **"Preview Saved Draft ↗"** to verify visual presentation.
7. Click **"Publish"** to push live.

#### How to Process Enquiries:
1. Select the **"Customer Enquiries"** tab.
2. Review customer specifications and requirements.
3. Once contacted or handled in your CRM, click **"Delete"** to clear the card from the active inbox.

---

## 7. Recommended Next-Phase Enhancements

As the platform scales, the following high-value upgrades are architecturally recommended:

1. **Enquiry Export**: Add a one-click **"Export to CSV / Excel"** button in `/api/admin/enquiries` for automated CRM synchronization.
2. **Email / Webhook Dispatch**: Integrate Resend or SendGrid in `enquiry-store.ts` to dispatch instant SMS/email alerts when new leads submit forms.
3. **Next.js React Dashboard Transition**: If team composition favors React over Vanilla JS in the future, migrate `public/admin.html` into a TypeScript React Server Component route inside `app/admin/page.tsx` while keeping all existing API endpoints intact.
