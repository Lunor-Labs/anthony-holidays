# Anthony Holidays - Technical & Deployment Documentation (Phase 1)

## 1. Project Overview & Architecture

Anthony Holidays is an editorial, luxury travel website and Content Management System built for an inquiry-driven Sri Lankan travel agency led by Licensed National Tourist Guide Lecturers.

- **Framework**: Next.js 16 (App Router, React Server Components by default, Turbopack)
- **CMS**: Payload CMS 3.x with native PostgreSQL adapter
- **Styling**: Tailwind CSS & Vanilla CSS design system (warm ivory `#FDFBF7`, deep forest `#1A2E26`, Ceylon gold `#D4AF37`/`#B38F4D`, charcoal `#141716`)
- **Typography**: Editorial serif headings with clean sans-serif body
- **Email Notifications**: Resend integration for traveller auto-confirmations and team inbox notifications
- **Spam Protection**: Sliding-window rate limiter & anti-bot honeypot fields on all forms
- **Hosting Targets**: Next.js production server on Node.js / Vercel + PostgreSQL Database on OVHcloud VPS

---

## 2. Complete Deliverables Checklist (15 Required Pages)

All 15 required pages are implemented, responsive, and verified:

| # | Page | Route | Description & Data Source |
|---|---|---|---|
| 1 | **Home** | `/` | Dynamic hero, curated tours, destinations, why choose us, guest testimonials, journal preview, conversion CTA. |
| 2 | **Tour Packages** | `/journeys` *(alias: `/tours`)* | Searchable & filterable tour catalogue (Cultural, Wildlife, Honeymoon, Hill Country, Beach, Pilgrimage, Adventure, etc.). |
| 3 | **Individual Tour Details** | `/journeys/[slug]` | Day-by-day itinerary, accommodation standards, included/optional sites, transport, guide credentials, insurance/visa/flight advisories, `TouristTrip` JSON-LD schema. |
| 4 | **Special Packages** | `/special-packages` | Dedicated thematic package catalog with category tabs (Volunteering, Hikkaduwa-based, Customised, Smart Budget, Adventure). |
| 5 | **Special Package Details** | `/special-packages/[slug]` | Dedicated stage overview, activities, conditions & requirements, inclusions, exclusions, and pre-filled inquiry CTA. |
| 6 | **Our Services** | `/services` | CMS-managed service entries: Licensed National Guide Lecturing, Chauffeur transport, Bespoke itinerary design, Airport transfers, Wildlife guiding. |
| 7 | **About Us** | `/about` | Company introduction, travel philosophy, founder credentials, guiding pillars, and direct team link. |
| 8 | **Founder & Team Profiles** | `/team` | Detailed profile for founder Anthony (SLTDA licence, credentials, bio) and faculty guide lecturer profiles. |
| 9 | **Reviews & Moderation** | `/reviews` | Verified 5-star guest reviews list + public review submission form with pending status moderation workflow. |
| 10 | **Blog / Journal** | `/journal` *(alias: `/blog`)* | Ceylon travel journal articles, monsoon guides, cultural etiquette, and photography insights. |
| 11 | **Individual Blog Articles** | `/journal/[slug]` | Rich editorial articles with breadcrumbs, author bio, and related posts. |
| 12 | **Start Planning Form** | `/start-planning` | 4-step multi-step bespoke planning form supporting all required client fields, bot protection, and preselected packages. |
| 13 | **Contact Us** | `/contact` | Direct WhatsApp concierge, phone, email, operating hours, contact form, and Google Maps embed location. |
| 14 | **Privacy Policy** | `/privacy-policy` | Compliant privacy policy detailing guest inquiry data handling and security. |
| 15 | **Terms and Conditions** | `/terms-and-conditions` | Clear booking conditions, private tour arrangements, and payment disclaimer (Phase 1 inquiry-based only). |

---

## 3. Payload CMS Architecture & Collections

Payload CMS Admin Studio is accessible at `/admin`.

### CMS Collections:
1. **`journeys`**: Tour packages with day-by-day itineraries, duration, destinations, categories, accommodation, transport, sites, insurance, visa, and pricing.
2. **`special-packages`**: Thematic packages (Volunteering, Hikkaduwa-based, Budget, Adventure, Customised) with conditions and activities.
3. **`services`**: Official client services with display order, icons, and highlights.
4. **`team-members`**: Founder and guide profiles with SLTDA credentials, biographies, and specialties.
5. **`testimonials`**: Guest reviews with moderation workflow:
   - `pending` (Default for public visitor submissions; remains private until approved)
   - `published` (Appears on public website)
   - `rejected` / `draft`
6. **`inquiries`**: Secure inquiry inbox with statuses (`new`, `contacted`, `confirmed`, `planning`, `closed`), internal team notes, party sizes (adults, children), travel dates, and associated tour/package. Read access strictly restricted to authenticated administrators.
7. **`destinations`**: Sri Lanka regions (Sigiriya, Kandy, Hatton, Ella, Yala, Galle, Mirissa) with highlights and things to do.
8. **`experience-categories`**: Dynamic category tags for filtering.
9. **`journal-posts`**: Blog articles with reading time and author credentials.
10. **`media`**: Uploaded photographs with alt text.
11. **`users`**: Administrative accounts with secure bcrypt authentication.

