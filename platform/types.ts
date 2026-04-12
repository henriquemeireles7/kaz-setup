import type { Context } from 'hono'

// CUSTOMIZE: Extend with your user shape
export type AppUser = {
  id: string
  email: string
  name: string | null
  role: 'free' | 'pro' | 'admin' // CUSTOMIZE: your roles
}

export type AppEnv = {
  Variables: {
    user: AppUser
    session: { id: string; userId: string }
  }
}
