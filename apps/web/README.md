# Anthony Holidays - Web Frontend (`apps/web`)

This is the standalone **Next.js 16** luxury travel editorial web application for Anthony Holidays. It is completely decoupled from database access, communicating with the headless **Payload CMS 3.x** backend (`apps/cms`) via REST APIs.

---

## Key Features

- **Framework**: Next.js 16 (App Router, React 19, Server Components)
- **Styling**: Tailwind CSS & Vanilla CSS design system (warm ivory, deep forest, Ceylon gold)
- **CMS Integration**: REST API consumer with automatic 60-second Incremental Static Regeneration (ISR) and full offline static fallbacks
- **Lead Capture**: 4-step bespoke multi-step inquiry form, contact form, and moderated guest review submission
- **Spam Protection**: Anti-bot honeypots & sliding-window rate limiters

---

## Local Development

```bash
# From monorepo root:
npm run dev:web

# Or from apps/web:
cd apps/web
npm run dev
```

Runs on: [http://localhost:3000](http://localhost:3000)

---

## Connecting to Backend

Set in `.env`:
```env
NEXT_PUBLIC_PAYLOAD_URL=http://localhost:3001
PAYLOAD_API_URL=http://localhost:3001
```

When deploying to production, point this to your CMS VPS domain:
```env
NEXT_PUBLIC_PAYLOAD_URL=https://cms.anthonyholidays.com
PAYLOAD_API_URL=https://cms.anthonyholidays.com
```
