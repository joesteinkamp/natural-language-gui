# AI Assistant Instructions

This document provides specific guidance for AI assistants working on this codebase.

## Project Context

This is a **bidirectional natural language interface component library**. Components can serialize their state to markdown and will eventually be parseable from markdown.

**Key Insight**: This is NOT a typical component library. The unique feature is the GUI↔NL translation layer. Always consider how changes affect both directions.

## Critical Rules

### 🚫 NEVER Do These Things

1. **NEVER add markdown generation logic inside components**
   ```tsx
   // ❌ BAD - Don't generate markdown in components
   const Switch = ({ label, checked }) => {
     const markdown = `*${label}:* ${checked ? "yes" : "no"}`;
     return <button nli-markdown={markdown} />;
   };
   ```

2. **NEVER make components aware of markdown format**
   ```tsx
   // ❌ BAD - Component shouldn't know format details
   const handleChange = (value) => {
     updateMarkdown(`*${label}:* ${value}`);
   };
   ```

3. **NEVER use @ts-ignore for nli-markdown attributes**
   ```tsx
   // ❌ BAD - types/nli.d.ts provides proper types
   // @ts-ignore
   <Button nli-markdown="Click me" />

   // ✅ GOOD - Just use the attribute
   <Button nli-markdown="Click me" />
   ```

4. **NEVER modify markdown format without updating docs/NLI_SPECIFICATION.md first**
   - Specification is source of truth
   - Update docs, then code

5. **NEVER use boolean values other than `yes`/`no` in markdown output**
   ```markdown
   ❌ *Dark Mode:* true
   ❌ *Dark Mode:* on
   ❌ *Dark Mode:* 1
   ✅ *Dark Mode:* yes
   ```

### ✅ ALWAYS Do These Things

1. **ALWAYS keep components "dumb" about NLI**
   - Accept `nli-markdown` prop
   - Forward it to DOM element
   - Nothing more

2. **ALWAYS put markdown logic in ComponentViewerBidirectional.generateMarkdown()**
   - Single source of truth for format
   - All component types handled in one place

3. **ALWAYS maintain separation of concerns**
   - Components: UI and interaction
   - NLI Attributes: Labels and metadata
   - Markdown Generator: Format and serialization
   - Parser (future): Deserialization and instantiation

4. **ALWAYS check docs/ARCHITECTURE.md before making architectural decisions**

5. **ALWAYS update relevant documentation when changing behavior**

## Common Tasks

### Task: "Add NLI support to a component"

**Steps**:
1. Ensure component accepts spread props: `...props`
2. Forward all props to underlying DOM element
3. Component should work without any nli-markdown attribute
4. Add example to `components/component-registry.tsx`
5. Update `ComponentViewerBidirectional.generateMarkdown()` if component needs special handling
6. Test in translation viewer

**Example**:
```tsx
// 1. Component accepts and forwards props
const MyComponent = React.forwardRef<HTMLDivElement, MyComponentProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("my-styles", className)}
        {...props}  // nli-markdown forwarded here
      />
    );
  }
);

// 2. Add to registry
"MyComponent": {
  component: MyComponent,
  props: {
    "nli-markdown": "My Field"
  }
}

// 3. Update ComponentViewerBidirectional if needed
// (only if component has special state handling)
```

### Task: "Fix markdown generation for a component"

**Where to look**:
- `app/translation-viewer/ComponentViewerBidirectional.tsx`
- Function: `generateMarkdown()`

