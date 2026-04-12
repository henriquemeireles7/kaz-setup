# AI Development System (Harness)

> Last verified: 2026-04-12

## Purpose
The harness is the AI development infrastructure: hooks, skills, context files, and methodology
that make AI agents write production-quality code consistently.

## Three-Layer Context Architecture

### Layer 1: Folder CLAUDE.md (auto-loaded, auto-updated)
Every code folder has a CLAUDE.md with purpose, rules, imports, recipes, and an auto-generated footer.
The Stop hook regenerates footers when code changes.

### Layer 2: Universal Reference Files (decisions/*.md)
Quick-reference files covering architecture, coding patterns, deploy, design, etc.
Manually maintained. Read by skills before executing.

### Layer 3: Strategy Documents (decisions/{domain}/)
Initiative documents with project roadmaps. Created by d-strategy, broken down by d-roadmap.

## 8 Skills

| Skill | Type | Purpose |
|-------|------|---------|
| d-strategy | Strategy | Interactive Q&A → initiative document |
| d-roadmap | Strategy | Initiative → project roadmaps |
| d-code | Execution | Roadmap → TDD implementation |
| d-content | Execution | Strategy → branded content |
| d-review | Quality | Pre-commit review (7 phases) |
| d-harness | Quality | Error → prevention artifact |
| d-health | Quality | 10-session codebase health audit |
| d-fail | Quality | Deploy failure recovery |

## Hook System

| Hook | Event | Purpose |
|------|-------|---------|
| block-dangerous | PreToolUse:Bash | Block destructive commands |
| protect-files | PreToolUse:Edit/Write | Protect .env, secrets, .git/ |
| protect-config | PreToolUse:Edit/Write | Protect config files |
| pre-commit-check | PreToolUse:Bash | Lint + typecheck before commit |
| warn-console-log | PostToolUse:Write/Edit | Warn on console.log in prod code |
| harden-gate | PostToolUse:Write/Edit | Real-time security checks |
| stop-quality-gate | Stop | Batch lint + typecheck |
| update-context-files | Stop | Regenerate CLAUDE.md footers |
| reinject-context | SessionStart:compact | Re-inject rules after compaction |
| notify-done | Stop | macOS notification |

## Philosophy
- **Batch at Stop, not per-edit** — faster editing, same quality
- **Protect configs** — fix code to match good config, never the reverse
- **Hooks over CLAUDE.md rules** — deterministic > advisory
- **TypeScript on Bun** — no bash/jq dependency for hooks
- **Zero recurring errors** — every error produces a prevention artifact

## Error Feedback Loop
```
Error → d-harness classifies → encodes prevention artifact → error class eliminated
```

Prevention layers (in preference order):
1. Hook (deterministic)
2. CLAUDE.md rule (advisory)
3. Config file
4. Script
5. Universal file
