# Component Library Setup Guide

This guide explains how to convert the Natural Language GUI project into a distributable component library.

## Architecture Decision: Monorepo vs Single Package

### Recommended: Monorepo Structure

**Pros:**
- Separate library code from demo/docs
- Easier local development and testing
- Can have multiple packages (core, parser, react, etc.)
- Demo app can dogfood the library
- Better for long-term maintenance

**Cons:**
- More initial setup complexity
- Requires monorepo tooling (Turborepo, pnpm workspaces, etc.)

### Alternative: Single Package with Examples

**Pros:**
- Simpler to set up initially
- Single npm package to publish
- Less tooling overhead

**Cons:**
- Demo app code mixed with library
- Harder to test library as consumers would use it
- More complex build configuration

---

## Implementation Plan

### Step 1: Choose Your Build Tool

For a React component library with TypeScript, these are the best options:

#### Option A: **tsup** (Recommended - Easiest)
```bash
npm install -D tsup
```

**Pros:**
- Zero config for most cases
- Built on esbuild (very fast)
- Handles TypeScript, JSX, CSS
- Tree-shakeable output

**package.json scripts:**
```json
{
  "scripts": {
    "build": "tsup",
    "dev": "tsup --watch"
  }
}
```

**tsup.config.ts:**
```typescript
import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: true,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom', '@radix-ui/*', 'next'],
})
```

#### Option B: **Rollup** (More Control)
Better if you need fine-grained control over bundling.

#### Option C: **tsc** (TypeScript Only)
Simple but doesn't bundle - just transpiles.

---

### Step 2: Restructure Project

#### Monorepo Approach (Recommended)

**Install Turborepo:**
```bash
npx create-turbo@latest
# Or manually: npm install -D turbo
```

**Root package.json:**
```json
{
  "name": "natural-language-gui",
  "private": true,
  "workspaces": [
    "packages/*",
    "apps/*"
  ],
  "scripts": {
    "build": "turbo run build",
    "dev": "turbo run dev",
    "lint": "turbo run lint",
    "test": "turbo run test"
  },
  "devDependencies": {
    "turbo": "^2.0.0",
    "typescript": "^5.0.0"
  }
}
```

**Directory structure:**
```
natural-language-gui/
├── packages/
│   ├── nli-core/              # Main library
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── ui/
│   │   │   │   │   ├── button.tsx
│   │   │   │   │   ├── input.tsx
│   │   │   │   │   └── ...
│   │   │   │   └── index.ts
│   │   │   ├── parser/
│   │   │   │   ├── tokenizer.ts
│   │   │   │   ├── ast-builder.ts
│   │   │   │   ├── component-mapper.ts
│   │   │   │   ├── instantiator.tsx
│   │   │   │   └── index.ts
│   │   │   ├── lib/
│   │   │   │   ├── utils.ts
│   │   │   │   └── markdown-generators.ts
│   │   │   ├── types/
│   │   │   │   └── index.ts
│   │   │   ├── styles/
│   │   │   │   └── globals.css
│   │   │   └── index.ts      # Main export
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── tsup.config.ts
│   │   └── README.md
│   │
│   └── nli-viewer/            # Optional: Viewer as separate package
│       ├── src/
│       │   └── ComponentViewerBidirectional.tsx
│       ├── package.json
│       └── tsup.config.ts
│
├── apps/
│   └── demo/                  # Demo Next.js app
│       ├── app/
│       │   ├── page.tsx
│       │   └── translation-viewer/
│       ├── package.json       # Depends on @nli/core
│       ├── next.config.ts
│       └── tsconfig.json
│
├── docs/                      # Documentation site (optional)
├── package.json               # Root config
├── turbo.json
└── README.md
```

