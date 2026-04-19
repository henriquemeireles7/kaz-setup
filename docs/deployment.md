# Deployment

Douala is configured for deployment on [Railway](https://railway.app/) but works with any platform that supports Bun.

## Railway Deployment

### 1. Create a Project

```bash
# Install Railway CLI
brew install railway

# Login and create project
railway login
railway init
```

### 2. Add PostgreSQL

```bash
railway add --plugin postgresql
```

Railway auto-provisions the database and sets `DATABASE_URL`.

### 3. Set Environment Variables

In Railway Dashboard → Variables, set all required env vars from `.env.example`:

```
BETTER_AUTH_SECRET=<generate with: openssl rand -base64 32>
NODE_ENV=production
PUBLIC_APP_URL=https://your-app.up.railway.app
STRIPE_SECRET_KEY=sk_live_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
STRIPE_PRICE_ID=price_xxx
STRIPE_MONTHLY_PRICE_ID=price_xxx
PUBLIC_STRIPE_KEY=pk_live_xxx
RESEND_API_KEY=re_xxx
ANTHROPIC_API_KEY=sk-ant-xxx
```

### 4. Deploy

```bash
railway up
```

Railway detects the Bun runtime and runs the build automatically.

### 5. Health Check

Railway monitors `/health`. The endpoint returns:
- `200` — healthy (DB connected)
- `503` — degraded (DB unreachable)

Response includes: status, version, uptime, timestamp, environment, db connectivity.

## Other Platforms

### Fly.io

```toml
# fly.toml
[build]
  builder = "heroku/buildpacks:20"

[env]
  PORT = "3000"

[http_service]
  internal_port = 3000
  force_https = true

[[services.http_checks]]
  path = "/health"
  interval = 10000
  timeout = 2000
```

### Docker

```dockerfile
FROM oven/bun:1 AS build
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile
COPY . .
RUN bun run build

FROM oven/bun:1
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json ./
EXPOSE 3000
CMD ["bun", "run", "start"]
```

### Manual / VPS

```bash
# Build
bun install --frozen-lockfile
bun run build

# Run migrations
bun run db:migrate

# Start
NODE_ENV=production bun run start
```

## Database Migrations

Always run migrations before or during deployment:

```bash
bun run db:migrate
```

Migrations are stored in `platform/db/migrations/` and managed by Drizzle Kit.

## Pre-Deploy Checklist

- [ ] All env vars set (especially `BETTER_AUTH_SECRET` — unique per environment)
- [ ] `NODE_ENV=production`
- [ ] `PUBLIC_APP_URL` matches your domain
- [ ] Database migrated
- [ ] Stripe webhooks point to production URL
- [ ] `bun run check` passes locally
