FROM node:18-alpine AS base

# This Dockerfile is copy-pasted into our main docs at /docs/handbook/deploying-with-docker.
# Make sure you update both files!

FROM base AS builder
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
RUN apk update
# Set working directory
WORKDIR /app
RUN yarn global add turbo
COPY . .
RUN turbo prune --scope=passbook --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app

# First install the dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/yarn.lock ./yarn.lock
RUN yarn install

# Build the project
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json

# Uncomment and use build args to enable remote caching
# ARG TURBO_TEAM
# ENV TURBO_TEAM=$TURBO_TEAM

# ARG TURBO_TOKEN
# ENV TURBO_TOKEN=$TURBO_TOKEN

ARG NEXT_PUBLIC_URL
ARG NEXT_PUBLIC_ENVIRONMENT_ID
ARG NEXT_PUBLIC_BACKEND_URL
ARG NEXT_PUBLIC_DIGILOCKER_URL
ARG NEXT_PUBLIC_DIGILOCKER_CLIENT_ID
ARG NEXT_PUBLIC_ASSET_PREFIX
ARG NEXT_PUBLIC_BASE_PATH

ENV NEXT_PUBLIC_URL=$NEXT_PUBLIC_URL
ENV NEXT_PUBLIC_ENVIRONMENT_ID=$NEXT_PUBLIC_ENVIRONMENT_ID
ENV NEXT_PUBLIC_BACKEND_URL=$NEXT_PUBLIC_BACKEND_URL
ENV NEXT_PUBLIC_DIGILOCKER_URL=$NEXT_PUBLIC_DIGILOCKER_URL
ENV NEXT_PUBLIC_DIGILOCKER_CLIENT_ID=$NEXT_PUBLIC_DIGILOCKER_CLIENT_ID
ENV NEXT_PUBLIC_ASSET_PREFIX=$NEXT_PUBLIC_ASSET_PREFIX
ENV NEXT_PUBLIC_BASE_PATH=$NEXT_PUBLIC_BASE_PATH

RUN yarn turbo run build --filter=passbook...

FROM base AS runner
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=installer /app/apps/passbook/next.config.js .
COPY --from=installer /app/apps/passbook/package.json .

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=installer --chown=nextjs:nodejs /app/apps/passbook/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/passbook/.next/static ./apps/passbook/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/passbook/public ./apps/passbook/public

CMD node apps/passbook/server.js