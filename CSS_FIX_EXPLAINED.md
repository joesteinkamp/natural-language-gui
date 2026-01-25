# CSS Fix - Tailwind Configuration

## The Problem

After setting up the monorepo, the CSS was broken because:

1. The library was exporting **raw CSS** with Tailwind directives (`@tailwind base`, `@apply`, etc.)
2. These directives need to be **processed by Tailwind** during the build
3. The demo app wasn't scanning the library's components for Tailwind classes
4. Result: No styles were applied to components

## The Solution

For Tailwind-based component libraries, the **correct approach** is:

### ✅ What We Did

1. **Removed CSS export from library**
   - Library doesn't export processed CSS
   - Library only exports React components

2. **Consumer processes Tailwind**
   - Demo app (consumer) imports its own `globals.css`
   - Demo app runs Tailwind on its own CSS

3. **Scan library components**
   - Demo app's Tailwind config scans the library's source
   - Tailwind picks up all classes used in library components

### 📁 File Changes

#### `packages/nli-core/package.json`
```diff
- "exports": {
-   ".": { ... },
-   "./styles": "./dist/globals.css"  ❌ Removed
- }
+ "exports": {
+   ".": { ... }  ✅ Only exports components
+ }
```

#### `apps/demo/app/layout.tsx`
```diff
- import "@natural-language-gui/core/styles"  ❌ Raw CSS with directives
+ import "./globals.css"  ✅ Local CSS processed by Tailwind
```

#### `apps/demo/tailwind.config.ts`
```diff
content: [
  "./app/**/*.{js,ts,jsx,tsx,mdx}",
+ "../../packages/nli-core/src/**/*.{js,ts,jsx,tsx}",  ✅ Scan library
],
```

## How It Works Now

```
┌─────────────────────┐
│ Library Package     │
│ @nli/core           │
│                     │
│ ✓ React components  │
│ ✓ Tailwind classes  │
│ ✗ No CSS export     │
└─────────────────────┘
           │
           │ imports
           ▼
┌─────────────────────┐
│ Consumer App        │
│                     │
│ ✓ globals.css       │
│ ✓ Tailwind config   │
│ ✓ Scans library     │
│ ✓ Processes CSS     │
└─────────────────────┘
           │
           ▼
    Styled App! 🎨
```

## For External Consumers

When someone installs your library, they need to:

### 1. Configure Tailwind

```javascript
// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    // Scan the library's components
    './node_modules/@natural-language-gui/core/dist/**/*.{js,mjs}',
  ],
  theme: {
    extend: {
      // Add CSS variables (see globals.example.css)
    }
  },
  plugins: [require("tailwindcss-animate")],
}
```

### 2. Add CSS Variables

```css
/* globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    /* ... more variables */
  }
}
```

### 3. Import Components

```tsx
import { Button, Input } from '@natural-language-gui/core'

function MyApp() {
  return (
    <div>
      <Input nli-markdown="Email" />
      <Button nli-markdown="Submit">Submit</Button>
    </div>
  )
}
```

## Example Files Provided

We've included example files in the library package:

- `packages/nli-core/tailwind.config.example.js` - Copy this to your project
- `packages/nli-core/globals.example.css` - Copy this to your project

## Why This Approach?

### ✅ Pros
- **Customizable**: Consumers can modify colors, themes
- **Tree-shakeable**: Only includes used Tailwind classes
- **Standard**: This is how shadcn/ui and other Tailwind libraries work
- **Flexible**: Works with any Tailwind configuration
- **Smaller bundles**: No duplicate CSS

### ❌ Alternative: Shipping Compiled CSS

```
Library ships: compiled.css (200KB+)
Consumer app: Also has Tailwind (200KB+)
Total: 400KB+ with duplicate styles ❌
```

### ✅ Our Approach: Let Consumer Process

```
Library ships: React components
Consumer processes: Everything in one pass
Total: ~100KB optimized CSS ✅
```

## Common Issues & Solutions

### Issue: Styles not appearing

**Solution**: Check that:
1. Tailwind config includes library path
2. globals.css has all CSS variables
3. Library is built: `npm run build`

### Issue: Missing colors

**Solution**: Add all CSS variables to your globals.css
(see `packages/nli-core/globals.example.css`)

### Issue: Wrong colors

**Solution**: Customize CSS variables in your globals.css
```css
:root {
  --primary: 220 70% 50%;  /* Change primary color */
}
```

## Verification

✅ Demo app running on http://localhost:3001
✅ All components styled correctly
✅ Tailwind classes applied
✅ Build successful
✅ Ready for external use

## For Library Maintainers

When publishing updates:

1. Components use Tailwind classes ✓
2. No CSS export in package.json ✓
3. Include example config files ✓
4. Document CSS setup in README ✓

---

**Status**: ✅ Fixed and Working!

The CSS is now properly configured and the demo app is displaying all components with correct styling.
