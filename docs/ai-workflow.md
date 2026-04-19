# AI Workflow

Douala is designed as a **maximal template** — it ships with everything a SaaS needs. Instead of adding features one by one, you describe your product and AI removes what doesn't fit.

## The Workflow

```
1. Clone Douala
2. Describe your product to AI (what it does, who it's for)
3. AI removes unused features and renames things
4. You build your unique features on top
```

## Using with Claude Code

### Step 1: Explain your product

```
I'm building [product name] — [one sentence description].
My users are [target audience].
The core feature is [main thing users do].
I need [auth/payments/email/etc] but not [features to remove].
```

### Step 2: Let AI prune

AI will:
- Remove unused providers (e.g., drop `providers/ai.ts` if you don't need AI)
- Remove unused features (e.g., drop `features/(shared)/seo/` if not needed)
- Update env.ts to remove unused env vars
- Update routes.ts to remove unused route mounts
- Clean up package.json dependencies

### Step 3: Customize what remains

- Rename database tables in `platform/db/schema.ts`
- Add your domain-specific features in `features/`
- Update design tokens in `styles/global.css`
- Configure providers for your accounts

## What's Safe to Remove

| Module | Remove if... |
|---|---|
| `providers/ai.ts` | No AI features |
| `providers/analytics.ts` | No analytics needed |
| `providers/storage.ts` | No file uploads |
| `providers/markdown.ts` | No blog/content |
| `features/(shared)/seo/` | No public pages |
| `features/(shared)/subscription/` | No paid plans (also remove Stripe env vars) |

## What Should Stay

| Module | Why |
|---|---|
| `platform/env.ts` | All env vars must go through here |
| `platform/errors.ts` | Consistent error handling |
| `platform/auth/` | Every SaaS needs auth |
| `platform/db/` | Every SaaS needs a database |
| `platform/server/` | The HTTP server itself |

## CLAUDE.md Files

Every folder has a `CLAUDE.md` that tells AI agents:
- What the folder does and why
- Critical rules to follow
- Import patterns and code recipes

When you add a new folder, create its `CLAUDE.md` first. The Stop hook auto-generates the file listing footer.

## Build Order

When adding new features, follow this order:
1. Write/update folder `CLAUDE.md`
2. Write/update schema (if applicable)
3. Update error definitions (if needed)
4. Update env config (if new env vars)
5. Write tests (must fail first)
6. Write code to pass tests
7. Refactor while tests stay green
8. Wire into UI/pages last
