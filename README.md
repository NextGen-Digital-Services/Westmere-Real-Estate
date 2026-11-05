# VAN DER MEER & CO. — Netherlands Real Estate Practice

A frontend demonstration of an Italian-inspired luxury Netherlands real estate portal and administrative management suite. Built with Next.js (App Router), TypeScript, and Tailwind CSS.

---

## 1. Quick Start

Ensure you have Node.js 18+ installed.

```bash
# Install dependencies
npm install

# Launch development server
npm run dev

# Create optimized production build
npm run build
```

The application will be live at `http://localhost:3000`.

---

## 2. Demo Administrator Credentials

The admin suite is protected via mock authentication with localStorage persistence:

- **Portal URL**: `/admin` (or `/admin/login`)
- **Administrator Email**: `admin@demo.com`
- **Security Passkey**: `Admin@123`
- *Click the "Autofill" button on the login screen for 1-click access.*

---

## 3. Project Architecture & Folder Structure

```
├── src/
│   ├── app/                    # Next.js App Router routes & layouts
│   │   ├── (public pages)      # buy, rent, commercial, projects, sell, valuation, team, blog...
│   │   ├── properties/[slug]/  # SEO-optimized dynamic property detail
│   │   ├── admin/              # 16 complete admin suite modules
│   │   ├── sitemap.ts          # Search engine sitemap XML generator
│   │   └── robots.ts           # Robots.txt directives
│   ├── components/
│   │   ├── ui/                 # Flat luxury buttons, badges, modals, drawers, toasts
│   │   ├── layout/             # Sticky header, Cypress footer, GDPR cookie banner, mobile drawer
│   │   ├── home/               # 11 homepage sections in exact sequence
│   │   ├── property/           # Gallery, specs table, energy scale, floorplans, maps
│   │   ├── calculators/        # 5 Dutch mortgage & tax calculators (Annuity, Overdrachtsbelasting)
│   │   └── admin/              # Dashboard charts, CRM Kanban drawer, email modals, property form
│   ├── config/
│   │   ├── site.ts             # CENTRAL BRAND CONFIGURATION ([CLIENT_NAME], address, hours)
│   │   ├── rates.ts            # Netherlands statutory tax rates (Overdrachtsbelasting) & defaults
│   │   └── content/            # Multilingual dictionary ready for Dutch & German expansion
│   ├── data/                   # Verified typed mock datasets (properties, agents, leads, etc.)
│   ├── hooks/                  # Framer motion useScrollReveal, useCounter, useFavourites
│   ├── lib/                    # Storage persistence, auth helpers, EUR formatters
│   └── types/                  # Strict TypeScript domain interfaces
├── vercel.json                 # Security headers and clean URLs
└── tailwind.config.ts          # Solid flat Italian luxury palette tokens
```

---

## 4. How to Customize Brand Name, Colors & Images

### Brand Name
Open [`src/config/site.ts`](file:///media/fahad/Storage1/react_application/real_estate_international/src/config/site.ts) and modify `SITE_CONFIG.name`, address, and contacts. All components reference this central definition.

### Color Palette
The flat luxury palette is defined in [`tailwind.config.ts`](file:///media/fahad/Storage1/react_application/real_estate_international/tailwind.config.ts):
- **Marble Ivory**: `#F7F3EA` (`bg-marble`)
- **Pure White**: `#FFFFFF` (`bg-white`)
- **Travertine**: `#EBE3D3` (`bg-travertine`)
- **Stone Border**: `#D8CDB8` (`border-stone-border`)
- **Deep Charcoal**: `#23221F` (`text-charcoal`)
- **Warm Grey**: `#6B665C` (`text-warm-grey`)
- **Tuscan Olive**: `#3E4A2F` (`bg-olive`)
- **Cypress Dark Green**: `#2A3321` (`bg-cypress`)
- **Aged Brass**: `#A8844B` (`text-brass`)
- **Terracotta**: `#A9553A` (`text-terracotta`)
- **Success Sage**: `#5E7A4A` (`text-sage`)

### Images
All images are centrally declared and verified in [`src/data/images.ts`](file:///media/fahad/Storage1/react_application/real_estate_international/src/data/images.ts). Replace any URL with your own CDN or photographic assets.

---

## 5. Backend Integration Notes

This application is engineered as a clean frontend architecture. When connecting a production backend and database:

1. **Property Inventory**:
   - Replace `getStoredProperties()` in [`src/lib/storage.ts`](file:///media/fahad/Storage1/react_application/real_estate_international/src/lib/storage.ts) with `fetch('/api/properties')` or server actions querying PostgreSQL / Supabase / Prisma.
2. **CRM Leads**:
   - Replace `addStoredLead()` with a `POST /api/leads` endpoint that sends notifications to advisors and writes to the CRM database.
3. **Appointment Scheduling & Conflict Prevention**:
   - The conflict algorithm in `hasAppointmentConflict()` can be moved to a transactional database constraint (`UNIQUE (agent_id, date, time_slot)` where `status = 'Confirmed'`).
4. **Authentication**:
   - Replace `src/lib/auth.ts` mock verification with NextAuth.js, Auth0, or Supabase Auth.
5. **Media Storage**:
   - Point the image upload input in [`src/components/admin/PropertyForm.tsx`](file:///media/fahad/Storage1/react_application/real_estate_international/src/components/admin/PropertyForm.tsx) to AWS S3, Cloudinary, or Vercel Blob.
