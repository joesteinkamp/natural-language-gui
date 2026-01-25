# Architecture Overview

## Core Concept

This is a **bidirectional natural language interface component library** that bridges the gap between graphical user interfaces and natural language:

- **GUI → NL**: Components serialize their state into natural language markdown
- **NL → GUI** _(future)_: Parser converts natural language into rendered components

The goal is to enable AI systems, voice interfaces, and other natural language tools to interact with UIs programmatically while maintaining human readability.

## Design Philosophy

### 1. Separation of Concerns

The architecture deliberately separates three distinct responsibilities:

```
┌─────────────────┐
│   Components    │  Handle UI rendering and user interaction
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ NLI Attributes  │  Components expose nli-markdown props
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Markdown Gen    │  ComponentViewerBidirectional reads DOM and generates markdown
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│     Parser      │  Converts markdown to component tree
└─────────────────┘
```

**Why this separation?**
- Components remain reusable without NLI dependency
- Markdown format can evolve without changing components
- Easy to test each layer independently
- Clear mental model for developers

### 2. Component Responsibility Model

Components are intentionally "dumb" about natural language interface concerns:

**✅ Components SHOULD:**
- Accept `nli-markdown` as an optional prop
- Forward it to the underlying DOM element as an HTML attribute
- Maintain their own state using standard React patterns
- Work perfectly fine without any NLI attributes

**❌ Components SHOULD NOT:**
- Generate markdown internally
- Parse markdown or understand markdown format
- Have conditional logic based on NLI features
- Couple their implementation to NLI requirements

**Example of Good Component:**
```tsx
const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  ({ className, ...props }, ref) => {
    return (
      <SwitchPrimitives.Root
        {...props}  // nli-markdown passed through here
        ref={ref}
        className={cn("switch-styles", className)}
      >
        <SwitchPrimitives.Thumb />
      </SwitchPrimitives.Root>
    );
  }
);
```

**Example of Bad Component:**
```tsx
// ❌ Don't do this
const Switch = ({ label, checked }) => {
  const markdown = `*${label}:* ${checked ? "yes" : "no"}`;
  return <button nli-markdown={markdown} />;
};
```

### 3. State vs Label Separation

A critical design decision is separating static labels from dynamic state:

