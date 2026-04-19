# Database

Douala uses PostgreSQL with [Drizzle ORM](https://orm.drizzle.team/) for type-safe database access.

## Local Setup

Start PostgreSQL with Docker Compose:

```bash
docker compose up -d
```

This creates a `douala` database at `postgresql://postgres:postgres@localhost:5432/douala`.

## Schema

Tables are defined in `platform/db/schema.ts`:

| Table | Purpose |
|-------|---------|
| `users` | User accounts (managed by better-auth) |
| `sessions` | Active sessions (managed by better-auth) |
| `accounts` | OAuth provider accounts (managed by better-auth) |
| `verifications` | Email verification tokens (managed by better-auth) |
| `subscriptions` | Stripe subscription records |
| `webhook_events` | Stripe webhook idempotency guard |
| `api_keys` | API key authentication (hashed) |

## Migrations

### Generate a migration

After changing `platform/db/schema.ts`:

```bash
bun run db:generate
```

This creates a SQL migration file in `platform/db/migrations/`.

### Run migrations

```bash
bun run db:migrate
```

### Drizzle Studio

Browse your database with a visual UI:

```bash
bun run db:studio
```

Opens at `https://local.drizzle.studio`.

## Querying

```ts
import { db } from '@/platform/db/client'
import { users } from '@/platform/db/schema'
import { eq } from 'drizzle-orm'

// Select
const user = await db.select().from(users).where(eq(users.id, userId)).limit(1)

// Insert
await db.insert(users).values({ email, name })

// Update
await db.update(users).set({ role: 'pro' }).where(eq(users.id, userId))

// Delete
await db.delete(users).where(eq(users.id, userId))
```

All queries are fully type-safe — the schema types flow through to query results.

## Seed Data

Populate the database with test data:

```bash
bun run db:seed
```

The seed script is at `platform/scripts/seed.ts`. Customize it for your domain.

## Adding Tables

1. Define the table in `platform/db/schema.ts`:
   ```ts
   export const posts = pgTable('posts', {
     id: uuid('id').defaultRandom().primaryKey(),
     title: text('title').notNull(),
     userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }),
     createdAt: timestamp('created_at').notNull().defaultNow(),
   })
   ```

2. Generate and run the migration:
   ```bash
   bun run db:generate
   bun run db:migrate
   ```

## Production Notes

- **Connection pooling:** The `postgres` driver handles connection pooling automatically
- **Migrations:** Always run `db:migrate` before deploying new code
- **Backups:** Configure automated backups in your hosting provider (Railway does this automatically)
- **Indexes:** Add indexes for frequently queried columns. Drizzle supports `.index()` on table definitions
