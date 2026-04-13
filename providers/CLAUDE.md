# providers

## Purpose
Thin vendor wrappers. One file per capability, named by WHAT not WHO. Features never import vendor SDKs directly.

## Critical Rules
- NEVER import vendor SDKs from features — always go through providers
- ONE file per capability (payments, email, analytics, storage, ai, markdown)
- ALWAYS throw ProviderError on failure (from providers/errors.ts)
- ALWAYS name files by capability, not by vendor (email.ts not resend.ts)

## Imports (use from other modules)
```ts
import { payments, plans } from '@/providers/payments'
import { sendEmail } from '@/providers/email'
import { track, identify } from '@/providers/analytics'
import { upload, download, getSignedUrl, remove } from '@/providers/storage'
import { complete } from '@/providers/ai'
import { renderMarkdown, listContentFiles, getContentFile } from '@/providers/markdown'
```

## Recipe: New Provider
```ts
import { env } from '@/platform/env'
import { ProviderError } from '@/providers/errors'

// Initialize client at module level
const client = new VendorSDK(env.VENDOR_API_KEY)

export async function doThing(input: string): Promise<Result> {
  try {
    return await client.method(input)
  } catch (error) {
    throw new ProviderError('vendor', 'doThing', 500, error)
  }
}
```
