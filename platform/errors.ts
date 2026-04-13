import type { Context } from 'hono'

// CUSTOMIZE: Add your error codes here
export const errors = {
  // Auth
  UNAUTHORIZED: { status: 401, code: 'UNAUTHORIZED', message: 'Authentication required' },
  FORBIDDEN: { status: 403, code: 'FORBIDDEN', message: 'Insufficient permissions' },
  SESSION_EXPIRED: { status: 401, code: 'SESSION_EXPIRED', message: 'Session expired' },

  // Validation
  VALIDATION_ERROR: { status: 400, code: 'VALIDATION_ERROR', message: 'Invalid input' },
  INVALID_REQUEST: { status: 400, code: 'INVALID_REQUEST', message: 'Invalid request' },

  // Not Found
  NOT_FOUND: { status: 404, code: 'NOT_FOUND', message: 'Resource not found' },
  USER_NOT_FOUND: { status: 404, code: 'USER_NOT_FOUND', message: 'User not found' },

  // Payments
  PAYMENT_FAILED: { status: 402, code: 'PAYMENT_FAILED', message: 'Payment failed' },
  SUBSCRIPTION_NOT_FOUND: {
    status: 404,
    code: 'SUBSCRIPTION_NOT_FOUND',
    message: 'No active subscription found',
  },
  SUBSCRIPTION_REQUIRED: {
    status: 403,
    code: 'SUBSCRIPTION_REQUIRED',
    message: 'Active subscription required',
  },

  // Conflict
  ALREADY_EXISTS: { status: 409, code: 'ALREADY_EXISTS', message: 'Resource already exists' },

  // Rate Limiting
  RATE_LIMITED: { status: 429, code: 'RATE_LIMITED', message: 'Too many requests' },

  // Server
  INTERNAL_ERROR: { status: 500, code: 'INTERNAL_ERROR', message: 'Internal server error' },
  SERVICE_UNAVAILABLE: {
    status: 503,
    code: 'SERVICE_UNAVAILABLE',
    message: 'Service temporarily unavailable',
  },
} as const

export type ErrorCode = keyof typeof errors

export function throwError(c: Context, code: ErrorCode, details?: string) {
  const error = errors[code]
  return c.json(
    { ok: false, code: error.code, message: error.message, details },
    error.status as 400,
  )
}
