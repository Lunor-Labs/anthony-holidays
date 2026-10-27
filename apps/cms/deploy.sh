#!/usr/bin/env bash
set -e

# Production Deployment Script for Anthony Holidays CMS Backend
# Usage on VPS: ./deploy.sh

echo "==> Fetching latest changes from git..."
git pull origin main

echo "==> Installing dependencies..."
npm install

echo "==> Running database migrations..."
npm run migrate

echo "==> Building Payload CMS backend..."
npm run build:cms

echo "==> Reloading PM2 process..."
pm2 reload anthony-holidays-cms || pm2 start apps/cms/ecosystem.config.cjs

echo "==> Payload CMS is live on port 3001!"
pm2 status anthony-holidays-cms
