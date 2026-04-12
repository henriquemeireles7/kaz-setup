# mharness

AI development harness for Claude Code. A methodology + infrastructure that makes AI agents write production-quality code.

## What this is

A template repo containing:

- **Hooks** — PreToolUse/PostToolUse/Stop guards that enforce rules deterministically
- **Skills** — 8 slash-command workflows (strategy, roadmap, code, content, review, health, harness improvement, deploy recovery)
- **Decisions framework** — Three-domain strategy structure with maturity scoring
- **Context system** — Auto-updating CLAUDE.md files per folder (Domain-Spec Architecture)

## Quick start

1. Click "Use this template" on GitHub (or clone)
2. Customize `CLAUDE.md` — replace placeholders with your stack, rules, and project context
3. Customize `.claude/hooks/harden-gate.ts` — add your project-specific security patterns
4. Customize `.claude/hooks/reinject-context.ts` — add your stack reminders
5. Fill in `decisions/` reference files for your project
6. Start working with Claude Code — the harness enforces itself

## Architecture

```
.claude/
├── settings.json              # Hook wiring (events → scripts)
└── hooks/
    ├── block-dangerous.ts     # PreToolUse: blocks destructive commands
    ├── protect-files.ts       # PreToolUse: blocks edits to .env, .git/, secrets/
    ├── protect-config.ts      # PreToolUse: blocks config edits (fix code, not config)
    ├── pre-commit-check.ts    # PreToolUse: runs linter + typecheck before git commit
    ├── warn-console-log.ts    # PostToolUse: warns on console.log in production code
    ├── harden-gate.ts         # PostToolUse: real-time security + pattern checks
    ├── stop-quality-gate.ts   # Stop: batch lint + typecheck on all changed files
    ├── update-context-files.ts# Stop: auto-regenerate CLAUDE.md footers
    ├── reinject-context.ts    # SessionStart: re-inject rules after context compaction
    ├── notify-done.ts         # Stop: macOS notification when session ends
    ├── check-gstack.sh        # PreToolUse: verify gstack installed (optional)
    └── lib/
        ├── update-claude-md.ts   # Footer renderer
        └── analyze-directory.ts  # Directory scanner (exports, deps)

skills/
├── d-strategy/   # Interactive founder Q&A → initiative document
├── d-roadmap/    # Initiative → project roadmaps (mechanical extraction)
├── d-code/       # Roadmap → TDD implementation (5 phases)
├── d-content/    # Strategy → content (blog, handbook, social, clips)
├── d-review/     # Pre-commit review (mechanical + AI, 7 phases)
├── d-harness/    # Error → prevention rule (feedback loop)
├── d-health/     # 10-session codebase health audit
└── d-fail/       # Deploy failure recovery

decisions/
├── maturity.md       # Maturity framework (5 levels, 3 domains, categories)
├── harness.md        # Harness architecture docs
├── health.md         # Living scorecard (updated by d-health)
├── humantasks.md     # AI-discovered human-required actions
├── CLAUDE.md         # Folder navigation guide
├── product/context.md   # Product domain context
├── growth/context.md    # Growth domain context
└── harness/context.md   # Harness domain context
```

## The methodology

### Two session types

**Strategy session** (1 workspace per initiative):
```
d-strategy → reviews → d-roadmap → ship
```

**Execution session** (1 workspace per project):
```
Read roadmap.md → d-code or d-content → d-review → ship
```

### Error feedback loop
```
Error happens → d-harness analyzes → creates prevention artifact → error class eliminated
```

Prevention artifacts go into the right layer:
1. **Hook** (deterministic, machine-checkable) — preferred
2. **CLAUDE.md rule** (judgment-based, advisory)
3. **Config file** (biome.json, tsconfig.json, etc.)
4. **Script** (complex multi-file check)
5. **Universal file** (decisions/*.md)

### Domain-Spec Architecture (DSA)

Every code folder gets a `CLAUDE.md` with:
- Purpose, critical rules, import maps, recipes
- Auto-generated footer (files, exports, dependencies)
- Footer refreshed by the Stop hook whenever code changes

## Customization guide

### Must customize (marked with `CUSTOMIZE:` comments)

| File | What to change |
|------|---------------|
| `CLAUDE.md` | Stack, build order, key files, commands, rules |
| `.claude/hooks/harden-gate.ts` | Security patterns specific to your framework |
| `.claude/hooks/reinject-context.ts` | Stack reminders for context compaction |
| `.claude/hooks/protect-config.ts` | Your config file list |
| `.claude/hooks/pre-commit-check.ts` | Your linter and typechecker commands |
| `.claude/hooks/stop-quality-gate.ts` | Your linter and typechecker commands |
| `decisions/maturity.md` | Your maturity categories and scoring |

### Optional customization

| File | What to change |
|------|---------------|
| Skills (`skills/*/SKILL.md`) | File paths, platform references |
| `decisions/*.md` | Your project's reference files |
| Content rules (`skills/d-content/rules-*.md`) | Your content guidelines |

## Prerequisites

- [Bun](https://bun.sh) — runtime for hooks and scripts
- [Claude Code](https://claude.ai/code) — AI coding agent
- [gstack](https://github.com/garrytan/gstack) — optional, for review/QA/design skills

## License

MIT
