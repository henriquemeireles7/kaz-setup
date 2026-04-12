import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { secureHeaders } from 'hono/secure-headers'
import { env } from '../env'
import type { AppEnv } from '../types'
import { mountRoutes } from './routes'

const app = new Hono<AppEnv>()

// Health check
app.get('/health', (c) => c.json({ status: 'healthy', uptime: process.uptime() }))

// Middleware
app.use('*', logger())
app.use('*', secureHeaders())
app.use('*', cors({
  origin: env.PUBLIC_APP_URL,
  credentials: true,
}))

// Mount routes
const routes = mountRoutes(app)

// Global error handler
app.onError((err, c) => {
  console.error(`[${c.req.method}] ${c.req.path} — ${err.message}`)
  return c.json({ ok: false, error: { code: 'INTERNAL_ERROR', message: 'Internal server error' } }, 500)
})

// Export type for RPC
export type AppRoutes = typeof routes

// Start server
export default {
  port: env.PORT,
  fetch: app.fetch,
}
