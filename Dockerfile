# Use a pre-built Next.js image to avoid SWC compilation
FROM node:18-alpine

# Install only essential packages
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci --omit=dev --no-audit --no-fund --prefer-offline --no-optional

# Copy source code
COPY . .

# Set environment variables
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production

# Build the application
RUN npm run build

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Set up directories
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Copy built application
COPY --chown=nextjs:nodejs /app/.next/standalone ./
COPY --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --chown=nextjs:nodejs /app/public ./public

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]