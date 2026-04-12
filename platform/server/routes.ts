import type { Hono } from 'hono'
import type { AppEnv } from '../types'

// CUSTOMIZE: Import your feature routes
// import { authRoutes } from '../auth/routes'
// import { myFeatureRoutes } from '../../features/my-feature/routes'

export function mountRoutes(app: Hono<AppEnv>) {
  // CUSTOMIZE: Chain your routes here
  // Route chains must be connected for AppRoutes type inference
  return app
  // .route('/api/auth', authRoutes)
  // .route('/api/my-feature', myFeatureRoutes)
}

// Export the type for RPC client type inference
export type AppRoutes = ReturnType<typeof mountRoutes>
