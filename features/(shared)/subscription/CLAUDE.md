# subscription

## Purpose
Stripe checkout + webhook handling + subscription lifecycle management.

## Critical Rules
- NEVER use raw `c.json()` — use `success()` for data, `throwError()` for errors
- ALWAYS verify webhook signature before processing events
- ALWAYS normalize email: `.toLowerCase().trim()` before storing
- ALWAYS use `onConflictDoNothing` to prevent duplicate subscriptions
- NEVER import Stripe directly — use `payments` from `providers/payments`

## Recipe: New Webhook Event Handler
```ts
// Inside webhookRoutes handler, add a new case:
case 'customer.subscription.trial_will_end': {
  const sub = event.data.object
  // ... handle the event ...
  break
}
```
