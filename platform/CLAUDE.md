# platform/

## Purpose
Shared infrastructure layer. Every feature imports from here, never the reverse.
Contains env config, error system, auth, database, server setup, and response helpers.

## Critical Rules
- NEVER import from features/ — platform is lower in the dependency graph
- NEVER access process.env outside env.ts
- NEVER return raw c.json() — use success(), created(), paginated(), or throwError()
- ALWAYS define errors in errors.ts before using them
- ALWAYS validate env vars with Zod in env.ts

## Key Files
| File | Purpose |
|------|---------|
| env.ts | All environment variables (Zod-validated) |
| errors.ts | All error codes + throwError() |
| types.ts | App-wide types (AppUser, AppEnv) |
| rate-limit.ts | In-memory rate limiter |
| server/app.ts | Hono app setup, middleware, health checks |
| server/routes.ts | Route mounting (maintains type chain) |
| server/responses.ts | success(), paginated(), created(), etc. |
| auth/config.ts | Better Auth configuration |
| auth/middleware.ts | requireAuth middleware |
| auth/permissions.ts | Role-based permissions |
| db/client.ts | Drizzle + postgres-js client |
| db/schema.ts | All database tables |
| scripts/migrate.ts | Run migrations |
| scripts/harden-check.ts | Mechanical security checks |
