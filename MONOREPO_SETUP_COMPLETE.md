# Monorepo Setup Complete! 🎉

The project has been successfully converted to a monorepo structure.

## Structure

```
natural-language-gui/
├── packages/
│   └── nli-core/              # @natural-language-gui/core - The library
│       ├── src/
│       │   ├── components/    # UI components
│       │   ├── parser/        # Parser system
│       │   ├── lib/           # Utilities
│       │   ├── types/         # Type definitions
│       │   ├── styles/        # CSS
│       │   └── index.ts       # Main exports
│       ├── dist/              # Built files (generated)
│       ├── package.json
│       ├── tsup.config.ts
│       └── README.md
│
├── apps/
│   └── demo/                  # Demo Next.js application
│       ├── app/               # Next.js app
│       ├── public/            # Static assets
│       ├── component-registry.tsx  # Component examples
│       └── package.json
│
├── docs/                      # Documentation
├── package.json               # Root monorepo config
├── turbo.json                 # Turborepo config
└── README.md
```

## What Was Done

### 1. Created Monorepo Structure
- ✅ Set up `packages/nli-core` for the library
- ✅ Set up `apps/demo` for the demo application
- ✅ Configured npm workspaces
- ✅ Configured Turborepo for build orchestration

### 2. Library Package (`@natural-language-gui/core`)
- ✅ Organized code into proper structure
- ✅ Created main entry point with exports
- ✅ Set up tsup for building (ESM + CJS + types)
- ✅ Configured package.json for npm publishing
- ✅ Created README with usage examples
- ✅ Handles CSS export properly

### 3. Demo Application
- ✅ Migrated existing Next.js app
- ✅ Updated imports to use library package
- ✅ Configured to depend on `@natural-language-gui/core`
- ✅ Kept component registry for examples

### 4. Build System
- ✅ Turborepo for monorepo management
- ✅ tsup for fast library builds
- ✅ Proper dependency chain (library builds before app)
- ✅ All builds passing successfully

## Available Commands

### Root Level

```bash
# Build all packages
npm run build

# Run all packages in dev mode
npm run dev

# Lint all packages
npm run lint

# Type check all packages
npm run type-check

# Clean all build artifacts
npm run clean
```

### Library Package (`packages/nli-core`)

```bash
cd packages/nli-core

# Build the library
npm run build

# Watch mode (rebuild on changes)
npm run dev

# Type check only
npm run type-check

# Clean dist folder
npm run clean
```

### Demo App (`apps/demo`)

```bash
cd apps/demo

# Run dev server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run parser tests
npm run parser:test
npm run parser:example
npm run parser:bidirectional
```

## How to Use the Library

### For Local Development

The demo app already uses the library via file reference:

```json
{
  "dependencies": {
    "@natural-language-gui/core": "file:../../packages/nli-core"
  }
}
```

When you make changes to the library:
1. Build the library: `cd packages/nli-core && npm run build`
2. Changes will be available in the demo app
3. Or use watch mode: `npm run dev` from root

### For External Projects (After Publishing)

```bash
npm install @natural-language-gui/core
```

Then import:

```tsx
import {
  Button,
  Input,
  Switch,
  parseToComponents,
  instantiateComponents,
  cn,
} from '@natural-language-gui/core'

// Import styles
import '@natural-language-gui/core/styles'
```

## Publishing to npm

### First Time Setup

```bash
# Login to npm
npm login

# Update package.json version
cd packages/nli-core
npm version patch  # or minor, or major
```

### Publish

```bash
cd packages/nli-core

# Build and publish
npm run build
npm publish --access public
```

### Using Changesets (Recommended for version management)

```bash
# Install changesets
npm install -D @changesets/cli
npx changeset init

# Create a changeset
npx changeset

# Version packages
npx changeset version

# Publish
npx changeset publish
```

## Library Exports

The library exports:

### Components
- All UI components (Button, Input, Switch, etc.)
- Component groups (CheckboxGroup, ToggleGroup, etc.)
- All Radix UI wrapped components

### Parser
- `parseToComponents()` - Convert markdown to components
- `instantiateComponents()` - Render components from parsed data
- `parse()` - Low-level parser
- `inferComponentType()` - Type inference
- All parser utilities

### Utilities
- `cn()` - Class name utility
- `generateMarkdownForElement()` - Generate markdown from DOM
- `isRegularButton()` - Button detection

### Types
- Full TypeScript support
- All component prop types
- Parser types (Token, ASTNode, etc.)

## Next Steps

### To Continue Development
1. Start dev mode: `npm run dev`
2. Open http://localhost:3000/translation-viewer
3. Make changes to library or demo
4. Library changes require rebuild (or use watch mode)

### To Publish
1. Update version in `packages/nli-core/package.json`
2. Update CHANGELOG
3. Build and test: `npm run build`
4. Publish: `cd packages/nli-core && npm publish --access public`

### To Add More Packages
1. Create new package in `packages/`
2. Add package.json with proper name
3. Turbo will automatically include it in builds

## Testing the Setup

```bash
# Test library build
cd packages/nli-core
npm run build
# Should see: dist/ folder with .js, .mjs, .d.ts files

# Test demo app
cd apps/demo
npm run dev
# Should open http://localhost:3000

# Test full monorepo build
cd ../..
npm run build
# Both packages should build successfully
```

## Troubleshooting

### Library changes not reflected in demo
- Rebuild the library: `cd packages/nli-core && npm run build`
- Or use watch mode: `npm run dev` from root

### Module not found errors
- Ensure library is built: `cd packages/nli-core && npm run build`
- Check imports are using `@natural-language-gui/core`
- Run `npm install` in both packages and root

### Turbo caching issues
- Clear cache: `npx turbo run build --force`
- Or: `rm -rf .turbo node_modules/.cache`

## File Locations

### Old vs New

| Old Location | New Location |
|-------------|-------------|
| `components/ui/` | `packages/nli-core/src/components/ui/` |
| `lib/parser/` | `packages/nli-core/src/parser/` |
| `lib/utils.ts` | `packages/nli-core/src/lib/utils.ts` |
| `lib/markdown-generators.ts` | `packages/nli-core/src/lib/markdown-generators.ts` |
| `types/` | `packages/nli-core/src/types/` |
| `app/` | `apps/demo/app/` |
| `components/component-registry.tsx` | `apps/demo/component-registry.tsx` |

### Original Files
The original files are still in place. You can safely delete them after confirming everything works:

```bash
# DO NOT RUN YET - test first!
# rm -rf components/ lib/ types/ app/
```

## Documentation

- **Library Setup**: `docs/LIBRARY_SETUP_GUIDE.md`
- **Architecture**: `docs/ARCHITECTURE.md`
- **Component Authoring**: `docs/COMPONENT_AUTHORING.md`
- **NLI Specification**: `docs/NLI_SPECIFICATION.md`
- **Library README**: `packages/nli-core/README.md`

## Success Indicators

✅ Library builds successfully
✅ Demo app builds successfully
✅ Both packages build with `npm run build`
✅ CSS exports working
✅ TypeScript types generated
✅ All imports updated in demo
✅ Turborepo configured
✅ Ready for npm publishing

---

**Status**: ✅ Complete and Working!

**Next**: Test the dev server and make your first library change!
