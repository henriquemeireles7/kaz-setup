import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

export const env = createEnv({
  server: {
    // CUSTOMIZE: Add your env vars
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
    DATABASE_URL: z.string().min(1),
    PORT: z.coerce.number().default(3000),
    BETTER_AUTH_SECRET: z.string().min(1),

    // Example service keys:
    // STRIPE_SECRET_KEY: z.string().startsWith('sk_'),
    // STRIPE_WEBHOOK_SECRET: z.string().startsWith('whsec_'),
    // RESEND_API_KEY: z.string().startsWith('re_'),
  },
  clientPrefix: 'PUBLIC_',
  client: {
    PUBLIC_APP_URL: z.string().url().default('http://localhost:3000'),
    // PUBLIC_STRIPE_KEY: z.string().startsWith('pk_'),
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
})