- **`nli-markdown` attribute**: Static label/identifier (what is this component?)
- **DOM state**: Dynamic current value (what's the current state?)
- **Markdown output**: Combination of both (label + state)

**Why separate these?**

1. **DRY Principle**: Labels don't change, no need to regenerate them
   ```tsx
   // Good: Label is static, state changes independently
   <Switch nli-markdown="Dark Mode" checked={isDark} />
   ```

2. **Parser-Friendly**: When parsing markdown back to GUI:
   ```markdown
   *Dark Mode:* yes
   ```
   The parser needs to know:
   - "Dark Mode" = component identifier
   - "yes" = state to apply

   If these are mixed in the prop, parser can't distinguish them.

3. **Flexibility**: Same label works for all states:
   ```tsx
   <Switch nli-markdown="Dark Mode" checked={false} />  // → "Dark Mode: no"
   <Switch nli-markdown="Dark Mode" checked={true} />   // → "Dark Mode: yes"
   ```

## Component Categories

Components fall into distinct categories based on their behavior in the NLI system:

### State Components

Show current state (markdown regenerated on state change):

| Component | Pattern | Example |
|-----------|---------|---------|
| Input/Textarea | `*Label:* value` | `*Email:* user@example.com` |
| Switch | `*Label:* yes/no` | `*Dark Mode:* yes` |
| Toggle | `*Label:* yes/no` | `*Bold:* no` |
| Select | `*Label:* option` | `*Language:* English` |
| Checkbox | `Label` (when checked) | `Accept terms` |
| Radio | `Label` (when selected) | `*Theme:* Dark` |

**Behavior**: The markdown output updates whenever the component state changes. The ComponentViewerBidirectional observes DOM mutations and regenerates markdown.

### Action Components

Append actions to timeline (don't regenerate state):

| Component | Pattern | Example |
|-----------|---------|---------|
| Button | `Action` | `Submit` |
| ButtonGroup | `Action1 Action2` | `Save Cancel` |

**Behavior**: Button clicks append their action to the markdown output, building a sequence of user actions. Markdown is not regenerated because buttons don't have persistent state.

### Container Components

Group related components under a label:

| Component | Pattern | Example |
|-----------|---------|---------|
| ToggleGroup | `*Group:*`<br>`- item1`<br>`- item2` | `*Include:*`<br>`- *PDF:* yes`<br>`- *DOCX:* no` |
| CheckboxGroup | `*Group:*`<br>`- item1` | `*Interests:*`<br>`- Music` |

**Behavior**: Items with `nli-group-label` on their container are rendered as a hierarchical list.

## Data Flow

### GUI → Markdown

```
User Interaction
      ↓
Component State Changes
      ↓
DOM Updates (data-state, value, checked, etc.)
      ↓
MutationObserver Detects Change
      ↓
generateMarkdown() Called
      ↓
Scan DOM for [nli-markdown] elements
      ↓
Read element state from DOM attributes
      ↓
Combine nli-markdown + state → output
      ↓
Update Markdown Textarea
```

**Key Files:**
- `app/translation-viewer/ComponentViewerBidirectional.tsx`: Contains `generateMarkdown()` function
- `components/ui/*.tsx`: Individual components that accept `nli-markdown` props

### Markdown → GUI

```
Markdown Input
      ↓
Parser tokenizes markdown
      ↓
Identify component types and labels
      ↓
Extract state values
      ↓
Match to component registry
      ↓
Instantiate components with props
      ↓
Render component tree
```

**Implementation:**
- `lib/parser/`: Markdown tokenizer, AST builder, and component mapper
- `lib/parser/instantiator.tsx`: Component instantiation from mapped AST
- `app/translation-viewer/ComponentViewerBidirectional.tsx`: Bidirectional viewer component

## Technology Stack

- **Next.js 16**: React framework with App Router
- **React 19**: UI library
- **TypeScript**: Type safety
- **Radix UI**: Unstyled, accessible component primitives
- **Tailwind CSS**: Utility-first styling
- **class-variance-authority**: Variant management
- **date-fns**: Date manipulation
- **react-markdown**: Markdown rendering (for future parser)

## File Structure

```
natural-language-gui/
├── app/
│   ├── page.tsx                    # Home page
│   ├── layout.tsx                  # Root layout
│   └── translation-viewer/
│       ├── page.tsx                # Viewer page
│       └── ComponentViewerBidirectional.tsx  # Core bidirectional viewer
├── components/
│   ├── ui/                         # NLI-enabled components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── switch.tsx
│   │   └── ...
│   └── component-registry.tsx      # Component examples
├── lib/
│   ├── parser/                     # Markdown parser and instantiator
│   └── utils.ts                    # Utility functions
├── types/
│   └── nli.d.ts                    # TypeScript declarations
└── docs/                           # Documentation (you are here)
```

## Key Implementation Details

### Type Safety

The project extends React's type system to support NLI attributes:

```typescript
// types/nli.d.ts
declare module 'react' {
  interface HTMLAttributes<T> {
    'nli-markdown'?: string;
    'nli-group-label'?: string;
  }
}
```

This provides:
- Autocomplete for NLI attributes
- No need for `@ts-ignore` comments
- Type checking for attribute values

### Markdown Generation

The `generateMarkdown()` function follows this algorithm:

1. Query all elements with `[nli-markdown]` attribute
2. For each element:
   - Determine element type (role, tagName, attributes)
   - Read `nli-markdown` attribute (the label)
   - Read current state from DOM (checked, value, data-state, etc.)
   - Format according to component type pattern
   - Check if element is in a group (nli-group-label)
   - Append to markdown output
3. Return complete markdown string

### Event Handling

Different components trigger markdown regeneration differently:

- **Input/Textarea**: `onInput` event
- **Checkboxes/Switches/Toggles**: `onClick` via `onClickCapture`
- **Select/Combobox**: Custom `input` event dispatch
- **Buttons**: Manual append (no regeneration)

All events funnel through a `MutationObserver` that watches:
- `data-state` attribute changes
- `value` attribute changes
- `nli-markdown` attribute changes

## Design Tradeoffs

### Tradeoff 1: DOM Scanning vs Component Callbacks

**Decision**: Scan DOM with `MutationObserver` rather than component callbacks

**Pros**:
- Components don't need to know about markdown system
- Works with any component library (not just our components)
- Single source of truth (the DOM)
- Easier to debug (inspect DOM, see markdown)

**Cons**:
- Slight performance overhead from DOM scanning
- Need to map DOM elements back to component types
- MutationObserver complexity

### Tradeoff 2: Attributes vs Data Props

**Decision**: Use HTML attributes (`nli-markdown`) rather than data props

**Pros**:
- Visible in browser DevTools
- Works with server-side rendering
- Can query with `querySelectorAll`
- Platform-agnostic (not React-specific)

**Cons**:
- Attributes are strings only
- Need TypeScript extensions for typing
- Non-standard attribute names

### Tradeoff 3: Checkbox Visibility

**Decision**: Checkboxes only appear in markdown when checked

**Pros**:
- Natural language: "Accept terms" implies accepted
- Omission = rejection (clearer for AI parsing)
- Shorter output (only shows what's enabled)

**Cons**:
- Can't distinguish between "unchecked" and "not present"
- Asymmetric (switches show both yes/no)

**Alternative Considered**: Always show `*Label:* yes/no`
- Rejected because it's verbose and less natural

## Future Considerations

### Parser Implementation

When implementing the NL→GUI parser, consider:

1. **Grammar Definition**: Use a formal grammar (PEG, ANTLR, etc.)
2. **Ambiguity Resolution**: How to handle multiple components with same label?
3. **Error Handling**: What happens with invalid markdown?
4. **Component Resolution**: Map labels to component types
5. **State Restoration**: Handle all component state variations

### Validation

Add validation layer between markdown and components:

```typescript
interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
}

function validateMarkdown(markdown: string): ValidationResult {
  // Check grammar
  // Verify component labels exist
  // Validate state values
  // Check for ambiguities
}
```

### Extensibility

Allow users to register custom components:

```typescript
registerNLIComponent({
  name: 'MyComponent',
  pattern: '*Label:* value',
  parse: (label, value) => ({ label, value }),
  render: (props) => <MyComponent {...props} />
});
```

## Testing Strategy

### Unit Tests
- Individual component rendering
- Markdown generation for each component type
- State transitions

### Integration Tests
- Full form workflows
- Complex nested structures
- Edge cases (empty values, special characters)

### E2E Tests
- User interactions → markdown output
- Markdown input → component rendering (future)
- Cross-browser compatibility

## Performance Considerations

Current implementation is optimized for:
- Small to medium forms (< 50 components)
- Interactive demo and prototyping

For production scale:
- Debounce markdown generation
- Virtual scrolling for large component lists
- Memoize component instances
- Optimize MutationObserver filters

## Related Projects

Inspiration and similar concepts:
- **Notion**: Block-based content with slash commands
- **Linear**: Command palette with natural language
- **Slack**: Message formatting with markdown
- **GitHub Copilot**: Code generation from comments
- **Retool**: Low-code UI builder

Our unique contribution:
- **Bidirectional**: GUI ↔ NL (not just one direction)
- **Declarative**: Components describe themselves
- **Composable**: Works with any component library
- **Type-safe**: Full TypeScript support
