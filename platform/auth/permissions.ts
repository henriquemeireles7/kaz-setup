import type { Context, Next } from 'hono'
import type { AppEnv } from '../types'
import { throwError } from '../errors'

// CUSTOMIZE: Define your roles and permissions
const rolePermissions = {
  free: ['read:public'],
  pro: ['read:public', 'read:premium', 'write:own'],
  admin: ['read:public', 'read:premium', 'write:own', 'write:any', 'admin'],
} as const

type Role = keyof typeof rolePermissions
type Permission = (typeof rolePermissions)[Role][number]

export function requirePermission(permission: Permission) {
  return async (c: Context<AppEnv>, next: Next) => {
    const user = c.get('user')
    const perms = rolePermissions[user.role as Role] ?? []

    if (!perms.includes(permission)) {
      return throwError(c, 'FORBIDDEN')
    }

    return next()
  }
}
