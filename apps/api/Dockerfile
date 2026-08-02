# ─────────────────────────────────────────────────────────────────────────────
# EMC Container – API
#
# Mehrstufiger Build. Das Laufzeit-Image enthält weder Quellcode noch
# Build-Werkzeuge und läuft als unprivilegierter Benutzer.
# ─────────────────────────────────────────────────────────────────────────────

FROM node:22-alpine AS base
# libc6-compat wird von Prisma auf Alpine benötigt
RUN apk add --no-cache libc6-compat
WORKDIR /app


# ── Abhängigkeiten ───────────────────────────────────────────────────────────
FROM base AS deps
COPY package.json package-lock.json ./
COPY packages/catalog/package.json ./packages/catalog/
COPY apps/api/package.json ./apps/api/
# Auch das Manifest der Storefront wird gebraucht: npm ci prüft den Lockfile
# gegen den gesamten Workspace-Baum und bricht ab, wenn ein Manifest fehlt.
# Die Abhängigkeiten der Storefront werden dank --workspace nicht installiert.
COPY apps/web/package.json ./apps/web/
RUN npm ci --workspace=@emc/api --workspace=@emc/catalog --include-workspace-root


# ── Build ────────────────────────────────────────────────────────────────────
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/packages/catalog/node_modules ./packages/catalog/node_modules
COPY --from=deps /app/apps/api/node_modules ./apps/api/node_modules
COPY package.json package-lock.json ./
COPY packages/catalog ./packages/catalog
COPY apps/api ./apps/api

# Der Katalog muss vor der API gebaut werden – die API bindet ihn als
# CommonJS-Build ein (siehe packages/catalog/package.json, exports.require).
RUN npm run build --workspace=@emc/catalog
RUN npm run build --workspace=@emc/api


# ── Laufzeit ─────────────────────────────────────────────────────────────────
FROM base AS runner
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs \
 && adduser --system --uid 1001 --ingroup nodejs nestjs

COPY --from=builder --chown=nestjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nestjs:nodejs /app/packages/catalog/dist ./packages/catalog/dist
COPY --from=builder --chown=nestjs:nodejs /app/packages/catalog/package.json ./packages/catalog/
COPY --from=builder --chown=nestjs:nodejs /app/apps/api/dist ./apps/api/dist
COPY --from=builder --chown=nestjs:nodejs /app/apps/api/prisma ./apps/api/prisma
COPY --from=builder --chown=nestjs:nodejs /app/apps/api/package.json ./apps/api/
COPY --from=builder --chown=nestjs:nodejs /app/package.json ./

USER nestjs
WORKDIR /app/apps/api

EXPOSE 4000
ENV PORT=4000

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD node -e "fetch('http://localhost:4000/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

# Migrationen laufen beim Start – Railway startet Container ohne Release-Phase.
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/src/main.js"]
