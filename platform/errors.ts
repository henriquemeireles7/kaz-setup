import type { Context } from 'hono'

// CUSTOMIZE: Add your error codes here
export const errors = {
  // Auth
  UNAUTHORIZED: { status: 401, message: 'Authentication required' },
  FORBIDDEN: { status: 403, message: 'Insufficient permissions' },
  SESSION_EXPIRED: { status: 401, message: 'Session expired' },

  // Validation
  VALIDATION_ERROR: { status: 400, message: 'Invalid input' },
  INVALID_REQUEST: { status: 400, message: 'Invalid request' },

  // Not Found
  NOT_FOUND: { status: 404, message: 'Resource not found' },
  USER_NOT_FOUND: { status: 404, message: 'User not found' },

  // Conflict
  ALREADY_EXISTS: { status: 409, message: 'Resource already exists' },

  // Rate Limiting
  RATE_LIMITED: { status: 429, message: 'Too many requests' },

  // Server
  INTERNAL_ERROR: { status: 500, message: 'Internal server error' },
  SERVICE_UNAVAILABLE: { status: 503, message: 'Service temporarily unavailable' },
} as const

export type ErrorCode = keyof typeof errors

export function throwError(c: Context, code: ErrorCode, details?: string) {
  const error = errors[code]
  return c.json(
    { ok: false, error: { code, message: error.message, details } },
    error.status as 400,
  )
}
