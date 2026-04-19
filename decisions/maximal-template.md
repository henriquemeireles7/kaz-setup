# The Maximal Template Principle

## Core Idea

Ship everything opinionated. When someone clones Douala, they explain their product to an AI agent, plan the features, then ask AI to **remove** what doesn't fit. AI makes pruning near-free. This inverts the traditional "minimal template" approach.

## Why Maximal > Minimal

Traditional templates ship the bare minimum and expect developers to add features. This creates problems:

1. **Integration is hard.** Wiring auth + payments + email + DB together correctly takes days.
2. **Patterns diverge.** Each developer invents their own error handling, response format, env management.
3. **AI can't help much.** Adding features requires understanding the full context of what exists.

The maximal approach fixes all three:

1. **Everything is already integrated.** Auth talks to DB, payments trigger emails, errors are consistent.
2. **Patterns are established.** Follow the existing code, don't invent new patterns.
3. **AI excels at removal.** Deleting code is easier and safer than writing it from scratch.

## How It Works

```
Developer clones Douala
    ↓
Describes product to AI ("I'm building X for Y")
    ↓
AI identifies what to keep and what to remove
    ↓
AI removes unused providers, features, env vars, routes
    ↓
Developer builds domain-specific features on the remaining foundation
```

## What This Means for Contributions

- **Default to including.** When in doubt, add the feature to the template.
- **Make everything removable.** Features should be modular enough to delete cleanly.
- **Document removal paths.** Each module should note what depends on it.
- **No half-implementations.** Every included feature should work end-to-end.
