# Getting Started

## Prerequisites

- [Bun](https://bun.sh) v1.2+
- [Docker](https://www.docker.com/) (for PostgreSQL)
- A [Stripe](https://stripe.com/) account (test mode)
- A [Resend](https://resend.com/) account
- An [Anthropic](https://console.anthropic.com/) API key

## Quick Start

```bash
# 1. Clone and install
git clone <your-repo-url> && cd douala
bun install

# 2. Start PostgreSQL
docker compose up -d

# 3. Configure environment
cp .env.example .env
# Edit .env with your API keys (see sections below)

# 4. Run migrations
bun run db:migrate

# 5. Seed test data (optional)
bun platform/scripts/seed.ts

# 6. Start dev server
bun run dev
```

Open http://localhost:3000 to verify.

## Environment Variables

See `.env.example` for the full list. Variables are split into **REQUIRED** (app won't start without them) and **OPTIONAL** (features degrade gracefully).

### Required

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `BETTER_AUTH_SECRET` | Auth secret (min 32 chars). Generate: `openssl rand -base64 32` |
| `STRIPE_SECRET_KEY` | Stripe secret key (`sk_test_...`) |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret (`whsec_...`) |
| `STRIPE_PRICE_ID` | Stripe yearly price ID |
| `STRIPE_MONTHLY_PRICE_ID` | Stripe monthly price ID |
| `PUBLIC_STRIPE_KEY` | Stripe publishable key (`pk_test_...`) |
| `RESEND_API_KEY` | Resend API key |
| `ANTHROPIC_API_KEY` | Anthropic API key (`sk-ant-...`) |

### Optional

| Variable | Without it... |
|---|---|
| `POSTHOG_API_KEY` | Analytics calls become no-ops |
| `R2_*` | File upload/download unavailable |
| `GOOGLE_CLIENT_*` | Only email/password auth available |

## Scripts

| Command | What it does |
|---|---|
| `bun run dev` | Start dev server with hot reload |
| `bun run check` | Full CI: lint + typecheck + harden + test |
| `bun run check:lint` | Biome lint only |
| `bun run check:types` | TypeScript typecheck only |
| `bun run check:test` | Tests only |
| `bun run lint` | Auto-fix lint issues |
| `bun run harden` | Security/pattern checks |
| `bun run db:generate` | Generate Drizzle migration |
| `bun run db:migrate` | Run pending migrations |
| `bun run db:studio` | Open Drizzle Studio (DB GUI) |

## Next Steps

- [Architecture](./architecture.md) — understand the codebase structure
- [AI Workflow](./ai-workflow.md) — how to customize using AI
