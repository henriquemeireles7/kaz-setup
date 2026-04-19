# Architecture

Douala follows a three-layer architecture with strict dependency direction:

```
features/ → platform/ → providers/ → external services
```

Each layer can only import from layers to its right. Never the reverse.

## Directory Structure

```
douala/
├── platform/           # Shared infrastructure (env, auth, db, server, errors)
│   ├── server/         # Hono app, routes, response helpers, SSR renderer
│   ├── auth/           # Better Auth config, middleware, permissions
│   ├── db/             # Drizzle client, schema, migrations
│   ├── scripts/        # CLI scripts (migrate, seed, harden-check)
│   ├── env.ts          # All env vars (Zod-validated via @t3-oss/env-core)
│   ├── errors.ts       # Error codes and throwError() helper
│   ├── rate-limit.ts   # In-memory rate limiter
│   └── types.ts        # App-wide types (AppUser, AppEnv)
├── providers/          # Thin SDK wrappers (one file per service)
│   ├── ai.ts           # Anthropic (Claude)
│   ├── analytics.ts    # PostHog
│   ├── email.ts        # Resend
│   ├── payments.ts     # Stripe
│   ├── storage.ts      # S3/R2
│   └── markdown.ts     # Marked + gray-matter
├── features/           # Business logic grouped by domain
│   └── (shared)/       # Features shared across all domains
│       ├── subscription/  # Stripe checkout, webhooks, portal
│       ├── account/       # GDPR data export, account deletion
│       ├── seo/           # Meta tags, JSON-LD, sitemap
│       └── email/         # Email templates (auth, payments)
├── styles/             # Global CSS with design tokens
├── docs/               # Project documentation
├── decisions/          # Strategy documents and reference files
└── .claude/            # AI harness (hooks, skills, settings)
```

## Key Patterns

### Environment Variables

All env vars go through `platform/env.ts` using `@t3-oss/env-core` with Zod validation. Never use `process.env` directly in application code.

```ts
import { env } from '@/platform/env'
```

### Error Handling

Errors are defined in `platform/errors.ts` and thrown via `throwError()`. Route handlers use response helpers from `platform/server/responses.ts`:

```ts
import { success, throwError } from '@/platform/server/responses'
import { errors } from '@/platform/errors'

// In a route handler:
return success(c, data)
throwError(errors.NOT_FOUND, 'User not found')
```

### Auth Middleware

Protected routes use `requireAuth` from `platform/auth/middleware.ts`:

```ts
import { requireAuth } from '@/platform/auth/middleware'

app.use('/api/protected/*', requireAuth)
```

Role checks use `platform/auth/permissions.ts`.

### Provider Pattern

Each provider is a thin wrapper around an SDK. Providers handle:
- Initialization with env vars
- Graceful degradation when optional (e.g., PostHog)
- Timeout configuration

### Domain-Spec Architecture (DSA)

Every code folder has a `CLAUDE.md` with:
- Purpose statement and critical rules
- Import map and code recipes
- Auto-generated footer (files, exports, dependencies) updated by the Stop hook

## Data Flow

```
Request → Middleware (CORS, auth, headers) → Route → Feature Logic → Provider → External Service
                                               ↓
                                          DB via Drizzle
```

## Database

- **ORM:** Drizzle with `postgres.js` driver
- **Migrations:** Generated via `drizzle-kit`, run via `bun run db:migrate`
- **Schema:** Defined in `platform/db/schema.ts`
- **Tables:** users, sessions, accounts, verifications (auth), subscriptions, webhook_events (billing)
