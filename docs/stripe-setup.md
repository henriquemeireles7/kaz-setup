# Stripe Setup

## Prerequisites

- [Stripe account](https://dashboard.stripe.com/register) (test mode is fine)
- Stripe CLI installed (`brew install stripe/stripe-cli/stripe`)

## 1. Create Products and Prices

In Stripe Dashboard → Products:

1. Create a product (e.g., "Pro Plan")
2. Add two prices:
   - **Yearly:** e.g., $99/year → copy the `price_xxx` ID → `STRIPE_PRICE_ID`
   - **Monthly:** e.g., $12/month → copy the `price_xxx` ID → `STRIPE_MONTHLY_PRICE_ID`

## 2. Get API Keys

In Stripe Dashboard → Developers → API keys:

- **Secret key** (`sk_test_...`) → `STRIPE_SECRET_KEY`
- **Publishable key** (`pk_test_...`) → `PUBLIC_STRIPE_KEY`

## 3. Set Up Webhooks

### Local Development

```bash
# Forward Stripe events to your local server
stripe listen --forward-to localhost:3000/api/webhook

# Copy the webhook signing secret (whsec_...) → STRIPE_WEBHOOK_SECRET
```

### Production

In Stripe Dashboard → Developers → Webhooks:

1. Add endpoint: `https://your-domain.com/api/webhook`
2. Select events:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
3. Copy the signing secret → `STRIPE_WEBHOOK_SECRET`

## 4. Environment Variables

```env
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
STRIPE_PRICE_ID=price_xxx           # yearly price
STRIPE_MONTHLY_PRICE_ID=price_xxx   # monthly price
PUBLIC_STRIPE_KEY=pk_test_xxx
```

## How It Works

### Checkout Flow

1. User clicks "Subscribe" → `POST /api/checkout` creates a Stripe Checkout Session
2. User completes payment on Stripe-hosted page
3. Stripe sends `checkout.session.completed` webhook → `POST /api/webhook`
4. Webhook handler creates subscription record in DB and sends confirmation email

### Subscription Management

- **Customer Portal:** `GET /api/subscription/portal` redirects to Stripe's hosted portal for plan changes, cancellations, and payment method updates
- **Webhook sync:** Subscription updates (upgrades, cancellations, failures) are synced via webhooks in real-time

### Idempotency

The `webhook_events` table tracks processed Stripe event IDs. Duplicate webhooks are safely ignored.

## Testing

```bash
# Trigger a test event
stripe trigger checkout.session.completed

# Test with specific card numbers:
# 4242424242424242 — succeeds
# 4000000000000002 — declines
# 4000000000003220 — requires 3D Secure
```

## Customization

To change plans, edit `providers/payments.ts`:

```ts
export const plans = {
  yearly: { priceId: env.STRIPE_PRICE_ID, name: 'Pro Yearly', ... },
  monthly: { priceId: env.STRIPE_MONTHLY_PRICE_ID, name: 'Pro Monthly', ... },
}
```

To add more tiers, add more price IDs to `env.ts` and extend the `plans` object.
