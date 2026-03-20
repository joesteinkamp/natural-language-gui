# CLAUDE.md

## Project Overview

**Natural Language GUI** is a bidirectional natural language interface component library. It converts GUI components to/from markdown representation, enabling AI assistants to interact with UIs through plain text.

**Key insight**: This is NOT a typical component library. The unique feature is the GUI ↔ Markdown translation layer. Always consider how changes affect both directions.

## Repository Structure

This is a **monorepo** managed with Turbo and npm workspaces.

```
natural-language-gui/
├── apps/
│   └── demo/                    # Next.js 16 demo app (nli-demo)
│       ├── app/page.tsx         # Main entry — renders ComponentViewerBidirectional
│       ├── components/          # Demo-specific components
│       │   └── ComponentViewerBidirectional.tsx  # Core interactive viewer
│       └── tailwind.config.ts   # Tailwind with HSL color system
├── packages/
│   └── nli-core/                # Core library (@natural-language-gui/core)
│       └── src/
│           ├── index.ts         # Main exports
│           ├── components/ui/   # NLI-enabled UI components (14 components)
│           ├── registry/        # Pluggable design system support
│           │   ├── component-registry.ts  # Types + createInstantiator factory
│           │   ├── default-registry.ts    # Default Radix UI renderers
│           │   └── NLIProvider.tsx         # React context provider
│           ├── parser/          # Markdown → Component pipeline
│           │   ├── tokenizer.ts
│           │   ├── ast-builder.ts
│           │   ├── component-mapper.ts
│           │   ├── inference.ts
│           │   └── instantiator.tsx
│           ├── lib/             # Utilities
│           │   ├── markdown-generators.ts   # GUI → Markdown
│           │   ├── markdown-updater.ts      # Incremental updates
│           │   ├── sync-reconciler.ts       # Bidirectional sync
│           │   ├── markdown-differ.ts       # Diffing
│           │   └── markdown-cleanser.ts     # LLM prompt cleaning
│           ├── hooks/
│           │   └── useBidirectionalSync.ts  # Main sync hook
│           ├── types/           # TypeScript declarations (nli.d.ts)
│           └── styles/          # Base CSS
├── docs/                        # Project documentation
│   ├── ARCHITECTURE.md          # System design (read before architectural decisions)
│   ├── NLI_SPECIFICATION.md     # Markdown format spec (source of truth)
│   ├── COMPONENT_AUTHORING.md   # Guide for creating NLI components
│   ├── BIDIRECTIONAL_SYNC.md    # Sync implementation details
│   ├── EXAMPLES_GUI.md          # GUI usage examples
│   ├── EXAMPLES_MD.md           # Markdown format examples
│   └── ROADMAP.md               # Project roadmap
├── AI_INSTRUCTIONS.md           # Detailed AI development guidelines
├── turbo.json                   # Turbo task config
├── vercel.json                  # Vercel deployment config
└── tsconfig.json                # Root TypeScript config
```

## Tech Stack

- **Framework**: Next.js 16 with React 19
- **Language**: TypeScript 5 (strict mode)
- **Components**: Radix UI primitives (default, pluggable via Component Registry)
- **Styling**: Tailwind CSS 3.4 with HSL variables
- **Build**: Turbo (monorepo orchestration), tsup (library bundling)
- **Code Quality**: ESLint (Next.js config), Prettier
- **Deployment**: Vercel

## Common Commands

```bash
# Development
npm run dev              # Start all dev servers (Turbo)
npm run build            # Build all packages
npm run lint             # Lint all packages
npm run type-check       # TypeScript checks
npm run clean            # Clean all build artifacts
npm run format           # Format with Prettier

# Parser tests (run from apps/demo)
npm run parser:test           # Parser rule tests
npm run parser:example        # Parser examples
npm run parser:bidirectional  # Round-trip conversion tests
```

## Architecture — Three-Layer Separation of Concerns

### 1. Components Layer (`packages/nli-core/src/components/ui/`)
- Components are **"dumb"** about NLI — they accept an `nli-markdown` prop and forward it to the DOM element. Nothing more.
- Built on Radix UI primitives, styled with Tailwind.
- Components work independently without the NLI system.

### 2. Markdown Generation Layer (`packages/nli-core/src/lib/markdown-generators.ts`)
- Reads DOM state and produces markdown.
- Single source of truth for GUI → Markdown format.
- All component types handled in one centralized place.

### 3. Parser Layer (`packages/nli-core/src/parser/`)
- Pipeline: Tokenizer → AST Builder → Type Inference → Component Mapper → Instantiator
- Converts markdown back to React component tree.
- The instantiator uses a **pluggable Component Registry** — custom design systems can be swapped in.

