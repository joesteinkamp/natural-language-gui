# Component Authoring Guide

This guide explains how to create and integrate NLI-compatible components.

## Table of Contents

1. [Quick Start](#quick-start)
2. [Component Patterns](#component-patterns)
3. [Integration Steps](#integration-steps)
4. [Radix UI Components](#radix-ui-components)
5. [Testing](#testing)
6. [Examples](#examples)
7. [Troubleshooting](#troubleshooting)

## Quick Start

### Basic Pattern

Every NLI-compatible component follows this pattern:

```tsx
import * as React from "react"
import { cn } from "@/lib/utils"

const MyComponent = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("my-component-styles", className)}
      {...props}  // ✅ This forwards nli-markdown
    >
      {/* Component content */}
    </div>
  )
})

MyComponent.displayName = "MyComponent"

export { MyComponent }
```

**Key points**:
- Accept `...props` spread
- Forward all props to underlying DOM element
- No NLI-specific logic in component
- Works perfectly fine without `nli-markdown` attribute

## Component Patterns

### Pattern 1: Simple HTML Element

For components that wrap a single HTML element:

```tsx
const Input = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      ref={ref}
      className={cn("input-styles", className)}
      {...props}  // nli-markdown forwarded here
    />
  )
})
```

**Use for**: Input, Textarea, Button (without Radix)

### Pattern 2: Radix UI Primitive

For components using Radix UI:

```tsx
import * as SwitchPrimitives from "@radix-ui/react-switch"

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => {
  return (
    <SwitchPrimitives.Root
      ref={ref}
      className={cn("switch-styles", className)}
      {...props}  // nli-markdown forwarded to Radix Root
    >
      <SwitchPrimitives.Thumb className="thumb-styles" />
    </SwitchPrimitives.Root>
  )
})
```

**Use for**: Switch, Toggle, Checkbox, Radio, Select

### Pattern 3: Composite Component

For components with multiple child elements:

```tsx
const Select = React.forwardRef<HTMLButtonElement, SelectProps>(
  ({ children, ...props }, ref) => {
    return (
      <SelectPrimitives.Root>
        <SelectPrimitives.Trigger
          ref={ref}
          {...props}  // nli-markdown goes on trigger
        >
          <SelectPrimitives.Value />
        </SelectPrimitives.Trigger>
        <SelectPrimitives.Content>
          {children}
        </SelectPrimitives.Content>
      </SelectPrimitives.Root>
    )
  }
)
```

**Rule**: Put `nli-markdown` on the element that:
- Receives focus
- Shows the current state
- Triggers state changes

Usually this is the trigger, root, or input element.

### Pattern 4: Wrapper Component

For components that add labels or layout:

```tsx
const FieldWrapper = ({ label, children, ...props }) => {
  // Get the nli-markdown from props and pass to child
  const childWithProps = React.cloneElement(children, {
    "nli-markdown": label,
    ...props
  })

  return (
    <div className="field-wrapper">
      <Label>{label}</Label>
      {childWithProps}
    </div>
  )
}
```

**Use for**: Field wrappers, form groups, labeled controls

## Integration Steps

### Step 1: Create Component

Create your component following one of the patterns above:

```tsx
// components/ui/my-component.tsx
"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const MyComponent = React.forwardRef<HTMLDivElement, MyComponentProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("my-component", className)}
        {...props}
      >
        {/* implementation */}
      </div>
    )
  }
)

MyComponent.displayName = "MyComponent"

export { MyComponent }
```

### Step 2: Add to Component Registry

Register your component with an example:

```tsx
// components/component-registry.tsx

import { MyComponent } from "@/components/ui/my-component"

export const componentRegistry: Record<string, RegistryEntry> = {
  // ... other components

  "MyComponent": {
    component: (props: any) => (
      <MyComponent
        nli-markdown="Example Label"
        defaultValue="example"
        {...props}
      />
    ),
    props: {
      // Any additional props for the example
    }
  },
}
```

### Step 3: Update Markdown Generator (if needed)

If your component has unique state handling, update ComponentViewerBidirectional:

```tsx
// app/translation-viewer/ComponentViewerBidirectional.tsx
// Inside generateMarkdown() function

else if (element.getAttribute('role') === 'my-component') {
  const state = element.getAttribute('data-state');
  const value = element.getAttribute('data-value');

  // Format according to NLI_SPECIFICATION.md
  itemMarkdown = `*${markdownAttribute}:* ${value}`;
}
```

**When you need this**:
- Component uses custom attributes for state
- State is not in standard locations (value, data-state, checked)
- Component needs special formatting

**When you don't need this**:
- Component uses standard HTML attributes
- State follows existing patterns (input, checkbox, etc.)

### Step 4: Document the Pattern

Add to NLI_SPECIFICATION.md if it's a new pattern:

```markdown
### My Component Type

**Pattern**: `*Label:* value`

**Examples**:
...

**Rules**:
...

**Component Mapping**: MyComponent
```

### Step 5: Test

1. Run dev server: `npm run dev`
2. Navigate to `/translation-viewer`
3. Select your component from dropdown
4. Test all state changes
5. Verify markdown output matches specification

## Radix UI Components

### Understanding Radix Composition

Radix UI uses composition:

```tsx
<Dialog.Root>           {/* State container */}
  <Dialog.Trigger>      {/* Opens dialog */}
    Open
  </Dialog.Trigger>
  <Dialog.Portal>       {/* Renders in portal */}
    <Dialog.Overlay />  {/* Background overlay */}
    <Dialog.Content>    {/* Dialog content */}
      <Dialog.Title />
      <Dialog.Close />
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>
```

### Where to Put nli-markdown

**General rule**: Put it on the element that represents the component's value or state.

| Component | Put nli-markdown on | Reasoning |
|-----------|-------------------|-----------|
| Select | Trigger | Shows selected value |
| Dialog | Trigger | Opens the dialog |
| Popover | Trigger | Shows popover |
| Accordion | Trigger | Expands section |
| Tabs | TabsTrigger | Activates tab |
| Switch | Root | Is the switch |
| Checkbox | Root | Is the checkbox |
| Radio | Item | Each radio option |

### Reading Radix State

Radix components expose state via `data-*` attributes:

```tsx
// Switch
<button data-state="checked" role="switch" />
<button data-state="unchecked" role="switch" />

// Toggle
<button data-state="on" aria-pressed="true" />
<button data-state="off" aria-pressed="false" />

// Accordion
<button data-state="open" />
<button data-state="closed" />
```

Use these in ComponentViewerBidirectional to determine markdown output.

### Radix + NLI Example

```tsx
import * as TogglePrimitive from "@radix-ui/react-toggle"

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <TogglePrimitive.Root
      ref={ref}
      className={cn("toggle-styles", className)}
      {...props}  // nli-markdown forwarded
    >
      {props.children}
    </TogglePrimitive.Root>
  )
})

// Usage
<Toggle nli-markdown="Bold">Bold</Toggle>

// Renders to
<button
  nli-markdown="Bold"
  role="button"
  aria-pressed="false"
  data-state="off"
>
  Bold
</button>

// ComponentViewerBidirectional reads:
// - nli-markdown="Bold" (the label)
// - data-state="off" (the state)
// Outputs: "*Bold:* no"
```

## Testing

### Unit Testing

Test component behavior without NLI:

```tsx
import { render, screen } from '@testing-library/react'
import { MyComponent } from './my-component'

test('renders without nli-markdown', () => {
  render(<MyComponent>Content</MyComponent>)
  expect(screen.getByText('Content')).toBeInTheDocument()
})

test('accepts nli-markdown attribute', () => {
  const { container } = render(
    <MyComponent nli-markdown="Test Label">Content</MyComponent>
  )
  expect(container.firstChild).toHaveAttribute('nli-markdown', 'Test Label')
})
```

### Integration Testing

Test markdown generation:

```tsx
test('generates correct markdown', () => {
  render(
    <ComponentViewerBidirectional>
      <MyComponent nli-markdown="Field" value="test" />
    </ComponentViewerBidirectional>
  )

  const markdown = screen.getByRole('textbox', { name: /markdown/i })
  expect(markdown).toHaveValue('*Field:* test')
})
```

### Manual Testing Checklist

- [ ] Component renders without nli-markdown
- [ ] Component accepts nli-markdown attribute
- [ ] Attribute appears on correct DOM element (inspect with DevTools)
- [ ] State changes trigger markdown update
- [ ] Markdown format matches NLI_SPECIFICATION.md
- [ ] Edge cases work (empty, long values, special characters)
- [ ] Component works in grouped contexts
- [ ] No console errors or warnings

## Examples

### Example 1: Simple Input

```tsx
const Input = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
```

**Usage**:
```tsx
<Input nli-markdown="Email" type="email" />
```

**Markdown**:
```markdown
*Email:* user@example.com
```

### Example 2: Switch with Radix

```tsx
import * as SwitchPrimitives from "@radix-ui/react-switch"

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => {
  return (
    <SwitchPrimitives.Root
      className={cn(
        "peer inline-flex h-6 w-11 shrink-0 cursor-pointer",
        "items-center rounded-full border-2",
        "data-[state=checked]:bg-primary",
        "data-[state=unchecked]:bg-input",
        className
      )}
      {...props}
      ref={ref}
    >
      <SwitchPrimitives.Thumb
        className={cn(
          "pointer-events-none block h-5 w-5 rounded-full",
          "bg-background shadow-lg ring-0 transition-transform",
          "data-[state=checked]:translate-x-5",
          "data-[state=unchecked]:translate-x-0"
        )}
      />
    </SwitchPrimitives.Root>
  )
})
```

**Usage**:
```tsx
<Switch nli-markdown="Dark Mode" />
```

**Markdown**:
```markdown
*Dark Mode:* yes
```

### Example 3: Grouped Toggles

```tsx
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group"

const ToggleGroup = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root>
>(({ className, ...props }, ref) => (
  <ToggleGroupPrimitive.Root
    ref={ref}
    className={cn("flex gap-1", className)}
    {...props}
  />
))

const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item>
>(({ className, ...props }, ref) => (
  <ToggleGroupPrimitive.Item
    ref={ref}
    className={cn("toggle-item-styles", className)}
    {...props}
  />
))
```

**Usage**:
```tsx
<ToggleGroup type="multiple" nli-group-label="Include">
  <ToggleGroupItem value="pdf" nli-markdown="PDF">
    PDF
  </ToggleGroupItem>
  <ToggleGroupItem value="docx" nli-markdown="DOCX">
    DOCX
  </ToggleGroupItem>
</ToggleGroup>
```

**Markdown**:
```markdown
*Include:*
- *PDF:* yes
- *DOCX:* no
```

### Example 4: Select with Combobox

```tsx
import * as SelectPrimitive from "@radix-ui/react-select"

const Select = SelectPrimitive.Root

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn("flex items-center justify-between", className)}
    {...props}
  >
    {children}
  </SelectPrimitive.Trigger>
))

const SelectValue = SelectPrimitive.Value
const SelectContent = SelectPrimitive.Content
const SelectItem = SelectPrimitive.Item
```

**Usage**:
```tsx
<Select>
  <SelectTrigger nli-markdown="Language">
    <SelectValue placeholder="Select language" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="en">English</SelectItem>
    <SelectItem value="es">Spanish</SelectItem>
  </SelectContent>
</Select>
```

**Markdown**:
```markdown
*Language:* English
```

## Troubleshooting

### Problem: nli-markdown not appearing in DOM

**Symptoms**: Component doesn't show in markdown output

**Solutions**:
1. Check that `...props` is spread on the DOM element
2. Verify it's not being intercepted by a wrapper
3. Check component isn't destructuring and missing the prop

```tsx
// ❌ Wrong - props not forwarded
const MyComponent = ({ className }) => (
  <div className={className}>...</div>
)

// ✅ Correct - props forwarded
const MyComponent = ({ className, ...props }) => (
  <div className={className} {...props}>...</div>
)
```

### Problem: Markdown shows but doesn't update

**Symptoms**: Initial markdown appears but doesn't change with state

**Solutions**:
1. Verify component updates DOM attributes (data-state, value, checked)
2. Check MutationObserver is watching the right attributes
3. Ensure generateMarkdown() reads the correct state

```tsx
// Radix components automatically update data-state
<SwitchPrimitive.Root />  // data-state changes automatically

// Custom components must update attributes manually
<div
  role="switch"
  data-state={checked ? "checked" : "unchecked"}
/>
```

### Problem: Wrong markdown format

**Symptoms**: Markdown appears but format is incorrect

**Solutions**:
1. Check NLI_SPECIFICATION.md for correct format
2. Verify generateMarkdown() logic for component type
3. Ensure component role/tagName matches condition

### Problem: Grouped components not grouping

**Symptoms**: Items appear individually, not under group label

**Solutions**:
1. Parent element needs `nli-group-label` attribute
2. Items must be children of the parent element
3. Check DOM structure in DevTools

```tsx
// ✅ Correct structure
<div nli-group-label="Options">
  <Item nli-markdown="Item 1" />
  <Item nli-markdown="Item 2" />
</div>

// ❌ Wrong - items not inside group
<div nli-group-label="Options" />
<Item nli-markdown="Item 1" />
<Item nli-markdown="Item 2" />
```

### Problem: TypeScript errors with nli-markdown

**Symptoms**: TS error "Property 'nli-markdown' does not exist"

**Solutions**:
1. Ensure `types/nli.d.ts` exists
2. Restart TypeScript server
3. Check TypeScript is including types directory

## Best Practices

### ✅ Do

- Keep components simple and focused
- Forward all props with `...props`
- Use Radix UI for complex interactions
- Follow existing component patterns
- Test without NLI system first
- Document new patterns in NLI_SPECIFICATION.md

### ❌ Don't

- Add markdown generation to components
- Create NLI-specific component logic
- Use different attribute names
- Modify markdown format without updating spec
- Forget to test in translation viewer
- Skip documentation updates

## Resources

- [Radix UI Documentation](https://www.radix-ui.com/primitives/docs/overview/introduction)
- [NLI_SPECIFICATION.md](./NLI_SPECIFICATION.md) - Markdown format
- [ARCHITECTURE.md](./ARCHITECTURE.md) - System design
- [EXAMPLES.md](./EXAMPLES.md) - Usage examples

## Getting Help

If you're stuck:

1. Check this guide and ARCHITECTURE.md
2. Look at existing similar components
3. Test in translation viewer
4. Check browser DevTools for DOM structure
5. Review NLI_SPECIFICATION.md for format
6. Ask for clarification if design decision needed
