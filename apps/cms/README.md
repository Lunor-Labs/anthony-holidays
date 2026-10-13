# Anthony Holidays - Payload CMS Backend (`apps/cms`)

This is the standalone **Payload CMS 3.x** headless backend service for Anthony Holidays, designed for deployment on an **Ubuntu / OVHcloud Linux VPS** (with PostgreSQL, PM2, and Nginx).

---

## Architecture

- **Engine**: Payload CMS 3.x with `@payloadcms/next`
- **Database**: PostgreSQL with `@payloadcms/db-postgres`
- **Port**: `3001`
- **Admin Studio**: `http://localhost:3001/admin` (or `https://cms.anthonyholidays.com/admin`)
- **REST API**: `http://localhost:3001/api/:collection`
- **Static Media**: Stored in `public/media/` and served via `/media/:filename`

---

## Local Development

```bash
# From monorepo root:
npm run dev:cms

# Or from apps/cms directory:
cd apps/cms
npm run dev
```

Admin studio will be available at: [http://localhost:3001/admin](http://localhost:3001/admin)

---

## Database Seeding

To seed the PostgreSQL database with all 10 verified tours, special packages, team members, blog posts, and site settings:

```bash
# From monorepo root:
npm run seed

# Or from apps/cms:
npm run seed
```

---

## Production Deployment (Linux VPS)

See the root [`DEPLOYMENT-GUIDE.md`](../../DEPLOYMENT-GUIDE.md) for step-by-step instructions:
1. PostgreSQL installation & database creation
2. Nginx reverse proxy using [`nginx.conf.example`](./nginx.conf.example)
3. SSL certificate via `certbot --nginx -d cms.anthonyholidays.com`
4. PM2 daemon process management with [`ecosystem.config.cjs`](./ecosystem.config.cjs)
5. Zero-downtime updates with [`deploy.sh`](./deploy.sh)
