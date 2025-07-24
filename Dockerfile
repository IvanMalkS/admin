FROM  node:20-alpine AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./ 
RUN \
  if [ -f "pnpm-lock.yaml" ]; then \
    corepack enable pnpm && pnpm install --frozen-lockfile; \
  else \
    npm install; \
  fi

FROM  node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

FROM  node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Ensure the copied files have the correct ownership for the 'nextjs' user
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./ 
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]