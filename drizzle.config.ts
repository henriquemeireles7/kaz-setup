import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: './platform/db/schema.ts',
  out: './platform/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    // biome-ignore lint/style/noNonNullAssertion: required for drizzle-kit CLI
    url: process.env.DATABASE_URL!,
  },
})
