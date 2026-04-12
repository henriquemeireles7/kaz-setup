# decisions/

## Purpose
Strategy knowledge base organized into three domains.
Contains universal reference files and domain-specific strategy documents.

## Structure
```
decisions/
├── *.md                    # Universal reference files
├── product/                # Generate value
│   ├── context.md          # Domain context, flywheel, bottlenecks
│   └── NN-initiative/      # Strategy initiatives
├── growth/                 # Capture value as money
│   ├── context.md          # Domain context
│   └── NN-initiative/      # Strategy initiatives
└── harness/                # Self-evolving AI system
    ├── context.md          # Domain context
    └── NN-initiative/      # Strategy initiatives
```

## Reference Files
| File | When to read |
|------|-------------|
| maturity.md | Scoring, levels, principles |
| harness.md | Hooks, skills, context architecture |
| health.md | Current scores, bottlenecks, incidents |
| humantasks.md | Human-required actions |

## Rules
- NEVER modify reference files without understanding their purpose
- ALWAYS update `Last verified` dates when you verify content matches reality
- Strategy documents (document.md) are created by d-strategy, not manually
- Roadmaps (roadmap.md) are created by d-roadmap from reviewed initiatives