### 4. Component Registry (`packages/nli-core/src/registry/`)
- Maps `ComponentType` → `ComponentRenderer` functions.
- Default registry provides Radix UI + Tailwind renderers.
- Users override individual components or provide a full custom set.
- `createInstantiator(registry)` — factory for zero-Radix-dependency bundles.
- `NLIProvider` — React context to set registry at app root.

### Bidirectional Sync (`hooks/useBidirectionalSync.ts`, `lib/sync-reconciler.ts`)
- Manages GUI ↔ Markdown synchronization.
- Uses debouncing, sequence numbers for loop prevention, and graceful conflict resolution.

## Markdown Format Rules

The canonical format spec is `docs/NLI_SPECIFICATION.md`. Key patterns:

| Pattern | Component |
|---|---|
| `*Label:* value` | Input / Textarea |
| `*Label:* yes` / `*Label:* no` | Switch / Toggle |
| `[x] Label` / `[ ] Label` | Checkbox (GitHub-flavored) |
| `[Button Text]` | Button |
| `- Option` | Radio/Select group items |
| `*Label:* Month DD, YYYY` | Calendar/Date picker |

**Boolean values must always be `yes`/`no`** — never `true`/`false`, `on`/`off`, or `1`/`0`.

## Critical Rules

### Never
1. **Never add markdown generation logic inside components** — it belongs in `markdown-generators.ts`
2. **Never make components aware of markdown format** — components are UI-only
3. **Never use `@ts-ignore` for `nli-markdown`** — `types/nli.d.ts` provides proper types
4. **Never modify markdown format without updating `docs/NLI_SPECIFICATION.md` first** — spec is source of truth
5. **Never use boolean values other than `yes`/`no` in markdown**

### Always
1. **Always keep components dumb** — accept `nli-markdown`, forward to DOM, done
2. **Always put markdown logic in the markdown generation layer**, not in components
3. **Always maintain separation of concerns** between components, NLI attributes, and markdown generation
4. **Always check `docs/ARCHITECTURE.md`** before making architectural decisions
5. **Always use `nli-markdown`** as the attribute name — never invent alternatives

## Adding a New Component (Default Registry)

1. Create component in `packages/nli-core/src/components/ui/` — forward `...props` to DOM element
2. Export from `packages/nli-core/src/index.ts`
3. Add a renderer function in `packages/nli-core/src/registry/default-registry.ts`
4. Register it in the `defaultRegistry` object in the same file
5. Add markdown generation pattern to `packages/nli-core/src/lib/markdown-generators.ts`
6. Add parser support in `packages/nli-core/src/parser/`
7. Document pattern in `docs/NLI_SPECIFICATION.md`
8. Add examples to `docs/EXAMPLES_GUI.md`
9. Test bidirectional conversion

## Using a Custom Design System

Users can plug in their own components via the `ComponentRegistry`:

```typescript
import { instantiateComponents, type ComponentRegistry } from '@natural-language-gui/core'

// Override specific components — unregistered types fall back to defaults
const myRegistry: ComponentRegistry = {
  button: (mapped, onChange) => <MyButton key={mapped.key} ... />,
  input: (mapped, onChange) => <MyInput key={mapped.key} ... />,
}

const elements = instantiateComponents(components, handleChange, myRegistry)

// Or use NLIProvider for app-wide registry
<NLIProvider registry={myRegistry}>
  <InstantiatedForm components={components} />
</NLIProvider>

// For zero Radix dependency (full tree-shaking)
import { createInstantiator } from '@natural-language-gui/core'
const instantiate = createInstantiator(myFullRegistry)
```

## Radix UI State Conventions

Radix components use `data-state` attributes:
- Switch/Checkbox: `data-state="checked"` | `"unchecked"`
- Toggle: `data-state="on"` | `"off"`
- Dialog/Popover: `data-state="open"` | `"closed"`

Place `nli-markdown` on the trigger/root element that receives focus and state changes.

## Workspace Layout

| Workspace | Package Name | Purpose |
|---|---|---|
| `apps/demo` | `nli-demo` | Next.js demo app with interactive viewer |
| `packages/nli-core` | `@natural-language-gui/core` | Core library (components, parser, sync) |

The core package builds with tsup to dual ESM/CJS output in `dist/`.

## Deployment

- Platform: Vercel
- Build command: `turbo run build --filter=nli-demo`
- Output: `apps/demo/.next`
- No CI/CD pipeline beyond Vercel's built-in

## Additional Resources

- `AI_INSTRUCTIONS.md` — Extended AI assistant guidelines with anti-patterns and debugging tips
- `docs/COMPONENT_AUTHORING.md` — Detailed guide for creating NLI components
- `docs/BIDIRECTIONAL_SYNC.md` — Deep dive into sync implementation
