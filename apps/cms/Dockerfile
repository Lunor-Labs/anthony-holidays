# Payload CMS (apps/cms) image. Build context is the repo root so the
# workspace lockfile is available:
#   docker build -f apps/cms/Dockerfile .

FROM node:22-slim AS deps
WORKDIR /app
COPY package.json package-lock.json ./
COPY apps/cms/package.json apps/cms/package.json
COPY apps/web/package.json apps/web/package.json
RUN npm ci --workspace=apps/cms --include-workspace-root

FROM node:22-slim AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY package.json package-lock.json ./
COPY apps/cms ./apps/cms
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build --workspace=apps/cms

FROM node:22-slim AS runner
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3001
# Full node_modules + source are kept so `npx payload migrate` works in this image
COPY --from=builder --chown=node:node /app ./
USER node
WORKDIR /app/apps/cms
EXPOSE 3001
CMD ["npx", "next", "start", "-p", "3001"]