**packages/nli-core/package.json:**
```json
{
  "name": "@natural-language-gui/core",
  "version": "0.1.0",
  "description": "Bidirectional natural language interface component library",
  "main": "./dist/index.js",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.mjs",
      "require": "./dist/index.js",
      "types": "./dist/index.d.ts"
    },
    "./components": {
      "import": "./dist/components/index.mjs",
      "require": "./dist/components/index.js",
      "types": "./dist/components/index.d.ts"
    },
    "./parser": {
      "import": "./dist/parser/index.mjs",
      "require": "./dist/parser/index.js",
      "types": "./dist/parser/index.d.ts"
    },
    "./styles": "./dist/styles/globals.css"
  },
  "files": [
    "dist",
    "README.md"
  ],
  "sideEffects": [
    "**/*.css"
  ],
  "scripts": {
    "build": "tsup",
    "dev": "tsup --watch",
    "lint": "eslint src/",
    "type-check": "tsc --noEmit"
  },
  "peerDependencies": {
    "react": "^18.0.0 || ^19.0.0",
    "react-dom": "^18.0.0 || ^19.0.0",
    "@radix-ui/react-checkbox": "^1.0.0",
    "@radix-ui/react-radio-group": "^1.0.0",
    "@radix-ui/react-select": "^2.0.0",
    "@radix-ui/react-switch": "^1.0.0",
    "@radix-ui/react-toggle": "^1.0.0",
    "@radix-ui/react-toggle-group": "^1.0.0",
    "date-fns": "^4.0.0",
    "lucide-react": "^0.500.0"
  },
  "devDependencies": {
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "tsup": "^8.0.0",
    "typescript": "^5.0.0",
    "tailwindcss": "^3.4.0"
  },
  "keywords": [
    "react",
    "components",
    "natural-language",
    "markdown",
    "gui",
    "parser",
    "radix-ui",
    "accessibility"
  ],
  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/natural-language-gui"
  },
  "license": "MIT"
}
```

**packages/nli-core/src/index.ts:**
```typescript
// Main exports
export * from './components'
export * from './parser'
export * from './lib/utils'
export * from './types'

// Named exports for convenience
export { Button } from './components/ui/button'
export { Input } from './components/ui/input'
export { Switch } from './components/ui/switch'
export { Checkbox } from './components/ui/checkbox'
export { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from './components/ui/select'
export { RadioGroup, RadioGroupItem } from './components/ui/radio-group'
export { ToggleGroup, ToggleGroupItem } from './components/ui/toggle-group'
export { CheckboxGroup, CheckboxGroupItem } from './components/ui/checkbox-group'
// ... all other components

// Parser exports
export {
  parse,
  parseToComponents,
  instantiateComponents,
  tokenize,
  buildAST,
  mapASTToComponents,
  inferComponentType,
  inferGroupType,
} from './parser'

// Types
export type {
  ComponentType,
  Token,
  ASTNode,
  MappedComponent,
  InferenceContext,
} from './types'
```

**packages/nli-core/src/components/index.ts:**
```typescript
// Component exports
export * from './ui/button'
export * from './ui/input'
export * from './ui/textarea'
export * from './ui/switch'
export * from './ui/checkbox'
export * from './ui/checkbox-group'
export * from './ui/radio-group'
export * from './ui/select'
export * from './ui/toggle'
export * from './ui/toggle-group'
export * from './ui/calendar'
export * from './ui/popover'
export * from './ui/dialog'
export * from './ui/command'
export * from './ui/combo-box'
export * from './ui/button-group'
```

**packages/nli-core/tsup.config.ts:**
```typescript
import { defineConfig } from 'tsup'

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    'components/index': 'src/components/index.ts',
    'parser/index': 'src/parser/index.ts',
  },
  format: ['cjs', 'esm'],
  dts: true,
  splitting: true,
  sourcemap: true,
  clean: true,
  treeshake: true,
  external: [
    'react',
    'react-dom',
    'react/jsx-runtime',
    '@radix-ui/*',
    'date-fns',
    'lucide-react',
    'class-variance-authority',
    'clsx',
    'tailwind-merge',
  ],
  esbuildOptions(options) {
    options.banner = {
      js: '"use client";',
    }
  },
})
```