**Don't look in**:
- Individual component files (they don't generate markdown)

**Process**:
1. Identify component type (role, tagName, attributes)
2. Find matching condition in generateMarkdown()
3. Update logic to read correct state
4. Test in browser

### Task: "Change markdown format"

**Order of operations**:
1. Update `docs/NLI_SPECIFICATION.md` with new format
2. Update `ComponentViewerBidirectional.generateMarkdown()` to output new format
3. Update examples in `docs/EXAMPLES.md`
4. Consider impact on parser (in `lib/parser/`)
5. Test all affected components

**Never**:
- Change format without updating spec first
- Break existing patterns without good reason
- Make format less parseable

### Task: "Component isn't showing markdown"

**Debugging checklist**:
1. Does component have `nli-markdown` attribute in DOM? (Check DevTools)
2. Is component's element selector in `generateMarkdown()`?
3. Is state being read correctly? (Check data-state, value, checked)
4. Is element inside `previewRef` container?
5. Is MutationObserver filtering out changes?

**Common causes**:
- Forgot to forward `...props` in component
- Component wrapper intercepts attribute
- Wrong role/tagName in generateMarkdown()
- State attribute has different name than expected

### Task: "Add new component type"

**Full checklist**:
1. Create component in `components/ui/` following existing patterns
2. Ensure it forwards props to DOM element
3. Add TypeScript types if needed
4. Add to `components/component-registry.tsx` with example
5. Update `ComponentViewerBidirectional.generateMarkdown()` with pattern
6. Document pattern in `docs/NLI_SPECIFICATION.md`
7. Add example to `docs/EXAMPLES.md`
8. Test in translation viewer
9. Update parser in `lib/parser/` to handle the new component type

## Code Patterns

### Good Component Pattern

```tsx
"use client"

import * as React from "react"
import * as Primitive from "@radix-ui/react-primitive"
import { cn } from "@/lib/utils"

const MyComponent = React.forwardRef<
  React.ElementRef<typeof Primitive.Root>,
  React.ComponentPropsWithoutRef<typeof Primitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <Primitive.Root
      ref={ref}
      className={cn("component-styles", className)}
      {...props}  // Forwards nli-markdown and all other props
    >
      {/* component content */}
    </Primitive.Root>
  )
})

MyComponent.displayName = "MyComponent"

export { MyComponent }
```

### Good Registry Entry

```tsx
"MyComponent": {
  component: (props: any) => (
    <MyComponent
      nli-markdown="Field Label"
      defaultValue="example"
      {...props}
    />
  ),
  props: {
    // Additional props if needed
  }
}
```

### Good Markdown Generation

```tsx
// In ComponentViewerBidirectional.generateMarkdown()
if (element.getAttribute('data-my-component')) {
  const state = element.getAttribute('data-state');
  const value = element.getAttribute('data-value');

  // Format according to docs/NLI_SPECIFICATION.md
  itemMarkdown = `*${markdownAttribute}:* ${value}`;
}
```

## Anti-Patterns

### ❌ Anti-Pattern 1: Component Generates Markdown

```tsx
// DON'T DO THIS
const Switch = ({ label, checked }) => {
  const [isChecked, setIsChecked] = React.useState(checked);

  const markdown = React.useMemo(() =>
    `*${label}:* ${isChecked ? "yes" : "no"}`,
    [label, isChecked]
  );

  return <button nli-markdown={markdown} />;
};
```

**Why it's bad**:
- Violates separation of concerns
- Component can't be used without NLI system
- Markdown format is spread across codebase
- Harder to change format later

### ❌ Anti-Pattern 2: Mixing UI and NLI Logic

```tsx
// DON'T DO THIS
const Input = ({ nliMarkdown, ...props }) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    if (nliMarkdown) {
      updateGlobalMarkdown(`*${nliMarkdown}:* ${value}`);
    }
  }, [value, nliMarkdown]);

  return <input value={value} onChange={e => setValue(e.target.value)} />;
};
```

**Why it's bad**:
- Component has side effects related to NLI
- Tightly coupled to markdown system
- Can't test UI without NLI infrastructure

### ❌ Anti-Pattern 3: Inconsistent Patterns

```tsx
// DON'T DO THIS - Inventing new patterns
<Toggle nli-text="Bold" />           // ❌ Different attribute name
<Switch markdown="Dark Mode" />       // ❌ Different attribute name
<Button nlLabel="Submit" />           // ❌ Different attribute name

// DO THIS - Consistent across all components
<Toggle nli-markdown="Bold" />        // ✅
<Switch nli-markdown="Dark Mode" />   // ✅
<Button nli-markdown="Submit" />      // ✅
```

## Testing Guidelines

### Manual Testing Checklist

When testing in the translation viewer (`/translation-viewer`):

1. **State Components**:
   - [ ] Change state and verify markdown updates
   - [ ] Check format matches docs/NLI_SPECIFICATION.md
   - [ ] Verify empty/default states
   - [ ] Test edge cases (very long values, special characters)

2. **Action Components**:
   - [ ] Click and verify action appends
   - [ ] Multiple clicks show sequence
   - [ ] No regeneration (state components don't disappear)

3. **Grouped Components**:
   - [ ] Items appear under group label
   - [ ] Proper indentation with dashes
   - [ ] Group label appears only once

4. **Edge Cases**:
   - [ ] Component with no nli-markdown attribute (should be ignored)
   - [ ] Empty values
   - [ ] Special characters in values
   - [ ] Very long text
   - [ ] Rapid state changes

### What to Look For

**In Browser DevTools**:
```html
<!-- Good: Attribute present on DOM element -->
<button nli-markdown="Submit" data-state="...">

<!-- Bad: Attribute missing -->
<button data-state="...">

<!-- Bad: Attribute on wrong element -->
<div>
  <button nli-markdown="Submit">
</div>
```

**In Markdown Output**:
```markdown
✅ *Email:* user@example.com
✅ *Dark Mode:* yes
✅ Accept terms

❌ *Email:*user@example.com     (missing space)
❌ *Dark Mode:* Yes             (capitalized)
❌ *Accept terms:* yes          (checkbox shouldn't have yes/no)
```

## Performance Considerations

### When to Worry

- Forms with > 50 components
- Rapid state changes (< 16ms between updates)
- Very large text values (> 10KB)
- Deep nesting (> 5 levels)

### Optimization Strategies

1. **Debounce generateMarkdown()**:
   ```tsx
   const debouncedGenerate = useDebouncedCallback(generateMarkdown, 100);
   ```

2. **Filter MutationObserver**:
   ```tsx
   attributeFilter: ['data-state', 'value', 'nli-markdown']
   // Don't watch 'class' - it changes too often
   ```

3. **Memoize component instances**:
   ```tsx
   const MemoizedComponent = React.memo(Component);
   ```

### What NOT to Optimize

- Don't optimize prematurely
- Current implementation is fine for demos and small forms
- Wait for real performance issues before adding complexity

## Debugging Tips

### Markdown Not Updating

1. Check browser console for errors
2. Verify MutationObserver is running: Add `console.log` in observer callback
3. Check if attribute is on correct element: Inspect DOM
4. Verify event is triggering: Add `console.log` in event handlers

### Wrong Markdown Format

1. Find component handling in `generateMarkdown()`
2. Log the element and its attributes
3. Check condition matching (role, tagName, data-state)
4. Verify state reading logic

### Component Not Appearing in Viewer

1. Check if added to component-registry.tsx
2. Verify component exports correctly
3. Check for React errors in console
4. Ensure component renders without nli-markdown prop

## Working with Radix UI

Most components use Radix UI primitives. Key concepts:

### State Management

Radix components use `data-state` attribute:
```tsx
// Switch states
data-state="checked" | "unchecked"

// Toggle states
data-state="on" | "off"

// Dialog states
data-state="open" | "closed"
```

### Composition

Radix components are composable:
```tsx
<Select.Root>
  <Select.Trigger nli-markdown="...">  {/* Put attribute here */}
    <Select.Value />
  </Select.Trigger>
  <Select.Content>
    <Select.Item value="1">Option 1</Select.Item>
  </Select.Content>
</Select.Root>
```

**Where to put nli-markdown**: Usually on the trigger/root element that receives focus and state changes.

## Resources

- **docs/docs/ARCHITECTURE.md**: System design and philosophy
- **docs/docs/NLI_SPECIFICATION.md**: Markdown format specification
- **docs/docs/COMPONENT_AUTHORING.md**: Detailed component creation guide
- **docs/docs/EXAMPLES.md**: Working code examples
- **Radix UI Docs**: https://www.radix-ui.com/primitives/docs/overview/introduction
- **Next.js Docs**: https://nextjs.org/docs

## Questions to Ask

Before making changes, ask yourself:

1. Does this maintain separation of concerns?
2. Is the markdown format still parseable?
3. Have I updated the relevant documentation?
4. Does this work without the NLI system?
5. Is this consistent with existing patterns?
6. How will this affect the future parser?

If unsure, check the documentation or ask the user for clarification.

## Common Errors and Solutions

### Error: "Property 'nli-markdown' does not exist"

**Solution**: The types/nli.d.ts file might not be loaded. Check:
- File exists at `types/nli.d.ts`
- TypeScript is including the types directory
- Try restarting the TypeScript server

### Error: Markdown shows for a split second then disappears

**Solution**: Button clicks are triggering regeneration. Check:
- Is `onClickCapture` excluding button clicks?
- Is `handlePreviewClick` calling `e.stopPropagation()`?
- See ComponentViewerBidirectional.tsx handlePreviewClick function

### Error: Grouped items not appearing under group

**Solution**: Check:
- Parent element has `nli-group-label` attribute
- Items have `nli-markdown` attributes
- Items are inside the group container element

### Error: State changes not reflected in markdown

**Solution**: Check:
- MutationObserver is watching correct attributes
- Component is updating DOM attributes (data-state, value, etc.)
- generateMarkdown() is reading the correct attribute

## Final Reminders

- 🎯 **Goal**: Enable bidirectional GUI ↔ NL translation
- 🧩 **Pattern**: Components are dumb, viewer is smart
- 📋 **Spec**: docs/NLI_SPECIFICATION.md is the source of truth
- 🧪 **Test**: Use /translation-viewer to validate changes
- 📚 **Document**: Update docs when changing behavior
- 🤝 **Collaborate**: Ask user when uncertain about design decisions
