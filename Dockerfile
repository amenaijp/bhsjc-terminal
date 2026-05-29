# syntax=docker/dockerfile:1

FROM oven/bun:alpine AS base

WORKDIR /app
ENV HOST=0.0.0.0

FROM base AS builder

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile --ignore-scripts

COPY . .
RUN bun run build

FROM base AS development
ENV NODE_ENV=development
ENV PORT=5173

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile --ignore-scripts && bun svelte-kit sync

RUN mkdir -p /data/sqlite_db /data/user_uploads

# actual source code gets put in here by the compose file

EXPOSE 5173
CMD ["bun", "--bun", "run", "dev"]

FROM base AS runner
ENV NODE_ENV=production
ENV PORT=3000

RUN addgroup --system --gid 1001 sveltekit \
 && adduser  --system --uid 1001 --ingroup sveltekit sveltekit

COPY --from=builder --chown=sveltekit:sveltekit /app/build ./build

RUN mkdir -p /data/sqlite_db /data/user_uploads \
 && chown -R sveltekit:sveltekit /data

VOLUME ["/data/sqlite_db", "/data/user_uploads"]

USER sveltekit
EXPOSE 3000

HEALTHCHECK --interval=10s --timeout=5s --start-period=15s --retries=3 \
  CMD wget -qO- http://localhost:3000/api/health || exit 1

CMD ["bun", "build/index.js"]