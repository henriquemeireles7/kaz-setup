# Authentication Setup

Douala uses [better-auth](https://www.better-auth.com/) for authentication with Drizzle ORM as the database adapter.

## Quick Setup

1. Generate a secret:
   ```bash
   openssl rand -base64 32
   ```
2. Set in `.env`:
   ```env
   BETTER_AUTH_SECRET=your-generated-secret-here
   ```

That's it for email/password auth. It works out of the box.

## How It Works

### Session Management

- Sessions are stored in the `sessions` table (PostgreSQL)
- Session token is set as an HTTP-only cookie (`better-auth.session_token`)
- Sessions expire based on better-auth defaults (configurable in `platform/auth/config.ts`)

### Auth Middleware

```ts
import { requireAuth } from '@/platform/auth/middleware'

// Protect a route — sets c.get('user') and c.get('session')
app.use('/api/protected/*', requireAuth)
```

### Permissions

```ts
import { requirePermission } from '@/platform/auth/permissions'

// Require specific permission
app.use('/api/admin/*', requireAuth, requirePermission('admin'))
```

Roles: `free`, `pro`, `admin`. Customize in `platform/auth/permissions.ts`.

## Google OAuth (Optional)

1. Create OAuth credentials in [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Set authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
3. Add to `.env`:
   ```env
   GOOGLE_CLIENT_ID=xxx.apps.googleusercontent.com
   GOOGLE_CLIENT_SECRET=GOCSPX-xxx
   ```

OAuth is conditionally enabled — if the env vars are missing, only email/password is available.

## API Key Authentication

For programmatic/agent access, Douala supports API key authentication:

- Keys are prefixed with `sk_` and use Bearer token format
- Stored as SHA-256 hashes (the raw key is shown once at creation)
- Mutually exclusive with session auth — if both are present, the request is rejected with 400

```bash
# Authenticate with an API key
curl -H "Authorization: Bearer sk_abc123..." https://your-app.com/api/resource
```

API keys are stored in the `api_keys` table with expiry and revocation support.

## Email Verification

Better-auth handles email verification flows. Verification emails are sent via Resend using templates in `features/(shared)/email/auth-emails.ts`.

## Password Reset

The password reset flow uses better-auth's built-in token generation and verification. Reset emails are sent via the templates in `features/(shared)/email/auth-emails.ts`.

## Customization

- **Auth config:** `platform/auth/config.ts`
- **Roles/permissions:** `platform/auth/permissions.ts`
- **Email templates:** `features/(shared)/email/auth-emails.ts`
- **User type:** `platform/types.ts` (extend `AppUser`)
- **Schema:** `platform/db/schema.ts` (users, sessions, accounts tables)
