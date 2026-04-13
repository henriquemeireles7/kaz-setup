import type { Hono } from 'hono'
import { authRoutes } from '../auth/routes'
import type { AppEnv } from '../types'
import { checkoutRoutes } from '../../features/(shared)/subscription/create-checkout'
import { completeCheckoutRoutes } from '../../features/(shared)/subscription/complete-checkout'
import { portalRoutes } from '../../features/(shared)/subscription/customer-portal'
import { webhookRoutes } from '../../features/(shared)/subscription/handle-webhook'
import { accountRoutes } from '../../features/(shared)/account/routes'
import { sitemapRoutes } from '../../features/(shared)/seo/sitemap'

export function mountRoutes(app: Hono<AppEnv>) {
  // Route chains must be connected for AppRoutes type inference
  return app
    .route('/api/auth', authRoutes)
    .route('/api/checkout', checkoutRoutes)
    .route('/api/checkout', completeCheckoutRoutes)
    .route('/api/subscription/portal', portalRoutes)
    .route('/api/webhook', webhookRoutes)
    .route('/api/account', accountRoutes)
    .route('/', sitemapRoutes)
  // CUSTOMIZE: Add your feature routes above
}

// Export the type for RPC client type inference
export type AppRoutes = ReturnType<typeof mountRoutes>