### Global Config:
- **`site-settings`**: Company name, contact email, telephone, WhatsApp number, business address, Google Maps embed URL, social media links, GA4 Measurement ID, and SEO metadata.

---

## 4. Security, Hosting & Production Deployment

### 4.1 Production Security Headers
Configured in `next.config.ts`:
- `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
- `X-Frame-Options: SAMEORIGIN`
- `X-Content-Type-Options: nosniff`
- `X-DNS-Prefetch-Control: on`
- `Referrer-Policy: origin-when-cross-origin`

### 4.2 OVHcloud VPS Setup Instructions

#### A. Initial Server Hardening:
```bash
# Update system packages
sudo apt update && sudo apt upgrade -y

# Configure UFW firewall
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow 22/tcp    # SSH
sudo ufw allow 80/tcp    # HTTP
sudo ufw allow 443/tcp   # HTTPS
sudo ufw enable
```

#### B. PostgreSQL Database Setup:
```bash
# Install PostgreSQL
sudo apt install postgresql postgresql-contrib -y

# Create database and user
sudo -u postgres psql
CREATE DATABASE anthony_holidays;
CREATE USER anthony_admin WITH ENCRYPTED PASSWORD 'YOUR_STRONG_PASSWORD';
GRANT ALL PRIVILEGES ON DATABASE anthony_holidays TO anthony_admin;
\q
```

#### C. Automated Daily Backups (Cron):
Create backup directory and script:
```bash
sudo mkdir -p /var/backups/anthony-holidays
sudo chmod 700 /var/backups/anthony-holidays
```

Create `/usr/local/bin/backup-anthony-db.sh`:
```bash
#!/bin/bash
BACKUP_DIR="/var/backups/anthony-holidays"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="$BACKUP_DIR/anthony_holidays_$TIMESTAMP.sql.gz"

# Export dump
PGPASSWORD="YOUR_STRONG_PASSWORD" pg_dump -U anthony_admin -h localhost anthony_holidays | gzip > "$BACKUP_FILE"

# Keep last 14 days of backups, delete older
find "$BACKUP_DIR" -type f -name "*.sql.gz" -mtime +14 -exec rm {} \;

echo "Backup completed: $BACKUP_FILE"
```

Make executable and register in cron:
```bash
sudo chmod +x /usr/local/bin/backup-anthony-db.sh
sudo crontab -e
# Add line to run every night at 02:00 AM:
0 2 * * * /usr/local/bin/backup-anthony-db.sh >> /var/log/db-backup.log 2>&1
```

#### D. Database Restoration Procedure:
```bash
# To restore a backup:
gunzip -c /var/backups/anthony-holidays/anthony_holidays_YYYYMMDD_HHMMSS.sql.gz | psql -U anthony_admin -h localhost -d anthony_holidays
```

---

## 5. Google Integrations & External Setup Guide

### 5.1 Google Search Console (GSC):
1. Go to [Google Search Console](https://search.google.com/search-console).
2. Add Property -> URL Prefix -> `https://anthonyholidays.com`.
3. Choose **HTML Tag verification**. Copy the verification token (e.g. `google-site-verification=XYZ...`).
4. Paste the token into Payload CMS Admin: **Site Settings -> Default SEO Settings -> Google Site Verification Code**.
5. Save settings. Return to GSC and click **Verify**.
6. Submit Sitemap: Enter `https://anthonyholidays.com/sitemap.xml` in the Sitemaps tab.

### 5.2 Google Analytics 4 (GA4):
1. Create a GA4 property at [analytics.google.com](https://analytics.google.com).
2. Create a Web Data Stream for `anthonyholidays.com`.
3. Copy your Measurement ID (format: `G-XXXXXXXXXX`).
4. Paste into Payload CMS Admin: **Site Settings -> Default SEO Settings -> Google Analytics 4 Measurement ID** (or set `NEXT_PUBLIC_GA_MEASUREMENT_ID` in `.env.production`).

### 5.3 Google Business Profile:
1. Claim / create listing on [Google Business Profile](https://www.google.com/business/).
2. Primary category: **Travel agency** or **Tour operator**.
3. Service area: Sri Lanka (Islandwide).
4. Website URL: `https://anthonyholidays.com`.
5. Once verified, copy the Google Maps share link -> Embed Map -> copy the `src="..."` URL.
6. Paste into Payload CMS Admin: **Site Settings -> Contact Information -> Google Maps Embed URL**.

---

## 6. Verification Summary

- **TypeScript Compilation (`tsc --noEmit`)**: 0 errors.
- **Production Build (`next build`)**: 39/39 static & dynamic routes compiled successfully.
- **Phase 1 Constraints**: Inquiry-driven travel model only. No payment gateway (PayHere) or online checkout implemented.