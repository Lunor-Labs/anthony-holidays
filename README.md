# Anthony Holidays - Monorepo Architecture & Deployment

Anthony Holidays is an editorial, luxury travel website and Content Management System built for an inquiry-driven Sri Lankan travel agency led by Licensed National Tourist Guide Lecturers.

The project is structured as an npm workspaces monorepo separating the **Next.js 16 Web Frontend** and the **Payload CMS 3.x Headless Backend**.

---

## 1. Monorepo Directory Structure

```
anthony-holidays/
├── apps/
│   ├── web/                     # Next.js 16 Luxury Editorial Frontend (Port 3000)
│   │   ├── public/              # Hero photography, brand assets, icons
│   │   ├── src/
│   │   │   ├── app/             # App router (15 luxury editorial travel pages)
│   │   │   ├── components/      # Editorial UI components (Hero, Itinerary, etc.)
│   │   │   ├── data/            # Static tour catalogs & offline fallbacks
│   │   │   └── lib/             # REST API client with 60s ISR caching & utilities
│   │   ├── .env.example
│   │   ├── next.config.ts       # Clean Next.js 16 config (no heavy DB drivers)
│   │   └── package.json
│   │
│   └── cms/                     # Payload CMS 3.x Standalone Headless Backend (Port 3001)
│       ├── public/media/        # Uploaded CMS photography & media files
│       ├── src/
│       │   ├── app/             # Payload Admin Studio (/admin) & REST API (/api/*)
│       │   ├── payload/         # 9 Collections (Journeys, Packages, Inquiries, etc.)
│       │   └── scripts/         # PostgreSQL database seeding scripts
│       ├── ecosystem.config.cjs # PM2 production configuration for Ubuntu / OVH VPS
│       ├── nginx.conf.example   # Nginx reverse proxy template with SSL & caching
│       ├── deploy.sh            # Zero-downtime deployment script on VPS
│       ├── .env.example
│       ├── next.config.ts       # withPayload backend configuration
│       └── package.json
│
├── DEPLOYMENT-GUIDE.md          # Complete step-by-step Linux VPS deployment guide
├── package.json                 # Monorepo root with npm workspaces ("apps/*")
└── README.md
```

---

## 2. Quick Start (Local Development)

### Install All Dependencies
```bash
npm install
```

### Run Both Apps Concurrently
```bash
npm run dev
```

### Run Apps Independently
```bash
# Run Next.js Web Frontend (http://localhost:3000)
npm run dev:web

# Run Payload CMS Backend (http://localhost:3001/admin)
npm run dev:cms
```

### Seed PostgreSQL Database
```bash
npm run seed
```

### Build for Production
```bash
# Build both workspaces:
npm run build

# Or individually:
npm run build:web
npm run build:cms
```

---

## 3. Ports & URLs

| App | Default Local URL | Production URL (Example) | Description |
|---|---|---|---|
| **Web Frontend** | `http://localhost:3000` | `https://anthonyholidays.com` | Guest website & inquiry multi-step forms |
| **Payload CMS** | `http://localhost:3001/admin` | `https://cms.anthonyholidays.com/admin` | Editorial Admin Studio & Content Management |
| **Payload REST API** | `http://localhost:3001/api` | `https://cms.anthonyholidays.com/api` | REST API consumed by frontend |
| **Media Uploads** | `http://localhost:3001/media` | `https://cms.anthonyholidays.com/media` | High-res tour & editorial photographs |

---

## 4. Production Deployment

For complete, step-by-step instructions on deploying the **Payload CMS backend** to an **Ubuntu / OVHcloud VPS** with Node.js 20+, PostgreSQL, PM2, and Nginx reverse proxy with SSL, refer to [`DEPLOYMENT-GUIDE.md`](./DEPLOYMENT-GUIDE.md).