**apps/demo/package.json:**
```json
{
  "name": "nli-demo",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "@natural-language-gui/core": "workspace:*",
    "next": "16.1.1",
    "react": "19.2.3",
    "react-dom": "19.2.3"
  }
}
```

---

### Step 3: Migration Steps

1. **Create new structure:**
```bash
mkdir -p packages/nli-core/src/{components,parser,lib,types,styles}
mkdir -p apps/demo
```

2. **Move files:**
```bash
# Move components
mv components/ui packages/nli-core/src/components/
mv components/component-registry.tsx apps/demo/

# Move parser
mv lib/parser packages/nli-core/src/

# Move utilities
mv lib/utils.ts packages/nli-core/src/lib/
mv lib/markdown-generators.ts packages/nli-core/src/lib/

# Move types
mv types packages/nli-core/src/

# Move demo app
mv app apps/demo/

# Move styles
mv app/globals.css packages/nli-core/src/styles/
```

3. **Update imports:**

In all moved files, update import paths:
```typescript
// Before
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

// After (in library)
import { cn } from "../../lib/utils"
import { Button } from "../ui/button"

// In demo app
import { Button } from "@natural-language-gui/core"
```

4. **Create export files:**

Create `packages/nli-core/src/index.ts` with all exports as shown above.

5. **Build the library:**
```bash
cd packages/nli-core
npm install
npm run build
```

6. **Test in demo app:**
```bash
cd apps/demo
npm install
npm run dev
```

---

### Step 4: Handle Styles

You have two options for distributing styles:

#### Option A: Export CSS File (Simpler)
```typescript
// tsup.config.ts
export default defineConfig({
  // ... other config
  esbuildOptions(options) {
    options.loader = { '.css': 'css' }
  },
})
```

**Consumer usage:**
```typescript
// app/layout.tsx
import "@natural-language-gui/core/styles"
```

#### Option B: Use CSS-in-JS (No external CSS)
Convert Tailwind classes to CSS-in-JS using libraries like:
- `@emotion/react`
- `styled-components`
- `vanilla-extract`

#### Option C: Provide Tailwind Config (Recommended)
Export your Tailwind configuration so consumers can include your components in their Tailwind build:

**packages/nli-core/tailwind.config.js:**
```javascript
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // Your theme extensions
    },
  },
  plugins: [],
}
```

**Consumer usage:**
```javascript
// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@natural-language-gui/core/dist/**/*.{js,mjs}',
  ],
  presets: [
    require('@natural-language-gui/core/tailwind.config'),
  ],
}
```

---

### Step 5: Publishing

#### Prepare for npm

1. **Add npm scripts:**
```json
{
  "scripts": {
    "prepublishOnly": "npm run build",
    "version": "npm run build"
  }
}
```

2. **Add .npmignore:**
```
src/
*.test.ts
*.test.tsx
tsconfig.json
tsup.config.ts
.turbo/
node_modules/
```

3. **Test package locally:**
```bash
cd packages/nli-core
npm pack
# Creates natural-language-gui-core-0.1.0.tgz

# Test in another project
cd /path/to/test-project
npm install /path/to/natural-language-gui/packages/nli-core/natural-language-gui-core-0.1.0.tgz
```

#### Publishing to npm

```bash
# Login to npm
npm login

# Publish (from packages/nli-core)
npm publish --access public
```

---

### Step 6: Documentation for Consumers

Create a comprehensive README for the library package:

**packages/nli-core/README.md:**
```markdown
# Natural Language GUI Components

Bidirectional natural language interface component library for React.

## Installation

\`\`\`bash
npm install @natural-language-gui/core react react-dom
\`\`\`

## Peer Dependencies

This library requires:
- React 18+ or 19+
- Radix UI primitives
- date-fns
- lucide-react

\`\`\`bash
npm install @radix-ui/react-checkbox @radix-ui/react-select \\
  date-fns lucide-react
\`\`\`

## Usage

### Basic Components

\`\`\`tsx
import { Button, Input, Switch } from '@natural-language-gui/core'

function MyForm() {
  return (
    <div>
      <Input nli-markdown="Email" type="email" />
      <Switch nli-markdown="Dark Mode" />
      <Button nli-markdown="Submit">Submit</Button>
    </div>
  )
}
\`\`\`

### Parser (Markdown → GUI)

\`\`\`tsx
import { parseToComponents, instantiateComponents } from '@natural-language-gui/core'

const markdown = \`
*Email:* user@example.com
*Password:* secret
[Login]
\`

function DynamicForm() {
  const { components, errors } = parseToComponents(markdown)
  const elements = instantiateComponents(components)

  return <div>{elements}</div>
}
\`\`\`

### Styles

Import the base styles:
\`\`\`tsx
// app/layout.tsx
import '@natural-language-gui/core/styles'
\`\`\`

Or include in your Tailwind config:
\`\`\`javascript
// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@natural-language-gui/core/dist/**/*.{js,mjs}',
  ],
  presets: [
    require('@natural-language-gui/core/tailwind.config'),
  ],
}
\`\`\`

## Components

- Button
- Input
- Textarea
- Switch
- Toggle
- Checkbox
- CheckboxGroup
- RadioGroup
- Select
- ToggleGroup
- ComboBox
- Calendar
- DatePicker
- DateRangePicker
- Dialog
- Popover

## API

[Link to full API documentation]

## License

MIT
\`\`\`

---

## Alternative: Simple Single Package Approach

If monorepo is too complex, you can keep a simpler structure:

**package.json:**
```json
{
  "name": "@natural-language-gui/core",
  "version": "0.1.0",
  "main": "./dist/index.js",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.mjs",
      "require": "./dist/index.js"
    },
    "./components": "./dist/components/index.js",
    "./parser": "./dist/parser/index.js"
  },
  "files": ["dist"],
  "scripts": {
    "build": "tsup src/index.ts --format cjs,esm --dts",
    "dev": "tsup src/index.ts --format cjs,esm --dts --watch"
  }
}
```

**src/index.ts:**
```typescript
// Export everything from current structure
export * from '../components/ui/button'
export * from '../components/ui/input'
// ... etc

export * from '../lib/parser'
export * from '../lib/utils'
```

Keep the demo app in `app/` but don't include it in the published package (via `files` field).

---

## Comparison Table

| Approach | Setup Complexity | Maintenance | Best For |
|----------|-----------------|-------------|----------|
| Monorepo | High | Medium | Long-term, multiple packages |
| Single Package | Low | Medium | Quick start, single package |
| Separate Repos | Medium | High | Independent versioning |

---

## Recommended Next Steps

1. **Start with Monorepo + Turborepo**
   - Future-proof architecture
   - Easy to add more packages later
   - Great developer experience

2. **Use tsup for building**
   - Fast and simple
   - Good defaults

3. **Export Tailwind config**
   - Let consumers customize styles
   - Smaller bundle size

4. **Create comprehensive docs**
   - Storybook for component demos
   - Detailed API documentation
   - Migration guides

5. **Set up CI/CD**
   - Automated testing
   - Automatic publishing
   - Changesets for versioning

---

## Tools to Consider

- **Turborepo**: Monorepo management
- **Changesets**: Version management and changelogs
- **Storybook**: Component documentation
- **Vitest**: Testing
- **size-limit**: Bundle size monitoring
- **np**: Safe npm publishing

---

## Questions to Answer

1. **Package scope**: Use `@yourorg/nli-core` or `natural-language-gui`?
2. **Versioning**: Semantic versioning strategy?
3. **Breaking changes**: How to communicate?
4. **Browser support**: Which browsers to target?
5. **TypeScript**: Strict mode for consumers?
6. **CSS**: How to handle styles?
7. **Tree-shaking**: Important for your use case?

Let me know which approach you'd like to take and I can help with the specific implementation!
