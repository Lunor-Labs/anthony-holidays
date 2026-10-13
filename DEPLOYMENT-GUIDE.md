# Complete VPS Deployment Guide: Headless Payload CMS on Ubuntu / OVHcloud

This guide provides end-to-end instructions for deploying the **Payload CMS 3.x backend (`apps/cms`)** separately on an **Ubuntu / OVHcloud Linux VPS** with Node.js 20+, PostgreSQL, PM2 process management, Nginx reverse proxy, and Let's Encrypt SSL.

---

## 1. Architecture Overview

```
                      ┌────────────────────────────────────────┐
                      │          Visitors & Browsers           │
                      └───────┬────────────────────────┬───────┘
                              │                        │
       Frontend Traffic       │                        │ API Requests / Media
       (https://anthonyholidays.com)                   │ (https://cms.anthonyholidays.com)
                              ▼                        ▼
               ┌───────────────────────┐   ┌────────────────────────┐
               │       apps/web        │   │        apps/cms        │
               │   (Next.js 16 Web)    │   │  (Payload 3 Headless)  │
               │    Vercel / VPS /     │   │   Ubuntu / OVH VPS     │
               │      Port 3000        │   │      Port 3001         │
               └───────────┬───────────┘   └───────────┬────────────┘
                           │                           │
                           │  REST API Calls           │ Direct DB Queries
                           └──────────────────────────►│
                                                       ▼
                                           ┌────────────────────────┐
                                           │       PostgreSQL       │
                                           │   (Database on VPS)    │
                                           └────────────────────────┘
```

---

## 2. Server Preparation (Ubuntu 22.04 / 24.04 LTS)

### Step 2.1: Initial System Updates & Firewall
SSH into your VPS as `root` (or sudoer user):

```bash
# Update package repositories
sudo apt update && sudo apt upgrade -y

# Configure UFW firewall
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow 22/tcp    # SSH
sudo ufw allow 80/tcp    # HTTP (Let's Encrypt / Web)
sudo ufw allow 443/tcp   # HTTPS (SSL)
sudo ufw enable
```

### Step 2.2: Install Node.js (v20+ LTS)
```bash
# Install NodeSource Node.js 20.x repository
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs build-essential

# Verify versions
node -v   # Should be v20.x or higher
npm -v    # Should be v10.x or higher
```

### Step 2.3: Install Global Utilities (PM2 & Git)
```bash
sudo npm install -g pm2
```

---

## 3. PostgreSQL Database Setup

### Step 3.1: Install PostgreSQL
```bash
sudo apt install -y postgresql postgresql-contrib
sudo systemctl enable postgresql
sudo systemctl start postgresql
```

### Step 3.2: Create Dedicated Database and User
```bash
sudo -u postgres psql
```

Inside the PostgreSQL prompt (`postgres=#`):
```sql
CREATE DATABASE anthony_holidays;
CREATE USER anthony_admin WITH ENCRYPTED PASSWORD 'YOUR_STRONG_DATABASE_PASSWORD';
GRANT ALL PRIVILEGES ON DATABASE anthony_holidays TO anthony_admin;
ALTER DATABASE anthony_holidays OWNER TO anthony_admin;
\q
```

---

## 4. Deploying Payload CMS (`apps/cms`)

### Step 4.1: Clone or Upload the Codebase
```bash
sudo mkdir -p /var/www/anthony-holidays
sudo chown -R $USER:$USER /var/www/anthony-holidays

# Clone your repository
git clone <YOUR_GIT_REPO_URL> /var/www/anthony-holidays
cd /var/www/anthony-holidays
```

### Step 4.2: Configure Environment Variables
Inside `/var/www/anthony-holidays/apps/cms`, create `.env`:

```bash
cd /var/www/anthony-holidays/apps/cms
nano .env
```

Paste your production values:
```env
# Database - PostgreSQL
DATABASE_URI=postgresql://anthony_admin:YOUR_STRONG_DATABASE_PASSWORD@localhost:5432/anthony_holidays

# Payload Secret (Generate min 32 chars: openssl rand -base64 32)
PAYLOAD_SECRET=YOUR_GENERATED_32_CHAR_SECRET_KEY

# Port & Server Domain
PORT=3001
PAYLOAD_PUBLIC_SERVER_URL=https://cms.anthonyholidays.com
NEXT_PUBLIC_SERVER_URL=https://cms.anthonyholidays.com

# Frontend Origins (CORS & CSRF)
NEXT_PUBLIC_SITE_URL=https://anthonyholidays.com
FRONTEND_URL=https://anthonyholidays.com

# Transactional Email - Resend
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
RESEND_FROM_EMAIL=noreply@anthonyholidays.com
COMPANY_EMAIL=inquiries@anthonyholidays.com
```
Save and exit (`Ctrl+O`, `Enter`, `Ctrl+X`).

### Step 4.3: Install Dependencies & Build
```bash
cd /var/www/anthony-holidays

# Install monorepo dependencies
npm install

# Build the CMS backend
npm run build:cms
```

### Step 4.4: Seed Initial Data
```bash
# Populate database with tours, packages, media catalog & site settings
npm run seed
```

---

## 5. Process Management with PM2

### Step 5.1: Create PM2 Log Directory
```bash
sudo mkdir -p /var/log/pm2
sudo chown -R $USER:$USER /var/log/pm2
```

### Step 5.2: Start CMS Service via PM2
```bash
cd /var/www/anthony-holidays
pm2 start apps/cms/ecosystem.config.cjs
```

### Step 5.3: Enable Auto-Start on System Boot
```bash
pm2 save
pm2 startup systemd
# Run the command generated in terminal output (e.g. sudo env PATH=... pm2 startup systemd -u user --hp /home/user)
```

To inspect CMS status at any time:
```bash
pm2 status
pm2 logs anthony-holidays-cms
```

---

## 6. Nginx Reverse Proxy & SSL Configuration

### Step 6.1: Install Nginx & Certbot
```bash
sudo apt install -y nginx certbot python3-certbot-nginx
```

### Step 6.2: Configure Nginx Virtual Host
```bash
sudo cp /var/www/anthony-holidays/apps/cms/nginx.conf.example /etc/nginx/sites-available/anthony-cms
sudo ln -s /etc/nginx/sites-available/anthony-cms /etc/nginx/sites-enabled/

# Remove default nginx welcome page
sudo rm -f /etc/nginx/sites-enabled/default

# Test nginx syntax
sudo nginx -t

# Reload nginx
sudo systemctl reload nginx
```

### Step 6.3: Provision Free Let's Encrypt SSL
Make sure your DNS `A` record for `cms.anthonyholidays.com` points to your VPS IP address, then run:

```bash
sudo certbot --nginx -d cms.anthonyholidays.com
```

Select automatic HTTPS redirection when prompted.

---

## 7. Connecting the Frontend (`apps/web`)

In your frontend deployment (e.g., Vercel, VPS, or cloud host):

Set the following environment variables:
```env
NEXT_PUBLIC_PAYLOAD_URL=https://cms.anthonyholidays.com
PAYLOAD_API_URL=https://cms.anthonyholidays.com
```

All 15 frontend pages will now query your VPS-hosted Payload CMS API, cache with 60-second revalidation (ISR), and submit guest inquiries directly to your PostgreSQL database.

---

## 8. Ongoing Maintenance & Zero-Downtime Updates

To deploy new changes to the CMS:

```bash
cd /var/www/anthony-holidays/apps/cms
./deploy.sh
```

Or manually:
```bash
cd /var/www/anthony-holidays
git pull origin main
npm install
npm run build:cms
pm2 reload anthony-holidays-cms
```
